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
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]
]
let menu = true;
let fConsole = document.getElementById('console');

document.addEventListener('error', (e) => {
    fConsole.classList.add('visible')
    println(e)
})

function println(input){
    fConsole.innerHTML += input + '<br>'
}


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
    },
    clear: function(){
        this.list = [this.list[0]]
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
    console.log("shoot")
    let x = x1 - x2;
    let y = y1 - y2;
    let radians = Math.atan(x/y);
    let degrees = toDegrees(radians);
    if(x1 < x2 && y1 > y2){
        console.log('1')
        degrees = Math.abs(degrees) + 270;
    }
    else if(x1 > x2 && y1 > y2){
        console.log('2')
        degrees = 90 -Math.abs(degrees) + 180;


    }
    else if(x1 > x2 && y1 < y2){
        console.log('3')
        degrees = Math.abs(degrees) + 90;
    }
    else{
        console.log('4')
        degrees = 90 - Math.abs(degrees);
    }
    return degrees;
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

class turret{
    constructor(x, y, width, height, direction){
        this.index;
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.type = 'turret'
        this.direction = direction;
        this.tProjectile = null;
        if(this.direction == "left"){
            console.log('left')
            this.tProjectile = new projectile(this.x - 25, this.y + this.height / 2, 25, 25, -15, 0, 'turret', true, character.room, '#ff0000')
            damageInstances.add(this.tProjectile);
        }
        else if(direction == "up"){

        }
        else if(direction == "right"){

        }
        else if(direction == "down"){

        }
    }

    draw(){
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#4d4d4d";
        ctx.fill();
        ctx.closePath();
    }
}

class area{
    constructor(){
        this.map = new Map()
        this.generateAreaLayout(Math.random(), this.map)
    }

    generateAreaLayout(seed, map){
        let end = false;
        console.log(this.map)
        seed += ''
        let roomBudget = 30;
        function generateRoom(seed, cord, exclusion = []){ 
            const cordArray = cord.split(',')
            const x = parseInt(cordArray[0])
            const y = parseInt(cordArray[1])
            seed += ''
            let layout;
            if(roomBudget == 30){
                layout = [
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]
            }
            else if(roomBudget < 5 && end == false){
                end = true;
                console.log('end made')
                layout = [
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
                    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1], 
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
                    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1], 
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]
            }
            else{
                layout = determineValueArray(seed[7] + seed[10], rooms).map(function(arr) {
                    return arr.slice();
                });
            }
            let left = determineValue(seed[3], true, false) && roomBudget > 0 && exclusion.indexOf('left') == -1 ? true : false;
            if(left == true){
                layout[4][0] = 0;
                layout[5][0] = 0;
                roomBudget -= 1
            }
            let right = determineValue(seed[4], true, false) && roomBudget > 0 && exclusion.indexOf('right') == -1? true : false;
            if(right == true){
                layout[4][layout[4].length - 1] = 0;
                layout[5][layout[4].length - 1] = 0;
                roomBudget -= 1
            }
            let top = determineValue(seed[5], true, false) && roomBudget > 0 && exclusion.indexOf('top') == -1? true : false;
            if(top == true){
                layout[0][10] = 0;
                layout[0][11] = 0;
                roomBudget -= 1
            }
            let bottom = determineValue(seed[6], true, false) && roomBudget > 0 && exclusion.indexOf('bottom') == -1? true : false;
            if(bottom == true){
                layout[layout.length - 1][10] = 0;
                layout[layout.length - 1][11] = 0;
                roomBudget -= 1
            }
            if(bottom == false && top == false && left == false && right == false && roomBudget > 0 && roomBudget > 5){
                layout[4][0] = 0;
                layout[5][0] = 0;
                left = true;
                roomBudget -= 1
            }
            let leftRoom;
            let rightRoom;
            let topRoom;
            let bottomRoom;

            const currentRoom = new room(layout, `${x},${y}`)
            map.set(`${x},${y}`, currentRoom)

            if(left){
                const leftCord = '' + (x - 1) + ',' + y
                if(map.has(leftCord)){
                    leftRoom = map.get(leftCord)
                    currentRoom.left = leftRoom;
                    leftRoom.right = currentRoom;
                    leftRoom.layout[4][layout[4].length - 1] = 0;
                    leftRoom.layout[5][layout[4].length - 1] = 0;
                }
                else{
                    leftRoom = generateRoom(Math.random(), leftCord, ["right"])
                    currentRoom.left = leftRoom;
                    leftRoom.right = currentRoom;
                    leftRoom.layout[4][layout[4].length - 1] = 0;
                    leftRoom.layout[5][layout[4].length - 1] = 0;
                }
            }
            if(right){
                const rightCord = '' + (x + 1) + ',' + y
                if(map.has(rightCord)){
                    rightRoom = map.get(rightCord)
                    currentRoom.right = rightRoom;
                    rightRoom.left = currentRoom;
                    rightRoom.layout[4][0] = 0;
                    rightRoom.layout[5][0] = 0;
                }
                else{
                    rightRoom = generateRoom(Math.random(), rightCord, ["left"])
                    currentRoom.right = rightRoom;
                    rightRoom.left = currentRoom;
                    rightRoom.layout[4][0] = 0;
                    rightRoom.layout[5][0] = 0;
                }
            }
            if(top){
                const topCord = '' + x + ',' + (y-1);
                if(map.has(topCord)){
                    topRoom = map.get(topCord)
                    currentRoom.top = topRoom;
                    topRoom.bottom = currentRoom;
                    topRoom.layout[layout.length - 1][10] = 0;
                    topRoom.layout[layout.length - 1][11] = 0;
                }
                else{
                    topRoom = generateRoom(Math.random(), topCord, ['bottom'])
                    currentRoom.top = topRoom;
                    topRoom.bottom = currentRoom;
                    topRoom.layout[layout.length - 1][10] = 0;
                    topRoom.layout[layout.length - 1][11] = 0;
                }
            }
            if(bottom){
                const bottomCord = '' + x + ',' + (y+1)
                if(map.has(bottomCord)){
                    bottomRoom = map.get(bottomCord)
                    currentRoom.bottom = bottomRoom;
                    bottomRoom.top = currentRoom;
                    bottomRoom.layout[0][10] = 0;
                    bottomRoom.layout[0][11] = 0;
                }
                else{
                    bottomRoom = generateRoom(Math.random(), bottomCord, ['top'])
                    currentRoom.bottom = bottomRoom;
                    bottomRoom.top = currentRoom;
                    bottomRoom.layout[0][10] = 0;
                    bottomRoom.layout[0][11] = 0;
                }
            }
            // currentRoom.mappedLayout = currentRoom.convertLayout(currentRoom.layout)
            return currentRoom;
        }
        generateRoom(Math.random(), '0,0', [])
    }
}

