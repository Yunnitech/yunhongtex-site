/**
 * One-click database setup: creates all tables + RLS policies in Supabase
 * using a direct PostgreSQL connection (bypasses SQL Editor restrictions).
 *
 * Prerequisites:
 *   1. .env with NEXT_PUBLIC_SUPABASE_URL and DB_PASSWORD (database password)
 *      Add this line to .env:  DB_PASSWORD=your_database_password
 *
 * Run:  npx tsx scripts/setup-db.ts
 */
import { Client } from "pg";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Load .env
try {
  const envPath = join(dirname(fileURLToPath(import.meta.url)), "..", ".env");
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split(/\r?\n/)) {
    const m = line.match(/^(\w+)=(.*)$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2];
  }
} catch {
  // OK if no .env
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const dbPassword = process.env.DB_PASSWORD;

if (!supabaseUrl) {
  console.error("❌ NEXT_PUBLIC_SUPABASE_URL not found in .env");
  process.exit(1);
}

// Extract project ref from URL like https://xxxxx.supabase.co
const refMatch = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/);
if (!refMatch) {
  console.error("❌ Cannot parse project ref from NEXT_PUBLIC_SUPABASE_URL");
  process.exit(1);
}
const ref = refMatch[1];

if (!dbPassword) {
  console.error(`
❌ DB_PASSWORD not found in .env.

Please add this line to your .env file:
  DB_PASSWORD=your_database_password

Where to get the password:
  Supabase Dashboard → Settings → Database → Connection string → Password
`);
  process.exit(1);
}

const connectionString = `postgresql://postgres:${dbPassword}@db.${ref}.supabase.co:5432/postgres?sslmode=require`;

const schema = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), "..", "supabase", "schema.sql"),
  "utf-8",
);

async function main() {
  const client = new Client({ connectionString });
  try {
    console.log("🔌 Connecting to Supabase database...");
    await client.connect();
    console.log("✅ Connected!\n");

    // Split schema into individual statements (naive split by `;` outside strings)
    const statements: string[] = [];
    let buf = "";
    let inString = false;
    let stringChar = "";
    for (let i = 0; i < schema.length; i++) {
      const ch = schema[i];
      if (inString) {
        buf += ch;
        if (ch === stringChar && schema[i + 1] !== stringChar) inString = false;
      } else if (ch === "'" || ch === '"') {
        inString = true;
        stringChar = ch;
        buf += ch;
      } else if (ch === ";") {
        const trimmed = buf.trim();
        if (trimmed && !trimmed.startsWith("--")) statements.push(trimmed + ";");
        buf = "";
      } else {
        buf += ch;
      }
    }
    const tail = buf.trim();
    if (tail && !tail.startsWith("--")) statements.push(tail);

    console.log(`📋 Found ${statements.length} SQL statements. Executing...\n`);

    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i];
      const label = stmt.replace(/\s+/g, " ").slice(0, 60);
      process.stdout.write(`  [${i + 1}/${statements.length}] ${label}... `);
      try {
        await client.query(stmt);
        console.log("✅");
      } catch (err: any) {
        // "already exists" errors are fine
        if (err.message?.includes("already exists")) {
          console.log("⏭️  (already exists)");
        } else {
          console.log("❌");
          console.error(`      ${err.message}`);
          // Continue — some policies may already be there
        }
      }
    }

    console.log("\n🎉 Database setup complete!");
  } catch (err: any) {
    console.error("\n❌ Failed:", err.message);
    if (err.message?.includes("password")) {
      console.error("   → Check your DB_PASSWORD in .env");
    }
    if (err.message?.includes("ECONNREFUSED") || err.message?.includes("timeout")) {
      console.error("   → Check network or if Supabase project is paused");
    }
    process.exit(1);
  } finally {
    await client.end().catch(() => {});
  }
}

main();
