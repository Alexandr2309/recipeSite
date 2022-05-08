import { useId, useMemo, useState, useEffect } from 'react';
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
  const [posts, setPosts] = useState([
    { id: useId(), title: 'Первое', author: "Коломыцкий А.М", date: Date.now() - 10, createdAt: Date.now() - 100000, updatedAt: Date.now() - 10000, about: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit ratione consequuntur neque quibusdam, sapiente reiciendis.', img: require('./images/logo512.png'), sweets: false },
    { id: useId(), title: 'Второе', author: "Коломыцкая Л.В", date: Date.now() - 10, about: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit ratione consequuntur neque quibusdam, sapiente reiciendis.', img: require('./images/logo512.png'), sweets: false },
    { id: useId(), title: 'Третье', author: "Джиба С.Е", date: Date.now() - 150000, about: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit ratione consequuntur neque quibusdam, sapiente reiciendis.', img: require('./images/logo512.png'), sweets: false },
    { id: useId(), title: 'Пироженное', author: "Джиба С.Е", date: Date.now() - 150000, about: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit ratione consequuntur neque quibusdam, sapiente reiciendis.', img: require('./images/logo512.png'), sweets: true }
  ]);
  const [nowPosts, updatePosts] = useState([])
  const [state, setState] = useState(false);

  const value = useMemo(
    () => ({ nowPosts, updatePosts }),
    [nowPosts]
  )
  const componentDidMount = async () => {
    setState(true);

    await api.getAllRecipes().then(recipes => {
      console.log(recipes)
      setPosts([...recipes.data.data]);
      setState(false);
    })
  }

  // useEffect(() => {
  //   componentDidMount();
  //   updatePosts([...posts]);
  // }, [])


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
