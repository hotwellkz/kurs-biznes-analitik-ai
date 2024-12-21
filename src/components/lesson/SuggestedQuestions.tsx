import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";

interface SuggestedQuestionsProps {
  onQuestionSelect: (question: string) => void;
}

export const SuggestedQuestions = ({ onQuestionSelect }: SuggestedQuestionsProps) => {
  const { lessonId } = useParams();

  const getSuggestedQuestions = () => {
    switch (lessonId) {
      case '1.1':
        return [
          "Какие основные обязанности бизнес-аналитика?",
          "Какие soft skills необходимы бизнес-аналитику?",
          "Какие инструменты использует бизнес-аналитик в работе?",
          "Как бизнес-аналитик взаимодействует с заказчиком?",
          "Какие методологии использует бизнес-аналитик в работе?"
        ];
      case '1.2':
        return [
          "Какие основные этапы SDLC?",
          "В чем разница между Agile и Waterfall?",
          "Какова роль бизнес-аналитика в Agile проектах?",
          "Как бизнес-аналитик участвует в этапе тестирования?",
          "Какие артефакты создает бизнес-аналитик на разных этапах SDLC?"
        ];
      case '2.1':
        return [
          "Какие основные методы сбора требований существуют?",
          "Как правильно проводить интервью с заинтересованными сторонами?",
          "Какие преимущества и недостатки у метода мозгового штурма?",
          "Как эффективно работать со стейкхолдерами?",
          "Какие инструменты используются для документирования требований?"
        ];
      case '2.2':
        return [
          "Какие основные разделы должны быть в BRD?",
          "Как правильно писать User Stories?",
          "Что такое Acceptance Criteria и как их формулировать?",
          "В чем разница между функциональными и нефункциональными требованиями?",
          "Какие инструменты используются для документирования требований?"
        ];
      default:
        return [];
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white">Популярные вопросы по теме:</h3>
      <div className="grid gap-3">
        {getSuggestedQuestions().map((question, index) => (
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
