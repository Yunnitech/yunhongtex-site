/**
 * Seeds Upstash Redis from data/*.json (only when a key is missing).
 *
 *   node scripts/seed-redis.cjs
 *
 * Requires UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN in the env.
 */
const fs = require("fs");
const path = require("path");
const { Redis } = require("@upstash/redis");

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;
if (!url || !token) {
  console.error("Missing UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN");
  process.exit(1);
}

const redis = new Redis({ url, token });
const DATA_DIR = path.join(__dirname, "..", "data");
const PREFIX = "yunhongtex:";

(async () => {
  for (const file of fs.readdirSync(DATA_DIR)) {
    if (!file.endsWith(".json")) continue;
    const key = PREFIX + path.basename(file, ".json");
    const exists = await redis.get(key);
    if (exists !== null && exists !== undefined) {
      console.log(`skip  ${key} (already set)`);
      continue;
    }
    const data = JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), "utf-8"));
    await redis.set(key, data);
    console.log(`seed  ${key} (${Array.isArray(data) ? data.length + " items" : "object"})`);
  }
  console.log("done");
})().catch((error) => {
  console.error("FAIL:", error.message);
  process.exit(1);
});
