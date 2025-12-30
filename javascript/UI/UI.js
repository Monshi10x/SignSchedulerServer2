//QUICK TIPS:
//For checkboxes, use method below to check, prop doesnt work
//field.dataset.initialBackgroundColor

function createDiv(overrideCssStyles, headingText, parentObjectToAppendTo) {
    var div = document.createElement("div");
    div.style = STYLE.Div;
    div.style.cssText += overrideCssStyles;

    if(headingText !== null) {
        let heading = document.createElement("h3");
        heading.innerText = headingText;
        heading.style = "position:relative; top:0px; left:0x;color:black;font-size:14px;font-weight:bold;background-color:" + COLOUR.LightBlue + ";width:auto;padding:4px;text-align:center;margin:0px;";
        div.appendChild(heading);
    }

    if(parentObjectToAppendTo != null) {
        parentObjectToAppendTo.appendChild(div);
    }
    return div;
}
function createDivStyle2(overrideCssStyles, headingText, parentObjectToAppendTo) {
    var div = document.createElement("div");
    div.style = STYLE.Div2;
    div.style.cssText += overrideCssStyles;

    let heading;

    if(headingText !== null) {
        heading = document.createElement("h3");
        heading.innerText = headingText;
        heading.style = "float: left; height: 30px; margin: -10px 0px 0px -10px; background-color: " + COLOUR.DarkGrey + "; width: calc(100% + 20px - 35px); box-sizing: border-box; padding: 0px; font-size: 10px; color: white; text-align: center; line-height: 30px; border: 1px solid " + COLOUR.DarkGrey + ";";
        div.appendChild(heading);
    }

    //---------------------------------------//
    //           MINIMIZE BUTTON             //
    //---------------------------------------//
    let minimizeBtn = createButton("-", "display: block; float: left; width: 35px;height:30px; border:none;padding:2px; color:white;min-height: 20px; margin: -10px -10px 0px 0px; box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px;background-color:" + COLOUR.LightBlue + ";", () => {toggleMinimize();});
    div.appendChild(minimizeBtn);

    function toggleMinimize() {
        if(div.style.maxHeight != "10px") {
            div.style.maxHeight = "10px";
            div.style.overflowY = "hidden";
            minimizeBtn.innerText = "▭";
        }
        else {
            div.style.maxHeight = "800px";
            div.style.overflowY = "auto";
            minimizeBtn.innerText = "-";
        }
    }

    if(parentObjectToAppendTo != null) {
        parentObjectToAppendTo.appendChild(div);
    }
    return [div, heading];
}
function createDivStyle3(overrideCssStyles, headingText, parentObjectToAppendTo) {
    var div = document.createElement("div");
    div.style = STYLE.Div3;
    div.style.cssText += overrideCssStyles;

    let divContent = document.createElement("div");
    divContent.style = "width:100%;min-height:30px;max-height:400px;overflow-y:scroll;";

    let heading;

    if(headingText !== null) {
        heading = document.createElement("h3");
        heading.innerText = headingText;
        heading.style = "float: left; height: 30px; margin: 0px 0px 0px 0px; background-color: " + COLOUR.DarkGrey + "; width: calc(100% - 70px); box-sizing: border-box; padding: 0px; font-size: 10px; color: white; text-align: center; line-height: 30px; border: 1px solid " + COLOUR.DarkGrey + ";";
        div.appendChild(heading);
    }

    /**
     * @MinimizeBtn
     */
    let minimizeBtn = createButton("-", "display: block; float: right; width: 35px;height:30px; border:none;padding:2px; color:white;min-height: 20px; margin: 0px 0px 0px 0px; box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px;background-color:" + COLOUR.LightBlue + ";", () => {toggleMinimize();});
    minimizeBtn.id = "minimizeBtn";
    minimizeBtn.dataset.minimizedState = "maximized";
    div.appendChild(minimizeBtn);

    /**
     * @PopOutBtn
     */
    let popOutBtn = createButton("\u274F", "display: block; float: right; width: 35px;height:30px; border:none;padding:2px; color:white;min-height: 20px; margin: 0px; box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px;background-color:" + COLOUR.DarkBlue + ";", () => {
        setFieldDisabled(true, popOutBtn);
        new ModalPopOut("Expanded View", () => {setFieldDisabled(false, popOutBtn);}, div);
    }, div);

    div.appendChild(divContent);

    function toggleMinimize() {
        if(divContent.style.display == "none") {
            divContent.style.display = "block";
            minimizeBtn.innerText = "-";
            minimizeBtn.dataset.minimizedState = "maximized";
        } else {
            divContent.style.display = "none";
            minimizeBtn.innerText = "▭";
            minimizeBtn.dataset.minimizedState = "minimized";
        }
        /*
        if(div.style.maxHeight != "10px") {
            div.style.maxHeight = "10px";
            div.style.overflowY = "hidden";
            minimizeBtn.innerText = "▭";
        }
        else {
            div.style.maxHeight = "800px";
            div.style.overflowY = "auto";
            minimizeBtn.innerText = "-";
        }*/
    }

    if(parentObjectToAppendTo != null) {
        parentObjectToAppendTo.appendChild(div);
    }
    return [div, divContent, heading];
}
function createDivStyle4(overrideCssStyles, parentObjectToAppendTo) {
    var div = document.createElement("div");
    div.style = "box-sizing: border-box;width:calc(100% - 20px);" + STYLE.DropShadow + ";margin:10px;padding:5px;border:1px solid #ccc;float:left;border-collapse:collapse;background-color:white;";
    div.style.cssText += overrideCssStyles;

    if(parentObjectToAppendTo != null) {
        parentObjectToAppendTo.appendChild(div);
    }
    return div;
}
function createDivStyle5(overrideCssStyles, headingText, parentObjectToAppendTo) {
    let f_div = document.createElement("div");
    let f_headingTextWrapper = document.createElement("div");
    let f_headingText = document.createElement("span");
    let f_headingTextWrapper2 = document.createElement("div");
    let f_arrow = document.createElement("span");
    let f_contentContainer = document.createElement("div");

    f_div.style = STYLE.Div5 + ";min-height:30px;background-color:" + COLOUR.MediumGrey + ";";
    f_div.style.cssText += overrideCssStyles;

    f_headingTextWrapper.style = "display:table;width:100px;text-align: center;float: left; position: relative; background-color: " + COLOUR.DarkBlue +
        ";box-sizing: border-box; padding: 0px; font-size: 10px; color: white; text-align: center; margin: 0px; border: 0px;";

    f_headingText.style = "display:table-cell;vertical-align: middle;word-break: break-all;";
    f_headingText.innerText = headingText;

    f_headingTextWrapper2.style = "display:table;width:20px;text-align: center;float: left; position: relative; background-color: " + COLOUR.DarkBlue +
        ";box-sizing: border-box; padding: 0px; font-size: 20px; color: white; text-align: center; margin: 0px; border: 0px;";

    f_arrow.style = "display:table-cell;vertical-align: middle;word-break: break-all;";
    f_arrow.innerHTML = "&#11208";

    f_contentContainer.style = "width:calc(100% - 120px);height:100%;float:left;position: relative;";

    f_headingTextWrapper.addEventListener("click", function() {
        $(f_contentContainer).toggle();
        console.log(f_arrow.innerHTML);
        toggle(f_arrow.innerHTML == "⯈", () => {
            f_arrow.innerHTML = "&#11207";
        }, () => {
            f_arrow.innerHTML = "&#11208";
        });
    });

    if(parentObjectToAppendTo != null) {
        parentObjectToAppendTo.appendChild(f_div);
    }
    f_headingTextWrapper.appendChild(f_headingText);
    f_div.appendChild(f_headingTextWrapper);
    f_headingTextWrapper2.appendChild(f_arrow);
    f_div.appendChild(f_headingTextWrapper2);
    f_div.appendChild(f_contentContainer);

    return [f_div, f_contentContainer, f_headingText, f_headingTextWrapper];
}
function createButton(text, overrideCssStyles, optionalCallback, parentObjectToAppendTo) {
    var btn = document.createElement('button');
    btn.appendChild(document.createTextNode(text));
    btn.style = STYLE.Button;
    btn.style.cssText += overrideCssStyles;
    btn.dataset.backgroundColor = btn.style.backgroundColor;
    btn.style.borderColor = btn.style.backgroundColor;
    btn.dataset.backgroundColorDisabled = COLOUR.White;
    btn.dataset.initialTextColor = btn.style.color;
    btn.blur();
    var initialBackgroundColor = btn.style.backgroundColor;
    var initialTextColor = btn.style.color;
    $(btn).hover(function() {
        $(this).css("background-color", initialTextColor);
        $(this).css("color", initialBackgroundColor);
        btn.style.boxShadow = "3px 4px 10px 0px rgba(0, 0, 0, 0.8)";
    }, function() {
        $(this).css("background-color", initialBackgroundColor);
        $(this).css("color", initialTextColor);
        btn.style.boxShadow = "3px 4px 10px 0px rgba(0, 0, 0, 0.3)";
    });
    if(optionalCallback) {
        btn.onclick = optionalCallback;
    }
    if(parentObjectToAppendTo != null) {
        parentObjectToAppendTo.appendChild(btn);
    }
    return btn;
}
function createIconButton(src, text, overrideCssStyles, optionalCallback, parentObjectToAppendTo, invertOff) {
    let btn = document.createElement('button');
    let icon = document.createElement("img");
    let textField = document.createElement("p");
    let height;

    btn.style = STYLE.Button + ";line-height:30px";
    btn.style.cssText += overrideCssStyles;
    height = btn.style.height ? "" + btn.style.height : "30px";
    console.log(height);
    btn.dataset.backgroundColor = btn.style.backgroundColor;
    btn.style.borderColor = btn.style.backgroundColor;
    btn.dataset.backgroundColorDisabled = COLOUR.White;
    btn.blur();
    var initialBackgroundColor = btn.style.backgroundColor;
    $(btn).hover(() => {
        $(btn).css("background-color", "white");
        $(btn).css("color", initialBackgroundColor);
        $(textField).css("color", initialBackgroundColor);
        if(!invertOff) icon.style.filter = "invert(2%)";
    }, () => {
        $(btn).css("background-color", initialBackgroundColor);
        $(btn).css("color", "white");
        $(textField).css("color", "white");
        if(!invertOff) icon.style.filter = "invert(100%)";
    });

    icon.style = "height:100%;padding:0px;filter:invert(100%);float:left;";
    if(invertOff) icon.style.filter = "invert(0%)";
    icon.src = src;
    btn.appendChild(icon);

    textField.style = "color:white;font-size:13px;margin:0px;margin-top:-4px;text-align:center;vertical-align:center;line-height:" + height;
    textField.innerText = text;
    btn.appendChild(textField);

    if(optionalCallback) {
        btn.onclick = optionalCallback;
    }
    if(parentObjectToAppendTo != null) {
        parentObjectToAppendTo.appendChild(btn);
        //parentObjectToAppendTo.appendChild(textE);
    }
    return btn;
}
function createInput(text, defaultValue, overrideCssStyles, optionalCallback, parentObjectToAppendTo) {
    var input = document.createElement('input');
    input.placeholder = text;
    input.autocomplete = 'off';
    input.style = STYLE.InputField;
    if(defaultValue != null) input.value = defaultValue;
    if(overrideCssStyles) input.style.cssText += overrideCssStyles;
    if(optionalCallback) {
        input.onkeyup = optionalCallback;
    }
    if(parentObjectToAppendTo != null) {
        parentObjectToAppendTo.appendChild(input);
    }
    return input;
}
function createInput_Infield(text, defaultValue, overrideCssStyles, optionalCallback, parentObjectToAppendTo, fieldRequired, increments, options = {
    prefix: "",
    postfix: ""
}) {
    var input = document.createElement('input');
    var containerDiv = document.createElement('div');
    var textDescription = document.createElement('p');
    textDescription.style = "width:calc(100% - 15px);box-sizing:border-box;height:18px;margin: 0px;padding:2px;color:#666;font-size:11px;";
    textDescription.innerText = text;
    input.autocomplete = 'off';
    input.autocomplete = "one-time-code";
    input.style = "float:left;field-sizing:content;min-width:10px;max-width:calc(100% - 4px);height:18px;margin: 0px;padding:2px;border:0px solid;box-sizing:content-box;outline: none;background:none;text-align:left;position:relative;font-size:14px;";
    containerDiv.style = STYLE.InputInfield;
    containerDiv.appendChild(textDescription);
    containerDiv.appendChild(input);
    if(defaultValue != null) input.value = defaultValue; else input.value = '';
    if(overrideCssStyles) containerDiv.style.cssText += overrideCssStyles;
    if(fieldRequired && input.value == "") {
        containerDiv.style.borderColor = "red";
    }
    if(increments != null) {
        /*var accuracyDigits = 12;
        if(increments<Math.pow(0.1,accuracyDigits)){
            alert("Accuracy of createInput_Infield function not desirable at this increment");
            console.log(increments);
            console.log(Math.pow(0.1,accuracyDigits));
        }*/
        var upArrow = document.createElement('button');
        upArrow.innerHTML = "&#9650";
        upArrow.style = "width:15px;height:20px;float:right;background-color:" + COLOUR.DarkGrey + ";position:absolute;top:0;right:0;color:white; border:0px solid " + COLOUR.DarkGrey + ";cursor: pointer;padding:0px;";
        upArrow.tabIndex = "-1";
        $(upArrow).hover(function() {
            $(this).css("background-color", "white");
            $(this).css("color", COLOUR.DarkGrey);
        }, function() {
            $(this).css("background-color", COLOUR.DarkGrey);
            $(this).css("color", "white");
        });
        upArrow.onclick = function() {
            var currentVal = (input.value == '' ? 0 : parseFloat(input.value));
            input.value = roundNumber(currentVal + increments, 12);
            $(input).keyup();
        };

        var downArrow = document.createElement('button');
        downArrow.innerHTML = "&#9660";
        downArrow.style = "width:15px;height:20px;float:right;background-color:" + COLOUR.DarkGrey + ";position:absolute;bottom:0px;right:0;color:white; border:0px solid " + COLOUR.DarkGrey + ";cursor: pointer;padding:0px;tabindex:-1;";
        downArrow.tabIndex = "-1";
        $(downArrow).hover(function() {
            $(this).css("background-color", "white");
            $(this).css("color", COLOUR.DarkGrey);
        }, function() {
            $(this).css("background-color", COLOUR.DarkGrey);
            $(this).css("color", "white");
        });
        downArrow.onclick = function() {
            var currentVal = (input.value == '' ? 0 : parseFloat(input.value));
            input.value = roundNumber(currentVal - increments, 12);
            $(input).keyup();
        };

        containerDiv.appendChild(upArrow);
        containerDiv.appendChild(downArrow);
    }
    input.onkeyup = function() {
        if(optionalCallback) {
            optionalCallback();
        }
        if(input.value != "" || !fieldRequired) {
            containerDiv.style.borderColor = "rgb(177, 177, 177)";
        } else {
            containerDiv.style.borderColor = "red";
        }
    };
    input.onchange = function() {
        if(optionalCallback) {
            optionalCallback();
        }
        if(input.value != "" || !fieldRequired) {
            containerDiv.style.borderColor = "rgb(177, 177, 177)";
        } else {
            containerDiv.style.borderColor = "red";
        }
    };

    containerDiv.addEventListener("click", (event) => {
        if(event.target == containerDiv) {
            input.focus();
        }
    });

    textDescription.onclick = function() {
        input.focus();
    };

    if(parentObjectToAppendTo != null) {
        parentObjectToAppendTo.appendChild(containerDiv);
    }

    if(options.prefix) {
        let prefixField = document.createElement("p");
        prefixField.style = "float:left; field-sizing: content;color:#555;height:18px;margin: 0px;padding:2px;border:0px solid;box-sizing:content-box;outline: none;background:none;text-align:left;position:relative;font-family:Arial;font-size: 14px;line-height: 18px;";
        prefixField.innerText = options.prefix;
        prefixField.onclick = function() {
            input.focus();
        };
        input.style.cssText += "";
        insertBefore(prefixField, input);
    }
    if(options.postfix) {
        let postfixField = document.createElement("p");
        postfixField.style = "float:left; field-sizing: content;color:#555;height:18px;margin: 0px;padding:2px;border:0px solid;box-sizing:content-box;outline: none;background:none;text-align:left;position:relative;font-family:Arial;font-size: 14px;line-height: 18px;";
        postfixField.innerText = options.postfix;
        postfixField.onclick = function() {
            input.focus();
        };
        input.style.cssText += "";
        insertAfter(postfixField, input);
    }

    return [containerDiv, input, textDescription];
}
function createInputCalculated_Infield(text, defaultValue, overrideCssStyles, optionalCallback, locked, parentObjectToAppendTo) {
    var input = document.createElement('input');
    var containerDiv = document.createElement('div');
    var textDescription = document.createElement('p');
    var calculated_Text = document.createElement('p');
    calculated_Text.style = "width:30%;height:20px;margin: 0px;padding:4px;padding-top:8px;color:#666;font-size:12px;float:left";
    calculated_Text.innerText = "Calculated";
    var calculated = document.createElement('input');
    calculated.style = "float:left;width:45%;height:20px;margin: 0px;padding:4px;border:0px solid;box-sizing:content-box;outline: none;background:none;text-align:left;color:#666;";
    calculated.autocomplete = 'off';
    calculated.disabled = true;
    textDescription.style = "width:97%;height:10px;margin: 0px;padding:4px;color:#666;font-size:12px;float:left";
    textDescription.innerText = text;
    input.autocomplete = 'off';
    input.disabled = true;
    input.style = "float:left;width:97%;height:20px;margin: 0px;padding:4px;border:0px solid;box-sizing:content-box;outline: none;background:none;text-align:left;";
    containerDiv.style = STYLE.InputInfield;
    var lockButton = createButton("", "border-color:white;margin:0px;max-height:30px;min-height:30px;width:30px;object-fit: contain;float:left;background:url('" + ICON.lock + "');background-size: cover;background-repeat: no-repeat;background-position: center;", toggleLocked);
    lockButton.disabled = false;
    $(lockButton).hover(function() {
        $(this).css("background-color", "white");
        $(this).css("color", COLOUR.Blue);
    }, function() {
        $(this).css("background-color", "white");
        $(this).css("color", COLOUR.Blue);
    });
    var toggleIsLocked = true;

    containerDiv.appendChild(textDescription);
    containerDiv.appendChild(input);
    containerDiv.appendChild(calculated_Text);
    containerDiv.appendChild(calculated);
    containerDiv.appendChild(lockButton);


    if(defaultValue != null) {
        input.value = defaultValue;
        calculated.value = defaultValue;
    }
    if(overrideCssStyles) containerDiv.style.cssText += overrideCssStyles;
    if(optionalCallback) {
        input.onkeyup = optionalCallback;
    }
    if(parentObjectToAppendTo != null) {
        parentObjectToAppendTo.appendChild(containerDiv);
    }

    function toggleLocked() {
        //if is locked icon, then unlock
        if(lockButton.style.backgroundImage == 'url("' + ICON.lock + '")') {
            lockButton.style.backgroundImage = 'url("' + ICON.unlock + '")';
            //unlocked
            toggleIsLocked = false;
            input.disabled = false;
            input.style.outline = "1px solid black";
        } else {
            lockButton.style.backgroundImage = 'url("' + ICON.lock + '")';
            //locked
            toggleIsLocked = true;
            input.disabled = true;
            input.value = calculated.value;
            input.style.outline = "none";
        }
    }

    //to call use         $(test[2]).val(600).change();
    $(calculated).on("change", function() {
        if(toggleIsLocked) {
            input.value = calculated.value;
        }
    });

    return [containerDiv, input, calculated];
}
function createTextarea(text, defaultValue, overrideCssStyles, optionalCallback, parentObjectToAppendTo) {
    var input = document.createElement('textarea');
    input.placeholder = text;
    input.autocomplete = 'off';
    input.style = STYLE.InputField;
    if(defaultValue != null) input.value = defaultValue;
    if(overrideCssStyles) input.style.cssText += overrideCssStyles;
    if(optionalCallback) {
        input.onkeyup = optionalCallback;
    }
    if(parentObjectToAppendTo != null) {
        parentObjectToAppendTo.appendChild(input);
    }
    return input;
}
function createDropdown(text, selectedIndex, overrideCssStyles, options, optionalCallback) {
    var dropdown = document.createElement('select');
    dropdown.placeholder = text;
    dropdown.style = STYLE.DropDownField;
    dropdown.style.cssText += overrideCssStyles;
    if(options != null) {
        options.forEach(function(item, index) {
            dropdown.add(item, index);
        });
    }
    if(selectedIndex != null) dropdown.selectedIndex = selectedIndex;
    if(optionalCallback) {
        dropdown.onchange = optionalCallback;
    }
    return dropdown;
}
function createDropdown_Infield(text, selectedIndex, overrideCssStyles, options, optionalCallback, parentObjectToAppendTo) {
    var dropdown = document.createElement('select');
    if(options != null) {
        options.forEach(function(item) {
            dropdown.add(item);
        });
    }
    var containerDiv = document.createElement('div');

    var textDescription = document.createElement('p');
    textDescription.style = "width:97%;height:10px;margin: 0px;padding:4px;color:#666;font-size:12px;background:none;";
    textDescription.innerText = text;
    textDescription.style.cursor = "pointer";
    dropdown.style = "float:left;width:97%;height:20px;margin: 0px;padding:4px;padding-top:20px;border:0px solid;box-sizing:content-box;outline: none;background:none;text-align:left;position:absolute;top:0;left:0;";
    dropdown.style.cursor = "pointer";
    containerDiv.style = STYLE.DropDownInfield;
    containerDiv.style.cursor = "pointer";
    containerDiv.appendChild(textDescription);
    containerDiv.appendChild(dropdown);
    if(selectedIndex != null) dropdown.selectedIndex = selectedIndex;
    if(overrideCssStyles) containerDiv.style.cssText += overrideCssStyles;
    if(optionalCallback) {
        dropdown.onchange = optionalCallback;
    }
    if(parentObjectToAppendTo != null) {
        parentObjectToAppendTo.appendChild(containerDiv);
    }
    return [containerDiv, dropdown];
}
function createDropdown_Infield_Icons(text, selectedIndex, overrideCssStyles, widthOfIcon, iconIsColour, options, optionalCallback, parentObjectToAppendTo) {
    var containerDiv = document.createElement('div');
    containerDiv.style = STYLE.DropDownInfield;
    containerDiv.style.cursor = "pointer";

    var dummyInput = createInput("", "", "display:none;", null, containerDiv);

    var textDescription = document.createElement('p');
    textDescription.style = "width:97%;height:10px;margin: 0px;padding:4px;color:#666;font-size:12px;background:none;";
    textDescription.style.cursor = "pointer";
    textDescription.innerText = text;
    textDescription.onclick = function() {
        $(dropdownBody).toggle();
    };
    containerDiv.appendChild(textDescription);

    var dropdownText = document.createElement('div');
    dropdownText.style = "width:97%;height:10px;margin: 0px;padding:4px;color:black;font-size:14px;background:none;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;";
    dropdownText.style.cursor = "pointer";
    dropdownText.innerText = "test123";
    dropdownText.onclick = function() {
        $(dropdownBody).toggle();
    };
    containerDiv.appendChild(dropdownText);


    var dropdownArrow = document.createElement('button');
    dropdownArrow.innerHTML = "&#9660";
    dropdownArrow.style = "width:15px;height:100%;float:right;background-color:" + COLOUR.Blue + ";position:absolute;bottom:0px;right:0;color:white; border:0px solid " + COLOUR.Blue + ";cursor: pointer;padding:0px";
    $(dropdownArrow).hover(function() {
        $(this).css("background-color", "white");
        $(this).css("color", COLOUR.Blue);
    }, function() {
        $(this).css("background-color", COLOUR.Blue);
        $(this).css("color", "white");
    });
    dropdownArrow.onclick = function() {
        $(dropdownBody).toggle();
    };
    containerDiv.appendChild(dropdownArrow);

    var dropdownBody = document.createElement('div');
    dropdownBody.style = "width:100%;height:300px;position:absolute;top:45px;left:0px;display:block;background-color:white;z-index:100;display:none; border:1px solid black;box-shadow: 1px 1px 6px 1px #aaa;overflow-y:scroll";
    containerDiv.appendChild(dropdownBody);

    if(overrideCssStyles) containerDiv.style.cssText += overrideCssStyles;

    if(parentObjectToAppendTo != null) {
        parentObjectToAppendTo.appendChild(containerDiv);
    }

    for(var o = 0; o < options.length; o++) {
        var nullFunc = function() {
            var optionDiv = document.createElement('div');
            optionDiv.style = "width:100%;height:" + createDropdown_Infield_Icons + 20 + "px;border-bottom: 1px solid #aaa;display:block;float:left";
            $(optionDiv).hover(function() {
                $(this).css("background-color", "#ddd");
            }, function() {
                $(this).css("background-color", "white");
            });
            $(optionDiv).click(function() {
                dropdownText.innerText = optionDiv.querySelector("#optionText").innerText;
                dummyInput.value = dropdownText.innerText;
                $(dropdownBody).toggle();
                if(optionalCallback) {
                    optionalCallback();
                }
            });
            $(document).click((event) => {
                if(!$(event.target).closest(containerDiv).length) {
                    dropdownBody.style.display = "none";
                }
            });

            var optionIcon;
            if(iconIsColour) {
                optionIcon = document.createElement('div');
                optionIcon.style.background = options[o][1];
            } else {
                optionIcon = document.createElement('img');
                optionIcon.src = options[o][1];
            }
            optionIcon.style.cssText += "display: block; float: left; width: " + widthOfIcon + "px; height: " + widthOfIcon + "px; margin: 10px 10px; background-size: cover;";
            optionDiv.appendChild(optionIcon);

            var optionText = document.createElement('p');
            optionText.innerText = options[o][0];
            optionText.style = "display:block;float:left;width:calc(100%-20px);height:" + widthOfIcon + "px;color:black;padding:10px;font-size:14px;margin:0px;display: table-cell;line-height: " + widthOfIcon + "px;vertical-align: middle; ";
            optionText.id = "optionText";
            optionDiv.appendChild(optionText);

            dropdownBody.appendChild(optionDiv);
        };
        nullFunc();
    }

    if(selectedIndex !== null) {
        dropdownText.innerText = containerDiv.querySelectorAll("#optionText")[selectedIndex].innerText;
        dummyInput.value = dropdownText.innerText;
    }

    return [containerDiv, dummyInput, dropdownBody];
}
function createDropdown_Infield_Icons_Search(text, selectedIndex, overrideCssStyles, widthOfIcon, iconIsColour, options, optionalCallback, parentObjectToAppendTo, canAddCustom = false) {
    var containerDiv = document.createElement('div');
    containerDiv.style = STYLE.DropDownInfield;
    containerDiv.style.cursor = "pointer";

    var dummyInput = createInput("test", "", ";display:none;", null, null);
    dummyInput.id = "test";

    var textDescription = document.createElement('p');
    textDescription.style = "width:97%;height:10px;margin: 0px;padding:4px;color:#666;font-size:12px;background:none;";
    textDescription.style.cursor = "pointer";
    textDescription.innerText = text;
    textDescription.onclick = toggleMenu;

    containerDiv.appendChild(textDescription);

    var dropdownText = document.createElement('div');
    dropdownText.style = "width:97%;height:15px;margin: 0px;padding:4px;color:black;font-size:14px;background:none;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;";
    dropdownText.style.cursor = "pointer";
    dropdownText.innerText = "test123";
    dropdownText.onclick = toggleMenu;
    containerDiv.appendChild(dropdownText);


    var dropdownArrow = document.createElement('button');
    dropdownArrow.innerHTML = "&#9660";
    dropdownArrow.style = "width:15px;height:100%;float:right;background-color:" + COLOUR.DarkGrey + ";position:absolute;bottom:0px;right:0;color:white; border:0px solid " + COLOUR.DarkGrey + ";cursor: pointer;padding:0px";
    $(dropdownArrow).hover(function() {
        $(this).css("background-color", "white");
        $(this).css("color", COLOUR.DarkGrey);
    }, function() {
        $(this).css("background-color", COLOUR.DarkGrey);
        $(this).css("color", "white");
    });
    dropdownArrow.onclick = toggleMenu;
    containerDiv.appendChild(dropdownArrow);

    var searchBar = createInput("", null, "width:" + 600 + "px;height:30px;position:fixed;top:40px;left:0px;display:none;margin:0;padding:5px;box-sizing:border-box;z-index:1000;border:0px;outline:none;", narrowSearches, containerDiv);
    searchBar.placeholder = "Search or Type Custom...";

    function narrowSearches() {
        let currentSearchTerm = searchBar.value.toLowerCase();
        let atLeastOneSearchTermfound = false;
        for(let i = 0; i < options.length; i++) {
            let optionValue = options[i][0].toLowerCase();
            let matchesSearchTerm = optionValue.includes(currentSearchTerm);
            if(matchesSearchTerm) {
                atLeastOneSearchTermfound = true;
                internalOptionDivs[i].style.display = "block";
            } else {
                internalOptionDivs[i].style.display = "none";
            }
        }
        if(atLeastOneSearchTermfound == false) {
            showAddCustom();
        } else {
            hideCustom();
        }
    }
    let customDropdownOption;
    function showAddCustom() {
        if(canAddCustom) {
            for(let i = options.length; i < options.length + 1; i++) {
                internalOptionDivs[i].style.display = "block";
                containerDiv.querySelectorAll("#optionText")[i].innerText = searchBar.value;
            }
        }
    }
    function hideCustom() {
        if(canAddCustom) {
            for(let i = options.length; i < options.length + 1; i++) {
                internalOptionDivs[i].style.display = "none";
            }
        }
    }

    function resetSearches() {
        for(let i = 0; i < options.length; i++) {
            internalOptionDivs[i].style.display = "block";
        }
    }

    var isScrollInside = false;

    document.addEventListener("wheel", (event) => {
        if(!isScrollInside) {
            $(dropdownBody).hide();
            $(searchBar).hide();
            searchBar.value = "";
        }
    });

    function toggleMenu() {
        $(dropdownBody).toggle();
        $(searchBar).toggle();
        searchBar.value = "";
        searchBar.focus();
        searchBar.style.top = containerDiv.getBoundingClientRect().y + containerDiv.getBoundingClientRect().height + 0 + "px";
        searchBar.style.left = containerDiv.getBoundingClientRect().x + "px";
        resetSearches();
        hideCustom();
        dropdownBody.style.top = containerDiv.getBoundingClientRect().y + containerDiv.getBoundingClientRect().height + 40 + "px";
        dropdownBody.style.left = containerDiv.getBoundingClientRect().x + "px";
    }

    var dropdownBody = document.createElement('div');
    dropdownBody.style = "width:" + 600 + "px;height:400px;position:fixed;top:200px;left:0px;display:block;background-color:white;z-index:100;display:none; border:1px solid black;" + STYLE.DropShadow + ";overflow-y:scroll;z-index:1000;";
    containerDiv.appendChild(dropdownBody);
    containerDiv.appendChild(dummyInput);
    dropdownBody.style.top = containerDiv.getBoundingClientRect().bottom;
    dropdownBody.style.left = containerDiv.getBoundingClientRect().left;

    dropdownBody.addEventListener("mouseout", (event) => {
        isScrollInside = false;
    });

    dropdownBody.addEventListener("mouseover", (event) => {
        isScrollInside = true;
    });

    if(overrideCssStyles) containerDiv.style.cssText += overrideCssStyles;

    if(parentObjectToAppendTo != null) {
        parentObjectToAppendTo.appendChild(containerDiv);
    }
    let internalOptionDivs = [];
    function createDropdownItems(dropdownOptions) {

        for(var o = 0; o < dropdownOptions.length; o++) {
            var nullFunc = function() {
                var optionDiv = document.createElement('div');
                internalOptionDivs.push(optionDiv);
                optionDiv.style = "width:100%;height:" + createDropdown_Infield_Icons + 20 + "px;border-bottom: 1px solid #aaa;display:block;float:left";
                $(optionDiv).hover(function() {
                    $(this).css("background-color", "#ddd");
                }, function() {
                    $(this).css("background-color", "white");
                });
                $(optionDiv).click(function() {
                    dropdownText.innerText = optionDiv.querySelector("#optionText").innerText;
                    dummyInput.value = dropdownText.innerText;
                    toggleMenu();
                    if(optionalCallback) {
                        optionalCallback();
                    }
                });
                $(document).click((event) => {
                    if(!$(event.target).closest(containerDiv).length) {
                        dropdownBody.style.display = "none";
                        searchBar.style.display = "none";
                    }
                });

                var optionIcon;
                if(iconIsColour) {
                    optionIcon = document.createElement('div');
                    optionIcon.style.background = dropdownOptions[o][1];
                } else {
                    optionIcon = document.createElement('img');
                    optionIcon.src = dropdownOptions[o][1];
                }
                optionIcon.style.cssText += "display: block; float: left; width: " + widthOfIcon + "px; height: " + widthOfIcon + "px; margin: 10px 10px; background-size: cover;";
                optionDiv.appendChild(optionIcon);

                var optionText = document.createElement('p');
                optionText.innerText = dropdownOptions[o][0];
                optionText.style = "display:block;float:left;width:calc(100%-20px);height:" + widthOfIcon + "px;color:black;padding:10px;font-size:14px;margin:0px;display: table-cell;line-height: " + widthOfIcon + "px;vertical-align: middle; ";
                optionText.id = "optionText";
                optionDiv.appendChild(optionText);

                dropdownBody.appendChild(optionDiv);
            };
            nullFunc();
        }
    }
    createDropdownItems(options);
    createDropdownItems([["Use Custom", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkbiJarSPG1EXUnQ24f7kOzpi_rpAaS_wr6iEB0N4PHDyBeU5tCyGBWsZwIvYr8Cyg_ZU&usqp=CAU"]]);
    for(let i = options.length; i < options.length + 1; i++) {
        internalOptionDivs[i].style.display = "none";
    }

    if(selectedIndex !== null) {
        dropdownText.innerText = containerDiv.querySelectorAll("#optionText")[selectedIndex].innerText;
        dummyInput.value = dropdownText.innerText;
    }

    dummyInput.onchange = function() {
        dropdownText.innerText = dummyInput.value;
    };

    return [containerDiv, dummyInput, textDescription, dropdownBody];
}
function createFloatingTag(text, overrideCssStyles, parentObjectToAppendTo) {
    let floatingTag = document.createElement("div");
    floatingTag.innerText = text;
    floatingTag.style = STYLE.FloatingTag;
    if(overrideCssStyles) floatingTag.style.cssText += overrideCssStyles;
    if(parentObjectToAppendTo != null) {
        parentObjectToAppendTo.appendChild(floatingTag);
    }
    return floatingTag;
}
function createIFrame(url, overrideCssStyles, parentObjectToAppendTo) {
    let element = document.createElement("iframe");
    element.src = url;
    if(overrideCssStyles) element.style.cssText += overrideCssStyles;
    if(parentObjectToAppendTo != null) {
        parentObjectToAppendTo.appendChild(element);
    }
    return element;
}

function resetDropdownOption_Icon(options, dropdownText, dropdownBody, optionalCallback) {
    for(var o = 0; o < options.length; o++) {
        var nullFunc = function() {
            var optionDiv = document.createElement('div');
            optionDiv.style = "width:100%;height:" + createDropdown_Infield_Icons + 20 + "px;border-bottom: 1px solid #aaa;display:block;float:left";
            $(optionDiv).hover(function() {
                $(this).css("background-color", "#ddd");
            }, function() {
                $(this).css("background-color", "white");
            });
            $(optionDiv).click(function() {
                dropdownText.innerText = optionDiv.querySelector("#optionText").innerText;
                $(dropdownBody).toggle();
                if(optionalCallback) {
                    optionalCallback();
                }
            });
            $(document).click((event) => {
                if(!$(event.target).closest(containerDiv).length) {
                    dropdownBody.style.display = "none";
                }
            });

            var optionIcon;
            if(iconIsColour) {
                optionIcon = document.createElement('div');
                optionIcon.style.background = options[o][1];
            } else {
                optionIcon = document.createElement('img');
                optionIcon.src = options[o][1];
            }
            optionIcon.style.cssText += "display: block; float: left; width: " + widthOfIcon + "px; height: " + widthOfIcon + "px; margin: 10px 10px; background-size: cover;";
            optionDiv.appendChild(optionIcon);

            var optionText = document.createElement('p');
            optionText.innerText = options[o][0];
            optionText.style = "display:block;float:left;width:calc(100%-20px);height:" + widthOfIcon + "px;color:black;padding:10px;font-size:14px;margin:0px;display: table-cell;line-height: " + widthOfIcon + "px;vertical-align: middle; ";
            optionText.id = "optionText";
            optionDiv.appendChild(optionText);

            dropdownBody.appendChild(optionDiv);
        };
        nullFunc();
    }
}

function createOptGroup(text, options) {
    var optgroup = document.createElement('optgroup');
    optgroup.setAttribute("label", text);
    if(options != null) {
        options.forEach(function(item) {
            optgroup.appendChild(item);
        });
    }
    return optgroup;
}
function createDropdownOption(text, value) {
    var dropdownOption = document.createElement("option");
    dropdownOption.text = text;
    if(!value) dropdownOption.value = text;
    else dropdownOption.value = value;

    return dropdownOption;
}

function setOptions(field, options) {
    while(field.firstChild) {
        field.removeChild(field.firstChild);
    }

    for(var l = 0; l < options.length; l++) {
        field.add(options[l]);
    }
}

function createOptGroupDropdown(text, parent, classN, innerH, selectedIndex, overrideCssStyles, options, optionalCallback) {
    var divContainer = document.createElement("div");
    divContainer.style = "display:block;float:left;padding:2px;";
    var dropdown = createDropdown("classN", 0, STYLE.Button, null);
    dropdown.style = STYLE.Button + ";font-size:11px;";
    dropdown.style.margin = "0px";
    dropdown.style.cssText += overrideCssStyles;
    dropdown.blur();
    var initialdropdownBackgroundColor = dropdown.style.backgroundColor;
    $(dropdown).hover(() => {
        $(dropdown).css("background-color", "white");
        $(dropdown).css("color", initialdropdownBackgroundColor);
    }, () => {
        $(dropdown).css("background-color", initialdropdownBackgroundColor);
        $(dropdown).css("color", "white");
    });

    dropdown.innerHTML = innerH;
    dropdown.className = classN;

    for(var o = 0; o < options.length; o++) {
        dropdown.add(options[o]);
    }

    var btn = document.createElement("button");
    btn.style = STYLE.Button;
    btn.style.cssText += "width:30px;margin:0px;margin-left:3px";
    btn.innerHTML = "+";
    btn.className = classN;
    btn.onclick = optionalCallback;
    btn.blur();
    var initialBtnBackgroundColor = btn.style.backgroundColor;
    $(btn).hover(() => {
        $(btn).css("background-color", "white");
        $(btn).css("color", initialBtnBackgroundColor);
    }, () => {
        $(btn).css("background-color", initialBtnBackgroundColor);
        $(btn).css("color", "white");
    });

    divContainer.appendChild(dropdown);
    divContainer.appendChild(btn);
    parent.appendChild(divContainer);
    return dropdown;
}
function createLabel(text, overrideCssStyles, parentObjectToAppendTo) {
    var label = document.createElement('label');
    label.appendChild(document.createTextNode(text));
    label.style = STYLE.Label;
    label.style.cssText += overrideCssStyles;
    if(parentObjectToAppendTo != null) {
        parentObjectToAppendTo.appendChild(label);
    }
    return label;
}

/**
 * @param {String} text 
 * @param {String} overrideCssStyles 
 * @param {object} parentObjectToAppendTo 
 * @returns HTML text Object
 * @description for Symbols use \u_____ 
 * @see https://www.w3schools.com/charsets/ref_utf_punctuation.asp
 * @see https://www.w3schools.com/charsets/ref_utf_currency.asp
 * @see https://www.w3schools.com/charsets/ref_utf_letterlike.asp
 * @see https://www.w3schools.com/charsets/ref_utf_arrows.asp
 * @see https://www.w3schools.com/charsets/ref_utf_math.asp
 * @see https://www.w3schools.com/charsets/ref_utf_box.asp
 * @see https://www.w3schools.com/charsets/ref_utf_block.asp
 * @see https://www.w3schools.com/charsets/ref_utf_geometric.asp
 * @see https://www.w3schools.com/charsets/ref_utf_symbols.asp
 * @see https://www.w3schools.com/charsets/ref_utf_dingbats.asp
 * @see https://www.w3schools.com/charsets/ref_emoji.asp
 * @see https://www.w3schools.com/charsets/ref_emoji_smileys.asp
 * @see https://www.w3schools.com/charsets/ref_emoji_skin_tones.asp
 */
function createText(text, overrideCssStyles, parentObjectToAppendTo) {
    let _text = document.createElement('p');
    _text.innerText = text;
    _text.style = STYLE.Label;
    _text.style.cssText += overrideCssStyles;
    if(parentObjectToAppendTo != null) {
        parentObjectToAppendTo.appendChild(_text);
    }
    return _text;
}
function createCheckbox(text, defaultValue, overrideCssStyles, optionalCallback, parentObjectToAppendTo) {
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = "checkbox";
    checkbox.placeholder = text;
    checkbox.style = STYLE.Checkbox;
    if(defaultValue) checkbox.checked = defaultValue;
    if(overrideCssStyles) checkbox.style.cssText += overrideCssStyles;
    if(optionalCallback) {
        checkbox.onchange = optionalCallback;
    }
    if(parentObjectToAppendTo != null) {
        parentObjectToAppendTo.appendChild(checkbox);
    }
    return checkbox;
}
function createCheckbox_Infield(text, defaultValue, overrideCssStyles, optionalCallback, parentObjectToAppendTo) {
    var input = document.createElement('input');
    input.type = "checkbox";
    input.name = "checkbox";
    var containerDiv = document.createElement('div');
    var textDescription = document.createElement('p');
    textDescription.style = "width:calc(100% - 48x);height: 10px;color: rgb(102, 102, 102);font-size: 12px;float: left;display: block;margin: 8px;";
    textDescription.innerText = text;
    input.autocomplete = 'off';
    input.style = "float: left;width: 20px;height: 18px;margin: 6px 6px 6px;background: none;text-align: right;display: block;padding: 5px;";
    containerDiv.style = STYLE.CheckboxInfield;
    containerDiv.appendChild(input);
    containerDiv.appendChild(textDescription);
    containerDiv.onclick = function(e) {
        if(e) e.stopPropagation();
        if(!input.disabled) {
            input.click();
        }
    };
    input.onclick = function(e) {
        if(e) e.stopPropagation();
        if(!input.disabled) {
        }
    };

    containerDiv.style.cursor = "pointer";
    if(defaultValue) input.checked = defaultValue;
    if(overrideCssStyles) containerDiv.style.cssText += overrideCssStyles;
    if(optionalCallback) {
        input.onchange = function() {
            optionalCallback();
        };
    }
    if(parentObjectToAppendTo != null) {
        parentObjectToAppendTo.appendChild(containerDiv);
    }
    return [containerDiv, input];
}
function createRadio(text, defaultValue, overrideCssStyles, optionalCallback) {
    var radio = document.createElement('input');
    radio.type = "radio";
    radio.name = "radio";
    radio.placeholder = text;
    radio.style = STYLE.Checkbox;
    if(defaultValue) radio.checked = defaultValue;
    if(overrideCssStyles) radio.style.cssText += overrideCssStyles;
    if(optionalCallback) {
        radio.onchange = optionalCallback;
    }

    return radio;
}
function createHr(overrideCssStyles, parentObjectToAppendTo) {
    var hr = document.createElement('hr');
    hr.style = "width:95%;display:block;float:left;margin:10px;border-color: " + COLOUR.Blue + ";background-color: " + COLOUR.Blue + ";border-width: 3px;border-radius: 3px;";
    if(overrideCssStyles) hr.style.cssText += overrideCssStyles;
    if(parentObjectToAppendTo != null) {
        parentObjectToAppendTo.appendChild(hr);
    }
    return hr;
}
function createHeading_Numbered(number, text, overrideCssStyles, parentObjectToAppendTo) {
    var container = document.createElement('div');
    container.style = "display:block; float:left; width:100%; height:40px;position: relative;margin-top:25px;";

    var circle = document.createElement('div');
    circle.style = "display:block;width:30px;height:30px;border-style: solid;border-width: 3px;border-color: " + COLOUR.LightBlue + ";border-radius: 20px;float:left;background-color: " + COLOUR.White + ";";
    container.appendChild(circle);

    //var line = document.createElement('div');
    // line.style = "display:block;width:80%;height:3px;background-color:" + COLOUR.LightBlue + ";float:left;margin-top:33px;margin-left:-15px;";
    //container.appendChild(line);

    var numberElement = document.createElement('p');
    numberElement.innerText = number;
    numberElement.style = "display:block;width:30px;height:30px;position:absolute;left:13px;top:10px;margin:0px;color:" + COLOUR.MidGrey + ";font-size:16px;font-weight:bold;";
    container.appendChild(numberElement);

    var textElement = document.createElement('p');
    textElement.innerText = text;
    textElement.style = "display:block;width:80%;height:30px;position:absolute;left:50px;top:10px;margin:0px;color:" + COLOUR.MidGrey + ";font-size:16px;font-weight:bold;";
    container.appendChild(textElement);

    if(overrideCssStyles) container.style.cssText += ";" + overrideCssStyles;
    if(parentObjectToAppendTo != null) {
        parentObjectToAppendTo.appendChild(container);
    }

    return [container, null];
}
function createHeading_Numbered2(number, text, overrideCssStyles, parentObjectToAppendTo) {
    var container = document.createElement('div');
    container.style = "display:block; float:left; width:100%; height:40px;position: relative;margin-top:25px;";

    var circle = document.createElement('div');
    circle.style = "display:block;width:30px;height:30px;border-style: solid;border-width: 3px;border-color: " + COLOUR.LightBlue + ";border-radius: 20px;float:left;background-color: " + COLOUR.LightBlue + ";";
    container.appendChild(circle);

    var line = document.createElement('div');
    line.style = "display:block;width:80%;height:3px;background-color:" + COLOUR.LightBlue + ";float:left;margin-top:33px;margin-left:-15px;";
    container.appendChild(line);

    var numberElement = document.createElement('p');
    numberElement.innerText = number;
    numberElement.style = "display:block;width:30px;height:30px;position:absolute;left:13px;top:10px;margin:0px;color:" + COLOUR.White + ";font-size:16px;font-weight:bold;";
    container.appendChild(numberElement);

    var textElement = document.createElement('p');
    textElement.innerText = text;
    textElement.style = "display:block;width:80%;height:30px;position:absolute;left:50px;top:10px;margin:0px;color:" + COLOUR.LightBlue + ";font-size:16px;font-weight:bold;";
    container.appendChild(textElement);

    if(overrideCssStyles) container.style.cssText += ";" + overrideCssStyles;
    if(parentObjectToAppendTo != null) {
        parentObjectToAppendTo.appendChild(container);
    }

    return [container, null];
}
function createHeadingStyle1(text, overrideCssStyles, parentObjectToAppendTo) {
    let heading = createText(text, STYLE.HeadingStyle1, parentObjectToAppendTo);
    if(overrideCssStyles) hr.style.cssText += overrideCssStyles;
    return heading;
}
function createToken(text, selectedTF, overrideCssStyles, parentObjectToAppendTo) {
    var token = document.createElement('div');
    var fakeValueContainer = document.createElement('input');
    token.style = "display:block;float:left;width:120px;height:30px;font-size:12px;color:" + (selectedTF ? COLOUR.White : COLOUR.DarkGrey) + ";background-color:" + (selectedTF ? COLOUR.Blue : COLOUR.MediumGrey) + ";text-align:center;line-height:30px;border-radius:15px;cursor:pointer;margin:5px;user-select: none;";
    token.style.cssText += overrideCssStyles;
    token.innerText = text;
    token.dataset.selected = (selectedTF ? "true" : "false");
    token.dataset.selectedBackgroundColor = COLOUR.Blue;
    token.dataset.selectedColor = COLOUR.White;
    token.dataset.deselectedBackgroundColor = COLOUR.MediumGrey;
    token.dataset.deselectedColor = COLOUR.DarkGrey;
    fakeValueContainer.value = selectedTF;
    token.onclick = function() {
        fakeValueContainer.value = true;
        token.dataset.selected = "true";
        token.style.backgroundColor = token.dataset.selectedBackgroundColor;
        token.style.color = token.dataset.selectedColor;
    };
    token.onmouseover = function() {
        token.style.cssText += ";box-shadow: rgb(98 98 98) 5px 5px 10px -3px;";
    };
    token.onmouseleave = function() {
        token.style.cssText += ";box-shadow: none;";
    };
    if(parentObjectToAppendTo != null) {
        parentObjectToAppendTo.appendChild(token);
    }
    return [token, fakeValueContainer];
}

/**
 * 
 * @param {*} overrideCssStyles 
 * @param {*} text 
 * @param {*} href 
 * @param {*} target "_blank" (default), "new window"
 * @param {*} parentObjectToAppendTo 
 * @returns 
 */
function createLink(overrideCssStyles = "", text = "", href = "", target = "_blank", parentObjectToAppendTo) {
    let link = document.createElement('a');
    link.style = STYLE.Link;
    link.style.cssText += overrideCssStyles;
    link.innerText = text;

    let windowWidth = 1500, windowHeight = 1000, offsetX, offsetY;

    if(target == "_blank" || target == null) {
        link.target = target;
        link.href = href;
    } else if(target == "new window") {
        link.addEventListener("click", (e) => {
            offsetX = (window.outerWidth - windowWidth) / 2;
            offsetY = (window.innerHeight - windowHeight) / 2 + (window.outerHeight - window.innerHeight) / 2;
            window.open(href, '_blank', 'location=yes,top=' + offsetY + ',left=' + offsetX + ',height=' + windowHeight + ',width=' + windowWidth + ',scrollbars=yes,status=yes');
        });
    }

    if(parentObjectToAppendTo != null) {
        parentObjectToAppendTo.appendChild(link);
    }
    return link;
}

function dropdownSetSelectedIndexToNextAvailable(field, leaveIfCurrentSelectedIsNotDisabled = false) {
    let fieldOptions = field.options;
    let fieldOptionsLength = fieldOptions.length;
    if(leaveIfCurrentSelectedIsNotDisabled && fieldOptions[field.selectedIndex].disabled == false) return;
    for(let i = 0; i < fieldOptionsLength; i++) {
        if(fieldOptions[i].disabled === true) continue;
        else {
            field.selectedIndex = i;
            return;
        }
    }
}
function dropdownSetSelectedValue(field, value) {
    let allOptions = field.options;
    for(let i = 0; i < allOptions.length; i++) {
        if(allOptions[i].value === value) {
            field.selectedIndex = i;
            $(field).change();
            return;
        }
    }
    alert("no value selected for dropdown (no match)");
}
//helper functions
function checkboxesAddToSelectionGroup(oneMustBeChecked, ...checkboxElements) {
    var groupArray = [];

    for(var i = 0; i < checkboxElements.length; i++) {
        groupArray.push(checkboxElements[i]);

        let x = groupArray[i][0];
        let y = groupArray[i][1];
        groupArray[i][1].addEventListener("click", function(e) {
            t(x, y);
        });
    }

    function t(checkboxContainer, checkbox) {
        uncheckOthers(checkbox);
        if(checkbox.checked) {
            checkboxContainer.style.pointerEvents = "none";
        } else {
            checkboxContainer.style.pointerEvents = "all";
        }
    }

    function uncheckOthers(checkbox) {
        for(var i = 0; i < groupArray.length; i++) {
            if(groupArray[i][1] !== checkbox) {
                setCheckboxChecked(false, groupArray[i][1]);
            }
        }
    }

    return groupArray;
}
function divAddToSelectionGroup(...divElements) {
    var groupArray = [];

    for(var i = 0; i < divElements.length; i++) {
        groupArray.push(divElements[i]);

        let x = groupArray[i];
        if(x.dataset.selected == "true") {
            x.style.pointerEvents = "none";
        } else {
            x.style.pointerEvents = "all";
        }
        groupArray[i].addEventListener("click", function(e) {
            x.dataset.selected = "true";
            x.dataset.selected == "true";
            t(x);
        });
    }

    function t(div) {
        uncheckOthers(div);
        if(div.dataset.selected == "true") {
            div.style.pointerEvents = "none";
        } else {
            div.style.pointerEvents = "all";
        }
    }

    function uncheckOthers(div) {
        for(var i = 0; i < groupArray.length; i++) {
            if(groupArray[i] !== div) {
                groupArray[i].style.pointerEvents = "all";
                groupArray[i].style.backgroundColor = groupArray[i].dataset.deselectedBackgroundColor;
                groupArray[i].style.color = groupArray[i].dataset.deselectedColor;
            }
        }
    }

    return groupArray;
}
function tokenAddToSelectionGroup(...tokenElements) {
    var groupArray = [];

    for(var i = 0; i < tokenElements.length; i++) {
        groupArray.push(tokenElements[i]);

        let [x, y] = groupArray[i];
        if(x.dataset.selected == "true") {
            x.style.pointerEvents = "none";
        } else {
            x.style.pointerEvents = "all";
        }
        groupArray[i][0].addEventListener("click", function(e) {
            x.dataset.selected = "true";
            t(x, y);
        });
    }

    function t(div, input) {
        uncheckOthers(div);
        if(div.dataset.selected == "true") {
            div.style.pointerEvents = "none";
            input.value = true;
        } else {
            div.style.pointerEvents = "all";
            input.value = false;
        }
    }

    function uncheckOthers(div) {
        for(var i = 0; i < groupArray.length; i++) {
            if(groupArray[i][0] !== div) {
                groupArray[i][1].value = false;
                groupArray[i][0].style.pointerEvents = "all";
                groupArray[i][0].style.backgroundColor = groupArray[i][0].dataset.deselectedBackgroundColor;
                groupArray[i][0].style.color = groupArray[i][0].dataset.deselectedColor;
            }
        }
    }

    return groupArray;
}
function setFieldDisabled(disabledTF, field, optionalParentContainer) {
    if(field) {
        field.disabled = disabledTF;
        if(disabledTF) {
            if(field.dataset.backgroundColorDisabled) {
                field.style.backgroundColor = field.dataset.backgroundColorDisabled;
            } else {
                field.style.backgroundColor = "none";
            }
        } else {
            if(field.dataset.backgroundColor) {
                field.style.backgroundColor = field.dataset.backgroundColor;
            } else {
                field.style.backgroundColor = "none";
            }
        }
    }
    if(optionalParentContainer) {
        var children = optionalParentContainer.childNodes;
        children.forEach(function(item) {
            item.disabled = disabledTF;
        });
        disabledTF == true ? optionalParentContainer.style.backgroundColor = "rgb(221, 221, 221)" : optionalParentContainer.style.backgroundColor = "white";
    }

    return field || optionalParentContainer;
}
function setFieldHidden(disabledTF, field, optionalParentContainer) {
    if(disabledTF) {
        if(field) {
            $(field).hide();
        }
        if(optionalParentContainer) {
            $(optionalParentContainer).hide();
        }
    } else {
        if(field) {
            $(field).show();
        }
        if(optionalParentContainer) {
            $(optionalParentContainer).show();
        }
    }
    return field || optionalParentContainer;
}
function setCheckboxChecked(checkedTF, field) {
    if(field.checked == checkedTF) return;
    else $(field).click();
}
function clickCheckbox(field) {
    field.click();
}
/**
 * 
 * @param {*} parentControllerType any value within ["Checkbox","Div"]
 * @param {*} masterControllerField the master field that will toggle the children
 * @param  {...any} otherFields the children fields in that group
 */
function makeFieldGroup(parentControllerType, masterControllerField, canOpenAlreadyHidden = true, ...otherFields) {
    switch(parentControllerType) {
        case "Checkbox":
            masterControllerField.addEventListener("change", function(e) {
                let nowState = masterControllerField.checked;
                for(let i = 0; i < otherFields.length; i++) {
                    if(nowState == false) {
                        if(otherFields[i].style.display == "none") {
                            otherFields[i].dataset.wasAlreadyHidden = 'true';
                        } else {
                            otherFields[i].dataset.wasAlreadyHidden = 'false';
                        }
                        setFieldHidden(true, otherFields[i]);
                    } else {
                        if(otherFields[i].dataset.wasAlreadyHidden === 'true' && !canOpenAlreadyHidden) {
                            setFieldHidden(true, otherFields[i]);
                        } else {
                            setFieldHidden(false, otherFields[i]);
                        }
                    }
                }
            });
            break;
        default:
            console.error("No Case Available");
            break;
    }
}

function createWindowDragZones(container, windowGrabZoneWidth = 10, callbackOnResize) {
    let grabbedSide = null;
    let boundingBox = container.getBoundingClientRect();
    let w = boundingBox.width;
    let h = boundingBox.height;

    function updateBoundingBox() {
        boundingBox = container.getBoundingClientRect();
        w = boundingBox.width;
        h = boundingBox.height;
    };

    let leftZone = document.createElement("div");
    let rightZone = document.createElement("div");
    let topZone = document.createElement("div");
    let bottomZone = document.createElement("div");
    let tlCorner = document.createElement("div");
    let trCorner = document.createElement("div");
    let blCorner = document.createElement("div");
    let brCorner = document.createElement("div");

    leftZone.style = "width: " + windowGrabZoneWidth + "px; height: calc(100% - " + (windowGrabZoneWidth) + "px); background-color:none;position:absolute;top:" + (windowGrabZoneWidth / 2) + "px;left:" + (-windowGrabZoneWidth / 2) + "px;cursor:w-resize;";
    rightZone.style = "width: " + windowGrabZoneWidth + "px; height: calc(100% - " + (windowGrabZoneWidth) + "px); background-color:none;position:absolute;top:" + (windowGrabZoneWidth / 2) + "px;right:" + (-windowGrabZoneWidth / 2) + "px;cursor:e-resize;";
    topZone.style = "width: calc(100% - " + (windowGrabZoneWidth) + "px); height: " + windowGrabZoneWidth + "px; background-color:none;position:absolute;top:" + (-windowGrabZoneWidth / 2) + "px;left:" + (windowGrabZoneWidth / 2) + "px;cursor:n-resize;";
    bottomZone.style = "width: calc(100% - " + (windowGrabZoneWidth) + "px); height: " + windowGrabZoneWidth + "px; background-color:none;position:absolute;bottom:" + (-windowGrabZoneWidth / 2) + "px;left:" + (windowGrabZoneWidth / 2) + "px;cursor:s-resize;";
    tlCorner.style = "width: " + windowGrabZoneWidth + "px; height: " + windowGrabZoneWidth + "px; background-color:none;position:absolute;top:" + (-windowGrabZoneWidth / 2) + "px;left:" + (-windowGrabZoneWidth / 2) + "px;cursor:nw-resize;";
    trCorner.style = "width: " + windowGrabZoneWidth + "px; height: " + windowGrabZoneWidth + "px; background-color:none;position:absolute;top:" + (-windowGrabZoneWidth / 2) + "px;right:" + (-windowGrabZoneWidth / 2) + "px;cursor:ne-resize;";
    blCorner.style = "width: " + windowGrabZoneWidth + "px; height: " + windowGrabZoneWidth + "px; background-color:none;position:absolute;bottom:" + (-windowGrabZoneWidth / 2) + "px;left:" + (-windowGrabZoneWidth / 2) + "px;cursor:ne-resize;";
    brCorner.style = "width: " + windowGrabZoneWidth + "px; height: " + windowGrabZoneWidth + "px; background-color:none;position:absolute;bottom:" + (-windowGrabZoneWidth / 2) + "px;right:" + (-windowGrabZoneWidth / 2) + "px;cursor:nw-resize;";

    leftZone.addEventListener("mousedown", (e) => {
        e.preventDefault();
        updateBoundingBox();
        grabbedSide = "left";
    });
    rightZone.addEventListener("mousedown", (e) => {
        e.preventDefault();
        updateBoundingBox();
        grabbedSide = "right";
    });
    topZone.addEventListener("mousedown", (e) => {
        e.preventDefault();
        updateBoundingBox();
        grabbedSide = "top";
    });
    bottomZone.addEventListener("mousedown", (e) => {
        e.preventDefault();
        updateBoundingBox();
        grabbedSide = "bottom";
    });

    tlCorner.addEventListener("mousedown", (e) => {
        e.preventDefault();
        updateBoundingBox();
        grabbedSide = "tl";
    });
    trCorner.addEventListener("mousedown", (e) => {
        e.preventDefault();
        updateBoundingBox();
        grabbedSide = "tr";
    });
    blCorner.addEventListener("mousedown", (e) => {
        e.preventDefault();
        updateBoundingBox();
        grabbedSide = "bl";
    });
    brCorner.addEventListener("mousedown", (e) => {
        e.preventDefault();
        updateBoundingBox();
        grabbedSide = "br";
    });

    window.addEventListener("mouseup", (e) => {
        grabbedSide = null;
    });

    window.addEventListener("mousemove", (e) => {
        let mouseXY = {x: e.clientX, y: e.clientY};
        if(grabbedSide === null) return;

        if(grabbedSide == "left") {
            container.style.width = (w + (boundingBox.x - mouseXY.x) * 2) + "px";
        }
        if(grabbedSide == "right") {
            container.style.width = (w - (boundingBox.x + w - mouseXY.x) * 2) + "px";
        }
        if(grabbedSide == "top") {
            container.style.height = (h + (boundingBox.y - mouseXY.y) * 2) + "px";
        }
        if(grabbedSide == "bottom") {
            container.style.height = (h - (boundingBox.y + h - mouseXY.y) * 2) + "px";
        }

        if(grabbedSide == "tl") {
            container.style.height = (h + (boundingBox.y - mouseXY.y) * 2) + "px";
            container.style.width = (w + (boundingBox.x - mouseXY.x) * 2) + "px";
        }
        if(grabbedSide == "tr") {
            container.style.height = (h + (boundingBox.y - mouseXY.y) * 2) + "px";
            container.style.width = (w - (boundingBox.x + w - mouseXY.x) * 2) + "px";
        }
        if(grabbedSide == "bl") {
            container.style.height = (h - (boundingBox.y + h - mouseXY.y) * 2) + "px";
            container.style.width = (w + (boundingBox.x - mouseXY.x) * 2) + "px";
        }
        if(grabbedSide == "br") {
            container.style.height = (h - (boundingBox.y + h - mouseXY.y) * 2) + "px";
            container.style.width = (w - (boundingBox.x + w - mouseXY.x) * 2) + "px";
        }
        callbackOnResize(e);
    });

    container.appendChild(leftZone);
    container.appendChild(rightZone);
    container.appendChild(topZone);
    container.appendChild(bottomZone);
    container.appendChild(tlCorner);
    container.appendChild(trCorner);
    container.appendChild(blCorner);
    container.appendChild(brCorner);
}
