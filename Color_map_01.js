/*
Code for Import https://scriptui.joonas.me — (Triple click to select): 
{"activeId":13,"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":null,"windowType":"Dialog","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"text":"Dialog","preferredSize":[0,0],"margins":16,"orientation":"column","spacing":10,"alignChildren":["center","top"]}},"item-1":{"id":1,"type":"Group","parentId":26,"style":{"enabled":true,"varName":"ColorGroup","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":0,"alignChildren":["left","center"],"alignment":null}},"item-4":{"id":4,"type":"EditText","parentId":28,"style":{"enabled":true,"varName":"ValueTx","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"25","justify":"center","preferredSize":[80,0],"alignment":null,"helpTip":null}},"item-7":{"id":7,"type":"Button","parentId":1,"style":{"enabled":false,"varName":"ColorSw","text":"","justify":"center","preferredSize":[90,30],"alignment":null,"helpTip":null}},"item-13":{"id":13,"type":"StaticText","parentId":28,"style":{"enabled":true,"varName":"maxValue","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"100","justify":"right","preferredSize":[30,0],"alignment":null,"helpTip":null}},"item-22":{"id":22,"type":"Group","parentId":0,"style":{"enabled":true,"varName":"FinalGroup","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-23":{"id":23,"type":"Button","parentId":22,"style":{"enabled":true,"varName":"OK","text":"OK","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-26":{"id":26,"type":"Group","parentId":0,"style":{"enabled":true,"varName":"ColorsGroup","preferredSize":[0,0],"margins":0,"orientation":"column","spacing":10,"alignChildren":["center","center"],"alignment":null}},"item-28":{"id":28,"type":"Group","parentId":26,"style":{"enabled":true,"varName":"ValueGroup","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["center","center"],"alignment":"fill"}},"item-32":{"id":32,"type":"StaticText","parentId":28,"style":{"enabled":true,"varName":"minValue","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"0","justify":"left","preferredSize":[30,0],"alignment":null,"helpTip":null}}},"order":[0,26,1,7,28,32,4,13,22,23],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":false,"afterEffectsDockable":false,"itemReferenceList":"None"}}
*/

// DIALOG
// ======
var dialog = new Window("dialog");
dialog.text = "Dialog";
dialog.orientation = "column";
dialog.alignChildren = ["center", "top"];
dialog.spacing = 10;
dialog.margins = 16;

// COLORSGROUP
// ===========
var ColorsGroup = dialog.add("group", undefined, {
    name: "ColorsGroup"
});
ColorsGroup.orientation = "column";
ColorsGroup.alignChildren = ["center", "center"];
ColorsGroup.spacing = 10;
ColorsGroup.margins = 0;

// COLORGROUP
// ==========
var ColorGroup = ColorsGroup.add("group", undefined, {
    name: "ColorGroup"
});
ColorGroup.orientation = "row";
ColorGroup.alignChildren = ["left", "center"];
ColorGroup.spacing = 0;
ColorGroup.margins = 0;

// VALUEGROUP
// ==========
var ValueGroup = ColorsGroup.add("group", undefined, {
    name: "ValueGroup"
});
ValueGroup.orientation = "row";
ValueGroup.alignChildren = ["center", "center"];
ValueGroup.spacing = 10;
ValueGroup.margins = 0;
ValueGroup.alignment = ["fill", "center"];

var minValue = ValueGroup.add("statictext", undefined, undefined, {name: "minValue"});
minValue.preferredSize.width = 30;

// FINALGROUP
// ==========
var FinalGroup = dialog.add("group", undefined, {name: "FinalGroup"});
FinalGroup.orientation = "row";
FinalGroup.alignChildren = ["left", "center"];
FinalGroup.spacing = 10;
FinalGroup.margins = 0;

var OK = FinalGroup.add("button", undefined, undefined, {name: "OK"});
OK.text = "OK";

var CancelButton =FinalGroup.add("button", undefined, undefined, {name: "CancelButton"}); 
    CancelButton.text = "Cancel"; 
    CancelButton.preferredSize.width = 74; 

