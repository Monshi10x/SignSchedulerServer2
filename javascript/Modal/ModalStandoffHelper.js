class ModalStandoffHelper extends ModalWidthHeight {

      #ID = "ModalStandoffHelper " + generateUniqueID();
      #typicalSpacing = 600;
      #spacingAllowance = 100; //spacing < 700
      #initialRectWidth = 100;
      #initialRectHeight = 100;
      #offsetFromEdge = 25;

      #dragZoomCanvas;
      #numberOnTop;
      #numberOnSide;
      #diameterField;
      #offsetFromEdgeField;

      get qty() {return (this.numberOnTop) * 2 + (this.numberOnSide - 2) * 2;}

      set numberOnTop(value) {$(this.#numberOnTop[1]).val(value).change();}
      get numberOnTop() {return parseFloat(this.#numberOnTop[1].value);}

      set numberOnSide(value) {$(this.#numberOnSide[1]).val(value).change();}
      get numberOnSide() {return parseFloat(this.#numberOnSide[1].value);}

      set diameter(value) {$(this.#diameterField[1]).val(value).change();}
      get diameter() {return parseFloat(this.#diameterField[1].value);}

      set offsetFromEdge(value) {$(this.#offsetFromEdgeField[1]).val(value).change();}
      get offsetFromEdge() {return parseFloat(this.#offsetFromEdgeField[1].value);}

      constructor(headerText, incrementAmount, callback) {
            super(headerText, incrementAmount, callback);

            this.#dragZoomCanvas = new DragZoomCanvas(this.container.getBoundingClientRect().width, 400, () => this.draw(), this.getBodyElement());

            this.#numberOnTop = createInput_Infield("Number On Top/Bottom", this.calculatedQtyPerSide(this.#initialRectWidth), "width:40%;", () => {this.#dragZoomCanvas.updateFromFields();}, null, true, 1);
            this.addBodyElement(this.#numberOnTop[0]);
            this.#numberOnSide = createInput_Infield("Number On Side", this.calculatedQtyPerSide(this.#initialRectHeight), "width:40%;", () => {this.#dragZoomCanvas.updateFromFields();}, null, true, 1);
            this.addBodyElement(this.#numberOnSide[0]);
            this.#diameterField = createInput_Infield("Diameter", 19, "width:40%;", () => this.updateFromFields(), null, true, 1);
            this.addBodyElement(this.#diameterField[0]);
            this.#offsetFromEdgeField = createInput_Infield("Offset From Edge", this.#offsetFromEdge, "width:40%;", () => this.updateFromFields(), null, true, 1);
            this.addBodyElement(this.#offsetFromEdgeField[0]);
            this.width = this.#initialRectHeight;
            this.height = this.#initialRectHeight;

            this.draw();
      }

      calculatedQtyPerSide = (sideLength) => {
            return 2 + Math.ceil(sideLength / (this.#typicalSpacing + this.#spacingAllowance)) - 1;
      };

      draw() {
            let canvasCtx = this.#dragZoomCanvas.canvasCtx;
            let scaledWidth = this.width;
            let scaledHeight = this.height;
            let edgeOffset = this.offsetFromEdgeField;
            let numOnTop = this.numberOnTop;
            let numOnSide = this.numberOnSide;
            let diameter = this.diameter;

            drawFillRect(canvasCtx, 0, 0, scaledWidth, scaledHeight, "TL", COLOUR.Blue, 0.4);
            drawMeasurement_Verbose(canvasCtx, 0, 0, scaledWidth, 0, "T", scaledWidth, 15 / this.#dragZoomCanvas.scale, COLOUR.Blue, 1, 0.2, 15, true, "B");
            drawMeasurement_Verbose(canvasCtx, 0, 0, 0, scaledHeight, "L", scaledHeight, 15 / this.#dragZoomCanvas.scale, COLOUR.Blue, 1, 0.2, 15, false, "R");

            //drawTopBottom
            for(let a = 0; a < numOnTop; a++) {
                  let widthSpacing = (scaledWidth - edgeOffset * 2) / (numOnTop - 1);
                  //Top
                  drawFillCircle(canvasCtx, 0 + edgeOffset + widthSpacing * a, 0 + edgeOffset, diameter / 2, 'M', 'red', 0.5);
                  //Bottom
                  drawFillCircle(canvasCtx, 0 + edgeOffset + widthSpacing * a, 0 - edgeOffset + scaledHeight, diameter / 2, 'M', 'red', 0.7);
            }

            //drawSides
            for(let a = 0; a < numOnSide; a++) {
                  let heightSpacing = (scaledHeight - edgeOffset * 2) / (numOnSide - 1);
                  //left side
                  drawFillCircle(canvasCtx, 0 + edgeOffset, 0 + edgeOffset + heightSpacing * a, diameter / 2, 'M', 'red', 0.5);
                  //right side
                  drawFillCircle(canvasCtx, 0 - edgeOffset + scaledWidth, 0 + edgeOffset + heightSpacing * a, diameter / 2, 'M', 'red', 0.5);
            }

            canvasCtx.lineWidth = 3;
      };

      updateFromFields() {
            super.updateFromFields();
            this.#dragZoomCanvas.updateFromFields();
      }

      onWindowResize(event) {
            super.onWindowResize(event);

            this.#dragZoomCanvas.canvasWidth = this.container.getBoundingClientRect().width;
            this.#dragZoomCanvas.canvasHeight = 400;
            this.updateFromFields();
      }
}

class ModalStandoffHelper2 extends ModalWidthHeight {

      #ID = "ModalSheetJoins2 " + generateUniqueID();
      #dragZoomCanvas;
      #borrowedFields = [];

      #textSize = 15;
      #lineWidth = 1;
      #crossScale = 0.2;

      #standOffDiameter = 19;

      #totalNumber = 0;
      get qty() {return this.#totalNumber;}

      /** @info Draw Each Sheet from matrixSizes, per parent */
      #distanceBetweenParentDraws = 1000;

      //An array of multiple parents matrixSizes
      #sizeArrays = [];
      setSizeArrays(...sizeArrays) {
            this.#sizeArrays = sizeArrays;
            this.updateFromFields();
      }

      #gapBetweenX = 0;
      #gapBetweenXField;
      #gapBetweenY = 0;
      #gapBetweenYField;
      #diameterField;

      #offsetFromEdgeField;
      setOffsetFromEdgeField(field) {
            this.#offsetFromEdgeField = field;
      }
      #horizontalSpacingField;
      setHorizontalSpacingField(field) {
            this.#horizontalSpacingField = field;
      }
      #verticalSpacingField;
      setVerticalSpacingField(field) {
            this.#verticalSpacingField = field;
      }
      #spacingAllowanceField;
      setSpacingAllowanceField(field) {
            this.#spacingAllowanceField = field;
      }

      #containerBeforeCanvas;
      #containerAfterCanvas;

      get diameter() {return parseFloat(this.#standOffTypeField.value.split(",")[0]);}

      set offsetFromEdge(value) {$(this.#offsetFromEdgeField).val(value).change();}
      get offsetFromEdge() {return parseFloat(this.#offsetFromEdgeField.value);}

      set horizontalSpacing(value) {$(this.#horizontalSpacingField).val(value).change();}
      get horizontalSpacing() {return parseFloat(this.#horizontalSpacingField.value);}

      set verticalSpacing(value) {$(this.#verticalSpacingField).val(value).change();}
      get verticalSpacing() {return parseFloat(this.#verticalSpacingField.value);}

      set spacingAllowance(value) {$(this.#spacingAllowanceField).val(value).change();}
      get spacingAllowance() {return parseFloat(this.#spacingAllowanceField.value);}

      #standOffTypeField;
      setTypeField(field) {
            this.#standOffTypeField = field;

            $(field).on('change', () => {
                  this.updateFromFields();
            });
      }

      constructor(headerText, incrementAmount, callback, sheetClass) {
            super(headerText, incrementAmount, callback);

            this.sheetClass = sheetClass;

            setFieldDisabled(true, this.widthField[1], this.widthField[0]);
            setFieldDisabled(true, this.heightField[1], this.heightField[0]);

            this.#containerBeforeCanvas = createDivStyle5(null, "Borrowed Fields", this.getBodyElement())[1];

            this.#dragZoomCanvas = new DragZoomCanvas(this.container.getBoundingClientRect().width, 400, () => this.draw(), this.getBodyElement());

            this.#containerAfterCanvas = createDivStyle5(null, "View Settings", this.getBodyElement())[1];

            this.#gapBetweenXField = createInput_Infield("gapBetweenX", this.#gapBetweenX, null, () => {this.#gapBetweenX = zeroIfNaNNullBlank(this.#gapBetweenXField[1].value); this.updateFromFields();}, this.#containerAfterCanvas, true, 10);
            this.#gapBetweenYField = createInput_Infield("gapBetweenY", this.#gapBetweenY, null, () => {this.#gapBetweenY = zeroIfNaNNullBlank(this.#gapBetweenYField[1].value); this.updateFromFields();}, this.#containerAfterCanvas, true, 10);
      }

      updateFromFields() {
            super.updateFromFields();
            this.#dragZoomCanvas.updateFromFields();
      }

      Close() {
            this.returnAllBorrowedFields();
            this.#dragZoomCanvas.Close();
      }

      draw() {
            let canvasCtx = this.#dragZoomCanvas.canvasCtx;
            let canvasScale = this.#dragZoomCanvas.scale;

            let xo = 0, yo = 0;

            this.#totalNumber = 0;

            for(let i = 0; i < this.#sizeArrays.length; i++) {//per parent subscriptions matrix (i.e. Sheet or Size Matrix)
                  for(let j = 0; j < this.#sizeArrays[i].length; j++) {//per sheet subscription matrix
                        let matrixSize = this.#sizeArrays[i][j];

                        let isFirstRow, isFirstColumn = false;

                        for(let r = 0; r < matrixSize.length; r++) {//per matrix row
                              xo = 0;
                              isFirstRow = r == 0;

                              for(let c = 0; c < matrixSize[r].length; c++) {//per matrix column i.e. size [w, h]
                                    isFirstColumn = c == 0;

                                    let [rectWidth, rectHeight] = matrixSize[r][c];

                                    let [rectWidth_Initial, rectHeight_Initial] = [rectWidth, rectHeight];

                                    //draw sheetSize
                                    drawRect(canvasCtx, xo, yo, rectWidth, rectHeight, "TL", COLOUR.Black, 1);

                                    //draw Measurements
                                    if(isFirstRow) drawMeasurement_Verbose(canvasCtx, xo, yo, rectWidth, 0, "T", roundNumber(rectWidth, 2), this.#textSize, COLOUR.Blue, this.#lineWidth, this.#crossScale, 20, true, "B", false, canvasScale);
                                    if(isFirstColumn) drawMeasurement_Verbose(canvasCtx, xo, yo, 0, rectHeight, "L", roundNumber(rectHeight, 2), this.#textSize, COLOUR.Blue, this.#lineWidth, this.#crossScale, 20, false, "R", false, canvasScale);

                                    //draw Stand-offs
                                    let numberTop = 2 + Math.ceil((rectWidth - 2 * this.offsetFromEdge) / clamp((this.horizontalSpacing + this.spacingAllowance), 1, Infinity));
                                    let spacingTop = (rectWidth - 2 * this.offsetFromEdge) / (numberTop - 2);
                                    let numberLeft = 2 + Math.ceil((rectHeight - 2 * this.offsetFromEdge) / clamp((this.verticalSpacing + this.spacingAllowance), 1, Infinity));
                                    let spacingLeft = (rectHeight - 2 * this.offsetFromEdge) / (numberLeft - 2);

                                    //top
                                    for(let x = 0; x < numberTop - 1; x++) {
                                          this.#totalNumber++;
                                          drawFillCircle(canvasCtx, xo + this.offsetFromEdge + spacingTop * x, yo + this.offsetFromEdge, this.diameter / 2, 'M', 'red', 0.5);
                                    }
                                    //bottom
                                    for(let x = 0; x < numberTop - 1; x++) {
                                          this.#totalNumber++;
                                          drawFillCircle(canvasCtx, xo + this.offsetFromEdge + spacingTop * x, yo + rectHeight - this.offsetFromEdge, this.diameter / 2, 'M', 'red', 0.5);
                                    }
                                    //left
                                    for(let x = 0; x < numberLeft - 1; x++) {
                                          if(x == 0 || x == (numberLeft - 2)) continue;
                                          this.#totalNumber++;
                                          drawFillCircle(canvasCtx, xo + this.offsetFromEdge, yo + this.offsetFromEdge + spacingLeft * x, this.diameter / 2, 'M', 'red', 0.5);
                                    }
                                    //right
                                    for(let x = 0; x < numberLeft - 1; x++) {
                                          if(x == 0 || x == (numberLeft - 2)) continue;
                                          this.#totalNumber++;
                                          drawFillCircle(canvasCtx, xo + rectWidth - this.offsetFromEdge, yo + this.offsetFromEdge + spacingLeft * x, this.diameter / 2, 'M', 'red', 0.5);
                                    }

                                    //Standoff measurements
                                    if(isFirstRow && isFirstColumn) {
                                          /*top*/
                                          drawMeasurement_Verbose(canvasCtx, xo + this.offsetFromEdge, yo, spacingTop, 0, "T", roundNumber(spacingTop, 2), this.#textSize, COLOUR.DarkGrey, this.#lineWidth, this.#crossScale, 60, true, "B", false, canvasScale);
                                          /*left*/
                                          drawMeasurement_Verbose(canvasCtx, xo, yo + this.offsetFromEdge, 0, spacingLeft, "L", roundNumber(spacingLeft, 2), this.#textSize, COLOUR.DarkGrey, this.#lineWidth, this.#crossScale, 60, false, "R", false, canvasScale);
                                    }

                                    xo += rectWidth_Initial + this.#gapBetweenX;
                              }
                              yo += matrixSize[r][0][1] + this.#gapBetweenY;
                        }
                        yo += this.#distanceBetweenParentDraws;
                  }
            }
      }

      borrowFields(...fieldContainers) {
            for(let i = 0; i < fieldContainers.length; i++) {
                  let elementToBorrow = fieldContainers[i];
                  this.#borrowedFields.push({
                        fieldContainer: elementToBorrow,
                        returnAfterElement: elementToBorrow.previousElementSibling,
                        returnBeforeElement: elementToBorrow.nextElementSibling
                  });
                  this.#containerBeforeCanvas.appendChild(elementToBorrow);
            }
      }

      returnAllBorrowedFields() {
            for(let i = this.#borrowedFields.length - 1; i >= 0; i--) {
                  if(this.#borrowedFields[i].returnAfterElement) insertAfter(this.#borrowedFields[i].fieldContainer, this.#borrowedFields[i].returnAfterElement);
                  else insertBefore(this.#borrowedFields[i].fieldContainer, this.#borrowedFields[i].returnBeforeElement);
            }
      }

      hide() {
            this.returnAllBorrowedFields();
            super.hide();
      }

      callback() {
            super.callback();
            this.Close();
      }

      onWindowResize(event) {
            super.onWindowResize(event);
            this.#dragZoomCanvas.canvasWidth = this.container.getBoundingClientRect().width;
            this.updateFromFields();
      }
}
