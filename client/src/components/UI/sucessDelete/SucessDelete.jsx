import React, { useContext } from 'react';
import gif from '../../../images/success.gif'
import cl from './successDelete.module.css'
import { useNavigate } from 'react-router-dom';
import { IsUpdate } from '../../../context/Context';
import { useSelector, useDispatch } from 'react-redux';
import { setIsUpdate } from '../../../store/slices/isUpdate';
import { getPosts } from '../../../store/slices/posts';

const SucessDelete = ({ id = false, title = 'Рецепт успешно удалён', textBtn = 'Вернуться на главную' }) => {
  const route = useNavigate();
  const isUpdate = useSelector(state => state.isUpdate.isUpdate);
  const dispatch = useDispatch();
  return (
    <div >
      <img src={gif} alt="успешно" />
      <h5 style={{ fontSize: 28, textAlign: 'center', marginBottom: 20 }}>{title}</h5>
      <div className="" style={{ textAlign: 'center' }}>
        <button className={cl.closeBtn} onClick={e => {
          id ? route(`../recipe/list/${id}`) : route('../recipe/list')
        }}>{textBtn}</button>
      </div>

    </div>
  )
};

export default SucessDelete;