(() => {
  "use strict";
  const CONFIG={
    apiKey:"AIzaSyAtU4onVfwOvJurOeedzdlarlAGCpBFeww",
    authDomain:"jegerproven-multiplayer.firebaseapp.com",
    databaseURL:"https://jegerproven-multiplayer-default-rtdb.europe-west1.firebasedatabase.app",
    projectId:"jegerproven-multiplayer",
    storageBucket:"jegerproven-multiplayer.firebasestorage.app",
    messagingSenderId:"189672059510",
    appId:"1:189672059510:web:36b3229ec6b1d0ad46e557",
    measurementId:"G-085R81TGSE"
  };
  const ROUND_MS=30000,MAX_PLAYERS=12,COUNTDOWN_MS=3500;
  let app,auth,rtdb,uid,roomCode,roomRef,roomData,unsubscribe,offset=0,timer,questionIndex=0,correct=0,wrong=0,totalResponseMs=0,questionShownAt=0,finished=false,currentAttempts=0,earnedPoints=0;
  const $=s=>document.querySelector(s),safe=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
  const me=()=>typeof profile==="function"?profile():{name:"Spiller",avatar:"gutt",dog:"Jerven"};
  const now=()=>Date.now()+offset;
  const codeFromUrl=()=>new URLSearchParams(location.search).get("challenge")?.toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,6)||"";
  function screen(html){document.getElementById("mp-root")?.remove();document.body.insertAdjacentHTML("beforeend",`<main class="mp-screen" id="mp-root">${html}</main>`)}
  function panel(body,close=true){return`<section class="mp-panel"><header class="mp-title"><img src="jerven-icon.png" alt="Jerven"><div><h1>Vennekamp</h1><p>Flest riktige på 30 sekunder</p></div>${close?'<button class="mp-btn secondary mp-close" data-mp-close>✕ Lukk</button>':""}</header>${body}</section>`}
  function error(message){const old=$(".mp-error");if(old)old.remove();$(".mp-panel")?.insertAdjacentHTML("beforeend",`<p class="mp-error">${safe(message)}</p>`)}
  async function init(){
    if(uid)return;
    if(!globalThis.firebase)throw new Error("Kunne ikke koble til spillserveren. Kontroller internettforbindelsen.");
    app=firebase.apps.length?firebase.app():firebase.initializeApp(CONFIG);auth=firebase.auth();rtdb=firebase.database();
    const cred=auth.currentUser?{user:auth.currentUser}:await auth.signInAnonymously();uid=cred.user.uid;
    rtdb.ref(".info/serverTimeOffset").on("value",s=>offset=s.val()||0);
  }
  async function open(){
    screen(panel(`<div class="mp-actions"><article class="mp-card"><h2>🏕️ Lag spillerom</h2><p>Du blir vert. Venner blir med via QR-kode eller romkode.</p><button class="mp-btn" id="mp-create">Lag nytt rom</button></article><article class="mp-card"><h2>📱 Bli med</h2><p>Skriv romkoden som vises på telefonen til verten.</p><input class="mp-input" id="mp-code" maxlength="6" inputmode="text" placeholder="ABC123" value="${safe(codeFromUrl())}"><button class="mp-btn" id="mp-join">Bli med</button></article></div>`));bindClose();
    try{await init()}catch(e){error(e.message);return}
    $("#mp-create").onclick=createRoom;$("#mp-join").onclick=()=>joinRoom($("#mp-code").value);if(codeFromUrl())$("#mp-join").focus();
  }
  function bindClose(){$("[data-mp-close]")?.addEventListener("click",leave)}
  function makeCode(){const chars="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";return Array.from({length:6},()=>chars[Math.floor(Math.random()*chars.length)]).join("")}
  function shuffledQuestionIds(){const ids=(window.JEGER_QUESTIONS||[]).map(q=>q.id);for(let i=ids.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[ids[i],ids[j]]=[ids[j],ids[i]]}return ids.slice(0,80)}
  async function createRoom(){
    try{await init();roomCode=makeCode();roomRef=rtdb.ref(`rooms/${roomCode}`);const p=me(),payload={hostUid:uid,status:"lobby",createdAt:firebase.database.ServerValue.TIMESTAMP,durationMs:ROUND_MS,questionIds:shuffledQuestionIds(),players:{[uid]:{name:p.name,avatar:p.avatar||"gutt",joinedAt:firebase.database.ServerValue.TIMESTAMP,correct:0,wrong:0,earnedPoints:0,totalResponseMs:0,finished:false}}};await roomRef.set(payload);roomData=payload;listen();showLobby()}catch(e){error("Kunne ikke lage rom: "+e.message)}
  }
  async function joinRoom(raw){
    const code=String(raw||"").toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,6);if(code.length!==6)return error("Romkoden skal ha 6 tegn.");
    try{await init();roomCode=code;roomRef=rtdb.ref(`rooms/${roomCode}`);const snap=await roomRef.once("value"),data=snap.val();if(!data)return error("Fant ikke rommet. Kontroller koden.");if(data.status!=="lobby")return error("Denne runden har allerede startet.");if(Object.keys(data.players||{}).length>=MAX_PLAYERS&&!data.players?.[uid])return error("Rommet er fullt (maks 12 spillere).");const p=me(),player={name:p.name,avatar:p.avatar||"gutt",joinedAt:firebase.database.ServerValue.TIMESTAMP,correct:0,wrong:0,earnedPoints:0,totalResponseMs:0,finished:false};await roomRef.child(`players/${uid}`).set(player);roomRef.child(`players/${uid}`).onDisconnect().remove();roomData={...data,players:{...(data.players||{}),[uid]:player}};listen();showLobby()}catch(e){error("Kunne ikke bli med: "+e.message)}
  }
  function listen(){if(unsubscribe)unsubscribe();const cb=s=>onRoom(s.val());roomRef.on("value",cb);unsubscribe=()=>roomRef?.off("value",cb)}
  function onRoom(data){if(!data){error("Spillerommet er avsluttet.");return}const previous=roomData?.status;roomData=data;if(data.status==="lobby")renderPlayers();if(data.status==="countdown"&&previous!=="countdown")runCountdown();if(data.status==="playing"&&previous!=="playing")startRound();if(data.status==="finished"&&previous!=="finished")showResults()}
  function shareUrl(){const u=new URL(location.href);u.searchParams.set("challenge",roomCode);return u.toString()}
  function showLobby(){
    const host=roomData?.hostUid===uid;screen(panel(`<div class="mp-room">${roomCode}</div><div class="mp-lobby"><div><div class="mp-qr"><canvas id="mp-qr"></canvas></div><button class="mp-btn secondary" id="mp-share">Del lenke</button></div><div><h2>Spillere <span id="mp-count">1/${MAX_PLAYERS}</span></h2><div class="mp-players" id="mp-players"></div>${host?'<button class="mp-btn" id="mp-start" disabled>Start kampen</button>':'<p>Venter på at verten starter …</p>'}</div></div>`));bindClose();renderPlayers();
    if(globalThis.QRCode)QRCode.toCanvas($("#mp-qr"),shareUrl(),{width:190,margin:1,color:{dark:"#173521",light:"#ffffff"}}).catch(()=>{});
    $("#mp-share").onclick=async()=>{const data={title:"Jegerprøven – vennekamp",text:`Bli med i rom ${roomCode}`,url:shareUrl()};try{if(navigator.share)await navigator.share(data);else{await navigator.clipboard.writeText(data.url);$("#mp-share").textContent="Lenken er kopiert ✓"}}catch{}};
    if(host)$("#mp-start").onclick=startByHost;
  }
  function renderPlayers(){const box=$("#mp-players");if(!box||!roomData)return;const players=Object.entries(roomData.players||{});box.innerHTML=players.map(([id,p])=>`<div class="mp-player">${p.avatar==="jente"?"👧":"👦"} ${safe(p.name)} ${id===roomData.hostUid?"👑":""}</div>`).join("");if($("#mp-count"))$("#mp-count").textContent=`${players.length}/${MAX_PLAYERS}`;if($("#mp-start"))$("#mp-start").disabled=players.length<2}
  async function startByHost(){if(roomData.hostUid!==uid||Object.keys(roomData.players||{}).length<2)return;await roomRef.update({status:"countdown",startsAt:now()+COUNTDOWN_MS})}
  function runCountdown(){screen(panel(`<div style="display:grid;place-items:center;height:65vh"><div class="mp-countdown" id="mp-countdown">3</div></div>`,false));clearInterval(timer);timer=setInterval(()=>{const left=Math.max(0,Math.ceil((roomData.startsAt-now())/1000));if($("#mp-countdown"))$("#mp-countdown").textContent=left||"JAKT!";if(now()>=roomData.startsAt&&roomData.hostUid===uid)roomRef.child("status").set("playing")},100)}
  function startRound(){clearInterval(timer);questionIndex=correct=wrong=totalResponseMs=currentAttempts=earnedPoints=0;finished=false;renderGame();timer=setInterval(tick,100)}
  function currentQuestion(){const id=roomData.questionIds?.[questionIndex];return(window.JEGER_QUESTIONS||[]).find(q=>String(q.id)===String(id))}
  function tick(){const left=Math.max(0,(roomData.startsAt+ROUND_MS)-now());if($("#mp-time"))$("#mp-time").textContent=(left/1000).toFixed(1);if(left<=0)finishPlayer()}
  function renderGame(){const q=currentQuestion();if(!q)return finishPlayer();questionShownAt=performance.now();screen(panel(`<div class="mp-game"><aside class="mp-timer"><span>TID</span><strong id="mp-time">30.0</strong><div class="mp-mini-score">✅ <b>${correct}</b> &nbsp; ❌ <b>${wrong}</b><br>💰 <b>${earnedPoints}</b> patronpoeng</div></aside><article class="mp-question"><small>SPØRSMÅL ${questionIndex+1} • ${q.m==="22"?".22 LR":q.m==="12"?"KALIBER 12":"6,5×55"}</small><h2>${safe(q.q)}</h2>${q.image?`<img class="animal-photo" src="${safe(q.image)}" alt="Dyrebilde">`:""}<div class="mp-answers">${q.a.map((a,i)=>`<button data-mp-answer="${i}"><span>${String.fromCharCode(65+i)}</span>${safe(a)}</button>`).join("")}</div></article></div>`,false));document.querySelectorAll("[data-mp-answer]").forEach(b=>b.onclick=()=>answer(Number(b.dataset.mpAnswer),b))}
  function award(q){const p=me(),count=Math.max(1,3-currentAttempts),value=q.m==="22"?1:q.m==="12"?5:10,points=count*value;p.ammo=p.ammo||{22:0,12:0,65:0};p.ammo[q.m]=(p.ammo[q.m]||0)+count;p.score=(p.score||0)+points;earnedPoints+=points;if(typeof save==="function")save()}
  function answer(choice,button){if(finished)return;const q=currentQuestion();if(choice===q.r){award(q);correct++;totalResponseMs+=Math.round(performance.now()-questionShownAt);questionIndex++;currentAttempts=0;renderGame()}else{wrong++;currentAttempts++;button.classList.add("wrong");button.disabled=true;roomRef.child(`players/${uid}`).update({wrong})}}
  async function finishPlayer(){if(finished)return;finished=true;clearInterval(timer);await roomRef.child(`players/${uid}`).update({correct,wrong,earnedPoints,totalResponseMs,finished:true,finishedAt:firebase.database.ServerValue.TIMESTAMP});if(roomData.hostUid===uid)await roomRef.child("status").set("finished");else showWaitingResults()}
  function showWaitingResults(){screen(panel(`<div style="text-align:center;padding:35px"><h2>⏱️ Tiden er ute!</h2><p>Venter på resultatlisten …</p></div>`,false))}
  function showResults(){clearInterval(timer);const players=Object.values(roomData.players||{}).sort((a,b)=>(b.correct||0)-(a.correct||0)||(a.wrong||0)-(b.wrong||0)||(a.totalResponseMs||0)-(b.totalResponseMs||0));screen(panel(`<h2>🏆 Resultatliste</h2><table class="mp-results"><thead><tr><th>Plass</th><th>Spiller</th><th>Riktige</th><th>Feil</th><th>Patronpoeng</th><th>Svartid</th></tr></thead><tbody>${players.map((p,i)=>`<tr><td>${i+1}${i===0?" 🏆":""}</td><td>${safe(p.name)}</td><td>${p.correct||0}</td><td>${p.wrong||0}</td><td>${p.earnedPoints||0}</td><td>${((p.totalResponseMs||0)/1000).toFixed(1)} s</td></tr>`).join("")}</tbody></table><button class="mp-btn" data-mp-close>Tilbake til jaktbua</button>`,false));bindClose()}
  async function leave(){clearInterval(timer);if(unsubscribe){unsubscribe();unsubscribe=null}if(roomRef&&uid&&roomData?.status==="lobby"){try{if(roomData.hostUid===uid)await roomRef.remove();else await roomRef.child(`players/${uid}`).remove()}catch{}}roomRef=null;roomData=null;roomCode="";document.getElementById("mp-root")?.remove();const u=new URL(location.href);u.searchParams.delete("challenge");history.replaceState({},"",u)}
  window.JegerMultiplayer={open};
  window.addEventListener("load",()=>{if(codeFromUrl()){const wait=setInterval(()=>{if(typeof profile==="function"&&profile()){clearInterval(wait);open()}},250);setTimeout(()=>clearInterval(wait),10000)}});
})();
