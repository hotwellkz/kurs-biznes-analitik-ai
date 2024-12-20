import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';

const testQuestions = [
  {
    question: "Какова основная роль бизнес-аналитика?",
    options: [
      "Только написание кода",
      "Анализ бизнес-процессов и требований",
      "Управление персоналом",
      "Продажи продукта"
    ],
    correctAnswer: 1
  },
  // Add more questions here
];

export const LessonTest = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  const handleAnswer = (answerIndex: number) => {
    if (answerIndex === testQuestions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }

    if (currentQuestion < testQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      const finalScore = Math.round((score / testQuestions.length) * 10);
      toast({
        title: "Тест завершен!",
        description: `Ваша оценка: ${finalScore}/10`,
      });
      setIsOpen(false);
    }
  };

  const startTest = () => {
    setCurrentQuestion(0);
    setScore(0);
    setIsOpen(true);
  };

  return (
    <>
      <Button
        onClick={startTest}
        className="bg-primary hover:bg-primary-hover"
      >
        Пройти тест
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Тест: Понимание роли бизнес-аналитика
            </DialogTitle>
          </DialogHeader>
          
          {currentQuestion < testQuestions.length && (
            <div className="space-y-4">
              <p className="text-lg">{testQuestions[currentQuestion].question}</p>
              <div className="space-y-2">
                {testQuestions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className="w-full justify-start text-left"
                    variant="outline"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};