class room{
    constructor(layout, cords = '0,0'){
        this.layout = layout 
        this.mappedLayout = null//converts layout to a map
        this.left = null;
        this.right = null;
        this.top = null;
        this.bottom = null;
        this.cords = cords;
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
        const keys = this.mappedLayout.keys().toArray();
        for(let i = 0; i < keys.length; i++){
            if(this.mappedLayout.get(keys[i]).type != 'space'){
                this.mappedLayout.get(keys[i]).draw() 
                structures.add(this.mappedLayout.get(keys[i]))
            }
        }
    }

    newRoomLoad(){
        let x = 0 //x and y cordninates of spaces
        let y = 0
        for(let i = 0; i < this.layout.length; i++){
            x = 0
            for(let j = 0; j < this.layout[0].length; j++){
                if(this.layout[i][j] == 1){
                    structures.add(new wall(x, y, width, height));
                }
                else if(this.layout[i][j] == 'lt'){
                    structures.add(new turret(x, y, width, height, 'left'));
                }
                x += width
            }
            y += height;
        }
    }
}

class player {
    constructor(){
        this.usableItemList = new Map([
            ['shoot', this.sendProjectile],
            ['melee', this.sword]
        ])
        this.width = 50
        this.height = 50
        this.x = Math.ceil(window.innerWidth / 2);
        this.y = Math.ceil(window.innerHeight / 2);
        this.room = 'spawn'
        this.area = 'spawn'
        this.sections = []
        this.index = 0;
        this.directionList = [];
        this.fixedIncrement = 5;
        this.speed = 5;
        this.pVelocityModifier = 10;
        this.health = 100;
        this.selectedItem = 'melee'
        this.melee = new melee(this)
    }
    
    draw(){
        this.updateMove()
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#0000ff";
        ctx.fill();
        ctx.closePath();
    }

