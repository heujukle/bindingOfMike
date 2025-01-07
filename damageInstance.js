/*To be remnamed to interactables */

class projectile{
    constructor(startX, startY, width, height, xVelocity, yVelocity, source ,repeating = false, room = character.room, color = "#000000", damage = 5, ricochet = false){
        this.room = room;
        this.index;
        this.x = startX;
        this.y = startY;
        this.startX = startX;
        this.startY = startY;
        this.width = width;
        this.height = height;
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
        this.source = source;
        this.repeating = repeating;
        this.color = color;
        this.damage = damage;
        this.ricochet = ricochet
        console.log(color)
        console.log(damage)
        console.log(ricochet)
    }


    draw(){
        // richochet
        if(this.ricochet === true){
            console.log(this.ricochet)

            this.x += this.xVelocity
            if(this.collision2(structures.list)){
                this.xVelocity *= -1
            }
            this.x -= this.xVelocity
            this.y += this.yVelocity * 2
            if(this.collision2(structures.list)){
                this.yVelocity *= -1
            }
            this.y -= this.yVelocity
            this.x += this.xVelocity
            if(this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0 || this.entityCollision()){
                if(this.repeating){
                    this.x = this.startX;
                    this.y = this.startY;
                }
                else{
                    console.log('reset')
                    damageInstances.remove(this.index)
                    return;
                }
            }
        }
        //normal
        else{
            this.x += this.xVelocity
            this.y += this.yVelocity
            // this.detectCollision();
                if(this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0 || this.collision2(structures.list) || this.entityCollision()){
                    if(this.repeating){
                        this.x = this.startX;
                        this.y = this.startY;
                    }
                    else{
                        console.log('reset')
                        damageInstances.remove(this.index)
                        return;
                    }
                }
        }
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#000000";
        ctx.fill();
        ctx.closePath();
    }

    detectCollision(){
        if(this.collision2(structures.list)){
            entities.remove(this.index);
        }
    }

    detectStructures(points){
        for(let i = 0; i < points.length; i++) {
            let cords = inSpace(points[i]);
            let space = this.room.layout.get(cords)
            if(space){
            console.log(space.type)
            if(space.type != 'space'){
                console.log('true')
                return true;
            }
        }
        }
    }

    collision2(target) {
        const left = this.x;
        const right = this.x + this.width;
        const top = this.y;
        const bottom = this.y + this.height;
        
        for (let i = 0; i < target.length; i++) {
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
        return false;
    }

    entityCollision(){
        const left = this.x;
        const right = this.x + this.width;
        const top = this.y;
        const bottom = this.y + this.height;
        if(this.source != "player"){
            const tleft = character.x;
            const tright = character.x + character.width;
            const ttop = character.y;
            const tbottom = character.y + character.height;
            if (right > tleft && left < tright && bottom > ttop && top < tbottom) {
                character.onDamage(this.damage);
                console.log(character.health)
                return true;
            }
            else{
                return false
            }
        }
        else{
            for(let i = 0; i < entities.list.length; i++){
                if(entities.list[i] == null){
                    continue;
                }
                const tleft = entities.list[i].x;
                const tright = entities.list[i].x + entities.list[i].width;
                const ttop = entities.list[i].y;
                const tbottom = entities.list[i].y + entities.list[i].height;
                if (right > tleft && left < tright && bottom > ttop && top < tbottom) {
                    entities.list[i].health -= this.damage;
                    entities.list[i].onDamage(this.damage)
                    return true;
                }
            }
        }
        return false;
    }

}

class melee{
    constructor(source, damage, width, height, name = 'sword', sprite = document.getElementById('sword')){
        this.name = name
        this.span;
        this.source = source
        this.x;
        this.y;
        this.width = width;
        this.height = height;
        this.damage = damage;
        this.index;
        this.target;
        this.currentAngle;
        this.step = 5; //how many pixels the sword moves
        this.animating = false;
        this.hitList = []
        this.sprite = sprite;
    }

    setValues(span, mouseAngle){
            this.span = span;
            this.currentAngle = mouseAngle - this.span/2;
            this.target = span + this.currentAngle;
    }

    animate(){ //should change the degrees for this frame
        this.currentAngle = this.currentAngle + this.step;
        if(this.currentAngle > this.target){
            damageInstances.remove(this.index);
            this.hitList = []
            this.animating = false;
        }
    }

    draw(){
        this.x = this.source.x + this.source.width/2
        this.y = this.source.y + this.source.height/2
        this.animate();
        ctx.beginPath();
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(((this.currentAngle * Math.PI) / 180) + 90)
        ctx.translate(-this.x, -this.y)
        ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height)
        // ctx.rect(this.x, this.y, this.width, this.height);
        // ctx.fillStyle = "#0000ff";
        // ctx.fill();
        ctx.restore();
        ctx.closePath()
        ctx.lineWidth = 1;
        for(let i = 0; i < entities.list.length; i++){
            if(this.detectCollision(entities.list[i])){
                console.log('I love writing code')
            }
        }
    }

    detectCollision(other){
        let points = [];
        if(other === null){
            return;
        }
        if(!(other.points)){
            let topRight = {
                x: other.x + other.width,
                y: other.y
            }
            let topLeft = {
                x: other.x,
                y: other.y
            }
            let bottomRight = {
                x: other.x + other.width,
                y: other.y + other.height
            }
            let bottomLeft = {
                x: other.x,
                y: other.y + other.height
            }
            points = [topLeft, topRight, bottomRight, bottomLeft];
        }
        else{
            console.log('points')
            points = other.points;
        }
        for(let i = 0; i < points.length; i++){
            let targetDegrees = findDegrees(points[i].x, points[i].y, this.x, this.y)
            let distance = findDistance(points[i].x, points[i].y, this.x, this.y)
            if(this.currentAngle >= targetDegrees - this.width/2 && this.currentAngle <= targetDegrees + this.width/2 && distance < this.height){ //checks if the sword is facing the point and reaches the point
                if(this.hitList.indexOf(other) == -1){
                    other.onDamage(this.damage)
                    if(other.xVelocity != null){
                        console.log('knockbackX')
                        other.xVelocity = other.x > this.source.x ? other.xVelocity += 5 : other.xVelocity -= 5
                    }
                    if(other.yVelocity != null){
                        console.log('knockbackY')
                        other.yVelocity = other.y > this.source.y ? other.yVelocity += 5 : other.yVelocity -= 5
                    }
                    this.hitList.push(other)
                }
                return true;
            }
        }
    }
}

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
        this.forSale = [{ //list of items for sale
            item:new melee(target, 10, 100, 300, 'Big sword'), //item itself
            price:100, //price
            type: 'melee' //type
        }, 
        {
            item:'multiShot',
            price:0,
            type:'stat',
            statName:'multishot'
        }]
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