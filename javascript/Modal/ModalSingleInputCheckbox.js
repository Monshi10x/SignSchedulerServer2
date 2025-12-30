class ModalSingleInputCheckbox extends Modal {
      constructor(headerText, callback) {
            console.log("in modal single input checkbox text");
            super(headerText, callback);
            this.l_value = false;
            var tempThis = this;
            this.valField = createCheckbox_Infield("Value", tempThis.value, null, () => {tempThis.value = tempThis.valField[1].checked;}, null);

            this.addBodyElement(this.valField[0]);
            this.addFooterElement(createButton("Ok", "width:100px;float:right;", () => {tempThis.callback(); console.log("in callback");}));
            this.addFooterElement(createButton("Cancel", "width:100px;float:right;", () => {tempThis.hide(); console.log("cancel called");}));

            this.valField[1].focus();
      }

      get value() {
            console.log(this.l_value);
            return this.l_value;
      }

      set value(val) {
            this.l_value = val;
      }
}