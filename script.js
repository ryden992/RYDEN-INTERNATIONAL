/* =========================================================
   RYDEN INTERNATIONAL
   MAIN WEBSITE JAVASCRIPT
========================================================= */


/* =========================================================
   CONFIG
========================================================= */

const WHATSAPP_NUMBER = "919233657553";

let currentCurrency = "INR";
let usdRate = 0.0105;

let currentSlide = 0;
let sliderTimer = null;


/* =========================================================
   ACCOUNT DATA
========================================================= */

const accounts = [
  {
    name: "Premium Arlott Collector",
    price: 12000,
    type: "collector premium",
    image: "web pic.jpeg",
    description: "Premium Mobile Legends account.",
    tags: ["Collector", "Premium", "Verified"]
  },

  {
    name: "Premium Collector",
    price: 18000,
    type: "collector premium",
    image: "web pic.jpeg",
    description: "Premium MLBB collector account.",
    tags: ["Collector", "Premium", "Rare"]
  },

  {
    name: "Rare Skin Account",
    price: 4500,
    type: "rare",
    image: "web pic.jpeg",
    description: "Rare Mobile Legends collection.",
    tags: ["Rare", "Verified", "MLBB"]
  }
];


/* =========================================================
   RECHARGE CATALOG
========================================================= */

/*
  IMPORTANT:
  Replace the placeholder image/details later with
  the exact catalog images and information you provide.
*/

const catalogData = {

  indian: {
    title: "MLBB Indian Server",
    description: "Indian Server recharge options.",
    products: [
      {
        name: "Indian Server Recharge",
        price: "Contact",
        image: "web pic.jpeg",
        description:
          "Indian Server recharge product. Exact pack details will be added from your catalog."
      }
    ]
  },


  weekly: {
    title: "MLBB Weekly Pass",
    description: "Weekly Pass recharge products.",
    products: [
      {
        name: "Weekly Pass",
        price: "Contact",
        image: "web pic.jpeg",
        description:
          "Weekly Pass product. Exact price and details will be added from your catalog."
      }
    ]
  },


  double: {
    title: "MLBB Double Bonus",
    description: "Double Bonus recharge products.",
    products: [
      {
        name: "Double Bonus Pack",
        price: "Contact",
        image: "web pic.jpeg",
        description:
          "Double Bonus product. Exact price and details will be added from your catalog."
      }
    ]
  },


  value: {
    title: "MLBB Value Pass",
    description: "Value Pass recharge products.",
    products: [
      {
        name: "Value Pass",
        price: "Contact",
        image: "web pic.jpeg",
        description:
          "Value Pass product. Exact price and details will be added from your catalog."
      }
    ]
  },


  small: {
    title: "MLBB Small Pack",
    description: "Small Diamond Pack catalog.",
    products: [

      {
        name: "5 Diamonds",
        price: 11,
        image: "web pic.jpeg",
        description: "5 Diamonds."
      },

      {
        name: "11 Diamonds",
        price: 25,
        image: "web pic.jpeg",
        description: "11 Diamonds."
      },

      {
        name: "22 Diamonds",
        price: 49,
        image: "web pic.jpeg",
        description: "22 Diamonds."
      },

      {
        name: "56 Diamonds",
        price: 97,
        image: "web pic.jpeg",
        description: "56 Diamonds."
      },

      {
        name: "112 Diamonds",
        price: 358,
        image: "web pic.jpeg",
        description: "112 Diamonds."
      },

      {
        name: "223 Diamonds",
        price: 385,
        image: "web pic.jpeg",
        description: "223 Diamonds."
      },

      {
        name: "336 Diamonds",
        price: 579,
        image: "web pic.jpeg",
        description: "336 Diamonds."
      },

      {
        name: "570 Diamonds",
        price: 964,
        image: "web pic.jpeg",
        description: "570 Diamonds."
      },

      {
        name: "1163 Diamonds",
        price: 1930,
        image: "web pic.jpeg",
        description: "1163 Diamonds."
      },

      {
        name: "2398 Diamonds",
        price: 3858,
        image: "web pic.jpeg",
        description: "2398 Diamonds."
      },

      {
        name: "6042 Diamonds",
        price: 9645,
        image: "web pic.jpeg",
        description: "6042 Diamonds."
      },

      {
        name: "Weekly Diamonds Pass",
        price: 200,
        image: "web pic.jpeg",
        description: "Weekly Diamonds Pass."
      },

      {
        name: "First Top Up 50 + Bonus",
        price: 97,
        image: "web pic.jpeg",
        description: "First Top Up 50 + Bonus Diamonds."
      },

      {
        name: "First Top Up 150 + Bonus",
        price: 286,
        image: "web pic.jpeg",
        description: "First Top Up 150 + Bonus Diamonds."
      },

      {
        name: "First Top Up 250 + Bonus",
        price: 475,
        image: "web pic.jpeg",
        description: "First Top Up 250 + Bonus Diamonds."
      },

      {
        name: "First Top Up 500 + Bonus",
        price: 961,
        image: "web pic.jpeg",
        description: "First Top Up 500 + Bonus Diamonds."
      }

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

  renderCatalog("indian");

  updateAccountPrices();

  loadExchangeRate();

});


/* =========================================================
   MOBILE MENU
========================================================= */

function setupMobileMenu() {

  const menuToggle =
    document.getElementById("menuToggle");

  const desktopNav =
    document.getElementById("desktopNav");

  if (!menuToggle || !desktopNav) return;

  menuToggle.addEventListener("click", () => {

    desktopNav.classList.toggle("show");

  });


  desktopNav.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      desktopNav.classList.remove("show");

    });

  });

}


