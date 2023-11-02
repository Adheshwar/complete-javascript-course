'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const clsBtnModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelectorAll('.show-modal');

function openModal() {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

function closeModal() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

for (let iter = 0; iter < btnOpenModal.length; iter++) {
    btnOpenModal[iter].addEventListener('click', openModal);
}

clsBtnModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function(event){
    if(event.key== 'Escape' && !modal.classList.contains('hidden')){
        closeModal();
    }
})