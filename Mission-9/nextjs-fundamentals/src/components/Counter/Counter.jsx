"use client";
import { useState } from "react";

const Counter = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <h2 className="text-2xl">{counter}</h2>
      <button onClick={() => setCounter(counter + 1)} className="btn btn-success">
        Increase
      </button>
      <button onClick={() => setCounter(counter - 1)} className="btn btn-error">
        Decrease
      </button>
    </div>
  );
};

export default Counter;
