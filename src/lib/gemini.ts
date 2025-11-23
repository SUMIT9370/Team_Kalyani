import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function summarizeText(text: string, mode: string) {
  // Check if the API key is configured. If not, return an informative error.
  if (!API_KEY) {
    const errorMessage = "Error: Gemini API key is not configured. Please set the VITE_GEMINI_API_KEY in your .idx/dev.nix file and reload the environment.";
    console.error(errorMessage);
    return errorMessage;
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  // Use the stable 'gemini-pro' model to fix the 404 error.
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Summarize the following text in ${mode} format:\n\n${text}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();
    return summary;
  } catch (error) {
    console.error("Error summarizing text:", error);
    // Expose the specific error message from the Gemini API to the UI.
    if (error instanceof Error) {
      return `Error from Gemini API: ${error.message}`;
    }
    return "An unknown error occurred while communicating with the Gemini API.";
  }
}
