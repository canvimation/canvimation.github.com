/*ursor.xodsg...ode.
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

function Point(x,y)
{
	this.x=x;
	this.y=y;
}

function Node(point,ctrl1,ctrl2) 
{
	this.point=point;
	if (arguments.length>1)
	{
		this.ctrl1=ctrl1;
		this.ctrl2=ctrl2;
		this.type="corner";
	}
	else
	{
		this.ctrl1=new Point("non","non");
		this.ctrl2=new Point("non","non");
	}
	this.next="";
	this.prev="";
	this.shape;
	
	//methods
	this.setNode=setNode;
	this.addPointMark=addPointMark;
	this.addCtrl1Mark=addCtrl1Mark;
	this.addCtrl2Mark=addCtrl2Mark;
	this.addFullMarks=addFullMarks;
	this.removeMark=removeMark;
	this.updatePointNode=updatePointNode;
	this.updateCtrl1Node=updateCtrl1Node;
	this.updateCtrl2Node=updateCtrl2Node;
	this.insertNodeBefore=insertNodeBefore;
	this.removeNode=removeNode;
	this.restoreNode=restoreNode;
	this.getAngle=getAngle;
	this.getAngleTo=getAngleTo;
	this.rotate=rotate;
	this.scaleY=scaleY;
	this.translate=translate;
	this.copyNodeTo=copyNodeTo;
	//this.remMark=remMark; //remove marks;
}

function setNode(point,ctrl1,ctrl2)
{
	this.point.x=point.x;
	this.point.y=point.y;
	if (arguments.length>1)
	{
		this.ctrl1.x=ctrl1.x;
		this.ctrl1.y=ctrl1.y;
		this.ctrl2.x=ctrl2.x;
		this.ctrl2.y=ctrl2.y;
	}
}

function copyNodeTo(node)
{
	node.point.x=this.point.x;
	node.point.y=this.point.y;
	node.ctrl1.x=this.ctrl1.x;
	node.ctrl1.y=this.ctrl1.y;
	node.ctrl2.x=this.ctrl2.x;
	node.ctrl2.y=this.ctrl2.y;
	node.shape=this.shape;
}

function insertNodeBefore(node)
{
	node.prev=this.prev;
	node.next=this;
	this.prev.next=node;
	this.prev=node;
}

function removeNode()
{
	this.prev.next=this.next;
	this.next.prev=this.prev;
}

function restoreNode()
{
	this.prev.next=this;
	this.next.prev=this;
}

function getAngle() //angle from current centre
{
	return arctan(this.point.y,this.point.x);
	//$("msg").innerHTML=theta;
	
}

function getAngleTo(node)  //relative to current centre
{
	var theta = node.getAngle()-this.getAngle();
	if(theta<0)
	{
		theta+=2*Math.PI;
	}
	return theta;
}

function rotate(theta) //about centre
{
	
	var px=this.point.x*Math.cos(theta)-this.point.y*Math.sin(theta);
	var py=this.point.x*Math.sin(theta)+this.point.y*Math.cos(theta);
	this.point.x=px;
	this.point.y=py;
	if(this.ctrl1.x!="non")
	{
		var c1x=this.ctrl1.x*Math.cos(theta)-this.ctrl1.y*Math.sin(theta);
		var c1y=this.ctrl1.x*Math.sin(theta)+this.ctrl1.y*Math.cos(theta);
		var c2x=this.ctrl2.x*Math.cos(theta)-this.ctrl2.y*Math.sin(theta);
		var c2y=this.ctrl2.x*Math.sin(theta)+this.ctrl2.y*Math.cos(theta);
		this.ctrl1.x=c1x;
		this.ctrl1.y=c1y;
		this.ctrl2.x=c2x;
		this.ctrl2.y=c2y;
	}
}

function scaleY(s)
{
	this.point.y=s*this.point.y;
	if(this.ctrl1.x!="non")
	{
		this.ctrl1.y=s*this.ctrl1.y;
		this.ctrl2.y=s*this.ctrl2.y;
	}
}

function translate(x,y)
{
	this.point.x-=x;
	this.point.y-=y;
	if(this.ctrl1.x!="non")
	{
		this.ctrl1.x-=x;
		this.ctrl1.y-=y;
		this.ctrl2.x-=x;
		this.ctrl2.y-=y;
	}
}

function Shape(name,open,editable,type) 
{
   	this.name=name;
   	this.open=open;
   	this.editable=editable;
   	this.type=type;
   	this.psuid=this.id;
   	this.tplftcrnr; //coordinates of top left of boundary box;
   	this.btmrgtcrnr; //coordinates of bottom right of boundary box;
   	this.scleft=90;
   	this.sctop=90;
   	this.scx=1;
   	this.scy=1;
   	this.sox=0;
   	this.soy=0;
   	this.ox=0;
   	this.oy=0;
   	this.cx=0;
   	this.cy=0;
   	this.rr=100;
   	this.phi=0;
   	this.rotated=false;
   	this.ratio=this.bheight/this.bwidth;
   	this.strokeStyle=[0,0,0,1];
   	this.fillStyle=[255,255,255,1];
   	this.lineWidth = 1;
   	this.lineCap = "butt";
   	this.lineJoin = "miter"
   	this.justfill=true;
   	this.linearfill=true;
   	this.lineGrad=[0,0,0,0];
   	this.radGrad=[0,0,0,0,10,10];
   	this.colorStops=[[0,0,0,0,0],[1,0,0,0,0]];
   	this.stopn=0;
   	this.shadow=false;
   	this.shadowOffsetX = 15;   
   	this.shadowOffsetY = 15;   
   	this.shadowBlur = 0;   
   	this.shadowColor = [0, 0, 0, 0];
   	this.ScaleX=1;
   	this.ScaleY=1;
   	this.zIndex=ZPOS++;
   	this.rotate=0;
   	this.clockw=true;
   	this.complete=false;
   	this.group=[];
   	this.boundary='empty';
   	this.beztypes=[];
   	this.crnradius=10;
   	var p=new Point("end","end");
   	this.path=new Node(p);
   	this.path.next=this.path;
   	this.path.prev=this.path;
 	//this.path=this.head;
   	
   	SHAPES[this.name]=this;
   	
   	//methods
   	this.createBoundary=createBoundary;
   	this.removeBoundary=removeBoundary;
   	this.addTo=addTo;
   	this.getTop=getTop;
   	this.getLeft=getLeft;
   	this.setPath=setPath;
   	this.addNode=addNode;
   	this.draw=draw;
   	this.drawGuide=drawGuide;
   	this.drawEnd=drawEnd;
   	this.drawNext=drawNext;
   	this.drawBezGuides=drawBezGuides;
   	return this;
   	
}

function addNode(node)
{
	var path=this.path;
	node.next=path;
	node.prev=path.prev;
	path.prev.next=node;
	path.prev=node;
	node.shape=this;
}

function addTo(theatre)
{
	this.Canvas = document.createElement('canvas');
   	this.Canvas.style.position='absolute';
   	this.Canvas.style.left=0; 
   	this.Canvas.style.top= 0;
   	this.Canvas.width=SCRW;
   	this.Canvas.height=SCRH;
   	this.Canvas.style.zIndex=this.zIndex;
   	theatre.appendChild(this.Canvas);
   	if (ieb) {this.Canvas=G_vmlCanvasManager.initElement(this.Canvas)}
   	if (this.Canvas.getContext)
	{
        this.Canvas.ctx = this.Canvas.getContext('2d');
    }
}


function getTop()
{
	return parseInt(this.style.top);
}

function getLeft()
{
	return parseInt(this.style.left);
}

function setPath(cursor)
{
	var point=new Point(Math.round(cursor.x/xgrid)*xgrid,Math.round(cursor.y/ygrid)*ygrid);
	var node=new Node(point); 
	this.addNode(node);
	this.tplftcrnr=new Point(node.point.x,node.point.y);
	this.btmrgtcrnr=new Point(node.point.x,node.point.y);
	var curshape=this;
	BODY.onmousemove=function(e) {curshape.drawGuide(getPosition(e))};
	BODY.onmousedown=function() {};
	if (!(this.type=="curve" || this.type=="freeform"))
	{
		BODY.onmouseup=function(e) {curshape.drawEnd(getPosition(e))};
	}	
	switch (this.type)
	{
		case "line":
			point=new Point(Math.round(cursor.x/xgrid)*xgrid,Math.round((cursor.y)/ygrid)*ygrid);
			node=new Node(point);
			this.addNode(node);
		break
		case "arc":
		case "segment":
		case "sector":
			point=new Point(Math.round(cursor.x/xgrid)*xgrid,Math.round((cursor.y)/ygrid)*ygrid);
			node=new Node(point);
			this.addNode(node);
			if(this.type=="sector")
			{
				point=new Point(Math.round(cursor.x/xgrid)*xgrid,Math.round((cursor.y)/ygrid)*ygrid);
				node=new Node(point);
				this.addNode(node);
			}
		break	
		case "curve":
		case "freeform":
			var start=this.path.next;
			point=new Point(Math.round(cursor.x/xgrid)*xgrid,Math.round((cursor.y)/ygrid)*ygrid);
			var ctrl1=new Point(start.point.x+(point.x-start.point.x)/4, start.point.y+(point.y-start.point.y)/4);
			var ctrl2=new Point(point.x+(start.point.x-point.x)/4, point.y+(start.point.y-point.y)/4);
			node=new Node(point,ctrl1,ctrl2);
			this.addNode(node);
			BODY.onmousedown=function(e) {if(shiftdown(e)){curshape.drawEnd(getPosition(e))} else{curshape.drawNext(getPosition(e))}};
			//BODY.onmouseup=function(e) {};
			//BODY.ondblclick=function(e) {curshape.drawEnd(getPosition(e))};
		break
		case "rectangle":
			for(var i=0;i<3;i++)
			{
				point=new Point(Math.round(cursor.x/xgrid)*xgrid,Math.round((cursor.y)/ygrid)*ygrid);
				node=new Node(point);
				this.addNode(node);
			}
		break
		case "ellipse":
			for(var i=0;i<4;i++)
			{
				point=new Point(Math.round(cursor.x/xgrid)*xgrid,Math.round((cursor.y)/ygrid)*ygrid);
				node=new Node(point);
				this.addNode(node);
			}
		break
		case "rounded_rectangle":
			for(var i=0;i<8;i++)
			{
				point=new Point(Math.round(cursor.x/xgrid)*xgrid,Math.round((cursor.y)/ygrid)*ygrid);
				node=new Node(point);
				this.addNode(node);
			}
		break
		case "triangle":
			for(var i=0;i<2;i++)
			{
				point=new Point(Math.round(cursor.x/xgrid)*xgrid,Math.round((cursor.y)/ygrid)*ygrid);
				node=new Node(point);
				this.addNode(node);
			}
		break
		case "right_triangle":
			for(var i=0;i<2;i++)
			{
				point=new Point(Math.round(cursor.x/xgrid)*xgrid,Math.round((cursor.y)/ygrid)*ygrid);
				node=new Node(point);
				this.addNode(node);
			}
		break
	}
	
}

function drawGuide(cursor)
{
	cursor.x=Math.round(cursor.x/xgrid)*xgrid;
	cursor.y=Math.round(cursor.y/ygrid)*ygrid;
	this.btmrgtcrnr.x=cursor.x;
	this.btmrgtcrnr.y=cursor.y; 
	switch (this.type)
	{
		case "line":
			node=this.path.prev;
			node.setNode(cursor);
		break
		case "arc":
		case "segment":
		case "sector":
			var start=this.path.next;
			var lx=cursor.x-start.point.x;
			var ly=cursor.y-start.point.y;
			var c1=new Point(start.point.x+lx*K,start.point.y);
			var c2=new Point(start.next.point.x,start.next.point.y-ly*K);
			start.next.setNode(cursor,c1,c2);
			if(this.type=="sector")
			{
				var p=new Point(start.point.x,start.next.point.y);
				start.next.next.setNode(p);
			}
		break
		case "curve": 
		case "freeform":
			node=this.path.prev;
			node.setNode(cursor);
			var prev=node.prev;
			var ctrl1=new Point(prev.point.x+(node.point.x-prev.point.x)/4, prev.point.y+(node.point.y-prev.point.y)/4);
			var ctrl2=new Point(node.point.x+(prev.point.x-node.point.x)/4, node.point.y+(prev.point.y-node.point.y)/4);
			node.setNode(cursor,ctrl1,ctrl2);
		break
		case "rectangle":
			var start=this.path.next;
			var p=new Point(cursor.x,start.point.y);
			node=start.next;
			node.setNode(p);
			node=node.next;
			node.setNode(cursor);
			node=node.next;
			p.x=start.point.x;
			p.y=cursor.y;
			node.setNode(p);
		break
		case "ellipse":
			var lx=(cursor.x-this.tplftcrnr.x)/2;
			var ly=(cursor.y-this.tplftcrnr.y)/2;
			var midx=this.tplftcrnr.x+lx;
			var midy=this.tplftcrnr.y+ly;
			
			p=new Point(midx,this.tplftcrnr.y);
			var c1=new Point(p.x+lx*K,p.y);
			node=this.path.next;//top
			node.setNode(p); //top point
			node=node.next;//right
			
			p.x=cursor.x;
			p.y=midy;
			var c2=new Point(p.x,p.y-ly*K);
			node.setNode(p,c1,c2); //right point
			c1.x=p.x;
			c1.y=p.y+ly*K;
			
			p.x=midx;
			p.y=cursor.y;
			c2.x=p.x+lx*K;
			c2.y=p.y;
			node=node.next;//bottom
			node.setNode(p,c1,c2);  //bottom point
			c1.x=p.x-lx*K;
			c1.y=p.y;
			
			p.x=this.tplftcrnr.x;
			p.y=midy;
			c2.x=p.x;
			c2.y=p.y+ly*K;
			node=node.next;//left
			node.setNode(p,c1,c2); //left point
			c1.x=p.x;
			c1.y=p.y-ly*K;
			
			
			p.x=midx
			p.y=this.tplftcrnr.y;
			c2.x=p.x-lx*K;
			c2.y=p.y;
			node=node.next;//top
			node.setNode(p,c1,c2);//back at top
		break
		case "rounded_rectangle":
			this.setRndRect=setRndRect;
			this.setRndRect();
		break
		case "triangle":
			var start=this.path.next;  
			p=new Point(cursor.x,cursor.y);
			node=start.next;
			node.setNode(p);   
			var dx=cursor.x-start.point.x;
			p.x=start.point.x-dx; 
			node=node.next;
			node.setNode(p);
		break
		case "right_triangle":
			var start=this.path.next;  
			p=new Point(cursor.x,cursor.y);
			node=start.next;
			node.setNode(p);   
			p.x=start.point.x; 
			node=node.next;
			node.setNode(p);
		break
	}
	this.draw();
}

function drawNext(cursor)
{
	cursor.x=Math.round(cursor.x/xgrid)*xgrid;
	cursor.y=Math.round(cursor.y/ygrid)*ygrid; 
	this.path.prev.setNode(cursor);
	//this.path.prev.addFullMarks();
	var node=new Node(cursor);
	this.addNode(node);
}


function drawEnd(cursor)
{
	cursor.x=Math.round(cursor.x/xgrid)*xgrid;
	cursor.y=Math.round(cursor.y/ygrid)*ygrid;
	this.btmrgtcrnr=cursor;

	if (this.editable) 
	{
		$("markerdrop").style.visibility="visible";	
		var node=this.path.next;
		node.addPointMark();
		node=node.next;
	};
	BODY.style.cursor="default";
	BODY.onmousemove=function() {};
	BODY.onmouseup=function() {};
	switch (this.type)
	{
		case "line":
			node.addPointMark();
		break
		case "arc":
		case "segment":
		case "sector":
			node.addPointMark();
			this.arcwidth=this.btmrgtcrnr.x-this.tplftcrnr.x;
			this.archeight=this.btmrgtcrnr.y-this.tplftcrnr.y;
			this.arccentre=new Point(this.tplftcrnr.x,this.btmrgtcrnr.y);
			var start=this.path.next;
			var last=this.path.prev;
			if(this.type=="sector")
			{
				last.setNode(this.arccentre);
				last=last.prev;
			}
			if(this.arcwidth*this.archeight<0)//swap nodes so that going clockwise start node is before last node
			{
				this.arcwidth=Math.abs(this.arcwidth);
				this.archeight=Math.abs(this.archeight);
				
				var sp=new Point(last.point.x,last.point.y);
				var lp=new Point(start.point.x,start.point.y);
				var cs1=new Point(last.ctrl2.x,last.ctrl2.y);
				var cs2=new Point(last.ctrl1.x,last.ctrl1.y);
				start.setNode(sp);
				last.setNode(lp,cs1,cs2);
				start.removeMark();
				last.removeMark(0);
				start.addPointMark();
				last.addPointMark();				
			}
			point=new Point(0,0);
			this.bnode=new Node(point);//node for 90 degrees
			last.insertNodeBefore(this.bnode);
			point=new Point(0,0);
			this.lnode=new Node(point);//node for 180 degrees
			last.insertNodeBefore(this.lnode);
			point=new Point(0,0);
			this.tnode=new Node(point);//node for 270 degrees
			last.insertNodeBefore(this.tnode);
			this.bnode.removeNode();//remove bottom, left and top node as first arc is between 0 an 90 degrees
			this.lnode.removeNode();//will be restored as and when needed
			this.tnode.removeNode();
			this.arcwidth=Math.abs(this.arcwidth);//possibility of both being negative
			this.archeight=Math.abs(this.archeight);
		break
		case "freeform":
			var last=this.path.prev;
			node=this.path.next;
			var ctrl2=new Point(node.point.x+(last.point.x-node.point.x)/4, node.point.y+(last.point.y-node.point.y)/4);
			var ctrl1=new Point(last.point.x+(node.point.x-last.point.x)/4, last.point.y+(node.point.y-last.point.y)/4);
			var closenode= new Node(node.point,ctrl1,ctrl2);
			this.addNode(closenode);
			node.removeMark();
			node=node.next;
			while(node.point.x != "end")
			{
				node.addFullMarks();
				node=node.next;  
			}this.draw();
			this.drawBezGuides();
		break
		case "curve": 
			node=this.path.next;
			node.removeMark();
			while(node.point.x != "end")
			{
				node.addFullMarks();
				node=node.next;  
			}this.draw();
			this.drawBezGuides();
		break
		case "triangle":
			this.tplftcrnr.x -= cursor.x-this.tplftcrnr.x;
		break
	}
}

function setRndRect() //bottom right corner
{
	var bwidth=this.btmrgtcrnr.x-this.tplftcrnr.x;
	var bheight=this.btmrgtcrnr.y-this.tplftcrnr.y;
	var dx=bwidth/Math.abs(bwidth);
	var dy=bheight/Math.abs(bheight);
	if (Math.abs(bwidth)<20)
	{
		this.btmrgtcrnr.x=this.tplftcrnr.x+20*dx;
		bwidth=this.btmrgtcrnr.x-this.tplftcrnr.x;
	}
	if (Math.abs(bheight)<20)
	{
		this.btmrgtcrnr.y=this.tplftcrnr.y+20 *dy;
		bheight=this.btmrgtcrnr.y-this.tplftcrnr.y;
	}
	var brc=this.btmrgtcrnr;
	var start=this.path.next;
	p=new Point(this.tplftcrnr.x+this.crnradius*dx,this.tplftcrnr.y);
	start.setNode(p);// top left
	node=start.next;
	p.x=brc.x-this.crnradius*dx;
	p.y=start.point.y;
	node.setNode(p);// top right
	var c1=new Point(p.x+this.crnradius*dx*K,p.y);
	p.x=brc.x;
	p.y+=this.crnradius*dy;
	var c2=new Point(p.x,p.y-this.crnradius*dy*K);
	node=node.next;
	node.setNode(p,c1,c2);//right top
	p.y=brc.y-this.crnradius*dy;
	node=node.next;
	node.setNode(p);//right bottom
	c1.x=p.x;
	c1.y=p.y+this.crnradius*dy*K;
	p.x=brc.x-this.crnradius*dx;
	p.y=brc.y;
	c2.x=p.x+this.crnradius*dx*K;
	c2.y=p.y;
	node=node.next;
	node.setNode(p,c1,c2);//bottom right
	p.x=start.point.x;
	node=node.next;
	node.setNode(p);//bottom left
	c1.x=p.x-this.crnradius*dx*K;
	c1.y=p.y;
	p.x=this.tplftcrnr.x
	p.y=p.y-this.crnradius*dy;
	c2.x=p.x;
	c2.y=p.y+this.crnradius*dy*K;
	node=node.next;
	node.setNode(p,c1,c2);//left bottom
	p.y=start.point.y+this.crnradius*dy;
	node=node.next;
	node.setNode(p);//left top
	c1.x=p.x;
	c1.y=p.y-this.crnradius*dy*K;
	p.x=start.point.x;
	p.y=start.point.y;
	c2.x=p.x-this.crnradius*dx*K;
	c2.y=p.y;
	node=node.next;
	node.setNode(p,c1,c2);//top left again	
}

function baseArcBez(radius,theta) // theta half angle subtending arc <90 degrees  ref http://www.tinaja.com/glib/bezcirc2.pdf
{
	var x1=Math.cos(theta);
	var y1=-Math.sin(theta);
	var x2=x1;
	var y2=-y1;
	var cx1=radius*(4-x1)/3;
	var cy1=radius*(1-x1)*(3-x1)/(3*y1);
	var cx2=cx1;
	var cy2=-cy1;
	var p1=new Point(x1*radius,y1*radius);
	var p2=new Point(x2*radius,y2*radius);
	var c1=new Point(cx1,cy1);
	var c2=new Point(cx2,cy2);
	return {p1:p1,p2:p2,c1:c1,c2:c2}
}

 


function arctan(y,x)
{
	if(x==0)
	{
		if(y>0) 
		{
			return Math.PI/2;
		}
		else
		{
			return 3*Math.PI/2;
		}
	}
	
	if(y==0)
	{
		if(x>0)
		{
			return 0;
		}
		else
		{
			return Math.PI;
		}
	}
		
	var theta = Math.atan(Math.abs(y/x));
	
	if (x>0)
	{
		if (y<0) {theta = 2*Math.PI-theta};
	}
	else
	{
		if (y>0)
		{
			theta = Math.PI-theta;
		}
		else
		{
			theta += Math.PI;
		}
	}
	return theta;
}

//old functions 


function getmaxmin(C)//C a canvas path
{
	var s=100;
	var ang;
	var x,xs,xe,xc1,xc2;
	var y,ys,ye,yc1,yc2;
	mxx=C[3][1];
	mnx=C[3][1];
	mxy=C[3][2];
	mny=C[3][2];
	for (var i=4; i<C.length;i++)
	{
		if (C[i][0] == 'L' || C[i][0] == 'M')
		{
			if (C[i][1]>mxx) {mxx=C[i][1]};
			if (C[i][1]<mnx) {mnx=C[i][1]};
			if (C[i][2]>mxy) {mxy=C[i][2]};
			if (C[i][2]<mny) {mny=C[i][2]};
		}
		else
		{
			if (C[i-1][0] == 'B')
			{
				xs = C[i-1][5];
				ys = C[i-1][6];
			}
			else
			{
				xs = C[i-1][1];
				ys = C[i-1][2];
			}
			xe = C[i][5];
			xc1 = C[i][1];
			xc2 = C[i][3];
			ye = C[i][6];
			yc1 = C[i][2];
			yc2 = C[i][4];
			for (var j=0;j<=s; j++)
			{	
				t=j/s;			
				x = (1-t)*(1-t)*(1-t)*xs + 3*(1-t)*(1-t)*t*xc1 + 3*(1-t)*t*t*xc2 + t*t*t*xe;
				y = (1-t)*(1-t)*(1-t)*ys + 3*(1-t)*(1-t)*t*yc1 + 3*(1-t)*t*t*yc2 + t*t*t*ye;
				if (x>mxx) {mxx=x};
				if (x<mnx) {mnx=x};
				if (y>mxy) {mxy=y};
				if (y<mny) {mny=y};
			}
		}
	}
	return {mxx:mxx, mnx:mnx, mxy:mxy, mny:mny};
}

function showtools(canv)
{
	$('stylelines').style.visibility='visible';
	$('collines').style.visibility='visible';
	$('rotate').style.visibility='visible';
	$('front').style.visibility='visible';
	$('back').style.visibility='visible';
	$('del').style.visibility='visible';
	$('copy').style.visibility='visible';
	$('vert').style.visibility='visible';
	$('horz').style.visibility='visible';
	if (canv.path[0]=='closed')
	{
		$('colfill').style.visibility='visible';
		$('gradfill').style.visibility='visible';
		$('shadow').style.visibility='visible';	
	}
}

       


