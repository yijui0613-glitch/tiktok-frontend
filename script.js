/* --- Coins Data --- */
const coinsData = [
    { amount: 30, usd: 0.42 },
    { amount: 350, usd: 4.95 },
    { amount: 700, usd: 9.90 },
    { amount: 7000, usd: 99.00 },
    { amount: 17500, usd: 247.50 },
    { amount: "Custom", usd: "Custom" }
];

const grid = document.getElementById("coinsGrid");

/* --- Render Cards --- */
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

let selected = null;

/* --- When clicking fixed coin options --- */
function selectItem(item) {
    selected = item;

    document.getElementById("selectedText").innerText =
        `Selected: ${item.amount} Coins`;

    document.getElementById("selectedUSD").innerText =
        `US$${item.usd}`;

    document.getElementById("payBtn").disabled = false;
}

/* ----------------------------- */
/*     Custom Coins Function     */
/* ----------------------------- */
const customInput = document.getElementById("customCoins");
const customSummaryCoins = document.getElementById("customCoinsCount");
const customSummaryUSD = document.getElementById("customCoinsUSD");

customInput.addEventListener("input", () => {
    const val = Number(customInput.value);

    if (isNaN(val) || val <= 0) {
        customSummaryCoins.innerText = "0 Coins";
        customSummaryUSD.innerText = "US$0.00";
        selected = null;
        document.getElementById("payBtn").disabled = true;
        return;
    }

    // TikTok 官方 USD = Coins × 0.000014
    const usdRate = 0.000014;
    const usd = (val * usdRate).toFixed(2);

    customSummaryCoins.innerText = `${val} Coins`;
    customSummaryUSD.innerText = `US$${usd}`;

    selected = {
        amount: val,
        usd: usd
    };

    document.getElementById("selectedText").innerText =
        `Selected: ${val} Coins`;

    document.getElementById("selectedUSD").innerText =
        `US$${usd}`;

    document.getElementById("payBtn").disabled = false;
});

/* ----------------------------- */
/*     Payment Modal Logic       */
/* ----------------------------- */

const payBtn = document.getElementById("payBtn");
const paymentModal = document.getElementById("paymentModal");
const cancelPay = document.getElementById("cancelPay");
const confirmPay = document.getElementById("confirmPay");

payBtn.addEventListener("click", () => {
    paymentModal.classList.add("active");
});

cancelPay.addEventListener("click", () => {
    paymentModal.classList.remove("active");
});

/* ----------------------------- */
/*        Success Modal          */
/* ----------------------------- */

const successModal = document.getElementById("successModal");
const coinsResult = document.getElementById("coins");
const goBack = document.getElementById("goBack");

confirmPay.addEventListener("click", () => {
    paymentModal.classList.remove("active");

    coinsResult.innerText = `Recharged ${selected.amount} Coins`;

    successModal.classList.add("active");
});

goBack.addEventListener("click", () => {
    successModal.classList.remove("active");
});
