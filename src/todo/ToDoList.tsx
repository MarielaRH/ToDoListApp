import React, { ChangeEvent, useState, useEffect } from "react";
import { filterType, Todo } from "./interfaces/interfaces";
import { ToDo } from "./common/ToDo";
import "./ToDoList.css";
import uuid from "react-uuid";
import { Button, Navbar } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DialogTodo from "./common/DialogTodo";

type Filter = "ALL" | "DONE" | "TODO";
type State = "red" | "yellow" | "green";
const filterTypeTodo = filterType;

export const ToDoList = () => {
  const [todoValue, setTodoValue] = useState<Todo | null>(null);
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("ALL");
  const [todoInEdition, setTodoInEdition] = useState<Todo | null>(null);
  const [todoListState, setTodoListState] = useState<State>("yellow");
  const [showDialog, setShowDialog] = useState<boolean>(false);

  useEffect(() => {
    let completedCount = 0;
    todoList.forEach((todo) => {
      if (todo.completed) {
        completedCount += 1;
      }
      ``;
    });

    if (completedCount === todoList.length) {
      setTodoListState("green");
    } else if (completedCount >= todoList.length / 2) {
      setTodoListState("yellow");
    } else if (completedCount < todoList.length / 2) {
      setTodoListState("red");
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
   * It add a new todo in Todolist and clean Input's value
   * @param event
   */
  const handlerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (todoValue?.id) {
      setTodoList(
        todoList.filter((todoItem) => {
          if (todoItem.id == todoValue.id) {
            todoItem.name = todoValue.name;
          }
          return todoItem;
        })
      );
      showToastMessage("Tarea editada con éxito");
    } else {
      // It Add a new todo to the list
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
    // Clean the todo state
    setTodoValue(null);
    setShowDialog(false);

    // If todo is in edition, c
    if (todoInEdition) {
      setTodoInEdition(null);
    }
  };

  /**
   * It Obtain input's value
   * @param event: ChangeEvent<HTMLInputElement>
   */
  const handlerChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    // if input's value is valid, it updated state
    if (todoValue?.id) {
      setTodoValue({
        id: todoValue.id,
        name: event.target.value,
        completed: todoValue.completed,
        description: todoValue ? todoValue.description : "",
      });
    } else {
      setTodoValue({
        name: event.target.value,
        completed: false,
        description: todoValue ? todoValue.description : "",
      });
    }
  };

  const handlerChangeTextarea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    // if input's value is valid, it updated state
    if (todoValue?.id) {
      setTodoValue({
        id: todoValue.id,
        name: todoValue ? todoValue.name : "",
        completed: todoValue.completed,
        description: event.target.value,
      });
    } else {
      setTodoValue({
        name: todoValue ? todoValue.name : "",
        completed: false,
        description: event.target.value,
      });
    }
  };

  /**
   * Delete specific todo
   * @param todo: Todo
   */
  const onDeleteTodo = (todo: Todo) => {
    // const filterList = todoList.filter((todoItem) => todoItem.id !== todo.id);
    setTodoList(todoList.filter((todoItem) => todoItem.id !== todo.id));
  };

  /**
   * Change todo's state
   * @param todo: Todo
   */
  const onCompleteTodo = (todo: Todo) => {
    setTodoList(
      todoList.filter((todoItem) => {
        if (todoItem.id == todo.id) {
          todoItem.completed = !todoItem.completed;
        }
        return todoItem;
      })
    );
  };

  /**
   * Update todo's name
   * @param todo: Todo
   */
  const onUpdateTodo = (todo: Todo) => {
    setShowDialog(true);
    setTodoValue(todo);
    setTodoInEdition(todo);
  };

  const showDescriptionStatus = () => {
    switch (todoListState) {
      case "green":
        return "Haz terminado todas las tareas";
      case "yellow":
        return "Ya casi llegas a la meta!";
      case "red":
        return "Debes realizar las tareas";
    }
  };

  return (
    <div className="h-screen layout_main">
      <DialogTodo
        handlerChangeInput={handlerChangeInput}
        handlerChangeTextarea={handlerChangeTextarea}
        handlerSubmit={handlerSubmit}
        setShowDialog={setShowDialog}
        setTodoValue={setTodoValue}
        showDialog={showDialog}
        todoInEdition={todoInEdition}
        todoValue={todoValue}
      ></DialogTodo>

      {/* Navbar application */}
      <Navbar className="min-w-full h-20 rounded-none navbar-style">
        <div className="flex items-center justify-between text-blue-gray-300">
          <div className="lg:inline-flex flex justify-between">
            <Button
              variant="text"
              className={`ml-2 mr-2 ${
                filter == "ALL" ? "bg-blue-400 text-white hover:bg-blue-400" : "hover:text-white"
              }`}
              onClick={() => setFilter("ALL")}
            >
              Todas las tareas
            </Button>
            <Button
              variant="text"
              className={`ml-2 mr-2 ${
                filter == "TODO" ? "bg-blue-400 text-white hover:bg-blue-400" : "hover:text-white"
              }`}
              onClick={() => setFilter("TODO")}
            >
              Por hacer
            </Button>
            <Button
              variant="text"
              className={`ml-2 mr-2 ${
                filter == "DONE" ? "bg-blue-400 text-white hover:bg-blue-400" : "hover:text-white"
              }`}
              onClick={() => setFilter("DONE")}
            >
              Finalizadas
            </Button>
          </div>
          <Button
            variant="gradient"
            size="sm"
            className="lg:inline-block rounded-full p-2"
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
        </div>
      </Navbar>

      {/* TODO items */}
      <div className="grid w-full p-5 rounded-2xl todos-section">
        <div className="rounded p-5 overflow-y-auto overflow-x-hidden">
          {todoList.map((todo) => {
            if (filter == filterTypeTodo.all) {
              return (
                <ToDo
                  item={todo}
                  onDeleteTodo={onDeleteTodo}
                  onCompleteTodo={onCompleteTodo}
                  onUpdateTodo={onUpdateTodo}
                  key={todo.id}
                />
              );
            } else if (filter == filterTypeTodo.done) {
              if (todo.completed) {
                return (
                  <ToDo
                    item={todo}
                    onDeleteTodo={onDeleteTodo}
                    onCompleteTodo={onCompleteTodo}
                    onUpdateTodo={onUpdateTodo}
                    key={todo.id}
                  />
                );
              }
            } else if (filter == filterTypeTodo.todo) {
              if (!todo.completed) {
                return (
                  <ToDo
                    item={todo}
                    onDeleteTodo={onDeleteTodo}
                    onCompleteTodo={onCompleteTodo}
                    onUpdateTodo={onUpdateTodo}
                    key={todo.id}
                  />
                );
              }
            }
          })}
        </div>
      </div>

      {/* Global state indicator */}
      <div className="w-full flex justify-center items-center footer h-12 rounded-none">
        <div
          className={`h-4 w-4 bg-${todoListState}-500 rounded-full mr-3`}
        ></div>
        <div className="text-xs text-white">{showDescriptionStatus()}</div>
      </div>

      <ToastContainer />
    </div>
  );
};
