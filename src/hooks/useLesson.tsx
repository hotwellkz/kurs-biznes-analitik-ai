import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useTokenManagement } from './useTokenManagement';
import { useLessonContent } from './useLessonContent';
import { useLessonProgress } from './useLessonProgress';

export interface QuestionAnswer {
  question: string;
  answer: string;
}

export const useLesson = (lessonId: string) => {
  const navigate = useNavigate();
  const { tokens, setTokens, updateTokens } = useTokenManagement();
  const { content, setContent, isLoading, generateContent } = useLessonContent(lessonId);
  const { questionsAnswers, setQuestionsAnswers, loadProgress } = useLessonProgress(lessonId);

  const startLesson = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate('/login');
      return;
    }

    const success = await updateTokens(5);
    if (!success) return;

    await generateContent(session.user.id);
    await loadProgress(session.user.id);
  };

  return {
    isLoading,
    content,
    tokens,
    setTokens,
    questionsAnswers,
    startLesson
  };
};