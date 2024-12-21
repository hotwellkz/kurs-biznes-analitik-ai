import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useLessonContent = (lessonId: string) => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const getPromptForLesson = (lessonId: string) => {
    switch (lessonId) {
      case '3.3':
        return 'Расскажи подробно как будто ты преподаватель и преподаешь урок на тему: "Инструменты аналитика Обзор инструментов (Jira, Confluence, MS Visio), Практика работы с одним из инструментов"';
      case '3.2':
        return 'Расскажи подробно как будто ты преподаватель и преподаешь Курс Бизнес Аналитик урок на тему: "Моделирование процессов Основы BPMN (Business Process Model and Notation), Построение диаграмм процессов"';
      case '3.1':
        return 'Расскажи подробно как будто ты преподаватель и преподаешь урок на тему: "SWOT, PESTEL и другие методы анализа Описание методов, Примеры применения"';
      case '1.1':
        return 'Расскажи подробно как будто ты преподаватель и преподаешь урок на тему: Кто такой бизнес-аналитик? Основные роли и обязанности, Ключевые навыки и инструменты, Примеры задач';
      case '1.2':
        return 'Расскажи подробно как будто ты преподаватель и преподаешь урок на тему: Жизненный цикл разработки (SDLC). Основные этапы SDLC, Роль бизнес-аналитика на каждом этапе, Agile vs. Waterfall';
      case '2.1':
        return 'Расскажи подробно как будто ты преподаватель и преподаешь урок на тему: "Сбор требований" c контентом: Методы сбора требований (интервью, опросы, мозговые штурмы), Работа с ключевыми заинтересованными сторонами (stakeholders).';
      case '2.2':
        return 'Расскажи подробно как будто ты преподаватель и преподаешь урок на тему: "Документирование требований" с контентом: Создание BRD (Business Requirements Document), User stories и Acceptance criteria.';
      case '2.3':
        return 'Расскажи подробно как будто ты преподаватель и преподаешь урок на тему: "Управление изменениями требований" с контентом: Как отслеживать изменения, Управление версиями и согласования.';
      default:
        return '';
    }
  };

  const generateContent = async (userId: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.functions.invoke('chat', {
        body: {
          messages: [
            {
              role: 'system',
              content: 'Ты - опытный преподаватель бизнес-анализа. Твоя задача - подробно и структурированно объяснять материал, используя практические примеры.'
            },
            {
              role: 'user',
              content: getPromptForLesson(lessonId)
            }
          ]
        }
      });

      if (error) throw error;

      const lessonContent = data.choices[0].message.content;
      setContent(lessonContent);

      // Используем upsert вместо insert
      const { error: upsertError } = await supabase
        .from('lesson_progress')
        .upsert(
          {
            user_id: userId,
            lesson_id: lessonId,
            generated_content: lessonContent
          },
          {
            onConflict: 'user_id,lesson_id'
          }
        );

      if (upsertError) throw upsertError;

      return true;
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось сгенерировать контент урока",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { content, setContent, isLoading, generateContent };
};