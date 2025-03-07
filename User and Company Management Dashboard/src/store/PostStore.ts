import { create } from "zustand";
import { Post } from "../models/Post";

type postStoreType = {
  posts: Post[];
  setPosts: (postsList: Post[]) => void;
};

export const usePostStore = create<postStoreType>((set) => ({
  posts: [],
  setPosts: (postsList: Post[]) => set({ posts: postsList }),
}));
