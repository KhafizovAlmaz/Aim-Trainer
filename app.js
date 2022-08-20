const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const form = document.querySelector('.form')
let time = 0;;
let score = 0;

startBtn.addEventListener('click',(event) => {
  event.preventDefault();
  screens[0].classList.add('up');
})

timeList.addEventListener('click',(event) => {
    //делегирование событий
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    } 
})
 
form.addEventListener('submit', (event) => {
  event.preventDefault();
  time = parseInt(form[0].value);
  screens[1].classList.add('up');
  startGame();
})

board.addEventListener('click', (event) => {
   if (event.target.classList.contains('circle')){
        score++;
        event.target.remove() 
        createRandomCircle()
   }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
  if (time === 0) {
    finishGame()
  } else {
    let currentTime = --time ;
    if (currentTime < 10) {
      currentTime = `0${currentTime}`
    }
    setTime(currentTime)
  }
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h2>Ваш счет: <span class="primary">${score}</span> </h2>`
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10,60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    let r = getRandomColor()
    let g = getRandomColor()
    let b = getRandomColor()
    
    //изменяем размеры и положение кружка
    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.background = `linear-gradient(${x}deg, ${r} 0%, ${g} 47%, ${b} 100%)`

    board.append(circle)
}

function getRandomNumber(min,max) {
   return Math.round(Math.random() * (max - min) + min)
}


//helper func
function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }