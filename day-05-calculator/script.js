console.log('script loaded');

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '0';
let operator = null;
let firstOperand = null;
let waitingForSecondOperand = false;

function updateDisplay() {
    let displayText = '';
    if (operator && firstOperand !== null) {
        let opSymbol = operator;
        if (operator === '*') opSymbol = '×';
        if (operator === '/') opSymbol = '÷';
        displayText = firstOperand + ' ' + opSymbol + ' ' + (waitingForSecondOperand ? '' : currentInput);
    } else {
        displayText = currentInput;
    }
    display.textContent = displayText;
}

function handleInput(type, value) {
    if (type === 'number' || type === 'dot') {
        if (waitingForSecondOperand) {
            currentInput = value === '.' ? '0.' : value;
            waitingForSecondOperand = false;
        } else {
            if (currentInput === '0' && value !== '.') {
                currentInput = value;
            } else if (value === '.' && currentInput.includes('.')) {
                // Do nothing if already has decimal
            } else {
                currentInput += value;
            }
        }
        updateDisplay();
    } else if (type === 'operator') {
        if (!waitingForSecondOperand) {
            firstOperand = parseFloat(currentInput);
            operator = value;
            waitingForSecondOperand = true;
            updateDisplay();
        }
    } else if (type === 'equal') {
        if (operator && firstOperand !== null && !waitingForSecondOperand) {
            const secondOperand = parseFloat(currentInput);
            let result = 0;
            switch(operator) {
                case '+': result = firstOperand + secondOperand; break;
                case '-': result = firstOperand - secondOperand; break;
                case '*': result = firstOperand * secondOperand; break;
                case '/': result = secondOperand !== 0 ? firstOperand / secondOperand : '오류'; break;
            }
            currentInput = result.toString();
            operator = null;
            firstOperand = null;
            waitingForSecondOperand = false;
            updateDisplay();
        }
    } else if (type === 'backspace') {
        let displayText = display.textContent;
        displayText = displayText.slice(0, -1);
        displayText = displayText.replace(/\s+/g, ' ').trim();
        if (displayText === '') {
            currentInput = '0';
            operator = null;
            firstOperand = null;
            waitingForSecondOperand = false;
        } else {
            let match = displayText.match(/^(-?\d+(?:\.\d+)?)(?:\s*([+−×÷])\s*(-?\d+(?:\.\d+)?))?$/);
            if (match) {
                if (match[2]) {
                    firstOperand = parseFloat(match[1]);
                    let op = match[2];
                    if (op === '×') op = '*';
                    if (op === '÷') op = '/';
                    if (op === '−') op = '-';
                    operator = op;
                    currentInput = match[3] !== undefined ? match[3] : '';
                    waitingForSecondOperand = (currentInput === '');
                } else {
                    firstOperand = null;
                    operator = null;
                    currentInput = match[1];
                    waitingForSecondOperand = false;
                }
            } else {
                currentInput = displayText;
                operator = null;
                firstOperand = null;
                waitingForSecondOperand = false;
            }
        }
        updateDisplay();
    } else if (type === 'clear') {
        currentInput = '0';
        operator = null;
        firstOperand = null;
        waitingForSecondOperand = false;
        updateDisplay();
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        if (button.id === 'backspace') {
            handleInput('backspace');
        } else if (button.id === 'clear') {
            handleInput('clear');
        } else if (button.id === 'equals') {
            handleInput('equal');
        } else if (button.classList.contains('operator')) {
            handleInput('operator', value);
        } else if (value === '.') {
            handleInput('dot', value);
        } else {
            handleInput('number', value);
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.repeat) return;
    let key = e.key;
    if (/^[0-9]$/.test(key)) {
        handleInput('number', key);
    } else if (key === '.') {
        handleInput('dot', key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        handleInput('operator', key);
    } else if (key === 'Enter' || key === '=') {
        handleInput('equal');
    } else if (key === 'Backspace') {
        handleInput('backspace');
    } else if (key === 'c' || key === 'C' || key === 'Escape') {
        handleInput('clear');
    }
});

updateDisplay();

console.log('script loaded');

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '0';
let operator = null;
let firstOperand = null;
let waitingForSecondOperand = false;

function updateDisplay() {
    let displayText = '';
    if (operator && firstOperand !== null) {
        let opSymbol = operator;
        if (operator === '*') opSymbol = '×';
        if (operator === '/') opSymbol = '÷';
        displayText = firstOperand + ' ' + opSymbol + ' ' + (waitingForSecondOperand ? '' : currentInput);
    } else {
        displayText = currentInput;
    }
    display.textContent = displayText;
}

function handleInput(type, value) {
    if (type === 'number' || type === 'dot') {
        if (waitingForSecondOperand) {
            currentInput = value === '.' ? '0.' : value;
            waitingForSecondOperand = false;
        } else {
            if (currentInput === '0' && value !== '.') {
                currentInput = value;
            } else if (value === '.' && currentInput.includes('.')) {
                // Do nothing if already has decimal
            } else {
                currentInput += value;
            }
        }
        updateDisplay();
    } else if (type === 'operator') {
        if (!waitingForSecondOperand) {
            firstOperand = parseFloat(currentInput);
            operator = value;
            waitingForSecondOperand = true;
            updateDisplay();
        }
    } else if (type === 'equal') {
        if (operator && firstOperand !== null && !waitingForSecondOperand) {
            const secondOperand = parseFloat(currentInput);
            let result = 0;
            switch(operator) {
                case '+': result = firstOperand + secondOperand; break;
                case '-': result = firstOperand - secondOperand; break;
                case '*': result = firstOperand * secondOperand; break;
                case '/': result = secondOperand !== 0 ? firstOperand / secondOperand : '오류'; break;
            }
            currentInput = result.toString();
            operator = null;
            firstOperand = null;
            waitingForSecondOperand = false;
            updateDisplay();
        }
    } else if (type === 'backspace') {
        let displayText = display.textContent;
        displayText = displayText.slice(0, -1);
        displayText = displayText.replace(/\s+/g, ' ').trim();
        if (displayText === '') {
            currentInput = '0';
            operator = null;
            firstOperand = null;
            waitingForSecondOperand = false;
        } else {
            let match = displayText.match(/^(-?\d+(?:\.\d+)?)(?:\s*([+−×÷])\s*(-?\d+(?:\.\d+)?))?$/);
            if (match) {
                if (match[2]) {
                    firstOperand = parseFloat(match[1]);
                    let op = match[2];
                    if (op === '×') op = '*';
                    if (op === '÷') op = '/';
                    if (op === '−') op = '-';
                    operator = op;
                    currentInput = match[3] !== undefined ? match[3] : '';
                    waitingForSecondOperand = (currentInput === '');
                } else {
                    firstOperand = null;
                    operator = null;
                    currentInput = match[1];
                    waitingForSecondOperand = false;
                }
            } else {
                currentInput = displayText;
                operator = null;
                firstOperand = null;
                waitingForSecondOperand = false;
            }
        }
        updateDisplay();
    } else if (type === 'clear') {
        currentInput = '0';
        operator = null;
        firstOperand = null;
        waitingForSecondOperand = false;
        updateDisplay();
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        if (button.id === 'backspace') {
            handleInput('backspace');
        } else if (button.id === 'clear') {
            handleInput('clear');
        } else if (button.id === 'equals') {
            handleInput('equal');
        } else if (button.classList.contains('operator')) {
            handleInput('operator', value);
        } else if (value === '.') {
            handleInput('dot', value);
        } else {
            handleInput('number', value);
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.repeat) return;
    let key = e.key;
    if (/^[0-9]$/.test(key)) {
        handleInput('number', key);
    } else if (key === '.') {
        handleInput('dot', key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        handleInput('operator', key);
    } else if (key === 'Enter' || key === '=') {
        handleInput('equal');
    } else if (key === 'Backspace') {
        handleInput('backspace');
    } else if (key === 'c' || key === 'C' || key === 'Escape') {
        handleInput('clear');
    }
});

updateDisplay();

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '0';
let operator = null;
let firstOperand = null;
let waitingForSecondOperand = false;

function updateDisplay() {
    let displayText = '';
    if (operator && firstOperand !== null) {
        let opSymbol = operator;
        if (operator === '*') opSymbol = '×';
        if (operator === '/') opSymbol = '÷';
        displayText = firstOperand + ' ' + opSymbol + ' ' + (waitingForSecondOperand ? '' : currentInput);
    } else {
        displayText = currentInput;
    }
    display.textContent = displayText;
}

function handleInput(type, value) {
    if (type === 'number' || type === 'dot') {
        if (waitingForSecondOperand) {
            currentInput = value === '.' ? '0.' : value;
            waitingForSecondOperand = false;
        } else {
            if (currentInput === '0' && value !== '.') {
                currentInput = value;
            } else if (value === '.' && currentInput.includes('.')) {
                // Do nothing if already has decimal
            } else {
                currentInput += value;
            }
        }
        updateDisplay();
    } else if (type === 'operator') {
        if (!waitingForSecondOperand) {
            firstOperand = parseFloat(currentInput);
            operator = value;
            waitingForSecondOperand = true;
            updateDisplay();
        }
    } else if (type === 'equal') {
        if (operator && firstOperand !== null && !waitingForSecondOperand) {
            const secondOperand = parseFloat(currentInput);
            let result = 0;
            switch(operator) {
                case '+': result = firstOperand + secondOperand; break;
                case '-': result = firstOperand - secondOperand; break;
                case '*': result = firstOperand * secondOperand; break;
                case '/': result = secondOperand !== 0 ? firstOperand / secondOperand : '오류'; break;
            }
            currentInput = result.toString();
            operator = null;
            firstOperand = null;
            waitingForSecondOperand = false;
            updateDisplay();
        }
    } else if (type === 'backspace') {
        let displayText = display.textContent;
        displayText = displayText.slice(0, -1);
        displayText = displayText.replace(/\s+/g, ' ').trim();
        if (displayText === '') {
            currentInput = '0';
            operator = null;
            firstOperand = null;
            waitingForSecondOperand = false;
        } else {
            let match = displayText.match(/^(-?\d+(?:\.\d+)?)(?:\s*([+−×÷])\s*(-?\d+(?:\.\d+)?))?$/);
            if (match) {
                if (match[2]) {
                    firstOperand = parseFloat(match[1]);
                    let op = match[2];
                    if (op === '×') op = '*';
                    if (op === '÷') op = '/';
                    if (op === '−') op = '-';
                    operator = op;
                    currentInput = match[3] !== undefined ? match[3] : '';
                    waitingForSecondOperand = (currentInput === '');
                } else {
                    firstOperand = null;
                    operator = null;
                    currentInput = match[1];
                    waitingForSecondOperand = false;
                }
            } else {
                currentInput = displayText;
                operator = null;
                firstOperand = null;
                waitingForSecondOperand = false;
            }
        }
        updateDisplay();
    } else if (type === 'clear') {
        currentInput = '0';
        operator = null;
        firstOperand = null;
        waitingForSecondOperand = false;
        updateDisplay();
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        if (button.id === 'backspace') {
            handleInput('backspace');
        } else if (button.id === 'clear') {
            handleInput('clear');
        } else if (button.id === 'equals') {
            handleInput('equal');
        } else if (button.classList.contains('operator')) {
            handleInput('operator', value);
        } else if (value === '.') {
            handleInput('dot', value);
        } else {
            handleInput('number', value);
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.repeat) return;
    let key = e.key;
    if (/^[0-9]$/.test(key)) {
        handleInput('number', key);
    } else if (key === '.') {
        handleInput('dot', key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        handleInput('operator', key);
    } else if (key === 'Enter' || key === '=') {
        handleInput('equal');
    } else if (key === 'Backspace') {
        handleInput('backspace');
    } else if (key === 'c' || key === 'C' || key === 'Escape') {
        handleInput('clear');
    }
});

updateDisplay();
const buttons = document.querySelectorAll('.btn');
let currentInput = '0';
let operator = null;
let firstOperand = null;
let waitingForSecondOperand = false;

function updateDisplay() {
    let displayText = '';
    if (operator && firstOperand !== null) {
        let opSymbol = operator;
        if (operator === '*') opSymbol = '×';
        if (operator === '/') opSymbol = '÷';
        displayText = firstOperand + ' ' + opSymbol + ' ' + (waitingForSecondOperand ? '' : currentInput);
    } else {
        displayText = currentInput;
    }
    display.textContent = displayText;
}

function handleInput(type, value) {
    if (type === 'number' || type === 'dot') {
        if (waitingForSecondOperand) {
            currentInput = value === '.' ? '0.' : value;
            waitingForSecondOperand = false;
        } else {
            if (currentInput === '0' && value !== '.') {
                currentInput = value;
            } else if (value === '.' && currentInput.includes('.')) {
                // Do nothing if already has decimal
            } else {
                currentInput += value;
            }
        }
        updateDisplay();
    } else if (type === 'operator') {
        if (!waitingForSecondOperand) {
            firstOperand = parseFloat(currentInput);
            operator = value;
            waitingForSecondOperand = true;
            updateDisplay();
        }
    } else if (type === 'equal') {
        if (operator && firstOperand !== null && !waitingForSecondOperand) {
            const secondOperand = parseFloat(currentInput);
            let result = 0;
            switch(operator) {
                case '+': result = firstOperand + secondOperand; break;
                case '-': result = firstOperand - secondOperand; break;
                case '*': result = firstOperand * secondOperand; break;
                case '/': result = secondOperand !== 0 ? firstOperand / secondOperand : '오류'; break;
            }
            currentInput = result.toString();
            operator = null;
            firstOperand = null;
            waitingForSecondOperand = false;
            updateDisplay();
        }
    } else if (type === 'backspace') {
        let displayText = display.textContent;
        displayText = displayText.slice(0, -1);
        displayText = displayText.replace(/\s+/g, ' ').trim();
        if (displayText === '') {
            currentInput = '0';
            operator = null;
            firstOperand = null;
            waitingForSecondOperand = false;
        } else {
            let match = displayText.match(/^(-?\d+(?:\.\d+)?)(?:\s*([+−×÷])\s*(-?\d+(?:\.\d+)?))?$/);
            if (match) {
                if (match[2]) {
                    firstOperand = parseFloat(match[1]);
                    let op = match[2];
                    if (op === '×') op = '*';
                    if (op === '÷') op = '/';
                    if (op === '−') op = '-';
                    operator = op;
                    currentInput = match[3] !== undefined ? match[3] : '';
                    waitingForSecondOperand = (currentInput === '');
                } else {
                    firstOperand = null;
                    operator = null;
                    currentInput = match[1];
                    waitingForSecondOperand = false;
                }
            } else {
                currentInput = displayText;
                operator = null;
                firstOperand = null;
                waitingForSecondOperand = false;
            }
        }
        updateDisplay();
    } else if (type === 'clear') {
        currentInput = '0';
        operator = null;
        firstOperand = null;
        waitingForSecondOperand = false;
        updateDisplay();
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        if (button.id === 'backspace') {
            handleInput('backspace');
        } else if (button.id === 'clear') {
            handleInput('clear');
        } else if (button.id === 'equals') {
            handleInput('equal');
        } else if (button.classList.contains('operator')) {
            handleInput('operator', value);
        } else if (value === '.') {
            handleInput('dot', value);
        } else {
            handleInput('number', value);
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.repeat) return;
    let key = e.key;
    if (/^[0-9]$/.test(key)) {
        handleInput('number', key);
    } else if (key === '.') {
        handleInput('dot', key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        handleInput('operator', key);
    } else if (key === 'Enter' || key === '=') {
        handleInput('equal');
    } else if (key === 'Backspace') {
        handleInput('backspace');
    } else if (key === 'c' || key === 'C' || key === 'Escape') {
        handleInput('clear');
    }
});

updateDisplay();

console.log('script loaded');

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '0';
let operator = null;
let firstOperand = null;
let waitingForSecondOperand = false;

function updateDisplay() {
    let displayText = '';
    if (operator && firstOperand !== null) {
        let opSymbol = operator;
        if (operator === '*') opSymbol = '×';
        if (operator === '/') opSymbol = '÷';
        displayText = firstOperand + ' ' + opSymbol + ' ' + (waitingForSecondOperand ? '' : currentInput);
    } else {
        displayText = currentInput;
    }
    display.textContent = displayText;
}

function handleInput(type, value) {
    if (type === 'number' || type === 'dot') {
        if (waitingForSecondOperand) {
            currentInput = value === '.' ? '0.' : value;
            waitingForSecondOperand = false;
        } else {
            if (currentInput === '0' && value !== '.') {
                currentInput = value;
            } else if (value === '.' && currentInput.includes('.')) {
                // Do nothing if already has decimal
            } else {
                currentInput += value;
            }
        }
        updateDisplay();
    } else if (type === 'operator') {
        if (!waitingForSecondOperand) {
            firstOperand = parseFloat(currentInput);
            operator = value;
            waitingForSecondOperand = true;
            updateDisplay();
        }
    } else if (type === 'equal') {
        if (operator && firstOperand !== null && !waitingForSecondOperand) {
            const secondOperand = parseFloat(currentInput);
            let result = 0;
            switch(operator) {
                case '+': result = firstOperand + secondOperand; break;
                case '-': result = firstOperand - secondOperand; break;
                case '*': result = firstOperand * secondOperand; break;
                case '/': result = secondOperand !== 0 ? firstOperand / secondOperand : '오류'; break;
            }
            currentInput = result.toString();
            operator = null;
            firstOperand = null;
            waitingForSecondOperand = false;
            updateDisplay();
        }
    } else if (type === 'backspace') {
        let displayText = display.textContent;
        displayText = displayText.slice(0, -1);
        displayText = displayText.replace(/\s+/g, ' ').trim();
        if (displayText === '') {
            currentInput = '0';
            operator = null;
            firstOperand = null;
            waitingForSecondOperand = false;
        } else {
            let match = displayText.match(/^(-?\d+(?:\.\d+)?)(?:\s*([+−×÷])\s*(-?\d+(?:\.\d+)?))?$/);
            if (match) {
                if (match[2]) {
                    firstOperand = parseFloat(match[1]);
                    let op = match[2];
                    if (op === '×') op = '*';
                    if (op === '÷') op = '/';
                    if (op === '−') op = '-';
                    operator = op;
                    currentInput = match[3] !== undefined ? match[3] : '';
                    waitingForSecondOperand = (currentInput === '');
                } else {
                    firstOperand = null;
                    operator = null;
                    currentInput = match[1];
                    waitingForSecondOperand = false;
                }
            } else {
                currentInput = displayText;
                operator = null;
                firstOperand = null;
                waitingForSecondOperand = false;
            }
        }
        updateDisplay();
    } else if (type === 'clear') {
        currentInput = '0';
        operator = null;
        firstOperand = null;
        waitingForSecondOperand = false;
        updateDisplay();
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        if (button.id === 'backspace') {
            handleInput('backspace');
        } else if (button.id === 'clear') {
            handleInput('clear');
        } else if (button.id === 'equals') {
            handleInput('equal');
        } else if (button.classList.contains('operator')) {
            handleInput('operator', value);
        } else if (value === '.') {
            handleInput('dot', value);
        } else {
            handleInput('number', value);
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.repeat) return;
    let key = e.key;
    if (/^[0-9]$/.test(key)) {
        handleInput('number', key);
    } else if (key === '.') {
        handleInput('dot', key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        handleInput('operator', key);
    } else if (key === 'Enter' || key === '=') {
        handleInput('equal');
    } else if (key === 'Backspace') {
        handleInput('backspace');
    } else if (key === 'c' || key === 'C' || key === 'Escape') {
        handleInput('clear');
    }
});

updateDisplay();

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '0';
let operator = null;
let firstOperand = null;
let waitingForSecondOperand = false;

function updateDisplay() {
    let displayText = '';
    if (operator && firstOperand !== null) {
        let opSymbol = operator;
        if (operator === '*') opSymbol = '×';
        if (operator === '/') opSymbol = '÷';
        displayText = firstOperand + ' ' + opSymbol + ' ' + (waitingForSecondOperand ? '' : currentInput);
    } else {
        displayText = currentInput;
    }
    display.textContent = displayText;
}

function handleInput(type, value) {
    if (type === 'number' || type === 'dot') {
        if (waitingForSecondOperand) {
            currentInput = value === '.' ? '0.' : value;
            waitingForSecondOperand = false;
        } else {
            if (currentInput === '0' && value !== '.') {
                currentInput = value;
            } else if (value === '.' && currentInput.includes('.')) {
                // Do nothing if already has decimal
            } else {
                currentInput += value;
            }
        }
        updateDisplay();
    } else if (type === 'operator') {
        if (!waitingForSecondOperand) {
            firstOperand = parseFloat(currentInput);
            operator = value;
            waitingForSecondOperand = true;
            updateDisplay();
        }
    } else if (type === 'equal') {
        if (operator && firstOperand !== null && !waitingForSecondOperand) {
            const secondOperand = parseFloat(currentInput);
            let result = 0;
            switch(operator) {
                case '+': result = firstOperand + secondOperand; break;
                case '-': result = firstOperand - secondOperand; break;
                case '*': result = firstOperand * secondOperand; break;
                case '/': result = secondOperand !== 0 ? firstOperand / secondOperand : '오류'; break;
            }
            currentInput = result.toString();
            operator = null;
            firstOperand = null;
            waitingForSecondOperand = false;
            updateDisplay();
        }
    } else if (type === 'backspace') {
        let displayText = display.textContent;
        displayText = displayText.slice(0, -1);
        displayText = displayText.replace(/\s+/g, ' ').trim();
        if (displayText === '') {
            currentInput = '0';
            operator = null;
            firstOperand = null;
            waitingForSecondOperand = false;
        } else {
            let match = displayText.match(/^(-?\d+(?:\.\d+)?)(?:\s*([+−×÷])\s*(-?\d+(?:\.\d+)?))?$/);
            if (match) {
                if (match[2]) {
                    firstOperand = parseFloat(match[1]);
                    let op = match[2];
                    if (op === '×') op = '*';
                    if (op === '÷') op = '/';
                    if (op === '−') op = '-';
                    operator = op;
                    currentInput = match[3] !== undefined ? match[3] : '';
                    waitingForSecondOperand = (currentInput === '');
                } else {
                    firstOperand = null;
                    operator = null;
                    currentInput = match[1];
                    waitingForSecondOperand = false;
                }
            } else {
                currentInput = displayText;
                operator = null;
                firstOperand = null;
                waitingForSecondOperand = false;
            }
        }
        updateDisplay();
    } else if (type === 'clear') {
        currentInput = '0';
        operator = null;
        firstOperand = null;
        waitingForSecondOperand = false;
        updateDisplay();
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        if (button.id === 'backspace') {
            handleInput('backspace');
        } else if (button.id === 'clear') {
            handleInput('clear');
        } else if (button.id === 'equals') {
            handleInput('equal');
        } else if (button.classList.contains('operator')) {
            handleInput('operator', value);
        } else if (value === '.') {
            handleInput('dot', value);
        } else {
            handleInput('number', value);
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.repeat) return;
    let key = e.key;
    if (/^[0-9]$/.test(key)) {
        handleInput('number', key);
    } else if (key === '.') {
        handleInput('dot', key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        handleInput('operator', key);
    } else if (key === 'Enter' || key === '=') {
        handleInput('equal');
    } else if (key === 'Backspace') {
        handleInput('backspace');
    } else if (key === 'c' || key === 'C' || key === 'Escape') {
        handleInput('clear');
    }
});

updateDisplay();
const buttons = document.querySelectorAll('.btn');
let currentInput = '0';
let operator = null;
let firstOperand = null;
let waitingForSecondOperand = false;

function updateDisplay() {
    let displayText = '';
    if (operator && firstOperand !== null) {
        let opSymbol = operator;
        if (operator === '*') opSymbol = '×';
        if (operator === '/') opSymbol = '÷';
        displayText = firstOperand + ' ' + opSymbol + ' ' + (waitingForSecondOperand ? '' : currentInput);
    } else {
        displayText = currentInput;
    }
    display.textContent = displayText;
}

function handleInput(type, value) {
    if (type === 'number' || type === 'dot') {
        if (waitingForSecondOperand) {
            currentInput = value === '.' ? '0.' : value;
            waitingForSecondOperand = false;
        } else {
            if (currentInput === '0' && value !== '.') {
                currentInput = value;
            } else if (value === '.' && currentInput.includes('.')) {
                // Do nothing if already has decimal
            } else {
                currentInput += value;
            }
        }
        updateDisplay();
    } else if (type === 'operator') {
        if (!waitingForSecondOperand) {
            firstOperand = parseFloat(currentInput);
            operator = value;
            waitingForSecondOperand = true;
            updateDisplay();
        }
    } else if (type === 'equal') {
        if (operator && firstOperand !== null && !waitingForSecondOperand) {
            const secondOperand = parseFloat(currentInput);
            let result = 0;
            switch(operator) {
                case '+': result = firstOperand + secondOperand; break;
                case '-': result = firstOperand - secondOperand; break;
                case '*': result = firstOperand * secondOperand; break;
                case '/': result = secondOperand !== 0 ? firstOperand / secondOperand : '오류'; break;
            }
            currentInput = result.toString();
            operator = null;
            firstOperand = null;
            waitingForSecondOperand = false;
            updateDisplay();
        }
    } else if (type === 'backspace') {
        let displayText = display.textContent;
        displayText = displayText.slice(0, -1);
        displayText = displayText.replace(/\s+/g, ' ').trim();
        if (displayText === '') {
            currentInput = '0';
            operator = null;
            firstOperand = null;
            waitingForSecondOperand = false;
        } else {
            let match = displayText.match(/^(-?\d+(?:\.\d+)?)(?:\s*([+−×÷])\s*(-?\d+(?:\.\d+)?))?$/);
            if (match) {
                if (match[2]) {
                    firstOperand = parseFloat(match[1]);
                    let op = match[2];
                    if (op === '×') op = '*';
                    if (op === '÷') op = '/';
                    if (op === '−') op = '-';
                    operator = op;
                    currentInput = match[3] !== undefined ? match[3] : '';
                    waitingForSecondOperand = (currentInput === '');
                } else {
                    firstOperand = null;
                    operator = null;
                    currentInput = match[1];
                    waitingForSecondOperand = false;
                }
            } else {
                currentInput = displayText;
                operator = null;
                firstOperand = null;
                waitingForSecondOperand = false;
            }
        }
        updateDisplay();
    } else if (type === 'clear') {
        currentInput = '0';
        operator = null;
        firstOperand = null;
        waitingForSecondOperand = false;
        updateDisplay();
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        if (button.id === 'backspace') {
            handleInput('backspace');
        } else if (button.id === 'clear') {
            handleInput('clear');
        } else if (button.id === 'equals') {
            handleInput('equal');
        } else if (button.classList.contains('operator')) {
            handleInput('operator', value);
        } else if (value === '.') {
            handleInput('dot', value);
        } else {
            handleInput('number', value);
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.repeat) return;
    let key = e.key;
    if (/^[0-9]$/.test(key)) {
        handleInput('number', key);
    } else if (key === '.') {
        handleInput('dot', key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        handleInput('operator', key);
    } else if (key === 'Enter' || key === '=') {
        handleInput('equal');
    } else if (key === 'Backspace') {
        handleInput('backspace');
    } else if (key === 'c' || key === 'C' || key === 'Escape') {
        handleInput('clear');
    }
});

console.log('script loaded');

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '0';
let operator = null;
let firstOperand = null;
let waitingForSecondOperand = false;

function updateDisplay() {
    let displayText = '';
    if (operator && firstOperand !== null) {
        let opSymbol = operator;
        if (operator === '*') opSymbol = '×';
        if (operator === '/') opSymbol = '÷';
        displayText = firstOperand + ' ' + opSymbol + ' ' + (waitingForSecondOperand ? '' : currentInput);
    } else {
        displayText = currentInput;
    }
    display.textContent = displayText;
}

function handleInput(type, value) {
    if (type === 'number' || type === 'dot') {
        if (waitingForSecondOperand) {
            currentInput = value === '.' ? '0.' : value;
            waitingForSecondOperand = false;
        } else {
            if (currentInput === '0' && value !== '.') {
                currentInput = value;
            } else if (value === '.' && currentInput.includes('.')) {
                // Do nothing if already has decimal
            } else {
                currentInput += value;
            }
        }
        updateDisplay();
    } else if (type === 'operator') {
        if (!waitingForSecondOperand) {
            firstOperand = parseFloat(currentInput);
            operator = value;
            waitingForSecondOperand = true;
            updateDisplay();
        }
    } else if (type === 'equal') {
        if (operator && firstOperand !== null && !waitingForSecondOperand) {
            const secondOperand = parseFloat(currentInput);
            let result = 0;
            switch(operator) {
                case '+': result = firstOperand + secondOperand; break;
                case '-': result = firstOperand - secondOperand; break;
                case '*': result = firstOperand * secondOperand; break;
                case '/': result = secondOperand !== 0 ? firstOperand / secondOperand : '오류'; break;
            }
            currentInput = result.toString();
            operator = null;
            firstOperand = null;
            waitingForSecondOperand = false;
            updateDisplay();
        }
    } else if (type === 'backspace') {
        let displayText = display.textContent;
        displayText = displayText.slice(0, -1);
        displayText = displayText.replace(/\s+/g, ' ').trim();
        if (displayText === '') {
            currentInput = '0';
            operator = null;
            firstOperand = null;
            waitingForSecondOperand = false;
        } else {
            let match = displayText.match(/^(-?\d+(?:\.\d+)?)(?:\s*([+−×÷])\s*(-?\d+(?:\.\d+)?))?$/);
            if (match) {
                if (match[2]) {
                    firstOperand = parseFloat(match[1]);
                    let op = match[2];
                    if (op === '×') op = '*';
                    if (op === '÷') op = '/';
                    if (op === '−') op = '-';
                    operator = op;
                    currentInput = match[3] !== undefined ? match[3] : '';
                    waitingForSecondOperand = (currentInput === '');
                } else {
                    firstOperand = null;
                    operator = null;
                    currentInput = match[1];
                    waitingForSecondOperand = false;
                }
            } else {
                currentInput = displayText;
                operator = null;
                firstOperand = null;
                waitingForSecondOperand = false;
            }
        }
        updateDisplay();
    } else if (type === 'clear') {
        currentInput = '0';
        operator = null;
        firstOperand = null;
        waitingForSecondOperand = false;
        updateDisplay();
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        if (button.id === 'backspace') {
            handleInput('backspace');
        } else if (button.id === 'clear') {
            handleInput('clear');
        } else if (button.id === 'equals') {
            handleInput('equal');
        } else if (button.classList.contains('operator')) {
            handleInput('operator', value);
        } else if (value === '.') {
            handleInput('dot', value);
        } else {
            handleInput('number', value);
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.repeat) return;
    let key = e.key;
    if (/^[0-9]$/.test(key)) {
        handleInput('number', key);
    } else if (key === '.') {
        handleInput('dot', key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        handleInput('operator', key);
    } else if (key === 'Enter' || key === '=') {
        handleInput('equal');
    } else if (key === 'Backspace') {
        handleInput('backspace');
    } else if (key === 'c' || key === 'C' || key === 'Escape') {
        handleInput('clear');
    }
});

updateDisplay();

console.log('script loaded');

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '0';
let operator = null;
let firstOperand = null;
let waitingForSecondOperand = false;

function updateDisplay() {
    let displayText = '';
    if (operator && firstOperand !== null) {
        let opSymbol = operator;
        if (operator === '*') opSymbol = '×';
        if (operator === '/') opSymbol = '÷';
        displayText = firstOperand + ' ' + opSymbol + ' ' + (waitingForSecondOperand ? '' : currentInput);
    } else {
        displayText = currentInput;
    }
    display.textContent = displayText;
}

function handleInput(type, value) {
    if (type === 'number' || type === 'dot') {
        if (waitingForSecondOperand) {
            currentInput = value === '.' ? '0.' : value;
            waitingForSecondOperand = false;
        } else {
            if (currentInput === '0' && value !== '.') {
                currentInput = value;
            } else if (value === '.' && currentInput.includes('.')) {
                // Do nothing if already has decimal
            } else {
                currentInput += value;
            }
        }
        updateDisplay();
    } else if (type === 'operator') {
        if (!waitingForSecondOperand) {
            firstOperand = parseFloat(currentInput);
            operator = value;
            waitingForSecondOperand = true;
            updateDisplay();
        }
    } else if (type === 'equal') {
        if (operator && firstOperand !== null && !waitingForSecondOperand) {
            const secondOperand = parseFloat(currentInput);
            let result = 0;
            switch(operator) {
                case '+': result = firstOperand + secondOperand; break;
                case '-': result = firstOperand - secondOperand; break;
                case '*': result = firstOperand * secondOperand; break;
                case '/': result = secondOperand !== 0 ? firstOperand / secondOperand : '오류'; break;
            }
            currentInput = result.toString();
            operator = null;
            firstOperand = null;
            waitingForSecondOperand = false;
            updateDisplay();
        }
    } else if (type === 'backspace') {
        let displayText = display.textContent;
        displayText = displayText.slice(0, -1);
        displayText = displayText.replace(/\s+/g, ' ').trim();
        if (displayText === '') {
            currentInput = '0';
            operator = null;
            firstOperand = null;
            waitingForSecondOperand = false;
        } else {
            let match = displayText.match(/^(-?\d+(?:\.\d+)?)(?:\s*([+−×÷])\s*(-?\d+(?:\.\d+)?))?$/);
            if (match) {
                if (match[2]) {
                    firstOperand = parseFloat(match[1]);
                    let op = match[2];
                    if (op === '×') op = '*';
                    if (op === '÷') op = '/';
                    if (op === '−') op = '-';
                    operator = op;
                    currentInput = match[3] !== undefined ? match[3] : '';
                    waitingForSecondOperand = (currentInput === '');
                } else {
                    firstOperand = null;
                    operator = null;
                    currentInput = match[1];
                    waitingForSecondOperand = false;
                }
            } else {
                currentInput = displayText;
                operator = null;
                firstOperand = null;
                waitingForSecondOperand = false;
            }
        }
        updateDisplay();
    } else if (type === 'clear') {
        currentInput = '0';
        operator = null;
        firstOperand = null;
        waitingForSecondOperand = false;
        updateDisplay();
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        if (button.id === 'backspace') {
            handleInput('backspace');
        } else if (button.id === 'clear') {
            handleInput('clear');
        } else if (button.id === 'equals') {
            handleInput('equal');
        } else if (button.classList.contains('operator')) {
            handleInput('operator', value);
        } else if (value === '.') {
            handleInput('dot', value);
        } else {
            handleInput('number', value);
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.repeat) return;
    let key = e.key;
    if (/^[0-9]$/.test(key)) {
        handleInput('number', key);
    } else if (key === '.') {
        handleInput('dot', key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        handleInput('operator', key);
    } else if (key === 'Enter' || key === '=') {
        handleInput('equal');
    } else if (key === 'Backspace') {
        handleInput('backspace');
    } else if (key === 'c' || key === 'C' || key === 'Escape') {
        handleInput('clear');
    }
});

updateDisplay();

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '0';
let operator = null;
let firstOperand = null;
let waitingForSecondOperand = false;

function updateDisplay() {
    let displayText = '';
    if (operator && firstOperand !== null) {
        let opSymbol = operator;
        if (operator === '*') opSymbol = '×';
        if (operator === '/') opSymbol = '÷';
        displayText = firstOperand + ' ' + opSymbol + ' ' + (waitingForSecondOperand ? '' : currentInput);
    } else {
        displayText = currentInput;
    }
    display.textContent = displayText;
}

function handleInput(type, value) {
    if (type === 'number' || type === 'dot') {
        if (waitingForSecondOperand) {
            currentInput = value === '.' ? '0.' : value;
            waitingForSecondOperand = false;
        } else {
            if (currentInput === '0' && value !== '.') {
                currentInput = value;
            } else if (value === '.' && currentInput.includes('.')) {
                // Do nothing if already has decimal
            } else {
                currentInput += value;
            }
        }
        updateDisplay();
    } else if (type === 'operator') {
        if (!waitingForSecondOperand) {
            firstOperand = parseFloat(currentInput);
            operator = value;
            waitingForSecondOperand = true;
            updateDisplay();
        }
    } else if (type === 'equal') {
        if (operator && firstOperand !== null && !waitingForSecondOperand) {
            const secondOperand = parseFloat(currentInput);
            let result = 0;
            switch(operator) {
                case '+': result = firstOperand + secondOperand; break;
                case '-': result = firstOperand - secondOperand; break;
                case '*': result = firstOperand * secondOperand; break;
                case '/': result = secondOperand !== 0 ? firstOperand / secondOperand : '오류'; break;
            }
            currentInput = result.toString();
            operator = null;
            firstOperand = null;
            waitingForSecondOperand = false;
            updateDisplay();
        }
    } else if (type === 'backspace') {
        let displayText = display.textContent;
        displayText = displayText.slice(0, -1);
        displayText = displayText.replace(/\s+/g, ' ').trim();
        if (displayText === '') {
            currentInput = '0';
            operator = null;
            firstOperand = null;
            waitingForSecondOperand = false;
        } else {
            let match = displayText.match(/^(-?\d+(?:\.\d+)?)(?:\s*([+−×÷])\s*(-?\d+(?:\.\d+)?))?$/);
            if (match) {
                if (match[2]) {
                    firstOperand = parseFloat(match[1]);
                    let op = match[2];
                    if (op === '×') op = '*';
                    if (op === '÷') op = '/';
                    if (op === '−') op = '-';
                    operator = op;
                    currentInput = match[3] !== undefined ? match[3] : '';
                    waitingForSecondOperand = (currentInput === '');
                } else {
                    firstOperand = null;
                    operator = null;
                    currentInput = match[1];
                    waitingForSecondOperand = false;
                }
            } else {
                currentInput = displayText;
                operator = null;
                firstOperand = null;
                waitingForSecondOperand = false;
            }
        }
        updateDisplay();
    } else if (type === 'clear') {
        currentInput = '0';
        operator = null;
        firstOperand = null;
        waitingForSecondOperand = false;
        updateDisplay();
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        if (button.id === 'backspace') {
            handleInput('backspace');
        } else if (button.id === 'clear') {
            handleInput('clear');
        } else if (button.id === 'equals') {
            handleInput('equal');
        } else if (button.classList.contains('operator')) {
            handleInput('operator', value);
        } else if (value === '.') {
            handleInput('dot', value);
        } else {
            handleInput('number', value);
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.repeat) return;
    let key = e.key;
    if (/^[0-9]$/.test(key)) {
        handleInput('number', key);
    } else if (key === '.') {
        handleInput('dot', key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        handleInput('operator', key);
    } else if (key === 'Enter' || key === '=') {
        handleInput('equal');
    } else if (key === 'Backspace') {
        handleInput('backspace');
    } else if (key === 'c' || key === 'C' || key === 'Escape') {
        handleInput('clear');
    }
});

updateDisplay();
const buttons = document.querySelectorAll('.btn');
let currentInput = '0';
let operator = null;
let firstOperand = null;
let waitingForSecondOperand = false;

function updateDisplay() {
    let displayText = '';
    if (operator && firstOperand !== null) {
        let opSymbol = operator;
        if (operator === '*') opSymbol = '×';
        if (operator === '/') opSymbol = '÷';
        displayText = firstOperand + ' ' + opSymbol + ' ' + (waitingForSecondOperand ? '' : currentInput);
    } else {
        displayText = currentInput;
    }
    display.textContent = displayText;
}

function handleInput(type, value) {
    if (type === 'number' || type === 'dot') {
        if (waitingForSecondOperand) {
            currentInput = value === '.' ? '0.' : value;
            waitingForSecondOperand = false;
        } else {
            if (currentInput === '0' && value !== '.') {
                currentInput = value;
            } else if (value === '.' && currentInput.includes('.')) {
                // Do nothing if already has decimal
            } else {
                currentInput += value;
            }
        }
        updateDisplay();
    } else if (type === 'operator') {
        if (!waitingForSecondOperand) {
            firstOperand = parseFloat(currentInput);
            operator = value;
            waitingForSecondOperand = true;
            updateDisplay();
        }
    } else if (type === 'equal') {
        if (operator && firstOperand !== null && !waitingForSecondOperand) {
            const secondOperand = parseFloat(currentInput);
            let result = 0;
            switch(operator) {
                case '+': result = firstOperand + secondOperand; break;
                case '-': result = firstOperand - secondOperand; break;
                case '*': result = firstOperand * secondOperand; break;
                case '/': result = secondOperand !== 0 ? firstOperand / secondOperand : '오류'; break;
            }
            currentInput = result.toString();
            operator = null;
            firstOperand = null;
            waitingForSecondOperand = false;
            updateDisplay();
        }
    } else if (type === 'backspace') {
        let displayText = display.textContent;
        displayText = displayText.slice(0, -1);
        displayText = displayText.replace(/\s+/g, ' ').trim();
        if (displayText === '') {
            currentInput = '0';
            operator = null;
            firstOperand = null;
            waitingForSecondOperand = false;
        } else {
            let match = displayText.match(/^(-?\d+(?:\.\d+)?)(?:\s*([+−×÷])\s*(-?\d+(?:\.\d+)?))?$/);
            if (match) {
                if (match[2]) {
                    firstOperand = parseFloat(match[1]);
                    let op = match[2];
                    if (op === '×') op = '*';
                    if (op === '÷') op = '/';
                    if (op === '−') op = '-';
                    operator = op;
                    currentInput = match[3] !== undefined ? match[3] : '';
                    waitingForSecondOperand = (currentInput === '');
                } else {
                    firstOperand = null;
                    operator = null;
                    currentInput = match[1];
                    waitingForSecondOperand = false;
                }
            } else {
                currentInput = displayText;
                operator = null;
                firstOperand = null;
                waitingForSecondOperand = false;
            }
        }
        updateDisplay();
    } else if (type === 'clear') {
        currentInput = '0';
        operator = null;
        firstOperand = null;
        waitingForSecondOperand = false;
        updateDisplay();
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        if (button.id === 'backspace') {
            handleInput('backspace');
        } else if (button.id === 'clear') {
            handleInput('clear');
        } else if (button.id === 'equals') {
            handleInput('equal');
        } else if (button.classList.contains('operator')) {
            handleInput('operator', value);
        } else if (value === '.') {
            handleInput('dot', value);
        } else {
            handleInput('number', value);
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.repeat) return;
    let key = e.key;
    if (/^[0-9]$/.test(key)) {
        handleInput('number', key);
    } else if (key === '.') {
        handleInput('dot', key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        handleInput('operator', key);
    } else if (key === 'Enter' || key === '=') {
        handleInput('equal');
    } else if (key === 'Backspace') {
        handleInput('backspace');
    } else if (key === 'c' || key === 'C' || key === 'Escape') {
        handleInput('clear');
    }
});

updateDisplay();

console.log('script loaded');

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '0';
let operator = null;
let firstOperand = null;
let waitingForSecondOperand = false;

function updateDisplay() {
    let displayText = '';
    if (operator && firstOperand !== null) {
        let opSymbol = operator;
        if (operator === '*') opSymbol = '×';
        if (operator === '/') opSymbol = '÷';
        displayText = firstOperand + ' ' + opSymbol + ' ' + (waitingForSecondOperand ? '' : currentInput);
    } else {
        displayText = currentInput;
    }
    display.textContent = displayText;
}

function handleInput(type, value) {
    if (type === 'number' || type === 'dot') {
        if (waitingForSecondOperand) {
            currentInput = value === '.' ? '0.' : value;
            waitingForSecondOperand = false;
        } else {
            if (currentInput === '0' && value !== '.') {
                currentInput = value;
            } else if (value === '.' && currentInput.includes('.')) {
                // Do nothing if already has decimal
            } else {
                currentInput += value;
            }
        }
        updateDisplay();
    } else if (type === 'operator') {
        if (!waitingForSecondOperand) {
            firstOperand = parseFloat(currentInput);
            operator = value;
            waitingForSecondOperand = true;
            updateDisplay();
        }
    } else if (type === 'equal') {
        if (operator && firstOperand !== null && !waitingForSecondOperand) {
            const secondOperand = parseFloat(currentInput);
            let result = 0;
            switch(operator) {
                case '+': result = firstOperand + secondOperand; break;
                case '-': result = firstOperand - secondOperand; break;
                case '*': result = firstOperand * secondOperand; break;
                case '/': result = secondOperand !== 0 ? firstOperand / secondOperand : '오류'; break;
            }
            currentInput = result.toString();
            operator = null;
            firstOperand = null;
            waitingForSecondOperand = false;
            updateDisplay();
        }
    } else if (type === 'backspace') {
        let displayText = display.textContent;
        displayText = displayText.slice(0, -1);
        displayText = displayText.replace(/\s+/g, ' ').trim();
        if (displayText === '') {
            currentInput = '0';
            operator = null;
            firstOperand = null;
            waitingForSecondOperand = false;
        } else {
            let match = displayText.match(/^(-?\d+(?:\.\d+)?)(?:\s*([+−×÷])\s*(-?\d+(?:\.\d+)?))?$/);
            if (match) {
                if (match[2]) {
                    firstOperand = parseFloat(match[1]);
                    let op = match[2];
                    if (op === '×') op = '*';
                    if (op === '÷') op = '/';
                    if (op === '−') op = '-';
                    operator = op;
                    currentInput = match[3] !== undefined ? match[3] : '';
                    waitingForSecondOperand = (currentInput === '');
                } else {
                    firstOperand = null;
                    operator = null;
                    currentInput = match[1];
                    waitingForSecondOperand = false;
                }
            } else {
                currentInput = displayText;
                operator = null;
                firstOperand = null;
                waitingForSecondOperand = false;
            }
        }
        updateDisplay();
    } else if (type === 'clear') {
        currentInput = '0';
        operator = null;
        firstOperand = null;
        waitingForSecondOperand = false;
        updateDisplay();
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        if (button.id === 'backspace') {
            handleInput('backspace');
        } else if (button.id === 'clear') {
            handleInput('clear');
        } else if (button.id === 'equals') {
            handleInput('equal');
        } else if (button.classList.contains('operator')) {
            handleInput('operator', value);
        } else if (value === '.') {
            handleInput('dot', value);
        } else {
            handleInput('number', value);
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.repeat) return;
    let key = e.key;
    if (/^[0-9]$/.test(key)) {
        handleInput('number', key);
    } else if (key === '.') {
        handleInput('dot', key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        handleInput('operator', key);
    } else if (key === 'Enter' || key === '=') {
        handleInput('equal');
    } else if (key === 'Backspace') {
        handleInput('backspace');
    } else if (key === 'c' || key === 'C' || key === 'Escape') {
        handleInput('clear');
    }
});

updateDisplay();

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '0';
let operator = null;
let firstOperand = null;
let waitingForSecondOperand = false;

function updateDisplay() {
    let displayText = '';
    if (operator && firstOperand !== null) {
        let opSymbol = operator;
        if (operator === '*') opSymbol = '×';
        if (operator === '/') opSymbol = '÷';
        displayText = firstOperand + ' ' + opSymbol + ' ' + (waitingForSecondOperand ? '' : currentInput);
    } else {
        displayText = currentInput;
    }
    display.textContent = displayText;
}

function handleInput(type, value) {
    if (type === 'number' || type === 'dot') {
        if (waitingForSecondOperand) {
            currentInput = value === '.' ? '0.' : value;
            waitingForSecondOperand = false;
        } else {
            if (currentInput === '0' && value !== '.') {
                currentInput = value;
            } else if (value === '.' && currentInput.includes('.')) {
                // Do nothing if already has decimal
            } else {
                currentInput += value;
            }
        }
        updateDisplay();
    } else if (type === 'operator') {
        if (!waitingForSecondOperand) {
            firstOperand = parseFloat(currentInput);
            operator = value;
            waitingForSecondOperand = true;
            updateDisplay();
        }
    } else if (type === 'equal') {
        if (operator && firstOperand !== null && !waitingForSecondOperand) {
            const secondOperand = parseFloat(currentInput);
            let result = 0;
            switch(operator) {
                case '+': result = firstOperand + secondOperand; break;
                case '-': result = firstOperand - secondOperand; break;
                case '*': result = firstOperand * secondOperand; break;
                case '/': result = secondOperand !== 0 ? firstOperand / secondOperand : '오류'; break;
            }
            currentInput = result.toString();
            operator = null;
            firstOperand = null;
            waitingForSecondOperand = false;
            updateDisplay();
        }
    } else if (type === 'backspace') {
        let displayText = display.textContent;
        displayText = displayText.slice(0, -1);
        displayText = displayText.replace(/\s+/g, ' ').trim();
        if (displayText === '') {
            currentInput = '0';
            operator = null;
            firstOperand = null;
            waitingForSecondOperand = false;
        } else {
            let match = displayText.match(/^(-?\d+(?:\.\d+)?)(?:\s*([+−×÷])\s*(-?\d+(?:\.\d+)?))?$/);
            if (match) {
                if (match[2]) {
                    firstOperand = parseFloat(match[1]);
                    let op = match[2];
                    if (op === '×') op = '*';
                    if (op === '÷') op = '/';
                    if (op === '−') op = '-';
                    operator = op;
                    currentInput = match[3] !== undefined ? match[3] : '';
                    waitingForSecondOperand = (currentInput === '');
                } else {
                    firstOperand = null;
                    operator = null;
                    currentInput = match[1];
                    waitingForSecondOperand = false;
                }
            } else {
                currentInput = displayText;
                operator = null;
                firstOperand = null;
                waitingForSecondOperand = false;
            }
        }
        updateDisplay();
    } else if (type === 'clear') {
        currentInput = '0';
        operator = null;
        firstOperand = null;
        waitingForSecondOperand = false;
        updateDisplay();
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        if (button.id === 'backspace') {
            handleInput('backspace');
        } else if (button.id === 'clear') {
            handleInput('clear');
        } else if (button.id === 'equals') {
            handleInput('equal');
        } else if (button.classList.contains('operator')) {
            handleInput('operator', value);
        } else if (value === '.') {
            handleInput('dot', value);
        } else {
            handleInput('number', value);
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.repeat) return;
    let key = e.key;
    if (/^[0-9]$/.test(key)) {
        handleInput('number', key);
    } else if (key === '.') {
        handleInput('dot', key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        handleInput('operator', key);
    } else if (key === 'Enter' || key === '=') {
        handleInput('equal');
    } else if (key === 'Backspace') {
        handleInput('backspace');
    } else if (key === 'c' || key === 'C' || key === 'Escape') {
        handleInput('clear');
    }
});

updateDisplay();
const buttons = document.querySelectorAll('.btn');
let currentInput = '0';
let operator = null;
let firstOperand = null;
let waitingForSecondOperand = false;

function updateDisplay() {
    let displayText = '';
    if (operator && firstOperand !== null) {
        let opSymbol = operator;
        if (operator === '*') opSymbol = '×';
        if (operator === '/') opSymbol = '÷';
        displayText = firstOperand + ' ' + opSymbol + ' ' + (waitingForSecondOperand ? '' : currentInput);
    } else {
        displayText = currentInput;
    }
    display.textContent = displayText;
}

function handleInput(type, value) {
    if (type === 'number' || type === 'dot') {
        if (waitingForSecondOperand) {
            currentInput = value === '.' ? '0.' : value;
            waitingForSecondOperand = false;
        } else {
            if (currentInput === '0' && value !== '.') {
                currentInput = value;
            } else if (value === '.' && currentInput.includes('.')) {
                // Do nothing if already has decimal
            } else {
                currentInput += value;
            }
        }
        updateDisplay();
    } else if (type === 'operator') {
        if (!waitingForSecondOperand) {
            firstOperand = parseFloat(currentInput);
            operator = value;
            waitingForSecondOperand = true;
            updateDisplay();
        }
    } else if (type === 'equal') {
        if (operator && firstOperand !== null && !waitingForSecondOperand) {
            const secondOperand = parseFloat(currentInput);
            let result = 0;
            switch(operator) {
                case '+': result = firstOperand + secondOperand; break;
                case '-': result = firstOperand - secondOperand; break;
                case '*': result = firstOperand * secondOperand; break;
                case '/': result = secondOperand !== 0 ? firstOperand / secondOperand : '오류'; break;
            }
            currentInput = result.toString();
            operator = null;
            firstOperand = null;
            waitingForSecondOperand = false;
            updateDisplay();
        }
    } else if (type === 'backspace') {
        let displayText = display.textContent;
        displayText = displayText.slice(0, -1);
        displayText = displayText.replace(/\s+/g, ' ').trim();
        if (displayText === '') {
            currentInput = '0';
            operator = null;
            firstOperand = null;
            waitingForSecondOperand = false;
        } else {
            let match = displayText.match(/^(-?\d+(?:\.\d+)?)(?:\s*([+−×÷])\s*(-?\d+(?:\.\d+)?))?$/);
            if (match) {
                if (match[2]) {
                    firstOperand = parseFloat(match[1]);
                    let op = match[2];
                    if (op === '×') op = '*';
                    if (op === '÷') op = '/';
                    if (op === '−') op = '-';
                    operator = op;
                    currentInput = match[3] !== undefined ? match[3] : '';
                    waitingForSecondOperand = (currentInput === '');
                } else {
                    firstOperand = null;
                    operator = null;
                    currentInput = match[1];
                    waitingForSecondOperand = false;
                }
            } else {
                currentInput = displayText;
                operator = null;
                firstOperand = null;
                waitingForSecondOperand = false;
            }
        }
        updateDisplay();
    } else if (type === 'clear') {
        currentInput = '0';
        operator = null;
        firstOperand = null;
        waitingForSecondOperand = false;
        updateDisplay();
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        if (button.id === 'backspace') {
            handleInput('backspace');
        } else if (button.id === 'clear') {
            handleInput('clear');
        } else if (button.id === 'equals') {
            handleInput('equal');
        } else if (button.classList.contains('operator')) {
            handleInput('operator', value);
        } else if (value === '.') {
            handleInput('dot', value);
        } else {
            handleInput('number', value);
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.repeat) return;
    let key = e.key;
    if (/^[0-9]$/.test(key)) {
        handleInput('number', key);
    } else if (key === '.') {
        handleInput('dot', key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        handleInput('operator', key);
    } else if (key === 'Enter' || key === '=') {
        handleInput('equal');
    } else if (key === 'Backspace') {
        handleInput('backspace');
    } else if (key === 'c' || key === 'C' || key === 'Escape') {
        handleInput('clear');
    }
});

updateDisplay();