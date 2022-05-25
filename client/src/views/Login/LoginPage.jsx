import React from 'react'
import Login from './../../components/Login';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div>
    <h1 style={{textAlign: 'center', marginTop: 15, marginBottom: -15}}>Войти</h1>
    <Login />
  <p style={{textAlign: 'center', marginTop: 15, fontSize: 19}}>
    Нет аккаунта?&nbsp;<Link to='/register'> Зарегистрироваться</Link>
  </p>
  </div>
  )
}

export default LoginPage