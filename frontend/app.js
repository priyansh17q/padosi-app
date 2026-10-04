/* ============================================================
   Padosi Pro — Hyperlocal Marketplace App
   ============================================================ */
'use strict';

/* ---------------- Helpers ---------------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const icon = (name, cls = '', fill = false) =>
  `<span class="material-symbols-outlined ${cls}" ${fill ? `style="font-variation-settings:'FILL' 1"` : ''}>${name}</span>`;
const img = (src, alt, cls, fallbackBg = 'linear-gradient(135deg,#dce9ff,#85f8c4)') =>
  `<img src="${src}" alt="${esc(alt||'')}" class="${cls}" loading="lazy"
        onerror="this.style.display='none';this.parentElement.style.background='${fallbackBg}';this.parentElement.classList.add('img-skeleton');"/>`;

/* Global ripple */
document.addEventListener('click', e => {
  const btn = e.target.closest('.ripple');
  if (!btn) return;
  const r = document.createElement('span');
  r.className = 'ripple-ink';
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  r.style.width = r.style.height = size + 'px';
  r.style.left = (e.clientX - rect.left - size / 2) + 'px';
  r.style.top = (e.clientY - rect.top - size / 2) + 'px';
  btn.appendChild(r);
  setTimeout(() => r.remove(), 600);
});

