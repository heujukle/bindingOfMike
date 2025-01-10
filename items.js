/*
melee(source, damage, width, height, knockback, span, name = 'sword', clickFunc, runFunc, runFuncCD, sprite) 

*/

const stats = []

const passives = []

const meleeItems = [
{ 
    item:new melee(undefined, 10, 100, 300, 50, 100, 'Big sword'), //item itself
    price:100, //price
    type: 'melee' //type
}, 
{ 
    item:new melee(undefined, 7, 50, 100, 15, 40, 'projectile sword', function(sword, e){
        const degrees = findDegrees(e.x, e.y, sword.source.x, sword.source.y)
        const startX = sword.source.x + sword.source.width/2
        const startY = sword.source.y + sword.source.height/2
        const velocities = getProjVelocities(degrees, 7)
        const swordProjectile = new projectile(startX, startY, 15, 15, velocities.xVelocity, velocities.yVelocity, 'player')
        damageInstances.add(swordProjectile)
    }), //item itself
    price:200, //price
    type: 'melee' //type
},
{
    item:new melee(undefined, 10, 100, 300, 50, 360, 'Spin sword'), //item itself
    price:0, //price
    type: 'melee' //type
},
]