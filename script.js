
"use strict";

// CINEMATIC INTRO: auto-dismiss on every fresh page load/refresh.
(function initBrandIntro() {
  const intro = document.getElementById("brandIntro");
  if (!intro) return;

  // Returning from a product/detail page should land on Home immediately.
  // The one-time flag is consumed here, so a later manual refresh still shows the intro.
  let skipIntroOnce = false;
  try {
    skipIntroOnce = sessionStorage.getItem("rydenSkipIntroOnce") === "1";
    if (skipIntroOnce) sessionStorage.removeItem("rydenSkipIntroOnce");
  } catch (_) {}

  if (skipIntroOnce) {
    intro.remove();
    return;
  }

  const finishIntro = () => {
    intro.classList.add("is-leaving");
    window.setTimeout(() => intro.remove(), 600);
  };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    finishIntro();
    return;
  }

  window.setTimeout(finishIntro, 2700);
})();








/*
  RYDEN INTERNATIONAL
  Frontend catalog only.
  Firebase, supplier API and payment gateway are not connected yet.
*/

const WHATSAPP_NUMBER = "919233657553";
const WHATSAPP_CHANNEL =
  "https://whatsapp.com/channel/0029VbAoBh172WTrjMGyzW1R";
const BUSINESS_EMAIL = "rydenstore7@gmail.com";
const INSTAGRAM_URL = "https://instagram.com/rydenglobal";

const categories = [
  { id: "mlbb", title: "Mobile Legends Bang Bang" },
  { id: "pubg", title: "BGMI / PUBG Mobile" },
  { id: "games", title: "Other Games" },
  { id: "ott", title: "OTT & Subscriptions" },
  { id: "giftcards", title: "Gift Cards & Others" }
];

