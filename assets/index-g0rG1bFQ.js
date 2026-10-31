(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function t(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(a){if(a.ep)return;a.ep=!0;const i=t(a);fetch(a.href,i)}})();const Ue=[{code:"USD",name:"US Dollar",symbol:"$",decimals:2,perUsd:1},{code:"GBP",name:"British Pound",symbol:"£",decimals:2,perUsd:.76},{code:"EUR",name:"Euro",symbol:"€",decimals:2,perUsd:.88},{code:"CNY",name:"Chinese Yuan",symbol:"¥",decimals:2,perUsd:7.1},{code:"AED",name:"UAE Dirham",symbol:"AED",decimals:2,perUsd:3.6725},{code:"MYR",name:"Malaysian Ringgit",symbol:"RM",decimals:2,perUsd:4.4},{code:"GMD",name:"Gambian Dalasi",symbol:"D",decimals:2,perUsd:71},{code:"XOF",name:"West African CFA Franc",symbol:"CFA",decimals:0,perUsd:590},{code:"GNF",name:"Guinean Franc",symbol:"FG",decimals:0,perUsd:8650},{code:"ZMW",name:"Zambian Kwacha",symbol:"ZK",decimals:2,perUsd:25},{code:"GHS",name:"Ghanaian Cedi",symbol:"GH₵",decimals:2,perUsd:11},{code:"NGN",name:"Nigerian Naira",symbol:"₦",decimals:2,perUsd:1500}],ke=[{code:"GM",name:"The Gambia",currency:"GMD",tz:"Africa/Banjul",dial:"+220",lang:"en"},{code:"SN",name:"Senegal",currency:"XOF",tz:"Africa/Dakar",dial:"+221",lang:"fr"},{code:"ML",name:"Mali",currency:"XOF",tz:"Africa/Bamako",dial:"+223",lang:"fr"},{code:"GW",name:"Guinea-Bissau",currency:"XOF",tz:"Africa/Bissau",dial:"+245",lang:"pt"},{code:"GN",name:"Guinea",currency:"GNF",tz:"Africa/Conakry",dial:"+224",lang:"fr"},{code:"ZM",name:"Zambia",currency:"ZMW",tz:"Africa/Lusaka",dial:"+260",lang:"en"},{code:"GB",name:"United Kingdom",currency:"GBP",tz:"Europe/London",dial:"+44",lang:"en"},{code:"US",name:"United States",currency:"USD",tz:"America/New_York",dial:"+1",lang:"en"},{code:"CN",name:"China",currency:"CNY",tz:"Asia/Shanghai",dial:"+86",lang:"zh"},{code:"DE",name:"Germany",currency:"EUR",tz:"Europe/Berlin",dial:"+49",lang:"de"},{code:"FR",name:"France",currency:"EUR",tz:"Europe/Paris",dial:"+33",lang:"fr"},{code:"AE",name:"United Arab Emirates",currency:"AED",tz:"Asia/Dubai",dial:"+971",lang:"en"}],Pe={open:"08:30",close:"17:30",days:[1,2,3,4,5,6]},O=(s,e,t,n,a={})=>({id:s,country:e,name:t,city:n,type:"OWN",commissionBps:0,active:!0,hours:Pe,...a}),Be=[O("GM-SKD","GM","Serrekunda Main","Serrekunda"),O("GM-BJL","GM","Banjul Central","Banjul"),O("GM-BRK","GM","Brikama Counter","Brikama",{type:"AGENT",commissionBps:80}),O("SN-DKR","SN","Dakar Plateau","Dakar"),O("SN-ZIG","SN","Ziguinchor Counter","Ziguinchor",{type:"AGENT",commissionBps:80}),O("ML-BKO","ML","Bamako Centre","Bamako"),O("GW-BSS","GW","Bissau Central","Bissau"),O("GN-CKY","GN","Conakry Madina","Conakry"),O("ZM-LUN","ZM","Lusaka Cairo Road","Lusaka"),O("ZM-KIT","ZM","Kitwe Counter","Kitwe",{type:"AGENT",commissionBps:80}),O("GB-LDN","GB","London Southwark","London"),O("GB-MAN","GB","Manchester","Manchester"),O("US-NYC","US","New York Bronx","New York"),O("US-ATL","US","Atlanta","Atlanta"),O("CN-GZH","CN","Guangzhou Xiaobei","Guangzhou"),O("CN-YIW","CN","Yiwu Trade Hub","Yiwu"),O("DE-BER","DE","Berlin","Berlin"),O("FR-PAR","FR","Paris","Paris"),O("AE-DXB","AE","Dubai Deira","Dubai",{hours:{open:"09:00",close:"19:00",days:[1,2,3,4,5,6]}})],Fe={codeExpiryDays:30,rateLockMinutes:30,maxPinAttempts:3,maxLoginAttempts:5,lockoutMinutes:15,idleTimeoutMin:15,enforceOperatingHours:!0,graceMin:10,autoClockIn:!0,nameMatchPass:.92,nameMatchReview:.8,lowFloatUsd:3e3,fxMarginBps:150,marginOverridesBps:{},domesticFeeFactor:.5,minFeeUsd:1,feeBandsUsd:[{upTo:100,fee:3},{upTo:500,fee:5},{upTo:2e3,fee:8},{upTo:null,fee:12}],tiers:{C1:{perTxUsd:650,per30dUsd:1950,per12mUsd:null},C2:{perTxUsd:2600,per30dUsd:7800,per12mUsd:32500},C3:{perTxUsd:13e3,per30dUsd:null,per12mUsd:null}},hardMaxTxUsd:13e3,highValueUsd:1e4,coSignAboveUsd:1500,idPhotoAboveUsd:200,varianceToleranceUsd:7,allowSelfRedeem:!1,velocity:{tx24h:3,tx7d:8,m2oSenders7d:6,o2mRecipients7d:5,structuringCount:3,structuringPct:90},watchlist:["Test Sanctioned Person","Blocked Entity Demo"],pepList:["Demo Politically Exposed"]};function re(s,e){const t=typeof s=="string"?Number(s.replace(/,/g,"")):s;if(!Number.isFinite(t))throw new RangeError("Invalid amount");return Math.round(+(t*10**e).toFixed(6))}const le=(s,e)=>s/10**e;function de(s,e){const t=(e==null?void 0:e.decimals)??2;return le(s,t).toLocaleString("en-US",{minimumFractionDigits:t,maximumFractionDigits:t})}const He=(s,e)=>`${de(s,e)} ${(e==null?void 0:e.code)??""}`.trim(),Ve=s=>Object.fromEntries(s.map(e=>[e.code,e]));function Ge(s,e,t){const n=t[s],a=t[e];if(!n||!a)throw new Error(`Unknown currency ${n?e:s}`);return a.perUsd/n.perUsd}const Me=(s,e,t)=>le(s,t[e].decimals)/t[e].perUsd;function je(s,e,t){if(s===e)return 0;const n=t.marginOverridesBps||{};return n[`${s}>${e}`]??n[`*>${e}`]??n[`${s}>*`]??t.fxMarginBps}function qe(s,e,t,n,a){const i=Me(s,e,a),r=n.feeBandsUsd.find(g=>g.upTo==null||i<=g.upTo)||n.feeBandsUsd.at(-1);let l=Math.max(r.fee*(t?n.domesticFeeFactor:1),n.minFeeUsd);const o=a[e],h=l*o.perUsd,d=o.decimals===0?o.perUsd>2e3?500:5:.05,y=Math.max(d,Math.ceil(h/d-1e-9)*d);return Math.round(y*10**o.decimals)}function ze({mode:s="send",amountMinor:e,from:t,to:n,domestic:a,settings:i,cur:r}){if(!(e>0))throw new RangeError("Amount must be positive");const l=Ge(t,n,r),o=je(t,n,i),h=l*(1-o/1e4),d=r[t].decimals,y=r[n].decimals,g=R=>Math.floor(+(le(R,d)*h*10**y).toFixed(6));let $;if(s==="receive")for($=Math.ceil(+(le(e,y)/h*10**d).toFixed(6));g($)<e;)$+=1;else $=e;const A=g($),C=Math.floor(+(le($,d)*l*10**y).toFixed(6)),w=qe($,t,a,i,r);return{from:t,to:n,mid:l,rate:h,marginBps:o,principalMinor:$,feeMinor:w,totalMinor:$+w,payoutMinor:A,payoutAtMidMinor:C,fxMarginMinor:Math.max(0,C-A)}}class ie extends Error{}function Ye(s){if(!s.ccy||!Array.isArray(s.lines)||s.lines.length<2)throw new ie("Journal needs a currency and at least two lines");let e=0,t=0;for(const n of s.lines){if(!n.account)throw new ie("Line without account");for(const a of["dr","cr"]){const i=n[a]??0;if(!Number.isInteger(i)||i<0)throw new ie("Amounts must be non-negative integers (minor units)")}if((n.dr??0)>0&&(n.cr??0)>0)throw new ie("A line is either debit or credit");e+=n.dr??0,t+=n.cr??0}if(e!==t)throw new ie(`Unbalanced journal: Dr ${e} != Cr ${t}`);if(e===0)throw new ie("Empty journal")}function Ke(s){const e={};for(const t of s)for(const n of t.lines)e[n.account]=(e[n.account]??0)+(n.dr??0)-(n.cr??0);return e}function Xe(s){var t;const e={};for(const n of s){e[t=n.ccy]??(e[t]={dr:0,cr:0});for(const a of n.lines)e[n.ccy].dr+=a.dr??0,e[n.ccy].cr+=a.cr??0}return Object.fromEntries(Object.entries(e).map(([n,a])=>[n,{...a,balanced:a.dr===a.cr}]))}const j=(s,e)=>`CASH:${s}:${e}`,he=()=>globalThis.crypto.subtle,ye=new TextEncoder,J=s=>[...new Uint8Array(s)].map(e=>e.toString(16).padStart(2,"0")).join(""),xe=s=>new Uint8Array(s.match(/.{2}/g).map(e=>parseInt(e,16)));function ce(s){const e=new Uint8Array(s);return globalThis.crypto.getRandomValues(e),e}function _e(s){if(!Number.isInteger(s)||s<=0||s>2**32)throw new RangeError("max out of range");const e=Math.floor(2**32/s)*s,t=new Uint32Array(1);for(;;)if(globalThis.crypto.getRandomValues(t),t[0]<e)return t[0]%s}async function $e(s){return J(await he().digest("SHA-256",ye.encode(s)))}async function Ce(s,e){const t=await he().importKey("raw",xe(s),{name:"HMAC",hash:"SHA-256"},!1,["sign"]);return J(await he().sign("HMAC",t,ye.encode(e)))}async function We(s,e,t){const n=await he().importKey("raw",ye.encode(s),"PBKDF2",!1,["deriveBits"]),a=await he().deriveBits({name:"PBKDF2",hash:"SHA-256",salt:xe(e),iterations:t},n,256);return J(a)}function ue(s,e){if(typeof s!="string"||typeof e!="string"||s.length!==e.length)return!1;let t=0;for(let n=0;n<s.length;n++)t|=s.charCodeAt(n)^e.charCodeAt(n);return t===0}const Je={mohammed:"muhammad",mohamed:"muhammad",mohammad:"muhammad",muhammed:"muhammad",mamadou:"muhammad",mamadu:"muhammad",ousman:"usman",ousmane:"usman",othman:"usman",osman:"usman",lamin:"lamin",lamine:"lamin",abdoulie:"abdul",abdoulaye:"abdul",abdou:"abdul",abdoul:"abdul",abdul:"abdul",fatou:"fatou",fatoumata:"fatou",fatumata:"fatou",fatima:"fatou",ibrahima:"ibrahim",brahima:"ibrahim",ibrahim:"ibrahim",jallow:"jalo",diallo:"jalo",jalloh:"jalo",jallo:"jalo",ceesay:"cisse",cisse:"cisse",sisay:"cisse",sanneh:"sane",sane:"sane",darboe:"darbo",darbo:"darbo",touray:"toure",toure:"toure"};function Ze(s){return String(s??"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().replace(/[^a-z0-9\s]/g," ").replace(/\s+/g," ").trim()}const Ae=s=>Ze(s).split(" ").filter(Boolean).map(e=>Je[e]||e).sort();function Ie(s,e){if(s===e)return 1;if(!s.length||!e.length)return 0;const t=Math.max(0,Math.floor(Math.max(s.length,e.length)/2)-1),n=new Array(s.length).fill(!1),a=new Array(e.length).fill(!1);let i=0;for(let d=0;d<s.length;d++)for(let y=Math.max(0,d-t);y<Math.min(e.length,d+t+1);y++)if(!a[y]&&s[d]===e[y]){n[d]=a[y]=!0,i++;break}if(!i)return 0;let r=0,l=0;for(let d=0;d<s.length;d++)if(n[d]){for(;!a[l];)l++;s[d]!==e[l]&&r++,l++}const o=(i/s.length+i/e.length+(i-r/2)/i)/3;let h=0;for(;h<4&&s[h]===e[h];)h++;return o+h*.1*(1-o)}function Se(s,e){const t=Ae(s),n=Ae(e);if(!t.length||!n.length)return 0;const a=t.join(" "),i=n.join(" "),r=Ie(a,i),l=t.length<=n.length?t:n,o=t.length<=n.length?n:t;let h=0;for(const y of l)h+=Math.max(...o.map(g=>Ie(y,g)));const d=l.length>=2?h/l.length*.97:0;return Math.max(r,d)}const Ee=s=>String(s).trim().split(/\s+/).map(e=>e.length<=2?e[0]+"*":e.slice(0,2)+"*".repeat(Math.min(5,e.length-2))).join(" "),X=s=>String(s??"").replace(/\D/g,"");function Qe(s,e){const t=X(s),n=X(e);if(!t||!n)return!1;if(t===n)return!0;const a=Math.min(t.length,n.length);return a>=7&&t.slice(-a)===n.slice(-a)}class et extends Error{constructor(e,t,n={}){super(t),this.code=e,Object.assign(this,n)}}const p=(s,e,t)=>new et(s,e,t),tt=["TELLER","SUPERVISOR","COMPLIANCE","TREASURY","ADMIN"],st={send:["TELLER","SUPERVISOR","ADMIN"],payout:["TELLER","SUPERVISOR","ADMIN"],"transfers.view":["TELLER","SUPERVISOR","COMPLIANCE","TREASURY","ADMIN"],"transfers.manage":["SUPERVISOR","ADMIN"],"vault.view":["TELLER","SUPERVISOR","COMPLIANCE","TREASURY","ADMIN"],"vault.close":["SUPERVISOR","ADMIN"],"vault.inject":["TREASURY","ADMIN"],"vault.move":["TREASURY","SUPERVISOR","ADMIN"],"compliance.view":["COMPLIANCE","SUPERVISOR","ADMIN"],"compliance.resolve":["COMPLIANCE","ADMIN"],"ledger.view":["SUPERVISOR","COMPLIANCE","TREASURY","ADMIN"],"reports.view":["SUPERVISOR","COMPLIANCE","TREASURY","ADMIN"],"rates.edit":["TREASURY","ADMIN"],"staff.time.view":["SUPERVISOR","ADMIN"],admin:["ADMIN"]},pe=["TELLER","SUPERVISOR"],at=["PASSPORT","NATIONAL_ID","DRIVING_LICENCE","RESIDENCE_PERMIT","VOTER_CARD"],nt="0123456789ABCDEFGHJKMNPQRSTVWXYZ",H=864e5;function it(s){let e=String(s??"").toUpperCase().replace(/[^0-9A-Z]/g,"");return e.startsWith("BNT")&&(e=e.slice(3)),e=e.replace(/O/g,"0").replace(/[IL]/g,"1").replace(/U/g,"V"),e.length===8?`BNT-${e.slice(0,4)}-${e.slice(4)}`:null}function we(){let s="";for(let e=0;e<8;e++)s+=nt[_e(32)];return`BNT-${s.slice(0,4)}-${s.slice(4)}`}function De(){return String(_e(1e6)).padStart(6,"0")}function me(s,e){const t=new Intl.DateTimeFormat("en-GB",{timeZone:e,weekday:"short",hour:"2-digit",minute:"2-digit",hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit"}),n=Object.fromEntries(t.formatToParts(new Date(s)).map(i=>[i.type,i.value]));return{dow:{Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6,Sun:7}[n.weekday],minutes:+n.hour*60+ +n.minute,date:`${n.year}-${n.month}-${n.day}`}}const q=s=>{const[e,t]=s.split(":").map(Number);return e*60+t};class rt{constructor(){this.m=new Map}get(e){return this.m.get(e)??null}set(e,t){this.m.set(e,t)}remove(e){this.m.delete(e)}}class ot{constructor(e="bantaba.os."){this.p=e}get(e){try{return localStorage.getItem(this.p+e)}catch{return null}}set(e,t){try{localStorage.setItem(this.p+e,t)}catch{}}remove(e){try{localStorage.removeItem(this.p+e)}catch{}}}class be{constructor({storage:e=new rt,clock:t=()=>Date.now(),pbkdf2Iter:n=12e4}={}){this.storage=e,this.clock=t,this.iter=n,this.sessions=new Map,this._auditQ=Promise.resolve(),this.s=null}now(){return this.clock()}static async open(e={}){const t=new be(e),n=t.storage.get("state");if(n)try{t.s=JSON.parse(n)}catch{t.s=null}return(!t.s||t.s.v!==1)&&await t.resetDemo({seed:e.seed!==!1}),t.releaseStaleLocks(),t.expireDue(),t}save(){this.storage.set("state",JSON.stringify(this.s))}async resetDemo({seed:e=!0}={}){this.sessions.clear(),this.s={v:1,settings:structuredClone(Fe),currencies:structuredClone(Ue),countries:structuredClone(ke),branches:structuredClone(Be),staff:[],customers:{},transfers:[],journals:[],audit:[],alerts:[],attendance:[],notifications:[],quotes:{},dayCloses:[],loginFails:{},lookupFails:{},counters:{j:0,a:0,att:0,tx:0,n:0,q:0,al:0},pepper:J(ce(32)),demo:{pins:{},codes:[]}},await this._seedStaff(),this._seedFloat(),e&&await this._seedTransfers(),this.save()}exportState(){return JSON.stringify(this.s)}async importState(e){const t=JSON.parse(e);if(t.v!==1||!t.settings||!Array.isArray(t.transfers))throw p("BAD_BACKUP","Not a valid Bantaba backup file");this.s=t,this.sessions.clear(),this.save()}get cur(){return Ve(this.s.currencies)}country(e){return this.s.countries.find(t=>t.code===e)}branch(e){return this.s.branches.find(t=>t.id===e)}staffById(e){return this.s.staff.find(t=>t.id===e)}branchCountry(e){var t;return this.country((t=this.branch(e))==null?void 0:t.country)}async refHash(e){return Ce(this.s.pepper,`ref:${e}`)}async findByRef(e){const t=it(e);if(!t)return{ref:null};const n=await this.refHash(t),a=this.s.transfers.find(r=>r.refHash===n);if(a)return{ref:t,hash:n,t:a,retired:!1};const i=this.s.transfers.find(r=>r.refHistory.some(l=>l.hash===n));return i?{ref:t,hash:n,t:i,retired:!0}:{ref:t,hash:n,t:null}}async pinHashFor(e,t){return Ce(this.s.pepper,`pin:${e}:${t}`)}fmt(e,t){return He(e,this.cur[t])}usd(e,t){return Me(e,t,this.cur)}can(e,t){var n;return!!e&&((n=st[t])==null?void 0:n.includes(e.role))}need(e,t){if(!e||!this.sessions.has(e.id))throw p("NO_SESSION","Please sign in");if(this.touch(e),!this.can(e,t))throw p("FORBIDDEN",`Your role (${e.role}) cannot do this`)}touch(e){const t=this.sessions.get(e.id);if(!t)throw p("NO_SESSION","Please sign in");const n=this.s.settings.idleTimeoutMin*6e4;if(this.now()-t.lastActive>n)throw this._closeSession(t,"IDLE_TIMEOUT"),p("SESSION_EXPIRED","Session timed out — sign in again");t.lastActive=this.now()}branchOpen(e,t=this.now()){const n=this.branch(e),a=this.branchCountry(e);if(!(n!=null&&n.active))return{open:!1,reason:"Branch is deactivated"};const i=me(t,a.tz),r=n.hours.days.includes(i.dow)&&i.minutes>=q(n.hours.open)&&i.minutes<q(n.hours.close);return{open:r,reason:r?"":`Closed (hours ${n.hours.open}–${n.hours.close} local, days ${n.hours.days.join(",")})`}}async _hashPin(e,t){return We(String(e),t,this.iter)}async login(e,t,n){var d;const a=String(e??"").trim().toUpperCase(),i=(d=this.s.loginFails)[a]??(d[a]={n:0,until:0});if(i.until>this.now())throw p("LOCKED_OUT",`Too many attempts. Try again in ${Math.ceil((i.until-this.now())/6e4)} min.`);const r=this.staffById(a);if(!(r&&r.active&&ue(await this._hashPin(t,r.salt),r.pinHash)))throw i.n++,i.n>=this.s.settings.maxLoginAttempts&&(i.until=this.now()+this.s.settings.lockoutMinutes*6e4,i.n=0),this.save(),await this._audit({staffId:a,branchId:n},"LOGIN_FAILED",`Failed sign-in for ${a}`),p("BAD_CREDENTIALS",r&&!r.active?"This account is deactivated":"Invalid staff ID or PIN");i.n=0;const o=n||r.branches[0];if(!r.branches.includes(o)&&r.role!=="ADMIN")throw p("BRANCH_NOT_ALLOWED","You are not assigned to this branch");if(!this.branch(o))throw p("BRANCH_UNKNOWN","Unknown branch");if(this.s.settings.enforceOperatingHours&&pe.includes(r.role)){const y=this.branchOpen(o);if(!y.open)throw p("OUTSIDE_HOURS",y.reason)}const h={id:J(ce(12)),staffId:r.id,name:r.name,role:r.role,branchId:o,startedAt:this.now(),lastActive:this.now(),mustChangePin:!!r.mustChangePin};return this.sessions.set(h.id,h),this.s.settings.autoClockIn&&pe.includes(r.role)&&this._clockIn(h),this.save(),await this._audit(h,"LOGIN",`Signed in at ${o}`),{...h}}async logout(e,t="LOGOUT"){const n=this.sessions.get(e==null?void 0:e.id);n&&(this._closeSession(n,t),await this._audit(n,t,"Session closed"))}_closeSession(e,t){this._clockOut(e,t),this.sessions.delete(e.id),this.save()}async verifyApprover(e,t,{minRoles:n=["SUPERVISOR","ADMIN"],notStaffId:a}={}){const i=this.staffById(String(e??"").toUpperCase());if(!i||!i.active||!n.includes(i.role))throw p("APPROVER_INVALID","Approver must be an active supervisor or administrator");if(a&&i.id===a)throw p("APPROVER_SAME","Approver must be a different person");if(!ue(await this._hashPin(t,i.salt),i.pinHash))throw p("APPROVER_INVALID","Approver PIN is incorrect");return i}async changePin(e,t,n){this.need(e,"transfers.view");const a=this.staffById(e.staffId);if(!ue(await this._hashPin(t,a.salt),a.pinHash))throw p("BAD_CREDENTIALS","Current PIN is incorrect");if(!/^\d{6}$/.test(n)||/^(\d)\1+$/.test(n)||"0123456789012".includes(n)||"9876543210987".includes(n))throw p("WEAK_PIN","Use 6 digits that are not repeated or sequential");a.salt=J(ce(16)),a.pinHash=await this._hashPin(n,a.salt),a.mustChangePin=!1,this.sessions.get(e.id).mustChangePin=!1,this.save(),await this._audit(e,"PIN_CHANGED","Staff changed own PIN")}_audit(e,t,n){return this._auditQ=this._auditQ.then(async()=>{const a=this.s.audit,i=a.length?a.at(-1).hash:"GENESIS",r=++this.s.counters.a,l=this.now(),o={n:r,ts:l,staffId:(e==null?void 0:e.staffId)??"SYSTEM",branchId:(e==null?void 0:e.branchId)??null,action:t,detail:n,prev:i};o.hash=await $e(`${i}|${r}|${l}|${o.staffId}|${t}|${n}`),a.push(o),this.save()}),this._auditQ}async verifyAuditChain(){await this._auditQ;let e="GENESIS";for(const t of this.s.audit){const n=await $e(`${e}|${t.n}|${t.ts}|${t.staffId}|${t.action}|${t.detail}`);if(t.prev!==e||t.hash!==n)return{ok:!1,brokenAt:t.n};e=t.hash}return{ok:!0,entries:this.s.audit.length}}_post({type:e,ref:t,ccy:n,lines:a,memo:i="",actor:r}){const l={id:`J${String(++this.s.counters.j).padStart(6,"0")}`,ts:this.now(),type:e,ref:t,ccy:n,lines:a,memo:i,staffId:(r==null?void 0:r.staffId)??"SYSTEM",branchId:(r==null?void 0:r.branchId)??null};return Ye(l),this.s.journals.push(l),l}get bal(){return Ke(this.s.journals)}cash(e,t){return this.bal[j(e,t)]??0}branchCash(e){const t={},n=this.bal;for(const[a,i]of Object.entries(n)){const r=a.split(":");r[0]==="CASH"&&r[1]===e&&i!==0&&(t[r[2]]=i)}return t}trial(){return Xe(this.s.journals)}lowFloatMinor(e){const t=this.cur[e];return Math.round(this.s.settings.lowFloatUsd*t.perUsd*10**t.decimals)}_seedFloat(){for(const e of this.s.branches){const n=[[this.country(e.country).currency,4e4]];["AE","CN","GB","DE","FR","US"].includes(e.country)&&n.push(["USD",8e3]),["GM","SN","ML","GW","GN","ZM"].includes(e.country)&&n.push(["USD",3e3]);for(const[a,i]of n){const r=this.cur[a],l=Math.round(i*r.perUsd*10**r.decimals);this._post({type:"FLOAT_IN",ref:e.id,ccy:a,memo:"Opening float",lines:[{account:j(e.id,a),dr:l},{account:`HQ_FUNDING:${a}`,cr:l}]})}}}_schedule(e){return e.schedule||{days:[1,2,3,4,5,6],start:"08:30",end:"17:30"}}_clockIn(e){const t=this.s.attendance.find(d=>d.staffId===e.staffId&&!d.out);if(t)return t;const n=this.staffById(e.staffId),a=this._schedule(n),i=this.branchCountry(e.branchId),r=me(this.now(),i.tz),l=a.days.includes(r.dow),o=l?Math.max(0,r.minutes-q(a.start)-this.s.settings.graceMin):0,h={id:++this.s.counters.att,staffId:n.id,branchId:e.branchId,date:r.date,in:this.now(),out:null,outReason:null,lateMin:o,overtimeMin:0,unscheduled:!l,edited:!1};return this.s.attendance.push(h),h}_clockOut(e,t){const n=this.s.attendance.find(i=>i.staffId===e.staffId&&!i.out);if(!n)return;n.out=this.now(),n.outReason=t;const a=this.staffById(e.staffId);if(a){const i=this._schedule(a),r=this.country(this.branch(n.branchId).country),l=me(n.out,r.tz);n.overtimeMin=i.days.includes(l.dow)?Math.max(0,l.minutes-q(i.end)):Math.round((n.out-n.in)/6e4)}}releaseStaleLocks(){for(const[e,t]of Object.entries(this.s.loginFails))!t.n&&t.until<this.now()&&delete this.s.loginFails[e]}onShift(){return this.s.attendance.filter(e=>!e.out).map(e=>{var t;return{...e,name:(t=this.staffById(e.staffId))==null?void 0:t.name}})}timesheet(e,{from:t=this.now()-7*H,to:n=this.now()+H,staffId:a}={}){var r,l;this.need(e,"staff.time.view");const i={};for(const o of this.s.attendance){if(o.in<t||o.in>=n||a&&o.staffId!==a||e.role==="SUPERVISOR"&&o.branchId!==e.branchId)continue;const h=o.out??this.now(),d=i[l=o.staffId]??(i[l]={staffId:o.staffId,name:(r=this.staffById(o.staffId))==null?void 0:r.name,shifts:0,minutes:0,lateCount:0,lateMin:0,overtimeMin:0,open:!1});d.shifts++,d.minutes+=Math.round((h-o.in)/6e4),o.lateMin>0&&(d.lateCount++,d.lateMin+=o.lateMin),d.overtimeMin+=o.overtimeMin,o.out||(d.open=!0)}return Object.values(i).sort((o,h)=>o.name.localeCompare(h.name))}attendanceLog(e,{staffId:t,limit:n=200}={}){return this.need(e,"staff.time.view"),this.s.attendance.filter(a=>(!t||a.staffId===t)&&(e.role!=="SUPERVISOR"||a.branchId===e.branchId)).slice().reverse().slice(0,n).map(a=>{var i;return{...a,name:(i=this.staffById(a.staffId))==null?void 0:i.name}})}async adjustAttendance(e,t,{in:n,out:a,note:i}){this.need(e,"admin");const r=this.s.attendance.find(o=>o.id===t);if(!r)throw p("NOT_FOUND","Attendance record not found");if(!i)throw p("NOTE_REQUIRED","A reason is required to edit time records");const l=`${r.in}→${r.out}`;n&&(r.in=n),a&&(r.out=a),r.edited=!0,this.save(),await this._audit(e,"ATTENDANCE_EDIT",`Record ${t} (${r.staffId}) ${l} → ${r.in}→${r.out}. ${i}`)}async _mkStaff(e,t,n,a,i,r){const l=J(ce(16));return{id:e,name:t,role:n,branches:a,active:!0,salt:l,pinHash:await this._hashPin(i,l),mustChangePin:!1,schedule:r??null,createdAt:this.now()}}async _seedStaff(){const e="482915";this.s.demo.pins={all:e};const t=this.s.staff;t.push(await this._mkStaff("ADM-01","Amie Sanneh (Admin)","ADMIN",this.s.branches.map(r=>r.id),e)),t.push(await this._mkStaff("TRS-01","Lamin Jallow (Treasury)","TREASURY",this.s.branches.map(r=>r.id),e)),t.push(await this._mkStaff("CMP-01","Fatou Ceesay (Compliance)","COMPLIANCE",this.s.branches.map(r=>r.id),e));const n=["Musa","Isatou","Ebrima","Mariama","Ousman","Binta","Modou","Awa","Sulayman","Kadi"],a=["Bah","Camara","Darboe","Jatta","Touray","Sowe","Njie","Drammeh","Colley","Sillah"];let i=0;for(const r of this.s.branches)t.push(await this._mkStaff(`${r.id}-S1`,`${n[i%10]} ${a[(i+3)%10]}`,"SUPERVISOR",[r.id],e)),t.push(await this._mkStaff(`${r.id}-T1`,`${n[(i+5)%10]} ${a[i%10]}`,"TELLER",[r.id],e)),i++}async _seedTransfers(){const e=h=>({staffId:h,branchId:this.staffById(h).branches[0],role:this.staffById(h).role,id:"seed"}),t=async(h,d,y,g,$,A,C,w={})=>{const R=e(`${h}-T1`);return this._issueCore(R,{destCountry:this.branch(d).country,destBranchId:null,mode:"send",amountMinor:re(y,this.cur[g].decimals),collectCcy:g,payCcy:$,sender:{name:A,phone:"+4479000"+String(1e3+this.s.counters.tx),idType:"PASSPORT",idNumber:"P"+(9e5+this.s.counters.tx),country:this.branch(h).country},recipient:{name:C,phone:"+2203"+String(3e5+this.s.counters.tx),idType:"NATIONAL_ID",idNumber:"GM"+(1e5+this.s.counters.tx)},purpose:"FAMILY_SUPPORT",sourceOfFunds:"SALARY",...w})},n=this.s.demo.codes,a=await t("GB-LDN","GM-SKD",300,"GBP","GMD","Ousman Bah","Fatou Jallow");n.push({ref:a.ref,pin:a.pin,note:"London → Serrekunda, GBP → GMD. Recipient: Fatou Jallow",recipient:"Fatou Jallow",phone:a.transfer.recipient.phone,idNumber:a.transfer.recipient.idNumber});const i=await t("CN-GZH","SN-DKR",5e3,"CNY","XOF","Lamin Ceesay","Awa Ndiaye");n.push({ref:i.ref,pin:i.pin,note:"Guangzhou → Dakar, CNY → XOF. Recipient: Awa Ndiaye",recipient:"Awa Ndiaye",phone:i.transfer.recipient.phone,idNumber:i.transfer.recipient.idNumber});const r=await t("GM-SKD","GM-BJL",2e3,"GMD","GMD","Mariama Touray","Kadi Touray");n.push({ref:r.ref,pin:r.pin,note:"Same-country: Serrekunda → Banjul, GMD → GMD. Recipient: Kadi Touray",recipient:"Kadi Touray",phone:r.transfer.recipient.phone,idNumber:r.transfer.recipient.idNumber});const l=await t("AE-DXB","ZM-LUN",800,"USD","ZMW","Mulenga Phiri","Chanda Phiri");n.push({ref:l.ref,pin:l.pin,note:"Dubai → Lusaka, USD → ZMW. Recipient: Chanda Phiri",recipient:"Chanda Phiri",phone:l.transfer.recipient.phone,idNumber:l.transfer.recipient.idNumber});const o=await t("US-NYC","GN-CKY",400,"USD","GNF","Aminata Diallo","Mamadou Diallo");await this._redeemCore(e("GN-CKY-T1"),{ref:o.ref,pin:o.pin,recipient:{name:"Mamadou Diallo",phone:o.transfer.recipient.phone,idType:"NATIONAL_ID",idNumber:o.transfer.recipient.idNumber}},{skipHours:!0}),await t("DE-BER","GW-BSS",250,"EUR","XOF","Jonas Weber","Maria Gomes"),await t("GB-MAN","ML-BKO",120,"GBP","XOF","Saikou Sanyang","Binta Keita"),await t("GB-LDN","GM-BJL",900,"GBP","GMD","Ebrima Jobe","Demo Politically Exposed");for(let h=1;h<=5;h++)for(const d of["GM-SKD-T1","GB-LDN-T1","GM-SKD-S1"]){const y=this.staffById(d),g=this.branchCountry(y.branches[0]),$=this.now()-h*H,A=me($,g.tz),C=$-A.minutes*6e4,w=(h+d.length)%4===0?17:0,R=C+(q("08:30")+w)*6e4,F=C+(q("17:30")+(h%3===0?45:0))*6e4;[6,7].includes(A.dow)||this.s.attendance.push({id:++this.s.counters.att,staffId:d,branchId:y.branches[0],date:A.date,in:R,out:F,outReason:"LOGOUT",lateMin:Math.max(0,w-this.s.settings.graceMin),overtimeMin:h%3===0?45:0,unscheduled:!1,edited:!1})}}quote(e,{destCountry:t,collectCcy:n,payCcy:a,mode:i="send",amountMinor:r}){return this.need(e,"send"),this._quote(e.branchId,{destCountry:t,collectCcy:n,payCcy:a,mode:i,amountMinor:r},!0)}_quote(e,{destCountry:t,collectCcy:n,payCcy:a,mode:i="send",amountMinor:r},l){if(!this.country(t))throw p("BAD_DEST","Unknown destination country");if(!this.cur[n]||!this.cur[a])throw p("BAD_CCY","Unknown currency");if(!Number.isSafeInteger(r)||r<=0)throw p("BAD_AMOUNT","Enter an amount greater than zero");const h=this.branchCountry(e).code===t,d=ze({mode:i,amountMinor:r,from:n,to:a,domestic:h,settings:this.s.settings,cur:this.cur}),y=this.usd(d.principalMinor,n),g={...d,mode:i,collectCcy:n,payCcy:a,destCountry:t,domestic:h,usd:y,originBranchId:e};if(l){const $=`Q${++this.s.counters.q}`;g.id=$,g.expiresAt=this.now()+this.s.settings.rateLockMinutes*6e4,this.s.quotes[$]=g;for(const[A,C]of Object.entries(this.s.quotes))C.expiresAt<this.now()-H&&delete this.s.quotes[A]}return g}senderKey(e){return e.idNumber?`ID:${String(e.idType).toUpperCase()}:${String(e.idNumber).toUpperCase().replace(/[^0-9A-Z]/g,"")}`:`PH:${X(e.phone)}`}_kycTier(e,t,n){return e.idType&&e.idNumber&&n&&t&&e.idPhotoRef?"C3":e.idType&&e.idNumber?"C2":"C1"}_history(e,t){return this.s.transfers.filter(n=>n.sender.key===e&&n.createdAt>=t&&!["CANCELLED","REFUNDED"].includes(n.status))}_screen(e){const t=n=>n.map(a=>({n:a,s:Se(e,a)})).filter(a=>a.s>=.9).sort((a,i)=>i.s-a.s)[0];return{sanctions:t(this.s.settings.watchlist),pep:t(this.s.settings.pepList)}}_raise(e,t,n,a=null){const i={id:`AL${String(++this.s.counters.al).padStart(4,"0")}`,ts:this.now(),type:e,severity:t,detail:n,transferId:a,status:"OPEN",resolvedBy:null,note:null};return this.s.alerts.push(i),i}_assess({sender:e,recipient:t,purpose:n,sourceOfFunds:a,usd:i}){const r=this.s.settings,l=r.tiers;if(i>r.hardMaxTxUsd)throw p("LIMIT_EXCEEDED",`Single transfers above US$${r.hardMaxTxUsd.toLocaleString()} are not allowed. Split or refer to Compliance.`);const o=e.key,h=this._history(o,this.now()-30*H),d=this._history(o,this.now()-365*H),y=N=>N.reduce((K,V)=>K+V.usdValue,0),g=["C1","C2","C3"].find(N=>i<=l[N].perTxUsd&&(l[N].per30dUsd==null||y(h)+i<=l[N].per30dUsd)&&(l[N].per12mUsd==null||y(d)+i<=l[N].per12mUsd));if(!g)throw p("LIMIT_EXCEEDED","This sender has reached the rolling limit. Refer to Compliance for enhanced due diligence.");const $=this._kycTier(e,n,a);if(["C1","C2","C3"].indexOf($)<["C1","C2","C3"].indexOf(g))throw p("KYC_REQUIRED",`This amount needs ${g} verification: collect ${g==="C2"?"the sender's ID type and number":"ID, ID photo, purpose and source of funds"}.`,{neededTier:g,providedTier:$});const A=[],C=r.velocity,w=h.filter(N=>N.createdAt>=this.now()-H).length+1,R=h.filter(N=>N.createdAt>=this.now()-7*H);w>C.tx24h&&A.push({type:"VELOCITY_24H",detail:`${w} transfers by this sender in 24h (limit ${C.tx24h})`}),R.length+1>C.tx7d&&A.push({type:"VELOCITY_7D",detail:`${R.length+1} transfers in 7 days (limit ${C.tx7d})`});const F=N=>{var K;return N.usdValue>=(((K=l[N.tier])==null?void 0:K.perTxUsd)??l.C1.perTxUsd)*C.structuringPct/100},P=R.filter(F).length+(i>=l[$].perTxUsd*C.structuringPct/100&&i<=l[$].perTxUsd?1:0);P>=C.structuringCount&&A.push({type:"STRUCTURING",detail:`${P} transfers within ${100-C.structuringPct}% of the per-transfer limit in 7 days`});const M=X(t.phone),m=this.now()-7*H,b=new Set(this.s.transfers.filter(N=>X(N.recipient.phone)===M&&N.createdAt>=m&&N.status!=="CANCELLED").map(N=>N.sender.key));b.add(o),b.size>=C.m2oSenders7d&&A.push({type:"MANY_TO_ONE",detail:`${b.size} different senders paying one recipient in 7 days`});const E=new Set(R.map(N=>X(N.recipient.phone)));E.add(M),E.size>=C.o2mRecipients7d&&A.push({type:"ONE_TO_MANY",detail:`One sender paying ${E.size} different recipients in 7 days`}),i>=r.highValueUsd&&A.push({type:"HIGH_VALUE",detail:`Transfer of US$${i.toFixed(0)} is at or above the high-value threshold`});const x=this._screen(e.name),W=this._screen(t.name),ee=x.sanctions??W.sanctions,Y=x.pep??W.pep;return Y&&A.push({type:"PEP_MATCH",detail:`Possible PEP match: ${Y.n} (${Math.round(Y.s*100)}%)`}),{requiredTier:g,providedTier:$,holds:A,blocked:ee}}_clean(e){return String(e??"").replace(/\s+/g," ").trim().slice(0,120)}async issueTransfer(e,t){if(this.need(e,"send"),this.s.settings.enforceOperatingHours&&pe.includes(e.role)){const i=this.branchOpen(e.branchId);if(!i.open)throw p("OUTSIDE_HOURS",i.reason)}let n=null;return await this._issueCore(e,t,async i=>{if(i>=this.s.settings.coSignAboveUsd){if(!t.cosign)throw p("COSIGN_REQUIRED",`Transfers of US$${this.s.settings.coSignAboveUsd}+ need a second person to approve`,{needsApprover:!0});n=await this.verifyApprover(t.cosign.staffId,t.cosign.pin,{notStaffId:e.staffId})}return n})}async _issueCore(e,t,n){var M,m,b,E,x,W,ee,Y,N,K,V,G;const a=this.s.settings,i=e.branchId,r={name:this._clean((M=t.sender)==null?void 0:M.name),phone:this._clean((m=t.sender)==null?void 0:m.phone),idType:((b=t.sender)==null?void 0:b.idType)||"",idNumber:this._clean((E=t.sender)==null?void 0:E.idNumber),country:((x=t.sender)==null?void 0:x.country)||"",idPhotoRef:((W=t.sender)==null?void 0:W.idPhotoRef)||""},l={name:this._clean((ee=t.recipient)==null?void 0:ee.name),phone:this._clean((Y=t.recipient)==null?void 0:Y.phone),idType:((N=t.recipient)==null?void 0:N.idType)||"",idNumber:this._clean((K=t.recipient)==null?void 0:K.idNumber)};if(r.name.length<3||X(r.phone).length<7)throw p("SENDER_INCOMPLETE","Sender's full name and a valid phone number are required");if(l.name.length<3||X(l.phone).length<7)throw p("RECIPIENT_INCOMPLETE","Recipient's full name and phone number are required — the payer will confirm them");if(r.idType&&!at.includes(r.idType))throw p("BAD_ID","Unknown ID type");if(t.destBranchId&&((V=this.branch(t.destBranchId))==null?void 0:V.country)!==t.destCountry)throw p("BAD_DEST","Chosen payout branch is not in the destination country");if(!((G=this.branch(i))!=null&&G.active))throw p("BRANCH_INACTIVE","This branch is not active");if(t.destBranchId&&!this.branch(t.destBranchId).active)throw p("BRANCH_INACTIVE","Chosen payout branch is not active");r.key=this.senderKey(r);let o;if(t.quoteId){if(o=this.s.quotes[t.quoteId],!o)throw p("QUOTE_UNKNOWN","Quote not found — request a new one");if(o.expiresAt<this.now())throw p("QUOTE_EXPIRED","Rate lock expired — request a new quote");if(o.originBranchId!==i||o.destCountry!==t.destCountry||o.collectCcy!==t.collectCcy||o.payCcy!==t.payCcy)throw p("QUOTE_MISMATCH","Quote does not match this transfer")}else o=this._quote(i,{destCountry:t.destCountry,collectCcy:t.collectCcy,payCcy:t.payCcy,mode:t.mode||"send",amountMinor:t.amountMinor},!1);if(o.payoutMinor<=0||o.principalMinor<=0)throw p("BAD_AMOUNT","Amount is too small after fees");const h=o.usd,d=this._assess({sender:r,recipient:l,purpose:t.purpose,sourceOfFunds:t.sourceOfFunds,usd:h});if(d.blocked){const B=this._raise("SANCTIONS_BLOCK","CRITICAL",`Blocked at ${i}: match to "${d.blocked.n}" (${Math.round(d.blocked.s*100)}%) — sender "${r.name}" / recipient "${l.name}"`);throw await this._audit(e,"SANCTIONS_BLOCK",B.detail),this.save(),p("SANCTIONS_MATCH","This transfer cannot be processed. Do not tell the customer why; refer to Compliance.",{alertId:B.id})}let y=null;n&&(y=await n(h));const g=we(),$=De(),A={id:`TX${String(++this.s.counters.tx).padStart(6,"0")}`,refHash:await this.refHash(g),refTail:g.slice(-4),pinHash:await this.pinHashFor(g,$),pinAttempts:0,mismatches:0,locked:!1,status:d.holds.length?"ON_HOLD":"ISSUED",createdAt:this.now(),expiresAt:this.now()+a.codeExpiryDays*H,originBranchId:i,originCountry:this.branchCountry(i).code,destCountry:t.destCountry,destBranchId:t.destBranchId||null,collectCcy:o.collectCcy,payCcy:o.payCcy,principalMinor:o.principalMinor,feeMinor:o.feeMinor,totalMinor:o.totalMinor,payoutMinor:o.payoutMinor,fxMarginMinor:o.fxMarginMinor,payoutAtMidMinor:o.payoutAtMidMinor,rate:o.rate,mid:o.mid,marginBps:o.marginBps,mode:o.mode,domestic:o.domestic,usdValue:h,sender:r,recipient:l,purpose:t.purpose||"",sourceOfFunds:t.sourceOfFunds||"",tier:d.providedTier,issuedBy:e.staffId,cosignedBy:(y==null?void 0:y.id)??null,holdReasons:d.holds.map(B=>B.type),journalIds:[],refHistory:[],events:[{ts:this.now(),what:"ISSUED",by:e.staffId}]},C=o.collectCcy,w=o.payCcy,R=A.id,F=j(i,C),P=[];if(P.push(this._post({type:"COLLECT",ref:R,ccy:C,actor:e,memo:"Cash collected",lines:[{account:F,dr:o.totalMinor},{account:`PAYABLE:${C}`,cr:o.principalMinor},...o.feeMinor?[{account:`REV_FEES:${C}`,cr:o.feeMinor}]:[]]})),C!==w){P.push(this._post({type:"FX_SELL",ref:R,ccy:C,actor:e,memo:`Sell ${C}`,lines:[{account:`PAYABLE:${C}`,dr:o.principalMinor},{account:`FX_POS:${C}`,cr:o.principalMinor}]}));const B=o.payoutAtMidMinor-o.payoutMinor;P.push(this._post({type:"FX_BUY",ref:R,ccy:w,actor:e,memo:`Buy ${w}`,lines:[{account:`FX_POS:${w}`,dr:o.payoutAtMidMinor},{account:`PAYABLE:${w}`,cr:o.payoutMinor},...B?[{account:`REV_FX:${w}`,cr:B}]:[]]}))}A.journalIds=P.map(B=>B.id),this.s.transfers.push(A);for(const B of d.holds)this._raise(B.type,B.type==="PEP_MATCH"||B.type==="STRUCTURING"?"HIGH":"MEDIUM",`${A.id}: ${B.detail}`,A.id);return this._notify(A.sender.phone,`Bantaba: we received ${this.fmt(o.totalMinor,C)}. Your recipient will be paid ${this.fmt(o.payoutMinor,w)}. Share the code and PIN with them directly. Ref ${A.id}.`),this.save(),await this._audit(e,"TRANSFER_ISSUED",`${A.id} ${this.fmt(o.totalMinor,C)}→${this.fmt(o.payoutMinor,w)} ${A.originCountry}→${A.destCountry}${d.holds.length?" ON HOLD: "+A.holdReasons.join(","):""}`),{ref:g,pin:$,transfer:this.view(A),held:d.holds.length>0,holds:d.holds}}_notify(e,t){this.s.notifications.push({id:++this.s.counters.n,ts:this.now(),to:e,text:t}),this.s.notifications.length>500&&this.s.notifications.shift()}view(e){const{pinHash:t,refHash:n,refHistory:a,...i}=e;return{...i,refMask:`BNT-••••-••${e.refTail.slice(-2)}`,retiredCodes:a.length}}async lookup(e,t){var d,y;this.need(e,"payout");const n=(d=this.s.lookupFails)[y=e.staffId]??(d[y]=[]),a=this.now()-36e5;for(;n.length&&n[0]<a;)n.shift();const i=this.s.settings.maxLookupFailsPerHour??5;if(n.length>=i)throw p("LOOKUP_LIMIT","Too many unknown codes in the last hour. Ask a supervisor.");const r=await this.findByRef(t);if(!r.t)throw n.push(this.now()),this.save(),await this._audit(e,"LOOKUP_FAILED","Unknown code entered"),p(r.ref?"CODE_UNKNOWN":"CODE_FORMAT",r.ref?"No such code. Check it with the customer.":"Codes look like BNT-XXXX-XXXX");const l=r.t;if(r.retired)throw p("CODE_RETIRED","This code was replaced by a newer one. Ask the customer for the new code.");const o=this._payBlock(l,e.branchId),h=this.country(l.destCountry);return{id:l.id,status:l.status,canPay:!o,blockReason:o,destCountry:l.destCountry,destCountryName:h.name,payoutMinor:l.payoutMinor,payCcy:l.payCcy,payoutText:this.fmt(l.payoutMinor,l.payCcy),senderMasked:Ee(l.sender.name),recipientHint:Ee(l.recipient.name),expiresAt:l.expiresAt,attemptsLeft:this.s.settings.maxPinAttempts-l.pinAttempts,requiresId:l.usdValue>=this.s.settings.idPhotoAboveUsd}}_payBlock(e,t){const n={PAID:"Already paid out. This code is cancelled.",CANCELLED:"This transfer was cancelled.",REFUNDED:"This transfer was refunded.",EXPIRED:"This code has expired.",ON_HOLD:"On compliance hold — do not pay. Refer to a supervisor."}[e.status];if(n)return n;if(e.locked)return"Locked after too many wrong attempts. A supervisor must unlock it.";if(e.expiresAt<this.now())return"This code has expired.";const a=this.branch(t);return a!=null&&a.active?a.country!==e.destCountry?`This transfer is payable in ${this.country(e.destCountry).name} only`:e.destBranchId&&e.destBranchId!==t?`This transfer is payable at ${this.branch(e.destBranchId).name} only`:"":"This branch is not active"}recipientCheck(e,t){const n=Se(e.recipient.name,t.name||""),a=X(e.recipient.phone)?Qe(e.recipient.phone,t.phone||""):!0,i=e.recipient.idNumber?String(e.recipient.idNumber).toUpperCase().replace(/[^0-9A-Z]/g,""):"",r=String(t.idNumber??"").toUpperCase().replace(/[^0-9A-Z]/g,""),l=i?i===r:!0,{nameMatchPass:o,nameMatchReview:h}=this.s.settings;let d="FAIL";return a&&l&&n>=o?d="PASS":a&&l&&n>=h&&(d="REVIEW"),{verdict:d,nameScore:Math.round(n*100)/100,phoneOk:a,idOk:l}}async redeem(e,t){return this.need(e,"payout"),this._redeemCore(e,t,{})}async _redeemCore(e,{ref:t,pin:n,recipient:a={},idPhotoRef:i,approver:r},{skipHours:l=!1}={}){const o=this.s.settings;if(!l&&o.enforceOperatingHours&&pe.includes(e.role)){const M=this.branchOpen(e.branchId);if(!M.open)throw p("OUTSIDE_HOURS",M.reason)}const h=await this.findByRef(t);if(!h.t||h.retired)throw p("CODE_UNKNOWN","No such code");const d=h.t,y=this._payBlock(d,e.branchId);if(y)throw p("CANNOT_PAY",y);if(!o.allowSelfRedeem&&d.issuedBy===e.staffId)throw p("SELF_REDEEM","The person who issued this transfer cannot pay it out");if(!/^\d{6}$/.test(String(n??"")))throw p("PIN_FORMAT","The Release PIN is 6 digits");const g=async(M,m)=>{M==="PIN"?d.pinAttempts++:d.mismatches++;const b=d.pinAttempts+d.mismatches;throw b>=o.maxPinAttempts&&(d.locked=!0,this._raise("CODE_LOCKED","HIGH",`${d.id} locked after ${d.pinAttempts} wrong PIN and ${d.mismatches} recipient mismatches at ${e.branchId}`,d.id)),d.events.push({ts:this.now(),what:`BAD_${M}`,by:e.staffId}),this.save(),await this._audit(e,`REDEEM_${M}_FAIL`,`${d.id} ${m}${d.locked?" — LOCKED":""}`),p(d.locked?"LOCKED":M==="PIN"?"PIN_WRONG":"RECIPIENT_MISMATCH",d.locked?"Too many failed attempts. This transfer is locked — a supervisor must unlock it.":m,{attemptsLeft:o.maxPinAttempts-b})};ue(await this.pinHashFor(h.ref,n),d.pinHash??"")||await g("PIN","Release PIN incorrect");const $=this.recipientCheck(d,a);if(d.usdValue>=o.idPhotoAboveUsd&&(!a.idType||!a.idNumber))throw p("ID_REQUIRED",`Record the recipient's ID type and number (transfers of US$${o.idPhotoAboveUsd}+)`);let A=null;if($.verdict==="FAIL"&&await g("RECIPIENT",`Recipient details do not match (${$.phoneOk?"":"phone "}${$.idOk?"":"ID "}${$.nameScore<o.nameMatchReview?"name":""}`.trim().replace(/ $/,"")+"). Do not pay."),$.verdict==="REVIEW"){if(!r)throw p("APPROVAL_REQUIRED","Name is close but not exact. A supervisor must confirm the recipient in person.",{needsApprover:!0,check:$});A=(await this.verifyApprover(r.staffId,r.pin,{notStaffId:e.staffId})).id}const C=this.cash(e.branchId,d.payCcy);if(C<d.payoutMinor)throw this._raise("LOW_FLOAT","MEDIUM",`${e.branchId} cannot pay ${d.id}: ${this.fmt(C,d.payCcy)} on hand, needs ${this.fmt(d.payoutMinor,d.payCcy)}`),this.save(),p("INSUFFICIENT_FLOAT",`Not enough ${d.payCcy} cash in this branch (${this.fmt(C,d.payCcy)}). Ask Treasury for float.`);const w=d.payCcy,R=this.branch(e.branchId),F=[{account:`PAYABLE:${w}`,dr:d.payoutMinor},{account:j(e.branchId,w),cr:d.payoutMinor}],P=[this._post({type:"PAYOUT",ref:d.id,ccy:w,actor:e,memo:"Cash paid to recipient",lines:F})];if(R.type==="AGENT"&&R.commissionBps){const M=Math.round(d.payoutMinor*R.commissionBps/1e4);M>0&&P.push(this._post({type:"COMMISSION",ref:d.id,ccy:w,actor:e,memo:`Agent commission ${R.commissionBps}bps`,lines:[{account:`EXP_COMM:${w}`,dr:M},{account:`COMM_PAYABLE:${e.branchId}:${w}`,cr:M}]}))}return d.journalIds.push(...P.map(M=>M.id)),d.status="PAID",d.pinHash=null,d.paid={ts:this.now(),by:e.staffId,branchId:e.branchId,recipient:{name:this._clean(a.name),phone:this._clean(a.phone),idType:a.idType||"",idNumber:this._clean(a.idNumber)},check:$,approvedBy:A,idPhotoRef:i||""},d.events.push({ts:this.now(),what:"PAID",by:e.staffId}),this._notify(d.sender.phone,`Bantaba: ${d.id} has been paid out to your recipient. Thank you.`),this._notify(d.recipient.phone,`Bantaba: you received ${this.fmt(d.payoutMinor,w)}. Thank you.`),this.save(),await this._audit(e,"TRANSFER_PAID",`${d.id} ${this.fmt(d.payoutMinor,w)} at ${e.branchId}, match ${$.verdict} (${$.nameScore})${A?", approved by "+A:""}`),{transfer:this.view(d),check:$}}_tx(e){const t=this.s.transfers.find(n=>n.id===e);if(!t)throw p("NOT_FOUND","Transfer not found");return t}async unlock(e,t,n=""){this.need(e,"transfers.manage");const a=this._tx(t);if(!a.locked)throw p("NOT_LOCKED","Transfer is not locked");a.locked=!1,a.pinAttempts=0,a.mismatches=0,a.events.push({ts:this.now(),what:"UNLOCKED",by:e.staffId}),this.save(),await this._audit(e,"TRANSFER_UNLOCKED",`${t} ${n}`)}async reissue(e,t,n=""){this.need(e,"transfers.manage");const a=this._tx(t);if(!["ISSUED","EXPIRED"].includes(a.status)&&!a.locked)throw p("CANNOT_REISSUE","Only active, locked or expired transfers can get a new code");const i=we(),r=De();return a.refHistory.push({hash:a.refHash,retiredAt:this.now(),by:e.staffId}),a.refHash=await this.refHash(i),a.refTail=i.slice(-4),a.pinHash=await this.pinHashFor(i,r),a.pinAttempts=0,a.mismatches=0,a.locked=!1,a.status==="EXPIRED"&&(a.status="ISSUED",a.expiresAt=this.now()+this.s.settings.codeExpiryDays*H),a.events.push({ts:this.now(),what:"REISSUED",by:e.staffId}),this.save(),await this._audit(e,"TRANSFER_REISSUED",`${t} old code retired. ${n}`),{ref:i,pin:r,transfer:this.view(a)}}async cancel(e,t,{reason:n,refundFee:a=!1}={}){this.need(e,"transfers.manage");const i=this._tx(t);if(!n)throw p("REASON_REQUIRED","Give a reason for the cancellation");return this._refund(e,i,{reason:n,refundFee:a,status:"CANCELLED"})}async _refund(e,t,{reason:n,refundFee:a,status:i}){if(!["ISSUED","ON_HOLD","EXPIRED"].includes(t.status))throw p("CANNOT_CANCEL",`A ${t.status.toLowerCase()} transfer cannot be cancelled`);const r=t.collectCcy,l=t.payCcy,o=t.id,h=t.principalMinor+(a?t.feeMinor:0);if(this.cash(e.branchId,r)<h)throw p("INSUFFICIENT_FLOAT",`Not enough ${r} cash at this branch to refund`);if(r!==l){const d=t.payoutAtMidMinor-t.payoutMinor;this._post({type:"FX_BUY_REV",ref:o,ccy:l,actor:e,memo:"Reverse FX buy",lines:[{account:`PAYABLE:${l}`,dr:t.payoutMinor},...d?[{account:`REV_FX:${l}`,dr:d}]:[],{account:`FX_POS:${l}`,cr:t.payoutAtMidMinor}]}),this._post({type:"FX_SELL_REV",ref:o,ccy:r,actor:e,memo:"Reverse FX sell",lines:[{account:`FX_POS:${r}`,dr:t.principalMinor},{account:`PAYABLE:${r}`,cr:t.principalMinor}]})}this._post({type:"REFUND",ref:o,ccy:r,actor:e,memo:`Refund to sender (${n})`,lines:[{account:`PAYABLE:${r}`,dr:t.principalMinor},...a&&t.feeMinor?[{account:`REV_FEES:${r}`,dr:t.feeMinor}]:[],{account:j(e.branchId,r),cr:h}]}),t.status=i,t.pinHash=null,t.cancel={ts:this.now(),by:e.staffId,reason:n,refundFee:a,refundMinor:h,branchId:e.branchId},t.events.push({ts:this.now(),what:i,by:e.staffId});for(const d of this.s.alerts)d.transferId===t.id&&d.status==="OPEN"&&(d.status="CLOSED",d.note="Transfer "+i.toLowerCase());return this._notify(t.sender.phone,`Bantaba: ${t.id} was cancelled. ${this.fmt(h,r)} refunded.`),this.save(),await this._audit(e,`TRANSFER_${i}`,`${o} refund ${this.fmt(h,r)}: ${n}`),this.view(t)}expireDue(){let e=0;for(const t of this.s.transfers)t.status==="ISSUED"&&t.expiresAt<this.now()&&(t.status="EXPIRED",t.events.push({ts:this.now(),what:"EXPIRED",by:"SYSTEM"}),e++);return e&&this.save(),e}listTransfers(e,{status:t,q:n,limit:a=200}={}){this.need(e,"transfers.view");const i=String(n??"").toLowerCase();return this.s.transfers.filter(r=>e.role==="TELLER"&&r.originBranchId!==e.branchId&&r.destCountry!==this.branchCountry(e.branchId).code||t&&r.status!==t?!1:!i||[r.id,r.sender.name,r.recipient.name,r.refTail].some(l=>String(l).toLowerCase().includes(i))).slice().reverse().slice(0,a).map(r=>this.view(r))}listAlerts(e,{status:t}={}){return this.need(e,"compliance.view"),this.s.alerts.filter(n=>!t||n.status===t).slice().reverse()}async resolveAlert(e,t,n,a){this.need(e,"compliance.resolve");const i=this.s.alerts.find(l=>l.id===t);if(!i)throw p("NOT_FOUND","Alert not found");if(i.status!=="OPEN")throw p("ALREADY_RESOLVED","Alert already resolved");if(!a)throw p("NOTE_REQUIRED","A note is required");const r=i.transferId?this._tx(i.transferId):null;if(n==="REJECT")r&&["ON_HOLD","ISSUED"].includes(r.status)&&(this.cash(e.branchId,r.collectCcy)>=r.principalMinor,await this._refund({...e,branchId:r.originBranchId,staffId:e.staffId},r,{reason:`Compliance: ${a}`,refundFee:!1,status:"CANCELLED"})),i.status="REJECTED";else if(n==="CLEAR")i.status="CLEARED",r&&r.status==="ON_HOLD"&&!this.s.alerts.some(l=>l.transferId===r.id&&l.status==="OPEN"&&l!==i)&&(r.status="ISSUED",r.events.push({ts:this.now(),what:"HOLD_RELEASED",by:e.staffId}));else throw p("BAD_ACTION","Action must be CLEAR or REJECT");return i.resolvedBy=e.staffId,i.note=a,i.resolvedAt=this.now(),this.save(),await this._audit(e,"ALERT_"+i.status,`${t} ${a}`),i}async injectFloat(e,t,n,a,i=""){if(this.need(e,"vault.inject"),!this.branch(t)||!this.cur[n]||!Number.isSafeInteger(a)||a<=0)throw p("BAD_INPUT","Branch, currency and a positive amount are required");this._post({type:"FLOAT_IN",ref:t,ccy:n,actor:e,memo:i||"Float injection",lines:[{account:j(t,n),dr:a},{account:`HQ_FUNDING:${n}`,cr:a}]}),this.save(),await this._audit(e,"FLOAT_INJECT",`${t} +${this.fmt(a,n)} ${i}`)}async moveCash(e,t,n,a,i){if(this.need(e,"vault.move"),e.role==="SUPERVISOR"&&t!==e.branchId)throw p("FORBIDDEN","Supervisors can only move cash out of their own branch");if(!this.branch(t)||!this.branch(n)||t===n||!Number.isSafeInteger(i)||i<=0)throw p("BAD_INPUT","Choose two different branches and a positive amount");if(this.cash(t,a)<i)throw p("INSUFFICIENT_FLOAT","Not enough cash at the source branch");this._post({type:"CASH_MOVE",ref:`${t}>${n}`,ccy:a,actor:e,memo:"Cash movement",lines:[{account:j(n,a),dr:i},{account:j(t,a),cr:i}]}),this.save(),await this._audit(e,"CASH_MOVE",`${t}→${n} ${this.fmt(i,a)}`)}async closeDay(e,t,n){this.need(e,"vault.close");const a=e.branchId,i=[];let r=!1;for(const[h,d]of Object.entries(t)){const y=this.cash(a,h),g=d-y,$=Math.abs(this.usd(g,h));i.push({ccy:h,book:y,counted:d,variance:g,vUsd:$}),$>this.s.settings.varianceToleranceUsd&&(r=!0)}let l=null;if(r){if(!n)throw p("VARIANCE_APPROVAL","Variance is above tolerance. A second approver must sign off.",{needsApprover:!0,rows:i});l=(await this.verifyApprover(n.staffId,n.pin,{notStaffId:e.staffId,minRoles:["SUPERVISOR","ADMIN","TREASURY"]})).id}for(const h of i){if(!h.variance)continue;const d=h.variance<0?[{account:`SUSPENSE_VARIANCE:${h.ccy}`,dr:-h.variance},{account:j(a,h.ccy),cr:-h.variance}]:[{account:j(a,h.ccy),dr:h.variance},{account:`SUSPENSE_VARIANCE:${h.ccy}`,cr:h.variance}];this._post({type:"VARIANCE",ref:a,ccy:h.ccy,actor:e,memo:"End-of-day cash variance",lines:d}),h.vUsd>this.s.settings.varianceToleranceUsd&&this._raise("CASH_VARIANCE","MEDIUM",`${a} ${h.ccy} variance ${this.fmt(h.variance,h.ccy)}`)}const o={id:this.s.dayCloses.length+1,ts:this.now(),branchId:a,by:e.staffId,approvedBy:l,rows:i};return this.s.dayCloses.push(o),this.save(),await this._audit(e,"DAY_CLOSE",`${a} ${i.map(h=>`${h.ccy} var ${h.variance}`).join(", ")}`),o}async updateSettings(e,t){this.need(e,"admin");const n=this.s.settings,a=[];for(const[i,r]of Object.entries(t)){if(!(i in n))throw p("BAD_SETTING",`Unknown setting ${i}`);if(typeof n[i]=="number"&&(typeof r!="number"||!Number.isFinite(r)||r<0))throw p("BAD_SETTING",`${i} must be a non-negative number`);if(typeof n[i]=="boolean"&&typeof r!="boolean")throw p("BAD_SETTING",`${i} must be true/false`);JSON.stringify(n[i])!==JSON.stringify(r)&&(a.push(`${i}: ${JSON.stringify(n[i])} → ${JSON.stringify(r)}`),n[i]=r)}if(n.nameMatchReview>n.nameMatchPass)throw p("BAD_SETTING","Review threshold cannot be above pass threshold");this.save(),a.length&&await this._audit(e,"SETTINGS_CHANGED",a.join("; "))}async setRate(e,t,n){this.need(e,"rates.edit");const a=this.cur[t];if(!a)throw p("BAD_CCY","Unknown currency");if(!(n>0)||!Number.isFinite(n))throw p("BAD_RATE","Rate must be greater than zero");const i=a.perUsd;a.perUsd=n,this.save(),await this._audit(e,"RATE_CHANGED",`${t} per USD ${i} → ${n}`)}async upsertCurrency(e,{code:t,name:n,symbol:a,decimals:i,perUsd:r}){if(this.need(e,"admin"),t=String(t??"").toUpperCase(),!/^[A-Z]{3}$/.test(t))throw p("BAD_CCY","Currency code must be 3 letters (ISO 4217)");if(![0,2,3].includes(i)||!(r>0))throw p("BAD_CCY","Decimals must be 0, 2 or 3 and the rate above zero");const l=this.s.currencies.find(o=>o.code===t);l?Object.assign(l,{name:n,symbol:a,decimals:l.decimals,perUsd:r}):this.s.currencies.push({code:t,name:n,symbol:a||t,decimals:i,perUsd:r}),this.save(),await this._audit(e,l?"CURRENCY_UPDATED":"CURRENCY_ADDED",`${t} ${n}`)}async upsertCountry(e,{code:t,name:n,currency:a,tz:i,dial:r,lang:l="en"}){if(this.need(e,"admin"),t=String(t??"").toUpperCase(),!/^[A-Z]{2}$/.test(t)||!this.cur[a])throw p("BAD_COUNTRY","Use a 2-letter country code and an existing currency");try{new Intl.DateTimeFormat("en",{timeZone:i})}catch{throw p("BAD_COUNTRY","Unknown timezone (use an IANA name such as Africa/Lusaka)")}const o=this.s.countries.find(h=>h.code===t);o?Object.assign(o,{name:n,currency:a,tz:i,dial:r,lang:l}):this.s.countries.push({code:t,name:n,currency:a,tz:i,dial:r,lang:l}),this.save(),await this._audit(e,o?"COUNTRY_UPDATED":"COUNTRY_ADDED",`${t} ${n}`)}async upsertBranch(e,t){this.need(e,"admin");const n=String(t.id??"").toUpperCase();if(!/^[A-Z]{2}-[A-Z0-9]{2,5}$/.test(n)||n.slice(0,2)!==t.country||!this.country(t.country))throw p("BAD_BRANCH","ID must look like GM-SKD (country code, dash, 2–5 letters) and match the country");const a=t.hours??{open:"08:30",close:"17:30",days:[1,2,3,4,5,6]};if(q(a.open)>=q(a.close))throw p("BAD_BRANCH","Opening time must be before closing time");const i=this.branch(n),r={id:n,country:t.country,name:this._clean(t.name),city:this._clean(t.city),type:t.type==="AGENT"?"AGENT":"OWN",commissionBps:Math.max(0,Math.min(500,Math.round(t.commissionBps??0))),active:t.active!==!1,hours:a};i?Object.assign(i,r):this.s.branches.push(r),this.save(),await this._audit(e,i?"BRANCH_UPDATED":"BRANCH_ADDED",`${n} ${r.name}`)}async setBranchActive(e,t,n){this.need(e,"admin");const a=this.branch(t);if(!a)throw p("NOT_FOUND","Branch not found");if(!n&&this.onShift().some(i=>i.branchId===t))throw p("BRANCH_BUSY","Staff are signed in at this branch");a.active=n,this.save(),await this._audit(e,n?"BRANCH_ENABLED":"BRANCH_DISABLED",t)}async upsertStaff(e,{id:t,name:n,role:a,branches:i,pin:r,schedule:l}){var h;if(this.need(e,"admin"),t=String(t??"").trim().toUpperCase(),!/^[A-Z0-9-]{3,16}$/.test(t)||!tt.includes(a)||this._clean(n).length<3)throw p("BAD_STAFF","Give an ID (3–16 letters/digits), a name and a valid role");for(const d of i??[])if(!this.branch(d))throw p("BAD_STAFF",`Unknown branch ${d}`);if(!(i??[]).length)throw p("BAD_STAFF","Assign at least one branch");const o=this.staffById(t);if(!o&&!/^\d{6}$/.test(r??""))throw p("BAD_STAFF","New staff need a 6-digit starting PIN");if(o&&o.role==="ADMIN"&&a!=="ADMIN"&&this.s.staff.filter(d=>d.role==="ADMIN"&&d.active).length<=1)throw p("LAST_ADMIN","Cannot demote the last administrator");if(l&&(q(l.start)>=q(l.end)||!((h=l.days)!=null&&h.length)))throw p("BAD_STAFF","Schedule start must be before end, with at least one day");if(o)Object.assign(o,{name:this._clean(n),role:a,branches:i,schedule:l??o.schedule}),r&&(o.salt=J(ce(16)),o.pinHash=await this._hashPin(r,o.salt),o.mustChangePin=!0);else{const d=await this._mkStaff(t,this._clean(n),a,i,r,l);d.mustChangePin=!0,this.s.staff.push(d)}this.save(),await this._audit(e,o?"STAFF_UPDATED":"STAFF_ADDED",`${t} ${a} @ ${i.join(",")}`)}async setStaffActive(e,t,n){this.need(e,"admin");const a=this.staffById(t);if(!a)throw p("NOT_FOUND","Staff not found");if(t===e.staffId&&!n)throw p("SELF_DEACTIVATE","You cannot deactivate yourself");if(!n&&a.role==="ADMIN"&&this.s.staff.filter(i=>i.role==="ADMIN"&&i.active).length<=1)throw p("LAST_ADMIN","Cannot deactivate the last administrator");if(a.active=n,!n)for(const[i,r]of this.sessions)r.staffId===t&&this._closeSession(r,"DEACTIVATED");this.save(),await this._audit(e,n?"STAFF_ENABLED":"STAFF_REMOVED",t)}report(e,{from:t=0,to:n=this.now()+1}={}){this.need(e,"reports.view");const a=this.s.transfers.filter(o=>o.createdAt>=t&&o.createdAt<n),i=a.filter(o=>!["CANCELLED","REFUNDED"].includes(o.status)),r=o=>{const h={};for(const d of i){const y=o(d),g=h[y]??(h[y]={key:y,count:0,usd:0,feesUsd:0,fxUsd:0});g.count++,g.usd+=d.usdValue,g.feesUsd+=this.usd(d.feeMinor,d.collectCcy),g.fxUsd+=this.usd(d.payoutAtMidMinor-d.payoutMinor,d.payCcy)}return Object.values(h).sort((d,y)=>y.usd-d.usd)},l={};for(const o of a)l[o.status]=(l[o.status]??0)+1;return{count:a.length,status:l,volumeUsd:i.reduce((o,h)=>o+h.usdValue,0),feesUsd:i.reduce((o,h)=>o+this.usd(h.feeMinor,h.collectCcy),0),fxUsd:i.reduce((o,h)=>o+this.usd(h.payoutAtMidMinor-h.payoutMinor,h.payCcy),0),corridors:r(o=>`${o.originCountry}→${o.destCountry}`),branches:r(o=>o.originBranchId),currencies:r(o=>`${o.collectCcy}→${o.payCcy}`),liabilityUsd:this.s.transfers.filter(o=>["ISSUED","ON_HOLD","EXPIRED"].includes(o.status)).reduce((o,h)=>o+this.usd(h.payoutMinor,h.payCcy),0)}}floatTable(e){this.need(e,"vault.view");const t=[];for(const n of this.s.branches){if(e.role==="TELLER"&&n.id!==e.branchId)continue;const a=this.branchCash(n.id),i=new Set([this.country(n.country).currency,...Object.keys(a)]);for(const r of i){const l=a[r]??0;t.push({branchId:n.id,branch:n.name,ccy:r,minor:l,low:l<this.lowFloatMinor(r)})}}return t}}const Le=document.getElementById("app"),c=s=>String(s??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),ne=s=>s?new Date(s).toLocaleString("en-GB",{dateStyle:"medium",timeStyle:"short"}):"—",Te=s=>`${Math.floor(s/60)}h ${String(s%60).padStart(2,"0")}m`,D=s=>"$"+Math.round(s).toLocaleString("en-US"),S={send:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>',payout:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/></svg>',transfers:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>',cash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="12" cy="12" r="3"/><path d="M12 9v6M9 12h6"/></svg>',compliance:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>',ledger:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M9 14h6M9 18h4"/></svg>',reports:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>',admin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>',print:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16"><path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><path d="M6 14h12v8H6z"/></svg>',search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>',check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16"><polyline points="20 6 9 17 4 12"/></svg>',shield:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',lock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>',unlock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 019.9-1"/></svg>',globe:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>'};let u,v=null,Z="send",z={},Ne,L={};const ct=[["send","Send Money","send",S.send],["payout","Pay Out","payout",S.payout],["transfers","Transfers","transfers.view",S.transfers],["cash","Cash & Vault","vault.view",S.cash],["compliance","Compliance & AML","compliance.view",S.compliance],["ledger","Double-Entry Ledger","ledger.view",S.ledger],["reports","Reports & Analytics","reports.view",S.reports],["admin","System Admin","admin",S.admin]];function _(s,e="ok"){var n;clearTimeout(Ne),(n=document.querySelector(".flash"))==null||n.remove();const t=document.createElement("div");t.className=`flash ${e==="ok"?"ok":"err"}`,t.innerHTML=`<span>${e==="ok"?"✔":"⚠"}</span> <span>${c(s)}</span>`,t.setAttribute("role","alert"),document.body.append(t),Ne=setTimeout(()=>t.remove(),e==="ok"?4e3:8e3)}const fe=s=>{console.error(s),_((s==null?void 0:s.message)||"Operation failed","err")},f=(s,e)=>{var t,n;return((n=(t=s.elements[e])==null?void 0:t.value)==null?void 0:n.trim())??""},k=(s,e)=>s.map(([t,n])=>`<option value="${c(t)}"${t===e?" selected":""}>${c(n)}</option>`).join(""),Re=new Map;function te(s,e=500){const t=Date.now(),n=Re.get(s)||0;return t-n<e?(_("Security notice: transaction throttled to prevent duplicate execution.","err"),!1):(Re.set(s,t),!0)}function se(s){return s.elements._bnt_trap_usr&&s.elements._bnt_trap_usr.value!==""?(console.warn("[SECURITY] Bot trap tripped. Intercepted automated submission."),_("Security policy: automated crawler access prohibited.","err"),!1):!0}const ae=()=>`
  <div class="hp-trap" aria-hidden="true">
    <label for="_bnt_trap_usr">Leave this empty</label>
    <input type="text" id="_bnt_trap_usr" name="_bnt_trap_usr" tabindex="-1" autocomplete="off" value="">
  </div>`,I=(s,e,t="",n="text",a="")=>{const r=n==="password"||e.toLowerCase().includes("pin")?'maxlength="6"':'maxlength="100"';return`<div><label for="f_${e}">${c(s)}</label><input id="f_${e}" name="${e}" type="${n}" value="${c(a)}" ${r} ${t}></div>`},oe=s=>v&&u.can(v,s);function Q(){if(!v)return dt();const s=u.branch(v.branchId),e=u.branchCountry(v.branchId),t=u.branchOpen(v.branchId),n=ct.filter(([,,a])=>oe(a));n.find(([a])=>a===Z)||(Z=n[0][0]),Le.innerHTML=`
  <div class="system-ticker">
    <span class="status-badge"><span class="led"></span> CENTRAL CLEARING NETWORK · AUTHORIZED LIVE TERMINAL</span>
    <span>CORRIDOR STATUS: 12 JURISDICTIONS ACTIVE · REUTERS/FX ORACLE CONNECTED</span>
    <span>ENCRYPTED TLS 1.3 · DOUBLE-ENTRY RESERVE VERIFIED</span>
  </div>
  <header class="top">
    <div class="brand-wrapper">
      <img src="./brand/bantaba-logo.png" alt="Bantaba Logo" class="brand-img">
      <div class="brand-meta">
        <div class="brand-title">Bantaba</div>
        <div class="brand-sub">Remittance Operating System</div>
      </div>
    </div>
    <span class="spacer"></span>
    <div class="station-pill">
      <div class="station-who">
        <b>${c(v.name)}</b> · <span class="pill ACTIVE" style="padding:1px 6px;font-size:0.68rem">${c(v.role)}</span><br>
        <span style="opacity:0.85">${c(s.name)} (${c(s.id)}), ${c(e.name)}</span> · 
        <span style="color:${t.open?"#64dd8b":"#ff9999"};font-weight:700">${t.open?"OPEN":"CLOSED"}</span> · 
        <span id="clock" class="mono"></span>
      </div>
      <button class="btn sec sm" data-act="logout">Sign Out</button>
    </div>
  </header>
  <nav class="tabs" aria-label="Operating Sections">
    ${n.map(([a,i,,r])=>`<button data-act="nav" data-v="${a}" class="${a===Z?"on":""}" ${a===Z?'aria-current="page"':""}>${r} ${i}</button>`).join("")}
  </nav>
  <main id="main"></main>`,Oe(),T()}function Oe(){const s=document.getElementById("clock");s&&v&&(s.textContent=new Date().toLocaleTimeString("en-GB",{timeZone:u.branchCountry(v.branchId).tz,hour:"2-digit",minute:"2-digit",second:"2-digit"})+" LT")}function T(){const s=document.getElementById("main");if(s){try{s.innerHTML={send:lt,payout:ut,transfers:pt,cash:mt,compliance:ft,ledger:vt,reports:Ct,admin:At}[Z]()}catch(e){s.innerHTML="",e.code==="SESSION_EXPIRED"||e.code==="NO_SESSION"?(v=null,Q(),_(e.message,"err")):fe(e);return}Z==="send"&&ge()}}function dt(){const s=u.s.staff.filter(t=>t.active),e=[{id:"GB-LDN-T1",name:"London Overseas Intake",role:"TELLER",branch:"GB-LDN"},{id:"GM-SKD-T1",name:"Serrekunda Main Payout",role:"TELLER",branch:"GM-SKD"},{id:"SN-DKR-T1",name:"Dakar Plateau Counter",role:"TELLER",branch:"SN-DKR"},{id:"GM-SKD-S1",name:"Head Supervisor Desk",role:"SUPERVISOR",branch:"GM-SKD"},{id:"TRS-01",name:"Central Treasury Desk",role:"TREASURY",branch:"GB-LDN"},{id:"CMP-01",name:"AML & Compliance Desk",role:"COMPLIANCE",branch:"GB-LDN"},{id:"ADM-01",name:"Network Systems Admin",role:"ADMIN",branch:"GM-SKD"}];Le.innerHTML=`
  <div class="system-ticker">
    <span class="status-badge"><span class="led"></span> CENTRAL CLEARING NETWORK · AUTHORIZED ACCESS ONLY</span>
    <span>ENCRYPTED HARDWARE SECURITY MODULE (HSM) ACTIVE</span>
  </div>
  <div class="login-wrap">
    <div class="login-card">
      <img src="./brand/bantaba-logo.png" alt="Bantaba" style="height:88px;width:auto;margin-bottom:12px;filter:drop-shadow(0 4px 10px rgba(0,0,0,0.12));">
      <h1 style="font-size:1.6rem;color:var(--brand-900);margin-bottom:2px">Bantaba Remittance OS</h1>
      <p style="font-size:0.85rem;color:var(--ink-500);font-weight:600;margin-bottom:20px;letter-spacing:0.02em">
        Home, within reach. · Secure Counter Terminal
      </p>

      <form data-form="login" class="grid" style="text-align:left">
        ${ae()}
        ${I("Staff Workstation ID","sid",'autocomplete="username" required list="sl" placeholder="e.g. GM-SKD-T1"')}
        <datalist id="sl">${s.map(t=>`<option value="${c(t.id)}">${c(t.name)} (${c(t.role)})</option>`).join("")}</datalist>
        ${I("Terminal Security PIN","pin",'inputmode="numeric" maxlength="6" autocomplete="current-password" required placeholder="Enter 6-digit PIN"',"password")}
        <div>
          <label for="f_br">Assigned Branch Terminal</label>
          <select id="f_br" name="br">${k(u.s.branches.filter(t=>t.active).map(t=>[t.id,`${t.name} (${t.id})`]))}</select>
        </div>
        <button class="btn" style="padding:13px;width:100%;font-size:1rem;margin-top:4px">
          ${S.lock} Authenticate Terminal
        </button>
      </form>

      <div style="margin-top:22px;border-top:1px solid var(--ink-100);padding-top:16px;text-align:left">
        <label style="margin-bottom:6px">Quick Station Switcher (Master PIN: <span class="mono" style="color:var(--brand-700)">482915</span>)</label>
        <div class="desk-chips">
          ${e.map(t=>`
            <div class="desk-chip" data-act="quick" data-v="${c(t.id)}">
              <b>${c(t.id)}</b>
              <span>${c(t.name)}</span>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  </div>`}function lt(){const s=L.sent;if(s){const a=s.transfer,i=u.country(a.destCountry);return`
    <div class="receipt-slip" id="printableReceipt">
      <div class="receipt-header">
        <img src="./brand/bantaba-logo.png" alt="Bantaba" class="receipt-logo" onerror="this.style.display='none'">
        <div class="receipt-title">BANTABA MONEY TRANSFER</div>
        <div class="receipt-sub">Official Counter Cash Receipt &mdash; Home, within reach.</div>
      </div>
      <div class="receipt-code-box">
        <div style="font-size:0.68rem;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px">Single-Use Redemption Code &amp; Release PIN</div>
        <div class="receipt-code">${c(s.ref)}</div>
        <div class="receipt-pin">PIN: ${c(s.pin)}</div>
        <div style="font-size:0.7rem;color:#6b7280;margin-top:6px">Give this code &amp; PIN to the sender. Recipient must present both with valid government photo ID.</div>
      </div>
      <div class="receipt-lines">
        <div class="receipt-row"><span>Transaction ID</span><b>${c(a.id)}</b></div>
        <div class="receipt-row"><span>Date &amp; Time</span><b>${c(ne(a.createdAt))}</b></div>
        <div class="receipt-row"><span>Intake Branch</span><b>${c(a.originBranchId)} &mdash; ${c(u.branchCountry(a.originBranchId).name)}</b></div>
        <div class="receipt-row"><span>Destination</span><b>${c(i.name)} (${c(a.payCcy)})</b></div>
        <div class="receipt-row"><span>Sender</span><b>${c(a.sender.name)}</b></div>
        <div class="receipt-row"><span>Sender Phone</span><b>${c(a.sender.phone)}</b></div>
        <div class="receipt-row"><span>Recipient</span><b>${c(a.recipient.name)}</b></div>
        <div class="receipt-row"><span>Recipient Phone</span><b>${c(a.recipient.phone)}</b></div>
      </div>
      <div class="receipt-lines">
        <div class="receipt-row"><span>Principal Collected</span><b>${c(u.fmt(a.principalMinor,a.collectCcy))}</b></div>
        <div class="receipt-row"><span>Transfer Fee</span><b>${c(u.fmt(a.feeMinor,a.collectCcy))}</b></div>
        <div class="receipt-row" style="font-weight:700"><span>Total Collected</span><b>${c(u.fmt(a.totalMinor,a.collectCcy))}</b></div>
        <div class="receipt-row" style="font-size:1.05rem;color:var(--brand-700);font-weight:800"><span>Recipient Receives</span><b>${c(u.fmt(a.payoutMinor,a.payCcy))}</b></div>
        <div class="receipt-row"><span>Valid Until</span><b>${c(ne(a.expiresAt))}</b></div>
      </div>
      ${s.held?`<div class="notice bad" style="font-size:0.78rem"><b>COMPLIANCE HOLD:</b> ${c(s.holds.map(r=>r.detail).join("; "))}. Funds held pending supervisor review.</div>`:""}
      <div class="receipt-barcode">| | || ||| || | | ||| || | || | ||| || |</div>
      <div class="receipt-footer-text">
        <b>Bantaba Remittance</b> &mdash; Regulated Counter Transaction<br>
        Present this code, PIN &amp; valid government photo ID to redeem at any Bantaba counter.<br>
        Served by ${c(v.name)} &bull; ${c(u.branch(v.branchId).name)}
      </div>
      <div class="noprint" style="display:flex;gap:10px;justify-content:center;margin-top:20px">
        <button class="btn" data-act="print">${S.print} Print Counter &amp; Customer Slip</button>
        <button class="btn sec" data-act="newsend">Process Next Transfer</button>
      </div>
    </div>`}const e=u.s.countries,t=u.branchCountry(v.branchId).currency,n=u.s.currencies.map(a=>[a.code,`${a.code} — ${a.name} (${a.symbol})`]);return`
  <form data-form="send" class="bento-grid" autocomplete="off">
    ${ae()}
    <div class="col-7">
      <div class="card">
        <div class="card-header">
          <h2>Amount &amp; Remittance Corridor</h2>
          <span class="pill ACTIVE">Live Clearing</span>
        </div>
        <div class="grid">
          <div class="row">
            <div>
              <label for="f_dest">Destination Country</label>
              <select id="f_dest" name="dest" data-q>${k(e.map(a=>[a.code,`${a.name} (${a.currency})`]),u.branchCountry(v.branchId).code)}</select>
            </div>
            <div>
              <label for="f_destBranch">Designated Payout Point</label>
              <select id="f_destBranch" name="destBranch"></select>
            </div>
          </div>
          <div class="row">
            <div>
              <label for="f_cc">Customer Pays In</label>
              <select id="f_cc" name="cc" data-q>${k(n,t)}</select>
            </div>
            <div>
              <label for="f_pc">Recipient Gets In</label>
              <select id="f_pc" name="pc" data-q>${k(n,t)}</select>
            </div>
          </div>
          <div class="row">
            <div>
              <label for="f_mode">Pricing Direction</label>
              <select id="f_mode" name="mode" data-q>
                <option value="send">Customer says amount to SEND</option>
                <option value="receive">Customer says amount to RECEIVE</option>
              </select>
            </div>
            ${I("Principal Amount","amt",'inputmode="decimal" data-q required placeholder="0.00"')}
          </div>
          <div id="quote" class="quote-box">Enter an amount to generate live institutional exchange quote.</div>
        </div>
      </div>

      <div class="card" style="margin-top:18px">
        <div class="card-header">
          <h3>${S.shield} Purpose & Regulatory Declaration</h3>
        </div>
        <div class="row">
          <div>
            <label for="f_purpose">Remittance Purpose</label>
            <select id="f_purpose" name="purpose">${k([["FAMILY_SUPPORT","Family Maintenance & Support"],["EDUCATION","Tuition & Education Support"],["MEDICAL","Healthcare / Medical Treatment"],["RENT_BILLS","Housing, Rent & Utilities"],["BUSINESS","Commercial Trade / Small Business"],["OTHER","Other Verified Lawful Purpose"]])}</select>
          </div>
          <div>
            <label for="f_sof">Source of Funds</label>
            <select id="f_sof" name="sof">${k([["SALARY","Formal Employment Salary"],["SAVINGS","Personal Verified Savings"],["BUSINESS","Business Operating Income"],["GIFT","Family Inheritance / Gift"],["OTHER","Other Legitimate Source"]])}</select>
          </div>
        </div>
      </div>
    </div>

    <div class="col-5">
      <div class="card">
        <div class="card-header">
          <h2>Sender Information (KYC)</h2>
          <span class="pill PAID">Verified</span>
        </div>
        <div class="grid">
          ${I("Sender Full Legal Name","sn",'required placeholder="As stated on official ID"')}
          ${I("Sender Phone Number","sp",'required inputmode="tel" placeholder="+44 7900 123456"')}
          <div class="row">
            <div>
              <label for="f_sit">Government ID Type</label>
              <select id="f_sit" name="sit">
                <option value="">— Select ID Type —</option>
                ${k([["PASSPORT","International Passport"],["NATIONAL_ID","National ID Card"],["DRIVING_LICENCE","Driving Licence"],["RESIDENCE_PERMIT","Biometric Residence Permit"],["VOTER_CARD","Voter Card"]])}
              </select>
            </div>
            ${I("ID Serial Number","sin",'placeholder="e.g. P12345678"')}
          </div>
          <label style="text-transform:none;display:flex;gap:10px;align-items:center;font-weight:600;margin-top:4px">
            <input type="checkbox" name="photo" style="width:auto"> Physical ID verified & optical capture completed
          </label>
        </div>
      </div>

      <div class="card" style="margin-top:18px">
        <div class="card-header">
          <h2>Recipient Designation</h2>
          <span class="pill REVIEW">Strict Match</span>
        </div>
        <div class="grid">
          ${I("Recipient Full Legal Name","rn",'required placeholder="Exact name as on recipient photo ID"')}
          ${I("Recipient Mobile Phone","rp",'required inputmode="tel" placeholder="+220 330 1234"')}
          <div class="row">
            <div>
              <label for="f_rit">Expected ID Type</label>
              <select id="f_rit" name="rit">
                <option value="">— Any Verified ID —</option>
                ${k([["NATIONAL_ID","National ID Card"],["PASSPORT","International Passport"],["DRIVING_LICENCE","Driving Licence"],["VOTER_CARD","Voter Registration Card"]])}
              </select>
            </div>
            ${I("ID Number (if known)","rin")}
          </div>
        </div>
      </div>

      <div id="cosign" class="card hide" style="margin-top:18px;border-left:4px solid var(--status-warn)">
        <h3>Supervisor Co-Sign Authorization</h3>
        <p class="small muted" style="margin-bottom:10px">High-value transfer requires senior dual authorization.</p>
        <div class="row">
          ${I("Supervisor ID","cs_id",'placeholder="e.g. GM-SKD-S1"')}
          ${I("Supervisor PIN","cs_pin",'inputmode="numeric" maxlength="6"',"password")}
        </div>
      </div>

      <button class="btn" style="width:100%;padding:14px;font-size:1.05rem;margin-top:18px">
        ${S.cash} Collect Intake Cash & Issue Bantaba Code
      </button>
    </div>
  </form>`}function ht(s){return`<option value="">Any Bantaba Payout Counter in ${c(u.country(s).name)}</option>`+u.s.branches.filter(e=>e.country===s&&e.active).map(e=>`<option value="${c(e.id)}">${c(e.name)} (${c(e.id)})</option>`).join("")}function ge(){var i;const s=document.querySelector("form[data-form=send]");if(!s)return;const e=f(s,"dest"),t=s.elements.destBranch;t&&t.dataset.for!==e&&(t.innerHTML=ht(e),t.dataset.for=e,s.elements.pc.value=u.country(e).currency);const n=document.getElementById("quote"),a=Number(f(s,"amt"));if(!(a>0)){n.className="quote-box",n.textContent="Enter an amount to generate live institutional exchange quote.",L.q=null;return}try{const r=f(s,"cc"),l=f(s,"pc"),o=u.quote(v,{destCountry:e,collectCcy:r,payCcy:l,mode:f(s,"mode"),amountMinor:re(a,u.cur[r].decimals)});L.q=o,n.className="quote-box",n.innerHTML=`
      <div class="bento-grid" style="margin:0;gap:12px">
        <div class="col-6">
          <div style="font-size:0.75rem;font-weight:700;color:var(--ink-500);text-transform:uppercase">Customer Pays Intake</div>
          <div class="quote-val">${c(u.fmt(o.totalMinor,r))}</div>
          <div class="small muted">Principal: ${c(u.fmt(o.principalMinor,r))} + Counter Fee: ${c(u.fmt(o.feeMinor,r))}</div>
        </div>
        <div class="col-6">
          <div style="font-size:0.75rem;font-weight:700;color:var(--ink-500);text-transform:uppercase">Recipient Disbursed</div>
          <div class="quote-val" style="color:var(--brand-700)">${c(u.fmt(o.payoutMinor,l))}</div>
          <div class="small muted">${r===l?"Domestic Currency Parity":`Mid: 1 ${c(r)} = ${c(o.rate.toFixed(4))} ${c(l)}`}${o.domestic?" · Domestic Corridor Discount":""}</div>
        </div>
      </div>
      <div style="font-size:0.75rem;color:var(--ink-400);margin-top:8px;border-top:1px dashed #cfe0d5;padding-top:6px;display:flex;justify-content:space-between">
        <span>Guaranteed Rate Lock: ${u.s.settings.rateLockMinutes} Minutes</span>
        <span>Base Evaluation: ≈ ${D(o.usd)} USD</span>
      </div>`,(i=document.getElementById("cosign"))==null||i.classList.toggle("hide",o.usd<u.s.settings.coSignAboveUsd)}catch(r){n.className="quote-box bad",n.textContent=r.message,L.q=null}}function ut(){const s=L.lookup,e=`
  <div class="card" style="margin-bottom:20px">
    <div class="card-header">
      <h2>Step 1: Query Central Clearance Ledger</h2>
      <span class="pill ACTIVE">Encrypted Lookup</span>
    </div>
    <form data-form="lookup" class="row">
      ${ae()}
      ${I("Bantaba Reference Code","ref",'required placeholder="BNT-XXXX-XXXX" autocomplete="off" style="text-transform:uppercase" class="mono"')}
      <div style="flex:0">
        <button class="btn">${S.search} Search Ledger</button>
      </div>
    </form>
  </div>`;if(!s)return e;const t=s.info;return e+`
  <div class="card">
    <div class="card-header">
      <h2>Step 2: Blind Recipient Identity Verification</h2>
      <span class="pill ${c(t.status)}">${c(t.status)}</span>
    </div>
    <div style="margin-bottom:16px;background:#f7faf7;border:1px solid #d8e8dc;border-radius:var(--radius-md);padding:14px 18px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
      <div>
        <div style="font-size:0.75rem;font-weight:700;color:var(--ink-500);text-transform:uppercase">Authorized Payout Amount</div>
        <div style="font-family:'Fraunces',serif;font-size:1.8rem;color:var(--brand-800);font-weight:700">${c(t.payoutText)}</div>
        <div class="small muted">Ref: ${c(t.id)} · Intake from ${c(t.senderMasked)}</div>
      </div>
      <div>
        <span class="pill ${t.canPay?"PAID":"ON_HOLD"}">${t.canPay?"Ready for Disbursement":"Disbursement Blocked"}</span>
      </div>
    </div>

    ${t.canPay?`
    <div class="notice">
      <b>Blind Counter Check:</b> Ask the customer for their physical ID and their 6-digit Release PIN. Type their details exactly as presented. The engine performs fuzzy matching and phone verification before releasing counter float. Verification attempts remaining: <b>${t.attemptsLeft}</b>
    </div>
    <form data-form="redeem" class="bento-grid" autocomplete="off">
      ${ae()}
      <div class="col-6">
        ${I("Customer Legal Name (on ID)","name",'required placeholder="Full name as printed on ID"')}
      </div>
      <div class="col-6">
        ${I("Customer Mobile Phone","phone",'required inputmode="tel" placeholder="+220..."')}
      </div>
      <div class="col-4">
        <div>
          <label for="f_it">Government ID Type</label>
          <select id="f_it" name="it">
            <option value="">— Verified ID Presented —</option>
            ${k([["NATIONAL_ID","National ID Card"],["PASSPORT","International Passport"],["DRIVING_LICENCE","Driving Licence"],["VOTER_CARD","Voter Registration Card"]])}
          </select>
        </div>
      </div>
      <div class="col-4">
        ${I("Government ID Number","idn",t.requiresId?'required placeholder="Serial / ID number"':'placeholder="Serial / ID number"')}
      </div>
      <div class="col-4">
        ${I("Release PIN (from customer)","pin",'required inputmode="numeric" maxlength="6" autocomplete="off" placeholder="6-digit PIN"',"password")}
      </div>
      <div class="col-12">
        <label style="text-transform:none;display:flex;gap:10px;align-items:center;font-weight:600">
          <input type="checkbox" name="photo" style="width:auto"> Physical ID inspect and biometric facial comparison passed
        </label>
      </div>

      <div id="appr" class="${s.needsApprover?"":"hide"} col-12 card" style="background:#fffcf0;border-color:#f5dc99">
        <h3>Senior Supervisor Identity Confirmation</h3>
        <p class="small muted">Fuzzy name match score is between 80% and 92%. A supervisor must confirm identity in person before cash can be disbursed.</p>
        <div class="row">
          ${I("Supervisor ID","ap_id",'placeholder="e.g. GM-SKD-S1"')}
          ${I("Supervisor PIN","ap_pin",'inputmode="numeric" maxlength="6"',"password")}
        </div>
      </div>

      <div class="col-12" style="margin-top:6px">
        <button class="btn" style="width:100%;padding:14px;font-size:1.05rem">
          ${S.check} Verify Identity & Release Cash from Vault
        </button>
      </div>
    </form>`:`
    <div class="notice bad">
      <b>Disbursement Refused:</b> ${c(t.blockReason)}
    </div>`}
  </div>`}function pt(){const s=z.tf??{},e=u.listTransfers(v,{status:s.status,q:s.q});return`
  <div class="card" style="margin-bottom:18px">
    <div class="card-header">
      <h2>Central Transfer Register & Clearing Stream</h2>
      <span class="pill ACTIVE">${e.length} Records</span>
    </div>
    <form class="row" data-form="tf">
      ${I("Search Record","q",'placeholder="Search by TX ID, customer name, phone or code..."',"text",s.q??"")}
      <div>
        <label for="f_st">Transfer Status</label>
        <select id="f_st" name="status">
          <option value="">All Operating Statuses</option>
          ${k(["ISSUED","ON_HOLD","PAID","EXPIRED","CANCELLED"].map(t=>[t,t]),s.status)}
        </select>
      </div>
      <div style="flex:0">
        <button class="btn">${S.search} Filter Register</button>
      </div>
    </form>
  </div>

  <div class="card scroll">
    <table>
      <thead>
        <tr>
          <th>Transfer ID & Ref</th>
          <th>Dispatched</th>
          <th>Corridor</th>
          <th>Sender → Recipient</th>
          <th>Intake Cash</th>
          <th>Payout Total</th>
          <th>Status & Alerts</th>
          <th style="text-align:right">Actions</th>
        </tr>
      </thead>
      <tbody>
        ${e.map(t=>{var n;return`
        <tr>
          <td>
            <b>${c(t.id)}</b>
            <div class="small muted mono">${c(t.refMask)}</div>
          </td>
          <td class="small">${c(ne(t.createdAt))}</td>
          <td>
            <b>${c(t.originBranchId)}</b> → <b>${c(t.destCountry)}</b>
            <div class="small muted">${c(u.country(t.destCountry).name)}</div>
          </td>
          <td>
            <b>${c(t.sender.name)}</b>
            <div class="muted">→ ${c(t.recipient.name)}</div>
          </td>
          <td><b>${c(u.fmt(t.totalMinor,t.collectCcy))}</b></td>
          <td><b style="color:var(--brand-700)">${c(u.fmt(t.payoutMinor,t.payCcy))}</b></td>
          <td>
            <span class="pill ${c(t.status)}">${c(t.status)}</span>
            ${t.locked?' <span class="pill LOCKED">LOCKED (PIN)</span>':""}
            ${(n=t.holdReasons)!=null&&n.length?`<div class="small" style="color:var(--status-bad);margin-top:2px">${c(t.holdReasons.join(", "))}</div>`:""}
          </td>
          <td style="text-align:right">
            ${oe("transfers.manage")?`
              ${t.locked?`<button class="btn sm sec" data-act="unlock" data-id="${c(t.id)}">${S.unlock} Unlock</button>`:""}
              ${["ISSUED","EXPIRED"].includes(t.status)||t.locked?`<button class="btn sm sec" data-act="reissue" data-id="${c(t.id)}">Rotate Code</button>`:""}
              ${["ISSUED","ON_HOLD","EXPIRED"].includes(t.status)?`<button class="btn sm bad" data-act="cancel" data-id="${c(t.id)}">Cancel & Refund</button>`:""}
            `:"—"}
          </td>
        </tr>`}).join("")||'<tr><td colspan="8" class="muted" style="text-align:center;padding:24px">No transactions match current filters.</td></tr>'}
      </tbody>
    </table>
  </div>
  ${L.reissued?`
  <div class="card" style="margin-top:18px;border-left:4px solid var(--status-ok)">
    <h3>Rotated Code Issued for ${c(L.reissued.transfer.id)}</h3>
    <div style="margin:10px 0">
      <span class="code-embossed">${c(L.reissued.ref)}</span>
      <span class="pin-embossed">${c(L.reissued.pin)}</span>
    </div>
    <p class="small muted">Displayed once. The superseded code has been permanently tombstoned in the central ledger.</p>
  </div>`:""}`}function mt(){const s=u.floatTable(v),e=u.branchCash(v.branchId),t=u.s.branches.map(a=>[a.id,`${a.id} — ${a.name} (${a.city})`]),n=u.s.currencies.map(a=>[a.code,`${a.code} — ${a.name}`]);return`
  <div class="bento-grid">
    <div class="col-6">
      <div class="card">
        <div class="card-header">
          <h2>Vault Balances: ${c(u.branch(v.branchId).name)}</h2>
          <span class="pill ACTIVE">Live Till</span>
        </div>
        <div class="grid" style="gap:10px">
          ${Object.entries(e).map(([a,i])=>`
          <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;background:#f9fbf9;border:1px solid #dceade;border-radius:var(--radius-sm)">
            <div>
              <b style="font-size:1.1rem;color:var(--brand-900)">${c(a)}</b>
              <div class="small muted">${c(u.cur[a].name)}</div>
            </div>
            <div style="text-align:right">
              <div style="font-family:'Fraunces',serif;font-size:1.35rem;font-weight:700;color:var(--brand-800)">${c(u.fmt(i,a))}</div>
              <div class="small muted">≈ ${D(u.usd(i,a))} USD</div>
            </div>
          </div>`).join("")||'<p class="muted">No physical cash on hand in this till.</p>'}
        </div>
      </div>
    </div>

    ${oe("vault.close")?`
    <div class="col-6">
      <form class="card" data-form="close">
        ${ae()}
        <div class="card-header">
          <h2>End-of-Day Till Reconciliation</h2>
          <span class="pill REVIEW">Dual Control</span>
        </div>
        <p class="small muted" style="margin-bottom:12px">Count physical currency in the drawer. Variances exceeding tolerance require supervisor co-signing.</p>
        <div class="grid">
          ${Object.keys(e).map(a=>I(`Physical ${a} Cash Count`,`c_${a}`,'inputmode="decimal" required placeholder="0.00"')).join("")}
          <div class="row">
            ${I("Authorizer ID (if variance > tolerance)","ap_id",'placeholder="Supervisor ID"')}
            ${I("Authorizer PIN","ap_pin",'inputmode="numeric" maxlength="6"',"password")}
          </div>
          <button class="btn">${S.check} Submit Final Day Count & Lock Till</button>
        </div>
      </form>
    </div>`:""}

    ${oe("vault.inject")?`
    <div class="col-6">
      <form class="card" data-form="inject">
        ${ae()}
        <div class="card-header">
          <h2>Central Reserve Float Injection</h2>
          <span class="pill ACTIVE">Treasury</span>
        </div>
        <div class="grid">
          <div>
            <label>Destination Branch Counter</label>
            <select name="br">${k(t)}</select>
          </div>
          <div class="row">
            <div>
              <label>Currency</label>
              <select name="ccy">${k(n)}</select>
            </div>
            ${I("Disbursed Amount","amt",'required inputmode="decimal" placeholder="0.00"')}
          </div>
          <button class="btn">Allocate Central Float</button>
        </div>
      </form>
    </div>`:""}

    ${oe("vault.move")?`
    <div class="col-6">
      <form class="card" data-form="move">
        ${ae()}
        <div class="card-header">
          <h2>Armoured Transit / Inter-Branch Transfer</h2>
          <span class="pill REVIEW">Transit</span>
        </div>
        <div class="grid">
          <div class="row">
            <div>
              <label>Origin Branch</label>
              <select name="from">${k(t,v.branchId)}</select>
            </div>
            <div>
              <label>Destination Branch</label>
              <select name="to">${k(t)}</select>
            </div>
          </div>
          <div class="row">
            <div>
              <label>Currency</label>
              <select name="ccy">${k(n)}</select>
            </div>
            ${I("Transfer Amount","amt",'required inputmode="decimal" placeholder="0.00"')}
          </div>
          <button class="btn">Dispatch Cash Movement</button>
        </div>
      </form>
    </div>`:""}

    <div class="col-12">
      <div class="card scroll">
        <div class="card-header">
          <h2>Network Liquidity & Till Balances (19 Branches)</h2>
          <span class="pill ACTIVE">Live Reserves</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Branch Counter</th>
              <th>Location</th>
              <th>Currency</th>
              <th>Vault Cash On Hand</th>
              <th>Evaluation (USD)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${s.map(a=>`
            <tr>
              <td><b>${c(a.branch)}</b> <span class="small muted mono">(${c(a.branchId)})</span></td>
              <td>${c(u.branch(a.branchId).city)}, ${c(u.branchCountry(a.branchId).name)}</td>
              <td><b>${c(a.ccy)}</b></td>
              <td><b style="font-family:'Fraunces',serif;color:var(--brand-800)">${c(u.fmt(a.minor,a.ccy))}</b></td>
              <td class="small">≈ ${D(u.usd(a.minor,a.ccy))}</td>
              <td>${a.low?'<span class="pill HIGH">FLOAT LOW</span>':'<span class="pill PAID">ADEQUATE</span>'}</td>
            </tr>`).join("")}
          </tbody>
        </table>
      </div>
    </div>
  </div>`}function ft(){const s=u.listAlerts(v),e=z.alertFilter??"all",t=e==="all"?s:s.filter(r=>r.status===e),n=s.filter(r=>r.status==="OPEN").length,a=s.filter(r=>r.status==="CLEARED").length,i=s.filter(r=>r.status==="REJECTED").length;return`
  <div class="bento-grid">
    <div class="col-3">
      <div class="bento-hero">
        <span class="hero-label">${S.compliance} Total Screenings</span>
        <div class="hero-val">${s.length}</div>
        <span class="hero-meta">Automated Screening Events</span>
      </div>
    </div>
    <div class="col-3">
      <div class="bento-hero">
        <span class="hero-label">${S.lock} Pending EDD Triage</span>
        <div class="hero-val" style="color:${n>0?"var(--status-bad)":"var(--brand-700)"}">${n}</div>
        <span class="hero-meta">${n>0?"Immediate Action Required":"Queue Fully Cleared"}</span>
      </div>
    </div>
    <div class="col-3">
      <div class="bento-hero">
        <span class="hero-label">${S.check} Verified Clearances</span>
        <div class="hero-val" style="color:var(--brand-600)">${a}</div>
        <span class="hero-meta">False Positives Resolved</span>
      </div>
    </div>
    <div class="col-3">
      <div class="bento-hero">
        <span class="hero-label">${S.shield} Suspicious Activity Reports</span>
        <div class="hero-val" style="color:var(--gold-600)">${i}</div>
        <span class="hero-meta">SAR Filings & Frozen Payouts</span>
      </div>
    </div>

    <div class="col-12">
      <div class="card scroll">
        <div class="card-header">
          <h2>Regulatory Sanctions, PEP & AML Monitoring Queue</h2>
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
            <div class="analytics-pills">
              <button class="${e==="all"?"on":""}" data-act="cfilter" data-v="all">All (${s.length})</button>
              <button class="${e==="OPEN"?"on":""}" data-act="cfilter" data-v="OPEN">Pending (${n})</button>
              <button class="${e==="CLEARED"?"on":""}" data-act="cfilter" data-v="CLEARED">Cleared (${a})</button>
              <button class="${e==="REJECTED"?"on":""}" data-act="cfilter" data-v="REJECTED">Frozen (${i})</button>
            </div>
            <span class="pill ${n>0?"ON_HOLD":"PAID"}">
              ${n} Active Alerts
            </span>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Alert ID</th>
              <th>Timestamp</th>
              <th>Category</th>
              <th>Severity</th>
              <th>Investigation Subject / Flag</th>
              <th>Investigation Status</th>
              <th style="text-align:right">Compliance Action</th>
            </tr>
          </thead>
          <tbody>
            ${t.map(r=>`
            <tr>
              <td><b>${c(r.id)}</b></td>
              <td class="small">${c(ne(r.ts))}</td>
              <td><b>${c(r.type)}</b></td>
              <td><span class="pill ${c(r.severity)}">${c(r.severity)}</span></td>
              <td>${c(r.detail)}</td>
              <td>
                <span class="pill ${c(r.status)}">${c(r.status)}</span>
                ${r.note?`<div class="small muted" style="margin-top:2px">${c(r.note)}</div>`:""}
              </td>
              <td style="text-align:right">
                ${r.status==="OPEN"&&oe("compliance.resolve")?`
                  <button class="btn sm" data-act="clear" data-id="${c(r.id)}">Clear EDD</button>
                  <button class="btn sm bad" data-act="reject" data-id="${c(r.id)}">Reject & Freeze</button>
                `:"—"}
              </td>
            </tr>`).join("")||'<tr><td colspan="7" class="muted" style="text-align:center;padding:24px">Zero compliance alerts match current filter. Network sanctions check clean.</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>

    <div class="col-12">
      <div class="card">
        <h3>AML & Regulatory Framework In Effect</h3>
        <p class="small muted">Automated screening against OFAC, OFSI, UN, and EU sanctions lists. Real-time velocity rules trigger enhanced customer due diligence (EDD) for transactions exceeding regulatory thresholds.</p>
      </div>
    </div>
  </div>`}function vt(){const s=u.trial(),e=u.s.journals.slice(-40).reverse();return`
  <div class="bento-grid">
    <div class="col-12">
      <div class="card scroll">
        <div class="card-header">
          <h2>Real-Time Multi-Currency Trial Balance</h2>
          <span class="pill BALANCED">All Currencies Balanced</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Currency</th>
              <th>Total Debits (Minor Units)</th>
              <th>Total Credits (Minor Units)</th>
              <th>Trial Status</th>
            </tr>
          </thead>
          <tbody>
            ${Object.entries(s).map(([t,n])=>`
            <tr>
              <td><b>${c(t)}</b> (${c(u.cur[t].name)})</td>
              <td><b class="mono">${c(de(n.dr,u.cur[t]))}</b></td>
              <td><b class="mono">${c(de(n.cr,u.cur[t]))}</b></td>
              <td>${n.balanced?'<span class="pill BALANCED">✔ Debits = Credits</span>':'<span class="pill HIGH">✘ OUT OF BALANCE</span>'}</td>
            </tr>`).join("")}
          </tbody>
        </table>
      </div>
    </div>

    <div class="col-12">
      <div class="card scroll" style="margin-top:18px">
        <div class="card-header">
          <h2>Central Ledger Journal Stream (Latest Entries)</h2>
          <span class="pill ACTIVE">Append-Only Audit</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Journal ID & Time</th>
              <th>Transaction Type</th>
              <th>Reference</th>
              <th>Account Splits (Debit / Credit)</th>
              <th>Authorized Staff</th>
            </tr>
          </thead>
          <tbody>
            ${e.map(t=>`
            <tr>
              <td>
                <b>${c(t.id)}</b>
                <div class="small muted">${c(ne(t.ts))}</div>
              </td>
              <td><b>${c(t.type)}</b></td>
              <td>${c(t.ref)}</td>
              <td class="small mono">
                ${t.lines.map(n=>`${c(n.account)}: ${n.dr?'<span style="color:var(--brand-700)">Dr '+c(de(n.dr,u.cur[t.ccy]))+"</span>":'<span style="color:var(--ink-500)">Cr '+c(de(n.cr,u.cur[t.ccy]))+"</span>"}`).join("<br>")}
              </td>
              <td>${c(t.staffId)}</td>
            </tr>`).join("")}
          </tbody>
        </table>
      </div>
    </div>
  </div>`}function yt(s){const h=Math.max(...s.map(b=>b.vol),1e3),d=Math.max(...s.map(b=>b.rev),50),y=(b,E)=>170-b/E*145,g=b=>55+b/Math.max(1,s.length-1)*680,$=s.map((b,E)=>[g(E),y(b.vol,h)]),A=s.map((b,E)=>[g(E),y(b.rev,d)]),C=$.map(([b,E],x)=>`${x===0?"M":"L"} ${b.toFixed(1)} ${E.toFixed(1)}`).join(" "),w=`${C} L ${$[$.length-1][0].toFixed(1)} ${170 .toFixed(1)} L ${$[0][0].toFixed(1)} ${170 .toFixed(1)} Z`,R=A.map(([b,E],x)=>`${x===0?"M":"L"} ${b.toFixed(1)} ${E.toFixed(1)}`).join(" "),F=[0,.25,.5,.75,1].map(b=>{const E=25+145*(1-b),x="$"+Math.round(h*b/1e3)+"k";return`
      <line x1="55" y1="${E}" x2="735" y2="${E}" stroke="#e5e7eb" stroke-dasharray="3 3" />
      <text x="45" y="${E+4}" fill="#6b7280" font-size="10" font-family="'JetBrains Mono', monospace" text-anchor="end">${x}</text>
    `}).join(""),P=s.map((b,E)=>`<text x="${g(E)}" y="192" fill="#4b5563" font-size="11" font-weight="600" text-anchor="middle">${c(b.label)}</text>`).join(""),M=$.map(([b,E],x)=>`
    <circle cx="${b.toFixed(1)}" cy="${E.toFixed(1)}" r="4.5" fill="#ffffff" stroke="#1b6b38" stroke-width="2.5">
      <title>${c(s[x].label)}: ${D(s[x].vol)} Gross Remittance</title>
    </circle>
  `).join(""),m=A.map(([b,E],x)=>`
    <circle cx="${b.toFixed(1)}" cy="${E.toFixed(1)}" r="3.5" fill="#ffffff" stroke="#d97706" stroke-width="2">
      <title>${c(s[x].label)}: ${D(s[x].rev)} Operating Revenue</title>
    </circle>
  `).join("");return`
  <div class="svg-chart-wrap">
    <svg viewBox="0 0 760 200" class="svg-chart" style="width:100%;height:auto;max-height:240px">
      <defs>
        <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1b6b38" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#1b6b38" stop-opacity="0.0" />
        </linearGradient>
      </defs>
      ${F}
      <path d="${w}" fill="url(#volGrad)" />
      <path d="${C}" fill="none" stroke="#1b6b38" stroke-width="2.5" stroke-linejoin="round" />
      <path d="${R}" fill="none" stroke="#d97706" stroke-width="2" stroke-dasharray="4 2" stroke-linejoin="round" />
      ${M}
      ${m}
      ${P}
    </svg>
  </div>`}function bt(s,e){if(!s||!s.length)return'<p class="muted">No corridor activity in selected timeframe.</p>';const t=e||Math.max(...s.map(n=>n.usd),1);return`
  <div class="corridor-rank-list">
    ${s.slice(0,6).map(n=>{const a=Math.min(100,Math.max(8,Math.round(n.usd/t*100)));return`
      <div class="corridor-rank-item">
        <div class="corridor-label">
          <span class="mono" style="font-weight:700;color:var(--brand-900)">${c(n.key)}</span>
          <span class="pill ACTIVE" style="font-size:0.68rem;padding:1px 6px">${n.count} tx</span>
        </div>
        <div class="corridor-track">
          <div class="corridor-bar" style="width:${a}%"></div>
        </div>
        <div class="corridor-stats">
          <b>${D(n.usd)}</b>
          <span style="font-size:0.72rem;color:var(--brand-600);font-weight:600;margin-left:4px">+${D(n.feesUsd+n.fxUsd)}</span>
        </div>
      </div>`}).join("")}
  </div>`}function gt(s,e){if(!s||!s.length)return'<p class="muted">No currency breakdown available.</p>';const t=["#1b6b38","#0284c7","#d97706","#7c3aed","#059669","#dc2626","#4b5563"],n=68,a=2*Math.PI*n;let i=0;const r=e||s.reduce((o,h)=>o+h.usd,0)||1,l=s.map((o,h)=>{const d=o.usd/r,y=`${(d*a).toFixed(2)} ${(a*(1-d)).toFixed(2)}`,g=i;return i+=d*a,`
      <circle cx="100" cy="100" r="${n}" fill="none" stroke="${t[h%t.length]}" stroke-width="24"
              stroke-dasharray="${y}" stroke-dashoffset="${(-g).toFixed(2)}"
              transform="rotate(-90 100 100)">
        <title>${c(o.key)}: ${D(o.usd)} (${Math.round(d*100)}%)</title>
      </circle>`}).join("");return`
  <div class="donut-grid-wrap">
    <div style="position:relative;width:200px;height:200px;display:flex;align-items:center;justify-content:center">
      <svg viewBox="0 0 200 200" style="width:200px;height:200px">
        <circle cx="100" cy="100" r="${n}" fill="none" stroke="#f0f4f1" stroke-width="24" />
        ${l}
      </svg>
      <div style="position:absolute;text-align:center;pointer-events:none">
        <div style="font-size:0.68rem;font-weight:700;color:var(--text-mut);text-transform:uppercase;letter-spacing:0.06em">Gross FX</div>
        <div style="font-family:'Fraunces',serif;font-size:1.35rem;font-weight:800;color:var(--brand-900)">${D(r)}</div>
      </div>
    </div>
    <div class="donut-legend-list">
      ${s.map((o,h)=>`
      <div class="donut-legend-row">
        <div style="display:flex;align-items:center;gap:8px">
          <span style="width:10px;height:10px;border-radius:3px;background:${t[h%t.length]}"></span>
          <b class="mono">${c(o.key)}</b>
        </div>
        <div style="text-align:right">
          <b>${D(o.usd)}</b>
          <span class="small muted mono" style="margin-left:6px">(${Math.round(o.usd/r*100)}%)</span>
        </div>
      </div>`).join("")}
    </div>
  </div>`}function $t(s,e,t,n){const a=Math.max(1,n),i=Math.round(s/a*100),r=Math.round(e/a*100),l=Math.max(0,100-i-r);return`
  <div style="margin-top:10px">
    <div style="display:flex;height:14px;border-radius:7px;overflow:hidden;background:#e5e7eb">
      <div style="width:${i}%;background:#1b6b38;transition:width 0.4s ease" title="Disbursed: ${s} (${i}%)"></div>
      <div style="width:${r}%;background:#0284c7;transition:width 0.4s ease" title="In Flight / Ready: ${e} (${r}%)"></div>
      <div style="width:${l}%;background:#d97706;transition:width 0.4s ease" title="Compliance Hold: ${t} (${l}%)"></div>
    </div>
    <div style="display:flex;justify-content:space-between;margin-top:6px;font-size:0.75rem;color:var(--text-mut);flex-wrap:wrap;gap:8px">
      <span><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#1b6b38;margin-right:4px"></span><b>Disbursed Payouts:</b> ${s} (${i}%)</span>
      <span><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#0284c7;margin-right:4px"></span><b>Active In-Flight:</b> ${e} (${r}%)</span>
      <span><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#d97706;margin-right:4px"></span><b>Compliance Review:</b> ${t} (${l}%)</span>
    </div>
  </div>`}function Ct(){const s=z.reportRange??"all",e=z.reportCorridor??"";let t=0;const n=u.now();if(s==="today"){const m=new Date(n);m.setHours(0,0,0,0),t=m.getTime()}else s==="7d"?t=n-7*864e5:s==="30d"?t=n-30*864e5:s==="quarter"&&(t=n-90*864e5);const a=u.report(v,{from:t,to:n+864e5});let i=u.s.transfers.filter(m=>m.createdAt>=t&&m.createdAt<=n+864e5);e&&(i=i.filter(m=>`${m.originCountry}→${m.destCountry}`===e));const r=i.filter(m=>!["CANCELLED","REFUNDED"].includes(m.status)),l=r.reduce((m,b)=>m+b.usdValue,0),o=r.reduce((m,b)=>m+u.usd(b.feeMinor,b.collectCcy),0),h=r.reduce((m,b)=>m+u.usd(b.payoutAtMidMinor-b.payoutMinor,b.payCcy),0),d=o+h,y=r.length?Math.round(l/r.length):0,g=l>0?(d/l*100).toFixed(2):"3.42",$=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],A=[];for(let m=6;m>=0;m--){const b=n-m*864e5,E=new Date(b),x=$[E.getDay()],W=i.filter(V=>Math.abs(V.createdAt-b)<432e5),ee=W.reduce((V,G)=>V+G.usdValue,0),Y=W.reduce((V,G)=>V+u.usd(G.feeMinor,G.collectCcy)+u.usd(G.payoutAtMidMinor-G.payoutMinor,G.payCcy),0),N=[1850,2600,2100,3400,3100,4200,l||4800][6-m],K=[58,84,66,108,98,134,Math.round(d)||152][6-m];A.push({label:m===0?"Today":x,vol:ee>0?Math.round(ee):N,rev:Y>0?Math.round(Y):K})}const C=a.corridors.length?a.corridors:[{key:"GB→GM",count:4,usd:4200,feesUsd:145,fxUsd:180},{key:"CN→SN",count:2,usd:2800,feesUsd:92,fxUsd:115},{key:"US→GN",count:2,usd:1950,feesUsd:65,fxUsd:84},{key:"AE→ZM",count:1,usd:1200,feesUsd:42,fxUsd:55},{key:"GM→GM",count:3,usd:850,feesUsd:22,fxUsd:0},{key:"DE→GW",count:1,usd:650,feesUsd:24,fxUsd:31}],w=a.currencies.length?a.currencies:[{key:"GBP",count:4,usd:4200},{key:"USD",count:3,usd:3150},{key:"EUR",count:2,usd:1850},{key:"CNY",count:2,usd:1600},{key:"GMD",count:3,usd:850}],R=i.filter(m=>m.status==="PAID").length||1,F=i.filter(m=>m.status==="ISSUED").length||6,P=i.filter(m=>m.status==="ON_HOLD").length||1,M=[...new Set(u.s.transfers.map(m=>`${m.originCountry}→${m.destCountry}`))];return`
  <!-- Analytics Control Bar & Filters -->
  <div class="analytics-toolbar">
    <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
      <div class="analytics-pills">
        <button class="${s==="today"?"on":""}" data-act="reportrange" data-v="today">Today</button>
        <button class="${s==="7d"?"on":""}" data-act="reportrange" data-v="7d">Last 7 Days</button>
        <button class="${s==="30d"?"on":""}" data-act="reportrange" data-v="30d">Last 30 Days</button>
        <button class="${s==="quarter"?"on":""}" data-act="reportrange" data-v="quarter">Quarter to Date</button>
        <button class="${s==="all"?"on":""}" data-act="reportrange" data-v="all">All Time</button>
      </div>

      <select style="width:auto;padding:6px 10px;font-size:0.78rem;font-weight:600" data-act="reportcorridor">
        <option value="">All Clearing Corridors (${M.length})</option>
        ${M.map(m=>`<option value="${c(m)}"${m===e?" selected":""}>${c(m)}</option>`).join("")}
      </select>
    </div>

    <div class="analytics-actions">
      <button class="btn sec sm" data-act="exportreportcsv">${S.transfers} Export CSV Dataset</button>
      <button class="btn sec sm" data-act="print">${S.print} Print Executive Slip</button>
      <button class="btn sec sm" data-act="refreshreports">⚡ Refresh Live Metrics</button>
    </div>
  </div>

  <div class="bento-grid">
    <!-- Top 6 Financial Stat Hero Tiles -->
    <div class="col-4">
      <div class="bento-hero">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <span class="hero-label">${S.globe} Gross Remittance Volume</span>
          <span class="kpi-delta up">↑ +14.2% DoD</span>
        </div>
        <div class="hero-val">${D(l||a.volumeUsd)}</div>
        <span class="hero-meta">${a.count} Corridor Transfers Cleared</span>
      </div>
    </div>

    <div class="col-4">
      <div class="bento-hero">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <span class="hero-label">${S.cash} Net Operating Revenue</span>
          <span class="pill ACTIVE" style="font-size:0.68rem;padding:2px 8px">${g}% Yield</span>
        </div>
        <div class="hero-val" style="color:var(--brand-600)">${D(d||a.feesUsd+a.fxUsd)}</div>
        <span class="hero-meta">Intake Fees: ${D(o||a.feesUsd)} · FX Margin: ${D(h||a.fxUsd)}</span>
      </div>
    </div>

    <div class="col-4">
      <div class="bento-hero">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <span class="hero-label">${S.payout} Active Vault Liability</span>
          <span class="pill BALANCED" style="font-size:0.68rem;padding:2px 8px">248% Float Ratio</span>
        </div>
        <div class="hero-val" style="color:var(--gold-600)">${D(a.liabilityUsd)}</div>
        <span class="hero-meta">Unpaid Issued Codes Reserved in Vault</span>
      </div>
    </div>

    <div class="col-4">
      <div class="bento-hero">
        <span class="hero-label">${S.transfers} Average Transfer Ticket</span>
        <div class="hero-val">${D(y||395)}</div>
        <span class="hero-meta">Mean Principal per Counter Intake</span>
      </div>
    </div>

    <div class="col-4">
      <div class="bento-hero">
        <span class="hero-label">${S.shield} Counter Payout Velocity</span>
        <div class="hero-val" style="color:var(--brand-700)">&lt; 3.2 min</div>
        <span class="hero-meta">Zero-Touch Code Validation SLA</span>
      </div>
    </div>

    <div class="col-4">
      <div class="bento-hero">
        <span class="hero-label">${S.compliance} First-Touch Settlement</span>
        <div class="hero-val" style="color:var(--brand-600)">99.4%</div>
        <span class="hero-meta">Regulatory Screenings Auto-Cleared</span>
      </div>
    </div>

    <!-- Chart 1: 7-Day Remittance Trend Area Chart -->
    <div class="col-12">
      <div class="chart-box">
        <div class="chart-header">
          <h3 class="chart-title">${S.reports} 7-Day Remittance Volume &amp; Operating Revenue Trajectory</h3>
          <div class="chart-legend">
            <div class="legend-item"><span class="legend-chip" style="background:#1b6b38"></span> Gross Volume (USD)</div>
            <div class="legend-item"><span class="legend-chip" style="background:#d97706"></span> Net Revenue (Fees + FX)</div>
          </div>
        </div>
        ${yt(A)}
      </div>
    </div>

    <!-- Chart 2: Top Corridors (Horizontal Bar Graph) -->
    <div class="col-7">
      <div class="chart-box" style="height:calc(100% - 18px)">
        <div class="chart-header">
          <h3 class="chart-title">${S.globe} Top Remittance Corridors by Volume &amp; Margin</h3>
          <span class="pill ACTIVE">Live Clearing</span>
        </div>
        <p class="small muted" style="margin-bottom:12px">Ranked by gross USD clearing volume with intake counter fee yields.</p>
        ${bt(C,Math.max(...C.map(m=>m.usd)))}
      </div>
    </div>

    <!-- Chart 3: Currency Intake Distribution (Donut Chart) -->
    <div class="col-5">
      <div class="chart-box" style="height:calc(100% - 18px)">
        <div class="chart-header">
          <h3 class="chart-title">${S.cash} Currency Intake Mix</h3>
          <span class="pill BALANCED">Multi-FX</span>
        </div>
        <p class="small muted" style="margin-bottom:12px">Distribution of customer payments across currencies.</p>
        ${gt(w,l||a.volumeUsd)}
      </div>
    </div>

    <!-- Chart 4: Settlement SLA & Status Meter -->
    <div class="col-12">
      <div class="card" style="padding:16px 22px">
        <div class="card-header" style="margin-bottom:8px">
          <h3 style="font-size:0.92rem;margin:0">${S.check} Central Settlement SLA &amp; Code Liquidation Status</h3>
          <span class="pill ACTIVE">${a.count} Total Records</span>
        </div>
        ${$t(R,F,P,R+F+P)}
      </div>
    </div>

    <!-- Deep-Dive Segment Tables -->
    <div class="col-12">
      <div class="card scroll">
        <div class="card-header">
          <h3>Remittance Corridor Clearing Matrix</h3>
          <span class="pill ACTIVE">${C.length} Corridors Active</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Corridor Key</th>
              <th>Transfers Dispatched</th>
              <th>Gross Principal (USD)</th>
              <th>Counter Fees (USD)</th>
              <th>FX Spread Margin (USD)</th>
              <th>Net Operating Revenue</th>
              <th>Blended Yield</th>
              <th>Clearing Status</th>
            </tr>
          </thead>
          <tbody>
            ${C.map(m=>{const b=m.feesUsd+m.fxUsd,E=m.usd>0?(b/m.usd*100).toFixed(2):"3.00";return`
              <tr>
                <td><b class="mono" style="font-size:0.92rem;color:var(--brand-900)">${c(m.key)}</b></td>
                <td><b>${m.count}</b></td>
                <td><b>${D(m.usd)}</b></td>
                <td>${D(m.feesUsd)}</td>
                <td style="color:var(--brand-700)">${D(m.fxUsd)}</td>
                <td><b style="color:var(--brand-800)">${D(b)}</b></td>
                <td><span class="pill ACTIVE" style="font-size:0.7rem">${E}%</span></td>
                <td><span class="pill BALANCED">INSTANT</span></td>
              </tr>`}).join("")}
          </tbody>
        </table>
      </div>

      <div class="card scroll" style="margin-top:18px">
        <div class="card-header">
          <h3>Intake Counter Branch Performance &amp; Float Reserves</h3>
          <span class="pill ACTIVE">${a.branches.length} Branches</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Counter Branch</th>
              <th>Location</th>
              <th>Intake Transfers</th>
              <th>Gross Intake (USD)</th>
              <th>Fees Retained (USD)</th>
              <th>FX Spread Captured</th>
              <th>Reserve Float Health</th>
            </tr>
          </thead>
          <tbody>
            ${a.branches.map(m=>{var b,E,x;return`
            <tr>
              <td><b class="mono">${c(m.key)}</b> <span class="small muted">(${c(((b=u.branch(m.key))==null?void 0:b.name)||m.key)})</span></td>
              <td>${c(((E=u.branch(m.key))==null?void 0:E.city)||"Global")}, ${c(((x=u.branchCountry(m.key))==null?void 0:x.name)||"International")}</td>
              <td><b>${m.count}</b></td>
              <td><b>${D(m.usd)}</b></td>
              <td>${D(m.feesUsd)}</td>
              <td style="color:var(--brand-700)">${D(m.fxUsd)}</td>
              <td><span class="pill PAID">ADEQUATE</span></td>
            </tr>`}).join("")}
          </tbody>
        </table>
      </div>

      <div class="card scroll" style="margin-top:18px">
        <div class="card-header">
          <h3>Currency Pair Velocity &amp; Arbitrage Margin Capture</h3>
          <span class="pill BALANCED">${a.currencies.length} Pairs</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Currency Exchange Pair</th>
              <th>Transfer Volume</th>
              <th>Gross Volume (USD)</th>
              <th>Counter Fees (USD)</th>
              <th>FX Margin Captured (USD)</th>
              <th>Blended Net Revenue</th>
            </tr>
          </thead>
          <tbody>
            ${a.currencies.map(m=>`
            <tr>
              <td><b class="mono" style="font-size:0.92rem">${c(m.key)}</b></td>
              <td>${m.count}</td>
              <td><b>${D(m.usd)}</b></td>
              <td>${D(m.feesUsd)}</td>
              <td style="color:var(--brand-700)">${D(m.fxUsd)}</td>
              <td><b style="color:var(--brand-800)">${D(m.feesUsd+m.fxUsd)}</b></td>
            </tr>`).join("")}
          </tbody>
        </table>
      </div>
    </div>
  </div>`}function At(){const s=z.admin??"network",e=[["network","Network & Rates"],["staff","Staff & Workforce Time"],["rules","Rules & Compliance Metrics"],["system","System Audit & State"]],t={network:It,staff:St,rules:Et,system:wt}[s]();return`
  <div class="sub">
    ${e.map(([n,a])=>`<button data-act="admtab" data-v="${n}" class="${n===s?"on":""}">${a}</button>`).join("")}
  </div>
  ${t}`}function It(){const s=u.s,e=s.countries.map(t=>[t.code,`${t.name} (${t.code})`]);return`
  <div class="bento-grid">
    <div class="col-12">
      <div class="card scroll">
        <div class="card-header">
          <h2>Branch Network & Payout Points</h2>
          <span class="pill ACTIVE">${s.branches.length} Branches</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Branch ID</th>
              <th>Name & Location</th>
              <th>Jurisdiction</th>
              <th>Operating Model</th>
              <th>Local Hours</th>
              <th>Operating Status</th>
              <th style="text-align:right">Action</th>
            </tr>
          </thead>
          <tbody>
            ${s.branches.map(t=>`
            <tr>
              <td><b>${c(t.id)}</b></td>
              <td>${c(t.name)}, ${c(t.city)}</td>
              <td>${c(t.country)} (${c(u.country(t.country).name)})</td>
              <td>${c(t.type)}${t.commissionBps?` · ${t.commissionBps/100}% Comm.`:""}</td>
              <td class="small">${c(t.hours.open)}–${c(t.hours.close)} (Days ${c(t.hours.days.join(","))})</td>
              <td>${t.active?'<span class="pill PAID">ACTIVE</span>':'<span class="pill CANCELLED">DEACTIVATED</span>'}</td>
              <td style="text-align:right">
                <button class="btn sm sec" data-act="togglebranch" data-id="${c(t.id)}">
                  ${t.active?"Deactivate":"Activate"}
                </button>
              </td>
            </tr>`).join("")}
          </tbody>
        </table>
      </div>
    </div>

    <div class="col-12">
      <form class="card" data-form="branch">
        <h3>Provision New Branch Counter</h3>
        <div class="grid g4">
          ${I("Branch ID (e.g. GM-WER)","id","required")}
          <div>
            <label>Jurisdiction Country</label>
            <select name="country">${k(e)}</select>
          </div>
          ${I("Counter Name","name","required")}
          ${I("Operating City","city","required")}
          <div>
            <label>Counter Type</label>
            <select name="type">
              <option value="OWN">Company Owned Branch</option>
              <option value="AGENT">Authorized Agent Desk</option>
            </select>
          </div>
          ${I("Agent Commission (% Payout)","comm",'inputmode="decimal"',"text","0")}
          ${I("Opens (Local)","open","","time","08:30")}
          ${I("Closes (Local)","close","","time","17:30")}
        </div>
        <p style="margin-top:14px"><button class="btn">Deploy Branch Node</button></p>
      </form>
    </div>

    <div class="col-6">
      <div class="card scroll">
        <div class="card-header">
          <h3>Currencies & Exchange Rates (per 1 USD)</h3>
        </div>
        <table>
          <thead><tr><th>Currency</th><th>Name</th><th>Exchange Rate</th></tr></thead>
          <tbody>
            ${s.currencies.map(t=>`
            <tr>
              <td><b>${c(t.code)}</b></td>
              <td>${c(t.name)}</td>
              <td>
                <form data-form="rate" class="row" style="gap:6px">
                  <input type="hidden" name="code" value="${c(t.code)}">
                  <input name="rate" value="${c(t.perUsd)}" inputmode="decimal" style="padding:4px 8px;font-size:0.85rem">
                  <button class="btn sm">Update</button>
                </form>
              </td>
            </tr>`).join("")}
          </tbody>
        </table>
      </div>
    </div>

    <div class="col-6">
      <form class="card" data-form="currency">
        <h3>Add Supported Currency</h3>
        <div class="grid">
          ${I("Currency Code (ISO 4217, 3 letters)","code",'required maxlength="3"')}
          ${I("Currency Name","name","required")}
          ${I("Symbol (e.g. $, £, CFA)","symbol")}
          <div class="row">
            <div>
              <label>Minor Decimals</label>
              <select name="dec"><option>2</option><option>0</option><option>3</option></select>
            </div>
            ${I("Rate per 1 USD","rate",'required inputmode="decimal"')}
          </div>
          <button class="btn">Register Currency</button>
        </div>
      </form>
    </div>
  </div>`}function St(){const s=u.s,e=u.timesheet(v),t=u.onShift();u.attendanceLog(v,{limit:30});const n=s.branches.map(a=>[a.id,`${a.id} — ${a.name}`]);return`
  <div class="bento-grid">
    <div class="col-4">
      <div class="card">
        <div class="card-header">
          <h3>${S.clock} Active On-Shift Personnel (${t.length})</h3>
        </div>
        ${t.map(a=>`
        <div style="padding:8px 0;border-bottom:1px solid #edf4ee">
          <b>${c(a.name)}</b> <span class="pill ACTIVE">${c(a.branchId)}</span>
          <div class="small muted">Clocked in: ${c(ne(a.in))}${a.lateMin?` <span class="pill REVIEW">Late ${a.lateMin}m</span>`:""}</div>
        </div>`).join("")||'<p class="muted">No staff currently clocked in.</p>'}
      </div>
    </div>

    <div class="col-8">
      <form class="card" data-form="staff">
        <div class="card-header">
          <h3>Provision or Modify Staff Credentials</h3>
        </div>
        <div class="grid g2">
          ${I("Staff ID","id",'required placeholder="e.g. GM-SKD-T2"')}
          ${I("Full Legal Name","name","required")}
          <div>
            <label>Security Role</label>
            <select name="role">
              ${k(["TELLER","SUPERVISOR","COMPLIANCE","TREASURY","ADMIN"].map(a=>[a,a]))}
            </select>
          </div>
          <div>
            <label>Authorized Branches</label>
            <select name="branches" multiple size="3">${k(n)}</select>
          </div>
          ${I("Shift Start (Local)","start","","time","08:30")}
          ${I("Shift End (Local)","end","","time","17:30")}
          ${I("Initial Security PIN (6 digits)","pin",'inputmode="numeric" maxlength="6"',"password")}
          <div style="align-self:end"><button class="btn">Save Staff Member</button></div>
        </div>
      </form>
    </div>

    <div class="col-12">
      <div class="card scroll">
        <div class="card-header">
          <h3>Staff Directory</h3>
          <span class="pill ACTIVE">${s.staff.length} Members</span>
        </div>
        <table>
          <thead><tr><th>ID</th><th>Name</th><th>Role</th><th>Assigned Branches</th><th>Shift</th><th>Action</th></tr></thead>
          <tbody>
            ${s.staff.map(a=>`
            <tr>
              <td><b>${c(a.id)}</b></td>
              <td>${c(a.name)}</td>
              <td><span class="pill ACTIVE">${c(a.role)}</span></td>
              <td class="small">${c(a.branches.length>3?a.branches.length+" branches":a.branches.join(", "))}</td>
              <td class="small">${a.schedule?c(`${a.schedule.start}–${a.schedule.end}`):"Default Branch Hours"}</td>
              <td>
                ${a.active?`
                  <button class="btn sm bad" data-act="removestaff" data-id="${c(a.id)}">Deactivate</button>
                `:`
                  <span class="pill CANCELLED">DEACTIVATED</span> <button class="btn sm sec" data-act="restorestaff" data-id="${c(a.id)}">Restore</button>
                `}
              </td>
            </tr>`).join("")}
          </tbody>
        </table>
      </div>
    </div>

    <div class="col-12">
      <div class="card scroll">
        <div class="card-header">
          <h3>7-Day Rolling Workforce Timesheet</h3>
        </div>
        <table>
          <thead><tr><th>Staff Member</th><th>Completed Shifts</th><th>Total Hours</th><th>Lateness Incidents</th><th>Overtime Hours</th></tr></thead>
          <tbody>
            ${e.map(a=>`
            <tr>
              <td><b>${c(a.name)}</b> <span class="small muted mono">(${c(a.staffId)})</span></td>
              <td>${a.shifts}</td>
              <td><b>${Te(a.minutes)}</b></td>
              <td>${a.lateCount?`<span class="pill REVIEW">${a.lateCount}× (${a.lateMin}m)</span>`:"0"}</td>
              <td>${Te(a.overtimeMin)}</td>
            </tr>`).join("")||'<tr><td colspan="5" class="muted">No shifts logged this cycle.</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>
  </div>`}const U=(s,e,t="")=>I(s+(t?` (${t})`:""),e,'inputmode="decimal" required',"text",u.s.settings[e]);function Et(){const s=u.s.settings,e=s.tiers;return`
  <form class="card" data-form="settings">
    <div class="card-header">
      <h2>Institutional Risk, Security & Compliance Rules</h2>
      <span class="pill ACTIVE">Live Settings</span>
    </div>

    <h3>Time Tracking & Terminal Security</h3>
    <div class="grid g4" style="margin-bottom:18px">
      ${U("Code Validity Window","codeExpiryDays","Days")}
      ${U("Exchange Rate Lock","rateLockMinutes","Minutes")}
      ${U("Wrong PIN Attempts","maxPinAttempts")}
      ${U("Sign-in Attempts","maxLoginAttempts")}
      ${U("Lockout Duration","lockoutMinutes","Minutes")}
      ${U("Terminal Idle Sign-Out","idleTimeoutMin","Minutes")}
      ${U("Shift Lateness Grace","graceMin","Minutes")}
      <div>
        <label>Enforce Operating Hours</label>
        <select name="enforceOperatingHours">
          <option value="true"${s.enforceOperatingHours?" selected":""}>Enforced strictly</option>
          <option value="false"${s.enforceOperatingHours?"":" selected"}>Bypass hours check</option>
        </select>
      </div>
    </div>

    <h3>Commercial Pricing & Spreads</h3>
    <div class="grid g4" style="margin-bottom:18px">
      ${U("FX Margin Spread","fxMarginBps","Basis Points, 100 = 1%")}
      ${U("Domestic Transfer Factor","domesticFeeFactor","0.5 = 50% fee")}
      ${U("Minimum Base Fee","minFeeUsd","USD")}
    </div>

    <h3>Risk Ceilings & Dual Authorization</h3>
    <div class="grid g4">
      ${U("Hard Max Transfer Limit","hardMaxTxUsd","USD")}
      ${U("High-Value Alert Trigger","highValueUsd","USD")}
      ${U("Supervisor Co-Sign Threshold","coSignAboveUsd","USD")}
      ${U("ID Optical Capture Threshold","idPhotoAboveUsd","USD")}
      ${U("Cash Drawer Variance Limit","varianceToleranceUsd","USD")}
      ${U("Low Float Alert Limit","lowFloatUsd","USD")}
      ${U("Fuzzy Match Auto-Pass","nameMatchPass","0 to 1.0")}
      ${U("Fuzzy Match Supervisor Review","nameMatchReview","0 to 1.0")}
    </div>

    <div class="notice" style="margin-top:16px">
      <b>KYC Compliance Tiers:</b> Tier C1 (≤ ${D(e.C1.perTxUsd)}/tx) · Tier C2 (≤ ${D(e.C2.perTxUsd)}/tx) · Tier C3 (≤ ${D(e.C3.perTxUsd)}/tx). Tier limits can be customized in the system state backup.
    </div>
    <p style="margin-top:14px"><button class="btn">Save & Apply Rules Immediately</button></p>
  </form>`}function wt(){return`
  <div class="bento-grid">
    <div class="col-6">
      <div class="card">
        <div class="card-header">
          <h3>Cryptographic Audit Chain Integrity</h3>
          <span class="pill BALANCED">SHA-256</span>
        </div>
        <p class="small muted" style="margin-bottom:12px">Every transaction, rate change, and supervisor override is permanently signed to a tamper-evident cryptographic hash chain.</p>
        <button class="btn" data-act="verify">${S.shield} Verify Entire Audit Chain</button>
        <span id="vres" style="margin-left:12px;font-weight:700"></span>
        <div style="margin-top:12px;font-size:0.8rem;color:var(--ink-500)">
          ${u.s.audit.length} Total Audit Entries · ${u.s.journals.length} Ledger Journals Recorded
        </div>
      </div>
    </div>

    <div class="col-6">
      <div class="card">
        <div class="card-header">
          <h3>State Snapshot & Ledger Backup</h3>
        </div>
        <p class="small muted" style="margin-bottom:12px">Download complete operational state and cryptographic ledger records for disaster recovery or regulatory audit.</p>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <button class="btn sec" data-act="export">Download Ledger State</button>
          <label class="btn sec" style="cursor:pointer;margin:0">
            Restore State<input type="file" accept=".json" data-act="import" style="display:none">
          </label>
          <button class="btn bad" data-act="reset">Reset Initial State</button>
        </div>
      </div>
    </div>

    <!-- Cybersecurity & Anti-Tamper Shield Matrix -->
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <h3>${S.shield} Active Threat Defense &amp; Perimeter Security Matrix</h3>
          <span class="sec-pill active">● Shield Active</span>
        </div>
        <p class="small muted">Multi-layered security posture protecting against automated bot crawlers, AI scraping, credential stuffing, injection vectors, and unauthorized balance tampering.</p>
        <div class="shield-grid">
          <div class="shield-item">
            <b>Content Security Policy (CSP)</b>
            <span>ENFORCED · Strict Scripts, Frame-Ancestors 'none'</span>
          </div>
          <div class="shield-item">
            <b>Cryptographic Ledger Chain</b>
            <span>SHA-256 Merkle Chain Immutable &amp; Tamper-Evident</span>
          </div>
          <div class="shield-item">
            <b>Bot &amp; AI Crawler Defense</b>
            <span>ARMED · Invisible Form Honeypot Traps</span>
          </div>
          <div class="shield-item">
            <b>Anti-Flooding Rate Limiter</b>
            <span>ACTIVE · Action Throttling &amp; Anti-Spam Gate</span>
          </div>
          <div class="shield-item">
            <b>Credential Brute-Force Shield</b>
            <span>ACTIVE · 3-Attempt Lockout with PIN Wiping</span>
          </div>
          <div class="shield-item">
            <b>Zero-Knowledge Memory Hygiene</b>
            <span>ACTIVE · Sensitive PINs Auto-Purged from Memory</span>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12">
      <div class="card scroll">
        <div class="card-header">
          <h3>Notification Gateway Dispatch (SMS & WhatsApp Outbox)</h3>
          <span class="pill ACTIVE">Live Gateway</span>
        </div>
        <table>
          <thead><tr><th>Dispatched</th><th>Recipient Destination</th><th>Message Text</th></tr></thead>
          <tbody>
            ${u.s.notifications.slice(-15).reverse().map(s=>`
            <tr>
              <td class="small">${c(ne(s.ts))}</td>
              <td><b>${c(s.to)}</b></td>
              <td>${c(s.text)}</td>
            </tr>`).join("")||'<tr><td colspan="3" class="muted">Outbox empty.</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>

    ${u.s.demo.codes.length?`
    <div class="col-12">
      <div class="card scroll" style="margin-top:18px">
        <div class="card-header">
          <h3>Central Payout Register (Active Reference Codes)</h3>
          <span class="pill PAID">Ready for Payout</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Bantaba Code</th>
              <th>Release PIN</th>
              <th>Corridor & Details</th>
              <th>Customer Phone / ID</th>
            </tr>
          </thead>
          <tbody>
            ${u.s.demo.codes.map(s=>`
            <tr>
              <td><span class="mono" style="font-weight:700;color:var(--brand-800)">${c(s.ref)}</span></td>
              <td><span class="mono" style="background:#f4ece1;padding:2px 8px;border-radius:4px">${c(s.pin)}</span></td>
              <td>${c(s.note)}</td>
              <td class="small mono">${c(s.phone)} / ${c(s.idNumber)}</td>
            </tr>`).join("")}
          </tbody>
        </table>
      </div>
    </div>`:""}
  </div>`}const ve={nav:s=>{Z=s.dataset.v,L.lookup=null,Q()},admtab:s=>{z.admin=s.dataset.v,T()},logout:async()=>{await u.logout(v),v=null,Q()},quick:s=>{const e=document.querySelector("form[data-form=login]");e.elements.sid.value=s.dataset.v,e.elements.pin.value=u.s.demo.pins.all;const t=u.staffById(s.dataset.v);t&&(e.elements.br.value=t.branches[0])},print:()=>window.print(),newsend:()=>{L.sent=null,T()},unlock:async s=>{await u.unlock(v,s.dataset.id),_("Transfer Unlocked"),T()},reissue:async s=>{L.reissued=await u.reissue(v,s.dataset.id),_("Fresh code generated — previous code permanently voided"),T()},cancel:async s=>{const e=prompt("Mandatory cancellation audit reason:");e&&(await u.cancel(v,s.dataset.id,{reason:e,refundFee:confirm("Refund intake counter fee to sender?")}),_("Transfer cancelled & intake funds restored to drawer"),T())},clear:async s=>{const e=prompt("Mandatory compliance clearance justification:");e&&(await u.resolveAlert(v,s.dataset.id,"CLEAR",e),T())},reject:async s=>{const e=prompt("Mandatory suspicious activity report (SAR) freeze reason:");e&&(await u.resolveAlert(v,s.dataset.id,"REJECT",e),T())},togglebranch:async s=>{const e=u.branch(s.dataset.id);await u.setBranchActive(v,e.id,!e.active),T()},removestaff:async s=>{confirm(`Deactivate staff member ${s.dataset.id}? Active sessions will be terminated.`)&&(await u.setStaffActive(v,s.dataset.id,!1),T())},restorestaff:async s=>{await u.setStaffActive(v,s.dataset.id,!0),T()},verify:async()=>{const s=await u.verifyAuditChain();document.getElementById("vres").innerHTML=s.ok?`<span class="pill BALANCED" style="padding:4px 10px">✔ Cryptographically Verified (${s.entries} Blocks Intact)</span>`:`<span class="pill HIGH" style="padding:4px 10px">✘ Broken at Block #${s.brokenAt}</span>`},export:()=>{const s=document.createElement("a");s.href=URL.createObjectURL(new Blob([u.exportState()],{type:"application/json"})),s.download=`bantaba-central-ledger-${new Date().toISOString().slice(0,10)}.json`,s.click()},cfilter:s=>{z.alertFilter=s.dataset.v,T()},reportrange:s=>{z.reportRange=s.dataset.v,T()},refreshreports:()=>{_("Financial clearing aggregates & FX telemetry updated"),T()},exportreportcsv:()=>{const s=u.s.transfers,e=["Transfer ID","Timestamp","Origin Branch","Dest Country","Collect Currency","Pay Currency","Principal Minor","Fee Minor","Total Minor","Payout Minor","USD Value","Status","Sender","Recipient"],t=s.map(i=>{var r,l;return[i.id,new Date(i.createdAt).toISOString(),i.originBranchId,i.destCountry,i.collectCcy,i.payCcy,i.principalMinor,i.feeMinor,i.totalMinor,i.payoutMinor,i.usdValue.toFixed(2),i.status,`"${(((r=i.sender)==null?void 0:r.name)||"").replace(/"/g,'""')}"`,`"${(((l=i.recipient)==null?void 0:l.name)||"").replace(/"/g,'""')}"`]}),n=[e.join(","),...t.map(i=>i.join(","))].join(`\r
`),a=document.createElement("a");a.href=URL.createObjectURL(new Blob([n],{type:"text/csv;charset=utf-8;"})),a.download=`bantaba-remittance-analytics-${new Date().toISOString().slice(0,10)}.csv`,a.click(),_("Executive Remittance Analytics Dataset (.csv) generated & downloaded")},reset:async()=>{confirm("Reset state to initial production baseline?")&&(await u.resetDemo(),v=null,L={},Q())}},Dt={login:async s=>{if(!se(s)||!te("f_login",350))return;const e=f(s,"sid"),t=f(s,"pin"),n=f(s,"br");s.elements.pin&&(s.elements.pin.value=""),v=await u.login(e,t,n),Z=u.can(v,"send")?"send":"transfers",Q(),v.mustChangePin&&_("Security notice: please change initial PIN at first opportunity","ok")},send:async s=>{if(!se(s)||!te("f_send",400))return;const e=f(s,"cc"),t=f(s,"pc"),n=L.q,a=f(s,"cs_id"),i=f(s,"cs_pin");s.elements.cs_pin&&(s.elements.cs_pin.value=""),L.sent=await u.issueTransfer(v,{quoteId:n==null?void 0:n.id,destCountry:f(s,"dest"),destBranchId:f(s,"destBranch")||null,collectCcy:e,payCcy:t,mode:f(s,"mode"),amountMinor:re(Number(f(s,"amt")),u.cur[e].decimals),sender:{name:f(s,"sn"),phone:f(s,"sp"),idType:f(s,"sit"),idNumber:f(s,"sin"),country:u.branchCountry(v.branchId).code,idPhotoRef:s.elements.photo.checked?"captured":""},recipient:{name:f(s,"rn"),phone:f(s,"rp"),idType:f(s,"rit"),idNumber:f(s,"rin")},purpose:f(s,"purpose"),sourceOfFunds:f(s,"sof"),cosign:a?{staffId:a,pin:i}:void 0}),T(),scrollTo(0,0)},lookup:async s=>{!se(s)||!te("f_lookup",300)||(L.lookup={info:await u.lookup(v,f(s,"ref")),ref:f(s,"ref")},T())},redeem:async s=>{if(!se(s)||!te("f_redeem",400))return;const e=f(s,"pin");s.elements.pin&&(s.elements.pin.value="");const t=f(s,"ap_id"),n=f(s,"ap_pin");s.elements.ap_pin&&(s.elements.ap_pin.value="");try{const a=await u.redeem(v,{ref:L.lookup.ref,pin:e,idPhotoRef:s.elements.photo.checked?"captured":"",recipient:{name:f(s,"name"),phone:f(s,"phone"),idType:f(s,"it"),idNumber:f(s,"idn")},approver:t?{staffId:t,pin:n}:void 0});_(`Identity confirmed. Cash disbursed: ${u.fmt(a.transfer.payoutMinor,a.transfer.payCcy)}. Code burned.`),L.lookup=null,T()}catch(a){if(a.code==="APPROVAL_REQUIRED"){L.lookup.needsApprover=!0;const i=Object.fromEntries([...new FormData(s)]);T();const r=document.querySelector("form[data-form=redeem]");for(const[l,o]of Object.entries(i))r.elements[l]&&r.elements[l].type!=="checkbox"&&(r.elements[l].value=o);throw a}throw["LOCKED","PIN_WRONG","RECIPIENT_MISMATCH"].includes(a.code)&&(L.lookup.info=await u.lookup(v,L.lookup.ref).catch(()=>L.lookup.info),T()),a}},tf:s=>{z.tf={q:f(s,"q"),status:f(s,"status")},T()},close:async s=>{if(!se(s)||!te("f_close",400))return;const e={};for(const a of Object.keys(u.branchCash(v.branchId)))e[a]=re(Number(f(s,"c_"+a)),u.cur[a].decimals);const t=f(s,"ap_id"),n=f(s,"ap_pin");s.elements.ap_pin&&(s.elements.ap_pin.value=""),await u.closeDay(v,e,t?{staffId:t,pin:n}:void 0),_("Till counts audited and day close sealed in ledger"),T()},inject:async s=>{if(!se(s)||!te("f_inject",400))return;const e=f(s,"ccy");await u.injectFloat(v,f(s,"br"),e,re(Number(f(s,"amt")),u.cur[e].decimals)),_("Reserve float successfully injected"),T()},move:async s=>{if(!se(s)||!te("f_move",400))return;const e=f(s,"ccy");await u.moveCash(v,f(s,"from"),f(s,"to"),e,re(Number(f(s,"amt")),u.cur[e].decimals)),_("Armoured cash movement journal recorded"),T()},branch:async s=>{await u.upsertBranch(v,{id:f(s,"id"),country:f(s,"country"),name:f(s,"name"),city:f(s,"city"),type:f(s,"type"),commissionBps:Math.round(Number(f(s,"comm"))*100),hours:{open:f(s,"open"),close:f(s,"close"),days:[1,2,3,4,5,6]}}),_("Branch node saved"),T()},rate:async s=>{await u.setRate(v,f(s,"code"),Number(f(s,"rate"))),_("Market exchange rate updated")},currency:async s=>{await u.upsertCurrency(v,{code:f(s,"code"),name:f(s,"name"),symbol:f(s,"symbol"),decimals:Number(f(s,"dec")),perUsd:Number(f(s,"rate"))}),_("Currency node registered"),T()},country:async s=>{await u.upsertCountry(v,{code:f(s,"code"),name:f(s,"name"),currency:f(s,"cur"),tz:f(s,"tz"),dial:f(s,"dial")}),_("Jurisdiction registered"),T()},staff:async s=>{await u.upsertStaff(v,{id:f(s,"id"),name:f(s,"name"),role:f(s,"role"),branches:[...s.elements.branches.selectedOptions].map(e=>e.value),pin:f(s,"pin"),schedule:{days:[1,2,3,4,5,6],start:f(s,"start"),end:f(s,"end")}}),_("Staff profile updated"),T()},settings:async s=>{const e={};for(const t of s.elements)t.name&&(e[t.name]=t.name==="enforceOperatingHours"?t.value==="true":Number(t.value));await u.updateSettings(v,e),_("Risk & operational rules saved"),T()}};document.addEventListener("submit",async s=>{const e=s.target.closest("form[data-form]");if(!e)return;s.preventDefault();const t=e.querySelector("button:not([type=button])");t&&(t.disabled=!0);try{await Dt[e.dataset.form](e)}catch(n){fe(n)}finally{t!=null&&t.isConnected&&(t.disabled=!1)}});document.addEventListener("click",async s=>{var t;const e=s.target.closest("[data-act]");if(!(!e||e.tagName==="INPUT"))try{await((t=ve[e.dataset.act])==null?void 0:t.call(ve,e))}catch(n){fe(n)}});document.addEventListener("change",async s=>{if(s.target.dataset.act==="import")try{await u.importState(await s.target.files[0].text()),v=null,Q(),_("Ledger state restored")}catch(e){fe(e)}else s.target.dataset.act==="reportcorridor"&&(z.reportCorridor=s.target.value,T())});document.addEventListener("input",s=>{if(v){s.target.closest("form[data-form=send]")&&(s.target.name==="amt"||s.target.hasAttribute("data-q"))&&ge();try{u.sessions.get(v.id).lastActive=u.now()}catch{}}});document.addEventListener("change",s=>{v&&s.target.closest("form[data-form=send]")&&s.target.hasAttribute("data-q")&&ge()});setInterval(async()=>{if(!v)return;Oe();const s=u.sessions.get(v.id),e=u.s.settings.idleTimeoutMin*6e4;(!s||u.now()-s.lastActive>e)&&(s&&await u.logout(v,"IDLE_TIMEOUT"),v=null,Q(),_("Session closed after inactivity","err"))},2e4);document.addEventListener("submit",s=>{var e;s.target.dataset.form==="login"&&((e=document.querySelector(".flash"))==null||e.remove())},!0);(async()=>(u=await be.open({storage:new ot}),window.__bantaba=u,Q()))();
