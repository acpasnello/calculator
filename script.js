let firstNum;
let secondNum;
let operator;

let equationDisplay = document.querySelector('#equation')
let submit = document.querySelector('#equals')
let clear = document.querySelector('#clear')
let resultDisplay = document.querySelector('#result')

function operate() {
    let result;
    switch (operator) {
        case "+":
            result = add(Number(firstNum), Number(secondNum));
            break;
        case "-":
            result = subtract(firstNum, secondNum);
            break;
        case "*":
            result = multiply(firstNum, secondNum);
            break;
        case "÷":
            result = divide(firstNum, secondNum);
            break;
        default:
            break;
    }
    if (result % 1 != 0) {
        let temp = result - Math.floor(result)
        temp = temp.toString();
        if (temp.length > 9) {
            result = result.toFixed(9)
        }
    }
    constructEquation();
    resultDisplay.textContent = result;
    return result;
}
function add(x, y) {return x + y;}
function subtract(x, y) {return x - y;}
function multiply(x, y) {return x * y;}
function divide(x, y) {return x / y;}

// Function to update display
function constructEquation() {
    resultDisplay.textContent = "";
    let firstDisplay = (firstNum == null) ? "" : firstNum;
    let operatorDisplay = (operator == null) ? "" : operator;
    let secondDisplay = (secondNum == null) ? "" : secondNum;
    equationDisplay.textContent = `${firstDisplay} ${operatorDisplay} ${secondDisplay}`
}

function processDigit(input) {
    if (!firstNum) {
        firstNum = input;
        constructEquation();
    } else if (firstNum && !operator) {
        firstNum += input;
        constructEquation();
    } else if (firstNum && operator) {
        if (!secondNum) {
            secondNum = input;
        } else {
            secondNum += input;
        }
        constructEquation();
    }
}

function processOperator(input) {
    if (secondNum) {
        let temp = input;
        let result = operate();
        // Send result and new operator to display function
        firstNum = result;
        secondNum = null;
        operator = temp;
        constructEquation();
    } else if (!firstNum && !secondNum) {
        return false;
    } else if (!operator) {
        operator = input;
        constructEquation();
    } else if (operator && !secondNum) {
        operator = input;
        constructEquation();
    } 
}
// Operands
let operands = document.querySelectorAll('.operand')
operands.forEach(function(btn) {
    btn.addEventListener('click', function(event) {
        processDigit(event.currentTarget.textContent);
    })
})

// Operators
let operators = document.querySelectorAll('.operator')
operators.forEach(function(btn) {
    btn.addEventListener('click', function(event) {
        processOperator(event.currentTarget.textContent)
    })
})

// Clear Button
clear.addEventListener('click', function() {
    equationDisplay.textContent = "";
    firstNum = null;
    secondNum = null;
    operator = null;
    constructEquation();
})

// Equals
submit.addEventListener('click', function() {
    if (firstNum && operator && secondNum) {operate();}
})