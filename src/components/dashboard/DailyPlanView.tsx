'use client';

import { useStudyStore } from '@/store/useStudyStore';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock, BookOpen, GraduationCap, ChevronRight, Hash, Layers } from 'lucide-react';

export function DailyPlanView() {
  const { currentPlan, isLoading } = useStudyStore();

  if (isLoading) {
    return (
      <div className="p-20 text-center space-y-4 animate-pulse">
        <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs font-mono tracking-[0.3em] text-primary uppercase">Synchronizing_Mission_Parameters...</p>
      </div>
    );
  }

  if (!currentPlan) {
    return (
      <div className="p-20 text-center glass border-dashed">
        <Hash className="w-12 h-12 text-white/10 mx-auto mb-4" />
        <h3 className="text-lg font-bold mb-2 tracking-widest uppercase">No_Active_Directives</h3>
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest max-w-xs mx-auto leading-relaxed">
          Request tactical pathing via the mainframe to generate mission-critical study vectors.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/5 border border-white/5 p-6 glass">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 border border-primary/30 flex items-center justify-center bg-primary/5">
             <Layers className="text-primary w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest block mb-1">Operational_Window</span>
            <h3 className="text-xl font-bold tracking-tighter uppercase">{new Date(currentPlan.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</h3>
          </div>
        </div>
        <div className="flex gap-4">
           <StatusMetric label="Study_Volume" value={`${currentPlan.totalHours}H`} />
           <StatusMetric label="Recovery_Phase" value={`${currentPlan.sleepHours}H`} />
        </div>
      </div>

      <div className="grid gap-4">
        {currentPlan.blocks.map((block, index) => (
          <div key={index} className="group relative flex items-stretch">
            {/* Timeline Connector */}
            <div className="w-px bg-white/5 absolute left-[26px] top-full h-4 -z-10 last:hidden" />
            
            <div className="w-[52px] flex flex-col items-center pt-6">
              <div className="w-4 h-4 rounded-full border border-primary/50 bg-background flex items-center justify-center group-hover:scale-125 transition-transform">
                <div className={`w-1.5 h-1.5 rounded-full ${block.priority === 'High' ? 'bg-primary animate-pulse' : 'bg-white/20'}`} />
              </div>
            </div>

            <Card className="flex-1 rounded-none bg-white/[0.02] border-white/5 group-hover:bg-white/[0.04] transition-all group-hover:border-primary/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 font-mono text-[9px] text-white/5">BLOCK_{index + 1}</div>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex gap-6 items-start">
                    <div className="w-14 h-14 border border-white/5 flex items-center justify-center bg-white/[0.02] text-muted-foreground group-hover:text-primary transition-colors">
                      {block.taskType === 'Practice' ? (
                        <GraduationCap className="w-7 h-7" />
                      ) : (
                        <BookOpen className="w-7 h-7" />
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h4 className="text-lg font-bold tracking-tight uppercase group-hover:glow-text transition-all">{block.subject}</h4>
                        <Badge variant="outline" className="font-mono text-[9px] uppercase tracking-widest border-primary/20 text-primary rounded-none">
                          {block.taskType}
                        </Badge>
                      </div>
                      <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest leading-relaxed">Directive: {block.chapter}</p>
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-col justify-between items-end gap-2">
                    <div className="flex items-center gap-2 font-mono text-xs text-white tracking-widest">
                      <Clock className="w-3 h-3 text-primary" />
                      {block.startTime} - {block.endTime}
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">{block.duration} MINS</span>
                       <div className={`px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest border ${block.priority === 'High' ? 'border-destructive/30 text-destructive bg-destructive/5' : 'border-white/10 text-muted-foreground'}`}>
                         {block.priority}_PRIORITY
                       </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusMetric({ label, value }: { label: string, value: string }) {
  return (
    <div className="bg-white/5 border border-white/5 px-4 py-2 min-w-[100px]">
      <span className="text-[8px] font-mono text-muted-foreground uppercase tracking-[0.2em] block mb-1">{label}</span>
      <span className="text-sm font-bold font-mono tracking-tighter text-white">{value}</span>
    </div>
  );
}
