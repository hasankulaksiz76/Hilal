import { GoogleGenAI } from "@google/genai";

export async function generateImages() {
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
  
  if (!apiKey || apiKey === "undefined" || apiKey === "") {
    console.error("API key is missing or invalid.");
    throw new Error("API anahtarı bulunamadı. Lütfen sağ üstteki ayarlardan API anahtarınızı seçin.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
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

  const withRetry = async (fn: () => Promise<any>, id: string, retries = 3, delay = 2000) => {
    for (let i = 0; i < retries; i++) {
      try {
        return await fn();
      } catch (error: any) {
        const isRetryable = error?.error?.code === 503 || error?.error?.code === 429 || error?.message?.includes("high demand");
        if (isRetryable && i < retries - 1) {
          const backoff = delay * Math.pow(2, i);
          console.warn(`Retrying image generation for ${id} in ${backoff}ms (Attempt ${i + 1}/${retries})...`);
          await new Promise(resolve => setTimeout(resolve, backoff));
          continue;
        }
        throw error;
      }
    }
  };

  await Promise.all(prompts.map(async (p) => {
    try {
      const response = await withRetry(async () => {
        return await ai.models.generateContent({
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
      }, p.id);

      if (response && response.candidates && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            results[p.id] = `data:image/png;base64,${part.inlineData.data}`;
            console.log(`Successfully generated image for: ${p.id}`);
          }
        }
      }
    } catch (error) {
      console.error(`Failed to generate image for ${p.id} after retries:`, error);
    }
  }));

  console.log("Total images generated:", Object.keys(results).length);
  return results;
}
