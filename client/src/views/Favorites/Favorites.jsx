import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Posts from '../../components/Posts';
import Search from '../../components/search/Search';
import NotFound from '../../components/UI/NotFound/NotFound';
import { updateNowPosts } from '../../store/slices/posts';

function Favorites() {
  const posts = useSelector(state => state.posts.posts)
  const nowPosts = useSelector(state => state.posts.nowPosts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateNowPosts([...posts]));
  }, [posts])
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