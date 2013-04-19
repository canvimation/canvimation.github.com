/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function addFixedPointMark() 
{ 
   	this.mark = document.createElement('div');
   	this.mark.node=this;
   	this.mark.id="mark"+(MCOUNT++);
   	this.mark.style.left= (this.point.x-2)+"px"; 
   	this.mark.style.top= (this.point.y-2)+"px";
   	this.mark.style.fontSize=0;
   	this.mark.style.width=4+"px";
   	this.mark.style.height=4+"px";
   	this.mark.style.border="solid black 1px";
   	this.mark.style.backgroundColor="white";
   	this.mark.innerHTML=MCOUNT-1;
   	this.mark.style.cursor='pointer';						
   	$("markerdrop").appendChild(this.mark);
   	this.mark.onmouseover=function(){
										$("markerdrop").onclick=function(e) {noBubble(e)};
									};
   	this.mark.onmouseout=function(){
	   									$("markerdrop").onclick=function(e) {
	   																			noBubble(e);
	   																			clear($("markerdrop"));
	   																			checkBoundary(shiftdown(e),getPosition(e));
	   																			BACKDROP.Canvas.ctx.clearRect(0,0,SCRW,SCRH);
	   																			$("backstage").style.visibility="hidden";
	   																			$("markerdrop").style.visibility="hidden";
	   																			$("boundarydrop").style.visibility="visible";
	   																		}
									};
   	this.mark.onclick	=function(){
										$("pointsbox").style.visibility="hidden";
										if(!($(this.id).node.nodepath===undefined))
										{
											showNodePathList($(this.id).node);
										}
										else
										{
											pointEdit($(this.id));
										}					
									};
}

function addPointMark() 
{ 
   	this.mark = document.createElement('div');
   	this.mark.node=this;
   	this.mark.id="mark"+(MCOUNT++);
   	this.mark.style.left= (this.point.x-2)+"px"; 
   	this.mark.style.top= (this.point.y-2)+"px";
   	this.mark.style.fontSize=0;
   	this.mark.style.width=4+"px";
   	this.mark.style.height=4+"px";
   	this.mark.style.border="solid black 1px";
   	this.mark.style.backgroundColor="white";
   	this.mark.style.cursor='move';
   	this.mark.innerHTML=MCOUNT-1;

   	this.mark.onmouseover=function(){
										$("markerdrop").onclick=function(e) {noBubble(e)};
									};
   	this.mark.onmouseout=function(){
	   									$("markerdrop").onclick=function(e) {
	   																			noBubble(e);
	   																			clear($("markerdrop"));
	   																			checkBoundary(shiftdown(e),getPosition(e));
	   																			BACKDROP.Canvas.ctx.clearRect(0,0,SCRW,SCRH);
	   																			$("backstage").style.visibility="hidden";
	   																			$("markerdrop").style.visibility="hidden";
	   																			$("boundarydrop").style.visibility="visible";
	   																		}
									};
	this.mark.onclick	=function(){
										pointEdit($(this.id))							
									};
									
	
	this.dragm=new YAHOO.util.DD(this.mark.id);
	this.dragm.onDrag=function(e){$(this.id).node.updatePointNode(getPosition(e))};							
   	$("markerdrop").appendChild(this.mark);
}

function removeMark()
{
	$(this.mark.id).parentNode.removeChild($(this.mark.id));
}

