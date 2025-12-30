class ModalWidthHeightWithCalcResult extends Modal {
      constructor(headerText, widthText, heightText, calcTextW, calcTextH, callbackWidthChange, callbackHeightChange, callback) {
            console.log("in ModalWidthHeight");
            super(headerText, callback);
            this.l_width = 0;
            this.l_height = 0;
            this.l_calcWidthValue = 0;
            this.l_calcHeightValue = 0;
            var tempThis = this;
            this.widthField = createInput_Infield(widthText, tempThis.width, "width:40%;", () => {tempThis.width = tempThis.widthField[1].value; callbackWidthChange();}, null, true, 100);

            this.addBodyElement(this.widthField[0]);
            this.calcWidthField = createInput_Infield(calcTextW, tempThis.calcWidthValue, "width:40%;", () => {tempThis.calcWidthValue = tempThis.calcWidthField[1].value;}, null, true, null);
            this.addBodyElement(this.calcWidthField[0]);
            this.heightField = createInput_Infield(heightText, tempThis.height, "width:40%;", () => {tempThis.height = tempThis.heightField[1].value; callbackHeightChange();}, null, true, 100);
            this.addBodyElement(this.heightField[0]);
            this.calcHeightField = createInput_Infield(calcTextH, tempThis.calcHeightValue, "width:40%;", () => {tempThis.calcHeightValue = tempThis.calcHeightField[1].value;}, null, true, null);
            this.addBodyElement(this.calcHeightField[0]);
            this.addFooterElement(createButton("Ok", "width:100px;float:right;", () => {tempThis.callback(); console.log("in callback");}));
            this.addFooterElement(createButton("Cancel", "width:100px;float:right;", () => {tempThis.hide(); console.log("cancel called");}));

            this.widthField[1].focus();
      }

      get width() {
            return this.l_width;
      }

      set width(val) {
            this.l_width = val;
      }

      get height() {
            return this.l_height;
      }

      set height(val) {
            this.l_height = val;
      }

      get calcWidthValue() {
            return this.l_calcWidthValue;
      }

      set calcWidthValue(val) {
            this.l_calcWidthValue = val;
      }

      get calcHeightValue() {
            return this.l_calcHeightValue;
      }

      set calcHeightValue(val) {
            this.l_calcHeightValue = val;
      }
}