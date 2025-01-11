const playStart = document.getElementById('playStart');
const start = document.getElementById('start');
const panel = document.getElementById('panel');
const game = document.getElementById('game');
const nameInput = document.getElementById('name');
const title = document.getElementsByTagName('title')[0]
const topLeft =  document.getElementById('topLeft')
const topRight =  document.getElementById('topRight')
const keyBinds =  document.getElementById('Key-Binds')
const mapElement = document.getElementsByName('map')[0]

playStart.addEventListener('click', (e) => {
    menu = false;
    title.textContent = nameInput.value + " Game"
    start.classList.add('invisible')
    topLeft.classList.remove('invisible')
    topRight.classList.remove('invisible')
    mapElement.classList.remove('invisible')
    game.src='script.js'
})

let mapPosIDs = ['mapAbsolute', 'mapNone', 'mapMini']
let mapType = 2;
document.addEventListener('keypress', (e) => {
    if(e.key == 'm'){
        mapType = incrementLimit(mapType, 3)
        mapElement.id = mapPosIDs[mapType];
    }
})

class areaMap {
    constructor(area){
        this.selected = null
        this.highX = 0
        this.lowX = 0 //functions as offset
        this.highY = 0
        this.lowY = 0 //functions as offset
        this.map = area.map;
        this.element = document.createElement('div')
        mapElement.innerHTML = ''
        mapElement.appendChild(this.element)
        this.bounds = this.findMapBounds(this.map)
        this.element.style = `width: 100%; height: 100%; display: grid; grid-template-columns: repeat(${this.bounds[0]}, 1fr); grid-template-rows: repeat(${this.bounds[1]}, 1fr); gap: 5px;`
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
        const room = this.map.get(cords)
        console.log(room)
        let styleString = ''
        if(!room.left){
            styleString += 'border-left: 5px solid black; '
        }
        if(!room.right){
            styleString += 'border-right: 5px solid black; '
        }
        if(!room.top){
            styleString += 'border-top: 5px solid black; '
        }
        if(!room.bottom){
            styleString += 'border-bottom: 5px solid black; '
        }
        const cord = cords.split(',')
        const x = parseInt(cord[0]) + Math.abs(this.lowX)
        const y = parseInt(cord[1]) + Math.abs(this.lowY)
        console.log(this)
        console.log(x, y)
        if(this.selected){
            this.selected.id = ''
        }
        this.selected = this.mapLayout[y][x]
        this.selected.id = 'playerMarker'
        this.mapLayout[y][x].classList.add('visited')
        this.mapLayout[y][x].style = styleString
    }

    findMapBounds(map){ //returns the length and width of the map required to fit
        const keys = Array.from(map.keys())
        for(let i = 0; i < keys.length; i++){
            const cord = keys[i].split(',')
            const x = parseInt(cord[0])
            const y = parseInt(cord[1])
            if(x > this.highX){
                this.highX = x
            }
            else if(x < this.lowX){
                this.lowX = x
            }
            if(y > this.highY){
                this.highY = y
            }
            else if(y < this.lowY){
                this.lowY = y
            }
        }
        return [this.highX + Math.abs(this.lowX) + 1, this.highY + Math.abs(this.lowY) + 1]
    }
}
const controls = {
    'up' : 'w',
    'left' : 'a',
    'down' : 's',
    'right' : 'd',
    'interact' : 'e',
}

keyBinds.addEventListener('click', (e) => {
    for(let i = 1; i < panel.children.length; i++){
        panel.children[i].classList.add('invisible')
    }
    const values = []
    const containers = []
    for(let i = 0; i < Object.keys(controls).length; i++){
        const container = document.createElement('div')
        container.textContent = Object.keys(controls)[i]
        const input = document.createElement('div')
        input.textContent = controls[Object.keys(controls)[i]] 
        input.addEventListener('click', (e) => {
            input.textContent = 'Press Key to change Bind'
            function changeBind(e){
                if(e.key == controls.up || e.key == controls.left || e.key == controls.right || e.key == controls.down || e.key == controls.interact){
                    input.textContent = 'Conflict with other binds'
                }
                else{
                    input.textContent = e.key
                }
                document.removeEventListener('keydown', changeBind)
            }
            document.addEventListener('keydown', changeBind)
        })
        values.push(input)
        containers.push(container)
        container.appendChild(input)
        panel.appendChild(container)
    }
    const saveChanges = document.createElement('div')
    saveChanges.textContent = 'Save Changes'
    containers.push(saveChanges)
    panel.appendChild(saveChanges)
    saveChanges.addEventListener('click', (e) => {
        for(let i = 0; i < values.length; i++){
            if(values[i].textContent === 'Conflict with other binds'){
                return false;
            }
            else{
                controls[Object.keys(controls)[i]] = values[i].textContent
            }
        }
        for(let i = 0; i < containers.length; i++){
            containers[i].remove()
        }
        for(let i = 1; i < panel.children.length; i++){
            panel.children[i].classList.remove('invisible')
        }
    })
})