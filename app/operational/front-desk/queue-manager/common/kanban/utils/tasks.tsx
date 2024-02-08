import { Visit } from '@/modules/visits/domain/visit';
import { Task, Status } from '../types';

export const getTasksByStatus = (tasks: Task[], status: Status) => {
  return tasks.filter((task) => task.status === status);
};

export const getTaskById = (tasks: Task[], id: string) => {
  return tasks.find((task) => task.id === id);
};

export const getVisitsByStatus = (visits: Visit[], status: Status) => {
  return visits.filter((visit) => visit.status === status);
};

export const getVisitById = (visits: Visit[], id: number) => {
  return visits.find((visit) => visit.id === id);
};