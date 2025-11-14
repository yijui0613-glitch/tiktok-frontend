// =============================
//  TikTok Coins Full Frontend
// =============================

// Coin data
const coinsData = [
    { amount: 30, usd: 0.42 },
    { amount: 350, usd: 4.95 },
    { amount: 700, usd: 9.90 },
    { amount: 7000, usd: 99.00 },
    { amount: 17500, usd: 247.50 },
    { amount: "Custom", usd: 0 }
];

let selectedCoins = 0;
let selectedUSD = 0;

// Generate coin cards
const grid = document.getElementById("coinsGrid");
coinsData.forEach(item => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
        <img src="images/coin.png" class="icon">
        <div class="amount">${item.amount}</div>
        <div class="usd">US$${item.usd}</div>
    `;

    div.addEventListener("click", () => selectCoin(item));
    grid.appendChild(div);
});

// Handle coin selection
function selectCoin(item) {
    // Save selection
    selectedCoins = item.amount === "Custom" ? 0 : item.amount;
    selectedUSD = item.usd === "Custom" ? 0 : item.usd;

    document.getElementById("selectedText").innerText =
        `Selected: ${selectedCoins} Coins`;
    document.getElementById("selectedUSD").innerText =
        `US$${selectedUSD}`;

    document.getElementById("payBtn").disabled =
        (selectedCoins === 0 && selectedUSD === 0) ? true : false;
}

// =============================
//  Pay Button → Payment Methods
// =============================

const payBtn = document.getElementById("payBtn");
const payMethods = document.getElementById("payMethods");
const closeMethods = document.getElementById("closeMethods");
const confirmPay = document.getElementById("confirmPay");

payBtn.addEventListener("click", () => {
    payMethods.classList.remove("hidden");
});

closeMethods.addEventListener("click", () => {
    payMethods.classList.add("hidden");
});

// =============================
//  Confirm Pay → Processing Animation
// =============================

const processingBox = document.getElementById("processing");
const successBox = document.getElementById("success");
const successText = document.getElementById("successText");
const successClose = document.getElementById("successClose");

confirmPay.addEventListener("click", () => {
    payMethods.classList.add("hidden");
    processingBox.classList.remove("hidden");

    setTimeout(() => {
        processingBox.classList.add("hidden");

        successText.innerHTML = `Recharged <span id="coins">${selectedCoins}</span> Coins`;
        successBox.classList.remove("hidden");
    }, 2000);
});

// Close success modal
successClose.addEventListener("click", () => {
    successBox.classList.add("hidden");
});
