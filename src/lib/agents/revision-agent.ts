import { createClient } from '@/utils/supabase/server';

export interface RevisionTask {
  chapterId: string;
  chapterName: string;
  subjectName: string;
  revisionNumber: number;
  scheduledDate: string;
}

const REVISION_INTERVALS = [1, 3, 7, 14, 30, 60];

export async function scheduleRevision(
  userId: string,
  chapterId: string
): Promise<void> {
  const supabase = await createClient();
  const today = new Date();

  const revisionTasks = REVISION_INTERVALS.map((days, index) => {
    const scheduledDate = new Date(today);
    scheduledDate.setDate(today.getDate() + days);

    return {
      user_id: userId,
      chapter_id: chapterId,
      revision_number: index + 1,
      scheduled_date: scheduledDate.toISOString().split('T')[0],
      status: 'pending'
    };
  });

  const { error } = await supabase
    .from('revision_queue')
    .insert(revisionTasks);

  if (error) {
    console.error('[Revision Agent] Error scheduling revisions:', error);
    throw error;
  }
}

export async function getPendingRevisions(
  userId: string,
  date: string
): Promise<RevisionTask[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('revision_queue')
    .select(`
      revision_number,
      scheduled_date,
      chapters (
        id,
        name,
        subjects (
          name
        )
      )
    `)
    .eq('user_id', userId)
    .eq('scheduled_date', date)
    .eq('status', 'pending');

  if (error) {
    console.error('[Revision Agent] Error fetching revisions:', error);
    throw error;
  }

  return data.map((item: any) => ({
    chapterId: item.chapters.id,
    chapterName: item.chapters.name,
    subjectName: item.chapters.subjects.name,
    revisionNumber: item.revision_number,
    scheduledDate: item.scheduled_date
  }));
}

export async function markRevisionComplete(
  userId: string,
  chapterId: string,
  revisionNumber: number,
  retentionScore: number
): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase
    .from('revision_queue')
    .update({
      status: 'completed',
      completed_at: new Date().toISOString(),
      retention_score: retentionScore
    })
    .match({
      user_id: userId,
      chapter_id: chapterId,
      revision_number: revisionNumber
    });

  if (error) {
    console.error('[Revision Agent] Error completing revision:', error);
    throw error;
  }
}
