class UIContainerType3 {
      #container;
      get container() {return this.#container;}

      #headingContainer;
      get headingContainer() {return this.#headingContainer;}

      #headingContainer_Height = 30;

      #headingText;
      get headingText() {return this.#headingText;}

      #popOutBtn;
      #popOutBtn_Width = 30;
      #popOutBtn_Height = 30;
      #popOutModal;
      #whenClosedReturnBorrowed = true;
      get whenClosedReturnBorrowed() {return this.#whenClosedReturnBorrowed;}
      set whenClosedReturnBorrowed(val) {
            this.#whenClosedReturnBorrowed = val;
            if(this.#popOutModal) this.#popOutModal.whenClosedReturnBorrowed = val;
      }

      #minimizeBtn;
      #minimizeBtn_Width = 30;
      #minimizeBtn_Height = 30;
      #isMinimized = false;

      #contentContainer;
      get contentContainer() {return this.#contentContainer;}

      constructor(overrideCssStyles, headingText, parentObjectToAppendTo) {
            this.#headingText = headingText;

            /**@Container */
            this.#container = document.createElement("div");
            this.#container.style = STYLE.Div3;
            this.#container.style.cssText += "display:flex;flex-direction:column;";
            this.#container.style.cssText += overrideCssStyles;
            if(parentObjectToAppendTo != null) {
                  parentObjectToAppendTo.appendChild(this.#container);
            }

            /**@HeadingContainer */
            this.#headingContainer = document.createElement("div");
            this.#headingContainer.style = "width:100%;height:" + this.#headingContainer_Height + "px;box-sizing:border-box;";
            this.#container.appendChild(this.#headingContainer);

            /**@HeadingText */
            if(headingText !== null) {
                  this.#headingText = document.createElement("h3");
                  this.#headingText.innerText = headingText;
                  this.#headingText.style = "float: left; height: 30px; margin: 0px 0px 0px 0px; background-color: " + COLOUR.DarkGrey + "; width: calc(100% - " + (this.#minimizeBtn_Width + this.#popOutBtn_Width) + "px); box-sizing: border-box; padding: 0px; font-size: 14px; color: white; text-align: center; line-height: 30px; border: 1px solid " + COLOUR.DarkGrey + ";";
                  this.#headingContainer.appendChild(this.#headingText);
            }

            /**@MinimizeBtn */
            this.#minimizeBtn = createButton("-", "display: block; float: right; width: " + this.#minimizeBtn_Width + "px;height:" + this.#minimizeBtn_Height + "px; border:none;padding:2px; color:white;min-height: 20px; margin: 0px 0px 0px 0px; box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px;background-color:" + COLOUR.LightBlue + ";", () => {this.toggleMinimize();});
            this.#minimizeBtn.id = "minimizeBtn";
            this.#minimizeBtn.dataset.minimizedState = "maximized";
            this.#headingContainer.appendChild(this.#minimizeBtn);

            /**@PopOutBtn */
            this.#popOutBtn = createButton("\u274F", "display: block; float: right; width: " + this.#popOutBtn_Width + "px;height:" + this.#popOutBtn_Height + "px; border:none;padding:2px; color:white;min-height: 20px; margin: 0px; box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px;background-color:" + COLOUR.DarkBlue + ";", () => {
                  setFieldDisabled(true, this.#popOutBtn);
                  this.onPopOut();
                  this.#popOutModal = new ModalPopOut("Expanded View", () => {
                        setFieldDisabled(false, this.#popOutBtn);
                        this.onPopOutLeave();
                        this.callbackOverridable();
                  }, this.#container);
                  this.#popOutModal.whenClosedReturnBorrowed = this.whenClosedReturnBorrowed;
            }, this.#headingContainer);

            /**@ContentContainer */
            this.#contentContainer = document.createElement("div");
            this.#contentContainer.style = "width:100%;max-height:calc(100% - 30px);overflow-y:scroll;display:block;position: relative;";
            this.#container.appendChild(this.#contentContainer);
      }

      toggleMinimize() {
            if(this.#contentContainer.style.display == "none") {
                  this.Maximize();
            } else {
                  this.Minimize();
            }
      }

      Minimize() {
            this.#isMinimized = true;
            this.#contentContainer.style.display = "none";
            this.#minimizeBtn.innerText = "▭";
            this.#minimizeBtn.dataset.minimizedState = "minimized";
      }

      Maximize() {
            this.#isMinimized = false;
            this.#contentContainer.style.display = "block";
            this.#minimizeBtn.innerText = "-";
            this.#minimizeBtn.dataset.minimizedState = "maximized";
      }

      onPopOut() {
            this.prePopOutState = this.#isMinimized;//true
            this.Maximize();
            this.#contentContainer.style.maxHeight = "100%";
            this.#container.style.maxHeight = "10000px";
      }

      onPopOutLeave() {
            //if was minimized before, restore to minimized
            if(this.prePopOutState == true) this.Minimize();
            else this.Maximize();
            this.#contentContainer.style.maxHeight = "400px";
            this.#container.style = STYLE.Div3;
      }

      /**@Overridable */
      callbackOverridable() {
            console.log("callbackOverridable");
      }

      #addedHeadingItems_combinedWidth = 0;
      addHeadingButtons(...itemContainers) {
            for(let i = 0; i < itemContainers.length; i++) {
                  this.#headingContainer.appendChild(itemContainers[i]);
                  this.#addedHeadingItems_combinedWidth += itemContainers[i].offsetWidth;
            }
            this.#headingText.style.width = "calc(100% - " + (this.#addedHeadingItems_combinedWidth + this.#minimizeBtn_Width + this.#popOutBtn_Width) + "px";
      }
}