/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

function Point(x,y)
{
	this.x=x;
	this.y=y;
	
	//methods
	this.pointRotate=pointRotate;
}

function pointRotate(theta)  //rotate p about origin through angle theta
{
	var px=this.x*Math.cos(theta)-this.y*Math.sin(theta);
	var py=this.x*Math.sin(theta)+this.y*Math.cos(theta);
	var p=new Point(px,py);
	return p;
}

function Node(point,ctrl1,ctrl2) 
{
	this.point=point;
	if (arguments.length>1)
	{
		this.ctrl1=ctrl1;
		this.ctrl2=ctrl2;
		this.vertex="B";
	}
	else
	{
		this.ctrl1=new Point("non","non");
		this.ctrl2=new Point("non","non");
		this.vertex="L";
	}
	this.corner="corner";
	this.next="";
	this.prev="";
	this.shape;
	
	//methods
	this.setNode=setNode;
	this.addFixedPointMark=addFixedPointMark;
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
	this.setNodePathBox=setNodePathBox;
	this.pathTweeningPoints=pathTweeningPoints;
	this.translateTweeningPoints=translateTweeningPoints;
	this.setCtrlPaths=setCtrlPaths;
	this.setCtrl1Path=setCtrl1Path;
	this.setCtrl2Path=setCtrl2Path;
	this.linearCtrl1Path=linearCtrl1Path;
	this.linearCtrl2Path=linearCtrl2Path;
	this.linx=linx;
	this.liny=liny;
	this.bezx=bezx;
	this.bezy=bezy;	
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
		this.vertex="B";
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
	node.vertex=this.vertex;
	node.corner=this.corner;
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

function rotate(theta) //about origin
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

function Shape(name,title,open,editable,type,STORE) 
{
   	this.title=title;
   	this.name=name;
   	this.open=open;
   	this.editable=editable;
   	this.type=type;
   	var p=new Point(0,0);
   	this.tplftcrnr=p; //coordinates of top left of boundary box;
   	p=new Point(0,0);
   	this.btmrgtcrnr=p; //coordinates of bottom right of boundary box;
   	this.strokeStyle=[0,0,0,1];
   	this.fillStyle=[255,255,255,1];
   	this.lineWidth = 1;
   	this.lineCap = "butt";
   	this.lineJoin = "miter"
   	this.justfill=true;  //ordinary fill when true;
   	this.linearfill=true; //linear when true, radial when false;
   	this.lineGrad=[0,0,0,0];
   	this.radGrad=[0,0,0,0,10,10];
   	this.colorStops=[[0,0,0,0,0],[1,0,0,0,0]];
   	this.stopn=0; //pointer to current stop point;
   	this.shadow=false;
   	this.shadowOffsetX = 15;   
   	this.shadowOffsetY = 15;   
   	this.shadowBlur = 0;   
   	this.shadowColor = [0, 0, 0, 0];
   	this.zIndex=0;
   	this.crnradius=10;
   	this.arccentre=new Point(0,0);
   	this.radius=10;
   	p=new Point("end","end");
   	this.path=new Node(p);
   	this.path.next=this.path;
   	this.path.prev=this.path;
   	this.group;
   	this.elType="_SHAPE";
   	
   	STORE[this.name]=this;
   	   	
   	//methods
   	this.addTo=addTo;
   	this.setPath=setPath;
   	this.addNode=addNode;
   	this.draw=draw;
   	this.drawGuide=drawGuide;
   	this.drawEnd=drawEnd;
   	this.drawNext=drawNext;
   	this.drawBezGuides=drawBezGuides;
   	this.setCorners=setCorners;
   	this.fixCorners=fixCorners;
   	this.inAgroup=inAgroup;
   	this.isOn=isOn;
   	this.isIn=isIn;
	this.addAllMarks=addAllMarks; 
	this.ShapeToText=ShapeToText; 
	this.drawjustpath=drawjustpath;
	this.shapeHTML=shapeHTML;
	this.pathshapeHTML=pathshapeHTML;
	this.shapeCode=shapeCode;
	this.pathshapeCode=pathshapeCode;
	this.getLengths=getLengths;
	this.setRndRect=setRndRect;	
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
   	this.Canvas.style.left=0+"px"; 
   	this.Canvas.style.top= 0+"px";  	
   	this.Canvas.width=SCRW;
   	this.Canvas.height=SCRH;	
   	this.Canvas.style.zIndex=this.zIndex;
   	theatre.appendChild(this.Canvas);
   	if (this.Canvas.getContext)
	{
        this.Canvas.ctx = this.Canvas.getContext('2d');
    }
    else
    {
    	this.Canvas=G_vmlCanvasManager.initElement(this.Canvas);
    	this.Canvas.ctx = this.Canvas.getContext('2d');
    }
    this.Canvas.shape=this;
}

function setPath(cursor)
{
	var point=new Point(Math.round(cursor.x/xgrid)*xgrid,Math.round(cursor.y/ygrid)*ygrid);
	var node=new Node(point); 
	this.addNode(node);
	this.tplftcrnr=new Point(node.point.x,node.point.y);
	this.btmrgtcrnr=new Point(node.point.x,node.point.y);
	var curshape=this;
	this.Canvas.onmousemove=function(e) {noBubble(e);this.shape.drawGuide(getPosition(e))};
	this.Canvas.onmousedown=function(e) {};
	if (!(this.type=="curve" || this.type=="freeform"))
	{
		this.Canvas.onmouseup=function(e) {this.shape.drawEnd(getPosition(e))};
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
			if(this.type=="sector"  || this.type=="segment")
			{
				point=new Point(Math.round(cursor.x/xgrid)*xgrid,Math.round((cursor.y)/ygrid)*ygrid);
				node=new Node(point);
				this.addNode(node);
			}
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
			var curshape=this;
			this.Canvas.onmousedown=function(e) {if(shiftdown(e)){this.shape.drawEnd(getPosition(e))} else{this.shape.drawNext(getPosition(e))}};
			document.onkeydown = function(e) {
    												e = e || window.event;
    												if (e.keyCode == 27) 
    												{
        												curshape.path.prev.removeNode();
        												curshape.drawEnd(getPosition(e));
    												}
												};
		break
		case "rectangle":
			for(var i=0;i<4;i++)
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
			for(var i=0;i<3;i++)
			{
				point=new Point(Math.round(cursor.x/xgrid)*xgrid,Math.round((cursor.y)/ygrid)*ygrid);
				node=new Node(point);
				this.addNode(node);
			}
		break
		case "right_triangle":
			for(var i=0;i<3;i++)
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
			node=node.next;
			p.x=start.point.x;
			p.y=start.point.y;
			node.setNode(p);
		break
		case "ellipse":
			var lx=(cursor.x-this.tplftcrnr.x)/2;
			var ly=(cursor.y-this.tplftcrnr.y)/2;
			var midx=this.tplftcrnr.x+lx;
			var midy=this.tplftcrnr.y+ly;
			
			var p=new Point(midx,this.tplftcrnr.y);
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
			node=node.next;
			p.x=start.point.x;
			p.y=start.point.y;
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
			node=node.next;
			p.x=start.point.x;
			p.y=start.point.y;
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
	var node=new Node(cursor);
	this.addNode(node);
}


function drawEnd(cursor)
{
	cursor.x=Math.round(cursor.x/xgrid)*xgrid;
	cursor.y=Math.round(cursor.y/ygrid)*ygrid;
	this.btmrgtcrnr=cursor;
	$("markerdrop").style.visibility="visible";
	if (this.editable) 
	{
			
		$("backstage").style.visibility="visible";
		var node=this.path.next;
		node.addPointMark();
		node=node.next;
	};
	this.Canvas.style.cursor="default";
	this.Canvas.onmousemove=function() {};
	this.Canvas.onmouseup=function() {};
	switch (this.type)
	{
		case "line":
			node.addPointMark();
			var start=this.path.next;
			var last=this.path.prev;
			this.tplftcrnr.x=Math.min(start.point.x,last.point.x);
			this.tplftcrnr.y=Math.min(start.point.y,last.point.y);
			this.btmrgtcrnr.x=Math.max(start.point.x,last.point.x);
			this.btmrgtcrnr.y=Math.max(start.point.y,last.point.y);
		break
		case "arc":
		case "segment":
		case "sector":
			node.addPointMark();
			this.arcwidth=this.btmrgtcrnr.x-this.tplftcrnr.x;
			this.archeight=this.btmrgtcrnr.y-this.tplftcrnr.y;
			this.arccentre=new Point(this.tplftcrnr.x,this.btmrgtcrnr.y);
			var start=this.path.next;
			var arcend=start.next;
			if(this.arcwidth*this.archeight<0)//swap nodes so that going clockwise start node is before last node
			{
				this.arcwidth=Math.abs(this.arcwidth);
				this.archeight=Math.abs(this.archeight);
				
				var sp=new Point(last.point.x,last.point.y);
				var lp=new Point(start.point.x,start.point.y);
				var cs1=new Point(last.ctrl2.x,last.ctrl2.y);
				var cs2=new Point(last.ctrl1.x,last.ctrl1.y);
				start.setNode(sp);
				arcend.setNode(lp,cs1,cs2);
				start.removeMark();
				arcend.removeMark(0);
				start.addPointMark();
				arcend.addPointMark();				
			}
			point=new Point(start.point.x,start.point.y);
			this.bnode=new Node(point);//node for 90 degrees
			arcend.insertNodeBefore(this.bnode);
			point=new Point(start.point.x,start.point.y);
			this.lnode=new Node(point);//node for 180 degrees
			arcend.insertNodeBefore(this.lnode);
			point=new Point(start.point.x,start.point.y);
			this.tnode=new Node(point);//node for 270 degrees
			arcend.insertNodeBefore(this.tnode);
			this.arcwidth=Math.abs(this.arcwidth);//possibility of both being negative
			this.archeight=Math.abs(this.archeight);
			this.radius=this.arcwidth;
			this.setCorners();			
		break
		case "freeform":
			var last=this.path.prev;
			node=this.path.next;
			var point=new Point(node.point.x,node.point.y);
			var ctrl2=new Point(node.point.x+(last.point.x-node.point.x)/4, node.point.y+(last.point.y-node.point.y)/4);
			var ctrl1=new Point(last.point.x+(node.point.x-last.point.x)/4, last.point.y+(node.point.y-last.point.y)/4);
			var closenode= new Node(point,ctrl1,ctrl2);
			this.addNode(closenode);
			node.removeMark();
			node=node.next;
			while(node.point.x != "end")
			{
				node.addFullMarks();
				node=node.next;  
			}
			this.draw();
			this.drawBezGuides();
			DEFAULTKEYDOWN;
			this.setCorners();
		break
		case "curve": 
			node=this.path.next;
			node.removeMark();
			while(node.point.x != "end")
			{
				node.addFullMarks();
				node=node.next;  
			}
			this.draw();
			this.drawBezGuides();
			DEFAULTKEYDOWN
			this.setCorners();
		break
		case "triangle":
			this.tplftcrnr.x -= cursor.x-this.tplftcrnr.x;
		break
	}
	this.fixCorners();
	this.group.left= this.tplftcrnr.x; 
   	this.group.top= this.tplftcrnr.y;
   	this.group.width=this.btmrgtcrnr.x-this.tplftcrnr.x;
   	this.group.height=this.btmrgtcrnr.y-this.tplftcrnr.y;
   	this.group.centreOfRotation.x=this.group.left+this.group.width/2;
   	this.group.centreOfRotation.y=this.group.top+this.group.height/2;
   	if(!this.editable)
   	{
   		$("boundarydrop").style.visibility="visible";
   		this.group.drawBoundary();
		SELECTED[this.group.name]=this.group;
		SELECTEDSHAPE=this;
		hideTools();
		showTools();
		setTools(false);
   	}  	
}

function setRndRect() //bottom right corner
{
	var RRwidth=this.btmrgtcrnr.x-this.tplftcrnr.x;
	var RRheight=this.btmrgtcrnr.y-this.tplftcrnr.y;
	var dx=RRwidth/Math.abs(RRwidth);
	var dy=RRheight/Math.abs(RRheight);
	if (Math.abs(RRwidth)<20)
	{
		this.btmrgtcrnr.x=this.tplftcrnr.x+20*dx;
		RRwidth=this.btmrgtcrnr.x-this.tplftcrnr.x;
	}
	if (Math.abs(RRheight)<20)
	{
		this.btmrgtcrnr.y=this.tplftcrnr.y+20 *dy;
		RRheight=this.btmrgtcrnr.y-this.tplftcrnr.y;
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

function arctan(y,x)  //returns angle of line from (0,0) to (x,y) from x axis 
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

function vecAdd(p1,p2)
{
	var p=new Point(p1.x+p2.x,p1.y+p2.y)
	return p;
}

function setCorners() //sets boundary for individual shapes;
{
   	var step=100;
   	var x,y;
   	node=this.path.next;
   	var mxx=node.point.x;
	var mnx=node.point.x;
	var mxy=node.point.y;
	var mny=node.point.y;
	node=node.next;	
   	while(node.point.x!="end")
   	{
   		if(node.vertex=="L")
   		{
   			x = node.point.x;
			y = node.point.y;
			if (x>mxx) {mxx=x};
			if (x<mnx) {mnx=x};
			if (y>mxy) {mxy=y};
			if (y<mny) {mny=y};
   		}
   		else
   		{
   			for (var i=0;i<=step; i++)
   			{	
				t=i/step;			
				x = (1-t)*(1-t)*(1-t)*node.prev.point.x + 3*(1-t)*(1-t)*t*node.ctrl1.x + 3*(1-t)*t*t*node.ctrl2.x + t*t*t*node.point.x;
				y = (1-t)*(1-t)*(1-t)*node.prev.point.y + 3*(1-t)*(1-t)*t*node.ctrl1.y + 3*(1-t)*t*t*node.ctrl2.y + t*t*t*node.point.y;
				if (x>mxx) {mxx=x};
				if (x<mnx) {mnx=x};
				if (y>mxy) {mxy=y};
				if (y<mny) {mny=y};
			}
		}
		node=node.next;
   	}
	this.tplftcrnr.x=mnx; 
	this.tplftcrnr.y=mny;
   	this.btmrgtcrnr.x=mxx;
   	this.btmrgtcrnr.y=mxy;
   	this.group.left=this.tplftcrnr.x;
   	this.group.top=this.tplftcrnr.y;
   	this.group.width=this.btmrgtcrnr.x-this.tplftcrnr.x;
   	this.group.height=this.btmrgtcrnr.y-this.tplftcrnr.y;
}

function fixCorners()  
{
	var tx=this.tplftcrnr.x;
	var ty=this.tplftcrnr.y;
	var bx=this.btmrgtcrnr.x;
	var by=this.btmrgtcrnr.y;
	this.tplftcrnr.x=Math.min(tx,bx);
	this.tplftcrnr.y=Math.min(ty,by);
	this.btmrgtcrnr.x=Math.max(tx,bx);
	this.btmrgtcrnr.y=Math.max(ty,by);
}

function showTools()
{
	$('stylelines').style.visibility='inherit';
	$('collines').style.visibility='inherit';
	$('rotate').style.visibility='inherit';
	$('front').style.visibility='inherit';
	$('back').style.visibility='inherit';
	$('del').style.visibility='inherit';
	$('copy').style.visibility='inherit';
	$('vert').style.visibility='inherit';
	$('horz').style.visibility='inherit';
	$('sname').style.visibility='inherit'
	$('colfill').style.visibility='inherit';
	$('gradfill').style.visibility='inherit';
	$('shadow').style.visibility='inherit';		
	if(DELETES.length>0) {$('lundo').style.visibility='inherit';}
}

function setTools(scene)
{
	$("tracktext").innerHTML="&nbsp;&nbsp;Select just one shape.";
	$("tweentext").innerHTML="&nbsp;&nbsp;Select just one shape.";
	var agroup=false;
	var boundary,members,memlen;
	var slctd=$("boundarydrop").childNodes;
	for(var i=0;i<slctd.length;i++)
	{
		boundary=slctd[i];
		members=boundary.group.memberShapes();
		memlen=0;
		for(var name in members)
		{
			memlen++;
		}
		if(memlen>1)
		{
			agroup=true;
			i=slctd.length
		}
	}
	var nslctd=slctd.length; 
	if(nslctd==1)
	{
		boundary=slctd[0];
		members=boundary.group.memberShapes();
		memlen=0;
		for(var name in members)
		{
			memlen++;
		}
		if(memlen==1)
		{
			$("tracktext").innerHTML="&nbsp;&nbsp;From selected shape.";
			$("tweentext").innerHTML="&nbsp;&nbsp;From selected shape.";
			for(var name in members)
			{
				shape=members[name];
				$("sname").style.visibility="inherit";
				$("sname").alt="shape name";
				$("sname").title="shape name";
				if(shape.editable)
				{
					$('editlines').style.visibility="inherit";
					$('ungroup').style.visibility="hidden";
					$('group').style.visibility="hidden";
				}
				else
				{
					$('editlines').style.visibility="hidden";
					$('ungroup').style.visibility="hidden";
					$('group').style.visibility="hidden";
				}
			}
		}
		else
		{
			$("sname").style.visibility="inherit";
			$("sname").alt="group name";
			$("sname").title="group name";
			$('ungroup').style.visibility="inherit";
			$('editlines').style.visibility="hidden";
			$('group').style.visibility="hidden";
		}
	}
	else
	{
		$("sname").style.visibility="hidden";
		$('ungroup').style.visibility="hidden";
		$('editlines').style.visibility="hidden";
		$('group').style.visibility="inherit";
		$('alntop').style.visibility='inherit';
		$('alnbot').style.visibility='inherit';
		$('alnleft').style.visibility='inherit';
		$('alnright').style.visibility='inherit';
		$('alntop').style.top=280+"px";
		$('alnbot').style.top=300+"px";
		$('alnleft').style.top=280+"px";
		$('alnright').style.top=280+"px";
		if ($('colfill').style.visibility=='inherit')  //one of selected shapes is closed
		{
			$('alntop').style.top=380+"px";
			$('alnbot').style.top=400+"px";
			$('alnleft').style.top=380+"px";
			$('alnright').style.top=380+"px";
		}
	}
	if(scene)
	{
		$("sname").style.visibility="hidden";
		$('ungroup').style.visibility="hidden";
		$('group').style.visibility="hidden";
		$('copy').style.visibility='hidden';
		if(agroup)
		{
			$('colfill').style.visibility='hidden';
			$('gradfill').style.visibility='hidden';
			$('stylelines').style.visibility='hidden';
			$('collines').style.visibility='hidden';
			$('shadow').style.visibility='hidden';
		}
	}
}
      
function hideTools()
{
	$('editlines').style.visibility='hidden';
	$('shapemenu').style.visibility='hidden';
	$('fopts').style.visibility='hidden';
	$('listshapebox').style.visibility='hidden';
	$('group').style.visibility='hidden';
	$('ungroup').style.visibility='hidden';
	$('stylelines').style.visibility='hidden';
	$('collines').style.visibility='hidden';
	$('colfill').style.visibility='hidden'
	$('gradfill').style.visibility='hidden';
	$('rotate').style.visibility='hidden';
	$('front').style.visibility='hidden';
	$('back').style.visibility='hidden';
	$('del').style.visibility='hidden';
	$('copy').style.visibility='hidden';
	$('vert').style.visibility='hidden';
	$('horz').style.visibility='hidden';
	$('alntop').style.visibility='hidden';
	$('alnbot').style.visibility='hidden';
	$('alnleft').style.visibility='hidden';
	$('alnright').style.visibility='hidden';
	$('shadow').style.visibility='hidden';
	$('sname').style.visibility='hidden';
	$('pointsbox').style.visibility='hidden';
	$('lundo').style.visibility='hidden';
	close_p_content();
}

function shapecopy(offset)
{
	var name;
	var temps;
	var shapelist=[];
	SELECTED={};
	for(var i=0;i<$("boundarydrop").childNodes.length;i++)  //child nodes are drawn boundaries
	{
		var group=$("boundarydrop").childNodes[i].group;
		var groupcopy=copyGroup(group,offset,$("shapestage"),SHAPES,GROUPS);
		var members=groupcopy.memberShapes();
		for(var shape in members)
		{
			members[shape].group=groupcopy;
			temps=[];
			temps[0]=members[shape].name;
			temps[1]=members[shape].zIndex;
			shapelist.push(temps);
		}
		SELECTED[groupcopy.name]=groupcopy;
		SELECTEDSHAPE=members[shape];
	}
	clear($("boundarydrop"));
	for(var name in SELECTED)
	{
		SELECTED[name].drawBoundary();
	}
	shapelist.sort(zindp);
	
	for (var i=0; i<shapelist.length;i++)
	{
		name=shapelist[i][0];
		SHAPES[name].zIndex=ZPOS++;
		SHAPES[name].Canvas.style.zIndex=SHAPES[name].zIndex;
	}
}

function makeCopy(shape,offset,theatre,STORE) 
{
	var p,n,c1,c2;
	if(theatre.id=="shapestage")
	{
		var name="Shape"+(SCOUNT++);
	}
	else
	{
		var name="SUBSH"+(NCOUNT++);
	}
	var copy=new Shape(name,shape.title,shape.open,shape.editable,shape.type,STORE); 		
	copy.lineWidth  = shape.lineWidth ;
	copy.lineCap  = shape.lineCap ;
	copy.lineJoin  = shape.lineJoin ;
	copy.justfill = shape.justfill;
	copy.linearfill = shape.linearfill;
	copy.stopn = shape.stopn;
	copy.shadow = shape.shadow;
	copy.shadowOffsetX  = shape.shadowOffsetX ;
	copy.shadowOffsetY  = shape.shadowOffsetY ;
	copy.shadowBlur  = shape.shadowBlur ;
	copy.zIndex = shape.zIndex;
	copy.crnradius = shape.crnradius;
	p=new Point(shape.tplftcrnr.x+offset,shape.tplftcrnr.y+offset);
	copy.tplftcrnr=p; //coordinates of top left of boundary box;
	p=new Point(shape.btmrgtcrnr.x+offset,shape.btmrgtcrnr.y+offset);
	copy.btmrgtcrnr=p; //coordinates of bottom right of boundary box;
	copy.lineWidth=shape.lineWidth;
	copy.radius=shape.radius;
	for(var i=0; i<4;i++)
	{
		copy.fillStyle[i]=shape.fillStyle[i];
		copy.strokeStyle[i]=shape.strokeStyle[i];
		copy.lineGrad[i]=shape.lineGrad[i]+offset;
		copy.shadowColor[i]=shape.shadowColor[i];
	}
	copy.radGrad[0]=shape.radGrad[0]+offset;
	copy.radGrad[1]=shape.radGrad[1]+offset;
	copy.radGrad[2]=shape.radGrad[2];
	copy.radGrad[3]=shape.radGrad[3]+offset;
	copy.radGrad[4]=shape.radGrad[4]+offset;
	copy.radGrad[5]=shape.radGrad[5];
	copy.colorStops=[];
	for(var i=0;i<shape.colorStops.length;i++)
	{
		copy.colorStops[i]=[];
		for(var j=0;j<shape.colorStops[i].length;j++)
		{
			copy.colorStops[i][j]=shape.colorStops[i][j];
		}
	}
	var node=shape.path.next;
	while(node.point.x!="end")
	{
		p=new Point(node.point.x+offset,node.point.y+offset);
		if(node.ctrl1.x=="non")
		{
			c1=new Point("non","non");;
		}
		else
		{
			c1=new Point(node.ctrl1.x+offset,node.ctrl1.y+offset);
		}
		if(node.ctrl2.x=="non")
		{
			c2=new Point("non","non");;
		}
		else
		{
			c2=new Point(node.ctrl2.x+offset,node.ctrl2.y+offset);
		}
		n=new Node(p,c1,c2);
		n.corner=node.corner;
		n.vertex=node.vertex;
		n.shape=copy;
		copy.addNode(n);
		node=node.next;
	}
	switch (copy.type)
	{
		case "arc":
		case "sector":
		case "segment":
			node=copy.path.next;
			copy.bnode=node.next;
			copy.lnode=node.next.next;
			copy.tnode=node.next.next.next;
			copy.arcwidth=shape.arcwidth;
			copy.archeight=shape.archeight;
			copy.radius=shape.radius;
			copy.arccentre.x=shape.arccentre.x+offset;
			copy.arccentre.y=shape.arccentre.y+offset;
	}	
	copy.addTo(theatre);
	return copy;
}

function aligntop()
{
	var mintop=100000000;
	var dmnt;
	var shape,node;
	for(var groupname in SELECTED)
	{
		group=SELECTED[groupname];
		if (group.top<mintop) {mintop=group.top}
	}
	for (var groupname in SELECTED)
	{
		group=SELECTED[groupname];
		dmnt=mintop-group.top;
		group.top=mintop;
		group.centreOfRotation.y +=dmnt;
		group.removeBoundary();
		group.drawBoundary();
		members=group.memberShapes();
		for(var name in members)
		{
			shape=members[name];
			node=shape.path.next;
			while(node.point.x!="end")
			{
				node.point.y+=dmnt;
				if(node.ctrl1.x!="non") //changes when straight line set on curve
				{
					node.ctrl1.y+=dmnt;
					node.ctrl2.y+=dmnt;
				}
				node=node.next;
			}
			shape.tplftcrnr.y+=dmnt;
			shape.btmrgtcrnr.y+=dmnt;
			shape.lineGrad[1]+=dmnt;
			shape.lineGrad[3]+=dmnt;
			shape.radGrad[1]+=dmnt;
			shape.radGrad[4]+=dmnt;
			shape.draw();
		}
	}
}

function alignleft()
{
	var minleft=100000000;
	var dmnl;
	var shape,node;
	for(var groupname in SELECTED)
	{
		group=SELECTED[groupname];
		if (group.left<minleft) {minleft=group.left}
	}
	for (var groupname in SELECTED)
	{
		group=SELECTED[groupname];
		dmnl=minleft-group.left;
		group.left=minleft;
		group.centreOfRotation.x+=dmnl;
		group.removeBoundary();
		group.drawBoundary();
		members=group.memberShapes();
		for(var name in members)
		{
			shape=members[name];
			node=shape.path.next;
			while(node.point.x!="end")
			{
				node.point.x+=dmnl;
				if(node.ctrl1.x!="non") //changes when straight line set on curve
				{
					node.ctrl1.x+=dmnl;
					node.ctrl2.x+=dmnl;
				}
				node=node.next;
			}
			//shape.sctop=shape.btop;
			shape.tplftcrnr.x+=dmnl;
			shape.btmrgtcrnr.x+=dmnl;
			shape.lineGrad[0]+=dmnl;
			shape.lineGrad[2]+=dmnl;
			shape.radGrad[0]+=dmnl;
			shape.radGrad[3]+=dmnl;
			shape.draw();
		}
	}
}

function alignright()
{
	var maxright=-100000000;
	var dmxr;
	var shape,node;
	for(var groupname in SELECTED)
	{
		group=SELECTED[groupname];
		if (group.left+group.width>maxright) {maxright=group.left+group.width}
	}
	for (var groupname in SELECTED)
	{
		group=SELECTED[groupname];
		dmxr=maxright-(group.left+group.width);
		group.left+=dmxr;
		group.centreOfRotation.x+=dmxr;
		group.removeBoundary();
		group.drawBoundary();
		members=group.memberShapes();
		for(var name in members)
		{
			shape=members[name];
			node=shape.path.next;
			while(node.point.x!="end")
			{
				node.point.x+=dmxr;
				if(node.ctrl1.x!="non") //changes when straight line set on curve
				{
					node.ctrl1.x+=dmxr;
					node.ctrl2.x+=dmxr;
				}
				node=node.next;
			}
			//shape.sctop=shape.btop;
			shape.tplftcrnr.x+=dmxr;
			shape.btmrgtcrnr.x+=dmxr;
			shape.lineGrad[0]+=dmxr;
			shape.lineGrad[2]+=dmxr;
			shape.radGrad[0]+=dmxr;
			shape.radGrad[3]+=dmxr;
			shape.draw();
		}
	}
}

function alignbot()
{

	var maxbot=-100000000;
	var dmxb;
	var shape,node;
	for(var groupname in SELECTED)
	{
		group=SELECTED[groupname];
		if (group.top+group.height>maxbot) {maxbot=group.top+group.height}
	}
	for (var groupname in SELECTED)
	{
		group=SELECTED[groupname];
		dmxb=maxbot-(group.top+group.height);
		group.top+=dmxb;
		group.centreOfRotation.y+=dmxb;
		group.removeBoundary();
		group.drawBoundary();
		members=group.memberShapes();
		for(var name in members)
		{
			shape=members[name];
			node=shape.path.next;
			while(node.point.x!="end")
			{
				node.point.y+=dmxb;
				if(node.ctrl1.x!="non") //changes when straight line set on curve
				{
					node.ctrl1.y+=dmxb;
					node.ctrl2.y+=dmxb;
				}
				node=node.next;
			}
			//shape.sctop=shape.btop;
			shape.tplftcrnr.y+=dmxb;
			shape.btmrgtcrnr.y+=dmxb;
			shape.lineGrad[1]+=dmxb;
			shape.lineGrad[3]+=dmxb;
			shape.radGrad[1]+=dmxb;
			shape.radGrad[4]+=dmxb;
			shape.draw();
		}
	}
}

function bringfront()
{
	var name;
	var temps;
	var shapelist=[];
	for(var group in SELECTED)
	{
		var members=SELECTED[group].memberShapes();
		for(var shape in members)
		{
			temps=[];
			temps[0]=members[shape].name;
			temps[1]=members[shape].zIndex;
			shapelist.push(temps);
		}
	}
	shapelist.sort(zindp);
	
	for (var i=0; i<shapelist.length;i++)
	{
		name=shapelist[i][0];
		CURRENT[name].zIndex=ZPOS++;
		CURRENT[name].Canvas.style.zIndex=CURRENT[name].zIndex;
	}
}

function zindp(a,b)
{
	return a[1]-b[1]
}

function sendback()
{
	var name;
	var temps;
	var shapelist=[];
	for(var group in SELECTED)
	{
		var members=SELECTED[group].memberShapes();
		for(var shape in members)
		{
			temps=[];
			temps[0]=members[shape].name;
			temps[1]=members[shape].zIndex;
			shapelist.push(temps);
		}
	}
	shapelist.sort(zindn);
	
	for (var i=0; i<shapelist.length;i++)
	{
		name=shapelist[i][0];
		CURRENT[name].zIndex=ZNEG--;
		CURRENT[name].Canvas.style.zIndex=CURRENT[name].zIndex;
	}
	function zindn(a,b)
	{
		return b[1]-a[1]
	}
}

function addAllMarks()
{
	node=this.path.next;
	if(this.type=="curve")
	{
		node.addPointMark();
	}
	node=node.next;
	while(node.point.x!="end")
	{
		if(node.vertex=="L")
		{
			node.addPointMark();
		}
		else
		{
			node.addFullMarks();
		}
		node=node.next;
	}
}

function getLengths()
{
	this.length=0; //cummulative total of section lengths
	this.lengths=[]; //array of section lengths
	var sl;  //section length
	path=this.path;
	var node=path.next; // from first node
	while(node.next.point.x!="end")  // check if next node is a point or end node, if point calculate length of path between nodes
	{
	  switch (node.next.vertex)
	  {
		case 'B':
			sl = curvelength(node);
			
		break
		case 'L':
			sl=linelength(node);
		break
	  }
	  this.length += sl;
	  this.lengths.push(sl);
	  node=node.next;
	};
}

function setNodePathBox()
{
	$("twnpbutton").OKnode=this;
	$("tweditline").value=this.nodepath.nodeTweening.twtime;
	$("twrepeditline").value=this.nodepath.nodeTweening.repeat;
	$("twyoeditline").checked=this.nodepath.nodeTweening.yoyo;
	$("twacteditline").checked=this.nodepath.nodeTweening.active;
	$("tweenpathsbox").style.visibility="visible";
}

function oldbetweenAngle(a,b,t)  // b start angle, a end angle, t parameter between 0 and 1
{
	if(Math.abs(a-b)<=Math.PI)
	{
		return (b+t*(a-b));
	}
	else
	{
		return ((2*Math.PI+b-t*(2*Math.PI-(a-b))) % (2*Math.PI));
	}
}
