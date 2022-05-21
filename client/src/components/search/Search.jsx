import React, { useState, useContext } from 'react';
import { NowPosts } from '../../context/Context.js';
import { cl } from './searchStyles'
import { PostsContext } from './../../context/Context';
import { useSelector, useDispatch } from 'react-redux';
import { updateNowPosts } from '../../store/slices/posts.js';

const Search = () => {
  // const { nowPosts, updatePosts } = useContext(NowPosts);
  const posts = useSelector(state => state.posts.posts)
  const nowPosts = useSelector(state => state.posts.nowPosts)
  const dispatch = useDispatch();

  // const posts = useContext(PostsContext);
  const [value, setValue] = useState('');

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
  const searchPosts = (e) => {
    if (e.key === 'Enter') {
      if (!value) dispatch(updateNowPosts([...posts]))
      dispatch(updateNowPosts(posts.filter(post => {
        const isInclude = post.title.toLowerCase().includes(value.toLowerCase()) ||
          post.tags.some(tag => tag.toLowerCase().includes(value.toLowerCase()));
        if (isInclude) return post;
        else return false;
      })));
      setValue('');
    }
  };
  const serchPostsBtn = e => {
    if (!value) dispatch(updateNowPosts([...posts]))
    dispatch(updateNowPosts(posts.filter(post => {
      const isInclude = post.title.toLowerCase().includes(value.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(value.toLowerCase()));
      if (isInclude) return post;
      else return false;
    })));
    setValue('');
  }

  return (
    <div style={cl.wr}>
      <h1 style={{ margin: '0 0 20px 0', transform: 'translate(0, 5px)' }}>Найти рецепт</h1>
      <label htmlFor="search" style={cl.label}>Слова в названии рецепта или теги</label>
      <input type="text" id="search" name=""
        style={inpStyle}
        value={value}
        onChange={e => setValue(e.target.value)}
        onFocus={onFucus}
        onBlur={onBlur}
        onKeyDown={searchPosts}
      />
      <button style={btnStyle}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={serchPostsBtn}>
        Поиск</button>
    </div >
  )
};

export default Search;