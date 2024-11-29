import { ChatOpenAI } from "@langchain/openai";
import { getVectorStore } from "@/lib/astradb";
import { UpstashRedisCache } from "@langchain/community/caches/upstash_redis";
import { Redis } from "@upstash/redis";
export async function POST(request) {
  try {
    const body = await request.json();
    const messages = body.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Invalid message format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const currentMessageContent = messages[messages.length - 1]?.content;

    if (!currentMessageContent || typeof currentMessageContent !== "string") {
      throw new Error("Invalid input message content.");
    }

    const cache = new UpstashRedisCache({ client: Redis.fromEnv() });

    // Initialize the ChatOpenAI model with caching
    const chatModel = new ChatOpenAI({
      modelName: "gpt-4-turbo",
      streaming: true,
      verbose: true,
      cache,
    });

    // Retrieve relevant documents
    const retriever = (await getVectorStore()).asRetriever();
    const relevantDocs = await retriever
      .getRelevantDocuments(currentMessageContent)
      .catch((err) => {
        console.error("Retriever Error:", err);
        return [];
      });

    const context =
      relevantDocs.map((doc) => doc.page_content).join("\n\n") || "";

    // Build a dynamic prompt using the retrieved context
    const systemPrompt = `
You are tasked with operating as a chatbot for a personal portfolio website.
Your primary function is to impersonate the site's owner. This requires you to:
1. Respond as if you are the portfolio owner.
2. Format responses in Markdown syntax.
3. Use the context provided below to answer questions accurately.

${context ? `Context:\n${context}` : ""}
`.trim();

    console.log("System Prompt:", systemPrompt);

    // Ensure messages are properly formatted
    const finalMessages = [
      { role: "system", content: systemPrompt },
      ...messages.filter(
        (m) => m && typeof m === "object" && "role" in m && "content" in m
      ),
    ];

    console.log("Final Messages:", finalMessages);

    // Use invoke() instead of call()
    const result = await chatModel.invoke(finalMessages);

    return new Response(JSON.stringify({ response: result.content }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
