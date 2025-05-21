const passiveItemSrc = {
    "auto turret" : {
    name: 'auto turret',
    desc: 'Creates a turret that targets enemies above the player',
    itemVariables: {timeOfLastActivation: 0},
    price: 750, //1000
    hasFunc: {func:(source) => {
        if(document.timeline.currentTime - source.passiveItems["auto turret"].timeOfLastActivation > 500){
            source.passiveItems["auto turret"].timeOfLastActivation = document.timeline.currentTime;
            const target = determineTarget(source);
            if(target == null) return;
            else{
                const degrees = findDegrees(source.x, source.y, target.x + target.width/2, target.y + target.height/2)
                const velocities = getProjVelocities(degrees, 7);
                damageInstances.add(new projectile((source.x + source.width/2), source.y - 50, 15, 15, -velocities.xVelocity, -velocities.yVelocity, source, false, source.room, '#268199', source.stats['pDamage'], source.has('richochet')))
            }
        }
        ctx.beginPath();
        ctx.rect((source.x + source.width/2) - 10, source.y - 50, source.width/2, source.height/2);
        ctx.fillStyle = 'grey';
        ctx.fill();
        ctx.closePath();
    }, hook: 'onPlayerDraw'}, //future proofing items
    type: 'passiveItem'
},
"threadling" : {
    name: 'threadling',
    desc: 'On enemy defeat a homing entitiy will be created to seek out another enemy',
    itemVariables: {},
    price: 750, //1000
    hasFunc: {func:(enemy) => {
        entities.add(new threadling(enemy.x, enemy.y, 25, 25, 10, 20, 'player'))
    }, hook: 'onEnemyDeath'}, //future proofing items
    type: 'passiveItem'
},
'richochet' : {
    name: 'richochet',
    desc: 'Projectiles richochet',
    itemVariables: {},
    price: 750, //1000
    hasFunc: null, //future proofing items
    type: 'passiveItem'
},
'vampire' : {
    name: 'vampire',
    desc: 'Hits return health',
    itemVariables: {timeOfLastActivation: 0},
    price: 2500, //1000
    hasFunc: {func:(character) =>{  //future proofing items
        if(document.timeline.currentTime - character.passiveItems["vampire"].timeOfLastActivation < 500) return
        character.passiveItems["vampire"].timeOfLastActivation = document.timeline.currentTime
        character.health  += character.health + 0.5 > character.stats['maxHealth'] ? 0 : 1
        character.updateHealthBar()
        return;
    }, hook: 'onEnemyDamage'},
    type: 'passiveItem'
},
'boom' : {
    name: 'boom',
    desc: 'Projectiles explode',
    itemVariables: {},
    price: 800, //1000
    hasFunc: {func:(source) =>{  //future proofing items
        damageInstances.add(new explosion(source, 100, 15, 30, 5))
        return;
    }, hook: 'playerProjectileInteract'},
    type: 'passiveItem'
},
'self boom' : {
    name: 'self boom',
    desc: 'Explode on player damage',
    itemVariables: {hitList : []},
    price: 300, //200
    hasFunc: {func:(character) =>{ //future proofing items
        damageInstances.add(new explosion(character, 400, 15, 60))
    }, hook: 'playerTouch'},
    type: 'passiveItem'
},
'spikey' : {
    name: 'spikey',
    desc: 'Colliding with an enemy will damage the nemey. Dashing into an enemy returns stamina',
    itemVariables: {hitList : []},
    price: 250, //200
    hasFunc: {func:(character, source) =>{ //future proofing items
        if(Object.keys(character.passiveItems).includes('spikey') && source != null){ //spikey code
                if(!character.passiveItems["spikey"].hitList.includes(source) && !(source.health == undefined)){
                character.stamina += 2;
                if(character.stamina > character.stats['maxStamina']) character.stamina = character.stats['maxStamina']
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
}
}