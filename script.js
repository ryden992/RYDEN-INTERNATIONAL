/* =========================================================
   RYDEN INTERNATIONAL
   MAIN WEBSITE JAVASCRIPT
========================================================= */


/* =========================================================
   SETTINGS
========================================================= */

const WHATSAPP_NUMBER = "919233657553";

/*
  Fallback USD → INR rate.
  The website will try to load a newer rate automatically.
*/
let usdToInr = 97;

let currentCurrency = "INR";


/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const desktopNav = document.getElementById("desktopNav");

if (menuToggle && desktopNav) {

  menuToggle.addEventListener("click", () => {

    desktopNav.classList.toggle("show");

  });

}


/* Close mobile menu after clicking a link */

document.querySelectorAll(".desktop-nav a").forEach(link => {

  link.addEventListener("click", () => {

    if (desktopNav) {
      desktopNav.classList.remove("show");
    }

  });

});


/* =========================================================
   ACCOUNT SEARCH + FILTERS
========================================================= */

const accountSearch =
  document.getElementById("accountSearch");

const collectorFilter =
  document.getElementById("collectorFilter");

const priceFilter =
  document.getElementById("priceFilter");

const accountCards =
  document.querySelectorAll(".account-card");

const noResults =
  document.getElementById("noResults");


function filterAccounts() {

  const search =
    accountSearch
      ? accountSearch.value.toLowerCase().trim()
      : "";

  const collector =
    collectorFilter
      ? collectorFilter.value
      : "all";

  const price =
    priceFilter
      ? priceFilter.value
      : "all";


  let visibleAccounts = 0;


  accountCards.forEach(card => {

    const name =
      (card.dataset.name || "").toLowerCase();

    const cardCollector =
      card.dataset.collector || "";

    const cardPrice =
      Number(card.dataset.price || 0);


    /* SEARCH */

    let matchesSearch =
      name.includes(search);


    /* COLLECTOR FILTER */

    let matchesCollector = true;

    if (collector !== "all") {

      matchesCollector =
        cardCollector === collector;

    }


    /* PRICE FILTER */

    let matchesPrice = true;


    switch (price) {

      case "1-5":

        matchesPrice =
          cardPrice >= 1000 &&
          cardPrice < 5000;

        break;


      case "5-10":

        matchesPrice =
          cardPrice >= 5000 &&
          cardPrice < 10000;

        break;


      case "10-20":

        matchesPrice =
          cardPrice >= 10000 &&
          cardPrice < 20000;

        break;


      case "20-30":

        matchesPrice =
          cardPrice >= 20000 &&
          cardPrice < 30000;

        break;


      case "30-40":

        matchesPrice =
          cardPrice >= 30000 &&
          cardPrice < 40000;

        break;


      case "40-50":

        matchesPrice =
          cardPrice >= 40000 &&
          cardPrice < 50000;

        break;


      case "50-60":

        matchesPrice =
          cardPrice >= 50000 &&
          cardPrice < 60000;

        break;


      case "60-70":

        matchesPrice =
          cardPrice >= 60000 &&
          cardPrice < 70000;

        break;


      case "70-80":

        matchesPrice =
          cardPrice >= 70000 &&
          cardPrice < 80000;

        break;


      case "80-90":

        matchesPrice =
          cardPrice >= 80000 &&
          cardPrice < 90000;

        break;


      case "100+":

        matchesPrice =
          cardPrice >= 100000;

        break;


      default:

        matchesPrice = true;

    }


    const shouldShow =
      matchesSearch &&
      matchesCollector &&
      matchesPrice;


    if (shouldShow) {

      card.style.display = "";

      visibleAccounts++;

    } else {

      card.style.display = "none";

    }

  });


  if (noResults) {

    noResults.style.display =
      visibleAccounts === 0
        ? "block"
        : "none";

  }

}


if (accountSearch) {

  accountSearch.addEventListener(
    "input",
    filterAccounts
  );

}


if (collectorFilter) {

  collectorFilter.addEventListener(
    "change",
    filterAccounts
  );

}


if (priceFilter) {

  priceFilter.addEventListener(
    "change",
    filterAccounts
  );

}


/* =========================================================
   CURRENCY
========================================================= */

const inrButton =
  document.getElementById("inrButton");

const usdButton =
  document.getElementById("usdButton");


function formatINR(value) {

  return "₹" +
    Number(value).toLocaleString("en-IN");

}


function formatUSD(value) {

  return "$" +
    Number(value).toLocaleString(
      "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }
    );

}


function formatPrice(inrPrice) {

  const price =
    Number(inrPrice);


  if (currentCurrency === "USD") {

    return formatUSD(
      price / usdToInr
    );

  }


  return formatINR(price);

}


function updateAllPrices() {

  document
    .querySelectorAll(
      ".account-price, .pack-price"
    )
    .forEach(element => {

      const price =
        Number(element.dataset.price);

      element.textContent =
        formatPrice(price);

    });

}