function updatePointNode(cursor)
{
	cursor.x=Math.round(cursor.x/xgrid)*xgrid;
	cursor.y=Math.round(cursor.y/ygrid)*ygrid;
	switch (this.shape.type)
	{
		case "line":
			this.setNode(cursor);
			this.shape.draw();
			this.shape.setCorners();
		break
		case "arc":
		case "segment":
		case "sector":
			//all angles to be measured clockwise about centre from +ve x axis;
			var radius=this.shape.radius;
			var sY=this.shape.archeight/this.shape.arcwidth; // ratio of height of ellipse to radius			
			var node=this.shape.path.next;		
			while(node.point.x!="end")
			{
				node.translate(this.shape.arccentre.x,this.shape.arccentre.y); //put origin at arccentre
				node.scaleY(1/sY); //scale ellipse to circle				
				node=node.next;
			}
			var alpha=arctan((cursor.y-this.shape.arccentre.y)/sY,cursor.x-this.shape.arccentre.x);//angle cursor makes
			var p=new Point(radius*Math.cos(alpha),radius*Math.sin(alpha));//point cursor would be at on circumference of circle
			this.setNode(p); //put current node on circle C using point found from cursor			
			var startAngle=this.shape.path.next.getAngle(); //find angle of first node in node list between 0 and 2PI
			switch (this.shape.type)
			{
				case "arc":
					var arcend=this.shape.path.prev;
					var endAngle=this.shape.path.prev.getAngle();//find angle of last node on arc between 0 and 2PI
				break
				case "segment":
					var arcend=this.shape.path.prev.prev;
					var endAngle=this.shape.path.prev.prev.getAngle();//find angle of last node on arc between 0 and 2PI
				break
				case "sector":
					var arcend=this.shape.path.prev.prev.prev;
					var endAngle=this.shape.path.prev.prev.prev.getAngle();//find angle of last node on arc between 0 and 2PI
				break
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
			p=new Point(radius,0);// set right, bottom and left node for 0 degrees
			this.shape.bnode.setNode(p);
			this.shape.bnode.vertex="L";
			p=new Point(radius,0);
			this.shape.lnode.setNode(p);
			this.shape.lnode.vertex="L";
			p=new Point(radius,0);
			this.shape.tnode.setNode(p);
			this.shape.tnode.vertex="L"; 
			node=this.shape.path.next; //start node
			p=new Point(radius,0); //set start node on circle angle 0 degrees
			node.setNode(p);
			switch (this.shape.type)
			{
				case "segment":
				case "sector":
					var last=this.shape.path.prev;
					p=new Point(radius,0);
					last.setNode(p);
				break
			}
			if(Math.PI/2<theta && theta<=Math.PI)
			{
				phi=Math.PI/2;
				p=new Point(0,radius); //set node on circle at 90 degrees
				var c1=new Point(radius,radius*K);
				var c2=new Point(radius*K,radius);
				this.shape.tnode.setNode(p,c1,c2);
			}
			if(Math.PI<theta && theta<=3*Math.PI/2)
			{
				phi=Math.PI;
				p=new Point(0,radius); //set node on circle at 90 degrees
				var c1=new Point(radius,radius*K);
				var c2=new Point(radius*K,radius);
				this.shape.lnode.setNode(p,c1,c2);
				p=new Point(-radius,0); //set node on circle at 180 degrees
				c1=new Point(-radius*K,radius);
				c2=new Point(-radius,radius*K);
				this.shape.tnode.setNode(p,c1,c2);	
			}
			if(theta>3*Math.PI/2)
			{
				phi=3*Math.PI/2;
				p=new Point(0,radius); //set node on circle at 90 degrees
				var c1=new Point(radius,radius*K);
				var c2=new Point(radius*K,radius);
				this.shape.bnode.setNode(p,c1,c2);
				p=new Point(-radius,0); //set node on circle at 180 degrees
				c1=new Point(-radius*K,radius);
				c2=new Point(-radius,radius*K);
				this.shape.lnode.setNode(p,c1,c2);
				p=new Point(0,-radius); // set node on circle at 270 degrees
				c1=new Point(-radius,-radius*K);
				c2=new Point(-radius*K,-radius);
				this.shape.tnode.setNode(p,c1,c2);
			}
			var psi=theta-phi;
			var b=baseArcBez(radius,psi/2);
			arcend.setNode(b.p2,b.c1,b.c2);
			arcend.rotate(phi+psi/2);
			var node=this.shape.path.next;
			while(node.point.x!="end") //rotate to start angle, scale and translate back to correct position;
			{
				node.rotate(startAngle);
				node.scaleY(sY);
				node.translate(-this.shape.arccentre.x,-this.shape.arccentre.y);				
				node=node.next;
			}
			this.shape.draw();
			$(this.mark.id).style.left=(this.point.x-2)+"px";
			$(this.mark.id).style.top=(this.point.y-2)+"px";
			this.shape.setCorners();			
		break
		case "curve":
			var dx=cursor.x-this.point.x;
			var dy=cursor.y-this.point.y;
			var vertex;
			if(this.prev.point.x=="end")
			{
				var c1=new Point(this.next.ctrl1.x+dx,this.next.ctrl1.y+dy);
				this.setNode(cursor);
				vertex=this.next.vertex;
				this.next.setNode(this.next.point,c1,this.next.ctrl2);
				if(vertex=="B")
				{
					$(this.next.c1mark.id).style.left=(this.next.ctrl1.x-2)+"px";
					$(this.next.c1mark.id).style.top=(this.next.ctrl1.y-2)+"px";
				}
				else
				{
					this.next.vertex=vertex;
				}
			}
			else if(this.next.point.x!="end")
			{
				var c1=new Point(this.next.ctrl1.x+dx,this.next.ctrl1.y+dy);
				var c2=new Point(this.ctrl2.x+dx,this.ctrl2.y+dy);
				vertex=this.vertex;
				this.setNode(cursor,this.ctrl1,c2);
				if(vertex=="B")
				{
					$(this.c2mark.id).style.left=(this.ctrl2.x-2)+"px";
					$(this.c2mark.id).style.top=(this.ctrl2.y-2)+"px";
				}
				else
				{
					this.vertex=vertex;
				}
				vertex=this.next.vertex;
				this.next.setNode(this.next.point,c1,this.next.ctrl2);
				if(vertex=="B")
				{
					$(this.next.c1mark.id).style.left=(this.next.ctrl1.x-2)+"px";
					$(this.next.c1mark.id).style.top=(this.next.ctrl1.y-2)+"px";
				}
				else
				{
					this.next.vertex=vertex;
				}
			}
			else
			{
				var c2=new Point(this.ctrl2.x+dx,this.ctrl2.y+dy);
				vertex=this.vertex;
				this.setNode(cursor,this.ctrl1,c2);
				if(vertex=="B")
				{
					$(this.c2mark.id).style.left=(this.ctrl2.x-2)+"px";
					$(this.c2mark.id).style.top=(this.ctrl2.y-2)+"px";
				}
				else
				{
					this.vertex=vertex;
				}
			}
			this.shape.draw();
			this.shape.drawBezGuides();
			if(!(this.shape.name.substr(0,8)=="NodePath"))
			{
				this.shape.setCorners();
			}
		break
		case "freeform":
			var dx=cursor.x-this.point.x;
			var dy=cursor.y-this.point.y;
			var vertex=this.vertex;
			if(this.next.point.x!="end")
			{
				var c1=new Point(this.next.ctrl1.x+dx,this.next.ctrl1.y+dy);
				var c2=new Point(this.ctrl2.x+dx,this.ctrl2.y+dy);
				this.setNode(cursor,this.ctrl1,c2);
				if(vertex=="B")
				{
					$(this.c2mark.id).style.left=(this.ctrl2.x-2)+"px";
					$(this.c2mark.id).style.top=(this.ctrl2.y-2)+"px";
					
				}
				else
				{
					this.vertex=vertex;
				}
				vertex=this.next.vertex;
				this.next.setNode(this.next.point,c1,this.next.ctrl2);
				if(vertex=="B")
				{
					$(this.next.c1mark.id).style.left=(this.next.ctrl1.x-2)+"px";
					$(this.next.c1mark.id).style.top=(this.next.ctrl1.y-2)+"px";
				}
				else
				{
					this.next.vertex=vertex;
				}
			}
			else
			{
				var c2=new Point(this.ctrl2.x+dx,this.ctrl2.y+dy);
				var vertex=this.vertex;
				this.setNode(cursor,this.ctrl1,c2);
				if(vertex=="B")
				{
					$(this.c2mark.id).style.left=(this.ctrl2.x-2)+"px";
					$(this.c2mark.id).style.top=(this.ctrl2.y-2)+"px";
				}
				else
				{
					this.vertex=vertex;
				}
				this.shape.path.next.setNode(cursor);
				var c1=new Point(this.shape.path.next.next.ctrl1.x+dx,this.shape.path.next.next.ctrl1.y+dy);
				vertex=this.shape.path.next.next.vertex;
				this.shape.path.next.next.setNode(this.shape.path.next.next.point,c1,this.shape.path.next.next.ctrl2);
				if(vertex=="B")
				{
					$(this.shape.path.next.next.c1mark.id).style.left=(this.shape.path.next.next.ctrl1.x-2)+"px";
					$(this.shape.path.next.next.c1mark.id).style.top=(this.shape.path.next.next.ctrl1.y-2)+"px";
				}
				else
				{
					this.shape.path.next.next.vertex=vertex;
				}
			}
			this.shape.draw();
			this.shape.drawBezGuides();
			this.shape.setCorners();
		break
		case "rounded_rectangle":		
			var start=this.shape.path.next; 			
			this.mark.style.top=(start.point.y-2)+"px";
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
				this.mark.style.left=(start.point.x-4)+"px";
			}
			this.shape.setRndRect();
			this.shape.draw();
		break
	}
	if(TWEENEDIT)
	{
		var l=this.shape.name.substr(0,1).toUpperCase();
		if(this.shape.type=="rounded_rectangle" || this.shape.type=="arc" || this.shape.type=="segment" || this.shape.type=="sector")
		{
			CURRENTTWEEN.edit.active=true;
			CURRENTTWEEN.setTweenTimeBox();
		}
		else if(l=="A" || l=="B")
		{
			CURRENTTWEEN.nodeTweening.active=true;
			CURRENTTWEEN.pointTweening=true;
			CURRENTTWEEN.setTweenTimeBox();
		}
	}
}

