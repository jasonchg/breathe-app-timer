const container = document.querySelector('.container')
const text = document.querySelector('#text')
const controller = document.querySelector('#controller')
const pointer = document.querySelector('.pointer-container')
const timerClock = document.querySelector('#timer')

const totalTime = 7500 // 7.5 seconds
const breatheTime = (totalTime / 5) * 2 // 3 seconds
const holdTime = totalTime / 5 // 1.5 secconds

var totalSeconds = 0
var trackStart = false
var breathIn
var breathOut
var routine
var timerInterval

// Initial state
stop()

function breatheAnimation() {
  timerInterval = setInterval(timer, 1000)
  container.className = 'container grow'
  controller.innerText = 'Breathe In!'
  // After Breathing in
  breathIn = setTimeout(() => {
    controller.innerText = 'Hold'
    // After Hold
    breathOut = setTimeout(() => {
      controller.innerText = 'Breathe Out!'
      container.className = 'container shrink'
    }, holdTime)
  }, breatheTime)
}

controller.addEventListener('click', () => {
  if (trackStart == false) {
    start()
    trackStart = true
  } else {
    stop()
  }
})

function start() {
  breatheAnimation()
  pointer.className = 'pointer-container rotate'
  // keep constant running
  routine = setInterval(breatheAnimation, totalTime)

  timer()
}

function stop() {
  clearTimeout(breathIn)
  clearTimeout(breathOut)
  clearInterval(routine)
  clearInterval(timerInterval)

  totalSeconds = 0
  timerClock.innerText = 'Timer'
  pointer.className = 'display-none'
  container.className = 'container'
  trackStart = false
  controller.innerText = 'Start'
}

function timer() {
  ++totalSeconds
  timerClock.innerText = pad(totalSeconds)
}

function pad(val) {
  var valString = val + ''
  if (valString.length < 2) {
    return '0' + valString
  } else {
    return valString
  }
}
