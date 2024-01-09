// import { useState } from "react";

import ChildFunction from "./ChildFunction";

type TProps = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

const CounterWithFunction = ({ count, setCount }: TProps) => {
  // const [count, setCount] = useState(0);
  console.log(count, "render");

  return (
    <div className="border border-red-500 p-10 m-10">
      <button
        onClick={() => setCount((prev) => prev + 1)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
        Click for Update
      </button>
      <ChildFunction count={count} />
    </div>
  );
};

export default CounterWithFunction;
