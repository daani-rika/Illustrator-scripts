// A simple script to make a white background on every artboard.

#target illustrator

var doc = app.activeDocument;  
var artboard = doc.artboards;  
  
for(i=0; i<artboard.length; i++){  
     var top=artboard[i].artboardRect[1];  
     var left=artboard[i].artboardRect[0];  
     var width=artboard[i].artboardRect[2]-artboard[i].artboardRect[0];  
     var height=artboard[i].artboardRect[1]-artboard[i].artboardRect[3];  
     var rect = doc.pathItems.rectangle (top, left, width, height);
     var col = new CMYKColor();  
	col.cyan = 0;  
	col.magenta = 0;  
	col.yellow = 0;  
	col.black = 0;  
     rect.fillColor = col; 
     rect.strokeColor = new NoColor();
     rect.selected = true;
     rect.zOrder(ZOrderMethod.SENDTOBACK) ;       
}  
