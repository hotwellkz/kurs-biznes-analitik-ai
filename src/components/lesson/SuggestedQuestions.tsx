import { Button } from "@/components/ui/button";

interface SuggestedQuestionsProps {
  onQuestionSelect: (question: string) => void;
}

export const SuggestedQuestions = ({ onQuestionSelect }: SuggestedQuestionsProps) => {
  const suggestedQuestions = [
    "Какие основные обязанности бизнес-аналитика?",
    "Какие soft skills необходимы бизнес-аналитику?",
    "Какие инструменты использует бизнес-аналитик в работе?",
    "Как бизнес-аналитик взаимодействует с заказчиком?",
    "Какие методологии использует бизнес-аналитик в работе?"
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white">Популярные вопросы по теме:</h3>
      <div className="grid gap-3">
        {suggestedQuestions.map((question, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full text-left justify-start bg-secondary-dark/50 hover:bg-primary/20 text-gray-300 border-primary/20 rounded-xl transition-colors duration-300"
            onClick={() => onQuestionSelect(question)}
          >
            {question}
          </Button>
        ))}
      </div>
    </div>
  );
};