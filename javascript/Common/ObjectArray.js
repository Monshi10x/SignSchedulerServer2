class ObjectArray extends Array {

      containsFieldWithValue(field, value) {
            for(let i = 0; i < this.length; i++) {
                  if(!(field in this[i])) continue;
                  if(this[i][field] == value) {
                        return true;
                  }
            }
            return false;
      }

      isLast(index) {
            if(index == this.length - 1) return true;
            return false;
      }

      lastElement() {
            return this[this.length - 1];
      }

      /**
       * 
       * @param {*} originalElement 
       * @param {*} comparisonProperty - i.e. "ID"
       * @param {*} includeOriginal 
       * @returns [includeOriginal?, ...] where other elements that have same comparison property are included
       */
      similarElements(originalElement, comparisonProperty, includeOriginal = true) {
            if(!comparisonProperty === 'string') throw new Error("comparison property must be string property i.e. 'Type'");

            let elementsToReturn = [];

            if(includeOriginal) elementsToReturn.push(originalElement);

            for(let i = 0; i < this.length; i++) {
                  if(this[i][comparisonProperty] == originalElement[comparisonProperty]) {
                        elementsToReturn.push(this[i]);
                  }
            }

            return elementsToReturn;
      }

      /**
       * 
       * @param {*} comparisonProperty - i.e. "ID"
       * @returns [... , ... , ...] with each element being the first unique element found, evaluated against some comparison property
       */
      uniqueArrayElements(comparisonProperty) {
            if(!comparisonProperty === 'string') throw new Error("comparison property must be string property i.e. 'Type'");

            let uniqueElements = [];

            for(let i = 0; i < this.length; i++) {
                  let firstElement = i == 0;
                  if(firstElement) uniqueElements.push(this[i]);

                  for(let j = 0; j < uniqueElements.length; j++) {
                        if(this[i][comparisonProperty] == uniqueElements[j][comparisonProperty]) {
                              break;
                        }
                        if(j == uniqueElements.length - 1) {
                              uniqueElements.push(this[i]);
                        }
                  }
            }
            return uniqueElements;
      }

}