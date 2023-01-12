export interface Todo {
  id?: string;
  name: string;
  completed: boolean;
  description: string;
}
export interface tabInterface {
  label: string;
  value: string;
}

export const filterType = {
  all: "ALL",
  done: "DONE",
  todo: "TODO",
};

export const INITIAL_TODO = {
  name: '',
  completed: false,
  description: '',
};

export const tabsValue = [
  {
    label: "Mostrar todo",
    value: "ALL",
  },
  {
    label: "En curso",
    value: "TODO",
  },
  {
    label: "Terminadas",
    value: "DONE",
  },
];

export const StateValue = {
  OK: {
    color: "green",
    description: "Haz terminado todas las tareas"
  },
  WARNING: {
    color: "YELLOW",
    description: "Ya casi llegas a la meta!"
  },
  CRITICAL: {
    color: "red",
    description: "Debes realizar las tareas"
  }
}


