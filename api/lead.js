/* ==========================================================================
   Lead form backend (Vercel serverless function) for src/components/LeadForm.tsx

   Moved here from the retired aiads.fusioncreative.net landing (2026-10-15).
     1. lead notification email to the Fusion inbox (critical: failure → 502)
     2. Meta Conversions API `Lead` (deduped with the browser pixel by event_id)
     3. confirmation email to the visitor
   Steps 2 and 3 never fail the lead.

   Environment variables (Vercel → fusion-ai-portfolio → Settings → Environment Variables):
     RESEND_API_KEY  — required. Without it the function returns 503 so the form
                       shows its error state (a missing key must never eat leads).
     SENDER_EMAIL    — "Fusion Creative <office@fusioncreative.net>" (domain verified in Resend)
     LEAD_INBOX      — where lead notifications go (office@fusioncreative.net)
     META_CAPI_TOKEN — Conversions API token for pixel 3894913167483268 (optional)
   ========================================================================== */

import { createHash } from "node:crypto";

const META_PIXEL_ID = "3894913167483268";
const META_GRAPH_VERSION = "v21.0";

const DEFAULT_SENDER = "Fusion Creative <office@fusioncreative.net>";
const DEFAULT_INBOX = "office@fusioncreative.net";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Digits plus common separators; at least 6 digits in total
const PHONE_RE = /^\+?[\d\s()./-]{6,}$/;

// One promise, worded the same everywhere on the site
const SAMPLE_AD = "безплатна примерна реклама от 10 до 15 секунди";

function isValidPhone(phone) {
  return PHONE_RE.test(String(phone)) && String(phone).replace(/\D/g, "").length >= 6;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* Confirmation email — owner-approved Bulgarian template, filled from the form */
function confirmationEmail(name, storeUrl) {
  const safeName = escapeHtml(name);
  const safeStore = storeUrl ? escapeHtml(storeUrl) : "";

  const text = [
    `Здравей ${name},`,
    "",
    "Получихме заявката ти, благодарим.",
    "",
    storeUrl
      ? `Ето какво следва: разглеждаме ${storeUrl} и подготвяме ${SAMPLE_AD}, направена конкретно за твоя продукт. Ще я получиш до 48 часа, директно от нас.`
      : `Ето какво следва: ще ти се обадим, за да научим повече за продукта ти, и подготвяме ${SAMPLE_AD}, направена конкретно за него. Ще я получиш до 48 часа, директно от нас.`,
    "",
    "Без ангажимент, без плащане. Просто искаме да видиш какво можем, преди да решиш каквото и да е.",
    "",
    "До скоро,",
    "",
    "Томас и Моника",
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="bg">
<body style="margin:0;padding:0;background:#f5f5f7;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;font-family:'Segoe UI',system-ui,Arial,sans-serif;color:#1a1a1f;font-size:16px;line-height:1.65;">
    <p style="margin:0 0 24px;font-weight:800;font-size:18px;letter-spacing:0.04em;">
      <span style="color:#E01020;">FUSION</span>&nbsp;CREATIVE
    </p>
    <p style="margin:0 0 16px;">Здравей ${safeName},</p>
    <p style="margin:0 0 16px;">Получихме заявката ти, благодарим.</p>
    <p style="margin:0 0 16px;">
      ${safeStore
        ? `Ето какво следва: разглеждаме <strong>${safeStore}</strong>
      и подготвяме ${SAMPLE_AD}, направена конкретно за твоя продукт.`
        : `Ето какво следва: ще ти се обадим, за да научим повече за продукта ти, и подготвяме ${SAMPLE_AD}, направена конкретно за него.`}
      Ще я получиш до 48 часа, директно от нас.
    </p>
    <p style="margin:0 0 16px;">
      Без ангажимент, без плащане. Просто искаме да видиш какво можем,
      преди да решиш каквото и да е.
    </p>
    <p style="margin:0 0 4px;">До скоро,</p>
    <p style="margin:0;font-weight:700;">Томас и Моника</p>
    <hr style="border:none;border-top:1px solid #e3e3e8;margin:32px 0 16px;">
    <p style="margin:0;color:#8a8a94;font-size:13px;">Fusion Creative · AI видео реклами за бизнеса ти</p>
  </div>
</body>
</html>`;

  return { text, html };
}

/* Internal notification — all form fields, lands in the Fusion inbox */
function notificationEmail(fields) {
  const rows = [
    ["Сайт / Instagram", fields.store_url || "(не е посочен)"],
    ["Име", fields.name],
    ["Телефон", fields.phone],
    ["Имейл", fields.email],
    ["Версия на страницата", fields.hero_variant === "2" ? "V2 (?v=2)" : "V1"],
  ];

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<div style="font-family:system-ui,Arial,sans-serif;font-size:15px;line-height:1.7;">
    <h2 style="margin:0 0 16px;">Нов лийд от portfolio.fusioncreative.net</h2>
    <table style="border-collapse:collapse;">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:4px 16px 4px 0;color:#666;">${escapeHtml(k)}</td><td style="padding:4px 0;font-weight:600;">${escapeHtml(v)}</td></tr>`
        )
        .join("")}
    </table>
  </div>`;

  return { text, html };
}

/* Meta Conversions API — server-side Lead. Catches the leads the browser pixel
   misses (iOS, ad blockers). Same event_id as the pixel's Lead → counted once. */
function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

// Meta wants digits only, with country code; Bulgarian numbers are often typed as 08...
function normalizePhone(phone) {
  let digits = String(phone).replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  else if (digits.startsWith("0")) digits = "359" + digits.slice(1);
  return digits;
}

async function sendMetaLead(req, fields) {
  const token = process.env.META_CAPI_TOKEN;
  if (!token || !fields.event_id) return;

  const forwardedFor = String(req.headers?.["x-forwarded-for"] || "").split(",")[0].trim();
  const firstName = String(fields.name).trim().split(/\s+/)[0].toLowerCase();
  const userData = {
    em: [sha256(String(fields.email).trim().toLowerCase())],
    ph: [sha256(normalizePhone(fields.phone))],
    ...(firstName ? { fn: [sha256(firstName)] } : {}),
    ...(forwardedFor ? { client_ip_address: forwardedFor } : {}),
    ...(req.headers?.["user-agent"] ? { client_user_agent: req.headers["user-agent"] } : {}),
    ...(fields.fbp ? { fbp: String(fields.fbp) } : {}),
    ...(fields.fbc ? { fbc: String(fields.fbc) } : {}),
  };

  const body = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: String(fields.event_id),
        action_source: "website",
        event_source_url: String(fields.page_url || "https://portfolio.fusioncreative.net/"),
        user_data: userData,
        custom_data: {
          content_name: "lead_form",
          hero_variant: fields.hero_variant === "2" ? 2 : 1,
        },
      },
    ],
    // Only Meta "Test Events" codes (TEST12345); such events never count in reporting
    ...(/^TEST\d+$/.test(String(fields.test_event_code || ""))
      ? { test_event_code: fields.test_event_code }
      : {}),
  };

  const response = await fetch(
    `https://graph.facebook.com/${META_GRAPH_VERSION}/${META_PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`,
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
  );
  if (!response.ok) {
    throw new Error(`Meta CAPI ${response.status}: ${await response.text()}`);
  }
}

