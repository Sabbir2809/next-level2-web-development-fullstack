import { ReactNode, createContext, useReducer } from "react";

// all type
type TTodoProviderProps = {
  children: ReactNode;
};

type TTodo = {
  id: string;
  title: string;
  isCompleted: boolean;
};

type TAction = {
  type: "addTodo" | "taskComplete";
  payload: TTodo | string;
};

const typeConstants = {
  ADD_TODO: "addTodo",
  TASK_COMPLETE: "taskComplete",
};

// create context
export const TodoContext = createContext<{
  state: TTodo[];
  dispatch: React.Dispatch<TAction>;
} | null>(null);

// initial state
const initialState: TTodo[] = [];

// reducer
const reducer = (currentState: TTodo[], action: TAction) => {
  switch (action.type) {
    case typeConstants.ADD_TODO:
      return [...currentState, action.payload];
    case typeConstants.TASK_COMPLETE:
      return currentState.map((item) =>
        item.id === action.payload ? { ...item, isCompleted: !item.isCompleted } : item
      );

    default:
      return currentState;
  }
};

// provider
export const TodoProvider = ({ children }: TTodoProviderProps) => {
  // useReducer
  const [state, dispatch] = useReducer(reducer, initialState);
  // value
  const values = {
    state,
    dispatch,
  };

  return <TodoContext.Provider value={values}>{children}</TodoContext.Provider>;
};
