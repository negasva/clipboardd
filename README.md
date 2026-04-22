# TattooShop Clipboard

Single-file clipboard library with optional Supabase sync.

## Netlify setup

Use the repo root as the publish directory.

The app expects Netlify to generate an `env.js` file during build from the environment variables you add in the Netlify dashboard.

Set these variables in Netlify:

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_public_anon_key
SUPABASE_TABLE=clipboard_sessions
```

Do not put your Supabase service role key in this frontend.

## Supabase setup

1. Create a new Supabase project.
2. Open the SQL editor.
3. Run `supabase/schema.sql`.
4. Make sure the `clipboard_sessions` table exists.
5. Add the three env vars above in Netlify.

## Local files

- `index.html`: the app
- `env.js`: generated at build time, do not commit
- `scripts/generate-env.mjs`: writes `env.js` from Netlify env vars
- `supabase/schema.sql`: database schema

## Important note

This is a static frontend. The public Supabase anon key can live in the browser, but truly secret credentials need a server or serverless function.

