let rooms = rooms01.map((arr)=>{return arr.slice();});

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

const createBossTeleporter = (x, y, width, height) => { //function to make dummys
    interactables.add(new teleporter(x, y, width, height, character, (teleporter, target)=>{  
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
            map.set('1,0', startingRoom)
        }))
    }))
}

const createZombieSpawner = (x, y, width, height) => { //function to make dummys
    entities.add(new spawner(x, y, width, height, character, 'zombie'))
}

const createRock = (x, y, width, height) => { //function to make dummys
    entities.add(new Rock(x, y, defaultWidth, defaultHeight));
}

const createMotherShip = (x, y, width, height) => { //function to make dummys
    entities.add(new motherShip(x, y));
}

const createLeftDoorMS = (x, y, pwidth, pheight) => { //function to make dummys
    interactables.add(new pressurePlate(x, y, pwidth, character.room.height, character, (pressurePlate, target)=>{ 
        let wallY = target.room.sideDoor * height
        let wallX = 0
        structures.add(new wall(wallX, wallY, width, height))
        wallY = (target.room.sideDoor - 1) * height
        structures.add(new wall(wallX, wallY, width, height))
        const bossX = Math.floor(target.room.layout[0].length / 2) * width
        const bossY = Math.floor(target.room.layout.length / 2) * height
        entities.add(new motherShip(bossX, bossY));
        interactables.remove(pressurePlate.index)
    }))
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