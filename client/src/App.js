import { useId, useMemo, useState, useEffect, useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Burger from './components/burger/burger';
import { NowPosts, PostsContext } from './context/Context';
import All from './views/All/All';
import Sweets from './views/forAnya/Sweets';
import Form from './views/Form/Form';
import PostPage from './views/PostPage/PostPage';
import api from './api/index'

function App() {
  const [posts, setPosts] = useState('')
  const [nowPosts, updatePosts] = useState([])
  const [state, setState] = useState(false);

  const value = useMemo(
    () => ({ nowPosts, updatePosts }),
    [nowPosts]
  )
  const componentDidMount = async () => {
    setState(true);

    await api.getAllRecipes().then(recipes => {
      setPosts(recipes.data.data);
      updatePosts([...posts])
    })
  }

  useEffect(() => {
    componentDidMount()
  }, [])


  return (
    posts.length &&
    <PostsContext.Provider value={posts}>
      <NowPosts.Provider value={value}>
        <BrowserRouter>
          <Burger />
          <Routes>
            <Route element={<All />} path='/recipe/list'></Route>
            <Route element={<Form />} path='/recipe/create'></Route>
            <Route element={<Sweets />} path='/recipe/sweets'></Route>
            <Route element={<PostPage />} path='/recipe/list/:id'></Route>
            <Route element={<All />} path='*'></Route>
          </Routes>
        </BrowserRouter></NowPosts.Provider>
    </PostsContext.Provider>
  );
}

export default App;
