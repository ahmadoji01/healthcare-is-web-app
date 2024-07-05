import { BoardSections, Status, Task } from '../types';
import { BOARD_SECTIONS } from '../constants';
import { getVisitsByStatus } from './tasks';
import { Visit } from '@/modules/visits/domain/visit';

export const initializeBoard = (visits: Visit[]) => {
  const boardSections: BoardSections = {};

  Object.keys(BOARD_SECTIONS).forEach((boardSectionKey) => {
    boardSections[boardSectionKey] = getVisitsByStatus(
      visits,
      boardSectionKey as Status
    );
  });

  return boardSections;
};

export const findBoardSectionContainer = (
  boardSections: BoardSections,
  id: number
) => {
  if (id in boardSections) {
    return id;
  }

  const container = Object.keys(boardSections).find((key) =>
    boardSections[key].find((item) => item.id === id)
  );
  return container;
};