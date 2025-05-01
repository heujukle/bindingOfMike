let fps = 120; //frames per second
let lastUpdate = document.timeline.currentTime; //last time since frame update

let menu = true;
let fConsole = document.getElementById('console');
let entitiySpeed = 1;
let zombieHealth = 35;
let skeletonHealth = 35;
let skeletonPspeed = 8;
let skeletonPdamage = 10;
let zombieDamage = 15; 
let skeletonDamage = 5; 
let moneyScale = 1;
let knockBackResistance = 1;
let areaCount = 0 
let itemScale = 1

document.addEventListener('error', (e) => {
    fConsole.classList.add('visible')
    println(e)
})

function println(input){
    fConsole.innerHTML += input + '<br>'
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
    for(let i = 0; i <= num; i++){ 
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

function findDegrees(x1, y1, x2, y2){ //finds degrees between two points
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

function findDistance(x1, y1, x2, y2){ //finds distance between two points
    let x = x1 - x2;
    let y = y1 - y2;
    return Math.sqrt(x * x + y * y)
}

function moveEntitiy(entitiy, xChange, yChange, skipEntities){ //moves an entity
    entitiy.x += xChange
    entitiy.y += yChange
    if(collision2(entitiy, structures) || (collision2(entitiy, entities) && skipEntities != true)){
        entitiy.y -= yChange;
        entitiy.x -= xChange;
        return false;
    }
    return true;
}

function collison(entitiy, target, collider, func = false){ //used for induvidual collisions
    if(target !== entitiy && target != null){ //check for entities returns if it is static
        const left = entitiy.x;
        const right = entitiy.x + entitiy.width;
        const top = entitiy.y;
        const bottom = entitiy.y + entitiy.height;
        const tleft = target.x;
        const tright = target.x + target.width;
        const ttop = target.y;
        const tbottom = target.y + target.height;
        
        // Check if the rectangles are overlapping
        if (right > tleft && left < tright && bottom > ttop && top < tbottom) {
            // Collision detected
            if(func != false){ 
                func(entitiy, target)
            }
            if(collider == true){
                return target
            }
            else{
                return true;
            }
            // You can add further collision handling logic here (e.g., bounce, stop movement, etc.)
            }
        }
        return false;
    }

function collision2(entitiy, target, collider, func = false) { //collider returns the FIRST item collided with instead of true, func runs a function on collisio,
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
                if(func != false){ 
                    func(entitiy, targetList[i])
                }
                if(collider == true){
                    return targetList[i]
                }
                else{
                    return true;
                }
                // You can add further collision handling logic here (e.g., bounce, stop movement, etc.)
                }
            }
        }
    return false;
}

function collison3(entitiy, target, func){ //does not return upon collison
    let collision = 'nuh'
    let targetList = target.list
    const left = entitiy.x;
    const right = entitiy.x + entitiy.width;
    const top = entitiy.y;
    const bottom = entitiy.y + entitiy.height;
    console.log(left, right, top, bottom)
    
    for (let i = 0; i < targetList.length; i++) {
        console.log((targetList[i] !== entitiy) && targetList[i] != null)
        if(((targetList[i] !== entitiy) && target.check(targetList[i], entitiy)) && targetList[i] != null){ //check for entities returns if it is static
            console.log('trying')
            const tleft = targetList[i].x;
            const tright = targetList[i].x + targetList[i].width;
            const ttop = targetList[i].y;
            const tbottom = targetList[i].y + targetList[i].height;
            
            // Check if the rectangles are overlapping
            if (right > tleft && left < tright && bottom > ttop && top < tbottom) {
                // Collision detected
                collision = 'yuh'
                if(func != false){ 
                    func(entitiy, targetList[i])
                }

                }
            }
        }
        console.log(collision)
}

//used for incrementing with a limit
function incrementLimit(variable, limit, increment = 1){
    variable+=increment;
    if(variable >= limit){
        return variable - limit;
    }
    return variable;
}