function addCtrl1Mark() 
{ 
   	if(this.ctrl1.x=="non") {return}
   	this.c1mark = document.createElement('div');
   	this.c1mark.node=this;
   	this.c1mark.id="mark"+(MCOUNT++);
   	this.c1mark.style.left= (this.ctrl1.x-2)+"px"; 
   	this.c1mark.style.top= (this.ctrl1.y-2)+"px";
   	this.c1mark.style.fontSize=0;
   	this.c1mark.style.width=4+"px";
   	this.c1mark.style.height=4+"px";
   	this.c1mark.style.border="solid red 1px";
   	this.c1mark.style.backgroundColor="white";
   	this.c1mark.style.cursor='move';
   	this.c1mark.innerHTML=MCOUNT-1;
   	
	this.c1mark.onmouseover=function(){
										$("markerdrop").onclick=function(e) {noBubble(e)};
									};
   this.c1mark.onmouseout=function(){
	   									$("markerdrop").onclick=function(e) {
	   																			noBubble(e);
	   																			clear($("markerdrop"));
	   																			BACKDROP.Canvas.ctx.clearRect(0,0,SCRW,SCRH);
	   																			$("backstage").style.visibility="hidden";
	   																			checkBoundary(shiftdown(e),getPosition(e));
	   																		}
									};	
	this.dragc1m=new YAHOO.util.DD(this.c1mark.id);
	this.dragc1m.onDrag=function(e){$(this.id).node.updateCtrl1Node(getPosition(e))};							
   	$("markerdrop").appendChild(this.c1mark);
}
    
