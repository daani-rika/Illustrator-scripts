#target Illustrator

group ();

function group ()
{
var thisDoc = app.activeDocument;
var selObj = thisDoc.selection; 
sortVert(selObj);

var height = selObj[0].geometricBounds[1]-selObj[0].geometricBounds[3];

var Base;
var top;
var bottom ;
var iHeight ;
var shift=0;
var iart;

for (i = 0 ; i<selObj.length; i++ )
     {      
        iart = selObj[i];  

        if (isPointIn(top,bottom,iart) == "false")
            {
                Base = selObj[i].geometricBounds;
                top = Base[1];
                bottom =  Base[3];                
                //redraw();

                iHeight = iart.height;
                iart.position = [iart.geometricBounds[0], selObj[0].geometricBounds[1]-shift];  
                Base = selObj[i].geometricBounds;

                var groupItem = thisDoc.groupItems.add();
                iart.moveToBeginning(groupItem);
                //shift+=height*1.5;
                shift+=height+5;
                
           }

        else {
             iHeight = iart.height;
             iart.position = [iart.geometricBounds[0], Base[1]-(Base[1]-Base[3]-iHeight)/2];
             iart.moveToBeginning(groupItem);
             
           }          
     }
}

function isPointIn (top,bottom,iart)
     {
          var vb = iart.visibleBounds;
          icenter = vb[1]-((vb[1]-vb[3])/2);
          //itop = vb[1];
         // ibottom = vb[3];          

         if (  icenter<top  && icenter>bottom)
               return "true";
          else
               return "false";
     }
   

   // top -> down || left -> right
   function sortVert(tfs) {         
     tfs.sort(function(a, b) {
         return a.top == b.top ?
             a.left - b.left :
             b.top - a.top
     });      
 }