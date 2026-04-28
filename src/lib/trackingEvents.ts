export const TRACKABLE_EVENTS = [
  "page_view",
  "session_start",
  "whatsapp_click",
  "generate_lead",
  "form_submit",
] as const;

export type TrackableEvent = (typeof TRACKABLE_EVENTS)[number];
