(function()
{
  'use strict';

  const wrap  = document.getElementById('catsPhotoWrap');
  const photo = document.getElementById('catsPhoto');
  const img   = document.getElementById('catsImg');
  const hint  = document.getElementById('meetHint');
  const next  = document.getElementById('toScene2');

  let tapped = false;

  if (img)
  {
    img.addEventListener('error', () => photo.classList.add('no-image'));
    if (!img.getAttribute('src')) photo.classList.add('no-image');
  }

  wrap.addEventListener('click', (e) => {

    const r = photo.getBoundingClientRect();
    const x = e.clientX || (r.left + r.width / 2);
    const y = e.clientY || (r.top + r.height / 2);

    window.Buzz.buzz('light');

    for (let i = 0; i < 14; i++)
    {
      setTimeout(() => {
        window.Fx.heart(
          x + (Math.random() * 100 - 50),
          y + (Math.random() * 50 - 25)
        );
      }, i * 55);
    }

    for (let i = 0; i < 10; i++)
    {
      setTimeout(() => {
        window.Fx.heart(
          r.left + Math.random() * r.width,
          r.top + Math.random() * r.height
        );
      }, 300 + i * 80);
    }

    if (!tapped)
    {
      tapped = true;
      window.Nav.hideHint(hint);
      window.Nav.scheduleNext(1, window.Nav.T.meetReady);
    }
  });

  next.addEventListener('click', () => window.Nav.go(2));
})();