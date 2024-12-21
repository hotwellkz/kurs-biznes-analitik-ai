import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { QuestionAnswer } from '@/hooks/useLesson';

export const useLessonProgress = (lessonId: string) => {
  const [questionsAnswers, setQuestionsAnswers] = useState<QuestionAnswer[]>([]);

  const loadProgress = async (userId: string) => {
    const { data: lessonProgress } = await supabase
      .from('lesson_progress')
      .select('questions_answers')
      .eq('user_id', userId)
      .eq('lesson_id', lessonId)
      .maybeSingle();

    if (lessonProgress?.questions_answers) {
      const qaArray = lessonProgress.questions_answers as Array<{ question: string; answer: string }>;
      if (Array.isArray(qaArray) && qaArray.every(qa => 'question' in qa && 'answer' in qa)) {
        setQuestionsAnswers(qaArray);
      }
    }
  };

  const updateProgress = async (userId: string, newQA: QuestionAnswer) => {
    const updatedQA = [...questionsAnswers, newQA];
    setQuestionsAnswers(updatedQA);

    await supabase
      .from('lesson_progress')
      .update({
        questions_answers: updatedQA
      })
      .eq('user_id', userId)
      .eq('lesson_id', lessonId);
  };

  return { questionsAnswers, setQuestionsAnswers, loadProgress, updateProgress };
};