
window.addEventListener("load", async (event) => {
      new DesignBoard2(document.body, "https://signschedulerapp.ts.r.appspot.com");
});


class DesignBoard2 extends JobBoard {
      /*
                        
      VARIABLES         
*/
      //StateID = OrderProductStatusId - production, design etc (WIP ID)
      //QueueID = QueuePrioritizationSettingId = colour number (Colour ID)
      #boards = [
            {title: "Hold", colour: "#a5a5a5", WIPStatus: "WIP : In Design", CBQueueID: "9", CBStateId: "7", fallbackPriority: 2},
            {title: "Urgent", colour: "#ff0000", WIPStatus: null, CBQueueID: "3", CBStateId: null, fallbackPriority: null},
            {title: "Design", colour: "#4472c4", WIPStatus: "WIP : In Design", CBQueueID: "5", CBStateId: "7", fallbackPriority: 1},
            {title: "Awaiting Approval", colour: "#ed7d31", WIPStatus: "WIP : Awaiting Proof Approval", CBQueueID: "16", CBStateId: "9", fallbackPriority: 1},
            {title: "Design Revision", colour: "#a9d08e", WIPStatus: "WIP : In Design Revision", CBQueueID: "14", CBStateId: "10", fallbackPriority: 1},
            {title: "Print Files To Be Done", colour: "#d9e1f2", WIPStatus: "WIP : Proof Approved", CBQueueID: "13", CBStateId: "14", fallbackPriority: 1},
            {title: "T To Approve Print Files", colour: "#47ad8b", WIPStatus: "WIP : Proof Approved", CBQueueID: "6", CBStateId: "14", fallbackPriority: 2},
            {title: "Print Files Approved", colour: "#ffc000", WIPStatus: "WIP : Proof Approved", CBQueueID: "8", CBStateId: "14", fallbackPriority: 3},
            {title: "In Production", colour: "#ff9999", WIPStatus: "WIP : In Production", CBQueueID: "10", CBStateId: "8"}
      ];

      #usersWithSalesPermissions = ["ben", "tristan", "pearl"];
      #designers = ["All", "Leandri Hayward", "Darren Frankish", "Tristan Cargill", "null"];

      #jobObjects = [/**{
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
      #numJobs = 0;
      /*
                         
      FIELDS             
*/
      #f_designerFilter;
      #f_companyFilter;
      #f_showPaymentsFilter;

      constructor(parentToAppendTo, options = {dataURLPath: null}) {
            super(parentToAppendTo);

            this.dataURLPath = options.dataURLPath;

            this.Start();
      }

      async Start() {
            this.CreateBoards();
            await this.LoadJobsData();
            this.CreateJobColumns();
            await this.AddJobCardsToBoards();
            this.AddFiltersToHeader();
            this.ListenForWIPChanges();
            await this.AddPaymentButtonToCards();
      }

      CreateBoards() {
            for(let b = 0; b < this.#boards.length; b++) {
                  this.CreateBoard(this.#boards[b].title, this.#boards[b].colour, this.#boards[b].CBQueueID, this.#boards[b].CBStateId, this.#boards[b].WIPStatus);
            }
      }

      async LoadJobsData() {
            if(!this.dataURLPath) throw Error("this.dataURLPath is null");
            console.time("LoadJobsData");
            let response = await fetch(this.dataURLPath + "/CB_DesignBoard_Data");
            const responseData = await response.json();
            console.log(responseData);
            let data = responseData;


            //await getDesignJobs();//TODO
            let awaitingApprovalJobs = [];//await getAwaitingApprovalJobs();//TODO
            console.timeEnd("LoadJobsData");

            this.#numJobs = data.length;
            for(let d = 0; d < this.#numJobs; d++) {
                  this.#jobObjects.push(data[d]);
            }

            this.#numJobs += awaitingApprovalJobs.length;
            for(let d = 0; d < awaitingApprovalJobs.length; d++) {
                  this.#jobObjects.push(awaitingApprovalJobs[d]);
            }
      }

      CreateJobColumns() {
            let self = this;
            for(let j = 0; j < this.#numJobs; j++) {
                  let jobObject = this.#jobObjects[j];

                  //Create Job Container
                  let jobContainer = new UIContainer_Design2("max-height:200px;", jobObject, null);
                  jobContainer.container.dataset.cb_id = jobObject.Id;
                  jobContainer.Id = jobObject.Id;
                  jobContainer.OrderId = jobObject.OrderId;
                  jobContainer.Priority = jobObject.QueuePriority;
                  jobContainer.JobColour = jobObject.QueuePrioritySettingColor;
                  jobContainer.QueuePrioritySettingId = jobObject.QueuePrioritySettingId;
                  jobContainer.onPopOut = function() {self.OnJobPopOut(jobObject.Id, j, jobObject.OrderId, jobObject.AccountId, jobContainer);};
                  jobContainer.onPopOutLeave = function() {self.OnJobPopOutLeave(jobObject.Id, j, jobContainer);};
                  jobContainer.container.id = "sortablelist";
                  jobContainer.container.containerObject = jobContainer;
                  jobObject.containerObject = jobContainer;
            }
      }

      async AddJobCardsToBoards() {
            for(let b = 0; b < this.#boards.length; b++) {
                  let board = this.#boards[b];

                  for(let j = 0; j < this.#jobObjects.length; j++) {
                        let jobObject = this.#jobObjects[j];

                        let jobColourMatchesBoardColour = jobObject.QueuePrioritySettingColor === board.colour;
                        let jobWIPMatchesBoardWIP = jobObject.OrderProductStatusTextWithOrderStatus === board.WIPStatus;
                        let jobHasNoColour = jobObject.QueuePrioritySettingColor == null || jobObject.QueuePrioritySettingColor == "#ffffff";

                        if(jobColourMatchesBoardColour) {
                              //if job WIP is same as board, or board WIP is any (null)
                              if(jobWIPMatchesBoardWIP || board.WIPStatus == null) {
                                    this.columnContainers[b].containerObject.contentContainer.appendChild(jobObject.containerObject.container);
                              }
                              //if job WIP doesn't match board colour, change job colour
                              else {
                                    await this.ChangeJobColourToSuitWIPAndAddToBoard(jobObject);
                              }
                        }

                        if(jobHasNoColour) {
                              await this.ChangeJobColourToSuitWIPAndAddToBoard(jobObject);
                        }

                        jobObject = this.#jobObjects[j];//refresh after changes made
                        if(jobObject.containerObject.jobColour == "#ff0000") {
                              jobObject.containerObject.container.classList.add("urgentPulse");
                        }
                  }
                  this.UpdateJobsInContainer(this.columnContainers[b].containerObject.contentContainer);
            }
      }

      async ChangeJobColourToSuitWIPAndAddToBoard(jobObject) {
            let boardsMatchingWIP = this.GetBoardsOfWIPStatus(jobObject.OrderProductStatusTextWithOrderStatus);
            console.log(boardsMatchingWIP);
            //choose lowest WIP status based on fallback priority
            let lowestFallbackPriority = 1000000;
            let lowestWIPStatusBoard;
            for(let w = 0; w < boardsMatchingWIP.length; w++) {
                  let board = boardsMatchingWIP[w];
                  if(board.fallbackPriority < lowestFallbackPriority) {
                        lowestWIPStatusBoard = board;
                        lowestFallbackPriority = board.fallbackPriority;
                  }
            }
            console.log(lowestWIPStatusBoard);
            //update job to match WIP Colour
            let newColour = lowestWIPStatusBoard.colour;

            //await updateItemPriority(jobObject.Id, jobObject.OrderId, lowestWIPStatusBoard.CBQueueID, newColour, lowestWIPStatusBoard.CBQueueID);//TODO

            jobObject.QueuePrioritySettingId = lowestWIPStatusBoard.CBQueueID;
            jobObject.QueuePrioritySettingColor = newColour;
            jobObject.containerObject.jobColour = newColour;

            //add to correct board
            for(let b = 0; b < this.#boards.length; b++) {
                  let board = this.#boards[b];

                  if(jobObject.QueuePrioritySettingId == board.CBQueueID) {
                        this.columnContainers[b].containerObject.contentContainer.appendChild(jobObject.containerObject.container);
                        return;
                  }
            }
      }

      GetBoardsOfWIPStatus(WIPStatus) {
            let boards = [];
            for(let b = 0; b < this.#boards.length; b++) {
                  let board = this.#boards[b];
                  if(board.WIPStatus === WIPStatus) boards.push(board);
            }
            return boards;
      }

      async AddPaymentButtonToCards() {
            if(!this.#usersWithSalesPermissions.includes(this.currentUser)) return;
      }

      OnJobPopOut() {
            ToggleTimerPause();//Corebridge Inherited Function
      }

      OnJobPopOutLeave() {
            ToggleTimerPause();//Corebridge Inherited Function
      }

      OnMoveEnd(event) {
            super.OnMoveEnd(event);

            this.UpdateJobsInContainer(event.from);//previous container
            this.UpdateJobsInContainer(event.to);//new container
      }

      async UpdateJobsInContainer(targetContainer) {
            let container = targetContainer;
            let children = container.children;

            for(let i = 0; i < children.length; i++) {
                  let currentOrder = children[i].containerObject.jobOrder;
                  let currentColour = children[i].containerObject.jobColour;
                  let currentStatusId = children[i].containerObject.jobObject.OrderProductStatusId;

                  let newOrder = i + 1;
                  let newColour = container.backgroundColour;
                  let newStateId = container.CBStateId;

                  let orderHasChanged = currentOrder != newOrder;
                  let colourHasChanged = currentColour != newColour;
                  let statusIdHasChanged = currentStatusId != newStateId && newStateId != null;

                  if(newColour == "#ff0000") {
                        children[i].containerObject.container.classList.add("urgentPulse");
                  } else {
                        children[i].containerObject.container.classList.remove("urgentPulse");
                  }

                  let loader;
                  if(orderHasChanged || colourHasChanged || statusIdHasChanged) {
                        loader = new Loader(children[i]);
                  }

                  //if order has changed...update order and colour
                  if(orderHasChanged || colourHasChanged) {
                        //await updateItemPriority(children[i].containerObject.Id, children[i].containerObject.OrderId, newOrder, newColour, container.CBQueueID);//TODO

                        children[i].containerObject.setOrder(newOrder);
                        children[i].containerObject.setColour(newColour);
                  }

                  //if status changed...update status
                  if(statusIdHasChanged) {
                        //await updateItemStatus(children[i].containerObject.Id, currentStatusId, newStateId);//TODO

                        children[i].containerObject.setStatusId(newStateId);
                        if(container.WIPStatus) children[i].containerObject.setWIP(container.WIPStatus);

                        $("#imgExpander_" + children[i].containerObject.Id).click();
                        await sleep(100);
                        $("#imgExpander_" + children[i].containerObject.Id).click();
                  }

                  if(loader) loader.Delete();
            }
      }

      AddFiltersToHeader() {
            //Designer
            this.#f_designerFilter = createDropdown_Infield("Designer", 0, ";box-shadow:none;", this.#designers.map(function(element) {
                  return createDropdownOption(element, element);
            }), () => {this.FilterJobs();}, null);
            this.AddToHeader(this.#f_designerFilter[0]);

            //Company
            this.#f_companyFilter = createInput_Infield("Company Name", "", "box-shadow:none;", () => {this.FilterJobs();}, null, false, null);
            this.AddToHeader(this.#f_companyFilter[0]);

            //Payments
            if(this.#usersWithSalesPermissions.includes(this.currentUser)) {
                  this.#f_showPaymentsFilter = createCheckbox_Infield("Load Payments", false, "width:200px;box-shadow:none;", () => {this.FilterJobs();}, null);
                  this.AddToHeader(this.#f_showPaymentsFilter[0]);
            }
      }

      async FilterJobs() {

            let paymentLoader = null;
            let paymentPromises = [];

            let numJobs = this.#jobObjects.length;
            for(let j = 0; j < numJobs; j++) {
                  $(this.#jobObjects[j].containerObject.container).show();

                  //Payments
                  let filterValue = this.#f_showPaymentsFilter[1].checked;
                  if(filterValue === true) {
                        if(paymentLoader == null) paymentLoader = new Loader(this.#f_showPaymentsFilter[0]);
                        paymentPromises.push(this.#jobObjects[j].containerObject.loadSecondaryFields());
                  }

                  //Designer
                  filterValue = this.#f_designerFilter[1].value;
                  let jobDesigner = this.#jobObjects[j].containerObject.designer;
                  if(jobDesigner != filterValue && filterValue != "All") {
                        $(this.#jobObjects[j].containerObject.container).hide();
                  }

                  //Company
                  filterValue = this.#f_companyFilter[1].value;
                  let companyName = this.#jobObjects[j].CompanyName;
                  if(!companyName.toLowerCase().includes(filterValue.toLowerCase())) {
                        $(this.#jobObjects[j].containerObject.container).hide();
                  }
            }

            await Promise.all(paymentPromises);

            if(paymentLoader) paymentLoader.Delete();
      }

      async ListenForWIPChanges() {

            let self = this;
            document.addEventListener("WIPStatusChange", async function(event) {
                  let jobContainer = event.detail.container;
                  let newWIP = event.detail.newWIPStatus;
                  let currentParentContainer = event.detail.parentContainer;

                  let boardsMatchingWIP = self.GetBoardsOfWIPStatus(newWIP);
                  let lowestFallbackPriority = 1000000;
                  let lowestWIPStatusBoard;
                  for(let w = 0; w < boardsMatchingWIP.length; w++) {
                        let board = boardsMatchingWIP[w];
                        if(board.fallbackPriority < lowestFallbackPriority) {
                              lowestWIPStatusBoard = board;
                              lowestFallbackPriority = board.fallbackPriority;
                        }
                  }

                  if(lowestWIPStatusBoard == null) {
                        deleteElement(jobContainer);
                        await self.UpdateJobsInContainer(currentParentContainer);
                        return;
                  }

                  for(let b = 0; b < self.#boards.length; b++) {
                        if(self.#boards[b].colour === lowestWIPStatusBoard.colour) {
                              self.columnContainers[b].containerObject.contentContainer.appendChild(jobContainer);
                              await self.UpdateJobsInContainer(self.columnContainers[b].containerObject.contentContainer);
                              await self.UpdateJobsInContainer(currentParentContainer);
                              break;
                        }
                  }

            });
      }

}