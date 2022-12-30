import { Todo } from "../interfaces/interfaces";
import'./ToDo.css'

interface Props{
  item: Todo,
  onDeleteTodo: (todo:Todo) => void,
  onUpdateTodo: (todo:Todo) => void,
  onCompleteTodo: (todo:Todo) => void
}

export const ToDo: React.FC<Props> = ({item, onDeleteTodo, onUpdateTodo, onCompleteTodo}) => {
  return (
    <div className="item_todo_container">
        <div className="item_todo_content">
            <span>{item.name}</span>
            <div className="item_todo_actions">
                <span onClick={() => onUpdateTodo(item) }>edit</span>
                <span onClick={() => onCompleteTodo(item)}>{item.completed ? 'true' : 'false'}</span>
                <span onClick={() => onDeleteTodo(item)}>del</span>
            </div>
        </div>
    </div>
  );
};
