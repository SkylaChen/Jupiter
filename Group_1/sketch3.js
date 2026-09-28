let alternatePalette = false;

function setup() {
  const canvas = createCanvas(Math.min(760, windowWidth - 48), 440);
  canvas.parent('sketch-holder');
  canvas.mousePressed(() => {
    alternatePalette = !alternatePalette;
  });
  noLoop();
}

function draw() {
  background(alternatePalette ? '#25334a' : '#20201e');
  const cx = width / 2;
  const cy = height / 2;
  const planetSize = Math.min(300, height - 56);

  noStroke();
  fill(alternatePalette ? '#cfaa7b' : '#d6a77b');
  circle(cx, cy, planetSize);

  // Clipped bands give Jupiter its soft, layered appearance.
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.arc(cx, cy, planetSize / 2, 0, Math.PI * 2);
  drawingContext.clip();

  const bands = alternatePalette
    ? ['#bb8869', '#e0c39a', '#9b6658', '#e8d5b5', '#bf8a6c']
    : ['#bd805c', '#efd0a1', '#b96f54', '#e4bc8e', '#a96750'];

  for (let i = 0; i < bands.length; i += 1) {
    const y = cy - planetSize * 0.42 + i * planetSize * 0.2;
    fill(bands[i]);
    ellipse(cx, y, planetSize * 1.25, planetSize * 0.13);
  }

  fill(alternatePalette ? '#f0d6aa' : '#b96f54');
  ellipse(cx + planetSize * 0.19, cy + planetSize * 0.2, planetSize * 0.27, planetSize * 0.11);
  drawingContext.restore();
}

function windowResized() {
  resizeCanvas(Math.min(760, windowWidth - 48), 440);
  redraw();
}
