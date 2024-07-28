'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// const getCountry = function (country) {
//     const uri = `https://restcountries.com/v2/name/${country}?fullText=true`;
//     const request = new XMLHttpRequest();
//     request.open('GET', uri);
//     request.send();

//     request.addEventListener('load', function () {
//         const [data] = JSON.parse(this.responseText);
//         console.log(data);
//         const htmlTemplate = `<article class="country">
//     <img class="country__img" src="${data.flag}" />
//         <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} Million</p>
//             <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//             <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//         </div>
//     </article>`;
//         countriesContainer.insertAdjacentHTML('beforeend', htmlTemplate);
//         countriesContainer.style.opacity = 1;
//     });
// }
// getCountryData('Taiwan');
// getCountryData('India');
let nameC = `Sri Lanka`;
const getCountryAndNeighbour = function (country) {
    const uri = `https://restcountries.com/v2/name/${country}?fullText=true`;
    // AJAX call country 1
    const request = new XMLHttpRequest();
    request.open('GET', uri);
    request.send();

    request.addEventListener('load', function () {
        const [data] = JSON.parse(this.responseText);
        //console.log(data);
        renderCountry(data);

        // Get neighbour country
        const [neighbour] = data.borders;
        if (!neighbour) return;

        // AJAX call country 2
        const request2 = new XMLHttpRequest();
        request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
        request2.send();

        request2.addEventListener('load', function () {
            //console.log(this.responseText);
            const data2 = JSON.parse(this.responseText);
            //console.log(data2);
            renderCountry(data2, 'neighbour');
        });
    });
}

const renderCountry = function (data, className = '') {
    const htmlTemplate = `<article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
        <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} Million</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
    </article>`;
    countriesContainer.insertAdjacentHTML('beforeend', htmlTemplate);
}

//getCountryAndNeighbour(nameC);
///////////////////////////Using Promises/////////////////////////////////////
//
const renderError = function(msg){
    countriesContainer.insertAdjacentText('beforeend', msg);
}
const getCountryData = function (country) {
    const uri = `https://restcountries.com/v2/name/${country}?fullText=true`;
    fetch(uri)
    .then(response => {
        if(!response.ok)
            throw new Error(`Country not found. ${response.status}`);


    })
    .then(data => {
        console.log(data[0]);
        renderCountry(data[0]);
        let hasNeighbour = false;
        hasNeighbour = data[0].hasOwnProperty('borders') ? data[0].borders.length != 0 : hasNeighbour ;
//console.log(hasNeighbour);
        if(!hasNeighbour) return;
        ////// Chaining Promises
        const neighbour = data[0].borders[0];
        //console.log(neighbour)
        return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(neighboutDt => renderCountry(neighboutDt, `neighbour`))
    .catch(error => {
        console.log(`${error} 💥💥💥`);
        renderError(`Something went wrong 💥💥💥 ${error.message}`)
    })
    .finally(() => countriesContainer.style.opacity = 1);
}

btn.addEventListener('click', function(){
    getCountryData('India');
})

