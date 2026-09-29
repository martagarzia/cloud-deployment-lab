/**
 * Filters the homepage recipe list by cook.
 * The active cook is kept in the cuoco query parameter.
 */
const recipeFilter = {
  /**
   * Reads the cook name stored on a filter button.
   * @param {HTMLElement} buttonElement The clicked filter button.
   * @returns {string} The cook name, or an empty string when it is missing.
   */
  readCookName: function (buttonElement)
  {
    let cookName;

    cookName = "";

    if (buttonElement.dataset.cook != null)
    {
      cookName = buttonElement.dataset.cook;
    }

    return (cookName);
  },

  /**
   * Reads the cook name stored in the page address.
   * @returns {string} The cook name, or an empty string when it is missing.
   */
  readCookFromUrl: function ()
  {
    let params;
    let cookName;

    params = new URLSearchParams(window.location.search);
    cookName = "";

    if (params.get("cuoco") != null)
    {
      cookName = params.get("cuoco");
    }

    return (cookName);
  },

  /**
   * Checks whether the cook name is one of the site cooks.
   * @param {string} cookName The cook name from the address or a button.
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
   * Returns the cook that should filter the list.
   * @returns {string} A known cook, or an empty string to show every recipe.
   */
  readActiveCook: function ()
  {
    let cookName;

    cookName = this.readCookFromUrl();

    if (this.isKnownCook(cookName) == false)
    {
      cookName = "";
    }

    return (cookName);
  },

  /**
   * Writes the active cook into the page address.
   * @param {string} cookName The active cook, or an empty string.
   * @returns {void}
   */
  writeCookToUrl: function (cookName)
  {
    let pageUrl;
    let nextPath;

    pageUrl = new URL(window.location.href);
    nextPath = "";

    if (cookName != "")
    {
      pageUrl.searchParams.set("cuoco", cookName);
    }

    if (cookName == "")
    {
      pageUrl.searchParams.delete("cuoco");
    }

    nextPath = pageUrl.pathname + pageUrl.search;
    window.history.pushState({ cook: cookName }, "", nextPath);
  },

  /**
   * Clears the selected state of one filter button.
   * @param {HTMLElement} buttonElement The filter button.
   * @returns {void}
   */
  clearButton: function (buttonElement)
  {
    buttonElement.classList.remove("is-selected");
    buttonElement.setAttribute("aria-pressed", "false");
  },

  /**
   * Selects a filter button when it matches the active cook.
   * @param {HTMLElement} buttonElement The filter button.
   * @param {string} cookName The active cook, or an empty string.
   * @returns {void}
   */
  selectButton: function (buttonElement, cookName)
  {
    let buttonCook;
    let isSelected;

    buttonCook = buttonElement.dataset.cook;
    isSelected = false;

    this.clearButton(buttonElement);

    if (buttonCook == cookName)
    {
      if (cookName != "")
      {
        isSelected = true;
      }
    }

    if (isSelected == true)
    {
      buttonElement.classList.add("is-selected");
      buttonElement.setAttribute("aria-pressed", "true");
    }
  },

  /**
   * Updates every filter button to match the active cook.
   * @param {string} cookName The active cook, or an empty string.
   * @returns {void}
   */
  markSelectedButton: function (cookName)
  {
    let buttonElements;
    let buttonCount;
    let i;

    buttonElements = document.querySelectorAll(".cook-filter");
    buttonCount = buttonElements.length;
    i = 0;

    while (i < buttonCount)
    {
      this.selectButton(buttonElements[i], cookName);
      i++;
    }
  },

  /**
   * Checks whether one recipe belongs to the active cook.
   * @param {string} itemCook The cook stored on the recipe.
   * @param {string} cookName The active cook, or an empty string.
   * @returns {boolean} True when the recipe should stay visible.
   */
  isRecipeVisible: function (itemCook, cookName)
  {
    let isVisible;

    isVisible = true;

    if (cookName != "")
    {
      if (itemCook != cookName)
      {
        isVisible = false;
      }
    }

    return (isVisible);
  },

  /**
   * Shows or hides one recipe for the active cook.
   * @param {HTMLElement} recipeItem The recipe list item.
   * @param {string} cookName The active cook, or an empty string.
   * @returns {void}
   */
  applyVisibility: function (recipeItem, cookName)
  {
    let itemCook;
    let isVisible;

    itemCook = recipeItem.dataset.cook;
    isVisible = this.isRecipeVisible(itemCook, cookName);
    recipeItem.classList.remove("is-hidden");

    if (isVisible == false)
    {
      recipeItem.classList.add("is-hidden");
    }
  },

  /**
   * Shows the recipes of one cook, or every recipe when the name is empty.
   * @param {string} cookName The active cook, or an empty string.
   * @returns {void}
   */
  showRecipes: function (cookName)
  {
    let recipeItems;
    let itemCount;
    let i;

    recipeItems = document.querySelectorAll(".recipe-item");
    itemCount = recipeItems.length;
    i = 0;

    while (i < itemCount)
    {
      this.applyVisibility(recipeItems[i], cookName);
      i++;
    }
  },

  /**
   * Applies the active cook to the buttons and the recipe list.
   * @param {string} cookName The active cook, or an empty string.
   * @returns {void}
   */
  applyCook: function (cookName)
  {
    this.markSelectedButton(cookName);
    this.showRecipes(cookName);
  },

  /**
   * Applies the cook stored in the page address.
   * @returns {void}
   */
  applyFromUrl: function ()
  {
    let cookName;

    cookName = this.readActiveCook();
    this.applyCook(cookName);
  },

  /**
   * Returns the cook to apply after a click.
   * @param {HTMLElement} buttonElement The clicked filter button.
   * @returns {string} The next cook, or an empty string to show every recipe.
   */
  resolveNextCook: function (buttonElement)
  {
    let cookName;
    let nextCook;

    cookName = this.readCookName(buttonElement);
    nextCook = cookName;

    if (buttonElement.classList.contains("is-selected") == true)
    {
      nextCook = "";
    }

    return (nextCook);
  },

  /**
   * Applies the filter chosen from one button.
   * @param {HTMLElement} buttonElement The clicked filter button.
   * @returns {void}
   */
  handleClick: function (buttonElement)
  {
    let nextCook;

    nextCook = this.resolveNextCook(buttonElement);
    this.applyCook(nextCook);
    this.writeCookToUrl(nextCook);
  },

  /**
   * Listens for a click on one filter button.
   * @param {HTMLElement} buttonElement The filter button.
   * @returns {void}
   */
  bindButton: function (buttonElement)
  {
    let filter;

    filter = this;

    buttonElement.addEventListener("click", function ()
    {
      filter.handleClick(buttonElement);
    });
  },

  /**
   * Listens for a click on every filter button.
   * @returns {void}
   */
  bindEvents: function ()
  {
    let buttonElements;
    let buttonCount;
    let i;

    buttonElements = document.querySelectorAll(".cook-filter");
    buttonCount = buttonElements.length;
    i = 0;

    while (i < buttonCount)
    {
      this.bindButton(buttonElements[i]);
      i++;
    }
  },

  /**
   * Restores the filter when the visitor uses the browser back button.
   * @returns {void}
   */
  bindPopState: function ()
  {
    let filter;

    filter = this;

    window.addEventListener("popstate", function ()
    {
      filter.applyFromUrl();
    });
  },

  /**
   * Starts the homepage filter.
   * @returns {void}
   */
  insert: function ()
  {
    this.applyFromUrl();
    this.bindEvents();
    this.bindPopState();
  }
};

document.addEventListener("DOMContentLoaded", function ()
{
  recipeFilter.insert();
});
