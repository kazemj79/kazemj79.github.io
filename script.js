//
'use strict'
// Declare Elements
const body = document.querySelector('body')
const btns = document.querySelectorAll('button')
const start = document.querySelector('#start')
const restart = document.querySelector('#restart')
const probEl = document.querySelector('.problem')
const numbers = document.querySelectorAll('.numbers')
const gameName = document.querySelector('.game-name')
const hs = document.querySelector('.hs')
const s = document.querySelector('.s')
const scoreEl = document.querySelector('.score')
const highScoreEl = document.querySelector('.high-score')
const num1 = numbers[0]
const num2 = numbers[1]
const num3 = numbers[2]

// check if the result of calculate function meet the needs or not // if not call that function again to create some does
const prob = function () {
  // let ok = calculate()
  clc = calculate()
  for (let i = 0; i < 15449; i++) {
    if (clc[0] <= 3 && clc[0] > 0) {
      probEl.textContent = clc[1]
      clc[0]
      return clc[0]
    } else {
      clc = calculate()
    }
  }
}
let score = 0
let highScore = 0
let playing = false
//
let clc = calculate()
let problem = prob()
// create array of random numbers and random formula
function calculate() {
  const a = Math.trunc(Math.random() * 3 + 1)
  const b = Math.trunc(Math.random() * 3 + 1)
  const c = Math.trunc(Math.random() * 3 + 1)
  const pr = []
  const solutions = [
    a + b,
    a - b,
    a + b + c,
    a - b + c,
    a + b - c,
    b + c - a,
    c - b - a,
    c + (b - a),
    a - (b + c),
  ]
  const slString = [
    `${a} + ${b}`,
    `${a} - ${b}`,
    `${a} + ${b} + ${c}`,
    `${a} - ${b} + ${c}`,
    `${a} + ${b} - ${c}`,
    `${b} + ${c} - ${a}`,
    `${c} - ${b} - ${a}`,
    `${c} + (${b} - ${a})`,
    `${a} - (${b} + ${c})`,
  ]
  const i = Math.trunc(Math.random() * solutions.length + 1)
  pr.push(solutions[i], slString[i])
  return pr
}
// start game function
function gameStart() {
  problem
  for (let i = 0; i < btns.length; i++) {
    btns[i].classList.toggle('hidden')
  }
  highScoreEl.classList.add('hidden')
  hs.classList.add('hidden')
  scoreEl.classList.remove('hidden')
  s.classList.remove('hidden')
  gameName.classList.add('hidden')
  probEl.classList.remove('hidden')
  playing = true
  scoreEl.textContent = score
}
start.addEventListener('click', gameStart)

//
const next = () => {
  let clc = calculate()
  for (let i = 0; i < 15449; i++) {
    if (clc[0] <= 3 && clc[0] > 0) {
      probEl.textContent = clc[1]
      return clc[0]
    } else {
      clc = calculate()
    }
  }
}
numbers.forEach(x => {
  x.addEventListener('click', function (e) {
    if (e.target.innerText == problem && playing) {
      console.log(`${e.target.innerText} is CORRECT`)
      score++
      problem = prob()
    } else if (e.target.innerText != problem && playing) {
      body.classList.add('lose-game')
      if (score > highScore) {
        highScore = score
        highScoreEl.classList.remove('hidden')
        hs.classList.remove('hidden')
        highScoreEl.textContent = highScore
        scoreEl.classList.add('hidden')
        s.classList.add('hidden')
      }
      playing = false
    } else {
      console.log('Game Finished')
    }
    scoreEl.textContent = score
  })
})

restart.addEventListener('click', function () {
  playing = true
  body.classList.remove('lose-game')
  highScoreEl.classList.add('hidden')
  hs.classList.add('hidden')
  scoreEl.classList.remove('hidden')
  s.classList.remove('hidden')
  score = 0
  scoreEl.textContent = score
  next()
  problem = prob()
})
