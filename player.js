const healthBar = document.getElementById('healthBar')
const staminaBar = document.getElementById('stamina')

class player {
    constructor(){
        this.usableItemList = new Map([
            ['shoot', this.sendProjectile],
            ['melee', this.sword]
        ])
        this.actions = new Map([ //binds funtioncs to actions by event listeners, allows the actions to be executed on frame
            ['up', function(player){
                if( moveEntitiy(player, 0, -player.stats["speed"]) && player.room.dynamicCamera == true){
                    player.movements.y += -player.stats["speed"]
                }
            }],
            ['down', function(player){
                if(moveEntitiy(player, 0, player.stats["speed"]) && player.room.dynamicCamera == true){
                    player.movements.y += player.stats["speed"]
                }
            }],
            ['left', function(player){
                if(moveEntitiy(player, -player.stats["speed"], 0) && player.room.dynamicCamera == true){
                    player.movements.x += -player.stats["speed"]
                }
            }],
            ['right', function(player){
                if(moveEntitiy(player, player.stats["speed"], 0) && player.room.dynamicCamera == true){
                    player.movements.x += player.stats["speed"]
                }
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
        this.stats = { //player stats that can increase
            'speed' : 5,
            'pSpeed' : 10,
            'pDamage' : 13,
            'multishot' : 0,
            'maxHealth' : 100,
            'maxStamina' : 100,
            'dashSpeed' : 10,
            'staminaRegen' : 0.1,
            'shoot speed' : 500
        }
        this.health = 100;
        this.stamina = 100;
        this.hotbar = ['shoot', 'melee']
        this.passiveItems = {}
        this.selectedItem = 'shoot'
        this.melee = new melee(this, 10, 30, 125, 5, 90, 'sword', undefined, undefined, undefined, 1, {damage:10, span:10})
        this.iFrames = 0;
        this.map = null; //amount of immunity frames
        this.wallet = 0; //money
        this.interact = false;
        this.xVelocity = 0; //force applied to player
        this.yVelocity = 0;
        this.damaged = false //if the player is going through damage
        this.color = "#0000ff" //player color
        this.sprite = null;
        this.meleeInventory = []
        this.materials = {}
        this.movements = {
            x:0,
            y:0
        }
        this.translateX = 0;
        this.translateY = 0;
        this.timeOfLastShot = 0
    }
    
    hotBarChange(direction){ //changes direction of hotbar
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
        if(this.health <= 0){ //causes the game to end when health reaches 0
            onDeath()
        }
        if(this.iFrames > 0){
            this.iFrames -= 1
        }
        else{
            if(this.has('spikey')){
                this.passiveItems["spikey"].hitList = []
            }
        }
        if(this.stamina < this.stats['maxStamina']) this.stamina += this.stats['staminaRegen'];
        this.velocity(this.xVelocity, this.yVelocity)
        this.updateMove()
        if(this.room.dynamicCamera == true){
            this.dynamicCamera()
            this.movements.x = 0
            this.movements.y = 0
        }
    }
    
    draw(){ //draws player
        staminaBar.style = `width: ${this.stamina / this.stats['maxStamina'] * 100}%;`
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        if(this.iFrames > 0 && this.damaged == true){ //sets color based on actions
            ctx.fillStyle = "red";
            healthBar.parentElement.style.borderColor = 'white'
        }
        else if(this.iFrames > 0 && this.damaged == false){
            ctx.fillStyle = "#66ccff";
            healthBar.parentElement.style.borderColor = 'white'
        }
        else{
            healthBar.parentElement.style.borderColor = 'black'
            ctx.fillStyle = "#0000ff";
            this.damaged = false;
        }
        ctx.fill();
        ctx.closePath();
    }

    dynamicCamera(){
            this.verifyCameraBounds()
            this.translateY += this.movements.y
            this.translateX += this.movements.x
            ctx.translate(-this.movements.x, -this.movements.y)
            // console.log(this.translateY)
    }

    verifyCameraBounds(){
        let stopY = false
        let stopX = false
        if(this.movements.y < 0){ // up
            if(this.translateY + this.movements.y < 0 || this.y - this.translateY > window.innerHeight/2 + 10){
                stopY = true
            }
        }
        else{ //down
            if(this.translateY + this.movements.y > this.room.height - window.innerHeight || this.y - this.translateY < window.innerHeight/2 - 10){
                stopY = true
            }
        }
        if(this.movements.x < 0){ // left
            if(this.translateX + this.movements.x < 0 || this.x - this.translateX > window.innerWidth/2 + 10){
                stopX = true
            }
        }
        else{ //right
            if(this.translateX + this.movements.x > this.room.width - window.innerWidth || this.x - this.translateX < window.innerWidth/2 - 10){
                stopX = true
            }
        }
        if(stopX) this.movements.x = 0
        if(stopY) this.movements.y = 0
    }
    //should be the first thing to be run when a loading into a new area
    lockCameraToPlayer(side, offset){
        console.log(side)
        switch(side){
            case 'left': //will enter room on right side
                this.translateY += this.y - window.innerHeight/2 - offset
                this.translateX += this.room.width - window.innerWidth
                break;
            case 'right':
                this.translateY += this.y - window.innerHeight/2 - offset;
                break;
            case 'top': //enter room on bottom
                this.translateY += this.room.height - window.innerHeight
                this.translateX += this.x + this.width/2 - window.innerWidth/2 - offset
                break;
            case 'bottom': //enter room on top
                this.translateX += this.x + this.width/2 - window.innerWidth/2 - offset
                break;
        }
        console.log(this.translateX)
        console.log(this.translateY)
        ctx.translate(-this.translateX, -this.translateY)
    }

    fixCamera(){
        if(this.room.dynamicCamera == true){
            ctx.translate(this.translateX, this.translateY)
            this.translateX = 0;
            this.translateY = 0;
        }
    }
    has(item){ //if player has an item
        return Object.keys(this.passiveItems).includes(item)
    }

    velocity(xVelocity, yVelocity){
        const movement = velocity(this, xVelocity, yVelocity)
        if(movement.y != 0){
            this.movements.y += movement.y
        }
        if(movement.x != 0){
            this.movements.x += movement.x
        }
    }

    onDamage(damage = 5, knockbackfunc = null, source = null){
        if(this.iFrames == 0 && damage > 0){
            this.damaged = true
            this.health -= damage
            if(source != null) hook.dispatch('onPlayerDamage', this, source) //calls when player takes damage
            healthBar.style = `width: ${this.health / this.stats['maxHealth'] * 100}%;`
            if(typeof knockbackfunc === 'function'){
                console.log('knockback')
                    knockbackfunc(this)
                    console.log("Xv", this.xVelocity)
                    console.log("Yv", this.yVelocity)
            }
            this.iFrames = 30; //gives iframes
        }
        if(source != null) hook.dispatch('playerTouch', this, source) //calls the player touch hook
    }

    updateHealthBar(){
        healthBar.style = `width: ${this.health / this.stats['maxHealth'] * 100}%;` //converts the perent of health into the health bar
    }

    updateStaminaBar(){
        staminaBar.style = `width: ${this.stamina / this.stats['maxStamina'] * 100}%;` //converts the perent of stamina into the health bar
    }

    addHealth(increase){
        this.health += increase;
        if(this.health > this.stats['maxHealth']){
            this.health = this.stats['maxHealth']
        }
        this.updateHealthBar()
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
        this.iFrames = 20
        this.map.updateMap(this.room.cords)
        console.log(this.room.cords)
    }

    setArea(area){
        const fade = createElement('div', 'fadeIn', {}, body)
        if(document.getElementById('cover')) document.getElementById('cover').remove()
        setTimeout(()=>{fade.remove()}, 2900)
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
        let richochet = Object.keys(this.passiveItems).includes('richochet')
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
            damageInstances.add(new projectile(centerX, centerY, 20, 20, xVelocity, yVelocity, this, null, undefined, '#268199', this.stats["pDamage"], richochet))
        }
        else if(degrees >= 135 && degrees < 225){
            let yVelocity = (((speed / 45) * (degrees - 90)) - speed * 2) //((225 - 45) - degrees) / this.pVelocityModifier * -2
            let xVelocity = speed
            // console.log("xv:", xVelocity, 'yv', yVelocity)
            if(this.stats["multishot"] >= 10){
                this.xVelocity = xVelocity * -1
                this.yVelocity = yVelocity * -1
            }
            damageInstances.add(new projectile(centerX, centerY, 20, 20, xVelocity, yVelocity, this, null, undefined, '#268199', this.stats["pDamage"], richochet))
        }
        else if(degrees >= 225 && degrees < 315){
            let xVelocity = -(((speed / 45) * (degrees - 180)) - speed * 2)
            let yVelocity = speed
            // console.log("xv:", xVelocity, 'yv', yVelocity)
            if(this.stats["multishot"] >= 10){
                this.xVelocity = xVelocity * -1
                this.yVelocity = yVelocity * -1
            }
            damageInstances.add(new projectile(centerX, centerY, 20, 20, xVelocity, yVelocity, this, null, undefined, '#268199', this.stats["pDamage"], richochet))
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
            damageInstances.add(new projectile(centerX, centerY, 20, 20, xVelocity, yVelocity, this, null, undefined, '#268199', this.stats["pDamage"], richochet))
        }
    }

    sendProjectile = (e) =>{
        if(document.timeline.currentTime - this.timeOfLastShot < this.stats['shoot speed']) return //early return
        this.timeOfLastShot = document.timeline.currentTime
        let centerX = this.x + this.width / 2
        let centerY = this.y + this.height / 2
        let degrees = findDegrees(e.x + this.translateX, e.y + this.translateY, centerX, centerY)
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
        let degrees = findDegrees(e.x + this.translateX, e.y + this.translateY, centerX, centerY)
        if(this.melee.animating == false){
            this.melee.animating = true;
            this.melee.setValues(degrees, e)
            damageInstances.add(this.melee)
        }
    }

    addItem(item){
        this.passiveItems[item.name] = item.itemVariables; //adds item and item variables
        if(item.hasFunc != null){
            hook.add(item.hasFunc.hook, item.hasFunc.func) //adds function to event hook
        }        
    }
}