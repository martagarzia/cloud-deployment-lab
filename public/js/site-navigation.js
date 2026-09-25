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
   * Creates the navigation bar element.
   * @returns {HTMLElement} The navigation element.
   */
  createNavigation: function ()
  {
    let basePath;
    let navigationElement;
    let homeLinkElement;
    let logoElement;

    basePath = this.resolveBasePath();
    navigationElement = document.createElement("nav");
    homeLinkElement = document.createElement("a");
    logoElement = document.createElement("img");

    navigationElement.className = "site-nav";
    homeLinkElement.href = basePath + "index.html";
    logoElement.className = "site-logo";
    logoElement.src = basePath + "images/Le_mie_ricette.jpg";
    logoElement.alt = "Le mie ricette";
    homeLinkElement.appendChild(logoElement);
    navigationElement.appendChild(homeLinkElement);

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
