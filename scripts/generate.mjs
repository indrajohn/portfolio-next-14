import dotenv from 'dotenv';
dotenv.config({
    path: '.env.local'
});

import fs from 'fs/promises';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import {
    RecursiveCharacterTextSplitter
} from 'langchain/text_splitter';
import {
    OpenAIEmbeddings
} from '@langchain/openai';

const SITE_URL = process.env.SITE_URL || 'https://www.indrajohn.com.au';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
    console.error("❌ OPENAI_API_KEY not set in .env.local");
    process.exit(1);
}

async function generateEmbeddings() {
    console.log(`🌍 Fetching: ${SITE_URL}`);
    const response = await fetch(SITE_URL);
    const html = await response.text();
    const $ = cheerio.load(html);
    $('script, style, noscript').remove();
    const text = $('body').text().replace(/\s+/g, ' ').trim();

    const splitter = RecursiveCharacterTextSplitter.fromLanguage('html');
    const documents = await splitter.createDocuments([text]);

    // ✅ move this inside the function
    const embeddings = new OpenAIEmbeddings({
        openAIApiKey: OPENAI_API_KEY
    });

    const docsWithEmbeddings = await Promise.all(
        documents.map(async (doc) => ({
            content: doc.pageContent,
            embedding: await embeddings.embedQuery(doc.pageContent),
        }))
    );

    await fs.writeFile('public/embeddings.json', JSON.stringify(docsWithEmbeddings, null, 2));
    console.log(`✅ Saved ${docsWithEmbeddings.length} embeddings to public/embeddings.json`);
}

generateEmbeddings().catch((err) => {
    console.error("❌ Failed:", err);
    process.exit(1);
});