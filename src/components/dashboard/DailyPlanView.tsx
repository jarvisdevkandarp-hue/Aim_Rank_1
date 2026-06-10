'use client';

import { useStudyStore } from '@/store/useStudyStore';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock, BookOpen, GraduationCap } from 'lucide-react';

export function DailyPlanView() {
  const { currentPlan, isLoading } = useStudyStore();

  if (isLoading) {
    return <div className="p-8 text-center">Generating your Rank-1 schedule...</div>;
  }

  if (!currentPlan) {
    return (
      <Card className="w-full max-w-2xl mx-auto mt-10">
        <CardContent className="p-10 text-center text-muted-foreground">
          No active plan for today. Click &quot;Generate Plan&quot; to start your mission.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mission Schedule</h1>
          <p className="text-muted-foreground">{new Date(currentPlan.date).toDateString()}</p>
        </div>
        <div className="text-right">
          <Badge variant="outline" className="text-lg py-1 px-3">
            {currentPlan.totalHours}h Study | {currentPlan.sleepHours}h Sleep
          </Badge>
        </div>
      </div>

      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-4">
          {currentPlan.blocks.map((block, index) => (
            <Card key={index} className="overflow-hidden border-l-4 border-l-primary">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <div className="bg-primary/10 p-2 rounded-lg h-fit">
                      {block.taskType === 'Practice' ? (
                        <GraduationCap className="text-primary w-5 h-5" />
                      ) : (
                        <BookOpen className="text-primary w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{block.subject}</h3>
                      <p className="text-sm text-muted-foreground">{block.chapter}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary">{block.taskType}</Badge>
                        <Badge variant={block.priority === 'High' ? 'destructive' : 'outline'}>
                          {block.priority} Priority
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm font-medium">
                      <Clock className="w-4 h-4" />
                      {block.startTime} - {block.endTime}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{block.duration} mins</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
