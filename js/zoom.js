(function()
{
  'use strict';

  const box    = document.getElementById('lightbox');
  const imgBox = document.getElementById('lbImg');
  const cap    = document.getElementById('lbCap');
  const close  = document.getElementById('lbClose');

  function fallback(img)
  {
    if (!img) return;
    const show = () => img.classList.add('hidden');
    const hide = () => img.classList.remove('hidden');
    img.addEventListener('error', show);
    img.addEventListener('load', hide);
    if (!img.getAttribute('src')) show();
    else if (img.complete && img.naturalWidth === 0) show();
  }

  function open(p)
  {
    const img = p.querySelector('img');
    const c   = p.querySelector('.polaroid-cap');
    const src = img ? img.getAttribute('src') : '';
    const hid = img && img.classList.contains('hidden');

    if (src && !hid)
   {
      imgBox.innerHTML = `<img src="${src}" alt="">`;
      fallback(imgBox.querySelector('img'));
   }
   else 
   {
      imgBox.innerHTML = '📷';
   }

    cap.textContent = c ? c.textContent : '';
    box.classList.add('show');

    document.body.style.overflow = 'hidden';

    window.Buzz.buzz('light');
  }

  function closeBox(){
    box.classList.remove('show');

    document.body.style.overflow = '';
  }

  document.querySelectorAll('.polaroid').forEach(p => {
    p.addEventListener('click', (e) => {
      e.stopPropagation();
      open(p);
    });
  });

  close.addEventListener('click', closeBox);

  box.addEventListener('click', (e) => {
    if (e.target === box) closeBox();
  });
 
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeBox();
  });

  let touchY = 0;
  box.addEventListener('touchstart', (e) => {
    touchY = e.touches[0].clientY;
  }, { passive: true });
  box.addEventListener('touchend', (e) => {
    const dy = e.changedTouches[0].clientY - touchY;
    if (dy > 80) closeBox();
  }, { passive: true });

  document.querySelectorAll('.polaroid-img img').forEach(fallback);
})();