class ModalVinylJoins extends ModalWidthHeight {

      #ID = "ModalVinylJoins " + generateUniqueID();
      #dragZoomCanvas;
      #borrowedFields = [];

      //An array of multiple parents matrixSizes
      sizeArrays = [];
      setSizeArrays(...sizeArrays) {
            this.sizeArrays = sizeArrays;
            this.updateFromFields();
      }

      #bleedTopField;
      #bleedBottomField;
      #bleedLeftField;
      #bleedRightField;
      setBleedFields(top, bottom, left, right) {
            this.#bleedTopField = top;
            this.#bleedBottomField = bottom;
            this.#bleedLeftField = left;
            this.#bleedRightField = right;
      }

      get bleedTop() {return zeroIfNaNNullBlank(this.#bleedTopField.value);};
      get bleedBottom() {return zeroIfNaNNullBlank(this.#bleedBottomField.value);};
      get bleedLeft() {return zeroIfNaNNullBlank(this.#bleedLeftField.value);};
      get bleedRight() {return zeroIfNaNNullBlank(this.#bleedRightField.value);};


      #joinOrientationField;
      setJoinOrientationField(field) {
            this.#joinOrientationField = field;
      }

      get joinOrientation() {
            if(this.#joinOrientationField.checked) return "Horizontal";
            return "Vertical";
      }

      #rollWidthField;
      setRollWidthField(field) {
            this.#rollWidthField = field;
      }

      get rollWidth() {return zeroIfNaNNullBlank(this.#rollWidthField.value);};

      #joinOverlapField;
      setJoinOverlapField(field) {
            this.#joinOverlapField = field;
      }

      get joinOverlap() {return zeroIfNaNNullBlank(this.#joinOverlapField.value);};

      #gapBetweenX = 100;
      #gapBetweenXField;
      #gapBetweenY = 100;
      #gapBetweenYField;

      #maintainGapBetweenBleed = true;
      #maintainGapBetweenBleedField;

      #gapSettingsContainer;
      #containerBeforeCanvas;
      #containerAfterCanvas;

      constructor(headerText, incrementAmount, callback, sheetClass) {
            super(headerText, incrementAmount, callback);

            this.sheetClass = sheetClass;

            this.flipped = false;

            setFieldDisabled(true, this.widthField[1], this.widthField[0]);
            setFieldDisabled(true, this.heightField[1], this.heightField[0]);

            this.#gapSettingsContainer = createDivStyle5(null, "Gap Settings", this.getBodyElement())[1];

            this.#gapBetweenXField = createInput_Infield("gapBetweenX", this.#gapBetweenX, null, () => {this.#gapBetweenX = zeroIfNaNNullBlank(this.#gapBetweenXField[1].value); this.updateFromFields();}, this.#gapSettingsContainer, true, 10);
            this.#gapBetweenYField = createInput_Infield("gapBetweenY", this.#gapBetweenY, null, () => {this.#gapBetweenY = zeroIfNaNNullBlank(this.#gapBetweenYField[1].value); this.updateFromFields();}, this.#gapSettingsContainer, true, 10);

            this.#maintainGapBetweenBleedField = createCheckbox_Infield("maintainGapBetweenBleed", this.#maintainGapBetweenBleed, null, () => {this.#maintainGapBetweenBleed = this.#maintainGapBetweenBleedField[1].checked; this.updateFromFields();}, this.#gapSettingsContainer, () => {this.#maintainGapBetweenBleed = this.#maintainGapBetweenBleedField[1].checked; this.updateFromFields();});

            this.#containerBeforeCanvas = createDivStyle5(null, "Borrowed Fields", this.getBodyElement())[1];

            this.#dragZoomCanvas = new DragZoomCanvas(this.container.getBoundingClientRect().width, 400, () => this.draw(), this.getBodyElement());

            this.#containerAfterCanvas = createDivStyle5(null, "View Settings", this.getBodyElement())[1];
      }

      Close() {
            this.returnAllBorrowedFields();
            this.#dragZoomCanvas.Close();
      }

      updateFromFields() {
            super.updateFromFields();
            this.#dragZoomCanvas.updateFromFields();
      }

      draw() {
            let canvasCtx = this.#dragZoomCanvas.canvasCtx;
            let canvasScale = this.#dragZoomCanvas.scale;

            let textSize = 15;
            let lineWidth = 1;
            let crossScale = 0.2;
            let offsetFromShape = 15;

            /** @info Draw Each Sheet from matrixSizes, per parent */
            let distanceBetweenParentDraws = 1000;
            let xo = 0, yo = 0;

            for(let i = 0; i < this.sizeArrays.length; i++) {//per parent subscriptions matrix (i.e. Sheet or Size Matrix)
                  for(let j = 0; j < this.sizeArrays[i].length; j++) {//per vinyl subscription matrix
                        let matrixSize = this.sizeArrays[i][j];

                        let isFirstRow, isFirstColumn = false;

                        for(let r = 0; r < matrixSize.length; r++) {//per matrix row
                              xo = 0;
                              isFirstRow = r == 0;

                              for(let c = 0; c < matrixSize[r].length; c++) {//per matrix column i.e. size [w, h]
                                    isFirstColumn = c == 0;

                                    let [rectWidth, rectHeight] = matrixSize[r][c];
                                    let [rectWidth_Initial, rectHeight_Initial] = matrixSize[r][c];

                                    //draw matrixSize
                                    drawRect(canvasCtx, xo, yo, rectWidth, rectHeight, "TL", COLOUR.Black, 1);

                                    if(isFirstRow) drawMeasurement_Verbose(canvasCtx, xo, yo, rectWidth, 0, "T", roundNumber(rectWidth, 2), textSize, COLOUR.Blue, lineWidth, crossScale, offsetFromShape, true, "B", false, canvasScale);
                                    if(isFirstColumn) drawMeasurement_Verbose(canvasCtx, xo, yo, 0, rectHeight, "L", roundNumber(rectHeight, 2), textSize, COLOUR.Blue, lineWidth, crossScale, offsetFromShape, false, "R", false, canvasScale);

                                    rectWidth += this.bleedLeft + this.bleedRight;
                                    rectHeight += this.bleedTop + this.bleedBottom;

                                    let times = 1;
                                    let joinAmountX = 0;
                                    let joinAmountY = 0;

                                    //joins
                                    if(Vinyl.isSizeBiggerThanRoll(rectWidth, rectHeight, this.rollWidth)) {
                                          let newSizes = Vinyl.createJoins(1, rectWidth, rectHeight, this.joinOrientation == "Horizontal", true, this.rollWidth, this.joinOverlap);

                                          times = newSizes[0].qty;

                                          if(this.joinOrientation == "Horizontal") joinAmountY = this.joinOverlap;
                                          if(this.joinOrientation == "Vertical") joinAmountX = this.joinOverlap;

                                          rectWidth = newSizes[0].width;
                                          rectHeight = newSizes[0].height;
                                    }

                                    for(let t = 0; t < times; t++) {
                                          if(this.joinOrientation == "Horizontal") drawFillRect(canvasCtx, xo - this.bleedLeft, yo - this.bleedTop + (t * (rectHeight - joinAmountY)), rectWidth, rectHeight, "TL", COLOUR.Red, 0.4);
                                          if(this.joinOrientation == "Vertical") drawFillRect(canvasCtx, xo - this.bleedLeft + (t * (rectWidth - joinAmountX)), yo - this.bleedTop, rectWidth, rectHeight, "TL", COLOUR.Red, 0.4);
                                    }

                                    let bo = this.#maintainGapBetweenBleed ? (this.bleedLeft + this.bleedRight) : 0;

                                    if(this.joinOrientation == "Horizontal") xo += rectWidth_Initial + this.#gapBetweenX + bo;
                                    if(this.joinOrientation == "Vertical") xo += rectWidth_Initial + this.#gapBetweenX + bo;
                              }

                              let bo = this.#maintainGapBetweenBleed ? (this.bleedTop + this.bleedBottom) : 0;
                              yo += matrixSize[r][0][1] + this.#gapBetweenY + bo;
                        }
                        yo += distanceBetweenParentDraws;
                  }
            }
      }

      borrowFields(...fieldContainers) {
            for(let i = 0; i < fieldContainers.length; i++) {
                  let elementToBorrow = fieldContainers[i];
                  let placeholderBefore = document.createElement("div");
                  let placeholderAfter = document.createElement("div");

                  insertBefore(placeholderBefore, elementToBorrow);
                  insertAfter(placeholderAfter, elementToBorrow);

                  this.#borrowedFields.push({
                        elementToBorrow: elementToBorrow,
                        placeholderBefore: placeholderBefore,
                        placeholderAfter: placeholderAfter
                  });
            }
            for(let i = 0; i < fieldContainers.length; i++) {
                  let elementToBorrow = fieldContainers[i];
                  this.#containerBeforeCanvas.appendChild(elementToBorrow);
            }
      }

      returnAllBorrowedFields() {
            for(let i = this.#borrowedFields.length - 1; i >= 0; i--) {
                  insertAfter(this.#borrowedFields[i].elementToBorrow, this.#borrowedFields[i].placeholderBefore);
                  deleteElement(this.#borrowedFields[i].placeholderBefore);
                  deleteElement(this.#borrowedFields[i].placeholderAfter);
            }
      }

      hide() {
            this.returnAllBorrowedFields();
            super.hide();
      }

      onWindowResize(event) {
            super.onWindowResize(event);
            this.#dragZoomCanvas.canvasWidth = this.container.getBoundingClientRect().width;
            this.updateFromFields();
      }
}
