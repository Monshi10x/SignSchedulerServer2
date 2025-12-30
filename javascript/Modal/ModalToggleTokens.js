class ModalToggleTokens extends Modal {
      #tokenElements = [];
      /**
       * @param optionPairs to be in form Key, Value(true,false) where true is selected
       */
      constructor(headerText, optionPairs, callbackFunction, allowMultiple = true) {
            super(headerText, callbackFunction);

            this.setContainerSize(500, 500);

            for(const [key, value] of Object.entries(optionPairs)) {
                  let token = createToken(key, value["show"], null, null);
                  this.addBodyElement(token[0]);
                  this.#tokenElements.push(token);
            }
            if(allowMultiple == false) {
                  tokenAddToSelectionGroup(...this.#tokenElements);
            }

            this.addFooterElement(createButton("Ok", "width:100px;float:right;", () => {
                  let newOptionPairs = optionPairs;
                  for(let i = 0; i < this.#tokenElements.length; i++) {
                        newOptionPairs[Object.keys(optionPairs)[i]]["show"] = stringToBoolean(this.#tokenElements[i][1].value);
                  }
                  this.callback(newOptionPairs);
                  this.hide();
            }));
            this.addFooterElement(createButton("Cancel", "width:100px;float:right;", () => {this.hide();}));
      }
}