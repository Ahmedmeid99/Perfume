import React, { useEffect, useRef } from 'react';

const PerfumeSprayCursor = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let particlesArray = [];
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    const mouse = {
      x: -100,
      y: -100,
      radius: 50
    };

    let previousMouse = { x: -100, y: -100 };

    const handleMouseMove = (event) => {
      previousMouse.x = mouse.x;
      previousMouse.y = mouse.y;
      mouse.x = event.x;
      mouse.y = event.y;

      // Calculate speed of mouse to determine how many particles to spawn
      const dx = mouse.x - previousMouse.x;
      const dy = mouse.y - previousMouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      const particlesToSpawn = Math.min(Math.floor(distance / 2) + 1, 10);

      for (let i = 0; i < particlesToSpawn; i++) {
        // distribute them along the movement path
        const offsetX = previousMouse.x + (dx * (i / particlesToSpawn));
        const offsetY = previousMouse.y + (dy * (i / particlesToSpawn));
        particlesArray.push(new Particle(offsetX, offsetY));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    class Particle {
      constructor(x, y) {
        this.x = x + (Math.random() * 10 - 5);
        this.y = y + (Math.random() * 10 - 5);
        this.size = Math.random() * 1.5 + 0.5;
        
        // Disperse mist randomly
        const angle = Math.random() * Math.PI * 2;
        // If moving, we can add some momentum, but random looks like spray
        const speed = Math.random() * 0.8 + 0.2;
        this.speedX = Math.cos(angle) * speed;
        this.speedY = Math.sin(angle) * speed - 0.5; // slight upward drift
        
        // Mist colors: mixture of white and light gold
        const isGold = Math.random() > 0.5;
        this.color = isGold ? '212, 175, 55' : '255, 255, 255';
        this.opacity = Math.random() * 0.5 + 0.3;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.015;
        if (this.size > 0.1) this.size -= 0.02;
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = `rgb(${this.color})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        
        if (particlesArray[i].opacity <= 0.05 || particlesArray[i].size <= 0.1) {
          particlesArray.splice(i, 1);
          i--;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999, // Ensure it's above all standard elements
      }}
    />
  );
};

export default PerfumeSprayCursor;
