create table if not exists public.conversion_events (
  id uuid primary key default gen_random_uuid(),
  event text not null check (event in ('whatsapp_click', 'generate_lead', 'form_submit')),
  page text not null,
  timestamp timestamptz not null default now(),
  user_agent text,
  referrer text
);

create index if not exists conversion_events_event_idx on public.conversion_events (event);
create index if not exists conversion_events_timestamp_idx on public.conversion_events (timestamp desc);

alter table public.conversion_events enable row level security;
