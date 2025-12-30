
const COLOUR = {
      BillboardMenus: "white",
      MediumGrey: "#cecece",
      MidGrey: "#888",
      DarkGrey: "rgb(51,51,51)",
      Blue: "blue",
      LightBlue: "#00a1ff",
      MidBlue: "rgb(170 186 255)",
      DarkBlue: "#000088",
      Black: "black",
      White: "white",
      Red: "red",
      Yellow: "yellow",
      Orange: "#ff4000",
      BrightGreen: "rgb(21, 193, 34)",
      Purple: "rgb(149, 0, 200)",
      Lime: "rgb(135 255 0)",
      Green: "#008140"
};

const STYLE = {
      Button: "display: block; float: left; width: 45%; background-color: " + COLOUR.Blue + "; color:white;min-height: 35px; margin: 10px; border:4px solid " + COLOUR.Blue + ";cursor: pointer;box-shadow: rgba(0, 0, 0, 0.3) 3px 4px 10px 0px;",
      InputField: "float:left;width:250px;min-height:40px;border:1px solid rgb(177, 177, 177);box-shadow: rgb(199 199 199) 4px 6px 20px 0px;position: relative;margin:5px;background-color:white;",
      InputInfield: "float:left;width:250px;min-height:40px;border:1px solid rgb(177, 177, 177);box-shadow: rgb(199 199 199) 4px 6px 20px 0px;position: relative;margin:5px;background-color:white;",
      DropDownField: "float:left;width:200px;height:15px;margin: 4px;padding:4px;border:1px solid rgb(177, 177, 177);;box-shadow: rgb(199 199 199) 4px 6px 20px 0px;box-sizing:content-box;",
      DropDownInfield: "float:left;width:250px;min-height:40px;border:1px solid rgb(177, 177, 177);;box-shadow: rgb(199 199 199) 4px 6px 20px 0px;position: relative;margin:5px;background-color:white;",
      Label: "color:black;float:left;width:200px;height:25px;margin: 0px;padding:4px;box-sizing:border-box;",
      Checkbox: "color:black;float:left;width:200px;height:15px;margin: 10px;padding:10px;border:1px solid rgb(177, 177, 177);box-sizing:content-box;",
      CheckboxInfield: "float: left; min-height: 42px; border: 1px solid rgb(177, 177, 177); box-shadow: rgb(199 199 199) 4px 6px 20px 0px;position: relative; margin: 5px; background-color: white; width: 97%;padding-top: 4px;box-sizing:border-box;",
      Depictions: "float:left;width:15px;height:30px;margin: 5px;padding:4px;border:1px solid #888;box-sizing:content-box;background-color:white;",
      BillboardMenus: "display:block;float:left;box-sizing:border-box;background-color:" + COLOUR.BillboardMenus + ";min-height:30px; margin: 10px 20px 30px;width: calc(100% - 40px);box-shadow: rgb(0 0 0 / 80%) 3px 4px 10px 0px;padding:10px;accent-color:" + COLOUR.Blue + ";",
      DropShadow: "box-shadow: rgba(0, 0, 0, 0.8) 3px 4px 10px 0px;",
      FloatingTag: "width:20px;height:15px;background-color:red;border-radius:10px;font-size:10px;font-weight:bold;position:absolute;top:-15px;left:calc(100% - 10px);color:white;padding-top:4px;",
      HeaderFont: "font-family: 'Century Gothic', CenturyGothic, AppleGothic, sans-serif;font-weight:bold;font-size:14px;",
      HeadingStyle1: "height:30px;z-index:99;position: relative;margin:0px;background-color:" + COLOUR.DarkBlue + ";width:100%;box-sizing: border-box;padding:0px;font-size:10px;color:white;text-align:center;line-height:30px;box-shadow: rgb(61 61 61) 0px 6px 14px 2px;margin:20px 0px;border:1px solid " + COLOUR.DarkBlue + ";",
      Table: "float:left;width:100%;border-collapse: collapse;table-layout: auto;color:white;",
      TableHeader: "font-weight: bold; font-family: 'Century Gothic', CenturyGothic, AppleGothic, sans-serif;background-color:" + COLOUR.Blue + ";colour:white;table-layout: auto;",
      TableData: "box-sizing: border-box;outline: 1px solid #000;outline-offset:-1px;text-align:left;padding: 5px;color:black;background-color:white;table-layout: fixed;",
      Div: "float:left;box-sizing:border-box;border:1px solid #000;border-collapse: collapse;background-color:" + COLOUR.MidBlue + ";",
      Div2: "display: block; float: left; width: 88%; background-color: white; min-height: 10px; margin: 10px 20px 30px; box-shadow: rgba(0, 0, 0, 0.8) 3px 4px 10px 0px; padding: 10px; accent-color: blue;overflow-y:auto;max-height:800px;",
      Div3: "display: block; box-sizing:border-box;float: left; background-color: white; min-height: 10px; margin: 10px 20px 30px;width: calc(100% - 40px); box-shadow: rgba(0, 0, 0, 0.8) 3px 4px 10px 0px; padding: 0px; accent-color: blue;overflow-y:none;max-height:1800px;",
      Div5: "display: flex;flex-grow: 1; width:100%;box-sizing:border-box;float: left; background-color: white; min-height: 100px; margin: 0px;width: calc(100%); box-shadow: rgba(0, 0, 0, 0.8) 3px 4px 10px 0px; padding: 0px; accent-color: blue;overflow-y:none;max-height:1800px;border:1px solid black;"
};

document.body.cssText += "flex-grow:1;";
//background: linear-gradient(145deg, #e6e6e6, #ffffff);
//box - shadow: 7px 7px 18px #949494,
//      -7px - 7px 18px #ffffff;
