/* ==========================================
   RYDEN INTERNATIONAL — STORE ENGINE
   Product Catalog | Search | Categories | Menu
========================================== */

"use strict";

/* ---------- STORE SETTINGS ---------- */

const STORE = {
  name: "RYDEN INTERNATIONAL",
  whatsapp: "919233657553",
  instagram: "https://instagram.com/rydenglobal"
};

/*
  IMPORTANT:
  These are sample catalogue prices for layout testing.
  Verify every price, region, product and subscription
  before publishing. This code does NOT connect to a
  supplier API or automatically deliver products.
*/

/* ---------- PRODUCT CATALOG ---------- */

const products = [
  // MOBILE LEGENDS
  {
    id: "mlbb-86",
    name: "86 MLBB Diamonds",
    category: "mlbb",
    price: 125,
    description: "Mobile Legends diamond recharge",
    region: "India",
    icon: "💎"
  },
  {
    id: "mlbb-172",
    name: "172 MLBB Diamonds",
    category: "mlbb",
    price: 255,
    description: "Mobile Legends diamond recharge",
    region: "India",
    icon: "💎"
  },
  {
    id: "mlbb-257",
    name: "257 MLBB Diamonds",
    category: "mlbb",
    price: 375,
    description: "Mobile Legends diamond recharge",
    region: "India",
    icon: "💎"
  },
  {
    id: "mlbb-343",
    name: "343 MLBB Diamonds",
    category: "mlbb",
    price: 495,
    description: "Mobile Legends diamond recharge",
    region: "India",
    icon: "💎"
  },
  {
    id: "mlbb-429",
    name: "429 MLBB Diamonds",
    category: "mlbb",
    price: 625,
    description: "Mobile Legends diamond recharge",
    region: "India",
    icon: "💎"
  },
  {
    id: "mlbb-514",
    name: "514 MLBB Diamonds",
    category: "mlbb",
    price: 745,
    description: "Mobile Legends diamond recharge",
    region: "India",
    icon: "💎"
  },
  {
    id: "mlbb-weekly",
    name: "Weekly Pass",
    category: "mlbb",
    price: 799,
    description: "Mobile Legends Weekly Pass",
    region: "India",
    icon: "🎟️"
  },
  {
    id: "mlbb-weekly-2",
    name: "Weekly Pass × 2",
    category: "mlbb",
    price: 1499,
    description: "Two Mobile Legends Weekly Passes",
    region: "India",
    icon: "🎟️"
  },

  // PUBG / BGMI
  {
    id: "pubg-uc",
    name: "PUBG / BGMI UC",
    category: "pubg",
    price: 0,
    description: "Contact us for the available UC packages",
    region: "Confirm before ordering",
    icon: "🎮",
    contactOnly: true
  },

  // OTT & SUBSCRIPTIONS
  {
    id: "ott-subscription",
    name: "OTT Subscriptions",
    category: "subscriptions",
    price: 0,
    description: "Ask us about currently available plans",
    region: "Availability varies",
    icon: "📺",
    contactOnly: true
  },
  {
    id: "spotify",
    name: "Spotify",
    category: "subscriptions",
    price: 0,
    description: "Ask about available subscription options",
    region: "Availability varies",
    icon: "🎵",
    contactOnly: true
  },
  {
    id: "canva",
    name: "Canva",
    category: "subscriptions",
    price: 0,
    description: "Ask about available Canva plans",
    region: "Availability varies",
    icon: "🎨",
    contactOnly: true
  },
  {
    id: "picsart",
    name: "Picsart",
    category: "subscriptions",
    price: 0,
    description: "Ask about available Picsart plans",
    region: "Availability varies",
    icon: "🖼️",
    contactOnly: true
  },

  // GIFT CARDS
  {
    id: "gift-cards",
    name: "Digital Gift Cards",
    category: "giftcards",
    price: 0,
    description: "Ask about available brands and regions",
    region: "Check region compatibility",
    icon: "🎁",
    contactOnly: true
  }
];

/* ---------- CATEGORY LABELS ---------- */

const categoryLabels = {
  all: "All Products",
  mlbb: "MLBB Diamonds & Passes",
  pubg: "PUBG / BGMI UC",
  subscriptions: "OTT & Subscriptions",
  giftcards: "Gift Cards",
  accounts: "Available MLBB Accounts"
};

/* ---------- ELEMENTS ---------- */

