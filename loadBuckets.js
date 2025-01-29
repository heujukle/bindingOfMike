const structures = { //loads structures
    list: [],
    add: function(entity){ //adds structures to the rendering
        entity.index = this.list.length;
        this.list.push(entity);
    },
    remove: function(index){ ///removes structures from rendering
        this.list.splice(index, 1);
    },
    draw: function (){ //draws all items 
        for(let i = 0; i < this.list.length; i++){
            this.list[i].draw();
        }
    },
    resetList: function(){
        this.list = []
    }, 
    check: function(){
        return true;
    }
}

const entities = { // loads entities
    list: [],
    add: function(entity){
        if(this.list.indexOf(null) != -1){
            entity.index = this.list.indexOf(null)
            this.list[this.list.indexOf(null)] = entity;
        }
        else{
            entity.index = this.list.length;
            this.list.push(entity)
        }
    },
    remove: function(index){
        this.list[index] = null;
    },
    draw: function (){
        for(let i = 0; i < this.list.length; i++){
            if(this.list[i]){
            this.list[i].draw();
            }
        }
    },
    clear: function(){
        this.list = []
    },
    check: function(entity, original){ //true means check
            if(original.iframes == 0){
                return true;
            }
            if(entity === null){
                return false;
            }
            if(entity.behavior == 'static'){ 
                return true;
            }
            if(entity.target.iFrames == 0){ 
                return true;
            }
            return false;
    }
}

const damageInstances = {
    list: [],
    add: function(entity){
        if(this.list.indexOf(null) != -1){
            entity.index = this.list.indexOf(null)
            this.list[this.list.indexOf(null)] = entity;
        }
        else{
            entity.index = this.list.length;
            this.list.push(entity)
        }
        return entity.index;
    },
    remove: function(index){
        this.list[index] = null;
    },
    draw: function (){
        for(let i = 0; i < this.list.length; i++){
            if(this.list[i]){
            this.list[i].draw();
            }
        }
    },
    clear: function(){
        for(let i = 0; i < this.list.length; i++){
            if(this.list[i]){
            this.list[i].animating = false;
            }
        }
        this.list = []
    }
    
}

const interactables = {
    list: [],
    add: function(entity){
        if(this.list.indexOf(null) != -1){
            entity.index = this.list.indexOf(null)
            this.list[this.list.indexOf(null)] = entity;
        }
        else{
            entity.index = this.list.length;
            this.list.push(entity)
        }
        return entity.index;
    },
    remove: function(index){
        this.list[index] = null;
    },
    draw: function (){
        for(let i = 0; i < this.list.length; i++){
            if(this.list[i]){
            this.list[i].draw();
            }
        }
    },
    clear: function(){
        this.list = []
    }
    
}

const timers = { //holds frame timers
    list: [],
    run: function(){
        for(let i = 0; i < this.list.length; i++){
            if(this.list[i].frames > 0){ //if frames left then remove 1
                this.list[i].frames -= 1;
            }
            else{ //if 0 frames execute code
                this.list[i].func()
                this.list[i] = null;
            }
        }
        this.list = this.list.filter(function(value){
            return value != null
        })
    },
}

function addFrameTimeout(func, frames){
    timers.list.push({func : func, frames : frames })
}