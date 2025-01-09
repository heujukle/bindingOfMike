let width = Math.ceil(window.innerWidth / 20);
let height = Math.ceil(window.innerHeight / 10);
console.log(height)

let canvas = document.getElementById('screen')
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const startingArea = new area()

let character = new player();

//end entities segement

character.setArea(startingArea);

window.requestAnimationFrame(animate);

document.addEventListener('keydown', (e) => {
    switch(e.key){
        case 'w':
            if(character.directionList.indexOf('up') == -1){
            character.directionList.push('up')
            }
            break;
            case 'a':
                if(character.directionList.indexOf('left') == -1){
                    character.directionList.push('left')
                    }
                break;
                case 's':
                    if(character.directionList.indexOf('down') == -1){
                        character.directionList.push('down')
                        }
                    break;
                    case 'd':
                        if(character.directionList.indexOf('right') == -1){
                            character.directionList.push('right')
                            }
                        break;
                        case 'e':
                        if(character.directionList.indexOf('interact') == -1){
                            character.directionList.push('interact')
                            }
                        break;
    }
})

document.addEventListener('keyup', (e) => {
    switch(e.key){
        case 'w':
            character.directionList.splice(character.directionList.indexOf('up'), 1);
            break;
            case 'a':
                character.directionList.splice(character.directionList.indexOf('left'), 1);
                break;
                case 's':
                    character.directionList.splice(character.directionList.indexOf('down'), 1);
                    break;
                    case 'd':
                        character.directionList.splice(character.directionList.indexOf('right'), 1);
                        break;
                        case 'e':
                            character.directionList.splice(character.directionList.indexOf('interact'), 1);
                            break;
    }
})

document.addEventListener('click', (e) => {
    println('shoot')
    character.usableItemList.get(character.selectedItem)(e);
    })


document.addEventListener('keydown', (e) => {
    if(e.key === 'c'){
        menu = !menu;
        document.getElementById('console').classList.toggle('invisible');
        if(menu == true){
        println('Player cords:' + character.x + "," + character.y)
        println('Structure:' + structures.list.length)
        println('entities:' + entities.list.length)
        println('damageInstances:' + damageInstances.list.length)
        console.log(damageInstances.list)
        println('area:' + character.area.map.keys().length)
        println('')
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

function doublePress(func){
    const selectedInputs = {
        'w' : 0,
        'a' : 0,
        's' : 0,
        'd' : 0
    }
    return function(e){
        if(selectedInputs[e.key] != null && selectedInputs[e.key] != undefined){
            let currentPress = new Date().getTime()
            let timeSinceLastPress = currentPress - selectedInputs[e.key]
            if(timeSinceLastPress < 300){
                e.preventDefault()
                console.log(`the key ${e.key} was double pressed`)
                func(e)
            }
            selectedInputs[e.key] = currentPress
        }
        else {return}
    }
}

const doublePressEvent = doublePress(function(e){
    if(e.key == 'd' && !character.directionList.includes('right')){
        character.xVelocity += character.stats['dashSpeed']
    }
    if(e.key == 'a' && !character.directionList.includes('left')){
        character.xVelocity -= character.stats['dashSpeed']
    }
    if(e.key == 'w' && !character.directionList.includes('up')){
        character.yVelocity -= character.stats['dashSpeed']
    }
    if(e.key == 's' && !character.directionList.includes('down')){
        character.yVelocity += character.stats['dashSpeed']
    }
})

document.addEventListener('keyup', doublePressEvent)