import { useEffect } from 'react';
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

function App() {

  const dispatch = useDispatch();

  const isUpdate = useSelector(state => state.isUpdate.isUpdate);
  const posts = useSelector(state => state.posts.posts);

  useEffect(() => {
    dispatch(getPosts())
    dispatch(setIsUpdate(false))
  }, [isUpdate])

  return (
    posts.length &&
    <>
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
    </>
  );
}

// <IsUpdate.Provider value={isUpdata}>
//   <PostsContext.Provider value={posts}>
//     <NowPosts.Provider value={value}>
//       <BrowserRouter>
//         <Burger />
//         <Routes>
//           <Route element={<All />} path='/recipe/list'></Route>
//           <Route element={<Form />} path='/recipe/create'></Route>
//           <Route element={<Sweets />} path='/recipe/sweets'></Route>
//           <Route element={<PostPage />} path='/recipe/list/:id'></Route>
//           <Route element={<FormEdit />} path='/recipe/edit/:id'></Route>
//           <Route element={<Favorites />} path='/recipe/favorite'></Route>
//           <Route element={<All />} path='*'></Route>
//         </Routes>
//       </BrowserRouter></NowPosts.Provider>
//   </PostsContext.Provider>
// </IsUpdate.Provider>


export default App;
