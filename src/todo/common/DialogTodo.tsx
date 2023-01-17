import { Button, Dialog, Input, Textarea } from "@material-tailwind/react";
import { ChangeEvent } from "react";
import { INITIAL_TODO, Todo } from "../interfaces/interfaces";
import "../common/DialogTodo.css";

interface Props {
  showDialog: boolean;
  todoValue: Todo;
  setShowDialog: (showDialog: boolean) => void;
  setTodoValue: (param: Todo) => void;
  handlerSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const DialogTodo: React.FC<Props> = ({
  showDialog,
  todoValue,
  setShowDialog,
  setTodoValue,
  handlerSubmit,
}) => {
  /**
   * Obtains input's value
   * @param event: ChangeEvent<HTMLInputElement>
   */
  const handlerChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    // if input's value is valid, update the state
    if (todoValue !== null) {
      setTodoValue({
        ...todoValue,
        name: event.target.value,
      });
    }
  };

  const handlerChangeTextarea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    // if input's value is valid, update the state
    if (todoValue !== null) {
      setTodoValue({
        ...todoValue,
        description: event.target.value,
      });
    }
  };
  return (
    // Form to create and edit a TODO
    <Dialog
      open={showDialog}
      size="md"
      handler={() => {
        setShowDialog(!showDialog);
        setTodoValue(INITIAL_TODO);
      }}
      className="p-7 custom-dialog"
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <p className="text-center mb-7">
        {todoValue?.id ? "Editando Tarea" : "Nueva Tarea"}
      </p>
      <form onSubmit={handlerSubmit}>
        <div className="flex w-full items-end gap-4 mb-6 input-form">
          <Input
            id="name-todo"
            label="Nombre ToDo"
            name="name-todo"
            onChange={handlerChangeInput}
            type={"text"}
            className="custom-input peer-focus:text-white"
            value={todoValue ? todoValue.name : ""}
            variant="outlined"
          />
        </div>
        <div className="flex flex-wrap items-stretch w-full mb-4 relative h-15 bg- items-center mb-6  textarea-form">
          <Textarea
            className="w-full custom-textarea"
            label="Descripción ToDo"
            onChange={handlerChangeTextarea}
            value={todoValue ? todoValue.description : ""}
          />
        </div>

        <div className="w-full md:flex lg:flex sm:justify-center md:justify-center lg:justify-end">
          <Button
            className="md:w2/4 m-1 bg-gray-500 border-gray-500 shadow-gray-500/20 hover:shadow-gray-500/40"
            onClick={() => {
              setTodoValue(INITIAL_TODO);
              setShowDialog(false);
            }}
          >
            Cancelar
          </Button>
          {todoValue && todoValue?.id ? (
            <Button
              className="md:w2/4 m-1"
              type="submit"
              disabled={!todoValue?.name || !todoValue.description}
            >
              Guardar
            </Button>
          ) : (
            <Button
              className="md:w2/4 m-1"
              type="submit"
              disabled={!todoValue?.name || !todoValue?.description}
            >
              Agregar
            </Button>
          )}
        </div>
      </form>
    </Dialog>
  );
};
