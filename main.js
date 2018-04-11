
const digits = document.querySelectorAll('.digitbtn');

for(let i = 0; i < digits.length; i++) {
  digits[i].addEventListener('click', digitPressed)
}

const ops = document.querySelectorAll('.mathbtn');

for(let i = 0; i < ops.length; i++) {
  ops[i].addEventListener('click', opsPressed)
}

document.querySelector('#cancel').addEventListener('click', clearEntry)
document.querySelector('#reset').addEventListener('click', clearAll)
document.querySelector('#equals').addEventListener('click', calculate)
document.querySelector('#dot').addEventListener('click', dotPressed)
// document.querySelector('#lbracket').addEventListener('click', lBracket)
// document.querySelector('#rbracket').addEventListener('click', rBracket)

let screenMain = document.querySelector('#screenOne');
let screenCalc = document.querySelector('#screenTwo');

let currentValue = '';
let calcValue = '';
let previousAnswer = '';

function digitPressed() {
    if(currentValue.length <= 15) {
      let val = this.innerHTML;
    if(currentValue == '') {
      currentValue = val;
    } else {
      currentValue += val;
    }
    showMain(currentValue);
  }
}

function opsPressed() {
  let val = this.innerHTML;
  if(!currentValue && previousAnswer) {
    currentValue = previousAnswer;
  }
  if (currentValue[currentValue.length - 1] == '.') {
    currentValue = currentValue.slice(0, -1)
  }
  if(currentValue) {
    calcValue += ' ' + currentValue + ' ' + val;
    currentValue = '';
  } else {
    calcValue = calcValue.slice(0, -1) + val;
  }
  showCalc(calcValue)
}


function dotPressed() {
  if(currentValue == '' || currentValue == '0') {
    currentValue = '0.'
  } else if (!/\./.test(currentValue)) {
    currentValue += '.';
  }
  showMain(currentValue);
}

function clearEntry() {
  currentValue = '';
  showMain('0');
}

function clearAll() {
  currentValue = '';
  showMain('0');
  calcValue = '';
  showCalc('');
}

function calculate() {
  let answer = calcValue + currentValue;
  answer = answer.replace('x', '*').replace('÷', '/')
  answer = eval(answer);
  showMain(answer)
  calcValue += ' ' + currentValue + ' = ' + answer
  showCalc(calcValue)
  previousAnswer = answer + '';
  currentValue = '';
  calcValue = '';
}

function showMain(text) {
  screenMain.innerHTML = text;
}
function showCalc(text) {
  screenCalc.innerHTML = text;
}
