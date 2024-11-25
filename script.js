const result = document.querySelector('#result');
const expression = document.querySelector('#expression');
const num = document.querySelectorAll('.number:not(.equals)');
const operation = document.querySelectorAll('.operation');
const equals = document.querySelector('.equals');
const clear = document.querySelector('#clear');
const ce = document.querySelector('#ce');

let ex = ''; // expressionString
result.innerHTML = '0'; // first result = 0

// click Number
function clickN() {
  if (!ex || ex === '0') {
    expression.innerHTML = this.id;
    ex = this.id;
  } else {
    expression.innerHTML += this.id;
    ex += this.id;
  }
  const lastValue = ex.split(/\/|\*|\+|-|=/).pop();
  result.innerHTML = lastValue;
  checkLength(lastValue);
}

// clickO
function clickO() {
  if (!ex) return;
  ex = ex.toString().replace(/=/, '');
  if (ex.match(/\/|\*|\+|-|=/)) {
    ex = eval(ex).toString();
  } 
  expression.innerHTML += this.id;
  ex += this.id;
  result.innerHTML = this.id;
}

// listener`s
for (let i = 0; i < num.length; i++) {
  num[i].addEventListener('click', clickN);
}

for (let i = 0; i < operation.length; i++) {
  operation[i].addEventListener('click', clickO);
}

// Clear
clear.addEventListener('click', () => {
  result.innerHTML = '';
  expression.innerHTML = '';
  ex = '';
});

// del last
ce.addEventListener('click', () => {
  if (!expression.innerHTML.match(/=$/)) {
    expression.innerHTML = doCE(expression.innerHTML);
    ex = doCE(ex); 
    result.innerHTML = '0';
    
    function doCE(arg) {
      arg = arg.split(/([\/\*\+\-\=])/g);
      arg.splice(-1, 1);
      return arg.join('');
    }
  }
});

// equals
equals.addEventListener('click', () => {
  if (!ex) {
    result.innerHTML = '0';
  } else {
    ex = eval(ex);
    expression.innerHTML += '=';
    result.innerHTML = trim9(ex);
  }
});

// check length
function checkLength(arg) {
  if (arg.toString().length > 9) {
    expression.innerHTML = 'number too long'.toUpperCase();
    result.innerHTML = '0';
    ex = '0';
  } 
}

// trim num
function trim9(arg) {
  if (arg.toString().length > 9) {
    ex = parseFloat(arg.toPrecision(9));
    if (ex.toString().length > 9) { 
      ex = ex.toExponential(9);
    }
    return ex;
  } else {
    return arg;
  }
}
