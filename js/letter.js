(function()
{
  'use strict';

  const env  = document.getElementById('envelope');
  const wrap = document.getElementById('envelopeWrap');
  const card = document.getElementById('letterCard');
  const hint = document.getElementById('letterHint');
  const next = document.getElementById('toScene3');

  let opened = false;

  env.addEventListener('click', () => {
    if (opened) return;
    opened = true;

    window.Buzz.buzz('strong');

    env.classList.add('open');
    hint.textContent = '❤';

    const r = env.getBoundingClientRect();
    window.Fx.burst(r.left + r.width / 2, r.top + r.height / 2, 44);

    setTimeout(() => {
      wrap.classList.add('gone');
      card.classList.add('shown');
    }, window.Nav.T.letterReveal);

    setTimeout(() => {
      window.Nav.hideHint(hint);
      window.Nav.showNext(2);
    }, window.Nav.T.letterReady);
  });

  next.addEventListener('click', () => window.Nav.go(3));
})();