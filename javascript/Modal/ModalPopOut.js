class ModalPopOut extends Modal {
      #containersToBorrow;
      #borrowedFields = [];

      #whenClosedReturnBorrowed = true;
      set whenClosedReturnBorrowed(value) {this.#whenClosedReturnBorrowed = value;}

      constructor(headerText, callback, ...containersToBorrow) {
            super(headerText, callback);
            this.#containersToBorrow = containersToBorrow;

            this.setContainerSize(900, 900);
            this.borrowFields(...containersToBorrow);

            this.btn = createButton("Close", "width:100px;float:right;", () => {
                  if(this.#whenClosedReturnBorrowed == true) this.returnAllBorrowedFields();
                  console.log("in callback modal popout");
                  this.callback();
            });

            this.addFooterElement(this.btn);
      }

      borrowFields(...fieldContainers) {
            for(let i = 0; i < fieldContainers.length; i++) {
                  let borrowedElement = fieldContainers[i];
                  let placeholder = document.createElement("div");
                  placeholder.style = borrowedElement.style.cssText + ";opacity:0.2;height:" + borrowedElement.clientHeight + "px;";
                  insertAfter(placeholder, borrowedElement);

                  this.#borrowedFields.push({
                        fieldContainer: borrowedElement,
                        placeholder: placeholder,
                        returnBeforeElement: borrowedElement.nextElementSibling,
                        currentCssStyle: borrowedElement.style.cssText
                  });

                  this.addBodyElement(borrowedElement);
            }
      }

      returnAllBorrowedFields() {
            for(let i = 0; i < this.#borrowedFields.length; i++) {
                  this.#borrowedFields[i].placeholder.replaceWith(this.#borrowedFields[i].fieldContainer);
                  this.#borrowedFields[i].fieldContainer.style = this.#borrowedFields[i].currentCssStyle;

                  deleteElement(this.#borrowedFields[i].placeholder);
            }
      }

      /**@Override */
      onMouseOut() {
            this.callback();
      }

      hide() {
            if(this.#whenClosedReturnBorrowed == true) this.returnAllBorrowedFields();
            super.hide();
      }

}