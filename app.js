let a = ''; // first number
let b = ''; // second number
let sign = ''; // знак операции
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']; // массив для того чтоб проверять какие кнопки нажаты
const action = ['-', '+', 'x', '/']; // массив для того чтобы проверять операции
const persent = ['%'];

// Экран монитора калькулятора
const out = document.querySelector('.calc-screen p');

// Функция будет очищать переменные
function clearAll () {
    a = '';
    b = '';
    sign = '';
    finish = false;
    out.textContent = 0;
}

document.querySelector('.ac').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) => {
    // два блока предохранителя
    // нажата не кнопка
    if(!event.target.classList.contains('btn')) return;
    // нажата кнопка clearAll ac
    if(event.target.classList.contains('ac')) return;

    out.textContent = '';

    // получаю нажатую кнопку
    const key = event.target.textContent;

    // если нажата клавиша 0-9 или .
    if (digit.includes(key)) {
        if (b === '' && sign === '') {
            a += key;
            console.log(a, b, sign);
            out.textContent = a;
        }
        else if (a!== '' && b!== '' && finish) {
            b = key;
            finish = false;
            out.textContent = b;
        }
        else {
            b += key;
            out.textContent = b;
        }
        console.log(a, b, sign);
        return;
    }

    // если нажата одна из клавишь + - / *
    if (action.includes(key)) {
        sign = key;
        out.textContent = sign;
        console.log(a, b, sign);
        return;
    }

    // нажать кнопку %
    if (persent.includes(key)) {
        b = b / 100;
        out.textContent = b;
        console.log(a, b, sign);
        return;
    } 

    if (key === '%') {
        switch (sign) {
            case "%":
                a = a / 100;
                break;
        } 
    }

    //нажат знак равно
    if (key === '=') {
        if (b === '') b = a;
        switch (sign) {
            case "+":
                a = (+a) + (+b);
                break;
            case "-":
                a = a - b;
                break;
            case "x":
                a = a * b;
                break;
            case "/":
                if (b === '0') {
                    out.textContent = "Ошибка";
                    a = '';
                    b = '';
                    sign = '';
                    return;
                }
                a = a / b;
                break;
            
        }
        finish = true;
        out.textContent = a;
        console.log(a, b, sign);
    }  
}