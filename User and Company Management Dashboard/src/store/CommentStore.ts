import { create } from "zustand";
import { Comment } from "../models/Comment";

type commentStoreType = {
  comments: Comment[];
  setComments: (comments: Comment[]) => void;
};
export const useCommentStore = create<commentStoreType>((set) => ({
  comments: [],
  setComments: (commentsList: Comment[]) => {
    set({ comments: commentsList });
  },
}));
