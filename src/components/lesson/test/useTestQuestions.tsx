import { useState, useEffect } from 'react';
import { lesson1_1_questions } from './questions/lesson1-1';
import { lesson1_2_questions } from './questions/lesson1-2';
import { lesson2_1_questions } from './questions/lesson2-1';
import { lesson2_2_questions } from './questions/lesson2-2';
import { lesson2_3_questions } from './questions/lesson2-3';
import { lesson3_1_questions } from './questions/lesson3-1';
import { lesson3_2_questions } from './questions/lesson3-2';
import { useParams } from 'react-router-dom';

export const useTestQuestions = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { lessonId } = useParams();

  useEffect(() => {
    const getQuestions = () => {
      switch (lessonId) {
        case '1.1':
          return lesson1_1_questions;
        case '1.2':
          return lesson1_2_questions;
        case '2.1':
          return lesson2_1_questions;
        case '2.2':
          return lesson2_2_questions;
        case '2.3':
          return lesson2_3_questions;
        case '3.1':
          return lesson3_1_questions;
        case '3.2':
          return lesson3_2_questions;
        default:
          return [];
      }
    };

    setQuestions(getQuestions());
    setIsLoading(false);
  }, [lessonId]);

  return { questions, isLoading };
};