/* =========================================================
   HERO SLIDER
========================================================= */

function setupHeroSlider() {

  const slides =
    document.querySelectorAll(".hero-slide");

  const dots =
    document.querySelectorAll(".slider-dot");

  const prev =
    document.getElementById("sliderPrev");

  const next =
    document.getElementById("sliderNext");

  if (!slides.length) return;


  function showSlide(index) {

    if (index < 0) {
      index = slides.length - 1;
    }

    if (index >= slides.length) {
      index = 0;
    }

    currentSlide = index;


    slides.forEach((slide, i) => {

      slide.classList.toggle(
        "active",
        i === currentSlide
      );

    });


    dots.forEach((dot, i) => {

      dot.classList.toggle(
        "active",
        i === currentSlide
      );

    });

  }


  window.goToSlide = showSlide;


  if (prev) {

    prev.addEventListener("click", () => {

      showSlide(currentSlide - 1);

      restartSlider();

    });

  }


  if (next) {

    next.addEventListener("click", () => {

      showSlide(currentSlide + 1);

      restartSlider();

    });

  }


  dots.forEach(dot => {

    dot.addEventListener("click", () => {

      const index =
        Number(dot.dataset.slide);

      showSlide(index);

      restartSlider();

    });

  });


  function startSlider() {

    sliderTimer =
      setInterval(() => {

        showSlide(currentSlide + 1);

      }, 5500);

  }


  function restartSlider() {

    clearInterval(sliderTimer);

    startSlider();

  }


  showSlide(0);

  startSlider();

}


/* =========================================================
   ACCOUNT FILTERS
========================================================= */

function setupAccountFilters() {

  const search =
    document.getElementById("accountSearch");

  const collector =
    document.getElementById("collectorFilter");

  const price =
    document.getElementById("priceFilter");

  if (search) {
    search.addEventListener(
      "input",
      filterAccounts
    );
  }

  if (collector) {
    collector.addEventListener(
      "change",
      filterAccounts
    );
  }

  if (price) {
    price.addEventListener(
      "change",
      filterAccounts
    );
  }

}


function filterAccounts() {

  const search =
    (
      document.getElementById("accountSearch")
        ?.value || ""
    ).toLowerCase();


  const collector =
    document.getElementById("collectorFilter")
      ?.value || "all";


  const price =
    document.getElementById("priceFilter")
      ?.value || "all";


  const cards =
    document.querySelectorAll(".account-card");


  let visible = 0;


  cards.forEach(card => {

    const name =
      (
        card.dataset.name || ""
      ).toLowerCase();

    const type =
      (
        card.dataset.type || ""
      ).toLowerCase();

    const amount =
      Number(card.dataset.price || 0);


    const searchMatch =
      !search ||
      name.includes(search);


    const typeMatch =
      collector === "all" ||
      type.includes(collector);


    let priceMatch = true;


    if (price === "under5000") {

      priceMatch = amount < 5000;

    }

    else if (price === "5000-15000") {

      priceMatch =
        amount >= 5000 &&
        amount <= 15000;

    }

    else if (price === "above15000") {

      priceMatch = amount > 15000;

    }


    const show =
      searchMatch &&
      typeMatch &&
      priceMatch;


    card.style.display =
      show ? "" : "none";


    if (show) visible++;

  });


  const noResults =
    document.getElementById(
      "noAccountResults"
    );


  if (noResults) {

    noResults.style.display =
      visible === 0
        ? "block"
        : "none";

  }

}


/* =========================================================
   CURRENCY
========================================================= */

function setupCurrencySwitch() {

  const buttons =
    document.querySelectorAll(
      ".currency-button"
    );


  buttons.forEach(button => {

    button.addEventListener(
      "click",
      () => {

        buttons.forEach(btn => {

          btn.classList.remove("active");

        });


        button.classList.add("active");

        currentCurrency =
          button.dataset.currency;


        updateAccountPrices();

        renderCatalog(
          getCurrentCatalog()
        );

      }
    );

  });

}


function formatCurrency(
  amount,
  currency = currentCurrency
) {

  if (
    amount === null ||
    amount === undefined ||
    amount === ""
  ) {
    return "Contact";
  }


  const number =
    Number(amount);


  if (Number.isNaN(number)) {

    return String(amount);

  }


  if (currency === "USD") {

    return new Intl.NumberFormat(
      "en-US",
      {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2
      }
    ).format(number * usdRate);

  }


  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }
  ).format(number);

}


function updateAccountPrices() {

  document.querySelectorAll(
    "[data-price-value]"
  ).forEach(element => {

    const amount =
      Number(
        element.dataset.priceValue
      );


    element.textContent =
      formatCurrency(amount);

  });

}


async function loadExchangeRate() {

  try {

    const response =
      await fetch(
        "https://api.frankfurter.app/latest?from=INR&to=USD"
      );


    if (!response.ok) return;


    const data =
      await response.json();


    if (
      data &&
      data.rates &&
      data.rates.USD
    ) {

      usdRate =
        Number(data.rates.USD);

      updateAccountPrices();

      renderCatalog(
        getCurrentCatalog()
      );

    }

  }

  catch (error) {

    console.log(
      "Exchange rate unavailable."
    );

  }

}


/* =========================================================
   CATALOG
========================================================= */

let activeCatalog = "indian";


function setupCatalogTabs() {

  const tabs =
    document.querySelectorAll(
      ".catalog-tab"
    );


  tabs.forEach(tab => {

    tab.addEventListener(
      "click",
      () => {

        tabs.forEach(item => {

          item.classList.remove("active");

        });


        tab.classList.add("active");


        const category =
          tab.dataset.category;


        activeCatalog =
          category;


        renderCatalog(category);

      }
    );

  });

}


function getCurrentCatalog() {

  return activeCatalog;

}


function renderCatalog(category) {

  const container =
    document.getElementById(
      "productCatalog"
    );


  if (!container) return;


  const catalog =
    catalogData[category];


  if (!catalog) {

    container.innerHTML =
      "<p>No products available.</p>";

    return;

  }


  container.innerHTML = "";


  catalog.products.forEach(
    (product, index) => {

      const card =
        document.createElement("article");


      card.className =
        "product-card";


      const price =
        typeof product.price === "number"
          ? formatCurrency(product.price)
          : product.price;


      card.innerHTML = `

        <div class="product-image">

          <img
            src="${escapeHtml(product.image)}"
            alt="${escapeHtml(product.name)}"
            loading="lazy"
          >

        </div>


        <div class="product-info">

          <strong>
            ${escapeHtml(product.name)}
          </strong>

          <span>
            ${escapeHtml(price)}
          </span>

        </div>


        <button
          class="product-buy"
          type="button"
        >
          View
        </button>

      `;


      const button =
        card.querySelector(
          ".product-buy"
        );


      button.addEventListener(
        "click",
        () => {

          openProductDetails(
            category,
            index
          );

        }
      );


      container.appendChild(card);

    }
  );

}


