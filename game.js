const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let spaceship = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  angle: 0,
  thrust: false
};

let asteroids = [];
let bullets = [];

function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the player's spaceship
  ctx.save();
  ctx.translate(spaceship.x, spaceship.y);
  ctx.rotate(spaceship.angle);
  ctx.beginPath();
  ctx.moveTo(10, 0);
  ctx.lineTo(-10, -10);
  ctx.lineTo(-10, 10);
  ctx.lineTo(10, 0);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.restore();

  // Draw the asteroids
  ctx.fillStyle = 'gray';
  for (let asteroid of asteroids) {
    ctx.beginPath();
    ctx.arc(asteroid.x, asteroid.y, asteroid.radius, 0, Math.PI * 2);
    ctx.fill();
  }
// game.js (continued)
}

function update() {
    // Update the asteroids' positions
    for (let asteroid of asteroids) {
      asteroid.x += asteroid.vx;
      asteroid.y += asteroid.vy;
    }
  }
  
// Update the bullets' positions
for (let bullet of bullets) {
  bullet.x += bullet.vx;
  bullet.y += bullet.vy;
}

function gameLoop() {
update();
draw();
requestAnimationFrame(gameLoop);
}

gameLoop();

// Handle keyboard input
document.addEventListener('keydown', event => {
switch (event.key) {
  case 'ArrowLeft':
    spaceship.angle -= 0.1;
    break;
  case 'ArrowRight':
    spaceship.angle += 0.1;
    break;
  case 'ArrowUp':
    spaceship.thrust = true;
    break;
  case ' ':
    // Fire a bullet
    bullets.push({
      x: spaceship.x + Math.cos(spaceship.angle) * 10,
      y: spaceship.y + Math.sin(spaceship.angle) * 10,
      vx: Math.cos(spaceship.angle) * 0.3,
      vy: Math.sin(spaceship.angle) * 0.3
    });
    break;
}
});

document.addEventListener('keyup', event => {
if (event.key === 'ArrowUp') {
  spaceship.thrust = false;
}
});
