/**
 * JSON file store — reads/writes data/*.json from the project root.
 * Works locally (file system writable) and on Vercel (read-only, writes go
 * to .next/cache — but in practice this is used for local admin editing).
 *
 * Seed: run `npm run seed:json` once to generate data/*.json from bundled
 * static defaults. After that, admin edits persist in these JSON files.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "data");

function ensureDir() {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
}

function readJson<T>(name: string): T | null {
  const path = join(DATA_DIR, name);
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, "utf-8")) as T;
  } catch {
    return null;
  }
}

function writeJson<T>(name: string, data: T): boolean {
  try {
    ensureDir();
    writeFileSync(join(DATA_DIR, name), JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch {
    return false;
  }
}

// ---------- Public API ----------

export function getStore() {
  return {
    categories: readJson("categories.json"),
    products: readJson("products.json"),
    articles: readJson("articles.json"),
    faqs: readJson("faqs.json"),
    site: readJson("site.json"),
  };
}

export function getStoreCategory<T = unknown>(): T | null {
  return readJson<T>("categories.json");
}
export function getStoreProducts<T = unknown>(): T | null {
  return readJson<T>("products.json");
}
export function getStoreArticles<T = unknown>(): T | null {
  return readJson<T>("articles.json");
}
export function getStoreFaqs<T = unknown>(): T | null {
  return readJson<T>("faqs.json");
}
export function getStoreSite<T = unknown>(): T | null {
  return readJson<T>("site.json");
}

export function setStoreCategories<T>(data: T): boolean {
  return writeJson("categories.json", data);
}
export function setStoreProducts<T>(data: T): boolean {
  return writeJson("products.json", data);
}
export function setStoreArticles<T>(data: T): boolean {
  return writeJson("articles.json", data);
}
export function setStoreFaqs<T>(data: T): boolean {
  return writeJson("faqs.json", data);
}
export function setStoreSite<T>(data: T): boolean {
  return writeJson("site.json", data);
}
