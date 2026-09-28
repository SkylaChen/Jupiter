let planetRadius;
let backgroundStars = [];

const warmBands = [
  '#a94f32', '#d88455', '#efb777', '#f4d3a0',
  '#c66b43', '#e7a06b', '#f1c995', '#9f4c36'
];

function setup() {
  const side = Math.min(680, Math.max(220, windowWidth - 48));
  const canvas = createCanvas(side, side);
  canvas.parent('sketch-holder');
  canvas.elt.style.borderRadius = '50%';
  canvas.elt.style.margin = '0 auto';
  canvas.elt.setAttribute('aria-label', 'Animated Jupiter with warm flowing bands that respond to the mouse');
  planetRadius = side * 0.42;
  createStars();
  noiseSeed(21);
  frameRate(30);
}

function draw() {
  background('#17120f');
  drawStars();

  const cx = width / 2;
  const cy = height / 2;
  const pointerInside = dist(mouseX, mouseY, cx, cy) < planetRadius;
  const pointerX = pointerInside ? mouseX - cx : 0;
  const pointerY = pointerInside ? mouseY - cy : 0;
  const flow = frameCount * 0.018 + pointerX * 0.008;
  const waveStrength = planetRadius * (0.012 + (pointerInside ? abs(pointerY) / planetRadius * 0.018 : 0));

  noStroke();
  fill('#c87950');
  circle(cx, cy, planetRadius * 2);

  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.arc(cx, cy, planetRadius, 0, Math.PI * 2);
  drawingContext.clip();

  drawBands(cx, cy, flow, waveStrength, pointerInside, pointerX);
  drawGreatRedSpot(cx, cy, flow, pointerInside, pointerX);
  drawPlanetLight(cx, cy);

  drawingContext.restore();

  noFill();
  stroke(255, 224, 184, 75);
  strokeWeight(1.5);
  circle(cx, cy, planetRadius * 2);
}

function drawBands(cx, cy, flow, waveStrength, pointerInside, pointerX) {
  const step = planetRadius * 0.095;
  let bandIndex = 0;

  for (let offset = -planetRadius; offset < planetRadius; offset += step) {
    const thickness = step * (bandIndex % 4 === 1 ? 1.35 : 0.9);
    const bandColor = warmBands[(bandIndex * 3 + 1) % warmBands.length];
    fill(bandColor);
    beginShape();

    for (let x = -planetRadius * 1.12; x <= planetRadius * 1.12; x += 8) {
      const y = bandY(x, offset, bandIndex, flow, waveStrength, pointerInside, pointerX);
      vertex(cx + x, cy + y - thickness / 2);
    }
    for (let x = planetRadius * 1.12; x >= -planetRadius * 1.12; x -= 8) {
      const y = bandY(x, offset, bandIndex, flow, waveStrength, pointerInside, pointerX);
      vertex(cx + x, cy + y + thickness / 2);
    }

    endShape(CLOSE);
    bandIndex += 1;
  }

  // Fine streaks make the atmosphere feel layered without adding a heavy outline.
  for (let i = 0; i < 18; i += 1) {
    const y = map(i, 0, 17, -planetRadius * 0.88, planetRadius * 0.88);
    const shade = i % 2 === 0 ? color(255, 225, 184, 58) : color(103, 44, 29, 42);
    stroke(shade);
    strokeWeight(i % 3 === 0 ? 2 : 1);
    noFill();
    beginShape();
    for (let x = -planetRadius; x <= planetRadius; x += 10) {
      vertex(cx + x, cy + y + sin(x * 0.012 + flow + i) * planetRadius * 0.012);
    }
    endShape();
  }
  noStroke();
}

function bandY(x, offset, bandIndex, flow, waveStrength, pointerInside, pointerX) {
  const broadWave = sin(x * 0.009 + flow + bandIndex * 0.34) * waveStrength;
  const fineWave = sin(x * 0.023 - flow * 0.7 + bandIndex) * planetRadius * 0.009;
  const cursorWake = pointerInside
    ? exp(-sq((x - pointerX) / (planetRadius * 0.24))) * sin(frameCount * 0.05 + bandIndex) * planetRadius * 0.045
    : 0;
  return offset + broadWave + fineWave + cursorWake;
}

function drawGreatRedSpot(cx, cy, flow, pointerInside, pointerX) {
  const drift = sin(flow * 0.55) * planetRadius * 0.025;
  const cursorNudge = pointerInside ? pointerX * 0.025 : 0;
  const spotX = cx + planetRadius * 0.28 + drift + cursorNudge;
  const spotY = cy + planetRadius * 0.24 + sin(flow * 0.35) * planetRadius * 0.012;

  push();
  translate(spotX, spotY);
  rotate(-0.12);
  noStroke();
  fill(132, 47, 32, 190);
  ellipse(0, 0, planetRadius * 0.64, planetRadius * 0.34);
  fill(186, 77, 48, 210);
  ellipse(-planetRadius * 0.015, -planetRadius * 0.015, planetRadius * 0.48, planetRadius * 0.22);
  noFill();
  stroke(246, 187, 130, 145);
  strokeWeight(2);
  ellipse(0, 0, planetRadius * 0.37, planetRadius * 0.13);
  pop();
}

function drawPlanetLight(cx, cy) {
  const light = drawingContext.createRadialGradient(
    cx - planetRadius * 0.38, cy - planetRadius * 0.42, planetRadius * 0.04,
    cx, cy, planetRadius * 1.1
  );
  light.addColorStop(0, 'rgba(255, 239, 204, 0.22)');
  light.addColorStop(0.58, 'rgba(245, 174, 112, 0.02)');
  light.addColorStop(1, 'rgba(42, 18, 14, 0.48)');
  drawingContext.fillStyle = light;
  drawingContext.beginPath();
  drawingContext.arc(cx, cy, planetRadius, 0, Math.PI * 2);
  drawingContext.fill();
}

function createStars() {
  randomSeed(13);
  backgroundStars = [];
  const outerRadius = width * 0.48;
  for (let i = 0; i < 34; i += 1) {
    const angle = random(TWO_PI);
    const radius = random(planetRadius + 3, outerRadius);
    backgroundStars.push({
      x: width / 2 + cos(angle) * radius,
      y: height / 2 + sin(angle) * radius,
      size: random(1, 2.8),
      phase: random(TWO_PI)
    });
  }
}

function drawStars() {
  noStroke();
  for (const star of backgroundStars) {
    const glow = 100 + 70 * sin(frameCount * 0.035 + star.phase);
    fill(255, 222, 181, glow);
    circle(star.x, star.y, star.size);
  }
}

function windowResized() {
  const side = Math.min(680, Math.max(220, windowWidth - 48));
  resizeCanvas(side, side);
  planetRadius = side * 0.42;
  createStars();
}
