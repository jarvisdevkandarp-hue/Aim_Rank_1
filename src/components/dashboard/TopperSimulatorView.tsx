'use client';

import { BoardReadiness } from '@/lib/agents/topper-simulator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Target, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';

interface TopperSimulatorViewProps {
  data: BoardReadiness;
}

export function TopperSimulatorView({ data }: TopperSimulatorViewProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white border-none shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold tracking-tight">Board Topper Simulator</CardTitle>
            <p className="text-indigo-200 text-sm">Target: Rank 1 Gujarat | Completion by Aug 22</p>
          </div>
          <Target className="w-10 h-10 text-indigo-400 opacity-50" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Overall Syllabus Progress</span>
              <span>{Math.round(data.completionPercentage)}%</span>
            </div>
            <Progress value={data.completionPercentage} className="h-3 bg-white/10" indicatorClassName="bg-indigo-400" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <p className="text-xs text-indigo-200 uppercase font-bold tracking-wider mb-1">Days Left</p>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-400" />
                <span className="text-xl font-bold">{data.daysRemaining}</span>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <p className="text-xs text-indigo-200 uppercase font-bold tracking-wider mb-1">Daily Goal</p>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-indigo-300">{data.requiredDailyHours}h</span>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <p className="text-xs text-indigo-200 uppercase font-bold tracking-wider mb-1">Status</p>
              <div className="flex items-center gap-2">
                {data.isAheadOfSchedule ? (
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Ahead</Badge>
                ) : (
                  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">Behind</Badge>
                )}
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <p className="text-xs text-indigo-200 uppercase font-bold tracking-wider mb-1">Deficit</p>
              <div className="flex items-center gap-2">
                <span className={`text-xl font-bold ${data.chapterDeficit > 0 ? 'text-orange-400' : 'text-green-400'}`}>
                  {data.chapterDeficit} Ch
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {!data.isAheadOfSchedule && (
        <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950/20 dark:border-orange-900">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-bold text-orange-800 dark:text-orange-400">Rank-1 Alert: Behind Schedule</p>
              <p className="text-orange-700 dark:text-orange-300/80">
                You are currently {data.chapterDeficit} chapters behind the topper's pace. The Planner Agent will redistribute these chapters into your upcoming 7 days. Avoid further missed tasks.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
