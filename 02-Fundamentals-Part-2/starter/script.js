const findAge = (birthYear) => 2021 - birthYear;
let age = findAge(1995);
console.log(age);

const calcAverage = (s1, s2, s3) => (s1 + s2 + s3) / 3;

const checkWinner = (a, b) => {
  if (a > 2 * b) {
    console.log(`Dolphin wins`);
  } else if (2 * a < b) {
    console.log("Koala wins");
  } else console.log("Nobody wins");
};

let dolphin = calcAverage(44, 23, 71);
let koala = calcAverage(65, 54, 49);

const win = checkWinner(dolphin, koala);

let e = ["Aben Sabu", "Adi", "Deepan"];
