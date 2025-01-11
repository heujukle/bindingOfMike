/*To be remnamed to interactables */

class projectile{
    constructor(startX, startY, width, height, xVelocity, yVelocity, source ,repeating = false, room = character.room, color = "#000000", damage = 5, ricochet = false){
        this.room = room; //what room the projectile occupies
        this.index; //index in the damageinstance/interactable array
        this.startX = startX; //saves the start cords for repeating projectiles
        this.startY = startY;
        this.x = startX; //xcord
        this.y = startY;//ycord
        this.width = width; //width of projectile
        this.height = height; //height of projectile
        this.xVelocity = xVelocity; //velocity of projectile
        this.yVelocity = yVelocity; //velocity
        this.source = source; //source, just a unique string per source, doesn't link back to main object
        this.repeating = repeating; //if the object is repeating
        this.color = color; //color
        this.damage = damage; //how much damage
        this.ricochet = ricochet; //if the projectile richochets
    }


    draw(){
        // richochet
        if(this.ricochet === true){ //if richochet
            console.log(this.ricochet)

            this.x += this.xVelocity //checks x collision first
            if(this.collision2(structures.list)){ //if x collison then it flips the x veolicty direction
                this.xVelocity *= -1
            }
            this.x -= this.xVelocity //undoes x movement to prevent trigger the y collsion detection
            this.y += this.yVelocity * 2 // idk why this is required but it works
            if(this.collision2(structures.list)){ //checks for y collisions
                this.yVelocity *= -1
            }
            this.y -= this.yVelocity //fixes the y velocicty
            this.x += this.xVelocity //readds xvelocity
            if(this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0 || this.entityCollision()){ //if hits enemeny or oobs the remove or repeat
                if(this.repeating){//repeats
                    this.x = this.startX;
                    this.y = this.startY;
                }
                else{ //removes
                    console.log('reset')
                    damageInstances.remove(this.index)
                    return;
                }
            }
        }
        //normal
        else{
            this.x += this.xVelocity //adds velocities
            this.y += this.yVelocity
            // checks collisions
                if(this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0 || this.collision2(structures.list) || this.entityCollision()){ 
                    if(this.repeating){//repeats projectile
                        this.x = this.startX; 
                        this.y = this.startY;
                    }
                    else{ //resets projectile
                        console.log('reset')
                        damageInstances.remove(this.index)
                        return;
                    }
                }
        }
        ctx.beginPath(); //draws the projectile to the canvas
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#000000";
        ctx.fill();
        ctx.closePath();
    }

    detectCollision(){ //unused code for collision
        if(this.collision2(structures.list)){
            entities.remove(this.index);
        }
    }

    detectStructures(points){ //different way for structure collsion detect
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

    collision2(target) { //final way for collision detect in object, most new entities use the function in mikeGame however
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

    entityCollision(){ //prevents entity collision with self, and applies the ondamage
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
    constructor(source, damage, width, height, knockback = 5, span = 90, name = 'sword', clickFunc = null, runFunc = null, runFuncCD = 50, sprite = document.getElementById('sword')){
        this.name = name //name of obj
        this.span; //how wide the blade spans, degrees aroudn the player
        this.source = source //source, does link back to source
        this.x; //x links to source x and y when swung
        this.y;//y
        this.width = width; //width
        this.height = height; //height
        this.damage = damage; //damage
        this.index; //index in damage instance array
        this.target; //target is the target angle at the end
        this.currentAngle; //the current angle of the sword for that frame
        this.step = 5; //how many pixels the sword moves
        this.animating = false; //if the sword is animating
        this.hitList = [] //entities teh sword has it in a swing
        this.sprite = sprite; //image teh sword displays, default is the sword png
        this.knockback = knockback //how much knockback the sword gives
        this.span = span
        this.clickFunc = clickFunc
        this.runFunc = runFunc
        this.runFuncCD = runFuncCD
    }

    setValues(mouseAngle, event){ //called on mouse click
            this.currentAngle = mouseAngle - this.span/2; //current angle is set to half the span away from where cursor was clicked
            this.startingAngle = this.currentAngle
            this.target = this.span + this.currentAngle; 
            if(this.clickFunc){
                this.clickFunc(this, event)
                console.log('clickFunc')
            }
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
        let currentTime = document.timeline.currentTime
        if(this.runFunc != null && (currentTime - this.lastRun > this.runFuncCD || this.lastRun == undefined)){ 
            console.log('run funk')
            this.runFunc(this)
            this.lastRun = currentTime
        }
        this.x = this.source.x + this.source.width/2
        this.y = this.source.y + this.source.height/2
        this.animate();
        ctx.beginPath();
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(((this.currentAngle * Math.PI) / 180) + 90)
        ctx.translate(-this.x, -this.y)
        ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height)
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
        if(other === null){ //early return if null
            return;
        }
        if(!(other.points)){ //if object has no set points then it makes default points at the corners
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
            points = other.points; //takes an objects points
        }
        for(let i = 0; i < points.length; i++){
            let targetDegrees = findDegrees(points[i].x, points[i].y, this.x, this.y)
            let distance = findDistance(points[i].x, points[i].y, this.x, this.y)
            if(this.currentAngle >= targetDegrees - this.width && this.currentAngle <= targetDegrees + this.width && distance < this.height){ //checks if the sword is facing the point and reaches the point
                console.log(distance)
                console.log(targetDegrees)
                if(this.hitList.indexOf(other) == -1){
                    other.onDamage(this.damage)
                    const directions = getProjVelocities(targetDegrees, this.knockback)
                    if(other.xVelocity != null){
                        console.log('knockbackX')
                        // other.xVelocity = other.x > this.source.x ? other.xVelocity += this.knockback : other.xVelocity -= this.knockback
                        other.xVelocity = directions.xVelocity
                    }
                    if(other.yVelocity != null){
                        console.log('knockbackY')
                        // other.yVelocity = other.y > this.source.y ? other.yVelocity += this.knockback : other.yVelocity -= this.knockback
                        other.yVelocity = directions.yVelocity
                    }
                    this.hitList.push(other)
                }
                return true;
            }
        }
    }
}