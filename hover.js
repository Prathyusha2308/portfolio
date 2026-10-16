'use strict';
(()=>{
const pointer=matchMedia('(hover:hover) and (pointer:fine)'),reduce=matchMedia('(prefers-reduced-motion:reduce)');
const cards=[...document.querySelectorAll('.project,.fitgrid article,.hero-visual')];
cards.forEach(card=>{let frame;const reset=()=>{cancelAnimationFrame(frame);card.style.removeProperty('--rx');card.style.removeProperty('--ry');card.style.removeProperty('--mx');card.style.removeProperty('--my');card.classList.remove('pointer-active')};card.addEventListener('pointermove',e=>{if(!pointer.matches||reduce.matches)return;cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;card.style.setProperty('--rx',((.5-y)*5).toFixed(2)+'deg');card.style.setProperty('--ry',((x-.5)*5).toFixed(2)+'deg');card.style.setProperty('--mx',(x*100).toFixed(1)+'%');card.style.setProperty('--my',(y*100).toFixed(1)+'%');card.classList.add('pointer-active')})});card.addEventListener('pointerleave',reset);card.addEventListener('pointercancel',reset);reduce.addEventListener('change',reset);pointer.addEventListener('change',reset)});
})();
