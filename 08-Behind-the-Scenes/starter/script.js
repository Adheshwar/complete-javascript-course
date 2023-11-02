'use strict';

function calcAge(birthYear){
    const age = 2035 - birthYear;

function printAge(){
    const firstName = "Aben";
    let out = `${firstName}, You are ${age}, born in ${birthYear}`;
    console.log(out);

    if(birthYear >= 1981 && birthYear <= 1996){
        var millenial = true;
        const str = `Oh, and you're a millenial, ${firstName}`;
        console.log(str);

        function add(a, b){
            return a + b;
        }

        out = "New output!";
    }
    //console.log(str);
    console.log(millenial);
    console.log(out);
   // console.log(add(1,5));
}

    printAge();
    return age;
}

let firstName = "Adheshwar";
calcAge(1995);

//Example

//if(!numProducts) deleteShoppingCart();

let numProducts = 10;
function deleteShoppingCart() {
    console.log("All Products deleted");
}

console.log(this.firstName)
