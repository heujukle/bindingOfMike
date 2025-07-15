
const meleeItemsSrc = 
{
    'sword' : { 
        name: 'sword',
        sprite: "/images/sword.png",
        desc: 'Basic starting sword, as generic as it gets.',
        item:function (target) {return new melee(target, 10, 30, 125, 5, 90, 'sword', undefined, undefined, undefined, 1, {damage:10, span:10}, this.sprite)}, //item itself
        price:150, //price
        type: 'melee' //type
    }, 
    'error sword' : { 
        name: 'error sword',
        sprite: "/images/sword.png",
        desc: 'Your save file messed up, error sword as stand in',
        item:function (target) {return new melee(target, 1, 1, 1, 1, 1, 'error sword', undefined, undefined, undefined, 1, {damage:10, span:10}, this.sprite)}, //item itself
        price:150, //price
        type: 'melee' //type
    }, 
    'Medium Sword' : { 
        name: 'Medium Sword',
        sprite: "/images/sword.png",
        desc: 'A medium sized sword',
        item:function (target) {return new melee(target, 10, 150, 175, 10, 80, 'Medium Sword', undefined, undefined, undefined, 1, {damage: 15, height:5, width:5}, this.sprite)}, //item itself
        price:150, //price
        type: 'melee' //type
    }, 
    'Small sword' : { 
        name: 'Small sword',
        sprite: "/images/sword.png",
        desc: 'A small but deadly sword',
        item:function (target) {return new melee(target, 40, 25, 50, 25, 30, 'Small sword', undefined, undefined, undefined, 1, {damage: 20}, this.sprite)}, //item itself
        price:100, //price
        type: 'melee' //type
    }, 
    'Projectile Spin Sword' : { 
        name: 'Projectile Spin Sword',
        sprite: "/images/swords/psss.png",
        desc: 'A wide span which fires projectiles in all directions',
        item:function (target) {return new melee(target, 10, 100, 300, 25, 360, 'Projectile Spin Sword', undefined, function(sword){
            const velocities = getProjVelocities(sword.currentAngle, 7);
            const startX = sword.source.x + sword.source.width/2
            const startY = sword.source.y + sword.source.height/2
            const swordProjectile = new projectile(startX, startY, 15, 15, velocities.xVelocity, velocities.yVelocity, sword.source, false, sword.source.room, '#268199', 5, sword.source.has('richochet'))
            damageInstances.add(swordProjectile)
        }, 40, 1, {runFuncCD: -2}, this.sprite)}, //item itself
        price:450, //price
        type: 'melee' //type
    }, 
    'Big sword' : { 
        name: 'Big sword',
        sprite: "/images/swords/big sword.png",
        desc: 'A very large sword, with a lot of knockback',
        item:function (target) {return new melee(target, 10, 100, 300, 25, 100, 'Big sword', undefined, undefined, undefined, 1, {damage: 10, height:20, width:20, knockback: 10}, this.sprite)}, //item itself
        price:250, //price
        type: 'melee' //type
    }, 
'TWO Swords' : { 
    name: 'TWO Swords',
    sprite: "/images/sword.png",
    desc: 'Two small swords orbit the player',
    item:function (target) {return new melee(target, 20, 100, 100, 15, 180, 'TWO Swords', function(sword, e){
        if(sword.name != 'second'){
            const newSword = new melee(sword.source, sword.damage, sword.width, sword.height, sword.knockback, sword.span, 'second', sword.clickFunc, sword.runFunc, sword.runFuncCD, undefined, undefined, sword.sprite)
            newSword.setValues(sword.startingAngle - 90, {x: window.innerWidth - e.x, y:window.innerHeight - e.y})
            damageInstances.add(newSword)
        }
    }, undefined, undefined, 1, {damage: 10, height:20, width:20, knockback: 10}, this.sprite)}, //item itself
    price:300, //price
    type: 'melee' //type
}, 
'projectile sword' : { 
    name: 'projectile sword',
    sprite: "/images/swords/projectile sword.png",
    desc: 'This sword shoots a projectile',
    item:function (target) {return new melee(target, 7, 50, 100, 15, 40, 'projectile sword', function(sword, e){
        const degrees = findDegrees(e.x + sword.source.translateX, e.y + sword.source.translateY, sword.source.x, sword.source.y)
        const startX = sword.source.x + sword.source.width/2
        const startY = sword.source.y + sword.source.height/2
        const velocities = getProjVelocities(degrees, 7)
        const swordProjectile = new projectile(startX, startY, 15, 15, velocities.xVelocity, velocities.yVelocity, sword.source, false, sword.source.room, '#268199', 5, sword.source.has('richochet'))
        damageInstances.add(swordProjectile)
    }, undefined, undefined, 1, undefined, this.sprite)}, //item itself
    price:350, //price
    type: 'melee' //type
},
'Spin sword' : {
    name: 'Spin sword',
    sprite: "/images/sword.png",
    desc: 'A large span',
    item:function (target) {return new melee(target, 10, 100, 300, 30, 360, 'Spin sword', undefined, undefined, 50, 1, {damage:15, width:20, span:30}, this.sprite)}, //item itself
    price:200, //price
    type: 'melee' //type
},
'Super Spin Swords' : {
    name: 'Super Spin Swords',
    sprite: "/images/swords/superspinsword.png",
    desc: 'A sword which makes smaller swords',
    item:function (target) {
        console.log(this.sprite)
        return new melee(target, 10, 100, 300, 30, 360, 'Super Spin Swords', undefined, function(sword){
        const spinner = new melee(sword.source, 5, 75, 250, 25, 360)
        spinner.setValues(sword.startingAngle + 180)
        damageInstances.add(spinner)
    }, 100, 1, undefined, this.sprite)}, //item itself
    price:750, //price
    type: 'melee' //type
},
}