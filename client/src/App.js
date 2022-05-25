import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Burger from './components/burger/burger';
import { setIsUpdate } from './store/slices/isUpdate';
import { getPosts } from './store/slices/posts';
import All from './views/All/All';
import FormEdit from './views/EditPage/FormEdit';
import Favorites from './views/Favorites/Favorites';
import Sweets from './views/forAnya/Sweets';
import Form from './views/Form/Form';
import PostPage from './views/PostPage/PostPage';
import { useAuth } from './hooks/useAuth';
import Register from './views/Register/Register';
import LoginPage from './views/Login/LoginPage';
import { setUser, getUserPosts } from './store/slices/userSlice';
function App() {

  const dispatch = useDispatch();

  const isUpdate = useSelector(state => state.isUpdate.isUpdate);
  const posts = useSelector(state => state.posts.posts);
  useEffect(() => {
    if (window.localStorage.getItem('id')) {
      dispatch(setUser({
        email: window.localStorage.getItem('email'),
        name: window.localStorage.getItem('name'),
        surname: window.localStorage.getItem('surname'),
        id: window.localStorage.getItem('id'),
        token: window.localStorage.getItem('token'),
      }));
      dispatch(getUserPosts(window.localStorage.getItem('id')));
    }
  }, [])
  const { isAuth } = useAuth();

  useEffect(() => {
    dispatch(getPosts())
    dispatch(setIsUpdate(false))
  }, [isUpdate])

  return isAuth
    ? (
      posts.length &&
      <>
        <Burger isAuth={isAuth} />
        <Routes>
          <Route element={<All />} path='/recipe/list'></Route>
          <Route element={<Form />} path='/recipe/create'></Route>
          <Route element={<Sweets />} path='/recipe/sweets'></Route>
          <Route element={<PostPage />} path='/recipe/list/:id'></Route>
          <Route element={<FormEdit />} path='/recipe/edit/:id'></Route>
          <Route element={<Favorites />} path='/recipe/favorite' ></Route>
          <Route element={<Register />} path='/register'></Route>
          <Route element={<LoginPage />} path='/login'></Route>
          <Route element={<All />} path='*'></Route>
        </Routes>
      </>
    )
    : (
      <>
        <Burger isAuth={isAuth} />
        <Routes>
          <Route element={<All />} path='/recipe/list'></Route>
          <Route element={<LoginPage />} path='/recipe/create'></Route>
          <Route element={<Sweets />} path='/recipe/sweets'></Route>
          <Route element={<PostPage />} path='/recipe/list/:id'></Route>
          <Route element={<Register />} path='/register'></Route>
          <Route element={<LoginPage />} path='/login'></Route>
          <Route element={<All />} path='*'></Route>
        </Routes>
      </>
    )
}



export default App;