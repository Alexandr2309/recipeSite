import React, { useEffect, useRef, useState } from 'react';
import { LZW } from '../../utils/LZW';
import './addForm.css';
import api from './../../api/index';
// import jsesc from 'jsesc'
const jsesc = require('jsesc')

const AddForm = () => {
  const ref = useRef(null)

  const [tagsNow, setTags] = useState([]);
  const [value, setValue] = useState('');
  const [data, setData] = useState({
    title: '',
    anonce: '',
    description: '',
    ingredients: '',
    portions: 0,
    sweets: false,
    author: '',
    img: new ArrayBuffer(),
    tags: '',
  })

  async function addTags(e) {
    if (e.key === 'Enter') {
      setTags([...tagsNow, value]);
      setValue('');
      setData({ ...data, tags: tagsNow.toString() })
    }
  }
  const deleteTag = async e => {
    e.preventDefault();
    setTags(tagsNow.filter((tag, i) => tag !== e.target.dataset.text));
  }
  const convertImg = async () => {
    const file = ref.current.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      console.log(reader.result)
      const res = new Uint8Array(reader.result);
      setData({ ...data, img: [res] });
    };

    reader.readAsArrayBuffer(file);
  }
  async function handlerSumbit(e) {
    e.preventDefault();
    const ins = { ...data };
    await api.insertRecipe(ins).then(res => {
      alert('Рецепт успешно добавлен!');
      setData({
        title: '',
        anonce: '',
        description: '',
        ingredients: '',
        portions: 0,
        sweets: false,
        author: '',
        img: new ArrayBuffer(),
        tags: '',
      })
    })
  };
  const dontFetch = (e) => {
    if (e.code == 'Enter') {
      e.preventDefault();
      return;
    }
  }
  return (
    <form onKeyDown={dontFetch} noValidate>
      <label htmlFor="recipes_title">Название блюда *:</label>
      <p><input type="text" id="recipes_title"
        value={data.title}
        onChange={e => setData({ ...data, title: e.target.value })}
        name="recipes_title"
        size={65} required /></p>
      <label htmlFor="recipes_photo">Фото готового блюда:</label>
      <p><input type="file"
        id="recipes_photo"
        name="recipes_photo"
        ref={ref}
        onChange={convertImg} /></p>
      <p className='comment'>Если у вас нет готового фото, пропустите этот рецепт</p>
      <label htmlFor="recipes_anonce">Краткое описание блюда*:</label>
      <p><input type="text"
        value={data.anonce}
        onChange={async e => setData({ ...data, anonce: e.target.value })}
        id="recipes_anonce"
        name="recipes_anonce" size={120} required /></p>
      <p className="comment">1-2 предложения для отображения в на общей стратнице рецпотов</p>
      <label htmlFor="recipes_description">Текстовое описание* :</label>
      <p><textarea id="recipes_description"
        value={data.description}
        onChange={async e => setData({ ...data, description: e.target.value })}
        name="recipes_description"
        required
        cols={40} rows={10} /></p>
      <p className="comment">Полное описание блюда</p>
      <label htmlFor="recipes_photo_desc">Пошаговое описание(фотографии):</label>
      <p><input type="file" id="recipes_photo_desc" name="recipes_photo_desc" /></p>
      <p className='comment'>Если у Вас есть пошаговые фото процесса приготовления, добавьте их здесь. Вы можете одновременно выбрать несколько файлов для добавления, для этого нажмите на необходимых файлах удерживая кнопку "Ctrl" на клавиатуре.</p>
      <label htmlFor="recipes_ingrid">Ингридиенты* :</label>
      <p><textarea id="recipes_ingrid"
        value={data.ingredients}
        onChange={async e => setData({ ...data, ingredients: e.target.value })}
        name="recipes_ingrid"
        required
        cols={40} rows={10} /></p>
      <p className="comment">Полное описание блюда</p>
      <label htmlFor="recipes_portion">Количество порций* :</label>
      <p><input type="text"
        value={data.portions}
        onChange={async e => setData({ ...data, portions: +e.target.value.trim() })}
        id="recipes_portion"
        name="recipes_portion"
        size={5} required /></p>
      <div className="">
        <input type="checkbox"
          checked={data.sweets}
          onChange={async e => setData({ ...data, sweets: e.target.checked })}
          id="recipes_sweet"
          name="recipes_sweet"
          required />
        <label htmlFor="recipes_sweet" className='sweet__check'>Сладости* :</label>
      </div>
      <p></p>
      <label htmlFor="recipes_tags" className='recipes_tags'>Теги* :</label>
      <p><input type="text" id="recipes_tags" name="recipes_tags" size={32} required
        value={value}
        onChange={async e => setValue(e.target.value)}
        onKeyDown={addTags}
      /></p>
      {tagsNow.length
        ? <div className="tags__container" style={{ width: 250 }}>
          <ul> {tagsNow.map((tag, i) => {
            return <li key={i} className='tags'>
              <span key={i + 'text'}>{tag}</span>
              <a key={i + 'link'} href="#" onClick={deleteTag} data-text={tag}></a>
            </li>
          })}
          </ul>
        </div>
        : ''
      }
      <label htmlFor="recipes_author">Автор* :</label>
      <p><select name="recipes_author"
        value={data.author}
        onChange={e => setData({ ...data, author: e.target.value })}
        id="recipes_author"
        style={{ padding: 5 }}>
        <option value="Александр Максимович К.">Александр Максимович К.</option>
        <option value="Сергей Евгеньевич Е.">Сергей Евгеньевич Д.</option>
        <option value="Анна Максимовна К.">Анна Максимовна К.</option>
        <option value="Людмила Владимировна К.">Людмила Владимировна К.</option>
      </select></p>
      <label htmlFor="recipes_ready">Было готово за* :</label>
      <p><input type="text" id="recipes_ready" name="recipes_ready" size={5} required /> мин</p>
      <label htmlFor="recipes_spent">Вы потратили времени* :</label>
      <p><input type="text" id="recipes_spent" name="recipes_spent" size={5} required /> мин</p>
      <div className="field">
        <button type="submit" id="" name="save" onClick={handlerSumbit} >Cохранить</button>
      </div>
    </form>
  )
};

export default AddForm;