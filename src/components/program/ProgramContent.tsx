import { FC } from 'react';
import { ModuleAccordion } from './ModuleAccordion';
import { AIAssistant } from './AIAssistant';

interface ProgramContentProps {
  completedLessons: string[];
}

export const ProgramContent: FC<ProgramContentProps> = ({ completedLessons }) => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6 animate-slide-up">
        <ModuleAccordion completedLessons={completedLessons} />
      </div>
      <AIAssistant />
    </div>
  );
};