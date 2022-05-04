import { useId, useMemo, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Burger from './components/burger/burger';
import { NowPosts, PostsContext } from './context/Context';
import All from './views/All/All';
import Sweets from './views/forAnya/Sweets';
import Form from './views/Form/Form';
import PostPage from './views/PostPage/PostPage';

function App() {
  const [posts, setPosts] = useState([
    { id: useId(), title: 'Первое', author: "Коломыцкий А.М", date: Date.now() - 100000, about: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit ratione consequuntur neque quibusdam, sapiente reiciendis.', img:  require('./images/logo512.png'), sweets: false },
    { id: useId(), title: 'Второе', author: "Коломыцкая Л.В", date: Date.now() - 10, about: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit ratione consequuntur neque quibusdam, sapiente reiciendis.', img: require('./images/logo512.png'), sweets: false },
    { id: useId(), title: 'Третье', author: "Джиба С.Е", date: Date.now() - 150000, about: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit ratione consequuntur neque quibusdam, sapiente reiciendis.', img: require('./images/logo512.png'), sweets: false },
    { id: useId(), title: 'Пироженное', author: "Джиба С.Е", date: Date.now() - 150000, about: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit ratione consequuntur neque quibusdam, sapiente reiciendis.', img: require('./images/logo512.png'), sweets: true }
  ]);
  const [nowPosts, updatePosts] = useState([...posts])
  const value = useMemo(
    () => ({ nowPosts, updatePosts }),
    [nowPosts]
  )
  return (
    <PostsContext.Provider value={posts}>
      <NowPosts.Provider value={value}>
        <BrowserRouter>
          <Burger />
          <Routes>
            <Route element={<All />} path='/posts'></Route>
            <Route element={<Form />} path='/form'></Route>
            <Route element={<Sweets />} path='/sweets'></Route>
            <Route element={<PostPage />} path='/posts/:id'></Route>
            <Route element={<All />} path='*'></Route>
          </Routes>
        </BrowserRouter></NowPosts.Provider>
    </PostsContext.Provider>
  );
}

export default App;
