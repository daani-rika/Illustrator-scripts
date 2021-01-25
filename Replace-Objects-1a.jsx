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
FirstColumn.text = "";
FirstColumn.preferredSize.width = 175;
FirstColumn.orientation = "column";
FirstColumn.alignChildren = ["left", "top"];
FirstColumn.spacing = 8;
FirstColumn.margins = [10, 5, 0, 10];


var saveOriginalCheckbox = FirstColumn.add("checkbox");
saveOriginalCheckbox.text = "Save original";
//saveOriginalCheckbox.value = true;

var copyColorsCheckbox = FirstColumn.add("checkbox");
copyColorsCheckbox.text = "Copy fill color (for simple objects)";

var ignoreStroke = FirstColumn.add("checkbox");
ignoreStroke.text = "Ignore stroke";
//ignoreStroke.value = true;
try {
if ( selection[0].typename=="GroupItem"){
    //ignoreStroke.enabled = false; 
    ignoreStroke.text = "Ignore stroke of the replaced objects";
}
}catch (e){
    alert ("Plese, select some objects");
}

var TopObj= FirstColumn.add("checkbox");
TopObj.text = "Replace with the top object";

var ResizeStroke= FirstColumn.add("checkbox");
ResizeStroke.text = "Resize stroke";


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

var copySize= SecondColumn.add("radiobutton");
copySize.text = "Copy";


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
//var divider2 = dialog.add("panel");
//divider2.alignment = "fill";

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

            if (node.typename != "GroupItem"){  
                var nd_s =ignoreStroke.value? 0:(node.visibleBounds[1]-node.geometricBounds[1])*2;
            } else {
                var nd_Bounds = FindBounds(node);
                var nd_height = nd_Bounds[1] - nd_Bounds[3];
             var nd_width = nd_Bounds[2] - nd_Bounds[0];
           //  var nd_height = nd_Bounds[5] - nd_Bounds[7];
             //var nd_width = nd_Bounds[6] - nd_Bounds[4];
            }  

            ////if ignoreStroke true calculate parameters of geometric bounds
            if (ignoreStroke.value == true){
                if (item.typename != "GroupItem") {
                    var it_top = item.geometricBounds[1];
                    var it_left = item.geometricBounds[0];
                    var it_width = item.geometricBounds[2] - item.geometricBounds[0];
                    var it_height = item.geometricBounds[1] - item.geometricBounds[3];

                } else if (item.typename == "GroupItem") {
                    var it_Bounds = FindBounds(item);
                    var it_top = it_Bounds[1];
                    var it_left = it_Bounds[0];
                    var it_width = it_Bounds[2] - it_Bounds[0];
                    var it_height = it_Bounds[1] - it_Bounds[3];
                }

            ////if ignoreStroke  false calculate parameters of visible bounds
            } else if (ignoreStroke.value == false) {
                if (item.typename != "GroupItem") {
                    var it_top = item.visibleBounds[1];
                    var it_left = item.visibleBounds[0];
                    var it_width = item.visibleBounds[2] - item.visibleBounds[0];
                    var it_height = item.visibleBounds[1] - item.visibleBounds[3];

                }else if (item.typename == "GroupItem"){
                    var it_Bounds = FindBounds(item);   
                    var it_top = it_Bounds[5];
                    var it_left = it_Bounds[4];
                    var it_width = it_Bounds[6] - it_Bounds[4];
                    var it_height = it_Bounds[5] - it_Bounds[7]; 
                }
            }
                


            //////////////////////////
            ///change size///

            var newStroke, newHeight, newWidth;
            newStroke = newHeight = newWidth = 100;


            if (fitInHeightCheckbox.value) {

                //if node is vertical line      
                if (node.width == 0) {
                    newStroke = newHeight = it_height * 100 / node.height;
                    newWidth = 100;

                    //if node is horisontal line      
                } else if (node.height == 0) {
                    newStroke = it_height * 100 / node.strokeWidth;
                    newHeight = newWidth = 100;

                    //if node isnot a group
                } else if (it_height != 0) {
                    if (node.typename != "GroupItem") {
                        newWidth = newHeight = newStroke = ResizeStroke.value
                        ? (it_height / (node.height + nd_s)) * 100
                        : ((it_height - nd_s) / node.height) * 100;

                    //if node is a group
                    } else if (node.typename == "GroupItem") {
                        newWidth = newHeight = newStroke = it_height / nd_height * 100;
                    }
                } else {
                    err = "There is an object with zero height";
                }


            } else if (fitInWidthCheckbox.value) {

                //if node is vertical line      
                if (node.width == 0) {
                    newStroke = it_width * 100 / node.strokeWidth;
                    newHeight = 100;

                    //if node is horisontal line      
                } else if (node.height == 0) {
                    newStroke = newWidth = it_width * 100 / node.width;
                    newHeight = 100;

                    //if node is not a group
                } else if (it_width != 0) {
                    if (node.typename != "GroupItem" & node.height != 0 & node.width != 0) {
                        newWidth = newHeight = newStroke = ResizeStroke.value
                        ? (it_width / (node.width + nd_s)) * 100
                        : ((it_width - nd_s) / node.width) * 100;

                    //if node is a group
                    } else if (node.typename == "GroupItem") {
                        newWidth = newHeight = newStroke = it_width / nd_width * 100;
                    }
                } else {
                    err = "There is an object with zero width";
                }


            } else if (copySize.value) {

                //if node is vertical line  
                if (node.width == 0) {
                    newWidth = 100;
                    newHeight = it_height * 100 / node.height;
                    newStroke = it_width * 100 / node.strokeWidth;

                    //if node is horisontal line      
                } else if (node.height == 0) {
                    newWidth = it_width * 100 / node.width;
                    newHeight = 100;
                    newStroke = it_height * 100 / node.strokeWidth;

                } else if (it_width != 0 | it_height != 0) {
                    //if node is not a group
                    if (node.typename != "GroupItem") {
                        newWidth = ((it_width - nd_s) / node.width) * 100;
                        newHeight = ((it_height - nd_s) / node.height) * 100;
                        newStroke = 100;

                        //if node is a group
                    } else if (node.typename == "GroupItem") {
                        newHeight = it_height / nd_height * 100;
                        newWidth = it_width / nd_width * 100;
                        newStroke = undefined; /// ?    
                    }
                } else {
                    err = "There is an object with zero width or height";
                }
            }


            node.resize(
                scaleX=newWidth,
                scaleY= newHeight,
                changePositions= undefined,
                changeFillPatterns= undefined,
                changeFillGradients= undefined,
                changeStrokePattern= undefined,
                changeLineWidths =  ResizeStroke.value ? newStroke : 100);

            // end changing size


            /// calculate node parametres
            if (node.typename == "GroupItem") {
                var nd_Bounds = FindBounds(node);
                var nd_top = nd_Bounds[1];
                var nd_left = nd_Bounds[0];
                var nd_width = nd_Bounds[2] - nd_Bounds[0];
                var nd_height = nd_Bounds[1] - nd_Bounds[3];
                var nd_str = 0;

            } else if (node.typename != "GroupItem") {

                if (ignoreStroke.value == true) {
                    var nd_str = node.visibleBounds[1] - node.geometricBounds[1];
                    var nd_width = node.geometricBounds[2] - node.geometricBounds[0];
                    var nd_height = node.geometricBounds[1] - node.geometricBounds[3];
                    var nd_top = node.geometricBounds[1];
                    var nd_left = node.geometricBounds[0];

                    if (node.height == 0 || node.width == 0) {
                        nd_str = 0;
                        nd_height = node.visibleBounds[1] - node.visibleBounds[3];
                        nd_width = node.visibleBounds[2] - node.visibleBounds[0];
                    }

                } else if (ignoreStroke.value == false) {
                    var nd_str = 0;
                    var nd_width = node.visibleBounds[2] - node.visibleBounds[0];
                    var nd_height = node.visibleBounds[1] - node.visibleBounds[3];
                    var nd_top = node.visibleBounds[1];
                    var nd_left = node.visibleBounds[0];
                }
            }


            //////////////////////////
            ///change position///


            //if node is clipping mask
            if (node.typename == "GroupItem"){

                ///TOP
                if (AlignTopLeft.value | AlignTopRight.value | AlignTopCenter.value) {
                    node.top = node.top - (nd_top - it_top) + nd_str;
                }
                if (AlignCenterLeft.value | AlignCenterRight.value | AlignCenterCenter.value) {
                    node.top = node.top - ((nd_top - nd_height / 2) - (it_top - it_height / 2)) + nd_str;
                }
                if (AlignBottomLeft.value | AlignBottomRight.value | AlignBottomCenter.value) {
                    node.top = node.top - ((nd_top - nd_height) - (it_top - it_height)) + nd_str;
                }

                ///LEFT
                if (AlignTopLeft.value | AlignCenterLeft.value | AlignBottomLeft.value) {
                    node.left = node.left - (nd_left - it_left) - nd_str;
                }
                if (AlignTopCenter.value | AlignCenterCenter.value | AlignBottomCenter.value) {
                    node.left = node.left + ((it_left + it_width / 2) - (nd_left + nd_width / 2)) - nd_str;
                }
                if (AlignTopRight.value | AlignCenterRight.value | AlignBottomRight.value) {
                    node.left = node.left + ((it_left + it_width) - (nd_left + nd_width)) - nd_str;
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
/* //////////////////////////////Get object size-support mask function/////////////////////////////////// */
function FindBounds(obj) {
    var Bounds = new Array();
    GET_Bounds(obj);
    var v_left = new Array();
    var g_left = new Array();
    var v_top = new Array();
    var g_top = new Array();
    var v_right = new Array();
    var g_right = new Array();
    var v_bottom = new Array();
    var g_bottom = new Array();
    for (var i = 0; i < Bounds.length; i += 1) {
        g_left[i] = Bounds[i].geometricBounds[0];
        v_left[i] = Bounds[i].visibleBounds[0];
        g_top[i] = Bounds[i].geometricBounds[1];
        v_top[i] = Bounds[i].visibleBounds[1];
        g_right[i] = Bounds[i].geometricBounds[2];
        v_right[i] = Bounds[i].visibleBounds[2];
        g_bottom[i] = Bounds[i].geometricBounds[3];
        v_bottom[i] = Bounds[i].visibleBounds[3];
    }
    var v_L = MIN_IN_ARRAY(v_left);
    var g_L = MIN_IN_ARRAY(g_left);
    var v_T = MAX_IN_ARRAY(v_top);
    var g_T = MAX_IN_ARRAY(g_top);
    var v_R = MAX_IN_ARRAY(v_right);
    var g_R = MAX_IN_ARRAY(g_right);
    var v_B = MIN_IN_ARRAY(v_bottom);
    var g_B = MIN_IN_ARRAY(g_bottom);
    return [g_L, g_T, g_R, g_B, v_L, v_T, v_R, v_B];

    function GET_Bounds(obj) {
        if (IS_CLIP(obj)) {
            Bounds.push(obj.pageItems[0]);
            return;
        }
        if (obj.constructor.name == "GroupItem") {
            try {
                var N_sub_obj = obj.pageItems.length;
                for (var i = 0; i < N_sub_obj; i += 1) {
                    GET_Bounds(obj.pageItems[i]);
                }
            } catch (error) {}
            return;
        }
        Bounds.push(obj);
        return;
    }
}
////////////////
function IS_CLIP(obj) {
	try {
		if (obj.constructor.name == "GroupItem") {
			if (obj.clipped) {
				return true;
			}
		}
	} catch(error) {

}
	return false;
}

function MAX_IN_ARRAY(the_array) {
	var MAX = the_array[0];
	for (var i = 0; i < the_array.length; i += 1) {
		if (the_array[i] > MAX) {
			MAX = the_array[i]
		}
	}
	return MAX;
}

function MIN_IN_ARRAY(the_array) {
	var MIN = the_array[0];
	for (var i = 0; i < the_array.length; i += 1) {
		if (the_array[i] < MIN) {
			MIN = the_array[i]
		}
	}
	return MIN;
}


//////////////////////
function saveSettings() {
    var $file = new File(settingFile.folder + settingFile.name),
        data = [
            
            saveOriginalCheckbox.value,
            copyColorsCheckbox.value,
            ignoreStroke.value,
            NochangeCheckbox.value,
            fitInWidthCheckbox.value,
            fitInHeightCheckbox.value,
            copySize.value,
            TopObj.value,
            ResizeStroke.value

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
            copySize.value = ($main[6] === 'true');
            TopObj.value= ($main[7] === 'true');
            ResizeStroke.value= ($main[8] === 'true');

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


