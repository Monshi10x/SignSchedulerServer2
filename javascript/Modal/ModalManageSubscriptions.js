class ModalManageSubscriptions extends Modal {
      maxNumberOfSelectedRows = 1;
      currentNumberSelectedRows = 0;

      constructor(headerText, callback, sizeClass, materialClass) {
            super(headerText, callback);
            this.sizeClass = sizeClass;
            this.materialClass = materialClass;

            var tempThis = this;
            this.createRows();

            this.okBtn = createButton("Ok", "width:100px;float:right;", () => {tempThis.callback(); console.log("in callback");});
            this.addFooterElement(this.okBtn);
            this.cancelBtn = createButton("Cancel", "width:100px;float:right;", () => {tempThis.hide(); console.log("cancel called");});
            this.addFooterElement(this.cancelBtn);
            this.warningText = createText("Cannot select more than 1 row", "display:none;float:left;width:100px;color:red;font-weight:bold;");
            this.addFooterElement(this.warningText);
      }

      createRows() {
            var arr = this.sizeClass.sizeRows;
            for(var i = 0; i < arr.length; i++) {
                  let row = createDiv("width:100%;box-sizing:border-box;", null, null);
                  this.addBodyElement(row);

                  let qtyVal = arr[i][0];
                  let widthVal = arr[i][1];
                  let heightVal = arr[i][2];

                  let rowID = (i);
                  let rowNumber = createText("Row " + (rowID + 1), "height:30px;margin:5px;background-color:none;width:40px;font-size:10px;color:" + COLOUR.Blue + ";text-align:center;line-height:30px;border:1px solid " + COLOUR.MidBlue + ";", row);

                  let qty = createInput_Infield("Quantity", qtyVal, "width:100px", null, row, false, null);
                  setFieldDisabled(true, qty[1], qty[0]);

                  let width = createInput_Infield("Width", widthVal, "width:100px", null, row, false, null);
                  setFieldDisabled(true, width[1], width[0]);

                  let height = createInput_Infield("Quantity", heightVal, "width:100px", null, row, false, null);
                  setFieldDisabled(true, height[1], height[0]);

                  let isAssigned = false;
                  if(this.materialClass.rowContainsSubscription(rowID) || this.materialClass.sizeClass.rowHasSubscriberOfType(rowID, this.materialClass.Type)) isAssigned = true;
                  let use = createCheckbox(null, isAssigned, "width:30px", () => {
                        if(use.checked) {
                              this.materialClass.SubscribeToSizeRows(rowID);
                              this.currentNumberSelectedRows++;
                        } else {
                              this.materialClass.cancelSizeClassSubscription(rowID);
                              this.currentNumberSelectedRows--;
                        }
                        this.update();
                  }, row);

                  if(!this.materialClass.sizeClass.rowContainsSubscription(this.materialClass.UNIQUEID, rowID) && this.materialClass.sizeClass.rowHasSubscriberOfType(rowID, this.materialClass.Type)) setFieldDisabled(true, use, use);
            }
      }

      update() {
            if(this.materialClass.numberOfRowsSubscribedTo > this.maxNumberOfSelectedRows) {
                  setFieldDisabled(true, this.okBtn);
                  setFieldDisabled(true, this.cancelBtn);
                  setFieldHidden(false, this.warningText);
            } else {
                  setFieldDisabled(false, this.okBtn);
                  setFieldDisabled(false, this.cancelBtn);
                  setFieldHidden(true, this.warningText);
            }
      }
}

class ModalManageSubscriptions2 extends Modal {
      maxNumberOfSelectedRows = 1;
      currentNumberSelectedRows = 0;

      constructor(headerText, callback, materialClass, parentClass) {
            super(headerText, callback);
            this.materialClass = materialClass;
            this.parentClass = parentClass;

            let tempThis = this;
            this.createRows();

            this.okBtn = createButton("Ok", "width:100px;float:right;", () => {tempThis.callback(); console.log("in callback");});
            this.addFooterElement(this.okBtn);
            this.cancelBtn = createButton("Cancel", "width:100px;float:right;", () => {tempThis.hide(); console.log("cancel called");});
            this.addFooterElement(this.cancelBtn);
            this.warningText = createText("Cannot select more than 1 row", "display:none;float:left;width:100px;color:red;font-weight:bold;");
            this.addFooterElement(this.warningText);
      }

