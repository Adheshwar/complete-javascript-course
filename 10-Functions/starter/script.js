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
//console.log(vistara);

// Apply method
var params = [234, 'Williams'];
book.apply(vistara, params);
//console.log(vistara);

//Bind method
var bookVis = book.bind(vistara);
var bookAI = book.bind(air_india);

bookAI(822, 'Krish');
bookVis(482, 'Jasper');
console.log(vistara);

const bookAI455 = book.bind(air_india, 455);
bookAI455('Finrod Felagund');
console.log(air_india);

// Bind method in Event Listeners
air_india.planes = 128;
air_india.buyPlane = function(){
    this.planes++;
    console.log(`${this.airline} now owns ${this.planes} planes.`);
};

const buy = document.querySelector('.buy');
buy.addEventListener('click', air_india.buyPlane.bind(air_india));

// Partial Application with Bind
const addTax = (rate, value) => value + value*rate;
console.log(addTax(0.2, 300));

const addVAT = addTax.bind(null,0.2);
console.log(addVAT(500));

const addTaxRate = rate => (value) => value + value*rate;

const addVAT_fn = addTaxRate(0.1);
console.log(addVAT_fn(300));

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

const poll = {
    question: 'What is your favourite programming language?',
    options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
    // This generates [0, 0, 0, 0]. More in the next section 😃
    answers: new Array(4).fill(0),
    registerNewAnswer(){
        let options = '';
        for(const iter of this.options.values()){
            options = options + `\n${iter}`;
        }
        const answer = parseInt(prompt(`${this.question}\n${options}\n(Write option number)`));
        console.log(typeof answer)
        if(!Number.isNaN(answer) && answer>-1 && answer<4){
            this.answers[answer]++;
        }
        console.log(this.answers);
    }
};

document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll));