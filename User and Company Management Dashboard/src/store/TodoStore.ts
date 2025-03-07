import { create } from "zustand";
import { Todo } from "../models/Todo";

type todoStoreType = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
};

export const useTodoStore = create<todoStoreType>((set) => ({
  todos: [],
  setTodos: (todos: Todo[]) => set({ todos }),
}));