      createRows() {
            let allAvailableSubscriptionObjects = this.parentClass.allMaterials;
            createHr("height:10px;background-color:white;border:0px solid white", this.getBodyElement());
            this.table = new Table(this.getBodyElement(), "100%", 20, "800px");
            this.table.setHeading("ID", "Subscribed", "Notes");
            for(let i = 0; i < allAvailableSubscriptionObjects.length; i++) {
                  let isSubscribedToObject = this.materialClass.subscriptions.contains(allAvailableSubscriptionObjects[i]);
                  let isSelf = this.materialClass.ID == allAvailableSubscriptionObjects[i].ID;
                  let availableSubscriptionIsSubscriber = allAvailableSubscriptionObjects[i].isSubscribedTo(this.materialClass);
                  let subscribedCkb = createCheckbox("", isSubscribedToObject, "", () => {
                        if(subscribedCkb.checked) {
                              this.materialClass.SubscribeTo(allAvailableSubscriptionObjects[i]);
                        } else {
                              this.materialClass.UnSubscribeFrom(allAvailableSubscriptionObjects[i]);
                        }
                  }, null);
                  setFieldDisabled(isSelf || availableSubscriptionIsSubscriber, subscribedCkb, null);
                  let otherWording = (isSelf ? "Cannot subscribe to self" : "") + (availableSubscriptionIsSubscriber ? "Is a subscriber" : "");
                  this.table.addRow(allAvailableSubscriptionObjects[i].Type + " " + allAvailableSubscriptionObjects[i].productNumber, subscribedCkb, otherWording);
            }
            this.table.container.style.cssText += "width:calc(100% - 20px);margin:10px;";

            /*var arr = this.sizeClass.sizeRows;
            for(var i = 0; i < arr.length; i++) {
                  let row = createDiv("width:100%;box-sizing:border-box;", null, null);
                  this.addBodyElement(row);

                  let qtyVal = arr[i][0];
                  let widthVal = arr[i][1];
                  let heightVal = arr[i][2];

                  let rowID = (i);
                  let rowNumber = createText("Row " + (rowID + 1), "height:30px;margin:5px;background-color:none;width:40px;font-size:10px;color:" + COLOUR.Blue + ";text-align:center;line-height:30px;border:1px solid " + COLOUR.MidBlue + ";", row);

                  let qty = createInput_Infield("Quantity", qtyVal, "width:100px", null, row, false, null);
                  setFieldDisabled(true, qty[1], qty[0]);

                  let width = createInput_Infield("Width", widthVal, "width:100px", null, row, false, null);
                  setFieldDisabled(true, width[1], width[0]);

                  let height = createInput_Infield("Quantity", heightVal, "width:100px", null, row, false, null);
                  setFieldDisabled(true, height[1], height[0]);

                  let isAssigned = false;
                  if(this.materialClass.rowContainsSubscription(rowID) || this.materialClass.sizeClass.rowHasSubscriberOfType(rowID, this.materialClass.Type)) isAssigned = true;
                  let use = createCheckbox(null, isAssigned, "width:30px", () => {
                        if(use.checked) {
                              this.materialClass.SubscribeToSizeRows(rowID);
                              this.currentNumberSelectedRows++;
                        } else {
                              this.materialClass.cancelSizeClassSubscription(rowID);
                              this.currentNumberSelectedRows--;
                        }
                        this.update();
                  }, row);

                  if(!this.materialClass.sizeClass.rowContainsSubscription(this.materialClass.UNIQUEID, rowID) && this.materialClass.sizeClass.rowHasSubscriberOfType(rowID, this.materialClass.Type)) setFieldDisabled(true, use, use);
            }*/
      }

      update() {
            /*if(this.materialClass.numberOfRowsSubscribedTo > this.maxNumberOfSelectedRows) {
                  setFieldDisabled(true, this.okBtn);
                  setFieldDisabled(true, this.cancelBtn);
                  setFieldHidden(false, this.warningText);
            } else {
                  setFieldDisabled(false, this.okBtn);
                  setFieldDisabled(false, this.cancelBtn);
                  setFieldHidden(true, this.warningText);
            }*/
      }
}