"use strict";

/*
  RYDEN INTERNATIONAL
  Frontend catalog only.
  No Firebase, supplier API, payment gateway or domain integration yet.
*/

const WHATSAPP_NUMBER = "919233657553";

const categories = [
  { id: "mlbb", title: "Mobile Legends Bang Bang" },
  { id: "pubg", title: "BGMI / PUBG Mobile" },
  { id: "games", title: "Other Games" },
  { id: "ott", title: "OTT & Subscriptions" },
  { id: "giftcards", title: "Gift Cards & Others" }
];

/*
  Set a real price later by replacing null with a number.
  Example: price: 125
  Homepage cards never display prices.
*/

const products = [
  // MOBILE LEGENDS
  {
    id: "mlbb-big",
    name: "MLBB Big Packs",
    category: "mlbb",
    image: "images/mlbb-big-packs.jpg",
    packs: [
      { name: "86 Diamonds", price: null },
      { name: "172 Diamonds", price: null },
      { name: "257 Diamonds", price: null },
      { name: "343 Diamonds", price: null },
      { name: "429 Diamonds", price: null },
      { name: "514 Diamonds", price: null }
    ]
  },
  {
    id: "mlbb-small",
    name: "MLBB Small Pack",
    category: "mlbb",
    image: "images/mlbb-small-pack.jpg",
    packs: [
      { name: "Small Diamond Pack", price: null },
      { name: "Medium Diamond Pack", price: null },
      { name: "Large Diamond Pack", price: null }
    ]
  },
  {
    id: "weekly-pass",
    name: "Weekly Diamond Pass",
    category: "mlbb",
    image: "images/weekly-pass.jpg",
    packs: [
      { name: "Weekly Diamond Pass", price: null },
      { name: "Weekly Pass × 2", price: null },
      { name: "Weekly Pass × 3", price: null }
    ]
  },
  {
    id: "aspirants",
    name: "Aspirants 5.0 Recharge Event",
    category: "mlbb",
    image: "images/aspirants-event.jpg",
    packs: [
      { name: "Event Pack", price: null },
      { name: "Special Event Pack", price: null }
    ]
  },
  {
    id: "double-diamonds",
    name: "Double Diamonds Pack",
    category: "mlbb",
    image: "images/double-diamonds.jpg",
    packs: [
      { name: "Double Diamonds Pack", price: null }
    ]
  },
  {
    id: "starlight",
    name: "Starlight Gifting — 7 Days",
    category: "mlbb",
    image: "images/starlight.jpg",
    packs: [
      { name: "Normal Starlight", price: null },
      { name: "Premium Starlight", price: null }
    ]
  },
  {
    id: "mlbb-india",
    name: "MLBB India",
    category: "mlbb",
    image: "images/mlbb-india.jpg",
    packs: [
      { name: "India Server Pack", price: null }
    ]
  },
  {
    id: "mlbb-ph",
    name: "MLBB Philippines",
    category: "mlbb",
    image: "images/mlbb-philippines.jpg",
    packs: [
      { name: "Philippines Server Pack", price: null }
    ]
  },
  {
    id: "mlbb-sg",
    name: "MLBB Singapore",
    category: "mlbb",
    image: "images/mlbb-singapore.jpg",
    packs: [
      { name: "Singapore Server Pack", price: null }
    ]
  },
  {
    id: "mlbb-id",
    name: "MLBB Indonesia",
    category: "mlbb",
    image: "images/mlbb-indonesia.jpg",
    packs: [
      { name: "Indonesia Server Pack", price: null }
    ]
  },
  {
    id: "mlbb-my",
    name: "MLBB Malaysia",
    category: "mlbb",
    image: "images/mlbb-malaysia.jpg",
    packs: [
      { name: "Malaysia Server Pack", price: null }
    ]
  },
  {
    id: "mlbb-ru",
    name: "MLBB Russia",
    category: "mlbb",
    image: "images/mlbb-russia.jpg",
    packs: [
      { name: "Russia Server Pack", price: null }
    ]
  },
  {
    id: "mlbb-tr",
    name: "MLBB Turkey",
    category: "mlbb",
    image: "images/mlbb-turkey.jpg",
    packs: [
      { name: "Turkey Server Pack", price: null }
    ]
  },
  {
    id: "mlbb-br",
    name: "MLBB Brazil",
    category: "mlbb",
    image: "images/mlbb-brazil.jpg",
    packs: [
      { name: "Brazil Server Pack", price: null }
    ]
  },
  {
    id: "mlbb-skins",
    name: "Skin Gifting",
    category: "mlbb",
    image: "images/skins-gifting.jpg",
    packs: [
      { name: "Skin Gifting", price: null }
    ]
  },
  {
    id: "mlbb-accounts",
    name: "Available MLBB Accounts",
    category: "mlbb",
    image: "images/mlbb-accounts.jpg",
    packs: [
      { name: "Available Account", price: null }
    ]
  },

  // BGMI / PUBG
  {
    id: "bgmi-uc",
    name: "BGMI UC Instant",
    category: "pubg",
    image: "images/bgmi-uc.jpg",
    packs: [
      { name: "UC Pack", price: null },
      { name: "Special UC Pack", price: null },
      { name: "Mega UC Pack", price: null }
    ]
  },
  {
    id: "pubg-global",
    name: "PUBG Mobile Global",
    category: "pubg",
    image: "images/pubg-global.jpg",
    packs: [
      { name: "PUBG Global UC Pack", price: null }
    ]
  },
  {
    id: "pubg-india",
    name: "PUBG Mobile India",
    category: "pubg",
    image: "images/pubg-india.jpg",
    packs: [
      { name: "UC Pack", price: null }
    ]
  },
  {
    id: "pubg-uc",
    name: "PUBG UC Packs",
    category: "pubg",
    image: "images/pubg-uc.jpg",
    packs: [
      { name: "UC Pack", price: null }
    ]
  },

  // OTHER GAMES
  {
    id: "codm",
    name: "Call of Duty Mobile India",
    category: "games",
    image: "images/call-of-duty.jpg",
    packs: [
      { name: "COD Mobile Pack", price: null }
    ]
  },
  {
    id: "honor",
    name: "Honor of Kings",
    category: "games",
    image: "images/honor-of-kings.jpg",
    packs: [
      { name: "Honor of Kings Pack", price: null }
    ]
  },
  {
    id: "wuthering",
    name: "Wuthering Waves",
    category: "games",
    image: "images/wuthering-waves.jpg",
    packs: [
      { name: "Wuthering Waves Pack", price: null }
    ]
  },
  {
    id: "honkai",
    name: "Honkai Star Rail",
    category: "games",
    image: "images/honkai-star-rail.jpg",
    packs: [
      { name: "Honkai Star Rail Pack", price: null }
    ]
  },
  {
    id: "genshin",
    name: "Genshin Impact",
    category: "games",
    image: "images/genshin-impact.jpg",
    packs: [
      { name: "Genshin Impact Pack", price: null }
    ]
  },
  {
    id: "magic-chess",
    name: "Magic Chess GoGo",
    category: "games",
    image: "images/magic-chess.jpg",
    packs: [
      { name: "Magic Chess Pack", price: null }
    ]
  },

  // OTT AND SUBSCRIPTIONS
  {
    id: "youtube",
    name: "YouTube Premium",
    category: "ott",
    image: "images/youtube-premium.jpg",
    packs: [
      { name: "YouTube Premium", price: null }
    ]
  },
  {
    id: "netflix",
    name: "Netflix Premium",
    category: "ott",
    image: "images/netflix.jpg",
    packs: [
      { name: "Netflix Premium", price: null }
    ]
  },
  {
    id: "prime",
    name: "Prime Video",
    category: "ott",
    image: "images/prime-video.jpg",
    packs: [
      { name: "Prime Video", price: null }
    ]
  },
  {
    id: "hotstar",
    name: "JioHotstar",
    category: "ott",
    image: "images/jiohotstar.jpg",
    packs: [
      { name: "JioHotstar", price: null }
    ]
  },
  {
    id: "spotify",
    name: "Spotify Premium",
    category: "ott",
    image: "images/spotify.jpg",
    packs: [
      { name: "Spotify Premium", price: null }
    ]
  },
  {
    id: "crunchyroll",
    name: "Crunchyroll Mega Fan",
    category: "ott",
    image: "images/crunchyroll.jpg",
    packs: [
      { name: "Crunchyroll Mega Fan", price: null }
    ]
  },
  {
    id: "canva",
    name: "Canva Pro",
    category: "ott",
    image: "images/canva-pro.jpg",
    packs: [
      { name: "Canva Pro", price: null }
    ]
  },
  {
    id: "capcut",
    name: "CapCut Pro",
    category: "ott",
    image: "images/capcut-pro.jpg",
    packs: [
      { name: "CapCut Pro", price: null }
    ]
  },
  {
    id: "picsart",
    name: "PicsArt Pro",
    category: "ott",
    image: "images/picsart-pro.jpg",
    packs: [
      { name: "PicsArt Pro", price: null }
    ]
  },
  {
    id: "sony",
    name: "Sony LIV",
    category: "ott",
    image: "images/sony-liv.jpg",
    packs: [
      { name: "Sony LIV Subscription", price: null }
    ]
  },
  {
    id: "kuku",
    name: "Kuku TV",
    category: "ott",
    image: "images/kuku-tv.jpg",
    packs: [
      { name: "Kuku TV Subscription", price: null }
    ]
  },
  {
    id: "fancode",
    name: "FanCode",
    category: "ott",
    image: "images/fancode.jpg",
    packs: [
      { name: "FanCode Subscription", price: null }
    ]
  },
  {
    id: "gemini",
    name: "Gemini AI Pro",
    category: "ott",
    image: "images/gemini-ai-pro.jpg",
    packs: [
      { name: "Gemini AI Pro", price: null }
    ]
  },
  {
    id: "rakuten",
    name: "Rakuten Viki",
    category: "ott",
    image: "images/rakuten-viki.jpg",
    packs: [
      { name: "Rakuten Viki", price: null }
    ]
  },
  {
    id: "zee5",
    name: "ZEE5",
    category: "ott",
    image: "images/zee5.jpg",
    packs: [
      { name: "ZEE5 Subscription", price: null }
    ]
  },
  {
    id: "nordvpn",
    name: "NordVPN",
    category: "ott",
    image: "images/nordvpn.jpg",
    packs: [
      { name: "NordVPN Subscription", price: null }
    ]
  },

  // GIFT CARDS AND OTHER DIGITAL PRODUCTS
  {
    id: "gift-cards",
    name: "Gift Cards",
    category: "giftcards",
    image: "images/gift-cards.jpg",
    packs: [
      { name: "Gift Card", price: null }
    ]
  },
  {
    id: "google-play",
    name: "Google Play Gift Card",
    category: "giftcards",
    image: "images/google-play.jpg",
    packs: [
      { name: "Google Play Gift Card", price: null }
    ]
  },
  {
    id: "apple-card",
    name: "Apple Gift Card",
    category: "giftcards",
    image: "images/apple-gift-card.jpg",
    packs: [
      { name: "Apple Gift Card", price: null }
    ]
  },
  {
    id: "steam",
    name: "Steam Wallet",
    category: "giftcards",
    image: "images/steam-wallet.jpg",
    packs: [
      { name: "Steam Wallet", price: null }
    ]
  },
  {
    id: "playstation",
    name: "PlayStation Gift Card",
    category: "giftcards",
    image: "images/playstation.jpg",
    packs: [
      { name: "PlayStation Gift Card", price: null }
    ]
  }
];

const catalogSections = document.getElementById("catalogSections");
const emptyState = document.getElementById("emptyState");
const searchWrap = document.getElementById("searchWrap");
const productSearch = document.getElementById("productSearch");
const productDialog = document.getElementById("productDialog");
const dialogTitle = document.getElementById("dialogTitle");
const dialogContent = document.getElementById("dialogContent");
const infoDialog = document.getElementById("infoDialog");
const infoTitle = document.getElementById("infoTitle");
const infoContent = document.getElementById("infoContent");

let activeCategory = "all";
let activeSlide = 0;
let slideTimer = null;
let showAllByCategory = {};

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function getCategoryName(categoryId) {
  const category = categories.find(item => item.id === categoryId);
  return category ? category.title : categoryId;
}

function renderProductCard(product) {
  return `
    <article
      class="product-card"
      data-product-id="${escapeHTML(product.id)}"
      role="button"
      tabindex="0"
      aria-label="Open ${escapeHTML(product.name)}">

      <img
        class="product-image"
        src="${escapeHTML(product.image)}"
        alt="${escapeHTML(product.name)}"
        loading="lazy"
        onerror="this.outerHTML='<div class=&quot;product-placeholder&quot;>R</div>'">

      <span class="product-name">${escapeHTML(product.name)}</span>
    </article>
  `;
}

function renderCatalog() {
  const query = productSearch.value.trim().toLowerCase();

  const filteredProducts = products.filter(product => {
    const categoryMatches =
      activeCategory === "all" || product.category === activeCategory;

    const searchMatches =
      !query ||
      product.name.toLowerCase().includes(query) ||
      getCategoryName(product.category).toLowerCase().includes(query);

    return categoryMatches && searchMatches;
  });

  catalogSections.innerHTML = "";

  const categoriesToShow = activeCategory === "all"
    ? categories
    : categories.filter(category => category.id === activeCategory);

  categoriesToShow.forEach(category => {
    const categoryProducts = filteredProducts.filter(
      product => product.category === category.id
    );

    if (categoryProducts.length === 0) return;

    const expanded = Boolean(showAllByCategory[category.id]);
    const visibleProducts = expanded
      ? categoryProducts
      : categoryProducts.slice(0, 12);

    const section = document.createElement("section");
    section.className = "catalog-section";

    section.innerHTML = `
      <div class="catalog-heading">
        <h2>${escapeHTML(category.title)}</h2>
        <button type="button" data-view-all="${escapeHTML(category.id)}">
          ${expanded ? "Show Less ↑" : "View All →"}
        </button>
      </div>
      <div class="product-grid">
        ${visibleProducts.map(renderProductCard).join("")}
      </div>
    `;

    catalogSections.appendChild(section);
  });

  emptyState.hidden = filteredProducts.length > 0;
}

