import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TestQuestion } from './test/TestQuestion';
import { TestResult } from './test/TestResult';
import { useTestQuestions } from './test/useTestQuestions';
import { Loader2 } from "lucide-react";

export const LessonTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const { questions, isLoading } = useTestQuestions();

  const handleAnswerClick = (selectedAnswer: number) => {
    if (!questions || !questions[currentQuestion]) return;

    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 2);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  if (isLoading) {
    return (
      <Button 
        variant="outline"
        className="w-full sm:w-auto border-primary/20 hover:bg-primary/5 text-secondary"
        disabled
      >
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        Загрузка теста...
      </Button>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <Button 
        variant="outline"
        className="w-full sm:w-auto border-primary/20 hover:bg-primary/5 text-secondary"
        disabled
      >
        Тест недоступен
      </Button>
    );
  }

  return (
    <Dialog onOpenChange={(open) => !open && resetTest()}>
      <DialogTrigger asChild>
        <Button 
          variant="outline"
          className="w-full sm:w-auto border-primary/20 hover:bg-primary/5 text-secondary"
        >
          Пройти тест
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-secondary-dark/95 backdrop-blur-lg border-primary/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-6">
            {showScore ? "Результаты теста" : `Вопрос ${currentQuestion + 1} из ${questions.length}`}
          </DialogTitle>
        </DialogHeader>
        
        {showScore ? (
          <TestResult 
            score={score} 
            maxScore={questions.length * 2} 
            onRetry={resetTest} 
          />
        ) : (
          <TestQuestion
            question={questions[currentQuestion].question}
            options={questions[currentQuestion].options}
            onAnswer={handleAnswerClick}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};