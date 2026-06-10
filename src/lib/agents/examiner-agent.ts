import { invokeLLM } from '../llm-gateway';

export interface Question {
  id: string;
  type: 'MCQ' | 'VSA' | 'SA' | 'LA' | 'CaseStudy' | 'AssertionReason';
  question: string;
  options?: string[]; // For MCQs
  correctAnswer: string;
  explanation: string;
  marks: number;
}

export interface Test {
  id: string;
  subject: string;
  chapters: string[];
  type: 'Chapter' | 'Weekly' | 'Monthly' | 'FullSyllabus';
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'BoardLevel' | 'Rank-1';
  questions: Question[];
  totalMarks: number;
  durationMinutes: number;
}

const EXAMINER_SYSTEM_PROMPT = `
You are the Examiner Agent for "Rank-1 Mission 2027". Your goal is to generate high-quality GSEB Class 10 board-pattern questions.
Question Types:
- MCQ: Multiple Choice Questions (1 mark)
- VSA: Very Short Answer (1 mark)
- SA: Short Answer (2-3 marks)
- LA: Long Answer (5 marks)
- CaseStudy: Context-based questions
- AssertionReason: Logical reasoning questions

Difficulty Levels:
- Easy: Basic recall
- Medium: Understanding and application
- Hard: Complex application
- BoardLevel: Exactly matching GSEB board difficulty
- Rank-1: Challenging questions to ensure state-topper readiness

Output MUST be valid JSON matching the Test interface. Ensure high academic accuracy.
`;

export async function generateTest(
  subject: string,
  chapters: string[],
  testType: 'Chapter' | 'Weekly' | 'Monthly' | 'FullSyllabus',
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'BoardLevel' | 'Rank-1'
): Promise<Test> {
  const prompt = `
Generate a ${testType} test for ${subject}.
Chapters included: ${chapters.join(', ')}
Difficulty: ${difficulty}

Requirements:
- Balance the question types based on the test type.
- Total marks should be appropriate for the type (e.g., 25 for Chapter, 50 for Weekly, 80 for Full).
- Include detailed explanations for every question for the answer key.
- Ensure the questions follow the latest GSEB board pattern.
`;

  const response = await invokeLLM('Test Generation', prompt, EXAMINER_SYSTEM_PROMPT);

  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return JSON.parse(response);
  } catch (error) {
    console.error('[Examiner Agent] Failed to parse Test response:', response);
    throw new Error('Failed to generate valid test.');
  }
}
