/**
 * Reusable tip box shown at the bottom of every recipe page.
 */
const mammaConsiglia = {
  /**
   * Reads the tip text stored on the main element.
   * @returns {string} The tip text, or an empty string when it is missing.
   */
  readTipText: function ()
  {
    let mainElement;
    let tipText;

    mainElement = document.querySelector("main");
    tipText = "";

    if (mainElement != null)
    {
      if (mainElement.dataset.mammaConsiglia != null)
      {
        tipText = mainElement.dataset.mammaConsiglia;
      }
    }

    return (tipText);
  },

  /**
   * Creates the title row with Mamma's avatar on the left.
   * @returns {HTMLElement} The title row.
   */
  createTitle: function ()
  {
    let titleRowElement;
    let avatarElement;
    let titleElement;

    titleRowElement = document.createElement("div");
    avatarElement = document.createElement("img");
    titleElement = document.createElement("h2");

    titleRowElement.className = "mamma-consiglia-title";
    avatarElement.className = "mamma-consiglia-avatar";
    avatarElement.src = "/images/mamma.jpg";
    avatarElement.alt = "Mamma";
    titleElement.textContent = "Mamma consiglia";
    titleRowElement.appendChild(avatarElement);
    titleRowElement.appendChild(titleElement);

    return (titleRowElement);
  },

  /**
   * Creates the tip box element.
   * @param {string} tipText The advice shown inside the box.
   * @returns {HTMLElement} The tip box.
   */
  createBox: function (tipText)
  {
    let boxElement;
    let titleRowElement;
    let textElement;

    boxElement = document.createElement("section");
    titleRowElement = this.createTitle();
    textElement = document.createElement("p");

    boxElement.className = "mamma-consiglia";
    textElement.textContent = tipText;
    boxElement.appendChild(titleRowElement);
    boxElement.appendChild(textElement);

    return (boxElement);
  },

  /**
   * Places the tip box at the bottom of the recipe content.
   * @param {HTMLElement} mainElement The recipe content element.
   * @param {HTMLElement} boxElement The tip box.
   * @returns {void}
   */
  placeBox: function (mainElement, boxElement)
  {
    let backLinkElement;

    backLinkElement = mainElement.querySelector("a");

    if (backLinkElement != null)
    {
      mainElement.insertBefore(boxElement, backLinkElement);
    }

    if (backLinkElement == null)
    {
      mainElement.appendChild(boxElement);
    }
  },

  /**
   * Inserts the tip box when the page provides a tip.
   * @returns {void}
   */
  insert: function ()
  {
    let mainElement;
    let tipText;
    let boxElement;

    mainElement = document.querySelector("main");
    tipText = this.readTipText();
    boxElement = null;

    if (mainElement != null)
    {
      if (tipText != "")
      {
        boxElement = this.createBox(tipText);
        this.placeBox(mainElement, boxElement);
      }
    }
  }
};

document.addEventListener("DOMContentLoaded", function ()
{
  mammaConsiglia.insert();
});
