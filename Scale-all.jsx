#target illustrator;

/*
Version: 1.07
Made by daani-rika: https://github.com/daani-rika/Illustrator-scripts
*/





// DIALOG
// ======
var Dialog = new Window("dialog"); 
    Dialog.text = "Change size"; 
    Dialog.preferredSize.width = 250; 
    Dialog.orientation = "column"; 
    Dialog.alignChildren = ["center","top"]; 
    Dialog.spacing = 10; 
    Dialog.margins = 16; 

// MAINGROUP
// =========
var MainGroup = Dialog.add("group", undefined, {name: "MainGroup"}); 
    MainGroup.preferredSize.height = 29; 
    MainGroup.orientation = "row"; 
    MainGroup.alignChildren = ["center","center"]; 
    MainGroup.spacing = 4; 
    MainGroup.margins = 0; 

    var iconbutton1_imgString = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%06%00%00%00%10%08%06%00%00%01BD%3EX%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%C3%92%C3%9D~%C3%BC%00%00%00%C2%A9IDAT%18%C2%95MP%01%11%C3%82%40%0CK8%04L%028%40%02s%C2%80%C2%84%C2%A1%00%0B8%C2%99%04%24l%0E%C2%98%03%24%C3%B0%0E%C3%82%C2%A5%C3%97%3E%C3%AB%C3%9D%C3%9F7%C3%BD%7C%C3%93%14%11%C2%92%C3%94%C2%B3%2F%0B%1EP!%C3%A9%C3%9A%09%C3%8F%3F%C3%95%C3%B5%60g%C3%B2*%C2%A0d%7C%C3%9C%C3%A3%C2%9E%C2%85%C3%95%C2%95A%C3%92%C2%A9%1A%C2%BC%25%C3%8DQ(%05%C3%9F%C3%BE%C3%A3nA3h%00%16%00%C2%9B%C3%81F%C3%B2%0C%C3%A0%12%C3%A3%C2%B9c%C3%B7%C3%90%7DH%C2%9Ar%C2%BE%C2%8Ai%C3%8F*)%0F%13%C2%B8%C2%ACZ%09%24%C3%A3.%C3%B9%15%C2%80'%C2%B5%C2%BB%C3%9B~'%C3%B1U%C3%92%C2%92%C2%8F%C3%8E%C2%87c%11H%C2%8E%C2%BB%C3%AD%C2%8E%C3%A5%C3%A4%C2%91%C3%82%C2%B9G4%26%C3%8B~%7D%1A%C3%89%0D%00~*%C3%B2%C2%B4%C2%B1%25z*H%00%00%00%00IEND%C2%AEB%60%C2%82"; 
    var iconbutton1 = MainGroup.add("iconbutton", undefined, File.decode(iconbutton1_imgString), {name: "iconbutton1", style: "toolbutton", toggle: true}); 
    iconbutton1.preferredSize.width = 30; 
    iconbutton1.preferredSize.height = 30; 
    iconbutton1.alignment = ["left","top"]; 

var px = MainGroup.add("radiobutton", undefined, undefined, {name: "radiobutton1"}); 
    px.text = "px"; 
   // px.value = true; 
    px.preferredSize.height = 22; 
    px.alignment = ["center","bottom"]; 

var mm = MainGroup.add("radiobutton", undefined, undefined, {name: "radiobutton2"}); 
    mm.text = "mm"; 
    mm.preferredSize.height = 22; 
    mm.alignment = ["center","bottom"]; 



var Center = MainGroup.add("checkbox", undefined, undefined, {name: "Center"}); 
    Center.text = "From center"; 
    Center.preferredSize.height = 21; 
    Center.alignment = ["center","bottom"]; 
    Center.value = true; 

// DIALOG
// ======
var divider1 = Dialog.add("panel", undefined, undefined, {name: "divider1"}); 
    divider1.alignment = "fill"; 

