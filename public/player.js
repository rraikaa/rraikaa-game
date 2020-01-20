// function Player(x, y, r) {
//   this.pos = createVector(x, y);
//   this.r = r;
//   this.vel = createVector(0, 0);


//   this.update = function() {
//     let newVel = createVector(mouseX - width / 2, mouseY - height / 2); // this gets the vector from the character to where their mouse is
//     // newVel.div(50); //what does this do
//     newVel.limit(3);
//     this.vel.lerp(newVel, 0.2);
//     this.pos.add(this.vel);
//   };

//   //Not exactly how it really works. Need to fix -> Can overlap a little bit, but needs to be more towards center to be considered eaten

//   this.eats = function(other) {
//     let dist = p5.Vector.dist(this.pos, other.pos);
    
//     if (dist < this.r + other.r) {
      
//         // console.log(dist);
//         //combined surface area
//         let combinedSA = (PI * this.r * this.r) + (PI * other.r * other.r);
//         // console.log(this.r);
//         // console.log(other.r);
//         this.r = sqrt(combinedSA / PI);

//       return true;
//     } else {
//       return false;
//     }
//   };

//   let circle2 = ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
//   this.show = function() {
//     fill(0);
//     // ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
//     ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    

//   };

  

//   this.constrain = function() {
//     rocket.pos.x = constrain(rocket.pos.x, -width, width);
//     rocket.pos.y = constrain(rocket.pos.y, -height, height);
//   }
// }

