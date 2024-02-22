'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function(movements, sort=false){
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a,b) => a-b) : movements;

  movs.forEach(function(val, i){
    const type = val > 0 ? 'deposit' : 'withdrawal';
    const mov = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__value">${val}€</div>
    </div>    
    `;
    containerMovements.insertAdjacentHTML('afterbegin', mov);
  })
}

function createusername(accounts){
  accounts.forEach(function(acc){
    acc.username = acc.owner.toLocaleLowerCase().split(' ').map(word => word.charAt(0)).join('')
  })
  return;
}

createusername(accounts);
//console.log(accounts)
/*
const user = 'Steven Thomas William';
const user_name = user.toLocaleLowerCase().split(' ').map(word => word.charAt(0)).join('');
console.log(user_name);
*/

const calcBalance = function(account){
  let movements = account.movements;
  account.balance = movements.reduce((acc,cur) => acc+cur, 0);
  labelBalance.textContent = `${account.balance}€`;
};

//calcBalance(account1.movements);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// For each loop
movements.forEach(function(mov){
  if(mov > 0){
    console.log(`You have deposited ${mov}`);
  }
  else{
    console.log(`You withdrew ${Math.abs(mov)}`);
  }
})

// Map
const euroTousd = 1.1;
// Function expression
const movementsUSD = movements.map(function(mov){
  return mov*euroTousd;
});
//Arrow function
const movementsUSD_arrow = movements.map((movs) => movs*euroTousd);
console.log(movementsUSD_arrow)

console.log("EUR to USD "+movementsUSD);
/////////////////////////////////////////////////
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2));
console.log(arr.splice(2));

// Reverse
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['m', 'l', 'k', 'j', 'i'];
console.log(arr2.reverse());

//Concat
const letters = arr.concat(arr2);
console.log(letters);


const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function(val, key, map){
  console.log(`${val} is ${key}`);
});

const curr_uniq = new Set(['USD', 'INR', 'GBP', 'CHY', 'USD']);
console.log(curr_uniq);

curr_uniq.forEach(function(cur, i, set){
  console.log(`${i}: ${cur}`);
});

//Filter method
const deposit = movements.filter(mov => mov >0);
console.log(deposit);

const withdrawals = movements.filter(mov => mov<0);
console.log(withdrawals);

//Reduce method
const balance = movements.reduce(function(acc, cur, i, arr){
  return acc+cur;
}, 0);
console.log(balance);

const bal_arrow = movements.reduce((acc,cur) => acc+cur , 0);
console.log(bal_arrow);

//Maximum value using reduce
const max = movements.reduce((acc, cur) => acc>cur ? acc : cur , movements[0]);
console.log(max);

// Chaining Methods
const tot_deposit = movements.filter(mov => mov>0).map(mov=> mov*euroTousd).reduce((acc, cur) => acc+cur , 0);
console.log(`Total deposit in USD : ${tot_deposit}`);

//Display Summary
const displaySummary = function(account){
  let mov = account.movements;
  const deposit = mov.filter(mov => mov>0).reduce((acc,mov) => acc+mov ,0);
  const withdraw = Math.abs(mov.filter(mov => mov<0).reduce((acc, mov) => acc+mov, 0));
  const interest = mov.filter(mov => mov>0).map(mov => mov*account.interestRate/100).filter(int => int>=1).reduce((acc, cur) => acc+cur ,0);
  labelSumIn.textContent = `${deposit}€`;
  labelSumOut.textContent = `${withdraw}€`;
  labelSumInterest.textContent = `${interest}€`
};

//displaySummary(account1.movements);

//Find method
const firstWithdrawal = movements.find(mov => mov<0);
console.log(firstWithdrawal);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

//Login
let currentAccount;
btnLogin.addEventListener('click', function(event){
  //Prevent form from submitting
  event.preventDefault();
  currentAccount = accounts.find(acc => inputLoginUsername.value === acc.username)

  if(currentAccount?.pin === Number(inputLoginPin.value)){
    //Display UI and welcome
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

function updateUI(account){
  //Display movements
  displayMovements(account.movements);

  //Display Balance
  calcBalance(account);

  //Display Summary
  displaySummary(account);
}

//Tranfer Money to another acc
btnTransfer.addEventListener('click', function(event){
  event.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const toAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  
  inputTransferAmount.value = inputTransferTo.value = '';

  //Check current account has enough money
  if(amount > 0 && toAcc && currentAccount.balance >= amount && toAcc?.username != currentAccount.username){
    currentAccount.movements.push(-amount);
    toAcc.movements.push(amount);
    updateUI(currentAccount);
  }
});

btnClose.addEventListener('click', function(event){
  event.preventDefault();

  if(currentAccount.username === inputCloseUsername.value && currentAccount.pin === Number(inputClosePin.value)){
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);
    //console.log(index);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Log in to get started';
  }
  inputClosePin.value = inputCloseUsername.value = '';
})

//Some Method
const anyDeposits = movements.some(mov => mov>1500);
console.log(anyDeposits);

//Request for Loan
btnLoan.addEventListener('click', function(event){
  event.preventDefault();
  const loanAmt = Number(inputLoanAmount.value);
  inputLoanAmount.value = '';

  if(loanAmt > 0 && currentAccount.movements.some(mov => mov >= loanAmt*0.1)){
    currentAccount.movements.push(loanAmt);
    updateUI(currentAccount);
  }
})

//Every Method
console.log(account4.movements.every(mov => mov>0));

//Flat Method
const nested = [[1,2,3], [4,5,6], 7, 8];
console.log(nested.flat());

const deepArr = [[[1,2],3], [[4,5],6],7,8];
console.log(deepArr.flat(2));

const accountsMovements = accounts.map(acc => acc.movements);
const allMovements = accountsMovements.flat();
const allBalance = allMovements.reduce((acc,cur) => acc+cur,0);
console.log(allBalance);

//Flat map method
const overallBalance = accounts.flatMap(acc => acc.movements).reduce((acc,cur) => acc+cur,0);
console.log(`------------Challenge logs-----------`);

const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());

//Sort method
//return>0 ,B,A
movements.sort((a,b) => {
  if(a>b)
    return 1;
  if(b>a)
    return -1;
});
console.log(movements);

let sort = false;
btnSort.addEventListener('click', function(event){
  event.preventDefault();
  displayMovements(currentAccount.movements, !sort);
  sort = !sort;
});
///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

function checkDogs(dogsJulia, dogsKate){
  var corDogsJulia = dogsJulia.slice(1, dogsJulia.length-2);
  const dogArray = [...corDogsJulia, ...dogsKate];
  dogArray.forEach(function(dogAge, index){
    dogAge < 3 ? console.log(`Dog #${index+1} is a puppy, and is ${dogAge} years old`) : console.log(`Dog #${index+1} is an adult, and is ${dogAge} years old`)
  });
}

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/*
const calcAverageHumanAge = function(dogAge){
  let humanAge = dogAge.map(age => age<=2 ? 2*age : 16 + age*4);
  let dogFinalAge = humanAge.filter(age => age>=18);
  return dogFinalAge.reduce((acc,cur, i, arr) => acc+(cur/arr.length),0);
}
*/

const calcAverageHumanAge = dogAge => dogAge.map(age => age<=2 ? 2*age : 16 + age*4).filter(age => age>=18).reduce((acc, age, i, arr) => acc+(age/arr.length),0);
console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]), calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
