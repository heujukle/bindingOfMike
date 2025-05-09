const dropdown = document.getElementById('dropdown');
const dropDownContent = document.getElementById('dropdownContent');
const main = document.getElementsByTagName('main')[0]
const leaderBoardBody = document.getElementById('leaderBoardBody');
const categoryTitle = document.getElementById('categoryTitle');

async function getLeaderBoard(){
    try {
        const response = await fetch("leaderBoard.json");
        if(!response.ok){
            console.log('Fail')
            return false;
        }
        const text = await response.text();
        return text;
    }
    catch (error) {
        console.log('Womp Womp')
        return false;
    }
}


async function processEvent(){
    const leaderBoardText = await getLeaderBoard();
    
    if(leaderBoardText === false){
        createElement('div', null, {textContent : "Error loading..."}, main)
    }
    else{
        const leaderBoard = JSON.parse(leaderBoardText)
        console.log(leaderBoard)

        const categories = Object.keys(leaderBoard);
        loadLeaderBoards(categories[0], leaderBoard)
        dropDownContent.textContent = '';
        for(const category of categories){
            const button = createElement('div', null, {textContent:category}, dropDownContent)
            button.addEventListener('click', (e)=>{
                console.log(category)
                categoryTitle.textContent = category
                loadLeaderBoards(category, leaderBoard)
            })
        }
        dropdown.addEventListener('mouseenter', (e)=>{
            dropDownContent.classList.add("flex")
        })
        dropdown.addEventListener('mouseleave', (e)=>{
            console.log("turn off")
            dropDownContent.classList.remove("flex")
        })
    }
}

processEvent();

function loadLeaderBoards(category, board){
    leaderBoardBody.innerHTML = '';
    const data = board[category];
    let keys = Object.keys(data);
    keys.sort((a,b) => b - a);
    console.log(keys)

    for(const key of keys){
        const values = data[key];
        for(const value of values){
            createElement('div', null, {textContent:`${value.username} : ${value.score}`}, leaderBoardBody)
        }
    }
}
function createElement(elementType = null, cssClass, properties = {}, parent = null){ //element type makes a type, class adds a class, properties allows acsess to css properties, parent adds the element
    if(elementType){
        const element = document.createElement(elementType)
        if(cssClass) element.classList.add(cssClass)
        for(let i = 0; i < Object.keys(properties).length; i++){
            element[Object.keys(properties)[i]] =  properties[Object.keys(properties)[i]]
        }
        if(parent != null) parent.appendChild(element)
        return element
    }
}