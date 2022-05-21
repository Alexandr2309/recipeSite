import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NotFound from '../../components/UI/NotFound/NotFound';
import { updateNowPosts } from '../../store/slices/posts';
import Posts from './../../components/Posts';
import Search from './../../components/search/Search';

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