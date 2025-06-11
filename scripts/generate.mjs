import dotenv from "dotenv";
dotenv.config({
  path: ".env.local"
});

import fetch from "node-fetch";
import * as cheerio from "cheerio";
import {
  RecursiveCharacterTextSplitter
} from "langchain/text_splitter";
import {
  getVectorStore,
  getEmbeddingsCollection
} from "../src/lib/astradb.mjs";
import {
  Redis
} from "@upstash/redis";

const SITE_URL = process.env.SITE_URL || "https://www.indrajohn.com.au";

async function generateEmbeddings() {
  console.log(`🚀 Fetching site content from: ${SITE_URL}`);

  // 1. Fetch and extract visible text
  const res = await fetch(SITE_URL);
  if (!res.ok) throw new Error(`Failed to fetch ${SITE_URL}`);
  const html = await res.text();
  const $ = cheerio.load(html);
  $("script, style, noscript").remove();
  const visibleText = $("body").text().replace(/\s+/g, " ").trim();

  console.log(`✅ Extracted ${visibleText.length} characters of visible content`);

  // 2. Clear Redis and AstraDB
  console.log("🧹 Clearing Redis and AstraDB collection...");
  await Redis.fromEnv().flushdb();
  await (await getEmbeddingsCollection()).deleteMany({});

  // 3. Split and embed
  const splitter = RecursiveCharacterTextSplitter.fromLanguage("html");
  const docs = await splitter.splitDocuments([{
    pageContent: visibleText,
    metadata: {
      url: SITE_URL
    }
  }, ]);

  const vectorStore = await getVectorStore();
  await vectorStore.addDocuments(docs);

  console.log(`✅ Embedded and stored ${docs.length} document chunks into AstraDB`);
}

generateEmbeddings().catch((err) => {
  console.error("❌ Error generating embeddings:", err);
  process.exit(1);
});