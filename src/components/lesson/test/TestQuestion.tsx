import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface TestQuestionProps {
  question: string;
  options: string[];
  onAnswer: (index: number) => void;
}

export const TestQuestion = ({ question, options, onAnswer }: TestQuestionProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <p className="text-lg text-white">{question}</p>
        <div className="grid gap-3">
          {options.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Button
                variant="outline"
                className="w-full text-left justify-start text-gray-300 hover:text-white hover:bg-primary/20 border-primary/20 transition-all duration-300"
                onClick={() => onAnswer(index)}
              >
                {option}
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};