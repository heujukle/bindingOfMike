const wallArt = ["images/greyBrick.png", "images/walls/tile.png"]
const floorArt = ["images/floor1.png", "images/floors/pleaseBeAGoodFloor.png", "images/floors/borderlessgrass.png", "images/floors/detailedReddish.png"]

class space{ //empty space unused code
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

class wall { //creates the wall
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

class turret{ //creates the turret
    constructor(x, y, width, height, direction){
        this.index;
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.type = 'turret'
        this.direction = direction;
        this.tProjectile = null;
        switch(this.direction){//determines the direction of the turrets
            case "lt":
                console.log('lt')
                this.tProjectile = new projectile(-25, 0, 25, 25, -15, 0, this, true, character.room, '#000000') //create turret
                damageInstances.add(this.tProjectile); //add projectile
                break;

            case 'ut':
                break;

            case 'rt':
                this.tProjectile = new projectile(width, 0, 25, 25, 15, 0, this, true, character.room, '#000000')
                damageInstances.add(this.tProjectile);
                break;

            case 'dt':
                break;
        }
        this.img = new Image()
        this.img.src = 'images/walls/turret.png'
    }

    draw(){ //draws the turret
        ctx.beginPath();
        ctx.fill
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#4d4d4d";
        ctx.fill();
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        ctx.closePath();
    }
}

class area{
    //force func will all
    constructor(loadSave = undefined, forceFunc = undefined){
        document.getElementById('wall').src = determineValueArray((Math.random() + '')[5], wallArt) //randomizes walls for area
        document.getElementById('floor').src = determineValueArray((Math.random() + '')[7], floorArt) //randomizes floor for area
        this.map = new Map() //makes the data structure for the area to be stored in
        if(loadSave != undefined){
            const rooms = [];
            for(let i = 0; i < Object.keys(loadSave).length; i++){ //loads all the rooms first
                const cords = Object.keys(loadSave)[i];
                const roomData = loadSave[cords];
                const currentRoom = new room(roomData.layout, cords);
                if(roomData.entered === true){
                    currentRoom.savedEntities = parseEntities(roomData.entities)
                    currentRoom.savedInteractables = parseInteractables(roomData.interactables)
                }
                currentRoom.saveDisabled = roomData.saveDisabled
                this.map.set(cords, currentRoom);
                rooms.push(currentRoom);
            }
            for(let i = 0; i < Object.keys(loadSave).length; i++){ //loops back trhough linking them together
                const cords = Object.keys(loadSave)[i];
                const roomData = loadSave[cords];
                if(roomData.left != null) {this.map.get(cords).left = this.map.get(roomData.left)}
                if(roomData.right != null) {this.map.get(cords).right = this.map.get(roomData.right)}
                if(roomData.top != null) {this.map.get(cords).top = this.map.get(roomData.top)}
                if(roomData.bottom != null) {this.map.get(cords).bottom = this.map.get(roomData.bottom)}
            }
        }
        else if(forceFunc != undefined) forceFunc(this.map)
        else{
            this.seed = Math.random();
            this.generateAreaLayout(this.seed, this.map) //generates the area
        }
    }

