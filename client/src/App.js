import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import api from './api/index';
import './App.css';
import Burger from './components/burger/burger';
import { IsUpdate, NowPosts, PostsContext, isUpdate } from './context/Context';
import All from './views/All/All';
import FormEdit from './views/EditPage/FormEdit';
import Favorites from './views/Favorites/Favorites';
import Sweets from './views/forAnya/Sweets';
import Form from './views/Form/Form';
import PostPage from './views/PostPage/PostPage';

function App() {
  const [posts, setPosts] = useState('')
  const [nowPosts, updatePosts] = useState([])
  const [isUpdate, setIsUpdate] = useState(false)

  const isUpdata = useMemo(
    () => ({ isUpdate, setIsUpdate })
  )
  const value = useMemo(
    () => ({ nowPosts, updatePosts }),
    [nowPosts]
  )
  const componentDidMount = async () => {
    await api.getAllRecipes().then(recipes => {
      setPosts(recipes.data.data);
      updatePosts([...posts])
    })
  }

  useEffect(() => {
    setIsUpdate(false)
    componentDidMount()
  }, [isUpdate])


  return (
    posts.length &&
    <IsUpdate.Provider value={isUpdata}>
      <PostsContext.Provider value={posts}>
        <NowPosts.Provider value={value}>
          <BrowserRouter>
            <Burger />
            <Routes>
              <Route element={<All />} path='/recipe/list'></Route>
              <Route element={<Form />} path='/recipe/create'></Route>
              <Route element={<Sweets />} path='/recipe/sweets'></Route>
              <Route element={<PostPage />} path='/recipe/list/:id'></Route>
              <Route element={<FormEdit />} path='/recipe/edit/:id'></Route>
              <Route element={<Favorites />} path='/recipe/favorite'></Route>
              <Route element={<All />} path='*'></Route>
            </Routes>
          </BrowserRouter></NowPosts.Provider>
      </PostsContext.Provider>
    </IsUpdate.Provider>
  );
}

export default App;
