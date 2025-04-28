class portal{
    constructor(x, y, width, height, target){
        this.index;
        this.x = x
        this.y = y
        this.target = target
        this.width = width
        this.height = height
        this.type = 'portal'
        this.behavior = 'dynamic'
    }


    draw(){
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "purple";
        ctx.fill();
        ctx.closePath();
        if(this.collision2([this.target])){ //scales the difficulty
            console.log('portal')
            entitiySpeed = entitiySpeed + 1 >= 3 ?  entitiySpeed : entitiySpeed + 0.25; //limits to 3
            zombieHealth *= 1.5;
            zombieDamage *= 1.3;
            skeletonPspeed = skeletonPspeed + 1 >= 3 ?  skeletonPspeed : skeletonPspeed + 0.25;
            skeletonPdamage *= 1.2;
            skeletonDamage *= 1.2
            skeletonHealth *= 1.5;
            moneyScale += 0.2;
            itemScale *= 1.5;
            areaCount += 1;
            knockBackResistance = knockBackResistance - 0.2 < 0.1 ? 0.1 : knockBackResistance - 0.2 //keeps enemies taking some knockback
            switch(areaCount){
                case 1: 
                    rooms = rooms.concat(rooms1);
                    break;
                case 2:
                    rooms = rooms.concat(rooms2);
                    break;
                case 3:
                    break;
            }
            this.target.setArea(new area()) //makes new area
        }
    }

    collision2(target) {
        const left = this.x;
        const right = this.x + this.width;
        const top = this.y;
        const bottom = this.y + this.height;
        
        for (let i = 0; i < target.length; i++) {
            if(!(target[i] === this)){
            const tleft = target[i].x;
            const tright = target[i].x + target[i].width;
            const ttop = target[i].y;
            const tbottom = target[i].y + target[i].height;
            
            // Check if the rectangles are overlapping
            if (right > tleft && left < tright && bottom > ttop && top < tbottom) {
                // Collision detected
                return true;
                // You can add further collision handling logic here (e.g., bounce, stop movement, etc.)
            }
        }
    }
        return false;
    }


}

