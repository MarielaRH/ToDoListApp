export interface Todo  {
    id?: string,
    name: string;
    completed: boolean;
    description: string;
}

export const filterType = {
  all: 'ALL',
  done: 'DONE',
  todo: 'TODO'
}

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
]

export interface tabInterface {
  label: string,
  value: string,
}