const display = document.querySelector("#display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector(".clear");
const enterButton = document.querySelector(".enter");
const powerButton = document.querySelector(".on-off");

let isOn = false;
let firstNumber = "";
let operator = "";
let shouldResetDisplay = false;

function updateDisplay(value) {
    display.value = value;
}

function resetCalculator() {
    firstNumber = "";
    operator = "";
    shouldResetDisplay = false;
    updateDisplay("0");
}

function turnOffCalculator() {
    isOn = false;
    powerButton.classList.remove("on");
    resetCalculator();
}

function turnOnCalculator() {
    isOn = true;
    powerButton.classList.add("on");
    resetCalculator();
}

function calculate(first, second, selectedOperator) {
    switch (selectedOperator) {
        case "+":
            return first + second;
        case "-":
            return first - second;
        case "*":
            return first * second;
        case "/":
            return second === 0 ? "Error" : first / second;
        default:
            return second;
    }
}

function formatResult(result) {
    if (result === "Error") {
        return result;
    }

    return Number.isInteger(result) ? String(result) : String(Number(result.toFixed(10)));
}

function handleNumberClick(event) {
    if (!isOn) {
        return;
    }

    const clickedNumber = event.target.textContent;
    const currentValue = display.value;

    if (clickedNumber === "." && currentValue.includes(".") && !shouldResetDisplay) {
        return;
    }

    if (currentValue === "0" || shouldResetDisplay || currentValue === "Error") {
        updateDisplay(clickedNumber === "." ? "0." : clickedNumber);
        shouldResetDisplay = false;
        return;
    }

    updateDisplay(currentValue + clickedNumber);
}

function handleOperatorClick(event) {
    if (!isOn) {
        return;
    }

    const selectedOperator = event.target.textContent;

    if (operator && !shouldResetDisplay) {
        handleEnterClick();
    }

    firstNumber = display.value;
    operator = selectedOperator;
    shouldResetDisplay = true;
}

function handleEnterClick() {
    if (!isOn || !operator || shouldResetDisplay) {
        return;
    }

    const result = calculate(Number(firstNumber), Number(display.value), operator);
    updateDisplay(formatResult(result));

    firstNumber = "";
    operator = "";
    shouldResetDisplay = true;
}

function handlePowerClick() {
    if (isOn) {
        turnOffCalculator();
    } else {
        turnOnCalculator();
    }
}

numberButtons.forEach((button) => {
    button.addEventListener("click", handleNumberClick);
});

operatorButtons.forEach((button) => {
    button.addEventListener("click", handleOperatorClick);
});

clearButton.addEventListener("click", () => {
    if (isOn) {
        resetCalculator();
    }
});

enterButton.addEventListener("click", handleEnterClick);
powerButton.addEventListener("click", handlePowerClick);
