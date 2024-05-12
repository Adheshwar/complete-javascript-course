'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const allButtons = document.getElementsByTagName('button');
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
const h1 = document.querySelector('h1');

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
btnsOpenModal.forEach(function (element) {
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
btnScrollTo.addEventListener('click', function (event) {
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
document.querySelector('.nav__links').addEventListener('click', function (e) {
  //console.log(e.target.classList.contains('.nav__link'));
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    //console.log(id);
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth'
    });
  }
});

//tabbed component
tabsContainer.addEventListener('click', function (ev) {
  const clicked = ev.target.closest('.operations__tab');
  if (!clicked) return;

  tabs.forEach(ta => ta.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  //Activate content area
  tabsContent.forEach(con => con.classList.remove('operations__content--active'));
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

// Menu fade animation

const toggleOpacity = function (e) {
  //console.log(e);
  if (e.target.classList.contains('nav__link')) {
    const mouseoverd = e.target;
    //console.log(e.target);
    const siblings = mouseoverd.closest('.nav').querySelectorAll('.nav__link');
    const logo = mouseoverd.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el != mouseoverd) el.style.opacity = this;
    });

    logo.style.opacity = this;
  }
}

// Passing argument into handler
nav.addEventListener('mouseover', toggleOpacity.bind(0.5));

nav.addEventListener('mouseout', toggleOpacity.bind(1));

// Sticky Navigation
/*
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);
window.addEventListener('scroll', function(e){
  if(this.window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');

});
*/
// Sticky navigation: Intersection Observer API
/*
const obsCallback = function(entries, observer){
  entries.forEach(entry => {
    console.log(entry);
  });
};
const obsOptions = {
  root: null,
  threshold: [0, 0.2]
};
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);
*/
const stickyNav = function (entries) {
  const [entry] = entries;
  //console.log(entry);
  if (!entry.isIntersecting)
    nav.classList.add('sticky');
  else
    nav.classList.remove('sticky');
}

const navHeight = nav.getBoundingClientRect().height;
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
});
headerObserver.observe(header);

// Reveal Sections
const revealSect = function (entries, observer) {
  const [entry] = entries;
  //console.log(entry);
  if (!entry.isIntersecting) return

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const secObserver = new IntersectionObserver(revealSect, {
  root: null,
  threshold: 0.15
})
allSections.forEach(function (section) {
  //section.classList.add('section--hidden');
  secObserver.observe(section);
})

//Lazy Loading
const imgTgt = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  //console.log(entries, observer)
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px'
});
imgTgt.forEach(function (img) {
  imgObserver.observe(img);
})

// Slider
const sliders = function () {
  const slides = document.querySelectorAll('.slide');
  const slider = document.querySelector('.slider');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');
  let curSlide = 0;
  const maxSlide = slides.length;

  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
    })
  }

  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));

    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
  }

  const goToSlide = function (slide) {
    slides.forEach((s, i) => s.style.transform = `translateX(${(i - slide) * 100}%)`);
  }

  const init = function () {
    createDots();
    activateDot(0);
    goToSlide(0);
  }

  init();

  //slides.forEach((s, i) => s.style.transform = `translateX(${i*100}%)`);

  // Go to next slide
  const nextSlide = function () {
    if (curSlide == maxSlide - 1) {
      curSlide = 0;
    }
    else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  }

  const prevSlide = function () {
    curSlide--;
    if (curSlide < 0) {
      curSlide = maxSlide - 1;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  }

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    //console.log(e);
    if (e.key == 'ArrowLeft') prevSlide();
    if (e.key == 'ArrowRight') nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  })
};

sliders();
////////////////////////////////////////////////
//console.log(document.documentElement);
//console.log(document.head);
//console.log(document.body);

document.getElementById('section--1');
//console.log(document.getElementsByClassName('btn'));

//Creating and inserting Elements
/*
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
document.querySelector('.btn--close-cookie').addEventListener('click', function (e) {
  message.remove();
  console.log(this);
});
/
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


const alertH1 = function (e) {
  alert('addEventListener: Reading H1 element.');
  h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);
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

//DOM traversing
h1.querySelectorAll('.highlight');
//console.log(h1.childNodes);
//console.log(h1.children);//Direct Children
//First and Last element child
//h1.firstElementChild.style.color = 'white';
//h1.lastElementChild.style.color = 'green';

//Upwards
/*
console.log(h1.parentNode);
console.log(h1.parentElement);
h1.closest('.header').style.background = 'var(--gradient-secondary)';

console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function(el){
  if(el != h1) el.style.transform = 'scale(0.5)';
})
*/

document.addEventListener('DOMContentLoaded', function(e){
  console.log('HTML parsed and DOM Tree built')
})