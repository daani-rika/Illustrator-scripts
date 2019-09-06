//based on swapObjects.js by John Wundes: https://github.com/johnwun/js4ai
//this script swaps position of the two objects, aligning centers. Size remains the same.


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
                var A_right = A_Bounds[2];

                var A_bottom = A_Bounds[3];
                var A_Width = (A_right - A_left);
                var A_Height = (A_bottom - A_top);
                var A_Pos = [A_left + A_Width / 2, A_top + A_Height / 2];

                //	object B
                var B_left = B_Bounds[0];
                var B_top = B_Bounds[1];
                var B_right = B_Bounds[2];
                var B_bottom = B_Bounds[3];
                var B_Width = (B_right - B_left);
                var B_Height = (B_bottom - B_top);

                var B_Pos = [B_left + (B_Width / 2), B_top + (B_Height / 2)];


                //move A (selection[0]) 		
                var center_x_1 = B_Pos[0] - mySelection[0].width / 2;

                var center_y_1 = B_Pos[1] + mySelection[0].height / 2;
                mySelection[0].position = [center_x_1, center_y_1];
                // mySelection[0].position = B_Pos;

                //move B (selection[1])
                var center_x_2 = A_Pos[0] - mySelection[1].width / 2;
                var center_y_2 = A_Pos[1] + mySelection[1].height / 2;
                mySelection[1].position = [center_x_2, center_y_2];
                //mySelection[1].position = A_Pos;


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
