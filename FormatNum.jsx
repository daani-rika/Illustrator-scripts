#target illustrator

/*
Version: 1.07
Made by daani-rika: https://github.com/daani-rika/Illustrator-scripts 
Based on: 
//https://graphicdesign.stackexchange.com/questions/50503/how-to-do-a-wildcard-grep-regex-find-replace-in-illustrator/50504#50504
//https://stackoverflow.com/a/19529302
//https://stackoverflow.com/a/55848405
*/



// ROUNDNUM
// ========
var RoundNum = new Window("dialog"); 
    RoundNum.text = "Round Numbers"; 
    RoundNum.orientation = "column"; 
    RoundNum.alignChildren = ["left","top"]; 
    RoundNum.spacing = 10; 
    RoundNum.margins = 16; 

// ROUNDINGGROUP
// =============
var RoundingGroup = RoundNum.add("group", undefined, {name: "RoundingGroup"}); 
    RoundingGroup.orientation = "row"; 
    RoundingGroup.alignChildren = ["left","bottom"]; 
    RoundingGroup.spacing = 10; 
    RoundingGroup.margins = 0; 

var Round_Check = RoundingGroup.add("checkbox", undefined, undefined, {name: "Round_Check"}); 
    Round_Check.text = "Round places"; 
    Round_Check.value = true;


var RoundPlace = RoundingGroup.add('edittext {justify: "center", properties: {name: "RoundPlace"}}'); 
    RoundPlace.text = "1"; 
    RoundPlace.preferredSize.width = 40; 
    RoundPlace.preferredSize.height = 24; 
    RoundPlace.alignment = ["left","center"]; 

// AFFECT_GROUP
// ============
var Affect_Group = RoundNum.add("group", undefined, {name: "Affect_Group"}); 
Affect_Group.orientation = "row"; 
Affect_Group.alignChildren = ["left","top"]; 
Affect_Group.spacing = 10; 
Affect_Group.margins = 0; 

var Affect_Check = Affect_Group.add("checkbox", undefined, undefined, {name: "Affect_Check"}); 
Affect_Check.text = "Round small numbers";

// OPERATEGROUP
// ============
var OperateGroup = RoundNum.add("group", undefined, {name: "OperateGroup"}); 
    OperateGroup.orientation = "row"; 
    OperateGroup.alignChildren = ["left","bottom"]; 
    OperateGroup.spacing = 10; 
    OperateGroup.margins = 0; 


// GROUP1
// ======
var group1 = OperateGroup.add("group", undefined, {name: "group1"}); 
    group1.orientation = "row"; 
    group1.alignChildren = ["left","bottom"]; 
    group1.spacing = 0; 
    group1.margins = 0; 

var Operate_Check = group1.add("checkbox", undefined, undefined, {name: "Operate_Check"}); 
    Operate_Check.alignment = ["left","bottom"]; 

var Operation_array = ["×","/","+","–"]; 
var Operation = group1.add("dropdownlist", undefined, undefined, {name: "Operation", items: Operation_array}); 
    Operation.selection = 1; 

// OPERATEGROUP
// ============
var Operator = OperateGroup.add('edittext {justify: "center", properties: {name: "Operator"}}'); 
    Operator.text = "1000"; 
    Operator.preferredSize.width = 80; 

// REGEXGROUP
// ==========
var RegExGroup = RoundNum.add("group", undefined, {name: "RegExGroup"}); 
    RegExGroup.orientation = "row"; 
    RegExGroup.alignChildren = ["left","bottom"]; 
    RegExGroup.spacing = 4; 
    RegExGroup.margins = 0; 

// GROUP2
// ======
var group2 = RegExGroup.add("group", undefined, {name: "group2"}); 
    group2.orientation = "row"; 
    group2.alignChildren = ["left","bottom"]; 
    group2.spacing = 0; 
    group2.margins = 0; 

var Regex_Check = group2.add("checkbox", undefined, undefined, {name: "Regex_Check"}); 

var statictext1 = group2.add("statictext", undefined, undefined, {name: "statictext1"}); 
    statictext1.text = " RegEx"; 
    statictext1.preferredSize.width = 47; 
    statictext1.alignment = ["left","top"]; 

