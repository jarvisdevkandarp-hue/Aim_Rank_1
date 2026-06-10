'use client';

import { useEffect, useState } from 'react';
import { DailyPlanView } from '@/components/dashboard/DailyPlanView';
import { TopperSimulatorView } from '@/components/dashboard/TopperSimulatorView';
import { useStudyStore } from '@/store/useStudyStore';
import { getBoardReadiness, BoardReadiness } from '@/lib/agents/topper-simulator';
import { generateDailyPlan } from '@/lib/agents/planner-agent';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Sparkles, Trophy, BookOpen, User } from 'lucide-react';

export default function DashboardPage() {
  const { setCurrentPlan, setIsLoading } = useStudyStore();
  const [topperData, setTopperData] = useState<BoardReadiness | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const readiness = await getBoardReadiness('dummy-user-id'); // Replace with actual user ID in production
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
      const plan = await generateDailyPlan(
        'dummy-user-id',
        new Date().toISOString().split('T')[0],
        { completion: topperData?.completionPercentage || 0 },
        []
      );
      setCurrentPlan(plan);
      toast.success('Mission plan generated successfully!');
    } catch (error) {
      toast.error('Failed to generate mission plan.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <Trophy className="text-primary-foreground w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">Rank-1 Mission</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              Rank-1 Mode
            </Button>
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <User className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {topperData && <TopperSimulatorView data={topperData} />}

        <Tabs defaultValue="plan" className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <TabsList>
              <TabsTrigger value="plan" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Today's Mission
              </TabsTrigger>
              <TabsTrigger value="subjects" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Subjects
              </TabsTrigger>
            </TabsList>
            
            <Button onClick={handleGeneratePlan} className="bg-primary hover:bg-primary/90">
              Generate Today's Mission
            </Button>
          </div>

          <TabsContent value="plan">
            <DailyPlanView />
          </TabsContent>
          
          <TabsContent value="subjects">
            <div className="p-12 text-center text-muted-foreground border-2 border-dashed rounded-xl">
              Subject mastery tracking coming soon...
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// Add missing icon import
import { Calendar } from 'lucide-react';