function openProduct(productId) {
  const product = products.find(item => item.id === productId);
  if (!product) return;

  dialogTitle.textContent = product.name;

  const packRows = product.packs.map(pack => {
    const price = Number.isFinite(pack.price)
      ? `₹${pack.price}`
      : "Price on request";

    const message = [
      "Hello RYDEN INTERNATIONAL!",
      `Product: ${product.name}`,
      `Pack: ${pack.name}`,
      "Please confirm availability and final price."
    ].join("\n");

    const whatsappUrl =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    return `
      <div class="pack-row">
        <strong>${escapeHTML(pack.name)}</strong>
        <span class="pack-price">${price}</span>
        <a class="action-link"
           href="${whatsappUrl}"
           target="_blank"
           rel="noopener noreferrer">ENQUIRE</a>
      </div>
    `;
  }).join("");

  dialogContent.innerHTML = `
    <p class="modal-description">
      Select a pack below. Confirm the final price and availability with RYDEN
      before ordering. Player ID or server details may be requested when needed.
    </p>
    <div class="pack-list">${packRows}</div>
  `;

  productDialog.showModal();
}

function openInfo(title, message, options = {}) {
  infoTitle.textContent = title;

  if (options.type === "region") {
    infoContent.innerHTML = `
      <p class="info-message">
        Enter your Mobile Legends details to prepare a region-check request.
        This demo does not verify the region automatically yet.
      </p>
      <form class="info-form" id="regionForm">
        <label>Player ID
          <input name="playerId" required placeholder="Enter Player ID">
        </label>
        <label>Zone ID
          <input name="zoneId" required placeholder="Enter Zone ID">
        </label>
        <button class="modal-action" type="submit">Send Region Request</button>
      </form>
    `;

    document.getElementById("regionForm").addEventListener("submit", event => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      const playerId = String(form.get("playerId")).trim();
      const zoneId = String(form.get("zoneId")).trim();

      const text = [
        "Hello RYDEN INTERNATIONAL!",
        "Please help check my MLBB region.",
        `Player ID: ${playerId}`,
        `Zone ID: ${zoneId}`
      ].join("\n");

      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
        "_blank",
        "noopener,noreferrer"
      );
      infoDialog.close();
    });

  } else if (options.type === "purchase") {
    infoContent.innerHTML = `
      <p class="info-message">
        Your future purchase history will appear here after order tracking
        is connected. For now, select a product and contact support to enquire.
      </p>
      <button class="modal-action" id="purchaseBrowse">Browse Products</button>
    `;

    document.getElementById("purchaseBrowse").addEventListener("click", () => {
      infoDialog.close();
      document.getElementById("store").scrollIntoView({ behavior: "smooth" });
    });

  } else if (options.type === "leaderboard") {
    infoContent.innerHTML = `
      <p class="info-message">
        The leaderboard will be displayed here when a verified data source is
        connected. No rankings are being invented in this preview.
      </p>
    `;

  } else if (options.type === "account") {
    infoContent.innerHTML = `
      <p class="info-message">
        Account login and order history will be enabled after authentication
        is implemented. This preview does not create or store accounts.
      </p>
      <a class="action-link"
         href="https://wa.me/${WHATSAPP_NUMBER}"
         target="_blank"
         rel="noopener noreferrer">CONTACT SUPPORT</a>
    `;

  } else if (options.type === "reports") {
    infoContent.innerHTML = `
      <p class="info-message">
        Order reports will appear here after an order tracking system is
        connected. No order history is stored in this demo.
      </p>
    `;

  } else if (options.type === "more") {
    infoContent.innerHTML = `
      <div class="pack-list">
        <div class="pack-row"><strong>About RYDEN</strong><span class="pack-price">Digital Store</span></div>
        <div class="pack-row"><strong>Instagram</strong>
          <a class="action-link" href="https://instagram.com/rydenglobal"
             target="_blank" rel="noopener noreferrer">OPEN</a>
        </div>
        <div class="pack-row"><strong>WhatsApp Support</strong>
          <a class="action-link" href="https://wa.me/${WHATSAPP_NUMBER}"
             target="_blank" rel="noopener noreferrer">CONTACT</a>
        </div>
      </div>
    `;

  } else {
    infoContent.innerHTML = `<p class="info-message">${escapeHTML(message || "")}</p>`;
  }

  infoDialog.showModal();
}

