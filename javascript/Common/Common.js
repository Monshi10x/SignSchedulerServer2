var yes = true;
var no = false;

function getMHD(minutes) {
    var days = Math.floor((minutes / 60) / dayHours);
    var days_remainderMinutes = minutes - (dayHours * days * 60);
    var hours = Math.floor(days_remainderMinutes / 60);
    var hours_remainderMinutes = days_remainderMinutes - (hours * 60);
    return [hours_remainderMinutes, hours, days];
}

function getSMHD(seconds) {
    var remainingSeconds = 0;
    var days, hours, minutes, seconds;
    [days, remainingSeconds] = [Math.floor(seconds / (dayHours * 60 * 60)), seconds % (dayHours * 60 * 60)];
    [hours, remainingSeconds] = [Math.floor(remainingSeconds / (60 * 60)), seconds % (60 * 60)];
    [minutes, remainingSeconds] = [Math.floor(remainingSeconds / (60)), seconds % (60)];
    return [days, hours, minutes, remainingSeconds];
}

function getMinutesFromMHD(minutes, hours, days) {
    return minutes + (hours * 60) + (days * dayHours * 60);
}

function roundNumber(number, decimalPlaces) {
    return Math.round(number * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
}
function roundNumberUp(number) {
    return Math.ceil(number);
}
function roundNumberDown(number) {
    return Math.floor(number);
}

function toggleLock(element) {
    //if locked, then set unlocked
    if(element.innerHTML == "🔒") {
        element.innerHTML = "🔓";
        return false;
    }
    //if unlocked, then set locked
    else if(element.innerHTML == "🔓") {
        element.innerHTML = "🔒";
        return true;
    }
}

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while(L && this.length) {
        what = a[--L];
        while((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

function PrintElem(elem) {
    var divContents = billboardBuilderContainer.innerHTML;
    var a = window.open('', '', 'height=500, width=500');
    a.document.write('<html>');
    a.document.write('<body > <h1>Div contents are <br>');
    a.document.write(divContents);
    a.document.write('</body></html>');
    a.document.close();
    a.print();
}

var clog = console.log.bind(document);

function convertClipboardToMeasure() {
    navigator.clipboard.readText()
        .then(text => {
            var txtSplit = text.replace(/[^\d]/g, ' ').split(" ").filter(function(e) {return e;});
            var txt = "";
            for(var t = 0; t < txtSplit.length; t++) {
                txt += txtSplit[t] + "mm ";
                if(t < txtSplit.length - 1) txt += "x ";
            }
            const selection = window.getSelection();
            if(!selection.rangeCount) return false;
            selection.deleteFromDocument();
            selection.getRangeAt(0).insertNode(document.createTextNode(txt));
        })
        .catch(err => {
            console.error('Failed to read clipboard contents: ', err);
        });
}

async function saveToClipboard(string) {
    await navigator.clipboard.writeText(string);
    console.log("string copied to clipboard");
    Ordui.Alert("copied to clipboard");
}

function StringCombine(...args) {
    let str = '';
    for(var i = 0; i < args.length; i++) {
        str += args[i];
    }
    return str;
}

/**
 * Returns True|False if a point is in a polygon.
 * @param {Integer} nvert number of vertices
 * @param {Array} vertx array of X vertices
 * @param {Array} verty array of Y vertices
 * @param {Integer} testx x position of test vertex
 * @param {Integer} testy y position of test vertex
 * @returns Boolean
 */
function pointInPolygon(nvert, vertx, verty, testx, testy) {
    var i, j, c = false;
    for(i = 0, j = nvert - 1; i < nvert; j = i++) {
        if(((verty[i] > testy) != (verty[j] > testy)) &&
            (testx < (vertx[j] - vertx[i]) * (testy - verty[i]) / (verty[j] - verty[i]) + vertx[i])) {
            c = !c;
        }
    }
    return c;
}

var DPI = 96;//Chrome DPI. TODO: check this across other users
function mmToPixel(mm) {
    return (mm * DPI) / 25.4;
}
function pixelToMM(pixels) {
    return (pixels * 25.4) / DPI;
}

/**
 * Returns a new cloned (non-pointer) array 
 * @param {Array} array 
 * @returns New Array
 */
function arrayAsValuesNotReference(object) {
    return JSON.parse(JSON.stringify(object));
}

function removeAllChildrenFromParent(parent) {
    while(parent.childElementCount > 0) {parent.removeChild(parent.lastChild);}
}

function deleteElement(element) {
    element.remove();
}

/**
 * @param {*} array 
 * @returns new array with only unique elements 
 */
function uniqueArray(array) {
    //If you want to keep the last occurrence of a value, simply replace indexOf with lastIndexOf.
    //return array.filter((v, i, a) => a.indexOf(v) === i);
    return [...new Set(array)];
}


function uniqueArray3D(array) {
    let stringArray = array.map(JSON.stringify);
    let uniqueStringArray = new Set(stringArray);
    let uniqueArray = Array.from(uniqueStringArray, JSON.parse);
    return uniqueArray;
}

function uniqueArray3DWithOccurenceCount(array) {
    let stringArray = array.map(JSON.stringify);
    let arrayReduced = uniqueArray3D(array);
    let arrayReducedString = arrayReduced.map(JSON.stringify);

    let tempArr = [];

    for(let i = 0; i < arrayReducedString.length; i++) {
        tempArr.push({'qty': getOccurrenceCountInArray(stringArray, arrayReducedString[i]), 'item': arrayReducedString[i]});
    }

    return tempArr;
}

/**
 * @argument array i.e. [[w,h], [w,h]...]
 * @returns [] i.e. [QWHD(), QWHD(), ...]
 */
function uniqueSizeArrayWithOccurenceCount(array) {
    let returnArray = [];
    for(let i = 0; i < array.length; i++) {
        let itemWidth = array[i][0];
        let itemHeight = array[i][1];
        if(i == 0) {
            returnArray.push(new QWHD(1, itemWidth, itemHeight));
            continue;
        }
        for(let j = 0; j < returnArray.length; j++) {
            if(returnArray[j].width == itemWidth && returnArray[j].height == itemHeight) {
                returnArray[j].qty += 1;
                break;
            }
            if(j == returnArray.length - 1) {
                returnArray.push(new QWHD(1, itemWidth, itemHeight));
                break;
            }
        }

    }
    return returnArray;
}

function getOccurrenceCountInArray(array, value) {
    return array.filter((v) => (v === value)).length;
}

function mmToM(element) {
    return element / 1000;
}

function mToMM(element) {
    return element * 1000;
}

function mmToInch(value) {
    if(value == 0) return 0;
    return value / 25.4;
}

function inchToMM(element) {
    return element / 25.4;
}

function m2ToMM2(element) {
    return element * 1000000;
}
function mm2ToM2(element) {
    return element * 1000000;
}

function zeroIfNaN(element) {
    if(isNaN(element)) {
        return 0;
    } return parseFloat(element);
}

function zeroIfNull(element) {
    if(element === null) {
        return 0;
    } return parseFloat(element);
}

function zeroIfNaNNullBlank(element) {
    if(isNaN(element) || element === null || element == "") {
        return 0;
    } return parseFloat(element);
}

function clamp(n, min, max) {
    if(n > max) {
        return max;
    } else if(n < min) {
        return min;
    } else {
        return n;
    }
}

function deleteElementsFromArray(array, ...elements) {
    for(var i = 0; i < elements.length; i++) {
        let elementIndex = array.indexOf(elements[i]);
        if(elementIndex !== -1)
            array.splice(elementIndex, 1);
    }
    return array;
}

function stringToBoolean(string) {
    switch(string.toLowerCase().trim()) {
        case "true": case "yes": case "1": return true;
        case "false": case "no": case "0": case null: return false;
        default: return Boolean(string);
    }
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
function insertBefore(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode);
}

function secondsToMinutes(seconds) {
    return seconds / 60;
}

/**
 * @description provides a landscape representation of shape with dimensions A,B
 * @returns [A,B] where A >= B or [B,A] if B > A 
 */
function convertDimensionsToLandscape(dimensionA, dimensionB) {
    dimA = parseFloat(dimensionA);
    dimB = parseFloat(dimensionB);
    if(dimA >= dimB) return [dimA, dimB];
    return [dimB, dimA];
};

function generateUniqueID() {
    return Date.now() + "-" + Math.floor(Math.random() * 100000000);
}

/**
 * 
 * @param {[]} array with objects that contain keys: qty, width, height
 * @example
 * [{qty: 1, width: 1, height: 1},
 * {qty: 1, width: 1, height: 1}
 * ...]
 */
function combinedSqm(array, inMM = true) {
    let sqm = 0;
    for(let i = 0; i < array.length; i++) {
        sqm += zeroIfNaNNullBlank(array[i].qty) *
            zeroIfNaNNullBlank(array[i].width) *
            zeroIfNaNNullBlank(array[i].height) *
            (inMM ? 1 / 1000000 : 1);
    }
    return sqm;
}

/**
 * 
 * @returns percentage of browser window zoom as integer (100 is standard no zoom)
 */
function getWindowZoom() {
    return Math.round(window.devicePixelRatio * 100);
}

function RGBToHex(RGBString) {
    let y = RGBString.split("(")[1].split(")")[0].split(",");
    let t = y.map(function(r) {             //For each array element
        r = parseInt(r).toString(16);      //Convert to a base16 string
        return (r.length == 1) ? "0" + r : r;  //Add zero if we get only one character
    });
    t = "#" + t.join("");
    return t;
}

function getSideMargins(element) {
    return parseInt(element.style.marginLeft) + parseInt(element.style.marginRight);
}

function getTopBottomMargins(element) {
    return parseInt(element.style.marginLeft) + parseInt(element.style.marginRight);
}

_todo = [];
function TODO(element) {
    _todo.push(element);
    console.log("%cTODO: " + element, 'background: green; color: white');
}

function HTMLToText(htmlString) {
    let tempDivElement = document.createElement("div");
    tempDivElement.innerHTML = htmlString;

    return tempDivElement.textContent || tempDivElement.innerText || "";
}

function toggle(expression, trueCallback, falseCallback) {
    if(expression) trueCallback();
    else falseCallback();
}

function AddCssStyle(cssStyle, element) {
    element.style.cssText += ";" + cssStyle + ";";
}

function catchNull(value, valueIfNull) {
    if(value == null) return valueIfNull;
    else return value;
}

function IFELSE(expression, valueIf, valueElse) {
    if(expression) {
        return valueIf;
    } else {
        return valueElse;
    }
}

function isVisible(element) {
    if(element.style.display != "none") return true;
    return false;
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};