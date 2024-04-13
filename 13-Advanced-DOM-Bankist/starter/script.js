'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

/*
for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);
*/
btnsOpenModal.forEach(function(element){
  element.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
const header = document.querySelector('.header');
console.log(document.getElementsByClassName('btn'));

//Creating and inserting Elements
const message = document.createElement('div');
message.classList.add('cookie-message');
//message.textContent = `We use cookie for improved functionality and analytics`;
message.innerHTML = `We use cookie for improved functionality and analytics. <button class = "btn btn--close-cookie">Got it!</button>`;
//header.prepend(message);
header.append(message);
//header.append(message.cloneNode(message));
//header.before(message);
//header.after(message);

//Delete element
document.querySelector('.btn--close-cookie').addEventListener('click', function(e) {
  message.remove();
  console.log(this);
} );

//Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(getComputedStyle(message).color);
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

//document.documentElement.style.setProperty('--color-primary', 'orangered')

//Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.getAttribute('src'));
console.log(logo.className);

logo.setAttribute('company', 'Bankist');
console.log(logo.getAttribute('company'));
console.log(logo.company);

//Data attribute
console.log(logo.dataset.versionNumber);

//Classes
logo.classList.add('c');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c');
// Overrides all classes--Don't use
//logo.className = 'adhesh';