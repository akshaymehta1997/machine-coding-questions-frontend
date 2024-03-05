(() => {
    const hour = document.querySelector(".hour");
    const min = document.querySelector(".min");
    const sec = document.querySelector(".sec");

    const startBtn = document.querySelector(".start");
    const stopBtn = document.querySelector(".stop");
    const resetBtn = document.querySelector(".reset");
    const states = {
        pause: "pause",
    };
    let countDownTimer = null;

    Number.prototype.toTwoDigitString = function () {
        return `${this < 10 ? "0" : ""}${this}`;
    };

    startBtn.addEventListener("click", function () {
        if (hour.value == 0 && min.value == 0 && sec.value == 0) return;
        hour.readOnly = true;
        min.readOnly = true;
        sec.readOnly = true;
        startBtn.style.display = "none";
        stopBtn.style.display = "initial";
        countDownTimer = setInterval(() => {
            timer();
        }, 1000);
    });

    function stopInterval(state) {
        hour.readOnly = false;
        min.readOnly = false;
        sec.readOnly = false;
        startBtn.innerHTML = state === states.pause ? "Continue" : "Start";
        startBtn.style.display = "initial";
        stopBtn.style.display = "none";
        clearInterval(countDownTimer);
    }

    function timer() {
        debugger;
        if (sec.value > 60) {
            min.value = (++min.value).toTwoDigitString();
            sec.value = (parseInt(sec.value) - 59).toTwoDigitString();
        }
        if (min.value > 60) {
            hour.value = (++hour.value).toTwoDigitString();
            min.value = (parseInt(min.value) - 60).toTwoDigitString();
        }
        if (hour.value == 0 && min.value == 0 && sec.value == 0) {
            hour.value = min.value = sec.value = "";
            stopInterval();
        } else if (sec.value != 0) {
            sec.value = (sec.value - 1).toTwoDigitString();
        } else if (min.value != 0 && sec.value == 0) {
            sec.value = 59;
            min.value = (min.value - 1).toTwoDigitString();
        } else if (hour.value != 0 && min.value == 0) {
            min.value = 60;
            hour.value = (hour.value - 1).toTwoDigitString();
        }
    }

    stopBtn.addEventListener("click", function () {
        stopInterval(states.pause);
    });

    resetBtn.addEventListener("click", function () {
        hour.value = min.value = sec.value = "";
        stopInterval();
    });
})();
