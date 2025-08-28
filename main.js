let cardsContainer = document.querySelector('.card-contain')
let images = document.querySelectorAll('.img_box')
let endScreen = document.querySelector('.end-screen')
let score = document.querySelector('.score')
let chancesLeft = document.querySelector('.moves-left')
let startBtn = document.querySelector('.btn')
let gameStart = false
let indexArr = []
let count = 0
let chances = 3

startBtn.addEventListener('click',()=>{
  shuffleCards()
  images.forEach(image => {
  image.querySelector('.img-back').style.transform = 'rotateY(180deg)'
  setTimeout(()=>{
image.querySelector('.img-back').style.transform = 'rotateY(0deg)'
  },2000)
})
  gameStart = true
  endScreen.style.display = 'none'
  startBtn.textContent = 'Restart Game'
  count = 0
  chances = 3
  score.textContent = `Score: ${count}`
  chancesLeft.textContent = `Moves Left: ${chances}`
})

function shuffleCards() {
  cardsContainer.innerHTML = ''
let cardShuffle = Array.from(images)
cardShuffle.sort(() => (Math.random() - 0.5)).forEach(card => {
  cardsContainer.appendChild(card)
})
images = document.querySelectorAll('.img_box')
}

function checkForMatch() {
if (indexArr.length == 2) {
  gameStart = false
  if (indexArr[0].dataset.id == indexArr[1].dataset.id) {
    count++
    score.textContent = `Score: ${count}`
    indexArr = []
    gameStart = true
  }
  else {
    chances--
    chancesLeft.textContent = `Moves Left: ${chances}`
    setTimeout(() => {
      indexArr[0].querySelector('.img-back').style.transform = 'rotateY(0deg)'
      indexArr[1].querySelector('.img-back').style.transform = 'rotateY(0deg)'
      indexArr = []
      gameStart = true
    }, 1000)
  }
}
}

function checkForWin() {
  if (chances == 0) {
    endScreen.style.display = 'flex'
    endScreen.textContent = 'Game Over'
    gameStart = false
  }else if (count == (images.length/2)) {
    endScreen.textContent = 'You Win!!!'
    endScreen.style.display = 'flex'
    gameStart = false
  }
}

images.forEach(image=>{
  image.addEventListener('click',(e)=>{
    if (gameStart == false || image.querySelector('.img-back').style.transform == 'rotateY(180deg)')return
      image.querySelector('.img-back').style.transform = 'rotateY(180deg)'
      indexArr.push(image)
    checkForMatch()
    checkForWin()
  })
})



 