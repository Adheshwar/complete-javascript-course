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

    static hey(){
        console.log(`Hello 👋`);
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

// Object.create methods
const PersonProto = {
    calcAge() {
        console.log(new Date().getFullYear() - this.birthYear);
    },

    initialize(firstName, birthYear){
       this.firstName = firstName;
       this.birthYear = birthYear; 
    }
}

const steve = Object.create(PersonProto);
console.log(steve);

const ram = Object.create(PersonProto);
ram.initialize('Ram', 2002);

//Inheritance between Classes with constructor functions
const Student = function(firstName, birthYear, course){
    Person.call(this, firstName, birthYear); // Inherit Person
    this.course = course;
};
//Linking Person Prototype
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;
Student.prototype.introduce = function(){
    console.log(`My name is ${this.firstName} and I am studying ${this.course}`);
};

const mike = new Student('Mike', 2000, 'Computer Science');
mike.introduce();
mike.calcAge();
//console.log(Student.prototype.__proto__)

//console.log(PersonProto.__proto__);

//Inheritance between clasess with ES6 Classes
class StudentCl extends PersonCl {
    constructor(fullName, birthYear, course){
        //Always needs to happen first
        super(fullName, birthYear);
        this.course = course;
    }

    introduce(){
        console.log(`My name is ${this.fullName} and I am studying ${this.course}`);
    }

    calcAge(){
        console.log(`I'm ${new Date().getFullYear()-this.birthYear} years old, but as a student I feel more like ${new Date().getFullYear()-this.birthYear+10}`);
    }
}

const kai = new StudentCl('Yi Kai', 1994, 'ECE');
kai.introduce();
kai.calcAge();
//console.log(kai);

//Inheritance between Classes by Object.create method
const StudentProto = Object.create(PersonProto);
StudentProto.initialize = function(firstName, birthYear, course){
    PersonProto.initialize.call(this, firstName, birthYear);
    this.course = course;
};

StudentProto.introduce = function(){
    console.log(`My name is ${this.firstName} and I am studying ${this.course}`);
}

const jay = Object.create(StudentProto);
jay.initialize('Jay', 2005, 'Computer Science');
jay.introduce();
jay.calcAge();

class Account{
    // Public fields
    locale = navigator.language;

    // Private fields
    #movements = [];
    #pin;

    constructor(owner, currency, pin){
        this.owner = owner;
        this.currency = currency;
        //this.locale = navigator.language;
        //Protected Property
        this.#pin = pin;
        //this._movements = []; 
    
        console.log(`Thanks for opening an account, ${this.owner}.`);
    }

    // Public interface
    deposit(val){
        this.#movements.push(val);
        return this;
    }

    withdraw(val){
        this.deposit(-val);
        return this;
    }

    requestLoan(val){
        if(this.#approveLoan(val)){
            this.deposit(val);
            console.log('Loan approved');
            return this;
        }
    }

    getMovements(){
        return this.#movements;
    }

    //Private methods
    #approveLoan(val){
        return true;
    }
};

const acc1 = new Account('Jonas', 'EUR', 1111);
acc1.deposit(400);
acc1.withdraw(125);
console.log(acc1);

//Chaining
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(2500).withdraw(1000);
console.log(acc1);
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

///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

class CarCl {
    constructor(make, speed){
        this.make = make;
        this.speed = speed;
    }

    accelerate(){
        return this.speed+10;
    }

    brake(){
        return this.speed-5;
    }

    get speedUS(){
        return this.speed/1.6;
    }

    set speedUS(speed){
        this.speed = speed*1.6;
    }
};

const ford = new CarCl('Ford', 120);
console.log(ford.speedUS)
ford.speedUS = 80;
console.log(ford);
console.log(ford.accelerate());

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

const EV = function(make, speed, charge){
    Car.call(this, make, speed);
    this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);
EV.prototype.chargeBattery = function(chargeTo){
    this.charge = chargeTo;
    console.log(`${this.make} is being charged to ${this.charge}%.`)
};

EV.prototype.constructor = EV;
EV.prototype.accelerate = function(){
    this.speed += 20;
    this.charge -= 1;
    console.log(`${this.make} going at ${this.speed} km/hr, with charge of ${this.charge}%.`);
};

const tesla = new EV('Tesla', 120, 23);
tesla.brake();
tesla.chargeBattery(50);
tesla.accelerate();