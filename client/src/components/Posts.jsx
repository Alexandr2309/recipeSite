import React, { useId } from 'react';
import Post from './Post/Post';
import Search from './search/Search';

const Posts = ({ posts }) => {

  return (
    <div className='post__wrapper'>
      <h1 style={{margin: '10px 0 0 0'}}>Все рецепты</h1>
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