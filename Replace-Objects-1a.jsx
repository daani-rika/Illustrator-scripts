 /*   Program version: Adobe Illustrator CC+  */
var scriptName = 'ReplaceItems-2',
settingFile = {
name: scriptName + '__setting.json',
folder: Folder.myDocuments + '/Scripts/'
};

// DIALOG
var dialog = new Window("dialog");
dialog.text = "Replace objects";
dialog.orientation = "column";
dialog.alignChildren = ["center", "top"];
dialog.spacing = 10;

// MAINGROUP
var MainGroup = dialog.add("group");
MainGroup.orientation = "row";
MainGroup.alignChildren = ["left", "fill"];
MainGroup.spacing = 10;
MainGroup.margins = 0;

// FIRSTCOLUMN
var FirstColumn = MainGroup.add("panel");
FirstColumn.text = "Replace with object:";
FirstColumn.preferredSize.width = 175;
FirstColumn.orientation = "column";
FirstColumn.alignChildren = ["left", "top"];
FirstColumn.spacing = 9;
FirstColumn.margins = [10, 17, 0, 10];


var saveOriginalCheckbox = FirstColumn.add("checkbox");
saveOriginalCheckbox.text = "Save original";
//saveOriginalCheckbox.value = true;

var copyColorsCheckbox = FirstColumn.add("checkbox");
copyColorsCheckbox.text = "Copy fill color (for simple objects)";

var ignoreStroke = FirstColumn.add("checkbox");
ignoreStroke.text = "Ignore stroke";
//ignoreStroke.value = true;

var TopObj= FirstColumn.add("checkbox");
TopObj.text = "Replace with the top object";


// SECONDCOLUMN
var SecondColumn = MainGroup.add("panel");
SecondColumn.text = "Size";
SecondColumn.orientation = "column";
SecondColumn.alignChildren = ["left", "top"];
SecondColumn.spacing = 8;
SecondColumn.margins = [10, 15, 10, 10];

var NochangeCheckbox = SecondColumn.add("radiobutton");
NochangeCheckbox.text = "No changes";
//NochangeCheckbox.value = true;

var fitInWidthCheckbox = SecondColumn.add("radiobutton");
fitInWidthCheckbox.text = "Fit width";
//fitInWidthCheckbox.value = false;

var fitInHeightCheckbox = SecondColumn.add("radiobutton");
fitInHeightCheckbox.text = "Fit height";
//fitInHeightCheckbox.value = false;

var copyWHCheckbox = SecondColumn.add("radiobutton");
copyWHCheckbox.text = "Copy";

// THIRDCOLUMN
var ThirdColumn = MainGroup.add("panel");
ThirdColumn.text = "Alignment";
ThirdColumn.preferredSize.width = 100;
ThirdColumn.orientation = "row";
ThirdColumn.alignChildren = ["left", "top"];
ThirdColumn.spacing = 22;
ThirdColumn.margins = [10, 17, 0, 11];
ThirdColumn.alignment = ["left", "fill"];

// GROUP1
var group1 = ThirdColumn.add("group");
group1.orientation = "column";
group1.alignChildren = ["left", "center"];
group1.spacing = 19;
group1.margins = 0;

var AlignTopLeft = group1.add("radiobutton");
var AlignCenterLeft = group1.add("radiobutton");
var AlignBottomLeft = group1.add("radiobutton");

// GROUP2
var group2 = ThirdColumn.add("group");
group2.orientation = "column";
group2.alignChildren = ["left", "center"];
group2.spacing = 19;
group2.margins = 0;

var AlignTopCenter = group2.add("radiobutton");
var AlignCenterCenter = group2.add("radiobutton");
var AlignBottomCenter = group2.add("radiobutton");

// GROUP3
var group3 = ThirdColumn.add("group");
group3.orientation = "column";
group3.alignChildren = ["left", "center"];
group3.spacing = 19;
group3.margins = 0;

var AlignTopRight = group3.add("radiobutton");
var AlignCenterRight = group3.add("radiobutton");
var AlignBottomRight = group3.add("radiobutton");

AlignCenterCenter.value = true;
var myRadioButtons = [];

