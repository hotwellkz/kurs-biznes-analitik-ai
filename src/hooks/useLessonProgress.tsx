import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Json } from '@/integrations/supabase/types';

export interface QuestionAnswer {
  question: string;
  answer: string;
}

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

    // Convert QuestionAnswer[] to Json type for Supabase
    const jsonQA: Json = updatedQA.map(qa => ({
      question: qa.question,
      answer: qa.answer
    }));

    await supabase
      .from('lesson_progress')
      .update({
        questions_answers: jsonQA
      })
      .eq('user_id', userId)
      .eq('lesson_id', lessonId);
  };

  return { questionsAnswers, setQuestionsAnswers, loadProgress, updateProgress };
};