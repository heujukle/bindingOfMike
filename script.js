let width = Math.ceil(window.innerWidth / 20);
let height = Math.ceil(window.innerHeight / 10);
console.log(height)

let canvas = document.getElementById('screen')
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const startingArea = new area()

let character = new player();
character.addItem(passives[2])
//end entities segement

character.setArea(startingArea);

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
    }
})

document.addEventListener('click', (e) => { //uses players selected item
    if(!menu) character.usableItemList.get(character.selectedItem)(e);
    })


// document.addEventListener('keydown', (e) => {
//     if(e.key === 'c'){
//         menu = !menu;
//         document.getElementById('console').classList.toggle('invisible');
//         if(menu == true){
//         println('Player cords:' + character.x + "," + character.y)
//         println('Structure:' + structures.list.length)
//         println('entities:' + entities.list.length)
//         println('damageInstances:' + damageInstances.list.length)
//         console.log(damageInstances.list)
//         println('area:' + character.area.map.keys().length)
//         println('')
//         }
//     }
// })

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
            character.iFrames = character.stats['dashSpeed']
            staminaBar.style = `width: ${character.stamina / character.stats['maxStamina'] * 100}%;`
        }
        if(e.key == controls.left && !character.directionList.includes('left')){
            character.xVelocity -= character.stats['dashSpeed']
            character.stamina -= 25;
            character.iFrames = character.stats['dashSpeed']
            staminaBar.style = `width: ${character.stamina / character.stats['maxStamina'] * 100}%;`
        }
        if(e.key == controls.up && !character.directionList.includes('up')){
            character.yVelocity -= character.stats['dashSpeed']
            character.stamina -= 25;
            character.iFrames = character.stats['dashSpeed']
            staminaBar.style = `width: ${character.stamina / character.stats['maxStamina'] * 100}%;`
        }
        if(e.key == controls.down && !character.directionList.includes('down')){
            character.yVelocity += character.stats['dashSpeed']
            character.stamina -= 25;
            character.iFrames = character.stats['dashSpeed']
            staminaBar.style = `width: ${character.stamina / character.stats['maxStamina'] * 100}%;`
        }
    }
})

document.addEventListener('keyup', doublePressEvent)