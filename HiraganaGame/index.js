const hiraganaTable = new Map()
hiraganaTable.set("a", "あ")
hiraganaTable.set("i", "い")
hiraganaTable.set("u", "う")
hiraganaTable.set("e", "え")
hiraganaTable.set("o", "お")

hiraganaTable.set("ka", "か")
hiraganaTable.set("ki", "き")
hiraganaTable.set("ku", "く")
hiraganaTable.set("ke", "け")
hiraganaTable.set("ko", "こ")

hiraganaTable.set("sa", "さ")
hiraganaTable.set("shi", "し")
hiraganaTable.set("su", "す")
hiraganaTable.set("se", "せ")
hiraganaTable.set("so", "そ")

hiraganaTable.set("ta", "た")
hiraganaTable.set("chi", "ち")
hiraganaTable.set("tsu", "つ")
hiraganaTable.set("te", "て")
hiraganaTable.set("to", "と")

hiraganaTable.set("na", "な")
hiraganaTable.set("ni", "に")
hiraganaTable.set("nu", "ぬ")
hiraganaTable.set("ne", "ね")
hiraganaTable.set("no", "の")

hiraganaTable.set("ha", "は")
hiraganaTable.set("hi", "ひ")
hiraganaTable.set("fu", "ふ")
hiraganaTable.set("he", "へ")
hiraganaTable.set("ho", "ほ")

hiraganaTable.set("ma", "ま")
hiraganaTable.set("mi", "み")
hiraganaTable.set("mu", "む")
hiraganaTable.set("me", "め")
hiraganaTable.set("mo", "も")

hiraganaTable.set("ya", "や")
hiraganaTable.set("yu", "ゆ")
hiraganaTable.set("yo", "よ")

hiraganaTable.set("ra", "ら")
hiraganaTable.set("ri", "り")
hiraganaTable.set("ru", "る")
hiraganaTable.set("re", "れ")
hiraganaTable.set("ro", "ろ")

hiraganaTable.set("wa", "わ")
hiraganaTable.set("wo", "を")
hiraganaTable.set("n", "ん")

const romaji = 
    ["a", "i", "u", "e", "o",
    "ka", "ki", "ku", "ke", "ko",
    "sa", "shi", "su", "se", "so",
    "ta", "chi", "tsu", "te", "to",
    "na", "ni", "nu", "ne", "no",
    "ha", "hi", "fu", "he", "ho",
    "ma", "mi", "mu", "me", "mo",
    "ya",       "yu",       "yo",
    "ra", "ri", "ru", "re", "ro",
    "wa", "wo", "n"]

const inputEl = document.getElementById("input-el")
const countdown = document.getElementById("countdown")
const startBtn = document.getElementById("start-btn")
const kanaEl = document.getElementById("kana-el")
const resultsEl = document.getElementById("results-el")
const startTime = 20
let solution = ""
let score = 0
let gameStarted = false
let highScore = localStorage.getItem("high-score")

inputEl.addEventListener("input", function() {
    if (gameStarted) {
        if (inputEl.value === solution) {
            console.log("correct")
            score++
            renderKana()
            inputEl.value = ""
        }
    }
})

function renderKana() {
    let randomIndex = Math.floor(Math.random() * 46)
    solution = romaji[randomIndex]
    let kana = hiraganaTable.get(solution)
    kanaEl.textContent = kana
}

function renderResults() {
    highScore = Math.max(highScore, score)
    localStorage.setItem("high-score", highScore)
    resultsEl.textContent = `Results: ${score} characters, 
                            ${score * 60 / startTime} cpm
                            \n\tHigh Score: ${highScore} characters`
}

// Timer:
let cron
let second = 0

startBtn.addEventListener("click", function() {
    gameStarted = true
    score = 0
    renderKana()

    second = 0
    countdown.innerText = startTime
    clearInterval(cron)
    cron = setInterval(() => { timer(); }, 1000)
})

function timer() {
    second += 1
    let currentTime = startTime - second
    countdown.innerText = currentTime
    if (currentTime === 0) {
        clearInterval(cron)
        gameStarted = false
        renderResults()
    }
}

