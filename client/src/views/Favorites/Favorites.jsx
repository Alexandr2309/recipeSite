import { useContext, useId, useState, useEffect } from 'react';
import Posts from '../../components/Posts';
import { PostsContext, NowPosts } from '../../context/Context';
import NotFound from '../../components/UI/NotFound/NotFound';
import Search from '../../components/search/Search';

function Favorites() {
  const posts = useContext(PostsContext);
  const { nowPosts, updatePosts } = useContext(NowPosts)
  useEffect(() => {
    updatePosts([...posts]);
  }, [posts,])
  return (
    <div className="App post__wrapper">
      <Search />
      {nowPosts.some(post => !post.sweets)
        ? <Posts posts={nowPosts} favorite={true} />
        : <NotFound />
      }
    </div>
  );
}

export default Favorites;