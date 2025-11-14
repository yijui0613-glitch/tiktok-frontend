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

function selectItem(item) {
    selected = item;
    document.getElementById("selectedText").innerText = `Selected: ${item.amount} Coins`;
    document.getElementById("selectedUSD").innerText = `US$${item.usd}`;
    document.getElementById("payBtn").disabled = false;
}
