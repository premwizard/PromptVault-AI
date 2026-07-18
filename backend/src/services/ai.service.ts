import { generateText, streamText, embed, LanguageModelV1 } from 'ai';
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { google } from '@ai-sdk/google';

export type AiProvider = 'openai' | 'anthropic' | 'gemini' | 'groq';

export interface AiRequestOptions {
  provider: AiProvider;
  model: string;
  temperature?: number;
  maxTokens?: number;
}

export class AiService {
  /**
   * Resolve the AI provider to the appropriate Vercel AI SDK language model.
   */
  private static getModel(provider: AiProvider, modelName: string): LanguageModelV1 {
    switch (provider) {
      case 'openai':
        return openai(modelName || 'gpt-4o');
      case 'anthropic':
        return anthropic(modelName || 'claude-3-5-sonnet-20240620');
      case 'gemini':
        return google(modelName || 'models/gemini-1.5-pro-latest');
      case 'groq':
        // Groq uses OpenAI compatible endpoints via @ai-sdk/openai if configured, 
        // but for now we'll default to a proxy or standard openAI init with custom baseURL
        // In a real app we'd configure a custom openai instance: 
        // createOpenAI({ baseURL: 'https://api.groq.com/openai/v1', apiKey: process.env.GROQ_API_KEY })
        throw new Error('Groq support is pending API key configuration.');
      default:
        return openai('gpt-4o-mini');
    }
  }

  /**
   * Generate text using the preferred AI provider.
   */
  static async generate(prompt: string, options: AiRequestOptions): Promise<string> {
    const model = this.getModel(options.provider, options.model);
    
    const { text } = await generateText({
      model,
      prompt,
      temperature: options.temperature ?? 0.7,
      maxTokens: options.maxTokens ?? 1500,
    });
    
    return text;
  }

  /**
   * Stream text response using the preferred AI provider.
   */
  static async stream(prompt: string, options: AiRequestOptions) {
    const model = this.getModel(options.provider, options.model);
    
    return streamText({
      model,
      prompt,
      temperature: options.temperature ?? 0.7,
      maxTokens: options.maxTokens ?? 2000,
    });
  }

  /**
   * Generate embeddings for semantic search (defaults to OpenAI).
   */
  static async getEmbedding(text: string): Promise<number[]> {
    const { embedding } = await embed({
      model: openai.embedding('text-embedding-3-small'),
      value: text,
    }); 
    
    return embedding;
  }
}
