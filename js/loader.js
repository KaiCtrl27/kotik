(function()
{
  'use strict';

  const el = document.getElementById('preloader');

  function hide()
  {
    if (!el) return;
    el.classList.add('hidden');
    setTimeout(() => el.remove(), 800);
  }

  if (document.readyState === 'complete'){
    setTimeout(hide, 200);
  } 
  else 
  {
    window.addEventListener('load', () => setTimeout(hide, 200), { once: true });
  }

  setTimeout(() => {
    if (el && !el.classList.contains('hidden')) hide();
  }, 3000);

  window.Loader = { hide };
})();