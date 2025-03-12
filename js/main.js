let timer = 15
let score = 0
let timeOut
let interval 
let isActive = false
let difficulty = "normal"

const start = document.getElementById('start')
const gameContainer = document.getElementById('gameContainer')
const hardLevel = document.getElementById('hardLevel')
const bestScoreElement = document.getElementById('bestScore')
const historyElement = document.getElementById('history')


start.addEventListener('click', startGame)

let history = JSON.parse(localStorage.getItem("gameHistory")) || []
let bestScore = localStorage.getItem("bestScore") || 0
bestScoreElement.textContent = `Найкращий рахунок 🏆: ${bestScore}`
updateHistoryDisplay()

document.getElementById('hardLevel').addEventListener('click', () => {
    difficulty = difficulty === "normal" ? "hard" : "normal";
});

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
            start.style.display = 'inline'
            endGame();
        }
    }, 1000)
}

function endGame() {
    clearInterval(interval)
    clearTimeout(timeOut)
    isActive = false
    gameContainer.lastElementChild.remove()
    
    history.unshift(score)
    history = history.slice(0, 5) 
    localStorage.setItem("gameHistory", JSON.stringify(history))

    if (score > bestScore) {
        bestScore = score
        localStorage.setItem("bestScore", bestScore)
        bestScoreElement.textContent = `Найкращий результат 🏆: ${bestScore}`
    }

    updateHistoryDisplay()
    document.body.innerHTML = `<h1>Гра завершена! <br> Ваш результат: ${score}</h1>`
    start.style.display = 'inline'
}

function updateHistoryDisplay() {
    history = Array.isArray(history) ? history.filter(item => typeof item === "number") : []

    historyElement.textContent = history.length > 0 
        ? `Історія: ${history.join(", ")}` 
        : "Історія: поки немає результатів"
}

function createCircle() {
    const circle = document.createElement('div')
    circle.className = 'circle'
    circle.style.top = `${Math.floor(Math.random() * (gameContainer.clientHeight - 70))}px`
    circle.style.left = `${Math.floor(Math.random() * (gameContainer.clientWidth - 70))}px`
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

