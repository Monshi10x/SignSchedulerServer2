
class JobBoard {
      currentUser;
      #parentToAppendTo;
      #scrollableContainer;
      columnContainers = [/**{title: "", containerObject: UIContainerType3},...*/];
      #defaultView = "Card View";
      optionsHeader;

      constructor(parentToAppendTo) {
            this.#parentToAppendTo = parentToAppendTo;

            this.Init();
      }

      Init() {
            this.currentUser = "tristan";//document.querySelector("#CurrentUserLabel").innerText;//TODO
            this.#scrollableContainer = document.createElement("div");
            this.#scrollableContainer.style = "display:flex;float:left;width:100vw;height:calc(100vh - 157px);background-color:" + COLOUR.DarkGrey + ";flex-wrap: nowrap;overflow: auto;overflow-x:scroll;margin-bottom:0px;";
            this.#scrollableContainer.classList.add("x-scrollable");
            this.MakeSideScrollable(this.#scrollableContainer);
            this.#parentToAppendTo.appendChild(this.#scrollableContainer);

            this.CreateOptionsHeader();
      }

      MakeSideScrollable(slider) {
            //Scroll Container
            let isDown = false;
            let startX;
            let scrollLeft;

            window.addEventListener('mousedown', (e) => {
                  if(e.target.classList.contains("x-scrollable")) {
                        e.preventDefault();
                        isDown = true;
                        slider.classList.add('active');
                        startX = e.pageX - slider.offsetLeft;
                        scrollLeft = slider.scrollLeft;
                  }
            });
            window.addEventListener('mouseleave', () => {

            });
            window.addEventListener('mouseup', () => {
                  isDown = false;
                  slider.classList.remove('active');
            });
            window.addEventListener('mousemove', (e) => {
                  if(!isDown) return;

                  e.preventDefault();
                  const x = e.pageX - slider.offsetLeft;
                  const walk = (x - startX) * 1;
                  slider.scrollLeft = scrollLeft - walk;
            });
      }

      CreateOptionsHeader() {
            this.optionsHeader = document.createElement("div");
            this.optionsHeader.style = "width:100%;height:75px;display:block;float: left;background-color:" + COLOUR.DarkGrey;

            //let existingJobBoard = document.querySelector("#MainContent");
            //let existingJobBoardFooter = document.querySelector("#divFooterLogoWrapper");

            //insertBefore(this.optionsHeader, existingJobBoard);

            /*let option_viewType = createDropdown_Infield("View", 1, "width:200px;box-shadow:none;",
                  [createDropdownOption("List View", "List View"),
                  createDropdownOption("Card View", "Card View"),
                  createDropdownOption("All", "All")], () => {
                        if(option_viewType[1].value == "List View") {
                              $(existingJobBoard).show();
                              $(existingJobBoardFooter).show();
                              $(this.#scrollableContainer).hide();
                        } else if(option_viewType[1].value == "Card View") {
                              $(existingJobBoard).hide();
                              $(existingJobBoardFooter).hide();
                              $(this.#scrollableContainer).show();
                        } else if(option_viewType[1].value == "All") {
                              $(existingJobBoard).show();
                              $(existingJobBoardFooter).show();
                              $(this.#scrollableContainer).show();
                        }
                  }, this.optionsHeader);*/

            /*switch(this.#defaultView) {
                  case "List View":
                        $(existingJobBoard).show();
                        $(existingJobBoardFooter).show();
                        $(this.#scrollableContainer).hide();
                        break;

                  case "Card View":
                        $(existingJobBoard).hide();
                        $(existingJobBoardFooter).hide();
                        $(this.#scrollableContainer).show();
                        break;

                  case "All":
                        $(existingJobBoard).show();
                        $(existingJobBoardFooter).show();
                        $(this.#scrollableContainer).show();
                        break;

                  default: break;
            }*/
      }

      AddToHeader(element) {
            this.optionsHeader.appendChild(element);
      }

      CreateBoard(title = "", colour = "#ff0000", CBQueueID, CBStateId, WIPStatus) {
            let container = new UIContainerType3("width:calc(17%);min-width:350px;max-width:450px;height:calc(100%);flex: 0 0 auto;margin:0px;", title, this.#scrollableContainer);
            container.container.style.cssText += "background-color:" + colour + ";";
            container.contentContainer.style.cssText += "min-height:calc(100% - 30px)";
            container.contentContainer.backgroundColour = colour;
            container.contentContainer.CBQueueID = CBQueueID;
            container.contentContainer.CBStateId = CBStateId;
            container.contentContainer.WIPStatus = WIPStatus;
            container.contentContainer.classList.add("x-scrollable");
            container.headingContainer.classList.add("x-scrollable");

            let self = this;
            new Sortable(container.contentContainer, {
                  animation: 120,
                  group: 'shared',
                  swapThreshold: 1,
                  ghostClass: 'sortable-ghost',
                  direction: 'vertical',
                  onEnd: function(event) {
                        self.OnMoveEnd(event);
                  }
            });
            this.columnContainers.push({title: title, containerObject: container});

            for(let x = 0; x < container.headingContainer.children.length; x++) {
                  container.headingContainer.children[x].classList.add("x-scrollable");
            }
      }

      OnMoveEnd(event) {/*Override*/}
}