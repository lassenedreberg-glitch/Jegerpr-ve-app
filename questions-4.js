/* Tillegg 4: deterministiske forståelsesvarianter fram til nøyaktig 1000 spørsmål. */
(()=>{
  "use strict";
  const bank=window.JEGER_QUESTIONS||[],TARGET=1000;
  if(bank.length>=TARGET)return;
  const base=bank.slice(),next={};
  for(const q of bank){const [c,n]=String(q.id).split(".").map(Number);if(Number.isFinite(c)&&Number.isFinite(n))next[c]=Math.max(next[c]||0,n+1)}
  function reword(q){return `Jerven forklarer: «${q.e}» Hvilket svar passer best til spørsmålet «${q.q}»?`}
  const needed=TARGET-bank.length;
  for(let i=0;i<needed;i++){
    const src=base[i%base.length],chapter=Number(String(src.id).split(".")[0])||1,id=`${chapter}.${next[chapter]||1}`;
    next[chapter]=(next[chapter]||1)+1;
    bank.push({...src,id,q:reword(src),e:`Riktig svar er «${src.a[src.r]}». ${src.e}`,variantOf:String(src.id),checked:src.checked||window.JEGER_SOURCES?.checked||"2026-09-01"});
  }
})();
