import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const leadSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  business_name: z.string().trim().max(150).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(2000),
});

const NOTIFY_TO = "hello@getseen.co.za";
const FROM_ADDRESS = "GetSeen Leads <onboarding@resend.dev>";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmailHtml(data: {
  name: string;
  email: string;
  phone: string | null;
  business_name: string | null;
  message: string;
}): string {
  const rows = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone ?? "—"],
    ["Business", data.business_name ?? "—"],
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#666;font-size:13px;vertical-align:top;">${escapeHtml(
          label
        )}</td><td style="padding:6px 0;font-size:14px;color:#111;">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  const messageHtml = escapeHtml(data.message).replace(/\n/g, "<br>");

  return `<!doctype html><html><body style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;background:#f5f5f5;padding:24px;margin:0;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;padding:28px;border:1px solid #eee;">
    <h2 style="margin:0 0 4px;font-size:20px;color:#111;">New lead from ${escapeHtml(data.name)}</h2>
    <p style="margin:0 0 20px;color:#666;font-size:13px;">via getseen.co.za</p>
    <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">${rows}</table>
    <div style="border-top:1px solid #eee;padding-top:16px;">
      <p style="margin:0 0 8px;color:#666;font-size:13px;">Message</p>
      <p style="margin:0;font-size:14px;line-height:1.6;color:#111;">${messageHtml}</p>
    </div>
    <p style="margin:24px 0 0;color:#999;font-size:12px;">Reply to this email to respond directly to ${escapeHtml(data.email)}.</p>
  </div></body></html>`;
}

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }

        const parsed = leadSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json(
            { error: "Validation failed", issues: parsed.error.issues },
            { status: 400 }
          );
        }

        const lead = {
          name: parsed.data.name,
          email: parsed.data.email,
          phone: parsed.data.phone ? parsed.data.phone : null,
          business_name: parsed.data.business_name ? parsed.data.business_name : null,
          message: parsed.data.message,
        };

        // Save lead first — never lose a lead even if email fails
        const { error: dbError } = await supabaseAdmin.from("leads").insert(lead);
        if (dbError) {
          console.error("Failed to insert lead:", dbError);
          return Response.json({ error: "Could not save your enquiry" }, { status: 500 });
        }

        // Fire notification email (non-fatal if it fails)
        try {
          const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
          const RESEND_API_KEY = process.env.RESEND_API_KEY;
          if (!LOVABLE_API_KEY || !RESEND_API_KEY) {
            console.error("Missing Resend gateway env vars");
          } else {
            const res = await fetch(`${GATEWAY_URL}/emails`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${LOVABLE_API_KEY}`,
                "X-Connection-Api-Key": RESEND_API_KEY,
              },
              body: JSON.stringify({
                from: FROM_ADDRESS,
                to: [NOTIFY_TO],
                reply_to: lead.email,
                subject: `New lead from ${lead.name} — GetSeen`,
                html: buildEmailHtml(lead),
              }),
            });
            if (!res.ok) {
              const text = await res.text();
              console.error(`Resend send failed [${res.status}]: ${text}`);
            }
          }
        } catch (err) {
          console.error("Notification email error:", err);
        }

        return Response.json({ ok: true });
      },
    },
  },
});
