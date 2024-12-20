import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useParams } from 'react-router-dom';

export const LessonTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const { lessonId } = useParams();

  const getQuestions = () => {
    switch (lessonId) {
      case '1.1':
        return [
          {
            question: "Какова основная роль бизнес-аналитика в проекте?",
            options: [
              "Только написание документации",
              "Связующее звено между бизнесом и IT-командой",
              "Управление проектом",
              "Разработка программного обеспечения"
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
      case '1.2':
        return [
          {
            question: "Что такое SDLC?",
            options: [
              "Система документооборота",
              "Методология разработки ПО",
              "Жизненный цикл разработки ПО",
              "Система контроля версий"
            ],
            correctAnswer: 2
          },
          {
            question: "Какое основное отличие Agile от Waterfall?",
            options: [
              "Agile дороже в реализации",
              "Waterfall более гибкий",
              "Agile предполагает итеративную разработку",
              "В Waterfall нет документации"
            ],
            correctAnswer: 2
          },
          {
            question: "На каком этапе SDLC начинается работа бизнес-аналитика?",
            options: [
              "Только при тестировании",
              "На этапе планирования",
              "После релиза",
              "Только при разработке"
            ],
            correctAnswer: 1
          },
          {
            question: "Какой артефакт НЕ создает бизнес-аналитик?",
            options: [
              "Бизнес-требования",
              "User Stories",
              "Программный код",
              "Функциональные требования"
            ],
            correctAnswer: 2
          },
          {
            question: "Что такое Sprint в Agile?",
            options: [
              "Встреча команды",
              "Фиксированный период разработки",
              "Название документа",
              "Тип тестирования"
            ],
            correctAnswer: 1
          }
        ];
      default:
        return [];
    }
  };

  const questions = getQuestions();

  const handleAnswerClick = (selectedAnswer: number) => {
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
          <div className="space-y-6 text-center">
            <div className="text-4xl font-bold text-primary animate-fade-in">
              {score} / {questions.length * 2}
            </div>
            <p className="text-gray-300">
              {score === questions.length * 2 
                ? "Отлично! Вы отлично усвоили материал!" 
                : score >= questions.length 
                  ? "Хороший результат! Продолжайте изучение материала." 
                  : "Рекомендуем повторить материал урока."}
            </p>
            <Button onClick={resetTest} className="bg-primary hover:bg-primary-hover text-white">
              Пройти тест заново
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-lg text-gray-200">{questions[currentQuestion].question}</p>
            <div className="grid gap-3">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full text-left justify-start hover:bg-primary/20 text-gray-300 border-primary/20"
                  onClick={() => handleAnswerClick(index)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
