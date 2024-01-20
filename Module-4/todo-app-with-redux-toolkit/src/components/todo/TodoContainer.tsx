import { useGetTodosQuery } from "@/redux/api/api";
import { useState } from "react";
import AddTodoModal from "./AddTodoModal";
import TodoCard from "./TodoCard";
import TodoFilter from "./TodoFilter";

export default function TodoContainer() {
  const [priority, setPriority] = useState("");
  // const { todos } = useAppSelector((state) => state.todos);
  const { data: todos, isLoading } = useGetTodosQuery(priority);

  if (isLoading) return <p>Loading ....</p>;

  return (
    <div>
      <div className="flex justify-between mb-5">
        <AddTodoModal />
        <TodoFilter priority={priority} setPriority={setPriority} />
      </div>
      <div className="bg-primary-gradient w-full h-full rounded-lg p-[5px]">
        <div className="bg-white p-5 w-full rounded-lg space-y-3">
          {todos?.data?.map((todo) => (
            <TodoCard key={todo._id} {...todo} />
          ))}
        </div>

        {/* <div className="bg-white text-2xl font-bold p-5 flex justify-center items-center rounded-md">
            <p>There is no task pending</p>
          </div> */}
      </div>
    </div>
  );
}
