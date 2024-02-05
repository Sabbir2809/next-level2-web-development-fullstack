import { useState } from "react";
import CounterWithFunction from "./components/CounterWithFunction";
import { UserInfoWithUseReducer } from "./components/UserInfoWithUseReducer";
import UserInfoWithUseState from "./components/UserInfoWithUseState";
import { TodoForm } from "./components/todo/TodoForm";
import { TodoList } from "./context/TodoList";
import { TodoProvider } from "./context/TodoProvider";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-2xl text-center">State Management in React</h1>
      <div className="border border-purple-500 p-10 m-10">
        {/* <CounterWithClass /> */}
        <h2>Counter: {count}</h2>
        <CounterWithFunction count={count} setCount={setCount} />
        <UserInfoWithUseState />
        <UserInfoWithUseReducer />
        <TodoProvider>
          <TodoForm />
          <TodoList />
        </TodoProvider>
      </div>
    </>
  );
};

export default App;
