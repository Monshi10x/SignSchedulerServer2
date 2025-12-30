class ModalWidthHeight extends Modal {
      #incrementAmount = 100;
      #widthField;
      #heightField;
      constructor(headerText, incrementAmount = 100, callback) {
            super(headerText, callback);

            this.#incrementAmount = incrementAmount;
            let sizeContainer = createDivStyle5(null, "Dimensions", this.getBodyElement())[1];
            this.#widthField = createInput_Infield("Width", 1, "width:45%;", () => {this.updateFromFields();}, sizeContainer, true, incrementAmount);
            this.#heightField = createInput_Infield("Height", 1, "width:45%;", () => {this.updateFromFields();}, sizeContainer, true, incrementAmount);


            this.addFooterElement(createButton("Ok", "width:100px;float:right;", () => {this.callback(); console.log("in callback");}));
            this.addFooterElement(createButton("Cancel", "width:100px;float:right;", () => {this.hide(); console.log("cancel called");}));

            this.#widthField[1].focus();
      }

      updateFromFields() {

      }

      get width() {return parseFloat(this.#widthField[1].value);}
      set width(val) {$(this.#widthField[1]).val(val).change();}
      get widthField() {return this.#widthField;}

      get height() {return parseFloat(this.#heightField[1].value);}
      set height(val) {$(this.#heightField[1]).val(val).change();}
      get heightField() {return this.#heightField;}
}