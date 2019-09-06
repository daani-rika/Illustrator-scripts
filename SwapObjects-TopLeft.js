//based on swapObjects.js by John Wundes: https://github.com/johnwun/js4ai
//this script swaps position of the two objects, aligning top left corner. Size remains the same.

try {
    var selObjs = "Please select two objects on the page.";
    var docRef = activeDocument;
    if(documents.length > 0) {
        if(docRef.selection.length == 2) {
            mySelection = docRef.selection;
            if(mySelection instanceof Array) {
                //create bounding objects 
                var A_Bounds = mySelection[0].geometricBounds;
                var B_Bounds = mySelection[1].geometricBounds;

                //define parameters objects
                //	object A
                var A_left = A_Bounds[0];
                var A_top = A_Bounds[1];

                //	object B
                var B_left = B_Bounds[0];
                var B_top = B_Bounds[1];

                //move A (selection[0]) 		

                mySelection[0].position = [B_left, B_top];

                //move B (selection[1])

                mySelection[1].position = [A_left, A_top];

            }
        } else {
            alert(mySelection + " is not an array!\n" + selObjs);
        }
    } else {
        alert("Selection is not 2 objects!\n" + selObjs);
    }
} catch (e) {
    alert("problem:\n" + e);
}