// Product-card clicks
catalogSections.addEventListener("click", event => {
  const card = event.target.closest("[data-product-id]");

  if (card) {
    openProduct(card.dataset.productId);
    return;
  }

  const viewAllButton = event.target.closest("[data-view-all]");
  if (viewAllButton) {
    const categoryId = viewAllButton.dataset.viewAll;
    showAllByCategory[categoryId] = !showAllByCategory[categoryId];
    renderCatalog();
  }
});

catalogSections.addEventListener("keydown", event => {
  if (event.key !== "Enter" && event.key !== " ") return;

  const card = event.target.closest("[data-product-id]");
  if (!card) return;

  event.preventDefault();
  openProduct(card.dataset.productId);
});

// Category filters
document.querySelectorAll(".category-tab").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".category-tab").forEach(tab => {
      tab.classList.remove("active");
    });

    button.classList.add("active");
    activeCategory = button.dataset.category;
    renderCatalog();
  });
});

// Search controls
document.getElementById("searchToggle").addEventListener("click", () => {
  searchWrap.hidden = !searchWrap.hidden;

  if (!searchWrap.hidden) {
    productSearch.focus();
  } else {
    productSearch.value = "";
    renderCatalog();
  }
});

document.getElementById("clearSearch").addEventListener("click", () => {
  productSearch.value = "";
  renderCatalog();
  productSearch.focus();
});

productSearch.addEventListener("input", renderCatalog);

// Rotating promotional banners
function showSlide(index) {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");

  if (!slides.length) return;

  activeSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === activeSlide);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === activeSlide);
  });
}

function startSlider() {
  if (slideTimer) clearInterval(slideTimer);
  slideTimer = setInterval(() => showSlide(activeSlide + 1), 5000);
}

document.querySelectorAll(".dot").forEach(dot => {
  dot.addEventListener("click", () => {
    showSlide(Number(dot.dataset.slide));
    startSlider();
  });
});

startSlider();

// Quick actions
document.querySelectorAll(".quick-card").forEach(button => {
  button.addEventListener("click", () => {
    const tool = button.dataset.tool;

    if (tool === "Region Checker") {
      openInfo("Region Checker", "", { type: "region" });
    } else if (tool === "Purchase") {
      openInfo("Purchase History", "", { type: "purchase" });
    } else if (tool === "Leaderboard") {
      openInfo("Leaderboard", "", { type: "leaderboard" });
    }
  });
});

// Top login button
document.getElementById("loginButton").addEventListener("click", () => {
  openInfo("Login / Account", "", { type: "account" });
});

// Fixed bottom navigation
document.querySelectorAll("[data-bottom]").forEach(button => {
  button.addEventListener("click", () => {
    const section = button.dataset.bottom;

    document.querySelectorAll("[data-bottom]").forEach(item => {
      item.classList.remove("active");
    });
    button.classList.add("active");

    if (section === "Home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (section === "Support") {
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}`,
        "_blank",
        "noopener,noreferrer"
      );
    } else if (section === "Account") {
      openInfo("Account", "", { type: "account" });
    } else if (section === "Reports") {
      openInfo("Reports", "", { type: "reports" });
    } else if (section === "More") {
      openInfo("More Options", "", { type: "more" });
    }
  });
});

// Modal close buttons
document.getElementById("closeProductDialog").addEventListener("click", () => {
  productDialog.close();
});

document.getElementById("closeInfoDialog").addEventListener("click", () => {
  infoDialog.close();
});

// Clicking outside a dialog closes it
[productDialog, infoDialog].forEach(dialog => {
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// First render
renderCatalog();