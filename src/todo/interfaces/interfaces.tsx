export interface Todo  {
    id?: number,
    name: string;
    completed: boolean;
}

export const filterType = {
  all: 'ALL',
  done: 'DONE',
  todo: 'TODO'
}