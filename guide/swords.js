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
    const buffer = createElement('div', null, {}, text)
    const name = createElement('h3', null, {textContent:sword.name}, buffer)
    createElement('div', null, {textContent:meleeItemsSrc[melee].desc}, buffer)
    const list = createElement('ul', null, {}, buffer);
    createElement('li', null, {textContent:`Damage: ${sword.damage}`}, list);
    createElement('li', null, {textContent:`Knockback: ${sword.knockback}`}, list);
    createElement('li', null, {textContent:`Span: ${sword.span}`}, list);
    createElement('li', null, {textContent:`Run Func CD: ${sword.runFuncCD}`}, list);
    createElement('li', null, {textContent:`Width: ${sword.width}`}, list);
    createElement('li', null, {textContent:`Height: ${sword.height}`}, list);
    let increase = JSON.stringify(sword.increase)
    increase = increase.replaceAll(/["{}]/g, '')
    createElement('li', null, {textContent:`Increase: ${increase}`}, list);
}