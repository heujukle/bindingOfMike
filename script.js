const fps = 60;
const fpsTimer = Math.floor(1000/fps);
let width = Math.ceil(window.innerWidth / 20);
let height = Math.ceil(window.innerHeight / 10);
console.log(height)

let canvas = document.getElementById('screen')
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

//util
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
//end util

//structure segment ---------------------
const structures = {
    list: [],
    add: function(entity){
        entity.index = this.list.length;
        this.list.push(entity);
    },
    remove: function(index){
        this.list.splice(index, 1);
    },
    draw: function (){
        for(let i = 0; i < this.list.length; i++){
            this.list[i].draw();
        }
    }
    
}

class space{
    constructor(x, y, width, height){
        this.top = y
        this.left = x
        this.width = width
        this.height = height
        this.type = "space";
    }

    draw(){
        return;
    }
}

class wall {
    constructor(x, y, width, height){
        this.index;
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.type = 'wall'
        console.log(this.x, this.y, this.width, this.height)
    }


    draw(){
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#000000";
        ctx.fill();
        ctx.closePath();
    }
}

class room{
    constructor(layout){
        this.layout = this.convertLayout(layout) //converts layout to a map
        console.log(this.layout)
    }

    convertLayout(layout){
        let result = new Map() //
        let x = 0 //x and y cordninates of spaces
        let y = 0
        for(let i = 0; i < layout.length; i++){
            for(let j = 0; j < layout[0].length; j++){
                switch(layout[i][j]){
                    case 1:
                        result.set(''+ x + ', ' + y ,new wall(x, y, width, height)) //adds space to map with key of cordniates in an array [x, y]
                        x += width; //increments the x
                        break;
                    case 0:
                        result.set(''+ x + ', ' + y , new space(x, y, width, height))
                        x += width;
                        break;
                }
            }
            y += height;//increments y
            x = 0
        }
        return result; //returns map of room
    }

    roomLoad(){
        const keys = this.layout.keys().toArray();
        console.log(keys);
        for(let i = 0; i < keys.length; i++){
                this.layout.get(keys[i]).draw() //gets all the spaces in a single array thing
                structures.add(this.layout.get(keys[i]))
        }
        let filler = document.createElement('div')
        filler.classList.add('filler')
        const top = this.layout.get(keys[199]).top;
        filler.style.top = top + 'px'
        filler.style.height = window.innerHeight - top + 'px'
        document.getElementsByTagName('body')[0].appendChild(filler)
    }
}

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
//end structure ---------------------------------------------------------------

//entities segment ------------------------------------------------------------
const entities = {
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
    }
    
}

class player {
    constructor(){
        this.width = 50
        this.height = 50
        this.x = Math.ceil(window.innerWidth / 2);
        this.y = Math.ceil(window.innerHeight / 2);
        this.room = 'spawn'
        this.sections = []
        this.index = 0;
        this.directionList = [];
        this.fixedIncrement = 5;
        this.pVelocityModifier = 10;
    }
    
    draw(){
        this.updateMove()
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#FF0000";
        ctx.fill();
        ctx.closePath();
    }

    updateMove(){
        if(this.directionList.indexOf('up') != -1){
            this.y -= 5
            if(this.detectCollision('up')){
                console.log('fixed', this.fixedIncrement)
                this.y += this.fixedIncrement;
                this.fixedIncrement = 5;
            }
        }
        if(this.directionList.indexOf('left') != -1){
            this.x -= 5
            if(this.detectCollision('left')){
                console.log('fixed', this.fixedIncrement)
                this.x += this.fixedIncrement;
                this.fixedIncrement = 5;
            }
        }
        if(this.directionList.indexOf('down') != -1){
            this.y += 5
            if(this.detectCollision('down')){
                console.log('fixed', this.fixedIncrement)
                this.y -= this.fixedIncrement;
                this.fixedIncrement = 5;
            }
        }
        if(this.directionList.indexOf('right') != -1){
            this.x += 5
            if(this.detectCollision('right')){
                console.log('fixed', this.fixedIncrement)
                this.x -= this.fixedIncrement;
                this.fixedIncrement = 5;
            }
        }
        if(this.directionList.indexOf('shoot') != -1){
            this.directionList[this.directionList.indexOf('shoot') + 1]();
            this.directionList.splice(this.directionList.indexOf('shoot'), 2)
        }
    }

        //finish writing section detection algorithm
    startSection(){
        for(let i = 0; i < this.room.layout.length; i++){
            for(let j = 0; j < this.room.layout[0].length; j++){
                if(isOverlapping(this, this.room.layout[i][j])){
                    const obj = {
                        x: j,
                        y: i
                    }
                    this.sections.push(obj)
                    console.log(this)
                }
            }
        }
    }

    setRoom(room){
        this.room = room
        this.room.roomLoad()
    }

