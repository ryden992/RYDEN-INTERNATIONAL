// RYDEN INTERNATIONAL — Product Catalog
// Home page cards show product names and images only.
// Prices appear only after a product is opened.

const WHATSAPP_NUMBER = "919233657553";

const products = [
  {
    id: "mlbb-big",
    name: "Mobile Legends (Big Packs)",
    category: "mlbb",
    image: "images/mlbb-big-packs.jpg",
    description: "Choose from the available Mobile Legends diamond packs.",
    packs: [
      { name: "Weekly Diamond Pass", price: null },
      { name: "Big Diamond Pack", price: null },
      { name: "Special Diamond Pack", price: null }
    ]
  },
  {
    id: "mlbb-small",
    name: "Mobile Legends (Small Pack)",
    category: "mlbb",
    image: "images/mlbb-small-pack.jpg",
    description: "Small diamond packs for Mobile Legends.",
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
    description: "Select a Weekly Diamond Pass option.",
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
    description: "Recharge options for the Aspirants event.",
    packs: [
      { name: "Event Recharge Pack", price: null },
      { name: "Special Event Pack", price: null }
    ]
  },
  {
    id: "bgmi",
    name: "BGMI UC Instant",
    category: "pubg",
    image: "images/bgmi-uc.jpg",
    description: "Choose your BGMI UC pack.",
    packs: [
      { name: "UC Pack", price: null },
      { name: "Special UC Pack", price: null },
      { name: "Mega UC Pack", price: null }
    ]
  },
  {
    id: "double-diamonds",
    name: "Double Diamonds Pack",
    category: "mlbb",
    image: "images/double-diamonds.jpg",
    description: "View available Double Diamonds offers.",
    packs: [
      { name: "Double Diamonds Pack", price: null },
      { name: "Special Double Diamonds Pack", price: null }
    ]
  },
  {
    id: "starlight",
    name: "Starlight Gifting — 7 Days",
    category: "mlbb",
    image: "images/starlight.jpg",
    description: "View available Starlight gifting options.",
    packs: [
      { name: "Starlight Membership", price: null },
      { name: "Premium Starlight", price: null }
    ]
  },
  {
    id: "gift-cards",
    name: "Gift Cards",
    category: "giftcards",
    image: "images/gift-cards.jpg",
    description: "Browse available digital gift cards.",
    packs: [
      { name: "Gift Card", price: null }
    ]
  },

  {
    id: "mlbb-ph",
    name: "Mobile Legends — Philippines",
    category: "mlbb",
    image: "images/mlbb-philippines.jpg",
    description: "Mobile Legends Philippines server products.",
    packs: [{ name: "Select a Philippines pack", price: null }]
  },
  {
    id: "mlbb-sg",
    name: "Mobile Legends — Singapore",
    category: "mlbb",
    image: "images/mlbb-singapore.jpg",
    description: "Mobile Legends Singapore server products.",
    packs: [{ name: "Select a Singapore pack", price: null }]
  },
  {
    id: "mlbb-id",
    name: "Mobile Legends — Indonesia",
    category: "mlbb",
    image: "images/mlbb-indonesia.jpg",
    description: "Mobile Legends Indonesia server products.",
    packs: [{ name: "Select an Indonesia pack", price: null }]
  },
  {
    id: "mlbb-my",
    name: "Mobile Legends — Malaysia",
    category: "mlbb",
    image: "images/mlbb-malaysia.jpg",
    description: "Mobile Legends Malaysia server products.",
    packs: [{ name: "Select a Malaysia pack", price: null }]
  },
  {
    id: "mlbb-ru",
    name: "Mobile Legends — Russia",
    category: "mlbb",
    image: "images/mlbb-russia.jpg",
    description: "Mobile Legends Russia server products.",
    packs: [{ name: "Select a Russia pack", price: null }]
  },
  {
    id: "mlbb-tr",
    name: "Mobile Legends — Turkey",
    category: "mlbb",
    image: "images/mlbb-turkey.jpg",
    description: "Mobile Legends Turkey server products.",
    packs: [{ name: "Select a Turkey pack", price: null }]
  },
  {
    id: "mlbb-br",
    name: "Mobile Legends — Brazil",
    category: "mlbb",
    image: "images/mlbb-brazil.jpg",
    description: "Mobile Legends Brazil server products.",
    packs: [{ name: "Select a Brazil pack", price: null }]
  },

  {
    id: "youtube",
    name: "YouTube Premium",
    category: "subscriptions",
    image: "images/youtube-premium.jpg",
    description: "Check availability and subscription options.",
    packs: [{ name: "YouTube Premium", price: null }]
  },
  {
    id: "netflix",
    name: "Netflix Premium",
    category: "subscriptions",
    image: "images/netflix.jpg",
    description: "Check available subscription options.",
    packs: [{ name: "Netflix Premium", price: null }]
  },
  {
    id: "prime",
    name: "Prime Video",
    category: "subscriptions",
    image: "images/prime-video.jpg",
    description: "Check available Prime Video options.",
    packs: [{ name: "Prime Video", price: null }]
  },
  {
    id: "jiohotstar",
    name: "JioHotstar",
    category: "subscriptions",
    image: "images/jiohotstar.jpg",
    description: "Check subscription availability.",
    packs: [{ name: "JioHotstar", price: null }]
  },
  {
    id: "spotify",
    name: "Spotify Premium",
    category: "subscriptions",
    image: "images/spotify.jpg",
    description: "Check available Spotify plans.",
    packs: [{ name: "Spotify Premium", price: null }]
  },
  {
    id: "crunchyroll",
    name: "Crunchyroll Mega Fan",
    category: "subscriptions",
    image: "images/crunchyroll.jpg",
    description: "Check subscription availability.",
    packs: [{ name: "Crunchyroll Mega Fan", price: null }]
  },
  {
    id: "canva",
    name: "Canva Pro",
    category: "subscriptions",
    image: "images/canva-pro.jpg",
    description: "Check available Canva plans.",
    packs: [{ name: "Canva Pro", price: null }]
  },
  {
    id: "picsart",
    name: "Picsart Pro",
    category: "subscriptions",
    image: "images/picsart-pro.jpg",
    description: "Check available Picsart plans.",
    packs: [{ name: "Picsart Pro", price: null }]
  },
  {
    id: "pubg-global",
    name: "PUBG Mobile Global",
    category: "pubg",
    image: "images/pubg-global.jpg",
    description: "Choose an available PUBG Mobile Global UC pack.",
    packs: [{ name: "PUBG Mobile Global UC", price: null }]
  },
  {
    id: "codm",
    name: "Call of Duty Mobile",
    category: "other",
    image: "images/call-of-duty.jpg",
    description: "Check available Call of Duty Mobile products.",
    packs: [{ name: "COD Mobile Pack", price: null }]
  },
  {
    id: "genshin",
    name: "Genshin Impact",
    category: "other",
    image: "images/genshin-impact.jpg",
    description: "Check available Genshin Impact products.",
    packs: [{ name: "Genshin Impact Pack", price: null }]
  },
  {
    id: "magic-chess",
    name: "Magic Chess: Go Go",
    category: "other",
    image: "images/magic-chess.jpg",
    description: "Check available Magic Chess products.",
    packs: [{ name: "Magic Chess Pack", price: null }]
  },
  {
    id: "skins",
    name: "MLBB Skins Gifting",
    category: "mlbb",
    image: "images/skins-gifting.jpg",
    description: "Ask us about available skin gifting options.",
    packs: [{ name: "Skin Gifting", price: null }]
  },
  {
    id: "accounts",
    name: "MLBB Accounts",
    category: "mlbb",
    image: "images/mlbb-accounts.jpg",
    description: "Explore available Mobile Legends accounts.",
    packs: [{ name: "Available Accounts", price: null }]
  },
  {
    id: "capcut",
    name: "CapCut Pro",
    category: "subscriptions",
    image: "images/capcut-pro.jpg",
    description: "Check subscription availability.",
    packs: [{ name: "CapCut Pro", price: null }]
  },
  {
    id: "zee5",
    name: "ZEE5",
    category: "subscriptions",
    image: "images/zee5.jpg",
    description: "Check subscription availability.",
    packs: [{ name: "ZEE5 Subscription", price: null }]
  }
];

