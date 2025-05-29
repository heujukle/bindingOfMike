let width = Math.ceil(1920 / 20);
let height = Math.ceil(945 / 10);
const defaultWidth = Math.ceil(1920 / 20);
const defaultHeight = Math.ceil(945 / 10);
let prevWindowWidth = 1920;
let prevWindowHeight = 945;
console.log(height)
console.log(window.innerHeight)
console.log(window.innerWidth)
let canvas = document.getElementById('screen')
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight; //default of 945
canvas.width = window.innerWidth; //default of 1920
let buffer = false;
let username = "Unnamed"

const startingArea = new area()


let character = new player();
character.addItem(passiveItemSrc['flame turret']);
// all items start
// for(const item of passives){
//     character.addItem(item);
// }
// for(const melee of meleeItems){
//     character.meleeInventory.push(melee.item(character))
//     character.meleeInventory.push(melee.item(character))
// }
// dropItems(bones, character)
// dropItems(cloth, character)
// dropItems(evilCloth, character)
//all items end

//end entities segement

character.setArea(startingArea, false);

resize()
window.requestAnimationFrame(animate);

document.addEventListener('keydown', (e) => { //adds action to player
    switch(e.key){
        case controls.up:
            if(character.directionList.indexOf('up') == -1){
            character.directionList.push('up')
            }
            break;
            case controls.left:
                if(character.directionList.indexOf('left') == -1){
                    character.directionList.push('left')
                    }
                break;
                case controls.down:
                    if(character.directionList.indexOf('down') == -1){
                        character.directionList.push('down')
                        }
                    break;
                    case controls.right:
                        if(character.directionList.indexOf('right') == -1){
                            character.directionList.push('right')
                            }
                        break;
                        case controls.interact:
                        if(character.directionList.indexOf('interact') == -1){
                            character.directionList.push('interact')
                            }
                        break;
    }
})

document.addEventListener('keyup', (e) => { //removes action
    switch(e.key){
        case controls.up:
            character.directionList.splice(character.directionList.indexOf('up'), 1);
            break;
            case controls.left:
                character.directionList.splice(character.directionList.indexOf('left'), 1);
                break;
                case controls.down:
                    character.directionList.splice(character.directionList.indexOf('down'), 1);
                    break;
                    case controls.right:
                        character.directionList.splice(character.directionList.indexOf('right'), 1);
                        break;
                        case controls.interact:
                            character.directionList.splice(character.directionList.indexOf('interact'), 1);
                            break;
                            case controls.unstuck:
                                unstuck(character)
                                break;
    }
})

document.addEventListener('click', (e) => { //uses players selected item
    if(!menu) character.usableItemList.get(character.selectedItem)(e);
    })


function unstuck(player){
    if(collision2(player, structures)){
    for(let i = 1; i < player.room.layout.length; i++){
        for(let j = 0; j < player.room.layout[0].length; j++){
            if(player.room.layout[i][j] === 0){
                player.y = i * height;
                player.x = j * width;
                return;
            }
        }
    }
}
}

document.addEventListener('keydown', (e) => {
    if(e.key === 'c'){
        menu = !menu;
        document.getElementById('console').classList.toggle('invisible');
        if(menu == true){
        println("room width: " + character.room.width)
        println("room height: " + character.room.height)
        println("stored window size: " + JSON.stringify(character.room.lastEnteredDimensions))
        println('screen width:' + window.innerWidth)
        println('screen height:' + window.innerHeight)
        println('----------------------------------------')
        }
    }
})

document.addEventListener('wheel', (e) => {
    if (e.deltaY > 0) {
        // Scrolling down
        character.hotBarChange('down')
      } else {
        // Scrolling up
        character.hotBarChange('up')
      }
})

const test = (key) => {
    console.log("double press " + key)
}

function isAControl(key){
    switch(key){
        case controls.up:
            return 'upKey'
            case controls.left:
                return 'leftKey'
                case controls.down:
                    return 'downKey'
                    case controls.right:
                        return 'rightKey'
    }
    return null
}

