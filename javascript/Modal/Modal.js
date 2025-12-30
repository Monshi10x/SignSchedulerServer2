class Modal {

      #modalContainer;
      get container() {return this.#modalContainer;}

      #modalOpaqueBackground;
      #headerContainer;
      #headerText;

      #bodyContainer;
      getBodyElement() {return this.#bodyContainer;}

      #footerContainer;

      #callbackFunction;
      get callbackFunction() {return this.#callbackFunction;}
      set callbackFunction(value) {this.#callbackFunction = value;}

      shouldHideOnEnterKeyPress = true;

      setContainerSize(width = 300, height = 300) {
            this.#modalContainer.style.width = width + 'px';
            this.#modalContainer.style.height = height + 'px';
      }

      constructor(headerText, callbackFunction) {
            this.#headerText = headerText;
            this.#callbackFunction = callbackFunction;

            this.createGUI();
      }

      createGUI() {
            this.#modalOpaqueBackground = document.createElement('div');
            this.#modalOpaqueBackground.style = "display: none;position: fixed;z-index: 1000;left: 0;top: 0;width: 100%;height: 100%;overflow: auto;background-color: rgb(0, 0, 0);background-color: rgba(0, 0, 0, 0.5);overflow-y: auto;display: flex; align - items: center;justify - content: center; ";
            this.#modalOpaqueBackground.className = "modalOpaqueBackground";
            document.body.appendChild(this.#modalOpaqueBackground);

            this.#modalContainer = document.createElement('div');
            this.#modalContainer.className = 'modalContainer';
            this.#modalContainer.style = "width:60%;height:80%;min-height:300px;min-width:300px;max-height:calc(100% - 200px);max-width:calc(100% - 200px);position:relative;z-index:1002;background-color:white;margin: auto;" + STYLE.DropShadow;

            this.#headerContainer = createText(this.#headerText, "width:100%;height:30px;text-align: center;color:white;margin:0px;background-color:" + COLOUR.Blue + ";" + STYLE.HeaderFont);
            this.#headerContainer.className = 'modalContainerHeader';
            this.#modalContainer.appendChild(this.#headerContainer);

            this.#bodyContainer = document.createElement('div');
            this.#bodyContainer.className = 'modalContainerBody';
            this.#bodyContainer.style = "width:100%;min-height:50px;display:block;z-index:1002;background-color:white;margin:0px;overflow-y:auto;margin-bottom:50px;height:calc(100% - 80px)";
            this.#modalContainer.appendChild(this.#bodyContainer);

            this.#footerContainer = document.createElement('div');
            this.#footerContainer.className = 'modalContainerFooter';
            this.#footerContainer.style = "width:100%;height:50px;display:block;position:absolute;bottom:0px;background-color:" + COLOUR.Blue;
            this.#modalContainer.appendChild(this.#footerContainer);

            this.#modalOpaqueBackground.appendChild(this.#modalContainer);

            this.show();
      }

      show() {
            this.#modalOpaqueBackground.style.display = 'block';
            this.#modalOpaqueBackground.style.display = 'flex';
            this.#modalOpaqueBackground.addEventListener("mousedown", (event) => this.onMouseDown(event));
            this.#modalOpaqueBackground.addEventListener("resize", (event) => this.onWindowResize(event));
            this.#modalOpaqueBackground.addEventListener("mousemove", (event) => this.onMouseMove(event));
            this.#modalOpaqueBackground.addEventListener("keyup", (event) => this.onKeyUp(event), {bubbles: false});

            createWindowDragZones(this.container, 10, (event) => this.onWindowResize(event));

            $("#btnGoToOrderStep2").hide();
      }

      hide() {
            this.#modalOpaqueBackground.style.display = 'none';
            removeAllChildrenFromParent(this.#modalOpaqueBackground);
            $("#btnGoToOrderStep2").show();
            deleteElement(this.#modalOpaqueBackground);
      }

      addFooterElement(element) {
            this.#footerContainer.appendChild(element);
            return element;
      }

      addBodyElement(element, appendAfterChild = null) {
            if(appendAfterChild == null) {
                  this.#bodyContainer.appendChild(element);
            } else {
                  insertAfter(element, appendAfterChild);
            }
            return element;
      }

      callback(/*args*/) {
            if(this.#callbackFunction) {
                  this.#callbackFunction(arguments);
            }
            this.hide();
      };

      onMouseDown(event) {
            if(event.target.className == "modalOpaqueBackground") {
                  this.onMouseOut();
            }
      }

      onMouseOut() {
            this.hide();
      }

      onMouseMove(event) { }

      onWindowResize(event) { }

      onKeyUp(event) {
            if(event.key === "Enter") {
                  if(this.shouldHideOnEnterKeyPress) this.hide();
            }
      }
}