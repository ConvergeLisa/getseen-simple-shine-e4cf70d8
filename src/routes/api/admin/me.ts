import { createFileRoute } from "@tanstack/react-router";
import { isAuthenticatedRequest } from "@/lib/adminAuth.server";

export const Route = createFileRoute("/api/admin/me")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        return Response.json({ authenticated: isAuthenticatedRequest(request) });
      },
    },
  },
});
