class player {
    constructor(){
        this.usableItemList = new Map([
            ['shoot', this.sendProjectile],
            ['melee', this.sword]
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
        this.melee = new melee(this, 5, 25, 100)
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
        this.updateMove()
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#0000ff";
        ctx.fill();
        ctx.closePath();
    }

    updateMove(){
        if(this.directionList.indexOf('up') != -1){
            this.y -= this.speed
            if(this.collision2(structures.list) || this.collision2(entities.list)){
                this.y += this.fixedIncrement;
                this.fixedIncrement = this.speed;
            }
            if(this.y < 0){
                structures.resetList();
                entities.clear();
                damageInstances.clear();
                this.setRoom(this.room.top)
                this.y = window.innerHeight;
            }
        }
        if(this.directionList.indexOf('left') != -1){
            this.x -= this.speed
            if(this.collision2(structures.list) || this.collision2(entities.list)){
                this.x += this.fixedIncrement;
                this.fixedIncrement = this.speed;
            }
            if(this.x < 0){
                structures.resetList();
                entities.clear();
                damageInstances.clear();
                this.setRoom(this.room.left)
                this.x = window.innerWidth;
            }
        }
        if(this.directionList.indexOf('down') != -1){
            this.y += this.speed
            if(this.collision2(structures.list) || this.collision2(entities.list)){
                this.y -= this.fixedIncrement;
                this.fixedIncrement = this.speed;
            }
            if(this.y+this.height > window.innerHeight){
                structures.resetList();
                entities.clear();
                damageInstances.clear();
                this.setRoom(this.room.bottom)
                this.y = 0;
            }
        }
        if(this.directionList.indexOf('right') != -1){
            this.x += this.speed
            if(this.collision2(structures.list) || this.collision2(entities.list)){
                this.x -= this.fixedIncrement;
                this.fixedIncrement = this.speed;
            }
            if(this.x+this.width > window.innerWidth){
                structures.resetList();
                entities.clear();
                damageInstances.clear();
                this.setRoom(this.room.right)
                this.x = 0;
            }
        }
        if(this.directionList.indexOf('shoot') != -1){
            this.directionList[this.directionList.indexOf('shoot') + 1]();
            this.directionList.splice(this.directionList.indexOf('shoot'), 2)
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