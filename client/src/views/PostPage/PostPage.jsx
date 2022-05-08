import React, { useContext } from 'react';
import Card from '../../components/cardRecipe/Card';
import './postPage.css'
import { PostsContext } from '../../context/Context'
import { useParams } from 'react-router-dom';

const PostPage = () => {
  const { id } = useParams();
  const posts = useContext(PostsContext);
  const i = posts.findIndex(post => id === post.id);
  return (
    <div className='post__wrapper page__wrapper page'>
      <h2>Название</h2>
      <div className="page__head">
        <div className="page__img">
          <img src={posts[i].img} alt="Фото рецепта" />
        </div>
        <div className="page__about">
          <div className="page__portion">4 порции</div>
          <div className="page__time">время</div>
          <div className="page__author">Коломыцкий А.М.</div>
          <div className="page__about-text">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam dolorum quod accusamus temporibus tempore, commodi debitis deserunt unde soluta harum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum cum inventore deleniti earum nemo quod voluptate exercitationem eligendi, voluptatibus temporibus doloremque rem voluptatum unde provident soluta reiciendis nostrum, tenetur qui. Magnam, ipsa perspiciatis. Nesciunt obcaecati commodi voluptates beatae rem maxime, doloribus itaque dolor iusto ea!
          </div>
        </div>
      </div>
      <div className="page__table">
        <table>
          <thead>
            <tr><th>Продукты <span> (на 4 порции)</span></th></tr>
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
          img={posts[i].img}
        />
        <Card
          img={posts[i].img}
        />
        <Card
          img={posts[i].img}
        />
      </div>
    </div>
  )
};

export default PostPage;