AlignTopLeft.onClick = toggleRadioButtons;
myRadioButtons.push(AlignTopLeft);
AlignCenterLeft.onClick = toggleRadioButtons;
myRadioButtons.push(AlignCenterLeft);
AlignBottomLeft.onClick = toggleRadioButtons;
myRadioButtons.push(AlignBottomLeft);
AlignTopCenter.onClick = toggleRadioButtons;
myRadioButtons.push(AlignTopCenter);
AlignCenterCenter.onClick = toggleRadioButtons;
myRadioButtons.push(AlignCenterCenter);
AlignBottomCenter.onClick = toggleRadioButtons;
myRadioButtons.push(AlignBottomCenter);
AlignTopRight.onClick = toggleRadioButtons;
myRadioButtons.push(AlignTopRight);
AlignCenterRight.onClick = toggleRadioButtons;
myRadioButtons.push(AlignCenterRight);
AlignBottomRight.onClick = toggleRadioButtons;
myRadioButtons.push(AlignBottomRight);

function toggleRadioButtons() {
	for (var i = 0, il = myRadioButtons.length; i < il; i ++) {
		if (myRadioButtons[i] !== this) {
			myRadioButtons[i].value = false;
		}
	}
	this.value = true;
}

// FINALBUTTONS
var divider2 = dialog.add("panel");
divider2.alignment = "fill";

var FinalButtons = dialog.add("group");
FinalButtons.orientation = "row";
FinalButtons.alignChildren = ["left", "center"];
FinalButtons.spacing = 10;
FinalButtons.margins = 0;

var cancel = FinalButtons.add("button", undefined, undefined, {name: "Cancel"});
cancel.text = "Cancel";
cancel.justify = "center";
cancel.onClick = function() {
	dialog.close();
}

var ok = FinalButtons.add("button", undefined, undefined, {name: "Ok"});
ok.text = "Ok";
ok.justify = "center";
ok.onClick = startAction;
ok.active = true;

var progressBar = dialog.add('progressbar', [0, 0, 110, 5]),
    progressBarCounter = 100;
progressBar.value = 0;
progressBar.minvalue = 0;
progressBar.maxvalue = progressBarCounter;


///////
//FUNCTIONS//
function setFillColor(items, color) {
    if (color) {
        var i = items.length;
        if (i)
            while (i--) {
                if (items[i].typename === 'GroupItem') {
                    setFillColor(items[i].pageItems, color);
                }
                else if (items[i].typename === 'CompoundPathItem') {
                    if (items[i].pathItems.length) items[i].pathItems[0].fillColor = color;
                }
                else if (items[i].typename === 'PathItem') {
                    items[i].fillColor = color;
                }
            }
    }
}

function getFillColor(items) {
    var i = items.length,
        gc;
    if (i)
        while (i--) {
            if (items[i].typename === 'GroupItem' && (gc = getFillColor(items[i].pageItems))) return gc;
            else if (items[i].typename === 'CompoundPathItem' && items[i].pathItems.length) return items[i].pathItems[0].fillColor;
            else if (items[i].typename === 'PathItem') return items[i].fillColor;
        }
}


/////////////////////////

