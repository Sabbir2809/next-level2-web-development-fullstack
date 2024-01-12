import { useGetTodosQuery } from "@/redux/api/api";
import { useAppSelector } from "@/redux/hook";
import AddTodoModal from "./AddTodoModal";
import TodoCard from "./TodoCard";
import TodoFilter from "./TodoFilter";

export default function TodoContainer() {
  const { todos } = useAppSelector((state) => state.todos);

  const { data, isLoading, isError } = useGetTodosQuery(undefined);

  if (isLoading) return <p>Loading ....</p>;

  return (
    <div>
      <div className="flex justify-between mb-5">
        <AddTodoModal />
        <TodoFilter />
      </div>
      <div className="bg-primary-gradient w-full h-full rounded-lg p-[5px]">
        {todos.length > 0 ? (
          <div className="bg-white p-5 w-full rounded-lg space-y-3">
            {todos.map((todo) => (
              <TodoCard key={todo.id} {...todo} />
            ))}
          </div>
        ) : (
          <div className="bg-white text-2xl font-bold p-5 flex justify-center items-center rounded-md">
            <p>There is no task pending</p>
          </div>
        )}
      </div>
    </div>
  );
}
