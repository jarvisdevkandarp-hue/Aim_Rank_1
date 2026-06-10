import { GoogleGenAI } from '@google/genai';
import { Groq } from 'groq-sdk';

// Multi-key support for high throughput
const getKeys = (prefix: string) => {
  return [
    process.env[`${prefix}_1`],
    process.env[`${prefix}_2`],
    process.env[`${prefix}_3`],
    process.env[`${prefix}_4`],
    process.env[`${prefix}_5`],
  ].filter(Boolean) as string[];
};

const groqKeys = getKeys('GROQ_API_KEY');
const geminiKeys = getKeys('GEMINI_API_KEY');

// Fallback to single keys if multiple are not provided
if (groqKeys.length === 0 && process.env.GROQ_API_KEY) groqKeys.push(process.env.GROQ_API_KEY);
if (geminiKeys.length === 0 && process.env.GEMINI_API_KEY) geminiKeys.push(process.env.GEMINI_API_KEY);

let groqCounter = 0;
let geminiCounter = 0;

const getGroqClient = () => {
  if (groqKeys.length === 0) throw new Error('No Groq API keys configured');
  const key = groqKeys[groqCounter % groqKeys.length];
  groqCounter++;
  return new Groq({ apiKey: key });
};

const getGeminiClient = () => {
  if (geminiKeys.length === 0) throw new Error('No Gemini API keys configured');
  const key = geminiKeys[geminiCounter % geminiKeys.length];
  geminiCounter++;
  return new GoogleGenAI({ apiKey: key });
};

export type TaskType = 'Daily/Weekly Planning' | 'Answer Sheet Evaluation' | 'Test Generation' | 'Rank Prediction' | 'Concept Explanation' | 'Motivation Messages';

interface ModelConfig {
  provider: 'Groq' | 'Google';
  model: string;
}

const FailoverConfig: Record<TaskType, ModelConfig[]> = {
  'Daily/Weekly Planning': [
    { provider: 'Groq', model: 'deepseek-r1-distill-llama-70b' },
    { provider: 'Groq', model: 'llama3-8b-8192' },
    { provider: 'Google', model: 'gemini-2.5-flash' },
    { provider: 'Google', model: 'gemini-2.5-pro' }
  ],
  'Answer Sheet Evaluation': [
    { provider: 'Google', model: 'gemini-2.5-pro' },
    { provider: 'Groq', model: 'deepseek-r1-distill-llama-70b' },
    { provider: 'Groq', model: 'llama3-8b-8192' },
    { provider: 'Google', model: 'gemini-2.5-flash' }
  ],
  'Test Generation': [
    { provider: 'Groq', model: 'deepseek-r1-distill-llama-70b' },
    { provider: 'Groq', model: 'llama3-8b-8192' },
    { provider: 'Google', model: 'gemini-2.5-pro' },
    { provider: 'Groq', model: 'mixtral-8x7b-32768' }
  ],
  'Rank Prediction': [
    { provider: 'Google', model: 'gemini-2.5-pro' },
    { provider: 'Groq', model: 'deepseek-r1-distill-llama-70b' },
    { provider: 'Groq', model: 'llama3-8b-8192' },
    { provider: 'Google', model: 'gemini-2.5-flash' }
  ],
  'Concept Explanation': [
    { provider: 'Groq', model: 'deepseek-r1-distill-llama-70b' },
    { provider: 'Google', model: 'gemini-2.5-pro' },
    { provider: 'Groq', model: 'llama3-8b-8192' },
    { provider: 'Groq', model: 'mixtral-8x7b-32768' }
  ],
  'Motivation Messages': [
    { provider: 'Google', model: 'gemini-2.5-flash' },
    { provider: 'Groq', model: 'llama3-8b-8192' },
    { provider: 'Groq', model: 'deepseek-r1-distill-llama-70b' },
    { provider: 'Groq', model: 'mixtral-8x7b-32768' }
  ]
};

export async function invokeLLM(taskType: TaskType, prompt: string, systemPrompt?: string): Promise<string> {
  const configQueue = FailoverConfig[taskType];
  let lastError = null;

  for (const config of configQueue) {
    try {
      if (config.provider === 'Groq') {
        const client = getGroqClient();
        const response = await client.chat.completions.create({
          messages: [
            ...(systemPrompt ? [{ role: 'system' as const, content: systemPrompt }] : []),
            { role: 'user' as const, content: prompt }
          ],
          model: config.model,
        });
        return response.choices[0]?.message?.content || '';
      } else if (config.provider === 'Google') {
         const client = getGeminiClient();
         const response = await client.models.generateContent({
           model: config.model,
           contents: prompt,
           config: {
             systemInstruction: systemPrompt,
           }
         });
         return response.text() || '';
      }
    } catch (error) {
      console.warn(`[LLM Gateway] ${config.provider} (${config.model}) failed for task '${taskType}':`, error);
      lastError = error;
      // Continue to next fallback (which might use a different key or a different provider)
    }
  }

  throw new Error(`[LLM Gateway] All models failed for task '${taskType}'. Last error: ${lastError}`);
}
