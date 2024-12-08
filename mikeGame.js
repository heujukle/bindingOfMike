let fps = 120; //frames per second
let lastUpdate = document.timeline.currentTime; //last time since frame update
const rooms = [
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
     [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1], 
        [1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1], 
        [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 'lt', 0, 1], 
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, "lt", 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 'lt', 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 'z', 0, 0, 0, 0, 0, 'z', 0, 0, 0, 0, 0, 0, 'lt', 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'z', 0, 1], 
        [1, 0, 'z', 1, 0, 0, 0, 0, 0, 0, 'z', 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 'z', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'lt', 0, 1, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 'z', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
        [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
            [1, 0, 0, 'z', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'z', 0, 0, 'z', 0, 1], 
            [1, 0, 'z', 0, 0, 0, 0, 0, 'z', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], 
            [1, 0, 'z', 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], 
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], 
            [1, 0, 0, 0, 0, 'z', 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1], 
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 'z', 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'z', 0, 1], 
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
]

let menu = true;
let fConsole = document.getElementById('console');
let zombieSpeed = 4;

document.addEventListener('error', (e) => {
    fConsole.classList.add('visible')
    println(e)
})

function println(input){
    fConsole.innerHTML += input + '<br>'
}

const createWall = (x, y, width, height)  => {
    structures.add(new wall(x, y, width, height))
}

const createTurret = (x, y, width, height, key) => {
    structures.add(new turret(x, y, width, height, key))
}

const createDummy = (x, y, width, height) => { //function to make dummys
    entities.add(new dummy(x, y, width, height))
}

const createZombie = (x, y, width, height) => { //function to make dummys
    entities.add(new zombie(x, y, 30, 30, character, zombieSpeed))
}

const tiles = new Map([ //holds all the possible tiles and functions to build them
    [0, function(){
        return;
    }],
    [1, createWall],
    ['lt', createTurret],
    ['d', createDummy],
    ['z', createZombie]
])

const structures = { //loads structures
    list: [],
    add: function(entity){ //adds structures to the rendering
        entity.index = this.list.length;
        this.list.push(entity);
    },
    remove: function(index){ ///removes structures from rendering
        this.list.splice(index, 1);
    },
    draw: function (){ //draws all items 
        for(let i = 0; i < this.list.length; i++){
            this.list[i].draw();
        }
    },
    resetList: function(){
        this.list = []
    }, 
    check: function(){
        return true;
    }
}

const entities = { // loads entities
    list: [],
    add: function(entity){
        if(this.list.indexOf(null) != -1){
            entity.index = this.list.indexOf(null)
            this.list[this.list.indexOf(null)] = entity;
        }
        else{
            entity.index = this.list.length;
            this.list.push(entity)
        }
    },
    remove: function(index){
        this.list[index] = null;
    },
    draw: function (){
        for(let i = 0; i < this.list.length; i++){
            if(this.list[i]){
            this.list[i].draw();
            }
        }
    },
    clear: function(){
        this.list = []
    },
    check: function(entity, original){ //true means check
            if(original.iframes == 0){
                return true;
            }
            if(entity === null){
                return false;
            }
            if(entity.behavior == 'static'){ 
                return true;
            }
            if(entity.target.iFrames == 0){ 
                return true;
            }
            return false;
    }
    
}

const damageInstances = {
    list: [],
    add: function(entity){
        if(this.list.indexOf(null) != -1){
            entity.index = this.list.indexOf(null)
            this.list[this.list.indexOf(null)] = entity;
        }
        else{
            entity.index = this.list.length;
            this.list.push(entity)
        }
        return entity.index;
    },
    remove: function(index){
        this.list[index] = null;
    },
    draw: function (){
        for(let i = 0; i < this.list.length; i++){
            if(this.list[i]){
            this.list[i].draw();
            }
        }
    },
    clear: function(){
        for(let i = 0; i < this.list.length; i++){
            if(this.list[i]){
            this.list[i].animating = false;
            }
        }
        this.list = []
    }
    
}

function toDegrees(radians) {
    return radians * (180 / Math.PI);
  }

function circularSub(number, otherNumber){
    if (otherNumber < 45){
        otherNumber += 360;
    }
    return number - otherNumber;
}

function getCorner(target, entity){ //takes finds the corner cord of the player, takes tl, tr, bl, br, ml, mr, mt, mb as inputs should maybe update to dynamically make enough points to cover the character
    switch(target){
        case "tl":
            return [entity.x, entity.y];
        case "tr":
            return [entity.x + entity.width, entity.y];
        case "bl":
            return [entity.x, entity.y + entity.height];
        case "br":
            return [entity.x + entity.width, entity.y + entity.height];
        case "ml":
             return [entity.x, entity.y + (entity.height / 2)];
        case "mr":
             return [entity.x + entity.width, entity.y + (entity.height / 2)];
        case "mt":
             return [entity.x + (entity.width / 2), entity.y];
        case "mb":
             return [entity.x + (entity.width / 2), entity.y + entity.height];
             //returns [x, y]
    }
}

function getPoints(num, object){ //returns an array of points to text for collision, needs some work on corners
    let xInc = object.width/num;
    let yInc = object.height/num;
    let result = []
    for(let i = 0; i < num; i++){ 
        result.push(new point(object.x + xInc * i, object.y)) //top, starts top left
        result.push(new point(object.x + object.width - xInc * i, object.y + object.height)) //bottom, starts bottom right
        result.push(new point(object.x, object.y + object.height - yInc * i)) //left, starts bottom left
        result.push(new point(object.x + object.width, object.y + yInc * i)) //right, starts top right
    }
    return result;
}

