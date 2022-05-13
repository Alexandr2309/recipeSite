import React from 'react';
import { Link } from 'react-router-dom';
import './burger.css'

const Burger = ({ state, setState }) => {
  let iconMenu = document.querySelector('.menu__icon')
  let menuBody = document.querySelector('.menu__body')

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
            <li>
              <Link to='recipe/favorite' className="menu__link">Избранное</Link>
              <span className="menu__arrow"></span>
              <ul className="menu__sub-list">
                <li>
                  <a href="" className="menu__sub-link">Обед</a>
                </li>
                <li>
                  <a href="" className="menu__sub-link">Ужин</a>
                </li>
                <li>
                  <a href="" className="menu__sub-link">Аня одобряет</a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
};

export default Burger;