
var docRef = app.activeDocument;  
var artboardRef = docRef.artboards;  
  
for(i=0;i<artboardRef.length;i++){  
     var top=artboardRef[i].artboardRect[1] ;  
     var left=artboardRef[i].artboardRect[0];  
     var width=artboardRef[i].artboardRect[2]-artboardRef[i].artboardRect[0];  
     var height=artboardRef[i].artboardRect[1]-artboardRef[i].artboardRect[3];  
     var rect = docRef.pathItems.rectangle (top, left, width, height); 
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

