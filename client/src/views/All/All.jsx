import { useContext, useId, useState, useEffect } from 'react';
import Posts from '../../components/Posts';
import './App.css';
import { PostsContext, NowPosts } from '../../context/Context';
import NotFound from '../../components/UI/NotFound/NotFound';
import Search from '../../components/search/Search';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from './../../store/slices/posts';

function All() {
  const posts = useSelector(state => state.posts.posts)
  const nowPosts = useSelector(state => state.posts.nowPosts)

  return (
    <div className="App post__wrapper">
      <Search />
      {nowPosts.some(post => !post.sweets)
        ? <Posts posts={nowPosts} />
        : <NotFound />
      }
    </div>
  );
}

export default All;
