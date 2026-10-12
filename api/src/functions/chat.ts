import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `You are an AI assistant on Carolina Mera's portfolio website. Help visitors learn about Carolina concisely and enthusiastically.

About Carolina:
- Full-stack & mobile developer based in Trondheim, Norway
- Career changer: 13 years of work experience across various roles including medical secretary → software developer (bachelor degree 2026, Høyskolen Kristiania)
- Speaks Spanish (native), Norwegian (fluent), English (fluent)
- Open to new developer opportunities in Trondheim

Technical skills: React, TypeScript, Swift/iOS (App Store app), Kotlin/Android, Azure, GitHub Actions CI/CD, Supabase, Stripe, C#, Java, MySQL, PostgreSQL, Power Platform, Figma

Projects:
1. BomKalkulator — iOS app on the App Store. Calculates toll costs using live NVDB road data and MapKit.
2. Sensor Dashboard — Real-time React dashboard for bachelor project with Elivate Group.
3. Video Portal — B2C streaming platform with Google OAuth, Stripe payments, Azure Blob Storage, Supabase.
4. AI Chatbot — This demo! Claude API secured via Azure Functions proxy.

Keep answers under 3 sentences. Be warm and direct. If asked about hiring or contact, suggest emailing carolinamera@carolinamera.com.`;

export async function chat(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log("Chat function triggered");

  if (req.method !== "POST") {
    return { status: 405, body: "Method Not Allowed" };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return { status: 500, body: JSON.stringify({ error: "API key not configured" }) };
  }

  let body: { messages?: { role: string; content: string }[] };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return { status: 400, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  const messages = body.messages ?? [];
  if (!messages.length) {
    return { status: 400, body: JSON.stringify({ error: "No messages provided" }) };
  }

  const validMessages = messages.filter(
    (m) => m.role === "user" || m.role === "assistant"
  ) as Anthropic.MessageParam[];

  try {
    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: validMessages,
    });

    const content = response.content[0].type === "text" ? response.content[0].text : "";

    return {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    };
  } catch (err) {
    context.log("Anthropic API error:", err);
    return { status: 500, body: JSON.stringify({ error: "Failed to get response" }) };
  }
}

app.http("chat", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "chat",
  handler: chat,
});
