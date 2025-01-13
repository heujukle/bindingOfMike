const wallArt = ["images/pixil-frame-0.png", "images/greyBrick.png", "images/walls/tile.png"]
const floorArt = ["images/floor1.png"]

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
        let sprite = document.getElementById('wall')
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#000000";
        ctx.fill();
        ctx.drawImage(sprite, this.x, this.y, this.width, this.height)
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
        if(this.direction == "lt"){
            console.log('lt')
            this.tProjectile = new projectile(this.x - 25, this.y + this.height / 2, 25, 25, -15, 0, 'turret', true, character.room, '#000000')
            damageInstances.add(this.tProjectile);
        }
        else if(direction == "ut"){

        }
        else if(direction == "rt"){
            this.tProjectile = new projectile(this.x + this.width + 25, this.y + this.height / 2, 25, 25, 15, 0, 'turret', true, character.room, '#000000')
            damageInstances.add(this.tProjectile);
        }
        else if(direction == "dt"){

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
        document.getElementById('wall').src = determineValueArray((Math.random() + '')[5], wallArt)
        document.getElementById('floor').src = determineValueArray((Math.random() + '')[7], floorArt)
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
                    [1, 0, 'd', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
                    [1, 0, 'd', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
                    [1, 0, 'd', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1], 
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'sh', 1], 
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
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 'p', 'p', 0, 0, 0, 0, 0, 0, 0, 0, 1], 
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 'p', 'p', 0, 0, 0, 0, 0, 0, 0, 0, 1], 
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
            /*-------------------------------------------------------------------------------------------------------------------------------*/
            if(bottom == false && top == false && left == false && right == false && roomBudget > 5){
                if(exclusion.indexOf('right') != -1){
                    left = true;
                    layout[4][0] = 0;
                    layout[5][0] = 0;
                }
                else if(exclusion.indexOf('left') != -1){
                    right = true;
                    layout[4][layout[4].length - 1] = 0;
                    layout[5][layout[4].length - 1] = 0;
                }
                else if(exclusion.indexOf('top') != -1){
                    bottom = true;
                    layout[layout.length - 1][10] = 0;
                    layout[layout.length - 1][11] = 0;
                }
                else{
                    top = true;
                    layout[0][10] = 0;
                    layout[0][11] = 0;
                }
                roomBudget -= 1
            }
            /*-------------------------------------------------------------------------------------------------------------------------------*/
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
        this.savedInteractables = []
        this.savedEntities = []
        this.layout = layout 
        this.mappedLayout = null//converts layout to a map
        this.left = null;
        this.right = null;
        this.top = null;
        this.bottom = null;
        this.cords = cords;
    }

    convertLayout(layout){ //unused
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

    roomLoad(){ //old layout system
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
                if(tiles.has(this.layout[i][j])){
                    tiles.get(this.layout[i][j])(x, y, width, height, this.layout[i][j])
                }
                x += width
            }
            y += height;
        }
        if(this.savedEntities.length > 0){ //if there is any saved data for rooms it will replace readd them instead
            entities.list = this.savedEntities;
        }
        if(this.savedInteractables.length > 0){
            interactables.list = this.savedInteractables;
        }
    }
}