    generateAreaLayout(seed, map){
        let end = false; //shows th end hasnt been generated
        let chest = false;
        console.log(this.map)
        seed += '' //convertes seed to string
        let roomBudget = 30; //soft limit to amount of rooms, will generate no more after this number is hit, however it can go slightly over due to js
        function generateRoom(seed, cord, exclusion = []){  //seed: random number, cord: 'x,y', exclusion: array of directions to avoid
            const cordArray = cord.split(',')
            const x = parseInt(cordArray[0])
            const y = parseInt(cordArray[1])
            seed += ''
            let layout;
            if(roomBudget == 30){ //starting room, always 0,0
                layout = [
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
                    [1, 0, 'd', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
                    [1, 0, 'd', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'f', 1], 
                    [1, 0, 'd', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1], 
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'sh', 1], 
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]
            }
            else if(roomBudget < 15 && chest == false){
                chest = true;
                console.log('chest made')
                layout = [
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
                    [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1], 
                    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1], 
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'ch', 0, 0, 0, 0, 0, 0, 0, 0, 1], 
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1], 
                    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1], 
                    [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]
            }
            else if(roomBudget < 10 && end == false){//will generate the end when less than 5 rooms are left
                end = true;
                console.log('end made')
                if(areaCount % 5 == 0){ //will update in future to make == 5, will need a new system to have randomized bosses after the end
                    layout = [
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
                    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1], 
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 'bt', 'bt', 0, 0, 0, 0, 0, 0, 0, 0, 1], 
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 'bt', 'bt', 0, 0, 0, 0, 0, 0, 0, 0, 1], 
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
                    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1], 
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]
                }
                else{
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
            }
            else{ //will generate a random layout
                layout = determineValueArray(seed[7] + seed[10], rooms).map(function(arr) { //funny way to copy array
                    return arr.slice();
                });
            }
            // determines the sides of the next room to be generated, if true opens the door and takes away from the budget
            let left = determineValue(seed[3], true, false) && roomBudget > 0 && exclusion.indexOf('left') == -1 ? true : false;
            if(left == true){
                const door = Math.floor(layout.length / 2)
                const replacement = Math.random() > 0.25 ? 0 : 'r';
                layout[door][0] = replacement;
                layout[door -1 ][0] = replacement;
                roomBudget -= 1
            }
            let right = determineValue(seed[4], true, false) && roomBudget > 0 && exclusion.indexOf('right') == -1? true : false;
            if(right == true){
                const door = Math.floor(layout.length / 2)
                const replacement = Math.random() > 0.25 ? 0 : 'r';
                layout[door][layout[4].length - 1] = replacement;
                layout[door - 1][layout[4].length - 1] = replacement;
                roomBudget -= 1
            }
            let top = determineValue(seed[5], true, false) && roomBudget > 0 && exclusion.indexOf('top') == -1? true : false;
            if(top == true){
                const door = Math.floor(layout[0].length / 2)
                const replacement = Math.random() > 0.25 ? 0 : 'r';
                layout[0][door] = replacement;
                layout[0][door - 1] = replacement;
                roomBudget -= 1;
            }
            let bottom = determineValue(seed[6], true, false) && roomBudget > 0 && exclusion.indexOf('bottom') == -1? true : false;
            if(bottom == true){
                const door = Math.floor(layout[0].length / 2)
                const replacement = Math.random() > 0.25 ? 0 : 'r';
                layout[layout.length - 1][door] = replacement;
                layout[layout.length - 1][door - 1] = replacement;
                roomBudget -= 1;
            }
            /*-------------------------------------------------------------------------------------------------------------------------------*/
            //fills if no room is generated and still a budget it will force a room generation
            if(bottom == false && top == false && left == false && right == false && roomBudget > 5){
                if(exclusion.indexOf('right') != -1 && !map.has(`${x - 1},${y}`)){
                    left = true;
                    const door = Math.floor(layout.length / 2)
                    layout[door][0] = 0;
                    layout[door -1 ][0] = 0;
                }
                else if(exclusion.indexOf('left') != -1 && !map.has(`${x + 1},${y}`)){
                    right = true;
                    const door = Math.floor(layout.length / 2)
                    layout[door][layout[4].length - 1] = 0;
                    layout[door - 1][layout[4].length - 1] = 0;
                }
                else if(exclusion.indexOf('top') != -1 && !map.has(`${x},${y + 1}`)){
                    bottom = true;
                    const door = Math.floor(layout[0].length / 2)
                    layout[layout.length - 1][door] = 0;
                    layout[layout.length - 1][door - 1] = 0;
                }
                else{
                    top = true;
                    const door = Math.floor(layout[0].length / 2)
                    layout[0][door] = 0;
                    layout[0][door - 1] = 0;
                }
                roomBudget -= 1
            }
            /*-------------------------------------------------------------------------------------------------------------------------------*/
            //variables for the next rooms
            let leftRoom;
            let rightRoom;
            let topRoom;
            let bottomRoom;

            const currentRoom = new room(layout, `${x},${y}`) //makes a new room object
            map.set(`${x},${y}`, currentRoom) //adds it to the map

            //nested slop
            if(left){ //if direction has been chosen
                const leftCord = '' + (x - 1) + ',' + y //creates a cord in that direction
                if(map.has(leftCord)){ //if already in the map
                    leftRoom = map.get(leftCord) //grabs the existing room
                    currentRoom.left = leftRoom; //sets direction of existing room to variable
                    leftRoom.right = currentRoom; //sets the old rooms opposite direction to current room
                }
                else{ //if doesnt exist
                    leftRoom = generateRoom(Math.random(), leftCord, ["right"]) //generate new room with an exclusion of right, so it doesn't loop back in
                    currentRoom.left = leftRoom; //sets room variables
                    leftRoom.right = currentRoom;
                }
                leftRoom.layout[leftRoom.sideDoor][leftRoom.layout[4].length - 1] = 0; //opens door
                leftRoom.layout[leftRoom.sideDoor-1][leftRoom.layout[4].length - 1] = 0;
            }
            if(right){
                const rightCord = '' + (x + 1) + ',' + y
                if(map.has(rightCord)){
                    rightRoom = map.get(rightCord)
                    currentRoom.right = rightRoom;
                    rightRoom.left = currentRoom;
                }
                else{
                    rightRoom = generateRoom(Math.random(), rightCord, ["left"])
                    currentRoom.right = rightRoom;
                    rightRoom.left = currentRoom;
                }
                rightRoom.layout[rightRoom.sideDoor][0] = 0;
                rightRoom.layout[rightRoom.sideDoor-1][0] = 0;
            }
            if(top){
                const topCord = '' + x + ',' + (y-1);
                if(map.has(topCord)){
                    topRoom = map.get(topCord)
                    currentRoom.top = topRoom;
                    topRoom.bottom = currentRoom;
                }
                else{
                    topRoom = generateRoom(Math.random(), topCord, ['bottom'])
                    currentRoom.top = topRoom;
                    topRoom.bottom = currentRoom;
                }
                topRoom.layout[topRoom.layout.length - 1][topRoom.topDoor] = 0;
                topRoom.layout[topRoom.layout.length - 1][topRoom.topDoor - 1] = 0;
            }
            if(bottom){
                const bottomCord = '' + x + ',' + (y+1)
                if(map.has(bottomCord)){
                    bottomRoom = map.get(bottomCord)
                    currentRoom.bottom = bottomRoom;
                    bottomRoom.top = currentRoom;
                }
                else{
                    bottomRoom = generateRoom(Math.random(), bottomCord, ['top'])
                    currentRoom.bottom = bottomRoom;
                    bottomRoom.top = currentRoom;
                }
                bottomRoom.layout[0][bottomRoom.topDoor] = 0;
                bottomRoom.layout[0][bottomRoom.topDoor-1] = 0;
            }
            // currentRoom.mappedLayout = currentRoom.convertLayout(currentRoom.layout)
            return currentRoom; //returns current room
        }
        generateRoom(Math.random(), '0,0', []) //generates 0,0
    }
}

