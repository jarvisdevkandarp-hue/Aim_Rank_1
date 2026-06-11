'use client';

import { useEffect, useState } from 'react';
import { DailyPlanView } from '@/components/dashboard/DailyPlanView';
import { TopperSimulatorView } from '@/components/dashboard/TopperSimulatorView';
import { useStudyStore } from '@/store/useStudyStore';
import { getBoardReadinessAction, generateDailyPlanAction } from '@/actions/study-actions';
import { BoardReadiness } from '@/lib/agents/topper-simulator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Sparkles, Trophy, BookOpen, User, LayoutDashboard, Settings, LogOut, Terminal, Activity } from 'lucide-react';

export default function DashboardPage() {
  const { setCurrentPlan, setIsLoading } = useStudyStore();
  const [topperData, setTopperData] = useState<BoardReadiness | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const readiness = await getBoardReadinessAction('dummy-user-id');
        setTopperData(readiness);
      } catch (error) {
        console.error('Failed to load dashboard data', error);
      }
    }
    loadData();
  }, []);

  const handleGeneratePlan = async () => {
    setIsLoading(true);
    try {
      const plan = await generateDailyPlanAction(
        'dummy-user-id',
        new Date().toISOString().split('T')[0],
        { completion: topperData?.completionPercentage || 0 },
        []
      );
      setCurrentPlan(plan);
      toast.success('Mission plan generated and uplinked.');
    } catch (error) {
      toast.error('Uplink failed. Retrying tactical protocols...');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Tactical Sidebar */}
      <aside className="w-64 border-r border-white/5 flex flex-col hidden lg:flex bg-black/20 backdrop-blur-sm">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <Terminal className="w-5 h-5 text-primary" />
            <span className="font-heading text-sm tracking-widest glow-text">COMMAND_v2.7</span>
          </div>
          
          <nav className="space-y-1">
            <SidebarItem icon={<LayoutDashboard className="w-4 h-4" />} label="Mainframe" active />
            <SidebarItem icon={<Activity className="w-4 h-4" />} label="Performance" />
            <SidebarItem icon={<BookOpen className="w-4 h-4" />} label="Library" />
            <SidebarItem icon={<Settings className="w-4 h-4" />} label="Protocols" />
          </nav>
        </div>
        
        <div className="mt-auto p-8 border-t border-white/5">
          <div className="flex items-center gap-3 group cursor-pointer text-muted-foreground hover:text-white transition-colors">
            <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-all">
              <User className="w-4 h-4 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono tracking-tighter uppercase font-bold text-white">Aspiring Topper</span>
              <span className="text-[9px] font-mono text-muted-foreground tracking-widest uppercase">Rank 1 Target</span>
            </div>
            <LogOut className="ml-auto w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-white/5 px-8 flex items-center justify-between bg-black/10 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <h1 className="text-xs font-mono tracking-[0.3em] uppercase text-muted-foreground">Tactical Mission Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex flex-col items-end mr-4">
               <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">Gujarat State Rank</span>
               <span className="text-[11px] font-mono text-white uppercase font-bold tracking-tighter glow-text">Prediction: #0001</span>
             </div>
             <Button variant="outline" size="sm" className="font-mono text-[9px] tracking-widest border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary">
               <Sparkles className="w-3 h-3 mr-2" />
               RANK-1 MODE
             </Button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-6xl mx-auto space-y-10">
            {topperData && <TopperSimulatorView data={topperData} />}

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                <div>
                  <h2 className="text-3xl font-bold tracking-tighter uppercase mb-2 glow-text">Mission Logistics</h2>
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-[0.2em]">Operational parameters for the next 24 hours</p>
                </div>
                
                <Button onClick={handleGeneratePlan} className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs tracking-widest px-6 h-12 rounded-none clip-path-polygon-sm shadow-[0_0_20px_rgba(var(--primary),0.3)]">
                  Recalculate Pathing
                </Button>
              </div>

              <Tabs defaultValue="plan" className="w-full">
                <TabsList className="bg-white/5 border border-white/5 p-1 rounded-none h-12">
                  <TabsTrigger value="plan" className="rounded-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-mono text-[10px] tracking-widest px-8">
                    SCHEDULE_INTEL
                  </TabsTrigger>
                  <TabsTrigger value="subjects" className="rounded-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-mono text-[10px] tracking-widest px-8">
                    MASTERY_VECTORS
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="plan" className="mt-8">
                  <DailyPlanView />
                </TabsContent>
                
                <TabsContent value="subjects" className="mt-8">
                  <div className="p-20 text-center glass rounded-none border-dashed">
                    <Terminal className="w-12 h-12 text-primary/30 mx-auto mb-6" />
                    <h3 className="text-xl font-bold mb-2">ACCESS_DENIED</h3>
                    <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest leading-relaxed">
                      Subject tracking module is currently undergoing <br /> synchronization with the GSEB Board syllabus...
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>

      <style jsx global>{`
        .clip-path-polygon-sm {
          clip-path: polygon(0 0, 100% 0, 100% 60%, 85% 100%, 0 100%);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: oklch(0.65 0.25 280 / 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: oklch(0.65 0.25 280 / 0.2);
        }
      `}</style>
    </div>
  );
}

function SidebarItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 cursor-pointer group transition-all relative ${active ? 'text-primary' : 'text-muted-foreground hover:text-white'}`}>
      {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary glow-box shadow-[0_0_10px_rgba(var(--primary),0.5)]" />}
      <div className={`${active ? 'text-primary' : 'group-hover:text-primary transition-colors'}`}>
        {icon}
      </div>
      <span className="text-[10px] font-mono tracking-widest uppercase font-bold">{label}</span>
      {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
    </div>
  );
}
