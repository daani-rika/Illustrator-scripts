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
//copyWHCheckbox.value = false;

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


function setFillColor(items, color) {
	if (color) {
		var i = items.length;
		if (i) while (i--) {
				if (items[i].typename === 'GroupItem') {
					setFillColor(items[i].pageItems, color);
				} else if (items[i].typename === 'CompoundPathItem') {
					if (items[i].pathItems.length) items[i].pathItems[0].fillColor = color;
				} else if (items[i].typename === 'PathItem') {
					items[i].fillColor = color;
				}
			}
	}
}

function getFillColor(items) {
	var i = items.length, gc;
	if (i) while (i--) {
			if (items[i].typename === 'GroupItem' && (gc = getFillColor(items[i].pageItems))) return gc;
			else if (items[i].typename === 'CompoundPathItem' && items[i].pathItems.length) return items[i].pathItems[0].fillColor;
			else if (items[i].typename === 'PathItem') return items[i].fillColor;
		}
}


function getSymbolPositionByRegistrationPoint(item) {
	var bakupSymbol = item.symbol,
	    newSymbol = activeDocument.symbols.add(item, SymbolRegistrationPoint.SYMBOLTOPLEFTPOINT);

	// replace symbol
	item.symbol = newSymbol;

	// set position
	var position = [  item.left,   item.top ];

	// restore symbol
	item.symbol = bakupSymbol;
	newSymbol.remove();
	return position;
}

function startAction() {
	if (selection.length) {
		
		items = selection,
		nodes = [],
		length = nodes.length,
		i = items.length,
		j = 0;

		progressBarCounter = progressBar.maxvalue / i;
		nodes = selection[0];

		while (i--) {
			if (j >= nodes.length) j = 0;
			if (nodes.typename=="GroupItem"){
				app.executeMenuCommand("Live Pathfinder Merge"); 
				}
			var item = items[i],
			node = nodes.duplicate(item, ElementPlacement.PLACEBEFORE); ;
			j++;


			////
			var it_strk=0;
			var nd_strk=0;
			var ignStrk = 0;
			var withStrk = 0;	
			
			// 	обводка по центру
			if (item.visibleBounds[1]-item.geometricBounds[1]==item.strokeWidth/2){
			it_strk=item.strokeWidth;}
			if (node.visibleBounds[1]-node.geometricBounds[1]==node.strokeWidth/2){
			nd_strk=node.strokeWidth;}
						
			// 	обводка снаружи
			if (item.visibleBounds[1]-item.geometricBounds[1]==item.strokeWidth){
			it_strk=item.strokeWidth*2;}
			if (node.visibleBounds[1]-node.geometricBounds[1]==node.strokeWidth){
			nd_strk=node.strokeWidth*2;}
			
			// 	обводка внутри
			if (item.visibleBounds[1]-item.geometricBounds[1]==0){
			it_strk=0;}
			if (node.visibleBounds[1]-node.geometricBounds[1]==0){
			nd_strk=0;}
			
			ignoreStroke.value ? ignStrk = (nd_strk-it_strk) /2 : withStrk = nd_strk-it_strk;
			
			
			if (fitInHeightCheckbox.value) {
				node.width =  (item.height - withStrk)*node.width/node.height;
				node.height = item.height - withStrk  ;
				
			}

			if (fitInWidthCheckbox.value) {
				node.height = node.height* (item.width - withStrk) / node.width ;
				node.width = item.width - withStrk ;
			}
			
			if (copyWHCheckbox.value)  {
				node.width = item.width-withStrk;
				node.height = item.height-withStrk;
			}

			
		
		
			if (item.typename=="GroupItem"){
			app.executeMenuCommand("Live Pathfinder Merge"); 			
						}

			node.left = item.left - (node.width - item.width) / 2;
			node.top = item.top + (node.height - item.height) / 2;
			
			
			if (AlignTopLeft.value | AlignTopRight.value | AlignTopCenter.value) {
				node.top =  item.top+ignStrk;			}
				

			if (AlignCenterLeft.value | AlignCenterRight.value | AlignCenterCenter.value) {
				node.top =  item.top + (node.height - item.height) / 2 + ignStrk+ (withStrk/2) ;	}

			if (AlignBottomLeft.value | AlignBottomRight.value | AlignBottomCenter.value) {
				node.top =  item.top + (node.height - item.height)+ ignStrk + withStrk ;}

			if (AlignTopLeft.value | AlignCenterLeft.value | AlignBottomLeft.value) {
				node.left = item.left - ignStrk ;}

			if (AlignTopCenter.value | AlignCenterCenter.value | AlignBottomCenter.value) {
				node.left = item.left - (node.width - item.width) / 2 - ignStrk - (withStrk/2);}

			if (AlignTopRight.value | AlignCenterRight.value | AlignBottomRight.value) {
				node.left = item.left - (node.width - item.width)- ignStrk -withStrk ;}
			
				
		if (item.typename=="GroupItem"){
					
			var actionStr =   "/version 3 /name [ 9 6163746e7363727074]"
			+ "/isOpen 1 /actionCount 1"
			+ "/action-1 {/name [ 26 52656475636520746f20426173696320417070656172616e6365]"
			+ "/keyIndex 0 /colorIndex 0 /isOpen 1"
			+ "/eventCount 1"
			+ "/event-1 {/useRulersIn1stQuadrant 0 /internalName (ai_plugin_appearance)"
			+ "/localizedName [ 20 d09ed184d0bed180d0bcd0bbd0b5d0bdd0b8d0b5]"
			+ "/isOpen 0 /isOn 1 /hasDialog 0 /parameterCount 1"
			+ "/parameter-1 {"
			+ "/key 1835363957 /showInPalette -1"
			+ "/type (enumerated)"
			+ "/name [ 63 d0a1d0bed0bad180d0b0d182d0b8d182d18c20d0b4d0be20d0bed181d0bdd0bed0b2d0bdd0bed0b3d0be20d0bed184d0bed180d0bcd0bbd0b5d0bdd0b8d18f]"
			+ "/value 7}}}";
			
			var tmp = File(Folder.desktop + "/tmpSet1.aia");  
				tmp.open('w');  
				tmp.write(actionStr); 
				tmp.close();
				app.loadAction(tmp); 
				app.doScript("Reduce to Basic Appearance", "actnscrpt", false);  
				app.unloadAction("actnscrpt","");
				tmp.remove();	
		}




if (copyColorsCheckbox.value) {
                try {
                setFillColor([node], getFillColor([item]));
                }catch(e){alert(e+'\n'+e.line)}
            }

			if (!saveOriginalCheckbox.value) item.remove();

			progressBar.value += progressBarCounter;
			dialog.update();
		}

		
		
	}

	dialog.close();
}

function saveSettings() {
	var $file = new File(settingFile.folder + settingFile.name),
	data = [
	           
	           saveOriginalCheckbox.value,
	           copyColorsCheckbox.value,
			   ignoreStroke.value,
			   NochangeCheckbox.value,
			   fitInWidthCheckbox.value,
			   fitInHeightCheckbox.value,
			   copyWHCheckbox.value
	           
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
			
			
		} catch (e) {}
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