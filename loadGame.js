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
            character.wallet = saveData.character.wallet;
            character.flasks = saveData.character.flasks;
            username = saveData.username
            document.title = username
            parsePassiveItems(saveData)
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

function parsePassiveItems(saveData){
    for(item of saveData.character.items){
        character.addItem(passiveItemSrc[item]);
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

function parseEntities(entities){
    const result = []
    for(let i = 0; i < entities.length; i++){
        const entity = entities[i];
        if(entity.unqiue !== undefined){
            const uniqueVals = Object.keys(entity.unqiue);
            const newEntityInfo = tiles.get(entity.instance)(entity.x, entity.y, entity.width, entity.height, uniqueVals[0], uniqueVals[1])
            const madeEntity = newEntityInfo.Obj
            madeEntity.health = entity.health
            madeEntity.offsets = entity.offsets;
            result.push(madeEntity)
        }
        else{
            const newEntityInfo = tiles.get(entity.instance)(entity.x, entity.y, entity.width, entity.height)
            const madeEntity = newEntityInfo.Obj
            madeEntity.health = entity.health
            madeEntity.offsets = entity.offsets;
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
            const newEntityInfo =  tiles.get(entity.instance)(entity.x, entity.y, entity.width, entity.height, uniqueVals[0], uniqueVals[1])
            const madeEntity = newEntityInfo.Obj
            madeEntity.offsets = entity.offsets;
            result.push(madeEntity)
        }
        else{
            const newEntityInfo = tiles.get(entity.instance)(entity.x, entity.y, entity.width, entity.height)
            const madeEntity = newEntityInfo.Obj
            madeEntity.offsets = entity.offsets;
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