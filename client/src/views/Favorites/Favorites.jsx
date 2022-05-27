import React from 'react';
import { useSelector } from 'react-redux';
import Posts from '../../components/Posts';
import Search from '../../components/search/Search';
import NotFound from '../../components/UI/NotFound/NotFound';

function Favorites() {
  const posts = useSelector(state => state.posts.posts)
  const nowPosts = useSelector(state => state.posts.nowPosts);
  let arrayOfFavorites = useSelector(state => state.user.favoritePosts);

  let favoritePosts = posts.filter(post => arrayOfFavorites.includes(post._id));
  return (
    <div className="App post__wrapper">
      <Search />
      {favoritePosts.length
        ? <Posts posts={favoritePosts} favorite={true} />
        : <NotFound />
      }
    </div>
  );
}

export default Favorites;