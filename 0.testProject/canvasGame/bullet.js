class Bullet {
    constructor() {
        // 불렛의 인스턴스 변수들 => 클래스 필드
        this.radius = 7;
        this.speed = 2;
        this.color = "orange";
        this.x; // 현재 총알 x 
        this.y; // 현재 총알 y 
        this.dx; // 도착 x 
        this.dy; // 도착 y 
        this.cwidth = 800;
        this.cheight = 400;
    }

    init(px, py) {
        // 0 ~ 3          Math.floor => 소숫점을 무조건 내림 0.123 1.1231 2.12313 3.123123 => 0 1 2 3 
        let location = Math.floor(Math.random() * 4); // 0 ~ 1 사이에 소숫점 난수 (1포함 x)

        if (location == 0) {
            // 총알의 랜덤값 상에서 나옴 
            // 800 - 7 : 793
            this.x = Math.random() * (this.cwidth - this.radius)
            this.y = 10;
        } else if (location == 1) {
            // 왼쪽에서 랜덤값으로 총알 나옴 

            this.x = 10;              // 400 - 7 : 393
            this.y = Math.random() * (this.cheight - this.radius);

        } else if (location == 2) {
            // 아래쪽에서 랜덤으로 총알나옴
            this.x = Math.random() * (this.cwidth - this.radius) // 793 
            this.y = this.cheight - 10; // 390
        } else {
            this.x = this.cwidth - 10;
            this.y = Math.random() * (this.cheight - this.radius); // 393
        }

        // 플레이어 좌표로 도작지점 셋팅 
        let dx = px - this.x;
        let dy = py - this.y;
        let c = Math.sqrt(dx * dx + dy * dy);
        // 바로 가면 플레이어가 즉사 : 조금씩 나눠서 이동 
        this.dx = dx / c;
        this.dy = dy / c;

    }
    // 바로 플레이어 현재 좌표로 이동하게되면 플레이어 즉사 
    // 플레이어가 이동할 수 있도록 조금씩 나눈 좌표 이동 
    update(px, py) {
        this.x += this.dx * this.speed;
        this.y += this.dy * this.speed;
        // 총알이 화면 밖으로 나갔을때 다시 총알 장전 
        // 상x , 상 y , 하 x, 하 y 

        if (this.x < -this.radius || this.y < -this.radius
            || this.x > this.cwidth + this.radius || this.y > this.cheight + this.radius
        ) {
            this.init(px, py); // 다시 현재 플레이어 값을 유도로 총알 장전 
        }

    }

    render(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();

    }

    // Math.sqrt => 제곱근
    // Math.pow => 거듭제곱 

    // Math.sqrt 연산처리가 Math.pow 천배 느리다 

    // 충돌 처리 
    collision(px, py, size) {
        // 현재 플레이어랑 현재 불렛이랑 거리값 
        let pdw = this.x - px;
        let pdh = this.y - py;
        let pdc = pdw * pdw + pdh * pdh;
        // let pdc = Math.sqrt(pdw*pdw + pdh*pdh);

        // if(Math.pow(size + this.size) > pdc) {
        //     console.log("충돌")
        //     return true;
        // }else{
        //     return false;
        // }


        return Math.pow(size + this.radius, 2) > pdc;

    }



    collision(px, py, size) {
        let pdw = this.x - px;
        let pdh = this.y - py;
        let pdc = pdw * pdw + pdh * pdh;
        return Math.pow(size + this.radius, 2) > pdc;

    }

}