function setCurrency(currency) {

  currentCurrency =
    currency;


  if (inrButton) {

    inrButton.classList.toggle(
      "active",
      currency === "INR"
    );

  }


  if (usdButton) {

    usdButton.classList.toggle(
      "active",
      currency === "USD"
    );

  }


  updateAllPrices();

}


if (inrButton) {

  inrButton.addEventListener(
    "click",
    () => setCurrency("INR")
  );

}


if (usdButton) {

  usdButton.addEventListener(
    "click",
    () => setCurrency("USD")
  );

}


/* =========================================================
   TRY TO GET CURRENT USD / INR RATE
========================================================= */

async function loadExchangeRate() {

  try {

    const response =
      await fetch(
        "https://api.frankfurter.app/latest?from=USD&to=INR"
      );


    if (!response.ok) {

      throw new Error(
        "Exchange rate request failed"
      );

    }


    const data =
      await response.json();


    if (
      data &&
      data.rates &&
      data.rates.INR
    ) {

      usdToInr =
        Number(data.rates.INR);

      updateAllPrices();

    }

  } catch (error) {

    /*
      If the exchange-rate service is unavailable,
      the website keeps using the fallback rate.
    */

    console.log(
      "Using fallback USD/INR rate."
    );

  }

}


/* =========================================================
   ACCOUNT DETAILS MODAL
========================================================= */

const modal =
  document.getElementById("mainModal");

const modalTitle =
  document.getElementById("modalTitle");

const modalContent =
  document.getElementById("modalContent");

const modalClose =
  document.getElementById("modalClose");


function openModal(
  title,
  content
) {

  if (!modal) return;


  modalTitle.textContent =
    title;


  modalContent.innerHTML =
    content;


  modal.classList.add("show");


  document.body.style.overflow =
    "hidden";

}


function closeModal() {

  if (!modal) return;


  modal.classList.remove("show");


  document.body.style.overflow =
    "";

}


if (modalClose) {

  modalClose.addEventListener(
    "click",
    closeModal
  );

}


if (modal) {

  modal.addEventListener(
    "click",
    event => {

      if (
        event.target === modal
      ) {

        closeModal();

      }

    }
  );

}


document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      closeModal();

    }

  }
);


/* =========================================================
   ACCOUNT DETAILS BUTTONS
========================================================= */

document
  .querySelectorAll(".account-details")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const title =
          button.dataset.title ||
          "MLBB Account";


        const price =
          Number(
            button.dataset.price || 0
          );


        const collector =
          button.dataset.collector ||
          "Premium Collector";


        const priceText =
          formatPrice(price);


        const whatsappMessage =
          encodeURIComponent(
            `Hello RYDEN INTERNATIONAL, I am interested in the ${title} account priced at ${priceText}.`
          );


        openModal(

          title,

          `
            <div style="
              margin-top:15px;
              display:grid;
              grid-template-columns:1fr 1fr;
              gap:10px;
            ">

              <div style="
                padding:15px;
                background:#091a2b;
                border:1px solid #173b58;
                border-radius:10px;
              ">
                <small style="color:#718aa3">
                  Price
                </small>

                <strong style="
                  display:block;
                  margin-top:5px;
                  color:#6dc5ff;
                  font-size:20px;
                ">
                  ${priceText}
                </strong>
              </div>


              <div style="
                padding:15px;
                background:#091a2b;
                border:1px solid #173b58;
                border-radius:10px;
              ">
                <small style="color:#718aa3">
                  Collector Level
                </small>

                <strong style="
                  display:block;
                  margin-top:5px;
                  font-size:17px;
                ">
                  ${collector}
                </strong>
              </div>

            </div>


            <div style="
              margin-top:12px;
              padding:15px;
              background:#091a2b;
              border:1px solid #173b58;
              border-radius:10px;
              color:#9ab0c5;
              line-height:1.6;
            ">

              🔐 Account details and availability
              will be confirmed directly with
              RYDEN INTERNATIONAL.

            </div>


            <a
              href="https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}"
              target="_blank"
              class="btn btn-whatsapp"
              style="
                width:100%;
                margin-top:15px;
              "
            >
              💬 Ask About This Account
            </a>
          `

        );

      }
    );

  });


/* =========================================================
   PLAYER NAME CHECK
========================================================= */

const checkPlayerButton =
  document.getElementById(
    "checkPlayerButton"
  );

const playerResult =
  document.getElementById(
    "playerResult"
  );


