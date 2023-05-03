let firstNum;
let secondNum;
let operator;

let equationDisplay = document.querySelector('#equation')
let submit = document.querySelector('#equals')
let clear = document.querySelector('#clear')
let resultDisplay = document.querySelector('#result')
let point = document.querySelector('#point')
let backspace = document.querySelector('#backspace')

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
        console.log(temp)
        if (temp.length > 9) {
            result = result.toFixed(9)
        }
    }
    constructEquation();
    resultDisplay.textContent = result;
    firstNum = result;
    secondNum = null;
    operator = null;
    return result;
}
function add(x, y) {return x + y;}
function subtract(x, y) {return x - y;}
function multiply(x, y) {return x * y;}
function divide(x, y) {return x / y;}

// Function to update display
function constructEquation() {
    if (operator == "÷" && secondNum == "0") {
        resultDisplay.textContent = "No no no you naughty. No dividing by 0!";
        return false;
    }
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

function processDecimal() {
    // If no operator, check firstNum for decimal
    if (!operator) {
        if (!firstNum) {
            firstNum = ".";
            point.removeEventListener('click', processDecimal);
            constructEquation();
        } else {
            firstNum += "."
            point.removeEventListener('click', processDecimal);
            constructEquation();
        }
    } else {
        // If operator, check secondNum for decimal
        if (!secondNum) {
            secondNum = ".";
            point.removeEventListener('click', processDecimal);
            constructEquation();
        } else {
            secondNum += "."
            point.removeEventListener('click', processDecimal);
            constructEquation();
        }
    }
}

function processBackspace() {
    if (!secondNum) {
        if (!operator) {
            if (firstNum.length > 1) {
                firstNum = firstNum.slice(0, firstNum.length-1);
            } else {
                firstNum = null;
            }
        } else {
            operator = null;
        }
    } else {
        secondNum = secondNum.slice(0, secondNum.length-1)
    }
    constructEquation();
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
        point.addEventListener('click', processDecimal)
        constructEquation();
    } else if (operator && !secondNum) {
        operator = input;
        point.addEventListener('click', processDecimal)
        constructEquation();
    } 
}

function processEquals() {
    if (firstNum && operator && secondNum) {operate();}
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

// Decimal
point.addEventListener('click', processDecimal)

// Clear Button
clear.addEventListener('click', function() {
    equationDisplay.textContent = "";
    firstNum = null;
    secondNum = null;
    operator = null;
    constructEquation();
    point.addEventListener('click', processDecimal)
})

// Backspace
backspace.addEventListener('click', processBackspace)

// Equals
submit.addEventListener('click', function() {
    processEquals();
})