import { NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";
import { ConfigurableSearchEngine } from "../../../lib/search";

// Initialize Gemini and Search Engine
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
const searchEngine = new ConfigurableSearchEngine("tavily", ["serper", "google"]);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { topic, duration = 60, language = "English", tone = "Conversational" } = body;

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    // Step 1: Gather Live Internet Research
    const searchResponse = await searchEngine.search(topic, { maxResults: 5 });
    const researchContext = searchResponse.results
      .map((item, index) => `[Source ${index + 1}]: ${item.title}\nURL: ${item.url}\nSummary: ${item.snippet}`)
      .join("\n\n");

    // Step 2: Build Structured System Prompt for Gemini
    const prompt = `
You are an expert Instagram scriptwriter and research analyst.
Write a concise, high-retention Instagram Reel script using the following verified research context.

[TOPIC]
${topic}

[CONSTRAINTS]
Target Duration: ${duration} seconds
Language: ${language}
Tone: ${tone}

[LIVE RESEARCH CONTEXT]
${researchContext}

[RULES]
1. Base all factual claims strictly on the research provided above.
2. Hook the audience in the first 3 seconds.
3. Keep sentences punchy and conversational for rapid delivery.
4. Return output strictly in JSON format matching the schema.
`;

    // Step 3: Call Gemini API with Structured Output Schema
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            hook: { type: Type.STRING },
            script_content: { type: Type.STRING },
            word_count: { type: Type.INTEGER },
            estimated_duration_seconds: { type: Type.INTEGER },
          },
          required: ["title", "hook", "script_content", "word_count", "estimated_duration_seconds"],
        },
      },
    });

    const scriptOutput = JSON.parse(response.text || "{}");

    // Step 4: Return Generated Script + Discovered Sources
    return NextResponse.json({
      success: true,
      script: scriptOutput,
      researchProvider: searchResponse.providerUsed,
      sources: searchResponse.results,
    });
  } catch (error: any) {
    console.error("Script Generation Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate script" },
      { status: 500 }
    );
  }
}