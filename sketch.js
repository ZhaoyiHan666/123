// 多个圆 + 全屏静态版本
// 作为小组作业的「第二次迭代」

let wheels = []; // 用来保存每一个圆的信息

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  // 生成一批不重叠的圆
  createAllWheels();

  // 静态版本，只画一帧
  noLoop();
}

function draw() {
  background("#1e2c3a");

  // 把数组里的所有圆都画出来
  for (let i = 0; i < wheels.length; i++) {
    let w = wheels[i];
    drawWheelCircle(w.x, w.y, w.size, w.innerColor);
  }
}

// ----------------------
// 生成多圆（不重叠）
// ----------------------
function createAllWheels() {
  wheels = [];

  // 根据画布大小大概决定要多少个圆
  let targetCount;
  if (width < 800) {
    targetCount = 6;
  } else if (width < 1200) {
    targetCount = 10;
  } else {
    targetCount = 14;
  }

  // 圆的大小范围（相对于画布）
  let base = min(width, height);
  let minSize = base * 0.18;
  let maxSize = base * 0.26;

  // 一些好看的主色（内圈颜色）
  let colors = [
    "#9ACD32", // 黄绿色
    "#5EC4B8", // 青绿
    "#FF8A80", // 橙粉
    "#FFB74D", // 橙黄
    "#BA68C8", // 紫色
    "#64B5F6", // 天蓝
    "#AED581", // 淡绿
    "#F06292"  // 粉色
  ];

  let attempts = 0;
  let maxAttempts = 500; // 防止死循环

  while (wheels.length < targetCount && attempts < maxAttempts) {
    attempts++;

    // 随机大小
    let size = random(minSize, maxSize);
    let radius = size * 0.6; // 取主圆附近的半径大概值，用来做碰撞判断
    let margin = 30;

    // 随机位置（保证不会贴边）
    let x = random(radius + margin, width - radius - margin);
    let y = random(radius + margin, height - radius - margin);

    // 检查和已经存在的圆有没有重叠
    let ok = true;
    for (let i = 0; i < wheels.length; i++) {
      let other = wheels[i];
      let d = myDistance(x, y, other.x, other.y);
      // 两个圆的半径之和 + 额外间距
      let minDist = radius + other.radius + 20;
      if (d < minDist) {
        ok = false;
        break;
      }
    }

    // 如果这个位置没有重叠，就把这个圆存进数组
    if (ok) {
      let innerColor = random(colors);
      wheels.push({
        x: x,
        y: y,
        size: size,
        innerColor: innerColor,
        radius: radius
      });
    }
  }
}

// 自己写一个简单的距离函数（两点之间的距离）
function myDistance(x1, y1, x2, y2) {
  let dx = x1 - x2;
  let dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}

// ----------------------
// 画一个「命运之轮」圆
// ----------------------
function drawWheelCircle(x, y, size, innerColor) {
  push();
  translate(x, y);

  // 背后黑色的光晕
  noStroke();
  fill(0, 0, 0, 60);
  ellipse(0, 0, size * 1.18);

  // 主圆
  fill(innerColor);
  ellipse(0, 0, size);

  // 多圈线条
  stroke("#FFD54F");
  strokeWeight(2);
  noFill();
  for (let r = size * 0.55; r < size * 0.92; r += size * 0.07) {
    ellipse(0, 0, r);
  }

  // 内圈大点
  fill("#E3F2FD");
  stroke(255);
  let bigDotCount = 16;
  for (let i = 0; i < bigDotCount; i++) {
    let angle = i * (360 / bigDotCount);
    let px = cos(angle) * (size * 0.38);
    let py = sin(angle) * (size * 0.38);
    ellipse(px, py, size * 0.09);
  }

  // 外圈小点
  noStroke();
  fill("#FF8A80");
  let smallDotCount = 32;
  for (let i = 0; i < smallDotCount; i++) {
    let angle = i * (360 / smallDotCount);
    let px = cos(angle) * (size * 0.58);
    let py = sin(angle) * (size * 0.58);
    ellipse(px, py, size * 0.045);
  }

  // 像辐条一样的线
  stroke("#FFFFFF");
  for (let i = 0; i < 8; i++) {
    let angle = i * 45;
    let px = cos(angle) * (size * 0.43);
    let py = sin(angle) * (size * 0.43);
    line(0, 0, px, py);
  }

  // 中心小圆
  fill("#1e2c3a");
  stroke("#FFFFFF");
  ellipse(0, 0, size * 0.15);

  noStroke();
  fill("#F0FF95");
  ellipse(0, 0, size * 0.07);

  pop();
}

// 当浏览器窗口大小改变时，重新生成一批圆并重画
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  createAllWheels(); // 重新随机摆放一批不重叠的圆
  redraw();          // 手动再画一帧
}