function addCtrl2Mark() 
{
   	if(this.ctrl2.x=="non") {return}
   	this.c2mark = document.createElement('div');
   	this.c2mark.node=this;
   	this.c2mark.id="mark"+(MCOUNT++);
   	this.c2mark.style.left= (this.ctrl2.x-2)+"px"; 
   	this.c2mark.style.top= (this.ctrl2.y-2)+"px";
   	this.c2mark.style.fontSize=0;
   	this.c2mark.style.width=4+"px";
   	this.c2mark.style.height=4+"px";
   	this.c2mark.style.border="solid red 1px";
   	this.c2mark.style.backgroundColor="white";
   	this.c2mark.style.cursor='move';
   	this.c2mark.innerHTML=MCOUNT-1;
 
	this.c2mark.onmouseover=function(){
										$("markerdrop").onclick=function(e) {noBubble(e)};
									};
   this.c2mark.onmouseout=function(){
	   									$("markerdrop").onclick=function(e) {
	   																			noBubble(e);
	   																			//$("markerdrop").style.visibility="hidden";
	   																			clear($("markerdrop"));
	   																			$("backstage").style.visibility="hidden";
	   																			BACKDROP.Canvas.ctx.clearRect(0,0,SCRW,SCRH);
	   																			checkBoundary(shiftdown(e),getPosition(e));
	   																		}
									};

	this.dragc2m=new YAHOO.util.DD(this.c2mark.id);
	this.dragc2m.onDrag=function(e){$(this.id).node.updateCtrl2Node(getPosition(e))};							
   	$("markerdrop").appendChild(this.c2mark);
}

function addFullMarks()
{
	this.addPointMark();
	this.addCtrl1Mark();
	this.addCtrl2Mark();
}

