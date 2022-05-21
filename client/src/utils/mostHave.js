import api from "../api";
import axios from 'axios'

export function printTextarea(field, isData = false, { setDescr, setIngrids, descr, ingrids }) {
  let l = field.target.selectionStart;
  window.localStorage.setItem('pos', l + 1);
  if (field.key === 'Enter') {
    const text = descr.slice(0, l) + '\n' + descr.slice(l);
    isData
      ? setDescr(text)
      : setIngrids(ingrids + '\n');
  }
}
export async function handlerUpdateSumbit(params) {
  const { data, setData, setTags, id, route } = params;
  const ins = { ...data };
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
  const { data, setData, setTags, setNewId } = params;
  const ins = { ...data };
  await api.insertRecipe(ins).then(res => {
    if (setNewId) setNewId(res.data.id);
    console.log(res)
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
};
export const sendImg = async (ref, setData, data) => {
  if (!ref.current.files[0]) return;
  try {
    const formData = new FormData();
    formData.append('file', ref.current.files[0]);
    formData.append('upload_preset', 'ef6jgyoo');
    await axios.post('http://localhost:3000/api/recipe-img', formData).then(async (res) => {
      setData({ ...data, img: res.data });
    })
      .catch((err) => ("Error occured", err));
  } catch (error) {
    console.log(error)
  }
};