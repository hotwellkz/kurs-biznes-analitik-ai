import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { lesson1_1_questions } from './questions/lesson1-1';
import { lesson1_2_questions } from './questions/lesson1-2';
import { lesson2_1_questions } from './questions/lesson2-1';
import { lesson2_2_questions } from './questions/lesson2-2';
import { lesson2_3_questions } from './questions/lesson2-3';
import { lesson3_1_questions } from './questions/lesson3-1';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

export const useTestQuestions = () => {
  const { lessonId } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    
    switch (lessonId) {
      case '1.1':
        setQuestions(lesson1_1_questions);
        break;
      case '1.2':
        setQuestions(lesson1_2_questions);
        break;
      case '2.1':
        setQuestions(lesson2_1_questions);
        break;
      case '2.2':
        setQuestions(lesson2_2_questions);
        break;
      case '2.3':
        setQuestions(lesson2_3_questions);
        break;
      case '3.1':
        setQuestions(lesson3_1_questions);
        break;
      default:
        setQuestions([]);
    }
    
    setIsLoading(false);
  }, [lessonId]);

  return { questions, isLoading };
};