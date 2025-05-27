const entityDamage = "rgba(255, 0, 0, 0.8)"

class dummy{
    constructor(x, y, width, height){
        this.instance = 'dummy';
        this.x = x;
        this.y = y;
        this.offsets = { //holds the values of all the ratio of changes
            xOffset : x / character.room.width,
            yOffset : y / character.room.height,
            widthOffset : width / 1920,
            heightOffset : height /945,
        }
        this.width = width;
        this.height = height;
        this.points = getPoints(3, this)
        this.color = 'rgba(0, 0, 0, 0)'
        this.defaultColor = 'rgba(0, 0, 0, 0)'
        this.timeSinceDamage = 0;
        this.behavior = 'static'
        this.allied = 'enemy'
        console.log(this.points)
        this.image = new Image()
        this.image.src = 'images/walls/dummy.png'
    }

    onDamage(){
        this.color = entityDamage
        this.timeSinceDamage =  document.timeline.currentTime;
    }

    draw(){
        if(document.timeline.currentTime - this.timeSinceDamage > 250){
            this.color = this.defaultColor;
        }
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#ab5901";
        ctx.fill();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

class spawner{
    constructor(x, y, width, height, target, type){
        this.instance = 'spawner';
        this.x = x;
        this.y = y;
        this.index;
        this.offsets = { //holds the values of all the ratio of changes
            xOffset : x / character.room.width,
            yOffset : y / character.room.height,
            widthOffset : width / 1920,
            heightOffset : height /945,
        }
        this.width = width;
        this.height = height;
        this.target = target
        this.points = getPoints(3, this)
        this.color = "rgba(63, 126, 50, 0.5)"
        this.defaultColor = "rgba(63, 126, 50, 0.5)"
        this.timeSinceDamage = 0;
        this.health = 100;
        this.behavior = 'static'
        this.type = type
        this.drops = cloth;
        switch(type){
            case "zombie":
                console.log('zombie spawner')
                this.drops = cloth
                break;
        }
        this.timeSinceSpawn = 0;
        this.allied = 'enemy'
        this.image = new Image();
        this.image.src = '';
    }

    onDamage(damage = 5){
        this.health -= damage;
        this.color = entityDamage
        this.timeSinceDamage =  document.timeline.currentTime;
    }

    draw(){
        if(document.timeline.currentTime - this.timeSinceSpawn > 5000){
            this.timeSinceSpawn = document.timeline.currentTime
            console.log("yippe")
            summon(this, this.type)
        }
        if(this.health < 0){
            entities.remove(this.index)
            updateWallet(40, this.target)
            dropItems(this.drops, this.target)
            hook.dispatch('onEnemyDeath', this)
        }
        if(document.timeline.currentTime - this.timeSinceDamage > 250){
            this.color = this.defaultColor;
        }
        ctx.beginPath();
        if(!this.image.src){
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = '#0000ff';
            ctx.fill();
        }
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

class zombie{
    constructor(x, y, width, height, target, speed, health = 25, damage = 5, knockBackResistance = 0.75, spawned = false){
        this.instance = 'zombie';
        this.x = x;
        this.y = y;
        this.behavior = 'dynamic'
        this.offsets = { //holds the values of all the ratio of changes
            xOffset : x / character.room.width,
            yOffset : y / character.room.height,
            widthOffset : width / 1920,
            heightOffset : height /945,
        }
        this.width = width;
        this.height = height;
        this.points = getPoints(3, this)
        this.color = 'rgba(0, 0, 0, 0)'
        this.defaultColor = 'rgba(0, 0, 0, 0)'
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
        this.spawned = spawned;
        this.allied = 'enemy'
        this.image = new Image()
        this.image.src = 'images/entities/zombie2.png'
    }

    onDamage(damage = 5, knockbackfunc = null){
        this.color = entityDamage
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
            if(this.spawned == false){
                updateWallet(15, this.target)
                dropItems(this.drops, this.target)
                hook.dispatch('onEnemyDeath', this)
            }
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
        ctx.fillStyle = "#4b8749";
        ctx.fill();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
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

class Warrior{
    constructor(x, y, width, height, target, speed, health = 25, damage = 10, knockBackResistance = 0.75, type = basic, spawned = false){
        this.instance = 'warrior';
        this.x = x;
        this.y = y;
        this.behavior = 'dynamic'
        this.offsets = { //holds the values of all the ratio of changes
            xOffset : x / character.room.width,
            yOffset : y / character.room.height,
            widthOffset : width / 1920,
            heightOffset : height / 945,
        }
        this.width = width;
        this.height = height;
        this.points = getPoints(3, this)
        this.color = 'rgba(0, 0, 0, 0)'
        this.defaultColor = 'rgba(0, 0, 0, 0)'
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
        this.spawned = spawned;
        this.type = type;
        this.swingSpeed = 500
        this.image = new Image()
        this.image.src = ''
        switch(this.type){
            case "basic":
                this.melee = new melee(this, this.damage, 30, 125, 5, 90, 'sword', undefined, undefined, undefined, 1, {damage:10, span:10})
                break;
            case "spin projectile":
                this.melee = new melee(this, this.damage, 100, 300, 25, 360, 'Projectile Spin Sword', undefined, function(sword){
                    const velocities = getProjVelocities(sword.currentAngle, 7);
                    const startX = sword.source.x + sword.source.width/2
                    const startY = sword.source.y + sword.source.height/2
                    const swordProjectile = new projectile(startX, startY, 15, 15, velocities.xVelocity, velocities.yVelocity, sword.source, false, sword.source.target.room, '#000000', 5, false)
                    damageInstances.add(swordProjectile)
                }, 120, 1, {runFuncCD: -2})
                this.swingSpeed = 1000;
                break;
        }
        this.timeToSwing = document.timeline.currentTime + 1000 + Math.floor((Math.random() * 0))
        this.allied = 'enemy'
    }

    onDamage(damage = 5, knockbackfunc = null){
        this.color = entityDamage
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
            if(this.spawned == false){
                updateWallet(30, this.target)
                dropItems(this.drops, this.target)
                hook.dispatch('onEnemyDeath', this)
            }
            return;
        }
        velocity(this, this.xVelocity, this.yVelocity)
        if(document.timeline.currentTime > this.timeToSwing){
            this.swing()
         }
        this.action()
        this.points = getPoints(3, this)
        if(document.timeline.currentTime - this.timeSinceDamage > 200){
            this.color = this.defaultColor;
        }
        ctx.beginPath();
        //in case no image loads a solid rectangle
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#646875"; 
        ctx.fill();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
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
            knockbackfunc(this.target);
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

    swing(){
        let centerX = this.x + this.width / 2
        let centerY = this.y + this.height / 2
        let degrees = findDegrees(this.target.x, this.target.y, centerX, centerY)
        if(this.melee.animating == false){
            this.melee.animating = true;
            this.melee.setValues(degrees, this.target)
            damageInstances.add(this.melee)
        }
        this.timeToSwing = document.timeline.currentTime + this.swingSpeed;
    }
}

class skeleton{
    constructor(x, y, width, height, target, speed, health = 25, damage = 5, pDamage = 5, pSpeed = 8, knockBackResistance = 1){
        this.instance = 'skeleton';
        this.x = x;
        this.y = y;
        this.behavior = 'dynamic'
        this.offsets = { //holds the values of all the ratio of changes
            xOffset : x / character.room.width,
            yOffset : y / character.room.height,
            widthOffset : width / 1920,
            heightOffset : height /945,
        }
        this.width = width;
        this.height = height;
        this.points = getPoints(3, this)
        this.color = 'rgba(0, 0, 0, 0)'
        this.defaultColor = 'rgba(0, 0, 0, 0)'
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
        this.allied = 'enemy'
        this.image = new Image()
        this.image.src = 'images/entities/skeleton.png'
    }

    onDamage(damage = 5, knockbackfunc = null){
        this.color = entityDamage
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
            hook.dispatch('onEnemyDeath', this)
            return;
        }
        velocity(this, this.xVelocity, this.yVelocity)
        if(document.timeline.currentTime > this.timeToProjectile){
           this.fire()
        }
        this.action()
        this.points = getPoints(3, this)
        if(document.timeline.currentTime - this.timeSinceDamage > 200){
            this.color = this.defaultColor;
        }
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'grey';
        ctx.fill();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
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
        this.instance = 'evilzombie';
        this.x = x;
        this.y = y;
        this.behavior = 'dynamic'
        this.offsets = { //holds the values of all the ratio of changes
            xOffset : x / character.room.width,
            yOffset : y / character.room.height,
            widthOffset : width / 1920,
            heightOffset : height /945,
        }
        this.width = width;
        this.height = height;
        this.points = getPoints(3, this)
        this.color = 'rgba(0, 0, 0, 0)'
        this.defaultColor = 'rgba(0, 0, 0, 0)'
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
        this.allied = 'enemy'
        this.image = new Image()
        this.image.src = 'images/entities/Evil Zombie.png'
    }

    onDamage(damage = 5, knockbackfunc = null){
        this.color = entityDamage
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
            hook.dispatch('onEnemyDeath', this)
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
        ctx.fillStyle = 'purple';
        ctx.fill();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
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
        this.instance = 'boomskeleton';
        this.x = x;
        this.y = y;
        this.behavior = 'dynamic'
        this.offsets = { //holds the values of all the ratio of changes
            xOffset : x / character.room.width,
            yOffset : y / character.room.height,
            widthOffset : width / 1920,
            heightOffset : height /945,
        }
        this.width = width;
        this.height = height;
        this.points = getPoints(3, this)
        this.color = "rgba(0, 0, 0, 0)"
        this.defaultColor = "rgba(0, 0, 0, 0)"
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
            damageInstances.add(new explosion(source, 100, 5 + this.pDamage, 60))
            console.log('WE BRING THE BOOM')
        }
        this.allied = 'enemy'
        this.image = new Image()
        this.image.src = 'images/entities/boomskeleton.png'
    }

    onDamage(damage = 5, knockbackfunc = null){
        this.color = entityDamage
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
            updateWallet(35, this.target)
            dropItems(this.drops, this.target)
            hook.dispatch('onEnemyDeath', this)
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
        ctx.fillStyle = "#831818";
        ctx.fill();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
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

class threadling{
    constructor(x, y, width, height, speed, damage = 5, allied){
        this.instance = 'threadling';
        this.x = x;
        this.y = y;
        this.behavior = 'dynamic'
        this.offsets = { //holds the values of all the ratio of changes
            xOffset : x / character.room.width,
            yOffset : y / character.room.height,
            widthOffset : width / 1920,
            heightOffset : height /945,
        }
        this.width = width;
        this.height = height;
        this.color = "#182b1d"
        this.action = this.pursuit
        this.target = determineTarget(this);
        console.log(this.target)
        this.speed = speed
        this.damage = damage
        this.index;
        this.knockback = 10;
        this.allied = allied;
    }

    onDamage(){
        return;
    }

    draw(){
        if(this.target == null){
            entities.remove(this.index)
            return;
        }
        else if(this.target.health < 0){
            this.target = determineTarget(this);
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
        if(this.target == null) return;
        if(this.target.x > this.x){
            moveEntitiy(this, this.speed, 0, true)
        }
        else{
            moveEntitiy(this, -(this.speed), 0, true)
        }
        if(this.target.y > this.y){
            moveEntitiy(this, 0, this.speed, true)
        }
        else{
            moveEntitiy(this, 0, -(this.speed), true)
        }
        if(this.collision2([this.target])){
            const knockback = makeKnockback(this)
            this.target.onDamage(this.damage, knockback)
            entities.remove(this.index)
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