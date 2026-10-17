(function(){
  'use strict';

  const room  = document.getElementById('roomStage');
  const img   = document.getElementById('roomImg');
  const note  = document.getElementById('roomNote');
  const close = document.getElementById('noteClose');
  const hint  = document.getElementById('roomHint');
  const next  = document.getElementById('toScene6');

  let shown  = false;
  let opened = false;

  if (img)
  {
    img.addEventListener('error', () => room.classList.add('no-img'));
    if (!img.getAttribute('src')) room.classList.add('no-img');
  }

  room.addEventListener('click', (e) => {
    if (e.target.closest('.note-close')) return;
    if (e.target.closest('.room-note')) return;
    if (shown) return;

    shown = true;
    note.classList.add('show');
    hint.textContent = CFG.room.hintSecond;

    window.Buzz.buzz('light');

    const r = note.getBoundingClientRect();
    for (let i = 0; i < 6; i++)
    {
      setTimeout(() => {
        window.Fx.heart(
          r.left + r.width / 2 + (Math.random() * 40 - 20),
          r.top + r.height / 2
        );
      }, i * 80);
    }
  });

  note.addEventListener('click', (e) => {
    if (e.target.closest('.note-close')) return;
    if (opened) return;

    opened = true;
    note.classList.add('open');
    hint.classList.add('off');

    window.Buzz.buzz('strong');

    const r = room.getBoundingClientRect();
    window.Fx.burst(r.left + r.width / 2, r.top + r.height / 2, 60);

    setTimeout(() => window.Nav.showNext(5), 900);
  });

  close.addEventListener('click', (e) => {
    e.stopPropagation();
    opened = false;
    note.classList.remove('open');
  });

  next.addEventListener('click', () => window.Nav.go(6));
})();