import { Visit } from "@/modules/visits/domain/visit";

export type Status = 'waiting' | 'temporary_leave' | 'done';

export type Task = {
  id: string;
  title: string;
  description: string;
  status: Status;
};

export type BoardSections = {
  [name: string]: Visit[];
};