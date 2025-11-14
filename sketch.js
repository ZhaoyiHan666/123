function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noLoop(); 
}

function draw() {
  background("#1e2c3a");

  // A single circle in the middle (iteration 1 version)
  drawWheelCircle(width / 2, height / 2, 420, "#9ACD32");
}

// Draw a wheel-circle
function drawWheelCircle(x, y, size, innerColor) {
  push();
  translate(x, y);

  // Background glow
  noStroke();
  fill(0, 0, 0, 60);
  ellipse(0, 0, size * 1.18);

  // Main circle
  fill(innerColor);
  ellipse(0, 0, size);

  // Rings
  stroke("#FFD54F");
  strokeWeight(2);
  noFill();
  for (let r = size * 0.55; r < size * 0.92; r += size * 0.07) {
    ellipse(0, 0, r);
  }

  // Inner dots
  fill("#E3F2FD");
  stroke(255);
  let innerDots = 16;
  for (let i = 0; i < innerDots; i++) {
    let angle = i * (360 / innerDots);
    let px = cos(angle) * (size * 0.38);
    let py = sin(angle) * (size * 0.38);
    ellipse(px, py, size * 0.09);
  }

  // Outer dots
  noStroke();
  fill("#FF8A80");
  let outerDots = 32;
  for (let i = 0; i < outerDots; i++) {
    let angle = i * (360 / outerDots);
    let px = cos(angle) * (size * 0.58);
    let py = sin(angle) * (size * 0.58);
    ellipse(px, py, size * 0.045);
  }

  // Center circles
  fill("#1e2c3a");
  stroke("#FFFFFF");
  ellipse(0, 0, size * 0.15);

  noStroke();
  fill("#F0FF95");
  ellipse(0, 0, size * 0.07);

  pop();
}
