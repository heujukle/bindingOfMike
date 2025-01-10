class player {
    constructor(){
        this.usableItemList = new Map([
            ['shoot', this.sendProjectile],
            ['melee', this.sword]
        ])
        this.actions = new Map([
            ['up', function(player){
                moveEntitiy(player, 0, -player.stats["speed"])
            }],
            ['down', function(player){
                moveEntitiy(player, 0, player.stats["speed"])
            }],
            ['left', function(player){
                moveEntitiy(player, -player.stats["speed"], 0)
            }],
            ['right', function(player){
                moveEntitiy(player, player.stats["speed"], 0)
            }],
            ['interact', function(player){
                player.interact = true;
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
        this.stats = {
            'speed' : 5,
            'pSpeed' : 9,
            'pDamage' : 11,
            'multishot' : 0,
            'maxHealth' : 100,
            'maxStamina' : 100,
            'dashSpeed' : 50
        }
        this.speed = 5;
        this.pSpeed = 9;
        this.pDamage = 10;
        this.multishot = 0
        this.health = 100;
        this.hotbar = ['shoot', 'melee']
        this.passiveItems = []
        this.selectedItem = 'shoot'
        this.melee = new melee(this, 10, 30, 125, 5)
        this.iFrames = 0;
        this.map = null;
        this.wallet = 0;
        this.interact = false;
        this.xVelocity = 0;
        this.yVelocity = 0;
    }
    
    hotBarChange(direction){
        const hotbar = document.getElementById('hotbar')
        if(direction == 'up'){
          let index = this.hotbar.indexOf(this.selectedItem);
          hotbar.children[index].classList.remove('selected')
          index = this.hotbar.indexOf(this.selectedItem) + 1 >= this.hotbar.length ? 0 : this.hotbar.indexOf(this.selectedItem) + 1
          hotbar.children[index].classList.add('selected')
          this.selectedItem = this.hotbar[index];
        }
        else{
          let index = this.hotbar.indexOf(this.selectedItem);
          hotbar.children[index].classList.remove('selected')
          index = this.hotbar.indexOf(this.selectedItem) - 1 < 0 ? this.hotbar.length - 1 : this.hotbar.indexOf(this.selectedItem) - 1
          hotbar.children[index].classList.add('selected')
          this.selectedItem = this.hotbar[index];
        }
    }

    preDraw(){ //completes the player actions before drawing
        this.iFrames = this.iFrames - 1 >= 0 ? this.iFrames - 1 : 0
        velocity(this, this.xVelocity, this.yVelocity)
        this.updateMove()
    }

    draw(){
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.iFrames > 0 ? "#66ccff" : "#0000ff";
        ctx.fill();
        ctx.closePath();
    }

    onDamage(damage = 5, knockBackDirection, knockbackAmount = 5){
        if(this.iFrames == 0){
            console.log('DAMAGE')
            this.health -= damage
            if(knockBackDirection == 'left'){
                this.xVelocity -= knockbackAmount
            }
            else if(knockBackDirection == 'right'){
                this.xVelocity += knockbackAmount
            }
            else if(knockBackDirection == 'down'){
                this.yVelocity += knockbackAmount
            }
            else if(knockBackDirection == 'up'){
                this.yVelocity -= knockbackAmount
            }
            this.iFrames = 30;
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
        this.map.updateMap(this.room.cords)
        console.log(this.room.cords)
    }

    setArea(area){
        structures.list = []
        entities.list = []
        damageInstances.list = []
        interactables.list = []
        console.log(area.map)
        this.x = Math.ceil(window.innerWidth / 2);
        this.y = Math.ceil(window.innerHeight / 2);
        this.area = area;
        this.map = new areaMap(this.area)
        this.setRoom(this.area.map.get('0,0'))
        console.log(this.area.map)
    }

    shoot(degrees, speed = this.stats["pSpeed"]){
        let centerX = character.x + character.width / 2
        let centerY = character.y + character.height / 2
        let richochet = this.passiveItems.includes('richochet')
        // let richochet = false;
        console.log(richochet)
        if(degrees >= 45 && degrees < 135){
            let xVelocity = ((speed / 45) * degrees) - speed * 2 //((135 - 45) - degrees) / this.pVelocityModifier * -2
            let yVelocity = speed * -1
            // console.log("xv:", xVelocity, 'yv', yVelocity)
            if(this.stats["multishot"] >= 10){
                this.xVelocity = xVelocity * -1
                this.yVelocity = yVelocity * -1
            }
            damageInstances.add(new projectile(centerX, centerY, 20, 20, xVelocity, yVelocity, 'player', null, null, null, this.stats["pDamage"], richochet))
        }
        else if(degrees >= 135 && degrees < 225){
            let yVelocity = (((speed / 45) * (degrees - 90)) - speed * 2) //((225 - 45) - degrees) / this.pVelocityModifier * -2
            let xVelocity = speed
            // console.log("xv:", xVelocity, 'yv', yVelocity)
            if(this.stats["multishot"] >= 10){
                this.xVelocity = xVelocity * -1
                this.yVelocity = yVelocity * -1
            }
            damageInstances.add(new projectile(centerX, centerY, 20, 20, xVelocity, yVelocity, 'player', null, null, null, this.stats["pDamage"], richochet))
        }
        else if(degrees >= 225 && degrees < 315){
            let xVelocity = -(((speed / 45) * (degrees - 180)) - speed * 2)
            let yVelocity = speed
            // console.log("xv:", xVelocity, 'yv', yVelocity)
            if(this.stats["multishot"] >= 10){
                this.xVelocity = xVelocity * -1
                this.yVelocity = yVelocity * -1
            }
            damageInstances.add(new projectile(centerX, centerY, 20, 20, xVelocity, yVelocity, 'player', null, null, null, this.stats["pDamage"], richochet))
        }
        else{
            if(degrees < 45){
                degrees += 360
            }
            let yVelocity = -(((speed / 45) * (degrees - 270)) - speed * 2)//(circularSub((405 - 45), degrees)) / this.pVelocityModifier * 2
            let xVelocity = speed * -1
            // console.log("xv:", xVelocity, 'yv', yVelocity)
            if(this.stats["multishot"] >= 10){
                this.xVelocity = xVelocity * -1
                this.yVelocity = yVelocity * -1
            }
            damageInstances.add(new projectile(centerX, centerY, 20, 20, xVelocity, yVelocity, 'player', null, null, null, this.stats["pDamage"], richochet))
        }
    }

    sendProjectile = (e) =>{
        let centerX = this.x + this.width / 2
        let centerY = this.y + this.height / 2
        let degrees = findDegrees(e.x, e.y, centerX, centerY)
        for(let i = 0; i < this.stats['multishot']; i++){
            const bloom = Math.random()
            this.shoot(degrees + Math.floor((bloom * 20) - 5), this.stats["pSpeed"] - 5 * Math.random())
        }
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