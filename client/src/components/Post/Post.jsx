import React from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import './post.css';

const Post = ({ id, title, author, date, about, img }) => {
  const route = useNavigate();
  const param = useParams();
  let datenow = ("" + (new Date(date)).toISOString())
    .replace(/^([^T]+)T(.+)$/, '$1')
    .replace(/^(\d+)-(\d+)-(\d+)$/, '$3.$2.$1');
  const navigate = () => {
    if(JSON.stringify(param) == "{}"){
      route(`${id}`);
    } else {
      route(`posts/${id}`)
    }
  }
  return (
    <div className="post">
      <div className="post__title">
        <h3>{title}</h3>
      </div>
      <div className="post__block">
        <div className="post__img">
          <img src={img} alt="Фото рецепта" />
        </div>
        <div className="post__description">
          {about}
          <br /><br />
          <button onClick={navigate}>Читать далее...</button>
        </div>
      </div>
      <div className="post__footer">
        <div className="post__author">
          Добавил(a): {author}
        </div>
        <div className="post__data">
          Последнее изменение - {datenow}
        </div>
      </div>
    </div>
  )
};

export default Post; 