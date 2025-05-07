function onDeath(){
    menu = true
    overlay.innerHTML = ''
    topLeft.classList.add('invisible')
    overlay.classList.remove('invisible')
    const blackDrop = createElement('div', 'blackGround', {}, overlay)
    createElement('div', 'deathText', {textContent: 'You Died'}, blackDrop)
    createElement('div', 'areaText', {textContent: 'Area: ' + areaCount}, blackDrop)
    const replay = createElement('div', 'replayText', {textContent: 'Try Again?'}, blackDrop)
    updateLeaderBoard();

    replay.addEventListener("click", ()=>{
        ctx.translate(character.translateX, character.translateY)
        rooms = rooms0.map((arr)=>{return arr.slice();});
        entitiySpeed = 1;
        zombieHealth = 35;
        skeletonHealth = 35;
        skeletonPspeed = 8;
        skeletonPdamage = 5;
        zombieDamage = 5; 
        skeletonDamage = 5; 
        moneyScale = 1;
        knockBackResistance = 1;
        itemScale = 1 
        areaCount = 0
        character = new player()
        hook.hooks = {
            'onEnemyDamage' : [],
            'onPlayerDamage' : [],
            'playerTouch' : [],
            'playerProjectileInteract' : [],
            'onEnemyDeath' : [],
            'onPlayerDraw' : [],
        }
        character.setArea(new area())
        character.updateHealthBar()
        character.updateStaminaBar()
        document.getElementById('walletDisplay').textContent = character.wallet;
        overlay.innerHTML = ''
        topLeft.classList.remove('invisible')
        overlay.classList.add('invisible')
        menu = false
    })
}

// document.addEventListener('keydown', (e)=>{
//     if(e.key == 'l'){
//         console.log("die")
//         onDeath()
//     }
// })