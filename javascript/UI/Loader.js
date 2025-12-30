class Loader {
      #container;
      #ID;
      #currentParentPositionStyle;
      #parentObjectToAppendTo;
      constructor(parentObjectToAppendTo, overrideCssStyles) {
            this.#ID = "loaderSP6-" + generateUniqueID();
            this.#parentObjectToAppendTo = parentObjectToAppendTo;
            this.#container = document.createElement("div");
            this.#container.className = "loaderSP6";
            this.#container.id = this.#ID;
            if(overrideCssStyles) this.#container.style.cssText += overrideCssStyles;

            if(parentObjectToAppendTo != null) {
                  parentObjectToAppendTo.appendChild(this.#container);
            }

            this.#currentParentPositionStyle = parentObjectToAppendTo.style.position;
            if(this.#currentParentPositionStyle != "relative") parentObjectToAppendTo.style.position = "relative";
      }

      setSize(widthNumber) {
            this.#container.style.cssText += ";width:" + widthNumber + "px;height:" + widthNumber + "px;margin:-" + (widthNumber) + "px 0px 0px -" + (widthNumber) + "px;";
      }

      Delete() {
            this.#parentObjectToAppendTo.style.position = this.#currentParentPositionStyle;
            $(document.querySelector("#" + this.#ID)).remove();
      }
}