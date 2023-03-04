let timer = 60;
let timerId;
function descreaseTimer() {
  timerId = setInterval(() => {
    if (timer > 0) {
      timer--;
      document.getElementById("timer").innerHTML = timer;
    }
  }, 1000);
}

export { timer, timerId, descreaseTimer };
