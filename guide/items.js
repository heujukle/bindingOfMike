const container = document.getElementById('itemCont')
const itemKeys = Object.keys(passiveItemSrc)
for(const itemKey of itemKeys){
    const item = passiveItemSrc[itemKey];
    const box = createElement('div', "itemBox", {}, container)
    const structure = createElement('div', "imageAndText", {}, box)
    const imageCont = createElement('div', 'imgCont', {}, structure)
    const image = createElement('img', null, {src:item.sprite === null || item.sprite === undefined ? '../images/Coin.png' : item.sprite}, imageCont)
    const text = createElement('div', "textCont", {}, structure)
    const buffer = createElement('div', null, {}, text)
    const name = createElement('h3', null, {textContent:item.name}, buffer)
    createElement('div', null, {textContent:item.desc}, buffer)
}