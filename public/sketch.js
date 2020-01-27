let rocket;
let rockets = [];
let zoom = 1;
let socket;
let foodArray = [];
let laser;
let flag;
let flags = [];
let droppedFlag;
this.currentPos;

let express = require("express");

let router = express.Router();

router.get("/", function(req, res, next) {
    res.redirect("/game");
});

module.exports = router;



function setup() {
  smooth();

  createCanvas(windowWidth, windowHeight);

  socket = io.connect("http://localhost:3000"); 


  rocket = new Rocket(0, 30, random(10, 20));

  //Controls speed of rocket
  rocket.limitSpeed = 3;

  for (let i = 0; i < 15; i++) {
      //Randomizing position of flags
    const x = random(-width, width);
    const y = random(-height, height);
    flags[i] = new Flag(x, y);
  }

 
  var data = {
    x: rocket.pos.x,
    y: rocket.pos.y,
    r: rocket.r
  };

  socket.emit("start", data); //To clean up can probably just send the rocket object and then deconstruct it

  socket.on("heartbeat", data => {
    rockets = data; //data is the data about the location of every other rocket
  });

  //Randomizing position of food 
  for (let i = 0; i < 100; i++) {
    const x = random(-width, width);
    const y = random(-height, height);
    foodArray[i] = new Food(x, y, 4);
  }
  push();

  //Shift Screen View
  translate(width / 2, height / 2);
  translate(-rocket.pos.x, -rocket.pos.y);


  //Speed boosts on left side of screen
  for (let i = 0; i < 10; i++) {
    const x = random(-width + 100, -100);
    const y = random(-height + 10, height - 10);
    let food = new Food(x, y, 13, "speed");
    foodArray.push(food);
  }

  //Speed boosts on right side of screen
  for (let i = 0; i < 11; i++) {
    const x = random(100, width - 100);
    const y = random(-height + 10, height - 10);
    let food = new Food(x, y, 13, "speed");
    foodArray.push(food);
  }
  pop();
}

function draw() {
  background(178, 178, 178);

  //Shifting the model view accordingly so the character always stays
  //in center of window. Relative to position of character
  translate(width / 2, height / 2);

  //Calculating new zoom based on size of rocket
  let newZoom = 20 / rocket.r; 
  zoom = lerp(zoom, newZoom, 0.1);
  scale(zoom);
  translate(-rocket.pos.x, -rocket.pos.y); 

  push();
  fill(0);
  noStroke();
  rect(-width - 75, -height - 75, width * 2 + 150, height * 2 + 150);
  pop();

  push();
  fill("rgba(181, 211, 231, 1)");
  noStroke();
  rect(-width - 15, -height - 15, width + 15, height * 2 + 30);
  pop();

  push();
  fill("rgba(241, 123, 120, 1)");
  noStroke();
  rect(0, -height - 15, width + 15, height * 2 + 30);
  pop();

  push();
  fill(0);
  noStroke();
  rect(-2, -height - 15, 4, height * 2 + 30);

  pop();

  for (let i = 0; i < foodArray.length - 1; i++) {
    //Display food
    foodArray[i].show();

    if (rocket.eats(foodArray[i])) {
      foodArray.splice(i, 1);
      
      if (foodArray[i].type === "speed") {
        //Temprary speed boost
        rocket.limitSpeed = 10;

        //Reset speed back to normal after 3 seconds
        setTimeout(() => {
          rocket.limitSpeed = 3;
        }, 3000);

        
        //If speed boost eaten, randomly add another one
        const x = random(-width, width);
        const y = random(-height + 30, height - 30);
        let newFood = new Food(x, y, 13, "speed");
        foodArray.push(newFood);
      }
    }
  }

  //Calculating new coordinates
  let x = width / 2;
  let y = height / 2;
  let speed = 10; 
  rocket.angle = atan2(mouseY - y, mouseX - x);
  if (dist(mouseX, mouseY, x, y) > speed) {
    x += cos(rocket.angle) * speed; // current location + the next "step"
    y += sin(rocket.angle) * speed;
  }

  
  for (let i = rockets.length - 1; i >= 0; i--) {
    //Drawing Other Users excluding current rocket (not drawing yourself)
    
    if (rockets[i].id !== socket.id) {
      fill(0, 0, 255);

      ellipse(rockets[i].x, rockets[i].y, rockets[i].r * 2, rockets[i].r * 2);
      //ID tag underneath rockets
      fill(255);
      textAlign(CENTER);
      textSize(4);
      //Text content/Positioning
      // text(rockets[i].id, rockets[i].x, rockets[i].y + rockets[i].r*2);
    }
  }

  
  for (let i = 0; i < flags.length; i++) {
    //Drawing flags
    flags[i].render();
    if (rocket.grabs(flags[i])) {
      
      //Change personal flag color to red if picked up
      rocket.flagColor.x = 255;
      rocket.flagColor.t = 255; //Full transperancy


      flags.splice(i, 1);
    }
  }

  rocket.init();
  rocket.render();

  var data = {
    x: rocket.pos.x,
    y: rocket.pos.y,
    r: rocket.r
  };

  rocket.constrain();

  if (mouseIsPressed == true) {
  }
  rocket.update();
  socket.emit("update", data);
}

function keyPressed() {
  

  if (keyCode === LEFT_ARROW) {
    const droppedFlagX = rocket.pos.x + 80;
    const droppedFlagY = rocket.pos.y;

    droppedFlag = new Flag(droppedFlagX, droppedFlagY);
    flags.push(droppedFlag);

    rocket.flagColor.x = 255;
    rocket.flagColor.y = 255;
    rocket.flagColor.z = 255;
    rocket.flagColor.t = 0;

    return true;
  }
}


