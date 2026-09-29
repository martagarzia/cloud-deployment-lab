/**
 * Simple footer shown at the bottom of every page.
 */
const siteFooter = {
  /**
   * Returns the path prefix for the current page.
   * Root-absolute paths keep the footer working on the 404 page too.
   * @returns {string} A slash, so every link starts from the site root.
   */
  resolveBasePath: function ()
  {
    let basePath;

    basePath = "/";

    return (basePath);
  },

  /**
   * Checks whether the current page is Marta's page.
   * @returns {boolean} True on the page about Marta.
   */
  isMartaPage: function ()
  {
    let pagePath;
    let isMarta;

    pagePath = window.location.pathname;
    isMarta = false;

    if (pagePath.indexOf("marta.html") !== -1)
    {
      isMarta = true;
    }

    return (isMarta);
  },

  /**
   * Creates the portrait link to Marta's page.
   * @param {string} basePath The path prefix for the current page.
   * @returns {HTMLElement} The portrait link.
   */
  createCreditLink: function (basePath)
  {
    let creditLinkElement;
    let imageElement;

    creditLinkElement = document.createElement("a");
    imageElement = document.createElement("img");

    creditLinkElement.className = "site-footer-avatar-link";
    creditLinkElement.href = basePath + "marta.html";
    imageElement.className = "site-footer-avatar";
    imageElement.src = basePath + "images/marta.jpg";
    imageElement.width = 1024;
    imageElement.height = 878;
    imageElement.loading = "lazy";
    imageElement.alt = "Marta";
    creditLinkElement.appendChild(imageElement);

    return (creditLinkElement);
  },

  /**
   * Creates the line that asks who made the site.
   * @param {string} basePath The path prefix for the current page.
   * @returns {HTMLElement} The credit line.
   */
  createCredit: function (basePath)
  {
    let creditElement;
    let textElement;
    let creditLinkElement;

    creditElement = document.createElement("p");
    textElement = document.createElement("span");
    creditLinkElement = this.createCreditLink(basePath);

    creditElement.className = "site-footer-credit";
    textElement.className = "site-footer-question";
    textElement.textContent = "Chi ha fatto questo sito?";
    creditElement.appendChild(textElement);
    creditElement.appendChild(creditLinkElement);

    return (creditElement);
  },

  /**
   * Creates the copyright line.
   * @returns {HTMLElement} The copyright line.
   */
  createNotice: function ()
  {
    let noticeElement;

    noticeElement = document.createElement("p");
    noticeElement.className = "site-footer-notice";
    noticeElement.textContent = "© 2026 Le mie ricette";

    return (noticeElement);
  },

  /**
   * Adds the credit line on every page except Marta's page.
   * @param {HTMLElement} footerElement The footer element.
   * @param {boolean} isMartaPage True when the credit would point at the open page.
   * @returns {void}
   */
  appendCredit: function (footerElement, isMartaPage)
  {
    let basePath;
    let creditElement;

    basePath = this.resolveBasePath();
    creditElement = null;

    if (isMartaPage == false)
    {
      creditElement = this.createCredit(basePath);
      footerElement.appendChild(creditElement);
    }
  },

  /**
   * Creates the footer element.
   * @returns {HTMLElement} The footer element.
   */
  createFooter: function ()
  {
    let footerElement;
    let noticeElement;
    let isMartaPage;

    footerElement = document.createElement("footer");
    noticeElement = this.createNotice();
    isMartaPage = this.isMartaPage();

    footerElement.className = "site-footer";
    footerElement.appendChild(noticeElement);
    this.appendCredit(footerElement, isMartaPage);

    return (footerElement);
  },

  /**
   * Inserts the footer at the bottom of the page.
   * @returns {void}
   */
  insert: function ()
  {
    let footerElement;

    footerElement = this.createFooter();
    document.body.appendChild(footerElement);
  }
};

document.addEventListener("DOMContentLoaded", function ()
{
  siteFooter.insert();
});
