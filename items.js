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
    hasFunc: null, //future proofing items
    type: 'passiveItem'
},
{
    name: 'vampire',
    itemVariables: {},
    price: 2500, //1000
    hasFunc: {func:(character) =>{  //future proofing items
        character.health  += character.health + 1 > character.stats['maxHealth'] ? 0 : 1
        character.updateHealthBar()
        return;
    }, hook: 'onEnemyDamage'},
    type: 'passiveItem'
},
{
    name: 'spikey',
    itemVariables: {hitList : []},
    price: 250, //200
    hasFunc: {func:(character, source) =>{ //future proofing items
        if(Object.keys(character.passiveItems).includes('spikey') && source != null){ //spikey code
                if(!character.passiveItems["spikey"].hitList.includes(source)){
                source.onDamage(5, function(target){ //special functionality for spiikey
                    const degrees = findDegrees(character.x, character.y, target.x, target.y)
                    const velocities = getProjVelocities(degrees, 10)
                    console.log(velocities)
                    if(target.xVelocity != undefined){ //knock back to enemeny
                        console.log('added knockback')
                        target.xVelocity += velocities.xVelocity * character.xVelocity != 0 ? -velocities.xVelocity * Math.abs(character.xVelocity * 0.15) : 10
                    }
                    if(target.yVelocity != undefined){
                        target.yVelocity += velocities.yVelocity * character.yVelocity != 0 ? -velocities.yVelocity * Math.abs(character.yVelocity  * 0.15) : 10
                    }
                    console.log(target)
                })
                character.passiveItems['spikey'].hitList.push(source) //makes sure spkiey doesnt hit twice
                }
            }
    }, hook: 'playerTouch'},
    type: 'passiveItem'
},
{
    name: 'bouncy',
    itemVariables: {},
    price: 100, //100
    hasFunc: null, //future proofing items
    type: 'passiveItem'
},
]

//constructor(source, damage, width, height, knockback, span, name, clickFunc, runFunc, runFuncCD, tier, increase, sprite) 
//projectile(startX, startY, width, height, xVelocity, yVelocity, source ,repeating = false, room = character.room, color = "#000000", damage = 5, ricochet = false)
const meleeItems = [
    { 
        name: 'Medium Sword',
        sprite: null,
        item:()=>{return new melee(undefined, 10, 150, 175, 10, 80, 'Medium Sword', undefined, undefined, undefined, 1, {damage: 15, height:5, width:5})}, //item itself
        price:150, //price
        type: 'melee' //type
    }, 
    { 
        name: 'Small sword',
        sprite: null,
        item:()=>{return new melee(undefined, 40, 25, 50, 25, 30, 'Small sword', undefined, undefined, undefined, 1, {damage: 20})}, //item itself
        price:100, //price
        type: 'melee' //type
    }, 
    { 
        name: 'Projectile Spin Sword',
        sprite: null,
        item:()=>{return new melee(undefined, 10, 100, 300, 25, 360, 'Projectile Spin Sword', undefined, function(sword){
            const velocities = getProjVelocities(sword.currentAngle, 7);
            const startX = sword.source.x + sword.source.width/2
            const startY = sword.source.y + sword.source.height/2
            const swordProjectile = new projectile(startX, startY, 15, 15, velocities.xVelocity, velocities.yVelocity, 'player', false, sword.source.room, '#268199', 5, sword.source.has('richochet'))
            damageInstances.add(swordProjectile)
        }, 40, 1, {runFuncCD: -2})}, //item itself
        price:700, //price
        type: 'melee' //type
    }, 
    { 
        name: 'Big sword',
        sprite: null,
        item:()=>{return new melee(undefined, 10, 100, 300, 25, 100, 'Big sword', undefined, undefined, undefined, 1, {damage: 10, height:20, width:20, knockback: 10})}, //item itself
        price:250, //price
        type: 'melee' //type
    }, 
{ 
    name: 'TWO Swords',
    sprite: null,
    item:()=>{return new melee(undefined, 20, 100, 100, 15, 180, 'TWO Swords', function(sword, e){
        if(sword.name != 'second'){
            const newSword = new melee(sword.source, sword.damage, sword.width, sword.height, sword.knockback, sword.span, 'second', sword.clickFunc, sword.runFunc, sword.runFuncCD, undefined, undefined, sword.sprite)
            newSword.setValues(sword.startingAngle - 90, {x: window.innerWidth - e.x, y:window.innerHeight - e.y})
            damageInstances.add(newSword)
        }
    }, null, null, 0, {damage: 10, height:20, width:20, knockback: 10})}, //item itself
    price:700, //price
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
        const swordProjectile = new projectile(startX, startY, 15, 15, velocities.xVelocity, velocities.yVelocity, 'player', false, sword.source.room, '#268199', 5, sword.source.has('richochet'))
        damageInstances.add(swordProjectile)
    })}, //item itself
    price:350, //price
    type: 'melee' //type
},
{
    name: 'Spin sword',
    sprite: null,
    item:()=>{return new melee(undefined, 10, 100, 300, 30, 360, 'Spin sword', null, null, null, 1, {damage:15, width:20, span:30})}, //item itself
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