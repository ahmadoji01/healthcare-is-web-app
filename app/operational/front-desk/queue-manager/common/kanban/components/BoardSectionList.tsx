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
import { BoardSections as BoardSectionsType } from '../types';
import { getVisitById } from '../utils/tasks';
import { findBoardSectionContainer, initializeBoard } from '../utils/board';
import BoardSection from './BoardSection';
import TaskItem from './TaskItem';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useVisitContext } from '@/contexts/visit-context';
import { PhysicalCheckup } from '@/modules/physical-checkups/domain/physical-checkup';
import { updateVisit } from '@/modules/visits/domain/visits.actions';
import { useUserContext } from '@/contexts/user-context';
import { useAlertContext } from '@/contexts/alert-context';
import { DoctorName } from '@/utils/doctor-name-format';
import { useFrontDeskContext } from '@/contexts/front-desk-context';
import { VISIT_STATUS } from '@/modules/visits/domain/visit.constants';
import { useTranslations } from 'next-intl';
import Spinner from '@/components/Spinner';

const BoardSectionList = () => {
  const {doctorVisits} = useVisitContext();
  const {accessToken} = useUserContext();
  const {openSnackbarNotification} = useAlertContext();
  const t = useTranslations();

  const initialBoardSections = initializeBoard(doctorVisits);
  const [boardSections, setBoardSections] =
    useState<BoardSectionsType>(initialBoardSections);

  const [activeTaskId, setActiveTaskId] = useState<null | number>(null);
  const [prevContainer, setPrevContainer] = useState("");
  const [visitsOnQueue, setVisitsOnQueue] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect( () => {
    setBoardSections(initializeBoard(doctorVisits));
    let visits = doctorVisits.find( visit => (visit.status === VISIT_STATUS.waiting || visit.status === VISIT_STATUS.temporary_leave));
    if (typeof(visits) === 'undefined') {
      setVisitsOnQueue(false);
    } else {
      setVisitsOnQueue(true);
    }
  }, [doctorVisits])

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveTaskId(active.id as number);
    setPrevContainer(active.data.current?.sortable.containerId);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    const activeContainer = findBoardSectionContainer(
      boardSections,
      active.id as number
    );
    const overContainer = findBoardSectionContainer(
      boardSections,
      over?.id as number
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
      active.id as number
    );
    const overContainer = findBoardSectionContainer(
      boardSections,
      over?.id as number
    );

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    if (prevContainer !== activeContainer) {
      updateVisit(accessToken, active.id as string, { status: activeContainer })
      .then( () => openSnackbarNotification(t('alert_msg.success'), 'success'))
      .catch( () => {openSnackbarNotification(t('alert_msg.server_error'), 'error'); return; } );
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

  const task = activeTaskId ? getVisitById(doctorVisits, activeTaskId) : null;

  const boardTitle = {
    waiting: t('front_desk.waiting'),
    temporary_leave: t('front_desk.temporary_leave'),
  };

  const { activeDoctor } = useFrontDeskContext();
  const { loading } = useVisitContext();

  return (
    <>
      <div className="flex flex-col gap-y-4 rounded-sm border border-stroke bg-white p-3 shadow-default dark:border-strokedark dark:bg-boxdark sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="pl-2 text-title-lg font-semibold text-black dark:text-white">{t("front_desk.queue_title")} {DoctorName(activeDoctor.name, activeDoctor.specialization)}</h3>
        </div>
        <div>
          <Link
            href="/operational/front-desk/patient-registration?from=queue-manager"
            className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
            <span>
              <FontAwesomeIcon icon={faPlus} width={20} height={20} />
            </span>
            {t("front_desk.add_patient")}
          </Link>
        </div>
      </div>
      {
        !visitsOnQueue &&
          <div className="mt-2 flex flex-col gap-y-4 rounded-sm p-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="pl-2 text-title-lg font-semibold text-black dark:text-white">
                {t("no_visit_for_this_doctor_yet")}
              </h3>
            </div>
          </div>
      }
      { loading && <Spinner /> }
      { !loading && 
        <div className="grid grid-cols-1 gap-7.5 grid-cols-2">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd} >
            {Object.keys(boardSections).map((boardSectionKey, key) => (
              <BoardSection
                id={boardSectionKey}
                title={boardTitle[boardSectionKey]}
                visits={boardSections[boardSectionKey]}
                key={key}
                />
            ))}
            <DragOverlay dropAnimation={dropAnimation}>
              {task ? <TaskItem visit={task} /> : null}
            </DragOverlay>
          </DndContext>
        </div>
      }
    </>
  );
};

export default BoardSectionList;
