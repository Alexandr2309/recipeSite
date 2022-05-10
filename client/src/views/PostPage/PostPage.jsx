import React, { useContext, useState, useEffect } from 'react';
import Card from '../../components/cardRecipe/Card';
import './postPage.css'
import { PostsContext } from '../../context/Context'
import { useParams } from 'react-router-dom';
import TableIngreds from '../../components/UI/tableOnPostPage/TableIngreds';

const PostPage = () => {
  const { id } = useParams();
  const posts = useContext(PostsContext);
  const [imageSrc, setImageSrc] = useState('');
  const i = posts.findIndex(post => id === post._id);
  const { title, anonce, description, ingredients, portions, sweets, author, img, tags, tookTime, spentTime } = posts[i];
  const fetchData = async () => {
    const response = await fetch(`http://localhost:3000/api/recipe-download?path=${img}`);
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob);
    setImageSrc(url);
  };
  useEffect(() => {
    fetchData();
  }, [])
  return (
    <div className='post__wrapper page__wrapper page'>
      <h2>{title}</h2>
      <div className="page__head">
        <div className="page__img">
            <img src={imageSrc} alt="Фото рецепта" />
        </div>
        <div className="page__about">
          <div className="page__portion">{portions} порции</div>
          <div className="page__time">{tookTime} мин</div>
          <div className="page__author">{author}</div>
          <div className="page__about-text">
            {anonce}
          </div>
        </div>
      </div>
      <div className="page__table">
      <TableIngreds
      portions={portions}
      ingredients={ingredients}
      />
      </div>
      <div className='page__title'>Пошаговый рецепт</div>
      <div className="page__recipe">
        {description}
        {/* <Card
        // img={posts[i].img}
        />
        <Card
        // img={posts[i].img}
        />
        <Card
        // img={posts[i].img}
        /> */}
      </div>
    </div>
  )
};

export default PostPage;