/*
  Replace null with a real price when ready.
  Example: price: 125
  Homepage product cards do not display prices.
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
    image: "images/aspirants-event.png",
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
    packs: [{ name: "Double Diamonds Pack", price: null }]
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
    image: "images/mlbb-india.jpeg",
    packs: [{ name: "India Server Pack", price: null }]
  },
  {
    id: "mlbb-ph",
    name: "MLBB Philippines",
    category: "mlbb",
    image: "images/mlbb-philippines.png",
    packs: [{ name: "Philippines Server Pack", price: null }]
  },
  {
    id: "mlbb-sg",
    name: "MLBB Singapore",
    category: "mlbb",
    image: "images/mlbb-singapore.png",
    packs: [{ name: "Singapore Server Pack", price: null }]
  },
  {
    id: "mlbb-id",
    name: "MLBB Indonesia",
    category: "mlbb",
    image: "images/mlbb-indonesia.png",
    packs: [{ name: "Indonesia Server Pack", price: null }]
  },
  {
    id: "mlbb-my",
    name: "MLBB Malaysia",
    category: "mlbb",
    image: "images/mlbb-malaysia.png",
    packs: [{ name: "Malaysia Server Pack", price: null }]
  },
  {
    id: "mlbb-ru",
    name: "MLBB Russia",
    category: "mlbb",
    image: "images/mlbb-russia.png",
    packs: [{ name: "Russia Server Pack", price: null }]
  },
  {
    id: "mlbb-tr",
    name: "MLBB Turkey",
    category: "mlbb",
    image: "images/mlbb-turkey.png",
    packs: [{ name: "Turkey Server Pack", price: null }]
  },
  {
    id: "mlbb-br",
    name: "MLBB Brazil",
    category: "mlbb",
    image: "images/mlbb-brazil.png",
    packs: [{ name: "Brazil Server Pack", price: null }]
  },
  {
    id: "mlbb-skins",
    name: "Skin Gifting",
    category: "mlbb",
    image: "images/skins-gifting.jpg",
    packs: [{ name: "Skin Gifting", price: null }]
  },
  {
    id: "mlbb-accounts",
    name: "AVAILABLE MLBB ACCOUNT",
    category: "mlbb",
    packs: [{ name: "Available Account", price: null }]
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
    packs: [{ name: "PUBG Global UC Pack", price: null }]
  },
  {
    id: "pubg-india",
    name: "PUBG Mobile India",
    category: "pubg",
    image: "images/pubg-india.jpg",
    packs: [{ name: "UC Pack", price: null }]
  },
  {
    id: "pubg-uc",
    name: "PUBG UC Packs",
    category: "pubg",
    image: "images/pubg-uc.jpg",
    packs: [{ name: "UC Pack", price: null }]
  },

  // OTHER GAMES
  {
    id: "codm",
    name: "Call of Duty Mobile India",
    category: "games",
    image: "images/call-of-duty.jpg",
    packs: [{ name: "COD Mobile Pack", price: null }]
  },
  {
    id: "honor",
    name: "Honor of Kings",
    category: "games",
    image: "images/honor-of-kings.jpg",
    packs: [{ name: "Honor of Kings Pack", price: null }]
  },
  {
    id: "wuthering",
    name: "Wuthering Waves",
    category: "games",
    image: "images/wuthering-waves.jpg",
    packs: [{ name: "Wuthering Waves Pack", price: null }]
  },
  {
    id: "honkai",
    name: "Honkai Star Rail",
    category: "games",
    image: "images/honkai-star-rail.jpg",
    packs: [{ name: "Honkai Star Rail Pack", price: null }]
  },
  {
    id: "genshin",
    name: "Genshin Impact",
    category: "games",
    image: "images/genshin-impact.webp",
    packs: [{ name: "Genshin Impact Pack", price: null }]
  },
  {
    id: "magic-chess",
    name: "Magic Chess GoGo",
    category: "games",
    image: "images/magic-chess.jpg",
    packs: [{ name: "Magic Chess Pack", price: null }]
  },

  // OTT AND SUBSCRIPTIONS
  {
    id: "youtube",
    name: "YouTube Premium",
    category: "ott",
    image: "images/youtube-premium.jpg",
    packs: [{ name: "YouTube Premium", price: null }]
  },
  {
    id: "netflix",
    name: "Netflix Premium",
    category: "ott",
    image: "images/netflix.jpg",
    packs: [{ name: "Netflix Premium", price: null }]
  },
  {
    id: "prime",
    name: "Prime Video",
    category: "ott",
    image: "images/prime-video.jpg",
    packs: [{ name: "Prime Video", price: null }]
  },
  {
    id: "hotstar",
    name: "JioHotstar",
    category: "ott",
    image: "images/jiohotstar.jpg",
    packs: [{ name: "JioHotstar", price: null }]
  },
  {
    id: "spotify",
    name: "Spotify Premium",
    category: "ott",
    image: "images/spotify.jpg",
    packs: [{ name: "Spotify Premium", price: null }]
  },
  {
    id: "crunchyroll",
    name: "Crunchyroll Mega Fan",
    category: "ott",
    image: "images/crunchyroll.jpg",
    packs: [{ name: "Crunchyroll Mega Fan", price: null }]
  },
  {
    id: "canva",
    name: "Canva Pro",
    category: "ott",
    image: "images/canva-pro.jpg",
    packs: [{ name: "Canva Pro", price: null }]
  },
  {
    id: "capcut",
    name: "CapCut Pro",
    category: "ott",
    image: "images/capcut-pro.jpg",
    packs: [{ name: "CapCut Pro", price: null }]
  },
  {
    id: "picsart",
    name: "PicsArt Pro",
    category: "ott",
    image: "images/picsart-pro.jpg",
    packs: [{ name: "PicsArt Pro", price: null }]
  },
  {
    id: "sony",
    name: "Sony LIV",
    category: "ott",
    image: "images/sony-liv.jpg",
    packs: [{ name: "Sony LIV Subscription", price: null }]
  },
  {
    id: "kuku",
    name: "Kuku TV",
    category: "ott",
    image: "images/kuku-tv.jpg",
    packs: [{ name: "Kuku TV Subscription", price: null }]
  },
  {
    id: "fancode",
    name: "FanCode",
    category: "ott",
    image: "images/fancode.png",
    packs: [{ name: "FanCode Subscription", price: null }]
  },
  {
    id: "gemini",
    name: "Gemini AI Pro",
    category: "ott",
    image: "images/gemini-ai-pro.jpg",
    packs: [{ name: "Gemini AI Pro", price: null }]
  },
  {
    id: "rakuten",
    name: "Rakuten Viki",
    category: "ott",
    image: "images/rakuten-viki.jpg",
    packs: [{ name: "Rakuten Viki", price: null }]
  },
  {
    id: "zee5",
    name: "ZEE5",
    category: "ott",
    image: "images/zee5.jpg",
    packs: [{ name: "ZEE5 Subscription", price: null }]
  },
  {
    id: "nordvpn",
    name: "NordVPN",
    category: "ott",
    image: "images/nordvpn.jpg",
    packs: [{ name: "NordVPN Subscription", price: null }]
  },

  // GIFT CARDS AND OTHER DIGITAL PRODUCTS
  {
    id: "gift-cards",
    name: "Gift Cards",
    category: "giftcards",
    image: "images/gift-cards.jpg",
    packs: [{ name: "Gift Card", price: null }]
  },
  {
    id: "google-play",
    name: "Google Play Gift Card",
    category: "giftcards",
    image: "images/google-play.jpg",
    packs: [{ name: "Google Play Gift Card", price: null }]
  },
  {
    id: "apple-card",
    name: "Apple Gift Card",
    category: "giftcards",
    image: "images/apple-gift-card.jpg",
    packs: [{ name: "Apple Gift Card", price: null }]
  },
  {
    id: "steam",
    name: "Steam Wallet",
    category: "giftcards",
    image: "images/steam-wallet.jpg",
    packs: [{ name: "Steam Wallet", price: null }]
  },
  {
    id: "playstation",
    name: "PlayStation Gift Card",
    category: "giftcards",
    image: "images/playstation.jpg",
    packs: [{ name: "PlayStation Gift Card", price: null }]
  }
];

// ELEMENTS
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
const showAllByCategory = {};

// HELPERS
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

function openWhatsApp(message = "") {
  const url = `https://wa.me/${WHATSAPP_NUMBER}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;

  window.open(url, "_blank", "noopener,noreferrer");
}

function renderProductCard(product) {
  if (product.id === "mlbb-accounts") {
    return `
      <a class="available-accounts-hub" href="./available-mlbb-accounts.html" aria-label="Open AVAILABLE MLBB ACCOUNT">
        <span class="available-accounts-kicker">MLBB • ACCOUNT SERVICES</span>
        <strong>AVAILABLE MLBB ACCOUNT</strong>
        <span class="available-accounts-subtitle">VIEW AVAILABLE ACCOUNTS <b aria-hidden="true">→</b></span>
      </a>
    `;
  }

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
        decoding="async"
        onerror="this.outerHTML='<div class=&quot;product-placeholder&quot;>R</div>'">

      <span class="product-name">${escapeHTML(product.name)}</span>
    </article>
  `;
}

// CATALOG
function renderCatalog() {
  const query = productSearch.value.trim().toLowerCase();
  const diamondHubIds = new Set([
    "mlbb-big", "mlbb-small", "weekly-pass", "aspirants",
    "double-diamonds", "starlight", "mlbb-india",
    "mlbb-ph", "mlbb-sg", "mlbb-id", "mlbb-my",
    "mlbb-ru", "mlbb-tr", "mlbb-br", "mlbb-skins"
  ]);
  const diamondHubProducts = products.filter(product => diamondHubIds.has(product.id));
  const hubSearchMatches =
    !query ||
    "mlbb diamond plus account".includes(query) ||
    "available mlbb accounts".includes(query) ||
    diamondHubProducts.some(product =>
      product.name.toLowerCase().includes(query) ||
      product.packs.some(pack => pack.name.toLowerCase().includes(query))
    );

  // These seven items live inside the MLBB Diamond Plus Account page now.
  const filteredProducts = products.filter(product => {
    if (diamondHubIds.has(product.id)) return false;

    const categoryMatches =
      activeCategory === "all" || product.category === activeCategory;

    const searchMatches =
      !query ||
      product.name.toLowerCase().includes(query) ||
      getCategoryName(product.category).toLowerCase().includes(query) ||
      product.packs.some(pack => pack.name.toLowerCase().includes(query));

    return categoryMatches && searchMatches;
  });

  const fragment = document.createDocumentFragment();

  const categoriesToShow = activeCategory === "all"
    ? categories
    : categories.filter(category => category.id === activeCategory);

  categoriesToShow.forEach(category => {
    const categoryProducts = filteredProducts.filter(
      product => product.category === category.id
    );

    const showDiamondHub =
      category.id === "mlbb" &&
      (activeCategory === "all" || activeCategory === "mlbb") &&
      hubSearchMatches;

    if (!categoryProducts.length && !showDiamondHub) return;

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
      ${showDiamondHub ? `
        <a class="mlbb-diamond-hub" href="./mlbb-diamond.html" aria-label="Open MLBB Diamond">
          <strong>MLBB DIAMOND</strong>
        </a>
      ` : ""}
      ${categoryProducts.length ? `
        <div class="product-grid">
          ${visibleProducts.map(renderProductCard).join("")}
        </div>
      ` : ""}
    `;

    fragment.appendChild(section);
  });

  // Replace the catalog once per update instead of mutating the live DOM per category.
  catalogSections.replaceChildren(fragment);
  emptyState.hidden = filteredProducts.length > 0 || (activeCategory !== "pubg" && activeCategory !== "games" && activeCategory !== "ott" && activeCategory !== "giftcards" && hubSearchMatches && (activeCategory === "all" || activeCategory === "mlbb"));
}

// PRODUCT DETAILS
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

// POLICY CONTENT
const policies = {
  privacy: {
    title: "Privacy Policy",
    body: `
      <h3>RYDEN INTERNATIONAL — Privacy Policy</h3>

      <h4>1. Information We Collect</h4>
      <p>We may collect your name, contact details, order information, and necessary transaction details to process purchases and provide customer support.</p>

      <h4>2. Use of Information</h4>
      <p>Your information is used to manage orders, verify payments, resolve disputes, and improve our services.</p>

      <h4>3. Data Security</h4>
      <p>We take reasonable measures to protect your personal information against unauthorized access, misuse, or disclosure.</p>

      <h4>4. Third-Party Services</h4>
      <p>Payment providers and other service providers may process information as needed to provide their services. Their own privacy policies may also apply.</p>

      <h4>5. Cookies</h4>
      <p>Our website may use cookies to improve functionality and user experience. You can manage cookies through your browser settings where available.</p>

      <h4>6. Data Retention</h4>
      <p>We retain information only as long as reasonably necessary for business, security, legal, and transaction-related purposes.</p>

      <h4>7. Your Privacy Rights</h4>
      <p>You may contact us to request access to, correction of, or deletion of your personal information, subject to applicable legal requirements.</p>

      <h4>8. Policy Updates</h4>
      <p>We may update this policy when necessary. Changes will be published on this page.</p>

      <h4>9. Contact Us</h4>
      <p>RYDEN INTERNATIONAL</p>
      <p>Email: <a href="mailto:${BUSINESS_EMAIL}">${BUSINESS_EMAIL}</a></p>
      <p>Business Number: ${"9233657553"}</p>

      <p>By using our website, you acknowledge this Privacy Policy.</p>
    `
  },

  refund: {
    title: "Refund Policy",
    body: `
      <h3>RYDEN INTERNATIONAL — Refund Policy</h3>

      <h4>1. Refund Eligibility</h4>
      <p>Refunds may be considered for verified non-delivery, duplicate sales, unauthorized transactions, or account issues caused by the seller.</p>

      <h4>2. Non-Refundable Cases</h4>
      <p>Refunds are generally not available for change of mind after delivery or problems caused by the buyer's actions. All requests are reviewed individually, subject to applicable law.</p>

      <h4>3. Refund Process</h4>
      <p>To request a refund, contact us with your order details, payment proof, and a clear explanation of the issue.</p>

      <h4>4. Approval &amp; Processing</h4>
      <p>Approved refunds will generally be sent through the original payment method. Processing time depends on the payment provider.</p>

      <h4>5. Contact Us</h4>
      <p>RYDEN INTERNATIONAL</p>
      <p>Business Email: <a href="mailto:${BUSINESS_EMAIL}">${BUSINESS_EMAIL}</a></p>
      <p>Business Number: 9233657553</p>

      <p>By purchasing from our website, you acknowledge that you have reviewed this policy.</p>
    `
  },

  terms: {
    title: "Terms & Conditions",
    body: `
      <h3>RYDEN INTERNATIONAL — Terms &amp; Conditions</h3>

      <h4>1. Acceptance of Terms</h4>
      <p>By accessing our website or purchasing from RYDEN INTERNATIONAL, you agree to these Terms &amp; Conditions.</p>

      <h4>2. User Eligibility</h4>
      <p>Users must meet applicable age requirements and have the legal capacity to make purchases. Minors must obtain any required parental or guardian consent.</p>

      <h4>3. Orders &amp; Payments</h4>
      <p>Customers must provide accurate information and ensure payments are completed through agreed payment methods. Orders are subject to payment verification and product availability.</p>

      <h4>4. Digital Account Purchases</h4>
      <p>Customers should review account descriptions and ask questions before purchasing. Account transfers and use may be subject to the game publisher's rules and restrictions.</p>

      <h4>5. Refunds &amp; Cancellations</h4>
      <p>All refund and cancellation requests are handled according to our Refund Policy and applicable law.</p>

      <h4>6. Prohibited Activities</h4>
      <p>Users must not use our website for fraud, unlawful activities, unauthorized access, or activities that disrupt our services.</p>

      <h4>7. Intellectual Property</h4>
      <p>Website content, including our branding, text, graphics, and designs, may not be copied or used without permission, except as permitted by law.</p>

      <h4>8. Third-Party Services</h4>
      <p>We are not responsible for third-party websites or services beyond our control. Their respective terms and policies may apply.</p>

      <h4>9. Limitation of Liability</h4>
      <p>We aim to provide accurate listings and reliable service but cannot guarantee uninterrupted website availability. Nothing in these terms excludes liability that cannot legally be excluded.</p>

      <h4>10. Changes to Terms</h4>
      <p>We may update these terms when necessary. Updated versions will be published on this page.</p>

      <h4>11. Contact Us</h4>
      <p>RYDEN INTERNATIONAL</p>
      <p>Email: <a href="mailto:${BUSINESS_EMAIL}">${BUSINESS_EMAIL}</a></p>
      <p>Business Number: 9233657553</p>

      <p>By using our website, you acknowledge that you have had the opportunity to review these Terms &amp; Conditions.</p>
    `
  }
};

// INFO DIALOG
function openInfo(title, message = "", options = {}) {
  infoTitle.textContent = title;

  if (options.type === "support") {
    infoContent.innerHTML = `
      <div class="support-panel">
        <h3>What Issues Are You Facing?</h3>
        <h4>Customer Support</h4>

        <p>At RYDEN INTERNATIONAL, we're committed to providing reliable customer support. Whether you need help with account purchases, payment issues, order updates, or account-related concerns, we're here to help.</p>

        <p>Contact us for assistance, and our team will do its best to resolve your issue as quickly as possible.</p>

        <div class="support-hours">24/7 SUPPORT</div>

        <p><strong>Business Email:</strong><br>
          <a href="mailto:${BUSINESS_EMAIL}">${BUSINESS_EMAIL}</a>
        </p>

        <p><strong>Business Number:</strong><br>
          <a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener noreferrer">9233657553</a>
        </p>

        <p>We're dedicated to providing a smooth, secure, and trustworthy buying experience.</p>

        <a class="action-link"
           href="https://wa.me/${WHATSAPP_NUMBER}"
           target="_blank"
           rel="noopener noreferrer">CHAT ON WHATSAPP</a>

        <p><a href="${WHATSAPP_CHANNEL}" target="_blank" rel="noopener noreferrer">Join our WhatsApp Channel for updates</a></p>
      </div>
    `;

  } else if (options.type === "policy") {
    const policy = policies[options.policy];

    if (!policy) {
      infoContent.textContent = "Policy not found.";
    } else {
      infoTitle.textContent = policy.title;
      infoContent.innerHTML = `<div class="policy-content">${policy.body}</div>`;
    }

  } else if (options.type === "region") {
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

      openWhatsApp([
        "Hello RYDEN INTERNATIONAL!",
        "Please help check my MLBB region.",
        `Player ID: ${playerId}`,
        `Zone ID: ${zoneId}`
      ].join("\n"));

      infoDialog.close();
    });

  } else if (options.type === "purchase") {
    infoContent.innerHTML = `
      <p class="info-message">
        Your purchase history will appear here after order tracking is connected.
        For now, select a product and contact support to enquire.
      </p>

      <button class="modal-action" id="purchaseBrowse" type="button">
        Browse Products
      </button>
    `;

    document.getElementById("purchaseBrowse").addEventListener("click", () => {
      infoDialog.close();
      document.getElementById("store").scrollIntoView({ behavior: "smooth" });
    });

  } else if (options.type === "leaderboard") {
    infoContent.innerHTML = `
      <p class="info-message">
        The leaderboard will appear here when a verified data source is connected.
        Live rankings are not available in this preview yet.
      </p>
    `;

  } else if (options.type === "wallet") {
    infoContent.innerHTML = `
      <p class="info-message">
        Your RYO Coin wallet will show its available balance here once the wallet and secure top-up system are connected.
        No balance or payment has been added in this preview.
      </p>
    `;

  } else if (options.type === "membership") {
    infoContent.innerHTML = `
      <h3>VIP Member</h3>
      <p class="info-message">
        VIP Member details and benefits will be announced here. Membership plans and prices have not been added yet.
      </p>
    `;

  } else if (options.type === "account") {
    renderLoginForm();

  } else if (options.type === "reports") {
    infoContent.innerHTML = `
      <p class="info-message">
        Order reports will appear here after an order tracking system is connected.
        No order history is stored in this preview.
      </p>
    `;

  } else if (options.type === "reseller") {
    infoContent.innerHTML = `
      <h3>RYDEN INTERNATIONAL Reseller</h3>
      <p class="info-message">
        Interested in reseller access? Contact our team to discuss product availability,
        pricing and requirements. Reseller access is not automated yet.
      </p>
      <a class="action-link"
         href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello RYDEN INTERNATIONAL! I am interested in reseller access.")}"
         target="_blank"
         rel="noopener noreferrer">ENQUIRE ABOUT RESELLER ACCESS</a>
    `;

  } else if (options.type === "more") {
    renderMoreMenu();

  } else {
    infoContent.textContent = message;
  }

  if (options.type !== "more") infoDialog.classList.remove("side-drawer");
  if (!infoDialog.open) infoDialog.showModal();
}

// LOGIN / REGISTER UI
function renderLoginForm(mode = "login") {
  const isRegister = mode === "register";
  const isForgot = mode === "forgot";

  infoTitle.textContent = isForgot
    ? "Reset Password"
    : isRegister
      ? "Create Account"
      : "Login / Account";

  if (isForgot) {
    infoContent.innerHTML = `
      <p class="info-message">
        Enter your registered email address to request a password reset.
        Password reset will work after Firebase Authentication is connected.
      </p>

      <form class="info-form" id="forgotPasswordForm">
        <label>Email Address
          <input type="email" name="email" required placeholder="Enter your email">
        </label>

        <button class="modal-action" type="submit">Request Password Reset</button>

        <button class="text-action" id="backToLogin" type="button">Back to Login</button>
      </form>
    `;

    document.getElementById("forgotPasswordForm").addEventListener("submit", event => {
      event.preventDefault();

      infoContent.insertAdjacentHTML(
        "beforeend",
        '<p class="info-message">Password reset is not active yet. Firebase Authentication must be connected first.</p>'
      );
    });

    document.getElementById("backToLogin").addEventListener("click", () => {
      renderLoginForm("login");
    });

    return;
  }

  infoContent.innerHTML = `
    <div class="auth-panel">
      <section class="auth-brand-intro" aria-label="RYDEN INTERNATIONAL digital gaming services">
        <img class="auth-brand-logo" src="./store-logo.jpg" alt="RYDEN INTERNATIONAL logo" width="44" height="44" decoding="async">
        <p class="auth-brand-kicker">WELCOME TO</p>
        <h3 class="auth-brand-name">RYDEN <span>INTERNATIONAL</span></h3>
        <p class="auth-brand-tagline">MLBB Accounts &amp; Diamond Gaming Services</p>
        <p class="auth-brand-categories">PUBG / BGMI <span>•</span> Game Top-Ups <span>•</span> Subscriptions <span>•</span> Gift Cards</p>
      </section>

      <p class="info-message auth-welcome-message">
        ${isRegister
          ? "Create your RYDEN INTERNATIONAL account."
          : "Sign in to your RYDEN INTERNATIONAL account."}
      </p>

      <form class="info-form" id="authForm">
        ${isRegister ? `
          <label>Full Name
            <input type="text" name="name" required placeholder="Enter your name">
          </label>
        ` : ""}

        <label>Email Address
          <input type="email" name="email" required placeholder="Enter your email">
        </label>

        <label>Password
          <input type="password" name="password" required minlength="6" placeholder="Enter password">
        </label>

        ${isRegister ? `
          <label>Confirm Password
            <input type="password" name="confirmPassword" required minlength="6" placeholder="Confirm password">
          </label>
        ` : `
          <button class="text-action" id="forgotPasswordButton" type="button">
            Forgot Password?
          </button>
        `}

        <button class="modal-action" type="submit">
          ${isRegister ? "Create Account" : "Login"}
        </button>
      </form>

      <div class="auth-divider">OR</div>

      <button class="modal-action google-login-button" id="googleLoginButton" type="button">
        Continue with Google
      </button>

      <p class="info-message">
        ${isRegister ? "Already have an account?" : "New to RYDEN INTERNATIONAL?"}
        <button class="text-action" id="switchAuthMode" type="button">
          ${isRegister ? "Login" : "Register"}
        </button>
      </p>

      <p class="auth-notice">
        Account authentication is not active yet. Firebase setup is required.
      </p>
    </div>
  `;

  document.getElementById("authForm").addEventListener("submit", event => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") || "");

    if (isRegister) {
      const confirmPassword = String(form.get("confirmPassword") || "");

      if (password !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
      }
    }

    alert(
      "Login/Register is not active yet. Firebase Authentication must be connected first."
    );
  });

  document.getElementById("googleLoginButton").addEventListener("click", () => {
    alert(
      "Google Login is not active yet. Firebase Google Authentication must be configured first."
    );
  });

  document.getElementById("switchAuthMode").addEventListener("click", () => {
    renderLoginForm(isRegister ? "login" : "register");
  });

  if (!isRegister) {
    document.getElementById("forgotPasswordButton").addEventListener("click", () => {
      renderLoginForm("forgot");
    });
  }
}

// MORE MENU — left-side navigation drawer
function renderMoreMenu() {
  infoDialog.classList.add("side-drawer");
  infoTitle.innerHTML = '<span class="drawer-title-mark"><img class="drawer-title-logo" src="./store-logo.jpg" alt="" width="44" height="44" decoding="async"></span><span>Welcome Back</span>';

  const options = [
    { label: "Home", type: "home", icon: "⌂" },
    { label: "My Account", type: "account", icon: "♙" },
    { label: "Leaderboard", type: "leaderboard", icon: "🏆" },
    { label: "Support", type: "support", icon: "♧" },
    { label: "Terms & Conditions", type: "terms", icon: "▤" },
    { label: "Privacy Policy", type: "privacy", icon: "◈" },
    { label: "Refund Policy", type: "refund", icon: "↩" }
  ];

  infoContent.innerHTML = `
    <div class="drawer-profile">
      <strong>Dear User</strong>
      <span class="drawer-avatar" aria-hidden="true">R</span>
    </div>

    <div class="more-menu drawer-main-links">
      ${options.map(item => `
        <button class="more-menu-item" type="button" data-more-action="${item.type}">
          <span class="more-menu-icon" aria-hidden="true">${item.icon}</span>
          <span>${item.label}</span>
          <span class="more-menu-arrow" aria-hidden="true">›</span>
        </button>
      `).join("")}
    </div>

    <div class="drawer-shortcuts" aria-label="Account shortcuts">
      <button class="drawer-shortcut" type="button" data-drawer-shortcut="wallet">
        <span aria-hidden="true">＋</span><small>Add money</small>
      </button>
      <button class="drawer-shortcut" type="button" data-drawer-shortcut="payments">
        <span class="drawer-shortcut-icon" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><rect x="2.5" y="5" width="19" height="14" rx="2.5"></rect><path d="M3 9h18M6 14h4"></path></svg></span><small>Payments</small>
      </button>
      <button class="drawer-shortcut" type="button" data-drawer-shortcut="orders">
        <span class="drawer-shortcut-icon drawer-orders-icon" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><rect x="4" y="7" width="16" height="14" rx="2"></rect><path d="M8 7V5a4 4 0 0 1 8 0v2"></path><path d="M8 12h8M8 16h5"></path></svg></span><small>Orders</small>
      </button>
    </div>

    <p class="drawer-useful-label">USEFUL LINKS</p>
    <div class="more-menu drawer-useful-links">
      <button class="more-menu-item" type="button" data-more-action="login">
        <span class="more-menu-icon brand-login-icon" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="M10 17l5-5-5-5M15 12H3"></path><path d="M13 3h5a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3h-5"></path></svg></span>
        <span>Login</span><span class="more-menu-arrow" aria-hidden="true">›</span>
      </button>
      <button class="more-menu-item" type="button" data-more-action="register">
        <span class="more-menu-icon brand-register-icon" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><circle cx="9" cy="7" r="4"></circle><path d="M2 21v-2a7 7 0 0 1 14 0v2zM19 8v6M16 11h6"></path></svg></span>
        <span>Register</span><span class="more-menu-arrow" aria-hidden="true">›</span>
      </button>
      <a class="more-menu-item" href="${INSTAGRAM_URL}" target="_blank" rel="noopener noreferrer">
        <span class="more-menu-icon brand-instagram-icon" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle class="instagram-dot" cx="17.5" cy="6.5" r="1"></circle></svg></span>
        <span>Instagram</span><span class="more-menu-arrow" aria-hidden="true">↗</span>
      </a>
      <a class="more-menu-item" href="${WHATSAPP_CHANNEL}" target="_blank" rel="noopener noreferrer">
        <span class="more-menu-icon brand-whatsapp-icon" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path class="whatsapp-bubble" d="M20.52 3.48A11.78 11.78 0 0 0 2.03 17.7L.5 23.5l5.94-1.56A11.78 11.78 0 0 0 20.52 3.48ZM12 21.1a9.08 9.08 0 0 1-4.63-1.27l-.33-.2-3.52.92.94-3.43-.22-.35A9.08 9.08 0 1 1 12 21.1Z"></path><path class="whatsapp-handset" d="M8.14 6.7c-.25-.56-.52-.57-.76-.58h-.65c-.23 0-.6.09-.91.43-.32.35-1.2 1.17-1.2 2.85s1.23 3.3 1.4 3.53c.18.23 2.37 3.8 5.85 5.17 2.9 1.14 3.49.91 4.12.85.63-.06 2.03-.83 2.31-1.63.29-.8.29-1.49.2-1.63-.08-.14-.31-.23-.66-.4-.34-.17-2.03-1-2.34-1.11-.31-.11-.54-.17-.77.17-.23.34-.88 1.11-1.08 1.34-.2.23-.4.26-.74.09-.34-.17-1.45-.54-2.76-1.72-1.02-.91-1.71-2.03-1.91-2.37-.2-.34-.02-.52.15-.69.15-.15.34-.4.51-.6.17-.2.23-.34.34-.57.11-.23.06-.43-.03-.6-.08-.17-.75-1.86-1.06-2.53Z"></path></svg></span>
        <span>WhatsApp Channel</span><span class="more-menu-arrow" aria-hidden="true">↗</span>
      </a>
    </div>
  `;

  infoContent.querySelectorAll("[data-more-action]").forEach(button => {
    button.addEventListener("click", () => {
      const action = button.dataset.moreAction;
      if (action === "home") {
        infoDialog.close();
        infoDialog.classList.remove("side-drawer");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (action === "account" || action === "login") {
        infoDialog.classList.remove("side-drawer");
        renderLoginForm("login");
      } else if (action === "register") {
        infoDialog.classList.remove("side-drawer");
        renderLoginForm("register");
      } else if (action === "support") {
        openInfo("Help & Support", "", { type: "support" });
      } else if (action === "privacy" || action === "terms" || action === "refund") {
        openInfo("", "", { type: "policy", policy: action });
      } else if (action === "leaderboard") {
        openInfo("Leaderboards", "", { type: "leaderboard" });
      }
    });
  });

  infoContent.querySelectorAll("[data-drawer-shortcut]").forEach(button => {
    button.addEventListener("click", () => {
      const action = button.dataset.drawerShortcut;
      if (action === "wallet") {
        infoDialog.classList.remove("side-drawer");
        infoDialog.close();
        document.getElementById("ryoCoinButton")?.click();
      } else if (action === "payments") {
        infoDialog.classList.remove("side-drawer");
        infoDialog.close();
        document.querySelector(".payment-section, #payments, .payment-methods")?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        infoDialog.classList.remove("side-drawer");
        openInfo("Reports", "", { type: "reports" });
      }
    });
  });
}

// CATALOG EVENTS
catalogSections.addEventListener("click", event => {
  const card = event.target.closest("[data-product-id]");

  if (card) {
    // Open a dedicated recharge page instead of a popup.
    window.location.href = "./recharge.html?game=" + encodeURIComponent(card.dataset.productId);
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
  window.location.href = "./recharge.html?game=" + encodeURIComponent(card.dataset.productId);
});

// CATEGORY FILTERS
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

// SEARCH
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

// PROMOTIONAL SLIDER
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

const sliderTrack = document.getElementById("slides");
let swipeStartX = 0;
let swipeStartY = 0;
let swipeInProgress = false;
let suppressSlideClick = false;

if (sliderTrack) {
  sliderTrack.addEventListener("pointerdown", event => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    swipeStartX = event.clientX;
    swipeStartY = event.clientY;
    swipeInProgress = true;
    suppressSlideClick = false;
  });

  sliderTrack.addEventListener("pointerup", event => {
    if (!swipeInProgress) return;
    swipeInProgress = false;

    const deltaX = event.clientX - swipeStartX;
    const deltaY = event.clientY - swipeStartY;

    // Only treat a clear horizontal gesture as a banner swipe.
    if (Math.abs(deltaX) < 40 || Math.abs(deltaX) <= Math.abs(deltaY) * 1.2) {
      return;
    }

    suppressSlideClick = true;
    showSlide(activeSlide + (deltaX < 0 ? 1 : -1));
    startSlider();
  });

  sliderTrack.addEventListener("pointercancel", () => {
    swipeInProgress = false;
  });

  // Prevent opening the banner link when the user's gesture was a swipe.
  sliderTrack.addEventListener("click", event => {
    if (!suppressSlideClick) return;
    event.preventDefault();
    event.stopPropagation();
    suppressSlideClick = false;
  }, true);
}

document.querySelectorAll(".dot").forEach(dot => {
  dot.addEventListener("click", () => {
    showSlide(Number(dot.dataset.slide));
    startSlider();
  });
});

startSlider();

// QUICK ACTIONS
document.querySelectorAll(".quick-card").forEach(button => {
  button.addEventListener("click", () => {
    const tool = button.dataset.tool;

    if (tool === "Region Checker") {
      openInfo("Region Checker", "", { type: "region" });
    } else if (tool === "Purchase") {
      openInfo("Purchase History", "", { type: "purchase" });
    } else if (tool === "Leaderboard") {
      openInfo("Leaderboard", "", { type: "leaderboard" });
    } else if (tool === "VIP Member") {
      openInfo("VIP Member", "", { type: "membership" });
    }
  });
});

// RYO COIN WALLET SHORTCUT
document.getElementById("ryoCoinButton").addEventListener("click", () => {
  openInfo("RYO Coin Wallet", "", { type: "wallet" });
});

// HEADER LOGIN
document.getElementById("loginButton").addEventListener("click", () => {
  openInfo("Login / Account", "", { type: "account" });
});

// BOTTOM NAVIGATION
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
      openInfo("Help & Support", "", { type: "support" });
    } else if (section === "Account") {
      openInfo("Account", "", { type: "account" });
    } else if (section === "Orders") {
      openInfo("Order History", "", { type: "purchase" });
    } else if (section === "More") {
      openInfo("More Options", "", { type: "more" });
    }
  });
});

// CLOSE BUTTONS
document.getElementById("closeProductDialog").addEventListener("click", () => {
  productDialog.close();
});

document.getElementById("closeInfoDialog").addEventListener("click", () => {
  infoDialog.classList.remove("side-drawer");
  infoDialog.close();
});

// CLOSE DIALOGS WHEN CLICKING THE BACKDROP
[productDialog, infoDialog].forEach(dialog => {
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });
});

// FOOTER YEAR
document.getElementById("year").textContent = new Date().getFullYear();

// INITIAL CATALOG RENDER
renderCatalog();
