import { Company } from "../models/Company";

type Action =
  | { type: "FILTER"; payload: string }
  | { type: "SORT"; payload: "asc" | "desc" }
  | { type: "ADD_COMPANY"; payload: Company }
  | { type: "RESET"; payload: Company[] }
  | { type: "UPDATE_COMPANY"; payload: Company }; // Fix: Expect a single company

export const reducer = (state: Company[], action: Action): Company[] => {
  switch (action.type) {
    case "FILTER":
      return state.filter((c) => c.marketCap?.toString().startsWith(action.payload));

    case "SORT":
      return [...state].sort((a, b) =>
        action.payload === "asc" ? a.marketCap - b.marketCap : b.marketCap - a.marketCap
      );

    case "ADD_COMPANY":
      return [...state, action.payload];

    case "RESET":
      return action.payload;

    case "UPDATE_COMPANY":
      return state.map((company) =>
        company.id === action.payload.id ? action.payload : company 
      );

    default:
      return state;
  }
};