if (checkPlayerButton) {

  checkPlayerButton.addEventListener(
    "click",
    () => {

      const userId =
        document
          .getElementById("userId")
          ?.value
          .trim();


      const zoneId =
        document
          .getElementById("zoneId")
          ?.value
          .trim();


      if (!userId || !zoneId) {

        playerResult.textContent =
          "Please enter both User ID and Zone ID.";

        playerResult.style.color =
          "#d93025";

        return;

      }


      /*
        Real player-name lookup requires
        an approved backend/API.

        We do not fake a player name.
      */

      playerResult.textContent =
        "ID received. Player-name verification will be connected to the backend/API in the next stage.";

      playerResult.style.color =
        "#516579";

    }
  );

}


/* =========================================================
   BUY DIAMOND PACK
========================================================= */

document
  .querySelectorAll(".buy-pack")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const pack =
          button
            .closest(".pack-card");


        if (!pack) return;


        const packName =
          pack.dataset.pack;


        const price =
          Number(
            pack.dataset.price || 0
          );


        const userId =
          document
            .getElementById("userId")
            ?.value
            .trim();


        const zoneId =
          document
            .getElementById("zoneId")
            ?.value
            .trim();


        if (!userId || !zoneId) {

          alert(
            "Please enter your User ID and Zone ID first."
          );

          document
            .getElementById("userId")
            ?.focus();

          return;

        }


        const message =
          encodeURIComponent(

            `Hello RYDEN INTERNATIONAL,

I want to recharge:

Pack: ${packName}
Price: ${formatPrice(price)}

User ID: ${userId}
Zone ID: ${zoneId}`

          );


        window.open(

          `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,

          "_blank"

        );

      }
    );

  });


/* =========================================================
   TOOLS
========================================================= */

document
  .querySelectorAll(".tool-button")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const tool =
          button.dataset.tool;


        if (tool === "leaderboard") {

          openModal(

            "Monthly Leaderboard",

            `
              <div style="
                margin-top:15px;
                padding:20px;
                border-radius:12px;
                background:#091a2b;
                border:1px solid #173b58;
                color:#9bb0c5;
                line-height:1.6;
              ">

                🏆 The monthly leaderboard will
                display customers ranked by their
                total recharge amount.

                <br><br>

                Firebase/database integration is
                required before real customer data
                can appear here.

              </div>
            `

          );

        }


        if (tool === "history") {

          openModal(

            "Recharge History",

            `
              <div style="
                margin-top:15px;
                padding:20px;
                border-radius:12px;
                background:#091a2b;
                border:1px solid #173b58;
                color:#9bb0c5;
                line-height:1.6;
              ">

                🕒 Your recharge history will appear
                here after customer authentication
                and Firebase database integration
                are connected.

              </div>
            `

          );

        }

      }
    );

  });


/* =========================================================
   REGION CHECKER
========================================================= */

function openRegionChecker() {

  openModal(

    "MLBB Region Checker",

    `
      <p style="
        margin-top:10px;
        color:#8ca2b8;
        line-height:1.6;
      ">

        Enter your MLBB User ID and Zone ID.

      </p>


      <input
        id="regionUserId"
        class="input"
        type="text"
        placeholder="User ID"
        style="margin-top:15px;"
      >


      <input
        id="regionZoneId"
        class="input"
        type="text"
        placeholder="Zone ID / Server ID"
        style="margin-top:10px;"
      >


      <button
        id="regionCheckSubmit"
        class="btn btn-primary"
        style="
          width:100%;
          margin-top:10px;
        "
      >
        📍 Check Region
      </button>


      <p
        id="regionResult"
        style="
          margin-top:12px;
          color:#8ca2b8;
          line-height:1.5;
        "
      ></p>
    `

  );


  setTimeout(() => {

    const submit =
      document.getElementById(
        "regionCheckSubmit"
      );


    if (submit) {

      submit.addEventListener(
        "click",
        () => {

          const user =
            document
              .getElementById(
                "regionUserId"
              )
              ?.value
              .trim();


          const zone =
            document
              .getElementById(
                "regionZoneId"
              )
              ?.value
              .trim();


          const result =
            document.getElementById(
              "regionResult"
            );


          if (!user || !zone) {

            result.textContent =
              "Please enter both User ID and Zone ID.";

            result.style.color =
              "#ff7474";

            return;

          }


          result.textContent =
            "ID received. Real region lookup will be connected through the backend/API.";

          result.style.color =
            "#8ca2b8";

        }
      );

    }

  }, 50);

}


const regionButton =
  document.getElementById(
    "regionButton"
  );


if (regionButton) {

  regionButton.addEventListener(
    "click",
    openRegionChecker
  );

}


const mobileRegionButton =
  document.getElementById(
    "mobileRegionButton"
  );


if (mobileRegionButton) {

  mobileRegionButton.addEventListener(
    "click",
    event => {

      event.preventDefault();

      openRegionChecker();

    }
  );

}


/* =========================================================
   INITIALIZE
========================================================= */

updateAllPrices();

loadExchangeRate();


console.log(
  "RYDEN INTERNATIONAL website loaded successfully."
);
