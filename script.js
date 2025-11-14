/* --- Coins Data (1 coin = $0.013) --- */
const COIN_USD_RATE = 0.013; // 70 coins -> $0.91 => 0.91/70 = 0.013

const coinsData = [
    { amount: 30, usd: (30 * COIN_USD_RATE).toFixed(2) },      // 0.39
    { amount: 350, usd: (350 * COIN_USD_RATE).toFixed(2) },    // 4.55
    { amount: 700, usd: (700 * COIN_USD_RATE).toFixed(2) },    // 9.10
    { amount: 7000, usd: (7000 * COIN_USD_RATE).toFixed(2) },  // 91.00
    { amount: 17500, usd: (17500 * COIN_USD_RATE).toFixed(2) },// 227.50
    { amount: "Custom", usd: "Custom" }
];

const grid = document.getElementById("coinsGrid");

/* --- Render Cards --- */
grid.innerHTML = ""; // ensure empty
coinsData.forEach(item => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
        <img src="images/coin.png" class="icon" alt="coin">
        <div class="amount">${item.amount}</div>
        <div class="usd">US$${item.usd}</div>
    `;
    // if custom card clicked, focus custom input
    div.addEventListener("click", () => {
        if (item.amount === "Custom") {
            document.getElementById("customCoins").focus();
        } else {
            selectItem(item);
        }
    });
    grid.appendChild(div);
});

let selected = null;

/* --- Select fixed options --- */
function selectItem(item) {
    selected = item;
    // ensure usd shows 2 decimal places (if not "Custom")
    const usdText = item.usd === "Custom" ? "US$0.00" : `US$${Number(item.usd).toFixed(2)}`;

    document.getElementById("selectedText").innerText = `Selected: ${item.amount} Coins`;
    document.getElementById("selectedUSD").innerText = usdText;
    document.getElementById("payBtn").disabled = false;
}

/* ----------------------------- */
/*     Custom Coins Function     */
/* ----------------------------- */
const customInput = document.getElementById("customCoins");
const customSummaryCoins = document.getElementById("customCoinsCount");
const customSummaryUSD = document.getElementById("customCoinsUSD");
const payBtn = document.getElementById("payBtn");

customInput.addEventListener("input", () => {
    const val = Number(customInput.value);

    if (!val || val <= 0) {
        customSummaryCoins.innerText = "0 Coins";
        customSummaryUSD.innerText = "US$0.00";
        selected = null;
        payBtn.disabled = true;
        document.getElementById("selectedText").innerText = `Selected: 0 Coins`;
        document.getElementById("selectedUSD").innerText = `US$0.00`;
        return;
    }

    const usd = (val * COIN_USD_RATE);
    const usdFormatted = usd.toFixed(2);

    customSummaryCoins.innerText = `${val} Coins`;
    customSummaryUSD.innerText = `US$${usdFormatted}`;

    selected = { amount: val, usd: usdFormatted };

    document.getElementById("selectedText").innerText = `Selected: ${val} Coins`;
    document.getElementById("selectedUSD").innerText = `US$${usdFormatted}`;
    payBtn.disabled = false;
});

/* ----------------------------- */
/*     Payment Modal Logic       */
/* ----------------------------- */
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
/*        Success / Loading      */
/* ----------------------------- */
const successModal = document.getElementById("successModal");
const coinsResult = document.getElementById("coins");
const goBack = document.getElementById("goBack");
const loadingEl = document.getElementById("loading");

// confirmPay action: show loading (use existing #loading), then success
confirmPay.addEventListener("click", () => {
    // ensure selected exists
    if (!selected) return;

    // close payment modal
    paymentModal.classList.remove("active");

    // show loading
    if (loadingEl) {
        loadingEl.classList.remove("hidden");
    } else {
        // fallback spinner if missing
        const tmp = document.createElement("div");
        tmp.id = "loading-fallback";
        tmp.innerHTML = `<div style="position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.45);z-index:9999;">
            <div style="color:white;padding:20px;border-radius:10px;background:rgba(0,0,0,0.6);">Processing…</div>
        </div>`;
        document.body.appendChild(tmp);
    }

    // simulate processing time then show success
    setTimeout(() => {
        if (loadingEl) loadingEl.classList.add("hidden");
        const fallback = document.getElementById("loading-fallback");
        if (fallback) fallback.remove();

        // update success text
        coinsResult.innerText = `Recharged ${selected.amount} Coins`;
        document.getElementById("successText").innerText = `Payment completed`;
        successModal.classList.add("active");
    }, 1500);
});

goBack.addEventListener("click", () => {
    successModal.classList.remove("active");
    // reset selection if desired (optional)
    // document.getElementById("selectedText").innerText = `Selected: 0 Coins`;
    // document.getElementById("selectedUSD").innerText = `US$0.00`;
    // payBtn.disabled = true;
});
