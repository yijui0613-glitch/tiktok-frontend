const coinsData = [
    { amount: 30, usd: 0.42 },
    { amount: 350, usd: 4.95 },
    { amount: 700, usd: 9.90 },
    { amount: 7000, usd: 99.00 },
    { amount: 17500, usd: 247.50 },
    { amount: "Custom", usd: "Custom" }
];

const grid = document.getElementById("coinsGrid");

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

// 選擇固定金額
function selectItem(item) {
    selected = item;
    document.getElementById("customCoins").value = ""; // 清空 Custom 輸入
    updateDisplay(item.amount, item.usd);
}

// 更新畫面顯示（Selected…）
function updateDisplay(coins, usd) {
    document.getElementById("selectedText").innerText = `Selected: ${coins} Coins`;
    document.getElementById("selectedUSD").innerText = `US$${usd}`;
    document.getElementById("payBtn").disabled = false;
}

// 自動計算 custom
document.getElementById("customCoins").addEventListener("input", function () {
    let val = parseInt(this.value);

    if (!val || val <= 0) {
        selected = null;
        document.getElementById("selectedText").innerText = "Selected: 0 Coins";
        document.getElementById("selectedUSD").innerText = "US$0.00";
        document.getElementById("payBtn").disabled = true;
        return;
    }

    // TikTok 官方比例：700 Coins = 9.90 USD
    const usd = (val * (9.90 / 700)).toFixed(2);

    selected = { amount: val, usd: usd };

    updateDisplay(val, usd);
});

// Pay 按鈕顯示支付方式
document.getElementById("payBtn").addEventListener("click", () => {
    if (!selected) return;
    document.getElementById("payMethods").classList.remove("hidden");
});

// 關閉支付方式
document.getElementById("closeMethodsBtn").addEventListener("click", () => {
    document.getElementById("payMethods").classList.add("hidden");
});

// 支付流程
document.getElementById("confirmPay").addEventListener("click", () => {
    document.getElementById("payMethods").classList.add("hidden");
    document.getElementById("processing").classList.remove("hidden");

    setTimeout(() => {
        document.getElementById("processing").classList.add("hidden");
        document.getElementById("success").classList.remove("hidden");
        document.getElementById("coinsNum").innerText = selected.amount;
    }, 2000);
});

// 完成後返回
document.getElementById("successClose").addEventListener("click", () => {
    document.getElementById("success").classList.add("hidden");
});
