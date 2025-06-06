let rooms = rooms0.map((arr)=>{return arr.slice();});

const createWall = (x, y, width, height)  => {
    const obj = new wall(x, y, width, height)
    return {bucket:structures, Obj:obj}
}

const createTurret = (x, y, width, height, key) => {
    const obj = new turret(x, y, width, height, key)
    return {bucket:structures, Obj:obj}
}

const createDummy = (x, y, width, height) => { //function to make dummys
    const obj = new dummy(x, y, defaultWidth, defaultHeight)
    return {bucket:entities, Obj:obj}
}

const createZombie = (x, y, width, height) => { //function to make dummys
    const obj = new zombie(x, y, 30, 30, character, entitiySpeed, zombieHealth, zombieDamage, knockBackResistance)
    return {bucket:entities, Obj:obj}
}

const createBasicWarrior = (x, y, width, height) => { //function to make dummys
    const obj = new Warrior(x, y, 50, 50, character, entitiySpeed, zombieHealth * 2, zombieDamage, knockBackResistance, 'basic')
    return {bucket:entities, Obj:obj}
}

const createSpinWarrior = (x, y, width, height) => { //function to make dummys
    const obj = new Warrior(x, y, 50, 50, character, entitiySpeed, zombieHealth * 2, zombieDamage, knockBackResistance, 'spin projectile')
    return {bucket:entities, Obj:obj}
}

const createEvilZombie = (x, y, width, height) => { //function to make dummys
    const obj = new evilZombie(x, y, 40, 40, character, entitiySpeed * 0.75, zombieHealth, zombieDamage * 1.5, knockBackResistance)
    return {bucket:entities, Obj:obj}
}

const createSkeleton = (x, y, width, height) => { //function to make dummys
    const obj = new skeleton(x, y, 30, 30, character, entitiySpeed/2, skeletonHealth, skeletonDamage, skeletonPdamage, skeletonPspeed, knockBackResistance)
    return {bucket:entities, Obj:obj}
}

const createBoomSkeleton = (x, y, width, height) => { //function to make dummys
    const obj = new boomSkeleton(x, y, 30, 30, character, entitiySpeed/2, skeletonHealth, skeletonDamage, skeletonPdamage, skeletonPspeed * 1.5, knockBackResistance)
    return {bucket:entities, Obj:obj}
}

const createPortal = (x, y, width, height) => { //function to make dummys
    const obj = new portal(x, y, width, height, character)
    return {bucket:interactables, Obj:obj}
}

const createShop = (x, y, width, height) => { //function to make dummys
    const obj = new shop(x, y, width, height, character)
    return {bucket:interactables, Obj:obj}
}

const createForge = (x, y, width, height) => { //function to make dummys
    const obj = new forge(x, y, width, height, character)
    return {bucket:interactables, Obj:obj}
}

const createChest = (x, y, width, height) => { //function to make dummys
    const obj = new chest(x, y, width, height, character)
    return {bucket:interactables, Obj:obj}
}

const createBossTeleporter = (x, y, width, height) => { //function to make dummys
    const obj = new teleporter(x, y, width, height, character, (teleporter, target)=>{  
        target.setArea(new area(undefined, (map)=>{
            const startingLayout = [
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'lt', 0, 1], 
                    [1, 'rt', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'r', 0, 0, 0, 0, 0, 0, 0, 1], 
                    [1, 0, 'd', 0, 0, 0, 0, 0, 0, 0, 0, 'r', 0, 0, 0, 0, 0, 0, 0, 1], 
                    [1, 0, 'd', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'f', 1], 
                    [1, 0, 'd', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1], 
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'sh', 1], 
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]
            const startingRoom = new room(startingLayout, '0,0')
            startingRoom.layout[startingRoom.sideDoor][startingLayout[0].length - 1] = 0
            startingRoom.layout[startingRoom.sideDoor - 1][startingLayout[0].length - 1] = 0
            map.set('0,0', startingRoom)
            const bossRoomLayout = 
            [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]
            const bossRoom = new room(bossRoomLayout, '1,0')
            bossRoom.layout[bossRoom.sideDoor][0] = 0
            bossRoom.layout[bossRoom.sideDoor - 1][0] = 0
            bossRoom.layout[1][2] = bossTile[Math.floor(Math.random() * bossTile.length)]
            startingRoom.right = bossRoom;
            bossRoom.left = startingRoom;
            bossRoom.saveDisabled = true;
            map.set('1,0', bossRoom)
        }))
    })
    return {bucket:interactables, Obj:obj}
}

const createZombieSpawner = (x, y, width, height) => { //function to make dummys
    const obj = new spawner(x, y, width, height, character, 'zombie')
    return {bucket:entities, Obj:obj}
}

const createRock = (x, y, width, height) => { //function to make dummys
    const obj = new Rock(x, y, defaultWidth, defaultHeight);
    return {bucket:entities, Obj:obj}
}


const createMotherShip = (x, y, width, height) => { //function to make dummys
    const obj = new motherShip(x, y);
    return {bucket:entities, Obj:obj}
}

const createLeftDoorMS = (x, y, pwidth, pheight) => { //function to make dummys
    const obj = new pressurePlate(x, y, pwidth, character.room.height, character, (pressurePlate, target)=>{ 
        let wallY = target.room.sideDoor * height
        let wallX = 0
        structures.add(new wall(wallX, wallY, width, height))
        wallY = (target.room.sideDoor - 1) * height
        structures.add(new wall(wallX, wallY, width, height))
        const bossX = Math.floor(target.room.layout[0].length / 2) * width
        const bossY = Math.floor(target.room.layout.length / 2) * height
        entities.add(new motherShip(bossX, bossY));
        interactables.remove(pressurePlate.index)
    })
    return {bucket:interactables, Obj:obj}
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
    ['r', createRock],
    ['ms', createMotherShip],
    ['bt', createBossTeleporter],
    ['ldms', createLeftDoorMS]
])

//an array of boss summoning tiles to summon boss
const bossTile = ['ldms']