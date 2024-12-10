let timerInterval;
let isBreak = false;
let remainingTime = 25 * 60; // 25分（秒単位）
let workMusicFile, breakMusicFile;

const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const resetButton = document.getElementById("resetButton");
const workMusicInput = document.getElementById("workMusic");
const breakMusicInput = document.getElementById("breakMusic");
const audioPlayer = document.getElementById("audioPlayer");
const levelDisplay = document.getElementById("level");
const progressBar = document.getElementById("progress");
const totalTimeDisplay = document.getElementById("totalTime");

// Update timer display
function updateDisplay() {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, "0");
    secondsDisplay.textContent = seconds.toString().padStart(2, "0");
}

// Switch music
function switchMusic() {
    const musicFile = isBreak ? breakMusicFile : workMusicFile;
    if (musicFile) {
        audioPlayer.src = musicFile;
        audioPlayer.play();
    }
}

// Start timer
startButton.addEventListener("click", () => {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            if (remainingTime > 0) {
                remainingTime--;
                updateDisplay();
            } else {
                clearInterval(timerInterval);
                timerInterval = null;
                isBreak = !isBreak;
                remainingTime = isBreak ? 5 * 60 : 25 * 60;
                switchMusic();
            }
 
