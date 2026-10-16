"use strict";

/* =========================================
   RYDEN INTERNATIONAL — STORE JAVASCRIPT
   Categories | Search | Product Details | Menu
========================================= */

const WHATSAPP_NUMBER = "919233657553";

const products = [
  {
    id: "mlbb-86",
    name: "86 MLBB Diamonds",
    category: "mlbb",
    price: 125,
    description: "Mobile Legends diamond recharge.",
    region: "India",
    icon: "💎"
  },
  {
    id: "mlbb-172",
    name: "172 MLBB Diamonds",
    category: "mlbb",
    price: 255,
    description: "Mobile Legends diamond recharge.",
    region: "India",
    icon: "💎"
  },
  {
    id: "mlbb-257",
    name: "257 MLBB Diamonds",
    category: "mlbb",
    price: 375,
    description: "Mobile Legends diamond recharge.",
    region: "India",
    icon: "💎"
  },
  {
    id: "mlbb-343",
    name: "343 MLBB Diamonds",
    category: "mlbb",
    price: 495,
    description: "Mobile Legends diamond recharge.",
    region: "India",
    icon: "💎"
  },
  {
    id: "mlbb-429",
    name: "429 MLBB Diamonds",
    category: "mlbb",
    price: 625,
    description: "Mobile Legends diamond recharge.",
    region: "India",
    icon: "💎"
  },
  {
    id: "mlbb-514",
    name: "514 MLBB Diamonds",
    category: "mlbb",
    price: 745,
    description: "Mobile Legends diamond recharge.",
    region: "India",
    icon: "💎"
  },
  {
    id: "mlbb-weekly",
    name: "Weekly Pass",
    category: "mlbb",
    price: 799,
    description: "Mobile Legends Weekly Pass.",
    region: "India",
    icon: "🎟️"
  },
  {
    id: "mlbb-weekly-2",
    name: "Weekly Pass × 2",
    category: "mlbb",
    price: 1499,
    description: "Two Mobile Legends Weekly Passes.",
    region: "India",
    icon: "🎟️"
  },
  {
    id: "pubg-uc",
    name: "PUBG / BGMI UC",
    category: "pubg",
    price: null,
    description: "Ask us about available UC packages.",
    region: "Confirm region",
    icon: "🎯"
  },
  {
    id: "ott",
    name: "OTT Subscriptions",
    category: "subscriptions",
    price: null,
    description: "Ask us about available subscription options.",
    region: "Availability varies",
    icon: "📺"
  },
  {
    id: "spotify",
    name: "Spotify",
    category: "subscriptions",
    price: null,
    description: "Ask us about available plans.",
    region: "Availability varies",
    icon: "🎵"
  },
  {
    id: "canva",
    name: "Canva",
    category: "subscriptions",
    price: null,
    description: "Ask us about available Canva plans.",
    region: "Availability varies",
    icon: "🎨"
  },
  {
    id: "picsart",
    name: "Picsart",
    category: "subscriptions",
    price: null,
    description: "Ask us about available Picsart plans.",
    region: "Availability varies",
    icon: "🖼️"
  },
  {
    id: "gift-cards",
    name: "Digital Gift Cards",
    category: "giftcards",
    price: null,
    description: "Ask about available brands and regions.",
    region: "Check compatibility",
    icon: "🎁"
  }
];

const categoryLabels = {
  all: "All Products",
  mlbb: "MLBB Diamonds",
  pubg: "PUBG / BGMI",
  subscriptions: "Subscriptions",
  giftcards: "Gift Cards"
};

let activeCategory = "all";
let searchQuery = "";

const productGrid = document.getElementById("productGrid");
const productSearch = document.getElementById("productSearch");
const productCount = document.getElementById("productCount");
const emptyState = document.getElementById("emptyState");

const resetFilters = document.getElementById("resetFilters");

const productDialog = document.getElementById("productDialog");
const dialogContent = document.getElementById("dialogContent");
const dialogClose = document.getElementById("dialogClose");

const menuToggle = document.getElementById("menuToggle");
const desktopNav = document.getElementById("desktopNav");

/* ---------- HELPERS ---------- */

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, function (character) {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return entities[character];
  });
}

