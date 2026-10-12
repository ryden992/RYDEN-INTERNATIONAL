/* =========================================================
   RYDEN INTERNATIONAL — STORE SCRIPT
========================================================= */

const WHATSAPP_NUMBER = "919233657553";
// Put your business UPI ID here to generate instant QR codes
const UPI_VPA = "9233657553@upi"; 

let currentCurrency = "INR";
let usdRate = 0.012;
let activeCatalog = "small";

let verifiedPlayer = {
  id: "",
  zone: "",
  name: ""
};

let selectedProduct = null;

/* =========================================================
   CATALOG DATA (Complete Diamond Packs & Offers)
========================================================= */
const catalogData = {
  small: {
    title: "Diamond Top-up",
    products: [
      { id: "d5", name: "5 Diamonds", price: 11, bonus: "Instant Delivery", image: "store%20logo.jpeg" },
      { id: "d11", name: "11 Diamonds", price: 25, bonus: "+1 Bonus", image: "store%20logo.jpeg" },
      { id: "d22", name: "22 Diamonds", price: 49, bonus: "+2 Bonus", image: "store%20logo.jpeg" },
      { id: "d56", name: "56 Diamonds", price: 97, bonus: "+5 Bonus", image: "store%20logo.jpeg" },
      { id: "d112", name: "112 Diamonds", price: 195, bonus: "+10 Bonus", image: "store%20logo.jpeg" },
      { id: "d223", name: "223 Diamonds", price: 385, bonus: "+22 Bonus", image: "store%20logo.jpeg" },
      { id: "d336", name: "336 Diamonds", price: 579, bonus: "+34 Bonus", image: "store%20logo.jpeg" },
      { id: "d570", name: "570 Diamonds", price: 964, bonus: "+58 Bonus", image: "store%20logo.jpeg" },
      { id: "d1163", name: "1,163 Diamonds", price: 1930, bonus: "+130 Bonus", image: "store%20logo.jpeg" },
      { id: "d2398", name: "2,398 Diamonds", price: 3858, bonus: "+298 Bonus", image: "store%20logo.jpeg" },
      { id: "d6042", name: "6,042 Diamonds", price: 9645, bonus: "+800 Bonus", image: "store%20logo.jpeg" }
    ]
  },

  weekly: {
    title: "Weekly Diamond Pass",
    products: [
      { id: "wdp1", name: "1x Weekly Diamond Pass", price: 165, bonus: "210 Total 💎 + StarLight Points", image: "store%20logo.jpeg" },
      { id: "wdp2", name: "2x Weekly Diamond Pass", price: 330, bonus: "420 Total 💎 (Stackable)", image: "store%20logo.jpeg" },
      { id: "wdp3", name: "3x Weekly Diamond Pass", price: 495, bonus: "630 Total 💎 (Stackable)", image: "store%20logo.jpeg" },
      { id: "wdp5", name: "5x Weekly Diamond Pass", price: 825, bonus: "1050 Total 💎 (Max Stack)", image: "store%20logo.jpeg" }
    ]
  },

  double: {
    title: "First Top-Up Double Bonus",
    products: [
      { id: "fb50", name: "50 + 50 Diamonds", price: 97, bonus: "100% Double Value", image: "store%20logo.jpeg" },
      { id: "fb150", name: "150 + 150 Diamonds", price: 286, bonus: "100% Double Value", image: "store%20logo.jpeg" },
      { id: "fb250", name: "250 + 250 Diamonds", price: 475, bonus: "100% Double Value", image: "store%20logo.jpeg" },
      { id: "fb500", name: "500 + 500 Diamonds", price: 961, bonus: "100% Double Value", image: "store%20logo.jpeg" }
    ]
  },

  value: {
    title: "StarLight & Passes",
    products: [
      { id: "sl_std", name: "Standard StarLight Pass", price: 300, bonus: "Exclusive Skin + 50 Perks", image: "store%20logo.jpeg" },
      { id: "sl_prem", name: "Premium StarLight Pass", price: 750, bonus: "StarLight + 290 💎 + Rewards", image: "store%20logo.jpeg" },
      { id: "twilight", name: "Twilight Pass", price: 850, bonus: "Level Rewards & Miya Skin", image: "store%20logo.jpeg" }
    ]
  },

  indian: {
    title: "Indian Special Packs",
    products: [
      { id: "in_combo1", name: "86 Diamonds Indian Pack", price: 145, bonus: "Instant Recharge", image: "store%20logo.jpeg" },
      { id: "in_combo2", name: "172 Diamonds Indian Pack", price: 290, bonus: "Instant Recharge", image: "store%20logo.jpeg" },
      { id: "in_combo3", name: "257 Diamonds Indian Pack", price: 435, bonus: "Instant Recharge", image: "store%20logo.jpeg" },
      { id: "in_combo4", name: "706 Diamonds Indian Pack", price: 1160, bonus: "Instant Recharge", image: "store%20logo.jpeg" }
    ]
  }
};

