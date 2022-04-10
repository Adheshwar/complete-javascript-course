let test = [125, 555, 44];
let tip = tipCalc(test);
console.log("Tips: "+tip);
let total = totalCalc(test,tip);
console.log(`Total paid: ${total}`);
function tipCalc(test) {
    let tip_val = [];
    if (Array.isArray(test)) {
        for (iter in test) {
            tip_val.push(calc(test[iter]));
        }
        return tip_val;
    }
}

function calc(amount) {
    if (amount >= 50 && amount <= 300) {
        return amount * (15 / 100);
    }
    else {
        return amount*(20/100);
    }
}

function totalCalc(amount,tip){
    var tot_val = [];
    for(iter in amount){
        tot_val.push(amount[iter]+tip[iter]);
    }
    return tot_val;
}