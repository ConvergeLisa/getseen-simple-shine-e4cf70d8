import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { buildAdminSessionCookie, getAnalyticsDashboardPassword } from "@/lib/adminAuth.server";

const loginSchema = z.object({
  password: z.string().min(1),
});

export const Route = createFileRoute("/api/admin/login")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }

        const parsed = loginSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json({ error: "Password is required" }, { status: 400 });
        }

        const expectedPassword = getAnalyticsDashboardPassword();
        if (!expectedPassword) {
          return Response.json({ error: "Dashboard password is not configured" }, { status: 500 });
        }

        if (parsed.data.password !== expectedPassword) {
          return Response.json({ error: "Invalid credentials" }, { status: 401 });
        }

        return new Response(JSON.stringify({ authenticated: true }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Set-Cookie": buildAdminSessionCookie(),
          },
        });
      },
    },
  },
});
