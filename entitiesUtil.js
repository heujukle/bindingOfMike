function summon(source, type){
    console.log('rahh')
    let summonEntity = () =>{};
    switch(type){
        case "zombie":
            summonEntity = (x, y) => {return new zombie(x, y, 25, 25, source.target, entitiySpeed, zombieHealth/2, zombieDamage/2, knockBackResistance/2, true)}
            break;
    }
    const amount = Math.ceil(Math.random() * 3);
    console.log(amount)
    for(let i = 0; i < amount; i++){
        const x = (source.x - width) + width * Math.random() * 2
        const y = (source.y - height) + height * Math.random() * 2
        console.log("X: ", x, "Y: ",y)
        entities.add(summonEntity(x, y))
    }
}

function determineTarget(source){
    let shortestDistance = -Math.max();
    console.log(shortestDistance)
    let result = null
    for(let i = 0; i < entities.list.length; i++){
        if(entities.list[i] === source || entities.list[i] === null) continue;
        const distance = Math.sqrt(Math.pow(entities.list[i].x - source.x, 2) + Math.pow(entities.list[i].y - source.y, 2))
        console.log(distance)
        if (distance < shortestDistance && entities.list[i].allied != source.allied) {
            shortestDistance = distance
            result = entities.list[i]
            console.log("passed in")
        }
    }
    return result;
}

function handleResize(list, roomPrevWindowWidth = null, roomPrevWindowHeight = null){ //will update values to fit new window size works for all objects with a x y width and height
    baseWidth = roomPrevWindowWidth == null ? prevWindowWidth : roomPrevWindowWidth
    baseHeight = roomPrevWindowHeight == null ? prevWindowHeight : roomPrevWindowHeight
    for(let i = 0; i < list.length; i++){
        if(list[i] === null) continue;
        const widthRatio = list[i].width / baseWidth;
        const heightRatio = list[i].height / baseHeight;
        const xRatio = list[i].x / baseWidth;
        const yRatio = list[i].y / baseHeight;
        list[i].width = window.innerWidth * widthRatio;
        list[i].height = window.innerHeight * heightRatio;
        list[i].x = window.innerWidth * xRatio;
        list[i].y = window.innerHeight * yRatio;
    }
}

function adjustSize(list, widthOnly = false){ // a function for resizing normal sized 
    for(let i = 0; i < list.length; i++){
        if(list[i] === null) continue;
        //these offsets are set upon object creation and dont change
        if(list[i].offsets.widthOffset !== undefined){
            list[i].width = window.innerWidth * list[i].offsets.widthOffset;
            list[i].height = window.innerHeight * list[i].offsets.heightOffset;
        }
        else{
            list[i].width = width;
            list[i].height = height;
        }
        //these offsets are set upon object saving and do change, implementation can be found in structures.js 
        if(!widthOnly){
            list[i].x = character.room.width * list[i].offsets.xOffset; 
            list[i].y = character.room.height * list[i].offsets.yOffset;
        }
    }
}
//a function to update cord offsets, allows for relative movement 
function cordOffsets(list){
    for(entity of list){
        if(entity === null) continue;
        entity.offsets.xOffset = entity.x / character.room.width;
        entity.offsets.yOffset = entity.y / character.room.height;
    }
}