function updateCtrl1Node(cursor)
{
	//cursor.x=Math.round(cursor.x/xgrid)*xgrid;
	//cursor.y=Math.round(cursor.y/ygrid)*ygrid;
	var c1=new Point(cursor.x,cursor.y);
	this.setNode(this.point,c1,this.ctrl2);
	if(this.shape.type=="freeform" && this.prev.prev.point.x=="end")
	{
		var prevnode=this.prev.prev.prev;
	}
	else
	{
		var prevnode=this.prev;
	}
	if(prevnode.corner!="corner")
	{
		if(prevnode.corner=="smooth")
		{
			var c2=new Point(prevnode.point.x-(this.ctrl1.x-prevnode.point.x),prevnode.point.y-(this.ctrl1.y-prevnode.point.y));
		}
		else if(prevnode.corner=="inline")
		{
			var nl1=Math.sqrt((this.ctrl1.x-prevnode.point.x)*(this.ctrl1.x-prevnode.point.x)+(this.ctrl1.y-prevnode.point.y)*(this.ctrl1.y-prevnode.point.y));
			var nl2=Math.sqrt((prevnode.ctrl2.x-prevnode.point.x)*(prevnode.ctrl2.x-prevnode.point.x)+(prevnode.ctrl2.y-prevnode.point.y)*(prevnode.ctrl2.y-prevnode.point.y));
			var c2=new Point(prevnode.point.x-(this.ctrl1.x-prevnode.point.x)*nl2/nl1,prevnode.point.y-(this.ctrl1.y-prevnode.point.y)*nl2/nl1);
		}
		prevnode.setNode(prevnode.point,prevnode.ctrl1,c2);
		prevnode.c2mark.style.top=(prevnode.ctrl2.y-2)+"px";
		prevnode.c2mark.style.left=(prevnode.ctrl2.x-2)+"px";
	}
	this.shape.draw();
	this.shape.drawBezGuides();
	if(!(this.shape.name.substr(0,8)=="NodePath"))
	{
		this.shape.setCorners();
	}
	if(TWEENEDIT)
	{
		var l=this.shape.name.substr(0,1).toUpperCase();
		if(l=="A" || l=="B")
		{
			CURRENTTWEEN.nodeTweening.active=true;
			CURRENTTWEEN.pointTweening=true;
			CURRENTTWEEN.setTweenTimeBox();
		}
	}
}

function updateCtrl2Node(cursor)
{
	//cursor.x=Math.round(cursor.x/xgrid)*xgrid;
	//cursor.y=Math.round(cursor.y/ygrid)*ygrid;
	var c2=new Point(cursor.x,cursor.y);
	this.setNode(this.point,this.ctrl1,c2);
	var nextnode=this.next;
	if(this.corner!="corner")
	{
		if(this.next.point.x=="end")
		{
			if(this.shape.type=="freeform")
			{
				nextnode=this.next.next.next;
			}
			else //type curve
			{
				nextnode="none"
			}
		}
		if(nextnode!="none")
		{
			if(this.corner=="smooth")
			{
				var c1=new Point(this.point.x-(this.ctrl2.x-this.point.x),this.point.y-(this.ctrl2.y-this.point.y));
			}
			else if(this.corner=="inline")
			{
				var nl1=Math.sqrt((nextnode.ctrl1.x-this.point.x)*(nextnode.ctrl1.x-this.point.x)+(nextnode.ctrl1.y-this.point.y)*(nextnode.ctrl1.y-this.point.y));
				var nl2=Math.sqrt((this.ctrl2.x-this.point.x)*(this.ctrl2.x-this.point.x)+(this.ctrl2.y-this.point.y)*(this.ctrl2.y-this.point.y));
				var c1=new Point(this.point.x-(this.ctrl2.x-this.point.x)*nl1/nl2,this.point.y-(this.ctrl2.y-this.point.y)*nl1/nl2);
			}

			nextnode.setNode(nextnode.point,c1,nextnode.ctrl2);
			nextnode.c1mark.style.top=(nextnode.ctrl1.y-2)+"px";
			nextnode.c1mark.style.left=(nextnode.ctrl1.x-2)+"px";
		}
	}
	this.shape.draw();
	this.shape.drawBezGuides();
	if(!(this.shape.name.substr(0,8)=="NodePath"))
	{
		this.shape.setCorners();
	}
	if(TWEENEDIT)
	{
		var l=this.shape.name.substr(0,1).toUpperCase();
		if(l=="A" || l=="B")
		{
			CURRENTTWEEN.nodeTweening.active=true;
			CURRENTTWEEN.pointTweening=true;
			CURRENTTWEEN.setTweenTimeBox();
		}
	}
}

