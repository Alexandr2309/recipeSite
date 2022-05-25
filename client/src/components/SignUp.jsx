import React from 'react'
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/userSlice';
import { useNavigate } from 'react-router-dom'
import Form from './userForm'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from 'react';
import apis from './../api/index';



const SignUp = () => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [error, setError] = useState({
    name: true,
    surname: true,
    email: true
  });

  const chekName = (myName) => {
    console.log(/^[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ' ]+[a-zA-Zа-яА-ЯёЁ']?$/.test(myName));
    /^[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ' ]+[a-zA-Zа-яА-ЯёЁ']?$/.test(myName)
      ? setError({ ...error, name: 'agree' })
      : setError({ ...error, name: false })
  }
  const chekSurname = (mySurname) => {
    /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u.test(mySurname)
      ? setError({ ...error, surname: 'agree' })
      : setError({ ...error, surname: false })
  }


  const dispatch = useDispatch();
  const route = useNavigate();

  const handleRegister = async (email, password, name = '', surname = '') => {

    function isValidEmail(mail) {
      return /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(mail);
    }
    function isValidName(myName) {
      return /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u.test(myName);
    }

    let flag = 0;
    let strError = 'Ошибка в вводе данных, проверьте ';

    if (!password || password.length < 6) {
      flag++;
      strError += 'пароль';
    };
    if (!isValidEmail(email)) {
      flag++;
      strError += ', email';
      return
    };
    if (name !== '' || surname !== '') {
      if (!isValidName(name) || !isValidName(surname)) {
        flag == 0
          ? strError += 'имя и фамилию!'
          : strError += ', имя и фамилию!'
        flag++;
      }
    }
    if (flag) {
      alert(strError);
      return;
    }

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {

        window.localStorage.setItem('id', user.uid);
        window.localStorage.setItem('email', user.email);
        window.localStorage.setItem('token', user.accessToken);
        window.localStorage.setItem('name', name);
        window.localStorage.setItem('surname', surname);

        dispatch(setUser({
          email: user.email,
          id: user.uid,
          token: user.accessToken,
          name: name,
          surname: surname
        }));
        updateProfile(auth.currentUser, {
          displayName: `${name} ${surname}`
        });
        let sendUser = {
          email: user.email,
          id: user.uid,
        };
        apis.createUser(sendUser).then(res => {
          console.log(res)
        })

        route('../')
      })
      .catch(console.error)
  }

  return (
    <div className="form-user">
      <span name="name">
        <input type="text"
          placeholder='Имя'
          className={!error.name ? 'error' : error.name === 'agree' ? 'agree' : ''}
          value={name}
          onChange={e => setName(e.target.value)}
          required
          onBlur={e => chekName(e.target.value)}
        />
      </span>
      <span name="surname">
        <input type="text"
          placeholder='Фамилия'
          className={!error.name ? 'error' : error.name === 'agree' ? 'agree' : ''}
          value={surname}
          onChange={e => setSurname(e.target.value)}
          required
          onBlur={e => chekSurname(e.target.value)}
        />
      </span>
      <Form
        title='Зарегистрироваться'
        name={name}
        surname={surname}
        handleClick={handleRegister}
      />
    </div>
  )
}

export default SignUp