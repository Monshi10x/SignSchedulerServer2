class UIContainer_Design2 {
      /* Variables */
      allowHoverAnimations = true;
      currentUser;
      #usersWithSalesPermissions = ["ben", "tristan", "pearl"];
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
      #QueuePrioritySettingId;
      #WIPOptions = [
            "WIP : In Design",
            "WIP : Awaiting Proof Approval",
            "WIP : In Design Revision",
            "WIP : Proof Approved",
            "WIP : In Production",
            "WIP : Outsourced Product",
            "WIP : Design Review",
            "WIP : Sales Review"
      ];
      #allOrderProductStatuses = [
            {
                  "Id": 12,
                  "Name": "ESTIMATE",
                  "CbText": "QUOTE : Quote",
                  "CustomerText": "Quote",
                  "Sequence": 10,
                  "AllowCustomization": null,
                  "OrderStatusId": 6,
                  "IsDisabled": false
            },
            {
                  "Id": 34,
                  "Name": "DESIGN NEEDED",
                  "CbText": "QUOTE : Design Needed (Concept or Cut Files)",
                  "CustomerText": "Quote",
                  "Sequence": 20,
                  "AllowCustomization": null,
                  "OrderStatusId": 6,
                  "IsDisabled": false
            },
            {
                  "Id": 42,
                  "Name": "SALES REVIEW (FROM DESIGN)",
                  "CbText": "QUOTE : Quote for Review",
                  "CustomerText": "Quote",
                  "Sequence": 25,
                  "AllowCustomization": null,
                  "OrderStatusId": 6,
                  "IsDisabled": false
            },
            {
                  "Id": 35,
                  "Name": "AWAITING CUSTOMER APPROVAL",
                  "CbText": "QUOTE : Awaiting Customer Approval",
                  "CustomerText": "Need Customer Approval",
                  "Sequence": 30,
                  "AllowCustomization": null,
                  "OrderStatusId": 6,
                  "IsDisabled": false
            },
            {
                  "Id": 38,
                  "Name": "DESIGN REVISION",
                  "CbText": "QUOTE : Revision",
                  "CustomerText": "Quote : Under Revision",
                  "Sequence": 40,
                  "AllowCustomization": null,
                  "OrderStatusId": 6,
                  "IsDisabled": false
            },
            {
                  "Id": 36,
                  "Name": "APPROVED",
                  "CbText": "QUOTE : Approved",
                  "CustomerText": "Quote : Approved",
                  "Sequence": 50,
                  "AllowCustomization": null,
                  "OrderStatusId": 6,
                  "IsDisabled": false
            },
            {
                  "Id": 37,
                  "Name": "CANCELLED",
                  "CbText": "QUOTE : Cancelled",
                  "CustomerText": "Cancelled",
                  "Sequence": 60,
                  "AllowCustomization": null,
                  "OrderStatusId": 13,
                  "IsDisabled": false
            },
            {
                  "Id": 18,
                  "Name": "ORDER REVIEW",
                  "CbText": "WIP : Finalize Order Details for Design",
                  "CustomerText": "Prepping For Design",
                  "Sequence": 70,
                  "AllowCustomization": null,
                  "OrderStatusId": 4,
                  "IsDisabled": false
            },
            {
                  "Id": 7,
                  "Name": "IN DESIGN",
                  "CbText": "WIP : In Design",
                  "CustomerText": "In Design",
                  "Sequence": 80,
                  "AllowCustomization": null,
                  "OrderStatusId": 4,
                  "IsDisabled": false
            },
            {
                  "Id": 41,
                  "Name": "AWAITING CUSTOMER ACTION",
                  "CbText": "WIP : Awaiting Customer Action",
                  "CustomerText": "Customer Action Needed",
                  "Sequence": 85,
                  "AllowCustomization": null,
                  "OrderStatusId": 4,
                  "IsDisabled": false
            },
            {
                  "Id": 9,
                  "Name": "AWAITING PROOF APPROVAL",
                  "CbText": "WIP : Awaiting Proof Approval",
                  "CustomerText": "Requires Proof Approval",
                  "Sequence": 90,
                  "AllowCustomization": null,
                  "OrderStatusId": 4,
                  "IsDisabled": false
            },
            {
                  "Id": 10,
                  "Name": "IN DESIGN REVISION",
                  "CbText": "WIP : In Design Revision",
                  "CustomerText": "In Design Revision",
                  "Sequence": 100,
                  "AllowCustomization": null,
                  "OrderStatusId": 4,
                  "IsDisabled": false
            },
            {
                  "Id": 14,
                  "Name": "PROOF APPROVED",
                  "CbText": "WIP : Proof Approved",
                  "CustomerText": "Proof Approved",
                  "Sequence": 110,
                  "AllowCustomization": null,
                  "OrderStatusId": 4,
                  "IsDisabled": false
            },
            {
                  "Id": 8,
                  "Name": "IN PRODUCTION",
                  "CbText": "WIP : In Production",
                  "CustomerText": "In Production",
                  "Sequence": 120,
                  "AllowCustomization": null,
                  "OrderStatusId": 4,
                  "IsDisabled": false
            },
            {
                  "Id": 26,
                  "Name": "VENDED PRODUCT",
                  "CbText": "WIP : Outsourced Product",
                  "CustomerText": "In Production",
                  "Sequence": 130,
                  "AllowCustomization": null,
                  "OrderStatusId": 4,
                  "IsDisabled": false
            },
            {
                  "Id": 43,
                  "Name": "QUALITY CONTROL",
                  "CbText": "WIP : Quality Control",
                  "CustomerText": "In Production",
                  "Sequence": 135,
                  "AllowCustomization": null,
                  "OrderStatusId": 4,
                  "IsDisabled": false
            },
            {
                  "Id": 19,
                  "Name": "DESIGN REVIEW (FROM PRODUCTION)",
                  "CbText": "WIP : Design Review",
                  "CustomerText": "In Production",
                  "Sequence": 140,
                  "AllowCustomization": null,
                  "OrderStatusId": 4,
                  "IsDisabled": false
            },
            {
                  "Id": 24,
                  "Name": "SALES REVIEW (FROM DESIGN)",
                  "CbText": "WIP : Sales Review",
                  "CustomerText": "Quality Control",
                  "Sequence": 150,
                  "AllowCustomization": null,
                  "OrderStatusId": 4,
                  "IsDisabled": false
            },
            {
                  "Id": 6,
                  "Name": "BUILT",
                  "CbText": "BUILT",
                  "CustomerText": "BUILT",
                  "Sequence": 160,
                  "AllowCustomization": null,
                  "OrderStatusId": 9,
                  "IsDisabled": false
            },
            {
                  "Id": 5,
                  "Name": "BUILT",
                  "CbText": "BUILT",
                  "CustomerText": "BUILT",
                  "Sequence": 170,
                  "AllowCustomization": null,
                  "OrderStatusId": 9,
                  "IsDisabled": true
            },
            {
                  "Id": 20,
                  "Name": "BUILT",
                  "CbText": "BUILT",
                  "CustomerText": "BUILT",
                  "Sequence": 180,
                  "AllowCustomization": null,
                  "OrderStatusId": 9,
                  "IsDisabled": true
            },
            {
                  "Id": 21,
                  "Name": "BUILT",
                  "CbText": "BUILT",
                  "CustomerText": "BUILT",
                  "Sequence": 190,
                  "AllowCustomization": null,
                  "OrderStatusId": 9,
                  "IsDisabled": true
            },
            {
                  "Id": 4,
                  "Name": "COMPLETED",
                  "CbText": "COMPLETED",
                  "CustomerText": "COMPLETED",
                  "Sequence": 200,
                  "AllowCustomization": null,
                  "OrderStatusId": 2,
                  "IsDisabled": false
            },
            {
                  "Id": 2,
                  "Name": "COMPLETED",
                  "CbText": "COMPLETED",
                  "CustomerText": "COMPLETED",
                  "Sequence": 210,
                  "AllowCustomization": null,
                  "OrderStatusId": 2,
                  "IsDisabled": true
            },
            {
                  "Id": 3,
                  "Name": "COMPLETED",
                  "CbText": "COMPLETED",
                  "CustomerText": "COMPLETED",
                  "Sequence": 220,
                  "AllowCustomization": null,
                  "OrderStatusId": 2,
                  "IsDisabled": true
            },
            {
                  "Id": 22,
                  "Name": "COMPLETED",
                  "CbText": "COMPLETED",
                  "CustomerText": "COMPLETED",
                  "Sequence": 230,
                  "AllowCustomization": null,
                  "OrderStatusId": 2,
                  "IsDisabled": true
            },
            {
                  "Id": 27,
                  "Name": "ON ACCOUNT",
                  "CbText": "COMPLETED : On Account",
                  "CustomerText": "On Account",
                  "Sequence": 240,
                  "AllowCustomization": null,
                  "OrderStatusId": 2,
                  "IsDisabled": false
            },
            {
                  "Id": 28,
                  "Name": "PAST DUE",
                  "CbText": "COMPLETED : Past Due",
                  "CustomerText": "Past Due",
                  "Sequence": 250,
                  "AllowCustomization": null,
                  "OrderStatusId": 2,
                  "IsDisabled": false
            },
            {
                  "Id": 29,
                  "Name": "PAID IN FULL",
                  "CbText": "CLOSED : Paid In Full",
                  "CustomerText": "Paid In Full",
                  "Sequence": 260,
                  "AllowCustomization": null,
                  "OrderStatusId": 1,
                  "IsDisabled": false
            },
            {
                  "Id": 11,
                  "Name": "VOIDED",
                  "CbText": "VOIDED",
                  "CustomerText": "Voided",
                  "Sequence": 270,
                  "AllowCustomization": null,
                  "OrderStatusId": 5,
                  "IsDisabled": false
            },
            {
                  "Id": 13,
                  "Name": "NONE",
                  "CbText": "NONE",
                  "CustomerText": "Order Closed",
                  "Sequence": 1000,
                  "AllowCustomization": false,
                  "OrderStatusId": 5,
                  "IsDisabled": false
            },
            {
                  "Id": 1,
                  "Name": "CLOSED",
                  "CbText": "CLOSED : Closed",
                  "CustomerText": "Order Closed",
                  "Sequence": 1010,
                  "AllowCustomization": false,
                  "OrderStatusId": 1,
                  "IsDisabled": false
            },
            {
                  "Id": 25,
                  "Name": "OLD_CLOSED",
                  "CbText": "IMPORT_CLOSED",
                  "CustomerText": "Old Closed",
                  "Sequence": 1020,
                  "AllowCustomization": false,
                  "OrderStatusId": 1,
                  "IsDisabled": false
            }
      ];
      #jobObject = [/**{
                  "Id": 57855,
                  "OrderId": 16078,
                  "OrderDescription": "Reorder: Vehicle Magnets (2 x In total)",
                  "OrderStatusId": 4,
                  "OrderStatusName": "WIP",
                  "LocationId": 2,
                  "AccountId": 8120,
                  "LineItemOrder": 1,
                  "TotalProductsInOrder": 3,
                  "OrderProductStatusId": 14,
                  "OrderProductStatusTextWithOrderStatus": "WIP : Proof Approved",
                  "OrderProductTagsId": 0,
                  "OrderProductTagsName": "none",
                  "EnteredByUsername": "Ben Jones",
                  "DesignerUserId": -1,
                  "DesignerName": "Open",
                  "SalesPersonId": 18,
                  "SalesPersonName": "Ben Jones",
                  "SalesPersonId2": 0,
                  "SalesPersonName2": "--- No Set ---",
                  "CompanyName": "Organic Pest Control",
                  "Description": "VEHICLE MAGNETS - 610mm x 400mm - set of 2",
                  "OrderInvoiceNumber": "INV-18890",
                  "OrderEstimateNumber": null,
                  "OrderDueDate": "04/07/2024 04:00 PM",
                  "ProductDueDate": "04/07/2024 04:00 PM",
                  "DesignDueDate": "27/06/2024 01:00 PM",
                  "FixedDueDate": false,
                  "TotalPrice": 453.96,
                  "IsMerged": false,
                  "AssignedUsers": " Leandri Hayward",
                  "ExternalImagePath": null,
                  "IsUsingTaxJarTax": false,
                  "TotalPaid": 499.36,
                  "SearchEncodedDueDateRangeTypeNames": "DueNext7Days",
                  "SearchEncodedPartIds": "",
                  "SearchEncodedPartCategoryIds": "",
                  "SearchEncodedProductionMachineIds": "",
                  "SearchEncodedProductSubStatusIds": "#0S",
                  "QueueColor": "queue-gradientRed",
                  "SearchQueueResponsibiltyIds": "#8Q",
                  "ProductsSummaryOrderView": null,
                  "ProductionLocationId": 2,
                  "ProductionLocationName": "Springwood",
                  "QueuePrioritySettingId": 8,
                  "QueuePrioritySettingOrder": 5,
                  "QueuePriority": 1,
                  "QueuePrioritySettingColor": "#ffc000",
                  "OrderContactName": "Stuart Granger",
                  "OrderContactWorkPhone": "07 3299 6006",
                  "OrderContactCellPhone": "0412 455 610",
                  "ProofFileName": "proof_16078_57855_0.pdf",
                  "OrderProductPartTagIds": [],
                  "ArtworkID": "",
                  "EcommExternalImagePath": null,
                  "OrderNotes": null,
                  "OrderFixedDueDate": false,

                  containerObject: UIContainer_Design2
            }*/
      ];
      modalIsOpen = false;
      #hasLoadedSecondaryData;
      #numOfNotes_Type = {
            Design: 0,
            Sales: 0,
            Production: 0,
            Vendor: 0,
            Customer: 0
      };
      #notes = [
            {
                  "name": "sales",
                  "container": null,
                  "qty": 0,
                  "loader": null,
                  "button": null,
                  "qtyCircle": null,
                  "recipient": null
            },
            {
                  "name": "design",
                  "container": null,
                  "qty": 0,
                  "loader": null,
                  "button": null,
                  "qtyCircle": null,
                  "recipient": null
            },
            {
                  "name": "production",
                  "container": null,
                  "qty": 0,
                  "loader": null,
                  "button": null,
                  "qtyCircle": null,
                  "recipient": null
            },
            {
                  "name": "customer",
                  "container": null,
                  "qty": 0,
                  "loader": null,
                  "button": null,
                  "qtyCircle": null,
                  "recipient": null
            },
            {
                  "name": "vendor",
                  "container": null,
                  "qty": 0,
                  "loader": null,
                  "button": null,
                  "qtyCircle": null,
                  "recipient": null
            }
      ];
      #productNotes;
      #noteQtyCircles = [];

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
      #f_jobNoBtn;
      #f_itemNoBtn;
      #f_jobColour;
      #f_jobOrder;
      #f_proofLink;
      #f_descriptionFieldContainer;
      #f_descriptionLoader;
      #f_customerContactDiv;
      #f_customerEmail;
      #f_emailLoader;
      #f_productQty;
      #f_productQtyLoader;
      #f_designer;
      #f_WIPStatus;
      #f_lineItemDescriptionText;
      #f_partsText;
      #f_partsLoader;
      #f_addNoteInput;
      #f_illustratorDiv;

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
      get jobColour() {return RGBToHex(this.#f_jobColour.style.backgroundColor);}//
      get QueuePrioritySettingId() {return this.#QueuePrioritySettingId;}
      get jobOrder() {return this.#f_jobOrder.innerText;}
      get jobObject() {return this.#jobObject;}
      get userCanSeeCosting() {return this.#usersWithSalesPermissions.includes(this.currentUser);}
      get designer() {return this.#f_designer[1].options[this.#f_designer[1].selectedIndex].text;}
      get CompanyName() {return this.#jobObject.CompanyName;}

      /*Setter*/
      set whenClosedReturnBorrowed(val) {
            this.#whenClosedReturnBorrowed = val;
            if(this.#f_popOutModal) this.#f_popOutModal.whenClosedReturnBorrowed = val;
      }
      set Id(value) {this.#Id = value;}
      set OrderId(value) {this.#OrderId = value;}
      set Priority(value) {this.#Priority = value;}
      set jobColour(value) {
            this.#f_jobColour.style.backgroundColor = value;
      }
      set QueuePrioritySettingId(value) {this.#QueuePrioritySettingId = value;}

      setOrder(value) {this.#f_jobOrder.innerText = value;}
      setColour(value) {this.#f_jobColour.style.backgroundColor = value;}
      setStatusId(value) {this.#jobObject.OrderProductStatusId = value;}
      setWIP(value) {
            for(let i = 0; i < this.#f_WIPStatus[1].options.length; i++) {
                  if(this.#f_WIPStatus[1].options[i].innerText === value) {
                        this.#f_WIPStatus[1].options.selectedIndex = i;
                        return;
                  }
            }
      }

      constructor(overrideCssStyles, jobObject, parentObjectToAppendTo) {
            this.#overrideCssStyles = overrideCssStyles;
            this.#jobObject = jobObject;
            this.#parentObjectToAppendTo = parentObjectToAppendTo;

            this.currentUser = "tristan";//document.querySelector("#CurrentUserLabel").innerText;TODO

            this.CreateGUI();
            this.Minimize();
      }

      CreateGUI() {
            let self = this;

            this.#f_container = document.createElement("div");
            this.#f_container.className = "UIContainer_Design";
            this.#f_container.style = STYLE.Div3;
            this.#f_container.style.cssText += "display:flex;flex-direction:column;border:1px solid rgb(0,0,0,0.6);cursor:auto;width: calc(100% - 40px);margin:10px 20px;position:relative;";
            this.#f_container.style.boxShadow = "rgb(0, 0, 0, 0.5) 0px 0px 20px 0px";
            this.#f_container.style.cssText += this.#overrideCssStyles;

            if(this.#parentObjectToAppendTo != null) {
                  this.#parentObjectToAppendTo.appendChild(this.#f_container);
            }
            /*
            Hover Animations*/
            $(this.#f_container).hover(function() {
                  if(self.allowHoverAnimations) {
                        this.style.boxShadow = "rgb(0, 0, 0, 0.9) 0px 0px 20px 0.5px";
                        this.style.cssText += "transform: scale(1.01, 1.01);";
                  }
            }, function() {
                  this.style.boxShadow = "rgb(0, 0, 0, 0.5) 0px 0px 20px 0px";
                  this.style.cssText += "transform: scale(1.0, 1.0);";
            });

            /*
            Header*/
            this.#f_headingContainer = document.createElement("div");
            this.#f_headingContainer.style = "width:100%;height:" + this.#headingContainer_Height + "px;box-sizing:border-box;";

            this.#f_headingContainer.addEventListener("click", (e) => {
                  if(e.target == this.#f_headingContainer) {
                        this.popOut();
                  }
            });
            this.#f_container.appendChild(this.#f_headingContainer);
            /*
            Customer Name*/
            this.#f_customerNameHeadingContainer = document.createElement("div");
            this.#f_customerNameHeadingContainer.style = "width:100%;height:" + this.#customerNameHeadingContainer_Height + "px;box-sizing:border-box;";
            this.#f_container.appendChild(this.#f_customerNameHeadingContainer);

            this.#f_customerNameTextField = document.createElement("h3");
            this.#f_customerNameTextField.innerText = this.#jobObject.CompanyName;
            this.#f_customerNameTextField.style = "float: left; height: 30px; margin: 0px 0px 0px 0px; background-color: " + COLOUR.White +
                  "; width: calc(100%); box-sizing: border-box; padding: 0px; font-size: 16px; color: " + COLOUR.Black + "; text-align: center; line-height: 30px; border: 1px solid " + COLOUR.White +
                  ";overflow: hidden;text-overflow: ellipsis;white-space: nowrap;padding-left: 4px;padding-right: 4px;";
            this.#f_customerNameHeadingContainer.appendChild(this.#f_customerNameTextField);

            this.#f_customerNameHeadingContainer.addEventListener("click", () => {
                  this.popOut();
            });
            /*
            Job Name*/
            this.#f_jobNameHeadingContainer = document.createElement("div");
            this.#f_jobNameHeadingContainer.style = "width:100%;height:" + this.#jobNameHeadingContainer_Height + "px;box-sizing:border-box;";
            this.#f_container.appendChild(this.#f_jobNameHeadingContainer);

            this.#f_jobNameTextField = document.createElement("h3");
            this.#f_jobNameTextField.innerText = this.#jobObject.Description;
            this.#f_jobNameTextField.style = "float: left; height: 30px; margin: 0px 0px 0px 0px; background-color: " + COLOUR.White +
                  "; width: calc(100%); box-sizing: border-box; padding: 0px; font-size: 10px; color: " + COLOUR.DarkGrey +
                  "; text-align: center; line-height: 30px; border: 1px solid " + COLOUR.White + ";overflow: hidden;text-overflow: ellipsis;white-space: nowrap;padding-left: 4px;padding-right: 4px;";
            this.#f_jobNameHeadingContainer.appendChild(this.#f_jobNameTextField);

            this.#f_jobNameHeadingContainer.addEventListener("click", () => {
                  this.popOut();
            });
            /*
            Content Container*/
            this.#f_contentContainer = document.createElement("div");
            this.#f_contentContainer.style = "width:100%;max-height:calc(100% - 30px);display:block;overflow: auto;background-color:" + COLOUR.MidGrey;
            this.#f_container.appendChild(this.#f_contentContainer);
            /*
            Job Number*/
            this.#f_jobNoBtn = createLink("display: block; float: left; width: " + 80 + "px;height:" + 30 + "px; border:none;color:White;text-align:center;line-height:30px;min-height: 20px; margin: 0px 0px 0px 0px; box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px;background-color:" + COLOUR.Black + ";", this.#jobObject.OrderInvoiceNumber, "/DesignModule/DesignOrderView.aspx?OrderId=" + this.#jobObject.OrderId, "_blank", this.#f_contentContainer);
            this.addHeadingButtons(this.#f_jobNoBtn);
            /*
            Item Number*/
            this.#f_itemNoBtn = createLink("display: block; float: left; width: " + 40 + "px;height:" + 30 + "px; border:none;color:White;text-align:center;line-height:30px;min-height: 20px; margin: 0px 0px 0px 0px; box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px;background-color:" + COLOUR.DarkGrey, this.#jobObject.LineItemOrder + "/" + this.#jobObject.TotalProductsInOrder, "/DesignModule/DesignProductEdit.aspx?OrderProductId=" + this.#jobObject.Id + "&OrderId=" + this.#jobObject.OrderId, "_blank", this.#f_contentContainer);
            this.addHeadingButtons(this.#f_itemNoBtn);
            /*
            Job Colour*/
            this.#f_jobColour = document.createElement("div");
            this.#f_jobColour.style = "display: block; float: left; width: " + 30 + "px;height:" + 30 + "px; border:none;padding:0px; position:relative;color:black;min-height: 20px; margin: 0px 0px 0px 0px; box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px;background-color:" + (this.#jobObject.QueuePrioritySettingColor == null ? "white" : this.#jobObject.QueuePrioritySettingColor) + ";";
            this.#f_jobColour.id = "jobColour";
            this.addHeadingButtons(this.#f_jobColour);
            /*
            Job Order*/
            this.#f_jobOrder = createButton(this.#jobObject.QueuePriority, "display: block; float: left; width: " + 30 + "px;height:" + 30 + "px; border:none;pointer-events:none;padding:2px; color:black;min-height: 20px; margin: 0px 0px 0px 0px; box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px;background-color:" + COLOUR.White + ";", () => { });

            this.#f_jobOrder.id = "queuePriority";
            this.addHeadingButtons(this.#f_jobOrder);
            /*
            Proof*/
            if(this.#jobObject.ProofFileName != "") {
                  this.#f_proofLink = createLink("display: block; float: right; width: 30px; background-color: " + COLOUR.White + "; color:white;min-height: 30px; margin: 0px; border:0px solid " + COLOUR.Blue + ";cursor: pointer;font-size:10px;text-align:center;line-height:30px;", "", "../../ShowImage.aspx?LoadLocalProof=proof_" + this.#jobObject.OrderId + "_" + this.#jobObject.Id + "_0.pdf", "new window", this.#f_contentContainer);
                  this.#f_proofLink.style.backgroundImage = "url(/Themes/Images/icon_view_proof.png)";
                  this.#f_proofLink.style.cssText += "background-repeat: no-repeat;background-size:100%;background-position:center center";
                  this.addHeadingButtons(this.#f_proofLink);
            }
            /*
            Visit Buttons*/
            let buttonsContainer = createDivStyle5("width:calc(100%);", "VISIT", this.#f_contentContainer)[1];
            createLink("display: block; float: left; width: 200px; background-color: " + COLOUR.Blue + "; color:white;min-height: 35px; margin: 10px; border:4px solid " + COLOUR.Blue + ";cursor: pointer;font-size:14px;text-align:center;line-height:35px;", "UPLOAD PROOF", "/DesignModule/DesignProductEdit.aspx?OrderProductId=" + this.#jobObject.Id + "&OrderId=" + this.#jobObject.OrderId, "new window", buttonsContainer);
            createLink("display: block; float: left; width: 200px; background-color: " + COLOUR.Blue + "; color:white;min-height: 35px; margin: 10px; border:4px solid " + COLOUR.Blue + ";cursor: pointer;font-size:14px;text-align:center;line-height:35px;", "see ORDER", "/DesignModule/DesignOrderView.aspx?OrderId=" + this.#jobObject.OrderId, "new window", buttonsContainer);
            createLink("display: block; float: left; width: 200px; background-color: " + COLOUR.Blue + "; color:white;min-height: 35px; margin: 10px; border:4px solid " + COLOUR.Blue + ";cursor: pointer;font-size:14px;text-align:center;line-height:35px;", "see ITEM", "/DesignModule/DesignProductEdit.aspx?OrderProductId=" + this.#jobObject.Id + "&OrderId=" + this.#jobObject.OrderId, "new window", buttonsContainer);
            if(this.userCanSeeCosting) createLink("display: block; float: left; width: 200px; background-color: " + COLOUR.Blue + "; color:white;min-height: 35px; margin: 10px; border:4px solid " + COLOUR.Blue + ";cursor: pointer;font-size:14px;text-align:center;line-height:35px;", "open in SALES", "/SalesModule/Orders/Order.aspx?OrderId=" + this.#jobObject.OrderId, "new window", buttonsContainer);
            /*
            Description*/
            this.#f_descriptionFieldContainer = createDivStyle5("width:calc(100%);", "DESCRIPTION", this.#f_contentContainer)[1];
            this.#f_descriptionFieldContainer.style.cssText += "min-height:200px;max-height:200px;overflow-y:scroll;";

            this.#f_lineItemDescriptionText = createText("", "width:100%;height: 100%;padding:10px;", this.#f_descriptionFieldContainer);

            this.#f_descriptionLoader = new Loader(this.#f_descriptionFieldContainer);
            /*
            About*/
            let inhouseDiv = createDivStyle5("width:calc(100%);", "ABOUT", this.#f_contentContainer)[1];

            //Product Qty
            this.#f_productQty = createInput_Infield("product Qty", null, null, null, inhouseDiv, false, null);
            setFieldDisabled(true, this.#f_productQty[1], this.#f_productQty[0]);
            this.#f_productQtyLoader = new Loader(this.#f_productQty[0]);

            //Designer
            this.#f_designer = createDropdown_Infield("Designer", 2, "",
                  [createDropdownOption("Darren Frankish", "20"),
                  createDropdownOption("Leandri Hayward", "31"),
                  createDropdownOption("null", "")], async () => {
                        let loader = new Loader(this.#f_designer[0]);

                        await AssignUsersToOrderProduct(this.#jobObject.OrderId, this.#jobObject.Id, this.#f_designer[1].value);

                        loader.Delete();
                  }, inhouseDiv);

            for(let x = 0; x < this.#f_designer[1].options.length; x++) {

                  let val1 = "" + this.#f_designer[1].options[x].innerText.toString().replaceAll(" ", "");
                  let val2 = "";

                  if(this.#jobObject.AssignedUsers == null) val2 += "null";
                  else val2 += this.#jobObject.AssignedUsers.toString().replaceAll(" ", "");

                  if(val1 == val2) {
                        this.#f_designer[1].selectedIndex = x;
                        break;
                  }
            }

            //WIP
            let dropdownOptions = [];
            for(let j = 0; j < this.#WIPOptions.length; j++) {
                  let WIPID = 0;
                  for(let k = 0; k < this.#allOrderProductStatuses.length; k++) {
                        if(this.#allOrderProductStatuses[k]['CbText'] == this.#WIPOptions[j]) {
                              WIPID = this.#allOrderProductStatuses[k]['Id'];
                        }
                  }
                  dropdownOptions.push(createDropdownOption(this.#WIPOptions[j], WIPID));
            }
            this.#f_WIPStatus = createDropdown_Infield("WIP Status", 0, "", dropdownOptions, async () => {
                  this.OnWIPChange();
            }, inhouseDiv);

            for(let x = 0; x < this.#f_WIPStatus[1].options.length; x++) {
                  if(this.#jobObject.OrderProductStatusTextWithOrderStatus == this.#f_WIPStatus[1].options[x].innerText) {
                        this.#f_WIPStatus[1].selectedIndex = x;
                        break;
                  }
            }

            //Sales Person
            createInput_Infield("Sales Person", this.#jobObject.SalesPersonName, null, () => { }, inhouseDiv, false, null);

            //Item Price
            if(this.userCanSeeCosting) createInput_Infield("Item Price", this.#jobObject.TotalPrice, null, () => { }, inhouseDiv, false, null, {prefix: "$"});

            /*
            Customer*/
            this.#f_customerContactDiv = createDivStyle5("width:calc(100%);", "CUSTOMER", this.#f_contentContainer)[1];

            createInput_Infield("Contact Name", this.#jobObject.OrderContactName, null, () => { }, this.#f_customerContactDiv, false, null);
            createInput_Infield("Contact Phone", this.#jobObject.OrderContactWorkPhone, null, () => { }, this.#f_customerContactDiv, false, null);
            createInput_Infield("Contact Phone 2", this.#jobObject.OrderContactCellPhone, null, () => { }, this.#f_customerContactDiv, false, null);
            this.#f_customerEmail = createInput_Infield("Contact Email", "", null, () => { }, this.#f_customerContactDiv, false, null);
            this.#f_emailLoader = new Loader(this.#f_customerEmail[0]);

            /*
            Notes Container*/
            let notesContainer = createDivStyle5("width:calc(100%);", "NOTES", this.#f_contentContainer)[1];
            AddCssStyle("overflow-y:auto;", notesContainer);

            for(let n = 0; n < this.#notes.length; n++) {
                  this.#notes[n].button = createButton(this.#notes[n].name, "width:20%;height:50px;margin:0px;position:relative;padding-top:20px;", () => {
                        this.toggleNoteContainers(this.#notes[n].name);
                  }, notesContainer);

                  this.#notes[n].qtyCircle = this.createQtyCircle(0, this.#notes[n].button);
            }
            for(let n = 0; n < this.#notes.length; n++) {
                  this.#notes[n].recipient = createCheckbox_Infield("", false, "width:20%;padding-left: calc(10% - 20px);margin:0px;", () => { }, notesContainer, null);
            }
            let recipientsLabel = createLabel("Recipients", "width:100%;margin:0px;margin-bottom:20px;height:10px;font-size:12px;background-color:" + COLOUR.MediumGrey + ";color:black;text-align:center;", notesContainer);

            this.#f_addNoteInput = createTextarea("Add Note", "", "width:80%;margin:0px;box-sizing:border-box;height:35px;margin:10px;margin-right:0px;resize: vertical;box-shadow:none;", () => { }, notesContainer);
            let addNoteBtn = createButton("+ Add Note", "width:calc(20% - 20px);margin:10px;margin-left:0px;", async () => {
                  let loader = new Loader(addNoteBtn);

                  await this.addNote(this.#f_addNoteInput.value, null, null, null);

                  loader.Delete();
                  this.#f_addNoteInput.value = "";
            }, notesContainer);

            for(let n = 0; n < this.#notes.length; n++) {
                  this.#notes[n].container = document.createElement("div");
                  this.#notes[n].container.style = "width:calc(100% - 20px);margin:10px;min-height:100px;max-height:300px;overflow-y:auto;box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 20px 0px;background-color:" + COLOUR.MidGrey;
                  notesContainer.appendChild(this.#notes[n].container);

                  this.#notes[n].loader = new Loader(this.#notes[n].container);
            }

            this.toggleNoteContainers("design");

            /*
            Address*/
            let addressContainer = createDivStyle5("width:calc(100%);", "ADDRESS", this.#f_contentContainer)[1];
            /*
            Parts Container*/
            let partsContainer = createDivStyle5("width:calc(100%);", "PARTS", this.#f_contentContainer)[1];
            partsContainer.style.cssText += "min-height:100px;max-height:300px;overflow-y:scroll;";

            this.#f_partsText = createText("", "width:100%;height: 100%;padding:10px;", partsContainer);
            this.#f_partsLoader = new Loader(partsContainer);
            /*
            Illustrator*/
            this.#f_illustratorDiv = createDivStyle5("width:calc(100%);", "ILLUSTRATOR", this.#f_contentContainer)[1];

      }

      ///Notes
      toggleNoteContainers(noteTypeToShow = "Design") {
            let _noteTypeToShow = noteTypeToShow.toLowerCase();

            for(let n = 0; n < this.#notes.length; n++) {
                  $(this.#notes[n].container).hide();
                  this.#notes[n].button.style.borderBottomColor = COLOUR.Blue;

                  if(this.#notes[n].name.toLowerCase() === _noteTypeToShow) {
                        $(this.#notes[n].container).show();
                        this.#notes[n].button.style.borderBottomColor = "red";
                  }
            }
      }

      async loadNotes() {
            this.#productNotes = await getProductNotesAll(this.#jobObject.Id);

            for(let n = 0; n < this.#notes.length; n++) {
                  removeAllChildrenFromParent(this.#notes[n].container);

                  let numOfNotes = this.#productNotes[n].ProductionNotes.length;

                  //Add Notes
                  for(let x = numOfNotes - 1; x >= 0; x--) {

                        if(this.#productNotes[n].ProductionNotes[x].IsHidden) continue;

                        await this.addNote(this.#productNotes[n].ProductionNotes[x].Note, this.#productNotes[n].ProductionNotes[x].CreatedByName, this.#productNotes[n].ProductionNotes[x].Id, n);
                  }
                  if(this.#notes[n].loader) this.#notes[n].loader.Delete();
            }
      }

      async addNote(text, createdBy, noteId, typeIndex = 1/*Design*/) {
            if(!createdBy) createdBy = this.currentUser;

            if(noteId == null || typeIndex == null) {
                  let rArray = [];
                  for(let n = 0; n < this.#notes.length; n++) {
                        rArray.push(this.#notes[n].recipient[1].checked);
                  }

                  let addedNote = await addProductNote(this.#jobObject.Id, text, ...rArray);
                  for(let n = 0; n < this.#notes.length; n++) {
                        if(this.#notes[n].recipient[1].checked) {
                              let addedNote = await getProductNotes(this.#jobObject.Id, n + 1);
                              await this.addNote(text, createdBy, addedNote.ProductionNotes[0].Id, n);
                        }
                  }
            } else {
                  let newNote = createDiv("width:calc(100% - 20px);margin:10px;min-height:40px;background-color:#eee;padding:10px;display:none;padding-bottom:20px;position:relative;" + STYLE.DropShadow, null);
                  newNote.id = noteId;

                  let noteText = createText(text, "width:calc(100% - 120px);height:100%;", newNote);

                  let deleteButton = createButton("X", "width:30px;height:15px;margin:0px;float:right;background-color:" + COLOUR.Red + ";transform: translate(10px, -10px);", async () => {
                        let loader = new Loader(newNote);
                        await this.deleteNote(noteId, typeIndex);
                        loader.Delete();
                        deleteElement(newNote);
                        deleteElement(deleteButton);
                        deleteElement(noteText);
                        deleteElement(createdByText);
                  }, newNote);

                  let createdByText = createText(createdBy, "width:100%;height:20px;position:absolute;bottom:0px;right:0px;text-align:right;position;color:" + COLOUR.MidGrey, newNote);

                  this.#notes[typeIndex].qty++;
                  this.updateQtyCircles();

                  let containerToAppendTo = this.#notes[typeIndex].container;
                  if(containerToAppendTo.firstChild) {
                        insertBefore(newNote, containerToAppendTo.firstChild);
                  } else {
                        containerToAppendTo.appendChild(newNote);
                  }
                  $(newNote).fadeIn(500);
            }
      }

      async deleteNote(noteId, typeIndex) {
            await deleteProductNote(noteId);
            this.#notes[typeIndex].qty--;
            this.updateQtyCircles();
      }

      ///Qty Circles
      createQtyCircle(qty, attachedTo) {
            let numberDisplayDiv = document.createElement("div");
            numberDisplayDiv.innerText = qty;
            numberDisplayDiv.style = "display:none;width:20px;height:15px;background-color:red;border-radius:10px;font-size:10px;font-weight:bold;position:absolute;top:0px;left:calc(50% - 10px);color:white;padding-top:4px;";
            attachedTo.appendChild(numberDisplayDiv);
            return numberDisplayDiv;
      }

      updateQtyCircles() {
            for(let n = 0; n < this.#notes.length; n++) {
                  this.#notes[n].qtyCircle.innerText = this.#notes[n].qty;
                  if(this.#notes[n].qty == 0) $(this.#notes[n].qtyCircle).hide();
                  else $(this.#notes[n].qtyCircle).show();
            }
      }

      ///WIP
      async OnWIPChange() {
            let loader = new Loader(this.#f_WIPStatus[0]);
            await updateItemStatus(this.#jobObject.Id, this.#f_WIPStatus[1].value, this.#f_WIPStatus[1].options[this.#f_WIPStatus[1].selectedIndex].value);

            $("#imgExpander_" + this.#jobObject.Id).click();
            $("#imgExpander_" + this.#jobObject.Id).click();

            this.#f_popOutModal.hide();
            setFieldDisabled(false, this.#f_popOutBtn);
            this.popOutLeave();
            this.onCallback();
            this.modalIsOpen = false;

            document.dispatchEvent(new CustomEvent("WIPStatusChange", {
                  bubbles: true,
                  detail: {
                        container: this.#f_container,
                        newWIPStatus: this.#f_WIPStatus[1].selectedOptions[0].innerText,
                        parentContainer: this.#f_container.parentNode
                  }
            }));

            loader.Delete();
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

      Hide() {
            this.#f_contentContainer.style.display == "none";
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

            this.allowHoverAnimations = false;

            let self = this;
            let cb = function() {
                  setFieldDisabled(false, self.#f_popOutBtn);
                  self.popOutLeave();
                  self.onCallback();
                  self.modalIsOpen = false;
            };
            this.#f_popOutModal = new ModalPopOut("Expanded View", cb, self.#f_container);
            this.#f_popOutModal.shouldHideOnEnterKeyPress = false;
            this.#f_popOutModal.whenClosedReturnBorrowed = this.#whenClosedReturnBorrowed;

            this.modalIsOpen = true;

            setFieldDisabled(true, this.#f_popOutBtn);

            this.prePopOutState = this.#isMinimized;
            this.Maximize();
            this.#f_contentContainer.style.maxHeight = "100%";
            this.#f_container.style.maxHeight = "10000px";
            this.#f_container.style.cssText += "margin:0px;width:100%;";

            this.onPopOut();
            this.loadSecondaryFields();
      }

      popOutLeave() {
            if(this.prePopOutState == true) this.Minimize(); else this.Maximize();//if was minimized before, restore to minimized
            this.allowHoverAnimations = true;
            this.onPopOutLeave();
      }

      async loadSecondaryFields() {
            if(this.#hasLoadedSecondaryData) return;

            //Load Email
            this.#f_customerEmail[1].value = await getCustomerEmail(this.#jobObject.OrderId, this.#jobObject.AccountId);
            this.#f_emailLoader.Delete();


            //Load other Quote-scope data
            let data = await getOrderData_QuoteLevel(this.#jobObject.OrderId, this.#jobObject.AccountId, this.#jobObject.CompanyName);

            let lineItemOrder = this.#jobObject.LineItemOrder;
            let productQty = data.OrderInformation.OrderInformation.H2[lineItemOrder - 1].B0;
            let lineItemDescription = data.OrderInformation.OrderInformation.H2[lineItemOrder - 1].I1;
            let amountPaid = data.OrderInformation.OrderInformation.G0;
            let amountDue = data.OrderInformation.OrderInformation.F9;
            let partPreviewsArray = data.OrderInformation.OrderInformation.H2[lineItemOrder - 1].PartPeekViews;

            this.#f_lineItemDescriptionText.innerHTML = lineItemDescription;
            this.#f_descriptionLoader.Delete();

            this.#f_productQty[1].value = productQty;
            this.#f_productQtyLoader.Delete();

            let partsString = "";
            for(let a = 0; a < partPreviewsArray.length; a++) {
                  let partName = partPreviewsArray[a].O2;
                  partsString += (a + 1) + ': ' + partName + '\n';
            }
            this.#f_partsText.innerText = partsString;
            this.#f_partsLoader.Delete();

            /*
            Payment*/
            if(this.userCanSeeCosting) {
                  let paymentDueBtn = createButton("$", "display: block; float: right; width: " + 30 + "px;height:" + 30 +
                        "px; border:none;padding:2px; color:black;min-height: 20px; margin: 0px 0px 0px 0px; box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px;background-color:" + COLOUR.Yellow + ";", () => {
                              let paymentModal = new ModalSingleInput("Payment Due - " + this.#jobObject.CompanyName + " - " + this.#jobObject.OrderInvoiceNumber, () => { });
                              paymentModal.value = amountDue;
                              setFieldDisabled(true, paymentModal.valField[1], paymentModal.valField[0]);
                              paymentModal.setContainerSize(400, 300);
                        });
                  let paymentNotDueBtn = createButton("&#10003", "display: block; float: right; width: " + 30 + "px;height:" + 30 +
                        "px; border:none;padding:2px; color:White;min-height: 20px; margin: 0px 0px 0px 0px; box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px;background-color:" + COLOUR.Green + ";", () => { });
                  paymentNotDueBtn.innerHTML = "&#10003";

                  if(amountDue > 0) {
                        this.addHeadingButtons(paymentDueBtn);
                  } else {
                        this.addHeadingButtons(paymentNotDueBtn);
                  }
            }
            /*
            Illustrator*/
            let button = createIconButton(GM_getResourceURL("Icon_AdobeIllustrator"), "Copy For Illustrator", "width:200px;height:35px;", async () => {
                  let x = '<?xml version="1.0" encoding="UTF-8"?>' +
                        '<svg id = "Layer_1" data-name="Layer 1" xmlns = "http://www.w3.org/2000/svg" width = "210mm" height = "297mm" viewBox = "0 0 595.28 841.89">' +
                        '<g>' +
                        '<text x="0" y="15" fill="black">' + ('Client: ' + this.#jobObject.CompanyName.replace("&", "and")) + '</text>' +
                        '<text x="0" y="30" fill="black">' + ('Job: ' + this.#jobObject.OrderDescription.replace("&", "and")) + '</text>' +
                        '<text x="0" y="45" fill="black">' + 'Description: ' + lineItemDescription.replace("<br>", "      ").replace("&nbsp;", "         ").replace(/<[^>]+>/g, '') + '</text>' +
                        '<text x="0" y="60" fill="black">' + 'Invoice Number: ' + this.#jobObject.OrderInvoiceNumber + '</text>' +
                        '<text x="0" y="75" fill="black">' + 'Line Item: ' + lineItemOrder + '</text>' +
                        '<text x="0" y="90" fill="black">' + 'Product Qty: ' + productQty + '</text>' +
                        '<text x="0" y="105" fill="black">' + 'Customer Name: ' + this.#jobObject.OrderContactName.replace("&", "and") + '</text>' +
                        '<text x="0" y="120" fill="black">' + 'Contact Phone 1: ' + this.#jobObject.OrderContactWorkPhone + '</text>' +
                        '<text x="0" y="135" fill="black">' + 'Contact Phone 2: ' + this.#jobObject.OrderContactCellPhone + '</text>' +
                        '<text x="0" y="150" fill="black">' + 'Sales Person: ' + this.#jobObject.SalesPersonName + '</text>' +
                        '<text x="0" y="165" fill="black">' + 'Item Description: ' + this.#jobObject.Description.replace("&", "and") + '</text>' +
                        '<text x="0" y="180" fill="black">' + 'Parts: ' + partsString.replace("&", "and") + '</text>' +
                        '<rect x="0" y="180" width = "595.28" height = "841.89" fill = "none" stroke = "#969696" stroke-miterlimit="10"/>' +
                        '</g>' +
                        '</svg>';
                  saveToClipboard(x);

                  var parser = new DOMParser();
                  var doc = parser.parseFromString(x, "image/svg+xml");

            }, this.#f_illustratorDiv, true);

            console.log(data);

            await this.loadNotes();

            this.#hasLoadedSecondaryData = true;
      }

      addHeadingButtons(...itemContainers) {
            for(let i = 0; i < itemContainers.length; i++) {
                  this.#f_headingContainer.appendChild(itemContainers[i]);
                  this.#addedHeadingItems_combinedWidth += itemContainers[i].offsetWidth;
            }
      }
}