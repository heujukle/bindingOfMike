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
    if(recipe.length == 1) return recipe[0][0]
    for(let i = 0; i < recipe.length; i++){
        
        let swordOne = meleeItemSrc[recipe[i][0]].item();
        if(swordOne == undefined){
            swordOne = completedSwords[recipe[i][0]];
        }
        let swordTwo = meleeItemSrc[recipe[i][1]].item();
        if(swordTwo == undefined){
            swordTwo = completedSwords[recipe[i][1]];
        }
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