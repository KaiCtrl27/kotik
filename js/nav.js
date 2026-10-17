(function()
{
  'use strict';

  const T = {
    letterReveal: 480,   
    letterReady: 1500,   
    meetReady: 700,     
    cakeReady: 700,      
    fortuneReady: 500,  
    roomReady: 900       
  };

  let current = 1;

  function go(n)
  {
    const cur = document.querySelector('.scene.active');
    const next = document.querySelector(`.scene[data-scene="${n}"]`);
    
    if (!next || cur === next) return;
    cur.classList.remove('active');
    next.classList.add('active');
    current = n;
   
    window.scrollTo({ top: 0, behavior: 'smooth' });
    enter(n);
  }

  function showNext(n)
  {
    const btn = document.querySelector(`.scene[data-scene="${n}"] .continue-btn`);
    if (btn) btn.hidden = false;
  }

  function scheduleNext(n, delay)
  {
    setTimeout(() => showNext(n), delay);
  }

  function hideHint(el)
  {
    if (el) el.classList.add('off');
  }

  function enter(n)
  {
    if (n === 3 && window.Cake && window.Cake.needRebuild()) window.Cake.build();
    if (n === 4 && window.Fortune) window.Fortune.reset();
  }

  window.Nav = {
    go,
    showNext,
    scheduleNext,
    hideHint,
    T,
    current: () => current
  };
})();