/* Turmero, Aragua, Venezuela | June 19, 2025, 11:37 PM */
/* Calculator logic with added secondary display */

document.addEventListener('DOMContentLoaded', () => {
    
    const calculatorState = {
        displayValue: '0',
        firstOperand: null,
        operator: null,
        waitingForSecondOperand: false,
    };

    const mainDisplay = document.querySelector('.calculator-display');
    // NEW: Get the secondary display element
    const secondaryDisplay = document.querySelector('.calculator-secondary-display');
    const keys = document.querySelector('.calculator-keys');

    function updateDisplay() {
        mainDisplay.textContent = calculatorState.displayValue;
    }
    
    updateDisplay();

    keys.addEventListener('click', (event) => {
        const { target } = event;
        if (!target.matches('button')) return;

        const keyContent = target.textContent;
        const { action } = target.dataset;

        if (!action) {
            handleNumber(keyContent);
        } else if (action === 'decimal') {
            handleDecimal();
        } else if (action === 'clear') {
            handleClear();
        } else if (['add', 'subtract', 'multiply', 'divide'].includes(action)) {
            handleOperator(action);
        } else if (action === 'calculate') {
            handleEquals();
        }
        
        updateDisplay();
    });

    function handleNumber(number) {
        const { displayValue, waitingForSecondOperand } = calculatorState;
        
        if (waitingForSecondOperand === true) {
            calculatorState.displayValue = number;
            calculatorState.waitingForSecondOperand = false;
        } else {
            calculatorState.displayValue = displayValue === '0' ? number : displayValue + number;
        }
    }
    
    function handleDecimal() {
        if (!calculatorState.displayValue.includes('.')) {
            calculatorState.displayValue += '.';
        }
    }
    
    function handleOperator(nextOperator) {
        const { firstOperand, displayValue, operator } = calculatorState;
        const inputValue = parseFloat(displayValue);

        if (operator && calculatorState.waitingForSecondOperand) {
            calculatorState.operator = nextOperator;
            // NEW: Update the operator symbol in the secondary display
            secondaryDisplay.textContent = `${calculatorState.firstOperand} ${getOperatorSymbol(nextOperator)}`;
            return;
        }

        if (firstOperand === null && !isNaN(inputValue)) {
            calculatorState.firstOperand = inputValue;
        } else if (operator) {
            const result = performCalculation(firstOperand, inputValue, operator);
            calculatorState.displayValue = `${parseFloat(result.toFixed(7))}`;
            calculatorState.firstOperand = result;
        }

        calculatorState.waitingForSecondOperand = true;
        calculatorState.operator = nextOperator;

        // NEW: Update the secondary display with the number and operator
        secondaryDisplay.textContent = `${calculatorState.firstOperand} ${getOperatorSymbol(nextOperator)}`;
    }

    function handleEquals() {
        const { firstOperand, displayValue, operator } = calculatorState;
        
        if (operator && !calculatorState.waitingForSecondOperand) {
            const secondOperand = parseFloat(displayValue);
            const result = performCalculation(firstOperand, secondOperand, operator);
            
            calculatorState.displayValue = `${parseFloat(result.toFixed(7))}`;
            calculatorState.firstOperand = null;
            calculatorState.operator = null;
            calculatorState.waitingForSecondOperand = false;

            // NEW: Clear the secondary display after calculation is complete
            secondaryDisplay.textContent = '';
        }
    }

    function handleClear() {
        calculatorState.displayValue = '0';
        calculatorState.firstOperand = null;
        calculatorState.operator = null;
        calculatorState.waitingForSecondOperand = false;
        // NEW: Clear the secondary display on reset
        secondaryDisplay.textContent = '';
    }

    function performCalculation(first, second, op) {
        if (op === 'add') return first + second;
        if (op === 'subtract') return first - second;
        if (op === 'multiply') return first * second;
        if (op === 'divide') return first / second;
        return second;
    }

    // NEW: Helper function to get the visual symbol for an operator
    function getOperatorSymbol(op) {
        if (op === 'add') return '+';
        if (op === 'subtract') return '-';
        if (op === 'multiply') return '×';
        if (op === 'divide') return '÷';
        return '';
    }
});