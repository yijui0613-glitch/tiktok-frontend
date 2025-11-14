
const coinsList = [
  {coins:30, price:0.42},
  {coins:350, price:4.95},
  {coins:700, price:9.90},
  {coins:7000, price:99.00},
  {coins:17500, price:247.50},
  {coins:"custom", price:"Custom"}
];

const grid = document.getElementById('coinsGrid');
const selectedCount = document.getElementById('selectedCount');
const selectedAmount = document.getElementById('selectedAmount');
const customInput = document.getElementById('customCoins');

let selected = 0;
let price = 0;

function render(){
  grid.innerHTML = '';
  coinsList.forEach((c, idx) => {
    const card = document.createElement('div');
    card.className = 'coin-card';
    card.dataset.idx = idx;
    card.innerHTML = `<img src="images/coin.png" alt="coin"><div class="coin-info"><div class="num">${c.coins}</div><div class="price">${typeof c.price === 'number' ? 'US$'+c.price.toFixed(2) : c.price}</div></div>`;
    card.addEventListener('click', ()=> {
      if(c.coins === 'custom'){ customInput.focus(); selectCustom(); return; }
      selected = c.coins;
      price = (typeof c.price === 'number') ? c.price : 0;
      updateSummary();
    });
    grid.appendChild(card);
  });
}
function updateSummary(){
  selectedCount.innerText = (selected || 0) + ' Coins';
  selectedAmount.innerText = 'US$' + (price || 0).toFixed(2);
}
function selectCustom(){
  const v = parseInt(customInput.value || '0') || 0;
  selected = v;
  price = v * 0.01;
  updateSummary();
}
customInput.addEventListener('input', selectCustom);

document.getElementById('payBtn').addEventListener('click', ()=>{
  if((selected||0) <= 0){ alert('Please select coins or enter a custom amount.'); return; }
  document.getElementById('overlay').hidden = false;
});

document.getElementById('closeModal').addEventListener('click', ()=> {
  document.getElementById('overlay').hidden = true;
});

document.getElementById('startPay').addEventListener('click', ()=> {
  document.getElementById('overlay').hidden = true;
  document.getElementById('loading').hidden = false;
  setTimeout(()=> {
    document.getElementById('loading').hidden = true;
    document.getElementById('success').hidden = false;
  }, 1500);
});

document.getElementById('goBack').addEventListener('click', ()=> {
  document.getElementById('success').hidden = true;
});

document.getElementById('searchBtn').addEventListener('click', ()=> {
  alert('Search is simulated in this demo. This is a frontend mock.');
});

render();
