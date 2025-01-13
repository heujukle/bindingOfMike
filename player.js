const healthBar = document.getElementById('healthBar')
const staminaBar = document.getElementById('stamina')

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
            'pDamage' : 9,
            'multishot' : 0,
            'maxHealth' : 100,
            'maxStamina' : 100,
            'dashSpeed' : 10,
            'staminaRegen' : 0.1
        }
        this.speed = 5;
        this.pSpeed = 9;
        this.pDamage = 10;
        this.multishot = 0
        this.health = 100;
        this.stamina = 100;
        this.hotbar = ['shoot', 'melee']
        this.passiveItems = {}
        this.selectedItem = 'shoot'
        this.melee = new melee(this, 10, 30, 125, 5, 90)
        this.iFrames = 0;
        this.map = null;
        this.wallet = 0;
        this.interact = false;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.damaged = false
        this.color = "#0000ff"
        this.sprite = null;
        this.meleeInventory = []
        this.materials = []
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
        if(this.iFrames > 0){
            this.iFrames -= 1
        }
        else{
            if(this.has('spikey')){
                this.passiveItems["spikey"].hitList = []
            }
        }
        if(this.stamina < this.stats['maxStamina']) this.stamina += this.stats['staminaRegen'];
        velocity(this, this.xVelocity, this.yVelocity)
        this.updateMove()
    }

    draw(){
        staminaBar.style = `width: ${this.stamina / this.stats['maxStamina'] * 100}%;`
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        if(this.iFrames > 0 && this.damaged == true){
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

    has(item){ //if player has an item
        return Object.keys(this.passiveItems).includes(item)
    }

    onDamage(damage = 5, knockBackDirection, knockbackAmount = 5, source = null){
        if(this.iFrames == 0){
            console.log('DAMAGE')
            this.damaged = true
            this.health -= damage
            healthBar.style = `width: ${this.health / this.stats['maxHealth'] * 100}%;`
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
        if(Object.keys(this.passiveItems).includes('spikey') && source != null){
            let character = this
            if(!this.passiveItems["spikey"].hitList.includes(source)){
            source.onDamage(5, function(target){
                const degrees = findDegrees(character.x, character.y, target.x, target.y)
                const velocities = getProjVelocities(degrees, 10)
                console.log(velocities)
                if(target.xVelocity != undefined){
                    console.log('added knockback')
                    target.xVelocity += velocities.xVelocity * character.xVelocity != 0 ? -velocities.xVelocity * Math.abs(character.xVelocity * 0.15) : 10
                }
                if(target.yVelocity != undefined){
                    target.yVelocity += velocities.yVelocity * character.yVelocity != 0 ? -velocities.yVelocity * Math.abs(character.yVelocity  * 0.15) : 10
                }
                console.log(target)
            })
            character.passiveItems['spikey'].hitList.push(source)
            }
        }
    }

    updateHealthBar(){
        healthBar.style = `width: ${this.health / this.stats['maxHealth'] * 100}%;`
    }

    updateStaminaBar(){
        staminaBar.style = `width: ${this.stamina / this.stats['maxStamina'] * 100}%;`
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
            damageInstances.add(new projectile(centerX, centerY, 20, 20, xVelocity, yVelocity, 'player', null, null, '#268199', this.stats["pDamage"], richochet))
        }
        else if(degrees >= 135 && degrees < 225){
            let yVelocity = (((speed / 45) * (degrees - 90)) - speed * 2) //((225 - 45) - degrees) / this.pVelocityModifier * -2
            let xVelocity = speed
            // console.log("xv:", xVelocity, 'yv', yVelocity)
            if(this.stats["multishot"] >= 10){
                this.xVelocity = xVelocity * -1
                this.yVelocity = yVelocity * -1
            }
            damageInstances.add(new projectile(centerX, centerY, 20, 20, xVelocity, yVelocity, 'player', null, null, '#268199', this.stats["pDamage"], richochet))
        }
        else if(degrees >= 225 && degrees < 315){
            let xVelocity = -(((speed / 45) * (degrees - 180)) - speed * 2)
            let yVelocity = speed
            // console.log("xv:", xVelocity, 'yv', yVelocity)
            if(this.stats["multishot"] >= 10){
                this.xVelocity = xVelocity * -1
                this.yVelocity = yVelocity * -1
            }
            damageInstances.add(new projectile(centerX, centerY, 20, 20, xVelocity, yVelocity, 'player', null, null, '#268199', this.stats["pDamage"], richochet))
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
            damageInstances.add(new projectile(centerX, centerY, 20, 20, xVelocity, yVelocity, 'player', null, null, '#268199', this.stats["pDamage"], richochet))
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
            this.melee.setValues(degrees, e)
            damageInstances.add(this.melee)
        }
    }
}