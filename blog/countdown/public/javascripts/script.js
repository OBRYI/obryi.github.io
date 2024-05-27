const targetDate = new Date('2024-05-31T17:00:00');
const countdown = document.getElementById('countdown');
count();
const countInterval = window.setInterval(function () {
    count();
}, 1000);
function count() {
    const now = Date.now()
    const difference = targetDate - now;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    countdown.innerText = days + " дні " + hours + " годин " + minutes + " хвилин " + seconds + " секунд ";
}