class Bullet{
    constructor(){
        this.radius = 8;
        this.speed = 4;
        this.color = "green";
        this.x;
        this.y;
        this.dx;
        this.dy;
        this.cwidth = 800;
        this.cheight = 500;
    }

    init(px, py){
        let location = Math.floor(Math.random()*4);

        if (location == 0){
            this.x = Math.random() *(this.cwidth-this.radius);
            this.y = 10;
        } else if (location == 1){
            this.x = 10;
            this.y = Math.random() *(this.cheight-this.radius);
        } else if (location == 2){
            this.x = Math.random() *(this.cwidth-this.radius);
            this.y = this.cheight-10;
        } else {
            this.x = this.cwidth-10;
            this.y = Math.random() *(this.cheight-this.radius);
        }

        let dx = px - this.x;
        let dy = py - this.y;
        let c = Math.sqrt(dx*dx + dy*dy);

        this.dx = dx/ c;
        this.dy = dy/ c;
    }



    update(px, py){
        this.x += this.dx *this.speed;
        this.y += this.dy *this.speed;

        if(this.x <- this.radius || y <- this.radius
            || this.x > this.cwidth+this.radius || this.y > this.cheight + this.radius){
                this.init(px, py);
            }
    }

    render(ctx){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}