function openProductDetails(
  category,
  index
) {

  const catalog =
    catalogData[category];


  if (!catalog) return;


  const product =
    catalog.products[index];


  if (!product) return;


  const modal =
    document.getElementById(
      "productModal"
    );


  const content =
    document.getElementById(
      "productModalContent"
    );


  if (!modal || !content) return;


  const price =
    typeof product.price === "number"
      ? formatCurrency(product.price)
      : product.price;


  content.innerHTML = `

    <img
      class="product-detail-image"
      src="${escapeHtml(product.image)}"
      alt="${escapeHtml(product.name)}"
    >

    <span class="hero-badge">
      ${escapeHtml(catalog.title)}
    </span>

    <h2>
      ${escapeHtml(product.name)}
    </h2>

    <div class="product-detail-price">
      ${escapeHtml(price)}
    </div>

    <p class="product-detail-description">
      ${escapeHtml(product.description)}
    </p>

    <div class="product-detail-actions">

      <button
        class="btn btn-primary"
        type="button"
        onclick="buyProduct('${escapeJs(category)}', ${index})"
      >
        Buy Now
      </button>

      <button
        class="btn btn-outline"
        type="button"
        onclick="closeProductModal()"
      >
        Close
      </button>

    </div>

  `;


  modal.classList.add("show");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add(
    "modal-open"
  );

}


function buyProduct(
  category,
  index
) {

  const catalog =
    catalogData[category];


  if (!catalog) return;


  const product =
    catalog.products[index];


  if (!product) return;


  const userId =
    document.getElementById(
      "userId"
    )?.value.trim() || "";


  const zoneId =
    document.getElementById(
      "zoneId"
    )?.value.trim() || "";


  const price =
    typeof product.price === "number"
      ? formatCurrency(
          product.price,
          "INR"
        )
      : product.price;


  let message =
    `Hello RYDEN INTERNATIONAL!%0A%0A` +
    `I want to order:%0A` +
    `${product.name}%0A` +
    `Category: ${catalog.title}%0A` +
    `Price: ${price}`;


  if (userId) {

    message +=
      `%0A%0AGame ID: ${userId}`;

  }


  if (zoneId) {

    message +=
      `%0AZone ID: ${zoneId}`;

  }


  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
    "_blank",
    "noopener,noreferrer"
  );

}


/* =========================================================
   PLAYER CHECK
========================================================= */

function setupPlayerCheck() {

  const button =
    document.getElementById(
      "checkPlayerBtn"
    );


  if (!button) return;


  button.addEventListener(
    "click",
    () => {

      const userId =
        document.getElementById(
          "userId"
        )?.value.trim();


      const zoneId =
        document.getElementById(
          "zoneId"
        )?.value.trim();


      const result =
        document.getElementById(
          "playerResult"
        );


      if (!userId || !zoneId) {

        result.textContent =
          "Please enter both Game ID and Zone ID.";

        return;

      }


      result.textContent =
        "Player verification requires a connected MLBB/API service. We won't display a fake player name.";

    }
  );

}


/* =========================================================
   ACCOUNT DETAILS
========================================================= */

function openAccountDetails(index) {

  const account =
    accounts[index];


  if (!account) return;


  const modal =
    document.getElementById(
      "mainModal"
    );


  const content =
    document.getElementById(
      "modalContent"
    );


  if (!modal || !content) return;


  content.innerHTML = `

    <img
      class="product-detail-image"
      src="${escapeHtml(account.image)}"
      alt="${escapeHtml(account.name)}"
    >

    <span class="hero-badge">
      AVAILABLE ACCOUNT
    </span>

    <h2>
      ${escapeHtml(account.name)}
    </h2>

    <div class="product-detail-price">
      ${formatCurrency(account.price)}
    </div>

    <p class="product-detail-description">
      ${escapeHtml(account.description)}
    </p>

    <div class="account-tags">

      ${account.tags.map(
        tag =>
          `<span>${escapeHtml(tag)}</span>`
      ).join("")}

    </div>

    <div class="product-detail-actions">

      <button
        class="btn btn-whatsapp"
        type="button"
        onclick="buyAccount(${index})"
      >
        Contact About Account
      </button>

    </div>

  `;


  modal.classList.add("show");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add(
    "modal-open"
  );

}


