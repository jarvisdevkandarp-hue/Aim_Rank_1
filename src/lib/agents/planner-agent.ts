import { invokeLLM } from '../llm-gateway';

export interface StudyBlock {
  subject: string;
  chapter: string;
  startTime: string;
  endTime: string;
  duration: number;
  taskType: 'Read' | 'Learn' | 'Practice' | 'Revise' | 'Test' | 'Mistake Analysis';
  priority: 'High' | 'Medium' | 'Low';
}

export interface DailySchedule {
  date: string;
  blocks: StudyBlock[];
  totalHours: number;
  sleepHours: number;
}

const COACHING_SCHEDULE = {
  Tuesday: { start: '15:30', end: '21:00' },
  Thursday: { start: '15:30', end: '21:00' },
  Saturday: { start: '15:30', end: '21:00' }
};

const SYSTEM_PROMPT = `
You are the Planner Agent for "Rank-1 Mission 2027". Your goal is to create a production-grade academic schedule for a GSEB Class 10 student targeting Rank 1.
Constraints:
1. Minimum 7.5 hours of sleep.
2. Coaching blocks (Tuesday, Thursday, Saturday 15:30 - 21:00) are SACROSANCT. No study tasks during these times.
3. Syllabus must be completed by 22 August 2026.
4. Distribute subjects based on weightage (Math: 30%, Science: 30%, etc.).
5. Output MUST be valid JSON matching the DailySchedule interface.
`;

export async function generateDailyPlan(
  userId: string,
  date: string,
  progressMetrics: any,
  upcomingTests: any[]
): Promise<DailySchedule> {
  const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
  const coaching = (COACHING_SCHEDULE as any)[dayOfWeek];

  const prompt = `
Generate a study plan for ${date} (${dayOfWeek}).
Student Context:
- Progress Metrics: ${JSON.stringify(progressMetrics)}
- Upcoming Tests: ${JSON.stringify(upcomingTests)}
- Coaching Tomorrow: ${coaching ? `Yes, from ${coaching.start} to ${coaching.end}` : 'No'}

Requirements:
- Plan blocks around meals, sleep (min 7.5h), and coaching.
- Focus on priority subjects: Mathematics and Science.
- Include task types like 'Practice' for Math and 'Learn' for Science.
- Ensure the JSON output is strictly valid.
`;

  const response = await invokeLLM('Daily/Weekly Planning', prompt, SYSTEM_PROMPT);
  
  try {
    // Extract JSON from potential markdown code blocks
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return JSON.parse(response);
  } catch (error) {
    console.error('[Planner Agent] Failed to parse LLM response:', response);
    throw new Error('Failed to generate valid study plan.');
  }
}
