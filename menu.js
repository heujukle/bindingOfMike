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
const overlay = document.getElementById('overlay');
const sideBar = document.getElementById('middleRight')

playStart.addEventListener('click', (e) => { //starts games
    menu = false;
    title.textContent = nameInput.value + " Game"
    start.classList.add('invisible')
    topLeft.classList.remove('invisible')
    topRight.classList.remove('invisible')
    mapElement.classList.remove('invisible')
    game.src='script.js' //loads script
})

let mapPosIDs = ['mapAbsolute', 'mapNone', 'mapMini']
let mapType = 2;
document.addEventListener('keypress', (e) => {
    if(e.key == controls.map){
        mapType = incrementLimit(mapType, 3) //ensures no overflow
        mapElement.id = mapPosIDs[mapType]; //changes the id of the map
    }
    else if(e.key == controls.inventory){
        overlay.classList.remove('invisible')
        if(document.getElementById('inventory')){
            overlay.innerHTML = ''
            overlay.classList.add('invisible')
            topLeft.classList.toggle('invisible')
            menu = false
        }
        else if(menu == false){
            createInventory()
        }
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
        this.bounds = this.findMapBounds(this.map) //returns [rangeX, rangeY]
        this.element.style = `width: 100%; height: 100%; display: grid; grid-template-columns: repeat(${this.bounds[0]}, 1fr); grid-template-rows: repeat(${this.bounds[1]}, 1fr); gap: 5px;` //makes a grid that fits the area
        this.mapLayout = this.generateMapArray() //makes the array the carries the map
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
        /* assigns borders to rooms with walls*/
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
        /* */
        const cord = cords.split(',') //grabs the cords from the strings in the room object
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
            if(x > this.highX){ //finds highest and lowest
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
        return [this.highX + Math.abs(this.lowX) + 1, this.highY + Math.abs(this.lowY) + 1] //finds the range
    }
}

function createElement(elementType = null, cssClass, properties = {}, parent = null){
    if(elementType){
        const element = document.createElement(elementType)
        if(cssClass) element.classList.add(cssClass)
        for(let i = 0; i < Object.keys(properties).length; i++){
            element[Object.keys(properties)[i]] =  properties[Object.keys(properties)[i]]
        }
        if(parent != null) parent.appendChild(element)
        return element
    }
}

function createMeleeInv(item, checkEquip = true){
    const element = createElement('div', 'inventoryItem')
    const Img = createElement('img', null, {src:item.sprite.src})
    const itemText = createElement('p', null, {textContent:item.name})
    element.appendChild(Img)
    element.appendChild(itemText)
    if(item === character.melee && checkEquip){
        console.log('ashjfgashgdfjhkg')
        element.id = 'equippedMelee'
        }
    return element;
}

function createPassiveInv(key, item){
    const element = createElement('div', 'inventoryItem')
    const Img = createElement('img', null, {src:item.sprite != null || item.sprite != undefined ? item.sprite : "images/Coin.png"})
    const itemText = createElement('p', null, {textContent:key})
    element.appendChild(Img)
    element.appendChild(itemText)
    return element;
}

function createMaterial(key, item){
    const element = createElement('div', 'inventoryItem')
    const Img = createElement('img', null, {src:item.sprite != null || item.sprite != undefined ? item.sprite : "images/Coin.png"})
    const itemText = createElement('p', null, {textContent: item.amount + ":" + key})
    element.appendChild(Img)
    element.appendChild(itemText)
    return element;
}
//makes the inventory, handles all events and such
function createInventory(){
    topLeft.classList.toggle('invisible')
    menu = true
    overlay.innerHTML = ''
    const inventory = document.createElement('div')
    inventory.id = 'inventory'
    overlay.appendChild(inventory)
    const exit = document.createElement('div')
    exit.textContent = "X"
    exit.classList.add('exit')
    exit.addEventListener('click', function(){
        menu = false
        topLeft.classList.toggle('invisible')
        overlay.innerHTML = ''
        overlay.classList.toggle('invisible')
    })
    inventory.appendChild(exit)
    const sideBar = document.createElement('div')
        sideBar.classList.add('sideBar')
    const playerImgCont = document.createElement('div')
        playerImgCont.classList.add('playerImgContainer')
    const playerDisplay = document.createElement('div')
        playerDisplay.style.width = character.width + 'px'
        playerDisplay.style.height = character.height + 'px'
        playerDisplay.style.backgroundColor = character.color
    const health = document.createElement('div')
        health.textContent = `Health: ${character.health}`
    const stamina = document.createElement('div')
        stamina.textContent = `stamina: ${Math.floor(character.stamina)}`
    const areaAmount = createElement('div', null, {textContent:`Area: ${areaCount}`})
    if(character.sprite != null) playerDisplay.style.backgroundImage = character.sprite
    inventory.appendChild(sideBar) 
    sideBar.appendChild(playerImgCont) //player img
    playerImgCont.appendChild(areaAmount)
    playerImgCont.appendChild(playerDisplay)
    playerImgCont.appendChild(health)
    playerImgCont.appendChild(stamina)
    playerImgCont.innerHTML += `<div id="wallet"><img src="images/Coin.png" id="Coin">$<div id="walletDisplay">${character.wallet}</div></div>`
    for(let i = 0; i < Object.keys(character.stats).length; i++){ //stats
       const statDisplay = document.createElement('div')
       statDisplay.textContent = `${Object.keys(character.stats)[i]} : ${character.stats[Object.keys(character.stats)[i]]}`
       sideBar.appendChild(statDisplay)
    }
    const itemSection = createElement('div', null, {id:'itemSection'})
        inventory.appendChild(itemSection)
    const meleeHeader = createElement('h1', null, {textContent:'Melee'})
        itemSection.appendChild(meleeHeader)
    const meleeSection = createElement('div', 'sectionOfInventory')
        itemSection.appendChild(meleeSection)
    const equipped = createMeleeInv(character.melee)
        meleeSection.appendChild(equipped)
        const meleeEquipped = character.melee //characters melee on inventory open
    equipped.addEventListener('click', (e) => {
        if(meleeEquipped != character.melee){
            const currentEquipped = character.melee
            character.melee = meleeEquipped
            character.meleeInventory[character.meleeInventory.indexOf(meleeEquipped)] = currentEquipped
            const element = document.getElementById('equippedMelee');
            element.id = '';
            equipped.id = 'equippedMelee';
        }
    })
    //melee stuff
    for(let i = 0; i < character.meleeInventory.length; i++){
        const melee = character.meleeInventory[i]
        const meleeDisplay = createMeleeInv(melee)
        meleeSection.appendChild(meleeDisplay)
        meleeDisplay.addEventListener('click', (e) => {
            if(melee != character.melee){
                const currentEquipped = character.melee
                character.melee = melee
                character.meleeInventory[character.meleeInventory.indexOf(melee)] = currentEquipped
                const element = document.getElementById('equippedMelee');
                element.id = '';
                meleeDisplay.id = 'equippedMelee';
            }
        })
    }
    //passive stuff
    if(Object.keys(character.passiveItems).length > 0){
        const passiveHeader = createElement('h1', null, {textContent:'Passive'})
        itemSection.appendChild(passiveHeader)
        const passiveSection = createElement('div', 'sectionOfInventory')
        itemSection.appendChild(passiveSection)
        for(let i = 0; i < Object.keys(character.passiveItems).length; i++){
            const key = Object.keys(character.passiveItems)[i]
            const element = createPassiveInv(key, character.passiveItems[key])
            passiveSection.appendChild(element)
        }
    }
    //material stuff
    if(Object.keys(character.materials).length > 0){
        const materialsHeader = createElement('h1', null, {textContent:'Materials'})
        itemSection.appendChild(materialsHeader)
        const materialsSection = createElement('div', 'sectionOfInventory')
        itemSection.appendChild(materialsSection)
        for(let i = 0; i < Object.keys(character.materials).length; i++){
            const key = Object.keys(character.materials)[i]
            const element = createMaterial(key, character.materials[key])
            materialsSection.appendChild(element)
        }
    }

}

const controls = { //holds the controls of the game
    'up' : 'w',
    'left' : 'a',
    'down' : 's',
    'right' : 'd',
    'interact' : 'e',
    'map' : 'm',
    'inventory' : 'q'
}

keyBinds.addEventListener('click', (e) => { //resign buttons, terrible code written at 1 am
    for(let i = 1; i < panel.children.length; i++){ //removes other buttons
        panel.children[i].classList.add('invisible')
    }
    const values = [] //saves values
    const containers = [] //saves containers
    for(let i = 0; i < Object.keys(controls).length; i++){ //for each control
        const container = document.createElement('div') 
        container.textContent = Object.keys(controls)[i] //gets the text for each keybind
        const input = document.createElement('div')
        input.textContent = controls[Object.keys(controls)[i]]  //displays the current control
        input.addEventListener('click', (e) => { //event listener for input
            input.textContent = 'Press Key to change Bind'
            function changeBind(e){
                if(e.key == controls.up || e.key == controls.left || e.key == controls.right || e.key == controls.down || e.key == controls.interact){ ///if matches another bind
                    input.textContent = 'Conflict with other binds'
                }
                else{
                    input.textContent = e.key //shows the new key
                }
                document.removeEventListener('keydown', changeBind) //removes the keydown event listener
            }
            document.addEventListener('keydown', changeBind)
        })
        values.push(input) //saves input
        containers.push(container) //saves containers
        container.appendChild(input)
        panel.appendChild(container)
    }
    const saveChanges = document.createElement('div') //button to save changes
    saveChanges.textContent = 'Save Changes'
    containers.push(saveChanges)
    panel.appendChild(saveChanges)
    saveChanges.addEventListener('click', (e) => {
        for(let i = 0; i < values.length; i++){
            if(values[i].textContent === 'Conflict with other binds'){
                return false; //ensures you cannot save with conflicting binds
            }
            else{
                controls[Object.keys(controls)[i]] = values[i].textContent //updates binds
            }
        }
        for(let i = 0; i < containers.length; i++){
            containers[i].remove() //removes the button divs
        }
        for(let i = 1; i < panel.children.length; i++){
            panel.children[i].classList.remove('invisible') //readds the old buttons
        }
    })
})