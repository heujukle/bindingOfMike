/*
constructor(source, damage, width, height, knockback, span, name, clickFunc, runFunc, runFuncCD, tier, increase, sprite) 

/* crafting requirements*/
const mergeRequirements = {
    1 : {
        'bones' : 20, //40
        'cloth' : 20, //40
        'Evil Cloth' : 10, //15
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

const debugmergeRequirements = {
    1 : {
        'bones' : 0, //40
        'cloth' : 0, //40
        'Evil Cloth' : 0, //15
    },
    2 : {
        'bones' : 0, //45
        'cloth' : 0, //60
        'Evil Cloth' : 0, //20
    },
    3 : {
        'bones' : 0, //70
        'cloth' : 0, //70
        'Evil Cloth' : 0, //30
    },
}

/* materials */
const bones = {
    name:"bones",
    sprite: 'images/items/bones.png',
    type: "material"
}

const boomBones = {
    name:"Boom Bones",
    sprite: 'images/items/bones.png',
    type: "material"
}

const cloth = {
    name:"cloth",
    sprite: "images/items/cloth.png",
    type: "material"
}

const evilCloth = {
    name:'Evil Cloth',
    sprite: "images/items/evilCloth.png",
    type: "material"
}
/* */
const healthInACan = {
    name: 'health in a can',
    price: 20,
    sprite: 'images/items/healthincan.png',
    type: 'health',
    increment: 25
}

const markedUpHealthInCan = {
    name: 'health: More money, same amount',
    price: 50,
    type: 'health',
    increment: 25
}

const Fullheal = {
    name: 'Good Luck!',
    price: 0,
    sprite: 'images/items/healthincan.png',
    type: 'health',
    increment: 100000
}

const stats = [
{
    name:'multiShot',
    price:125,
    sprite: 'images/stats/multishot.png',
    type:'stat',
    statName:'multishot'
},
// {
//     name:'speed',
//     price:20,
//     type:'stat',
//     statName:'speed'
// },
{
    name:'projectile speed',
    price:25,
    sprite: 'images/stats/pSpeed.png',
    type:'stat',
    statName:'pSpeed'
},
{
    name:'projectile damage',
    price:40,
    sprite: 'images/stats/pDamage.png',
    type:'stat',
    statName:'pDamage'
},
{
    name:'max health',
    price:40,
    sprite: 'images/stats/maxhealth.png',
    type:'stat',
    statName:'maxHealth',
    increment: 15
},
{
    name:'max stamina',
    price:20,
    sprite: 'images/stats/maxStamina.png',
    type:'stat',
    statName:'maxStamina',
    increment: 10
},
{
    name:'dash speed',
    price:20,
    sprite: 'images/stats/dashSpeed.png',
    type:'stat',
    statName:'dashSpeed',
    increment: 1
},
// {
//     name:'stamina regeneration',
//     price:45,
//     type:'stat',
//     statName:'staminaRegen',
//     increment: 0.1
// },
{
    name:'shoot speed',
    price:50,
    sprite: 'images/stats/shootSpeed.png',
    type:'stat',
    statName:'shoot speed',
    increment: -25
},
{
    name:'flask health',
    price:100,
    sprite: 'images/items/healthincan.png',
    type:'stat',
    statName:'flask health',
    increment: 5
},
]

const passives = [
passiveItemSrc["laser turret"],
passiveItemSrc["auto turret"],
passiveItemSrc["flame turret"],
passiveItemSrc["vampire"],
passiveItemSrc["threadling"],
passiveItemSrc["spikey"],
passiveItemSrc["self boom"],
passiveItemSrc["boom"],
passiveItemSrc["richochet"],
// {
//     name: 'bouncy',
//     itemVariables: {},
//     price: 10000, //100
//     hasFunc: null, //future proofing items
//     type: 'passiveItem'
// },
]

//constructor(source, damage, width, height, knockback, span, name, clickFunc, runFunc, runFuncCD, tier, increase, sprite) 
//projectile(startX, startY, width, height, xVelocity, yVelocity, source ,repeating = false, room = character.room, color = "#000000", damage = 5, ricochet = false)
const meleeItems = [
    meleeItemsSrc['Big sword'],
    meleeItemsSrc['Small sword'],
    meleeItemsSrc['Medium Sword'],
    meleeItemsSrc['Projectile Spin Sword'],
    meleeItemsSrc['Spin sword'],
    meleeItemsSrc['Super Spin Swords'],
    meleeItemsSrc['TWO Swords'],
    meleeItemsSrc['projectile sword']
]