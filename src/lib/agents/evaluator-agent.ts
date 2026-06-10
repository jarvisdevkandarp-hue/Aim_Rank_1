import { invokeLLM } from '../llm-gateway';
import { Test, Question } from './examiner-agent';

export interface EvaluationResult {
  questionId: string;
  marksObtained: number;
  maxMarks: number;
  feedback: string;
  isCorrect: boolean;
  idealAnswer?: string;
}

export interface TestAttemptSummary {
  totalScore: number;
  maxScore: number;
  accuracy: number;
  evaluations: EvaluationResult[];
  generalFeedback: string;
  weakTopics: string[];
}

const EVALUATOR_SYSTEM_PROMPT = `
You are the "Rank-1 Examiner Agent". Your role is to evaluate student answers for GSEB Class 10 with the precision of a state-board topper examiner.
Evaluation Rules:
1. Step Marking: Award partial marks for correct steps even if the final answer is wrong.
2. Presentation: Provide feedback on how to improve answer structuring for maximum marks.
3. Content: Check for keyword accuracy based on the GSEB syllabus.
4. Output: Return a JSON object matching the TestAttemptSummary interface.
`;

export async function evaluateTestAttempt(
  test: Test,
  userAnswers: Record<string, string>
): Promise<TestAttemptSummary> {
  const prompt = `
Evaluate the following test attempt.
Test Subject: ${test.subject}
Difficulty: ${test.difficulty}

Questions & Answers:
${test.questions.map(q => `
Q: ${q.question} (Type: ${q.type}, Max Marks: ${q.marks})
Expected: ${q.correctAnswer}
Student Answer: ${userAnswers[q.id] || '[No Answer Provided]'}
`).join('\n')}

Requirements:
- For MCQs, check for exact matches.
- For subjective (VSA, SA, LA), use GSEB board criteria.
- Identify weak topics based on errors.
- Provide a summary and general feedback.
`;

  const response = await invokeLLM('Answer Sheet Evaluation', prompt, EVALUATOR_SYSTEM_PROMPT);

  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return JSON.parse(response);
  } catch (error) {
    console.error('[Evaluator Agent] Failed to parse evaluation:', response);
    throw new Error('Failed to evaluate test attempt.');
  }
}
