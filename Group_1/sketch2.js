const particles = [];

function setup() {
  const canvas = createCanvas(Math.min(760, windowWidth - 48), 440);
  canvas.parent('sketch-holder');
  pixelDensity(1);
  for (let i = 0; i < 70; i += 1) {
    particles.push({
      angle: random(TWO_PI),
      orbit: random(35, 205),
      speed: random(0.0015, 0.008),
      size: random(2, 6),
      alpha: random(70, 210)
    });
  }
}

function draw() {
  background('#f5f3ef');
  const cx = width / 2;
  const cy = height / 2;
  const pointerPull = map(mouseX, 0, width, -28, 28, true);

  noStroke();
  for (const point of particles) {
    point.angle += point.speed;
    const x = cx + cos(point.angle) * (point.orbit + pointerPull);
    const y = cy + sin(point.angle) * point.orbit * 0.62;
    fill(85, 83, 79, point.alpha);
    circle(x, y, point.size);
  }

  noFill();
  stroke('#d8d2c9');
  strokeWeight(1);
  ellipse(cx, cy, 92, 92);
  noStroke();
  fill('#20201e');
  circle(cx, cy, 10);
}

function windowResized() {
  resizeCanvas(Math.min(760, windowWidth - 48), 440);
}
