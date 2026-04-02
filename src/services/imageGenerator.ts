import { GoogleGenAI } from "@google/genai";

export async function generateImages() {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || process.env.GEMINI_API_KEY });
  
  const prompts = [
    {
      id: "hero",
      prompt: "A high-end, professional photo of a modern woman entrepreneur in her 30s, standing in a sleek, futuristic vertical hydroponic farm. Soft LED lighting, vibrant green microgreens on minimalist metal shelves. Emerald green and silver color palette. High-definition, architectural photography style.",
      aspectRatio: "4:5"
    },
    {
      id: "tech",
      prompt: "Macro photography of a high-tech hydroponic water delivery system. Crystal clear water droplets on vibrant emerald green leaves. Sleek, minimalist design, futuristic agricultural technology. High-end, clean aesthetic.",
      aspectRatio: "16:9"
    },
    {
      id: "harvest",
      prompt: "Close-up of professional hands carefully harvesting fresh microgreens with precision tools in a sterile, modern indoor farm. Vibrant greens, soft lighting, high-end culinary photography.",
      aspectRatio: "16:9"
    },
    {
      id: "gallery1",
      prompt: "Minimalist close-up of vibrant green basil microgreens with delicate water droplets. Soft, clean background, high-end food photography.",
      aspectRatio: "1:1"
    },
    {
      id: "gallery2",
      prompt: "Vibrant purple-stemmed radish microgreens, high contrast, minimalist white background, professional macro photography.",
      aspectRatio: "1:1"
    },
    {
      id: "gallery3",
      prompt: "Fresh arugula microgreens, crisp texture, vibrant green, minimalist aesthetic, high-end photography.",
      aspectRatio: "1:1"
    },
    {
      id: "gallery4",
      prompt: "Sunflower microgreens, bright yellow and green, high-definition close-up, minimalist background.",
      aspectRatio: "1:1"
    },
    {
      id: "packaging",
      prompt: "High-end, minimalist packaging for microgreens. Sleek white box with emerald green branding, 'Hilal'in Yeşili' logo, professional product photography.",
      aspectRatio: "1:1"
    }
  ];

  const results = {};

  for (const p of prompts) {
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image-preview',
      contents: {
        parts: [{ text: p.prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: p.aspectRatio as any,
          imageSize: "1K"
        }
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        results[p.id] = `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  }

  return results;
}
