class player {
    constructor(){
        this.usableItemList = new Map([
            ['shoot', this.sendProjectile],
            ['melee', this.sword]
        ])
        this.actions = new Map([
            ['up', function(player){
                moveEntitiy(player, 0, -player.speed)
                if(player.y < 0){
                    structures.resetList();
                    entities.clear();
                    damageInstances.clear();
                    player.setRoom(player.room.top)
                    player.y = window.innerHeight;
                }
            }],
            ['down', function(player){
                moveEntitiy(player, 0, player.speed)
                if(player.y+player.height > window.innerHeight){
                    structures.resetList();
                    entities.clear();
                    damageInstances.clear();
                    player.setRoom(player.room.bottom)
                    player.y = 0;
                }
            }],
            ['left', function(player){
                moveEntitiy(player, -player.speed, 0)
                if(player.x < 0){
                    structures.resetList();
                    entities.clear();
                    damageInstances.clear();
                    player.setRoom(player.room.left)
                    player.x = window.innerWidth;
                }
            }],
            ['right', function(player){
                moveEntitiy(player, player.speed, 0)
                if(player.x+player.width > window.innerWidth){
                    structures.resetList();
                    entities.clear();
                    damageInstances.clear();
                    player.setRoom(player.room.right)
                    player.x = 0;
                }
            }],
            ['forceLeft', function(player){
                moveEntitiy(player, -player.speed, 0)
                if(player.x < 0){
                    structures.resetList();
                    entities.clear();
                    damageInstances.clear();
                    player.setRoom(player.room.left)
                    player.x = window.innerWidth;
                }
                player.directionList.splice(player.directionList.indexOf("forceLeft"), 1)
            }],
            ['forceRight', function(player){
                moveEntitiy(player, player.speed, 0)
                if(player.x+player.width > window.innerWidth){
                    structures.resetList();
                    entities.clear();
                    damageInstances.clear();
                    player.setRoom(player.room.right)
                    player.x = 0;
                }
                player.directionList.splice(player.directionList.indexOf("forceRight"), 1)
            }],
            ['forceUp', function(player){
                moveEntitiy(player, 0, -player.speed)
                if(player.y < 0){
                    structures.resetList();
                    entities.clear();
                    damageInstances.clear();
                    player.setRoom(player.room.top)
                    player.y = window.innerHeight;
                }
                player.directionList.splice(player.directionList.indexOf("forceUp"), 1)
            }],
            ['forceDown', function(player){
                moveEntitiy(player, 0, player.speed)
                if(player.y+player.height > window.innerHeight){
                    structures.resetList();
                    entities.clear();
                    damageInstances.clear();
                    player.setRoom(player.room.bottom)
                    player.y = 0;
                }
                player.directionList.splice(player.directionList.indexOf("forceDown"), 1)
            }],
        ])
        this.width = 50
        this.height = 50
        this.x = Math.ceil(window.innerWidth / 2);
        this.y = Math.ceil(window.innerHeight / 2);
        this.room = 'spawn'
        this.area = 'spawn'
        this.index = 0;
        this.directionList = [];
        this.fixedIncrement = 5;
        this.speed = 5;
        this.pVelocityModifier = 10;
        this.pDamage = 10;
        this.health = 100;
        this.hotbar = ['melee', 'shoot']
        this.selectedItem = 'melee'
        this.melee = new melee(this, 10, 100, 300)
        this.iFrames = 0;
    }
    
    hotBarChange(direction){
        if(direction == 'up'){
          let index = this.hotbar.indexOf(this.selectedItem) + 1 >= this.hotbar.length ? 0 : this.hotbar.indexOf(this.selectedItem) + 1
          this.selectedItem = this.hotbar[index];
        }
        else{
          let index = this.hotbar.indexOf(this.selectedItem) - 1 < 0 ? 0 : this.hotbar.indexOf(this.selectedItem) - 1
          this.selectedItem = this.hotbar[index];
        }
    }

    draw(){
        this.iFrames = this.iFrames - 1 >= 0 ? this.iFrames - 1 : 0
        this.updateMove()
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.iFrames > 0 ? "#66ccff" : "#0000ff";
        ctx.fill();
        ctx.closePath();
    }

    onDamage(damage = 5, knockBackArray){
        if(this.iFrames == 0){
            console.log('DAMAGE')
            this.health -= damage
            this.directionList = this.directionList.concat(knockBackArray)
            this.iFrames = 10;
        }
    }

    updateMove(){
        for(let i = 0; i < this.directionList.length; i++){
            this.actions.get(this.directionList[i])(this)
        }
    }