// CONFIRM_PANEL
// =============
var Confirm_panel = Dialog.add("group", undefined, {name: "Confirm_panel"}); 
    Confirm_panel.orientation = "row"; 
    Confirm_panel.alignChildren = ["right","top"]; 
    Confirm_panel.spacing = 9; 
    Confirm_panel.margins = 0; 

var Width_value = Confirm_panel.add('edittext {justify: "center", properties: {name: "Width_value"}}'); 


    Width_value.preferredSize.width = 105; 
    Width_value.preferredSize.height = 24; 

var Width_ok = Confirm_panel.add("button", undefined, undefined, {name: "Width_ok"}); 
    Width_ok.text = "Only width"; 
    Width_ok.preferredSize.width = 99; 
    Width_ok.onClick = Change_width;

// EDITTEXT_PANEL
// ==============
var EditText_panel = Dialog.add("group", undefined, {name: "EditText_panel"}); 
    EditText_panel.orientation = "row"; 
    EditText_panel.alignChildren = ["center","center"]; 
    EditText_panel.spacing = 10; 
    EditText_panel.margins = 0; 
    EditText_panel.alignment = ["center","top"]; 

var Height_value = EditText_panel.add('edittext {justify: "center", properties: {name: "Height_value"}}'); 
    Height_value.preferredSize.width = 105; 
    Height_value.preferredSize.height = 24; 

    if (app.activeDocument.rulerUnits == "RulerUnits.Pixels"){
        px.value = true;
        Width_value.text = (app.activeDocument.selection[0].width).toFixed(0); 
        Height_value.text=(app.activeDocument.selection[0].height).toFixed(0);
    } else {
        mm.value = true;
        Width_value.text = (app.activeDocument.selection[0].width/2.834645669).toFixed(2); 
        Height_value.text=(app.activeDocument.selection[0].height/2.834645669).toFixed(2);
    } 

var Height_ok = EditText_panel.add("button", undefined, undefined, {name: "Height_ok"}); 
    Height_ok.text = "Only height"; 
    Height_ok.preferredSize.width = 99; 
    Height_ok.alignment = ["center","center"]; 
    Height_ok.onClick =  Change_height;

// DIALOG
// ======
var divider2 = Dialog.add("panel", undefined, undefined, {name: "divider2"}); 
    divider2.alignment = "fill"; 

// GROUP1
// ======
var group1 = Dialog.add("group", undefined, {name: "group1"}); 
    group1.orientation = "row"; 
    group1.alignChildren = ["left","center"]; 
    group1.spacing =22; 
    group1.margins = 0; 
    group1.alignment = ["center","top"]; 


var Cancel = group1.add("button", undefined, undefined, {name: "Cancel"}); 
    Cancel.text = "Cancel"; 
    Cancel.preferredSize.width = 95; 
    Cancel.preferredSize.height = 30; 
    Cancel.alignment = ["left","center"]; 
    /*

    var iconbutton1_imgString = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%06%00%00%00%10%08%06%00%00%01BD%3EX%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%C3%92%C3%9D~%C3%BC%00%00%00%C2%A9IDAT%18%C2%95MP%01%11%C3%82%40%0CK8%04L%028%40%02s%C2%80%C2%84%C2%A1%00%0B8%C2%99%04%24l%0E%C2%98%03%24%C3%B0%0E%C3%82%C2%A5%C3%97%3E%C3%AB%C3%9D%C3%9F7%C3%BD%7C%C3%93%14%11%C2%92%C3%94%C2%B3%2F%0B%1EP!%C3%A9%C3%9A%09%C3%8F%3F%C3%95%C3%B5%60g%C3%B2*%C2%A0d%7C%C3%9C%C3%A3%C2%9E%C2%85%C3%95%C2%95A%C3%92%C2%A9%1A%C2%BC%25%C3%8DQ(%05%C3%9F%C3%BE%C3%A3nA3h%00%16%00%C2%9B%C3%81F%C3%B2%0C%C3%A0%12%C3%A3%C2%B9c%C3%B7%C3%90%7DH%C2%9Ar%C2%BE%C2%8Ai%C3%8F*)%0F%13%C2%B8%C2%ACZ%09%24%C3%A3.%C3%B9%15%C2%80'%C2%B5%C2%BB%C3%9B~'%C3%B1U%C3%92%C2%92%C2%8F%C3%8E%C2%87c%11H%C2%8E%C2%BB%C3%AD%C2%8E%C3%A5%C3%A4%C2%91%C3%82%C2%B9G4%26%C3%8B~%7D%1A%C3%89%0D%00~*%C3%B2%C2%B4%C2%B1%25z*H%00%00%00%00IEND%C2%AEB%60%C2%82"; 
    var iconbutton1 = group1.add("iconbutton", undefined, File.decode(iconbutton1_imgString), {name: "iconbutton1", style: "button", toggle: true}); 
    iconbutton1.preferredSize.width = 30; 
    iconbutton1.preferredSize.height = 30; 
    iconbutton1.alignment = ["left","top"]; 

    */
