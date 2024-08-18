// Importing module
import { addToCart, totalPrice as price, tq } from "./shoppingCart.js";
//import cloneDeep from "../node_modules/lodash-es/cloneDeep.js";
import cloneDeep from "./node_modules/lodash-es/cloneDeep.js";

//import * as ShoppingCart from "./shoppingCart.js";
console.log(`Importing module`);

// addToCart('Bread', 5);
// console.log(price, tq);
// ShoppingCart.addToCart('bread', 8);
// console.log(ShoppingCart.totalPrice);

import add, {cart} from "./shoppingCart.js";
add('MuscleBlaze Whey', 1);
add('Protein bar', 1);
add('Creatine', 1);

console.log(cart);

// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('SOmething');

// const getLastPost = async function(){
//     const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//     const data = await res.json();
//     console.log(data);

//     return {title: data.at(-1).title, text: data.at(-1).body}
// }

// const lastPost =await getLastPost();
// console.log(lastPost);

const ShoppingCart2 = (function(){
    const cart = [];
    const shippingCost = 10;
    const totalPrice = 237;
    const totalQuantity = 23;

    const addToCart = function(product, quantity){
        cart.push( {product, quantity});
        console.log(`${quantity} ${product} added to cart.`);
    };

    const orderStock = function(product, quantity){
        console.log(`${quantity} ${product} ordered from supplier.`);
    };

    return{
        addToCart,
        cart,
        totalPrice,
        totalQuantity
    };
})();

ShoppingCart2.addToCart('apple', 2);
console.log(ShoppingCart2);

//Export NodeJS
// export.addToCart = function(product, quantity){
//     cart.push( {product, quantity});
//     console.log(`${quantity} ${product} added to cart.`);
// };

// //Import
// const {addToCart} = require('./shoppingCart.js');

const state = {
    cart: [
        {product: 'Bread', quantity: 5},
        {product: 'Pizza', quantity: 8}
    ],
    user: {loggedIn: true},
};

const stateClone = Object.assign({}, state);
console.log(stateClone);

const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateDeepClone);

class Person {
    #greeting = 'Hey';
    constructor(name){
        this.name = name;
        console.log(`${this.#greeting}, ${this.name}`);
    }
}

const adhesh = new Person('Adhesh');

console.log('Adhesh' ?? null);

console.log(cart.find(el => el.quantity >=2));
Promise.resolve('Test').then(x => console.log(x));

import 'core-js/stable/array/find.js';
import 'regenerator-runtime/runtime';

if(module.hot){
    module.hot.accept();
}