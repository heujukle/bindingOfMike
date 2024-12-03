const playStart = document.getElementById('playStart');
const start = document.getElementById('start');
const game = document.getElementById('game');
const nameInput = document.getElementById('name');
const title = document.getElementsByTagName('title')[0]

playStart.addEventListener('click', (e) => {
    menu = false;
    title.textContent = nameInput.value + " Game"
    start.classList.add('invisible')
    game.src='script.js'
})