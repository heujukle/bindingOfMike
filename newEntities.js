class Rock{
    constructor(x, y, width, height){
        this.instance = 'Rock';
        this.x = x;
        this.y = y;
        this.offsets = { //holds the values of all the ratio of changes
            xOffset : x / character.room.width,
            yOffset : y / character.room.height,
            widthOffset : defaultWidth / 1920,
            heightOffset : defaultHeight / 945,
        }
        this.width = width;
        this.height = height;
        this.points = getPoints(3, this)
        this.color = 'rgba(0, 0, 0, 0)'
        this.defaultColor = 'rgba(0, 0, 0, 0)'
        this.timeSinceDamage = 0;
        this.behavior = 'static'
        this.allied = 'enemy'
        this.health = 30;
        this.index;
        console.log(this.points)
        this.image = new Image()
        this.image.src = 'images/walls/Rock.png'
    }

    onDamage(damage){
        this.health -= damage;
        this.color = entityDamage
        this.timeSinceDamage =  document.timeline.currentTime;
    }

    draw(){
        if(this.health < 0) entities.remove(this.index)
        if(document.timeline.currentTime - this.timeSinceDamage > 250){
            this.color = this.defaultColor;
        }
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#ab5901";
        ctx.fill();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}