class game1to50 {
    constructor() {
        // 사용할 변수(인스턴스 변수 ) 정의 : 생성자 안에서 한다 
        this.nodeList = []; // div 박스들이 들어가는 배열 
        this.frontList = []; // 1 ~ 25
        this.backList = []; // 26~50 
        this.container = document.querySelector(".container");
        this.timer = document.querySelector(".timer");
        this.startBtn = document.querySelector("#start");
        this.gameNum = 1;
        this.record = { min: 0, sec: 0, misec: 0, cnt: 0 };
        // 콜백함수로 this.setRecord 를 사용하려면 
        this.gametime = 0;
        //  setInterval(
        //     this.setRecord, 1); // 1000 == 1초 
        this.init();
    }

    // 이벤트 안에 들어가는 콜백은 화살표 함수로 만들자!
    setRecord = () => {
        let cnt = this.record.cnt++;
        let min = Math.floor(cnt / 3600);
        let sec = Math.floor(cnt % 3600 / 60);
        let misec = cnt % 3600 % 60;

        if (min < 10) {
            min = "0" + min;
        }
        if (sec < 10) {
            sec = "0" + sec;
        }
        if (misec < 10) {
            misec = "0" + misec;
        }
        this.timer.innerHTML = `${min}:${sec}:${misec}`;
        this.record.min = min;
        this.record.sec = sec;
        this.record.misec = misec;
        // console.log(`${min}:${sec}:${misec}`);
        // if (sec == 5) {
        //   clearInterval(this.gametime);
        // }
    }

    setNum() {
        for (let i = 0; i < 25; i++) {
            this.frontList.push(i + 1);
            this.backList.push(i + 26);
        }
        console.log(this.frontList);
        console.log(this.backList);

        for (let i = 0; i < 100; i++) {
            let r = Math.floor(Math.random() * 25); // 0 ~24  // 24-0+1 : 25
            let temp = this.frontList[0];
            this.frontList[0] = this.frontList[r];
            this.frontList[r] = temp;

            r = Math.floor(Math.random() * 25);
            temp = this.backList[0];
            this.backList[0] = this.backList[r];
            this.backList[r] = temp;
        }

    }

    createBox(num, idx) {
        const div = document.createElement("div");
        // if (num < 10) {
        //     div.innerHTML = "0" + num;
        // } else {
        div.innerHTML = num;
        //   }
        div.classList.add("box");
        div.setAttribute("data-idx", idx);

        this.container.appendChild(div);
        return div;
    }

    init() {
        this.startBtn.addEventListener("click", () => {
            this.timer.style.opacity = "1";
            this.startGame();
            this.startBtn.style.display = "none";
            //  none 반대 display="block";

        })

    }
    startGame() {
        this.gametime = setInterval(this.setRecord, 1); // 1000 == 1초 

        this.setNum();
        let idx = 0;
        this.frontList.forEach(node => {
            this.nodeList.push(this.createBox(node, idx));
            idx++;
        })
        console.log(this.nodeList);

        this.nodeList.forEach(div => {
            div.addEventListener("click", (event) => {
                this.hintNum();
                //console.log(event.target.innerHTML);
                this.checkNum(event.target);
            })
        })
    }

    hintNum() {
        const getDiv = this.nodeList.find(div => this.gameNum == div.innerHTML * 1);
        getDiv.classList.add("hint");
        setTimeout(() => {
            getDiv.classList.remove("hint");
        }, 100);
    }

    checkNum(node) {
        if (node.innerHTML * 1 === this.gameNum) {
            if (this.gameNum <= 25) {
                node.innerHTML = this.backList[node.getAttribute("data-idx")];
            } else {
                // node.style.display ="hidden";
                node.style.opacity = 0;
            }
            this.gameNum++;
        }
        if (this.gameNum == 50) {
            setTimeout(() => {
                this.container.style.opacity = 0;
                clearInterval(this.gametime);
                this.gameBtn.style.display = " block";
                this.gameBtn.innerHTML = "다시 시작";
                this.timer.classList.add("recode");
                this.timer.innerHTML = ` 당신의 기록 <br>${this.record.min}:${this.record.sec}:${this.record.misec}`;

            }, 300);
        }

    }

}

const game = new game1to50();
