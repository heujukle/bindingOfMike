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
        return new melee(this, 10, 30, 125, 5, 90, 'Error sword', undefined, undefined, undefined, 1, {damage:10, span:10})
    }
    const completedSwords = {};
    console.log(recipe[0][0].length)
    if(recipe[0].length == 1){
        console.log('returned bro')
        return recipe[0][0]
    } 
    for(let i = 0; i < recipe.length; i++){
        console.log('loop')
        let swordOne = meleeItemsSrc[recipe[i][0]] == undefined ? completedSwords[recipe[i][0]] : swordOne = meleeItemsSrc[recipe[i][0]].item();
        let swordTwo  = meleeItemsSrc[recipe[i][1]] == undefined ? completedSwords[recipe[i][1]] : swordOne = meleeItemsSrc[recipe[i][1]].item();
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

}