const productGrid = document.getElementById("productGrid");
const productSearch = document.getElementById("productSearch");
const emptyState = document.getElementById("emptyState");
const dialog = document.getElementById("productDialog");
const dialogTitle = document.getElementById("dialogTitle");
const dialogBody = document.getElementById("dialogBody");

let activeCategory = "all";

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function renderProducts() {
  const searchTerm = productSearch.value.trim().toLowerCase();

  const filteredProducts = products.filter(product => {
    const categoryMatches =
      activeCategory === "all" || product.category === activeCategory;

    const searchMatches =
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm);

    return categoryMatches && searchMatches;
  });

  productGrid.innerHTML = filteredProducts.map(product => `
    <article class="product-card"
      role="button"
      tabindex="0"
      data-product-id="${escapeHTML(product.id)}"
      aria-label="View ${escapeHTML(product.name)}">

      <img
        class="product-image"
        src="${escapeHTML(product.image)}"
        alt="${escapeHTML(product.name)}"
        loading="lazy"
        onerror="this.outerHTML='<div class=&quot;product-image-fallback&quot; aria-label=&quot;Product image placeholder&quot;>R</div>'">

      <div class="product-info">
        <span class="product-category">${escapeHTML(product.category)}</span>
        <div class="product-name">${escapeHTML(product.name)}</div>
        <div class="product-description">${escapeHTML(product.description)}</div>
        <div class="view-product">VIEW PRODUCT DETAILS →</div>
      </div>
    </article>
  `).join("");

  emptyState.hidden = filteredProducts.length !== 0;
}

