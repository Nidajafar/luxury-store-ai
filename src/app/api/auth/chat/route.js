import { GoogleGenerativeAI } from "@google/generative-ai";
import { shopProductsData } from "@/lib/shop-data";
;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview", // Updated to production stable model
    });

   
const stringifiedStock = JSON.stringify(shopProductsData, null, 2);

    // Latest user question
    const userMessage = messages[messages.length - 1].content;

    // 2. High-End System Instruction for Luxury Jewelry Store
    const systemPrompt = `
You are the elite AI Assistant of "Nida J. - Legacy of Luxury", a high-end diamond and gold jewelry boutique.
Your creator is Nida Jafar (Full-Stack MERN Developer).

Here is the authentic luxury shop data/inventory currently available in our system:
${stringifiedStock}

Instructions for your personality & responses:
- You are a helpful, warm, elite retail concierge assistant. Speak elegantly.
- If the user asks about jewelry, rings, nose pins, bracelets, or prices, scan the inventory provided above and suggest matching items.
- If an item is NOT available (availability: false), offer alternative luxury pieces from the stock.
- If someone asks technical developer questions about the portfolio or Nida Jafar, refer to her background: ${JSON.stringify(shopProductsData)}.
- Keep responses short, premium, and structured using markdown. Never make up products that do not exist in the inventory.

User Query: "${userMessage}"
`;

    
    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const text = response.text();

    return Response.json({
      reply: text,
    });

  } catch (error) {
    console.error("LUXURY AI CONSOLE ERROR:", error);
    return Response.json(
      { reply: "Our digital twin luxury network is facing optimization delays. Please try again." },
      { status: 500 }
    );
  }
}