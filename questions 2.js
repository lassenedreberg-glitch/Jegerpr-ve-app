/*
  JEGERPRØVEN – SPØRSMÅLSBANK
  Spørsmåls-ID-er er permanente. En slettet ID skal aldri brukes på nytt.
  c = samlinger, q = spørsmål, a = tre alternativer, r = riktig indeks (0–2),
  e = forklaring som vises etter svar, m = belønning (22, 12 eller 65).
  Ved artsidentifikasjon skal image og credit inneholde et ekte, lisensiert foto.
*/
window.JEGER_QUESTIONS=[
{id:1,c:[1,3],q:"Du ser et dyr, men er ikke helt sikker på hvilken art det er. Hva gjør du?",a:["Skyter raskt","Lar være å skyte","Skyter et varselskudd"],r:1,e:"Jegeren må være helt sikker på arten før et skudd vurderes.",m:"22"},
{id:2,c:[1,3],q:"Elgen står slik at du ikke vet hvor kulen kan ende. Hva gjør du?",a:["Skyter fordi elgen er stor","Venter til situasjonen er sikker","Sikter høyere"],r:1,e:"Et skudd krever sikkert kulefang og kontroll på området bak dyret.",m:"22"},
{id:3,c:[1,3],q:"Dyret står lenger unna enn du har øvd på. Hva er riktig?",a:["Prøver likevel","Lar være å skyte","Skyter flere skudd"],r:1,e:"En ansvarlig jeger skyter bare når avstanden og situasjonen er forsvarlig.",m:"22"},
{id:4,c:[1,8],q:"Hva er viktigst dersom et dyr kan være skadeskutt?",a:["Jakte videre","Dra hjem","Gjøre alt man kan for å finne dyret"],r:2,e:"Et mulig skadeskutt dyr skal prioriteres.",m:"12"},
{id:5,c:[1,10],q:"Hva gjør en god jeger med søppel og tom emballasje?",a:["Tar det med hjem","Gjemmer det","Kaster det i bålet"],r:0,e:"Jegeren viser respekt for naturen og etterlater ikke søppel.",m:"22"},
{id:6,c:[1],q:"Hva er den ansvarlige regelen for alkohol og jakt?",a:["Litt går bra","Alkohol og jakt hører ikke sammen","Det går bra etter lunsj"],r:1,e:"Jakt krever oppmerksomhet og trygg våpenhåndtering.",m:"22"},
{id:7,c:[1,2,3],q:"Hvordan behandler du et våpen når du ikke vet om det er ladd?",a:["Som om det er ladd","Som om det er tomt","Rister det"],r:0,e:"Våpen behandles som ladd til det er kontrollert sikkert.",m:"12"},
{id:8,c:[1,7,10],q:"Jerven virker sliten og varm under jakten. Hva gjør du?",a:["Lar ham jobbe videre","Gir pause, vann og tilsyn","Gjemmer vannskålen"],r:1,e:"Jegeren har ansvar for hundens helse og velferd.",m:"22"},
{id:9,c:[1,6],q:"Hvorfor må jegeren tenke på hvor mye vilt som felles?",a:["For å ta vare på bestanden","For å spare bilder","Fordi patroner er tunge"],r:0,e:"Jakt skal være bærekraftig.",m:"12"},
{id:10,c:[1,3],q:"Betyr et lovlig skudd alltid at det er riktig å skyte?",a:["Ja, alltid","Nei, sikkerhet og etikk må også vurderes","Bare når andre skyter først"],r:1,e:"Jegeren må alltid vurdere den konkrete situasjonen.",m:"65"},
{id:11,c:[2,6],q:"Hvilke våpentyper kan som hovedregel brukes under ordinær jakt?",a:["Rifle og hagle","Luftgevær og pistol","Bue og revolver"],r:0,e:"Under ordinær jakt kan rifle og hagle med kruttladning brukes.",m:"22"},
{id:12,c:[2],q:"Kan luftgeværet fra den digitale treningsbanen brukes til ordinær jakt?",a:["Ja","Nei","Bare på søndager"],r:1,e:"Luftgeværet i spillet er til digital blinktrening.",m:"22"},
{id:13,c:[2,6],q:"Kan salongrifle i kaliber .22 LR brukes til jakt på hare?",a:["Ja","Nei","Bare om vinteren"],r:1,e:".22 LR kan brukes på vilt opptil en hares størrelse, men ikke på hare.",m:"12"},
{id:14,c:[2,6],q:"Hva er minste tillatte kaliber ved jakt på blant annet elg og hjort?",a:["4,5 mm","5,6 mm","6,5 mm"],r:2,e:"Minstekaliberet er 6,5 mm, i tillegg til andre krav.",m:"65"},
{id:15,c:[2,4,6],q:"Hva er minste anslagsenergi på 100 meter for aktuell storviltammunisjon?",a:["220 joule","980 joule","2200 joule"],r:2,e:"Kravet er minst 2200 joule på 100 meter.",m:"65"},
{id:16,c:[2,4,6],q:"Hvilket energikrav gjelder ved riflejakt på rådyr, bever og gaupe?",a:["98 joule","980 joule","9800 joule"],r:1,e:"Det kreves minst 980 joule på 100 meter.",m:"65"},
{id:17,c:[2,6],q:"Kan treningsammunisjon brukes på storviltjakt?",a:["Ja, alltid","Bare på kort hold","Nei"],r:2,e:"Trenings- og konkurranseammunisjon er ikke tillatt på storviltjakt.",m:"12"},
{id:18,c:[2,6],q:"Hvor mange skudd kan en hagle til jakt maksimalt være ladd for?",a:["To","Fire","Seks"],r:0,e:"En hagle til jakt kan ikke være ladd for mer enn to skudd.",m:"12"},
{id:19,c:[2,6],q:"Er blyhagl tillatt i forbindelse med jakt i våtmark?",a:["Ja","Nei","Bare om vinteren"],r:1,e:"Blyhagl er forbudt i forbindelse med jakt i våtmark.",m:"12"},
{id:20,c:[6,7],q:"Kan hvem som helst jakte sel langs norskekysten uten tillatelse?",a:["Ja","Nei, det krever tillatelse og egne regler","Ja, med kikkert"],r:1,e:"Kystseljakt følger egne tillatelser, kvoter og regler.",m:"65"},
{id:21,c:[5],q:"Hvilken art er Norges største hjortedyr?",a:["Rådyr","Elg","Dåhjort"],r:1,e:"Elgen er Norges største hjortedyr.",m:"22"},
{id:22,c:[5],q:"Hva kalles det lyse feltet bak på rådyret?",a:["Speilet","Skjoldet","Kronen"],r:0,e:"Det lyse feltet kalles speilet.",m:"22"},
{id:23,c:[5],q:"Hva skjer vanligvis med harens pels om vinteren?",a:["Den blir blå","Den blir lysere eller hvit","Den faller av"],r:1,e:"Vinterpelsen gir bedre kamuflasje i snøen.",m:"22"},
{id:24,c:[5],q:"Hva kalles hannen hos storfugl?",a:["Tiur","Bukk","Gasse"],r:0,e:"Hannen kalles tiur, hunnen røy.",m:"22"},
{id:25,c:[5],q:"Hva hjelper rypas fjærkledde føtter den med?",a:["Å gå på snø og holde varmen","Å klatre","Å svømme under vann"],r:0,e:"Fjærene isolerer og fungerer som små truger.",m:"12"},
{id:26,c:[5],q:"Hvilket kjennetegn passer best på beveren?",a:["Flat og bred hale","Buskete hale","Kort hale med hvit spiss"],r:0,e:"Den flate, brede halen er et tydelig kjennetegn.",m:"22"},
{id:27,c:[5],q:"Hvilket kjennetegn har en voksen ringdue ofte på halsen?",a:["Et hvitt felt","En rød kam","Et langt skjegg"],r:0,e:"Voksne ringduer har et hvitt felt på siden av halsen.",m:"12"},
{id:28,c:[5],q:"Hvilket kjennetegn er vanlig hos rødreven?",a:["Buskete hale med lys spiss","Flat hale","Hvitt gevir"],r:0,e:"Rødreven har vanligvis en buskete hale med lys spiss.",m:"22"},
{id:29,c:[5],q:"Hvor hviler steinkobben ofte når den ikke er i vannet?",a:["På skjær og sandbanker","I tretopper","På høyfjellet"],r:0,e:"Steinkobben hviler ofte på skjær, holmer og sandbanker.",m:"12"},
{id:30,c:[5,6],q:"Hvorfor må en seljeger være sikker på både art og område?",a:["Alle selarter har samme regler","Reglene kan variere mellom art og område","Bare for å ta bilder"],r:1,e:"Tillatelser, kvoter og områder kan variere.",m:"65"}
];
// Overgang fra de første prototypenumrene til permanente samlings-ID-er.
const PERMANENTE_ID_ER={1:"1.1",2:"1.2",3:"1.3",4:"1.4",5:"1.5",6:"1.6",7:"1.7",8:"1.8",9:"1.9",10:"1.10",11:"2.1",12:"2.2",13:"2.3",14:"2.4",15:"2.5",16:"2.6",17:"2.7",18:"2.8",19:"2.9",20:"6.1",21:"5.1",22:"5.2",23:"5.3",24:"5.4",25:"5.5",26:"5.6",27:"5.7",28:"5.8",29:"5.9",30:"5.10"};
window.JEGER_QUESTIONS.forEach(spm=>{spm.id=PERMANENTE_ID_ER[spm.id]||spm.id});
