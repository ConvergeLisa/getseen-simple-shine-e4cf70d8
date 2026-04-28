import { supabaseAdmin } from "@/integrations/supabase/client.server";
import type { TrackableEvent } from "@/lib/trackingEvents";

export type StoredEvent = {
  event: TrackableEvent;
  page: string;
  timestamp: string;
  sessionId: string;
  source: string;
  deviceType: string;
  userAgent: string | null;
  referrer: string | null;
};

export async function storeEvent(event: StoredEvent) {
  const { error } = await supabaseAdmin.from("conversion_events").insert({
    event: event.event,
    page: event.page,
    timestamp: event.timestamp,
    session_id: event.sessionId,
    source: event.source,
    device_type: event.deviceType,
    user_agent: event.userAgent,
    referrer: event.referrer,
  });

  if (error) {
    throw error;
  }
}

export async function getEventCounts() {
  const { data, error } = await supabaseAdmin.from("conversion_events").select("event");

  if (error) {
    throw error;
  }

  const counts: Record<TrackableEvent, number> = {
    page_view: 0,
    session_start: 0,
    whatsapp_click: 0,
    generate_lead: 0,
    form_submit: 0,
  };

  for (const item of data ?? []) {
    const event = item.event as TrackableEvent;
    counts[event] += 1;
  }

  return counts;
}

export async function getStoredEvents(limit = 500): Promise<StoredEvent[]> {
  const { data, error } = await supabaseAdmin
    .from("conversion_events")
    .select("event,page,timestamp,session_id,source,device_type,user_agent,referrer")
    .order("timestamp", { ascending: false })
    .limit(limit);

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) => ({
    event: row.event as TrackableEvent,
    page: row.page,
    timestamp: row.timestamp,
    sessionId: row.session_id,
    source: row.source,
    deviceType: row.device_type,
    userAgent: row.user_agent,
    referrer: row.referrer,
  }));
}
