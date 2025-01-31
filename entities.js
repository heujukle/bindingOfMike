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
    constructor(x, y, width, height, target, speed, health = 25, damage = 5, knockBackResistance = 0.75){
        this.x = x;
        this.y = y;
        this.behavior = 'dynamic'
        this.width = width;
        this.height = height;
        this.points = getPoints(3, this)
        this.color = "#4b8749"
        this.defaultColor = "#4b8749"
        this.timeSinceDamage = 0;
        this.action = this.pursuit
        this.target = target
        this.speed = speed
        this.damage = damage
        this.index;
        this.health = health;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.knockback = 10;
        this.knockBackResistance = knockBackResistance * 0.75
        this.drops = cloth
    }

    onDamage(damage = 5, knockbackfunc = null){
        this.color = '#ff0000'
        this.timeSinceDamage =  document.timeline.currentTime;
        this.health -= damage
        hook.dispatch('onEnemyDamage', this.target, this)
        if(knockbackfunc){
            knockbackfunc(this)
        }
    }

    draw(){
        if(this.health < 0){
            entities.remove(this.index)
            updateWallet(15, this.target)
            dropItems(this.drops, this.target)
            return;
        }
        velocity(this, this.xVelocity, this.yVelocity)
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
        if(this.target.x > this.x){
            moveEntitiy(this, this.speed + speedMod, 0, true)
        }
        else{
            moveEntitiy(this, -(this.speed + speedMod), 0, true)
        }
        if(this.target.y > this.y){
            moveEntitiy(this, 0, this.speed + speedMod, true)
        }
        else{
            moveEntitiy(this, 0, -(this.speed + speedMod), true)
        }
        if(this.collision2([this.target]) && !damageThisTime){
            const knockbackfunc = makeKnockback(this)
            this.target.onDamage(this.damage, knockbackfunc, this)
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
    constructor(x, y, width, height, target, speed, health = 25, damage = 5, pDamage = 5, pSpeed = 8, knockBackResistance = 1){
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
        this.pSpeed = pSpeed;
        this.pDamage = pDamage;
        this.damage = damage;
        this.index;
        this.health = health;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.knockBackResistance = knockBackResistance
        this.drops = bones
    }

    onDamage(damage = 5, knockbackfunc = null){
        this.color = '#ff0000'
        this.timeSinceDamage =  document.timeline.currentTime;
        this.health -= damage
        hook.dispatch('onEnemyDamage', this.target, this)
        if(knockbackfunc){
            knockbackfunc(this)
        }
    }

    draw(){
        if(this.health < 0){
            entities.remove(this.index)
            updateWallet(20, this.target)
            dropItems(this.drops, this.target)
            return;
        }
        velocity(this, this.xVelocity, this.yVelocity)
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
        if(this.target.x > this.x){
            moveEntitiy(this, this.speed + speedMod, 0, true)
        }
        else{
            moveEntitiy(this, -(this.speed + speedMod), 0, true)
        }
        if(this.target.y > this.y){
            moveEntitiy(this, 0, this.speed + speedMod, true)
        }
        else{
            moveEntitiy(this, 0, -(this.speed + speedMod), true)
        }
        if(this.collision2([this.target]) && !damageThisTime){
            const knockbackfunc = makeKnockback(this)
            this.target.onDamage(this.damage, knockbackfunc, this)
        }
    }

    shoot(degrees){
        let centerX = this.x + this.width / 2
        let centerY = this.y + this.height / 2
        if(degrees >= 45 && degrees < 135){
            let xVelocity = ((this.pSpeed / 45) * degrees) - this.pSpeed * 2 //((135 - 45) - degrees) / this.pVelocityModifier * -2
            let yVelocity = this.pSpeed * -1
            damageInstances.add(new projectile(centerX, centerY, 20, 20, xVelocity, yVelocity, this, false, undefined, undefined, this.pDamage, false))
        }
        else if(degrees >= 135 && degrees < 225){
            let yVelocity = (((this.pSpeed / 45) * (degrees - 90)) - this.pSpeed * 2) //((225 - 45) - degrees) / this.pVelocityModifier * -2
            let xVelocity = this.pSpeed
            damageInstances.add(new projectile(centerX, centerY, 20, 20, xVelocity, yVelocity, this, false, undefined, undefined, this.pDamage, false))
        }
        else if(degrees >= 225 && degrees < 315){
            let xVelocity = -(((this.pSpeed / 45) * (degrees - 180)) - this.pSpeed * 2)
            let yVelocity = this.pSpeed
            damageInstances.add(new projectile(centerX, centerY, 20, 20, xVelocity, yVelocity, this, false, undefined, undefined, this.pDamage, false))
        }
        else{
            if(degrees < 45){
                degrees += 360
            }
            let yVelocity = -(((this.pSpeed / 45) * (degrees - 270)) - this.pSpeed * 2)//(circularSub((405 - 45), degrees)) / this.pVelocityModifier * 2
            let xVelocity = this.pSpeed * -1
            damageInstances.add(new projectile(centerX, centerY, 20, 20, xVelocity, yVelocity, this, false, undefined, undefined, this.pDamage, false))
        }
    }

    fire(){
        let centerX = this.x + this.width / 2
        let centerY = this.y + this.height / 2
        let degrees = findDegrees(this.target.x, this.target.y, centerX, centerY)
        this.shoot(degrees + Math.floor((Math.random() * 10) - 5))
        this.timeToProjectile = document.timeline.currentTime + 1000 + Math.floor((Math.random() * 0))
    }

    collision2(target) { //im leaving the chat gpt commenst for fun
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

class evilZombie{
    constructor(x, y, width, height, target, speed, health = 25, damage = 5, knockBackResistance = 0.5){
        this.x = x;
        this.y = y;
        this.behavior = 'dynamic'
        this.width = width;
        this.height = height;
        this.points = getPoints(3, this)
        this.color = "purple"
        this.defaultColor = "purple"
        this.timeSinceDamage = 0;
        this.action = this.pursuit
        this.target = target
        this.speed = speed
        this.damage = damage
        this.index;
        this.health = health;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.knockback = 15;
        this.knockBackResistance = knockBackResistance * 0.5
        this.drops = evilCloth
    }

    onDamage(damage = 5, knockbackfunc = null){
        this.color = '#ff0000'
        this.timeSinceDamage =  document.timeline.currentTime;
        this.health -= damage
        hook.dispatch('onEnemyDamage', this.target, this)
        if(knockbackfunc){
            knockbackfunc(this)
        }
    }

    draw(){
        if(this.health < 0){
            entities.remove(this.index)
            updateWallet(30, this.target)
            dropItems(this.drops, this.target)
            return;
        }
        velocity(this, this.xVelocity, this.yVelocity)
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
        if(this.target.x > this.x){
            moveEntitiy(this, this.speed + speedMod, 0, true)
        }
        else{
            moveEntitiy(this, -(this.speed + speedMod), 0, true)
        }
        if(this.target.y > this.y){
            moveEntitiy(this, 0, this.speed + speedMod, true)
        }
        else{
            moveEntitiy(this, 0, -(this.speed + speedMod), true)
        }
        if(this.collision2([this.target]) && !damageThisTime){
            const knockbackfunc = (target) => {
                const degrees = findDegrees(this.x + this.width/2, this.y + this.height/2, target.x + target.width/2, target.y + target.height/2)
                const pv = getProjVelocities(degrees, this.knockback)
                target.xVelocity += -pv.xVelocity
                target.yVelocity += -pv.yVelocity
            }
            this.target.onDamage(this.damage, knockbackfunc, this)
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

class boomSkeleton{
    constructor(x, y, width, height, target, speed, health = 25, damage = 5, pDamage = 5, pSpeed = 8, knockBackResistance = 1){
        this.x = x;
        this.y = y;
        this.behavior = 'dynamic'
        this.width = width;
        this.height = height;
        this.points = getPoints(3, this)
        this.color = "#831818"
        this.defaultColor = "#831818"
        this.timeSinceDamage = 0;
        this.timeToProjectile = document.timeline.currentTime + 1000 + Math.floor((Math.random() * 0))
        this.action = this.pursuit
        this.target = target
        this.speed = speed
        this.pSpeed = pSpeed;
        this.pDamage = pDamage;
        this.damage = damage;
        this.index;
        this.health = health;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.knockBackResistance = knockBackResistance
        this.drops = boomBones
        this.boomFunc = (source) => {
            damageInstances.add(new explosion(source, 100, 10 + this.pDamage, 60))
            console.log('WE BRING THE BOOM')
        }
    }

    onDamage(damage = 5, knockbackfunc = null){
        this.color = '#ff0000'
        this.timeSinceDamage =  document.timeline.currentTime;
        this.health -= damage
        hook.dispatch('onEnemyDamage', this.target, this)
        if(knockbackfunc){
            knockbackfunc(this)
        }
    }

    draw(){
        if(this.health < 0){
            entities.remove(this.index)
            updateWallet(25, this.target)
            dropItems(this.drops, this.target)
            return;
        }
        velocity(this, this.xVelocity, this.yVelocity)
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
        if(this.target.x > this.x){
            moveEntitiy(this, this.speed + speedMod, 0, true)
        }
        else{
            moveEntitiy(this, -(this.speed + speedMod), 0, true)
        }
        if(this.target.y > this.y){
            moveEntitiy(this, 0, this.speed + speedMod, true)
        }
        else{
            moveEntitiy(this, 0, -(this.speed + speedMod), true)
        }
        if(this.collision2([this.target]) && !damageThisTime){
            const knockbackfunc = makeKnockback(this)
            this.target.onDamage(this.damage, knockbackfunc, this)
        }
    }

    shoot(degrees, speed = this.pSpeed, multishot = 1){
        let centerX = this.x + this.width / 2
        let centerY = this.y + this.height / 2
        let xVelocity = 0
        let yVelocity = 0
        if(degrees >= 45 && degrees < 135){
             xVelocity = ((this.pSpeed / 45) * degrees) - this.pSpeed * 2 //((135 - 45) - degrees) / this.pVelocityModifier * -2
             yVelocity = this.pSpeed * -1
        }
        else if(degrees >= 135 && degrees < 225){
             yVelocity = (((this.pSpeed / 45) * (degrees - 90)) - this.pSpeed * 2) //((225 - 45) - degrees) / this.pVelocityModifier * -2
             xVelocity = this.pSpeed
        }
        else if(degrees >= 225 && degrees < 315){
             xVelocity = -(((this.pSpeed / 45) * (degrees - 180)) - this.pSpeed * 2)
             yVelocity = this.pSpeed
        }
        else{
            if(degrees < 45){
                degrees += 360
            }
             yVelocity = -(((this.pSpeed / 45) * (degrees - 270)) - this.pSpeed * 2)//(circularSub((405 - 45), degrees)) / this.pVelocityModifier * 2
             xVelocity = this.pSpeed * -1
        }
        damageInstances.add(new projectile(centerX, centerY, 20, 20, xVelocity, yVelocity, this, false, undefined, undefined, 0, false, this.boomFunc))
        const bloom = Math.random()
        if(multishot > 0) this.shoot(degrees + Math.floor((bloom * 20) - 5), this.pSpeed - 5 * Math.random(), multishot - 1)
    }

    fire(){
        let centerX = this.x + this.width / 2
        let centerY = this.y + this.height / 2
        let degrees = findDegrees(this.target.x, this.target.y, centerX, centerY)
        this.shoot(degrees + Math.floor((Math.random() * 10) - 5))
        this.timeToProjectile = document.timeline.currentTime + 1000 + Math.floor((Math.random() * 3000))
    }

    collision2(target) { //im leaving the chat gpt commenst for fun
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