    updateMove(){
        if(this.directionList.indexOf('up') != -1){
            this.y -= this.speed
            if(this.collision2(structures.list)){
                console.log('fixed', this.fixedIncrement)
                this.y += this.fixedIncrement;
                this.fixedIncrement = this.speed;
            }
            if(this.y < 0){
                structures.resetList();
                entities.clear();
                damageInstances.clear();
                this.setRoom(this.room.top)
                this.y = window.innerHeight;
            }
        }
        if(this.directionList.indexOf('left') != -1){
            this.x -= this.speed
            if(this.collision2(structures.list)){
                console.log('fixed', this.fixedIncrement)
                this.x += this.fixedIncrement;
                this.fixedIncrement = this.speed;
            }
            if(this.x < 0){
                structures.resetList();
                entities.clear();
                damageInstances.clear();
                this.setRoom(this.room.left)
                this.x = window.innerWidth;
            }
        }
        if(this.directionList.indexOf('down') != -1){
            this.y += this.speed
            if(this.collision2(structures.list)){
                console.log('fixed', this.fixedIncrement)
                this.y -= this.fixedIncrement;
                this.fixedIncrement = this.speed;
            }
            if(this.y+this.height > window.innerHeight){
                structures.resetList();
                entities.clear();
                damageInstances.clear();
                this.setRoom(this.room.bottom)
                this.y = 0;
            }
        }
        if(this.directionList.indexOf('right') != -1){
            this.x += this.speed
            if(this.collision2(structures.list)){
                console.log('fixed', this.fixedIncrement)
                this.x -= this.fixedIncrement;
                this.fixedIncrement = this.speed;
            }
            if(this.x+this.width > window.innerWidth){
                structures.resetList();
                entities.clear();
                damageInstances.clear();
                this.setRoom(this.room.right)
                this.x = 0;
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
        this.room.newRoomLoad()
        console.log(this.room.cords)
    }
    setArea(area){
        console.log(area.map)
        this.area = area;
        this.setRoom(this.area.map.get('0,0'))
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

    shoot(degrees){
        let centerX = character.x + character.width / 2
        let centerY = character.y + character.height / 2
        if(degrees >= 45 && degrees < 135){
            let xVelocity = ((135 - 45) - degrees) / this.pVelocityModifier * -2
            let yVelocity = 90 / this.pVelocityModifier * -1
            console.log("xv:", xVelocity, 'yv', yVelocity)
            damageInstances.add(new projectile(centerX, centerY, 20, 20, xVelocity, yVelocity, 'player'))
        }
        else if(degrees >= 135 && degrees < 225){
            let yVelocity = ((225 - 45) - degrees) / this.pVelocityModifier * -2
            let xVelocity = 90 / this.pVelocityModifier
            console.log("xv:", xVelocity, 'yv', yVelocity)
            damageInstances.add(new projectile(centerX, centerY, 20, 20, xVelocity, yVelocity, 'player'))
        }
        else if(degrees >= 225 && degrees < 315){
            let xVelocity = ((315 - 45) - degrees) / this.pVelocityModifier * 2
            let yVelocity = 90 / this.pVelocityModifier
            console.log("xv:", xVelocity, 'yv', yVelocity)
            damageInstances.add(new projectile(centerX, centerY, 20, 20, xVelocity, yVelocity, 'player'))
        }
        else{
            let yVelocity = (circularSub((405 - 45), degrees)) / this.pVelocityModifier * 2
            let xVelocity = 90 / this.pVelocityModifier * -1
            console.log("xv:", xVelocity, 'yv', yVelocity)
            damageInstances.add(new projectile(centerX, centerY, 20, 20, xVelocity, yVelocity, 'player'))
        }
    }

    sendProjectile = (e) =>{
        let centerX = this.x + this.width / 2
        let centerY = this.y + this.height / 2
        let degrees = findDegrees(e.x, e.y, centerX, centerY)
        this.shoot(degrees)
    }

    sword = (e) => {
        console.log("run")
        let centerX = this.x + this.width / 2
        let centerY = this.y + this.height / 2
        let degrees = findDegrees(e.x, e.y, centerX, centerY)
        this.melee.setValues(120, degrees)
        damageInstances.add(this.melee)
    }
}

class projectile{
    constructor(startX, startY, width, height, xVelocity, yVelocity, source ,repeating = false, room = character.room, color = "#000000", damage = 5){
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
        this.color = color;
        this.damage = damage;
    }


    draw(){
        this.x += this.xVelocity
        this.y += this.yVelocity
        // this.detectCollision();
        if(this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0 || this.collision2(structures.list) || this.entityCollision()){
            if(this.repeating){
                this.x = this.startX;
                this.y = this.startY;
            }
            else{
                console.log('reset')
                damageInstances.remove(this.index)
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

    entityCollision(){
        const left = this.x;
        const right = this.x + this.width;
        const top = this.y;
        const bottom = this.y + this.height;
        if(this.source != "player"){
            const tleft = character.x;
            const tright = character.x + character.width;
            const ttop = character.y;
            const tbottom = character.y + character.height;
            if (right > tleft && left < tright && bottom > ttop && top < tbottom) {
                character.health -= this.damage;
                console.log(character.health)
                return true;
            }
            else{
                return false
            }
        }
    }
}

class melee{
    constructor(source){
        this.span;
        this.source = source
        this.x;
        this.y;
        this.width = 25;
        this.height = 100;
        this.index;
        this.target;
        this.currentAngle;
        this.step = 5; //how many pixels the sword moves
    }

    setValues(span, currentAngle){
        this.span = span;
        this.currentAngle = currentAngle - this.step;
        this.target = span + currentAngle;
    }

    animate(){ //should change the degrees for this frame
        this.currentAngle = this.currentAngle + this.step;
        console.log(this.currentAngle)
        if(this.currentAngle > this.target){
            damageInstances.remove(this.index);
        }
    }

    draw(){
        this.x = this.source.x + this.source.width/2
        this.y = this.source.y + this.source.height/2
        this.animate();
        ctx.beginPath();
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate((this.currentAngle * Math.PI) / 180)
        ctx.translate(-this.x, -this.y)
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#0000ff";
        ctx.fill();
        ctx.restore();
        ctx.closePath()
        ctx.lineWidth = 1;
    }
}

function animate() {
    if (document.timeline.currentTime - lastUpdate > 1000 / fps && !menu) {
      lastUpdate = document.timeline.currentTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      structures.draw();
      entities.draw();
      damageInstances.draw();
    } 
    window.requestAnimationFrame(animate);
}

function setFPS(target){
    fps = target;
}