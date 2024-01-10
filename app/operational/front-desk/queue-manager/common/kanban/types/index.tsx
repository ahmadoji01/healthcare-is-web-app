export type Status = 'waiting' | 'not_in_line' | 'done';

export type Task = {
  id: string;
  title: string;
  description: string;
  status: Status;
};

export type BoardSections = {
  [name: string]: Task[];
};