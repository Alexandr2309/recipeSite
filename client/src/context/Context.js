import { createContext } from 'react';

export const PostsContext = createContext(null);
export const NowPosts = createContext({
  nowPosts: null,
  updatePosts: () => { }
});