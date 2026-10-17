(function()
{
  'use strict';

  const hint = document.getElementById('cakeHint');
  const next = document.getElementById('toScene4');

  let total = 0;
  let out   = 0;

  function build()
  {
    out = 0;
    total = 0;
    let idx = 0;

    document.querySelectorAll('.candles').forEach(box => {
      const count = parseInt(box.dataset.count || '0', 10);
      box.innerHTML = '';

      for (let i = 0; i < count; i++)
      {
        total++;
        const c = document.createElement('div');
        c.className = 'candle';

        if (idx % 2 === 1) c.classList.add('candle-blue');
        idx++;
        c.innerHTML = '<span class="melt"></span><span class="wick"></span><span class="flame"></span>';
        c.addEventListener('click', () => blow(c));
        box.appendChild(c);
      }
    });

    hint.classList.remove('off');
    hint.textContent = CFG.cake.hint;
    next.hidden = true;
  }

  function blow(c)
  {
    if (c.classList.contains('out')) return;
    c.classList.add('out');
    out++;

    window.Buzz.buzz('medium');

    const smoke = document.createElement('span');
    smoke.className = 'smoke';
    c.appendChild(smoke);
    setTimeout(() => smoke.remove(), 1800);

    const r = c.getBoundingClientRect();
    window.Fx.burst(r.left + r.width / 2, r.top, 12);

    if (out === total)
   {
      setTimeout(() => {
        hint.classList.add('off');
        const cake = document.querySelector('.cake').getBoundingClientRect();
        window.Fx.burst(cake.left + cake.width / 2, cake.top + cake.height / 2, 100);
        setTimeout(() => window.Nav.showNext(3), 700);
      }, 350);
    }
  }

  function needRebuild()
  {
    return out === total && total > 0;
  }

  window.Cake = { build, needRebuild };

  next.addEventListener('click', () => window.Nav.go(4));

  build();
})();