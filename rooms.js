let rooms = rooms0.map((arr)=>{return arr.slice();});

const createWall = (x, y, width, height)  => {
    structures.add(new wall(x, y, width, height))
}

const createTurret = (x, y, width, height, key) => {
    structures.add(new turret(x, y, width, height, key))
}

const createDummy = (x, y, width, height) => { //function to make dummys
    entities.add(new dummy(x, y, defaultWidth, defaultHeight))
}

const createZombie = (x, y, width, height) => { //function to make dummys
    entities.add(new zombie(x, y, 30, 30, character, entitiySpeed, zombieHealth, zombieDamage, knockBackResistance))
}

const createBasicWarrior = (x, y, width, height) => { //function to make dummys
    entities.add(new Warrior(x, y, 50, 50, character, entitiySpeed, zombieHealth * 2, zombieDamage, knockBackResistance, 'basic'))
}

const createSpinWarrior = (x, y, width, height) => { //function to make dummys
    entities.add(new Warrior(x, y, 50, 50, character, entitiySpeed, zombieHealth * 2, zombieDamage, knockBackResistance, 'spin projectile'))
}

const createEvilZombie = (x, y, width, height) => { //function to make dummys
    entities.add(new evilZombie(x, y, 40, 40, character, entitiySpeed * 0.75, zombieHealth, zombieDamage * 1.5, knockBackResistance))
}

const createSkeleton = (x, y, width, height) => { //function to make dummys
    entities.add(new skeleton(x, y, 30, 30, character, entitiySpeed/2, skeletonHealth, skeletonDamage, skeletonPdamage, skeletonPspeed, knockBackResistance))
}

const createBoomSkeleton = (x, y, width, height) => { //function to make dummys
    entities.add(new boomSkeleton(x, y, 30, 30, character, entitiySpeed/2, skeletonHealth, skeletonDamage, skeletonPdamage, skeletonPspeed * 1.5, knockBackResistance))
}

const createPortal = (x, y, width, height) => { //function to make dummys
    interactables.add(new portal(x, y, width, height, character))
}

const createShop = (x, y, width, height) => { //function to make dummys
    interactables.add(new shop(x, y, width, height, character))
}

const createForge = (x, y, width, height) => { //function to make dummys
    interactables.add(new forge(x, y, width, height, character))
}

const createChest = (x, y, width, height) => { //function to make dummys
    interactables.add(new chest(x, y, width, height, character))
}

const createZombieSpawner = (x, y, width, height) => { //function to make dummys
    entities.add(new spawner(x, y, width, height, character, 'zombie'))
}

const createRock = (x, y, width, height) => { //function to make dummys
    entities.add(new Rock(x, y, defaultWidth, defaultHeight));
}
const tiles = new Map([ //holds all the possible tiles and functions to build them
    [0, function(){
        return;
    }],
    [1, createWall],
    ['lt', createTurret],
    ['d', createDummy],
    ['z', createZombie],
    ['rt', createTurret],
    ['s', createSkeleton],
    ['p', createPortal],
    ['sh', createShop],
    ['f', createForge],
    ['ez', createEvilZombie],
    ['bs', createBoomSkeleton],
    ['zs', createZombieSpawner],
    ['bw', createBasicWarrior],
    ['sw', createSpinWarrior],
    ['ch', createChest],
    ['r', createRock]

])