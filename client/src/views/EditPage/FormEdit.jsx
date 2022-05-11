import axios from 'axios';
import React, { useEffect, useRef, useState, useContext } from 'react';
import api from '../../api/index'
import { useParams } from 'react-router-dom';
import { PostsContext } from './../../context/Context';


const FormEdit = () => {
  const ref = useRef(null);

  const { id } = useParams();
  const posts = useContext(PostsContext);
  const i = posts.findIndex(post => id === post._id);
  const { title, anonce, description, ingredients, portions, sweets, author, img, tags, tookTime, spentTime } = posts[i];

  const [ingrids, setIngrids] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [tagsNow, setTags] = useState([]);
  const [value, setValue] = useState('');
  const [data, setData] = useState({
    title: title,
    anonce: anonce,
    description: description,
    ingredients: { ...ingredients },
    portions: portions,
    sweets: sweets,
    author: author,
    img: '',
    tags: tags,
    tookTime: tookTime,
    spentTime: spentTime,
  });

  useEffect(() => {
    setTags([...tags]);
    const str = Object.entries(data.ingredients).reduce((a, b) => a + b[0] + ' - ' + b[1] + '\n', '')
    setIngrids(str);
  }, [])
  function printTextarea(field, isData = false, dataField) {
    if (field.key === 'Enter') {
      setIngrids(ingrids + '\n')
    }
  }
  async function addTags(e) {
    if (e.key === 'Enter') {
      setTags([...tagsNow, value]);
      setValue('');
    }
  }
  async function handlerSumbit() {
    const ins = { ...data };
    await api.updateRecipeById(id, ins).then(res => {
      alert('Рецепт успешно обновлён!');
      setData({
        title: '',
        anonce: '',
        description: '',
        ingredients: ingredients,
        portions: 0,
        sweets: false,
        author: '',
        img: '',
        tags: '',
        tookTime: 0,
        spentTime: 0,
      });
      setTags([]);
    })
  };
  useEffect(() => {
    setData({ ...data, tags: tagsNow })
  }, [tagsNow]);
  useEffect(() => {
    if (isReady) {
      handlerSumbit()
    }
  }, [isReady])
  const deleteTag = async e => {
    e.preventDefault();
    setTags(tagsNow.filter((tag, i) => tag !== e.target.dataset.text));
  }
  const sendImg = async () => {
    if (!ref.current.files[0]) return;
    try {
      const formData = new FormData();
      formData.append('file', ref.current.files[0]);
      await axios.post('http://localhost:3000/api/recipe-img', formData).then(async (res) => {
        console.log(res);
        setData({ ...data, img: res.data });
        console.log(res.data)
      })
        .catch((err) => ("Error occured", err));
    } catch (error) {
      console.log(error)
    }
  }
  const addIngred = (e) => {
    e.preventDefault();
    const test = ingrids.split('\n');
    const obj = {};
    test.forEach(elem => {
      if (!elem.includes('-') || !elem) return;
      const now = elem.split('-');
      console.log(now)
      let [product, count] = now;
      product = product.trim();
      count = count.trim();
      obj[product] = count;
    });
    setData({ ...data, ingredients: { ...obj } });
    setIsReady(true);
  }
  const dontFetch = (e) => {
    if (e.code == 'Enter') {
      e.preventDefault();
      return;
    }
  }

  return (
    <form onKeyDown={dontFetch} noValidate >
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
        onChange={sendImg} /> </p>
      <p className='comment'>Если у вас нет готового фото, пропустите этот шаг</p>
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
      <label htmlFor="recipes_ingrid">Ингридиенты* :</label>
      <p><textarea id="recipes_ingrid"
        value={ingrids}
        onChange={e => setIngrids(e.target.value)}
        onKeyDown={e => printTextarea.call(null, e)}
        name="recipes_ingrid"
        required
        cols={40} rows={10} /></p>
      <p className="comment">Пишите каждый новый ингридиент с новой строки, в формате "Название продука - Количество(ед.измерения)</p>
      <label htmlFor="recipes_portion">Количество порций* :</label>
      <p><input type="text"
        value={data.portions}
        onChange={async e => setData({ ...data, portions: +e.target.value })}
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
      <p><input type="text" id="recipes_ready"
        value={data.tookTime}
        onChange={e => setData({ ...data, tookTime: +e.target.value })}
        name="recipes_ready"
        size={5} required /> мин</p>
      <label htmlFor="recipes_spent">Вы потратили времени* :</label>
      <p><input type="text" id="recipes_spent"
        value={data.spentTime}
        onChange={e => setData({ ...data, spentTime: +e.target.value })}
        name="recipes_spent"
        size={5} required /> мин</p>
      <div className="field">
        <button type="submit" id="" name="save" onClick={addIngred} >Cохранить</button>
      </div>
    </form>
  )
};

export default FormEdit;