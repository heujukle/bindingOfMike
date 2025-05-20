const container = document.getElementById('swordCont')
const defaultSprite = document.getElementById('defaultSword');
const swordKeys = Object.keys(meleeItemsSrc)
for(const melee of swordKeys){
    const sword = meleeItemsSrc[melee].item()
    console.log(sword)
    const box = createElement('div', "itemBox", {}, container)
    const structure = createElement('div', "imageAndText", {}, box)
    const imageCont = createElement('div', 'imgCont', {}, structure)
    const image = createElement('img', null, {src:sword.sprite === null ? defaultSprite.src : sword.sprite.src}, imageCont)
    const text = createElement('div', "textCont", {}, structure)
    const name = createElement('h3', null, {textContent:sword.name}, text)
}