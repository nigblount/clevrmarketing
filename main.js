const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let particles = [];

class Particle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = {
      x: Math.random() - 0.5,
      y: Math.random() - 0.5
    };
    this.distanceFromCenter = Math.random() * 80 + 100;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.draw();

    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.velocity.x = -this.velocity.x;
    }

    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.velocity.y = -this.velocity.y;
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

function init() {
  particles = [];

  for (let i = 0; i < 50; i++) {
    const radius = Math.random() * 5 + 5;
    const color = "rgba(74, 183, 165, 0.5)";
    particles.push(new Particle(canvas.width / 2, canvas.height / 2, radius, color));
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(particle => {
    particle.update();

    particles.forEach(otherParticle => {
      if (particle !== otherParticle) {
        const distance = Math.sqrt(Math.pow(particle.x - otherParticle.x, 2) + Math.pow(particle.y - otherParticle.y, 2));

        if (distance < particle.distanceFromCenter) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.strokeStyle = "rgba(74, 183, 165, 0.3)";
          ctx.stroke();
        }
      }
    });
  });
}

init();
animate();
