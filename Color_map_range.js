startAction();

function startAction() {

    var doc = app.activeDocument;
    var sel = doc.selection;
    var polygons = [];
    var values = [];
    var a = 0;
    var b = 0;
    var currentPathPoints;
    var erorr = null;
    var textPath = [];
    /*
        var col = new RGBColor();
        col.red = 48;
        col.green = 32;
        col.blue = 126;
    */
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

    if (polygonsNew.length != values.length) {
        erorr = "Please, select the same number of objects and captions";
    }

    ////
    // работаем с образцами
    var swatchesSel = doc.swatches.getSelected();
    if (swatchesSel.length == 0) {
        erorr = "Please, select at least 2 swatches";
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
    }

    //////////////
    if (erorr != null) {
        alert(erorr);
        return;
    }
    ////////////

    var indx1;
    var indx2;
    var fractBetween = 0;

    var minDataVal = Math.min.apply(Math, values);
    var maxDataValue = Math.max.apply(Math, values);
    var parts = colors.length - 1;

    ////////////

    for (var d = 0; d < values.length; d++) {
        
        var value = ((values[d] - minDataVal) / (maxDataValue - minDataVal));
        if (value <= 0) {
            indx1 = indx2 = 0;
        } else if (value >= 1) {
            indx1 = indx2 = parts;
        } else {
            indx1 = Math.floor(value * parts);
            indx2 = indx1 + 1;
            fractBetween = value * parts - indx1;
        }

        var col = new RGBColor();
        col.red = ((colors[indx2].red - colors[indx1].red) * fractBetween + colors[indx1].red);
        col.green = ((colors[indx2].green - colors[indx1].green) * fractBetween + colors[indx1].green);
        col.blue = ((colors[indx2].blue - colors[indx1].blue) * fractBetween + colors[indx1].blue);

        /////////////////

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
        return;
    }

}

///////////////
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

///////////////////////////

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