class room{
    constructor(layout, cords = '0,0'){
        this.savedInteractables = []
        this.savedEntities = []
        this.layout = layout 
        this.mappedLayout = null//converts layout to a map
        this.entered = false;

        //other rooms
        this.left = null;
        this.right = null;
        this.top = null;
        this.bottom = null;
        //-----------------
        this.saveDisabled = false;
        this.cords = cords; //cords: "x,y"
        this.sideDoor = Math.floor(layout.length / 2)
        this.topDoor = Math.floor(layout[0].length / 2)
        this.dynamicCamera = (layout.length > 10 || layout[0].length > 20) ? true : false;
        this.width = layout[0].length * width;
        this.height = layout.length * height;
        this.lastEnteredDimensions = {
            width : this.width,
            height : this.height
        }

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
        this.width = this.layout[0].length * width;
        this.height = this.layout.length * height;
        let x = 0 //x and y cordninates of spaces
        let y = 0
        for(let i = 0; i < this.layout.length; i++){
            x = 0
            for(let j = 0; j < this.layout[0].length; j++){
                if(tiles.has(this.layout[i][j])){
                    const objInfo = tiles.get(this.layout[i][j])(x, y, width, height)
                    if(objInfo != null) objInfo.bucket.add(objInfo.Obj)
                }
                x += width
            }
            y += height;
        }
        if(this.savedEntities.length > 0 || this.entered == true){ //if there is any saved data for rooms it will replace readd them instead
            entities.clear();
            for(let i = 0; i < this.savedEntities.length; i++){
                entities.add(this.savedEntities[i])
            }
        }
        if(this.savedInteractables.length > 0 || this.entered == true){
            interactables.clear();
            for(let i = 0; i < this.savedInteractables.length; i++){
                interactables.add(this.savedInteractables[i])
            }
        }
        
        adjustSize(entities.list)
        adjustSize(interactables.list)
    }
}