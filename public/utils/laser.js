
function Laser(x, y, r) {
    this.r = r;

    this.pos = {
        x: x,
        y: y + 2
    }
  
    this.init = function() {
        translate(x, y); 
    }
    this.render = function() {
        push();
        stroke(255, 0, 0);
        
        
        let ylength = Math.sin(rocket.angle) * 100;
        let xlength = Math.cos(rocket.angle) * 100;
        let endY = this.pos.y + ylength;
        let endX = this.pos.x + xlength;
        
        line(rocket.pos.x, rocket.pos.y, endX, endY);
        
        pop();

    }
    this.update = function() {
        for(let i = 0; i < 100; i++) {
            this.pos.y += i;
        }
    }
}