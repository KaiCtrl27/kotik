(function()
{
  'use strict';

  const cat   = document.getElementById('fortuneCatImg');
  const paper = document.getElementById('fortunePaper');
  const text  = document.getElementById('fortuneText');
  const hint  = document.getElementById('fortuneHint');
  const next  = document.getElementById('toScene5');

  let last = -1;
  let busy = false;

  function pick()
  {
    if (busy) return;
    busy = true;

    paper.classList.remove('show');
    hint.classList.add('hidden');

    window.Buzz.buzz('medium');

    const r = cat.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;

    for (let i = 0; i < 16; i++)
    {
      setTimeout(() => spark(cx, cy, r), i * 45);
    }

    setTimeout(() => {

      let idx;
      do { idx = Math.floor(Math.random() * CFG.fortune.list.length); }
      while (idx === last && CFG.fortune.list.length > 1);
      last = idx;

      text.innerHTML = CFG.fortune.list[idx];
      paper.classList.add('show');

      setTimeout(() => window.Nav.showNext(4), 500);
      setTimeout(() => { busy = false; }, 900);
    }, 400);
  }

  function spark(cx, cy, rect)
  {
    const s = document.createElement('div');
    s.className = 'ball-sparkle';
    s.style.position = 'fixed';
    s.style.left = (cx + (Math.random() * rect.width - rect.width / 2)) + 'px';
    s.style.top  = (cy + (Math.random() * rect.height - rect.height / 2)) + 'px';
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 1300);
  }

  function reset()
  {
    paper.classList.remove('show');
    hint.classList.remove('hidden');
    last = -1;
    next.hidden = true;
  }

  window.Fortune = { reset };
  
  cat.addEventListener('click', pick);
  paper.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!busy) pick();
  });
  next.addEventListener('click', () => window.Nav.go(5));
})();