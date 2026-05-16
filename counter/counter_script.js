// counter_script.js
document.addEventListener("DOMContentLoaded", function() {
    const startButton= document.getElementById("startButton");
    const stopButton = document.getElementById("stopButton");
    const timerDisplay = document.getElementById("timer");
    let timerInterval;
    let startTime;

    function startTimer() {
        startTime = new Date();
        timerInterval = setInterval(updateTimer, 1000);
        startButton.style.display = "none";
        stopButton.style.display = "inline-block";
    }

    function stopTimer() {
        clearInterval(timerInterval);
        startButton.style.display = "inline-block";
        stopButton.style.display = "none";
    }

    function updateTimer() {
        const currentTime = new Date();
        const elapsedTime = new Date(currentTime - startTime);

        const hours = String(elapsedTime.getUTCHours()).padStart(2, '0');
        const minutes = String(elapsedTime.getUTCMinutes()).padStart(2, '0');
        const seconds = String(elapsedTime.getUTCSeconds()).padStart(2, '0');

        timerDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    }

    startButton.addEventListener("click", startTimer);
    stopButton.addEventListener("click", stopTimer);
});