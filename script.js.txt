document.addEventListener('DOMContentLoaded', ()=>{
  const COIN_OPTIONS = [
    {coins:30, usd: (30*0.014142857).toFixed(2)},
    {coins:350, usd: (350*0.014142857).toFixed(2)},
    {coins:700, usd: (700*0.014142857).toFixed(2)},
    {coins:7000, usd: (7000*0.014142857).toFixed(2)},
    {coins:17500, usd: (17500*0.014142857).toFixed(2)},
    {coins:0, usd: "Custom"}
  ];

  const grid = document.getElementById('coinsGrid');
  const customInput = document.getElementById('customCoins');
  const customCount = document.getElementById('customCount');
  const customUSD = document.getElementById('customUSD');
  const selectedText = document.getElementById('selectedText');
  const selectedUSD = document.getElementById('selectedUSD');
  const payBtn = document.getElementById('payBtn');
  const payMethods = document.getElementById('payMethods');
  const confirmPay = document.getElementById('confirmPay');
  const closeMethods = document.getElementById('closeMethods');
  const processing = document.getElementById('processing');
  const success = document.getElementById('success');
  const successClose = document.getElementById('successClose');

  let selectedCoins = 0;
  let selectedMethod = null;
  const RATE = 0.014142857;

  function renderTiles(){
    COIN_OPTIONS.forEach(opt => {
      const card = document.createElement('div');
      card.className = 'card pack';
      card.dataset.coins = opt.coins;
      card.dataset.price = opt.usd;
      card.innerHTML = `< img src="images/coin.svg" class="icon"><div class="num">${opt.coins===0?'Custom':opt.coins}</div><div class="price">${opt.coins?('US$'+opt.usd):'Custom'}</div>`;
      card.addEventListener('click', ()=>{
        if(opt.coins===0){ customInput.focus(); selectCoins(0); clearSelection(); card.classList.add('selected'); return; }
        clearSelection(); card.classList.add('selected');
        selectCoins(opt.coins);
      });
      grid.appendChild(card);
    });
  }

  function clearSelection(){
    document.querySelectorAll('.card.selected').forEach(c=>c.classList.remove('selected'));
  }

  function selectCoins(n){
    selectedCoins = n;
    const usd = n * RATE;
    selectedText.textContent = `Selected: ${n} Coins`;
    selectedUSD.textContent = `US$${usd.toFixed(2)}`;
    customCount.textContent = `${n} Coins`;
    customUSD.textContent = `US$${usd.toFixed(2)}`;
    payBtn.disabled = n===0;
  }

  customInput.addEventListener('input', e=>{
    const v = parseInt(e.target.value||0,10) || 0;
    clearSelection();
    selectCoins(v);
  });

  payBtn.addEventListener('click', ()=>{
    if(selectedCoins===0){ alert('Please select or enter a coin amount.'); return; }
    payMethods.classList.remove('hidden');
    payMethods.setAttribute('aria-hidden','false');
  });

  document.querySelectorAll('.method').forEach(m=>{
    m.addEventListener('click', ()=>{
      document.querySelectorAll('.method').forEach(x=>x.classList.remove('selected'));
      m.classList.add('selected');
      selectedMethod = m.dataset.method;
    });
  });

  closeMethods.addEventListener('click', ()=>{
    payMethods.classList.add('hidden');
    payMethods.setAttribute('aria-hidden','true');
  });

  confirmPay.addEventListener('click', ()=>{
    if(!selectedMethod){ alert('Please choose a payment method'); return; }
    payMethods.classList.add('hidden');
    processing.classList.remove('hidden');
    processing.setAttribute('aria-hidden','false');
    setTimeout(()=>{
      processing.classList.add('hidden');
      processing.setAttribute('aria-hidden','true');
      success.classList.remove('hidden');
      success.setAttribute('aria-hidden','false');
      document.getElementById('sCoins').textContent = selectedCoins;
      triggerSuccessAnimate();
    }, 1800);
  });

  successClose.addEventListener('click', ()=>{
    success.classList.add('hidden');
    success.setAttribute('aria-hidden','true');
    clearSelection();
    selectCoins(0);
    selectedMethod = null;
    document.querySelectorAll('.method').forEach(x=>x.classList.remove('selected'));
  });

  function triggerSuccessAnimate(){
    const svg = document.getElementById('success-svg');
    if(!svg) return;
    svg.classList.remove('animate');
    void svg.offsetWidth;
    svg.classList.add('animate');
  }

  document.getElementById('searchBtn').addEventListener('click', ()=>{
    const id = document.getElementById('tiktokId').value.trim();
    if(!id){ alert('Please enter a TikTok ID'); return; }
    alert('Search simulated for '+id);
  });

  renderTiles();
  selectCoins(0);
});