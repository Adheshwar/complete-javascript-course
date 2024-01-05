'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  orderDelivery: function ({starterIndex=1, mainIndex=0, time='20:00', address}){
    console.log(`Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
  },

  orderPasta: function(ing1, ing2, ing3){
    console.log(`Here is your pasta order with ${ing1}, ${ing2}, ${ing3}`);
  },
};

restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole,21',
  mainIndex: 2,
  starterIndex: 2,
})

const {name, openingHours, categories} = restaurant;
console.log(name, openingHours, categories);

const {name: restaurantName, openingHours: hours, categories: tags} = restaurant;
console.log(restaurantName, hours, tags);

const {menu = [], starterMenu: starters = []} = restaurant;
console.log(menu, starters);

//Mutating Variables
let a = 111;
let b = 999;

const obj = {a: 23, b: 7, c:14};
({a,b} = obj);
console.log(a, b);

//Nested onjects
const {fri: {open: o, close: cl}} = openingHours;
console.log(o, cl);

//Spread operator
const arr = [7,8,9];
const newArr = [1, 2, ...arr];
console.log(newArr);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

//Copy array
const mainMenuCpoy = [...restaurant.mainMenu];

//Join 2 Arrays
const menu1 = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu1);
/*
const ingredients = [prompt('Let\'s make pasta! Ingredient 1?'), prompt('Ingredient 2?'), prompt('Ingredient 3?')];
restaurant.orderPasta(...ingredients);
*/
//Objects
const newRestaurant = {foundIn:1998, ...restaurant, founder: 'Linguini'};
console.log(newRestaurant);

const add = function(...numbers){
  let sum = 0;
  for(let a in numbers){
    sum = sum+numbers[a];
  }
  console.log(sum)
}

add(2, 3, 6, 9);

//short-circuiting
console.log(3 || 'Jonas')

//Nullish Coalescing --> null, undefined does not include 0 and empty string
restaurant.numGuest = 0;
const guests = restaurant.numGuest ?? 10;
console.log(guests);

const rest1 = {
  name: "Capri",
  numGuests: 20,
}

const rest2 = {
  name: "La Pizzalo",
  owner: 'Giovanni Rossi',
}

rest2.numGuest ||= 10;
console.log(rest2);


// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('c') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
  printGoals: function(...players){
    console.log(`scored ${players.length} goals`);
  }
};

const [player1, player2]= game.players;
console.log(player1,player2);
const [gk, ...fieldPlayers] = player1;
console.log(gk, fieldPlayers)
const allPlayers = [...player1, ...player2];
console.log(allPlayers)
const player1Final = [...player1,'Thiago', 'Coutinho' , 'Perisic'];
console.log(player1Final)
const {odds:{team1,x:draw,team2}} = game;
console.log(team1,draw,team2)
game.printGoals('Davies', 'Muller', 'Lewandowski' , 'Kimmich')

team1 < team2 && console.log(`Team 1 is likely to win`);
team1 > team2 && console.log(`Team 2 is likely to win`);

//For of loop
for(let iter of menu1) console.log(iter);

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/
const printGoal =function(...players){
  for(let [key,value] of game.scored.entries()) console.log(`Goal ${key+1}: ${value}`);
}

printGoal(game.scored)
/*
let keys = Object.keys(game.odds);
//console.log(keys)
let sum=0;
for(let iter of keys){
  sum +=game.odds?.[iter];
  console.log(`Odd of victory ${game[iter] ?? 'draw'}: ${game.odds[iter]}`);
}

console.log(sum/keys.length);
*/
const orderSet = new Set(['Pasta', 'Pizza', 'Pizza','Risotto','Pasta']);
console.log(orderSet);
console.log(orderSet.size);
console.log(orderSet.has('Pizza'));
orderSet.add('Garlic Bread');
orderSet.add('Garlic Bread');
console.log(orderSet);

//Maps
const rest = new Map();
rest.set('name', 'Adyar Ananda Bhavan');
rest.set(1, 'Chennai');
rest.set(2, 'Madurai').set('categories', ['Sweets', 'A2B']);

console.log(rest);
console.log(rest.get(1));

console.log(rest.has(1));
console.log(rest.size);


const question = new Map([
  ['question', 'Which is the capital of Tamil Nadu?'],
  [1, 'Coimbatore'],
  [2, 'Chennai'],
  [3, 'Madurai'],
  ['correct', 2],
  [true, 'Correct!'],
  [false, 'Try again!'],
]);
/*
console.log(question.get('question'));
for(const [key, value] of question){
  if(typeof key == 'number') console.log(`Answer ${key}: ${value}`)
}

const answer = Number(prompt('Your answer'));

console.log(question.get(question.get('correct') === answer));
*/

// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

const events = new Set([...gameEvents.values()]);

console.log(events);

gameEvents.delete(64);
console.log(gameEvents);
let sum = 0;

for(const iter of gameEvents.keys()){
  sum += iter;
}
console.log(gameEvents.size);
console.log(sum/90);

for(const [key,value] of gameEvents){
  const half = key <=45 ? 'FIRST' : "SECOND";
  console.log(`[${half} HALF] : ${key} ${value}`)
}

const airline = 'Air India';
const plane = "A320";

///////////////////////////////////////
// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function(){
  const entered = document.querySelector('textarea').value;
  if(entered){
    let arr = entered.split('\n');
    for(const iter in arr){
      let initial = arr[iter].trim().toLowerCase().split('_');
      initial[1] = initial[1][0].toUpperCase() + initial[1].slice(1);
      let pad = initial.join('').padEnd(20, ' ');
      //console.log(iter+1);
      console.log(pad+ '✅'.repeat(parseInt(iter)+1));
    }
  }
})