function openProduct(productId) {
  const product = products.find(item => item.id === productId);
  if (!product) return;

  dialogTitle.textContent = product.name;

  const packMarkup = product.packs.map(pack => {
    const priceText = Number.isFinite(pack.price)
      ? `₹${pack.price}`
      : "Price on request";

    const message =
      `Hello RYDEN INTERNATIONAL!%0A` +
      `Product: ${encodeURIComponent(product.name)}%0A` +
      `Pack: ${encodeURIComponent(pack.name)}%0A` +
      `Please confirm availability and final price.`;

    const orderLink =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

    return `
      <div class="pack-option">
        <b>${escapeHTML(pack.name)}</b>
        <span class="pack-price">${priceText}</span>
        <a class="order-btn"
           href="${orderLink}"
           target="_blank"
           rel="noopener noreferrer">ENQUIRE</a>
      </div>
    `;
  }).join("");

  dialogBody.innerHTML = `
    <p class="dialog-description">
      ${escapeHTML(product.description)}
      Final price and availability must be confirmed before ordering.
    </p>
    <div class="pack-list">${packMarkup}</div>
  `;

  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }
}

productGrid.addEventListener("click", event => {
  const card = event.target.closest("[data-product-id]");
  if (card) openProduct(card.dataset.productId);
});

productGrid.addEventListener("keydown", event => {
  if (event.key !== "Enter" && event.key !== " ") return;

  const card = event.target.closest("[data-product-id]");
  if (!card) return;

  event.preventDefault();
  openProduct(card.dataset.productId);
});

productSearch.addEventListener("input", renderProducts);

document.querySelectorAll(".category-btn").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".category-btn").forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");
    activeCategory = button.dataset.category;
    renderProducts();
  });
});

document.getElementById("closeDialog").addEventListener("click", () => {
  dialog.close();
});

dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

renderProducts();