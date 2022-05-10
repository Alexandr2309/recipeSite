import { useContext, useId, useState, useEffect } from 'react';
import Posts from '../../components/Posts';
import './App.css';
import { PostsContext, NowPosts } from './../../context/Context';
import NotFound from '../../components/UI/NotFound/NotFound';
import Search from '../../components/search/Search';

function All() {
  const posts = useContext(PostsContext);
  const { nowPosts, updatePosts } = useContext(NowPosts)
  useEffect(() => {
    updatePosts([...posts]);
    console.log(nowPosts)
  }, [posts, ])
  return (
    <div className="App">
      {nowPosts.length
        ? <Posts posts={nowPosts} />
        : <NotFound />
      }
    </div>
  );
}

export default All;
