
const COIN_OPTIONS = [
  {coins:30, label:"30", usd: (30*0.014142857).toFixed(2)},
  {coins:350, label:"350", usd: (350*0.014142857).toFixed(2)},
  {coins:700, label:"700", usd: (700*0.014142857).toFixed(2)},
  {coins:7000, label:"7,000", usd: (7000*0.014142857).toFixed(2)},
  {coins:17500, label:"17,500", usd: (17500*0.014142857).toFixed(2)},
  {coins:0, label:"Custom", usd: "Custom"}
];

const coinsGrid = document.getElementById('coinsGrid');
const customInput = document.getElementById('customCoins');
const coinCountEl = document.getElementById('coinCount');
const usdAmountEl = document.getElementById('usdAmount');
const selectedText = document.getElementById('selectedText');
const selectedUSD = document.getElementById('selectedUSD');
const payBtn = document.getElementById('payBtn');
const overlay = document.getElementById('overlay');
const processing = document.getElementById('processing');
const success = document.getElementById('success');
const doPay = document.getElementById('doPay');
const closeOverlay = document.getElementById('closeOverlay');
const successClose = document.getElementById('successClose');
const sCoins = document.getElementById('sCoins');

let selectedCoins = 0;
const EXCHANGE_RATE = 0.014142857; // USD per coin

function renderTiles(){
  COIN_OPTIONS.forEach(opt=>{
    const tile = document.createElement('div');
    tile.className = 'coin-card';
    tile.dataset.coins = opt.coins;
    tile.innerHTML = `
      <img src="images/coin.png" alt="coin">
      <div class="coin-info">
        <div class="coin-value">${opt.label}</div>
        <div class="coin-usd">${opt.coins ? 'US$' + opt.usd : 'Custom'}</div>
      </div>
    `;
    tile.addEventListener('click', ()=> {
      if(opt.coins === 0){
        customInput.focus(); selectCoins(0); highlightTile(tile); return;
      }
      selectCoins(opt.coins);
      highlightTile(tile);
    });
    coinsGrid.appendChild(tile);
  });
}

function highlightTile(tile){
  document.querySelectorAll('.coin-card').forEach(t=>t.style.outline='none');
  tile.style.outline = '3px solid rgba(255,0,80,0.08)';
}

function selectCoins(n){
  selectedCoins = n;
  const usd = (n * EXCHANGE_RATE);
  coinCountEl.textContent = `${n} Coins`;
  usdAmountEl.textContent = `US$${usd.toFixed(2)}`;
  selectedText.textContent = `Selected: ${n} Coins`;
  selectedUSD.textContent = `US$${usd.toFixed(2)}`;
  if(n > 0) customInput.value = n;
}

customInput.addEventListener('input', (e)=>{
  const v = parseInt(e.target.value || 0, 10);
  if(isNaN(v) || v < 0) return;
  selectCoins(v);
  document.querySelectorAll('.coin-card').forEach(t=>t.style.outline='none');
});

payBtn.addEventListener('click', ()=>{
  if(selectedCoins <= 0){
    alert('Please select or enter a coin amount.');
    return;
  }
  overlay.classList.remove('hidden');
  overlay.setAttribute('aria-hidden','false');
});

closeOverlay.addEventListener('click', closeAll);

doPay.addEventListener('click', ()=>{
  overlay.classList.add('hidden');
  processing.classList.remove('hidden');
  processing.setAttribute('aria-hidden','false');

  setTimeout(()=>{
    processing.classList.add('hidden');
    success.classList.remove('hidden');
    success.setAttribute('aria-hidden','false');
    document.getElementById('sCoins').textContent = selectedCoins;
    triggerSuccessAnimation();
  }, 1500);
});

successClose.addEventListener('click', ()=> {
  closeAll();
  selectCoins(0);
  document.querySelectorAll('.coin-card').forEach(t=>t.style.outline='none');
});

document.getElementById('searchBtn').addEventListener('click', ()=>{
  const id = document.getElementById('tiktokId').value.trim();
  if(!id) return alert('Please enter an ID to search.');
  alert(`Search simulated for ${id}. This is a frontend demo only.`);
});

function closeAll(){
  overlay.classList.add('hidden');
  processing.classList.add('hidden');
  success.classList.add('hidden');
  overlay.setAttribute('aria-hidden','true');
  processing.setAttribute('aria-hidden','true');
  success.setAttribute('aria-hidden','true');
}

// success svg animation
function triggerSuccessAnimation(){
  const svg = document.getElementById('success-svg');
  if(!svg) return;
  svg.classList.remove('animate');
  void svg.offsetWidth;
  svg.classList.add('animate');
}

// init
renderTiles();
selectCoins(0);
