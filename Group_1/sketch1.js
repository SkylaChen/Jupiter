let rotation = 0;
let followX = 0;
let followY = 0;
let stars = [];

function setup() {
  const canvas = createCanvas(Math.min(760, windowWidth - 48), 440);
  canvas.parent('sketch-holder');
  angleMode(DEGREES);
  stars = Array.from({ length: 100 }, () => ({
    x: random(width),
    y: random(height),
    size: random(2, 5)
  }));
}

function draw() {
  background(0);

  noStroke();
  for (const star of stars) {
    fill(220, 235, 255, 180);
    circle(star.x, star.y, star.size);
  }

  followX = lerp(followX, mouseX, 0.05);
  followY = lerp(followY, mouseY, 0.05);

  push();
  translate(followX, followY);
  noFill();
  stroke(255, 90);
  strokeWeight(1);
  for (const orbit of [100, 160, 240, 300, 440]) {
    circle(0, 0, orbit);
  }

  noStroke();
  fill(255, 140, 100);
  circle(0, 0, 50);

  push();
  rotate(6 * rotation);
  fill(180, 100, 0);
  circle(-50, 0, 20);
  pop();

  push();
  rotate(-3 * rotation);
  fill(25, 90, 200);
  circle(-80, 0, 30);
  pop();

  push();
  rotate(-2.5 * rotation);
  fill(0, 100, 200);
  circle(120, 0, 20);
  pop();

  push();
  rotate(1.2 * rotation);
  fill(150, 100, 50);
  circle(150, 0, 20);
  translate(150, 0);
  rotate(3 * rotation);
  fill(200, 220, 255);
  circle(-20, 0, 8);
  pop();

  push();
  rotate(0.5 * rotation);
  fill(175, 121, 110);
  circle(150, 0, 20);
  pop();

  push();
  rotate(rotation);
  fill(0, 121, 110);
  circle(220, 0, 25);
  pop();
  pop();

  rotation += 1;
}

function windowResized() {
  resizeCanvas(Math.min(760, windowWidth - 48), 440);
  stars = Array.from({ length: 100 }, () => ({
    x: random(width),
    y: random(height),
    size: random(2, 5)
  }));
}
