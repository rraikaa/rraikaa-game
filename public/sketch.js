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
// let leftCanvas;
// let rightCanvas;

function setup() {
  smooth();

  createCanvas(windowWidth, windowHeight);

  socket = io.connect("http://localhost:3000");

  rocket = new Rocket(random(width), random(height), random(10, 20));

  rocket.limitSpeed = 3;

  for (let i = 0; i < 50; i++) {
    const x = random(-width, width);
    const y = random(-height, height);
    flags[i] = new Flag(x, y);
  }

  // laser.init();

  var data = {
    x: rocket.pos.x,
    y: rocket.pos.y,
    r: rocket.r
  };

  socket.emit("start", data); //To clean up can probably just send the rocket object and then deconstruct it

  socket.on("heartbeat", data => {
    rockets = data; //data is the data about the location of every other rocket
  });

  //Randomizing position of food blobs
  for (let i = 0; i < 100; i++) {
    const x = random(-width, width);
    const y = random(-height, height);
    foodArray[i] = new Food(x, y, 4);
  }

  //   //Speed boosts on left side of screen
  //   for(let i = 0; i < 5; i++) {
  //       const x = random(-width, 0);
  //       const y = random(-height, height);
  //       foodArray[i] = new Food(x, y, 15, 'speed');
  //   }

  push();
  translate(width / 2, height / 2);
  translate(-rocket.pos.x, -rocket.pos.y);
  //Speed boosts on left side of screen
  for (let i = 0; i < 6; i++) {
    const x = random(-width + 100, -100);
    const y = random(-height + 10, height - 10);
    let food = new Food(x, y, 13, "speed");
    foodArray.push(food);
    // console.log('left made');
  }

  //Speed boosts on right side of screen
  for (let i = 0; i < 7; i++) {
    const x = random(100, width - 100);
    const y = random(-height + 10, height - 10);
    let food = new Food(x, y, 13, "speed");
    foodArray.push(food);
    // console.log('right made');
  }
  pop();
}

function draw() {
  // background(255);
  background(178, 178, 178);

  // drawLeftCanvas();
  // image(leftCanvas, 0 - width, 0);

  // drawRightCanvas();
  // image(rightCanvas, 0, 0);

  translate(width / 2, height / 2);
  // image(rightCanvas, 400, 0);
  // image(rightCanvas, 0, -height, width, height*2);

  // image(leftCanvas, 0, 0);
  // image(leftCanvas, -width, -height, width, height*2);

  //   //need to split background between red and blue

  //Shifting the model view accordingly so the character always stays
  //in center of window. Relative to position of character

  let newZoom = 5 / rocket.r; //NEED TO MAKE THIS BASED ON THE SIZE (length)
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
    //Randomizing position of food blobs
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

        //If speed boost was eaten on left side, add another to left

        const x = random(-width, width);
        const y = random(-height + 30, height - 30);
        let newFood = new Food(x, y, 50, "speed");
        foodArray.push(newFood);

        // if (foodArray[i].side == 'left') {
        //     push();
        //     translate(width / 2, height / 2);
        //     translate(-rocket.pos.x, -rocket.pos.y);
        //     const x = random(-width + 100, -100);
        //     const y = random(-height + 10, height - 10);
        //     let newFood = new Food(x, y, 25, 'speed', 'left');
        //     foodArray.push(newFood);
        //     pop();
        // } else { // right side
        //     push();
        //     translate(width / 2, height / 2);
        //     translate(-rocket.pos.x, -rocket.pos.y);
        //     const x = random(100, width - 100);
        //     const y = random(-height + 10, height - 10);
        //     let newFood = new Food(x, y, 13, 'speed', 'right');
        //     foodArray.push(newFood);
        //     pop();
        // }
      }
    }
  }

  // let x = rocket.pos.x;
  let x = width / 2;
  // let y = rocket.pos.y;
  let y = height / 2;
  let speed = 10; //WHAT DOES THIS SPEED DO
  rocket.angle = atan2(mouseY - y, mouseX - x);
  if (dist(mouseX, mouseY, x, y) > speed) {
    x += cos(rocket.angle) * speed; // current location + the next "step"
    y += sin(rocket.angle) * speed;
  }

  //Good to loop through array backwards because can skip something when splicing and going forwards
  for (let i = rockets.length - 1; i >= 0; i--) {
    //Drawing Other Users excluding current rocket (not drawing yourself)
    //he has substring here
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

  //was length - 1
  for (let i = 0; i < flags.length; i++) {
    //Drawing flags
    flags[i].render();
    if (rocket.grabs(flags[i])) {
      //Change personal flag color to red if picked up
      rocket.flagColor.x = 255;
      rocket.flagColor.y = 0;
      rocket.flagColor.z = 0;
      rocket.flagColor.t = 255;
      flags.splice(i, 1);
    }
  }

  //If a person gets tagged change color back to white on person and draw new flag in that space

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

// function keyPressed() {
//for testing if key is press resembles someone tagging them
// if(keyCode === LEFT_ARROW) {
//     rocket.flagColor.x = 255;
//     rocket.flagColor.y = 255;
//     rocket.flagColor.z = 255;

//     const droppedFlagX = rocket.pos.x;
//     const droppedFlagY = rocket.pos.y;
//     // droppedFlag = new Flag(droppedFlagX, droppedFlagY);

//     // console.log(`droppedX ${droppedFlagX} droppedY ${droppedFlagY}`);
//     // let droppedFlag = new Flag(rocket.positions[rocket.positions.length - 1].x, rocket.positions[rocket.positions.length - 1].y);
//     flags.push(droppedFlag);
//     // console.log(rocket.pos.x, rocket.pos.y);

//     // droppedFlag.render();
// }
// }

function keyPressed() {
  //for testing if key is press resembles someone tagging them

  //Need to make the x and y coordinates of the dropped flag be based on the angle the rocket is facing so it alwaYS COMES OUT BEHIND THEM

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

// function drawRightCanvas() {
//     // background(241, 123, 120);
//     rightCanvas.background(181, 211, 231); // blue
//     // rightCanvas.fill(0, 0, 0);
//     // background(181, 211, 231);
//     // fill(0, 0, 0);
// }

// function drawLeftCanvas() {
//     leftCanvas.background(241, 123, 120); //red
//     // leftCanvas.fill(255, 255, 255);
// }
