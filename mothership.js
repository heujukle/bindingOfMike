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
        
            
        
    }

    // resizeFunc(){
    //     this.turrets = [
    //         {x: this.x + 30, y: this.y + 30},
    //         {x: this.x + this.width - 30, y: this.y + 30},
    //         {x: this.x + 30, y: this.y + this.height - 30},
    //         {x: this.x + this.width - 30, y: this.y + this.height - 30},
    //     ]
    // }

    onDamage(){
        this.timeSinceLastDamage = 200
    }

    rapidTurrets(turrets){
        for(let i = 0; i < turrets.length; i++){
            const gun = turrets[i]
            const degrees = findDegrees(gun.x, gun.y, this.target.x, this.target.y)
            let offset = i % 2 == 0 ? 180 : 230
            const velocities = getProjVelocities(degrees + offset, 10)
            damageInstances.add(new projectile(gun.x, gun.y, 10, 10, velocities.xVelocity, velocities.yVelocity, this, false, undefined, undefined, 10, false))
        }
    }


    bulletHellTurrets(turrets){
        if(this.timer % 3 === 0){
            const turret = turrets[Math.floor(Math.random() * turrets.length)]
            const velocities = getProjVelocities(Math.random() * 360, 10)
            damageInstances.add(new projectile(turret.x, turret.y, 20, 20, velocities.xVelocity, velocities.yVelocity, this, false, undefined, undefined, 10, false))
        }
    }
    draw(){
        const turrets = [
            {x: this.x + 30, y: this.y + 30},
            {x: this.x + this.width - 30, y: this.y + 30},
            {x: this.x + 30, y: this.y + this.height - 30},
            {x: this.x + this.width - 30, y: this.y + this.height - 30},
        ]
        this.bulletHellTurrets(turrets)
        ctx.beginPath()
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.fill();
        if(this.timeSinceLastDamage > 0){
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = entityDamage;
            ctx.fill();
            this.timeSinceLastDamage -= 10
        }
        ctx.closePath()
        this.timer += 1;
    }
}