/* ---------------- Data ---------------- */
const USER = { name: 'Karthik Menon', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzNHujXaJW-CVQdR8E0e3rpyF4OjLH-AAtDdRIfDGo5bDegI1BddQ0p0RywYXbLb53pdKXMzW5rk6OaX0lPIrx4Y9bk1hnvI2NfEdKvLtp9iWksREttNrGNygwVfbCCawgCA7ArxvTb7xmGxF2o7zxK5hnwl_nhNXZuwDxRBg4CEWZKzE6y8RqU-dWXlIEOSNWMNMFBLGaGh5wKr6Quehp6ZPwP5Tuc_O_VbhTRH0AosZe3_p4SOxd' };
const LOGO = 'https://lh3.googleusercontent.com/aida/AEtjO1XLLUPFADslrduwTP6ZkTBe07WEWV3VhQEVi2UYEOzZAa31WD9xi_-dd22iNU5QhCDWQ3-muojCxcRqK2V0VWOP1xqYvJ8z1EhlFYplAHXe5nSS9FewpGYecw0xlrNR6Z5yqfSn8KT4hYOCJ5PYHj2Udf016Q8LklgvCQMFT_38QgyWkkAV1kAOj2sdKe9S8BQPc3f4FHU1qGW617GZArN97vy2a2e3eL2n1aa_9NuXFPKck0hZCHFYhdQ';

let TASKS = [
  {
    id: 't1', category: 'grocery', price: 220, fee: 200, bonus: 20,
    title: "Pick up 4 items from Nature's Basket + Dairy milk",
    distance: '0.6 km away', time: '~25 mins run',
    urgency: 'Urgent • within 45m', urgencyBg: 'bg-tertiary-fixed text-on-tertiary-fixed-variant', urgencyIcon: 'timer',
    store: "Nature's Basket, 12th Main", storeSub: 'Sourdough, A2 Milk, Greek Yogurt, Berries',
    storeImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2weU3495JTIpLRcSuT8xl0UqbsWz_YHqyXJ81AulKMhQtiTz9YgFtFTVCqtaC_yZruL3bHue75yWYaKmzkHwGE5c9vEl-Vxul2NSh_6jkb0gR5x_mNoLGvDYEfNXg0u9g-XYy_Qmx4sk_cdXZIVoetmtD8iZbYGxM30Zene-nlR5F_dJx7RsLjRRisFAan9u5ZOh7JxwUDHDGWfMcbEgHfaP-uPM0zBDHO0yk8CkR1vYxn0rQ3A60',
    requester: 'Ananya R.', rating: '4.9', reqSub: '42 tasks posted • 100% release',
    reqImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB98I7VkkW35ScvpPeo5BY45r2pbknF4Vdd6cYQ1kEo_cpFzI1rhFE6FOlnigaLjWHsA_tCawS96-KRWEHZ_SjnDazDFOIyuHYKenrWSiaQogvfYUE1yul0CZTtQKfJ6Lkrsy07sBj6pDyJ43VCBXuZ2XJHWifhByPYJv8kDcK1rJ327N3kYxV1qqeAb9KWYz_wkWmOiWEcnDkPYeJ3nZ_0DnNDkCAs0omCG2F2bQfF6Q57ou36jec9',
    note: '“Please check expiry date on milk! Buzzer 302 at gate, guard will let you up.”',
    items: [
      { name: 'Organic Cow Milk (1L pouch)', sub: 'Amul or Nandini certified', qty: '1x', ic: 'nutrition' },
      { name: 'Sourdough Bread Loaf', sub: 'Artisan rustic loaf', qty: '1x', ic: 'bakery_dining' },
      { name: 'Hass Avocado', sub: 'Gently soft / ready to eat', qty: '1x', ic: 'eco' },
      { name: 'Green Tea Box', sub: '25 bags box', qty: '1x', ic: 'local_cafe' },
    ],
    pickup: "Nature's Basket", pickupSub: 'Pick-up counter, Outer Ring Road', pickupDist: '0.4 km away',
    drop: 'Green Glen Apartments', dropSub: 'Tower B, 6th Cross Road', dropDist: '0.6 km run',
    mapImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcScss7YBvELjc0FqynO2a9cvgQJf8DdHPR24kH8nhZfCcwbFeEv59gjXmQfa9Vcj-tRUkmPTsw930vf3dl1fbJ8jBj3EeAFibAlPFVoLKHFLmVMBIVBuLj-_-hspUHaVy9Q2cW-cKIB0uR08ifBukZEZTzv0UL57NWSN3G4-ncbN4wIGQUl5Z8FPCPBKo2rhrXoCSz5YN0e0PR61a_zWg9_RTmx8sGIhYOEhxfKmccWyQqzDgbD-5'
  },
  {
    id: 't2', category: 'delivery', price: 180,
    title: 'Deliver document envelope to 100ft Road office',
    distance: '1.1 km route', time: '~20 mins',
    badges: [['Escrow Locked','bg-secondary-container text-on-secondary-container','lock'],['Contactless Handoff','bg-surface-container-high text-on-surface','contactless']],
    requester: 'Vikram S.', rating: '5.0', reqSub: 'Passcode Protected Release',
    reqImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDg6MVjn5PTQDm3LFh9QoMxI0a5vs--aB0LoO6y_Iql0tR8NiTUr7YaXD4jcwUPrMPVlaE4viPZC6FCiGzmYitMyn2SpVg06K1tdIcYNyeBQMwlM1DUPdQSfxqGOHM0aDx_SxoRF3z09XIB7GBazAkSr5H7SXQ8MVyUiQzTqzaJa_BtU9nNVN4zUVXQiUi9qujA-GaoQA6Ap-OegLJhdCjXQ7KhwbDuq8-nGuaZIkAMZ2d4sS-sus0Y',
    route: { from: '5th Cross Pickup', to: '100ft Rd Office' }
  },
  {
    id: 't3', category: 'home', price: 450,
    title: 'Help assemble IKEA shoe rack & balcony plants',
    distance: '0.4 km away', time: '~1 hr assistance',
    badges: [['Flexible Timing','bg-surface-container text-on-surface-variant','event_available'],['Escrow Guarded','bg-primary-fixed text-on-primary-fixed-variant','shield']],
    previewImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZablxHSHYgn-ZiezsUNLZhzx1ujdw-7bHKFCLJXpyzBVIdMy8vLNMbMLr7kKLHIJXkTC7wR04yTGkydDbI3y3_iyh-MOGQtI1la9G3WY4L_ypQY8Je7dks1PR6fzUmugxosIWfVd2F8txQf4ABUa8GAsLwHvOhXItiRShyrl29GOWqGQtNPvKOzkiIt26ag2A_sxeLYuDyDLkxbR6LC36KEuBcpdZKJR1BpiV8IHXDN36ZH2NLHYW',
    requester: 'Deepak M.', rating: '4.8', reqSub: 'Neighbor since 2021 • 18 reviews',
    reqImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnFm-MiVoozbWd8hXZNjK71eEFDj2bU9TYA7wMDUi9yadl6AERa0nXzGeZrtoR8tLBWdQslKg3uJslqYCzTXrEnEhrisizcNBbJtUw0nzX6o_xw47dxXTZ2nQwuzzfGrVqorby2_J_31BxTlnfKvs0Q7ZtCgn3rEIO7WQ_0mNMteCM8LtGd3SurpjVnhtZe5WCtczuYn6Tn1IK5IFrw8tkHOXkQ_41pAxdNjje4rpqhyv9zXXz35mE'
  },
  {
    id: 't4', category: 'laundry', price: 150,
    title: 'Laundry pick + iron 6 shirts from nearby dhobi',
    distance: '0.8 km away', time: '~30 mins',
    badges: [['Scheduled Slot','bg-surface-container text-on-surface-variant','event_available'],['Escrow Locked','bg-primary-fixed text-on-primary-fixed-variant','lock']],
    requester: 'Meera K.', rating: '4.7', reqSub: 'Verified • 12 reviews',
    reqImg: USER.avatar
  },
  {
    id: 't5', category: 'grocery', price: 200,
    title: 'Vegetables + fruits from Sunday santhe market',
    distance: '0.9 km away', time: '~35 mins',
    badges: [['Urgent • within 1h','bg-tertiary-fixed text-on-tertiary-fixed-variant','timer'],['Verified Escrow','bg-primary-fixed text-on-primary-fixed-variant','verified_user']],
    requester: 'Rohan P.', rating: '4.6', reqSub: '21 tasks posted',
    reqImg: USER.avatar
  },
  {
    id: 't6', category: 'pets', price: 250,
    title: 'Walk Buddy (golden retriever) for 30 mins',
    distance: '0.5 km away', time: '~30 mins',
    badges: [['Flexible Timing','bg-surface-container text-on-surface-variant','event_available'],['Pet Verified','bg-primary-fixed text-on-primary-fixed-variant','pets']],
    requester: 'Sana F.', rating: '5.0', reqSub: 'Pet parent • 9 reviews',
    reqImg: USER.avatar
  }
];

let NOTIFS = [
  { id: 1, icon: 'task_alt', color: 'text-primary bg-primary-fixed/40', title: 'Task Completed!', body: 'Grocery Run for Ananya marked delivered. ₹220 released to your wallet.', time: '2m ago', unread: true },
  { id: 2, icon: 'handshake', color: 'text-secondary bg-secondary-container', title: 'Counter offer received', body: 'Deepak M. countered Balcony Assembly at ₹480. Tap to respond.', time: '18m ago', unread: true },
  { id: 3, icon: 'electric_moped', color: 'text-on-primary bg-primary', title: 'Runner nearby', body: 'Rahul S. is 400m away with your grocery order. Arriving in ~8 mins.', time: '32m ago', unread: true, link: '#/track' },
  { id: 4, icon: 'account_balance_wallet', color: 'text-tertiary bg-tertiary-fixed', title: 'Escrow secured', body: '₹450 locked for Balcony Plant Assembly. Funds are SafePay protected.', time: '1h ago', unread: false },
  { id: 5, icon: 'star', color: 'text-tertiary bg-tertiary-fixed', title: 'New 5-star review', body: 'Vikram S. rated your document delivery 5.0 — “Super fast and polite!”', time: '3h ago', unread: false },
  { id: 6, icon: 'campaign', color: 'text-primary bg-primary-fixed/40', title: 'Neighborhood pulse', body: '14 new tasks posted in Indiranagar 4th Block in the last hour.', time: '5h ago', unread: false },
];

const WALLETX = [
  { ic: 'storefront', bg: 'bg-primary-fixed/40 text-primary', title: "Nature's Basket Grocery Run", meta: 'Today, 2:15 PM', badge: 'Completed', badgeCls: 'text-primary', amt: '+₹220.00', amtCls: 'text-primary', sub: 'Earned' },
  { ic: 'medication', bg: 'bg-primary-fixed/40 text-primary', title: 'Medicine drop to 4th Cross', meta: 'Yesterday', badge: 'Completed', badgeCls: 'text-primary', amt: '+₹180.00', amtCls: 'text-primary', sub: 'Earned' },
  { ic: 'account_balance', bg: 'bg-surface-container text-secondary', title: 'Instant Withdrawal to GPAY UPI', meta: '24 Oct', badge: 'Transferred', badgeCls: 'text-secondary', amt: '-₹3,200.00', amtCls: 'text-on-surface', sub: 'UPI Ref 9382' },
  { ic: 'potted_plant', bg: 'bg-tertiary-fixed text-tertiary-container', title: 'Escrow Hold: Balcony Plant Assembly', meta: 'In Progress', badge: 'Pending Release', badgeCls: 'text-tertiary font-bold', amt: '₹450.00', amtCls: 'text-tertiary', sub: 'In Escrow', subPill: true },
];

const state = {
  mode: 'earn', category: 'all', balanceHidden: false,
  notifUnread: NOTIFS.filter(n => n.unread).length,
  track: { step: 2, claimed: {} }
};

/* ---------------- Router ---------------- */
let navHistory = [];
function route() {
  const hash = location.hash || '#/explore';
  const [path] = hash.split('?');
  const parts = path.replace('#/', '').split('/');
  const name = parts[0] || 'explore';
  const param = parts[1];

  const prev = navHistory[navHistory.length - 1];
  const prevName = prev ? prev.split('/')[1] : null;
  const order = { explore: 0, 'task-details': 1, post: 1, 'my-tasks': 2, wallet: 2, notifications: 2, track: 3 };
  const dir = (order[name] ?? 0) >= (order[prevName] ?? 0) ? 'enter-right' : 'enter-left';

  navHistory.push(path);
  if (navHistory.length > 30) navHistory.shift();

  renderHeader(name, param);
  renderNav(name);
  renderPage(name, param, dir);
  window.scrollTo({ top: 0 });
}
window.addEventListener('hashchange', route);

function go(h) { if (location.hash === h) route(); else location.hash = h; }

/* ---------------- Header ---------------- */
function renderHeader(name, param) {
  const h = $('#header-inner');
  const bell = `
    <button aria-label="Notifications" class="relative w-11 h-11 flex items-center justify-center text-on-surface-variant hover:text-on-surface rounded-full transition-colors pressable" onclick="go('#/notifications')">
      ${icon('notifications', 'text-[22px]')}
      ${state.notifUnread ? `<span id="bell-dot" class="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-error ring-2 ring-surface unread-dot"></span>` : ''}
    </button>`;
  const avatar = `<button aria-label="Profile" class="w-11 h-11 flex items-center justify-center pressable" onclick="go('#/wallet')">${img(USER.avatar, 'Profile', 'w-8 h-8 rounded-full object-cover')}</button>`;

  if (name === 'task-details' || name === 'post') {
    h.innerHTML = `
      <div class="flex items-center gap-2">
        <button aria-label="Back" class="w-11 h-11 -ml-2 flex items-center justify-center text-on-surface rounded-full hover:bg-surface-container-low transition-colors pressable" onclick="history.back()">${icon('arrow_back','text-[24px]')}</button>
        ${img(LOGO, 'Padosi Pro Logo', 'h-7 w-auto object-contain')}
        <h1 class="font-headline-sm text-headline-sm text-on-surface truncate ml-1">${name === 'post' ? 'Post Task' : 'Task Details'}</h1>
      </div>${avatar}`;
  } else if (name === 'track') {
    h.innerHTML = `
      <div class="flex items-center gap-2">
        <button aria-label="Back" class="w-11 h-11 -ml-2 flex items-center justify-center text-on-surface rounded-full hover:bg-surface-container-low transition-colors pressable" onclick="history.back()">${icon('arrow_back','text-[24px]')}</button>
        ${img(LOGO, 'Padosi Pro Logo', 'h-7 w-auto object-contain')}
        <h1 class="font-headline-sm text-headline-sm text-on-surface truncate ml-1">Runner Live Tracking</h1>
      </div>
      <div class="flex items-center gap-2">
        <span class="live-dot w-2.5 h-2.5 rounded-full bg-primary"></span>
        <span class="font-label-badge text-label-badge text-primary uppercase tracking-wider">LIVE</span>
      </div>`;
  } else {
    h.innerHTML = `
      <div class="flex items-center gap-2">
        ${img(LOGO, 'Padosi Pro Logo', 'h-8 w-auto object-contain')}
        <div class="flex items-center gap-1 bg-surface-container-low px-2 py-1 rounded-full text-on-surface-variant max-w-[170px] pressable cursor-pointer" onclick="toast('Location picker — Indiranagar 4th Block','place')">
          ${icon('location_on', 'text-primary text-sm shrink-0')}
          <span class="font-label-badge text-label-badge truncate">Indiranagar 4th Block, 1.2km</span>
        </div>
      </div>
      <div class="flex items-center gap-0.5">
        <button aria-label="Search" class="w-11 h-11 flex items-center justify-center text-on-surface-variant hover:text-on-surface rounded-full transition-colors pressable" onclick="toast('Search coming right up!','search')">${icon('search','text-[22px]')}</button>
        ${bell}${avatar}
      </div>`;
  }
}

/* ---------------- Bottom Nav ---------------- */
const NAV_ITEMS = [
  { path: 'explore', icon: 'explore', label: 'Explore' },
  { path: 'my-tasks', icon: 'assignment', label: 'My Tasks' },
  { path: 'post', icon: 'add', label: '', fab: true },
  { path: 'chat', icon: 'chat_bubble', label: 'Chat' },
  { path: 'wallet', icon: 'account_balance_wallet', label: 'Wallet' },
];
function renderNav(name) {
  const nav = $('#nav-inner');
  nav.innerHTML = NAV_ITEMS.map(item => {
    if (item.fab) return `
      <div class="flex items-center justify-center -mt-5">
        <a id="fab" aria-label="Post Task" class="ripple flex items-center justify-center w-14 h-14 rounded-full bg-primary text-on-primary shadow-[0_4px_12px_rgba(0,105,72,0.3)]" onclick="go('#/post')">${icon('add','text-[28px]')}</a>
      </div>`;
    const active = name === item.path || (item.path === 'chat' && name === 'track');
    const isChat = item.path === 'chat';
    return `
      <a class="nav-item ${active ? 'active' : 'text-on-surface-variant'} flex flex-col items-center justify-center min-w-[56px] h-11 cursor-pointer" onclick="${isChat ? `go('#/track')` : `go('#/${item.path}')`}">
        ${isChat ? `<div class="relative flex items-center justify-center"><span class="material-symbols-outlined nav-ico text-[24px]">${item.icon}</span><span class="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-error ring-2 ring-surface-container-lowest"></span></div>` : `<span class="material-symbols-outlined nav-ico text-[24px]">${item.icon}</span>`}
        <span class="font-label-numeric text-label-numeric tracking-tight mt-0.5">${item.label}</span>
      </a>`;
  }).join('');
}

/* ---------------- Toast ---------------- */
let toastTimer;
function toast(msg, ic = 'check_circle', action = 'View', onAction = null) {
  const t = $('#toast');
  $('#toast-msg').textContent = msg;
  $('#toast-icon').textContent = ic;
  const btn = $('#toast-action');
  btn.textContent = action;
  btn.onclick = () => { hideToast(); onAction && onAction(); };
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(hideToast, 3500);
}
function hideToast() { $('#toast').classList.remove('show'); }

/* ---------------- Page switcher ---------------- */
function renderPage(name, param, dir) {
  const main = $('#main');
  const builders = {
    'explore': renderExplore, 'task-details': () => renderTaskDetails(param),
    'post': renderPost, 'wallet': renderWallet, 'track': renderTrack, 'notifications': renderNotifications,
    'my-tasks': renderMyTasks
  };
  const build = builders[name] || renderExplore;
  const hasOwnStickyCta = name === 'track' || name === 'task-details' || name === 'post';
  $('#bottom-nav').style.display = hasOwnStickyCta ? 'none' : 'block';
  if (name !== 'track') { trackTimers.forEach(clearInterval); trackTimers = []; }
  main.innerHTML = `<div class="page ${dir}">${build()}</div>`;
  const page = $('.page', main);
  requestAnimationFrame(() => page.classList.add('active'));
  const inits = {
    'explore': initExplore, 'task-details': () => initTaskDetails(param),
    'post': initPost, 'wallet': initWallet, 'track': initTrack, 'notifications': initNotifications,
    'my-tasks': initMyTasks
  };
  (inits[name] || (() => {}))();
  bindHeaderScroll();
}

/* Header hide on scroll down */
function bindHeaderScroll() {
  let lastY = 0;
  const header = $('#app-header');
  window.onscroll = () => {
    const y = window.scrollY;
    header.classList.toggle('hidden-header', y > 90 && y > lastY);
    lastY = y;
  };
}

/* ============================================================
   SCREEN 1 — EXPLORE FEED
   ============================================================ */
function renderExplore() {
  const cats = [
    { id: 'all', label: 'All', count: 14 },
    { id: 'grocery', label: 'Grocery & Mart', icon: 'shopping_basket', color: 'text-primary', count: 5 },
    { id: 'delivery', label: 'Express Delivery', icon: 'local_shipping', color: 'text-tertiary', count: 4 },
    { id: 'home', label: 'Home Care', icon: 'handyman', color: 'text-secondary', count: 3 },
    { id: 'laundry', label: 'Laundry', icon: 'local_laundry_service', color: 'text-primary', count: 2 },
    { id: 'pets', label: 'Pet Care', icon: 'pets', color: 'text-tertiary', count: 1 },
  ];
  const visible = state.category === 'all' ? TASKS : TASKS.filter(t => t.category === state.category);

  return `
  <div class="flex flex-col w-full pb-28">
    <!-- Mode Toggle Switcher -->
    <div class="px-4 pt-2 pb-3">
      <div class="relative bg-surface-container-high p-1 rounded-full flex items-center shadow-sm">
        <div id="mode-slider" class="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-primary shadow-sm"></div>
        <button id="mode-earn" class="relative z-10 flex-1 py-2.5 px-3 rounded-full font-body-semibold text-body-semibold flex items-center justify-center gap-1.5 transition-colors duration-200 ${state.mode === 'earn' ? 'text-on-primary' : 'text-on-surface-variant hover:text-on-surface'}" onclick="setMode('earn')">
          ${icon('bolt','text-[18px]')}<span>Earn Nearby</span>
          ${state.mode === 'earn' ? '<span class="bg-primary-fixed text-on-primary-fixed font-label-badge text-[10px] px-1.5 py-0.5 rounded-full uppercase tracking-wider ml-0.5">Active</span>' : ''}
        </button>
        <button id="mode-hire" class="relative z-10 flex-1 py-2.5 px-3 rounded-full font-body-semibold text-body-semibold flex items-center justify-center gap-1.5 transition-colors duration-200 ${state.mode === 'hire' ? 'text-on-primary' : 'text-on-surface-variant hover:text-on-surface'}" onclick="setMode('hire')">
          ${icon('handshake','text-[18px]')}<span>Hire a Neighbor</span>
          ${state.mode === 'hire' ? '<span class="bg-primary-fixed text-on-primary-fixed font-label-badge text-[10px] px-1.5 py-0.5 rounded-full uppercase tracking-wider ml-0.5">Active</span>' : ''}
        </button>
      </div>
    </div>
    <!-- Neighborhood Proximity Pulse Banner -->
    <div class="px-4 mb-3">
      <div class="bg-surface-container-lowest rounded-xl p-3 shadow-sm flex items-center justify-between">
        <div class="flex items-center gap-2 min-w-0">
          <div class="relative flex items-center justify-center w-10 h-10 rounded-full bg-surface-container text-primary shrink-0">
            ${icon('radar','text-[20px]')}
            <span class="ping-dot absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-primary"></span>
          </div>
          <div class="flex flex-col min-w-0">
            <div class="flex items-center gap-1 text-on-surface font-body-semibold text-body-semibold truncate"><span>Indiranagar 4th Block</span></div>
            <p class="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
              <span class="font-label-numeric text-label-numeric text-primary count-up" data-count="14">0</span><span>tasks within 1.5 km</span>
            </p>
          </div>
        </div>
        <button aria-label="Filter radius" class="pressable h-10 px-3 rounded-full bg-surface-container-low text-on-surface-variant hover:text-on-surface active:bg-surface-container flex items-center gap-1.5 shrink-0 transition-colors" onclick="toast('Radius filter: 1.5 km','tune')">
          ${icon('tune','text-[18px]')}<span class="font-label-badge text-label-badge">1.5 km</span>
        </button>
      </div>
    </div>
    <!-- Category Pills -->
    <div class="mb-4">
      <div class="flex items-center gap-2 overflow-x-auto px-4 pb-1 no-scrollbar">
        ${cats.map(c => `
          <button class="cat-pill shrink-0 h-9 px-4 rounded-full ${state.category === c.id ? 'active bg-primary text-on-primary font-body-semibold shadow-sm' : 'bg-surface-container-lowest text-on-surface-variant font-body-regular shadow-sm hover:bg-surface-container-high'} text-body-sm flex items-center gap-1.5" onclick="setCategory('${c.id}')">
            ${c.icon ? icon(c.icon, `text-[16px] ${c.color}`) : ''}<span>${c.label}</span>
            <span class="${state.category === c.id ? 'bg-on-primary/20 text-on-primary' : 'bg-surface-container text-on-surface'} font-label-badge text-label-badge px-1.5 py-0.5 rounded-full">${c.count}</span>
          </button>`).join('')}
      </div>
    </div>
    <!-- Task Feed -->
    <div id="feed" class="px-4 flex flex-col gap-4 stagger">
      ${visible.length ? visible.map(taskCard).join('') : `
        <div class="bg-surface-container-lowest rounded-xl p-8 text-center shadow-sm">
          <span class="material-symbols-outlined text-[40px] text-outline">search_off</span>
          <p class="font-body-semibold text-body-semibold text-on-surface mt-2">No tasks in this category</p>
          <p class="font-body-sm text-body-sm text-on-surface-variant">Try another category nearby</p>
        </div>`}
    </div>
    <!-- Neighborhood Trust & Daily Payout Banner -->
    <div class="px-4 mt-4 mb-2">
      <div class="bg-surface-container rounded-xl p-4 shadow-sm flex items-center justify-between pressable cursor-pointer hover-lift" onclick="go('#/wallet')">
        <div class="flex items-center gap-2 min-w-0">
          <div class="w-10 h-10 rounded-full bg-primary-fixed text-on-primary-fixed-variant flex items-center justify-center shrink-0">${icon('account_balance','text-[20px]')}</div>
          <div class="flex flex-col min-w-0">
            <p class="font-body-semibold text-body-sm text-on-surface truncate">Neighborhood Earnings Pulse</p>
            <p class="font-body-sm text-body-sm text-on-surface-variant truncate"><span class="font-label-numeric text-label-numeric text-primary">₹1,240</span> avg. today • 100% Escrow Protected</p>
          </div>
        </div>
        ${icon('verified','text-primary text-[22px] shrink-0')}
      </div>
    </div>
  </div>`;
}

function taskCard(t) {
  const claimed = state.track.claimed[t.id];
  const badges = t.badges || [['Verified Escrow','bg-primary-fixed text-on-primary-fixed-variant','verified_user']];
  const primaryBadge = t.urgency
    ? `<span class="px-2 py-0.5 rounded-full ${t.urgencyBg} font-label-badge text-label-badge flex items-center gap-1">${icon(t.urgencyIcon,'text-[13px]')} ${t.urgency}</span>`
    : `<span class="px-2 py-0.5 rounded-full ${badges[0][1]} font-label-badge text-label-badge flex items-center gap-1">${icon(badges[0][2],'text-[13px]')} ${badges[0][0]}</span>`;
  const secondBadge = t.urgency && badges.length > 1
    ? `<span class="px-2 py-0.5 rounded-full ${badges[0][1]} font-label-badge text-label-badge flex items-center gap-1">${icon(badges[0][2],'text-[13px]')} ${badges[0][0]}</span>`
    : (badges[1] ? `<span class="px-2 py-0.5 rounded-full ${badges[1][1]} font-label-badge text-label-badge flex items-center gap-1">${icon(badges[1][2],'text-[13px]')} ${badges[1][0]}</span>` : '');

  let visual = '';
  if (t.storeImg) {
    visual = `
    <div class="bg-surface-container-low rounded-lg p-2.5 flex items-center gap-2 pressable cursor-pointer" onclick="go('#/task-details/${t.id}')">
      <div class="w-12 h-12 rounded-lg bg-surface-container overflow-hidden shrink-0">${img(t.storeImg, t.store, 'w-full h-full object-cover')}</div>
      <div class="flex flex-col min-w-0 flex-1">
        <p class="font-body-semibold text-body-sm text-on-surface truncate">${t.store}</p>
        <p class="font-body-sm text-body-sm text-on-surface-variant truncate">${t.storeSub}</p>
      </div>
      <span class="px-2 py-1 rounded bg-surface-container-highest text-on-surface font-label-badge text-label-badge shrink-0">List Ready</span>
    </div>`;
  } else if (t.route) {
    visual = `
    <div class="rounded-lg overflow-hidden relative bg-surface-container h-24 flex items-center justify-between px-4 pressable cursor-pointer" onclick="go('#/task-details/${t.id}')">
      <div class="relative z-10 flex items-center justify-between w-full bg-surface/90 backdrop-blur-md px-3 py-2 rounded-lg shadow-sm">
        <div class="flex items-center gap-2"><div class="w-2.5 h-2.5 rounded-full bg-primary"></div><span class="font-body-sm text-on-surface font-medium truncate max-w-[110px]">${t.route.from}</span></div>
        ${icon('trending_flat','text-secondary text-[16px]')}
        <div class="flex items-center gap-2"><div class="w-2.5 h-2.5 rounded-full bg-tertiary"></div><span class="font-body-sm text-on-surface font-medium truncate max-w-[110px]">${t.route.to}</span></div>
      </div>
    </div>`;
  } else if (t.previewImg) {
    visual = `
    <div class="w-full h-32 rounded-lg bg-surface-container overflow-hidden relative pressable cursor-pointer" onclick="go('#/task-details/${t.id}')">
      ${img(t.previewImg, t.title, 'w-full h-full object-cover')}
      <div class="absolute bottom-2 left-2 bg-inverse-surface/80 text-inverse-on-surface backdrop-blur-md px-2 py-1 rounded font-label-badge text-[10px] flex items-center gap-1">${icon('build','text-[12px]')} Tools provided by host</div>
    </div>`;
  }

  return `
  <article class="bg-surface-container-lowest rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow relative flex flex-col gap-3">
    <div class="flex items-center justify-between gap-2">
      <div class="flex items-center gap-1.5 min-w-0 flex-wrap">${primaryBadge}${secondBadge}</div>
      <div class="text-right shrink-0"><span class="font-display-currency text-display-currency text-primary leading-none">₹${t.price}</span></div>
    </div>
    <div class="flex flex-col cursor-pointer pressable" onclick="go('#/task-details/${t.id}')">
      <h2 class="font-title-card text-title-card text-on-surface">${t.title}</h2>
      <div class="flex items-center gap-2 mt-1.5 text-on-surface-variant font-body-sm text-body-sm">
        <span class="flex items-center gap-0.5">${icon('near_me','text-[15px] text-secondary')} ${t.distance}</span>
        <span>•</span>
        <span class="flex items-center gap-0.5">${icon('schedule','text-[15px] text-secondary')} ${t.time}</span>
      </div>
    </div>
    ${visual}
    <div class="pt-1 flex items-center justify-between gap-2">
      <div class="flex items-center gap-2 min-w-0 cursor-pointer pressable" onclick="toast('${esc(t.requester)} — ${esc(t.reqSub)}','person')">
        ${img(t.reqImg, t.requester, 'w-9 h-9 rounded-full object-cover shrink-0')}
        <div class="flex flex-col min-w-0">
          <div class="flex items-center gap-1">
            <span class="font-body-semibold text-body-sm text-on-surface truncate">${t.requester}</span>
            <span class="flex items-center text-tertiary text-xs font-bold">${icon('star','text-[14px]',true)} ${t.rating}</span>
          </div>
          <span class="font-label-badge text-[10px] text-on-surface-variant tracking-normal truncate">${t.reqSub}</span>
        </div>
      </div>
      ${claimed ? `
      <button class="h-11 px-4 rounded-full bg-primary-container text-on-primary-container font-body-semibold text-body-semibold flex items-center gap-1.5 shrink-0 pressable" onclick="go('#/track')">
        ${icon('check','text-[18px]')}<span>Track Run</span>
      </button>` : `
      <button class="h-11 px-4 rounded-full ${t.category === 'delivery' && !t.urgency ? 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest' : 'bg-primary hover:bg-primary-container text-on-primary'} font-body-semibold text-body-semibold shadow-sm flex items-center gap-1.5 transition-all shrink-0 ripple ripple-dark pressable" data-accept="${t.id}">
        <span class="btn-label">Quick Accept</span>${icon('arrow_forward','text-[18px] ' + (t.category === 'delivery' && !t.urgency ? 'text-primary' : ''))}
      </button>`}
    </div>
  </article>`;
}

function initExplore() {
  // animate counters
  $$('.count-up').forEach(el => {
    const target = +el.dataset.count;
    let cur = 0;
    const step = Math.max(1, Math.ceil(target / 20));
    const iv = setInterval(() => { cur += step; if (cur >= target) { cur = target; clearInterval(iv); } el.textContent = cur; }, 40);
  });
  // quick accept buttons
  $$('[data-accept]').forEach(btn => btn.addEventListener('click', async () => {
    const id = btn.dataset.accept;
    const t = TASKS.find(x => x.id === id);
    btn.disabled = true;
    btn.innerHTML = `${icon('progress_activity','animate-spin text-[18px]')}<span>Securing...</span>`;
    try {
      if (t.serverId) await API.acceptTask(t.serverId);
      else await new Promise(r => setTimeout(r, 700)); // demo task — no backend row
      state.track.claimed[id] = true;
      btn.innerHTML = `${icon('check','text-[18px]')}<span>Claimed</span>`;
      btn.classList.remove('bg-primary','bg-surface-container-high','text-on-primary');
      btn.classList.add('bg-primary-container','text-on-primary-container');
      toast(`${t.title.slice(0, 34)}… accepted! ₹${t.price} held in escrow.`, 'check_circle', 'Track', () => go('#/track'));
    } catch (e) {
      btn.disabled = false;
      btn.innerHTML = `<span class="btn-label">Quick Accept</span>${icon('arrow_forward','text-[18px]')}`;
      toast(e.message || 'Task claim nahi ho paya', 'error');
    }
  }));
}
function setMode(m) {
  state.mode = m;
  const slider = $('#mode-slider');
  slider.style.transform = m === 'hire' ? 'translateX(calc(100% + 0px))' : 'translateX(0)';
  setTimeout(() => {
    if (m === 'hire') toast('Switched to Hire a Neighbor — post a task!', 'handshake', 'Post', () => go('#/post'));
    rerenderCurrent();
  }, 250);
}
function setCategory(c) { state.category = c; rerenderCurrent('enter-fade'); }
function rerenderCurrent(dir = 'enter-fade') {
  const hash = location.hash || '#/explore';
  const name = hash.replace('#/', '').split('/')[0] || 'explore';
  renderPage(name, hash.split('/')[2], dir);
}

/* ============================================================
   SCREEN 2 — TASK DETAILS
   ============================================================ */
function renderTaskDetails(id) {
  const t = TASKS.find(x => x.id === id) || TASKS[0];
  const hasFull = !!t.items;
  const claimed = state.track.claimed[t.id];

  return `
  <div class="flex flex-col w-full pb-40 stagger">
    <!-- Payout Guarantee Showcase -->
    <section class="px-4 pt-2">
      <div class="bg-surface-container-lowest rounded-xl p-4 shadow-[0_4px_16px_rgba(15,23,42,0.06)] flex flex-col gap-3 relative overflow-hidden">
        <div class="absolute -right-6 -bottom-6 w-28 h-28 bg-primary-fixed/20 rounded-full blur-2xl pointer-events-none"></div>
        <div class="flex items-center justify-between">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary-fixed/40 text-on-primary-fixed-variant rounded-full font-label-badge text-label-badge uppercase tracking-wider">${icon('verified_user','text-[14px]',true)} Escrow Secured</span>
          <div class="flex items-center gap-1 text-on-surface-variant font-label-numeric text-label-numeric">${icon('bolt','text-[16px] text-tertiary')}<span>Fast Settlement</span></div>
        </div>
        <div class="flex items-baseline justify-between pt-1">
          <div>
            <span class="font-headline-sm text-headline-sm text-on-surface-variant">Guaranteed Payout</span>
            <div class="flex items-center gap-1.5 text-primary">
              <span class="font-display-currency text-display-currency">₹${t.price}</span>
              <span class="font-body-sm text-body-sm text-on-surface-variant font-medium">total locked</span>
            </div>
          </div>
          <div class="text-right"><span class="inline-flex items-center px-2 py-0.5 bg-surface-container rounded-full text-primary font-label-numeric text-label-numeric">SafePay Protected</span></div>
        </div>
        <div class="bg-surface-container-low rounded-lg p-2.5 flex items-center justify-between text-on-surface">
          <div class="flex items-center gap-1.5 font-body-sm text-body-sm">${icon('account_balance_wallet','text-primary text-[18px]')}<span>Task Fee: <strong>₹${t.fee || t.price}</strong></span></div>
          <div class="w-1 h-1 rounded-full bg-outline-variant"></div>
          <div class="flex items-center gap-1 font-body-sm text-body-sm text-tertiary">${icon('add_circle','text-[18px]')}<span>On-Time Bonus: <strong>+₹${t.bonus || 0}</strong></span></div>
        </div>
      </div>
    </section>
    ${hasFull ? `
    <!-- Route Map & Geospatial Tracking -->
    <section class="px-4 pt-4">
      <div class="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
        <div class="relative">
          <div class="w-full h-36 bg-cover bg-center" style="background-image:url('${t.mapImg}')"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent flex items-end p-3">
            <div class="flex items-center gap-2 bg-surface-container-lowest/95 backdrop-blur-md rounded-full px-3 py-1.5 shadow-sm text-on-surface">${icon('electric_moped','text-primary text-[18px]')}<span class="font-label-numeric text-label-numeric">22 mins total walk / scooter</span></div>
          </div>
        </div>
        <div class="p-4 flex flex-col gap-3">
          <div class="flex items-start gap-3">
            <div class="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-fixed shrink-0">${icon('store','text-[18px]')}</div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between">
                <p class="font-title-card text-title-card text-on-surface truncate">${t.pickup}</p>
                <span class="font-label-numeric text-label-numeric text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full">${t.pickupDist}</span>
              </div>
              <p class="font-body-sm text-body-sm text-on-surface-variant truncate">${t.pickupSub}</p>
            </div>
          </div>
          <div class="ml-4 w-0.5 h-4 bg-surface-container-highest"></div>
          <div class="flex items-start gap-3">
            <div class="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed shrink-0">${icon('home_pin','text-[18px]')}</div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between">
                <p class="font-title-card text-title-card text-on-surface truncate">${t.drop}</p>
                <span class="font-label-numeric text-label-numeric text-primary bg-primary-fixed/30 px-2 py-0.5 rounded-full">${t.dropDist}</span>
              </div>
              <p class="font-body-sm text-body-sm text-on-surface-variant truncate">${t.dropSub}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Items Checklist -->
    <section class="px-4 pt-4">
      <div class="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col gap-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">${icon('format_list_bulleted','text-primary text-[22px]')}<h2 class="font-headline-sm text-headline-sm text-on-surface">Items to Pick (${t.items.length})</h2></div>
          <span class="font-label-badge text-label-badge bg-surface-container text-on-surface-variant px-2 py-0.5 rounded-full">Pre-cataloged</span>
        </div>
        <div class="space-y-2.5">
          ${t.items.map(it => `
          <div class="flex items-center justify-between bg-surface-container-low p-2.5 rounded-lg pressable">
            <div class="flex items-center gap-3 min-w-0">
              <div class="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center shrink-0">${icon(it.ic,'text-on-surface-variant text-[20px]')}</div>
              <div class="min-w-0">
                <p class="font-body-semibold text-body-semibold text-on-surface truncate">${it.name}</p>
                <p class="font-body-sm text-body-sm text-on-surface-variant truncate">${it.sub}</p>
              </div>
            </div>
            <span class="font-label-numeric text-label-numeric bg-surface-container-lowest text-on-surface px-2 py-1 rounded-md shadow-sm shrink-0">${it.qty}</span>
          </div>`).join('')}
        </div>
        <div class="bg-tertiary-fixed/30 rounded-lg p-3 flex gap-2.5 items-start mt-1">
          ${icon('chat_bubble','text-tertiary text-[20px] shrink-0')}
          <div class="text-on-tertiary-fixed-variant">
            <p class="font-label-numeric text-label-numeric uppercase tracking-wider text-tertiary">Note from ${t.requester.split(' ')[0]}</p>
            <p class="font-body-sm text-body-sm mt-0.5">${t.note}</p>
          </div>
        </div>
      </div>
    </section>` : `
    <!-- Generic Route Context for other tasks -->
    <section class="px-4 pt-4">
      <div class="bg-surface-container-lowest rounded-xl p-4 shadow-sm">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">${icon('route','text-primary text-[20px]')}<h2 class="font-headline-sm text-headline-sm text-on-surface">Route & Proximity</h2></div>
          <span class="font-body-sm text-body-sm text-primary font-semibold">${t.distance.replace(' away','')}</span>
        </div>
        <div class="bg-surface-container-low rounded-lg p-3 flex items-center justify-between">
          <div class="flex items-center gap-2"><div class="w-2.5 h-2.5 rounded-full bg-primary"></div><span class="font-body-sm text-on-surface font-medium">${t.title.split(' ').slice(0,3).join(' ')}</span></div>
          ${icon('trending_flat','text-secondary text-[18px]')}
          <div class="flex items-center gap-2"><div class="w-2.5 h-2.5 rounded-full bg-tertiary"></div><span class="font-body-sm text-on-surface font-medium">${t.requester}</span></div>
        </div>
      </div>
    </section>`}
    <!-- Requester Trust & Verified Profile -->
    <section class="px-4 pt-4">
      <div class="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col gap-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="relative">${img(t.reqImg, t.requester, 'w-12 h-12 rounded-full object-cover shadow-sm')}
              <span class="absolute -bottom-1 -right-1 bg-primary text-on-primary rounded-full p-0.5 flex items-center justify-center shadow">${icon('verified','text-[14px]')}</span>
            </div>
            <div>
              <div class="flex items-center gap-1.5"><h3 class="font-headline-sm text-headline-sm text-on-surface">${t.requester.replace(' R.',' Roy').replace(' S.',' Sharma').replace(' M.',' Menon')}</h3>${icon('verified','text-primary text-[18px]',true)}</div>
              <p class="font-body-sm text-body-sm text-on-surface-variant">Lives in Green Glen Apts since 2021</p>
            </div>
          </div>
          <div class="flex items-center gap-1 bg-surface-container px-2 py-1 rounded-full">${icon('star','text-tertiary text-[16px]',true)}<span class="font-label-numeric text-label-numeric text-on-surface">${t.rating}</span></div>
        </div>
        <div class="grid grid-cols-2 gap-2 pt-1">
          <div class="bg-surface-container-low rounded-lg p-2.5 flex items-center gap-2">${icon('task_alt','text-primary text-[20px]')}<div><p class="font-label-numeric text-label-numeric text-on-surface">${t.reqSub.split('•')[0].trim().replace(' tasks posted',' Completed').replace(' tasks posted',' Completed')}</p><p class="font-body-sm text-body-sm text-on-surface-variant">Neighborhood tasks</p></div></div>
          <div class="bg-surface-container-low rounded-lg p-2.5 flex items-center gap-2">${icon('schedule','text-primary text-[20px]')}<div><p class="font-label-numeric text-label-numeric text-on-surface">100% On-Time</p><p class="font-body-sm text-body-sm text-on-surface-variant">Fast release score</p></div></div>
        </div>
      </div>
    </section>
    <!-- Community Guarantee Box -->
    <section class="px-4 pt-4">
      <div class="bg-secondary-container/50 rounded-xl p-3 flex items-center gap-3">
        <div class="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-fixed shrink-0">${icon('security','text-[18px]')}</div>
        <p class="font-body-sm text-body-sm text-on-secondary-fixed-variant"><strong>Zero cancellation guarantee:</strong> Immediate UPI deposit directly to your registered bank account upon completion code match.</p>
      </div>
    </section>
  </div>

  <!-- Counter Offer Sheet -->
  <div id="sheet-backdrop" class="fixed inset-0 z-[55] bg-inverse-surface/40 backdrop-blur-[2px] opacity-0 pointer-events-none" onclick="closeCounter()"></div>
  <div id="counter-sheet" class="fixed inset-x-0 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-[56] transform translate-y-full">
    <div class="bg-surface-container-lowest rounded-t-2xl p-4 shadow-[0_-8px_30px_rgba(15,23,42,0.18)] flex flex-col gap-4 pb-8">
      <div class="w-12 h-1.5 bg-surface-container-highest rounded-full mx-auto"></div>
      <div class="flex items-center justify-between">
        <div><h3 class="font-headline-sm text-headline-sm text-on-surface">Make Counter Offer</h3><p class="font-body-sm text-body-sm text-on-surface-variant">Suggest a fair rate for your effort</p></div>
        <button class="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant pressable" onclick="closeCounter()">${icon('close','text-[20px]')}</button>
      </div>
      <div class="flex items-center justify-between bg-surface-container-low p-3.5 rounded-xl">
        <button class="w-11 h-11 rounded-full bg-surface-container-lowest text-on-surface flex items-center justify-center shadow-sm pressable" id="dec-offer">${icon('remove')}</button>
        <div class="text-center">
          <span class="font-body-sm text-body-sm text-on-surface-variant block">Counter Amount</span>
          <span class="font-display-currency text-display-currency text-primary" id="counter-value">₹${t.price + 30}</span>
        </div>
        <button class="w-11 h-11 rounded-full bg-surface-container-lowest text-on-surface flex items-center justify-center shadow-sm pressable" id="inc-offer">${icon('add')}</button>
      </div>
      <div class="flex gap-2">
        ${[t.price+20, t.price+40, t.price+60].map(v => `<button class="flex-1 py-2 rounded-full bg-surface-container font-label-numeric text-label-numeric text-on-surface hover:bg-surface-container-high transition-colors pressable" onclick="setCounter(${v})">₹${v}</button>`).join('')}
      </div>
      <button class="ripple w-full py-3.5 rounded-full bg-primary text-on-primary font-body-semibold text-body-semibold shadow-md pressable flex items-center justify-center gap-2" id="submit-counter">${icon('send','text-[20px]')}<span>Send Counter Offer</span></button>
    </div>
  </div>

  <!-- Sticky Bottom CTAs Tray -->
  <div class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-surface-container-lowest shadow-[0_-4px_16px_rgba(15,23,42,0.06)] p-3 z-40">
    <div class="flex items-center gap-3">
      <button id="open-counter" class="flex-1 py-3 rounded-full bg-surface-container-low text-on-surface font-body-semibold text-body-semibold pressable flex items-center justify-center gap-1.5 hover:bg-surface-container">${icon('handshake','text-[18px]')}<span>Counter</span></button>
      <button id="accept-task" class="flex-[2] py-3 rounded-full ${claimed ? 'bg-primary-container text-on-primary-container' : 'bg-primary text-on-primary shadow-[0_4px_12px_rgba(0,105,72,0.25)]'} ripple font-body-semibold text-body-semibold pressable flex items-center justify-center gap-2">
        ${claimed ? `${icon('check_circle','text-[20px]')}<span>Run Accepted!</span>` : `${icon('bolt','text-[20px]')}<span>Accept Task (₹${t.price})</span>`}
      </button>
    </div>
  </div>`;
}

function initTaskDetails(id) {
  const t = TASKS.find(x => x.id === id) || TASKS[0];
  let counter = t.price + 30;
  const disp = $('#counter-value');
  const openBtn = $('#open-counter');
  const sheet = $('#counter-sheet');
  const backdrop = $('#sheet-backdrop');

  const sync = () => disp.textContent = '₹' + counter;
  window.setCounter = v => { counter = v; sync(); };
  window.closeCounter = () => { sheet.classList.remove('open'); backdrop.classList.remove('opacity-100','pointer-events-auto'); backdrop.classList.add('opacity-0','pointer-events-none'); };

  openBtn.addEventListener('click', () => { sheet.classList.add('open'); backdrop.classList.remove('opacity-0','pointer-events-none'); backdrop.classList.add('opacity-100','pointer-events-auto'); });
  $('#inc-offer').addEventListener('click', () => { counter += 10; sync(); });
  $('#dec-offer').addEventListener('click', () => { if (counter > t.price) { counter -= 10; sync(); } });
  $('#submit-counter').addEventListener('click', async function () {
    this.innerHTML = `${icon('refresh','text-[20px] animate-spin')}<span>Submitting...</span>`;
    try {
      if (t.serverId) await API.counterOffer(t.serverId, counter);
      else await new Promise(r => setTimeout(r, 700));
      window.closeCounter();
      this.innerHTML = `${icon('check','text-[20px]')}<span>Counter Sent</span>`;
      openBtn.innerHTML = `<span>Counter Pending (₹${counter})</span>`;
      openBtn.disabled = true;
      openBtn.classList.add('opacity-60');
      toast(`Counter offer of ₹${counter} sent to ${t.requester}`, 'handshake');
    } catch (e) {
      this.innerHTML = `${icon('send','text-[20px]')}<span>Send Counter Offer</span>`;
      toast(e.message || 'Counter offer bhej nahi paya', 'error');
    }
  });

  const acceptBtn = $('#accept-task');
  acceptBtn.addEventListener('click', async function () {
    if (state.track.claimed[t.id]) { go('#/track'); return; }
    this.innerHTML = `${icon('refresh','text-[20px] animate-spin')}<span>Locking Escrow...</span>`;
    try {
      if (t.serverId) await API.acceptTask(t.serverId);
      else await new Promise(r => setTimeout(r, 800));
      state.track.claimed[t.id] = true;
      this.classList.remove('bg-primary','shadow-[0_4px_12px_rgba(0,105,72,0.25)]');
      this.classList.add('bg-primary-container','text-on-primary-container');
      this.innerHTML = `${icon('check_circle','text-[20px]')}<span>Run Accepted!</span>`;
      toast('Escrow locked! ₹' + t.price + ' held. Runner mode on.', 'lock', 'Track', () => go('#/track'));
    } catch (e) {
      this.innerHTML = `${icon('bolt','text-[20px]')}<span>Accept Task (₹${t.price})</span>`;
      toast(e.message || 'Task accept nahi ho paya', 'error');
    }
  });
}

/* ============================================================
   SCREEN 3 — POST TASK
   ============================================================ */
let postState = { base: 180, tip: 30, type: 'grocery' };

function renderPost() {
  const types = [
    { id: 'grocery', ic: 'shopping_bag', label: 'Grocery & Shop', sub: 'Supermarket, dairy' },
    { id: 'courier', ic: 'local_shipping', label: 'Courier & Drop', sub: 'Packages, gifts' },
    { id: 'laundry', ic: 'dry_cleaning', label: 'Laundry Pick', sub: 'Ironing & wash' },
    { id: 'home', ic: 'home_repair_service', label: 'Home Help', sub: 'Quick hands & tools' },
  ];
  return `
  <div class="flex flex-col w-full pb-40 stagger">
    <div class="px-4 pt-3 pb-2 flex items-center justify-between">
      <div class="flex flex-col">
        <span class="font-headline-sm text-headline-sm text-on-surface">Post a Neighborhood Task</span>
        <div class="flex items-center gap-1.5 mt-0.5">
          <span class="relative flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span><span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span></span>
          <span class="font-body-sm text-body-sm text-primary">A trusted neighbor will pick this up in ~10 mins</span>
        </div>
      </div>
      <div class="flex items-center gap-1 bg-surface-container-high px-2.5 py-1 rounded-full text-secondary font-label-badge text-label-badge shrink-0">${icon('verified_user','text-[15px] text-primary',true)}<span>100% Escrow</span></div>
    </div>
    <div class="px-4 flex flex-col gap-5 mt-2">
      <!-- 1. Task Type Selector -->
      <section class="flex flex-col gap-2.5">
        <div class="flex items-center justify-between">
          <label class="font-title-card text-title-card text-on-surface">Select Errand Type</label>
          <span class="font-label-badge text-label-badge text-primary bg-surface-container-low px-2 py-0.5 rounded-full">Step 1 of 4</span>
        </div>
        <div class="grid grid-cols-2 gap-2.5">
          ${types.map(tp => `
          <button class="type-btn ripple ripple-dark relative flex items-center gap-3 p-3.5 rounded-xl shadow-sm text-left pressable ${postState.type === tp.id ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest text-on-surface'}" data-type="${tp.id}" onclick="selectType(this)">
            <div class="icon-wrap w-10 h-10 rounded-full ${postState.type === tp.id ? 'bg-white/20' : 'bg-surface-container-high'} flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-[22px] ${postState.type === tp.id ? 'text-white' : 'text-secondary'}">${tp.ic}</span>
            </div>
            <div class="flex flex-col min-w-0">
              <span class="font-body-semibold text-body-semibold truncate leading-tight">${tp.label}</span>
              <span class="sub font-body-sm text-body-sm ${postState.type === tp.id ? 'text-white/80' : 'text-secondary'} text-[11px] truncate">${tp.sub}</span>
            </div>
            ${postState.type === tp.id ? `<div class="absolute top-2.5 right-2.5">${icon('check_circle','text-[18px] text-white',true)}</div>` : ''}
          </button>`).join('')}
        </div>
      </section>
      <!-- 2. Task Details & Checklist -->
      <section class="flex flex-col gap-3">
        <label class="font-title-card text-title-card text-on-surface">Task Description</label>
        <div class="relative bg-surface-container-lowest rounded-xl shadow-sm p-3.5 flex flex-col gap-2">
          <input id="post-desc" class="w-full bg-transparent font-body-semibold text-body-semibold text-on-surface placeholder:text-outline focus:outline-none" placeholder="e.g., Medicine pickup from Apollo Pharmacy" value="Medicine pickup from Apollo Pharmacy"/>
          <div class="flex items-center gap-2 pt-2">
            <div class="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 shadow-sm">${img('https://lh3.googleusercontent.com/aida-public/AB6AXuDt96htVWvKN5T9gmr8X5BWD4U9u861lHCRBrTCiwnwC7OxIdQU6ljspMqoxcNyf1StrZX1orzzUzzrqdWJjggo_j4OJ10jl7pxM8aziyA19Ri44qr7nZTrsqtw35LS3suMQpO30Ou7tXOfKXjL4qfq76O048q2lIXtr03OospISwdr1AVd29OyMGVm6GCplxOYxkBBcCwzXmuce4N8Kf8FbP6AUr4WtIuLaUT8zU1zKr1kGO1VZafo','Pharmacy','w-full h-full object-cover')}</div>
            <div class="flex flex-col min-w-0">
              <span class="font-label-numeric text-label-numeric text-on-surface truncate">Prescription RX Uploaded</span>
              <span class="font-body-sm text-body-sm text-secondary">apollo_prescription_nov.jpg (1.4MB)</span>
            </div>
            <button aria-label="Remove prescription" class="ml-auto w-8 h-8 flex items-center justify-center text-outline hover:text-error pressable" onclick="toast('Attachment removed','delete')">${icon('close','text-[18px]')}</button>
          </div>
        </div>
        <div class="flex flex-col gap-1.5">
          <span class="font-body-sm text-body-sm text-secondary">Quick ideas & presets:</span>
          <div class="flex gap-2 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4">
            ${['Milk & 1 Brown Bread|nutrition','Medicine Prescriptions|medication','Package pickup|package_2','Key drop|key'].map(p => { const [txt, ic] = p.split('|'); return `
            <button class="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container text-on-surface font-body-sm text-body-sm shadow-sm pressable" onclick="addItem('${txt}')">${icon('add','text-[16px] text-primary')}<span>${txt}</span></button>`; }).join('')}
          </div>
        </div>
        <div class="bg-surface-container-lowest rounded-xl p-3.5 shadow-sm flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <span class="font-label-numeric text-label-numeric uppercase text-secondary">Errand Checklist</span>
            <button class="flex items-center gap-1 font-body-semibold text-body-semibold text-primary pressable" onclick="promptItem()">${icon('add_circle','text-[18px]')}<span>Add item</span></button>
          </div>
          <div class="flex flex-col gap-2 pt-1" id="items-list">
            <div class="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
              <div class="flex items-center gap-2.5">${icon('check_box','text-[18px] text-primary',true)}<span class="font-body-regular text-body-regular text-on-surface">1x Dolo 650 Strip (15 tablets)</span></div>
              <span class="font-label-badge text-label-badge bg-surface-container px-2 py-0.5 rounded text-secondary">Must verify exp.</span>
            </div>
            <div class="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
              <div class="flex items-center gap-2.5">${icon('check_box','text-[18px] text-primary',true)}<span class="font-body-regular text-body-regular text-on-surface">2x Electral Sachets (Apple/Orange)</span></div>
              <span class="font-label-badge text-label-badge bg-surface-container px-2 py-0.5 rounded text-secondary">OTC</span>
            </div>
          </div>
        </div>
      </section>
      <!-- 3. Route & Addresses -->
      <section class="flex flex-col gap-2.5">
        <div class="flex items-center justify-between">
          <span class="font-title-card text-title-card text-on-surface">Route & Proximity</span>
          <span class="font-body-sm text-body-sm text-primary font-semibold">0.8 km total</span>
        </div>
        <div class="w-full h-32 rounded-xl bg-cover bg-center shadow-sm relative overflow-hidden" style="background-image:url('https://lh3.googleusercontent.com/aida-public/AB6AXuCuit4wFSo02Ck60n37vTRtu_aNEtwQyLnEIr_FJa4zQhjR61VU3Te0eeWz8z6JFZPRRsHK9-BBZF8K4PumChi7rCzaNzZgibbkNJ-lanRLYgklchtZvp4EuqR4U5STSw3DbDrR4vbHJBxsyYrASmCCDCR3XO3__4_Q4FNjRiPWp06xC1uLEF5kkNrN2j26yTYAjkYEJYtbJclSW3ouU6HTixAJ_DHqkFki1a40L7P5pp1O-YYvzUG2')">
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div class="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
            <div class="flex items-center gap-1.5">${icon('directions_walk','text-[18px] text-primary-fixed')}<span class="font-body-sm text-body-sm">Est. neighbor transit: 6 mins</span></div>
            <span class="font-label-badge text-label-badge bg-black/40 backdrop-blur-md px-2 py-0.5 rounded text-white">Indiranagar Sector 2</span>
          </div>
        </div>
        <div class="bg-surface-container-lowest rounded-xl p-3.5 shadow-sm flex flex-col gap-3">
          <div class="flex items-start gap-3">
            <div class="mt-0.5 flex flex-col items-center">
              <div class="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">${icon('storefront','text-[14px]')}</div>
              <div class="w-0.5 h-7 bg-surface-container-high my-1"></div>
            </div>
            <div class="flex-1 flex flex-col min-w-0">
              <div class="flex items-center justify-between"><span class="font-label-badge text-label-badge text-secondary uppercase">Pickup Address (Auto-Detected)</span><span class="font-label-badge text-label-badge text-primary font-semibold">Nearby Store</span></div>
              <span class="font-body-semibold text-body-semibold text-on-surface truncate">Apollo Pharmacy, 12th Main Indiranagar</span>
              <span class="font-body-sm text-body-sm text-secondary">Near BDA Complex • Counter 2</span>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0">${icon('home','text-[14px]')}</div>
            <div class="flex-1 flex flex-col min-w-0">
              <div class="flex items-center justify-between"><span class="font-label-badge text-label-badge text-secondary uppercase">Drop-Off Address</span><span class="font-label-badge text-label-badge bg-primary-fixed text-on-primary-fixed px-1.5 py-0.5 rounded">Saved Home</span></div>
              <span class="font-body-semibold text-body-semibold text-on-surface truncate">Flat 402, Shanti Nilayam, 8th Cross</span>
              <span class="font-body-sm text-body-sm text-secondary">Ring doorbell twice or leave with security</span>
            </div>
          </div>
        </div>
      </section>
      <!-- 4. Pricing & Fair-Estimate -->
      <section class="flex flex-col gap-3">
        <div class="flex items-center justify-between">
          <span class="font-title-card text-title-card text-on-surface">Padosi Fair-Estimate</span>
          <span class="font-label-badge text-label-badge bg-surface-container-high text-on-surface px-2 py-0.5 rounded-full">Fair Wage Verified</span>
        </div>
        <div class="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col gap-3.5">
          <div class="flex items-center justify-between bg-surface-container-low p-3 rounded-lg">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed">${icon('auto_graph','text-[20px]')}</div>
              <div class="flex flex-col"><span class="font-body-semibold text-body-semibold text-on-surface">Recommended Base</span><span class="font-body-sm text-body-sm text-secondary">0.8 km distance & 20 mins</span></div>
            </div>
            <span class="font-title-card text-title-card text-on-surface">₹180</span>
          </div>
          <div class="flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <span class="font-body-semibold text-body-semibold text-on-surface">Speed Booster Tip</span>
              <span class="font-body-sm text-body-sm text-tertiary-container font-semibold" id="tip-label">+ ₹30 Faster Pickup</span>
            </div>
            <div class="grid grid-cols-3 gap-2" id="tip-row">
              ${[[0,'Standard','+ ₹0'],[30,'Fast ⚡','+ ₹30'],[60,'Instant 🚀','+ ₹60']].map(([v,l,s]) => `
              <button class="tip-pill py-2.5 px-3 rounded-xl text-center font-body-semibold text-body-semibold pressable ${postState.tip === v ? 'bg-primary text-on-primary shadow-sm' : 'bg-surface-container text-on-surface'}" data-tip="${v}">
                <span>${l}</span><span class="block text-[11px] font-body-sm ${postState.tip === v ? 'text-white/90' : 'text-secondary'}">${s}</span>
              </button>`).join('')}
            </div>
          </div>
          <div class="flex items-start gap-3 bg-surface-container-high p-3 rounded-xl">
            ${icon('gshield','text-[24px] text-primary shrink-0',true)}
            <div class="flex flex-col"><span class="font-body-semibold text-body-semibold text-on-surface">Padosi SafePay Escrow</span><span class="font-body-sm text-body-sm text-secondary">Funds held securely until you verify task completion with the 4-digit runner PIN.</span></div>
          </div>
        </div>
      </section>
      <!-- 5. Payment Method -->
      <section class="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col gap-3">
        <div class="flex items-center justify-between">
          <span class="font-title-card text-title-card text-on-surface">Payment Method</span>
          <span class="font-label-badge text-label-badge text-primary">Instant UPI</span>
        </div>
        <div class="grid grid-cols-3 gap-2" id="upi-row">
          ${[['GPay','account_balance_wallet',true],['PhonePe','payments',false],['Paytm','qr_code_scanner',false]].map(([l,ic,on]) => `
          <button class="upi-btn flex flex-col items-center justify-center p-2.5 rounded-lg pressable ${on ? 'bg-primary-fixed/40 ring-2 ring-primary/30' : 'bg-surface-container-low opacity-70 hover:opacity-100'}" onclick="selectUpi(this)">
            <span class="material-symbols-outlined text-[24px] ${on ? 'text-primary' : 'text-secondary'}">${ic}</span>
            <span class="font-body-sm text-body-sm text-on-surface mt-1 ${on ? 'font-semibold' : ''}">${l}</span>
          </button>`).join('')}
        </div>
        <div class="flex items-center justify-between pt-2">
          <div class="flex items-center -space-x-2 overflow-hidden">
            ${img('https://lh3.googleusercontent.com/aida-public/AB6AXuCxmco3TVKHHC4D-8ZhOVGM6Bx-rWF2HfrO-kWKP7FUaCu9_JIm73V891dwKe76tWo7atYQeMskW74iybWNFv1WNPeXW8pOtgXh7H0pCGDVosDseha5H_Kv18T5Im8GkN7C9Q9Ah3HUqQd-XpiM1I5IU1i8x8GuUFOxnRQpeGfVNteTuFYb6NRRaU2IfojJH9TXV9HghapE2ugeRQTpVQTlf2yOdfh6voaXgcF86b1zhUlPZ-3ciyc1','runner','inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover')}
            ${img('https://lh3.googleusercontent.com/aida-public/AB6AXuAUSau-3PVgclVr5wT82oIEAfJ5jxLp1UFRzi7Ep2X2Wbg_YyFGofhH3EnpwrJJ7g1WTR00Cjcu89n7T8sPfOeR9eWLiovc4EPHATR6eDSphI9hycQh_zc467EUDSw3ofh_k47fles5jPdMS5pT08Y_S2pygvXjtCS6ozG0Fhk7cLd927IEOJH_Bn1OHqYladutvan9L7F-Wg3xLuzN7OYcgR99hLiS92hf9x3B_dvhmO-5io6u_gbw','runner','inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover')}
            ${img('https://lh3.googleusercontent.com/aida-public/AB6AXuCO8kHNpmkzNJ_vTcfd9vCrSkmpSvVEPYRuuFWjWA3icA1QiTITjGAhMs4dNJVWswTb5yOluf0RS2TyHmLnncrbTBMH28qB6keq9y_iEKp6q9qNcMEQF-JWfFyha9FjC-Kg98sC4ATI9HVQcw0OCxU6mB7tpNL0rSsCtX1MFkCu7b2kq3szQ6i1Qvu36ojJHyYVEUXwy-I-a6-pzWgBZbGhdSySrKf-ng4klYF_6Dtf_XLKpGIkRVDp','runner','inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover')}
          </div>
          <span class="font-body-sm text-body-sm text-secondary">7 runners active nearby</span>
        </div>
      </section>
    </div>
  </div>
  <!-- Sticky Bottom Tray -->
  <div class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-surface-container-lowest/95 backdrop-blur-lg px-4 py-3 shadow-[0_-4px_16px_rgba(15,23,42,0.06)] z-40">
    <div class="flex items-center justify-between gap-3">
      <div class="flex flex-col">
        <span class="font-label-badge text-label-badge text-secondary uppercase">Escrow Total</span>
        <span class="font-display-currency text-display-currency text-primary" id="post-total">₹${postState.base + postState.tip}</span>
      </div>
      <button id="post-cta" class="ripple ripple-dark flex-1 h-[52px] rounded-full bg-primary text-on-primary font-body-semibold text-body-semibold flex items-center justify-center gap-2 shadow-md pressable" style="max-width:230px">
        ${icon('lock','text-[20px]',true)}<span>Post Task with Escrow</span>
      </button>
    </div>
  </div>`;
}

function initPost() {
  const syncTotal = () => { $('#post-total').textContent = '₹' + (postState.base + postState.tip); };
  window.selectType = btn => {
    postState.type = btn.dataset.type;
    $$('.type-btn').forEach(b => {
      const on = b === btn;
      b.className = `type-btn ripple ripple-dark relative flex items-center gap-3 p-3.5 rounded-xl shadow-sm text-left pressable ${on ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest text-on-surface'}`;
      b.querySelector('.icon-wrap').className = `icon-wrap w-10 h-10 rounded-full ${on ? 'bg-white/20' : 'bg-surface-container-high'} flex items-center justify-center shrink-0`;
      b.querySelector('.icon-wrap span').className = `material-symbols-outlined text-[22px] ${on ? 'text-white' : 'text-secondary'}`;
      b.querySelector('.sub').className = `sub font-body-sm text-body-sm ${on ? 'text-white/80' : 'text-secondary'} text-[11px] truncate`;
      let chk = b.querySelector('.absolute.top-2\\.5');
      if (on && !chk) b.insertAdjacentHTML('beforeend', `<div class="absolute top-2.5 right-2.5">${icon('check_circle','text-[18px] text-white',true)}</div>`);
      if (!on && chk) chk.remove();
    });
  };
  window.addItem = txt => {
    $('#items-list').insertAdjacentHTML('beforeend', `
      <div class="flex items-center justify-between p-2 rounded-lg bg-surface-container-low chat-msg">
        <div class="flex items-center gap-2.5 min-w-0">${icon('check_box','text-[18px] text-primary',true)}<span class="font-body-regular text-body-regular text-on-surface truncate">${esc(txt)}</span></div>
        <button class="w-6 h-6 flex items-center justify-center text-outline hover:text-error pressable" onclick="this.parentElement.remove()">${icon('delete','text-[16px]')}</button>
      </div>`);
  };
  window.promptItem = () => {
    const v = prompt('Enter item name or instruction:');
    if (v && v.trim()) window.addItem(v.trim());
  };
  window.selectUpi = btn => {
    $$('.upi-btn').forEach(b => { b.className = 'upi-btn flex flex-col items-center justify-center p-2.5 rounded-lg pressable bg-surface-container-low opacity-70 hover:opacity-100'; b.querySelector('span').className = 'material-symbols-outlined text-[24px] text-secondary'; });
    btn.className = 'upi-btn flex flex-col items-center justify-center p-2.5 rounded-lg pressable bg-primary-fixed/40 ring-2 ring-primary/30';
    btn.querySelector('span').className = 'material-symbols-outlined text-[24px] text-primary';
  };
  $('#tip-row').addEventListener('click', e => {
    const pill = e.target.closest('.tip-pill'); if (!pill) return;
    postState.tip = +pill.dataset.tip;
    $$('.tip-pill').forEach(p => {
      const on = p === pill;
      p.className = `tip-pill py-2.5 px-3 rounded-xl text-center font-body-semibold text-body-semibold pressable ${on ? 'bg-primary text-on-primary shadow-sm' : 'bg-surface-container text-on-surface'}`;
      p.querySelector('span:nth-child(2)').className = `block text-[11px] font-body-sm ${on ? 'text-white/90' : 'text-secondary'}`;
    });
    $('#tip-label').textContent = postState.tip === 0 ? 'Standard Pickup' : postState.tip === 30 ? '+ ₹30 Faster Pickup' : '+ ₹60 Priority Runner';
    syncTotal();
  });
  $('#post-cta').addEventListener('click', async function () {
    const total = postState.base + postState.tip;
    const title = ($('#post-desc').value || '').trim();
    if (title.length < 5) { toast('Pehle task description likho (min 5 letters)', 'error'); return; }
    const btn = this;
    btn.innerHTML = `${icon('progress_activity','text-[20px] animate-spin')}<span>Locking Escrow...</span>`;
    btn.disabled = true;
    const taskPayload = {
      category: postState.type === 'courier' ? 'delivery' : postState.type,
      title, price: total, tip: postState.tip,
      pickup: 'Apollo Pharmacy, 12th Main', dropoff: 'Flat 402, Shanti Nilayam'
    };
    try {
      const order = await API.createOrder(total);
      if (order.paymentRequired) {
        if (typeof Razorpay === 'undefined') throw new Error('Payment gateway load nahi hua — internet check karo');
        btn.innerHTML = `${icon('account_balance_wallet','text-[20px]')}<span>Opening UPI/Card...</span>`;
        const paid = await new Promise((resolve, reject) => {
          const rzp = new Razorpay({
            key: order.keyId, amount: order.amount, currency: order.currency,
            order_id: order.orderId, name: 'Padosi Pro', description: title,
            theme: { color: '#006948' },
            prefill: { name: USER.name },
            handler: res => resolve({ paymentId: res.razorpay_payment_id, orderId: res.razorpay_order_id, signature: res.razorpay_signature }),
            modal: { ondismiss: () => reject(new Error('Payment cancel kar diya')) }
          });
          rzp.on('payment.failed', () => reject(new Error('Payment fail ho gaya, dobara try karo')));
          rzp.open();
        });
        btn.innerHTML = `${icon('progress_activity','text-[20px] animate-spin')}<span>Verifying Payment...</span>`;
        await API.verifyPayment(paid);
        taskPayload.paymentId = paid.paymentId;
        taskPayload.orderId = paid.orderId;
        btn.innerHTML = `${icon('progress_activity','text-[20px] animate-spin')}<span>Posting Task...</span>`;
      }
      const saved = await API.createTask(taskPayload);
      TASKS.unshift({
        id: saved.task.id, serverId: saved.task.id,
        category: saved.task.category, price: total,
        title: saved.task.title, distance: '0.8 km away', time: '~20 mins',
        badges: [['Verified Escrow','bg-primary-fixed text-on-primary-fixed-variant','verified_user']],
        requester: USER.name, rating: '5.0', reqSub: 'Just posted • Escrow locked', reqImg: USER.avatar
      });
      btn.innerHTML = `${icon('check','text-[20px]')}<span>Task Posted!</span>`;
      toast(`Task database me save! ₹${total} escrow locked.`, 'campaign', 'Explore', () => go('#/explore'));
    } catch (e) {
      toast(e.message, 'error'); btn.disabled = false;
      btn.innerHTML = `${icon('lock','text-[20px]',true)}<span>Post Task with Escrow</span>`;
    }
  });
}

/* ============================================================
   SCREEN 4 — WALLET
   ============================================================ */
function renderWallet() {
  const b = state.balanceHidden ? '₹••••••' : '₹4,850.00';
  const av = state.balanceHidden ? '₹••••' : '₹4,200.00';
  const esc = state.balanceHidden ? '₹•••' : '₹650.00';
  const badges = [
    ['electric_bolt','bg-tertiary-fixed text-on-tertiary-fixed','Express Runner','Avg. under 20m'],
    ['hotel_class','bg-secondary-container text-on-secondary-fixed','50+ 5-Star Reviews','100% genuine praise',true],
    ['find_replace','bg-surface-container-high text-primary','Zero Cancellations','Flawless record'],
    ['shopping_bag','bg-primary-fixed text-primary','Top Grocery Shopper','Freshness master'],
  ];
  return `
  <div class="flex flex-col w-full px-4 gap-5 pb-28 stagger">
    <!-- Profile & Trust Score Card -->
    <section class="bg-surface-container-lowest rounded-xl p-4 shadow-md flex flex-col gap-4 relative overflow-hidden">
      <div class="absolute -right-12 -top-12 w-36 h-36 rounded-full bg-primary-fixed/20 pointer-events-none blur-2xl"></div>
      <div class="flex items-start gap-3 relative z-10">
        <div class="relative shrink-0">
          ${img(USER.avatar, 'Karthik Menon', 'w-16 h-16 rounded-full object-cover shadow-sm')}
          <div class="absolute -bottom-1 -right-1 bg-primary text-on-primary rounded-full p-0.5 flex items-center justify-center shadow">${icon('verified','text-[16px]')}</div>
        </div>
        <div class="flex flex-col min-w-0 flex-1">
          <div class="flex items-center justify-between gap-1">
            <h1 class="font-headline-md text-headline-md text-on-surface truncate">Karthik Menon</h1>
            <div class="flex items-center gap-1 bg-surface-container-high px-2 py-0.5 rounded-full shrink-0">${icon('star','text-[14px] text-tertiary',true)}<span class="font-label-badge text-label-badge text-on-surface">4.9</span><span class="font-body-sm text-body-sm text-secondary">(86)</span></div>
          </div>
          <p class="font-body-sm text-body-sm text-primary font-semibold truncate">Indiranagar Resident • Level 3 Neighbor Hero</p>
          <p class="font-body-sm text-body-sm text-secondary truncate mt-0.5">Joined March 2023 • 99.4% On-time</p>
        </div>
      </div>
      <div class="bg-surface-container-low rounded-lg p-2 flex items-center justify-between gap-2 text-on-surface">
        <div class="flex items-center gap-1.5 min-w-0">
          <div class="w-7 h-7 rounded-full bg-primary-fixed flex items-center justify-center text-primary shrink-0">${icon('shield_person','text-[16px]')}</div>
          <div class="flex flex-col min-w-0"><span class="font-label-badge text-label-badge text-primary uppercase tracking-wider">Trust Score</span><span class="font-body-semibold text-body-semibold text-on-surface leading-tight">98/100</span></div>
        </div>
        <div class="w-px h-6 bg-surface-container-highest"></div>
        <div class="flex items-center gap-1 min-w-0 text-on-surface-variant">${icon('check_circle','text-[15px] text-primary shrink-0')}<span class="font-label-badge text-label-badge truncate">KYC Verified</span></div>
        <div class="w-px h-6 bg-surface-container-highest"></div>
        <div class="flex items-center gap-1 min-w-0 text-on-surface-variant">${icon('fingerprint','text-[15px] text-primary shrink-0')}<span class="font-label-badge text-label-badge truncate">Aadhaar Linked</span></div>
      </div>
    </section>
    <!-- Escrow & Wallet Card -->
    <section class="bg-gradient-to-br from-primary-container to-primary text-on-primary rounded-xl p-4 shadow-xl flex flex-col gap-4 relative overflow-hidden">
      <div class="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-6 translate-y-6">${icon('account_balance_wallet','text-[160px]')}</div>
      <div class="flex items-center justify-between relative z-10">
        <div class="flex items-center gap-2">${icon('lock','text-[20px] text-primary-fixed')}<span class="font-label-badge text-label-badge text-primary-fixed uppercase tracking-wider">Padosi Escrow Guarded</span></div>
        <span class="bg-on-primary/15 backdrop-blur-md px-2.5 py-1 rounded-full font-label-badge text-label-badge text-on-primary">Live Node</span>
      </div>
      <div class="flex flex-col relative z-10">
        <span class="font-body-sm text-body-sm text-primary-fixed">Total Balance</span>
        <div class="flex items-center gap-1">
          <span class="flip-num font-display-currency text-display-currency text-on-primary tracking-tight" id="balance-main">${b}</span>
          <button aria-label="Toggle balance privacy" class="text-primary-fixed hover:text-on-primary transition-colors p-1 pressable" id="toggle-balance">${icon(state.balanceHidden ? 'visibility_off' : 'visibility','text-[18px]')}</button>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-2 bg-surface-container-lowest/15 backdrop-blur-md rounded-lg p-2 relative z-10">
        <div class="flex flex-col min-w-0 pr-2">
          <span class="font-label-badge text-label-badge text-primary-fixed truncate">Available to Withdraw</span>
          <span class="flip-num font-headline-sm text-headline-sm text-on-primary truncate" id="balance-avail">${av}</span>
        </div>
        <div class="flex flex-col min-w-0 pl-2 bg-on-primary/10 rounded p-1">
          <div class="flex items-center gap-1 text-tertiary-fixed">${icon('hourglass_top','text-[14px]')}<span class="font-label-badge text-label-badge truncate">In Escrow</span></div>
          <span class="flip-num font-title-card text-title-card text-on-primary truncate" id="balance-esc">${esc}</span>
          <span class="font-label-numeric text-label-numeric text-primary-fixed/90 truncate">2 active tasks</span>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-2 pt-1 relative z-10">
        <button class="ripple bg-primary-fixed active:scale-95 hover:bg-primary-fixed-dim text-on-primary-fixed h-11 rounded-full flex items-center justify-center gap-1.5 font-body-semibold text-body-semibold shadow-md pressable" onclick="toast('Withdrawal of ₹4,200 initiated to GPAY UPI','bolt')">${icon('bolt','text-[18px]')}<span class="truncate">Withdraw to UPI</span></button>
        <button class="ripple bg-on-primary/15 hover:bg-on-primary/25 active:scale-95 text-on-primary h-11 rounded-full flex items-center justify-center gap-1.5 font-body-semibold text-body-semibold backdrop-blur-md pressable" onclick="toast('Add money via UPI / NetBanking','add_circle')">${icon('add_circle','text-[18px]')}<span class="truncate">Add / Deposit</span></button>
      </div>
    </section>
    <!-- Security Strip -->
    <section class="bg-surface-container-low rounded-lg px-4 py-2.5 flex items-center justify-between">
      <div class="flex items-center gap-2">${icon('verified_user','text-primary text-[18px]')}<span class="font-body-sm text-body-sm text-on-surface-variant font-semibold">NPCI • 256-bit Encrypted Settlement</span></div>
      <span class="font-label-numeric text-label-numeric text-primary cursor-pointer hover:underline pressable" onclick="toast('Audit report: all settlements verified','verified')">Audited</span>
    </section>
    <!-- Badges Carousel -->
    <section class="flex flex-col gap-2">
      <div class="flex items-center justify-between">
        <h2 class="font-headline-sm text-headline-sm text-on-surface">Neighbor Badges</h2>
        <span class="font-label-badge text-label-badge text-secondary">4 of 12 Unlocked</span>
      </div>
      <div class="badge-track flex gap-2 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4">
        ${badges.map(([ic,bg,t,s,f]) => `
        <div class="bg-surface-container-lowest rounded-xl p-3 min-w-[170px] max-w-[170px] shadow-sm flex flex-col gap-1.5 shrink-0 pressable hover-lift">
          <div class="w-9 h-9 rounded-full ${bg} flex items-center justify-center">${icon(ic,'text-[20px]',!!f)}</div>
          <span class="font-title-card text-title-card text-on-surface leading-tight">${t}</span>
          <span class="font-body-sm text-body-sm text-secondary truncate">${s}</span>
        </div>`).join('')}
      </div>
    </section>
    <!-- Recent Ledger -->
    <section class="flex flex-col gap-2">
      <div class="flex items-center justify-between">
        <h2 class="font-headline-sm text-headline-sm text-on-surface">Recent Ledger & Tasks</h2>
        <a class="font-label-numeric text-label-numeric text-primary hover:underline cursor-pointer pressable" onclick="toast('Full ledger — last 90 days','receipt_long')">View All</a>
      </div>
      <div class="bg-surface-container-lowest rounded-xl shadow-sm flex flex-col stagger">
        ${WALLETX.map(w => `
        <div class="p-4 flex items-center justify-between gap-2 hover:bg-surface-container-low/50 transition-colors pressable">
          <div class="flex items-center gap-2 min-w-0">
            <div class="w-10 h-10 rounded-full ${w.bg} flex items-center justify-center shrink-0">${icon(w.ic,'text-[20px]')}</div>
            <div class="flex flex-col min-w-0">
              <span class="font-title-card text-title-card text-on-surface truncate">${w.title}</span>
              <div class="flex items-center gap-1 text-secondary"><span class="font-body-sm text-body-sm truncate">${w.meta}</span><span>•</span><span class="font-label-badge text-label-badge ${w.badgeCls}">${w.badge}</span></div>
            </div>
          </div>
          <div class="flex flex-col items-end shrink-0">
            <span class="font-headline-sm text-headline-sm ${w.amtCls}">${w.amt}</span>
            ${w.subPill ? `<span class="bg-tertiary-fixed text-on-tertiary-fixed-variant px-1.5 py-0.5 rounded font-label-badge text-label-badge mt-0.5">${w.sub}</span>` : `<span class="font-label-badge text-label-badge text-secondary">${w.sub}</span>`}
          </div>
        </div>
        <div class="h-px w-full bg-surface-container-low"></div>`).join('')}
      </div>
    </section>
    <!-- Community Impact -->
    <section class="bg-surface-container rounded-xl p-4 flex items-center justify-between shadow-sm pressable cursor-pointer hover-lift" onclick="toast('Impact report: 42km car runs avoided!','eco')">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm shrink-0">${icon('eco','text-[24px]')}</div>
        <div class="flex flex-col min-w-0">
          <span class="font-title-card text-title-card text-on-surface">Neighborhood Impact</span>
          <span class="font-body-sm text-body-sm text-on-surface-variant">Saved 42km of car runs via bicycle errands</span>
        </div>
      </div>
      ${icon('chevron_right','text-secondary shrink-0')}
    </section>
  </div>`;
}

function initWallet() {
  $('#toggle-balance').addEventListener('click', function () {
    state.balanceHidden = !state.balanceHidden;
    ['balance-main','balance-avail','balance-esc'].forEach(id => {
      const el = document.getElementById(id);
      el.classList.add('flipping');
      setTimeout(() => {
        el.textContent = state.balanceHidden ? (id === 'balance-main' ? '₹••••••' : id === 'balance-avail' ? '₹••••' : '₹•••') : (id === 'balance-main' ? '₹4,850.00' : id === 'balance-avail' ? '₹4,200.00' : '₹650.00');
        el.classList.remove('flipping');
      }, 200);
    });
    this.innerHTML = icon(state.balanceHidden ? 'visibility' : 'visibility_off', 'text-[18px]');
  });
}

/* ============================================================
   SCREEN — MY TASKS (posted + accepted, backend-wired)
   ============================================================ */
function myTaskRow(t, kind) {
  const statusColor = { open: 'text-primary bg-primary-fixed/30', accepted: 'text-tertiary bg-tertiary-fixed/40', completed: 'text-secondary bg-surface-container' };
  const status = t.status || (state.track.claimed[t.id] ? 'accepted' : 'open');
  return `
  <div class="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex items-center justify-between gap-3 pressable cursor-pointer hover-lift" onclick="go('#/task-details/${t.id}')">
    <div class="flex items-center gap-3 min-w-0">
      <div class="w-10 h-10 rounded-full ${kind === 'posted' ? 'bg-secondary-container text-on-secondary-fixed' : 'bg-primary-fixed text-on-primary-fixed-variant'} flex items-center justify-center shrink-0">
        ${icon(kind === 'posted' ? 'campaign' : 'directions_run', 'text-[20px]')}
      </div>
      <div class="flex flex-col min-w-0">
        <span class="font-title-card text-title-card text-on-surface truncate">${esc(t.title)}</span>
        <span class="font-label-badge text-label-badge px-1.5 py-0.5 rounded-full inline-block w-fit mt-0.5 ${statusColor[status] || statusColor.open}">${status}</span>
      </div>
    </div>
    <span class="font-display-currency text-[20px] font-extrabold text-primary shrink-0">₹${t.price}</span>
  </div>`;
}

function renderMyTasks() {
  const tab = state.myTasksTab || 'posted';
  const myPosted = TASKS.filter(t => t.requester === USER.name);
  const myAccepted = TASKS.filter(t => state.track.claimed[t.id] && t.requester !== USER.name);
  const list = tab === 'posted' ? myPosted : myAccepted;
  return `
  <div class="flex flex-col w-full px-4 gap-4 pb-28 stagger">
    <div class="pt-2 bg-surface-container-high p-1 rounded-full flex items-center shadow-sm">
      <button class="flex-1 py-2.5 rounded-full font-body-semibold text-body-semibold transition-colors pressable ${tab === 'posted' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant'}" onclick="setMyTasksTab('posted')">Posted by You</button>
      <button class="flex-1 py-2.5 rounded-full font-body-semibold text-body-semibold transition-colors pressable ${tab === 'accepted' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant'}" onclick="setMyTasksTab('accepted')">Accepted Runs</button>
    </div>
    <div id="my-tasks-list" class="flex flex-col gap-3">
      ${list.length ? list.map(t => myTaskRow(t, tab === 'posted' ? 'posted' : 'accepted')).join('') : `
      <div class="bg-surface-container-lowest rounded-xl p-8 text-center shadow-sm">
        ${icon(tab === 'posted' ? 'campaign' : 'directions_run', 'text-[40px] text-outline')}
        <p class="font-body-semibold text-body-semibold text-on-surface mt-2">${tab === 'posted' ? 'Koi task post nahi kiya abhi tak' : 'Koi task accept nahi kiya abhi tak'}</p>
        <p class="font-body-sm text-body-sm text-on-surface-variant">${tab === 'posted' ? 'Post Task se neighborhood me kaam post karo' : 'Explore feed se koi task accept karo'}</p>
      </div>`}
    </div>
  </div>`;
}
window.setMyTasksTab = tab => { state.myTasksTab = tab; rerenderCurrent('enter-fade'); };

async function initMyTasks() {
  try {
    const data = await API.fetchMyTasks();
    let added = false;
    (data.posted || []).forEach(t => {
      if (!TASKS.find(x => x.id === t.id)) { TASKS.push({ id: t.id, category: t.category, price: t.price + (t.tip || 0), title: t.title, requester: USER.name, rating: '5.0', reqSub: 'Posted by you', reqImg: USER.avatar, status: t.status }); added = true; }
    });
    (data.accepted || []).forEach(t => {
      if (!TASKS.find(x => x.id === t.id)) { TASKS.push({ id: t.id, category: t.category, price: t.price + (t.tip || 0), title: t.title, requester: t.users?.name || 'Padosi', rating: '5.0', reqSub: 'Accepted by you', reqImg: USER.avatar, status: t.status }); added = true; }
      if (!state.track.claimed[t.id]) { state.track.claimed[t.id] = true; added = true; }
    });
    if (added) rerenderCurrent('enter-fade');
  } catch (e) { /* backend offline — local demo state hi dikhega */ }
}

/* ============================================================
   SCREEN 5 — LIVE TRACKING (with chat)
   ============================================================ */
function renderTrack() {
  const steps = ['Accepted', 'At Store', 'In Transit', 'Delivered'];
  const cur = state.track.step;
  const pct = [8, 36, 68, 100][cur];
  return `
  <div class="flex flex-col w-full pb-32">
    <!-- Live Geolocation Radar Strip -->
    <div class="relative w-full h-44 bg-surface-container overflow-hidden">
      <div class="w-full h-full bg-cover bg-center" style="background-image:url('https://lh3.googleusercontent.com/aida-public/AB6AXuD1pcYWxbgRPdX7WrpHTcFI9NU1a59QvFnNQ6b7pCfe-ELgO71ZBlVSOifKYvttnhEDNu-_Rb8pCP5h2MZM5iHpPC8CN_ERiQnX4JHpv72bdYOYI2VlAqQIliF6Tb0fZp83JIPn-GipMbS3MttDbfckrmOY_dUOFUMzO8OUlO0QM57Ube0kQ_gNE7eJ-4sSlbpwjs7K7XPkl8VCS03LFRQZ_wlc2ETZ6OBiIRIFezxJ5d3GTUSahcJL')"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-surface/20 via-transparent to-surface pointer-events-none"></div>
      <!-- Radar rings -->
      <div class="radar-ring w-24 h-24 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      <div class="radar-ring w-24 h-24 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style="animation-delay:1.2s"></div>
      <!-- Floating Transit Tag -->
      <div class="absolute top-3 left-4 bg-surface-container-lowest/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md flex items-center gap-2">
        <span class="relative flex h-2.5 w-2.5"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span><span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span></span>
        <span class="font-label-numeric text-label-numeric text-on-surface">Live Delivery Track • Sector 4</span>
      </div>
      <!-- Runner Map Pin -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center runner-pin">
        <div class="w-10 h-10 rounded-full bg-primary p-0.5 shadow-xl flex items-center justify-center text-on-primary">${icon('directions_bike','text-[22px]')}</div>
        <div class="bg-inverse-surface text-inverse-on-surface px-2 py-0.5 rounded text-[10px] font-bold mt-1 shadow-sm whitespace-nowrap">Rahul • <span id="runner-dist">400</span>m away</div>
      </div>
    </div>
    <div class="px-4 -mt-4 relative z-10 flex flex-col gap-3">
      <!-- Status & Progress Stepper -->
      <div class="bg-surface-container-lowest rounded-xl p-4 shadow-sm">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">${icon('shopping_bag','text-primary text-[20px]',true)}<h2 class="font-headline-sm text-headline-sm text-on-surface">Grocery Pickup</h2></div>
          <span id="status-pill" class="bg-primary-fixed text-on-primary-fixed px-2.5 py-1 rounded-full font-label-badge text-label-badge uppercase tracking-wider">${cur < 3 ? 'In Progress' : 'Delivered'}</span>
        </div>
        <div class="relative flex items-center justify-between pt-2 pb-1">
          <div class="absolute left-3 right-3 top-5 -translate-y-1/2 h-1 bg-surface-container-high z-0 rounded-full overflow-hidden">
            <div id="stepper-fill" class="h-full bg-primary rounded-full" style="width:${pct}%"></div>
          </div>
          ${steps.map((s, i) => {
            const done = i < cur, active = i === cur;
            const dot = done
              ? `<div class="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-xs transition-all duration-500">${icon('check','text-[14px]')}</div>`
              : active
              ? `<div class="w-6 h-6 rounded-full bg-primary-fixed-dim text-on-primary-fixed-variant flex items-center justify-center shadow-md relative transition-all duration-500"><span class="relative flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-90"></span><span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span></span></div>`
              : `<div class="w-6 h-6 rounded-full bg-surface-container-high text-outline flex items-center justify-center transition-all duration-500">${icon(i === 3 ? 'home' : 'circle','text-[14px]')}</div>`;
            return `<div class="flex flex-col items-center gap-1.5 z-10">${dot}<span class="font-label-badge text-label-badge ${active ? 'text-primary font-bold' : done ? 'text-on-surface-variant' : 'text-secondary'}">${s}</span></div>`;
          }).join('')}
        </div>
      </div>
      <!-- Runner Profile Card -->
      <div class="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="relative">
            ${img('https://lh3.googleusercontent.com/aida-public/AB6AXuBl41RVS4XldEYM9n3Q3LoG478ucRnDowL0ZIv0PqItWnFnm9DB39SqIGqAFwtem1MpR_4kyNDfsJaSMHT5A1igsHo3s_DE85pgmoujdvCk0zHM7O_TaYTGPkyCGffn91Hzc60EiGXx2UPLp2__8uSly4inrHM34o4vRlNsInlwuWixKlJkVi2c66NP_7U4V0iQoOqAWSPylZjlOy1nCiy2PhetHBt5rZEqxzU17Nsd0-XMEz9q9Rg0','Rahul Sharma','w-12 h-12 rounded-full object-cover shadow-xs')}
            <div class="absolute -bottom-1 -right-1 bg-surface-container-lowest rounded-full p-0.5 shadow-xs">${icon('verified','text-[16px] text-primary',true)}</div>
          </div>
          <div>
            <div class="flex items-center gap-1.5"><h3 class="font-title-card text-title-card text-on-surface leading-tight">Rahul Sharma</h3><span class="bg-surface-container text-secondary text-[11px] px-1.5 py-0.5 rounded font-body-semibold">Neighbor</span></div>
            <div class="flex items-center gap-2 mt-0.5">
              <span class="flex items-center text-tertiary font-label-numeric text-label-numeric">${icon('star','text-[14px] mr-0.5',true)} 4.95</span>
              <span class="text-outline text-body-sm">•</span>
              <span class="font-body-sm text-body-sm text-on-surface-variant">118 errands</span>
            </div>
            <p class="font-body-sm text-body-sm text-primary font-semibold mt-0.5" id="eta-line">Arriving in ~8 mins (<span id="runner-dist2">0.4</span> km away)</p>
          </div>
        </div>
        <button aria-label="Call Rahul" class="w-11 h-11 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center pressable shadow-xs" onclick="toast('Calling Rahul Sharma...','call')">${icon('call','text-[20px]')}</button>
      </div>
      <!-- Handoff OTP PIN Card -->
      <div class="bg-surface-container-high/60 rounded-xl p-4 flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center">${icon('key','text-[20px]')}</div>
          <div>
            <p class="font-label-badge text-label-badge uppercase tracking-wider text-secondary">Handoff Verification</p>
            <p class="font-body-sm text-body-sm text-on-surface-variant">Share PIN upon delivery</p>
          </div>
        </div>
        <div class="flex items-center gap-1.5 bg-surface-container-lowest px-3 py-1.5 rounded-lg shadow-xs">
          <span class="font-headline-sm text-headline-sm text-primary font-bold tracking-[0.2em]"><span class="otp-digit">5</span><span class="otp-digit">8</span><span class="otp-digit">2</span><span class="otp-digit">1</span></span>
          <button aria-label="Copy PIN" class="material-symbols-outlined text-[18px] text-outline hover:text-primary ml-1 transition-colors pressable" onclick="copyPin(this)">content_copy</button>
        </div>
      </div>
      <!-- Chat Section -->
      <div class="flex items-center justify-between mt-1">
        <div class="flex items-center gap-1.5">${icon('chat_bubble','text-[18px] text-primary')}<span class="font-body-semibold text-body-semibold text-on-surface">Errand Thread</span></div>
        <span class="font-label-numeric text-label-numeric text-outline">Encrypted & Logged</span>
      </div>
      <div class="flex flex-col gap-3 py-1" id="chat-stream">
        <div class="flex items-end gap-2 max-w-[88%] self-start chat-msg">
          ${img('https://lh3.googleusercontent.com/aida-public/AB6AXuAbDeoxf2-X7mf6clw4Fiy9mT_sJTES5fgY8KfydQI_iM0vXrvm9ZVjyGRxbiZm74ZeRUPwnPwt6_dSYohPDBRjNFx_lD6x-ltK_w0lHnsCJ-UFFICjGPbGaKJNvPxycntqZQUlSFCYcZ3jilApqX2VVoeZBGq2aFLoxnSjjrX_l4FL3jA8egZ5BDfR-8EXhh7Jcg5Ovl4shalvQzlAidGaOaBlvv6VPxTbpmYjpO8BM3vbgaviWUn4','Rahul','w-7 h-7 rounded-full object-cover mb-1 shadow-xs')}
          <div class="flex flex-col gap-1.5 min-w-0">
            <div class="bg-surface-container-lowest rounded-2xl rounded-bl-xs p-3 shadow-xs">
              <p class="font-body-regular text-body-regular text-on-surface">I've picked up the bread and milk. Avocados were slightly firm, took the best ones!</p>
              <div class="mt-2.5 rounded-lg overflow-hidden bg-surface-container-low p-1.5">
                <div class="grid grid-cols-2 gap-1.5">
                  <div class="relative rounded overflow-hidden aspect-[4/3]">${img('https://lh3.googleusercontent.com/aida-public/AB6AXuCMmMTt4rlghhOcIT-RspMfnJOBPuvogwnLaEUndIYlR7baJLdlWDxTuDYO7ABeURPLSKDRkVNSnWMKOt5Cjcs8HM_4Qrk9UzNr3DceUG1WsdwBpF73KQWLETlR4zuWoJR_S56KkF1sAS1EwgJBa-53XSwnG_yhDLHWNuKJf95MXaNL9yTCYrfyzCmXGNxyGMzJAGv-h_dXS--LoWaoawxKSGvKYRG42emfO43Aul-2AffJd4xA8sO6','Receipt','w-full h-full object-cover')}<div class="absolute bottom-1 left-1 bg-inverse-surface/80 text-inverse-on-surface text-[9px] px-1 rounded">Receipt</div></div>
                  <div class="relative rounded overflow-hidden aspect-[4/3]">${img('https://lh3.googleusercontent.com/aida-public/AB6AXuA9opnw8Llrh3OKR2Bk2_YVlnVlyRBFzrd6Smx7Jqc4pwpI3yl63nnZN7cEMda2QCT7W_XLDjZyjKrKVmvaFCBHxp30QeRSVX2U1_w3uFQMMHcJRVJy9h8-xK7L7VmIBC-Yw_WuCc7hrd8VrwpFNtgwkKKrV-O1Dr6ATb41wBwcFvR6ITQ-IepHR6404eTGwcfIPAgooZ1Fk-OLtAcoNQGYhE_QcCAP8DI7gJV3-y_2jeSswAkr8kzV','Items','w-full h-full object-cover')}<div class="absolute bottom-1 left-1 bg-inverse-surface/80 text-inverse-on-surface text-[9px] px-1 rounded">Items</div></div>
                </div>
                <div class="flex items-center gap-1 mt-1.5 px-1 text-primary">${icon('verified','text-[14px]')}<span class="font-label-numeric text-label-numeric">Verified at Store POS</span></div>
              </div>
            </div>
            <span class="font-label-numeric text-label-numeric text-secondary ml-1">11:42 AM</span>
          </div>
        </div>
        <div class="flex items-end gap-2 max-w-[85%] self-end chat-msg">
          <div class="flex flex-col items-end gap-1">
            <div class="bg-primary text-on-primary rounded-2xl rounded-br-xs p-3 shadow-sm"><p class="font-body-regular text-body-regular text-on-primary">Looks perfect, thank you so much! Buzzer is working, come right up.</p></div>
            <div class="flex items-center gap-1 mr-1"><span class="font-label-numeric text-label-numeric text-secondary">11:43 AM</span>${icon('done_all','text-[14px] text-primary')}</div>
          </div>
        </div>
      </div>
      <!-- Quick Reply Chips -->
      <div class="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar -mx-4 px-4">
        ${['Thank you!','Leave at door','On my way down','Need extra items?'].map(q => `<button class="shrink-0 bg-surface-container-lowest hover:bg-surface-container-high px-3 py-1.5 rounded-full font-body-sm text-body-sm text-on-surface shadow-xs pressable" onclick="quickReply('${q}')">${q}</button>`).join('')}
      </div>
    </div>
  </div>
  <!-- Sticky Bottom Chat Bar -->
  <div class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-40 bg-surface-container-lowest/95 backdrop-blur-xl px-4 py-2.5 shadow-[0_-4px_16px_rgba(15,23,42,0.06)] pb-safe">
    <form class="flex items-center gap-2" id="chat-form">
      <button aria-label="Attach Photo" class="w-11 h-11 rounded-full text-secondary hover:text-primary flex items-center justify-center hover:bg-surface-container-low transition-colors pressable" type="button" onclick="toast('Camera / gallery attach','photo_camera')">${icon('photo_camera','text-[22px]')}</button>
      <div class="flex-1 relative flex items-center">
        <input class="w-full h-11 bg-surface-container-low rounded-full px-4 text-on-surface placeholder:text-outline font-body-regular text-body-regular focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 transition-all" id="chat-input" placeholder="Message Rahul..." autocomplete="off"/>
      </div>
      <button aria-label="Send Message" class="w-11 h-11 rounded-full bg-primary text-on-primary flex items-center justify-center pressable shadow-xs ripple" type="submit">${icon('send','text-[20px]')}</button>
    </form>
  </div>`;
}

let trackTimers = [];
function initTrack() {
  trackTimers.forEach(clearInterval); trackTimers = [];
  window.copyPin = btn => {
    const done = () => { btn.innerText = 'check'; btn.classList.add('text-primary'); setTimeout(() => { btn.innerText = 'content_copy'; btn.classList.remove('text-primary'); }, 1500); };
    if (navigator.clipboard) navigator.clipboard.writeText('5821').then(done).catch(done); else done();
    toast('Handoff PIN 5821 copied', 'key');
  };
  window.quickReply = q => { const i = $('#chat-input'); i.value = q; i.focus(); };

  // send message + simulated runner reply
  $('#chat-form').addEventListener('submit', e => {
    e.preventDefault();
    const input = $('#chat-input');
    const msg = input.value.trim(); if (!msg) return;
    appendMsg(msg, true);
    input.value = '';
    // typing indicator
    setTimeout(() => {
      const stream = $('#chat-stream');
      const t = document.createElement('div');
      t.className = 'flex items-end gap-2 max-w-[88%] self-start chat-msg'; t.id = 'typing-row';
      t.innerHTML = `${img('https://lh3.googleusercontent.com/aida-public/AB6AXuAbDeoxf2-X7mf6clw4Fiy9mT_sJTES5fgY8KfydQI_iM0vXrvm9ZVjyGRxbiZm74ZeRUPwnPwt6_dSYohPDBRjNFx_lD6x-ltK_w0lHnsCJ-UFFICjGPbGaKJNvPxycntqZQUlSFCYcZ3jilApqX2VVoeZBGq2aFLoxnSjjrX_l4FL3jA8egZ5BDfR-8EXhh7Jcg5Ovl4shalvQzlAidGaOaBlvv6VPxTbpmYjpO8BM3vbgaviWUn4','Rahul','w-7 h-7 rounded-full object-cover mb-1 shadow-xs')}<div class="bg-surface-container-lowest rounded-2xl rounded-bl-xs p-3 shadow-xs flex gap-1 items-center"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>`;
      stream.appendChild(t); scrollChat();
      setTimeout(() => {
        t.remove();
        const replies = ['On it! 5 mins away 🛵', 'Got it, see you soon!', 'Perfect, ringing the bell shortly', 'Sure thing! Anything else?'];
        appendMsg(replies[Math.floor(Math.random() * replies.length)], false);
      }, 1600);
    }, 700);
  });

  // live distance countdown simulation
  let dist = 400;
  const iv = setInterval(() => {
    dist = Math.max(30, dist - Math.floor(Math.random() * 25));
    const d1 = $('#runner-dist'), d2 = $('#runner-dist2'), eta = $('#eta-line');
    if (!d1) { clearInterval(iv); return; }
    d1.textContent = dist;
    if (d2) d2.textContent = (dist / 1000).toFixed(1);
    if (eta) eta.innerHTML = `Arriving in ~${Math.max(1, Math.round(dist / 50))} mins (<span id="runner-dist2">${(dist / 1000).toFixed(1)}</span> km away)`;
  }, 2500);
  trackTimers.push(iv);

  // auto-advance stepper
  if (state.track.step < 3) {
    const adv = setInterval(() => {
      if (state.track.step >= 3) {
        clearInterval(adv);
        const pill = $('#status-pill');
        if (pill) { pill.textContent = 'Delivered'; pill.className = 'bg-primary text-on-primary px-2.5 py-1 rounded-full font-label-badge text-label-badge uppercase tracking-wider'; }
        toast('Delivered! Share PIN 5821 to release escrow.', 'check_circle', 'Wallet', () => go('#/wallet'));
        NOTIFS.unshift({ id: Date.now(), icon: 'task_alt', color: 'text-primary bg-primary-fixed/40', title: 'Task Completed!', body: 'Grocery Run marked delivered. ₹220 released to your wallet.', time: 'Just now', unread: true });
        state.notifUnread++;
        return;
      }
      state.track.step++;
      rerenderTrackOnly();
    }, 8000);
    trackTimers.push(adv);
  }
}
function rerenderTrackOnly() {
  const main = $('#main');
  main.innerHTML = `<div class="page active enter-fade">${renderTrack()}</div>`;
  initTrack();
  renderNav('track');
}
function appendMsg(text, mine) {
  const stream = $('#chat-stream'); if (!stream) return;
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const el = document.createElement('div');
  el.className = `flex items-end gap-2 max-w-[${mine ? '85' : '88'}%] self-${mine ? 'end' : 'start'} chat-msg`;
  if (mine) {
    el.innerHTML = `<div class="flex flex-col items-end gap-1"><div class="bg-primary text-on-primary rounded-2xl rounded-br-xs p-3 shadow-sm"><p class="font-body-regular text-body-regular text-on-primary">${esc(text)}</p></div><div class="flex items-center gap-1 mr-1"><span class="font-label-numeric text-label-numeric text-secondary">${time}</span>${icon('done','text-[14px] text-primary')}</div></div>`;
  } else {
    el.innerHTML = `${img('https://lh3.googleusercontent.com/aida-public/AB6AXuAbDeoxf2-X7mf6clw4Fiy9mT_sJTES5fgY8KfydQI_iM0vXrvm9ZVjyGRxbiZm74ZeRUPwnPwt6_dSYohPDBRjNFx_lD6x-ltK_w0lHnsCJ-UFFICjGPbGaKJNvPxycntqZQUlSFCYcZ3jilApqX2VVoeZBGq2aFLoxnSjjrX_l4FL3jA8egZ5BDfR-8EXhh7Jcg5Ovl4shalvQzlAidGaOaBlvv6VPxTbpmYjpO8BM3vbgaviWUn4','Rahul','w-7 h-7 rounded-full object-cover mb-1 shadow-xs')}<div class="flex flex-col gap-1.5 min-w-0"><div class="bg-surface-container-lowest rounded-2xl rounded-bl-xs p-3 shadow-xs"><p class="font-body-regular text-body-regular text-on-surface">${esc(text)}</p></div><span class="font-label-numeric text-label-numeric text-secondary ml-1">${time}</span></div>`;
  }
  stream.appendChild(el);
  scrollChat();
}
function scrollChat() { requestAnimationFrame(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })); }

