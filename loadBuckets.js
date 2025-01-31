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
    check: function(entity, original){ //original is the object which collision is based on, entity is what it is tried against
        //function used to make sure the collision is valid
        if(entity === null) return false
            if(original.iframes === 0){
                return false;
            }
            return true;
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

const hook = {
    hooks: {
        'onEnemyDamage' : [],
        'onPlayerDamage' : [],
        'playerTouch' : [],
        'playerProjectileInteract' : [],
    },
    add:function(hooktype, func){
        if(this.hooks[hooktype] === null || this.hooks[hooktype] === undefined) this.hooks[hooktype] = [func] //creates a new hook incase one isnt used
        else this.hooks[hooktype].push(func) //adds function to current hook
    },
    dispatch: function(hooktype, arg1=null, arg2=null, arg3=null){ //args to pass to functions
        if(this.hooks[hooktype] === null || this.hooks[hooktype] === undefined) console.log("empty hook")
        else{
            for(let i = 0; i < this.hooks[hooktype].length; i++){
                this.hooks[hooktype][i](arg1, arg2, arg3)
            }
        }
    }
}