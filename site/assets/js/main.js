/* ==========================================================================
   Rangmandap — shared header/footer injection + interactions
   ========================================================================== */

const TICKETS_URL = "https://rangmandap.com";
const LOGO = "assets/images/events/gray-logo-removebg.png";

function headerHTML(page) {
  const link = (p, key, file) =>
    `<a href="${file}" data-i18n="nav.${key}"${page === p ? ' class="active"' : ""}></a>`;
  return `
  <header class="site-header">
    <div class="container">
      <a class="brand" href="index.html">
        <img src="${LOGO}" alt="Rangmandap logo">
        <span>Rangmandap</span>
      </a>
      <nav class="nav" id="nav">
        ${link("experience", "experience", "experience.html")}
        ${link("contribute", "contribute", "contribute.html")}
        ${link("about", "about", "about.html")}
        ${link("contact", "contact", "contact.html")}
      </nav>
      <div class="header-actions">
        <div class="lang" role="group" aria-label="Language">
          <button type="button" data-lang="en">EN</button>
          <button type="button" data-lang="hi">हिं</button>
          <button type="button" data-lang="mr">मरा</button>
        </div>
        <a class="btn" href="${TICKETS_URL}" target="_blank" rel="noopener" data-i18n="cta.tickets"></a>
        <button class="menu-toggle" id="menuToggle" aria-label="Menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>`;
}

function footerHTML() {
  return `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-top">
        <div>
          <div class="footer-brand">Rangmandap</div>
          <p data-i18n="footer.tagline" style="color:#cdbfae"></p>
          <div class="socials">
            <a href="https://facebook.com" target="_blank" rel="noopener">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener">Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noopener">Twitter</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener">LinkedIn</a>
          </div>
        </div>
        <div class="footer-col">
          <h4 data-i18n="footer.explore"></h4>
          <ul>
            <li><a href="experience.html" data-i18n="nav.experience"></a></li>
            <li><a href="contribute.html" data-i18n="nav.contribute"></a></li>
            <li><a href="about.html" data-i18n="nav.about"></a></li>
            <li><a href="contact.html" data-i18n="nav.contact"></a></li>
            <li><a href="${TICKETS_URL}" target="_blank" rel="noopener" data-i18n="cta.tickets"></a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4 data-i18n="footer.visit"></h4>
          <ul>
            <li data-i18n="contact.addr.body"></li>
            <li><a href="tel:+918551838731">+91 85518 38731</a></li>
            <li><a href="mailto:payments@nirupak.org">payments@nirupak.org</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span data-i18n="footer.rights"></span>
        <span>
          <a href="#" data-i18n="footer.privacy"></a> ·
          <a href="#" data-i18n="footer.terms"></a> ·
          <a href="#" data-i18n="footer.refund"></a>
        </span>
      </div>
    </div>
  </footer>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page || "home";

  const headerMount = document.getElementById("site-header");
  const footerMount = document.getElementById("site-footer");
  if (headerMount) headerMount.outerHTML = headerHTML(page);
  if (footerMount) footerMount.outerHTML = footerHTML();

  // language
  const { getLang, applyLang } = window.RM_I18N;
  applyLang(getLang());
  document.querySelectorAll(".lang button").forEach((b) => {
    b.addEventListener("click", () => applyLang(b.dataset.lang));
  });

  // mobile menu
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }
});
