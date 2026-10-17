(function(){
  'use strict';

  const canvas = document.createElement('canvas');
  canvas.id = 'fx-canvas';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let dpr = 1;
  function resize()
  {
    dpr = window.devicePixelRatio || 1;
    canvas.width  = window.innerWidth  * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width  = window.innerWidth  + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  }, { passive: true });

  const BURST_COLORS = ['#4295cb','#97bbdf','#fef6f3','#ffa9b5','#df5e67','#ffc9d0'];
  const HEART_COLORS = ['#df5e67','#ffa9b5','#ffc9d0','#4295cb','#97bbdf'];

  const parts = [];
  const hearts = [];

  function burst(x, y, count = 40)
  {
    for (let i = 0; i < count; i++){
      const a = Math.random() * Math.PI * 2;
      const s = 2 + Math.random() * 5;
      parts.push({
        x, y,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s - 2, 
        color: BURST_COLORS[i % BURST_COLORS.length],
        size: 6 + Math.random() * 6,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.35, 
        life: 1,
        decay: 0.012 + Math.random() * 0.012
      });
    }
  }

  function heart(x, y, char = '❤')
  {
    hearts.push({
      x, y,
      vx: (Math.random() - 0.5) * 1.6,
      vy: -1.6 - Math.random() * 1.6, /* всегда вверх, поэтому минус */
      color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
      size: 16 + Math.random() * 20,
      life: 1,
      decay: 0.008 + Math.random() * 0.006,
      char
    });
  }

  let last = performance.now();
  function tick(now)
  {
    const dt = Math.min(50, now - last) / 16;
    last = now;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = parts.length - 1; i >= 0; i--){
      const p = parts[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += 0.15 * dt; 
      p.vx *= 0.99; 
      p.rot += p.rotSpeed * dt;
      p.life -= p.decay * dt;
      if (p.life <= 0){ parts.splice(i, 1); continue; }

      ctx.save();
      ctx.globalAlpha = p.life;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      ctx.restore();
    }

    for (let i = hearts.length - 1; i >= 0; i--)
      {
      const h = hearts[i];
      h.x += h.vx * dt;
      h.y += h.vy * dt;
      h.vy *= 0.995;
      h.life -= h.decay * dt;
      if (h.life <= 0){ hearts.splice(i, 1); continue; }

      ctx.save();
      ctx.globalAlpha = h.life;
      ctx.font = `${h.size}px serif`;
      ctx.fillStyle = h.color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(h.char, h.x, h.y);
      ctx.restore();
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  window.Fx = { burst, heart };
})();