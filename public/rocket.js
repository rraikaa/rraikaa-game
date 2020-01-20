function Rocket(x, y, r, size = 8, angle = 90) {
    
    this.pos = createVector(x, y);
    this.r = r;
    this.vel = createVector(0, 0);
    this.angle;
    this.size = size; //Number of circles in player body
    this.sizeScale = size / 10;
    this.positions = [];
    this.limitSpeed;

    // this.flagColorRed = (255, 0, 0);
    // this.flagColorWhite = (0, 0, 0);
    this.flagColor = {
        x: 255,
        y: 255,
        z: 255,
        t: 0 // t is the transparency of the flag
    };
    
    

    //is this going to need translate too
    this.init = function() {

        

        //Make the player be in the center of the window
        translate(this.pos.x, this.pos.y); 

        //Creating the Tip Position
        this.posTip = {
            x: 0,
            y: -0.5 * r
        };

        // this.flagColor = (0);
       
        //Draw first circle, and then make the next circle go behind that circle to the following position, not set by default to a position

        //Drawing circles
        for (let i = 0; i < this.size; i++) {

            let multiple;
            if(i===0) {
                multiple = 1;
            } else {
                multiple = i + 1;
            }

            this.positions.push({
                x: 0,
                y: 0 + multiple * r * 0.8
            });

        }

       
    }

    this.render = function() {
        fill(0);
        push();
        noStroke();

      
        beginShape(TRIANGLES);
        vertex(this.posTip.x + r / 1.75, this.posTip.y + 0.7 * r);
        vertex(this.posTip.x, this.posTip.y - 0.3 * r);
        vertex(this.posTip.x - r / 1.75, this.posTip.y + 0.7 * r);
        rotate(this.angle + Math.PI / 2);
        
        endShape(); 
        

        //Draw top circle
        ellipse(this.positions[0].x, this.positions[0].y, r, r);


        for(let i = 1; i < this.size; i++){
            ellipse(this.positions[i].x, this.positions[i].y, r, r);
        }

       
        //Bottom Engine Triangles

        //Right side triangle
        beginShape(TRIANGLES);
        vertex(0.4 * r, this.positions[this.positions.length - 1].y + 0.1 * r);
        vertex(0.55 * r, this.positions[this.positions.length - 1].y + 0.7 * r);
        vertex(0.1 * r, this.positions[this.positions.length - 1].y + 0.4 * r);
        
        endShape();
        // //Left side triangle
        beginShape(TRIANGLES);
        vertex(-0.4 * r, this.positions[this.positions.length - 1].y + 0.1 * r);
        vertex(-0.55 * r, this.positions[this.positions.length - 1].y + 0.7 * r);
        vertex(-0.1 * r, this.positions[this.positions.length - 1].y + 0.4 * r);
        endShape();



        
        //line for flag
        push();

        stroke(this.flagColor.x, this.flagColor.y, this.flagColor.z, this.flagColor.t);

        // stroke(0, 0, 255);
        line(0, this.positions[this.positions.length - 1].y + 0.53 * this.r, 0, this.positions[this.positions.length - 1].y + 1.2 * r);

        //Flag rectangle
        fill(this.flagColor.x, this.flagColor.y, this.flagColor.z, this.flagColor.t);
        // fill(0, 0, 255);
        beginShape();
        rect(0, this.positions[this.positions.length - 1].y + 1.2 * this.r, this.r * 1.1, this.r * 0.7)
        endShape();
   
        pop();



        

    }

    

    

    this.update = function() {

        let newVel = createVector(mouseX - width / 2, mouseY - height / 2);
        newVel.limit(this.limitSpeed); // this limits the speed the rocket moves
        this.vel.lerp(newVel, 0.2);
        // console.log(this.limitSpeed);
        
        this.pos.add(this.vel);
        
    };


    
    this.grabs = function (flag) {
        let dist = p5.Vector.dist(this.pos, flag.pos);

        if(dist < this.r + flag.height) {
            return true;
        }

        // this.flagColor.x = 255;
        // this.flagColor.z = 0;
    }

    this.eats = function (food) {
        let dist = p5.Vector.dist(this.pos, food.pos);

        if (dist < this.r + food.size) {

            // console.log(dist);
            //combined surface area
            // let combinedSA = (PI * this.r * this.r) + (PI * other.r * other.r);
            // console.log(this.r);
            // console.log(other.r);
            // this.r = sqrt(combinedSA / PI);
            return true;
        } else {
            return false;
        }
    }
   

    //Create the constraints of the map
    this.constrain = function () {
        rocket.pos.x = constrain(rocket.pos.x, -width, width);
        rocket.pos.y = constrain(rocket.pos.y, -height, height);
    }

   

}