var Change_all = group1.add("button", undefined, undefined, {name: "Change_all"}); 
    Change_all.text = "Make equal"; 
    Change_all.preferredSize.width = 99; 
    Change_all.preferredSize.height = 31; 
    Change_all.alignment = ["left","center"]; 
    Change_all.onClick =  Change_all_start;

Dialog.show();


//////////////////////////////////////////////////////////////

function Change_width() {
    var Height_v = (Height_value.text.replace(new RegExp(",", 'g'), "."))*1;
    var Width_v = (Width_value.text.replace(new RegExp(",", 'g'), "."))*1;

    if (mm.value == true) {
        Height_v = Height_v * 2.834645669;
        Width_v = Width_v * 2.834645669;
    }

    for (var x = 0; x < activeDocument.selection.length; x++) {
        item = activeDocument.selection[x];
		center_point = [item.top-(item.height/2),item.left+(item.width/2)];

        
        if (iconbutton1.value == true){
        item.height = item.height * Width_v/item.width;        
        }

        item.width = Width_v;
        		
		if (Center.value == true){	
		item.top = center_point[0] + (item.height/2);
		item.left = center_point[1] - (item.width/2);
		}
	 }
    Dialog.close();
}

//////////////////////////////////////////////////////////////
function Change_height(Height_v) {
    var Height_v = (Height_value.text.replace(new RegExp(",", 'g'), "."))*1;
    var Width_v = (Width_value.text.replace(new RegExp(",", 'g'), "."))*1;

    if (mm.value == true) {
        Height_v = Height_v * 2.834645669;
        Width_v = Width_v * 2.834645669;
    }
	
    for (var x = 0; x < activeDocument.selection.length; x++) {
        item = activeDocument.selection[x];
		center_point = [item.top-(item.height/2),item.left+(item.width/2)];


        if (iconbutton1.value == true){
            item.width = item.width * Height_v/item.height;        
            }

        item.height = Height_v;
		
		if (Center.value == true){	
		item.top = center_point[0] + (item.height/2);
		item.left = center_point[1] - (item.width/2);
		}
	 }
    Dialog.close();
}

//////////////////////////////////////////////////////////////
function Change_all_start() {
    var Height_v = (Height_value.text.replace(new RegExp(",", 'g'), "."))*1;
    var Width_v = (Width_value.text.replace(new RegExp(",", 'g'), "."))*1;

    if (mm.value == true) {
        Height_v = Height_v * 2.834645669;
        Width_v = Width_v * 2.834645669;
    }
	
    for (var x = 0; x < activeDocument.selection.length; x++) {
        item = activeDocument.selection[x];
		center_point = [item.top-(item.height/2),item.left+(item.width/2)];

        item.width = Width_v;
        item.height = Height_v;
		
		if (Center.value == true){	
		item.top = center_point[0] + (item.height/2);
		item.left = center_point[1] - (item.width/2);
		}
	 }
    Dialog.close();
}