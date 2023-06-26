const gmailInput = document.querySelector('#gmail_input')
const gmailButton = document.querySelector('#gmail_button')
const gmailResult = document.querySelector('#gmail_result')

const regExp = /^[a-zA-Z0-9_.+-]+@gmail\.com$/

gmailButton.onclick = () => {
    if (regExp.test(gmailInput.value)) {
        gmailResult.innerHTML = '&#10004;'
        gmailResult.style.color = 'green'
    } else {
        gmailResult.innerHTML = '&#10060;'
        gmailResult.style.color = 'red'
    }
}

// MOVE BLOCK
const childBlock = document.querySelector('.child_block')

let positionX = 0
let positionY = 0

const move = () => {
    if (positionX < 449 && positionY === 0) {
        positionX+=2
        childBlock.style.left = `${positionX}px`
        setTimeout(move, 10)
    } else if (positionX >= 449 && positionY < 449) {
        positionY+=2
        childBlock.style.top = `${positionY}px`
        setTimeout(move, 10)
    } else if (positionX > 0 && positionY > 0) {
        positionX-=2
        childBlock.style.left = `${positionX}px`
        setTimeout(move, 10)
    } else if (positionX === 0 && positionY > 0) {
        positionY-=2
        childBlock.style.top = `${positionY}px`
        setTimeout(move, 10)
    }
}

move()

// STOPWATCH
const startButton = document.querySelector('#start'),
    stopButton = document.querySelector('#stop'),
    resetButton = document.querySelector('#reset'),
    counterElement = document.querySelector('#counter'),
    resumeButton = document.querySelector('#resume')

let counter = 0;
let intervalId = null;
function startCounter() {
    counter++;
    counterElement.textContent = counter;
}
startButton.addEventListener('click', function() {
    intervalId = setInterval(startCounter, 1000);
});
stopButton.addEventListener('click', function() {
    clearInterval(intervalId);
});
resumeButton.addEventListener('click', function() {
    intervalId = setInterval(startCounter, 1000);
});
resetButton.addEventListener('click', function() {
    clearInterval(intervalId);
    counter = 0;
    counterElement.textContent = counter;
});


// HW3 PT1

const slider = document.querySelector('.slider_hw');
const slides = slider.getElementsByTagName('img');
let currentSlideIndex = 0;

function showSlide(index) {
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    slides[index].classList.add('active');
    currentSlideIndex = index;
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
}

setInterval(nextSlide, 3000);

// hw3 PT2-3

// window.addEventListener('scroll', function() {
//     if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
//         let modal = document.getElementById('myModal');
//         modal.style.display = "block";
//     }
// });
//
// window.addEventListener('load', function() {
//     setTimeout(function() {
//         let modal = document.getElementById('myModal');
//         modal.style.display = "block";
//     }, 10000);
// });

// HW4 PT1

var people = [
    { name: "Алекс", age: 25 },
    { name: "Григорий", age: 32 },
    { name: "Боб", age: 45 }
];
let container = document.getElementById("people-container");
people.forEach(function(person) {
    let personElement = document.createElement("div");
    personElement.innerHTML = "Name: " + person.name + ", Age: " + person.age;
    container.appendChild(personElement);
});

// HW4 pt2

let xhr = new XMLHttpRequest();
xhr.open('GET', '../data/name.json', true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onload = function() {
    if (xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);
        console.log(data);
    }
    else {
        console.log('Ошибка загрузки данных:', xhr.status);
    }
};
xhr.onerror = function() {
    console.log('Ошибка выполнения запроса.');
};
xhr.send();

//HW5

function convertCurrency() {

    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    fetch('../data/exchange_rates.json')
        .then(response => response.json())
        .then(data => {
            let exchange = data;
            let convertedAmount = amount * exchange[fromCurrency][toCurrency];
            document.getElementById('result').innerHTML = convertedAmount.toFixed(2) + ' ' + toCurrency;
        })
        .catch(error => {
            console.error('Ошибка загрузки данных о курсах валют:', error);
        });
}


