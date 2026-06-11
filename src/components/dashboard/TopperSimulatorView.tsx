'use client';

import { BoardReadiness } from '@/lib/agents/topper-simulator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress, ProgressTrack, ProgressIndicator } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Target, Calendar, AlertTriangle, Activity, Zap, Cpu } from 'lucide-react';

interface TopperSimulatorViewProps {
  data: BoardReadiness;
}

export function TopperSimulatorView({ data }: TopperSimulatorViewProps) {
  return (
    <div className="space-y-6">
      <Card className="glass border-primary/20 overflow-hidden relative group">
        {/* Animated Background Element */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-[80px] group-hover:bg-primary/10 transition-colors" />
        
        <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <CardTitle className="text-xl font-bold tracking-widest uppercase">System_Readiness_Report</CardTitle>
            </div>
            <p className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase italic">Target: Rank 1 Gujarat State Board • Protocol Alpha-7</p>
          </div>
          <Cpu className="w-8 h-8 text-primary/40" />
        </CardHeader>

        <CardContent className="pt-8 space-y-10">
          {/* Main Vector */}
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">Syllabus_Completion_Vector</span>
                <div className="text-3xl font-black tracking-tighter glow-text">{Math.round(data.completionPercentage)}%</div>
              </div>
              <div className="text-right">
                 <span className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase block mb-1">Status</span>
                 {data.isAheadOfSchedule ? (
                  <Badge className="bg-green-500/10 text-green-400 border-green-500/20 font-mono text-[10px] rounded-none px-3 py-1 uppercase tracking-widest">Nominal</Badge>
                ) : (
                  <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20 font-mono text-[10px] rounded-none px-3 py-1 uppercase tracking-widest">Sub-Optimal</Badge>
                )}
              </div>
            </div>
            <Progress value={data.completionPercentage}>
              <ProgressTrack className="h-1.5 bg-white/5 rounded-none">
                <ProgressIndicator className="bg-primary shadow-[0_0_15px_rgba(var(--primary),0.5)] transition-all duration-1000" />
              </ProgressTrack>
            </Progress>
          </div>

          {/* Tactical Grid Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricBox 
              label="Mission_Days_Left" 
              value={data.daysRemaining.toString()} 
              icon={<Calendar className="w-3 h-3" />} 
            />
            <MetricBox 
              label="Required_Daily_Load" 
              value={`${data.requiredDailyHours}H`} 
              icon={<Zap className="w-3 h-3" />} 
              highlight 
            />
            <MetricBox 
              label="System_Uptime" 
              value="99.8%" 
              icon={<Activity className="w-3 h-3" />} 
            />
            <MetricBox 
              label="Deficit_Delta" 
              value={`${data.chapterDeficit} CH`} 
              icon={<Target className="w-3 h-3" />} 
              alert={data.chapterDeficit > 0}
            />
          </div>
        </CardContent>
      </Card>

      {!data.isAheadOfSchedule && (
        <div className="relative group overflow-hidden">
          <div className="absolute inset-0 bg-destructive/5 animate-pulse-slow" />
          <div className="relative p-6 border border-destructive/20 glass flex items-start gap-4">
            <div className="bg-destructive/10 p-2 border border-destructive/20">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-mono font-bold text-destructive uppercase tracking-widest">Tactical Alert: Objective at Risk</h4>
              <p className="text-[11px] font-mono text-muted-foreground uppercase leading-relaxed tracking-wider">
                Current pace is <span className="text-destructive font-bold">{data.chapterDeficit} chapters</span> behind mission-critical milestones. 
                System is recalculating study vectors to compensate for the delta over the next 168 hours.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MetricBox({ label, value, icon, highlight = false, alert = false }: { label: string, value: string, icon: React.ReactNode, highlight?: boolean, alert?: boolean }) {
  return (
    <div className={`p-4 border transition-all ${alert ? 'border-destructive/30 bg-destructive/5' : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05]'}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className={`${alert ? 'text-destructive' : highlight ? 'text-primary' : 'text-muted-foreground'}`}>
          {icon}
        </div>
        <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest truncate">{label}</span>
      </div>
      <div className={`text-xl font-bold font-mono tracking-tighter ${alert ? 'text-destructive' : highlight ? 'text-primary' : 'text-white'}`}>
        {value}
      </div>
    </div>
  );
}