    detectCollision(direction){ //left, right, up, down
        let tl = this.room.layout.get(inSpace(getCorner("tl", this)));
        let tr = this.room.layout.get(inSpace(getCorner("tr", this)));
        let bl = this.room.layout.get(inSpace(getCorner("bl", this)));
        let br = this.room.layout.get(inSpace(getCorner("br", this)));
        let mr = this.room.layout.get(inSpace(getCorner("mr", this)));
        let ml = this.room.layout.get(inSpace(getCorner("ml", this)));
        let mt = this.room.layout.get(inSpace(getCorner("mt", this)));
        let mb = this.room.layout.get(inSpace(getCorner("mb", this)));
        switch(direction){
            case "left":
                if(tl && bl){
                    if(tl.type != 'space' || bl.type != 'space' || ml.type != 'space'){
                        return true
                    }
                    return false;
                }
                return false;
                //NEED TO FIX INCREMENTAL MOVING PROBALY A ROUNDING ERROR
            case "right":
                if(tr && br){
                    if(tr.type != 'space' || br.type != 'space' || mr.type != 'space'){
                        return true
                    }
                    return false;
                }
            case "up":
                if(tl && tr){
                    if(tl.type != 'space' || tr.type != 'space' || mt.type != 'space'){
                        return true
                    }
                    return false;
                }
            case "down":
                if(bl && br){
                    if(bl.type != 'space' || br.type != 'space' || mb.type != 'space'){
                        return true
                    }
                    return false;
                }
        }
    }
}

class projectile{
    constructor(startX, startY, width, height, xVelocity, yVelocity, source ,repeating = false, room = character.room){
        this.room = room;
        this.index;
        this.x = startX;
        this.y = startY;
        this.startX = startX;
        this.startY = startY;
        this.width = width;
        this.height = height;
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
        this.source = source;
        this.repeating = repeating;
    }


    draw(){
        this.x += this.xVelocity
        this.y += this.yVelocity
        this.detectCollision();
        if(this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0){
            if(this.repeating){
                this.x = this.startX;
                this.y = this.startY;
            }
            else{
                console.log('reset')
                entities.remove(this.index)
                return;
            }
        }
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#000000";
        ctx.fill();
        ctx.closePath();
    }

    detectCollision(){
        let tl = getCorner("tl", this);
        let tr = getCorner("tr", this);
        let bl = getCorner("bl", this);
        let br = getCorner("br", this);
        let mr = getCorner("mr", this);
        let ml = getCorner("ml", this);
        let mt = getCorner("mt", this);
        let mb = getCorner("mb", this);

       if(this.detectStructures([tl, tr, bl, br, mr, ml, mt, mb]) == true){
        console.log("horray")
        entities.remove(this.index);
       }

    }

    detectStructures(points){
        for(let i = 0; i < points.length; i++) {
            let cords = inSpace(points[i]);
            let space = this.room.layout.get(cords)
            if(space){
            console.log(space.type)
            if(space.type != 'space'){
                console.log('true')
                return true;
            }
        }
        }
    }
}

let character = new player();
entities.add(character);
//end entities segement

character.setRoom(room1);

let lastUpdate = document.timeline.currentTime;
window.requestAnimationFrame(animate);

function animate() {
  if (document.timeline.currentTime - lastUpdate > 1000 / 120) {
    lastUpdate = document.timeline.currentTime;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    structures.draw();
    entities.draw();
  } 
  window.requestAnimationFrame(animate);
}


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
            entities.add(new projectile(centerX, centerY, 20, 20, xVelocity, yVelocity))
        }
        else if(degrees >= 135 && degrees < 225){
            let yVelocity = ((225 - 45) - degrees) / character.pVelocityModifier * -2
            let xVelocity = 90 / character.pVelocityModifier
            console.log("xv:", xVelocity, 'yv', yVelocity)
            entities.add(new projectile(centerX, centerY, 20, 20, xVelocity, yVelocity))
        }
        else if(degrees >= 225 && degrees < 315){
            let xVelocity = ((315 - 45) - degrees) / character.pVelocityModifier * 2
            let yVelocity = 90 / character.pVelocityModifier
            console.log("xv:", xVelocity, 'yv', yVelocity)
            entities.add(new projectile(centerX, centerY, 20, 20, xVelocity, yVelocity))
        }
        else{
            let yVelocity = (circularSub((405 - 45), degrees)) / character.pVelocityModifier * 2
            let xVelocity = 90 / character.pVelocityModifier * -1
            console.log("xv:", xVelocity, 'yv', yVelocity)
            entities.add(new projectile(centerX, centerY, 20, 20, xVelocity, yVelocity))
        }
        console.log('x:', x, " y:", y, " radians:", radians, ' degrees:', degrees)
    })
})

function boundTest(limit){
    let x = Math.random() * limit;
    let y = Math.random() > 0.5 ? yBound(x) : -1 * yBound(x);
    console.log(x, y)
}

function yBound(x){
    let result = Math.random() * x;
    return result;
}

boundTest(6);