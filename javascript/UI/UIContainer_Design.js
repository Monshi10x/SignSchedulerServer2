class UIContainer_Design {
      /* Variables */
      growOnHover = true;

      #overrideCssStyles;
      #parentObjectToAppendTo;
      #jobNameText;
      #customerNameText;
      #isMinimized = false;
      #whenClosedReturnBorrowed = true;
      #headingContainer_Height = 30;
      #jobNameHeadingContainer_Height = 30;
      #customerNameHeadingContainer_Height = 30;
      #addedHeadingItems_combinedWidth = 0;
      #Id;
      #OrderId;
      #Priority;
      #JobColour;
      #QueuePrioritySettingId;
      #jobData;
      modalIsOpen = false;

      /*Field*/
      #f_jobNameTextField;
      #f_customerNameTextField;
      #f_container;
      #f_headingContainer;
      #f_popOutBtn;
      #f_popOutModal;
      #f_contentContainer;
      #f_customerNameHeadingContainer;
      #f_jobNameHeadingContainer;

      /*Getter*/
      get container() {return this.#f_container;}
      get customerNameText() {return this.#customerNameText;}
      get jobNameText() {return this.#jobNameText;}
      get headingContainer() {return this.#f_headingContainer;}
      get whenClosedReturnBorrowed() {return this.#whenClosedReturnBorrowed;}
      get contentContainer() {return this.#f_contentContainer;}
      get Id() {return this.#Id;}
      get OrderId() {return this.#OrderId;}
      get Priority() {return this.#Priority;}
      get JobColour() {return this.#JobColour;}
      get QueuePrioritySettingId() {return this.#QueuePrioritySettingId;}
      get jobData() {return this.#jobData;}

      /*Setter*/
      set whenClosedReturnBorrowed(val) {
            this.#whenClosedReturnBorrowed = val;
            if(this.#f_popOutModal) this.#f_popOutModal.whenClosedReturnBorrowed = val;
      }
      set Id(value) {this.#Id = value;}
      set OrderId(value) {this.#OrderId = value;}
      set Priority(value) {this.#Priority = value;}
      set JobColour(value) {this.#JobColour = value;}
      set QueuePrioritySettingId(value) {this.#QueuePrioritySettingId = value;}
      set jobData(value) {this.#jobData = value;}

      constructor(overrideCssStyles, customerNameText, jobNameText, parentObjectToAppendTo) {
            this.#overrideCssStyles = overrideCssStyles;
            this.#customerNameText = customerNameText;
            this.#jobNameText = jobNameText;
            this.#parentObjectToAppendTo = parentObjectToAppendTo;

            this.createGUI();
      }

      createGUI() {
            let self = this;

            this.#f_container = document.createElement("div");
            this.#f_container.className = "UIContainer_Design";
            this.#f_container.style = STYLE.Div3;
            this.#f_container.style.cssText += "display:flex;flex-direction:column;border:1px solid rgb(0,0,0,0.6);cursor:auto;width: calc(100% - 40px);margin:10px 20px;";
            this.#f_container.style.boxShadow = "rgb(0, 0, 0, 0.5) 0px 0px 20px 0px";
            this.#f_container.style.cssText += this.#overrideCssStyles;

            $(this.#f_container).hover(function() {
                  if(self.growOnHover) {
                        this.style.boxShadow = "rgb(0, 0, 0, 0.9) 0px 0px 20px 0.5px";
                        this.style.cssText += "transform: scale(1.01, 1.01);";
                  }
            }, function() {
                  this.style.boxShadow = "rgb(0, 0, 0, 0.5) 0px 0px 20px 0px";
                  this.style.cssText += "transform: scale(1.0, 1.0);";
            });

            if(this.#parentObjectToAppendTo != null) {
                  this.#parentObjectToAppendTo.appendChild(this.#f_container);
            }

            this.#f_headingContainer = document.createElement("div");
            this.#f_headingContainer.style = "width:100%;height:" + this.#headingContainer_Height + "px;box-sizing:border-box;";

            this.#f_headingContainer.addEventListener("click", (e) => {
                  if(e.target == this.#f_headingContainer) {
                        this.popOut();
                  }
            });
            this.#f_container.appendChild(this.#f_headingContainer);

            if(this.#customerNameText !== null) {
                  this.#f_customerNameHeadingContainer = document.createElement("div");
                  this.#f_customerNameHeadingContainer.style = "width:100%;height:" + this.#customerNameHeadingContainer_Height + "px;box-sizing:border-box;";
                  this.#f_container.appendChild(this.#f_customerNameHeadingContainer);

                  this.#f_customerNameTextField = document.createElement("h3");
                  this.#f_customerNameTextField.innerText = this.#customerNameText;
                  this.#f_customerNameTextField.style = "float: left; height: 30px; margin: 0px 0px 0px 0px; background-color: " + COLOUR.White +
                        "; width: calc(100%); box-sizing: border-box; padding: 0px; font-size: 16px; color: " + COLOUR.Black + "; text-align: center; line-height: 30px; border: 1px solid " + COLOUR.White +
                        ";overflow: hidden;text-overflow: ellipsis;white-space: nowrap;padding-left: 4px;padding-right: 4px;";
                  this.#f_customerNameHeadingContainer.appendChild(this.#f_customerNameTextField);

                  this.#f_customerNameHeadingContainer.addEventListener("click", () => {
                        this.popOut();
                  });
            }

            if(this.#jobNameText !== null) {
                  this.#f_jobNameHeadingContainer = document.createElement("div");
                  this.#f_jobNameHeadingContainer.style = "width:100%;height:" + this.#jobNameHeadingContainer_Height + "px;box-sizing:border-box;";
                  this.#f_container.appendChild(this.#f_jobNameHeadingContainer);

                  this.#f_jobNameTextField = document.createElement("h3");
                  this.#f_jobNameTextField.innerText = this.#jobNameText;
                  this.#f_jobNameTextField.style = "float: left; height: 30px; margin: 0px 0px 0px 0px; background-color: " + COLOUR.White +
                        "; width: calc(100%); box-sizing: border-box; padding: 0px; font-size: 10px; color: " + COLOUR.DarkGrey +
                        "; text-align: center; line-height: 30px; border: 1px solid " + COLOUR.White + ";overflow: hidden;text-overflow: ellipsis;white-space: nowrap;padding-left: 4px;padding-right: 4px;";
                  this.#f_jobNameHeadingContainer.appendChild(this.#f_jobNameTextField);

                  this.#f_jobNameHeadingContainer.addEventListener("click", () => {
                        this.popOut();
                  });
            }

            this.#f_contentContainer = document.createElement("div");
            this.#f_contentContainer.style = "width:100%;max-height:calc(100% - 30px);display:block;overflow: auto;background-color:" + COLOUR.MidGrey;
            this.#f_container.appendChild(this.#f_contentContainer);
      }

      /**@Overrideable */
      onPopOut() { };

      /**@Overrideable */
      onPopOutLeave() { };

      /**@Overrideable */
      onCallback() { }

      toggleMinimize() {
            toggle(this.#f_contentContainer.style.display == "none", this.Maximize, this.Minimize);
      }

      Minimize() {
            this.#isMinimized = true;
            this.#f_contentContainer.style.display = "none";
      }

      Maximize() {
            this.#isMinimized = false;
            this.#f_contentContainer.style.display = "block";
      }

      popOut() {
            if(this.modalIsOpen) return;
            let self = this;
            let cb = function() {
                  setFieldDisabled(false, self.#f_popOutBtn);
                  //console.log("in modal function callback");
                  console.trace("in modal function callback");
                  self.popOutLeave();
                  self.onCallback();
                  self.modalIsOpen = false;
            };
            this.#f_popOutModal = new ModalPopOut("Expanded View", cb, self.#f_container);
            this.#f_popOutModal.shouldHideOnEnterKeyPress = false;
            this.#f_popOutModal.whenClosedReturnBorrowed = this.whenClosedReturnBorrowed;

            this.modalIsOpen = true;

            setFieldDisabled(true, this.#f_popOutBtn);

            this.prePopOutState = this.#isMinimized;
            this.Maximize();
            this.#f_contentContainer.style.maxHeight = "100%";
            this.#f_container.style.maxHeight = "10000px";
            this.#f_container.style.cssText += "margin:0px;width:100%;";

            this.onPopOut();

      }

      popOutLeave() {
            if(this.prePopOutState == true) this.Minimize(); else this.Maximize();//if was minimized before, restore to minimized

            this.onPopOutLeave();
      }

      addHeadingButtons(...itemContainers) {
            for(let i = 0; i < itemContainers.length; i++) {
                  this.#f_headingContainer.appendChild(itemContainers[i]);
                  this.#addedHeadingItems_combinedWidth += itemContainers[i].offsetWidth;
            }
      }
}