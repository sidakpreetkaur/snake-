
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

// number of body parts
const segments = [];
const segmentCount = 40;
const segmentLength = 12;

// create centipede body
for (let i = 0; i < segmentCount; i++) {
  segments.push({ x: mouse.x, y: mouse.y });
}

// mouse tracking
document.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  segments[0].x += (mouse.x - segments[0].x) * 0.2;
  segments[0].y += (mouse.y - segments[0].y) * 0.2;

  for (let i = 1; i < segments.length; i++) {
    const dx = segments[i - 1].x - segments[i].x;
    const dy = segments[i - 1].y - segments[i].y;
    const angle = Math.atan2(dy, dx);

    segments[i].x = segments[i - 1].x - Math.cos(angle) * segmentLength;
    segments[i].y = segments[i - 1].y - Math.sin(angle) * segmentLength;
  }

  drawCentipede();
  requestAnimationFrame(animate);
}

function drawCentipede() {
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;

  for (let i = 0; i < segments.length; i++) {
    ctx.beginPath();
    ctx.arc(segments[i].x, segments[i].y, 3, 0, Math.PI * 2);
    ctx.stroke();

    // legs
    if (i % 2 === 0) {
      ctx.beginPath();
      ctx.moveTo(segments[i].x, segments[i].y);
      ctx.lineTo(segments[i].x + 8, segments[i].y + 6);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(segments[i].x, segments[i].y);
      ctx.lineTo(segments[i].x - 8, segments[i].y + 6);
      ctx.stroke();
    }
  }
}

animate();
