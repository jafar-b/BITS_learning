import React, { createContext, useContext, useReducer, useCallback, ReactNode } from "react";

export interface Task {            //exporting because i am using it in Context file
  id: number;
  text: string;
  completed: boolean;
}

type Action =
  | { type: "ADD_TASK"; text: string }
  | { type: "REMOVE_TASK"; id: number }
  | { type: "TOGGLE_TASK"; id: number };


const taskReducer = (state: Task[], action: Action): Task[] => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, { id: Date.now(), text: action.text, completed: false }];
    case "REMOVE_TASK":
      return state.filter((task) => task.id !== action.id);
    case "TOGGLE_TASK":
      return state.map((task) =>
        task.id === action.id ? { ...task, completed: !task.completed } : task
      );
    default:
      return state;
  }
};

const TaskContext = createContext<any>(null);    //put "any" for simplicity in understanding concept 
export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  const addTask = useCallback((text: string) => dispatch({ type: "ADD_TASK", text }), []);        //used useCallback here so no re-renders
  const removeTask = useCallback((id: number) => dispatch({ type: "REMOVE_TASK", id }), []);
  const toggleTask = useCallback((id: number) => dispatch({ type: "TOGGLE_TASK", id }), []);

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask, toggleTask }}>
      {children}
    </TaskContext.Provider>
  );
};

  //custom hook basicaly gives access to global task state
export const useTasks = () => {               
  const context = useContext(TaskContext);
  return context;
};
