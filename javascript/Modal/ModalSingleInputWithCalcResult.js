class ModalSingleInputWithCalcResult extends Modal {
      constructor(headerText, inputText, calcText, callback) {
            console.log("ModalSingleInputWithCalcResult");
            super(headerText, callback);
            this.l_value = 0;
            this.l_calcValue = 0;
            var tempThis = this;
            this.valField = createInput_Infield(inputText, tempThis.value, null, () => {tempThis.value = tempThis.valField[1].value;}, null, true, 1);

            this.addBodyElement(this.valField[0]);
            this.calcField = createInput_Infield(calcText, tempThis.value, null, () => {tempThis.calcValue = tempThis.calcField[1].value;}, null, true, null);
            this.addBodyElement(this.calcField[0]);
            this.addFooterElement(createButton("Ok", "width:100px;float:right;", () => {tempThis.callback(); console.log("in callback");}));
            this.addFooterElement(createButton("Cancel", "width:100px;float:right;", () => {tempThis.hide(); console.log("cancel called");}));

            this.valField[1].focus();
      }

      get value() {
            return this.l_value;
      }

      set value(val) {
            this.l_value = val;
      }

      get calcValue() {
            return this.l_calcValue;
      }

      set calcValue(val) {
            this.l_calcValue = val;
      }
}