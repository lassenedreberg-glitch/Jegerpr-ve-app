/* Språkgrunnlag. Spørsmål kan ha feltene nn og en med q, a og e. */
(()=>{
const UI={nb:{myHunter:"Min jeger",shop:"Outfitter Shop",profiles:"Bytt profil",home:"Hjem",next:"Neste",finish:"Fullfør nivået",language:"Språk",child:"Barn",adult:"Voksen",save:"Lagre min jeger",delete:"Slett profilen",explanation:"💡 Dette betyr"},nn:{myHunter:"Jegeren min",shop:"Outfitter Shop",profiles:"Byt profil",home:"Heim",next:"Neste",finish:"Fullfør nivået",language:"Språk",child:"Barn",adult:"Vaksen",save:"Lagre jegeren min",delete:"Slett profilen",explanation:"💡 Dette tyder"},en:{myHunter:"My hunter",shop:"Outfitter Shop",profiles:"Switch profile",home:"Home",next:"Next",finish:"Complete level",language:"Language",child:"Child",adult:"Adult",save:"Save my hunter",delete:"Delete profile",explanation:"💡 What this means"}};
function t(key,p){const lang=typeof p==="string"?p:(p?.language||"nb");return UI[lang]?.[key]||UI.nb[key]||key}
function question(q,lang="nb"){if(lang==="nb"||!q?.[lang])return q;const x=q[lang];return{...q,q:x.q||q.q,a:x.a||q.a,e:x.e||q.e}}
window.JegerI18n={t,question,languages:[{id:"nb",name:"Bokmål"},{id:"nn",name:"Nynorsk"},{id:"en",name:"English"}]};
})();
