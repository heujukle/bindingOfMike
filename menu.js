const playStart = document.getElementById('playStart');
const start = document.getElementById('start');
const game = document.getElementById('game');
const nameInput = document.getElementById('name');
const title = document.getElementsByTagName('title')[0]
const hotbar =  document.getElementById('hotbar')

playStart.addEventListener('click', (e) => {
    menu = false;
    title.textContent = nameInput.value + " Game"
    start.classList.add('invisible')
    hotbar.classList.remove('invisible')
    game.src='script.js'
})