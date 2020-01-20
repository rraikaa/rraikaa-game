function Food(x, y, size, type) {
    this.type = type;
    this.size = size;
    // this.side = side;

    this.x = x;
    this.y = y;

    this.pos = createVector(this.x, this.y);
    

    this.show = function () {

        if(this.type === 'speed') {
            push();
            
            stroke(255, 215, 0);
            fill(255, 129, 0);
            ellipse(this.pos.x, this.pos.y, this.size * 2, this.size * 2);
            pop();
            
            push();
            strokeWeight(1);
            stroke(255, 129, 0);
            fill(255, 215, 0);
            ellipse(this.pos.x, this.pos.y, this.size, this.size);
            pop();

        } else {
            push();
            fill(0);
            ellipse(this.pos.x, this.pos.y, this.size * 2, this.size * 2);
            pop();
        }

        
    };

   
}