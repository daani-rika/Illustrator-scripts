//based on ScaleToFitVerticalAxis.jsx by Janne Ojala 
//make selected objects same width or height 

#target illustrator

// SAMESCALE
// =========
var SameScale = new Window("dialog");
SameScale.text = "SameScale";
SameScale.preferredSize.width = 150;
SameScale.orientation = "column";
SameScale.alignChildren = ["center", "center"];
SameScale.spacing = 7;
SameScale.margins = 16;

// MAINGROUP
// =========
var MainGroup = SameScale.add("group");
MainGroup.orientation = "column";
MainGroup.alignChildren = ["left", "center"];
MainGroup.spacing = 10;
MainGroup.margins = [0, 0, 0, 2];

var SameWidth = MainGroup.add("radiobutton");
SameWidth.text = "Same width";

var SameHeight = MainGroup.add("radiobutton");
SameHeight.text = "Same height ";
SameHeight.value = true;
SameHeight.preferredSize.width = 100;

// TEXT
// ====
var Text = SameScale.add("group");
Text.orientation = "row";
Text.alignChildren = ["left", "center"];
Text.spacing = 0;
Text.margins = [0, 6, 0, 8];

var ValueText = Text.add("edittext", undefined, Math.round(app.activeDocument.selection[0].height));
ValueText.preferredSize.width = 40;

var Units_array = ["px", "mm"];
var Units = Text.add("dropdownlist", undefined, Units_array);
Units.selection = 0;

// FINALGROUP
// ==========
var FinalGroup = SameScale.add("group");
FinalGroup.orientation = "row";
FinalGroup.alignChildren = ["left", "center"];
FinalGroup.spacing = 10;
FinalGroup.margins = 0;

var Ok = FinalGroup.add("button", undefined, undefined, {
    name: "Ok"
});
Ok.text = "OK";
Ok.preferredSize.width = 96;
Ok.preferredSize.height = 24;
Ok.justify = "center";

var myResult = SameScale.show();

//////////////////////////////////////////////

var Value = ValueText.text;

var validValue = /^[0-9.]+$/.test(Value);
if(!validValue | Value == 0) {
    alert("Please enter a valid size. \nDon't use coma.");
    myResult = false;
}

if(myResult == true) {
    //alert(Units.value);

    if(Units.selection == 1) {
        Value = Value * 2.834645669;
    }

    if(SameHeight.value) {
        visitObjects(app.activeDocument.selection, scaleByHeight, Value);
    }

    if(SameWidth.value) {
        visitObjects(app.activeDocument.selection, scaleByWidth, Value);
    }

    function scaleByWidth(item, targetWidth) {
        var factor = targetWidth / item.width;

	if(item.width != 0) {
        if(item.height != 0) {
            item.height *= factor;
        }        
            item.width *= factor;
        }
    }

    function scaleByHeight(item, targetHeight) {

    if(item.height != 0) {
        var factor = targetHeight / item.height;
		
        item.height *= factor;		
        if(item.width != 0) {
            item.width *= factor;
        }
    }
}


    function visitObjects(sel, func, opts) {
        for(var i = 0; i < sel.length; i++) {
            func(sel[i], opts);
        }
    }

}