function inSpace(cord){ //finds what square the cord [left, top] is in returns the cords of the space
    let y = 0
    let x = 0
    for(let i = 0; i < 10; i++){ //goes through the rows
        if(y > cord[1]){ //checks if in room
            for(let j = 0; j < 20; j++){ //goes through the columns, if I want to make larger rooms then im fucked 
                if(x > cord[0]){ //checks if in square
                    // console.log(''+ (x + width) + ', ' + (y - height))
                    return ''+ (x - width) + ', ' + (y - height); //returns the cords in string format
                }
                x+=width
            }
        }
        y += height; //increments room
    }
}

function createString(value, length){ //will craete a string with a certain number of sigits
    let result = ''
    for(let i = 0; i < length; i++){
        result += value
    }
    return result
}

function determineValue(input){ //will determine value to be returned of a random seed
    input += ''
    const digits = input.length;
    const max = Number(createString(9, digits))
    const intervals = Math.floor(max/(arguments.length - 1)) //interval between choices
    input = Number(input)
    for(let i = 1; i < arguments.length; i++){
        if(i == 1){ //start
            if(input >= 0 && input <= intervals){  //checks if the number is greater than equal to 0
                return arguments[i];
            }
        }
        else if(i + 1 == arguments.length){//finish
            if(input > intervals * (i - 1)){ //checks if the input is greater than the final interval
                return arguments[i];
            }
        }
        else{//all else
            if(input > intervals * (i-1) && input <= intervals * i){ //checks if the input is in between the last interval and the current
                return arguments[i];
            }
        }
    }
}

function determineValueArray(input, options){ //will determine value to be returned of a random seed
    input += ''
    const digits = input.length;
    const max = Number(createString(9, digits))
    const intervals = Math.floor(max/(options.length)) //interval between choices
    input = Number(input)
    for(let i = 0; i < options.length; i++){
        if(i == 0){ //start
            if(input >= 0 && input <= intervals){  //checks if the number is greater than equal to 0
                return options[i];
            }
        }
        else if(i + 1 == options.length){//finish
            if(input > intervals * i){ //checks if the input is greater than the final interval
                return options[i];
            }
        }
        else{//all else
            if(input > intervals * i && input <= intervals * (i+1)){ //checks if the input is in between the last interval and the current
                return options[i];
            }
        }
    }
}

function findDegrees(x1, y1, x2, y2){
    let x = x1 - x2;
    let y = y1 - y2;
    let radians = Math.atan(x/y);
    let degrees = toDegrees(radians);
    if(x1 < x2 && y1 > y2){
        degrees = Math.abs(degrees) + 270;
    }
    else if(x1 > x2 && y1 > y2){
        degrees = 90 -Math.abs(degrees) + 180;


    }
    else if(x1 > x2 && y1 < y2){
        degrees = Math.abs(degrees) + 90;
    }
    else{
        degrees = 90 - Math.abs(degrees);
    }
    return degrees;
}

function findDistance(x1, y1, x2, y2){
    let x = x1 - x2;
    let y = y1 - y2;
    return Math.sqrt(x * x + y * y)
}

function moveEntitiy(entitiy, xChange, yChange){
    entitiy.x += xChange
    entitiy.y += yChange
    if(collision2(entitiy, structures) || collision2(entitiy, entities)){
        entitiy.y -= yChange;
        entitiy.x -= xChange;
    }
}

function collision2(entitiy, target) {
    let targetList = target.list
    const left = entitiy.x;
    const right = entitiy.x + entitiy.width;
    const top = entitiy.y;
    const bottom = entitiy.y + entitiy.height;
    
    for (let i = 0; i < targetList.length; i++) {
        if(((targetList[i] !== entitiy) && target.check(targetList[i], entitiy)) && targetList[i] != null){ //check for entities returns if it is static
            const tleft = targetList[i].x;
            const tright = targetList[i].x + targetList[i].width;
            const ttop = targetList[i].y;
            const tbottom = targetList[i].y + targetList[i].height;
            
            // Check if the rectangles are overlapping
            if (right > tleft && left < tright && bottom > ttop && top < tbottom) {
                // Collision detected
                return true;
                // You can add further collision handling logic here (e.g., bounce, stop movement, etc.)
                }
            }
        }
    return false;
}

class point{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

function animate() {
    if (document.timeline.currentTime - lastUpdate > 1000 / fps && !menu) {
      lastUpdate = document.timeline.currentTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      structures.draw();
      entities.draw();
      character.draw();
      damageInstances.draw();
    } 
    window.requestAnimationFrame(animate);
}

function setFPS(target){
    fps = target;
}

const structJS = document.createElement('script')
structJS.src = 'structures.js'
const playerJS = document.createElement('script')
playerJS.src = 'player.js'
const entitiesJS = document.createElement('script')
entitiesJS.src = 'entities.js'
const damageInstanceJS = document.createElement('script')
damageInstanceJS.src = 'damageInstance.js'
document.getElementsByTagName('body')[0].appendChild(structJS)
document.getElementsByTagName('body')[0].appendChild(playerJS)
document.getElementsByTagName('body')[0].appendChild(entitiesJS)
document.getElementsByTagName('body')[0].appendChild(damageInstanceJS)