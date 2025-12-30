class ModalMoveProduct extends Modal {
      constructor(headerText, callback) {
            super(headerText, callback);

            //this.callback = callback;
            var tempThis = this;
            this.valField = createInput_Infield("Value", 0, null, () => { }, null, true, 1);

            console.log(this.valField[1]);
            this.addBodyElement(this.valField[0]);

            this.moveToFirstField = createButton("Move First", "width:200px;float:left;", () => {tempThis.moveToFirst(); console.log("in move to first");});
            this.addBodyElement(this.moveToFirstField);
            this.moveToLastField = createButton("Move Last", "width:200px;float:left;", () => {tempThis.moveToLast(); console.log("in move to last");});
            this.addBodyElement(this.moveToLastField);

            let itemContainer = createDiv("width:100%;height:70%;", "Products", null);
            this.addBodyElement(itemContainer);

            /*var productNameElements = document.querySelectorAll("input[id^='productDescription']");
            for(var i = 0; i < productNameElements.length; i++) {
                  var elem = document.createElement('div');
                  elem.style = "background-color:" + COLOUR.Blue + ";margin-top:10px;margin-left:10px;margin-right:10px;margin-bottom:0px;min-height:15px;width:90%;padding:5px;float:left;display:block;color:white;cursor: pointer;white-space: nowrap;overflow: hidden !important;text-overflow: ellipsis;";
                  elem.id = i;
                  elem.innerHTML = "<b>Product " + parseInt(i + 1) + " -</b> " + productNameElements[i].value;
                  $(elem).hover(function() {
                        $(this).css("background-color", "#0af");
                  }, function() {
                        $(this).css("background-color", COLOUR.Blue);
                  });
                  $(elem).on('click', function() {

                  });
                  itemContainer.appendChild(elem);
            }*/

            this.addFooterElement(createButton("Ok", "width:100px;float:right;", () => {tempThis.callback(); console.log("in callback");}));
            this.addFooterElement(createButton("Cancel", "width:100px;float:right;", () => {tempThis.hide(); console.log("cancel called");}));

            this.valField[1].focus();
      }

      moveToFirst() {
            this.valField[1].value = 0;
            this.callback();
      }

      moveToLast() {
            this.valField[1].value = 999;
            this.callback();
      }

      get value() {
            return zeroIfNaNNullBlank(this.valField[1].value);
      }

      set value(val) {
            this.valField[1].value = val;
      }
}