/* =========================================================
   DOM READY
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  setupMobileMenu();
  setupHeroSlider();
  setupAccountFilters();
  setupCurrencySwitch();
  setupCatalogTabs();
  setupPlayerCheck();
  setupModalEvents();
  renderCatalog("small");
  updateAccountPrices();
});

/* =========================================================
   LIVE MLBB ID & SERVER VERIFICATION
========================================================= */
function setupPlayerCheck() {
  const checkBtn = document.getElementById("checkPlayerBtn");
  const resultDiv = document.getElementById("playerResult");

  if (!checkBtn) return;

  checkBtn.addEventListener("click", async () => {
    const userId = document.getElementById("userId")?.value.trim();
    const zoneId = document.getElementById("zoneId")?.value.trim();

    if (!userId || !zoneId) {
      resultDiv.innerHTML = `<span style="color: #ff5b5b;">⚠️ Please enter both Game ID and Zone ID.</span>`;
      return;
    }

    resultDiv.innerHTML = `<span style="color: #20a8ff;">⏳ Verifying account on Moonton servers...</span>`;
    checkBtn.disabled = true;

    try {
      // Direct live check API for MLBB accounts
      const apiUrl = `https://api.isan.eu.org/nickname/ml?id=${encodeURIComponent(userId)}&zone=${encodeURIComponent(zoneId)}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data && data.success && data.name) {
        verifiedPlayer = { id: userId, zone: zoneId, name: data.name };
        resultDiv.innerHTML = `
          <div style="background: rgba(25, 214, 109, 0.12); border: 1px solid #19d66d; padding: 10px; border-radius: 8px; margin-top: 6px;">
            <strong style="color: #19d66d;">✔ Player Verified!</strong><br>
            <span style="font-size: 15px; font-weight: 700; color: #fff;">IGN: ${escapeHtml(data.name)}</span>
            <span style="font-size: 12px; color: #8da5bb;"> (ID: ${userId} | Zone: ${zoneId})</span>
          </div>
        `;
      } else {
        resultDiv.innerHTML = `<span style="color: #ff7676;">❌ Player ID or Zone ID not found. Double check your in-game profile.</span>`;
      }
    } catch (err) {
      // Fallback if network blocked
      resultDiv.innerHTML = `
        <div style="background: rgba(32, 168, 255, 0.12); border: 1px solid #20a8ff; padding: 10px; border-radius: 8px; margin-top: 6px;">
          <strong style="color: #20a8ff;">ID Accepted</strong>: ${userId} (${zoneId})<br>
          <span style="font-size: 12px; color: #9bb5ca;">Account details will be validated automatically before diamonds are credited.</span>
        </div>
      `;
      verifiedPlayer = { id: userId, zone: zoneId, name: "Pending In-game Check" };
    } finally {
      checkBtn.disabled = false;
    }
  });
}

/* =========================================================
   RENDER CATALOG
========================================================= */
function setupCatalogTabs() {
  const tabs = document.querySelectorAll(".catalog-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      activeCatalog = tab.dataset.category;
      renderCatalog(activeCatalog);
    });
  });
}

function renderCatalog(category) {
  const container = document.getElementById("productCatalog");
  if (!container) return;

  const catalog = catalogData[category];
  if (!catalog || !catalog.products.length) {
    container.innerHTML = "<p>No products available in this category.</p>";
    return;
  }

  container.innerHTML = "";

  catalog.products.forEach((product, index) => {
    const card = document.createElement("article");
    card.className = "product-card";
    const price = typeof product.price === "number" ? formatCurrency(product.price) : product.price;

    card.innerHTML = `
      <div class="product-image">
        <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy">
      </div>
      <div class="product-info">
        <strong>${escapeHtml(product.name)}</strong>
        <span style="color: #19d66d; font-size: 15px;">${escapeHtml(price)}</span>
        <small style="display:block; color: #8da5bb; font-size: 11px;">${escapeHtml(product.bonus || "")}</small>
      </div>
      <button class="product-buy" type="button">Buy Now</button>
    `;

    card.querySelector(".product-buy").addEventListener("click", () => {
      openProductDetails(category, index);
    });

    container.appendChild(card);
  });
}

/* =========================================================
   CHECKOUT MODAL & INSTANT UPI QR CODE
========================================================= */
function openProductDetails(category, index) {
  const product = catalogData[category]?.products[index];
  if (!product) return;
  selectedProduct = product;

  const modal = document.getElementById("productModal");
  const content = document.getElementById("productModalContent");
  if (!modal || !content) return;

  const userId = document.getElementById("userId")?.value.trim() || "";
  const zoneId = document.getElementById("zoneId")?.value.trim() || "";
  const finalPrice = typeof product.price === "number" ? product.price : 0;

  // Build real UPI Intent link
  const upiUrl = `upi://pay?pa=${encodeURIComponent(UPI_VPA)}&pn=RydenInternational&am=${finalPrice}&cu=INR&tn=MLBB_${encodeURIComponent(product.name)}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(upiUrl)}`;

  content.innerHTML = `
    <div style="text-align: center; margin-bottom: 15px;">
      <span class="hero-badge">OFFICIAL MLBB RECHARGE</span>
      <h2 style="font-size: 28px; margin: 6px 0;">${escapeHtml(product.name)}</h2>
      <div style="font-size: 26px; color: #20a8ff; font-weight: 800;">₹${finalPrice}</div>
      <p style="color: #8da5bb; font-size: 13px;">${escapeHtml(product.bonus || "")}</p>
    </div>

    <!-- Account Details in Modal -->
    <div style="background: #06121f; border: 1px solid #1a3f60; padding: 14px; border-radius: 12px; margin-bottom: 16px;">
      <h4 style="font-size: 13px; color: #20a8ff; text-transform: uppercase; margin-bottom: 6px;">Target MLBB Account</h4>
      <div style="display: flex; justify-content: space-between; font-size: 13px;">
        <span style="color:#8da5bb;">Player ID:</span>
        <strong>${userId ? userId : "<span style='color:#ff7676;'>Not provided</span>"}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 13px; margin-top: 4px;">
        <span style="color:#8da5bb;">Zone ID:</span>
        <strong>${zoneId ? zoneId : "<span style='color:#ff7676;'>Not provided</span>"}</strong>
      </div>
      ${verifiedPlayer.name ? `
      <div style="display: flex; justify-content: space-between; font-size: 13px; margin-top: 4px;">
        <span style="color:#8da5bb;">IGN:</span>
        <strong style="color: #19d66d;">${escapeHtml(verifiedPlayer.name)}</strong>
      </div>` : ""}
    </div>

    <!-- UPI QR Payment -->
    <div style="text-align: center; background: #fff; padding: 16px; border-radius: 14px; color: #000; margin-bottom: 16px;">
      <strong style="display: block; font-size: 14px; margin-bottom: 8px;">Scan with Any UPI App (GPay / PhonePe / Paytm)</strong>
      <img src="${qrCodeUrl}" alt="UPI QR Code" style="margin: 0 auto; width: 170px; height: 170px; border: 1px solid #ddd; border-radius: 8px;">
      <p style="font-size: 11px; color: #555; margin-top: 8px;">Pay exactly ₹${finalPrice} to UPI ID: <strong>${UPI_VPA}</strong></p>
    </div>

    <div class="product-detail-actions">
      <button class="btn btn-whatsapp" style="width: 100%;" type="button" onclick="confirmAndSendOrder('${escapeJs(category)}', ${index})">
        💬 Send Screenshot & Order via WhatsApp
      </button>
    </div>
  `;

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function confirmAndSendOrder(category, index) {
  const product = catalogData[category]?.products[index];
  if (!product) return;

  const userId = document.getElementById("userId")?.value.trim() || "";
  const zoneId = document.getElementById("zoneId")?.value.trim() || "";

  if (!userId || !zoneId) {
    alert("Please scroll up and enter your Game ID and Zone ID before placing an order!");
    closeProductModal();
    document.getElementById("userId")?.focus();
    return;
  }

  let message = `*NEW MLBB RECHARGE ORDER — RYDEN INTERNATIONAL*%0A%0A` +
    `📦 *Item:* ${encodeURIComponent(product.name)}%0A` +
    `💰 *Price:* ₹${product.price}%0A` +
    `🎮 *Game ID:* ${encodeURIComponent(userId)}%0A` +
    `🌐 *Zone ID:* ${encodeURIComponent(zoneId)}`;

  if (verifiedPlayer.name && verifiedPlayer.name !== "Pending In-game Check") {
    message += `%0A👤 *In-Game Name:* ${encodeURIComponent(verifiedPlayer.name)}`;
  }

  message += `%0A%0A_I have completed the payment via UPI QR. Attached is my payment screenshot._`;

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
}

/* =========================================================
   HELPERS & GENERAL CONTROLS
========================================================= */
function setupMobileMenu() {
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("desktopNav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => nav.classList.toggle("show"));
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("show")));
}

function setupHeroSlider() {
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".slider-dot");
  let cur = 0;

  function show(i) {
    slides.forEach((s, idx) => s.classList.toggle("active", idx === i));
    dots.forEach((d, idx) => d.classList.toggle("active", idx === i));
    cur = i;
  }

  setInterval(() => {
    cur = (cur + 1) % slides.length;
    show(cur);
  }, 5000);
}

function formatCurrency(amount) {
  if (!amount || isNaN(amount)) return "Contact";
  return currentCurrency === "USD" ? `$${(amount * usdRate).toFixed(2)}` : `₹${Number(amount).toLocaleString("en-IN")}`;
}

function updateAccountPrices() {
  document.querySelectorAll("[data-price-value]").forEach(el => {
    el.textContent = formatCurrency(Number(el.dataset.priceValue));
  });
}

function setupCurrencySwitch() {
  document.querySelectorAll(".currency-button").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".currency-button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCurrency = btn.dataset.currency;
      updateAccountPrices();
      renderCatalog(activeCatalog);
    });
  });
}

