import React from 'react';
import Search from '../../search/Search';
import './notFound.css'

const NotFound = ({text = 'По вашему запросу ничего не найдено'}) => {
  return (
    <div className='nothing'>
      <h2 style={{margin: 7}}>{text}</h2>
      <div className="nothing__img">
        <img src={require('../../../images/cd3d8533fe9845c9b220b1959ec9.jpg')} alt="" />
      </div>
    </div>
  )
};

export default NotFound;