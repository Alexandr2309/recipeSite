import React from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from 'react-redux'
import { getUserPosts, setUser } from '../store/slices/userSlice';
import Form from './userForm'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const route = useNavigate();

  const handleLogin = (email, password,) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        window.localStorage.setItem('id', user.uid)
        window.localStorage.setItem('email', user.email)
        window.localStorage.setItem('token', user.accessToken)
        window.localStorage.setItem('name', user.displayName.split(' ')[0])
        window.localStorage.setItem('surname', user.displayName.split(' ')[1]);

        dispatch(setUser({
          email: user.email,
          id: user.uid,
          token: user.accessToken,
          name: user.displayName.split(' ')[0],
          surname: user.displayName.split(' ')[1]
        }));
        dispatch(getUserPosts(user.uid))
        route('../');
      })
      .catch(err => {
        alert('Ошибка авторизации');
        console.log(err);
      })
  }
  return (
    <div className="form-user">
      <Form
        title='Войти'
        handleClick={handleLogin}
      />
    </div>
  )
}

export default Login