//a resuable x, y point object
class point{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

//the update function
//zlayer is determined by the order draaws are called in this function. The early the call the lower it is
function animate() {
    if (document.timeline.currentTime - lastUpdate > 1000 / fps && !menu && !buffer) {
      lastUpdate = document.timeline.currentTime;
      ctx.clearRect(0, 0, character.room.width, character.room.height);
      const floor = ctx.createPattern(document.getElementById('floor'), "repeat") 
      ctx.fillStyle = floor;
      ctx.fillRect(0, 0,  character.room.width, character.room.height); //creates the floor
      character.preDraw();
      timers.run()
      structures.draw();
      entities.draw();
      interactables.draw();
      character.draw();
      damageInstances.draw();
      character.interact = false;
      roomChange(character);
    } 
    window.requestAnimationFrame(animate);
}

function setFPS(target){
    fps = target;
}

//increase is how much is added to the target objects wallet
//target is most likely a player object
function updateWallet(increase, target){
    if(target.wallet != null){
        if(increase > 0){target.wallet += increase * moneyScale}
        else{target.wallet += increase}
        document.getElementById('walletDisplay').textContent = target.wallet;
    }
}

//applies velocity to an entitiy
function velocity(entity, xVelocity, yVelocity){
    const totalMovement = {
        x: 0,
        y: 0
    }
    const temp = {
        x : entity.x,
        y : entity.y,
        width : entity.width,
        height : entity.height
    }
    if(character.has('bouncy')){ //special psychics for bouncy
        temp.x += xVelocity
        if(collision2(temp, structures)){
            xVelocity *= -1
        }
        temp.x -= xVelocity
        temp.y += yVelocity * 2
        if(collision2(temp, structures)){
            yVelocity *= -1
        }
        temp.y -= yVelocity
        temp.x += xVelocity
        if(!collision2(temp, structures)){
            entity.x = temp.x
            entity.y = temp.y
        }
    }
    else{ //default pyshics
    const steps = 20
    const xStep = xVelocity/steps
    const yStep = yVelocity/steps

    for(let i = 0; i < steps; i++){
        temp.x += xStep
        totalMovement.x += xStep
        if(collision2(temp, structures)){
            temp.x -= xStep
            totalMovement.x -= yStep
            entity.xVelocity = 0
            break;
        }
    }
    for(let i = 0; i < steps; i++){
        temp.y += yStep
        totalMovement.y += yStep
        if(collision2(temp, structures)){
            temp.y -= yStep
            totalMovement.y -= yStep
            entity.yVelocity = 0
            break;
        }
    }
    entity.x = temp.x
    entity.y = temp.y
    }
    if(xVelocity > 0){ //validates xVelocity
        xVelocity *= 0.9
        if(xVelocity < 0.5){
            xVelocity = 0
        }
    }
    else{
        xVelocity *= 0.9
        if(xVelocity > -0.5){
            xVelocity = 0
        }
    }
    if(yVelocity > 0){ //vallidates y veolcity
        yVelocity *= 0.9
        if(yVelocity < 0.5){
            yVelocity = 0
        }
    }
    else{
        yVelocity *= 0.9
        if(yVelocity > -0.5){
            yVelocity = 0
        }
    }
    entity.xVelocity = xVelocity
    entity.yVelocity = yVelocity
    return totalMovement;
}

function doorAdjustTB(player){
    let offset = player.x - (player.room.topDoor - 1) * width;
    offset = (offset < 0) ? 0 : offset;
    return offset; 
}

function doorAdjustLR(player){
    let offset = player.y - (player.room.sideDoor - 1) * height;
    offset = (offset < 0) ? 0 : offset;
    return offset; 
}

//changes room if player is out of bounds
function roomChange(player){
    if(player.y < 0){ //top
        roomChangeBody(player)
        const offset = doorAdjustTB(player)
        player.setRoom(player.room.top)
        player.y = player.room.height;
        player.x = (player.room.topDoor - 1) * width + offset
        if(player.room.dynamicCamera == true) player.lockCameraToPlayer("top", offset)
    }
    else if(player.y > player.room.layout.length * height){
        roomChangeBody(player)
        const offset = doorAdjustTB(player)
        player.setRoom(player.room.bottom)
        player.y = 0;
        player.x = (player.room.topDoor - 1) * width + offset
        if(player.room.dynamicCamera == true) player.lockCameraToPlayer("bottom", offset)
    }
    else if(player.x < 0){
        roomChangeBody(player)
        const offset = doorAdjustLR(player)
        player.setRoom(player.room.left)
        player.x = player.room.width - player.width;
        player.y = (player.room.sideDoor - 1) * height + offset
        if(player.room.dynamicCamera == true) player.lockCameraToPlayer("left", offset)
    }
    else if(player.x+player.width > player.room.layout[0].length * width){
        roomChangeBody(player)
        const offset = doorAdjustLR(player)
        player.setRoom(player.room.right)
        player.x = 0;
        player.y = (player.room.sideDoor - 1) * height + offset
        if(player.room.dynamicCamera == true) player.lockCameraToPlayer("right", offset)
    }
}

function roomChangeBody(player){ //resuablebody of room change
    player.fixCamera()
    structures.resetList();
    player.room.savedEntities = entities.list;
    for(entity of player.room.savedEntities){
        entity.offsets.xOffset = entity.x / player.room.width
        entity.offsets.yOffset = entity.y / player.room.height
    }
    entities.clear();
    player.room.savedInteractables = interactables.list;
    // for(interactable of player.room.savedInteractables){
    //     interactable.offsets.xOffset = interactable.x / player.room.width
    //     interactable.offsets.yOffset = interactable.y / player.room.height
    // }
    interactables.clear()
    damageInstances.clear();
}

function getProjVelocities(degrees, speed){ //returns velocities for projectiles/entities so they travel at a consistent speed
    if(degrees > 360){
        degrees -= 360
    }
    if(degrees < 0){
        degrees += 360
    }
    const result = {
        xVelocity: 0,
        yVelocity : 0
    }
    if(degrees >= 45 && degrees < 135){
        result.xVelocity = ((speed / 45) * degrees) - speed * 2 //((135 - 45) - degrees) / this.pVelocityModifier * -2
        result.yVelocity = speed * -1
    }
    else if(degrees >= 135 && degrees < 225){
        result.yVelocity = (((speed / 45) * (degrees - 90)) - speed * 2) //((225 - 45) - degrees) / this.pVelocityModifier * -2
        result.xVelocity = speed
    }
    else if(degrees >= 225 && degrees < 315){
        result.xVelocity = -(((speed / 45) * (degrees - 180)) - speed * 2)
        result.yVelocity = speed
    }
    else{
        if(degrees < 45){
            degrees += 360
        }
        result.yVelocity = -(((speed / 45) * (degrees - 270)) - speed * 2)//(circularSub((405 - 45), degrees)) / this.pVelocityModifier * 2
        result.xVelocity = speed * -1
    }
    return result;
}

//drops an item object to the target
//target must have a material variable
//item must be an object with a name attribute
function dropItems(item, target){
    const timeBeforeFade = 5000;
    const fadeTime = 0;
    let spriteImg = "images\Coin.png"
    let amount = 1;
    if(target.materials && item.type == "material"){ //makes sure target has materials
        amount = Math.floor(1 + Math.random() * 5 * itemScale)
        spriteImg = item.sprite
        if(target.materials[item.name]){
            target.materials[item.name].amount += amount
        }
        else{
            target.materials[item.name] = {amount:amount, sprite: item.sprite != null || item.sprite != undefined ?  item.sprite : "images/Coin.png"}
        }
    }
    else if(item.type == "passiveItem"){
        spriteImg = item.sprite != undefined ? item.sprite : "images/Coin.png";
        target.addItem(item)
    }
        const itemDisplay = document.createElement("div")
            const sprite = document.createElement("img")
                sprite.src = spriteImg
                sprite.style.marginRight = '5px'
        itemDisplay.appendChild(sprite)
            const text = document.createElement("div")
                text.textContent += `${amount} : ${item.name}`
        itemDisplay.appendChild(text)
        itemDisplay.classList.add('attainedItem')
        sideBar.appendChild(itemDisplay)
        setTimeout(()=>{
            itemDisplay.style.opacity = '0';
            setTimeout(() => {itemDisplay.remove()}, timeBeforeFade + fadeTime)
        }, timeBeforeFade)
    }

function verifyIfPlayer(source){ //returns true if player
    if(source instanceof player){
        return true;
    }
    return false;
}

function makeKnockback(source){ //returns a default knockback function
function result (target){
    const degrees = findDegrees(source.x + source.width/2, source.y + source.height/2, target.x + target.width/2, target.y + target.height/2)
    const pv = getProjVelocities(degrees, 15)
    console.log(degrees, pv)
    target.xVelocity += -pv.xVelocity
    target.yVelocity += -pv.yVelocity
}
return result;
}

function findItemNotHad(target){
    let result = 0
    const itemPool = []
    for(let i =0; i < passives.length; i++){
        if(target.has(passives[i].name)){
            console.log('continue', i)
            continue
        }
        else{itemPool.push(passives[i])}
    }
    if(itemPool.length == 0){result = -1}
    else{result = Math.floor(itemPool.length * Math.random())}
    console.log(itemPool, result)
    return itemPool[result];
}

function itemAvailable(target){
    for(let i =0; i < passives.length; i++){
        if(!(target.has(passives[i].name))){
            return true
        }
    }
    return false
}

function combineSword(swordOne, swordTwo){
    const result = { //sets all the value for swords
        source: swordOne.source,
        name:swordOne.name + ' ' + swordTwo.name,
        width:swordOne.width,
        height:swordOne.height,
        damage:swordOne.damage,
        sprite:swordOne.sprite,
        runFuncCD:swordOne.runFuncCD,
        tier: swordOne.tier + swordTwo.tier,
        runFunc : null,
        clickFunc : null,
        knockback : swordOne.knockback,
        span : swordOne.span,
    }
    const newIncrease = {} //new increase value, will scale based on the mmodifeiers
    if(swordTwo.increase != null){
        const keys = Object.keys(swordTwo.increase)
        for(let i = 0; i < keys.length; i++){
            result[keys[i]] += swordTwo.increase[keys[i]] //adds the increase value to the new sword
            newIncrease[keys[i]] = Math.round(swordTwo.increase[keys[i]] * 1) //will add scale the increase value and add it to the new increase
        }
    }
    if(swordOne.increase != null){
        const keys = Object.keys(swordOne.increase)
        for(let i = 0; i < keys.length; i++){
            if(newIncrease[keys[i]] != null && newIncrease[keys[i]] != undefined){ ///if tehre is a key
                newIncrease[keys[i]] += Math.round(swordOne.increase[keys[i]] * 1) //scales
            }
            else{
                newIncrease[keys[i]] = Math.round(swordOne.increase[keys[i]] * 1) //scales based off of sword one increase
            }
        }
    }
    // run func
    if(swordOne.runFunc != null && swordTwo.runFunc != null){ //merges run and click funcs
        result.runFunc = (sword) => {
            swordOne.runFunc(sword)
            setTimeout(()=>{swordTwo.runFunc(sword)}, 20 * (swordOne.tier + 1)) //makes sure the effects doont execute at the same time, makes effects looks cooler
        }
    }
    else if(swordOne.runFunc == null && swordTwo.runFunc != null){
        result.runFunc = (sword) => {
            swordTwo.runFunc(sword)
        }
    }
    else if(swordOne.runFunc != null && swordTwo.runFunc == null){
        result.runFunc = (sword) => {
            swordOne.runFunc(sword)
        }
    }
    //end run func

    //click func
    if(swordOne.clickFunc != null && swordTwo.clickFunc != null){
        result.clickFunc = (sword, event) => {
            swordOne.clickFunc(sword, event)
            setTimeout(()=>{swordTwo.clickFunc(sword, event)},50 * (swordOne.tier + 1))
        }
    }
    else if(swordOne.clickFunc == null && swordTwo.clickFunc != null){
        result.clickFunc = (sword, event) => {
            swordTwo.clickFunc(sword, event)
        }
    }
    else if(swordOne.clickFunc != null && swordTwo.clickFunc == null){
        result.clickFunc = (sword, event) => {
            swordOne.clickFunc(sword, event)
        }
    }

    swordOne.recipe = swordOne.recipe.concat(swordTwo.recipe);
    swordOne.recipe.push([swordOne.name, swordTwo.name]);
    

    //end click func
    const finalSword = new melee(
        result.source, 
        result.damage, 
        result.width, 
        result.height, 
        result.knockback, 
        result.span, 
        result.name, 
        result.clickFunc, 
        result.runFunc,
        result.runFuncCD,
        result.tier,
        newIncrease,
        result.sprite) //makes new melee
        finalSword.recipe = swordOne.recipe;
        return finalSword;
}