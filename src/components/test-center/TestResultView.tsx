'use client';

import { TestAttemptSummary } from '@/lib/agents/evaluator-agent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, Info, Trophy, Target } from 'lucide-react';

interface TestResultViewProps {
  summary: TestAttemptSummary;
}

export function TestResultView({ summary }: TestResultViewProps) {
  const scorePercentage = (summary.totalScore / summary.maxScore) * 100;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-2">
          <Trophy className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight">Mission Accomplished</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          You&apos;ve completed the test. Here is how you&apos;re performing against the Rank-1 standard.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-primary text-primary-foreground border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-80 uppercase tracking-wider">Score Obtained</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{summary.totalScore} / {summary.maxScore}</div>
            <p className="text-sm mt-2 opacity-80">{Math.round(scorePercentage)}% accuracy</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Target className="w-4 h-4" /> Board Readiness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{scorePercentage > 90 ? 'High' : scorePercentage > 75 ? 'Medium' : 'Low'}</div>
            <Progress value={scorePercentage} className="mt-4 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Info className="w-4 h-4" /> Weak Topics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {summary.weakTopics.map((topic, i) => (
                <Badge key={i} variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                  {topic}
                </Badge>
              ))}
              {summary.weakTopics.length === 0 && <span className="text-sm text-green-600 font-medium">None Identified!</span>}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Feedback</CardTitle>
        </CardHeader>
        <CardContent className="bg-muted/30 p-6 rounded-lg italic text-lg leading-relaxed">
          &quot;{summary.generalFeedback}&quot;
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-2xl font-bold px-1">Question Breakdown</h3>
        <div className="grid gap-4">
          {summary.evaluations.map((evalRes, index) => (
            <Card key={index} className={`border-l-4 ${evalRes.isCorrect ? 'border-l-green-500' : 'border-l-destructive'}`}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      {evalRes.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-destructive" />
                      )}
                      <span className="font-bold text-lg">Question {index + 1}</span>
                      <Badge variant="secondary" className="ml-2">
                        {evalRes.marksObtained} / {evalRes.maxMarks} Marks
                      </Badge>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{evalRes.feedback}</p>
                    {evalRes.idealAnswer && (
                      <div className="mt-4 p-4 bg-green-50 dark:bg-green-950/20 rounded border border-green-100 dark:border-green-900/30">
                        <p className="text-xs font-bold text-green-800 dark:text-green-400 uppercase tracking-wider mb-1">Board Topper&apos;s Ideal Answer:</p>
                        <p className="text-sm">{evalRes.idealAnswer}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
