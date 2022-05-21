import { useSelector } from 'react-redux';
import Posts from '../../components/Posts';
import Search from '../../components/search/Search';
import NotFound from '../../components/UI/NotFound/NotFound';
import './App.css';

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
