/* RYDEN INTERNATIONAL — Firebase Authentication
 * Phone OTP protection: Firebase reCAPTCHA + Firebase server quotas,
 * plus a 60-second resend cooldown and a browser-side 5-send/hour UX limit.
 * Browser-side limits are not a security boundary; Firebase enforces server quotas.
 */
(function () {
  "use strict";

  if (!window.firebase || !window.firebase.apps || !window.firebase.apps.length) {
    console.error("RYDEN Auth: Firebase SDK/config is not available.");
    return;
  }

  var auth = window.firebase.auth();
  auth.useDeviceLanguage();

  var COOLDOWN_MS = 60 * 1000;
  var WINDOW_MS = 60 * 60 * 1000;
  var MAX_SENDS_PER_HOUR = 5;
  var STORAGE_KEY = "rydenOtpSendTimesV1";
  var confirmation = null;
  var verifier = null;
  var timer = null;

  function friendlyError(error) {
    var map = {
      "auth/email-already-in-use": "An account already exists with this email. Try logging in.",
      "auth/invalid-email": "Enter a valid email address.",
      "auth/invalid-credential": "Email or password is incorrect.",
      "auth/user-disabled": "This account is disabled. Please contact support.",
      "auth/weak-password": "Choose a stronger password with at least 8 characters.",
      "auth/popup-closed-by-user": "Google sign-in was closed before it finished.",
      "auth/popup-blocked": "Your browser blocked the Google sign-in popup.",
      "auth/too-many-requests": "Firebase temporarily limited requests for safety. Wait before trying again.",
      "auth/quota-exceeded": "The SMS quota has been reached. Please try later.",
      "auth/invalid-phone-number": "Enter a valid international phone number, e.g. +919876543210.",
      "auth/missing-phone-number": "Enter your phone number with country code.",
      "auth/captcha-check-failed": "Security verification failed. Refresh the page and try again.",
      "auth/invalid-verification-code": "That OTP is incorrect. Check the SMS and try again.",
      "auth/code-expired": "That OTP expired. Wait for the resend timer before requesting another.",
      "auth/network-request-failed": "Network error. Check your internet connection."
    };
    return map[error && error.code] || "Authentication failed. Please try again later.";
  }

  function showMessage(message, isError) {
    var node = document.getElementById("rydenAuthMessage");
    if (!node) return;
    node.textContent = message;
    node.dataset.kind = isError ? "error" : "info";
  }

  function readSendTimes() {
    var values = [];
    try { values = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch (_) {}
    if (!Array.isArray(values)) values = [];
    var now = Date.now();
    return values.filter(function (value) {
      return typeof value === "number" && now - value < WINDOW_MS;
    });
  }

  function recordSendAttempt(timestamp) {
    var values = readSendTimes();
    values.push(timestamp);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(values)); } catch (_) {}
  }

  function clearVerifier() {
    if (verifier) {
      try { verifier.clear(); } catch (_) {}
      verifier = null;
    }
  }

  function getVerifier() {
    if (!verifier) {
      verifier = new window.firebase.auth.RecaptchaVerifier("ryden-recaptcha-container", {
        size: "invisible"
      });
    }
    return verifier;
  }

  function updateCooldown() {
    var button = document.getElementById("rydenSendOtp");
    if (!button) {
      if (timer) window.clearInterval(timer);
      timer = null;
      return;
    }

    var times = readSendTimes();
    var now = Date.now();
    var latest = times.length ? times[times.length - 1] : 0;
    var cooldownLeft = Math.max(0, latest + COOLDOWN_MS - now);
    var hourlyLeft = times.length >= MAX_SENDS_PER_HOUR
      ? Math.max(0, times[0] + WINDOW_MS - now)
      : 0;

    if (hourlyLeft > 0) {
      button.disabled = true;
      button.textContent = "SMS limit reached (" + Math.ceil(hourlyLeft / 60000) + " min)";
    } else if (cooldownLeft > 0) {
      button.disabled = true;
      button.textContent = "Resend in " + Math.ceil(cooldownLeft / 1000) + "s";
    } else {
      button.disabled = false;
      button.textContent = confirmation ? "Resend OTP" : "Send OTP";
      if (timer) window.clearInterval(timer);
      timer = null;
    }
  }

  function beginCooldown() {
    if (timer) window.clearInterval(timer);
    updateCooldown();
    timer = window.setInterval(updateCooldown, 1000);
  }

  function openAuth(mode) {
    var title = document.getElementById("infoTitle");
    var content = document.getElementById("infoContent");
    if (!title || !content) return;

    if (mode === "phone") {
      title.textContent = "Phone Login";
      confirmation = null;
      clearVerifier();
      content.innerHTML =
        '<div class="auth-panel">' +
          '<section class="auth-brand-intro" aria-label="RYDEN INTERNATIONAL secure sign-in">' +
            '<img class="auth-brand-logo" src="./store-logo.jpg" alt="RYDEN INTERNATIONAL logo" width="44" height="44" decoding="async">' +
            '<p class="auth-brand-kicker">SECURE SIGN-IN</p>' +
            '<h3 class="auth-brand-name">RYDEN <span>INTERNATIONAL</span></h3>' +
          '</section>' +
          '<p class="info-message">Enter your full phone number with country code, for example +919876543210. Wait 60 seconds before resending. Requests are limited to help prevent abuse.</p>' +
          '<form class="info-form" id="rydenPhoneForm">' +
            '<label>Phone Number<input id="rydenPhoneNumber" type="tel" required autocomplete="tel" inputmode="tel" placeholder="+919876543210"></label>' +
            '<button class="modal-action" id="rydenSendOtp" type="button">Send OTP</button>' +
            '<label>6-digit Verification Code<input id="rydenOtpCode" type="text" inputmode="numeric" autocomplete="one-time-code" pattern="[0-9]{6}" maxlength="6" placeholder="Enter OTP" disabled></label>' +
            '<button class="modal-action" id="rydenVerifyOtp" type="submit" disabled>Verify &amp; Login</button>' +
            '<button class="text-action" id="rydenBackToLogin" type="button">Back to Login</button>' +
            '<p id="rydenAuthMessage" class="info-message" role="status" aria-live="polite"></p>' +
            '<div id="ryden-recaptcha-container"></div>' +
          '</form>' +
        '</div>';

      document.getElementById("rydenSendOtp").addEventListener("click", async function () {
        var phone = document.getElementById("rydenPhoneNumber").value.trim();
        var times = readSendTimes();
        var now = Date.now();
        var latest = times.length ? times[times.length - 1] : 0;

        if (!/^\+[1-9]\d{7,14}$/.test(phone)) {
          showMessage("Enter a valid international number, including + and country code.", true);
          return;
        }
        if (now - latest < COOLDOWN_MS) {
          showMessage("Please wait for the resend timer before requesting another SMS.", true);
          beginCooldown();
          return;
        }
        if (times.length >= MAX_SENDS_PER_HOUR) {
          showMessage("This browser reached its SMS request limit. Please wait before trying again.", true);
          beginCooldown();
          return;
        }

        var sendButton = document.getElementById("rydenSendOtp");
        sendButton.disabled = true;
        sendButton.textContent = "Sending…";
        /* Count attempts before the network call so repeated failures are also slowed down.
           This browser-side guard is supplementary; Firebase enforces server-side quotas. */
        recordSendAttempt(now);
        beginCooldown();

        try {
          confirmation = await auth.signInWithPhoneNumber(phone, getVerifier());
          document.getElementById("rydenOtpCode").disabled = false;
          document.getElementById("rydenVerifyOtp").disabled = false;
          showMessage("SMS requested. Enter the OTP if it arrives; wait for the timer before resending.", false);
        } catch (error) {
          clearVerifier();
          showMessage(friendlyError(error), true);
        } finally {
          updateCooldown();
        }
      });

      document.getElementById("rydenPhoneForm").addEventListener("submit", async function (event) {
        event.preventDefault();
        if (!confirmation) {
          showMessage("Request an OTP first.", true);
          return;
        }
        var code = document.getElementById("rydenOtpCode").value.trim();
        if (!/^\d{6}$/.test(code)) {
          showMessage("Enter the 6-digit OTP.", true);
          return;
        }
        var button = document.getElementById("rydenVerifyOtp");
        button.disabled = true;
        try {
          await confirmation.confirm(code);
          showMessage("Phone verified. You are signed in.", false);
          window.setTimeout(function () {
            var dialog = document.getElementById("infoDialog");
            if (dialog && dialog.open) dialog.close();
          }, 500);
        } catch (error) {
          showMessage(friendlyError(error), true);
          button.disabled = false;
        }
      });

      document.getElementById("rydenBackToLogin").addEventListener("click", function () {
        if (timer) window.clearInterval(timer);
        timer = null;
        clearVerifier();
        openAuth("login");
      });
      beginCooldown();
      return;
    }

    var isRegister = mode === "register";
    var isForgot = mode === "forgot";
    title.textContent = isForgot ? "Reset Password" : isRegister ? "Create Account" : "Login / Account";

    if (isForgot) {
      content.innerHTML =
        '<div class="auth-panel"><p class="info-message">Enter your registered email. For privacy, the response will not reveal whether an account exists.</p>' +
        '<form class="info-form" id="rydenResetForm"><label>Email Address<input id="rydenResetEmail" type="email" required autocomplete="email" placeholder="Enter your email"></label>' +
        '<button class="modal-action" type="submit">Send Reset Link</button><button class="text-action" id="rydenBackToLogin" type="button">Back to Login</button>' +
        '<p id="rydenAuthMessage" class="info-message" role="status" aria-live="polite"></p></form></div>';
      document.getElementById("rydenResetForm").addEventListener("submit", async function (event) {
        event.preventDefault();
        var button = event.currentTarget.querySelector('[type="submit"]');
        button.disabled = true;
        try {
          await auth.sendPasswordResetEmail(document.getElementById("rydenResetEmail").value.trim().toLowerCase());
          showMessage("If an account exists for that email, a reset email will be sent.", false);
        } catch (error) {
          showMessage(friendlyError(error), true);
        } finally { button.disabled = false; }
      });
      document.getElementById("rydenBackToLogin").addEventListener("click", function () { openAuth("login"); });
      return;
    }

    content.innerHTML =
      '<div class="auth-panel">' +
        '<section class="auth-brand-intro" aria-label="RYDEN INTERNATIONAL digital gaming services">' +
          '<img class="auth-brand-logo" src="./store-logo.jpg" alt="RYDEN INTERNATIONAL logo" width="44" height="44" decoding="async">' +
          '<p class="auth-brand-kicker">WELCOME TO</p><h3 class="auth-brand-name">RYDEN <span>INTERNATIONAL</span></h3>' +
          '<p class="auth-brand-tagline">MLBB Accounts &amp; Diamond Gaming Services</p>' +
          '<p class="auth-brand-categories">PUBG / BGMI <span>•</span> Game Top-Ups <span>•</span> Subscriptions <span>•</span> Gift Cards</p>' +
        '</section>' +
        '<p class="info-message auth-welcome-message">' + (isRegister ? "Create your RYDEN INTERNATIONAL account." : "Sign in to your RYDEN INTERNATIONAL account.") + '</p>' +
        '<form class="info-form" id="rydenEmailForm">' +
          (isRegister ? '<label>Full Name<input id="rydenName" type="text" required maxlength="80" autocomplete="name" placeholder="Enter your name"></label>' : '') +
          '<label>Email Address<input id="rydenEmail" type="email" required maxlength="254" autocomplete="email" placeholder="Enter your email"></label>' +
          '<label>Password<input id="rydenPassword" type="password" required minlength="8" maxlength="128" autocomplete="' + (isRegister ? "new-password" : "current-password") + '" placeholder="At least 8 characters"></label>' +
          (isRegister ? '<label>Confirm Password<input id="rydenConfirmPassword" type="password" required minlength="8" maxlength="128" autocomplete="new-password" placeholder="Confirm password"></label>' : '<button class="text-action" id="rydenForgot" type="button">Forgot Password?</button>') +
          '<button class="modal-action" type="submit">' + (isRegister ? "Create Account" : "Login") + '</button>' +
        '</form>' +
        '<div class="auth-divider">OR</div>' +
        '<button class="modal-action google-login-button" id="rydenGoogleLogin" type="button">Continue with Google</button>' +
        '<button class="modal-action" id="rydenPhoneLogin" type="button">Continue with Phone / OTP</button>' +
        '<p class="info-message">' + (isRegister ? "Already have an account?" : "New to RYDEN INTERNATIONAL?") + ' <button class="text-action" id="rydenSwitchMode" type="button">' + (isRegister ? "Login" : "Register") + '</button></p>' +
        '<p class="auth-notice">Firebase secures authentication. Never share your password or OTP.</p>' +
        '<p id="rydenAuthMessage" class="info-message" role="status" aria-live="polite"></p>' +
      '</div>';

    document.getElementById("rydenEmailForm").addEventListener("submit", async function (event) {
      event.preventDefault();
      var button = event.currentTarget.querySelector('[type="submit"]');
      var email = document.getElementById("rydenEmail").value.trim().toLowerCase();
      var password = document.getElementById("rydenPassword").value;
      button.disabled = true;
      try {
        if (isRegister) {
          if (password.length < 8) throw new Error("Use a password with at least 8 characters.");
          if (password !== document.getElementById("rydenConfirmPassword").value) throw new Error("Passwords do not match.");
          var credential = await auth.createUserWithEmailAndPassword(email, password);
          var name = document.getElementById("rydenName").value.trim();
          if (name) await credential.user.updateProfile({ displayName: name });
          showMessage("Account created successfully. You are signed in.", false);
        } else {
          await auth.signInWithEmailAndPassword(email, password);
          showMessage("Login successful.", false);
        }
        window.setTimeout(function () {
          var dialog = document.getElementById("infoDialog");
          if (dialog && dialog.open) dialog.close();
        }, 500);
      } catch (error) {
        showMessage(error && error.code ? friendlyError(error) : error.message || "Authentication failed.", true);
      } finally { button.disabled = false; }
    });

    document.getElementById("rydenGoogleLogin").addEventListener("click", async function (event) {
      var button = event.currentTarget;
      button.disabled = true;
      try {
        await auth.signInWithPopup(new window.firebase.auth.GoogleAuthProvider());
        var dialog = document.getElementById("infoDialog");
        if (dialog && dialog.open) dialog.close();
      } catch (error) {
        showMessage(friendlyError(error), true);
      } finally { button.disabled = false; }
    });

    document.getElementById("rydenPhoneLogin").addEventListener("click", function () { openAuth("phone"); });
    document.getElementById("rydenSwitchMode").addEventListener("click", function () { openAuth(isRegister ? "login" : "register"); });
    if (!isRegister) {
      document.getElementById("rydenForgot").addEventListener("click", function () { openAuth("forgot"); });
    }
  }

  /* Replace the existing placeholder renderer without changing the store UI or catalog code. */
  window.renderLoginForm = openAuth;

  auth.onAuthStateChanged(function (user) {
    var button = document.getElementById("loginButton");
    if (button) {
      var label = button.querySelector("span");
      if (label) label.textContent = user ? (user.displayName || "Account") : "Login";
      button.setAttribute("aria-label", user ? "Signed in account" : "Login");
    }
  });
})();