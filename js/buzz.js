(function(){
  'use strict';

  const has = 'vibrate' in navigator;

  const DURATIONS = {
    light: 10,
    medium: 20,
    strong: 35
  };

  function buzz(kind = 'medium')
  {
    if (!has) return;
    try 
    {
      const ms = typeof kind === 'number' ? kind : (DURATIONS[kind] || 20);
      navigator.vibrate(ms);
    } 
    catch(e) 
    {

    }
  }

  window.Buzz = { buzz };
})();