function buyAccount(index) {

  const account =
    accounts[index];


  if (!account) return;


  const price =
    formatCurrency(
      account.price,
      "INR"
    );


  const message =
    `Hello RYDEN INTERNATIONAL!%0A%0A` +
    `I am interested in this MLBB account:%0A` +
    `${account.name}%0A` +
    `Price: ${price}`;


  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
    "_blank",
    "noopener,noreferrer"
  );

}


/* =========================================================
   TOOLS
========================================================= */

function openTool(tool) {

  const modal =
    document.getElementById(
      "mainModal"
    );


  const content =
    document.getElementById(
      "modalContent"
    );


  if (!modal || !content) return;


  const toolData = {

    games: {
      title: "Games",
      icon: "🎮",
      text:
        "RYDEN INTERNATIONAL currently focuses on Mobile Legends services. More games can be added later."
    },

    leaderboard: {
      title: "Monthly Leaderboard",
      icon: "🏆",
      text:
        "Leaderboard functionality can be connected to your MLBB data/API when the required service is available."
    },

    wallet: {
      title: "Wallet",
      icon: "💳",
      text:
        "Wallet functionality will be connected to the customer account system and payment/backend service."
    },

    history: {
      title: "Recharge History",
      icon: "🧾",
      text:
        "Recharge history requires a connected backend/database so customer orders can be stored securely."
    },

    region: {
      title: "MLBB Region Checker",
      icon: "🌍",
      text:
        "Enter your MLBB ID and use a supported MLBB data/API service to retrieve region information."
    }

  };


  const data =
    toolData[tool];


  if (!data) return;


  content.innerHTML = `

    <div class="tool-icon">
      ${data.icon}
    </div>

    <h2>
      ${escapeHtml(data.title)}
    </h2>

    <p class="product-detail-description">
      ${escapeHtml(data.text)}
    </p>

  `;


  modal.classList.add("show");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add(
    "modal-open"
  );

}


/* =========================================================
   AUTH UI
========================================================= */

function openAuthModal() {

  const modal =
    document.getElementById(
      "authModal"
    );


  const content =
    document.getElementById(
      "authContent"
    );


  if (!modal || !content) return;


  renderLoginForm();


  modal.classList.add("show");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add(
    "modal-open"
  );

}


function renderLoginForm() {

  const content =
    document.getElementById(
      "authContent"
    );


  if (!content) return;


  content.innerHTML = `

    <span class="hero-badge">
      RYDEN ACCOUNT
    </span>

    <h2>
      Sign In
    </h2>

    <div class="auth-tabs">

      <button
        class="auth-tab active"
        type="button"
        onclick="renderLoginForm()"
      >
        Sign In
      </button>

      <button
        class="auth-tab"
        type="button"
        onclick="renderSignupForm()"
      >
        Sign Up
      </button>

    </div>


    <form
      class="auth-form"
      id="loginForm"
    >

      <label for="loginEmail">
        Email
      </label>

      <input
        id="loginEmail"
        type="email"
        placeholder="Enter your email"
        required
      >


      <label for="loginPassword">
        Password
      </label>

      <input
        id="loginPassword"
        type="password"
        placeholder="Enter your password"
        required
      >


      <button
        class="btn btn-primary"
        type="submit"
      >
        Login
      </button>

    </form>


    <button
      class="btn auth-google"
      type="button"
      onclick="googleLogin()"
    >
      Continue with Google
    </button>


    <button
      class="auth-forgot"
      type="button"
      onclick="forgotPassword()"
    >
      Forgot Password?
    </button>


    <div
      class="auth-message"
      id="authMessage"
    >
      Secure authentication will be connected through Firebase.
    </div>

  `;


  const form =
    document.getElementById(
      "loginForm"
    );


  if (form) {

    form.addEventListener(
      "submit",
      event => {

        event.preventDefault();

        showAuthMessage(
          "Firebase Authentication needs to be connected before real login can be enabled. We won't store your password in this website."
        );

      }
    );

  }

}


