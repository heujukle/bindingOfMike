function onDeath(){
    menu = true
    overlay.innerHTML = ''
    document.getElementById('bossbars').innerHTML = ''
    topLeft.classList.add('invisible')
    overlay.classList.remove('invisible')
    const blackDrop = createElement('div', 'blackGround', {}, overlay)
    createElement('div', 'deathText', {textContent: 'You Died'}, blackDrop)
    createElement('div', 'areaText', {textContent: 'Area: ' + areaCount}, blackDrop)
    const replay = createElement('div', 'replayText', {textContent: 'Try Again?'}, blackDrop)

    fetch("leaderboard/leaderboard.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "Furthest Area" : {username : username, score : areaCount},
            "Highest score" : {username : username, score : character.score},
            "Highest Tier" : {username : username, score : character.highestTier},
        }), // Send full order data
    })
    .then(response => response.json())  // Expect a JSON response
    .then(data => {
        console.log(data.status, data.message, data.reset);
    })
    .catch(error => console.error("Error:", error));

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
        adjustSize([character], true)
        menu = false
    })
}

// document.addEventListener('keydown', (e)=>{
//     if(e.key == 'l'){
//         console.log("die")
//         onDeath()
//     }
// })