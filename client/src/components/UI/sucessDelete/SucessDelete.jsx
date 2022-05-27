import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import gif from '../../../images/success.gif';
import cl from './successDelete.module.css';

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