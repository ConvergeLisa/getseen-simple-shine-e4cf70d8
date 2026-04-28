alter table public.conversion_events
  add column if not exists session_id text,
  add column if not exists source text not null default 'direct',
  add column if not exists device_type text not null default 'unknown';

update public.conversion_events
set session_id = coalesce(session_id, id::text)
where session_id is null;

alter table public.conversion_events
  alter column session_id set not null;

alter table public.conversion_events
  drop constraint if exists conversion_events_event_check;

alter table public.conversion_events
  add constraint conversion_events_event_check
  check (event in ('page_view', 'session_start', 'whatsapp_click', 'generate_lead', 'form_submit'));

create index if not exists conversion_events_session_id_idx
  on public.conversion_events (session_id);
create index if not exists conversion_events_source_idx
  on public.conversion_events (source);
create index if not exists conversion_events_device_type_idx
  on public.conversion_events (device_type);
