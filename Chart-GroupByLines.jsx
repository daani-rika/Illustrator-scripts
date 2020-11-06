
/*
Version: 2.0
Made by daani-rika: https://github.com/daani-rika/Illustrator-scripts

*/


#target Illustrator

group ();

function group ()
{
var thisDoc = app.activeDocument;
var selObj = thisDoc.selection; 

sortVert(selObj);

var Base;
var top=0;
var bottom=0;
var iart;

for (i = 0 ; i<selObj.length; i++ )
     {      
        iart = selObj[i];  

        if (isPointIn(top,bottom,iart) == "false")
            {
                Base = selObj[i].geometricBounds;
                top = Base[1];
                bottom =  Base[3];                

                var groupItem = thisDoc.groupItems.add();
                iart.moveToBeginning(groupItem);
           }

        else {
             iart.moveToBeginning(groupItem);             
           }          
     }
}

function isPointIn (top,bottom,iart)
     {
          var vb = iart.visibleBounds;
          icenter = vb[1]-((vb[1]-vb[3])/2);        

          if (  icenter<top  && icenter>bottom)
               return "true";
          else
               return "false";
     }
   


     // --------------------------------------------------
 // top -> down || left -> right
 function sortVert(tfs) {         
     tfs.sort(function(a, b) {
         return a.top == b.top ?
             a.left - b.left :
             b.top - a.top
     });      
 }