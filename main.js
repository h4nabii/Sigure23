let countdownDiv = document.querySelector(".count-down");
let counter = document.querySelector(".count-down-time");

countdown.everySec(left => {
    let {days, hours, minutes, seconds} = left;
    counter.textContent = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
})

countdown.finish(() => {
    counter.textContent = `happy`
    countdownDiv.classList.add("finished");
})