function renderSignupForm() {

  const content =
    document.getElementById(
      "authContent"
    );


  if (!content) return;


  content.innerHTML = `

    <span class="hero-badge">
      RYDEN ACCOUNT
    </span>

    <h2>
      Create Account
    </h2>

    <div class="auth-tabs">

      <button
        class="auth-tab"
        type="button"
        onclick="renderLoginForm()"
      >
        Sign In
      </button>

      <button
        class="auth-tab active"
        type="button"
        onclick="renderSignupForm()"
      >
        Sign Up
      </button>

    </div>


    <form
      class="auth-form"
      id="signupForm"
    >

      <label for="signupName">
        Name
      </label>

      <input
        id="signupName"
        type="text"
        placeholder="Your name"
        required
      >


      <label for="signupEmail">
        Email
      </label>

      <input
        id="signupEmail"
        type="email"
        placeholder="Your email"
        required
      >


      <label for="signupPassword">
        Password
      </label>

      <input
        id="signupPassword"
        type="password"
        placeholder="Create a password"
        required
      >


      <button
        class="btn btn-primary"
        type="submit"
      >
        Create Account
      </button>

    </form>


    <button
      class="btn auth-google"
      type="button"
      onclick="googleLogin()"
    >
      Continue with Google
    </button>


    <div
      class="auth-message"
      id="authMessage"
    >
      Firebase Authentication will handle secure account creation.
    </div>

  `;


  const form =
    document.getElementById(
      "signupForm"
    );


  if (form) {

    form.addEventListener(
      "submit",
      event => {

        event.preventDefault();

        showAuthMessage(
          "Firebase Authentication needs to be connected before account creation can be enabled."
        );

      }
    );

  }

}


function googleLogin() {

  showAuthMessage(
    "Google login will be connected through Firebase Authentication. No password will be stored in this website."
  );

}


function forgotPassword() {

  showAuthMessage(
    "Password reset will be connected through Firebase Authentication."
  );

}


function showAuthMessage(message) {

  const element =
    document.getElementById(
      "authMessage"
    );


  if (element) {

    element.textContent =
      message;

  }

}


/* =========================================================
   MODAL CONTROL
========================================================= */

function setupModalEvents() {

  document.querySelectorAll(
    ".modal"
  ).forEach(modal => {

    modal.addEventListener(
      "click",
      event => {

        if (
          event.target === modal
        ) {

          modal.classList.remove(
            "show"
          );

          modal.setAttribute(
            "aria-hidden",
            "true"
          );

          document.body.classList.remove(
            "modal-open"
          );

        }

      }
    );

  });


  document.addEventListener(
    "keydown",
    event => {

      if (event.key === "Escape") {

        closeModal();

        closeAuthModal();

        closeProductModal();

      }

    }
  );

}


function closeModal() {

  const modal =
    document.getElementById(
      "mainModal"
    );


  if (!modal) return;


  modal.classList.remove(
    "show"
  );

  modal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove(
    "modal-open"
  );

}


function closeAuthModal() {

  const modal =
    document.getElementById(
      "authModal"
    );


  if (!modal) return;


  modal.classList.remove(
    "show"
  );

  modal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove(
    "modal-open"
  );

}


function closeProductModal() {

  const modal =
    document.getElementById(
      "productModal"
    );


  if (!modal) return;


  modal.classList.remove(
    "show"
  );

  modal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove(
    "modal-open"
  );

}


/* =========================================================
   SECURITY / HTML HELPERS
========================================================= */

function escapeHtml(value) {

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


function escapeJs(value) {

  return String(value)
    .replaceAll("\\", "\\\\")
    .replaceAll("'", "\\'")
    .replaceAll('"', '\\"');

}


/* =========================================================
   GLOBAL FUNCTIONS
========================================================= */

window.openAuthModal =
  openAuthModal;

window.closeAuthModal =
  closeAuthModal;

window.openAccountDetails =
  openAccountDetails;

window.buyAccount =
  buyAccount;

window.openProductDetails =
  openProductDetails;

window.buyProduct =
  buyProduct;

window.closeProductModal =
  closeProductModal;

window.openTool =
  openTool;

window.closeModal =
  closeModal;

window.googleLogin =
  googleLogin;

window.forgotPassword =
  forgotPassword;

window.renderLoginForm =
  renderLoginForm;

window.renderSignupForm =
  renderSignupForm;
