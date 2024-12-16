const playStart = document.getElementById('playStart');
const start = document.getElementById('start');
const game = document.getElementById('game');
const nameInput = document.getElementById('name');
const title = document.getElementsByTagName('title')[0]
const hotbar =  document.getElementById('hotbar')
const mapElement = document.getElementById('map')

playStart.addEventListener('click', (e) => {
    menu = false;
    title.textContent = nameInput.value + " Game"
    start.classList.add('invisible')
    hotbar.classList.remove('invisible')
    game.src='script.js'
})

document.addEventListener('keypress', (e) => {
    if(e.key == 'm'){
        mapElement.classList.toggle('invisible')
    }
})

class areaMap {
    constructor(area){
        this.map = area.map;
        this.element = document.createElement('div')
        mapElement.appendChild(this.element)
        this.bounds = findMapBounds(this.map)
        this.element.style = `display: grid; grid-template-columns: repeat(${this.bounds[0]}, 1fr); grid-template-rows: repeat(${this.bounds[1]}, 1fr);`
        this.mapLayout = this.generateMapArray()
    }

    generateMapArray(){
        let result = []
        for(let i = 0; i < this.bounds[1]; i++){
            result.push([])
            for(let j = 0; j < this.bounds[0]; j++){
                const tile = document.createElement('div')
                this.element.appendChild(tile)
                result[i].push(tile)
            }
        }
        return result;
    }

    updateMap(cords){
        const cord = cords.split(',')
        const x = parseInt(cord[0])
        const y = parseInt(cord[1])
        this.mapLayout[y][x].classList.add('visited')
    }
}

function findMapBounds(map){ //returns the length and width of the map required to fit
    const keys = Array.from(map.keys())
    let highX = 0
    let lowX = 0
    let highY = 0
    let lowY = 0
    for(let i = 0; i < keys.length; i++){
        const cord = keys[i].split(',')
        const x = parseInt(cord[0])
        const y = parseInt(cord[1])
        if(x > highX){
            highX = x
        }
        else if(x < lowX){
            lowX = x
        }
        if(y > highY){
            highY = y
        }
        else if(y < lowY){
            lowY = y
        }
    }
    return [highX + Math.abs(lowX), highY + Math.abs(lowY)]
}