let countdownDiv = document.querySelector(".count-down");
let counter = document.querySelector(".count-down-time");

countdown.everySec(left => {
    let {days, hours, minutes, seconds} = left;
    counter.textContent =
        `${days} day${days > 1 ? "s" : ""}, ` +
        `${hours} hour${hours > 1 ? "s" : ""}, ` +
        `${minutes} minute${minutes > 1 ? "s" : ""}, ` +
        `${seconds} second${seconds > 1 ? "s" : ""}`
})

countdown.finish(() => {
    counter.textContent = `happy`
    countdownDiv.classList.add("finished");
})
