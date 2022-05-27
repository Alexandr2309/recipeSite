import React from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { dateParse } from '../../utils/dateParse';
import './post.css';

const Post = ({ _id, title, anonce, author, img, updatedAt }) => {
  const route = useNavigate();
  const [param, setParam] = useSearchParams();
  const location = useLocation();

  const navigate = () => {
    route(`../recipe/list/${_id}`)
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
          {anonce}
          <br />
          <button onClick={navigate}>Читать далее...</button>
        </div>
      </div>
      <div className="post__footer">
        <div className="post__author">
          Добавил(a): {author}
        </div>
        <div className="post__data">
          {dateParse(updatedAt)}
        </div>
      </div>
    </div>
  )
};

export default Post; 