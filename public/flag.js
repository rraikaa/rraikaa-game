function Flag(x, y) {
    
    this.pos = createVector(x, y);
    

    this.width = 18;
    this.height = 11.7;

    

    this.render = function() {

        //line for flag
        push();
      

        stroke(255, 0, 0);
        line(this.pos.x + 1, this.pos.y + 1, this.pos.x, this.pos.y + 20);
        
        pop();
        

        
        push();
        fill(255, 0, 0);
        beginShape();
        
        rect(this.pos.x, this.pos.y, this.width, this.height);
        pop();


    }

    



}