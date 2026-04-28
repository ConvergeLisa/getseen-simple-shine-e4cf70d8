import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { storeEvent } from "@/lib/eventStore.server";
import { TRACKABLE_EVENTS } from "@/lib/trackingEvents";

const trackEventSchema = z.object({
  event: z.enum(TRACKABLE_EVENTS),
  page: z.string().min(1).max(500),
  session_id: z.string().min(1).max(120),
  source: z.string().min(1).max(150).optional(),
  device_type: z.enum(["desktop", "mobile", "tablet", "unknown"]).optional(),
  referrer: z.string().max(1000).nullable().optional(),
  user_agent: z.string().max(1000).nullable().optional(),
});

export const Route = createFileRoute("/api/track/event")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }

        const parsed = trackEventSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json({ error: "Invalid event payload" }, { status: 400 });
        }

        try {
          await storeEvent({
            event: parsed.data.event,
            page: parsed.data.page,
            timestamp: new Date().toISOString(),
            sessionId: parsed.data.session_id,
            source: parsed.data.source ?? "direct",
            deviceType: parsed.data.device_type ?? "unknown",
            userAgent: parsed.data.user_agent ?? request.headers.get("user-agent"),
            referrer: parsed.data.referrer ?? request.headers.get("referer"),
          });
        } catch (error) {
          console.error("Failed to persist conversion event:", error);
          return Response.json({ error: "Failed to store event" }, { status: 500 });
        }

        return Response.json({ success: true });
      },
    },
  },
});
