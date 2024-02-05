import { decrement, increment, incrementByValue } from "./redux/features/counterSlice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";

export default function App() {
  const dispatch = useAppDispatch();
  const { count } = useAppSelector((state) => state.counter);

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="flex align-middle border border-purple-300 rounded-md bg-slate-50 p-10">
        <h1 className="text-3xl text-purple-700 font-semibold ml-3 mr-3">{count}</h1>
        <button
          onClick={() => dispatch(incrementByValue(5))}
          className="px-3 py-2 mx-2 rounded-md bg-green-500 text-xl font-semibold text-white hover:cursor-pointer">
          Increment by 5
        </button>
        <button
          onClick={() => dispatch(increment())}
          className="px-3 py-2 mx-2 rounded-md bg-green-500 text-xl font-semibold text-white hover:cursor-pointer">
          Increment
        </button>

        <button
          onClick={() => dispatch(decrement())}
          className="px-3 py-2 mx-2 rounded-md bg-red-500 text-xl font-semibold text-white hover:cursor-pointer">
          Decrement
        </button>
      </div>
    </div>
  );
}
