import React from 'react';
import './burger.css'

const Burger = () => {
  
  
  return (
    <div class="header__menu menu">
      <div class="menu__icon">
        <span></span>
      </div>
      <nav class="menu__body">
        <ul class="menu__list">
          <li><a data-goto=".page__section-1" href="" class="menu__link">Раздел №1</a></li>
          <li><a data-goto=".page__section-2" href="" class="menu__link">Раздел №2</a></li>
          <li><a data-goto=".page__section-3" href="" class="menu__link">Раздел №3</a></li>
          <li>
            <a href="" class="menu__link">Страница 1</a>
            <span class="menu__arrow"></span>
            <ul class="menu__sub-list">
              <li>
                <a href="" class="menu__sub-link">Раздел Страницы 1</a>
              </li>
              <li>
                <a href="" class="menu__sub-link">Раздел Страницы 2</a>
              </li>
              <li>
                <a href="" class="menu__sub-link">Раздел Страницы 3</a>
              </li>
            </ul>
          </li>
          <li><a href="" class="menu__link">Страница 2</a></li>
        </ul>
      </nav>
    </div>
  )
};

export default Burger;