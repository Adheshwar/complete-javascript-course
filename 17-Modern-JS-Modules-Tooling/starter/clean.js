'strict mode'
const budget = Object([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

//spendingLimits.jay = 300;
console.log(spendingLimits);

const getLimit = (limits, user) => limits?.[user] ?? 0;

const addExpense = function (state, limits, value, description, user='jonas') {
  //if (!user) user = 'jonas';
  const cleanUser = user.toLowerCase();
  //console.log(getLimit(cleanUser));

  return value <= getLimit(limits, cleanUser) ? [...state, { value: -value, description, user : cleanUser }] : state;
    //budget.push({ value: -value, description, user : cleanUser });
};

const newBudget1 = addExpense(budget,spendingLimits,10, 'Pizza 🍕');
//console.log(newBudget1);
const newBudget2 = addExpense(newBudget1,spendingLimits,100, 'Going to movies 🍿', 'Matilda');
const newBudget3 = addExpense(newBudget2,spendingLimits,200, 'Stuff', 'Jay');
//console.log(budget);

const checkExpenses = function (state, limits) {
  return state.map(entry => {
    return entry.value < -getLimit(limits, entry.user) ? {...entry, flag: 'limit'} : entry;
  });
};
const finalBudget = checkExpenses(newBudget3, spendingLimits);

console.log(finalBudget);

const logbigExpenses = function (state,bigLimit) {
  const bigExpenses = state.filter(entry => entry.value <= -bigLimit).map(entry => entry.description.slice(-2)).join(' / ');
  console.log(bigExpenses);
  // let output = '';
  // for (let el of budget) {
  //   output += el.value <= -bigLimit ? `${el.description.slice(-2)} / ` : '';
  // }
  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);
};

logbigExpenses(budget,1000)
