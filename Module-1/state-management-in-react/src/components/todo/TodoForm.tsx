import { FormEvent, useContext, useState } from "react";
import { TodoContext } from "../../context/TodoProvider";

export const TodoForm = () => {
  const { state, dispatch } = useContext(TodoContext);
  const [task, setTask] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const todo = {
      id: Date.now().toString(),
      title: task,
      isCompleted: false,
    };

    dispatch({ type: "addTodo", payload: todo });
  };
  console.log(state);

  return (
    <div>
      <h1 className="text-xl">Add Todo</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="todo">Task</label>
        <input
          onBlur={(e) => setTask(e.target.value)}
          className="border border-red-500"
          type="text"
          name="todo"
          id="todo"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-blue-400 text-white font-bold border-b-4 border-blue-700 hover:border-blue-500 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};
