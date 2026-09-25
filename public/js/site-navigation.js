/**
 * Reusable navigation bar shown at the top of every page.
 */
const siteNavigation = {
  /**
   * Returns the path prefix for the current page.
   * @returns {string} An empty string on the home page, or "../" on a recipe page.
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
   * Creates the home link with the site logo.
   * @param {string} basePath The path prefix for the current page.
   * @returns {HTMLElement} The home link.
   */
  createHomeLink: function (basePath)
  {
    let homeLinkElement;
    let logoElement;

    homeLinkElement = document.createElement("a");
    logoElement = document.createElement("img");

    homeLinkElement.className = "site-nav-home";
    homeLinkElement.href = basePath + "index.html";
    logoElement.className = "site-logo";
    logoElement.src = basePath + "images/Le_mie_ricette.jpg";
    logoElement.alt = "Le mie ricette";
    homeLinkElement.appendChild(logoElement);

    return (homeLinkElement);
  },

  /**
   * Creates the link to the cooks page.
   * @param {string} basePath The path prefix for the current page.
   * @returns {HTMLElement} The cooks link.
   */
  createCooksLink: function (basePath)
  {
    let cooksLinkElement;
    let imageElement;

    cooksLinkElement = document.createElement("a");
    imageElement = document.createElement("img");

    cooksLinkElement.className = "site-nav-cooks";
    cooksLinkElement.href = basePath + "cuochi.html";
    imageElement.className = "site-nav-cooks-image";
    imageElement.src = basePath + "images/cuochi.jpg";
    imageElement.alt = "Cuochi";
    cooksLinkElement.appendChild(imageElement);

    return (cooksLinkElement);
  },

  /**
   * Creates the navigation bar element.
   * @returns {HTMLElement} The navigation element.
   */
  createNavigation: function ()
  {
    let basePath;
    let navigationElement;
    let homeLinkElement;
    let cooksLinkElement;

    basePath = this.resolveBasePath();
    navigationElement = document.createElement("nav");
    homeLinkElement = this.createHomeLink(basePath);
    cooksLinkElement = this.createCooksLink(basePath);

    navigationElement.className = "site-nav";
    navigationElement.appendChild(homeLinkElement);
    navigationElement.appendChild(cooksLinkElement);

    return (navigationElement);
  },

  /**
   * Inserts the navigation bar at the top of the page.
   * @returns {void}
   */
  insert: function ()
  {
    let navigationElement;

    navigationElement = this.createNavigation();
    document.body.insertBefore(navigationElement, document.body.firstChild);
  }
};

document.addEventListener("DOMContentLoaded", function ()
{
  siteNavigation.insert();
});
