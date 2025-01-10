/*
melee(source, damage, width, height, knockback, span, name = 'sword', clickFunc, runFunc, runFuncCD, sprite) 

*/

const stats = [
{
    item:'multiShot',
    price:25,
    type:'stat',
    statName:'multishot'
},
{
    item:'speed',
    price:20,
    type:'stat',
    statName:'speed'
},
{
    item:'projectile speed',
    price:20,
    type:'stat',
    statName:'pSpeed'
},
{
    item:'projectile damage',
    price:20,
    type:'stat',
    statName:'pDamage'
},
{
    item:'max health',
    price:20,
    type:'stat',
    statName:'maxHealth',
    increment: 10
},
{
    item:'max stamina',
    price:20,
    type:'stat',
    statName:'maxStamina',
    increment: 10
},
{
    item:'dash speed',
    price:20,
    type:'stat',
    statName:'dashSpeed',
    increment: 1
}
]

const passives = [
{
    item: 'richochet',
    price: 50,
    type: 'passiveItem'
}
]

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
    price:50, //price
    type: 'melee' //type
},
{
    item:new melee(undefined, 10, 100, 300, 50, 360, 'Super Spin swords', null, function(sword){
        const spinner = new melee(sword.source, 5, 75, 250, 25, 360)
        spinner.setValues(sword.startingAngle + 180)
        damageInstances.add(spinner)
    }, 100), //item itself
    price:400, //price
    type: 'melee' //type
},
]