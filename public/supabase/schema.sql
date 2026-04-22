create table if not exists public.clipboard_sessions (
  sync_key text primary key,
  payload jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.clipboard_sessions enable row level security;

create policy "read own session" on public.clipboard_sessions
for select
using (true);

create policy "insert own session" on public.clipboard_sessions
for insert
with check (true);

create policy "update own session" on public.clipboard_sessions
for update
using (true)
with check (true);
