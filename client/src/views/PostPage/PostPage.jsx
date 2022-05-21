import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import TableIngreds from '../../components/UI/tableOnPostPage/TableIngreds';
import edit from '../../images/edit.png';
import favorite from '../../images/empty-star.svg';
import favoriteChek from '../../images/fill-star.svg';
import { setIsUpdate } from '../../store/slices/isUpdate';
import { calendarDateParse } from '../../utils/calendarDateParse';
import apis from './../../api/index';
import './postPage.css';

const PostPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts);
  const isUpdate = useSelector(state => state.isUpdate.isUpdate);
  
  const i = posts.findIndex(post => id === post._id);
  let { title, anonce, description, ingredients, portions, author, img, tookTime, updatedAt, createdAt, favorite: isFavorite } = posts[i];

  const updateFavorite = async (isF) => {
    await apis.updateRecipeFavorite(id, { favorite: isF }).then(res => {
      dispatch(setIsUpdate(true));
    })
  };

  const route = useNavigate();
  const goEdit = () => {
    route(`../recipe/edit/${id}`)
  }

  return (
    <div className='post__wrapper page__wrapper page'>
      <img src={edit} alt="edit-icon" className='page__edit' onClick={goEdit} />
      <img src={isFavorite ? favoriteChek : favorite} alt="favorite-icon" className='page__favorite' onClick={async e => updateFavorite(!isFavorite)} />
      <h2 style={{ marginTop: 10, marginBottom: 5 }}>{title}</h2>
      <div className="page__head">
        <div className="page__img">
          <img src={img} alt="Фото рецепта" />
        </div>
        <div className="page__about">
          <div className="page__portion">{portions} порции</div>
          <div className="page__time">{tookTime} мин</div>
          <div className="page__author">{author}</div>
          <div className="page__date-create">{calendarDateParse(createdAt)} <span style={{ fontSize: 15, fontStyle: 'oblique' }}>( Дата создания)</span></div>
          <div className="page__date-update">{calendarDateParse(updatedAt)} <span style={{ fontSize: 15, fontStyle: 'oblique' }}>( Последнее обновление)</span></div>
        </div>
        <div className="page__about-text">
          {anonce}
        </div>
      </div>
      <div className="page__table" >
        <TableIngreds
          portions={portions}
          ingredients={ingredients}
        />
      </div>
      <div className='page__title'>Пошаговый рецепт</div>
      <div className="page__recipe" dangerouslySetInnerHTML={{ __html: description }}>
        {/* {description} */}
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