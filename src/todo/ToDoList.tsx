import { Button, Grid, InputAdornment, TextField } from "@mui/material";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { ChangeEvent, useState } from "react";
import React from "react";
import "./ToDoList.css";
import { filterType, Todo } from "./interfaces/interfaces";
import { ToDo } from "./common/ToDo";

type Filter = "ALL" | "DONE" | "TODO";
const filterTypeTodo = filterType;

export const ToDoList = () => {
  const [todoValue, setTodoValue] = useState<Todo | null>(null);
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("ALL");

  /**
   * It generate a id for a todo
   * @returns todoId: number
   */
  const generateTodoId = () => {
    const today = new Date();
    const todoId = parseInt(
      `${today.getFullYear()}${today.getMonth()}${today.getHours()}${today.getMinutes()}${today.getMilliseconds()}`
    );
    return todoId;
  };

  /**
   * It add a new todo in Todolist and clean Input's value
   * @param event
   */
  const handlerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (todoValue?.id) {
      // Update a todo=
      const filterList = todoList.filter((todoItem) => {
        if (todoItem.id == todoValue.id) {
          todoItem.name = todoValue.name;
        }
        return todoItem;
      });
      setTodoList(filterList);
    } else {
      // It Add a new todo to the list
      if (todoValue?.name) {
        setTodoList([
          ...todoList,
          {
            id: generateTodoId(),
            name: todoValue.name,
            completed: false,
          },
        ]);
      }
    }
    // Clean the todo state
    setTodoValue(null);
  };

  /**
   * It Obtain input's value
   * @param event: ChangeEvent<HTMLInputElement>
   */
  const handlerChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    // if input's value is valid, it updated state
    if (event.target.value.length > 0) {
      if (todoValue?.id) {
        setTodoValue({
          id: todoValue.id,
          name: event.target.value,
          completed: todoValue.completed,
        });
      } else {
        setTodoValue({
          name: event.target.value,
          completed: false,
        });
      }
    } else {
      setTodoValue(null);
    }
  };

  /**
   * Delete specific todo
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
    const filterList = todoList.filter((todoItem) => {
      if (todoItem.id == todo.id) {
        todoItem.completed = !todoItem.completed;
      }
      return todoItem;
    });

    setTodoList(filterList);
  };

  /**
   * Update todo's name
   * @param todo: Todo
   */
  const onUpdateTodo = (todo: Todo) => {
    setTodoValue(todo);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} display="flex" justifyContent="center">
        <h1>To Do List</h1>
      </Grid>
      <Grid container display="flex" justifyContent="center">
        <Grid item xs={12} md={8} lg={6}>
          <form onSubmit={handlerSubmit}>
            <Grid container direction={"column"}>
              <TextField
                id="outlined-basic"
                type="text"
                variant="outlined"
                value={todoValue ? todoValue.name : ""}
                name="todoName"
                placeholder="Nueva todo"
                margin="normal"
                onChange={handlerChangeInput}
                size={"small"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ListOutlinedIcon color="secondary" />
                    </InputAdornment>
                  ),
                  style: {
                    color: "white",
                    borderBlockColor: "white",
                  },
                }}
              />

              {todoValue && todoValue?.id ? (
                <Grid>
                  <Button
                    type="button"
                    variant="outlined"
                    disabled={!todoValue?.name}
                    color="info"
                    onClick={() => setTodoValue(null)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    variant="outlined"
                    disabled={!todoValue?.name}
                    color="info"
                  >
                    Guardar
                  </Button>
                </Grid>
              ) : (
                <Button
                  type="submit"
                  variant="outlined"
                  disabled={!todoValue?.name}
                  color="info"
                >
                  Agregar
                </Button>
              )}
            </Grid>
          </form>
        </Grid>
      </Grid>
      <Grid container display="flex" justifyContent="center">
        <p style={{ padding: "10px" }} onClick={() => setFilter("ALL")}>
          ALL
        </p>
        <p style={{ padding: "10px" }} onClick={() => setFilter("DONE")}>
          DONE
        </p>
        <p style={{ padding: "10px" }} onClick={() => setFilter("TODO")}>
          TODO
        </p>
      </Grid>
      <Grid container display="flex" justifyContent="center">
        <Grid item xs={12} md={8} lg={6} mt={2}>
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
        </Grid>
      </Grid>
    </Grid>
  );
};
