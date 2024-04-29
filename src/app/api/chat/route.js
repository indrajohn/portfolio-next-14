import { getVectorStore } from "@/lib/astradb";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
  PromptTemplate,
} from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { Redis } from "@upstash/redis";
import {
  LangChainStream,
  StreamingTextResponse,
  Message as VercelChatMessage,
} from "ai";
import { UpstashRedisCache } from "@langchain/community/caches/upstash_redis";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { createRetrievalChain } from "langchain/chains/retrieval";
// export async function POST(request) {
//   try {
//     const body = await request.json();
//     const messages = body.messages;

//     const retriever = (await getVectorStore()).asRetriever();

//     const chatHistory = messages
//       .slice(0, -1)
//       .map((m) =>
//         m.role === "user"
//           ? new HumanMessage(m.content)
//           : new AIMessage(m.messages)
//       );

//     const currentMessageContent = messages[messages.length - 1].content;

//     const cache = new UpstashRedisCache({ client: Redis.fromEnv() });

//     const { stream, handlers } = LangChainStream();

//     const chatModel = new ChatOpenAI({
//       modelName: "gpt-3.5-turbo",
//       streaming: true,
//       callbacks: [handlers],
//       verbose: true,
//       cache,
//     });

//     const rephrashingModel = new ChatOpenAI({
//       modelName: "gpt-3.5-turbo",
//       verbose: true,
//       cache,
//     });

//     const rephrasePrompt = ChatPromptTemplate.fromMessages([
//       new MessagesPlaceholder("chat_history"),
//       ["user", "{input}"],
//       [
//         "user",
//         "Given the above conversation, generate a search query to look up in order to get information relevant to the current question. " +
//           "Don't leave out any relevant keywords. Only return the query and no other text. if no result return no result",
//         ,
//       ],
//     ]);

//     const historyAwareRetrieverChain = await createHistoryAwareRetriever({
//       llm: rephrashingModel,
//       retriever,
//       rephrasePrompt,
//     });

//     const prompt = ChatPromptTemplate.fromMessages([
//       [
//         "system",
//         "You are tasked with operating as a chatbot for a personal portfolio website, " +
//           "where your primary function is to impersonate the site's owner. " +
//           "This unique role requires you to respond to inquiries in a manner that suggests " +
//           "you are the owner of the website. It's essential to fully adopt the persona of the " +
//           "website's proprietor during interactions. Please note that when providing answers " +
//           "to users, you should refrain from including links ending in .js. Links should only be " +
//           "used to direct users to specific areas of the portfolio for detailed insights. " +
//           "Additionally, all your responses should be formatted using Markdown syntax. " +
//           "Your objective is to engage with users based on the provided context, ensuring " +
//           "a seamless and informative experience." +
//           "Context:\n{context}",
//       ],
//       new MessagesPlaceholder("chat_history"),
//       ["user", "{input}"],
//     ]);

//     const combineDocsChain = await createStuffDocumentsChain({
//       llm: chatModel,
//       prompt,
//       documentPrompt: PromptTemplate.fromTemplate(
//         "Page URL: {url}\n\nPage content:\n{page_content}"
//       ),
//       documentSeparator: "\n-------\n",
//     });

//     const retriverChain = await createRetrievalChain({
//       combineDocsChain,
//       retriever: historyAwareRetrieverChain,
//     });
//     retriverChain.invoke({
//       input: currentMessageContent,
//       chat_history: chatHistory,
//     });

//     return new StreamingTextResponse(stream);
//   } catch (err) {
//     console.log(err);
//     return new StreamingTextResponse([
//       "I am sorry, I couldn't find any relevant information about that.",
//     ]);
//     //return Response.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }

export async function POST(request) {
  try {
    const body = await request.json();
    const messages = body.messages;
    console.log("message history: ", body);

    const chatHistory = messages
      .slice(0, -1)
      .map((m) =>
        m.role === "user"
          ? new HumanMessage(m.content)
          : new AIMessage(m.content)
      );

    const currentMessageContent = messages[messages.length - 1].content;

    const cache = new UpstashRedisCache({
      client: Redis.fromEnv(),
    });

    const { stream, handlers } = LangChainStream();

    const chatModel = new ChatOpenAI({
      modelName: "gpt-3.5-turbo",
      streaming: true,
      callbacks: [handlers],
      verbose: true,
      cache,
    });

    const rephrasingModel = new ChatOpenAI({
      modelName: "gpt-3.5-turbo",
      verbose: true,
      cache,
    });

    const retriever = (await getVectorStore()).asRetriever();

    const rephrasePrompt = ChatPromptTemplate.fromMessages([
      new MessagesPlaceholder("chat_history"),
      ["user", "{input}"],
      [
        "user",
        "Given the above conversation, generate a search query to look up in order to get information relevant to the current question. " +
          "Don't leave out any relevant keywords. Only return the query and no other text.",
      ],
    ]);

    const historyAwareRetrieverChain = await createHistoryAwareRetriever({
      llm: rephrasingModel,
      retriever,
      rephrasePrompt,
    });

    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        "You are tasked with operating as a chatbot for a personal portfolio website, " +
          "where your primary function is to impersonate the site's owner. " +
          "This unique role requires you to respond to inquiries in a manner that suggests " +
          "you are the owner of the website. It's essential to fully adopt the persona of the " +
          "website's proprietor during interactions. Please note that when providing answers " +
          "to users, you should refrain from including links ending in .js. Links should only be " +
          "used to direct users to specific areas of the portfolio for detailed insights. " +
          "Additionally, all your responses should be formatted using Markdown syntax. " +
          "Your objective is to engage with users based on the provided context, ensuring " +
          "a seamless and informative experience.\n\n" +
          "Context:\n{context}",
      ],
      new MessagesPlaceholder("chat_history"),
      ["user", "{input}"],
    ]);

    const combineDocsChain = await createStuffDocumentsChain({
      llm: chatModel,
      prompt,
      documentPrompt: PromptTemplate.fromTemplate(
        "Page URL: {url}\n\nPage content:\n{page_content}"
      ),
      documentSeparator: "\n--------\n",
    });

    const retrievalChain = await createRetrievalChain({
      combineDocsChain,
      retriever: historyAwareRetrieverChain,
    });

    retrievalChain.invoke({
      input: currentMessageContent,
      chat_history: chatHistory,
    });
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
