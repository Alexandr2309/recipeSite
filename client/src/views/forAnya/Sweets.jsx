import { React, useContext, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import NotFound from '../../components/UI/NotFound/NotFound';
import Posts from './../../components/Posts';
import { PostsContext, NowPosts } from './../../context/Context';

const Sweets = () => {
  const posts = useContext(PostsContext);
  const { nowPosts, updatePosts } = useContext(NowPosts)
  useEffect(() => {
    updatePosts([...posts])
  }, [])
  return (
    <div className="App">
      {nowPosts.length
        ? <Posts posts={nowPosts} sweets={true} />
        : <NotFound />
      }
    </div>
  )
};

export default Sweets;