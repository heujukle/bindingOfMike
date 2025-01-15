/*
constructor(source, damage, width, height, knockback, span, name, clickFunc, runFunc, runFuncCD, tier, increase, sprite) 

*/

/* materials */
const bones = {
    name:"bones",
    sprite: 'images/items/bones.png'
}

const cloth = {
    name:"cloth",
    sprite: null
}
/* */
const healthInACan = {
    item: 'health in a can',
    price: 20,
    type: 'health',
    increment: 25
}

const stats = [
{
    item:'multiShot',
    price:75,
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
    price:25,
    type:'stat',
    statName:'pSpeed'
},
{
    item:'projectile damage',
    price:30,
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
},
{
    item:'stamina regeneration',
    price:20,
    type:'stat',
    statName:'staminaRegen',
    increment: 0.1
}
]

const passives = [
{
    item: 'richochet',
    itemVariables: {},
    price: 0, //1000
    type: 'passiveItem'
},
{
    item: 'spikey',
    itemVariables: {hitList : []},
    price: 0, //200
    type: 'passiveItem'
},
{
    item: 'bouncy',
    itemVariables: {},
    price: 0, //100
    type: 'passiveItem'
},
]

const meleeItems = [
{ 
    item:new melee(undefined, 10, 100, 300, 50, 100, 'Big sword', null, null, null, 1, {damage: 10, height:20, width:20, knockback: 10}), //item itself
    price:150, //price
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
    price:600, //price
    type: 'melee' //type
},
{
    item:new melee(undefined, 10, 100, 300, 50, 360, 'Spin sword', null, null, null, 1, {damage:15, width:20, span:30}), //item itself
    price:200, //price
    type: 'melee' //type
},
{
    item:new melee(undefined, 10, 100, 300, 50, 360, 'Super Spin swords', null, function(sword){
        const spinner = new melee(sword.source, 5, 75, 250, 25, 360)
        spinner.setValues(sword.startingAngle + 180)
        damageInstances.add(spinner)
    }, 100), //item itself
    price:1000, //price
    type: 'melee' //type
},
]