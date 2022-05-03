import { useContext, useId, useState, useEffect } from 'react';
import Posts from '../../components/Posts';
import './App.css';
import { PostsContext, NowPosts } from './../../context/Context';

function All() {
  const posts = useContext(PostsContext);
  const { nowPosts, updatePosts } = useContext(NowPosts)
  useEffect(() => {
    updatePosts([...posts])
  }, [])
  return (
    <div className="App">
      <Posts posts={nowPosts} />
    </div>
  );
}

export default All;
