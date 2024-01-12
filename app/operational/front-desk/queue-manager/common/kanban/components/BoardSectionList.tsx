'use client';

import React, { useEffect, useState } from 'react';
import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  DndContext,
  closestCorners,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  DragOverlay,
  DropAnimation,
  defaultDropAnimation,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable';
import { INITIAL_TASKS } from '../data';
import { BoardSections as BoardSectionsType } from '../types';
import { getTaskById } from '../utils/tasks';
import { findBoardSectionContainer, initializeBoard } from '../utils/board';
import BoardSection from './BoardSection';
import TaskItem from './TaskItem';
import { BOARD_SECTIONS } from '../constants';
import { useDataModalContext } from '@/contexts/data-modal-context';
import PatientForm from '@/modules/patients/application/form/patient.form';
import PatientDeleteConfirmation from '@/modules/patients/application/form/patient.delete-confirmation';
import DashboardModal from '@/components/Modal/Modal';
import { useDoctorContext } from '@/contexts/doctor-context';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const BoardSectionList = () => {
  const tasks = INITIAL_TASKS;
  const initialBoardSections = initializeBoard(INITIAL_TASKS);
  const [boardSections, setBoardSections] =
    useState<BoardSectionsType>(initialBoardSections);

  const [activeTaskId, setActiveTaskId] = useState<null | string>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveTaskId(active.id as string);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    // Find the containers
    const activeContainer = findBoardSectionContainer(
      boardSections,
      active.id as string
    );
    const overContainer = findBoardSectionContainer(
      boardSections,
      over?.id as string
    );

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setBoardSections((boardSection) => {
      const activeItems = boardSection[activeContainer];
      const overItems = boardSection[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.findIndex(
        (item) => item.id === active.id
      );
      const overIndex = overItems.findIndex((item) => item.id !== over?.id);

      return {
        ...boardSection,
        [activeContainer]: [
          ...boardSection[activeContainer].filter(
            (item) => item.id !== active.id
          ),
        ],
        [overContainer]: [
          ...boardSection[overContainer].slice(0, overIndex),
          boardSections[activeContainer][activeIndex],
          ...boardSection[overContainer].slice(
            overIndex,
            boardSection[overContainer].length
          ),
        ],
      };
    });
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    const activeContainer = findBoardSectionContainer(
      boardSections,
      active.id as string
    );
    const overContainer = findBoardSectionContainer(
      boardSections,
      over?.id as string
    );

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = boardSections[activeContainer].findIndex(
      (task) => task.id === active.id
    );
    const overIndex = boardSections[overContainer].findIndex(
      (task) => task.id === over?.id
    );

    if (activeIndex !== overIndex) {
      setBoardSections((boardSection) => ({
        ...boardSection,
        [overContainer]: arrayMove(
          boardSection[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }

    setActiveTaskId(null);
  };

  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  };

  const task = activeTaskId ? getTaskById(tasks, activeTaskId) : null;

  const boardTitle = BOARD_SECTIONS;

  const { editModalOpen, deleteModalOpen, handleModal } = useDataModalContext();
  const { activeDoctor } = useDoctorContext();

  return (
    <>
      <div className="flex flex-col gap-y-4 rounded-sm border border-stroke bg-white p-3 shadow-default dark:border-strokedark dark:bg-boxdark sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="pl-2 text-title-lg font-semibold text-black dark:text-white">Queue for Doctor { activeDoctor.name }</h3>
        </div>
        <div>
          <Link
              href="/operational/front-desk/patient-registration"
              target="_blank"
              className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
              <span>
                <FontAwesomeIcon icon={faPlus} width={20} height={20} />
              </span>
              Add Patient
            </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-7.5 grid-cols-2">
        <DashboardModal open={editModalOpen} handleClose={ () => handleModal(true, true) } children={ <PatientForm /> } title="Patient's Detail" />
        <DashboardModal open={deleteModalOpen} handleClose={ () => handleModal(true, false) } children={ <PatientDeleteConfirmation handleClose={ () => handleModal(true, false)} /> } title="" />
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd} >
          {Object.keys(boardSections).map((boardSectionKey) => (
            <BoardSection
              id={boardSectionKey}
              title={boardTitle[boardSectionKey]}
              tasks={boardSections[boardSectionKey]}
              />
          ))}
          <DragOverlay dropAnimation={dropAnimation}>
            {task ? <TaskItem task={task} /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  );
};

export default BoardSectionList;
