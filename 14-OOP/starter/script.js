'use strict';
// Using Constructor function
const Person = function(firstName, birthYear){
    // Instance Properties
    this.firstName = firstName;
    this.birthYear = birthYear;

    //Never create method in Constructor
    /*this.calcAge = function(){
        console.log(new Date().getFullYear-this.birthYear)
    }*/
};

const a = new Person('Anand', 1995);
console.log(a);

console.log(a instanceof Person);

//Prototypes
console.log(Person.prototype);
Person.prototype.calcAge = function(){
    console.log(new Date().getFullYear()-this.birthYear)
};

a.calcAge();
console.log(a.__proto__ === Person.prototype);
console.log(Person.prototype.isPrototypeOf(a));
Person.prototype.species = 'Homo sapiens';
//console.log(a.__proto__.__proto__.__proto__);//Prototypal Chain
console.dir(Person.prototype.constructor);

const arr = [3, 2, 1];
//console.log(arr.__proto__);
//console.log(Array.prototype);

const h1 = document.querySelector('h1');
//console.dir(x => x+1);

//ES6 Class
class PersonCl {
    constructor(fullName, birthYear){
        this.fullName = fullName;
        this.birthYear = birthYear;
    }

    calcAge() {
        console.log(new Date().getFullYear() - this.birthYear);
    }

    greet(){
        console.log(`Hey ${this.fullName}!`)
    }

    get age(){
        return new Date().getFullYear() - this.birthYear;
    }

    set fullName(name){
        if(name.includes(' ')) this._fullName = name;
        else alert(`${name} is not a full name.`)
    }

    get fullName(){
        return this._fullName;
    }
}

const yikai = new PersonCl('YiKai Chen', 1995);

const me = new PersonCl('Myself me', 1995);
me.calcAge();
me.greet();
console.log(me);
console.log(me.fullName)

const account = {
    owner : 'Adhesh',
    movements: [200, 1000, 234, 720],

    get latest(){
        return this.movements.slice(-1).pop();
    },

    set latest(mov){
        this.movements.push(mov);
    }
};
/*
console.log(account.latest);
account.latest = 890;
console.log(account.movements);
*/
///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

const Car = function(make, speed){
    this.make = make;
    this.speed = speed;
};

Car.prototype.accelerate = function(){
    this.speed += 10;
    console.log(this.speed);
};

Car.prototype.brake = function(){
    this.speed -= 5;
    console.log(this.speed);
};

const bmw = new Car('BMW', 120);
const mer = new Car('Mercedes', 95);
/*
console.dir(bmw);
//console.log(bmw.prototype);
bmw.accelerate();
mer.brake();*/