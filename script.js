// =====================
//  COINS DATA
// =====================
const coinsData = [
    { amount: 30, usd: 0.42 },
    { amount: 350, usd: 4.95 },
    { amount: 700, usd: 9.9 },
    { amount: 7000, usd: 99 },
    { amount: 17500, usd: 247.5 },
    { amount: "Custom", usd: "Custom" }
];

const grid = document.getElementById("coinsGrid");
let selected = null;

// =====================
//  RENDER CARDS
// =====================
coinsData.forEach(item => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
        <img src="images/coin.png" class="icon">
        <div class="amount">${item.amount}</div>
        <div class="usd">US$${item.usd}</div>
    `;
    div.addEventListener("click", () => selectItem(item));
    grid.appendChild(div);
});

// =====================
//  SELECT ITEM
// =====================
function selectItem(item) {
    selected = item;
    document.getElementById("selectedText").innerText = `Selected: ${item.amount} Coins`;
    document.getElementById("selectedUSD").innerText = `US$${item.usd}`;
    document.getElementById("payBtn").disabled = false;
}

// =====================
//  CUSTOM INPUT
// =====================
const customInput = document.getElementById("customCoins");
customInput.addEventListener("input", () => {
    const val = Number(customInput.value);

    if (!val || val <= 0) {
        document.getElementById("customCount").innerText = "0 Coins";
        document.getElementById("customUSD").innerText = "US$0.00";
        return;
    }

    const usd = (val * 0.01417).toFixed(2); // TikTok 美區匯率

    selected = { amount: val, usd: usd };

    document.getElementById("customCount").innerText = `${val} Coins`;
    document.getElementById("customUSD").innerText = `US$${usd}`;
    document.getElementById("selectedText").innerText = `Selected: ${val} Coins`;
    document.getElementById("selectedUSD").innerText = `US$${usd}`;
    document.getElementById("payBtn").disabled = false;
});

// =====================
//  MODALS
// =====================
const payBtn = document.getElementById("payBtn");
const payMethods = document.getElementById("payMethods");
const processing = document.getElementById("processing");
const success = document.getElementById("success");

payBtn.addEventListener("click", () => {
    if (!selected) return;
    payMethods.classList.remove("hidden");
});

// =====================
// CLOSE PAYMENT METHOD
// =====================
document.getElementById("closeMethods").addEventListener("click", () => {
    payMethods.classList.add("hidden");
});

// =====================
// CONFIRM PAYMENT
// =====================
document.getElementById("confirmPay").addEventListener("click", () => {

    payMethods.classList.add("hidden");
    processing.classList.remove("hidden");

    // 模擬處理中 1.5 秒
    setTimeout(() => {
        processing.classList.add("hidden");

        document.getElementById("successText").innerText =
            `Recharged ${selected.amount} Coins`;

        success.classList.remove("hidden");
    }, 1500);
});

// =====================
// SUCCESS CLOSE
// =====================
document.getElementById("successClose").addEventListener("click", () => {
    success.classList.add("hidden");
});