// REGEXGROUP
// ==========
var RegEx = RegExGroup.add('edittext {justify: "center", properties: {name: "RegEx"}}'); 
    RegEx.text = "\\d+(?:[,.]\\d+)?(?: \\d+(?:[,.]\\d+)?)*"; 
    RegEx.preferredSize.width = 80; 
    RegEx.alignment = ["left","bottom"]; 

// ROUNDNUM
// ========
var divider1 = RoundNum.add("panel", undefined, undefined, {name: "divider1"}); 
    divider1.alignment = "fill"; 

// FINALBUTTONS
// ============
var FinalButtons = RoundNum.add("group", undefined, {name: "FinalButtons"}); 
    FinalButtons.orientation = "row"; 
    FinalButtons.alignChildren = ["center","center"]; 
    FinalButtons.spacing = 10; 
    FinalButtons.margins = 0; 

var OkButton = FinalButtons.add("button", undefined, undefined, {name: "OkButton"}); 
    OkButton.text = "OK"; 
    OkButton.preferredSize.width = 60; 
    OkButton.onClick = findnum;

var CancelButton = FinalButtons.add("button", undefined, undefined, {name: "CancelButton"}); 
    CancelButton.text = "Cancel"; 
    CancelButton.preferredSize.width = 74; 
    CancelButton.onClick = function() {
        RoundNum.close();
    }

RoundNum.show();


function commafy(inVal) {
    var arrWhole = inVal.toString();
    arrWhole = arrWhole.split(".");
    var arrTheNumber = arrWhole[0].split("").reverse();
    var newNum = Array();
    for (var i = 0; i < arrTheNumber.length; i++) {
      newNum[newNum.length] = ((i % 3 === 2)) ? " " + arrTheNumber[i] : arrTheNumber[i]; //format all figures
      // newNum[newNum.length] = ((i%3===2) && (i<arrTheNumber.length-1)) ? "," + arrTheNumber[i]: arrTheNumber[i]; //do not format 4 number figures
    }
    var returnNum = newNum.reverse().join("");
    if (arrWhole[1]) {
      returnNum += "." + arrWhole[1];
    }
    return returnNum;
  }
  
  function findnum() {  
    var scope = app.activeDocument.selection;  
    var find = '\\d+(?:[,.]\\d+)?(?: \\d+(?:[,.]\\d+)?)*'
    //Чтобы убрать пробелы с помощью ai_re: (\d{1,10})(\s)(\d{1,10}(,|.)\d{1,10}) заменить на $1$3
  
    if (Regex_Check.value) {
      find = RegEx.text;
    }
  
    var changes = 0;
    var gr = 0;
  
    for (var i = 0; i < scope.length; i++) {
  
      if (scope.length == 1 && scope[0].typename == "GroupItem") {  
        scope = scope[0].textFrames;

      } else if (scope[i].typename == "GroupItem") {
        gr++;
      }
  
      var text = scope[i];  
      string = text.contents;
  
      if (typeof string == "string") {
        var finded = string.match(find, 'g');
  
        if (finded) {
          for (var a = 0; a < finded.length; a++) {
  
            var current = finded[a];
  
            current = current.replace(new RegExp(",", 'g'), ".");
            current = current.replace(new RegExp(" ", 'g'), "");
  
            if (Operate_Check.value) {
              var Value = Operator.text;
  
              if (Operation.selection == 0) {
                current = Value * current;
              } else if (Operation.selection == 1) {
                current = current / Value;
              } else if (Operation.selection == 2) {
                current = parseFloat(Value) + parseFloat(current);
              } else if (Operation.selection == 3) {
                current = current - Value;
              }
            }
  
            current = parseFloat(current);
  
            if (Round_Check.value) {
  
              if (Affect_Check.value) {
                current = current.toFixed(RoundPlace.text);
              } else {
                if (current > 1) {
                  current = current.toFixed(RoundPlace.text);
                } else if (current < 1) {
                  current = current;
                }
              }
  
            }
  
            current = commafy(current);
            current = current.replace(new RegExp("^\\s", 'g'), "");
            current = current.toString().replace(".", ",");
  
            if (current != finded[a]) {
              var newstring2 = string.replace(finded[a], current);
              text.contents = newstring2;
              changes++;
            }
  
          }
  
        }
  
      }
    }
  
    if (gr != 0) {
      alert("You have " + gr + " groups here!");
    }
    alert(changes == 1 ? "1 text object changed" : changes + " text objects changed");
  
    RoundNum.close();
  
  }