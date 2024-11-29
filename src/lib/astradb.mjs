import dotenv from "dotenv"
dotenv.config({
  path: ".env.local"
})

import {
  DataAPIClient
} from "@datastax/astra-db-ts";
import {
  AstraDBVectorStore
} from "@langchain/community/vectorstores/astradb";
import {
  OpenAIEmbeddings
} from "@langchain/openai";
const endpoint = process.env.ASTRA_DB_ENDPOINT || "";
const token = process.env.ASTRA_DB_APPLICATION_TOKEN || "";
const collectionName = process.env.ASTRA_DB_COLLECTION || "";

const client = new DataAPIClient(token);

if (!endpoint || !token || !collectionName) {
  throw new Error(
    "Please set ASTRA_DB_ENDPOINT,ASTRA_DB_APPLICATION_TOKEN,ASTRA_DB_COLLECTION environment variables"
  );
}

export async function getVectorStore() {
  return AstraDBVectorStore.fromExistingIndex(
    new OpenAIEmbeddings({
      modelName: "text-embedding-3-small"
    }), {
      token,
      endpoint,
      collection: collectionName,
      collectionOptions: {
        vector: {
          dimension: 1536,
          metric: "cosine",
        },
      },
    }
  );
}

// export async function getEmbeddingsCollection() {
//   return new AstraDbAdmin(token, endpoint).collection(collection);
// }

export async function getEmbeddingsCollection() {
  const db = client.db(endpoint);
  const collection = db.collection(collectionName);

  // const exists = await db.hasCollection(collectionName);
  // if (!exists) {
  // throw new Error(`Collection '${collectionName}' does not exist.`);
  // }

  return collection;
}