/* ============================================================
   SCREEN 6 — NOTIFICATIONS
   ============================================================ */
function renderNotifications() {
  return `
  <div class="flex flex-col w-full px-4 gap-3 pb-28 stagger">
    <div class="flex items-center justify-between pt-2">
      <span class="font-body-sm text-body-sm text-on-surface-variant">${state.notifUnread} unread updates</span>
      <button class="font-label-numeric text-label-numeric text-primary pressable hover:underline" onclick="markAllRead()">Mark all read</button>
    </div>
    ${NOTIFS.length ? NOTIFS.map(n => `
    <div class="bg-surface-container-lowest rounded-xl p-3.5 shadow-sm flex items-start gap-3 pressable cursor-pointer hover-lift ${n.unread ? 'ring-1 ring-primary/15' : 'opacity-75'}" onclick="openNotif(${n.id})">
      <div class="w-10 h-10 rounded-full ${n.color} flex items-center justify-center shrink-0">${icon(n.icon,'text-[20px]')}</div>
      <div class="flex flex-col min-w-0 flex-1">
        <div class="flex items-center gap-2">
          <span class="font-body-semibold text-body-semibold text-on-surface truncate">${n.title}</span>
          ${n.unread ? '<span class="unread-dot w-2 h-2 rounded-full bg-primary shrink-0"></span>' : ''}
        </div>
        <p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">${n.body}</p>
        <span class="font-label-numeric text-label-numeric text-outline mt-1">${n.time}</span>
      </div>
      ${icon('chevron_right','text-secondary shrink-0 mt-1')}
    </div>`).join('') : `
    <div class="bg-surface-container-lowest rounded-xl p-10 text-center shadow-sm">
      <span class="material-symbols-outlined text-[40px] text-outline">notifications_off</span>
      <p class="font-body-semibold text-body-semibold text-on-surface mt-2">All caught up!</p>
      <p class="font-body-sm text-body-sm text-on-surface-variant">No notifications right now</p>
    </div>`}
  </div>`;
}
function initNotifications() {}
window.markAllRead = () => {
  NOTIFS.forEach(n => n.unread = false);
  state.notifUnread = 0;
  renderHeader('notifications');
  rerenderCurrent('enter-fade');
  toast('All notifications marked as read', 'done_all', 'OK');
};
window.openNotif = id => {
  const n = NOTIFS.find(x => x.id === id);
  if (!n) return;
  if (n.unread) { n.unread = false; state.notifUnread = Math.max(0, state.notifUnread - 1); renderHeader('notifications'); }
  if (n.link) go(n.link);
  else rerenderCurrent('enter-fade');
};

