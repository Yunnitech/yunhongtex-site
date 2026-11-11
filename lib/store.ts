/**
 * Content store.
 *
 * Priority:
 *   1. Upstash Redis  — used on Vercel, where the filesystem is read-only.
 *   2. data/*.json    — used locally so you can work offline.
 *
 * Set UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN (or the Vercel KV
 * equivalents KV_REST_API_URL / KV_REST_API_TOKEN) to enable online saving.
 */
import { Redis } from "@upstash/redis";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "data");
const KEY_PREFIX = "yunhongtex:";

let cached: Redis | null | undefined;

function getRedis(): Redis | null {
  if (cached !== undefined) return cached;
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  cached = url && token ? new Redis({ url, token }) : null;
  return cached;
}

export function isRemoteStore(): boolean {
  return getRedis() !== null;
}

function readJsonFile<T>(name: string): T | null {
  const path = join(DATA_DIR, name);
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, "utf-8")) as T;
  } catch {
    return null;
  }
}

async function readCollection<T>(name: string): Promise<T | null> {
  const client = getRedis();
  if (client) {
    try {
      const value = await client.get<T>(KEY_PREFIX + name);
      if (value !== null && value !== undefined) return value as T;
    } catch (error) {
      console.error(`[store] redis read failed for ${name}:`, error);
    }
  }
  return readJsonFile<T>(`${name}.json`);
}

async function writeCollection<T>(name: string, data: T): Promise<void> {
  const client = getRedis();
  if (client) {
    await client.set(KEY_PREFIX + name, data);
    return;
  }
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(
    join(DATA_DIR, `${name}.json`),
    JSON.stringify(data, null, 2),
    "utf-8",
  );
}

/* ------------------------------------------------------------------ reads */

export async function getStoreCategories<T = unknown>(): Promise<T | null> {
  return readCollection<T>("categories");
}
export async function getStoreProducts<T = unknown>(): Promise<T | null> {
  return readCollection<T>("products");
}
export async function getStoreArticles<T = unknown>(): Promise<T | null> {
  return readCollection<T>("articles");
}
export async function getStoreFaqs<T = unknown>(): Promise<T | null> {
  return readCollection<T>("faqs");
}
export async function getStoreSite<T = unknown>(): Promise<T | null> {
  return readCollection<T>("site");
}

/* ------------------------------------------------------------------ writes */

export async function setStoreCategories<T>(data: T): Promise<void> {
  return writeCollection("categories", data);
}
export async function setStoreProducts<T>(data: T): Promise<void> {
  return writeCollection("products", data);
}
export async function setStoreArticles<T>(data: T): Promise<void> {
  return writeCollection("articles", data);
}
export async function setStoreFaqs<T>(data: T): Promise<void> {
  return writeCollection("faqs", data);
}
export async function setStoreSite<T>(data: T): Promise<void> {
  return writeCollection("site", data);
}

/**
 * Seeds Redis (or data/*.json) from the bundled static catalogue when the
 * store is empty. Safe to run repeatedly.
 */
export async function ensureSeeded(seed: Record<string, unknown>): Promise<string[]> {
  const written: string[] = [];
  for (const [name, value] of Object.entries(seed)) {
    const existing = await readCollection(name);
    if (existing === null) {
      await writeCollection(name, value);
      written.push(name);
    }
  }
  return written;
}
