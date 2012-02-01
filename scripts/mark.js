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
			this.setNode(cursor);
			this.shape.draw();
		break
		case "arc":
		case "segment":
		case "sector":
			//all angles to be measured clockwise about centre from +ve x axis;
			
			var radius = this.shape.arcwidth;//set radius for cicle C centre arccentre
			
			var sY=this.shape.archeight/this.shape.arcwidth; // ratio of height of ellipse to radius
			var node=this.shape.path.next;
			while(node.point.x!="end")
			{
				node.translate(this.shape.arccentre.x,this.shape.arccentre.y); //put origin at arccentre
				node.scaleY(1/sY); //scale ellipse to circle
				node=node.next;
			}
			var alpha=arctan((cursor.y-this.shape.arccentre.y)/sY,cursor.x-this.shape.arccentre.x);//angle cursor makes
			var p=new Point(radius*Math.cos(alpha),radius*Math.sin(alpha));//point cursor would be at on C
			this.setNode(p); //put current node on circle C using point found from cursor
			
			var startAngle=this.shape.path.next.getAngle(); //find angle of first node in node list between 0 and 2PI
			var endAngle=this.shape.path.prev.getAngle();//find angle of last node in list between 0 and 2PI
			if(this.shape.type=="sector")
			{
				endAngle=this.shape.path.prev.prev.getAngle();
			}
			if(endAngle>startAngle)
			{
				var theta=endAngle-startAngle;
			}
			else
			{
				var theta=2*Math.PI-(startAngle-endAngle)
			}
			
			var phi=0;//to break theta into an acute angle (psi) and multiples of PI/2 (phi)
			
			this.shape.bnode.removeNode();//remove right, bottom and left node as first arc is between 0 an 90 degrees
			this.shape.lnode.removeNode();
			this.shape.tnode.removeNode();
			node=this.shape.path.next; //start node
			p=new Point(radius,0); //set node on circle angle 0 degrees
			node.setNode(p);
			node=node.next; //end node
			if(theta>Math.PI/2)
			{
				phi=Math.PI/2;
				this.shape.bnode.restoreNode(); 
				this.shape.lnode.removeNode();
				this.shape.tnode.removeNode();
				p=new Point(0,radius); //set node on circle at 90 degrees
				var c1=new Point(radius,radius*K);
				var c2=new Point(radius*K,radius);
				this.shape.bnode.setNode(p,c1,c2);
			}
			if(theta>Math.PI)
			{
				phi=Math.PI;
				this.shape.lnode.restoreNode();
				this.shape.tnode.removeNode();
				p=new Point(-radius,0); //set node on circle at 180 degrees
				c1=new Point(-radius*K,radius);
				c2=new Point(-radius,radius*K);
				this.shape.lnode.setNode(p,c1,c2);	
			}
			if(theta>3*Math.PI/2)
			{
				phi=3*Math.PI/2;
				this.shape.tnode.restoreNode();
				p=new Point(0,-radius); // set node on circle at 270 degrees
				c1=new Point(-radius,-radius*K);
				c2=new Point(-radius*K,-radius);
				this.shape.tnode.setNode(p,c1,c2);
			}
			var psi=theta-phi;
			var b=baseArcBez(radius,psi/2);
			node.setNode(b.p2,b.c1,b.c2);
			node.rotate(phi+psi/2);
			var node=this.shape.path.next;
			while(node.point.x!="end") //rotate to start angle, scale and translate back to correct position;
			{
				node.rotate(startAngle);
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
		case "right_triangle":
		break
	}
}


    

       


