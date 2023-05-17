const fs = require('fs');
let content = '';

let numberOfElements = 8000;
//циклічно додаємо необхідну клькість рядків і стовпців що відповідать за вершини графу
/*
    let outer = new Array(numberOfElements);
    outer.forEach(element => {
        element = new Array(numberOfElements);
    });
    for (let i = 0; i < numberOfElements.length; i++) {
        const element = array[i];
        
    }
    fs.appendFileSync('./test1.txt', content, err => {
        if (err) {
            console.error(err);
        }});
*/

for (let i = 0; i < numberOfElements; i++) {
    
    for (let j = 0; j < numberOfElements; j++) {
        let value = Math.random();
        value = value.toFixed(2)
        value = (value<0.7 && value>0.3)? 0: value;
        if(j == numberOfElements-1){
            content = content +value;
        }
        else{
            content = content + value + ',';
        }
    }
    content +='],\n[';
    fs.appendFileSync('./ntest8000.txt', content, err => {
    if (err) {
        console.error(err);
    }});
    content='';
}