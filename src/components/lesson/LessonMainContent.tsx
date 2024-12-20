import { LessonTest } from './LessonTest';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';

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
  // Function to clean and format the text
  const formatText = (text: string) => {
    return text
      // Replace headers
      .replace(/### (.*?)(\n|$)/g, '<h3 class="text-white text-2xl font-bold mb-6 break-words">$1</h3>')
      // Replace bold text
      .replace(/\*\*(.*?)\*\*/g, '<span class="text-primary-light font-semibold">$1</span>')
      // Replace any remaining markdown symbols
      .replace(/[#*]/g, '')
      // Format lists if present
      .replace(/- (.*?)(\n|$)/g, '<li class="text-gray-300 ml-4">$1</li>')
      // Add proper spacing for paragraphs
      .replace(/\n\n/g, '</p><p class="mb-4">');
  };

  const shareAnswer = (question: string, answer: string) => {
    const text = `Вопрос: ${question}\n\nОтвет: ${answer.replace(/<[^>]*>/g, '')}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-8 px-4 sm:px-0">
      {/* Контент урока */}
      <div className="prose prose-invert max-w-none">
        <div 
          className="text-gray-200" 
          dangerouslySetInnerHTML={{ 
            __html: formatText(content)
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
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-grow">
                    <p className="text-primary-light font-semibold break-words">{qa.question}</p>
                    <div 
                      className="text-gray-300 break-words mt-3"
                      dangerouslySetInnerHTML={{ 
                        __html: formatText(qa.answer)
                      }}
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 border-primary/20 hover:bg-primary/5 text-secondary"
                    onClick={() => shareAnswer(qa.question, qa.answer)}
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};