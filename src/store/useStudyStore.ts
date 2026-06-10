import { create } from 'zustand';
import { DailySchedule } from '@/lib/agents/planner-agent';

interface StudyState {
  currentPlan: DailySchedule | null;
  setCurrentPlan: (plan: DailySchedule) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useStudyStore = create<StudyState>((set) => ({
  currentPlan: null,
  setCurrentPlan: (plan) => set({ currentPlan: plan }),
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
