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
  {
    question: "Какой навык наиболее важен для бизнес-аналитика?",
    options: [
      "Программирование",
      "Аналитическое мышление",
      "Продажи",
      "Дизайн"
    ],
    correctAnswer: 1
  },
  {
    question: "Что является основным результатом работы бизнес-аналитика?",
    options: [
      "Написанный код",
      "Техническая документация",
      "Требования к продукту",
      "Маркетинговые материалы"
    ],
    correctAnswer: 2
  }
];

export const LessonTest = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  const handleAnswer = (answerIndex: number) => {
    const isCorrect = answerIndex === testQuestions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < testQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      // Вычисляем финальную оценку только когда все вопросы отвечены
      const finalScore = Math.round((score + (isCorrect ? 1 : 0)) / testQuestions.length * 10);
      toast({
        title: "Тест завершен!",
        description: `Ваша оценка: ${finalScore}/10`,
      });
      setIsOpen(false);
      // Сбрасываем состояние для следующей попытки
      setCurrentQuestion(0);
      setScore(0);
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
          
          <div className="space-y-4">
            <p className="text-lg font-medium">
              Вопрос {currentQuestion + 1} из {testQuestions.length}
            </p>
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
        </DialogContent>
      </Dialog>
    </>
  );
};