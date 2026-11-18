const $ = (s, root=document) => root.querySelector(s);
const app = $("#app");
const toastEl = $("#toast");
const bearChoices = [
  {emoji:"🐻",name:"Honey Bear",tone:"A gentle and caring companion"},
  {emoji:"🐼",name:"Panda",tone:"A curious explorer"},
  {emoji:"🐨",name:"Koala",tone:"A calm and thoughtful friend"},
  {emoji:"🐻‍❄️",name:"Polar Bear",tone:"A brave little adventurer"}
];
const defaultState = {
  passportType:"guest", bear:0, name:"Little Dreamer", created:false, page:"home",
  badges:["Care Giver","Explorer","Community"], quests:3, xp:320, level:2,
  items:["Green Scarf","Yellow Backpack","Leaf Pin"], outfit:{hat:"🧢",scarf:"🧣",bag:"🎒"},
  activity:[
    {date:"Today",icon:"🎁",title:"Completed Care Package Challenge",detail:"Packed essential items for local families.",xp:"+100 XP"},
    {date:"Nov 15",icon:"🗺️",title:"Explored the Community Map",detail:"Discovered 3 new places and helped a neighbour.",xp:"+50 XP"},
    {date:"Nov 12",icon:"🧣",title:"Unlocked a new scarf",detail:"A cozy green scarf for your bear.",xp:"New item"}
  ],
  email:"",verified:false
};
let state = loadState();
function loadState(){try{return {...defaultState,...JSON.parse(localStorage.getItem("dreamPassport")||"{}")}}catch{return {...defaultState}}}
function save(){localStorage.setItem("dreamPassport",JSON.stringify(state));updateHeader()}
function updateHeader(){
  $("#chipBear").textContent=bearChoices[state.bear]?.emoji||"🐻";
  $("#chipName").textContent=state.created?state.name:"Guest";
}
function toast(msg){toastEl.textContent=msg;toastEl.classList.add("show");setTimeout(()=>toastEl.classList.remove("show"),2200)}
function go(page){state.page=page;save();render()}
function navBar(){return ""}
function stepper(active){const labels=["Passport Type","Choose Your Bear","Dreamy Name","Preview"];return `<div class="stepper">${labels.map((l,i)=>`<span class="step ${i+1<active?'done':i+1===active?'active':''}">${i+1<active?'✓':i+1} ${l}</span>`).join("")}</div>`}
function pageHead(kicker,title,desc){return `<div class="page-head"><div class="eyebrow">${kicker}</div><h1>${title}</h1><p>${desc}</p></div>`}
function home(){return `<section class="hero">
  <div class="hero-copy"><div class="eyebrow">CFSGE · A caring journey for our community</div><h1>Start Your <span>Dream Journey</span></h1><p>Create your Dream Passport, meet your bear companion, complete caring challenges, and discover how small acts of kindness can make a real difference.</p>
  <div class="btn-row"><button class="btn btn-primary" data-action="start">Create My Passport <span>→</span></button><button class="btn btn-soft" data-action="guest">Continue as Guest</button></div>
  <div class="feature-strip"><div class="feature"><span class="feature-icon">🗺️</span><div><strong>Explore</strong><small>Discover new places</small></div></div><div class="feature"><span class="feature-icon">💚</span><div><strong>Help</strong><small>Complete caring challenges</small></div></div><div class="feature"><span class="feature-icon">🏅</span><div><strong>Collect</strong><small>Earn badges and rewards</small></div></div></div></div>
  <div class="hero-art"><div class="big-bear">🐻</div><div class="passport-prop"><b>✿</b><small>DREAM<br>PASSPORT</small></div></div></section>`}
function passportType(){return `${stepper(1)}${pageHead("Step 1 · Get started","Choose Your Passport","Start your journey in the way that suits you. Both options include the same game experience.")}<div class="choice-grid">
  <div class="choice ${state.passportType==='guest'?'selected':''}"><div class="choice-icon">🐻</div><h2>Guest Passport</h2><p>Start right away. No email required. Your progress stays on this browser.</p><button class="btn btn-gold" data-action="choose-type" data-type="guest">Continue as Guest</button></div>
  <div class="choice ${state.passportType==='verified'?'selected':''}"><div class="choice-icon">✉️</div><h2>Verified Passport</h2><p>Save your progress and recover it across devices with an email address.</p><button class="btn btn-primary" data-action="choose-type" data-type="verified">Continue with Email</button></div></div><p class="text-center">You can start as a guest and verify your passport later.</p>`}
