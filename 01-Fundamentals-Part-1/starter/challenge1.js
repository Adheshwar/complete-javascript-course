const mark_height = 1.75;
const mark_mass = 67;
const john_height = 1.8;
const john_mass = 70;
let mark_bmi = mark_mass / (mark_height ** 2);
let john_bmi = john_mass / (john_height ** 2);
let markBmiHigh = false;
if (mark_bmi > john_bmi)
    markBmiHigh = true;
console.log('Mark BMI: ' + mark_bmi + '\nJohn_BMI: ' + john_bmi + '\nIs Mark BMI higher? ' + markBmiHigh);

console.log(Boolean(-18));