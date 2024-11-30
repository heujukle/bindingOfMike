let fps = 60; //frames per second
let lastUpdate = document.timeline.currentTime; //last time since frame update
const rooms = [
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
]

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
    }
    
}

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

function createString(value, length){ //will craete a string with a certain number of sigits
    let result = ''
    for(let i = 0; i < length; i++){
        result += value
    }
    return result
}

function determineValue(input){ //will determine value to be returned of a random seed
    console.log(arguments.length)
    input += ''
    const digits = input.length;
    const max = Number(createString(9, digits))
    const intervals = Math.floor(max/(arguments.length - 1)) //interval between choices
    input = Number(input)
    console.log(digits, max, intervals)
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

function generateAreaLayout(seed){
    seed += ''
    let roomBudget = 30;
    function generateRoom(seed){ 
        seed += ''
        const layout = determineValueArray(seed[7] + seed[10], rooms).map(function(arr) {
            return arr.slice();
        });
        console.log(layout)
        let left = determineValue(seed[3], true, false) && roomBudget > 0 ? true : false;
        if(left == true){
            roomBudget -= 1
        }
        const right = determineValue(seed[4], true, false) && roomBudget > 0 ? true : false;
        if(right == true){
            roomBudget -= 1
        }
        const top = determineValue(seed[5], true, false) && roomBudget > 0 ? true : false;
        if(top == true){
            roomBudget -= 1
        }
        const bottom = determineValue(seed[6], true, false) && roomBudget > 0 ? true : false;
        if(bottom == true){
            roomBudget -= 1
        }
        if(bottom == false && top == false && left == false && right == false && roomBudget > 0){
            left = true
            roomBudget -= 1
        }

    }
    generateRoom(Math.random())
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
    }


    draw(){
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#000000";
        ctx.fill();
        ctx.closePath();
    }
}

class area{
    constructor(layout){
        this.layout = layout;
    }
}

class room{
    constructor(layout){
        this.layout = this.convertLayout(layout) //converts layout to a map
        this.left = null;
        this.right = null;
        this.top = null;
        this.bottom = null;
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
        for(let i = 0; i < keys.length; i++){
            if(this.layout.get(keys[i]).type != 'space'){
                this.layout.get(keys[i]).draw() 
                structures.add(this.layout.get(keys[i]))
            }
        }
        console.log(structures.list)
        let filler = document.createElement('div')
        filler.classList.add('filler')
        const top = this.layout.get(keys[199]).top;
        filler.style.top = top + 'px'
        filler.style.height = window.innerHeight - top + 'px'
        document.getElementsByTagName('body')[0].appendChild(filler)
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
            if(this.collision2(structures.list)){
                console.log('fixed', this.fixedIncrement)
                this.y += this.fixedIncrement;
                this.fixedIncrement = 5;
            }
        }
        if(this.directionList.indexOf('left') != -1){
            this.x -= 5
            if(this.collision2(structures.list)){
                console.log('fixed', this.fixedIncrement)
                this.x += this.fixedIncrement;
                this.fixedIncrement = 5;
            }
        }
        if(this.directionList.indexOf('down') != -1){
            this.y += 5
            if(this.collision2(structures.list)){
                console.log('fixed', this.fixedIncrement)
                this.y -= this.fixedIncrement;
                this.fixedIncrement = 5;
            }
        }
        if(this.directionList.indexOf('right') != -1){
            this.x += 5
            if(this.collision2(structures.list)){
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

    collision2(target) {
        const left = this.x;
        const right = this.x + this.width;
        const top = this.y;
        const bottom = this.y + this.height;
        
        for (let i = 0; i < target.length; i++) {
            const tleft = target[i].x;
            const tright = target[i].x + target[i].width;
            const ttop = target[i].y;
            const tbottom = target[i].y + target[i].height;
            
            // Check if the rectangles are overlapping
            if (right > tleft && left < tright && bottom > ttop && top < tbottom) {
                // Collision detected
                return true;
                // You can add further collision handling logic here (e.g., bounce, stop movement, etc.)
            }
        }
        return false;
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
    //     let tl = getCorner("tl", this);
    //     let tr = getCorner("tr", this);
    //     let bl = getCorner("bl", this);
    //     let br = getCorner("br", this);
    //     let mr = getCorner("mr", this);
    //     let ml = getCorner("ml", this);
    //     let mt = getCorner("mt", this);
    //     let mb = getCorner("mb", this);

    //    if(this.detectStructures([tl, tr, bl, br, mr, ml, mt, mb]) == true){
    //     console.log("horray")
    //     entities.remove(this.index);
    //    }

        if(this.collision2(structures.list)){
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

    collision2(target) {
        const left = this.x;
        const right = this.x + this.width;
        const top = this.y;
        const bottom = this.y + this.height;
        
        for (let i = 0; i < target.length; i++) {
            const tleft = target[i].x;
            const tright = target[i].x + target[i].width;
            const ttop = target[i].y;
            const tbottom = target[i].y + target[i].height;
            
            // Check if the rectangles are overlapping
            if (right > tleft && left < tright && bottom > ttop && top < tbottom) {
                // Collision detected
                return true;
                // You can add further collision handling logic here (e.g., bounce, stop movement, etc.)
            }
        }
        return false;
    }
}

function animate() {
    if (document.timeline.currentTime - lastUpdate > 1000 / fps) {
      lastUpdate = document.timeline.currentTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      structures.draw();
      entities.draw();
    } 
    window.requestAnimationFrame(animate);
}

function setFPS(target){
    fps = target;
}