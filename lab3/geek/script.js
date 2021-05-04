class Circle{
    constructor(radius, x, y, color){
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.color = color
        this.xVelocity = 0;
        this.yVelocity = 0;
    }

    move(xVel, yVel){
        this.xVelocity = xVel;
        this.yVelocity = yVel;
    }

    repos(canvas){
        if(this.x > canvas.width){
            this.x = this.x % (canvas.width + 1)
        }
        else if(this.x < 0){
            this.x += canvas.width + 1;
        }

        if(this.y > canvas.height){
            this.y = this.y % (canvas.height + 1)
        }
        else if(this.y < 0){
            this.y += canvas.height + 1;
        }
        
    }

    drawCircle(canvas, ctx){
        this.x += this.xVelocity;
        this.y += this.yVelocity;
        ctx.beginPath()
        ctx.save();
        ctx.fillStyle = this.color;
        this.repos(canvas)
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        ctx.fill();
        ctx.restore()
    }

    collisionSquare(square){
        var distX = Math.abs(this.x - square.x-square.size/2);
        var distY = Math.abs(this.y - square.y-square.size/2);
        if(distX <= (square.size/2 + this.radius) && distY <= (square.size/2 + this.radius)){
            let tmp = square.points;
            square.points = -20
            return tmp;

        }
        return 0;
    }


}

class Square{
    constructor(canvas, size, time){
        this.size = size;
        this.x = Math.floor(Math.random() * (canvas.width - size));
        this.y = Math.floor(Math.random() * (canvas.height - size));
        this.points = 20;
        this.interval = setInterval(()=>this.subtractPoints(), time)
    }

    subtractPoints(){
        this.points -= 1;
        if(this.points == -20){
            clearInterval(this.interval)
        }
    }

    drawSquare(canvas, ctx){
        ctx.beginPath()
        ctx.save();
        if(this.points > 0){
            ctx.fillStyle = 'green'
        }
        else{
            ctx.fillStyle = 'red'
        }
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.font = "15px Arial";
        ctx.fillStyle = 'black'
        ctx.textAlign = "center";
        ctx.fillText(this.points, this.x + this.size/2, this.y + this.size/2)
        ctx.fill()
        ctx.restore()
    }
}

class GameArea extends HTMLElement{
    constructor(){
        super();
        this.shadow = this.attachShadow({mode: "open"});
        this.shadow.innerHTML = `
        <canvas></canvas>`
        this.player = new Circle(30, 0, 0, 'blue')
        this.enemies = [];
        this.time = 500
        this.cancel
    }

    get points(){
        return this.getAttribute("points");
    }

    set points(val){
        this.setAttribute("points", val);
    }

    get velocity(){
        return parseInt(this.getAttribute("velocity"));
    }

    set velocity(val){
        this.setAttribute("velocity", val);
    }

    get enemiescount(){
        return parseInt(this.getAttribute("enemiescount"));
    }

    set enemiescount(val){
        this.setAttribute("enemiescount", val);
    }

    static get observedAttributes(){
        return ["points", "velocity", "enemiescount"]
    }

    attributeChangedCallback(property, oldVal, newVal){
        if(property === 'points'){
            document.querySelector('points-table').dispatchEvent(new CustomEvent('point-change', {bubbles: true, composed: true, 
                detail: {       
                    points: this.points,
                }
            }))
        }

        if(property === 'enemiescount'){
            console.log("s")
        }
    }

    connectedCallback(){
        this.canvas = this.shadow.querySelector('canvas');
        this.canvas.width = 500;
        this.canvas.height = 500;
        this.ctx = this.canvas.getContext('2d');
        console.log(this.enemiescount)
        for(let i = 0; i < this.enemiescount; i++){
            this.enemies.push(new Square(this.canvas, 20, this.time))
        }
        document.addEventListener("keydown", (e)=>{
            if(e.code === "ArrowRight"){
                this.player.move(this.velocity,0)
            }
            else if(e.code === "ArrowLeft"){
                this.player.move(-this.velocity,0)
            }
            else if(e.code === "ArrowDown"){
                this.player.move(0,this.velocity)
            }
            else if(e.code === "ArrowUp"){
                this.player.move(0,-this.velocity)
            }
        })

        this.stageOne();
    }

    stageOne(){
        setTimeout(()=>this.stageTwo(), 60000);
        this.cancel = window.requestAnimationFrame(()=>this.draw())
    }
    stageTwo(){
        setTimeout(()=>this.stageThree(), 60000);
        this.velocity += 5
        this.enemiescount += 5;
        this.time -= 100;
    }
    stageThree(){
        setTimeout(()=>this.endStage(), 60000)
        this.velocity += 5
        this.enemiescount += 5;
        this.time -= 100;
    }
    endStage(){
        window.cancelAnimationFrame(this.cancel)
    }

    draw(){
        this.ctx.clearRect(0, 0 ,this.canvas.width,this.canvas.height);
        this.player.drawCircle(this.canvas, this.ctx)
        this.enemies = this.enemies.filter((val, idx, arr)=>{
            return val.points > -20
        })
        if(this.enemies.length < this.enemiescount){
            this.enemies.push(new Square(this.canvas, 20, this.time))
        }
        for(let sq of this.enemies){
            sq.drawSquare(this.canvas, this.ctx)
            let tmp = this.player.collisionSquare(sq)
            if(tmp != 0){
                this.points = parseInt(this.points) + tmp;
            }
            
        }
        this.cancel = window.requestAnimationFrame(()=>this.draw())
    }
}

class TableResults extends HTMLElement{

}

class TablePoints extends HTMLElement{
    constructor(){
        super();
        this.shadow = this.attachShadow({mode: "open"});
        this.points = 0;
        this.addEventListener('point-change', (event)=>{
            this.points = event.detail.points
            this.render()
        })
        
        
    }

    connectedCallback(){
        this.render()
    }

    render(){
        this.shadow.innerHTML = `
        <h1> Punkty
        <span>${this.points}</span>
        </h1>`
    }
    
}

customElements.define("game-area", GameArea);
customElements.define("points-table", TablePoints)


