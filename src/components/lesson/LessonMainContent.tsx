import { LessonTest } from './LessonTest';
import { Button } from '@/components/ui/button';

interface LessonMainContentProps {
  content: string;
  questionsAnswers: Array<{ question: string; answer: string }>;
  isCompleting: boolean;
  onComplete: () => void;
}

export const LessonMainContent = ({
  content,
  questionsAnswers,
  isCompleting,
  onComplete
}: LessonMainContentProps) => {
  return (
    <div className="space-y-8 px-4 sm:px-0">
      {/* Контент урока */}
      <div className="prose prose-invert max-w-none">
        <div 
          className="text-gray-200" 
          dangerouslySetInnerHTML={{ 
            __html: content
              .replace(/### (.*?)\n/g, '<h3 class="text-white text-2xl font-bold mb-6 break-words">$1</h3>\n')
              .replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary-light">$1</strong>') 
          }} 
        />
      </div>

      {/* Кнопки управления уроком */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <LessonTest />
        <Button
          onClick={onComplete}
          disabled={isCompleting}
          className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary-hover text-white font-semibold py-4 sm:py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          Завершить урок
        </Button>
      </div>

      {/* Вопросы и ответы */}
      {questionsAnswers.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white mb-6">Ваши вопросы и ответы:</h3>
          <div className="grid gap-4">
            {questionsAnswers.map((qa, index) => (
              <div 
                key={index} 
                className="bg-secondary/30 backdrop-blur-sm p-4 sm:p-6 rounded-xl space-y-3 border border-primary/20 hover:border-primary/40 transition-colors duration-300"
              >
                <p className="text-primary-light font-semibold break-words">{qa.question}</p>
                <p className="text-gray-300 break-words">{qa.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};