function chooseBear(){return `${stepper(2)}${pageHead("Step 2 · Your companion","Choose Your Bear","Pick a companion to start your journey together.")}<div class="wizard-layout"><div class="bear-stage"><div class="big-bear">${bearChoices[state.bear].emoji}</div></div><div class="panel"><div class="eyebrow">Your companion</div><h2>${bearChoices[state.bear].name}</h2><p>${bearChoices[state.bear].tone}. You can dress up your bear later.</p><div class="bear-picker">${bearChoices.map((b,i)=>`<button class="bear-option ${state.bear===i?'selected':''}" data-action="bear" data-index="${i}" aria-label="${b.name}">${b.emoji}</button>`).join("")}</div><div class="btn-row"><button class="btn btn-soft" data-nav="passport-type">← Back</button><button class="btn btn-primary" data-nav="name">Next →</button></div></div></div>`}
function dreamyName(){return `${stepper(3)}${pageHead("Step 3 · Make it yours","Create Your Dreamy Name","Give your bear a special name for this journey.")}<div class="panel" style="max-width:760px;margin:auto"><label class="field-label" for="dreamName">Your Dreamy Name</label><input class="text-input" id="dreamName" maxlength="20" value="${escapeHtml(state.name)}" placeholder="e.g. Little Dreamer"><div class="flex-between"><small id="nameCount">${state.name.length}/20</small><span class="eyebrow">Name ideas</span></div><div class="suggestions">${["Maple Bear","Star Wanderer","Little Explorer","Sunny Trail"].map(n=>`<button class="suggestion" data-action="suggest" data-name="${n}">${n}</button>`).join("")}</div><div class="btn-row"><button class="btn btn-soft" data-nav="bear">← Back</button><button class="btn btn-primary" data-action="save-name">Next →</button></div></div>`}
function passportCard(){return `<div class="open-passport"><div class="passport-page"><div class="eyebrow">My Dream Passport</div><div class="stamp-photo">${bearChoices[state.bear].emoji}</div><div class="text-center serif">✿ A little journey ✿</div></div><div class="passport-page"><div class="eyebrow">Dreamy Name</div><h2>${escapeHtml(state.name)}</h2><div class="passport-info"><div><small>Passport No.</small><strong>#${String(10842).padStart(5,"0")}</strong></div><div><small>Passport Type</small><strong>${state.passportType==='verified'?'Verified Passport':'Guest Passport'}</strong></div><div><small>Companion</small><strong>${bearChoices[state.bear].name}</strong></div></div></div></div>`}
function preview(){return `${stepper(4)}${pageHead("Step 4 · Almost there","Preview Your Passport","Take a look at your Dream Passport before you begin.")}<div class="passport-preview"><div>${passportCard()}</div><div class="panel side-list"><h3>Your Journey Includes</h3><div class="feature"><span class="feature-icon">🏅</span><div><strong>Collect Badges</strong><small>Complete quests and earn special stamps.</small></div></div><div class="feature"><span class="feature-icon">👕</span><div><strong>Dress Up Your Bear</strong><small>Unlock and collect cute items.</small></div></div><div class="feature"><span class="feature-icon">🗺️</span><div><strong>Explore the Map</strong><small>Discover, play, and make a difference.</small></div></div></div></div><div class="btn-row" style="justify-content:center"><button class="btn btn-soft" data-nav="name">← Back</button><button class="btn btn-primary" data-action="create">Create My Passport →</button></div>`}
function success(){return `<section class="hero" style="min-height:430px"><div class="hero-copy"><div class="eyebrow">Your passport is ready</div><h1>Your Dream Passport is <span>Ready!</span></h1><p>Welcome to the Dream World, ${escapeHtml(state.name)}. Your journey of caring, exploring, and making a difference starts now.</p><div class="btn-row"><button class="btn btn-primary" data-nav="passport">Enter the Dream World →</button></div></div><div class="hero-art"><div class="big-bear">${bearChoices[state.bear].emoji}</div></div></section><div class="panel" style="max-width:900px;margin:18px auto"><h3>What’s next?</h3><div class="feature-strip"><div class="feature"><span class="feature-icon">🗺️</span><div><strong>Explore the Map</strong><small>Start your first quest</small></div></div><div class="feature"><span class="feature-icon">👕</span><div><strong>Dress Up Your Bear</strong><small>Find and collect cute items</small></div></div><div class="feature"><span class="feature-icon">🏅</span><div><strong>Collect Badges</strong><small>Complete challenges</small></div></div></div></div>`}
const menu=[["passport","📕","My Passport"],["badges","🏅","Badges"],["dress","👕","Dress Up"],["collection","🎒","My Collection"],["journey","📖","Journey Log"],["settings","⚙️","Settings"]];
function sidebar(){return `<aside class="sidebar">${menu.map(([id,ic,label])=>`<button class="side-link ${state.page===id?'active':''}" data-nav="${id}">${ic} &nbsp; ${label}</button>`).join("")}</aside>`}
function stats(){return `<div class="stat-grid"><div class="stat"><b>${state.badges.length+2}</b><span>🏅 Badges</span></div><div class="stat"><b>${state.quests}</b><span>🚩 Quests</span></div><div class="stat"><b>${state.items.length+5}</b><span>🎁 Items</span></div></div>`}
function badgesPreview(){return `<div class="panel"><div class="flex-between"><h3>My Badges</h3><button class="pill" data-nav="badges">View all →</button></div><div class="badge-grid">${badgeData().slice(0,4).map(b=>badgeCard(b)).join("")}</div></div>`}
function activityPreview(){return `<div class="panel"><h3>Recent Activity</h3>${state.activity.slice(0,3).map(a=>`<div class="activity"><span class="activity-icon">${a.icon}</span><div><strong>${a.title}</strong><small style="display:block;color:var(--muted)">${a.date} · ${a.xp}</small></div></div>`).join("")}</div>`}
function overview(){return `<div class="dashboard">${sidebar()}<section class="dash-main"><div class="profile-passport"><div class="profile-avatar">${bearChoices[state.bear].emoji}</div><div><div class="eyebrow">My Dream Passport</div><h2>${escapeHtml(state.name)}</h2><p>Passport No. #10842 · ${state.verified?'Verified':'Guest Passport'}</p><p>My journey of caring, exploring, and making a difference.</p></div></div>${badgesPreview()}</section><aside class="dash-right"><div class="panel"><h3>My Progress</h3>${stats()}<div class="flex-between" style="margin-top:16px"><strong>Journey Progress</strong><small>Lv. ${state.level} · Little Helper</small></div><div class="progress-track"><div class="progress-fill" style="width:${Math.min(100,state.xp/5)}%"></div></div><small>${state.xp} / 500 XP</small></div>${activityPreview()}</aside></div>`}
const badgeList=[
 ["💚","Care Giver","Complete a care package challenge.",true],
 ["⛺","Explorer","Explore a new area on the map.",true],
 ["👥","Community","Help the community grow.",true],
 ["🤝","Kind Helper","Support someone in need.",true],
 ["🌱","Green Friend","Complete 3 eco tasks.",false],
 ["🎨","Creative Builder","Create something special.",false],
 ["🧩","Team Player","Join a community event.",false],
 ["⭐","Big Supporter","Reach 5 donations.",false]
];
function badgeData(){return badgeList.map(b=>({...b,earned:state.badges.includes(b[1])||b[3]}))}
function badgeCard(b){return `<div class="badge-card ${b.earned?'':'locked'}"><span class="badge-icon">${b[0]}</span><strong>${b[1]}</strong><small style="display:block;color:var(--muted);margin-top:5px">${b.earned?'✓ Earned':'🔒 Locked'}</small></div>`}
function badgesPage(){return `<div class="dashboard">${sidebar()}<section class="dash-main"><div class="panel"><div class="eyebrow">Your achievements</div><h2>My Badges</h2><p>Collect badges by completing quests, helping others, and exploring the Dream World.</p><div class="toolbar"><span class="pill active">All (${badgeList.length})</span><span class="pill">Earned (${badgeData().filter(b=>b.earned).length})</span><span class="pill">Locked (${badgeData().filter(b=>!b.earned).length})</span></div><div class="badge-grid">${badgeData().map(b=>badgeCard(b)).join("")}</div></div></section></div>`}
const wearables=[
 {cat:"Hats",items:[["🧢","Blue Cap"],["🧶","Wool Hat"],["👒","Sun Hat"],["🎩","Explorer Hat"]]},
 {cat:"Scarves",items:[["🧣","Green Scarf"],["🧣","Red Scarf"],["🧣","Blue Scarf"]]},
 {cat:"Bags",items:[["🎒","Yellow Backpack"],["👜","Mini Bag"],["🎒","Trail Pack"]]},
 {cat:"Accessories",items:[["🍃","Leaf Pin"],["👓","Round Glasses"],["⭐","Star Badge"]]}
];
function dressPage(){return `<div class="dashboard">${sidebar()}<section class="dash-main"><div class="panel"><div class="eyebrow">Personalize your companion</div><h2>Dress Up Your Bear</h2><p>Mix and match items to create a look that feels like you.</p><div class="dress-layout"><div class="dress-bear"><div class="big-bear">${bearChoices[state.bear].emoji}</div><div class="panel" style="position:absolute;bottom:14px;padding:9px 14px">${state.outfit.hat||" "} ${state.outfit.scarf||"🧣"} ${state.outfit.bag||"🎒"}</div></div><div><div class="toolbar">${wearables.map(w=>`<button class="pill ${state.dressCat===w.cat?'active':''}" data-action="dress-cat" data-cat="${w.cat}">${w.cat}</button>`).join("")}</div><div class="item-grid">${(wearables.find(w=>w.cat===(state.dressCat||"Hats"))||wearables[0]).items.map((it,i)=>`<button class="item-card" data-action="wear" data-cat="${state.dressCat||"Hats"}" data-index="${i}"><span class="item-art">${it[0]}</span><strong>${it[1]}</strong></button>`).join("")}</div><div class="btn-row"><button class="btn btn-primary" data-action="save-look">Save Look</button><button class="btn btn-soft" data-action="reset-look">Reset</button></div></div></div></div></section></div>`}
function collectionPage(){return `<div class="dashboard">${sidebar()}<section class="dash-main"><div class="panel"><div class="eyebrow">Everything you have collected</div><h2>My Collection</h2><p>Your keepsakes, outfits, and special items from the journey.</p><div class="toolbar"><button class="pill active">All items</button><button class="pill">Clothing</button><button class="pill">Accessories</button><button class="pill">Special</button></div><div class="item-grid">${[["🧣","Green Scarf"],["🎒","Yellow Backpack"],["🍃","Leaf Pin"],["🧢","Blue Cap"],["🧴","Care Kit"],["🎁","Gift Box"],["🗺️","Map Token"],["⭐","Star Token"]].map((it,i)=>`<div class="item-card"><span class="item-art">${it[0]}</span><strong>${it[1]}</strong><small style="display:block;color:var(--muted)">${i<state.items.length+2?"Collected":"Coming soon"}</small></div>`).join("")}</div></div></section></div>`}
function journeyPage(){return `<div class="dashboard">${sidebar()}<section class="dash-main"><div class="panel"><div class="eyebrow">Your story so far</div><h2>Journey Log</h2><p>A record of your adventures, challenges, and kind actions.</p>${state.activity.map(a=>`<div class="log-row"><strong>${a.date}</strong><span style="font-size:28px">${a.icon}</span><div><strong>${a.title}</strong><small style="display:block;color:var(--muted)">${a.detail}</small></div><strong class="xp">${a.xp}</strong></div>`).join("")}<div class="btn-row"><button class="btn btn-primary" data-action="complete-quest">Complete a sample quest +100 XP</button></div></div></section></div>`}
function settingsPage(){return `<div class="dashboard">${sidebar()}<section class="dash-main"><div class="panel"><div class="eyebrow">Your account</div><h2>Passport Settings</h2><p>Manage your profile and how your progress is saved.</p><div class="settings-grid"><div class="panel panel-soft"><h3>Passport type</h3><p>${state.verified?"Verified Passport":"Guest Passport"}</p><button class="btn btn-primary" data-action="verify">${state.verified?"Email verified ✓":"Verify with email"}</button></div><div class="panel panel-soft"><h3>Dreamy Name</h3><input class="text-input" id="settingName" value="${escapeHtml(state.name)}" maxlength="20"><button class="btn btn-soft" style="margin-top:10px" data-action="update-name">Save name</button></div><div class="panel panel-soft"><h3>Companion</h3><p>${bearChoices[state.bear].emoji} ${bearChoices[state.bear].name}</p><button class="btn btn-soft" data-nav="bear">Change bear</button></div><div class="panel panel-soft"><h3>Local progress</h3><p>Your prototype progress is stored in this browser using local storage.</p><button class="btn btn-soft" data-action="reset-all">Reset prototype data</button></div></div></div></section></div>`}
function simplePage(page){const data={explore:["Explore the Dream World","Your map and community destinations will appear here in the full game prototype.","🗺️"],about:["About CFSGE","Small acts of care can make a meaningful difference for children, youth, and families.","💚"],help:["Help & Support","Need help with your Dream Passport? Your progress and collected badges are shown in your passport.","❔"]}[page];return `<div class="panel empty-state"><div style="font-size:64px">${data[2]}</div><div class="eyebrow">CFSGE</div><h1>${data[0]}</h1><p>${data[1]}</p><button class="btn btn-primary" data-nav="passport">Back to My Passport</button></div>`}
function escapeHtml(str){return String(str).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function render(){
  updateHeader();
  const pages={home, "passport-type":passportType,bear:chooseBear,name:dreamyName,preview,success,passport:overview,badges:badgesPage,dress:dressPage,collection:collectionPage,journey:journeyPage,settings:settingsPage,explore:()=>simplePage("explore"),about:()=>simplePage("about"),help:()=>simplePage("help")};
  app.innerHTML=(pages[state.page]||home)();
  const nameInput=$("#dreamName");if(nameInput)nameInput.addEventListener("input",()=>{$("#nameCount").textContent=`${nameInput.value.length}/20`;state.name=nameInput.value;});
}
app.addEventListener("click",e=>{
  const nav=e.target.closest("[data-nav]");if(nav){e.preventDefault();go(nav.dataset.nav);return}
  const b=e.target.closest("[data-action]");if(!b)return;
  const a=b.dataset.action;
  if(a==="start")go("passport-type");
  if(a==="guest"){state.passportType="guest";go("bear")}
  if(a==="choose-type"){state.passportType=b.dataset.type;if(state.passportType==="verified"){go("settings");toast("You can verify your email in Passport Settings.")}else go("bear")}
  if(a==="bear"){state.bear=Number(b.dataset.index);save();render()}
  if(a==="suggest"){state.name=b.dataset.name;render()}
  if(a==="save-name"){const v=$("#dreamName").value.trim();if(!v){toast("Please enter a name first.");return}state.name=v;go("preview")}
  if(a==="create"){state.created=true;state.page="success";save();render()}
  if(a==="dress-cat"){state.dressCat=b.dataset.cat;render()}
  if(a==="wear"){const cat=b.dataset.cat;const it=wearables.find(w=>w.cat===cat).items[Number(b.dataset.index)];const key={Hats:"hat",Scarves:"scarf",Bags:"bag",Accessories:"accessory"}[cat];state.outfit[key]=it[0];save();render()}
  if(a==="save-look"){state.items=[...new Set([...state.items,"Custom Bear Look"])];save();toast("Your bear's look has been saved!")}
  if(a==="reset-look"){state.outfit={hat:"🧢",scarf:"🧣",bag:"🎒"};save();render()}
  if(a==="verify"){const email=prompt("Enter an email address to simulate verification:");if(email&&email.includes("@")){state.email=email;state.verified=true;state.passportType="verified";save();render();toast("Passport verified in this prototype.")}else if(email)toast("Please enter a valid email address.")}
  if(a==="update-name"){const v=$("#settingName").value.trim();if(v){state.name=v;save();render();toast("Name updated.")}}
  if(a==="complete-quest"){state.quests++;state.xp+=100;state.activity.unshift({date:"Today",icon:"💚",title:"Completed a sample caring quest",detail:"You made a positive difference in the community.",xp:"+100 XP"});if(state.xp>=500){state.level++;state.xp-=500}save();render();toast("Quest completed! +100 XP")}
  if(a==="reset-all"){if(confirm("Reset all local prototype progress?")){localStorage.removeItem("dreamPassport");state={...defaultState};render();toast("Prototype reset.")}}
});
document.addEventListener("click",e=>{if(e.target.closest("[data-nav]")?.dataset.nav==="home"){state.page="home";save();render()}});
render();
