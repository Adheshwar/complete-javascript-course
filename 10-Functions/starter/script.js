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