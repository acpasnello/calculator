let firstNum;
let secondNum;
let operator;

function operate(firstNum, secondNum, operator) {
    let result = (function (){
        switch (operator) {
            case "+":
                return add(firstNum, secondNum);
            case "-":
                return subtract(firstNum, secondNum);
            case "*":
                return multiply(firstNum, secondNum);
            case "/":
                return divide(firstNum, secondNum);
            default:
                break;
        }
    });
}
function add(x, y) {return x + y;}
function subtract(x, y) {return x - y;}
function multiply(x, y) {return x * y;}
function divide(x, y) {return x / y;}