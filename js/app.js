(function(){
  'use strict';

  document.title = CFG.pageTitle;

  const $ = id => document.getElementById(id);

  const meetTitle = $('meetTitle');
  if (meetTitle) meetTitle.innerHTML = CFG.meet.title;
  const meetCaption = $('meetCaption');
  if (meetCaption) meetCaption.textContent = CFG.meet.caption;
  const meetHint = $('meetHint');
  if (meetHint) meetHint.textContent = CFG.meet.hint;

  const letterHeader = $('letterHeader');
  if (letterHeader) letterHeader.textContent = CFG.letter.header;
  const letterDate = $('letterDate');
  if (letterDate) letterDate.textContent = CFG.letter.date;
  const letterTitle = $('letterTitle');
  if (letterTitle) letterTitle.innerHTML = `${CFG.letter.title}<br><span>${CFG.letter.titleAccent}</span>`;
  const letterText = $('letterText');
  if (letterText) letterText.innerHTML = CFG.letter.paragraphs.map(p => `<p>${p}</p>`).join('');
  const letterSign = $('letterSign');
  if (letterSign) letterSign.textContent = CFG.letter.signature;
  const letterPhotoCap = $('letterPhotoCap');
  if (letterPhotoCap) letterPhotoCap.textContent = CFG.letter.photoCaption;
  const letterHint = $('letterHint');
  if (letterHint) letterHint.textContent = CFG.letter.hint;

  const cakeTitle = $('cakeTitle');
  if (cakeTitle) cakeTitle.textContent = CFG.cake.title;
  const cakeHint = $('cakeHint');
  if (cakeHint) cakeHint.textContent = CFG.cake.hint;

  const fortuneTitle = $('fortuneTitle');
  if (fortuneTitle) fortuneTitle.textContent = CFG.fortune.title;
  const fortuneHint = $('fortuneHint');
  if (fortuneHint) fortuneHint.textContent = CFG.fortune.hint;

  const roomTitle = $('roomTitle');
  if (roomTitle) roomTitle.textContent = CFG.room.title;
  const roomHint = $('roomHint');
  if (roomHint) roomHint.textContent = CFG.room.hintFirst;
  const roomNoteText = $('roomNoteText');
  if (roomNoteText) roomNoteText.innerHTML = CFG.room.noteText;

  const finalMessage = $('finalMessage');
  if (finalMessage) finalMessage.textContent = CFG.end.message;
  const reasonHint = $('reasonHint');
  if (reasonHint) reasonHint.textContent = CFG.end.hint;

})();