import React, { useEffect, useRef } from 'react';

const PerfumeSprayCursor = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let particlesArray = [];
    let animationFrameId;
    let isHovering = false;


    // const handleMouseOver = (e) => {
    //   const target = e.target;
    //   if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
    //     isHovering = true;
    //   }
    // };

    // const handleMouseOut = (e) => {
    //   isHovering = false;
    // };

    // window.addEventListener('mouseover', handleMouseOver);
    // window.addEventListener('mouseout', handleMouseOut);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const mouse = {
      x: -100,
      y: -100,
    };

    let previousMouse = { x: -100, y: -100 };

    const handleMouseMove = (event) => {
      previousMouse.x = mouse.x;
      previousMouse.y = mouse.y;
      mouse.x = event.clientX;
      mouse.y = event.clientY;

      const dx = mouse.x - previousMouse.x;
      const dy = mouse.y - previousMouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Increase spawn rate significantly when hovering
      const baseSpawnMultiplier = isHovering ? 4 : 1;
      const particlesToSpawn = Math.min(Math.floor((distance / 2) * baseSpawnMultiplier) + (isHovering ? 5 : 1), isHovering ? 30 : 10);

      // Generate a burst if hovering and just stopped moving, or continually spray
      for (let i = 0; i < particlesToSpawn; i++) {
        // Spray from slightly below the cursor's tip (which is at 16, 2)
        const offsetX = previousMouse.x + (dx * (i / particlesToSpawn));
        const offsetY = previousMouse.y + (dy * (i / particlesToSpawn)) - 10;
        particlesArray.push(new Particle(offsetX, offsetY, isHovering));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    class Particle {
      constructor(x, y, hovered) {
        this.x = x + (Math.random() * 20 - 10);
        this.y = y + (Math.random() * 20 - 10);
        // Larger particles on hover
        this.size = Math.random() * (hovered ? 3 : 1.5) + (hovered ? 1 : 0.5);

        const angle = Math.random() * Math.PI * 2;
        // Faster burst on hover
        const speed = Math.random() * (hovered ? 2 : 0.8) + (hovered ? 0.5 : 0.2);
        this.speedX = Math.cos(angle) * speed;
        // More dramatic upward spray on hover
        this.speedY = Math.sin(angle) * speed - (hovered ? 1.5 : 0.5);

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

      // If hovering, passively spawn particles even when mouse isn't moving fast
      if (isHovering && Math.random() < 0.3) {
        particlesArray.push(new Particle(mouse.x, mouse.y - 10, true));
      }

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
      // window.removeEventListener('mouseover', handleMouseOver);
      // window.removeEventListener('mouseout', handleMouseOut);
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
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
};

export default PerfumeSprayCursor;