/* ---------------- Login Gate (Email OTP) ---------------- */
function renderLogin() {
  $('#bottom-nav').style.display = 'none';
  $('#app-header').style.display = 'none';
  $('#main').innerHTML = `
  <div class="min-h-screen flex flex-col items-center justify-center px-6 bg-surface">
    <div class="w-full max-w-sm flex flex-col gap-5">
      <div class="text-center">
        <div class="text-5xl mb-2">🏘️</div>
        <h1 class="font-headline-lg text-headline-lg text-on-surface">Padosi Pro</h1>
        <p class="font-body-sm text-body-sm text-on-surface-variant mt-1">Login with Email OTP</p>
      </div>
      <div id="login-step1" class="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col gap-3">
        <input id="login-email" type="email" placeholder="aapka@gmail.com"
          class="w-full h-12 bg-surface-container-low rounded-xl px-4 text-on-surface font-body-regular focus:outline-none focus:ring-2 focus:ring-primary/30"/>
        <button id="send-otp" class="w-full h-12 rounded-full bg-primary text-on-primary font-body-semibold pressable">Send OTP</button>
      </div>
      <div id="login-step2" class="hidden bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col gap-3">
        <p class="font-body-sm text-body-sm text-on-surface-variant">OTP bhej diya → <b id="login-email-label"></b></p>
        <input id="login-otp" inputmode="numeric" maxlength="6" placeholder="6-digit OTP"
          class="w-full h-12 bg-surface-container-low rounded-xl px-4 text-on-surface text-center text-xl tracking-[0.4em] font-bold focus:outline-none focus:ring-2 focus:ring-primary/30"/>
        <button id="verify-otp" class="w-full h-12 rounded-full bg-primary text-on-primary font-body-semibold pressable">Verify & Login</button>
      </div>
      <p id="login-err" class="text-error font-body-sm text-center"></p>
    </div>
  </div>`;
  let email = '';
  const showOtpStep = () => {
    $('#login-step1').classList.add('hidden');
    $('#login-step2').classList.remove('hidden');
    $('#login-email-label').textContent = email;
    $('#login-otp').focus();
  };
  $('#send-otp').onclick = async () => {
    const btn = $('#send-otp');
    email = $('#login-email').value.trim().toLowerCase();
    $('#login-err').textContent = '';
    btn.disabled = true; btn.textContent = 'OTP bhej raha hoon…'; btn.style.opacity = '.7';
    try {
      const r = await API.requestOtp(email);
      showOtpStep();
      if (r.devOtp) $('#login-otp').value = r.devOtp; // sirf development me
      toast('OTP email bhej diya!', 'mail');
    } catch (e) {
      // cooldown ka matlab: OTP abhi-abhi ja chuka hai → wahi daalne do
      if (e.status === 429 && /cooldown/i.test(e.message)) { showOtpStep(); toast('OTP pehle hi bheja ja chuka hai, wahi daalo', 'mail'); }
      else $('#login-err').textContent = e.message;
    } finally { btn.disabled = false; btn.textContent = 'Send OTP'; btn.style.opacity = ''; }
  };
  $('#verify-otp').onclick = async () => {
    try {
      const r = await API.verifyOtp(email, $('#login-otp').value.trim());
      API.token = r.token;
      USER.name = r.user.name || 'Padosi';
      bootApp();
    } catch (e) { $('#login-err').textContent = e.message; }
  };
}

