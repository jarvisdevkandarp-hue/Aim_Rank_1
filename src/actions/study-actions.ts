'use server'

import { getBoardReadiness as getReadiness } from '@/lib/agents/topper-simulator'
import { generateDailyPlan as generatePlan } from '@/lib/agents/planner-agent'

export async function getBoardReadinessAction(userId: string) {
  return await getReadiness(userId)
}

export async function generateDailyPlanAction(
  userId: string,
  date: string,
  progressMetrics: any,
  upcomingTests: any[]
) {
  return await generatePlan(userId, date, progressMetrics, upcomingTests)
}
