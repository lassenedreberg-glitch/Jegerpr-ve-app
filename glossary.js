(()=>{
  "use strict";
  const TERMS={
    anslagsenergi:"Hvor mye bevegelsesenergi prosjektilet har når det treffer. Fart påvirker energien svært mye, men vekten på prosjektilet betyr også noe.",
    prosjektil:"Den delen av patronen som forlater løpet og går mot målet. I en riflepatron er dette kula.",
    bevegelsesenergi:"Energi noe har fordi det beveger seg. Høyere fart eller større masse gir mer bevegelsesenergi.",
    treffpunkt:"Det nøyaktige stedet der haglene eller prosjektilet treffer.",
    "tilstrekkelig virkning":"At riktig ammunisjon, ved et godt plassert skudd, har nok energi og egnet konstruksjon til å avlive det aktuelle viltet raskt og humant.",
    treningsammunisjon:"Skarp ammunisjon laget først og fremst for trening, blinkskyting eller konkurranse. Den kan være dødelig, men prosjektilet er ikke nødvendigvis konstruert eller godkjent som jaktammunisjon.",
    stand:"Når en stående fuglehund stanser og markerer med kropp og hode hvor den kjenner lukt av fugl.",
    "stående fuglehund":"En hund som søker etter fugl og tar stand når den finner den. Jegeren går rolig fram før fuglen eventuelt reises.",
    skuddvinkel:"Retningen skuddet går i – oppover, vannrett eller nedover – og hva som finnes foran, bak og under målet.",
    kulefang:"Trygg bakgrunn som kan stanse prosjektilet, for eksempel egnet jordvoll eller fast mark uten fare for rikosjett.",
    rikosjett:"Når et prosjektil eller hagl slår mot en hard flate og endrer retning.",
    våtmark:"Et bredt begrep som blant annet kan omfatte vann, myr og områder som er vannmettet hele eller deler av året.",
    plombert:"Fysisk begrenset slik at et magasin ikke kan romme flere patroner enn regelen tillater. Det er ikke nok bare å la være å fylle magasinet.",
    los:"Lyden hunden gir mens den arbeider med vilt. Lyden kan hjelpe jegeren å forstå hvor hund og vilt befinner seg.",
    "gir hals":"At hunden bruker stemmen og bjeffer eller loser under arbeidet.",
    apport:"At hunden finner og bringer felt eller skadet småvilt tilbake til føreren."
  };
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  function termsOnScreen(){const q=document.querySelector(".question");if(!q)return[];const text=q.innerText.toLowerCase();return Object.entries(TERMS).filter(([term])=>text.includes(term));}
  function addButton(){const q=document.querySelector(".question");if(!q||q.querySelector(".word-help"))return;const terms=termsOnScreen();if(!terms.length)return;const b=document.createElement("button");b.type="button";b.className="word-help";b.innerHTML="❓ Forklar ordene";b.onclick=()=>open(terms);q.querySelector("h1")?.insertAdjacentElement("afterend",b)}
  function open(terms){document.getElementById("word-help-modal")?.remove();document.body.insertAdjacentHTML("beforeend",`<div class="modal word-help-modal" id="word-help-modal"><section class="modal-card"><span class="eyebrow">HJELP UTEN Å RØPE SVARET</span><h2>Hva betyr ordene?</h2><p>Dette forklarer bare ordene. Du må fortsatt velge svaret selv.</p><div class="word-list">${terms.map(([t,d])=>`<article><strong>${esc(t)}</strong><span>${esc(d)}</span></article>`).join("")}</div><button id="close-word-help">Jeg forstår ›</button></section></div>`);document.getElementById("close-word-help").onclick=()=>document.getElementById("word-help-modal")?.remove()}
  const style=document.createElement("style");style.textContent=`.word-help{display:inline-flex;align-items:center;gap:6px;margin:-2px 0 8px;border:2px solid #b58942;border-radius:11px;background:#fff1bf;color:#493615;padding:7px 11px;font-weight:900;box-shadow:0 2px #8e6a32}.word-help-modal .modal-card{width:min(650px,94vw);border:5px solid #9a682d;background:linear-gradient(145deg,#fff7d8,#e7c98d)}.word-help-modal h2{margin:5px 0}.word-list{display:grid;gap:7px;max-height:48vh;overflow:auto}.word-list article{display:grid;grid-template-columns:minmax(110px,28%) 1fr;gap:10px;background:#fff9e8;border:2px solid #c9a45d;border-radius:11px;padding:9px;color:#173d25}.word-list strong{text-transform:capitalize}.word-list span{line-height:1.35}@media(orientation:landscape) and (max-height:560px){.word-help{padding:3px 7px;font-size:9px;margin:0 0 3px}.word-help-modal .modal-card{padding:10px}.word-help-modal h2{font-size:20px}.word-help-modal p,.word-list article{font-size:10px}.word-list{max-height:43vh}}`;document.head.appendChild(style);
  new MutationObserver(addButton).observe(document.getElementById("app"),{childList:true,subtree:true});
  addButton();
})();
