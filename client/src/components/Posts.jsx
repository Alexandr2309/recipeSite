import React, { useId } from 'react';
import Post from './Post/Post';
import Search from './search/Search';

const Posts = ({ posts }) => {

  return (
    <div className='post__wrapper'>
      <Search/>
      {posts.map(post => {
        const { id, title, author, date, about, img } = post;
        return <Post
          key={id}
          title={title}
          author={author}
          date={date}
          about={about}
          img={img} />
      })}
    </div>
  )
};

export default Posts;