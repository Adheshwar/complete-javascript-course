'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

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

///////////////////////////////////////////////////////
//Smooth scrolling
btnScrollTo.addEventListener('click', function(event){
  /*
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(event.target.getBoundingClientRect());
  console.log(window.pageXOffset, window.pageYOffset);
  console.log('height/width of viewport: ' + document.documentElement.clientHeight, document.documentElement.clientWidth);
  //window.scrollTo(s1coords.left+window.pageXOffset, s1coords.top+pageYOffset);
/*
  window.scrollTo({
    left: s1coords.left+window.pageXOffset, 
    top: s1coords.top+pageYOffset,
    behavior: 'smooth'
  });
*/
  section1.scrollIntoView({
    behavior: 'smooth'
  });
});

///////////////////////////////////////////////////////
// Page Navigation
/*
document.querySelectorAll('.nav__link').forEach(function(node){
  node.addEventListener('click', function(e){
    e.preventDefault();
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth'
    });
  });
});*/

// Event Delegation
document.querySelector('.nav__links').addEventListener('click', function(e){
  //console.log(e.target.classList.contains('.nav__link'));
  if(e.target.classList.contains('nav__link')){
    e.preventDefault();
    const id = e.target.getAttribute('href');
    //console.log(id);
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth'
    });
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

const h1 = document.querySelector('h1');
const alertH1 = function(e){
  alert('addEventListener: Reading H1 element.');
  h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(()=> h1.removeEventListener('mouseenter', alertH1), 3000);
/*
h1.onmouseenter = function(e){
  alert('addEventListener: Reading H1 element.');
}*/

//rgb(255,255,255)
/*
const randomInt = (min, max) => Math.floor(Math.random()* (max - min + 1));

const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
console.log(randomColor());

document.querySelector('.nav__link').addEventListener('click', function(e){
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);

  //Stop Propagation
  //e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function(e){
  this.style.backgroundColor = randomColor();
  console.log('LINKs', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function(e){
  this.style.backgroundColor = randomColor();
  console.log('Nav', e.target, e.currentTarget);
});*/