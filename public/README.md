# TattooShop Clipboard

TattooShop Clipboard is a personal clipboard library for fast copy buttons, groups, drag-and-drop ordering, and optional Supabase sync across devices.

## What you need

- A Supabase project
- The project URL
- The public anon key
- The table name `clipboard_sessions`

## Important security note

This app is a static frontend.

That means:

- `SUPABASE_ANON_KEY` is safe to use in the browser as a public client key.
- `SUPABASE_SERVICE_ROLE_KEY` must never go into this app.
- Real secrets should live in an `.env.local` file or a server-side deployment step, not in committed source.

If you want fully secret server-side credentials, we should add a small backend or serverless layer later.

## Setup in Supabase

1. Create a new Supabase project.
2. Open the SQL editor.
3. Run the SQL in `supabase/schema.sql`.
4. Go to Project Settings and copy:
   - Project URL
   - `anon` public key
5. Create a local env file:

```bash
cp .env.example .env.local
```

6. Fill in:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_TABLE`

## How sync works

- Each session uses a short sync key.
- The app saves locally on each device.
- When Supabase is configured, the app can sync the session payload by `sync_key`.
- Any device with the same sync key can load the same session.

## Suggested next improvement

For a more production-grade version, we should move Supabase values out of the HTML and into a small build step or serverless config loader.

## Working from Codex

This repo lives in `tscclipboard`.

Open the repo in Codex, edit files there, then commit and push from the terminal.

## Files

- `index.html` - main app
- `.env.example` - environment template
- `.gitignore` - ignore local secrets
- `supabase/schema.sql` - database schema

