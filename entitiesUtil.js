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