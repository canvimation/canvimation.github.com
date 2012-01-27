/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function addMark() 
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

function removeMark()
{
	$(this.mark.id).parentNode.removeChild($(this.mark.id));
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
			//this.shape.setNode(this,cursor) all angles to be measured clockwise about centre from +ve x axis;
			var phi=arctan(cursor.y-this.shape.arccentre.y,cursor.x-this.shape.arccentre.x);//angle cursor makes
			
			var radius = this.shape.arcwidth;//set radius for cicle C centre arccentre
			var p=new Point(radius*Math.cos(phi),radius*Math.sin(phi));//point cursor would be at on C
		//$("msg").innerHTML=phi*180/Math.PI+".."+p.x+","+p.y;
			var sY=this.shape.archeight/this.shape.arcwidth; // ratio of height of ellipse to radius
			var node=this.shape.path.next;
			while(node.point.x!="end")
			{
				node.translate(this.shape.arccentre.x,this.shape.arccentre.y);  //put origin at arccentre
				node.scaleY(1/sY); //scale ellipse to circle
				node=node.next;
			} 
			this.shape.setNode(this,p);  //put current node on circle C using point found from cursor
			var psi=this.shape.path.next.getAngle(); //find angle of first node in node list between 0 and 2PI
			if(this.prev.point.x=="end") //find angle from first to last point in list between 0 and 2PI
			{
				var theta=this.getAngleTo(this.prev.prev);
			}
			else
			{
				var theta=2*Math.PI-this.getAngleTo(this.shape.path.next);
			}$("msg").innerHTML="centre.."+this.shape.arccentre.x+","+this.shape.arccentre.y+"..psi..theta.."+psi*180/Math.PI+"..."+theta*180/Math.PI;
			if(theta<=Math.PI/2)
			{
				this.shape.bnode.removeNode();//remove bottom, left and top node as first arc is between 0 an 90 degrees
				this.shape.lnode.removeNode();
				this.shape.tnode.removeNode();
				var b=baseArcBez(radius,theta/2); //find new points and control points
				node=this.shape.path.next;
				this.shape.setNode(node,b.p1);
				this.shape.setNode(node.next,b.p2,b.c1,b.c2);//rotate back into correct position
				node.rotate(psi+theta/2);
				node.next.rotate(psi+theta/2);
			}


var i=1;
node=this.shape.path.next;
			m="";
			while(node.point.x!="end")
			{
				m+="<br>"+(i++)+"----"+node.point.x+".."+node.point.y+".."+node.ctrl1.x+".."+node.ctrl1.y+".."+node.ctrl2.x+".."+node.ctrl2.y;
				node=node.next;
			}
//$("msg").innerHTML=m;



		
			var node=this.shape.path.next;
			while(node.point.x!="end")  //scale and translate back to correct position;
			{
				node.scaleY(sY);
				node.translate(-this.shape.arccentre.x,-this.shape.arccentre.y);
				node=node.next;
			}

			
						
			this.shape.draw();
			$(this.mark.id).style.left=this.point.x-4;
			$(this.mark.id).style.top=this.point.y-4;
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
			if((this.shape.tplftcrnr.x<cursor.x && cursor.x<m) || (this.shape.tplftcrnr.x>cursor.x && cursor.x>m))
			{
				this.shape.crnradius=Math.abs(cursor.x-this.shape.tplftcrnr.x);
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


    

       


