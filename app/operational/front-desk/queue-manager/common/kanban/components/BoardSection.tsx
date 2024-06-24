import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import TaskItem from './TaskItem';
import SortableTaskItem from './SortableTaskItem';
import { Visit } from '@/modules/visits/domain/visit';

type BoardSectionProps = {
  id: string;
  title: string;
  visits: Visit[];
};

const BoardSection = ({ id, title, visits }: BoardSectionProps) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div className="swim-lane flex flex-col gap-5.5">
      <h4 className="text-xl font-semibold text-black dark:text-white">{title}</h4>
      <SortableContext
        id={id}
        items={visits}
        strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef}>
          { typeof(visits) !== 'undefined' && visits.map((visit) => (
            <SortableTaskItem id={visit.id}>
              <TaskItem visit={visit} />
            </SortableTaskItem>
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default BoardSection;