import React, { useContext, useState, useEffect } from 'react';
import Card from '../../components/cardRecipe/Card';
import './postPage.css'
import { PostsContext } from '../../context/Context'
import { useParams } from 'react-router-dom';

const PostPage = () => {
  const { id } = useParams();
  const posts = useContext(PostsContext);
  console.log(id, posts)
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
          {/* <div className="page__img-wrap"> */}
            <img src={imageSrc} alt="Фото рецепта" />
          {/* </div> */}
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
        <table>
          <thead>
            <tr><th>Продукты <span> (на {portions} порции)</span></th></tr>
          </thead>
          <tbody>
            <tr className='page__table-colorize'>
              <td>Картофель — 600 г (6 шт.)</td>
            </tr>
            <tr>
              <td>Хек (филе) — 350 г (2 шт.)</td>
            </tr>
            <tr className='page__table-colorize'>
              <td>Лук репчатый — 80 г (1 шт.)</td>
            </tr>
            <tr>
              <td>Сметана жирностью 15 % — 100 г</td>
            </tr>
            <tr className='page__table-colorize'>
              <td>Сок лимона — 15 мл (1 ст. ложка)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='page__title'>Пошаговый рецепт</div>
      <div className="page__recipe">
        <Card
        // img={posts[i].img}
        />
        <Card
        // img={posts[i].img}
        />
        <Card
        // img={posts[i].img}
        />
      </div>
    </div>
  )
};

export default PostPage;