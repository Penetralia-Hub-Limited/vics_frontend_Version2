import { GoogleGenAI } from "@google/genai";

// Add paragraphs to long text
export function addParagraphs(text: string): string {
  return text.split(/(?<=[.?!])\s+/).reduce((acc, sentence, idx) => {
    return acc + sentence + (idx % 2 === 1 ? "\n\n" : " ");
  }, "");
}

// Get response data from Gemini AI
const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

export async function GeminiGenerateContent(
  history: { role: "user" | "model"; parts: { text: string }[] }[]
) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: history,
  });
  return response.text;
}