/* ---------------- Boot ---------------- */
/* ---------------- Push notifications — "sabke phone mein show ho" ---------------- */
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(base64);
  return Uint8Array.from([...raw].map(c => c.charCodeAt(0)));
}
async function setupPushNotifications() {
  try {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;
    const { publicKey, enabled } = await API.pushPublicKey();
    if (!enabled || !publicKey) return; // VAPID keys backend pe configure nahi hain abhi
    const reg = await navigator.serviceWorker.register('sw.js');
    if (Notification.permission === 'default') await Notification.requestPermission();
    if (Notification.permission !== 'granted') return;
    let sub = await reg.pushManager.getSubscription();
    if (!sub) sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: urlBase64ToUint8Array(publicKey) });
    await API.pushSubscribe(sub.toJSON());
  } catch (e) { console.warn('Push setup skip:', e.message); }
}

async function bootApp() {
  $('#app-header').style.display = '';
  try {
    const serverTasks = await API.fetchTasks();
    serverTasks.reverse().forEach(t => TASKS.unshift({
      id: t.id, serverId: t.id, category: t.category, price: t.price + (t.tip || 0),
      title: t.title, distance: '0.8 km away', time: '~20 mins',
      badges: [['Verified Escrow','bg-primary-fixed text-on-primary-fixed-variant','verified_user']],
      requester: t.users?.name || 'Padosi', rating: '5.0', reqSub: 'Live task • from database', reqImg: USER.avatar
    }));
  } catch (e) { console.warn('Backend offline, demo data use ho raha hai'); }
  setupPushNotifications();
  if (!location.hash) location.hash = '#/explore';
  route();
}

if (API.token) bootApp(); else renderLogin();
