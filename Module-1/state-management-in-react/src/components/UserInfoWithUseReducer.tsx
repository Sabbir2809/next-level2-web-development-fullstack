import { ChangeEvent, useReducer } from "react";

// initialSate
const initialState = {
  name: "",
  age: "",
  hobbies: [] as string[],
};

type TAction = {
  type: string;
  payload: string;
};

export const UserInfoWithUseReducer = () => {
  // reducer
  const reducer = (currentState: typeof initialState, action: TAction) => {
    switch (action.type) {
      case "addName":
        return {
          ...currentState,
          name: action.payload,
        };
      case "addAge":
        return {
          ...currentState,
          age: action.payload,
        };
      case "addHobbies":
        return {
          ...currentState,
          hobbies: [...currentState.hobbies, action.payload],
        };

      default:
        return currentState;
    }
  };

  // state
  const [state, dispatch] = useReducer(reducer, initialState);

  // submit
  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(state);
  };

  return (
    <form className="border border-blue-900" onSubmit={handleSubmit}>
      <input
        onChange={(e) => dispatch({ type: "addName", payload: e.target.value })}
        className="border border-purple-300 p-2 m-2"
        type="text"
        name="name"
        id="name"
        placeholder="name"
      />
      <input
        onChange={(e) => dispatch({ type: "addAge", payload: e.target.value })}
        className="border border-purple-300 p-2 m-2"
        type="text"
        name="age"
        id="age"
        placeholder="age"
      />
      <input
        onBlur={(e) => dispatch({ type: "addHobbies", payload: e.target.value })}
        className="border border-purple-300 p-2 m-2"
        type="text"
        name="hobbies"
        id="hobbies"
        placeholder="hobbies"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-2 border-b-4 border-blue-700 hover:border-blue-500 rounded">
        Submit
      </button>
    </form>
  );
};
