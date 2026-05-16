const DEFAULT_TIME = 30;
const TIMER_INTERVAL_MS = 1000;
const BLINK_CLASS = "blink";
const BEEP_SOUND_URL = "https://www.soundjay.com/button/sounds/beep-07.mp3"; // should replace with a more peaceful beep sound

let countdownInterval;
let initialTime = DEFAULT_TIME;
let timeLeft = initialTime;
let isRunning = false;

const timerDisplay = document.getElementById("timer");
const startPauseBtn = document.getElementById("start-button");
const resetBtn = document.getElementById("reset-button");
const timeInput = document.getElementById("time-input");

const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return [hrs, mins, secs].map(unit => String(unit).padStart(2, '0')).join(':');
};

const updateDisplay = seconds => {
    const formatted = formatTime(seconds);
    timerDisplay.textContent = formatted;
    document.title = `Timer: ${formatted}`;
};

const playEndSound = () => {
    const beep = new Audio(BEEP_SOUND_URL);
    beep.play().catch(console.error);
};

const onTimeEnd = () => {
    isRunning = false;
    startPauseBtn.textContent = 'Start';
    startPauseBtn.disabled = false;
    playEndSound();
    timerDisplay.classList.add(BLINK_CLASS);

    // callback_time_end(); // hook for callback
};

const startCountdown = () => {
    isRunning = true;
    startPauseBtn.textContent = 'Pause';
    startPauseBtn.disabled = false;
    countdownInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay(timeLeft);
        } else {
            clearInterval(countdownInterval);
            onTimeEnd();
        }
    }, TIMER_INTERVAL_MS);
};

const pauseCountdown = () => {
    clearInterval(countdownInterval);
    isRunning = false;
    startPauseBtn.textContent = 'Resume';
};

const handleStartPause = () => {
    if (isRunning) {
        pauseCountdown();
    } else {
        if (timeInput?.value) {
            const newTime = parseInt(timeInput.value, 10);
            if (isNaN(newTime) || newTime < 0) {
                alert("Please enter a valid time in seconds.");
                return;
            }
            initialTime = newTime;
            if (timeLeft === 0 || timeLeft > initialTime) {
                timeLeft = initialTime;
                updateDisplay(timeLeft);
            }
        }
        startCountdown();
    }
};

const resetCountdown = () => {
    clearInterval(countdownInterval);
    isRunning = false;
    initialTime = parseInt(timeInput.value, 10) || DEFAULT_TIME;
    timeLeft = initialTime;
    updateDisplay(timeLeft);
    startPauseBtn.textContent = 'Start';
    startPauseBtn.disabled = false;
    timerDisplay.classList.remove(BLINK_CLASS);
};

const handleTimeInputChange = () => {
    if (isRunning) return;
    const newTime = parseInt(timeInput.value, 10);
    if (!isNaN(newTime) && newTime > 0) {
        initialTime = newTime;
        timeLeft = initialTime;
        updateDisplay(timeLeft);
    }
};

updateDisplay(timeLeft);

startPauseBtn.addEventListener("click", handleStartPause);
resetBtn.addEventListener("click", resetCountdown);
timeInput.addEventListener("change", handleTimeInputChange);