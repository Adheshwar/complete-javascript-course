'use strict';

const bookings = [];

const createBooking = function(flightNum, numPassengers=1, price=2000){

    /*ES5
    numPassengers = numPassengers || 1;
    price = price || 2000;
    */

    const booking = {
        flightNum,
        numPassengers,
        price
    };

    console.log(booking);
    bookings.push(booking);
};

createBooking('AI2456');

const flight = 'AI574';
const pass = {
    name: 'Adheshwar',
    passport: 348334
};

// Value vs Reference
const checkIn = function(flightNum, passenger){
    flightNum = 'AI330';
    passenger.name = 'Mr. ' + passenger.name;
    
    if(passenger.passport == 348334){
        alert('Checked in');
    }
    else{
        alert('Wrong Passport!');
    }
}

checkIn(flight, pass);
console.log(flight);
console.log(pass);

const oneWord = function(str){
    return str.replace(/ /g, '').toLowerCase();
}

const fistWordUpper = function(str){
    let [firstWord, ...others] = str.split(' ');
    return [firstWord.toUpperCase(), ...others].join(' ');
}

//Higher order fn
const transformer = function(str, fn){
    console.log(`Transformed work is ${fn(str)}`);
    console.log(`Transformed by ${fn.name}`);
}

transformer('Sad that HSK is not conducted in India', fistWordUpper);

// Function returning fn
/*
const greet = function(greet){
    return function(name){
        console.log(`${greet} ${name}`);
    }
}
*/
const greet = greet =>{
    return name=> console.log(`${greet} ${name}`)
}

const greeting = greet('Hey');
greeting('Adheshwar');

greet('你好')('Adheshwar');
createBooking('AI2456');//Check sync

const air_india = {
    airline: 'Air India',
    iataCode: 'AI',
    bookings : [],
    book(flightNum, name){
        console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}.`);
        this.bookings.push({flight: `${this.iataCode}${flightNum}`, name});
    }
}

air_india.book(8743, 'Aben Sabu');

const vistara = {
    airline : 'Vistara',
    iataCode: 'UK',
    bookings : [],
}

const book = air_india.book;

// Does not work
//book(234, 'Deepan E');

// Call method
book.call(vistara, 567, 'Aaron');
console.log(vistara);

//Bind method
