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
        this.newSpeed = zombieSpeed + 1
    }


    draw(){
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "purple";
        ctx.fill();
        ctx.closePath();
        if(this.collision2([this.target])){
            console.log('portal')
            zombieSpeed = this.newSpeed
            this.target.setArea(new area())
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
constructor(x, y, width, height, target){
    this.index; //index in interactables
    this.x = x //x
    this.y = y //y
    this.target = target
    this.width = width
    this.height = height
    this.type = 'shop' //is shop
    this.behavior = 'dynamic' //dynamically changes
    this.forSale = [
        meleeItems[2],
    {
        item:'multiShot',
        price:0,
        type:'stat',
        statName:'multishot'
    }
    ]
}


draw(){ 
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.fillStyle = "black";
    if(this.collision2([this.target])){ //checks if overlap and player has pressed interact button
        ctx.fillText('press E to interact', this.x - 20, this.y - 20) //shows interact text
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
    const overlay = document.getElementById('overlay'); //grabs overlay 
    hotbar.classList.toggle('invisible') //makes hotbar invisible
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
        hotbar.classList.toggle('invisible')
    })
    for(let i = 0; i < this.forSale.length; i++){
        mainStore.appendChild(this.createItem(this.forSale[i], i))
    }
    overlay.classList.toggle('invisible')
}

createItem(item, index){
    const itemIndex = index;
    const frame = document.createElement('div')
    frame.classList.add('frame')
    const sprite = document.createElement('img')
    sprite.src = item.item.sprite != null ? item.item.sprite.src : 'images/Coin.png';
    frame.appendChild(sprite)
    const name = document.createElement('p')
    name.textContent = item.item.name != null ? item.item.name : item.item;
    frame.appendChild(name)
    const price = document.createElement('p')
    price.textContent = '$' + item.price
    frame.appendChild(price)
    const purchase = document.createElement('div')
    purchase.textContent = 'Buy!'
    purchase.classList.add('buyButton')
    frame.appendChild(purchase)
    purchase.addEventListener('click', () => {
        if(this.target.wallet >= item.price){
            updateWallet(-item.price, this.target)
            if(item.type == 'melee'){
                this.target.melee = item.item;
                this.target.melee.source = this.target
                console.log(this.target.melee)
                this.forSale.splice(itemIndex, 1)
                frame.remove()
            }
            else if(item.type == 'passiveItem'){
                this.target.passiveItems.push(item.item);
                this.forSale.splice(itemIndex, 1)
                frame.remove()
            }
            else if(item.type == 'stat'){
                this.target.stats[item.statName] += 1;
                this.forSale.splice(itemIndex, 1)
                frame.remove()
            }
        }
        else{
            purchase.textContent = 'BROKE AHAHAHHAHAHAHAHA'
        }
    })
    return frame;
}
}