import { Button } from "@/components/ui/button";

interface TestQuestionProps {
  question: string;
  options: string[];
  onAnswer: (index: number) => void;
}

export const TestQuestion = ({ question, options, onAnswer }: TestQuestionProps) => {
  return (
    <div className="space-y-6">
      <p className="text-lg text-gray-200">{question}</p>
      <div className="grid gap-3">
        {options.map((option, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full text-left justify-start hover:bg-primary/20 text-gray-300 border-primary/20"
            onClick={() => onAnswer(index)}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};