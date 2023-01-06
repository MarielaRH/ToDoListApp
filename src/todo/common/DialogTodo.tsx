import { Button, Dialog, Input, Textarea } from "@material-tailwind/react";
import { ChangeEvent } from "react";
import { Todo } from "../interfaces/interfaces";
import '../common/DialogTodo.css'

interface Props {
  showDialog: boolean;
  todoValue: Todo | null;
  todoInEdition: Todo | null;
  setShowDialog: (showDialog: boolean) => void;
  setTodoValue: (param: Todo | null) => void;
  handlerSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handlerChangeInput: (ev: ChangeEvent<HTMLInputElement>) => void;
  handlerChangeTextarea: (ev: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const DialogTodo: React.FC<Props> = ({
  showDialog,
  todoValue,
  todoInEdition,
  setShowDialog,
  setTodoValue,
  handlerSubmit,
  handlerChangeInput,
  handlerChangeTextarea,
}) => {
  return (
    // Form to create and edit a TODO
    <Dialog
      open={showDialog}
      size="md"
      handler={() => {
        setShowDialog(!showDialog);
        setTodoValue(null);
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

        {todoValue && todoValue?.id ? (
          <div className="w-full sm:grid md:flex lg:flex sm:justify-center md:justify-end lg:justify-end">
            <Button
              className="
              sm:w-full md:w2/4 lg:w-1/4 m-1 bg-gray-500 border-gray-500 shadow-gray-500/20 hover:shadow-gray-500/40"
              onClick={() => {
                setTodoValue(null);
                setShowDialog(false);
              }}
            >
              Cancelar
            </Button>
            <Button
              className="sm:w-full md:w2/4 lg:w-1/4 m-1"
              type="submit"
              disabled={
                !todoValue?.name ||
                todoValue?.name == todoInEdition?.name ||
                !todoValue.description
              }
            >
              Guardar
            </Button>
          </div>
        ) : (
          <div className="w-full sm:grid md:flex lg:flex sm:justify-center md:justify-end lg:justify-end">
            <Button
              className="sm:w-full md:w2/4 lg:w-4/4 m-1 bg-gray-500	border-gray-500 shadow-gray-500/20 hover:shadow-gray-500/0"
              onClick={() => {
                setTodoValue(null);
                setShowDialog(false);
              }}
            >
              Cancelar
            </Button>
            <Button
              className="sm:w-full md:w2/4 lg:w-4/4 m-1"
              type="submit"
              disabled={!todoValue?.name || !todoValue?.description}
            >
              Agregar
            </Button>
          </div>
        )}
      </form>
    </Dialog>
  );
};

export default DialogTodo;
