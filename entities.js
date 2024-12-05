class dummy{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.points = getPoints(3, this)
        this.color = "#ab5901"
        this.defaultColor = "#ab5901"
        this.timeSinceDamage = 0;
        console.log(this.points)
    }

    onDamage(){
        this.color = '#ff0000'
        this.timeSinceDamage =  document.timeline.currentTime;
    }

    draw(){
        if(document.timeline.currentTime - this.timeSinceDamage > 250){
            this.color = this.defaultColor;
        }
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}