import dotenv from "dotenv"
dotenv.config({
  path: ".env.local"
})

import {
  RecursiveCharacterTextSplitter
} from "langchain/text_splitter";
import {
  DirectoryLoader
} from "langchain/document_loaders/fs/directory";
import {
  TextLoader
} from "langchain/document_loaders/fs/text";
import {
  getVectorStore,
  getEmbeddingsCollection
}
from "../src/lib/astradb.mjs";
import {
  Redis
} from "@upstash/redis";
async function generateEmbeddings() {
  const vectoreStore = await getVectorStore();
  await Redis.fromEnv().flushdb();

  (await getEmbeddingsCollection()).deleteMany({})
  const loader = new DirectoryLoader(
    "src/components/", {
      ".js": (path) => new TextLoader(path),
    },
    true
  );

  const loaderContext = new DirectoryLoader(
    "src/context/", {
      ".js": (path) => new TextLoader(path),
    },
    true
  );


  const doc = (await loader.load()).filter((doc) =>
    doc.metadata.source.endsWith(".js")
  ).map((doc) => {
    const url = doc.metadata.source.replace(/\\/g, "/").split("/src/components")[1] || "/"

    const pageContentTrimmed = doc.pageContent
      .replace(/^import.*$/gm, "")
      .replace(/ className=(["']).*?\1| className={.*?}/g, "")
      .replace(/^\s*[\r]/gm)
      .trim();
    console.log(pageContentTrimmed)
    return {
      pageContent: pageContentTrimmed,
      metadata: {
        url
      }
    }
  });

  const _context = (await loaderContext.load()).filter((doc) =>
    doc.metadata.source.endsWith(".js")
  ).map((doc) => {
    const url = doc.metadata.source.replace(/\\/g, "/").split("/src/components")[1] || "/"

    const pageContentTrimmed = doc.pageContent
      .replace(/^import.*$/gm, "")
      .replace(/ className=(["']).*?\1| className={.*?}/g, "")
      .replace(/^\s*[\r]/gm)
      .trim();
    console.log(pageContentTrimmed)
    return {
      pageContent: pageContentTrimmed,
      metadata: {
        url
      }
    }
  });

  doc.push(..._context)

  console.log(doc)


  const splitter = RecursiveCharacterTextSplitter.fromLanguage("html")
  const splitDocs = await splitter.splitDocuments(doc)
  await vectoreStore.addDocuments(splitDocs)

}

generateEmbeddings();