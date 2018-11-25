'use strict';

console.log('linked');

const main = () => {
  const toggleMenu = () => {
    document.querySelector('.dropdown-content').classList.toggle('menuToggle');
  };

  document.querySelector('.dropbtn').addEventListener('click', toggleMenu);
};

window.document.addEventListener('load', main);
