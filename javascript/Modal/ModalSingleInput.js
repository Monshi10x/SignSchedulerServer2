class ModalSingleInput extends Modal {
      constructor(headerText, callback) {
            super(headerText, callback);

            var tempThis = this;
            this.valField = createInput_Infield("Value", 0, null, () => { }, null, true, 1);

            this.addBodyElement(this.valField[0]);
            this.addFooterElement(createButton("Ok", "width:100px;float:right;", () => {tempThis.callback(); console.log("in callback");}));
            this.addFooterElement(createButton("Cancel", "width:100px;float:right;", () => {tempThis.hide(); console.log("cancel called");}));

            this.valField[1].focus();
      }

      get value() {
            return zeroIfNaNNullBlank(this.valField[1].value);
      }

      set value(val) {
            this.valField[1].value = val;
      }
}