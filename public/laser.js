//basically make it a red ellipse and white ellpise and have white one on onside and add a shadow to it and create a vector that goes out from the tip and gets a certain distance and travels in that straight line

//need to have data of laser so it can be broad casted to others

function Laser(x, y, r) {
    this.r = r;
    // let rocketX = rocket.posTip.x;
    // let rocketY = rocket.posTip.y;
this.pos = {
    x: x,
    y: y + 2
}
    // this.pos.x = x;
    // this.pos.y = y + 2;
    //  = {
    //     x: x,
    //     y: y + 2
    // }
    
    this.init = function() {
        translate(x, y); 
    }
    this.render = function() {
        push();
        stroke(255, 0, 0);
        
         //sin angle times hypotnus = opposite (y coordinate)
        //cos angle times hypotnus = adjacent (x coord)
        let ylength = Math.sin(rocket.angle) * 100;
        let xlength = Math.cos(rocket.angle) * 100;
        let endY = this.pos.y + ylength;
        let endX = this.pos.x + xlength;
        // line(this.pos.x, this.pos.y +2, this.pos.x + 10, this.pos.y - 10);
        // line(this.pos.x, this.pos.y +2, endX, endY);
        
        line(rocket.pos.x, rocket.pos.y, endX, endY);
        // line(this.pos.x, this.pos.y + 2, this.pos.x + 500, this.pos.y - 500);
        
        pop();
        // ellipse(this.pos.x, this.pos.y + 2, 1, 8);

    }
    this.update = function() {
        for(let i = 0; i < 100; i++) {
            this.pos.y += i;
        }
    }
}