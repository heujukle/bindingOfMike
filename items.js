/*
constructor(source, damage, width, height, knockback, span, name, clickFunc, runFunc, runFuncCD, tier, increase, sprite) 

/* crafting requirements*/
const mergeRequirements = {
    1 : {
        'bones' : 40, //40
        'cloth' : 40, //40
        'Evil Cloth' : 20, //15
    },
    2 : {
        'bones' : 50, //45
        'cloth' : 60, //60
        'Evil Cloth' : 20, //20
    },
    3 : {
        'bones' : 70, //70
        'cloth' : 70, //70
        'Evil Cloth' : 30, //30
    },
}
/* materials */
const bones = {
    name:"bones",
    sprite: 'images/items/bones.png'
}

const cloth = {
    name:"cloth",
    sprite: null
}

const evilCloth = {
    name:'Evil Cloth',
    sprite: null
}
/* */
const healthInACan = {
    name: 'health in a can',
    price: 20,
    type: 'health',
    increment: 25
}

const stats = [
{
    name:'multiShot',
    price:75,
    type:'stat',
    statName:'multishot'
},
{
    name:'speed',
    price:20,
    type:'stat',
    statName:'speed'
},
{
    name:'projectile speed',
    price:25,
    type:'stat',
    statName:'pSpeed'
},
{
    name:'projectile damage',
    price:30,
    type:'stat',
    statName:'pDamage'
},
{
    name:'max health',
    price:20,
    type:'stat',
    statName:'maxHealth',
    increment: 10
},
{
    name:'max stamina',
    price:20,
    type:'stat',
    statName:'maxStamina',
    increment: 10
},
{
    name:'dash speed',
    price:20,
    type:'stat',
    statName:'dashSpeed',
    increment: 1
},
{
    name:'stamina regeneration',
    price:20,
    type:'stat',
    statName:'staminaRegen',
    increment: 0.1
}
]

const passives = [
{
    name: 'richochet',
    itemVariables: {},
    price: 750, //1000
    type: 'passiveItem'
},
{
    name: 'spikey',
    itemVariables: {hitList : []},
    price: 250, //200
    type: 'passiveItem'
},
{
    name: 'bouncy',
    itemVariables: {},
    price: 100, //100
    type: 'passiveItem'
},
]

const meleeItems = [
{ 
    name: 'Big sword',
    sprite: null,
    item:()=>{return new melee(undefined, 10, 100, 300, 25, 100, 'Big sword', null, null, null, 0, {damage: 10, height:20, width:20, knockback: 10})}, //item itself
    price:250, //price
    type: 'melee' //type
}, 
{ 
    name: 'projectile sword',
    sprite: null,
    item:()=>{return new melee(undefined, 7, 50, 100, 15, 40, 'projectile sword', function(sword, e){
        const degrees = findDegrees(e.x, e.y, sword.source.x, sword.source.y)
        const startX = sword.source.x + sword.source.width/2
        const startY = sword.source.y + sword.source.height/2
        const velocities = getProjVelocities(degrees, 7)
        const swordProjectile = new projectile(startX, startY, sword.width/4, sword.width/4, velocities.xVelocity, velocities.yVelocity, 'player')
        damageInstances.add(swordProjectile)
    })}, //item itself
    price:350, //price
    type: 'melee' //type
},
{
    name: 'Spin sword',
    sprite: null,
    item:()=>{return new melee(undefined, 10, 100, 300, 30, 360, 'Spin sword', null, null, null, 0, {damage:15, width:20, span:30})}, //item itself
    price:200, //price
    type: 'melee' //type
},
{
    name: 'Super Spin Swords',
    sprite: null,
    item:()=>{return new melee(undefined, 10, 100, 300, 30, 360, 'Super Spin swords', null, function(sword){
        const spinner = new melee(sword.source, 5, 75, 250, 25, 360)
        spinner.setValues(sword.startingAngle + 180)
        damageInstances.add(spinner)
    }, 100)}, //item itself
    price:1000, //price
    type: 'melee' //type
},
]