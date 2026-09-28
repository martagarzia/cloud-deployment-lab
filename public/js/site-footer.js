/**
 * Simple footer shown at the bottom of every page.
 */
const siteFooter = {
  /**
   * Returns the path prefix for the current page.
   * @returns {string} An empty string on a root page, or "../" on a recipe page.
   */
  resolveBasePath: function ()
  {
    let pagePath;
    let basePath;

    pagePath = window.location.pathname;
    basePath = "";

    if (pagePath.indexOf("/ricette/") !== -1)
    {
      basePath = "../";
    }

    return (basePath);
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
   * Creates the footer element.
   * @returns {HTMLElement} The footer element.
   */
  createFooter: function ()
  {
    let basePath;
    let footerElement;
    let noticeElement;
    let creditElement;

    basePath = this.resolveBasePath();
    footerElement = document.createElement("footer");
    noticeElement = this.createNotice();
    creditElement = this.createCredit(basePath);

    footerElement.className = "site-footer";
    footerElement.appendChild(noticeElement);
    footerElement.appendChild(creditElement);

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
