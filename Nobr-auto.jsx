/* 
Version: 1.3
Made by daani-rika: https://github.com/daani-rika/Illustrator-scripts
Based on https://community.adobe.com/t5/illustrator/select-part-of-point-text-objects-matching-a-regex-expression/td-p/8919738?page=1
*/

function NoBreak() {
    var doc = app.activeDocument;
    var sel = doc.selection;
    var grep = new RegExp("\\s(((([А-Яа-яёЁЇїІіЄєҐґ]){1,2})(\\s[А-Яа-яёЁЇїІіЄєҐґ])+)+)", "ig"); // Russian and Ukrainian
    var result = [];

    if (sel.typename == "TextRange") {
        sel.characterAttributes.noBreak = true;
    } else {

        for (i = 0; i < sel.length; i++) {
            if (sel[i].typename == "TextFrame") {
                var txtFr = sel[i];
                grep.lastIndex = 0;

                while (result = grep.exec(txtFr.contents)) {

                    try {
                        aCon = txtFr.characters[result.index + 1];
                        aCon.length = result[1].length;
                        aCon.characterAttributes.noBreak = true;
                    } catch (e) {};
                }
            }
        }
    }

};

NoBreak();