class shop{
constructor(x, y, width, height, target, forSale = undefined){
    this.index; //index in interactables
    this.x = x //x
    this.y = y //y
    this.target = target
    this.width = width
    this.height = height
    this.type = 'shop' //is shop
    this.behavior = 'dynamic' //dynamically changes
    const seed = Math.random() + ''
    this.forSale = forSale === undefined ? [
        healthInACan,
        determineValueArray(seed[4], meleeItems),
        determineValueArray(seed[5], stats),
        determineValueArray(seed[7], stats),
        determineValueArray(seed[6], passives),
    ] : forSale;
}


draw(){ 
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.fillStyle = "black";
    if(this.collision2([this.target])){ //checks if overlap and player has pressed interact button
        ctx.fillText(`press ${controls.interact.toUpperCase()} to interact`, this.x - 20, this.y - 20) //shows interact text
        if(this.target.interact == true){ //if player interacts
        this.loadStore() //loads store
        }
    }
    ctx.closePath();
}

collision2(target) {
    const left = this.x;
    const right = this.x + this.width;
    const top = this.y;
    const bottom = this.y + this.height;
    
    for (let i = 0; i < target.length; i++) {
        if(!(target[i] === this)){
        const tleft = target[i].x;
        const tright = target[i].x + target[i].width;
        const ttop = target[i].y;
        const tbottom = target[i].y + target[i].height;
        
        // Check if the rectangles are overlapping
        if (right > tleft && left < tright && bottom > ttop && top < tbottom) {
            // Collision detected
            return true;
            // You can add further collision handling logic here (e.g., bounce, stop movement, etc.)
        }
    }
}
    return false;
}

loadStore(){
    menu = true //turns on menu, which pauses game loop
    const mainStore = document.createElement('div') //creates store for overlay
    const exit = document.createElement('div') //creates exit button
    overlay.appendChild(mainStore) //adds store to overlay
    mainStore.appendChild(exit) //adds exit button
    exit.textContent = 'X' //exit text
    mainStore.classList.add('store')
    exit.classList.add('exit')
    exit.addEventListener('click', function(){
        menu = false
        overlay.innerHTML = ''
        overlay.classList.toggle('invisible')
    })
    for(let i = 0; i < this.forSale.length; i++){
        mainStore.appendChild(this.createItem(this.forSale[i]))
    }
    overlay.classList.toggle('invisible')
}

createItem(item){
    const frame = document.createElement('div')
    frame.classList.add('frame')
    const sprite = document.createElement('img')
    sprite.src = item.sprite != null ? item.sprite.src : 'images/Coin.png';
    frame.appendChild(sprite)
    const name = document.createElement('p')
    name.textContent = item.name;
    frame.appendChild(name)
    const price = document.createElement('p')
    price.textContent = '$' + item.price
    frame.appendChild(price)
    const purchase = document.createElement('div')
    if(Object.keys(this.target.passiveItems).includes(item.name)){
        purchase.textContent = 'You already Own!'
        purchase.classList.add('buyButton');
        frame.appendChild(purchase)
    }
    else{
    purchase.textContent = 'Buy!'
    purchase.classList.add('buyButton')
    frame.appendChild(purchase)
    purchase.addEventListener('click', () => {
        if(this.target.wallet >= item.price){
            updateWallet(-item.price, this.target)
            if(item.type == 'melee'){ //for melees
                this.target.meleeInventory.push(this.target.melee)
                this.target.melee = item.item();
                this.target.melee.source = this.target
                console.log(this.target.melee)
                this.forSale.splice(this.forSale.indexOf(item), 1)
                frame.remove()
            }
            else if(item.type == 'passiveItem'){ //for passive items
                this.target.addItem(item)
                this.forSale.splice(this.forSale.indexOf(item), 1)
                frame.remove()
            }
            else if(item.type == 'stat'){ //stats
                if(item.increment){
                    this.target.stats[item.statName] += item.increment
                }
                else{
                    this.target.stats[item.statName] += 1
                }
                if(item.statName == 'maxHealth'){ //updates the bars for the stats the affect the bars
                    this.target.updateHealthBar()
                }
                else if(item.statName == 'maxStamina'){
                    this.target.updateStaminaBar()
                }
                this.forSale.splice(this.forSale.indexOf(item), 1)
                frame.remove()
            }
            else if(item.type == 'health'){//for health items
                if(item.increment){
                    this.target.addHealth(item.increment)
                }
                else{
                    this.target.addHealth(1)
                }
                this.forSale.splice(this.forSale.indexOf(item), 1)
                frame.remove()
            }
        }
        else{
            purchase.textContent = 'BROKE AHAHAHHAHAHAHAHA' //youre broke
        }
    })
    }
    return frame;
    }

    }

class forge{
        constructor(x, y, width, height, target){
            this.index; //index in interactables
            this.x = x //x
            this.y = y //y
            this.target = target
            this.width = width
            this.height = height
            this.type = 'forge' //is shop
            this.behavior = 'dynamic' //dynamically changes
        }
        
        
        draw(){ 
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = "brown";
            ctx.fill();
            ctx.fillStyle = "black";
            if(this.collision2([this.target])){ //checks if overlap and player has pressed interact button
                ctx.fillText(`press ${controls.interact.toUpperCase()} to interact`, this.x - 20, this.y - 20) //shows interact text
                if(this.target.interact == true){ //if player interacts
                this.loadForge() //loads store
                }
            }
            ctx.closePath();
        }
        
        collision2(target) {
            const left = this.x;
            const right = this.x + this.width;
            const top = this.y;
            const bottom = this.y + this.height;
            
            for (let i = 0; i < target.length; i++) {
                if(!(target[i] === this)){
                const tleft = target[i].x;
                const tright = target[i].x + target[i].width;
                const ttop = target[i].y;
                const tbottom = target[i].y + target[i].height;
                
                // Check if the rectangles are overlapping
                if (right > tleft && left < tright && bottom > ttop && top < tbottom) {
                    // Collision detected
                    return true;
                    // You can add further collision handling logic here (e.g., bounce, stop movement, etc.)
                }
            }
        }
            return false;
        }
        
