import { createContext, Dispatch, useReducer } from "react";

type CategoryState = {
  selectedCategory: string;
};

type CategoryAction = { type: "SET_CATEGORY"; payload: string };

const initialCategory: CategoryState = {
  selectedCategory: "",
};

export const categoryReducer = (
  state: CategoryState,
  action: CategoryAction
) => {
  switch (action.type) {
    case "SET_CATEGORY":
      return { ...state, selectedCategory: action.payload };
    default:
      return state;
  }
};

export const CategoryContext = createContext<{
  state: CategoryState;
  dispatch: Dispatch<CategoryAction>;
}>({ state: initialCategory, dispatch: () => null });


export const CategoryProvider= ({ children }:{children:React.ReactNode}) => {
  const [state, dispatch] = useReducer(categoryReducer, initialCategory);
  return (
    <CategoryContext.Provider value={{ state, dispatch }}>
      {children}
    </CategoryContext.Provider>
  );
};