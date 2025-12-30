class ModalSetOrder extends Modal {

      currentDragElement;
      elements = [];

      constructor(headerText, callback, ...rowElements) {
            super(headerText, callback);
            this.addBodyElement(createText("Drag to set order", null, null));

            this.createRows(...rowElements);

            this.addFooterElement(createButton("Ok", "width:100px;float:right;", () => {this.callback(); console.log("in callback");}));
            this.addFooterElement(createButton("Cancel", "width:100px;float:right;", () => {this.hide(); console.log("cancel called");}));
      }

      createRows = (...rowElements) => {
            for(let i = 0; i < rowElements.length; i++) {
                  let itemName = createText(rowElements[i], STYLE.Button + ";width:80%;cursor:move;", null);
                  itemName.draggable = true;
                  this.elements.push(itemName);

                  itemName.addEventListener("dragstart", () => {
                        itemName.style.opacity = "0.5";
                        this.currentDragElement = itemName;
                        itemName.classList.add("dragging");
                  });
                  itemName.addEventListener("dragend", () => {
                        itemName.style.opacity = "1";
                        this.currentDragElement = null;
                        itemName.classList.remove("dragging");
                  });

                  this.addBodyElement(itemName);
            }
            this.getBodyElement().addEventListener("dragover", e => {
                  e.preventDefault();
                  const afterElement = this.getDragAfterElement(e.clientY);
                  if(afterElement == null) {
                        this.getBodyElement().appendChild(this.currentDragElement);
                  } else {
                        this.getBodyElement().insertBefore(this.currentDragElement, afterElement);
                  }
            });
      };

      getOrder() {
            var arr = [...this.getBodyElement().querySelectorAll("p")];
            arr.shift();
            var returnArr = [];
            arr.forEach(function(element) {
                  returnArr.push(element.innerText);
            });
            return returnArr;
      }

      getDragAfterElement(y) {
            let elementsNoBeingDragged = [];
            for(var i = 0; i < this.elements.length; i++) {
                  if(!this.elements[i].classList.contains("dragging")) {
                        elementsNoBeingDragged.push(this.elements[i]);
                  }
            }
            return elementsNoBeingDragged.reduce((closest, child) => {
                  const box = child.getBoundingClientRect();
                  const offset = y - box.top - box.height / 2;
                  if(offset < 0 && offset > closest.offset) {
                        return {offset: offset, element: child};
                  } else {
                        return closest;
                  }
            }, {offset: Number.NEGATIVE_INFINITY}).element;
      }
}