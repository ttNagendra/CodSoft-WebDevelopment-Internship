document.addEventListener('DOMContentLoaded', function () {
    const display1 = document.getElementById('display1');
    const buttons = Array.from(document.getElementsByClassName('btn'));
    let currentInput = '';
    let firstOperand = null;
    let operator = null;

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = this.getAttribute('data-value');

            if (value === 'C') {
                clearDisplay();
            } else if (value === '=') {
                if (operator && currentInput !== '') {
                    calculateResult();
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput !== '') {
                    setOperator(value);
                }
            } else {
                appendValue(value);
            }
        });
    });

    function clearDisplay() {
        currentInput = '';
        firstOperand = null;
        operator = null;
        display1.textContent = '0';
    }

    function calculateResult() {
        const secondOperand = parseFloat(currentInput);
        let result;
        switch (operator) {
            case '+':
                result = firstOperand + secondOperand;
                break;
            case '-':
                result = firstOperand - secondOperand;
                break;
            case '*':
                result = firstOperand * secondOperand;
                break;
            case '/':
                result = firstOperand / secondOperand;
                break;
        }
        display1.textContent = result;
        currentInput = result.toString();
        firstOperand = result;
        operator = null;
    }

    function setOperator(op) {
        if (firstOperand === null) {
            firstOperand = parseFloat(currentInput);
        } else if (operator) {
            calculateResult();
        }
        operator = op;
        currentInput = '';
    }

    function appendValue(value) {
        if (value === '.' && currentInput.includes('.')) return;
        currentInput += value;
        display1.textContent = currentInput;
    }
});
