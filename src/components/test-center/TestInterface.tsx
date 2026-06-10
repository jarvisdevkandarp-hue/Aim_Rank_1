'use client';

import { useState, useEffect } from 'react';
import { Test, Question } from '@/lib/agents/examiner-agent';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Timer, AlertCircle, CheckCircle2 } from 'lucide-react';

interface TestInterfaceProps {
  test: Test;
  onComplete: (answers: Record<string, string>) => void;
}

export function TestInterface({ test, onComplete }: TestInterfaceProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(test.durationMinutes * 60);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleFinish();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const currentQuestion = test.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / test.questions.length) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  const handleNext = () => {
    if (currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    setIsFinished(true);
    onComplete(answers);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center sticky top-0 bg-background/95 backdrop-blur z-10 py-4 border-b">
        <div className="space-y-1">
          <h2 className="text-xl font-bold">{test.subject} Test</h2>
          <div className="flex gap-2">
            <Badge variant="outline">{test.type}</Badge>
            <Badge variant="secondary">{test.difficulty}</Badge>
          </div>
        </div>
        <div className={`flex items-center gap-2 font-mono text-xl ${timeLeft < 300 ? 'text-destructive animate-pulse' : ''}`}>
          <Timer className="w-6 h-6" />
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Question {currentQuestionIndex + 1} of {test.questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="border-2">
        <CardHeader>
          <div className="flex justify-between items-start">
            <Badge variant="outline" className="mb-2">
              {currentQuestion.type} - {currentQuestion.marks} Mark(s)
            </Badge>
          </div>
          <CardTitle className="text-2xl leading-relaxed">
            {currentQuestion.question}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentQuestion.type === 'MCQ' && currentQuestion.options ? (
            <RadioGroup
              value={answers[currentQuestion.id]}
              onValueChange={handleAnswer}
              className="space-y-3 mt-4"
            >
              {currentQuestion.options.map((option, i) => (
                <div key={i} className="flex items-center space-x-3 space-y-0 p-4 rounded-lg border hover:bg-accent transition-colors cursor-pointer">
                  <RadioGroupItem value={option} id={`q-${currentQuestion.id}-${i}`} />
                  <Label htmlFor={`q-${currentQuestion.id}-${i}`} className="flex-1 cursor-pointer font-medium">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          ) : (
            <div className="mt-4 p-4 rounded-lg border bg-muted/50">
              <p className="text-sm text-muted-foreground italic flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                This is a subjective question. Type your answer or prepare for manual evaluation.
              </p>
              <textarea
                className="w-full mt-4 p-4 rounded-md border min-h-[200px] bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
                placeholder="Write your answer here..."
                value={answers[currentQuestion.id] || ''}
                onChange={(e) => handleAnswer(e.target.value)}
              />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between pt-6 border-t bg-muted/20">
          <Button
            variant="ghost"
            onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          <Button onClick={handleNext} className="px-8">
            {currentQuestionIndex === test.questions.length - 1 ? 'Finish Test' : 'Next Question'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
