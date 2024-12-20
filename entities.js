class dummy{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.points = getPoints(3, this)
        this.color = "#ab5901"
        this.defaultColor = "#ab5901"
        this.timeSinceDamage = 0;
        this.behavior = 'static'
        console.log(this.points)
    }

    onDamage(){
        this.color = '#ff0000'
        this.timeSinceDamage =  document.timeline.currentTime;
    }

    draw(){
        if(document.timeline.currentTime - this.timeSinceDamage > 250){
            this.color = this.defaultColor;
        }
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

class zombie{
    constructor(x, y, width, height, target, speed){
        this.x = x;
        this.y = y;
        this.behavior = 'dynamic'
        this.width = width;
        this.height = height;
        this.points = getPoints(3, this)
        this.color = "#ab5901"
        this.defaultColor = "#ab5901"
        this.timeSinceDamage = 0;
        this.action = this.pursuit
        this.target = target
        this.speed = speed
        this.index;
        this.health = 25;
        console.log(this.target)
    }

    onDamage(damage = 5){
        this.color = '#ff0000'
        this.timeSinceDamage =  document.timeline.currentTime;
        this.health -= damage
    }

    draw(){
        if(this.health < 0){
            entities.remove(this.index)
            this.target.wallet += 10
            return;
        }
        this.action()
        this.points = getPoints(3, this)
        if(document.timeline.currentTime - this.timeSinceDamage > 200){
            this.color = this.defaultColor;
        }
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    pursuit(){
        let damageThisTime = false
        let speedMod = Math.floor(Math.random() * this.speed * 2)
        console.log(speedMod)
        if(this.target.x > this.x){
            moveEntitiy(this, this.speed + speedMod, 0, true)
            if(this.collision2([this.target]) && !damageThisTime){
                this.target.onDamage(5, ["forceRight", "forceRight", "forceRight"])
            }
        }
        else{
            moveEntitiy(this, -(this.speed + speedMod), 0, true)
            if(this.collision2([this.target]) && !damageThisTime){
                this.target.onDamage(5, ["forceLeft", "forceLeft", "forceLeft"])
            }
        }
        if(this.target.y > this.y){
            moveEntitiy(this, 0, this.speed + speedMod, true)
            if(this.collision2([this.target]) && !damageThisTime){
                this.target.onDamage(5, ['forceDown', 'forceDown', 'forceDown'])
            }
        }
        else{
            moveEntitiy(this, 0, -(this.speed + speedMod), true)
            if(this.collision2([this.target]) && !damageThisTime){
                this.target.onDamage(5, ['forceUp', 'forceUp', 'forceUp'])
            }
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

class skeleton{
    constructor(x, y, width, height, target, speed){
        this.x = x;
        this.y = y;
        this.behavior = 'dynamic'
        this.width = width;
        this.height = height;
        this.points = getPoints(3, this)
        this.color = "grey"
        this.defaultColor = "grey"
        this.timeSinceDamage = 0;
        this.timeToProjectile = document.timeline.currentTime + 1000 + Math.floor((Math.random() * 0))
        this.action = this.pursuit
        this.target = target
        this.speed = speed
        this.pSpeed = target.speed + 3;
        this.pDamage = 5;
        this.index;
        this.health = 25;
        console.log(this.target)
    }

    onDamage(damage = 5){
        this.color = '#ff0000'
        this.timeSinceDamage =  document.timeline.currentTime;
        this.health -= damage
    }

    draw(){
        if(this.health < 0){
            entities.remove(this.index)
            this.target.wallet += 20;
            return;
        }
        this.action()
        if(document.timeline.currentTime > this.timeToProjectile){
           this.fire()
        }
        this.points = getPoints(3, this)
        if(document.timeline.currentTime - this.timeSinceDamage > 200){
            this.color = this.defaultColor;
        }
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    pursuit(){
        let damageThisTime = false
        let speedMod = Math.floor(Math.random() * this.speed * 2)
        console.log(speedMod)
        if(this.target.x > this.x){
            moveEntitiy(this, this.speed + speedMod, 0, true)
            if(this.collision2([this.target]) && !damageThisTime){
                this.target.onDamage(5, ["forceRight", "forceRight", "forceRight"])
            }
        }
        else{
            moveEntitiy(this, -(this.speed + speedMod), 0, true)
            if(this.collision2([this.target]) && !damageThisTime){
                this.target.onDamage(5, ["forceLeft", "forceLeft", "forceLeft"])
            }
        }
        if(this.target.y > this.y){
            moveEntitiy(this, 0, this.speed + speedMod, true)
            if(this.collision2([this.target]) && !damageThisTime){
                this.target.onDamage(5, ['forceDown', 'forceDown', 'forceDown'])
            }
        }
        else{
            moveEntitiy(this, 0, -(this.speed + speedMod), true)
            if(this.collision2([this.target]) && !damageThisTime){
                this.target.onDamage(5, ['forceUp', 'forceUp', 'forceUp'])
            }
        }
    }

    shoot(degrees){
        let centerX = this.x + this.width / 2
        let centerY = this.y + this.height / 2
        if(degrees >= 45 && degrees < 135){
            let xVelocity = ((this.pSpeed / 45) * degrees) - this.pSpeed * 2 //((135 - 45) - degrees) / this.pVelocityModifier * -2
            let yVelocity = this.pSpeed * -1
            console.log("xv:", xVelocity, 'yv', yVelocity)
            damageInstances.add(new projectile(centerX, centerY, 20, 20, xVelocity, yVelocity, 'skelly', undefined, this.pDamage))
        }
        else if(degrees >= 135 && degrees < 225){
            let yVelocity = (((this.pSpeed / 45) * (degrees - 90)) - this.pSpeed * 2) //((225 - 45) - degrees) / this.pVelocityModifier * -2
            let xVelocity = this.pSpeed
            console.log("xv:", xVelocity, 'yv', yVelocity)
            damageInstances.add(new projectile(centerX, centerY, 20, 20, xVelocity, yVelocity, 'skelly', undefined, this.pDamage))
        }
        else if(degrees >= 225 && degrees < 315){
            let xVelocity = -(((this.pSpeed / 45) * (degrees - 180)) - this.pSpeed * 2)
            let yVelocity = this.pSpeed
            console.log("xv:", xVelocity, 'yv', yVelocity)
            damageInstances.add(new projectile(centerX, centerY, 20, 20, xVelocity, yVelocity, 'skelly', undefined, this.pDamage))
        }
        else{
            if(degrees < 45){
                degrees += 360
            }
            let yVelocity = -(((this.pSpeed / 45) * (degrees - 270)) - this.pSpeed * 2)//(circularSub((405 - 45), degrees)) / this.pVelocityModifier * 2
            let xVelocity = this.pSpeed * -1
            console.log("xv:", xVelocity, 'yv', yVelocity)
            damageInstances.add(new projectile(centerX, centerY, 20, 20, xVelocity, yVelocity, 'skelly', undefined, this.pDamage))
        }
    }

    fire(){
        let centerX = this.x + this.width / 2
        let centerY = this.y + this.height / 2
        let degrees = findDegrees(this.target.x, this.target.y, centerX, centerY)
        this.shoot(degrees + Math.floor((Math.random() * 10) - 5))
        this.timeToProjectile = document.timeline.currentTime + 1000 + Math.floor((Math.random() * 0))
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