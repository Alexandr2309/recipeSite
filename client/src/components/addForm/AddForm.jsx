import React, { useEffect, useRef, useState } from 'react';
import './addForm.css';

const AddForm = () => {
  const [tags, setTags] = useState(['выпечка', 'куриное филе']);
  const [value, setValue] = useState('');

  function addTags(e) {
    if (e.key === 'Enter') {
      setTags([...tags, value]);
      setValue('');
    }
  }
  return (
    <form noValidate>
      <label htmlFor="recipes_title">Название блюда *:</label>
      <p><input type="text" id="recipes_title" name="recipes_title" size={65} required /></p>
      <label htmlFor="recipes_photo">Фото готового блюда:</label>
      <p><input type="file" id="recipes_photo" name="recipes_photo" /></p>
      <p className='comment'>Если у вас нет готового фото, пропустите этот рецепт</p>
      <label htmlFor="recipes_anonce">Краткое описание блюда*:</label>
      <p><input type="text" id="recipes_anonce" name="recipes_anonce" size={120} required /></p>
      <p className="comment">1-2 предложения для отображения в на общей стратнице рецпотов</p>
      <label htmlFor="recipes_description">Текстовое описание* :</label>
      <p><textarea id="recipes_description" name="recipes_description" required cols={40} rows={10} /></p>
      <p className="comment">Полное описание блюда</p>
      <label htmlFor="recipes_photo_desc">Пошаговое описание(фотографии):</label>
      <p><input type="file" id="recipes_photo_desc" name="recipes_photo_desc" /></p>
      <p className='comment'>Если у Вас есть пошаговые фото процесса приготовления, добавьте их здесь. Вы можете одновременно выбрать несколько файлов для добавления, для этого нажмите на необходимых файлах удерживая кнопку "Ctrl" на клавиатуре.</p>
      <label htmlFor="recipes_ingrid">Текстовое описание* :</label>
      <p><textarea id="recipes_ingrid" name="recipes_ingrid" required cols={40} rows={10} /></p>
      <p className="comment">Полное описание блюда</p>
      <label htmlFor="recipes_title">Количество порций* :</label>
      <p><input type="text" id="recipes_title" name="recipes_title" size={5} required /></p>
      <label htmlFor="recipes_tags">Теги* :</label>
      <p><input type="text" id="recipes_tags" name="recipes_tags" size={32} required
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={addTags}
      /></p>
      {tags.length
        ? <div className="tags__container" style={{ width: 250 }}>
          <ul> {tags.map((tag, i) => {
            return <li key={i} className='tags'>
              <span key={i + 'text'}>{tag}</span>
              <a key={i + 'link'} href="#" ></a>
            </li>
          })}
          </ul>
        </div>
        : ''
      }
      <label htmlFor="recipes_title">Было готово за* :</label>
      <p><input type="text" id="recipes_title" name="recipes_title" size={5} required /> мин</p>
      <label htmlFor="recipes_title">Вы потратили времени* :</label>
      <p><input type="text" id="recipes_title" name="recipes_title" size={5} required /> мин</p>
      <div className="field">
        <input type="submit" id="" name="save" value="Сохранить" />
      </div>
    </form>
  )
};

export default AddForm;