async function sendEmail(apiKey, payload) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Resend ${response.status}: ${body}`);
  }
  return response.json();
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const { store_url, name, email, phone, hero_variant, event_id, fbp, fbc, page_url, test_event_code } =
    req.body || {};

  // Mirror the client-side validation (website / Instagram is optional); reject junk early
  if (!name || !email || !EMAIL_RE.test(email) || !phone || !isValidPhone(phone)) {
    return res.status(400).json({ ok: false, error: "Invalid fields" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Fail loudly: a "success" here would silently drop the lead
    console.error("RESEND_API_KEY is not configured — lead NOT emailed:", { store_url, name, email, phone });
    return res.status(503).json({ ok: false, error: "Email not configured" });
  }

  const sender = process.env.SENDER_EMAIL || DEFAULT_SENDER;
  const inbox = process.env.LEAD_INBOX || DEFAULT_INBOX;

  const confirmation = confirmationEmail(name, store_url);
  const notification = notificationEmail({ store_url, name, email, phone, hero_variant });

  // The notification (lead capture) is the critical send; do it first
  try {
    await sendEmail(apiKey, {
      from: sender,
      to: [inbox],
      reply_to: email,
      subject: `Нов лийд (портфолио): ${store_url || `${name}, ${phone}`}`,
      text: notification.text,
      html: notification.html,
    });
  } catch (err) {
    console.error("Lead notification failed:", err);
    return res.status(502).json({ ok: false, error: "Email delivery failed" });
  }

  // Meta Conversions API: nice to have; a failure here must not fail the lead
  try {
    await sendMetaLead(req, { email, phone, name, hero_variant, event_id, fbp, fbc, page_url, test_event_code });
  } catch (err) {
    console.error("Meta CAPI failed (lead still captured):", err);
  }

  // Visitor confirmation: nice to have; a failure here must not fail the lead
  try {
    await sendEmail(apiKey, {
      from: sender,
      to: [email],
      subject: "Получихме заявката ти. Безплатната ти примерна реклама от 10 до 15 секунди идва до 48 часа.",
      text: confirmation.text,
      html: confirmation.html,
    });
  } catch (err) {
    console.error("Visitor confirmation failed (lead still captured):", err);
  }

  return res.status(200).json({ ok: true, emailed: true });
}
