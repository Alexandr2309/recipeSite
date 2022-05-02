import React from 'react';
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
            <li><a data-goto=".page__section-1" href="" className="menu__link">Добавить репецт</a></li>
            <li><a data-goto=".page__section-2" href="" className="menu__link">Рецепты</a></li>
            <li><a data-goto=".page__section-3" href="" className="menu__link">Сладости</a></li>
            <li>
              <a href="" className="menu__link">Страница 1</a>
              <span className="menu__arrow"></span>
              <ul className="menu__sub-list">
                <li>
                  <a href="" className="menu__sub-link">Раздел Страницы 1</a>
                </li>
                <li>
                  <a href="" className="menu__sub-link">Раздел Страницы 2</a>
                </li>
                <li>
                  <a href="" className="menu__sub-link">Раздел Страницы 3</a>
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