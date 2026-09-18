/* ============================================================
   Liora AI — cookie consent banner + gated Google Analytics 4
   Loaded on every page. Analytics only fires after explicit
   "Accepter" click (RGPD/ePrivacy: no tracking cookie before consent).
   ============================================================ */
(function () {
  "use strict";

  var CONSENT_KEY = "liora_consent_v1";

  // TODO: remplacez par votre ID de mesure Google Analytics 4 (format G-XXXXXXXXXX).
  // Tant que ce placeholder n'est pas remplacé, aucun script GA n'est chargé
  // (le bandeau fonctionne, mais rien n'est envoyé à Google).
  var GA_MEASUREMENT_ID = "G-XXXXXXXXXX";

  function getStored() {
    try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
  }
  function setStored(value) {
    try { localStorage.setItem(CONSENT_KEY, value); } catch (e) { /* ignore (private mode) */ }
  }

  function loadAnalytics() {
    if (window.__liora_ga_loaded) return;
    if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID.indexOf("XXXX") !== -1) return; // placeholder not configured
    window.__liora_ga_loaded = true;

    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true, cookie_flags: "SameSite=None;Secure" });
  }

  function banner() { return document.getElementById("cookie-banner"); }
  function showBanner() { var b = banner(); if (b) b.hidden = false; }
  function hideBanner() { var b = banner(); if (b) b.hidden = true; }

  function applyConsent(value) {
    setStored(value);
    if (value === "accepted") loadAnalytics();
    hideBanner();
  }

  function init() {
    var stored = getStored();
    if (stored === "accepted") {
      loadAnalytics();
    } else if (stored !== "rejected") {
      showBanner();
    }

    var acceptBtn = document.getElementById("cookie-accept");
    var rejectBtn = document.getElementById("cookie-refuse");
    var manageLink = document.getElementById("manage-cookies");

    if (acceptBtn) acceptBtn.addEventListener("click", function () { applyConsent("accepted"); });
    if (rejectBtn) rejectBtn.addEventListener("click", function () { applyConsent("rejected"); });
    if (manageLink) manageLink.addEventListener("click", function (e) { e.preventDefault(); showBanner(); });

    // Mobile nav (hamburger) toggle
    var navToggle = document.getElementById("nav-toggle");
    var navLinks = document.getElementById("nav-links");
    if (navToggle && navLinks) {
      navToggle.addEventListener("click", function () {
        var open = navLinks.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      Array.prototype.forEach.call(navLinks.querySelectorAll("a"), function (a) {
        a.addEventListener("click", function () {
          navLinks.classList.remove("open");
          navToggle.setAttribute("aria-expanded", "false");
        });
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
