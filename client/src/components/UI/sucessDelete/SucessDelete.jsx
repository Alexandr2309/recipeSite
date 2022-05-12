import React from 'react';
import gif from '../../../images/success.gif'
import cl from './successDelete.module.css'
import { useNavigate } from 'react-router-dom';

const SucessDelete = () => {
  const route = useNavigate();
  return (
    <div >
      <img src={gif} alt="успешно" />
      <h5 style={{ fontSize: 28, textAlign: 'center', marginBottom: 20 }}>Рецепт усшено удалён</h5>
      <div className="" style={{ textAlign: 'center' }}>
        <button className={cl.closeBtn} onClick={e => route('../recipe/list')}>Вернуться на главную</button>
      </div>

    </div>
  )
};

export default SucessDelete;