/**
 * Points the recipe back link at the homepage filter that opened the page.
 * The active cook is kept in the cuoco query parameter.
 */
const recipeBackLink = {
  /**
   * Checks whether the cook name is one of the site cooks.
   * @param {string} cookName The cook name from an address.
   * @returns {boolean} True when the name is mamma or papa.
   */
  isKnownCook: function (cookName)
  {
    let isKnown;

    isKnown = false;

    if (cookName == "mamma")
    {
      isKnown = true;
    }

    if (cookName == "papa")
    {
      isKnown = true;
    }

    return (isKnown);
  },

  /**
   * Keeps a cook name only when it belongs to the site.
   * @param {string} cookName The cook name from an address.
   * @returns {string} The cook name, or an empty string.
   */
  keepKnownCook: function (cookName)
  {
    let knownCook;

    knownCook = cookName;

    if (this.isKnownCook(cookName) == false)
    {
      knownCook = "";
    }

    return (knownCook);
  },

  /**
   * Reads the cook name stored in a page address.
   * @param {string} pageAddress The address that may contain cuoco.
   * @returns {string} The cook name, or an empty string when it is missing.
   */
  readCookFromAddress: function (pageAddress)
  {
    let pageUrl;
    let cookName;

    pageUrl = new URL(pageAddress);
    cookName = "";

    if (pageUrl.searchParams.get("cuoco") != null)
    {
      cookName = pageUrl.searchParams.get("cuoco");
    }

    return (cookName);
  },

  /**
   * Checks whether a path is the homepage.
   * @param {string} pathname The path of the previous page.
   * @returns {boolean} True when the path is the recipe list.
   */
  isHomePath: function (pathname)
  {
    let isHome;

    isHome = false;

    if (pathname.endsWith("/index.html") == true)
    {
      isHome = true;
    }

    if (pathname.endsWith("/") == true)
    {
      isHome = true;
    }

    return (isHome);
  },

  /**
   * Reads the cook filter stored on this recipe page.
   * @returns {string} A known cook, or an empty string.
   */
  readPageCook: function ()
  {
    let cookName;

    cookName = this.readCookFromAddress(window.location.href);
    cookName = this.keepKnownCook(cookName);

    return (cookName);
  },

  /**
   * Reads the cook filter from the homepage that opened this recipe.
   * @returns {string} A known cook, or an empty string.
   */
  readReferrerCook: function ()
  {
    let referrerAddress;
    let pageUrl;
    let cookName;

    referrerAddress = document.referrer;
    pageUrl = null;
    cookName = "";

    if (referrerAddress != "")
    {
      pageUrl = new URL(referrerAddress);
      cookName = this.readCookFromAddress(referrerAddress);

      if (this.isHomePath(pageUrl.pathname) == false)
      {
        cookName = "";
      }
    }

    cookName = this.keepKnownCook(cookName);

    return (cookName);
  },

  /**
   * Returns the cook filter that should survive the trip back home.
   * @returns {string} A known cook, or an empty string.
   */
  readActiveCook: function ()
  {
    let cookName;

    cookName = this.readPageCook();

    if (cookName == "")
    {
      cookName = this.readReferrerCook();
    }

    return (cookName);
  },

  /**
   * Builds the homepage address for the active cook.
   * @param {string} homeHref The current back link address.
   * @param {string} cookName The active cook, or an empty string.
   * @returns {string} The back link address, with cuoco when a cook is active.
   */
  buildHomeHref: function (homeHref, cookName)
  {
    let nextHref;

    nextHref = homeHref;

    if (cookName != "")
    {
      nextHref = homeHref + "?cuoco=" + cookName;
    }

    return (nextHref);
  },

  /**
   * Writes the active cook into one back link.
   * @param {HTMLElement} linkElement The back link.
   * @param {string} cookName The active cook, or an empty string.
   * @returns {void}
   */
  applyCook: function (linkElement, cookName)
  {
    let homeHref;
    let nextHref;

    homeHref = linkElement.getAttribute("href");
    nextHref = "";

    if (homeHref != null)
    {
      nextHref = this.buildHomeHref(homeHref, cookName);
      linkElement.setAttribute("href", nextHref);
    }
  },

  /**
   * Points the back link at the homepage filter that opened the page.
   * @returns {void}
   */
  insert: function ()
  {
    let linkElement;
    let cookName;

    linkElement = document.querySelector(".back-link");
    cookName = this.readActiveCook();

    if (linkElement != null)
    {
      if (cookName != "")
      {
        this.applyCook(linkElement, cookName);
      }
    }
  }
};

document.addEventListener("DOMContentLoaded", function ()
{
  recipeBackLink.insert();
});
