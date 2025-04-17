function saveGame(character){
    // The content of the file
    console.log(character)
    const area = formatArea(character.area);
    console.log(area);
    const content = {
        areaCount : areaCount,
        character : {
            stats : character.stats,
            health : character.health,
            stamina : character.stamina,
            items : Object.keys(character.passiveItems),
            equippedMelee : formatMelee(character.melee),
            meleeInventory : formatMeleeInventory(character),
            materials : character.materials,
            x : character.x,
            y : character.y,
            area : area,
            room : character.room.cords,
        }
    };
    
    console.log(content);

    // Create a Blob object with the content
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });

    // Create a download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'myfile.json'; // Specify the name of the file to download
    
    // Trigger the download
    link.click();
    
    // Clean up the object URL
    URL.revokeObjectURL(link.href);
}

function formatMelee(melee){
    if(melee.recipe.length > 0){
        return melee.recipe;
    }
    else{
        return [[melee.name]];
    }
}

function formatMeleeInventory(character){
    const result = []
    for(let i = 0; i < character.meleeInventory.length; i++){
        const meleeRecipe = formatMelee(character.meleeInventory[i])
        result.push(meleeRecipe);
    }
    return result;
}

function formatArea(area){
    const result = {};
    const array = Array.from(area.map.keys())
    for(let i = 0; i < array.length; i++){
        const roomObj = formatRoom(area.map.get(array[i]));
        result[array[i]] = roomObj;
    }
    return result;
}


function formatRoom(room){
    const left = room.left !== null ? room.left.cords : null;
    const right = room.right !== null ? room.right.cords : null;
    const top = room.top !== null ? room.top.cords : null;
    const bottom = room.bottom !== null ? room.bottom.cords : null;
    const result = {
        layout : room.layout,
        left : left,
        right : right,
        top : top,
        bottom : bottom,
        entities : formatEntities(room.savedEntities),
        interactables : formatInteractables(room.savedInteractables),
        entered : room.entered
    };
    return result;
}

function formatEntities(entities){
    const result = [];
    for(let i = 0; i < entities.length; i++){
        if(entities[i] == null) continue;
        const obj = {
            instance : entities[i].instance,
            x : entities[i].x,
            y : entities[i].y,
            health : entities[i].health,
            unique : undefined
        }
        switch(entities[i].instance){
            case "warrior":
                obj.unique = {
                    type : entities[i].type
                }
                break;
                case "spawner":
                    obj.unique = {
                        type : entities[i].type
                    }
                    break;
        }
        result.push(obj);
    }
    return result;
}

function formatInteractables(interactables){
    const result = [];
    for(let i = 0; i < interactables.length; i++){
        const obj = {
            instance : interactables[i].type,
            x : interactables[i].x,
            y : interactables[i].y,
            unique : undefined
        }
        switch(interactables[i].instance){
            case "chest":
                obj.unique = {
                    opened : interactables[i].opened,
                }
                break;
                case "store":
                    obj.unique = {
                        forSale : interactables[i].forSale,
                    }
                    break;
        }
        result.push(obj);
    }
    return result;
}