function doublePress(func){ //sets double press for dash
    const selectedInputs = { //saves value since last input
        'upKey' : 0,
        'leftKey' : 0,
        'downKey' : 0,
        'rightKey' : 0
    }
    return function(e){
        const keyUse = isAControl(e.key)
        if(keyUse != null){
            let currentPress = new Date().getTime()
            let timeSinceLastPress = currentPress - selectedInputs[keyUse]
            if(timeSinceLastPress < 300){  //time since last key press is less than 300
                e.preventDefault()
                console.log(`the key ${e.key} was double pressed`)
                func(e)
            }
            selectedInputs[keyUse] = currentPress
        }
        else {return}
    }
}

const doublePressEvent = doublePress(function(e){ //adds function to double press listener
    if(character.stamina >= 25){
        if(e.key == controls.right && !character.directionList.includes('right')){
            character.xVelocity += character.stats['dashSpeed']
            character.stamina -= 25;
            character.iFrames = character.stats['dashSpeed'] + 10
            staminaBar.style = `width: ${character.stamina / character.stats['maxStamina'] * 100}%;`
        }
        if(e.key == controls.left && !character.directionList.includes('left')){
            character.xVelocity -= character.stats['dashSpeed']
            character.stamina -= 25;
            character.iFrames = character.stats['dashSpeed'] + 10
            staminaBar.style = `width: ${character.stamina / character.stats['maxStamina'] * 100}%;`
        }
        if(e.key == controls.up && !character.directionList.includes('up')){
            character.yVelocity -= character.stats['dashSpeed']
            character.stamina -= 25;
            character.iFrames = character.stats['dashSpeed'] + 10
            staminaBar.style = `width: ${character.stamina / character.stats['maxStamina'] * 100}%;`
        }
        if(e.key == controls.down && !character.directionList.includes('down')){
            character.yVelocity += character.stats['dashSpeed']
            character.stamina -= 25;
            character.iFrames = character.stats['dashSpeed'] + 10
            staminaBar.style = `width: ${character.stamina / character.stats['maxStamina'] * 100}%;`
        }
    }
})

document.addEventListener('keyup', doublePressEvent)

window.addEventListener('resize', (e) => {
    resize();
})

//default will just resize the window using global previous values, values will use specific pervious values, it will also skip 
function resize(overrideWidth = null, overrideHieght = null){ 
    buffer = true
    roomChangeBody(character);
    character.room.newRoomLoad();
    console.log("resized")
    width = Math.ceil(window.innerWidth / 20);
    height = Math.ceil(window.innerHeight / 10);
    character.room.width = character.room.layout[0].length * width
    character.room.height = character.room.layout.length * height
    if(character.room.dynamicCamera === true){
        character.fixCamera();
        queueRecenter();
    }
    if(overrideWidth === null && overrideHieght === null){ //for an default function
        handleResize(structures.list)
        handleResize([character])
        handleResize(entities.list);
        handleResize(interactables.list);
        handleResize(damageInstances.list);
    }
    else{
        handleResize(interactables.list, overrideWidth, overrideHieght);
        handleResize(entities.list, overrideWidth, overrideHieght);
    }
    cordOffsets([character]);
    cordOffsets(entities.list);
    character.room.lastEnteredDimensions.width = character.room.width;
    character.room.lastEnteredDimensions.height = character.room.height;
    prevWindowHeight = window.innerHeight;
    prevWindowWidth = window.innerWidth;
    canvas.height = window.innerHeight; 
    canvas.width = window.innerWidth; 
    setTimeout(()=>{
        adjustSize(entities.list)
        buffer = false}, 1000)
}


let recenterQueue = false;
function queueRecenter(){
    if(recenterQueue == false){
        recenterQueue = true
        setTimeout(()=>{
            character.recenter()
            recenterQueue = false;
        
        },
        750)
    }
    else{
        console.log('overinput')
    }
}
