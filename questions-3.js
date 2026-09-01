/* Tillegg 2: interaktive våpendeler og forskjellen på hagle og rifle. */
(()=>{
const A=[], q=(id,c,t,a,r,e,m="12",diagram=null)=>A.push({id,c,q:t,a,r,e,m,diagram});
const H=["Kolbe","Baskyle / låskasse","Forskjefte","Kammer","Løp","Avtrekker"],R=["Kolbe","Avtrekker","Magasin","Sluttstykke","Kikkertsikte","Løp / munning"];
q("2.91",[2,4],"Hvor er kolben på hagla? Trykk på delen.",H,0,"Kolben støttes mot skulderen og hjelper skytteren å holde våpenet stødig.","12","shotgun");
q("2.92",[2,4],"Hvor er baskylen eller låskassen på hagla?",H,1,"Baskylen er den sentrale metalldelen mellom kolben og løpene.","12","shotgun");
q("2.93",[2,4],"Hvor er forskjeftet på hagla?",H,2,"Forskjeftet er tredelen under løpene som den fremste hånden holder rundt.","12","shotgun");
q("2.94",[2,4],"Hvor er kammeret på hagla?",H,3,"Patronen ligger i kammeret når hagla er ladd.","12","shotgun");
q("2.95",[2,4],"Hvor er løpene på hagla?",H,4,"Haglladningen går gjennom løpet før den forlater våpenet.","12","shotgun");
q("2.96",[2,4],"Hvor er avtrekkeren på hagla?",H,5,"Avtrekkeren sitter inne i avtrekkerbøylen. Fingeren holdes borte til skudd skal avfyres.","12","shotgun");
q("2.97",[2,4],"Hvor er kolben på rifla?",R,0,"Kolben støttes mot skulderen og hjelper skytteren å holde rifla stødig.","12","rifle");
q("2.98",[2,4],"Hvor er avtrekkeren på rifla?",R,1,"Avtrekkeren sitter inne i avtrekkerbøylen. Fingeren holdes borte til skudd skal avfyres.","12","rifle");
q("2.99",[2,4],"Hvor er magasinet på rifla?",R,2,"Magasinet holder patronene før de føres inn i kammeret.","12","rifle");
q("2.100",[2,4],"Hvor er sluttstykket på boltrifla?",R,3,"Sluttstykket brukes til å føre patronen inn i kammeret og låse mekanismen.","12","rifle");
q("2.101",[2,4],"Hvor er kikkertsiktet på rifla?",R,4,"Kikkertsiktet er montert over låskassen og hjelper jegeren å sikte.","12","rifle");
q("2.102",[2,4],"Hvor er løpet og munningen på rifla?",R,5,"Kula går gjennom løpet og forlater våpenet ved munningen. Munningen skal alltid peke i sikker retning.","12","rifle");
q("2.103",[2,4],"Hva er den viktigste forskjellen inne i løpet på en vanlig hagle og en rifle?",["Begge er alltid glatte","Rifla har rifling, mens hagla vanligvis har glatt løp","Hagla har rifling, mens rifla er glatt"],1,"Riflingen gir kula rotasjon. En vanlig hagle har glatt løp.");
q("2.104",[2,4],"Hva skyter en hagle vanligvis ved jakt?",["En samling hagl","Bare én riflekule","En pil"],0,"En haglpatron sender ut mange hagl som danner en haglsverm.");
q("2.105",[2,4],"Hva skyter en rifle vanligvis?",["En enkelt kule","En haglsverm","En leirdue"],0,"Rifla skyter én kule som stabiliseres av riflingen i løpet.");
q("2.106",[2,3,4],"Hva gjør du først når du skal kontrollere delene på et våpen?",["Sørger for sikker retning og kontrollerer at våpenet er tomt","Legger fingeren på avtrekkeren","Ser inn i munningen"],0,"All kontroll begynner med sikker retning og kontroll av at våpenet er uladd.");
window.JEGER_QUESTIONS.push(...A);
})();
