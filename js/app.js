const TOOLS=[
  {id:'word-counter',name:'Word Counter',desc:'Hitung kata, karakter, kalimat, dan paragraf secara real-time.',icon:'📝',cat:'Text',color:'#6366f1',bg:'#eef2ff'},
  {id:'case-converter',name:'Case Converter',desc:'Ubah teks ke UPPERCASE, lowercase, Title Case, atau sentence case.',icon:'🔤',cat:'Text',color:'#8b5cf6',bg:'#f5f3ff'},
  {id:'json-formatter',desc:'Format, validasi, dan minify JSON dengan mudah.',name:'JSON Formatter',icon:'{ }',cat:'Developer',color:'#ec4899',bg:'#fdf2f8'},
  {id:'base64',name:'Base64 Encoder/Decoder',desc:'Encode dan decode teks ke/Base64 secara instan.',icon:'🔐',cat:'Developer',color:'#f59e0b',bg:'#fffbeb'},
  {id:'url-encoder',name:'URL Encoder/Decoder',desc:'Encode dan decode URL dengan benar.',icon:'🔗',cat:'Developer',color:'#10b981',bg:'#ecfdf5'},
  {id:'password-generator',name:'Password Generator',desc:'Buat password kuat dan aman secara acak.',icon:'🔑',cat:'Utility',color:'#ef4444',bg:'#fef2f2'},
  {id:'color-picker',name:'Color Picker',desc:'Pilih warna dan dapatkan kode HEX, RGB, HSL.',icon:'🎨',cat:'Utility',color:'#06b6d4',bg:'#ecfeff'},
  {id:'text-diff',name:'Text Diff',desc:'Bandingkan dua teks dan lihat perbedaannya.',icon:'🔍',cat:'Text',color:'#64748b',bg:'#f1f5f9'},
  {id:'markdown-preview',name:'Markdown Preview',desc:'Preview Markdown secara real-time.',icon:'📖',cat:'Text',color:'#0ea5e9',bg:'#f0f9ff'},
  {id:'qr-generator',name:'QR Code Generator',desc:'Buat QR code dari teks atau URL.',icon:'📱',cat:'Utility',color:'#7c3aed',bg:'#f5f3ff'},
  {id:'lorem-ipsum',name:'Lorem Ipsum Generator',desc:'Generate placeholder text untuk design.',icon:'📄',cat:'Text',color:'#84cc16',bg:'#f7fee7'},
  {id:'html-preview',name:'HTML Preview',desc:'Preview kode HTML secara real-time.',icon:'🌐',cat:'Developer',color:'#f97316',bg:'#fff7ed'},
];

const CATS=['Semua','Text','Developer','Utility'];

function getTools(){return TOOLS}
function getCategories(){return CATS}
function getToolById(id){return TOOLS.find(t=>t.id===id)}

/* THEME */
function initTheme(){
  const saved=localStorage.getItem('qt-theme')||'light';
  document.documentElement.setAttribute('data-theme',saved);
}
function toggleTheme(){
  const cur=document.documentElement.getAttribute('data-theme');
  const next=cur==='dark'?'light':'dark';
  document.documentElement.setAttribute('data-theme',next);
  localStorage.setItem('qt-theme',next);
  const btn=document.querySelector('.theme-toggle');
  if(btn)btn.textContent=next==='dark'?'☀️':'🌙';
}

/* NAV */
function initNav(){
  const btn=document.querySelector('.nav-menu-btn');
  const links=document.querySelector('.nav-links');
  if(btn&&links){
    btn.addEventListener('click',()=>links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));
  }
  const tb=document.querySelector('.theme-toggle');
  if(tb){
    const theme=document.documentElement.getAttribute('data-theme');
    tb.textContent=theme==='dark'?'☀️':'🌙';
  }
}

/* COPY */
function copyText(text,btn){
  navigator.clipboard.writeText(text).then(()=>{
    const orig=btn.textContent;
    btn.textContent='Tersalin!';
    setTimeout(()=>btn.textContent=orig,1500);
  });
}

/* HOME */
function initHome(){
  renderCategories();
  renderTools();
  const si=document.getElementById('searchInput');
  if(si)si.addEventListener('input',renderTools);
}
function renderCategories(){
  const c=document.getElementById('categories');
  if(!c)return;
  let html='';
  CATS.forEach(cat=>{
    html+=`<button class="cat-btn${cat==='Semua'?' active':''}" onclick="filterCat('${cat}',this)">${cat}</button>`;
  });
  c.innerHTML=html;
}
let currentCat='Semua';
function filterCat(cat,btn){
  currentCat=cat;
  document.querySelectorAll('.cat-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderTools();
}
function renderTools(){
  const q=(document.getElementById('searchInput')?.value||'').toLowerCase();
  let list=TOOLS;
  if(currentCat!=='Semua')list=list.filter(t=>t.cat===currentCat);
  if(q)list=list.filter(t=>t.name.toLowerCase().includes(q)||t.desc.toLowerCase().includes(q)||t.cat.toLowerCase().includes(q));
  const c=document.getElementById('toolsGrid');
  if(!c)return;
  if(!list.length){c.innerHTML='<div class="no-results">Tidak ditemukan tools yang cocok.</div>';return;}
  c.innerHTML=list.map(t=>`
    <a href="tools/${t.id}.html" class="tool-card">
      <div class="tool-icon" style="background:${t.bg};color:${t.color}">${t.icon}</div>
      <h3>${t.name}</h3>
      <p>${t.desc}</p>
      <span class="tag">${t.cat}</span>
    </a>
  `).join('');
}

document.addEventListener('DOMContentLoaded',()=>{
  initTheme();initNav();
  if(document.getElementById('toolsGrid'))initHome();
});
