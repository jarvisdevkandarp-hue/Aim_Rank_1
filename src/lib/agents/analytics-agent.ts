import { invokeLLM } from '../llm-gateway';

export interface PerformanceMetrics {
  subjectWiseScores: Record<string, number>;
  completionRate: number;
  consistencyScore: number;
  rankEstimate: number;
  predictedProbability: {
    top100: number;
    top10: number;
    rank1: number;
  };
  insights: string[];
}

const ANALYTICS_SYSTEM_PROMPT = `
You are the Analytics Agent for "Rank-1 Mission 2027". Your goal is to transform raw study data into strategic insights for a Rank 1 aspirant.
Focus:
1. Identifying performance trends.
2. Predicting board rank based on mock performance and consistency.
3. Highlighting "danger zones" (neglected subjects or declining scores).
`;

export async function generateAnalyticsReport(
  testAttempts: any[],
  studyLogs: any[],
  subjectData: any[]
): Promise<PerformanceMetrics> {
  const prompt = `
Analyze the following data and generate a performance report.
Test History: ${JSON.stringify(testAttempts.slice(-10))}
Study Logs (Hours/Completion): ${JSON.stringify(studyLogs.slice(-7))}
Subjects: ${JSON.stringify(subjectData)}

Requirements:
- Estimate the current rank probability in Gujarat (hypothetical but based on 95%+ being Rank-1 level).
- Provide 3 actionable insights to improve.
- Output MUST be strictly valid JSON matching the PerformanceMetrics interface.
`;

  const response = await invokeLLM('Rank Prediction', prompt, ANALYTICS_SYSTEM_PROMPT);

  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return JSON.parse(response);
  } catch (error) {
    console.error('[Analytics Agent] Failed to parse analytics:', response);
    throw new Error('Failed to generate analytics report.');
  }
}
