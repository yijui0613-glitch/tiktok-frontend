// Basic interactivity for the mock frontend
document.addEventListener('DOMContentLoaded', ()=>{
  const packs = Array.from(document.querySelectorAll('.card.pack'));
  const customInput = document.getElementById('customCoins');
  const previewCoins = document.getElementById('previewCoins');
  const previewPrice = document.getElementById('previewPrice');
  const selectedCoinsEl = document.getElementById('selectedCoins');
  const selectedPriceEl = document.getElementById('selectedPrice');
  const payBtn = document.getElementById('payBtn');
  const modal = document.getElementById('modal');
  const closeModal = document.getElementById('closeModal');
  const modalIcon = document.getElementById('modalIcon');

  let selected = { coins:0, price:0 };

  function formatPrice(v){ return 'US$' + Number(v).toFixed(2); }
  function setSelected(coins, price){
    selected.coins = coins;
    selected.price = price;
    selectedCoinsEl.textContent = `${coins.toLocaleString()} Coins`;
    selectedPriceEl.textContent = formatPrice(price);
    payBtn.disabled = coins === 0;
  }

  function clearSelections(){
    packs.forEach(p=>p.classList.remove('selected'));
  }

  packs.forEach(p => {
    p.addEventListener('click', ()=>{
      clearSelections();
      p.classList.add('selected');
      const coins = Number(p.dataset.coins) || 0;
      const price = Number(p.dataset.price) || 0;
      // if custom card clicked -> focus custom input
      if (p.classList.contains('custom')){
        customInput.focus();
        customInput.select();
        setSelected(0,0);
        return;
      }
      setSelected(coins, price);
      previewCoins.textContent = `${coins.toLocaleString()} Coins`;
      previewPrice.textContent = formatPrice(price);
    });
  });

  customInput.addEventListener('input', ()=>{
    clearSelections();
    const v = parseInt(customInput.value.replace(/[^0-9]/g,'')) || 0;
    // price formula: assume 1000 coins = $1.4 (approx) -> use $ / coin = 0.0014
    const price = +(v * 0.0014).toFixed(2);
    previewCoins.textContent = `${v.toLocaleString()} Coins`;
    previewPrice.textContent = formatPrice(price);
    setSelected(v, price);
  });

  payBtn.addEventListener('click', ()=>{
    // simple validation
    if (selected.coins <= 0) return;
    // show modal and animate icon
    modal.classList.remove('hidden');
    // play a quick icon "pop" by toggling a class (CSS handles no-animation, so just swap src for a little effect)
    modalIcon.style.transform = 'scale(0.9)';
    setTimeout(()=> modalIcon.style.transform = 'scale(1)', 120);
    // in a real app you would call payment APIs here
  });

  closeModal.addEventListener('click', ()=>{
    modal.classList.add('hidden');
  });

  // close modal on outside click
  modal.addEventListener('click', (e)=>{
    if (e.target === modal) modal.classList.add('hidden');
  });

  // small search mock
  document.getElementById('searchBtn').addEventListener('click', ()=>{
    const id = document.getElementById('tiktokId').value.trim();
    if (!id){ alert('Enter a TikTok ID to search'); return; }
    // simple fake "found" animation: highlight top pack then focus
    packs[0].classList.add('selected');
    setTimeout(()=> packs[0].classList.remove('selected'), 800);
    alert('Search simulated: found user "'+id+'" (mock)');
  });

  // keyboard shortcuts: Enter on ID input triggers search
  document.getElementById('tiktokId').addEventListener('keydown', (e)=>{ if (e.key === 'Enter') document.getElementById('searchBtn').click(); });

});