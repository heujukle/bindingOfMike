const stats = []

const passives = []

const melees = [
{ 
    item:new melee(null, 10, 100, 300, 50, 100, 'Big sword'), //item itself
    price:0, //price
    type: 'melee' //type
}, 
{ 
    item:new melee(null, 10, 75, 150, 15, 40, 'projectile sword', function(sword, e){
        shoot(findDegrees(e.x, e.y, sword.source.x, sword.source.y), new projectile((sword.source.x + sword.source.width) / 2, (sword.source.y + sword.source.height) / 2), 10, 10, 0, 0, 'player')
    }), //item itself
    price:0, //price
    type: 'melee' //type
},]