const productGrid = document.getElementById("productGrid");
const productSearch = document.getElementById("productSearch");
const categoryTitle = document.getElementById("categoryTitle");
const productCount = document.getElementById("productCount");
const emptyState = document.getElementById("emptyState");

const menuToggle = document.getElementById("menuToggle");
const desktopNav = document.getElementById("desktopNav");

const productDialog = document.getElementById("productDialog");
const dialogClose = document.getElementById("dialogClose");
const dialogContent = document.getElementById("dialogContent");

let activeCategory = "all";
let searchQuery = "";

/* ---------- HELPERS ---------- */

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, function (character) {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };

    return entities[character];
  });
}

function formatPrice(price) {
  if (!Number.isFinite(Number(price)) || Number(price) <= 0) {
    return "Contact for price";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(Number(price));
}

function getWhatsAppLink(message) {
  return (
    "https://wa.me/" +
    STORE.whatsapp +
    "?text=" +
    encodeURIComponent(message)
  );
}

function openWhatsApp(message) {
  window.open(
    getWhatsAppLink(message),
    "_blank",
    "noopener,noreferrer"
  );
}

/* ---------- PRODUCT FILTERING ---------- */

function getFilteredProducts() {
  return products.filter(function (product) {
    const matchesCategory =
      activeCategory === "all" ||
      activeCategory === "accounts" ||
      product.category === activeCategory;

    const searchableText = [
      product.name,
      product.description,
      product.category,
      product.region
    ].join(" ").toLowerCase();

    const matchesSearch = searchableText.includes(
      searchQuery.toLowerCase()
    );

    return matchesCategory && matchesSearch;
  });
}

/* ---------- RENDER PRODUCTS ---------- */

function renderProducts() {
  if (!productGrid) return;

  /*
    Account cards have their own accountGrid.
    Selecting Accounts scrolls to that section instead.
  */
  if (activeCategory === "accounts") {
    productGrid.innerHTML = "";

    if (categoryTitle) {
      categoryTitle.textContent = categoryLabels.accounts;
    }

    if (productCount) {
      productCount.textContent = "View available accounts below";
    }

    if (emptyState) {
      emptyState.hidden = false;
      emptyState.textContent =
        "Browse the available account listings below.";
    }

    const accountGrid = document.getElementById("accountGrid");

    if (accountGrid) {
      accountGrid.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

    return;
  }

  const filteredProducts = getFilteredProducts();

  if (categoryTitle) {
    categoryTitle.textContent =
      categoryLabels[activeCategory] || categoryLabels.all;
  }

  if (productCount) {
    productCount.textContent =
      filteredProducts.length +
      (filteredProducts.length === 1 ? " product" : " products");
  }

  if (emptyState) {
    emptyState.hidden = filteredProducts.length > 0;
  }

  if (filteredProducts.length === 0) {
    productGrid.innerHTML = "";
    return;
  }

  productGrid.innerHTML = filteredProducts.map(function (product) {
    const priceText = formatPrice(product.price);

    const buttonText = product.contactOnly
      ? "Check Availability"
      : "View Details";

    return `
      <article class="product-card">
        <div class="product-image" aria-hidden="true">
          <span style="
            display:flex;
            align-items:center;
            justify-content:center;
            min-height:120px;
            height:100%;
            font-size:3rem;
            background:linear-gradient(
              145deg,
              rgba(22,133,255,.15),
              rgba(9,14,23,.3)
            );
            border-radius:12px;
          ">${escapeHTML(product.icon || "🎮")}</span>
        </div>

        <span class="product-badge">
          ${escapeHTML(product.region)}
        </span>

        <h3>${escapeHTML(product.name)}</h3>

        <p>${escapeHTML(product.description)}</p>

        <div class="product-price">${escapeHTML(priceText)}</div>

        <button
          class="btn btn-primary"
          type="button"
          data-product-id="${escapeHTML(product.id)}"
        >${buttonText}</button>
      </article>
    `;
  }).join("");
}

/* ---------- CATEGORY BUTTONS ---------- */

function setCategory(category) {
  activeCategory = categoryLabels[category] ? category : "all";

  document.querySelectorAll("[data-category]").forEach(function (button) {
    const buttonCategory = button.dataset.category;

    button.classList.toggle(
      "active",
      buttonCategory === activeCategory
    );

    if (buttonCategory === activeCategory) {
      button.setAttribute("aria-pressed", "true");
    } else {
      button.setAttribute("aria-pressed", "false");
    }
  });

  renderProducts();
}

document.querySelectorAll("[data-category]").forEach(function (button) {
  button.addEventListener("click", function () {
    setCategory(button.dataset.category);
  });
});

/* ---------- SEARCH ---------- */

if (productSearch) {
  productSearch.addEventListener("input", function () {
    searchQuery = productSearch.value.trim();
    renderProducts();
  });
}

/* ---------- PRODUCT DETAILS ---------- */

function showProductDetails(product) {
  if (!product) return;

  const priceText = formatPrice(product.price);

  const orderMessage = product.contactOnly
    ? `Hi ${STORE.name}, I want to check availability for: ${product.name}. Please share the current price, region and details.`
    : `Hi ${STORE.name}, I am interested in ${product.name}. Displayed price: ${priceText}. Please confirm availability, final price and delivery details before I order.`;

  const detailsHTML = `
    <div style="text-align:center;padding:8px 0 18px">
      <div style="font-size:3.5rem;margin-bottom:12px">
        ${escapeHTML(product.icon || "🎮")}
      </div>

      <span class="product-badge">
        ${escapeHTML(product.region)}
      </span>

      <h2 style="margin:16px 0 10px">
        ${escapeHTML(product.name)}
      </h2>

      <p>${escapeHTML(product.description)}</p>

      <div class="product-price" style="margin:18px 0">
        ${escapeHTML(priceText)}
      </div>

      <p style="font-size:.82rem;margin-bottom:18px">
        Confirm availability, region compatibility and final price
        with the store before making payment.
      </p>

      <button
        class="btn btn-primary"
        type="button"
        id="contactProductButton"
        style="width:100%"
      >Contact on WhatsApp</button>
    </div>
  `;

  if (productDialog && dialogContent) {
    dialogContent.innerHTML = detailsHTML;

    const contactButton = document.getElementById(
      "contactProductButton"
    );

    if (contactButton) {
      contactButton.addEventListener("click", function () {
        openWhatsApp(orderMessage);
      });
    }

    if (typeof productDialog.showModal === "function") {
      productDialog.showModal();
    } else {
      openWhatsApp(orderMessage);
    }

    return;
  }

  openWhatsApp(orderMessage);
}

if (productGrid) {
  productGrid.addEventListener("click", function (event) {
    const button = event.target.closest("[data-product-id]");

    if (!button) return;

    const product = products.find(function (item) {
      return item.id === button.dataset.productId;
    });

    showProductDetails(product);
  });
}

/* ---------- DIALOG CLOSE ---------- */

if (dialogClose && productDialog) {
  dialogClose.addEventListener("click", function () {
    if (typeof productDialog.close === "function") {
      productDialog.close();
    }
  });
}

if (productDialog) {
  productDialog.addEventListener("click", function (event) {
    if (event.target === productDialog) {
      productDialog.close();
    }
  });

  productDialog.addEventListener("cancel", function () {
    // Allows the browser's normal Escape-key close behaviour.
  });
}

/* ---------- MOBILE NAVIGATION ---------- */

function closeMobileMenu() {
  if (!menuToggle || !desktopNav) return;

  desktopNav.classList.remove("open", "active");
  menuToggle.setAttribute("aria-expanded", "false");
}

if (menuToggle && desktopNav) {
  menuToggle.setAttribute("aria-expanded", "false");

  menuToggle.addEventListener("click", function () {
    const isOpen =
      desktopNav.classList.contains("open") ||
      desktopNav.classList.contains("active");

    desktopNav.classList.toggle("open", !isOpen);
    desktopNav.classList.toggle("active", !isOpen);

    menuToggle.setAttribute(
      "aria-expanded",
      String(!isOpen)
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
    if (window.innerWidth > 700) {
      closeMobileMenu();
    }
  });
}

/* ---------- CONTACT LINKS ---------- */

document.querySelectorAll("[data-contact-whatsapp]").forEach(function (button) {
  button.addEventListener("click", function () {
    openWhatsApp(
      `Hi ${STORE.name}, I would like to know more about your products and services.`
    );
  });
});

/* ---------- FOOTER YEAR ---------- */

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* ---------- INITIALIZE ---------- */

renderProducts();

console.log(
  `${STORE.name} store interface loaded. ` +
  "Supplier API and automated payment are not connected."
);