        loadForge(){
            menu = true
            overlay.innerHTML = ''
            overlay.classList.remove('invisible')
            topLeft.classList.add('invisible')
            const mainForge = createElement('div', null, {id:"forge"})
            overlay.appendChild(mainForge)
            const exit = createElement('div', 'exit', {textContent:'X'})
            exit.addEventListener('click', function(){
                menu = false
                overlay.innerHTML = ''
                overlay.classList.add('invisible')
                topLeft.classList.remove('invisible')
            })
            mainForge.appendChild(exit)
            const swordOne = createElement('div')
            const swordTwo = createElement('div')
            const result = createElement('div')
                mainForge.appendChild(swordOne)
                mainForge.appendChild(swordTwo)
                mainForge.appendChild(result)

            const headerOne = createElement('h1', null, {textContent: 'Base Sword'})
                swordOne.appendChild(headerOne)
            const columnOne = createElement('div', "forgeColumn")
                swordOne.appendChild(columnOne)

            const headerTwo = createElement('h1', null, {textContent: 'Modifer Sword'})
                swordTwo.appendChild(headerTwo)
            const columnTwo = createElement('div', "forgeColumn")
                swordTwo.appendChild(columnTwo)

            const resultHeader = createElement('h1', null, {textContent: 'Result'})
                result.appendChild(resultHeader)
            const columnThree = createElement('div', null, {id:'resultColumn'})
                result.appendChild(columnThree)

            let firstSword = null; //base sword to merge
            let secondSword = null; //modifier sword

            function generateResults(forge){ 
                if(firstSword === secondSword){//runs when two valid swords are chosen
                    columnThree.innerHTML = 'Cannot Merge Same sword into itself!'
                    return;
                }
                const newSword = combineSword(firstSword, secondSword);
                columnThree.innerHTML = ''
                const swordDisplay = createElement('div', 'mergePreview')
                    columnThree.appendChild(swordDisplay)
                const swordImg = createElement('img', 'd25pXauto', {src:newSword.sprite.src})
                    swordDisplay.appendChild(swordImg)
                const name = createElement('h3', null, {textContent:`Name : ${newSword.name}`}, swordDisplay)
                const damage = createElement('div', null, {textContent:`Damage : ${newSword.damage}`}, swordDisplay)
                const knockback = createElement('div', null, {textContent:`Knockback : ${newSword.knockback}`}, swordDisplay)
                const span = createElement('div', null, {textContent:`Span : ${newSword.span}`}, swordDisplay)
                const runFuncCD = createElement('div', null, {textContent:`Run Func CD : ${newSword.runFuncCD}`}, swordDisplay)
                const width = createElement('div', null, {textContent:`Width : ${newSword.width}`}, swordDisplay)
                const height = createElement('div', null, {textContent:`Height : ${newSword.height}`}, swordDisplay)

                const requirementsDisplay = createElement('div', 'materialsPreview')
                    columnThree.appendChild(requirementsDisplay)
                const requirements = mergeRequirements[1] //grabs the cheapest prices, is in a object not an array
                const keys = Object.keys(requirements) //bug
                const magicIncrementNumber = Math.floor(Math.pow(1.3, newSword.tier)) //number to multiply the price by
                let canMerge = true
                for(let i = 0; i < keys.length; i++){
                    let cssClass = null
                    let amount = 0
                    if(forge.target.materials[keys[i]] != undefined || forge.target.materials[keys[i]] != null){
                        amount = forge.target.materials[keys[i]].amount //sets the amount equal to what the player has
                    }
                    if(amount < requirements[keys[i]] * magicIncrementNumber){ //updates color to show when player cannot afford
                        cssClass = 'broke'
                        canMerge = false //prevents merge
                    }
                    console.log(requirements)
                    console.log(requirements[keys[i]])
                    createElement('div', cssClass, {textContent:`${keys[i]} : ${amount} / ${requirements[keys[i]] * magicIncrementNumber}`}, requirementsDisplay)
                }
                if(canMerge){
                    const interact = createElement('div', "mergeButton", {textContent:`Merge Weapons`}, columnThree)
                    function mergeWeapons(forge){
                        console.log(forge)
                        let saveEquppied  = true
                        if(forge.target.meleeInventory.indexOf(firstSword) != -1){
                            forge.target.meleeInventory.splice(forge.target.meleeInventory.indexOf(firstSword), 1)
                            saveEquppied = !saveEquppied //will save the quipped weapon if both weapons are in inventory
                        }
                        if(forge.target.meleeInventory.indexOf(secondSword) != -1){
                            forge.target.meleeInventory.splice(forge.target.meleeInventory.indexOf(secondSword), 1)
                            saveEquppied = !saveEquppied
                        }
                        if(saveEquppied) forge.target.meleeInventory.push(forge.target.melee)
                        forge.target.melee = newSword;
                        for(let i = 0; i < keys.length; i++){
                            if(requirements[keys[i]] <= 0){
                                continue;
                            }
                            forge.target.materials[keys[i]].amount -= requirements[keys[i]]
                        }
                        overlay.innerHTML = '' //reloads the forge
                        forge.loadForge()
                    }
                    interact.addEventListener('click', (e) => {mergeWeapons(forge)})
                }
                
                
                
                
            }

            function setFirstSword(sword, element, forge){
                firstSword = sword
                if(document.getElementById('swordOneSelected')){
                    document.getElementById('swordOneSelected').id = ''
                }
                element.id = 'swordOneSelected'
                if(firstSword != null && secondSword != null){
                    generateResults(forge)
                }
            }

            function setSecondSword(sword, element, forge){
                secondSword = sword
                if(document.getElementById('swordTwoSelected')){
                    document.getElementById('swordTwoSelected').id = ''
                }
                element.id = 'swordTwoSelected'
                if(firstSword != null && secondSword != null){
                    generateResults(forge)
                }
            }

            const equippedSword = this.target.melee
            if(equippedSword.tier <= 150){
            const displayEquip1 = createMeleeInv(equippedSword, false) //im making ui see functions in menu
                displayEquip1.addEventListener('click', (e)=>{setFirstSword(equippedSword, displayEquip1, this)})
                columnOne.appendChild(displayEquip1)
                addHoverFunctionality(displayEquip1, equippedSword)
            const displayEquip2 = createMeleeInv(equippedSword, false)
                displayEquip2.addEventListener('click', (e)=>{setSecondSword(equippedSword, displayEquip2, this)})
                columnTwo.appendChild(displayEquip2)
                addHoverFunctionality(displayEquip2, equippedSword)
            }

            for(let i = 0; i < this.target.meleeInventory.length; i++){
                const sword = this.target.meleeInventory[i]
                if(sword.tier >= 150){
                    continue;
                }
                const displayEquip1 = createMeleeInv(sword, false)
                    displayEquip1.addEventListener('click', (e)=>{setFirstSword(sword, displayEquip1, this)})
                    columnOne.appendChild(displayEquip1)
                    addHoverFunctionality(displayEquip1, sword)
                const displayEquip2 = createMeleeInv(sword, false)
                    displayEquip2.addEventListener('click', (e)=>{setSecondSword(sword, displayEquip2, this)})
                    columnTwo.appendChild(displayEquip2)
                    addHoverFunctionality(displayEquip2, sword)
            }
        }

        
    }

    class chest{
        constructor(x, y, width, height, target){
            this.index; //index in interactables
            this.x = x //x
            this.y = y //y
            this.target = target
            this.width = width
            this.height = height
            this.type = 'chest' //is shop
            this.behavior = 'dynamic' //dynamically changes
            this.opened = false;
        }
        
        
        draw(){ 
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = "#452d1f";
            ctx.fill();
            ctx.fillStyle = "black";
            if(this.collision2([this.target]) && this.opened == false && itemAvailable(this.target)){ //checks if overlap and player has pressed interact button
                ctx.fillText(`press ${controls.interact.toUpperCase()} to interact`, this.x - 20, this.y - 20) //shows interact text
                if(this.target.interact == true){ //if player interacts
                this.openChest() //loads store
                }
            }
            ctx.closePath();
        }
        
        collision2(target) {
            const left = this.x;
            const right = this.x + this.width;
            const top = this.y;
            const bottom = this.y + this.height;
            
            for (let i = 0; i < target.length; i++) {
                if(!(target[i] === this)){
                const tleft = target[i].x;
                const tright = target[i].x + target[i].width;
                const ttop = target[i].y;
                const tbottom = target[i].y + target[i].height;
                
                // Check if the rectangles are overlapping
                if (right > tleft && left < tright && bottom > ttop && top < tbottom) {
                    // Collision detected
                    return true;
                    // You can add further collision handling logic here (e.g., bounce, stop movement, etc.)
                }
            }
        }
            return false;
        }
        
        openChest(){
            this.opened = true;
            dropItems(findItemNotHad(this.target), this.target)
        }
            }