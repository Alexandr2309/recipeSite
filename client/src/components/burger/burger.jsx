import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { removeUser } from '../../store/slices/userSlice';
import './burger.css'
import { useSelector } from 'react-redux';

const Burger = ({ isAuth }) => {
  let iconMenu = document.querySelector('.menu__icon')
  let menuBody = document.querySelector('.menu__body')
  const [onvisib, setOnvisib] = useState(false);

  function pc(e) {
    if (e.target.innerWidth > 768) {
      e.target.onresize = mobile;
    }
  }

  function mobile(e) {
    if (e.target.innerWidth < 768) {
      e.target.onresize = null;
      iconMenu = document.querySelector('.menu__icon')
      menuBody = document.querySelector('.menu__body')
      iconMenu.addEventListener('click', function (e) {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
      });
      const menuLinks = Array.from(document.querySelectorAll('.menu__link[data-goto]'));
      if (menuLinks.length) {
        menuLinks.forEach(elem => {
          elem.addEventListener('click', onMenuClick)
        })
        function onMenuClick(e) {
          const menuLink = e.target;
          if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.pageYOffset - document.querySelector('header').offsetHeight;

            if (iconMenu.classList.contains('_active')) {
              document.body.classList.remove('_lock');
              iconMenu.classList.remove('_active');
              menuBody.classList.remove('_active');
            }
            window.scrollTo({
              top: gotoBlockValue,
              behavior: "smooth"
            });
            e.preventDefault();
          }
        }
      };
      e.target.onresize = pc;
    }
  }

  const isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows());
    }
  };
  if (isMobile.any()) {
    document.body.classList.add('_touch');

    iconMenu.addEventListener('click', function (e) {
      document.body.classList.toggle('_lock');
      iconMenu.classList.toggle('_active');
      menuBody.classList.toggle('_active');
    });
    const menuLinks = Array.from(document.querySelectorAll('.menu__link[data-goto]'));
    if (menuLinks.length) {
      menuLinks.forEach(elem => {
        elem.addEventListener('click', onMenuClick)
      })
      function onMenuClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
          const gotoBlock = document.querySelector(menuLink.dataset.goto);
          const gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.pageYOffset - document.querySelector('header').offsetHeight;

          if (iconMenu.classList.contains('_active')) {
            document.body.classList.remove('_lock');
            iconMenu.classList.remove('_active');
            menuBody.classList.remove('_active');
          }
          window.scrollTo({
            top: gotoBlockValue,
            behavior: "smooth"
          });
          e.preventDefault();
        }
      }
    };
    window.onresize = pc;
  } else {
    window.onresize = mobile;
    document.body.classList.add('_pc');
  };

  const user = useSelector(state => state.user);
  const personalAreaCreate = () => {
    const { email, name, surname, id, avatar } = user;
    return (
      <div style={{ marginTop: 5 }}>
        <img src={avatar} alt="avatar" className='avatar-round'
          onClick={e => setOnvisib(false)}
          onMouseEnter={e => setOnvisib(true)}
        />
        <span className="menu__arrow"></span>
        <ul className={onvisib ? "menu__sub-list onvisib" : "menu__sub-list"}
        >
          <ruby style={{ fontSize: 15, display: 'block', textAlign: 'center', margin: '5px 0 0 0', fontStyle: 'italic' }}>{name} {surname}</ruby>
          <ruby style={{ fontSize: 14, display: 'block', textAlign: 'center', margin: '5px 0 5px 0px', fontStyle: 'italic' }}>{email}</ruby>
          <li>
            <Link style={{ display: 'inline-block', position: 'relative', zIndex: 1001, cursor: 'pointer' }}
              to="personal"
              className="menu__sub-link"
              onClick={e => setOnvisib(false)}
            >Личный аккаут</Link>
          </li>
          <li>
            <a style={{ display: 'inline-block', position: 'relative', paddingLeft: 5, zIndex: 1001, cursor: 'pointer' }} href="#" className="menu__sub-link"
              onClick={e => {
                window.localStorage.clear();
                removeUser();
                setOnvisib(false)
                window.location.reload();
              }}
            >Выйти</a>
          </li>
        </ul>
      </div>
    )
  }

  return (
    <header>
      <div className="header__menu menu">
        <div className="menu__icon">
          <span></span>
        </div>
        <nav className="menu__body">
          <ul className="menu__list">
            <li><Link to='recipe/list' data-goto=".page__section-2" className="menu__link">Рецепты</Link></li>
            <li><Link to='recipe/create' data-goto=".page__section-1" className="menu__link">Добавить репецт</Link></li>
            <li><Link to='recipe/sweets' data-goto=".page__section-3" className="menu__link">Сладости</Link></li>
            {isAuth && <li><Link to='recipe/favorite' data-goto=".page__section-4" className="menu__link">Избранное</Link></li>}
            <li className="menu__link" style={{ transform: isAuth ? 'translateX(80px)' : 'translateX(100px)' }}
            >{isAuth
              ? personalAreaCreate()
              : <Link to='login' data-goto=".page__section-3" className="menu__link">Войти</Link>
              }
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
};

export default Burger;