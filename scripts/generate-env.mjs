import { writeFileSync } from "node:fs";

const config = {
  SUPABASE_URL: process.env.SUPABASE_URL || "",
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || "",
  SUPABASE_TABLE: process.env.SUPABASE_TABLE || "clipboard_sessions",
};

writeFileSync("env.js", `window.APP_CONFIG = ${JSON.stringify(config)};\n`);
