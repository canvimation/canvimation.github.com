/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function addMarks() 
{ 
   	this.mark = document.createElement('div');
   	this.mark.node=this;
   	this.mark.id="mark"+(MCOUNT++);
   	this.mark.style.left= this.point.x-4; 
   	this.mark.style.top= this.point.y-4;
   	this.mark.style.fontSize=0;
   	this.mark.style.width=8;
   	this.mark.style.height=8;
   	this.mark.style.border="solid black 1px";
   	this.mark.style.cursor='move';
   	
 
   
   this.mark.onmouseover=function(){
										inln=true;
									};
   this.mark.onmouseout=function(){
	   									inln=false;
									};
	this.mark.onclick	=function(){
										if ((this.style.backgroundColor!='white')&& (curcanv.complete) )
										{
										    shade(this,'#FEFEFE');
											if (parseInt(this.id.substr(3))%3==0) 
											{
												cp = new pointsMenu(curcanv,this);
   												DDcp=new YAHOO.util.DD('pmenu');
   												DDcp.setHandleElId('phead');
											}
										}							
									};
	this.dragm=new YAHOO.util.DD(this.mark.id);
	this.dragm.onDrag=function(e){$(this.id).node.updateNode(getPosition(e))};							
   	$("markerdrop").appendChild(this.mark);
 
   
   function shade(mrk,col)
   {
	  	var id=parseInt(mrk.id.substr(3));
		if (id%3==0)
		{
	  		for (var i=0;i<lnmrks;i+=3)
			{
				$('lnm'+ i).style.backgroundColor='#FEFEFE';
				$('lnm'+ i).backgroundColor='#FEFEFE';
			}	
			$('lnm'+id).style.backgroundColor='#FFFF00';
			$('lnm'+id).backgroundColor='#FFFF00';
			mod=lnmrks+100;
			if (curcanv.path[2]=='freeform') {mod=lnmrks};
			if ($('lnm'+(id+3)%mod)) {
															$('lnm'+(id+3)%mod).style.backgroundColor='#95B3D7';
															$('lnm'+(id+3)%mod).backgroundColor='#95B3D7'
															};
		}
	}
}

function updateNode(cursor)
{
	cursor.x=Math.round(cursor.x/xgrid)*xgrid;
	cursor.y=Math.round(cursor.y/ygrid)*ygrid;
	switch (this.shape.type)
	{
		case "line":
			this.shape.setNode(this,cursor);
			this.shape.draw();
		break
		case "arc":
			this.shape.setNode(this,cursor);
			this.shape.draw();
		break
		case "curve":
		break 
		case "freeform":
		break
		case "square":
		break
		case "circle":
		break
		case "rounded_rectangle":
			var start=this.shape.path.next; 
			//var p=new Point(cursor.x,start.point.y);
			
			this.mark.style.top=start.point.y-4;
			var w=(this.shape.btmrgtcrnr.x-this.shape.tplftcrnr.x)/2;
			var h=(this.shape.btmrgtcrnr.y-this.shape.tplftcrnr.y)/2;
			var d=w*h/Math.abs(w*h); //corrects for height direction;
			if(Math.abs(h)<Math.abs(w))
			{
				var m=this.shape.tplftcrnr.x+h*d;
			}
			else
			{
				var m=this.shape.tplftcrnr.x+w;
			}
			$("msg").innerHTML=this.shape.tplftcrnr.x+"..."+cursor.x +"..."+ m+"..br.."+this.shape.btmrgtcrnr.x+"..w.."+w+"..h.."+h;
			if((this.shape.tplftcrnr.x<cursor.x && cursor.x<m) || (this.shape.tplftcrnr.x>cursor.x && cursor.x>m))
			{
				this.shape.radius=Math.abs(cursor.x-this.shape.tplftcrnr.x);
			}
			else
			{
				this.mark.style.left=start.point.x-4;
			}
			this.shape.setRndRect();
			this.shape.draw();
		break
		case "triangle":
		break
		case "sector":
		break
		case "segment":
		break
		case "right_triangle":
		break
	}
}


    

       


