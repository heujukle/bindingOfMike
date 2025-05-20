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