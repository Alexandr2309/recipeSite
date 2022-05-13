import { createContext } from 'react';
import api from '../api/index';

const componentDidMount = async () => {
  return await api.getAllRecipes().then(recipes => {
    return recipes.data.data
  });
}
const posts = componentDidMount()
export const PostsContext = createContext(posts);
export const NowPosts = createContext({
  nowPosts: posts,
  updatePosts: () => { }
});
export const IsUpdate = createContext({
  isUpdate: false,
  setIsUpdate: () => { }
})