///////////

    var doc = app.activeDocument;
    var sel = doc.selection;
    var polygons = [];
    var values = [];
    var a = 0;
    var b = 0;
    var currentPathPoints;
    var erorr = null;
    var textPath = [];
    var polygonsNew = [];

    // разделяем текст и полигоны
    for (var i = 0; i < sel.length; i++) {

        if (sel[i].typename == "PathItem") {
            polygons[a] = sel[i];
            currentPathPoints = polygons[a].selectedPathPoints;
            var polygonsNewObj = [];
            for (var t = 0; t < currentPathPoints.length; t++) {
                polygonsNewObj[t] = currentPathPoints[t].anchor;
            }
            polygonsNew.push(polygonsNewObj);
            a++;

        } else if (sel[i].typename == "TextFrame") {
            // values[b] = sel[i];
            textPath.push(sel[i]);
            values.push(sel[i].contents
                .replace(new RegExp(",", 'g'), ".")
                .replace(new RegExp("%", 'g'), "")
            );

            b++;
        }
    }

    var minVal = Math.min.apply(Math, values);
    var maxVal = Math.max.apply(Math, values);
    minValue.text =  minVal ;

    var swatchesSel = doc.swatches.getSelected();
    if (swatchesSel.length <= 1) {
        erorr = "Please, select at least 3 swatches";
    }

    var colors = [];

    for (var b = 0; b < swatchesSel.length; b++) {
        var color;
        if (swatchesSel[b].color.typename == "SpotColor") {
            color = swatchesSel[b].color.spot.color;
        } else {
            color = swatchesSel[b].color;
        }

        if (color.typename == "RGBColor") {
            colors[b] = color;
        } else if (color.typename == "CMYKColor") {
            colors[b] = ConvertCMYKSwatch(color);
        } else {
            erorr = "Please, select RGB or CMYK swatches!";
        }

        // COLORGROUP
        // ==========
        var ColorSw = ColorGroup.add("button", undefined, undefined, {
            name: "ColorSw"
        });
        ColorSw.enabled = false;
        ColorSw.preferredSize.width = 90;
        ColorSw.preferredSize.height = 30;

        ColorSw.fillBrush = ColorSw.graphics.newBrush(ColorSw.graphics.BrushType.SOLID_COLOR, ConvertToUIColor(colors[b]));
        ColorSw.onDraw = customDraw;

        if (b != swatchesSel.length - 1) {
            var ValueTx = ValueGroup.add('edittext {justify: "center"}}');
            ValueTx.text = Math.floor(minVal + ((maxVal - minVal) / swatchesSel.length) * (b + 1));
            ValueTx.preferredSize.width = 80;
        }

    }

    var maxValue = ValueGroup.add("statictext", undefined, undefined, {name: "maxValue"});
    maxValue.text =maxVal;
    maxValue.preferredSize.width = 30;
    maxValue.justify = "right";
    

    if (polygonsNew.length != values.length) {
        erorr = "Please, select the same number of objects and captions";
    }

    if (erorr != null) {
        alert(erorr);
        dialog.close();
    }

    CancelButton.onClick = function() {
        dialog.close();
    }

    OK.onClick = MakeColorMap;
    dialog.show();
    

    
    

    //////////////////
    function MakeColorMap(){

        
    for (var d = 0; d < values.length; d++) {

        var value = values[d];
        var col;

        for (var u = 0; u < colors.length; u++) {
            if (value <= ValueGroup.children[u + 1].text * 1) {
                col = colors[u];
                break;
            }
        }

        for (var z = 0; z < polygonsNew.length; z++) {
            var IsInside = inside(textPath[d].anchor, polygonsNew[z]);

            if (IsInside == true) {
                polygons[z].fillColor = col;
                break;
            }
        }

        if (IsInside == false) {
            erorr = ("Text anchors should be inside poligons! ");
        }
       
    }
    if (erorr != null) {
        alert(erorr);
        dialog.close();
        return;
    }
    
    dialog.close();
}





////////////////
function customDraw() {
    with(this) {
        graphics.drawOSControl();
        graphics.rectPath(0, 0, size[0], size[1]);
        graphics.fillPath(fillBrush);

    }
}

function ConvertCMYKSwatch(swatch) {
    var cmyk = [
        swatch.cyan,
        swatch.magenta,
        swatch.yellow,
        swatch.black
    ];
    var rgb = (app.convertSampleColor(
        ImageColorSpace.CMYK,
        cmyk, ImageColorSpace.RGB,
        ColorConvertPurpose.defaultpurpose));

    var newRGBColor = new RGBColor();
    newRGBColor.red = rgb[0].toFixed(1) * 1;
    newRGBColor.green = rgb[1].toFixed(1) * 1;
    newRGBColor.blue = rgb[2].toFixed(1) * 1;

    return newRGBColor;
}

function ConvertToUIColor(swatch) {

    var newUIColor = [];
    newUIColor[0] = swatch.red / 255;
    newUIColor[1] = swatch.green / 255;
    newUIColor[2] = swatch.blue / 255;

    return newUIColor;
}

function inside(point, vs) {
    // ray-casting algorithm based on
    // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html

    var x = point[0],
        y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0],
            yi = vs[i][1];
        var xj = vs[j][0],
            yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y)) &&
            (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};