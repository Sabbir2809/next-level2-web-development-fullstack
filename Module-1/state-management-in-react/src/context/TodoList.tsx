import { useContext } from "react";
import { TodoContext } from "./TodoProvider";

type TTodo = {
  id: string;
  title: string;
  isCompleted: boolean;
};

export const TodoList = () => {
  const { state, dispatch } = useContext(TodoContext);
  console.log(state);

  return (
    <div>
      {state.map((item: TTodo) => (
        <li
          key={item.id}
          className={`cursor-pointer ${item.isCompleted ? "line-through" : ""}`}
          onClick={() => dispatch({ type: "taskComplete", payload: item.id })}>
          {item.title}
        </li>
      ))}
    </div>
  );
};