        //finish writing section detection algorithm
    startSection(){
        for(let i = 0; i < this.room.layout.length; i++){
            for(let j = 0; j < this.room.layout[0].length; j++){
                if(isOverlapping(this, this.room.layout[i][j])){
                    const obj = {
                        x: j,
                        y: i
                    }
                    this.sections.push(obj)
                    console.log(this)
                }
            }
        }
    }

    setRoom(room){
        this.room = room
        this.room.newRoomLoad()
        console.log(this.room.cords)
    }
    setArea(area){
        console.log(area.map)
        this.area = area;
        this.setRoom(this.area.map.get('0,0'))
    }
    detectCollision(direction){ //left, right, up, down
        let tl = this.room.layout.get(inSpace(getCorner("tl", this)));
        let tr = this.room.layout.get(inSpace(getCorner("tr", this)));
        let bl = this.room.layout.get(inSpace(getCorner("bl", this)));
        let br = this.room.layout.get(inSpace(getCorner("br", this)));
        let mr = this.room.layout.get(inSpace(getCorner("mr", this)));
        let ml = this.room.layout.get(inSpace(getCorner("ml", this)));
        let mt = this.room.layout.get(inSpace(getCorner("mt", this)));
        let mb = this.room.layout.get(inSpace(getCorner("mb", this)));
        switch(direction){
            case "left":
                if(tl && bl){
                    if(tl.type != 'space' || bl.type != 'space' || ml.type != 'space'){
                        return true
                    }
                    return false;
                }
                return false;
                //NEED TO FIX INCREMENTAL MOVING PROBALY A ROUNDING ERROR
            case "right":
                if(tr && br){
                    if(tr.type != 'space' || br.type != 'space' || mr.type != 'space'){
                        return true
                    }
                    return false;
                }
            case "up":
                if(tl && tr){
                    if(tl.type != 'space' || tr.type != 'space' || mt.type != 'space'){
                        return true
                    }
                    return false;
                }
            case "down":
                if(bl && br){
                    if(bl.type != 'space' || br.type != 'space' || mb.type != 'space'){
                        return true
                    }
                    return false;
                }
        }
    }

    shoot(degrees){
        let centerX = character.x + character.width / 2
        let centerY = character.y + character.height / 2
        if(degrees >= 45 && degrees < 135){
            let xVelocity = ((135 - 45) - degrees) / this.pVelocityModifier * -2
            let yVelocity = 90 / this.pVelocityModifier * -1
            console.log("xv:", xVelocity, 'yv', yVelocity)
            damageInstances.add(new projectile(centerX, centerY, 20, 20, xVelocity, yVelocity, 'player', undefined, this.pDamage))
        }
        else if(degrees >= 135 && degrees < 225){
            let yVelocity = ((225 - 45) - degrees) / this.pVelocityModifier * -2
            let xVelocity = 90 / this.pVelocityModifier
            console.log("xv:", xVelocity, 'yv', yVelocity)
            damageInstances.add(new projectile(centerX, centerY, 20, 20, xVelocity, yVelocity, 'player', undefined, this.pDamage))
        }
        else if(degrees >= 225 && degrees < 315){
            let xVelocity = ((315 - 45) - degrees) / this.pVelocityModifier * 2
            let yVelocity = 90 / this.pVelocityModifier
            console.log("xv:", xVelocity, 'yv', yVelocity)
            damageInstances.add(new projectile(centerX, centerY, 20, 20, xVelocity, yVelocity, 'player', undefined, this.pDamage))
        }
        else{
            let yVelocity = (circularSub((405 - 45), degrees)) / this.pVelocityModifier * 2
            let xVelocity = 90 / this.pVelocityModifier * -1
            console.log("xv:", xVelocity, 'yv', yVelocity)
            damageInstances.add(new projectile(centerX, centerY, 20, 20, xVelocity, yVelocity, 'player', undefined, this.pDamage))
        }
    }

    sendProjectile = (e) =>{
        let centerX = this.x + this.width / 2
        let centerY = this.y + this.height / 2
        let degrees = findDegrees(e.x, e.y, centerX, centerY)
        this.shoot(degrees)
    }

    sword = (e) => {
        console.log("run")
        let centerX = this.x + this.width / 2
        let centerY = this.y + this.height / 2
        let degrees = findDegrees(e.x, e.y, centerX, centerY)
        if(this.melee.animating == false){
            this.melee.animating = true;
            this.melee.setValues(90, degrees)
            damageInstances.add(this.melee)
        }
    }
}