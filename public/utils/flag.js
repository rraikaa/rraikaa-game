function Flag(x, y) {
  this.pos = createVector(x, y);

  this.width = 18;
  this.height = 11.7;

  this.render = function() {
    push();

    stroke(rocket.flagColor.x, rocket.flagColor.x, rocket.flagColor.x);
    line(
      this.pos.x + this.width - 1,
      this.pos.y + 1,
      this.pos.x + this.width - 1,
      this.pos.y + 25
    );

    pop();

    push();
    fill(0);
    beginShape();

    rect(this.pos.x, this.pos.y, this.width / 2, this.height / 2);
    rect(
      this.pos.x + this.width / 2,
      this.pos.y + this.height / 2,
      this.width / 2,
      this.height / 2
    );
    pop();

    push();
    fill(255);
    rect(
      this.pos.x,
      this.pos.y + this.height / 2,
      this.width / 2,
      this.height / 2
    );
    rect(
      this.pos.x + this.width / 2,
      this.pos.y,
      this.width / 2,
      this.height / 2
    );
    pop();
  };
}
