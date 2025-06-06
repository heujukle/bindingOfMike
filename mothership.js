class motherShip{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = 500
        this.height = 500
        this.offsets = { //holds the values of all the ratio of changes
            xOffset : x / character.room.width,
            yOffset : y / character.room.height,
            widthOffset : this.width / 1920,
            heightOffset : this.height /945,
        }
        this.timeSinceLastDamage = 0;
        this.target = character
        this.timer = 0 //current amount of time increments by 1 every draw
        this.attackActive = false //used to prevent attacks from running more than once
        this.attack = () => {console.log('empty attack')}    
        this.attackColor = "rgba(0, 0, 0, 0.5)"
        this.attacks = [
            {func:this.rapidTurrets, color: "rgba(109, 199, 235, 0.2)"}, 
            {func:this.bulletHellTurrets, color: "rgba(86, 199, 142, 0.2)"}, 
            {func:this.scissorLasers, color: "rgba(227, 236, 103, 0.2)"},
            {func:this.dash, color: "rgba(243, 172, 65, 0.2)"}]
        this.pausedMovement = false;
        this.movement = []
        this.damage = 10;
        this.knockback = 50;
        this.speed = 3
        this.xVelocity = 0
        this.yVelocity = 0
        this.dashPastCords = null //used for tracking where the player was to make dash more fun
        this.defaultHealth = 20000
        this.health = this.defaultHealth
        this.index;
        this.name = 'Mother Ship'
        this.instance = 'ms'
        this.healthBar = bossBar(this)
        this.points = getPoints(12, this)
        this.knockBackResistance = 0;
    }

    switchAttack(){
        this.attackActive = false;
        this.pausedMovement = false;
        const choice = this.attacks[Math.floor(Math.random() * this.attacks.length)]
        this.attack = choice.func
        this.attackColor = choice.color
        this.healthBar.container.style.backgroundColor = this.attackColor
    }

    onDamage(damage){
        this.timeSinceLastDamage = 200
        this.health -= damage
        this.healthBar.healthBar.style = `width:${100 * this.health / this.defaultHealth}%`
    }

    onDeath(){
        entities.remove(this.index)
        updateWallet(20, this.target)
        interactables.add(new portal(this.x, this.y, this.width, this.height, this.target))
        this.healthBar.container.remove();
    }

    dash(){
        this.pausedMovement = true
        if(this.timer % 100 == 0 && this.dashPastCords != null){
            const degrees = findDegrees(this.x + this.width/2, this.y + this.height/2,  this.dashPastCords.x,  this.dashPastCords.y)
            const velocities = getProjVelocities(degrees + 180, 120)
            this.xVelocity = velocities.xVelocity
            this.yVelocity = velocities.yVelocity
            this.dashPastCords = {x: this.target.x, y: this.target.y}
        }
        else if(this.timer % 100 == 0){
            this.dashPastCords = {x: this.target.x, y: this.target.y}
        }
    }

    rapidTurrets(turrets){
        this.speed = 1
        for(let i = 0; i < turrets.length; i++){
            const gun = turrets[i]
            const degrees = findDegrees(gun.x, gun.y, this.target.x, this.target.y)
            let offset = i % 2 == 0 ? 180 : 230
            const velocities = getProjVelocities(degrees + offset, 10)
            damageInstances.add(new projectile(gun.x, gun.y, 10, 10, velocities.xVelocity, velocities.yVelocity, this, false, undefined, undefined, 10, false))
        }
    }


    bulletHellTurrets(turrets){
        this.speed = 1;
        if(this.timer % 3 === 0){
            const turret = turrets[Math.floor(Math.random() * turrets.length)]
            const velocities = getProjVelocities(Math.random() * 360, 10)
            damageInstances.add(new projectile(turret.x, turret.y, 20, 20, velocities.xVelocity, velocities.yVelocity, this, false, undefined, undefined, 10, false))
        }
    }

    scissorLasers(turrets){
        this.pausedMovement = true;
        if(this.timer % 100 === 0){
            const turret = turrets[Math.floor(Math.random() * turrets.length)]
            const degrees = findDegrees(turret.x, turret.y, this.target.x, this.target.y)
            const offset = Math.random() * 100 + -50
            const velocities = getProjVelocities(degrees + 180 + offset, 10)
            damageInstances.add(new projectile(turret.x, turret.y, 20, 20, velocities.xVelocity, velocities.yVelocity, this, false, undefined, undefined, 10, false))
        }
        if(this.attackActive === true) return;
        this.attackActive = true;
        // const degrees = findDegrees(this.x + this.width/2, this.y + this.height/2, this.target.x, this.target.y)
        const laser1 = new laser(this.x + this.width/2, this.y + this.height/2, 30, 0, this, 20, {color:{r:100, g:50, b:50}, gradual: true, speed: 0.6, refresh: 10})
        const laser2 = new laser(this.x + this.width/2, this.y + this.height/2, 30, 90, this, 20, {color:{r:100, g:50, b:50}, gradual: true, speed: 0.6, refresh: 10})
        const laser3 = new laser(this.x + this.width/2, this.y + this.height/2, 30, 180, this, 20, {color:{r:100, g:50, b:50}, gradual: true, speed: 0.6, refresh: 10})
        const laser4 = new laser(this.x + this.width/2, this.y + this.height/2, 30, 270, this, 20, {color:{r:100, g:50, b:50}, gradual: true, speed: 0.6, refresh: 10})
        damageInstances.add(laser1)
        damageInstances.add(laser2)
        damageInstances.add(laser3)
        damageInstances.add(laser4)
        laser1.setDegree(360, true)
        laser2.setDegree(360, true)
        laser3.setDegree(360, true)
        laser4.setDegree(360, true)
    }

    pursuit(){
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
    }

    draw(){
        if(this.health < 0) this.onDeath()
        this.points = getPoints(12, this)
        const turrets = [
            {x: this.x + 30, y: this.y + 30},
            {x: this.x + this.width - 30, y: this.y + 30},
            {x: this.x + 30, y: this.y + this.height - 30},
            {x: this.x + this.width - 30, y: this.y + this.height - 30},
        ]
        if(this.pausedMovement === false) this.pursuit()
        velocity(this, this.xVelocity, this.yVelocity)
        collison(this, this.target, false, (mothership, target) => {
            const knockbackfunc = makeKnockback(mothership)
            target.onDamage(mothership.damage, knockbackfunc, mothership)
        })
        this.attack(turrets)
        ctx.beginPath()
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.fill();
        //image will go here
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.attackColor;
        ctx.fill();
        if(this.timeSinceLastDamage > 0){
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = entityDamage;
            ctx.fill();
            this.timeSinceLastDamage -= 10
        }
        ctx.closePath()
        this.timer += 1;
        if(this.timer % 500 == 0){
            this.speed = 3;
            this.attackColor = "rgba(0, 0, 0, 0.5)"
            this.healthBar.container.style.backgroundColor = this.attackColor
            this.attack = () => {return}
        }
        else if(this.timer % 600 == 0){
            this.switchAttack()
            this.timer = 0;
        }
    }
}