import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Trophy, Sparkles, Target, Zap, Shield, BarChart3, ChevronRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen text-white flex flex-col items-center">
      {/* Dynamic Header */}
      <header className="w-full max-w-7xl px-6 py-8 flex justify-between items-center animate-in fade-in slide-in-from-top-4 duration-1000">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 glass rounded-lg flex items-center justify-center border-primary/50 group hover:scale-110 transition-transform">
            <Shield className="w-6 h-6 text-primary group-hover:animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tighter glow-text">RANK-1</h2>
            <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">GSEB Mission OS</p>
          </div>
        </div>
        <nav className="hidden md:flex gap-8 font-mono text-[11px] tracking-widest uppercase text-muted-foreground">
          <Link href="#features" className="hover:text-primary transition-colors">Tactical Data</Link>
          <Link href="#intel" className="hover:text-primary transition-colors">Mission Intel</Link>
          <Link href="#deployment" className="hover:text-primary transition-colors">Deployment</Link>
        </nav>
        <Link href="/login">
          <Button variant="outline" className="font-mono text-[10px] tracking-widest uppercase h-9 border-primary/30 hover:bg-primary/10">
            Access System
          </Button>
        </Link>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 pt-16 pb-32 flex flex-col items-center text-center relative">
        {/* Decorative HUD Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl aspect-square bg-primary/10 rounded-full blur-[120px] -z-10" />
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-primary/30 text-primary text-[10px] font-mono tracking-[0.2em] uppercase mb-12 animate-in zoom-in duration-1000">
          <Sparkles className="w-3 h-3" />
          Protocol Active: State Rank 1 Optimization
        </div>
        
        <h1 className="text-7xl md:text-9xl font-extrabold tracking-tighter uppercase mb-8 leading-[0.9] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          Academic <br />
          <span className="text-transparent border-text text-stroke-primary bg-clip-text bg-gradient-to-b from-primary to-primary/50 glow-text">Command</span>
        </h1>
        
        <p className="max-w-xl text-lg text-muted-foreground leading-relaxed font-mono text-[14px] uppercase tracking-wide mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          Quantified excellence for the GSEB Class 10 elite. Transform your academic journey into a precision-engineered mission.
        </p>

        <div className="flex flex-wrap justify-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
          <Link href="/login">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono uppercase tracking-widest h-16 px-10 rounded-none clip-path-polygon">
              Initialize Mission
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="lg" variant="outline" className="font-mono uppercase tracking-widest h-16 px-10 rounded-none border-white/20 hover:bg-white/5 transition-all">
              Simulation Mode
            </Button>
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 w-full pt-32 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
          <div className="p-10 border border-white/5 hover:bg-white/[0.02] transition-all group text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-white/10 group-hover:text-primary/30 transition-colors">001</div>
            <Target className="w-10 h-10 text-primary mb-8 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-4 tracking-tighter group-hover:glow-text">Strategic Scheduler</h3>
            <p className="text-muted-foreground text-sm leading-relaxed font-mono uppercase text-[11px] tracking-wider">
              Dynamic pathing logic that accounts for coaching synchronization, metabolic energy cycles, and board deadlines.
            </p>
          </div>

          <div className="p-10 border border-white/5 hover:bg-white/[0.02] transition-all group text-left relative overflow-hidden bg-white/[0.01]">
            <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-white/10 group-hover:text-accent/30 transition-colors">002</div>
            <Zap className="w-10 h-10 text-accent mb-8 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-4 tracking-tighter group-hover:text-accent glow-text">Examiner Core</h3>
            <p className="text-muted-foreground text-sm leading-relaxed font-mono uppercase text-[11px] tracking-wider">
              GSEB-calibrated AI evaluation using step-marking heuristics and board-topper semantic alignment.
            </p>
          </div>

          <div className="p-10 border border-white/5 hover:bg-white/[0.02] transition-all group text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-white/10 group-hover:text-primary/30 transition-colors">003</div>
            <BarChart3 className="w-10 h-10 text-primary mb-8 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-4 tracking-tighter group-hover:glow-text">Rank Projection</h3>
            <p className="text-muted-foreground text-sm leading-relaxed font-mono uppercase text-[11px] tracking-wider">
              Real-time state standing estimates derived from full-syllabus mock performance and consistency metrics.
            </p>
          </div>
        </div>
      </main>

      {/* Footer System Status */}
      <footer className="w-full border-t border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6 font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Mainframe: Online
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              Uplink: Secure
            </span>
          </div>
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            © 2026 MISSION COMMAND - RANK 1 GUJARAT PROTOCOL
          </p>
        </div>
      </footer>

      <style jsx global>{`
        .clip-path-polygon {
          clip-path: polygon(0 0, 100% 0, 100% 70%, 90% 100%, 0 100%);
        }
        .border-text {
          -webkit-text-stroke: 1px oklch(0.65 0.25 280 / 0.3);
        }
      `}</style>
    </div>
  );
}
