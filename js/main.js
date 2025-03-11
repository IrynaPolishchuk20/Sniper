let timer = 15
let score = 0
let timeOut
let interval 
let isActive = false

const start = document.getElementById('start')
const gameContainer = document.getElementById('gameContainer')
const hardLevel = document.getElementById('hardLevel')

start.addEventListener('click', startGame)

document.getElementById('hardLevel').addEventListener('click', () => {
    difficulty = difficulty === "normal" ? "hard" : "normal"
    document.getElementById('hardLevel').textContent = difficulty === "hard" ? "Легше 🙂" : "Складніше 💪"
})

hardLevel.addEventListener('click', () => {
    difficulty = 'hard'
    hardLevel.textContent = 'Режим: Hard 🔥'
})


function startGame() {
    isActive = true
    score = 0 
    timer = 15
    timer = difficulty === 'hard' ? 10 : 15 
    hardLevel.style.display = 'none'
    start.style.display = 'none'
    createCircle()
    interval = setInterval(() => {
        if(timer > 0){
        timer--
        document.getElementById('timer').textContent = `Час: ${timer}`
        } else{
            clearInterval(interval)
            clearTimeout(timeOut)
            isActive = false
            gameContainer.lastElementChild.remove()
            document.body.innerHTML = `<h1>Гра завершена! Ваш рахунок: ${score}</h1>`
            start.style.display = 'inline'
        }
    }, 1000)
}

function createCircle() {
    const circle = document.createElement('div')
    circle.className = 'circle'
    circle.style.top = `${Math.floor(Math.random() * (gameContainer.clientHeight - 70))}px`
    circle.style.left = `${Math.floor(Math.random() * (gameContainer.clientWidth - 70))}px`
    circle.style.background = `rgb(${Math.random() * 250}, ${Math.random() * 250}, ${Math.random() * 250})`
    timeOut = setTimeout(() => {
        circle.remove()
        createCircle()
    }, difficulty === "hard" ? 700 : 1000)

    circle.addEventListener('click', () =>{
        if(isActive){
            score++
            document.getElementById('score').textContent = `Рахунок: ${score}`
            circle.remove()
            clearTimeout(timeOut)
            createCircle()
        } else{
            return
        }
    })
    gameContainer.appendChild(circle)
}

