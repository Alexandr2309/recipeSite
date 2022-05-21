import { React, useContext, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import NotFound from '../../components/UI/NotFound/NotFound';
import Posts from './../../components/Posts';
import { PostsContext, NowPosts } from './../../context/Context';
import Search from './../../components/search/Search';
import { useSelector, useDispatch } from 'react-redux';
import { updateNowPosts } from '../../store/slices/posts';

const Sweets = () => {
  const posts = useSelector(state => state.posts.posts)
  const nowPosts = useSelector(state => state.posts.nowPosts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateNowPosts([...posts]));
  }, [posts])
  return (
    <div className="App post__wrapper">
      <Search />
      {nowPosts.length
        ? <Posts posts={nowPosts} sweets={true} />
        : <NotFound />
      }
    </div>
  )
};

export default Sweets;