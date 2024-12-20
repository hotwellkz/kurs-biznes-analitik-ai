import { Button } from "@/components/ui/button";

interface TestResultProps {
  score: number;
  maxScore: number;
  onRetry: () => void;
}

export const TestResult = ({ score, maxScore, onRetry }: TestResultProps) => {
  const getMessage = () => {
    if (score === maxScore) {
      return "Отлично! Вы отлично усвоили материал!";
    }
    if (score >= maxScore / 2) {
      return "Хороший результат! Продолжайте изучение материала.";
    }
    return "Рекомендуем повторить материал урока.";
  };

  return (
    <div className="space-y-6 text-center">
      <div className="text-4xl font-bold text-primary animate-fade-in">
        {score} / {maxScore}
      </div>
      <p className="text-gray-300">{getMessage()}</p>
      <Button onClick={onRetry} className="bg-primary hover:bg-primary-hover text-white">
        Пройти тест заново
      </Button>
    </div>
  );
};