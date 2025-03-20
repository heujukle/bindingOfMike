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