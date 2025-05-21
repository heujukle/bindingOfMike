function parseSaveFile(file){
    if(file){
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileContent = e.target.result;
            const saveData = JSON.parse(fileContent);
            console.log(saveData)
            character.stats = saveData.character.stats;
            character.health = saveData.character.health;
            character.stamina = saveData.character.stamina;
            character.materials = saveData.character.materials;
            character.melee = parseMelee(saveData.character.equippedMelee);
            document.getElementById('playerSword').src = character.melee.sprite;
            character.meleeInventory = parseMeleeInventory(saveData.character.meleeInventory);
            character.setArea(new area(saveData.character.area))
            entities.clear();
            interactables.clear();
            character.setRoom(character.area.map.get(saveData.character.room))
            character.x = character.room.width * saveData.character.offsets.xOffset;
            character.y = character.room.height * saveData.character.offsets.yOffset;
            character.offsets = saveData.character.offsets
            resize()
            updateMap(character, saveData.character.map);

            //start game
            menu = false;
            title.textContent = nameInput.value + " Game"
            start.classList.add('invisible')
            topLeft.classList.remove('invisible')
            topRight.classList.remove('invisible')
            mapElement.classList.remove('invisible')
        }
        reader.readAsText(file);
    }
}

function parseMelee(recipe){
    console.log(recipe);
    if(recipe == undefined || recipe == null){
        return meleeItemsSrc['error sword'].item(character);
    }
    const completedSwords = {};
    if(recipe[0].length === 1){
        console.log('returned bro')
        console.log(recipe[0][0])
        return meleeItemsSrc[recipe[0][0]].item(character);
    } 
    for(let i = 0; i < recipe.length; i++){
        console.log('loop')
        let swordOne = meleeItemsSrc[recipe[i][0]] == undefined ? completedSwords[recipe[i][0]] : meleeItemsSrc[recipe[i][0]].item(character);
        let swordTwo = meleeItemsSrc[recipe[i][1]] == undefined ? completedSwords[recipe[i][1]] : meleeItemsSrc[recipe[i][1]].item(character);
        const mergedSword = combineSword(swordOne, swordTwo);
        completedSwords[mergedSword.name] = mergedSword;
        console.log(i, recipe.length - 1)
        if(i === recipe.length - 1){
            console.log("returned a sword")
            return mergedSword;
        }
    }
}

function parseMeleeInventory(recipes){
    const result = [];
    for(let i = 0; i < recipes.length; i++){
        result.push(parseMelee(recipes[i]));
    }
    return result;
}

const saveableEntities ={
    'zombie' : (x, y, health)=> {
        const entity = new zombie(x, y, 30, 30, character, entitiySpeed, zombieHealth, zombieDamage, knockBackResistance);
        entity.health = health
        return entity;
    },
    'skeleton' : (x, y, health)=> {
        const entity = new skeleton(x, y, 30, 30, character, entitiySpeed/2, skeletonHealth, skeletonDamage, skeletonPdamage, skeletonPspeed, knockBackResistance);
        entity.health = health
        return entity;
    },
    'boomskeleton' : (x, y, health)=> {
        const entity = new boomSkeleton(x, y, 30, 30, character, entitiySpeed/2, skeletonHealth, skeletonDamage, skeletonPdamage, skeletonPspeed * 1.5, knockBackResistance);
        entity.health = health
        return entity;
    },
    'evilzombie' : (x, y, health)=> {
        const entity = new evilZombie(x, y, 40, 40, character, entitiySpeed * 0.75, zombieHealth, zombieDamage * 1.5, knockBackResistance);
        entity.health = health
        return entity;
    },
    'warrior' : (x, y, health, type = 'basic')=> {
        const entity = new Warrior(x, y, 50, 50, character, entitiySpeed, zombieHealth * 2, zombieDamage, knockBackResistance, type);
        entity.health = health
        return entity;
    },
    'spawner' : (x, y, health, type)=> {
        const entity = new spawner(x, y, width, height, character, type);
        entity.health = health
        return entity;
    },
    'dummy' : (x, y)=> {
        const entity = new dummy(x, y, width, height);
        return entity;
    },
    'threadling' : (x, y, health)=> {
        const entity = new threadling(x, y, 10, 10, 10, 15, 'player');
        return entity;
    },
}


const saveableInteractables = {
   'portal' : (x, y) =>{
    const interactable = new portal(x, y, width, height, character);
    return interactable;
   },
   'shop' : (x, y, forSale) => {
    const interactable = new shop(x, y, width, height, character, forSale);
    return interactable;
   },
   'forge' : (x, y) => {
    const interactable = new forge(x, y, width, height, character);
    return interactable;
   },
   'chest' : (x, y, opened) => {
    const interactable = new chest(x, y, width, height, chracater, opened);
    return interactable;
   }
}
function parseEntities(entities){
    const result = []
    for(let i = 0; i < entities.length; i++){
        const entity = entities[i];
        if(entity.unqiue !== undefined){
            const uniqueVals = Object.keys(entity.unqiue);
            const madeEntity = saveableEntities[entity.instance](entity.x, entity.y, entity.health, uniqueVals[0], uniqueVals[1])
            madeEntity.offsets = entities[i].offsets;
            result.push(madeEntity)
        }
        else{
            const madeEntity = saveableEntities[entity.instance](entity.x, entity.y, entity.health)
            madeEntity.offsets = entities[i].offsets;
            result.push(madeEntity)
        }
    }
    return result;
}

function parseInteractables(entities){
    const result = []
    for(let i = 0; i < entities.length; i++){
        const entity = entities[i];
        if(entity.unqiue !== undefined){
            const uniqueVals = Object.keys(entity.unqiue);
            const madeEntity = saveableInteractables[entity.instance](entity.x, entity.y, entity.health, uniqueVals[0], uniqueVals[1])
            madeEntity.offsets = entities[i].offsets;
            result.push(madeEntity)
        }
        else{
            const madeEntity = saveableInteractables[entity.instance](entity.x, entity.y, entity.health)
            madeEntity.offsets = entities[i].offsets;
            result.push(madeEntity)
        }
    }
    return result;
}

function updateMap(character, cordList){
    for(let i = 0; i < cordList.length; i++){
        character.map.updateMap(cordList[i]);
    }
}