import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Trophy, Sparkles, Target, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30">
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 pt-20 pb-32 flex flex-col items-center text-center space-y-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium animate-pulse">
          <Sparkles className="w-4 h-4" />
          Mission 2027: Rank 1 Gujarat
        </div>
        
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
          Academic <span className="text-indigo-500">Operating System</span>
        </h1>
        
        <p className="max-w-2xl text-lg md:text-xl text-slate-400 leading-relaxed">
          The world's most advanced AI-powered study companion designed exclusively for GSEB Class 10 students targeting State Rank 1.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/login">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500 text-lg px-8 h-14 rounded-full shadow-[0_0_20px_rgba(79,70,229,0.4)]">
              Start Your Mission
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="lg" variant="outline" className="text-lg px-8 h-14 rounded-full border-slate-800 bg-slate-900/50 hover:bg-slate-800">
              View Demo Dashboard
            </Button>
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-20">
          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 transition-colors text-left space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Precision Planning</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Dynamic schedules that adapt to your coaching hours, energy levels, and upcoming GSEB tests.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 transition-colors text-left space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Examiner Agent</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              AI evaluation with step-marking and board-topper feedback to ensure 95%+ in every subject.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 transition-colors text-left space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Rank Predictor</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Real-time standing estimate based on your performance across mock boards and revision cycles.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-10 text-center text-slate-500 text-sm">
        © 2026 Rank-1 Mission. Designed for Gujarat State Board Excellence.
      </footer>
    </div>
  );
}
