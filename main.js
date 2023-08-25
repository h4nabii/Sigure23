let counter = document.querySelector(".count-down");

countdown.everySec(left => {
    console.log(left);
    let {days, hours, minutes, seconds} = left;
    counter.textContent = `${days}d, ${hours}h, ${minutes}m, ${seconds}s`
})
