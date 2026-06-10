import { createClient } from '@/utils/supabase/server';

export interface BoardReadiness {
  completionPercentage: number;
  daysRemaining: number;
  requiredDailyHours: number;
  targetCompletionDate: string;
  isAheadOfSchedule: boolean;
  chapterDeficit: number;
}

const SYLLABUS_DEADLINE = new Date('2026-08-22');

export async function getBoardReadiness(userId: string): Promise<BoardReadiness> {
  const supabase = await createClient();
  const today = new Date();

  // Get total chapters vs completed chapters
  const { data: chapters, error: cError } = await supabase
    .from('chapters')
    .select('id');
  
  const { count: completedCount, error: scError } = await supabase
    .from('tasks')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('status', 'completed')
    .eq('task_type', 'Learn');

  if (cError || scError) throw new Error('Failed to fetch syllabus data');

  const totalChapters = chapters.length;
  const completionPercentage = (completedCount || 0) / totalChapters * 100;
  
  const daysRemaining = Math.ceil((SYLLABUS_DEADLINE.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  const remainingChapters = totalChapters - (completedCount || 0);
  const chaptersPerDayRequired = remainingChapters / (daysRemaining > 0 ? daysRemaining : 1);
  
  // Assuming average 10 hours per chapter for simplicity in this metric
  const requiredDailyHours = chaptersPerDayRequired * 10;

  return {
    completionPercentage,
    daysRemaining,
    requiredDailyHours: Math.round(requiredDailyHours * 10) / 10,
    targetCompletionDate: '2026-08-22',
    isAheadOfSchedule: chaptersPerDayRequired <= 0.25, // Arbitrary "on track" threshold
    chapterDeficit: Math.max(0, Math.ceil(remainingChapters - (daysRemaining * 0.2)))
  };
}
