function summon(source, type){
    let summonEntity = () =>{};
    switch(type){
        case "zombie":
            summonEntity = (x, y) => {new zombie(x, y, 25, 25, source.target, entitiySpeed, zombieHealth/2, zombieDamage/2, knockBackResistance/2)}
            break;
    }
    const amount = Math.ceil(Math.random * 3);
    
}