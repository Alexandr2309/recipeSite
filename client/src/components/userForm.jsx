import { useState } from "react";
import React from 'react'

const Form = ({ title, handleClick, name = '', surname = '' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState(true);
  const chekEmail = (mail) => {
    /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(mail)
      ? setErrorEmail('agree')
      : setErrorEmail(false)
  }

  return (
    <>
      <span name="email">
        <input
          name="email"
          type="email"
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          onBlur={e => chekEmail(e.target.value)}
          className={!errorEmail ? 'error' : errorEmail === 'agree' ? 'agree' : ''}
        />
      </span>
      <span name="password">
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          minLength={6}
          required
        />
      </span>
      <button
        onClick={handleClick.bind(null, email, password, name, surname)}
      >
        {title}
      </button>
    </>
  )
}
export default Form;