function formatPrice(price) {
  if (typeof price !== "number" || !Number.isFinite(price)) {
    return "Ask for price";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(price);
}

function contactWhatsApp(message) {
  const url =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(message);

  window.open(url, "_blank", "noopener,noreferrer");
}

/* ---------- FILTER PRODUCTS ---------- */

function getFilteredProducts() {
  return products.filter(function (product) {
    const matchesCategory =
      activeCategory === "all" ||
      product.category === activeCategory;

    const searchableText = [
      product.name,
      product.description,
      product.category,
      product.region
    ].join(" ").toLowerCase();

    const matchesSearch =
      searchableText.includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });
}

/* ---------- DISPLAY PRODUCTS ---------- */

function renderProducts() {
  if (!productGrid) return;

  const filtered = getFilteredProducts();

  if (productCount) {
    productCount.textContent =
      filtered.length +
      (filtered.length === 1 ? " product" : " products");
  }

  if (emptyState) {
    emptyState.hidden = filtered.length > 0;
  }

  if (filtered.length === 0) {
    productGrid.innerHTML = "";
    return;
  }

  productGrid.innerHTML = filtered.map(function (product) {
    return `
      <article class="product-card">
        <div class="product-art" aria-hidden="true">
          ${escapeHTML(product.icon)}
        </div>

        <span class="product-badge">
          ${escapeHTML(product.region)}
        </span>

        <h3>${escapeHTML(product.name)}</h3>

        <p>${escapeHTML(product.description)}</p>

        <div class="product-price">
          ${escapeHTML(formatPrice(product.price))}
        </div>

        <button
          class="btn btn-primary"
          type="button"
          data-product-id="${escapeHTML(product.id)}"
        >
          View Details ↗
        </button>
      </article>
    `;
  }).join("");
}

/* ---------- CATEGORY BUTTONS ---------- */

document.querySelectorAll("[data-category]").forEach(function (button) {
  button.addEventListener("click", function () {
    const category = button.dataset.category;

    activeCategory = categoryLabels[category]
      ? category
      : "all";

    document.querySelectorAll("[data-category]").forEach(function (item) {
      const selected = item.dataset.category === activeCategory;

      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });

    renderProducts();
  });
});

/* ---------- SEARCH ---------- */

if (productSearch) {
  productSearch.addEventListener("input", function () {
    searchQuery = productSearch.value.trim();
    renderProducts();
  });
}

/* ---------- RESET FILTERS ---------- */

if (resetFilters) {
  resetFilters.addEventListener("click", function () {
    activeCategory = "all";
    searchQuery = "";

    if (productSearch) {
      productSearch.value = "";
    }

    document.querySelectorAll("[data-category]").forEach(function (button) {
      const selected = button.dataset.category === "all";

      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });

    renderProducts();
  });
}

/* ---------- PRODUCT DETAILS ---------- */

function openProductDetails(product) {
  if (!product) return;

  if (!productDialog || !dialogContent) {
    contactWhatsApp(
      "Hi RYDEN INTERNATIONAL, I want to ask about " +
      product.name + "."
    );
    return;
  }

  const message =
    "Hi RYDEN INTERNATIONAL, I am interested in " +
    product.name +
    ". Please confirm the current price, availability and region compatibility.";

  dialogContent.innerHTML = `
    <div class="dialog-product">
      <div class="dialog-product-icon">
        ${escapeHTML(product.icon)}
      </div>

      <h2>${escapeHTML(product.name)}</h2>

      <p>${escapeHTML(product.description)}</p>

      <p>
        <strong>Region:</strong>
        ${escapeHTML(product.region)}
      </p>

      <div class="product-price">
        ${escapeHTML(formatPrice(product.price))}
      </div>

      <p>
        Please confirm the final price and availability
        before making payment.
      </p>

      <button
        type="button"
        class="btn btn-primary"
        id="productWhatsApp"
      >
        Ask on WhatsApp ↗
      </button>
    </div>
  `;

  if (typeof productDialog.showModal === "function") {
    productDialog.showModal();
  }

  const whatsappButton =
    document.getElementById("productWhatsApp");

  if (whatsappButton) {
    whatsappButton.addEventListener("click", function () {
      contactWhatsApp(message);
    });
  }
}

if (productGrid) {
  productGrid.addEventListener("click", function (event) {
    const button = event.target.closest("[data-product-id]");

    if (!button) return;

    const product = products.find(function (item) {
      return item.id === button.dataset.productId;
    });

    openProductDetails(product);
  });
}

/* ---------- CLOSE PRODUCT DIALOG ---------- */

if (dialogClose && productDialog) {
  dialogClose.addEventListener("click", function () {
    productDialog.close();
  });
}

if (productDialog) {
  productDialog.addEventListener("click", function (event) {
    if (event.target === productDialog) {
      productDialog.close();
    }
  });
}

/* ---------- MOBILE NAVIGATION ---------- */

function closeMobileMenu() {
  if (!menuToggle || !desktopNav) return;

  desktopNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open menu");
}

if (menuToggle && desktopNav) {
  menuToggle.addEventListener("click", function () {
    const isOpen = desktopNav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close menu" : "Open menu"
    );
  });

  desktopNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("click", function (event) {
    if (
      !desktopNav.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMobileMenu();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 720) {
      closeMobileMenu();
    }
  });
}

/* ---------- PLAYER TOOLS ---------- */

document.querySelectorAll("[data-tool]").forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault();

    const toolName = link.dataset.tool;

    contactWhatsApp(
      "Hi RYDEN INTERNATIONAL, I need help with " +
      toolName + "."
    );
  });
});

/* ---------- FOOTER YEAR ---------- */

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* ---------- START STORE ---------- */

renderProducts();

console.log("RYDEN INTERNATIONAL store loaded successfully.");

/*
  IMPORTANT BEFORE LAUNCH:
  1. Verify all product prices.
  2. Connect a legitimate supplier API through a secure backend.
  3. Verify payments on the server.
  4. Never put secret API keys in public JavaScript.
*/
