import React, { useState, useEffect } from "react";
import {
  filterType,
  INITIAL_TODO,
  StateValue,
  Todo,
} from "./interfaces/interfaces";
import { ToDo } from "./common/ToDo";
import "./ToDoList.css";
import uuid from "react-uuid";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Navbar,
} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DialogTodo } from "./common/DialogTodo";

type Filter = "ALL" | "DONE" | "TODO";
type State = {
  color: string;
  description: string;
};
const filterTypeTodo = filterType;

export const ToDoList = () => {
  const [todoValue, setTodoValue] = useState<Todo>(INITIAL_TODO);
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("ALL");
  const [todoListState, setTodoListState] = useState<State>(StateValue.WARNING);
  const [showDialog, setShowDialog] = useState<boolean>(false);

  useEffect(() => {
    const completedCount = todoList.reduce((count, todo) => {
      if (todo.completed) {
        return count + 1;
      }
      return count;
    }, 0);

    if (completedCount === todoList.length) {
      setTodoListState(StateValue.OK);
    } else if (completedCount >= todoList.length / 2) {
      setTodoListState(StateValue.WARNING);
    } else if (completedCount < todoList.length / 2) {
      setTodoListState(StateValue.CRITICAL);
    }
  }, [todoList]);

  const showToastMessage = (message: string) => {
    toast(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: "toast-message",
      delay: 100,
    });
  };

  /**
   * Adds a new todo in Todolist and cleans Input's value
   * @param event
   */
  const handlerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (todoValue?.id) {
      const mapList = todoList.map((todoItem) => {
        const newItem = { ...todoItem };
        if (todoItem.id === todoValue.id) {
          newItem.name = todoValue.name;
          newItem.description = todoValue.description;
          newItem.completed = todoValue.completed;
        }
        return newItem;
      });

      setTodoList(mapList);
      showToastMessage("Tarea editada con éxito");
    } else {
      // Adds a new todo to the list
      if (todoValue?.name) {
        setTodoList([
          ...todoList,
          {
            id: uuid(),
            name: todoValue.name,
            completed: false,
            description: todoValue.description,
          },
        ]);
      }
      showToastMessage("Tarea agregada con éxito");
      setFilter("ALL");
    }
    // Cleans the todo state
    setTodoValue(INITIAL_TODO);
    setShowDialog(false);
  };

  /**
   * Deletes specific todo
   * @param todo: Todo
   */
  const onDeleteTodo = (todo: Todo) => {
    const filterList = todoList.filter((todoItem) => todoItem.id !== todo.id);
    setTodoList(filterList);
  };

  /**
   * Change todo's state
   * @param todo: Todo
   */
  const onCompleteTodo = (todo: Todo) => {
    const mapList = todoList.map((todoItem) => {
      const newItem = { ...todoItem };
      if (todoItem.id === todo.id) {
        newItem.completed = !newItem.completed;
      }
      return newItem;
    });
    setTodoList(mapList);
  };

  /**
   * Update todo's name
   * @param todo: Todo
   */
  const onUpdateTodo = (todo: Todo) => {
    setShowDialog(true);
    setTodoValue(todo);
  };

  const deleteFinishedTasks = () => {
    const filterList = todoList.filter((todoItem) => !todoItem.completed);
    setTodoList(filterList);
  };

  return (
    <div className="h-screen layout_main">
      <DialogTodo
        handlerSubmit={handlerSubmit}
        setShowDialog={setShowDialog}
        setTodoValue={setTodoValue}
        showDialog={showDialog}
        todoValue={todoValue}
      />

      {/* Navbar application */}
      <Navbar className="min-w-full h-20 rounded-none navbar-style">
        <div className="flex items-center justify-between text-blue-gray-300">
          <div className="lg:inline-flex flex justify-between">
            <Button
              variant="text"
              className={`ml-2 mr-2 ${
                filter === "ALL"
                  ? "bg-blue-400 text-white hover:bg-blue-400"
                  : "hover:text-white"
              }`}
              onClick={() => setFilter("ALL")}
            >
              Todas las tareas
            </Button>
            <Button
              variant="text"
              className={`ml-2 mr-2 ${
                filter === "TODO"
                  ? "bg-blue-400 text-white hover:bg-blue-400"
                  : "hover:text-white"
              }`}
              onClick={() => setFilter("TODO")}
            >
              Por hacer
            </Button>
            <Button
              variant="text"
              className={`ml-2 mr-2 ${
                filter === "DONE"
                  ? "bg-blue-400 text-white hover:bg-blue-400"
                  : "hover:text-white"
              }`}
              onClick={() => setFilter("DONE")}
            >
              Finalizadas
            </Button>
          </div>
          <div className="flex items-center justify-center">
            <Button
              variant="gradient"
              size="sm"
              className="lg:inline-block rounded-full p-2 mr-5"
              onClick={() => setShowDialog(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m6-6H6"
                />
              </svg>
            </Button>
            <Menu>
              <MenuHandler>
                <Button className="p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </Button>
              </MenuHandler>
              <MenuList>
                <MenuItem onClick={() => setTodoList([])} disabled={todoList.length === 0}>
                  Eliminar todas las tares
                </MenuItem>
                <MenuItem onClick={deleteFinishedTasks} disabled={todoList.length === 0}>
                  Eliminar tareas terminadas
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
      </Navbar>

      {/* TODO items */}
      <div className="grid w-full p-5 rounded-2xl todos-section">
        <div className="rounded p-5 overflow-y-auto overflow-x-hidden">
          {todoList
            .filter((todo) => {
              if (filter === filterTypeTodo.all) return true;
              else if (filter === filterTypeTodo.done) return todo.completed;
              else if (filter === filterTypeTodo.todo) return !todo.completed;
            })
            .map((todo) => (
              <ToDo
                item={todo}
                onDeleteTodo={onDeleteTodo}
                onCompleteTodo={onCompleteTodo}
                onUpdateTodo={onUpdateTodo}
                key={todo.id}
              />
            ))}
        </div>
      </div>

      {/* Global state indicator */}
      <div className="w-full flex justify-center items-center footer h-12 rounded-none">
        {todoList.length > 0 ? (
          <>
            <div
              className={`h-4 w-4 bg-${todoListState.color.toLowerCase()}-500 rounded-full mr-3`}
            ></div>
            <div className="text-xs text-white">
              {todoListState.description}
            </div>
          </>
        ) : (
          <div className="text-xs text-white">Empieza a crear tus tareas!</div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};
