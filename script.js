let width = Math.ceil(window.innerWidth / 20);
let height = Math.ceil(window.innerHeight / 10);
console.log(height)

let canvas = document.getElementById('screen')
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let room1LO = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]

const room1 = new room(room1LO);

console.log(Math.random())
console.log(determineValueArray(78, [1, 2, 3, 4, 5]))
const startingArea = new area()

let character = new player();
entities.add(character);
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
    }
    console.log(character)
})

document.addEventListener('click', (e) => {
    character.directionList.push('shoot')
    character.directionList.push(function(){
        let centerX = character.x + character.width / 2
        let centerY = character.y + character.height / 2
        console.log("shoot")
        let x = e.x - centerX;
        let y = e.y - centerY;
        let radians = Math.atan(x/y);
        let degrees = toDegrees(radians);
        if(e.x < character.x && e.y > character.y){
            console.log('1')
            degrees = Math.abs(degrees) + 270;
        }
        else if(e.x > character.x && e.y > character.y){
            console.log('2')
            degrees = 90 -Math.abs(degrees) + 180;


        }
        else if(e.x > character.x && e.y < character.y){
            console.log('3')
            degrees = Math.abs(degrees) + 90;
        }
        else{
            console.log('4')
            degrees = 90 - Math.abs(degrees);
        }
        if(degrees >= 45 && degrees < 135){
            let xVelocity = ((135 - 45) - degrees) / character.pVelocityModifier * -2
            let yVelocity = 90 / character.pVelocityModifier * -1
            console.log("xv:", xVelocity, 'yv', yVelocity)
            entities.add(new projectile(centerX, centerY, 20, 20, xVelocity, yVelocity, 'player'))
        }
        else if(degrees >= 135 && degrees < 225){
            let yVelocity = ((225 - 45) - degrees) / character.pVelocityModifier * -2
            let xVelocity = 90 / character.pVelocityModifier
            console.log("xv:", xVelocity, 'yv', yVelocity)
            entities.add(new projectile(centerX, centerY, 20, 20, xVelocity, yVelocity, 'player'))
        }
        else if(degrees >= 225 && degrees < 315){
            let xVelocity = ((315 - 45) - degrees) / character.pVelocityModifier * 2
            let yVelocity = 90 / character.pVelocityModifier
            console.log("xv:", xVelocity, 'yv', yVelocity)
            entities.add(new projectile(centerX, centerY, 20, 20, xVelocity, yVelocity, 'player'))
        }
        else{
            let yVelocity = (circularSub((405 - 45), degrees)) / character.pVelocityModifier * 2
            let xVelocity = 90 / character.pVelocityModifier * -1
            console.log("xv:", xVelocity, 'yv', yVelocity)
            entities.add(new projectile(centerX, centerY, 20, 20, xVelocity, yVelocity, 'player'))
        }
        console.log('x:', x, " y:", y, " radians:", radians, ' degrees:', degrees)
    })
})