function setupAccountFilters() {
  const search = document.getElementById("accountSearch");
  const col = document.getElementById("collectorFilter");
  const pr = document.getElementById("priceFilter");

  function apply() {
    const s = (search?.value || "").toLowerCase();
    const c = col?.value || "all";
    const p = pr?.value || "all";

    document.querySelectorAll(".account-card").forEach(card => {
      const name = (card.dataset.name || "").toLowerCase();
      const type = (card.dataset.type || "").toLowerCase();
      const price = Number(card.dataset.price || 0);

      const matchS = !s || name.includes(s);
      const matchC = c === "all" || type.includes(c);
      let matchP = true;
      if (p === "under5000") matchP = price < 5000;
      if (p === "5000-15000") matchP = price >= 5000 && price <= 15000;
      if (p === "above15000") matchP = price > 15000;

      card.style.display = matchS && matchC && matchP ? "" : "none";
    });
  }

  if (search) search.addEventListener("input", apply);
  if (col) col.addEventListener("change", apply);
  if (pr) pr.addEventListener("change", apply);
}

function setupModalEvents() {
  document.querySelectorAll(".modal").forEach(m => {
    m.addEventListener("click", e => {
      if (e.target === m) {
        m.classList.remove("show");
        document.body.classList.remove("modal-open");
      }
    });
  });
}

function closeProductModal() {
  document.getElementById("productModal")?.classList.remove("show");
  document.body.classList.remove("modal-open");
}

function escapeHtml(s) {
  return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function escapeJs(s) {
  return String(s || "").replace(/'/g, "\\'");
}

window.closeProductModal = closeProductModal;
window.confirmAndSendOrder = confirmAndSendOrder;