function startAction() {
    if (selection.length) {
        items = selection,
            i = items.length;
        progressBarCounter = progressBar.maxvalue / i;
        var nodes = selection[0];
    
        if (TopObj.value == false) {
            selection = null;
            app.paste();
            nodes = selection[0];
            selection = null;
        }


        ////
        while (i--) {
            var err = null;
            var item = items[i];
            var node = nodes.duplicate(item, ElementPlacement.PLACEBEFORE);

            if (item.typename == "GroupItem" && item.clipped == true) {
                item = item.pathItems[0];
            } 

            if (ignoreStroke.value == true & (item.clipping == false || item.clipped == false)) {
                var it_top = item.geometricBounds[1];
                var it_left = item.geometricBounds[0];
                var it_width = item.geometricBounds[2] - item.geometricBounds[0];
                var it_height = item.geometricBounds[1] - item.geometricBounds[3];
            } else {
                var it_top = item.visibleBounds[1];
                var it_left = item.visibleBounds[0];
                var it_width = item.visibleBounds[2] - item.visibleBounds[0];
                var it_height = item.visibleBounds[1] - item.visibleBounds[3];
            }


            //////////////////////////
            ///change size///


            //if node is clipping mask
            if (node.typename == "GroupItem" && node.clipped == true) {

                if (fitInHeightCheckbox.value) {
                    if (it_height != 0) {
                        node.width = it_height * node.pathItems[0].width / node.pathItems[0].height;
                        node.height = it_height;
                        node.width = node.width * (node.width / node.pathItems[0].width);
                        node.height = node.height * (node.height / node.pathItems[0].height);
                    } else {
                        err = "There is an object with zero height";
                    }
                }

                if (fitInWidthCheckbox.value) {
                    if (it_width != 0) {
                        node.height = node.pathItems[0].height * it_width / node.pathItems[0].width;
                        node.width = it_width;
                        node.height = node.height * (node.height / node.pathItems[0].height);
                        node.width = node.width * (node.width / node.pathItems[0].width);
                    } else {
                        err = "There is an object with zero width";
                    }
                }

                if (copyWHCheckbox.value) {
                    if (it_width != 0 & it_height != 0) {
                        node.width = it_width;
                        node.height = it_height;
                        node.height = node.height * (node.height / node.pathItems[0].height);
                        node.width = node.width * (node.width / node.pathItems[0].width);
                    } else {
                        err = "There is an object with zero width or height";
                    }
                }

            //if node is vertical line      
            } else if (node.width == 0) {

                if (fitInHeightCheckbox.value) {
                    if (it_height != 0) {
                        node.height = it_height;
                    } else {
                        err = "There is an object with zero height";
                    }
                }

                if (fitInWidthCheckbox.value) {
                    err = "Script does not change the stroke width.";
                }

                if (copyWHCheckbox.value) {
                    if (it_height != 0) {
                        node.height = it_height;
                    } else {
                        err = "There is an object with zero width or height";
                    }
                }

            //if node is horisontal line      
            } else if (node.height == 0) {
                if (fitInHeightCheckbox.value) {
                    err = "Script does not change the stroke width.";
                }

                if (fitInWidthCheckbox.value) {
                    if (it_width != 0) {
                        node.width = it_width;
                    } else {
                        err = "There is an object with zero height";
                    }
                }

                if (copyWHCheckbox.value) {
                    if (it_width != 0) {
                        node.width = it_width;
                    } else {
                        err = "There is an object with zero width or height";
                    }
                }

            /////
            } else {

                if (fitInHeightCheckbox.value) {
                    if (it_height != 0) {
                        node.width = (it_height) * node.width / node.height;
                        node.height = it_height;
                    } else {
                        err = "There is an object with zero height";
                    }
                }

                if (fitInWidthCheckbox.value) {
                    if (it_width != 0) {
                        node.height = node.height * it_width / node.width
                        node.width = it_width;
                    } else {
                        err = "There is an object with zero width";
                    }
                }

                if (copyWHCheckbox.value) {
                    if (it_width != 0 | it_height != 0) {
                        node.width = it_width;
                        node.height = it_height;
                    } else {
                        err = "There is an object with zero width or height";
                    }
                }
            } // end changing size

            /// calculate node parametres
            if (ignoreStroke.value == true & (node.clipping == false || node.clipped == false)) {
                var nd_str = node.visibleBounds[1] - node.geometricBounds[1];
                var nd_width = node.geometricBounds[2] - node.geometricBounds[0];
                var nd_height = node.geometricBounds[1] - node.geometricBounds[3];
            } else {
                var nd_str = 0;
                var nd_width = node.visibleBounds[2] - node.visibleBounds[0];
                var nd_height = node.visibleBounds[1] - node.visibleBounds[3];
            }


            //////////////////////////
            ///change position///

            //if node is clipping mask
            if (node.typename == "GroupItem" && node.clipped == true) {

                ///TOP
                if (AlignTopLeft.value | AlignTopRight.value | AlignTopCenter.value) {
                    node.top = node.top - (node.pathItems[0].top - it_top) + nd_str;
                }
                if (AlignCenterLeft.value | AlignCenterRight.value | AlignCenterCenter.value) {
                    node.top = node.top - ((node.pathItems[0].top - node.pathItems[0].height / 2) - (it_top - it_height / 2)) + nd_str;
                }
                if (AlignBottomLeft.value | AlignBottomRight.value | AlignBottomCenter.value) {
                    node.top = node.top - ((node.pathItems[0].top - node.pathItems[0].height) - (it_top - it_height)) + nd_str;
                }

                ///LEFT
                if (AlignTopLeft.value | AlignCenterLeft.value | AlignBottomLeft.value) {
                    node.left = node.left - (node.pathItems[0].left - it_left) - nd_str;
                }
                if (AlignTopCenter.value | AlignCenterCenter.value | AlignBottomCenter.value) {
                    node.left = node.left + ((it_left + it_width / 2) - (node.pathItems[0].left + node.pathItems[0].width / 2)) - nd_str;
                }
                if (AlignTopRight.value | AlignCenterRight.value | AlignBottomRight.value) {
                    node.left = node.left + ((it_left + it_width) - (node.pathItems[0].left + node.pathItems[0].width)) - nd_str;
                }

            ///   
            } else {

                ///TOP
                if (AlignTopLeft.value | AlignTopRight.value | AlignTopCenter.value) {
                    node.top = it_top + nd_str;
                }
                if (AlignCenterLeft.value | AlignCenterRight.value | AlignCenterCenter.value) {
                    node.top = it_top + (nd_height - it_height) / 2 + nd_str;
                }
                if (AlignBottomLeft.value | AlignBottomRight.value | AlignBottomCenter.value) {
                    node.top = it_top + nd_height - it_height + nd_str;
                }

                ///LEFT
                if (AlignTopLeft.value | AlignCenterLeft.value | AlignBottomLeft.value) {
                    node.left = it_left - nd_str;
                }
                if (AlignTopCenter.value | AlignCenterCenter.value | AlignBottomCenter.value) {
                    node.left = it_left - (nd_width - it_width) / 2 - nd_str;
                }
                if (AlignTopRight.value | AlignCenterRight.value | AlignBottomRight.value) {
                    node.left = it_left - (nd_width - it_width) - nd_str;
                }
            }



            /////////////////////////////

            if (copyColorsCheckbox.value) {
                try {
                    setFillColor([node], getFillColor([item]));
                } catch (e) {
                    alert(e + '\n' + e.line)
                }
            }


            if (err != null) {
                node.remove();
            }


            if (!saveOriginalCheckbox.value) {
                if (item.clipping == true) {
                    item = item.parent;
                }
                item.remove();
            }

            progressBar.value += progressBarCounter;
            dialog.update();

        } //end while



        if (saveOriginalCheckbox.value == true & TopObj.value == true) {
            node.remove();
        }

        if (TopObj.value == false) {
            nodes.remove();
        }

    }

    dialog.close();

    if (err!=null) alert (err);

} // end StartAction



