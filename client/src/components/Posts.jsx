import React from 'react';
import Post from './Post/Post';
import Search from './search/Search';

const Posts = ({ posts, sweets = false, title = "Все рецепты", favorite = false }) => {
  return (
    <div className='post__wrapper'>
      <h1 style={{ margin: '10px 0 0 0' }}>{title}</h1>
      {sweets
        ? posts.filter(post => post.sweets)
          .map(post => {
            const { _id, title, author, anonce, img, updatedAt } = post;
            return <Post
              key={_id}
              _id={_id}
              title={title}
              author={author}
              anonce={anonce}
              img={img}
              updatedAt={updatedAt}
            />
          })
        : favorite
          ? posts.map(post => {
            const { _id, title, author, anonce, img, updatedAt } = post;
            return <Post
              key={_id}
              _id={_id}
              title={title}
              author={author}
              anonce={anonce}
              img={img}
              updatedAt={updatedAt}
            />
          })
          : posts.filter(post => !post.sweets)
            .map(post => {
              const { _id, title, author, anonce, img, updatedAt } = post;
              return <Post
                key={_id}
                _id={_id}
                title={title}
                author={author}
                anonce={anonce}
                img={img}
                updatedAt={updatedAt}
              />
            })
      }
    </div>
  )
};

export default Posts;