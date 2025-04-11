function saveGame(character){
    // The content of the file
    console.log(character)
    const content = {
        areaCount : areaCount,
        character : {
            stats : character.stats,
            health : character.health,
            stamina : character.stamina,
            items : Object.keys(character.passiveItems),
            equippedMelee : formatMelee(character.melee),
            meleeInventory : formatMeleeInventory(character),
        }
    };
            
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
        return [melee.recipe];
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
    const result = {};
}