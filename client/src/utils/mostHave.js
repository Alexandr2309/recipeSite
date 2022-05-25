import api from "../api";
import axios from 'axios'
import { updatePosts } from "../store/slices/userSlice";

export function printTextarea(field, isData = false, { setDescr, setIngrids, descr, ingrids }) {
  let l = field.target.selectionStart;
  window.localStorage.setItem('pos', l + 1);
  if (field.key === 'Enter') {
    const text = descr.slice(0, l) + '\n' + descr.slice(l);
    isData
      ? setDescr(text)
      : setIngrids(ingrids + '\n');
  }
};
export const validateFields = (data, ingrids = 'none') => {
  let strError = 'Ошибка во введённых данных, проверьтре , пожалуйста ',
    flag = 0;
  if (!/[a-zA-Zа-яА-я0-9"'<>?.!()]+/gm.test(data.title)) {
    flag++;
    strError += ', название блюда'
  }
  if (!/^((http|https):\/\/)?(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)/i.test(data.img)) {
    flag++;
    strError += ', фото блюда'
  }
  if (!/[a-zA-Zа-яА-я0-9"'<>?,.!()]{5,}/gmi.test(data.anonce)) {
    flag++;
    strError += ', анонс'
  }
  if (!/[a-zA-Zа-яА-я0-9"'<>?,.!()\s\\\/]{30,}/gmi.test(data.description)) {
    flag++;
    strError += ', полное описание'
  }
  if (!data.tags.length) {
    flag++;
    strError += ', теги'
  }
  if (!data.portions) {
    flag++;
    strError += ', порции'
  }
  if (!/^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/gu.test(data.author)) {
    flag++;
    strError += ', автора'
  }
  // /[\d\wа-яА-Я]+\s-\s\d+(?=[а-яА-Я\w])/gu
  if (data.spentTime === 0) {
    flag++;
    strError += ', потраченное время'
  };
  if (ingrids !== 'none') {
    if (!/[\d\wа-яА-Я]+\s-\s\d+(?=[а-яА-Я\w])/gu.test(ingrids)) {
      flag++;
      strError += ', ингредиенты'
    };
  } else {
    if (Object.keys(data.ingredients).length == 0) {
      flag++;
      strError += ', ингредиенты'
    }
  }
  return flag > 0 ? strError : false;
}
export async function handlerUpdateSumbit(params) {
  const { data, setData, setTags, id, ingrids, route, func } = params;
  const ins = { ...data };

  let validErr = validateFields(ins, ingrids);

  if (validErr) {
    alert(`Не удалось Обновить рецепт!\n${validErr}`);
    return false;
  }
  func();

  await api.updateRecipeById(id, ins).then(res => {
    alert('Рецепт успешно обновлён!');
    setData({
      title: '',
      anonce: '',
      description: '',
      ingredients: '',
      portions: 0,
      sweets: false,
      author: '',
      img: '',
      tags: '',
      tookTime: 0,
      spentTime: 0,
    });
    setTags([]);
    route(`../../recipe/list/${id}`)
  });
};
export async function handlerSumbit(params) {
  const { data, setData, setTags, setNewId, func, updatePostsFunc } = params;
  const ins = { ...data };

  let validErr = validateFields(ins);

  if (validErr) {
    alert(`Не удалось добавить рецепт!\n${validErr}`);
    return false;
  }
  func();

  await api.insertRecipe(ins).then(res => {
    if (setNewId) setNewId(res.data.id);
    console.log(res);
    updatePostsFunc.call(null, updatePosts(res.data.id));
    setData({
      title: '',
      anonce: '',
      description: '',
      ingredients: '',
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
  return true;
};
// export const sendImg = async (ref, setData, data) => {
//   if (!ref.current.files[0]) return;
//   try {
//     const formData = new FormData();
//     formData.append('file', ref.current.files[0]);
//     formData.append('upload_preset', 'ef6jgyoo');
//     await axios.post('http://localhost:3000/api/recipe-img', formData).then(async (res) => {
//       setData({ ...data, img: res.data });
//     })
//       .catch((err) => ("Error occured", err));
//   } catch (error) {
//     console.log(error)
//   }
// };
