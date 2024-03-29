import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsUpdate } from '../../store/slices/isUpdate';
import { handlerSumbit, printTextarea } from '../../utils/mostHave';
import PopUp from '../UI/popUp/popUp';
import SucessDelete from '../UI/sucessDelete/SucessDelete';
import './addForm.css';

const AddForm = () => {
  const ref = useRef(null);
  const user = useSelector(state => state.user)
  const refDescription = useRef(null);
  const dispatch = useDispatch();

  function addImage() {
    if (!ref.current.files[0]) return;
    let imgNow = data.img;

    const formData = new FormData();
    formData.append('file', ref.current.files[0])
    formData.append('upload_preset', 'ef6jgyoo');
    axios.post('http://api.cloudinary.com/v1_1/saha230904/image/upload', formData)
      .then(res => {
        console.log(res);
        setData({ ...data, img: res.data.secure_url });
      });

    if (imgNow) {
      axios.post('http://localhost:3000/api/recipe-delete_img', {
        public_id: data.img.match(/recipes\/.+(?=\.)/)
      })
    }
  }

  const isUpdate = useSelector(state => state.isUpdate.isUpdate);
  const [newId, setNewId] = useState(null);
  const [descr, setDescr] = useState('');
  const [ingrids, setIngrids] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [tagsNow, setTags] = useState([]);
  const [value, setValue] = useState('');
  const [data, setData] = useState({
    title: '',
    anonce: '',
    description: '',
    ingredients: {},
    portions: 0,
    sweets: false,
    author: `${user.name} ${user.surname}`,
    img: '',
    tags: '',
    tookTime: 0,
    spentTime: 0,
  });

  async function addTags(e) {
    if (e.key === 'Enter') {
      setTags([...tagsNow, value]);
      setValue('');
    }
  }
  useEffect(() => {
    setData({ ...data, tags: tagsNow })
  }, [tagsNow]);
  const successSubmit = async () => {
    let ok = await handlerSumbit({ setData, setTags, data, setNewId, func: () => dispatch(setIsUpdate(true)), updatePostsFunc: dispatch });
    if (ok) {
      setVisible(true);
      setDescr('');
      setIngrids('');
      setIsReady(false);
    } else {
      setIsReady(false);
    }
  }
  useEffect(() => {
    if (isReady) {
      successSubmit();
    }
  }, [isReady]);
  useEffect(() => {
    let pos = window.localStorage.getItem('pos');
    if (!pos) return;
    refDescription.current.setSelectionRange(pos, pos);
  }, [descr]);
  const deleteTag = async e => {
    e.preventDefault();
    setTags(tagsNow.filter((tag, i) => tag !== e.target.dataset.text));
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
    const result = descr.replace(/\n/g, '<br>');
    setData({ ...data, ingredients: { ...obj }, description: result });
    setIsReady(true);
  }
  const dontFetch = (e) => {
    if (e.code == 'Enter') {
      e.preventDefault();
      return;
    }
  };

  const [visible, setVisible] = useState(false)
  return (
    <form onKeyDown={dontFetch} noValidate encType="multipart/form-data">
      <PopUp
        visible={visible}
        setVisible={setVisible}
      >
        <SucessDelete id={newId} title='Рецепт успшено добавлен!' textBtn='Перейти к странице рецепта' />
      </PopUp>
      <label htmlFor="recipes_title">Название блюда *:</label>
      <p><input type="text" id="recipes_title"
        value={data.title}
        onChange={e => setData({ ...data, title: e.target.value })}
        name="recipes_title"
        maxLength={70}
        size={65} required /></p>
      <label htmlFor="recipes_photo">Фото готового блюда:</label>
      <p><input type="file"
        accept=".jpg, .jpeg, .png, .gif, .bmp, .doc, .docx, .xls, .xlsx, .txt, .tar, .zip, .7z, .7zip"
        id="recipes_photo"
        name="recipes_photo"
        ref={ref}
        onChange={addImage}
      />
        <label className="upload-file__label" htmlFor="recipes_photo">
          <svg className="upload-file__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M286 384h-80c-14.2 1-23-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c11.6 11.6 3.7 33.1-13.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-23-23V366c0-13.3 10.7-24 24-24h136v8c0 31 24.3 56 56 56h80c30.9 0 55-26.1 57-55v-8h135c13.3 0 24 10.6 24 24zm-124 88c0-11-9-20-19-20s-19 9-20 20 9 19 20 20 21-9 20-20zm64 0c0-12-9-20-20-20s-20 9-19 20 9 20 20 20 21-9 20-20z">
            </path>
          </svg>
          <span className="upload-file__text">Прикрепить файл</span>
        </label>
        <img src={data.img || ''} alt="Превью" className='img-preview' style={{ display: data.img ? 'block' : 'none' }} />
      </p>
      <p className='comment'>Если у вас нет готового фото, пропустите этот шаг</p>
      <label htmlFor="recipes_anonce">Краткое описание блюда*:</label>
      <p><input type="text"
        value={data.anonce}
        onChange={async e => setData({ ...data, anonce: e.target.value })}
        id="recipes_anonce"
        maxLength={300}
        name="recipes_anonce" size={120} required /></p>
      <p className="comment">1-2 предложения для отображения в на общей стратнице рецпотов</p>
      <label htmlFor="recipes_description">Текстовое описание* :</label>
      <p><textarea id="recipes_description"
        value={descr}
        ref={refDescription}
        onKeyDown={e => printTextarea.call(null, e, true, { setDescr, descr, ingrids, setIngrids })}
        onChange={async e => {
          setDescr(e.target.value);
          let l = e.target.selectionStart;
          window.localStorage.setItem('pos', l);
        }}
        name="recipes_description"
        required
        cols={40} rows={10} /></p>
      <p className="comment">Полное описание блюда</p>
      {/* <label htmlFor="recipes_photo_desc">Пошаговое описание(фотографии):</label>
      <p><input type="file" id="recipes_photo_desc" name="recipes_photo_desc" /></p>
      <p className='comment'>Если у Вас есть пошаговые фото процесса приготовления, добавьте их здесь. Вы можете одновременно выбрать несколько файлов для добавления, для этого нажмите на необходимых файлах удерживая кнопку "Ctrl" на клавиатуре.</p> */}
      <label htmlFor="recipes_ingrid">Ингридиенты* :</label>
      <p><textarea id="recipes_ingrid"
        value={ingrids}
        onChange={e => setIngrids(e.target.value)}
        onKeyDown={e => printTextarea.call(null, e, false, { setDescr, descr, ingrids, setIngrids })}
        name="recipes_ingrid"
        required
        cols={40} rows={10} /></p>
      <p className="comment">Пишите каждый новый ингридиент с новой строки, в формате "Название продука - Количество(ед.измерения)</p>
      <label htmlFor="recipes_portion">Количество порций* :</label>
      <p><input type="text"
        value={data.portions}
        onChange={async e => setData({ ...data, portions: parseInt(e.target.value) ? +e.target.value : 0 })}
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
      <p><input name="recipes_author"
        value={data.author}
        onChange={e => setData({ ...data, author: e.target.value })}
        id="recipes_author"
        style={{ padding: 5 }}>
        {/* <option value="Александр Максимович К.">Александр Максимович К.</option>
        <option value="Сергей Евгеньевич Е.">Сергей Евгеньевич Д.</option>
        <option value="Анна Максимовна К.">Анна Максимовна К.</option>
        <option value="Людмила Владимировна К.">Людмила Владимировна К.</option> */}
      </input></p>
      <label htmlFor="recipes_ready">Было готово за* :</label>
      <p><input type="text" id="recipes_ready"
        value={data.tookTime}
        onChange={e => setData({ ...data, tookTime: parseInt(e.target.value) ? +e.target.value : 0 })}
        name="recipes_ready"
        size={5} required /> мин</p>
      <label htmlFor="recipes_spent">Вы потратили времени* :</label>
      <p><input type="text" id="recipes_spent"
        value={data.spentTime}
        onChange={e => setData({ ...data, spentTime: parseInt(e.target.value) ? +e.target.value : 0 })}
        name="recipes_spent"
        size={5} required /> мин</p>
      <div className="field">
        <button type="submit" id="" name="save" onClick={addIngred} >Cохранить</button>
      </div>
    </form>
  )
};

export default AddForm;