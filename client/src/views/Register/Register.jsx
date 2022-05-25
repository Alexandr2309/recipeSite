import React from 'react'
import { Link } from 'react-router-dom';
import SignUp from './../../components/SignUp';

const Register = () => {
  return (
    <div>
      <h1 style={{textAlign: 'center', margin: '15px 0 25px 0'}}>Зарегистрироваться</h1>
      <SignUp />
    <p style={{textAlign: 'center', margin: '25px 0 0px 0', fontSize: 19}}>
      Уже есть аккаунт?&nbsp;&nbsp;<Link to='/login'>Войти</Link>
    </p>
    </div>
  )
}

export default Register