///////////////////////
function saveSettings() {
    var $file = new File(settingFile.folder + settingFile.name),
        data = [
            
            saveOriginalCheckbox.value,
            copyColorsCheckbox.value,
            ignoreStroke.value,
            NochangeCheckbox.value,
            fitInWidthCheckbox.value,
            fitInHeightCheckbox.value,
            copyWHCheckbox.value,
            TopObj.value

        ].toString();

    $file.open('w');
    $file.write(data);
    $file.close();
}

function loadSettings() {
    var $file = File(settingFile.folder + settingFile.name);
    if ($file.exists) {
        try {
            $file.open('r');
            var data = $file.read().split('\n'),
                $main = data[0].split(',');

             
            saveOriginalCheckbox.value = ($main[0] === 'true');
            copyColorsCheckbox.value = ($main[1] === 'true');
            ignoreStroke.value = ($main[2] === 'true');
            NochangeCheckbox.value = ($main[3] === 'true');
            fitInWidthCheckbox.value = ($main[4] === 'true');
            fitInHeightCheckbox.value = ($main[5] === 'true');
            copyWHCheckbox.value = ($main[6] === 'true');
            TopObj.value= ($main[7] === 'true');

        }
        catch (e) {}
        $file.close();
    }
}


dialog.onClose = function() {
    saveSettings();
    return true;
}

function checkSettingFolder() {
    var $folder = new Folder(settingFile.folder);
    if (!$folder.exists) $folder.create();
}

checkSettingFolder();
loadSettings();
dialog.center();
dialog.show();


