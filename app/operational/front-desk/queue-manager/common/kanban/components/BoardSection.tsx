import React from 'react';
import Box from '@mui/material/Box';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import Typography from '@mui/material/Typography';
import { Task } from '../types';
import TaskItem from './TaskItem';
import SortableTaskItem from './SortableTaskItem';

type BoardSectionProps = {
  id: string;
  title: string;
  tasks: Task[];
};

const BoardSection = ({ id, title, tasks }: BoardSectionProps) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div className="swim-lane flex flex-col gap-5.5">
      <h4 className="text-xl font-semibold text-black dark:text-white">{title}</h4>
      <SortableContext
        id={id}
        items={tasks}
        strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef}>
          {tasks.map((task) => (
            <SortableTaskItem id={task.id}>
              <TaskItem task={task} />
            </SortableTaskItem>
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default BoardSection;