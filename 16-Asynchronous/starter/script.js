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
const getJSON = function (url, errorMsg ="Something went wrong.") {
    return fetch(url).then(response => {
        if (!response.ok)
            throw new Error(`Country not found. ${response.status}`);

        return response.json();
    });
}
///////////////////////////Using Promises/////////////////////////////////////
//
const renderError = function (msg) {
    countriesContainer.insertAdjacentText('beforeend', msg);
}
const getCountryData = function (country) {
    getJSON(`https://restcountries.com/v2/name/${country}?fullText=true`, `Country not found.`)
    // const uri = `https://restcountries.com/v2/name/${country}?fullText=true`;
    // fetch(uri)
    //     .then(response => {
    //         if (!response.ok)
    //             throw new Error(`Country not found. ${response.status}`);

    //         return response.json();
    //     })
        .then(data => {
            console.log(data[0]);
            renderCountry(data[0]);
            let hasNeighbour = false;
            hasNeighbour = data[0].hasOwnProperty('borders') ? data[0].borders.length != 0 : hasNeighbour;
            console.log(hasNeighbour);
            if (!hasNeighbour) {
                throw new Error("Country do not have any neighbour. Probably an island 🏝️🏝️");
                return;
            }
                
            ////// Chaining Promises
            const neighbour = data[0].borders[0];
            //console.log(neighbour)
            return getJSON(`https://restcountries.com/v2/alpha/${neighbour}`, `Country not found.`)
        })
        //     return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
        // })
        // .then(response => {
        //     if (!response.ok)
        //         throw new Error(`Country not found. ${response.status}`);

        //     return response.json();
        // })
        .then(neighboutDt => renderCountry(neighboutDt, `neighbour`))
        .catch(error => {
            console.log(`${error} 💥💥💥`);
            renderError(`Something went wrong 💥💥💥 ${error.message}`)
        })
        .finally(() => countriesContainer.style.opacity = 1);
}

// btn.addEventListener('click', function () {
//     //countriesContainer.style.opacity = 0;
//     getCountryData('Republic of Korea');
// })


///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

const getJSON1 = function(url, err = `Something went wrong.`){
    return fetch(url).then(response =>{
        if(!response.ok)
            throw new Error(err);

        return response.json();
    })
}

const whereAmI = function(lat, lng){
    getJSON1(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=615056672484587946567x602`)
    .then(data =>{
        const {city, country} = data;
        console.log(data);
        countriesContainer.insertAdjacentText('beforeend',`You are in ${city}, ${country}`);
        return getCountryData(country);
    })
    .catch(err =>{
        console.log(err);
    });
}

whereAmI(22.5297741,114.0089222);
