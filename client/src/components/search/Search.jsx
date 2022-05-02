import React, { useState } from 'react';
import { cl } from './searchStyles'

const Search = () => {
  const [btnStyle, setBtnSyle] = useState(cl.btn);
  const [inpStyle, setInpSyle] = useState(cl.inp);

  const onFucus = (e) => {
    setInpSyle({ ...cl.inp, ...cl.inpFocus })
  }
  const onBlur = (e) => {
    setInpSyle(cl.inp);
  }
  const onMouseEnter = (e) => {
    setBtnSyle({ ...cl.btn, ...cl.btnHover })
  }
  const onMouseLeave = (e) => {
    setBtnSyle(cl.btn)
  }

  return (
    <div style={cl.wr}>
      <label htmlFor="search" style={cl.label}>Слова в названии рецепта или теги</label>
      <input type="text" id="search" name="" style={inpStyle} onFocus={onFucus} onBlur={onBlur} />
      <button style={btnStyle} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>Поиск</button>
    </div >
  )
};

export default Search;