document.addEventListener('keydown', (event) => {
    if (event.key >= 0 && event.key <= 9) {
        processDigit(event.key)
    } else if (event.key == "-") {
        processOperator(event.key)
    } else if (event.key == "+") {
        processOperator(event.key)
    } else if (event.key == "*") {
        processOperator(event.key)
    } else if (event.key == "/") {
        processOperator("÷")
    } else if (event.key == "Enter") {
        processEquals();
    } else if (event.key == "Backspace") {
        processBackspace();
    }
})