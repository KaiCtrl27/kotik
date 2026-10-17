(function()
{
  'use strict';

  const reason = document.getElementById('reason');
  const paw    = document.getElementById('reasonBtn');
  const hint   = document.getElementById('reasonHint');

  let pool = [];
  let count = 0;
  let hidden = false;

  paw.addEventListener('click', () => {

    if (pool.length === 0)
    {
      pool = CFG.end.reasons.slice().sort(() => Math.random() - 0.5);
    }

    reason.textContent = pool.pop();

    reason.classList.remove('pop');
    void reason.offsetWidth;
    reason.classList.add('pop');
    count++;

    window.Buzz.buzz('medium');

    if (!hidden)
    {
      hidden = true;
      hint.classList.add('off');
    }

    const r = paw.getBoundingClientRect();
    window.Fx.burst(r.left + r.width / 2, r.top + r.height / 2, 18);
    window.Fx.heart(r.left + r.width / 2, r.top);

    if (count === 3)
    {
      setTimeout(() => {
        window.Fx.burst(window.innerWidth / 2, window.innerHeight / 2, 60);
      }, 300);
    }
  });
})();