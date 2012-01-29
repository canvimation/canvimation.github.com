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
	}
	else
	{
		this.ctrl1=new Point("non","non");
		this.ctrl2=new Point("non","non");
	}
	this.next="";
	this.prev=""
	this.shape;
	
	//methods
	this.setNode=setNode;
	this.addMark=addMark;
	this.removeMark=removeMark;
	this.updateNode=updateNode;
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
   	this.zIndex=zpos++;
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
  	this.swapCrnr=swapCrnr;
   	return this;
   	
}

function swapCrnr(c)
{
	var t=this.tplftcrnr[c];
	this.tplftcrnr[c]=this.btmrgtcrnr[c];
	this.btmrgtcrnr[c]=t;
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
	
	switch (this.type)
	{
		case "line":
			point=new Point(Math.round(cursor.x/xgrid)*xgrid,Math.round((cursor.y)/ygrid)*ygrid);
			node=new Node(point);
			this.addNode(node);
		break
		case "arc":
			point=new Point(Math.round(cursor.x/xgrid)*xgrid,Math.round((cursor.y)/ygrid)*ygrid);
			node=new Node(point);
			this.addNode(node);
		break
		case "curve":
		break 
		case "freeform":
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
		case "sector":
		break
		case "segment":
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
	BODY.onmousemove=function(e) {curshape.drawGuide(getPosition(e),node)};
	BODY.onmouseup=function(e) {curshape.drawEnd(getPosition(e))};
}

function drawGuide(cursor,node)
{
	cursor.x=Math.round(cursor.x/xgrid)*xgrid;
	cursor.y=Math.round(cursor.y/ygrid)*ygrid;
	this.btmrgtcrnr.x=cursor.x;
	this.btmrgtcrnr.y=cursor.y; 
	switch (this.type)
	{
		case "line":
			node.setNode(cursor);
		break
		case "arc":
			var start=this.path.next;
			var lx=cursor.x-start.point.x;
			var ly=cursor.y-start.point.y;
			var c1=new Point(start.point.x+lx*K,start.point.y);
			var c2=new Point(start.next.point.x,start.next.point.y-ly*K);
			start.next.setNode(cursor,c1,c2);
		break
		case "curve":
		break 
		case "freeform":
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
		case "sector":
		break
		case "segment":
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

function drawEnd(cursor)
{
	cursor.x=Math.round(cursor.x/xgrid)*xgrid;
	cursor.y=Math.round(cursor.y/ygrid)*ygrid;
	this.btmrgtcrnr=cursor;

	if (this.editable) 
	{
		$("markerdrop").style.visibility="visible";
		var node=this.path.next;
		node.addMark();
		node=node.next;
	};
	switch (this.type)
	{
		case "line":
			node.addMark();
		break
		case "arc":
			node.addMark();
			this.arcwidth=this.btmrgtcrnr.x-this.tplftcrnr.x;
			this.archeight=this.btmrgtcrnr.y-this.tplftcrnr.y;
			 
			if(this.arcwidth*this.archeight<0)//swap nodes so that going clockwise start node is before last node
			{
				this.arcwidth=Math.abs(this.arcwidth);
				this.archeight=Math.abs(this.archeight);
				var start=this.path.next;
				var sp=new Point(start.next.point.x,start.next.point.y);
				var ep=new Point(start.point.x,start.point.y);
				var cs1=new Point(start.next.ctrl2.x,start.next.ctrl2.y);
				var cs2=new Point(start.next.ctrl1.x,start.next.ctrl1.y);
				var snode=new Node(sp);
				var enode=new Node(ep,cs1,cs2);				
				start.removeMark();//remove original first mark and node
				start.removeNode();
				start.next.removeMark();//remove original last node and mark;
				start.next.removeNode();
				this.addNode(snode);
				this.addNode(enode);
				snode.addMark();
				enode.addMark();
			}
			node=this.path.prev; //current last node
			point=new Point(0,0);
			this.rnode=new Node(point);//node for 90 degrees
			node.insertNodeBefore(this.rnode);
			point=new Point(0,0);
			this.bnode=new Node(point);//node for 180 degrees
			node.insertNodeBefore(this.bnode);
			point=new Point(0,0);
			this.lnode=new Node(point);//node for 270 degrees
			node.insertNodeBefore(this.lnode);
			this.rnode.removeNode();//remove bottom, left and top node as first arc is between 0 an 90 degrees
			this.bnode.removeNode();//will be restored as and when needed
			this.lnode.removeNode();
			this.arcwidth=Math.abs(this.arcwidth);//possibility of both being negative
			this.archeight=Math.abs(this.archeight);
			this.arccentre=new Point(this.tplftcrnr.x,this.btmrgtcrnr.y);
			
			
			
		break
		case "curve":
		break 
		case "freeform":
		break
		case "rectangle":
		break
		case "ellipse":
		break
		case "rounded_rectangle": 
		break
		case "triangle":
			this.tplftcrnr.x -= cursor.x-this.tplftcrnr.x;
		break
		case "sector":
		break
		case "segment":
		break
		case "right_triangle":
		break
	}
	BODY.style.cursor="default";
	BODY.onmousedown=function() {};
	BODY.onmousemove=function() {};
	BODY.onmouseup=function() {};
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

//old functions  
function createArc(cur,canv)
{
	cur.x=Math.round(cur.x/xgrid)*xgrid;
	cur.y=Math.round((cur.y-52)/ygrid)*ygrid;
	canv.bleft=cur.x;
	canv.btop=cur.y;
	canv.scleft=canv.bleft;
	canv.sctop=canv.btop;
	canv.bwidth=50;
	canv.bheight=50;
	ln=new linemarker(lnmrks++,cur,'white');
	ln.style.zIndex=zpos++;
	DDln=new YAHOO.util.DD(ln.id);
	DDln.onDrag=function(){updateArcPoints(canv,this)};
	var tempary=[];
	tempary.push('M');
	tempary.push(cur.x);
	tempary.push(cur.y);
	canv.path.push(tempary);
	tempary=[];
	tempary.push('B');
	tempary.push(cur.x);
	tempary.push(cur.y);
	tempary.push(cur.x);
	tempary.push(cur.y);
	tempary.push(cur.x);
	tempary.push(cur.y);
	canv.path.push(tempary);
	if (canv.path[2]=='segment')
	{
		tempary=[];
		tempary.push('L');
		tempary.push(cur.x);
		tempary.push(cur.y);
		canv.path.push(tempary);
	}
	if (canv.path[2]=='sector')
	{
		tempary=[];
		tempary.push('L');
		tempary.push(cur.x);
		tempary.push(cur.y);
		canv.path.push(tempary);
		tempary=[];
		tempary.push('L');
		tempary.push(cur.x);
		tempary.push(cur.y);
		canv.path.push(tempary);		
	}
	drawline(canv);
	$('bodydiv').onmouseup=function(e){drawEndArc(getPosition(e),canv)};
	$('bodydiv').onmousemove=function(e) {drawGuideArc(getPosition(e),canv)};
}

function drawGuideArc(cur,canv)
{
	cur.x=Math.round(cur.x/xgrid)*xgrid;
	cur.y=Math.round((cur.y-52)/ygrid)*ygrid;
	if (cur.x>cur.y)
	{
		var nx=(cur.x-canv.bleft)/2;
	}
	else
	{
		var nx=(cur.y-canv.btop)/2;
	}
	var k=4*(Math.SQRT2-1)/3;
	var cx=canv.bleft;
	var cy=canv.btop;	
	canv.path[4][1]=cx+nx*k;
	canv.path[4][2]=cy;
	canv.path[4][3]=cx+nx;
	canv.path[4][4]=cy+nx*(1-k);
	canv.path[4][5]=cx+nx;
	canv.path[4][6]=cy+nx;
	if (canv.path[2]=='segment')
	{
		canv.path[5][1]=canv.path[3][1];
		canv.path[5][2]=canv.path[3][2];
	}
	if (canv.path[2]=='sector')
	{
		canv.path[5][1]=canv.path[4][5]-nx;
		canv.path[5][2]=canv.path[4][6];
		canv.path[6][1]=canv.path[3][1];
		canv.path[6][2]=canv.path[3][2];		
	}	
	drawline(canv);
}

function drawEndArc(cur,canv)
{
	$('bodydiv').onmousemove=function() {};
	$('bodydiv').onmouseup=function() {};
	$('bodydiv').onmousedown=function() {};
	shapejustcreated=true;
	cur.x=Math.round(cur.x/xgrid)*xgrid;
	cur.y=Math.round((cur.y-52)/ygrid)*ygrid;
	if (cur.x>cur.y)
	{
		var nx=(cur.x-canv.bleft)/2;
	}
	else
	{
		var nx=(cur.y-canv.btop)/2;
	}
	var cx=canv.bleft;
	var cy=canv.btop;
	var k=4*(Math.SQRT2-1)/3;
	canv.path[4][1]=cx+nx*k;
	canv.path[4][2]=cy;
	canv.path[4][3]=cx+nx;
	canv.path[4][4]=cy+nx*(1-k);
	canv.path[4][5]=cx+nx;
	canv.path[4][6]=cy+nx;	
	canv.radius=Math.abs(nx);
	canv.ox=cx;
	canv.oy=cy+nx;
	canv.sox=canv.ox;
	canv.soy=canv.oy;
	var ep={x:canv.path[4][5],y:canv.path[4][6]};
	ln=new linemarker(lnmrks++,ep, 'white');
	ln.style.zIndex=zpos++;
	DDln=new YAHOO.util.DD(ln.id);
	DDln.onDrag=function(){updateArcPoints(canv,this)};	
	$('bodydiv').onclick=function(e){checkBoundary(shiftdown(e),getPosition(e),canv)};
	$('bodydiv').style.cursor='default';
	if (canv.path[2]=='segment')
	{
		canv.path[5][1]=canv.path[3][1];
		canv.path[5][2]=canv.path[3][2];
	}
	if (canv.path[2]=='sector')
	{
		canv.path[5][1]=canv.ox;
		canv.path[5][2]=canv.oy;
		canv.path[6][1]=canv.path[3][1];
		canv.path[6][2]=canv.path[3][2];		
	}
	g=getmaxmin(canv.path);
	canv.bleft=g.mnx;
	canv.bwidth=g.mxx-g.mnx;
	canv.btop=g.mny;
	canv.bheight=g.mxy-g.mny;
	drawline(canv);
}

function updateArcPoints(canv,mrk)
{
	canv.clockw=true;
	var i= parseInt(mrk.id.substr(3));
	var tp=parseInt($(mrk.id).style.top);
	var lf=parseInt($(mrk.id).style.left);
	var xc = canv.ox;
	var yc = canv.oy;
	var sx = canv.scx;
	var sy = canv.scy;
	var r = canv.radius;
	if (i==0)
	{
		var xs = lf+4;
		var ys = tp+4;
		var last=canv.path.length;
		var xe=parseInt($('lnm1').style.left)+4;
		var ye=parseInt($('lnm1').style.top)+4;
		xs = canv.scleft + (xs-canv.scleft)/sx -xc;
		xe = canv.scleft + (xe-canv.scleft)/sx - xc;
		ys = canv.sctop + (ys-canv.sctop)/sy - yc;
		ye = canv.sctop + (ye-canv.sctop)/sy - yc;
		var phi = arctan(xs,ys);
		xs = canv.radius*Math.cos(phi);
		ys = canv.radius*Math.sin(phi);
		
	}
	else
	{
		var xs = parseInt($('lnm0').style.left)+4;
		var ys = parseInt($('lnm0').style.top)+4;
		var xe = lf+4;
		var ye = tp+4;
		xs = canv.scleft + (xs-canv.scleft)/sx -xc;
		xe = canv.scleft + (xe-canv.scleft)/sx - xc;
		ys = canv.sctop + (ys-canv.sctop)/sy - yc;
		ye = canv.sctop + (ye-canv.sctop)/sy - yc;
		var alpha = arctan(xe,ye);
		xe = canv.radius*Math.cos(alpha);
		ye = canv.radius*Math.sin(alpha);
		var phi = arctan(xs,ys);
		
	}
	// rotate anti-clockwise so that (xs,ys) now on x axis
	var rote1 = rotate(phi,xe,ye, "A");
	var psi = arctan(rote1.x,rote1.y);
	if (0<=psi && psi<=Math.PI/2)
	{
		var xsb = (4-Math.cos(psi/2))*canv.radius/3;
		var ysb = (1-Math.cos(psi/2))*(Math.cos(psi/2)-3)*canv.radius/(3*Math.sin(psi/2));
		var xeb = xsb;
		var yeb = -ysb;
		var rotsb = rotate(phi+psi/2,xsb,ysb,"C");
		var roteb = rotate(phi+psi/2,xeb,yeb,"C");
		xsb=rotsb.x;
		ysb=rotsb.y;
		xeb=roteb.x;
		yeb=roteb.y;
		xs = (xs +xc - canv.scleft)*sx+canv.scleft;
		xe = (xe +xc - canv.scleft)*sx+canv.scleft;
		ys = (ys +yc - canv.sctop)*sy+canv.sctop;
		ye = (ye +yc - canv.sctop)*sy+canv.sctop;
		xsb = (xsb +xc - canv.scleft)*sx+canv.scleft;
		xeb = (xeb +xc - canv.scleft)*sx+canv.scleft;
		ysb = (ysb +yc - canv.sctop)*sy+canv.sctop;
		yeb = (yeb +yc - canv.sctop)*sy+canv.sctop;
		var coro=canv.path[0];
		var atype=canv.path[2];
		canv.path=[];
		canv.path[0]=coro;
		canv.path[1]='edit';
		canv.path[2]=atype;
		canv.path[3]=[];
		canv.path[3][0]='M';
		canv.path[3][1]=xs;
		canv.path[3][2]=ys;
		canv.path[4]=[];
		canv.path[4][0]='B';
		canv.path[4][1]=xsb;
		canv.path[4][2]=ysb;
		canv.path[4][3]=xeb;
		canv.path[4][4]=yeb;
		canv.path[4][5]=xe;
		canv.path[4][6]=ye;	
	}

	if (Math.PI/2<psi && psi<=Math.PI)
	{
		psi -=Math.PI/2;
		var k=4*(Math.SQRT2-1)/3;
		var x0=canv.radius;
		var y0=0;
		var x0b= x0;
		var y0b=canv.radius*k;
		var x1=0;
		var y1=canv.radius;
		var x1b=canv.radius*k;
		var y1b=y1;
		var xsb = (4-Math.cos(psi/2))*canv.radius/3;
		var ysb = (1-Math.cos(psi/2))*(Math.cos(psi/2)-3)*canv.radius/(3*Math.sin(psi/2));
		var xeb = xsb;
		var yeb = -ysb;
		var rotsb = rotate(Math.PI/2+psi/2,xsb,ysb,"C");
		var roteb = rotate(Math.PI/2+psi/2,xeb,yeb,"C");
		xsb=rotsb.x;
		ysb=rotsb.y;
		xeb=roteb.x;
		yeb=roteb.y;		
		var rot0 = rotate(phi,x0,y0,"C");
		var rot0b = rotate(phi,x0b,y0b,"C");
		var rot1 = rotate(phi,x1,y1,"C");
		var rot1b = rotate(phi,x1b,y1b,"C");
		var rotsb = rotate(phi,xsb,ysb,"C");
		var roteb = rotate(phi,xeb,yeb,"C");
		x0= rot0.x;
		y0= rot0.y;
		x0b= rot0b.x;
		y0b= rot0b.y;
		x1= rot1.x;
		y1= rot1.y;
		x1b= rot1b.x;
		y1b= rot1b.y;		
		xsb=rotsb.x;
		ysb=rotsb.y;
		xeb=roteb.x;
		yeb=roteb.y;
		xs = (xs +xc - canv.scleft)*sx+canv.scleft;
		xe = (xe +xc - canv.scleft)*sx+canv.scleft;
		ys = (ys +yc - canv.sctop)*sy+canv.sctop;
		ye = (ye +yc - canv.sctop)*sy+canv.sctop;
		xsb = (xsb +xc - canv.scleft)*sx+canv.scleft;
		xeb = (xeb +xc - canv.scleft)*sx+canv.scleft;
		ysb = (ysb +yc - canv.sctop)*sy+canv.sctop;
		yeb = (yeb +yc - canv.sctop)*sy+canv.sctop;
		x0 = (x0 +xc - canv.scleft)*sx+canv.scleft;
		x1 = (x1 +xc - canv.scleft)*sx+canv.scleft;
		y0 = (y0 +yc - canv.sctop)*sy+canv.sctop;
		y1 = (y1 +yc - canv.sctop)*sy+canv.sctop;
		x0b = (x0b +xc - canv.scleft)*sx+canv.scleft;
		x1b = (x1b +xc - canv.scleft)*sx+canv.scleft;
		y0b = (y0b +yc - canv.sctop)*sy+canv.sctop;
		y1b = (y1b +yc - canv.sctop)*sy+canv.sctop;		
		var coro=canv.path[0];
		var atype=canv.path[2];
		canv.path=[];
		canv.path[0]=coro;
		canv.path[1]='edit';
		canv.path[2]=atype;
		canv.path[3]=[];
		canv.path[3][0]='M';
		canv.path[3][1]=x0;
		canv.path[3][2]=y0;
		canv.path[4]=[];
		canv.path[4][0]='B';
		canv.path[4][1]=x0b;
		canv.path[4][2]=y0b;
		canv.path[4][3]=x1b;
		canv.path[4][4]=y1b;
		canv.path[4][5]=x1;
		canv.path[4][6]=y1;
		canv.path[5]=[];
		canv.path[5][0]='B';
		canv.path[5][1]=xsb;
		canv.path[5][2]=ysb;
		canv.path[5][3]=xeb;
		canv.path[5][4]=yeb;
		canv.path[5][5]=xe;
		canv.path[5][6]=ye;
	}
	
	if (Math.PI<psi && psi<=3*Math.PI/2)
	{
		psi -=Math.PI;
		var k=4*(Math.SQRT2-1)/3;
		var x0=canv.radius;
		var y0=0;
		var x0b= x0;
		var y0b=canv.radius*k;
		var x1=0;
		var y1=canv.radius;
		var x1b=canv.radius*k;
		var y1b=y1;
		var x2=-canv.radius;
		var y2=0;
		var x2bs=-canv.radius*k;
		var y2bs=y1;
		var x2be=-canv.radius;
		var y2be=canv.radius*k;		
		var xsb = (4-Math.cos(psi/2))*canv.radius/3;
		var ysb = (1-Math.cos(psi/2))*(Math.cos(psi/2)-3)*canv.radius/(3*Math.sin(psi/2));
		var xeb = xsb;
		var yeb = -ysb;
		var rotsb = rotate(Math.PI+psi/2,xsb,ysb,"C");
		var roteb = rotate(Math.PI+psi/2,xeb,yeb,"C");
		xsb=rotsb.x;
		ysb=rotsb.y;
		xeb=roteb.x;
		yeb=roteb.y;		
		var rot0 = rotate(phi,x0,y0,"C");
		var rot0b = rotate(phi,x0b,y0b,"C");
		var rot1 = rotate(phi,x1,y1,"C");
		var rot1b = rotate(phi,x1b,y1b,"C");
		var rot2 = rotate(phi,x2,y2,"C");
		var rot2bs = rotate(phi,x2bs,y2bs,"C");
		var rot2be = rotate(phi,x2be,y2be,"C");
		var rotsb = rotate(phi,xsb,ysb,"C");
		var roteb = rotate(phi,xeb,yeb,"C");
		x0= rot0.x;
		y0= rot0.y;
		x0b= rot0b.x;
		y0b= rot0b.y;
		x1= rot1.x;
		y1= rot1.y;
		x1b= rot1b.x;
		y1b= rot1b.y;
		x2= rot2.x;
		y2= rot2.y;
		x2bs= rot2bs.x;
		y2bs= rot2bs.y;
		x2be= rot2be.x;
		y2be= rot2be.y;		
		xsb=rotsb.x;
		ysb=rotsb.y;
		xeb=roteb.x;
		yeb=roteb.y;
		xs = (xs +xc - canv.scleft)*sx+canv.scleft;
		xe = (xe +xc - canv.scleft)*sx+canv.scleft;
		ys = (ys +yc - canv.sctop)*sy+canv.sctop;
		ye = (ye +yc - canv.sctop)*sy+canv.sctop;
		xsb = (xsb +xc - canv.scleft)*sx+canv.scleft;
		xeb = (xeb +xc - canv.scleft)*sx+canv.scleft;
		ysb = (ysb +yc - canv.sctop)*sy+canv.sctop;
		yeb = (yeb +yc - canv.sctop)*sy+canv.sctop;
		x0 = (x0 +xc - canv.scleft)*sx+canv.scleft;
		x1 = (x1 +xc - canv.scleft)*sx+canv.scleft;
		y0 = (y0 +yc - canv.sctop)*sy+canv.sctop;
		y1 = (y1 +yc - canv.sctop)*sy+canv.sctop;
		x0b = (x0b +xc - canv.scleft)*sx+canv.scleft;
		x1b = (x1b +xc - canv.scleft)*sx+canv.scleft;
		y0b = (y0b +yc - canv.sctop)*sy+canv.sctop;
		y1b = (y1b +yc - canv.sctop)*sy+canv.sctop;
		x2 = (x2 +xc - canv.scleft)*sx+canv.scleft;
		x2bs = (x2bs +xc - canv.scleft)*sx+canv.scleft;
		x2be = (x2be +xc - canv.scleft)*sx+canv.scleft;
		y2 = (y2 +yc - canv.sctop)*sy+canv.sctop;
		y2bs = (y2bs +yc - canv.sctop)*sy+canv.sctop;	
		y2be = (y2be +yc - canv.sctop)*sy+canv.sctop;	
		var coro=canv.path[0];
		var atype=canv.path[2];
		canv.path=[];
		canv.path[0]=coro;
		canv.path[1]='edit';
		canv.path[2]=atype;
		canv.path[3]=[];
		canv.path[3][0]='M';
		canv.path[3][1]=x0;
		canv.path[3][2]=y0;
		canv.path[4]=[];
		canv.path[4][0]='B';
		canv.path[4][1]=x0b;
		canv.path[4][2]=y0b;
		canv.path[4][3]=x1b;
		canv.path[4][4]=y1b;
		canv.path[4][5]=x1;
		canv.path[4][6]=y1;
		canv.path[5]=[];
		canv.path[5][0]='B';
		canv.path[5][1]=x2bs;
		canv.path[5][2]=y2bs;
		canv.path[5][3]=x2be;
		canv.path[5][4]=y2be;
		canv.path[5][5]=x2;
		canv.path[5][6]=y2;
		canv.path[6]=[];
		canv.path[6][0]='B';
		canv.path[6][1]=xsb;
		canv.path[6][2]=ysb;
		canv.path[6][3]=xeb;
		canv.path[6][4]=yeb;
		canv.path[6][5]=xe;
		canv.path[6][6]=ye;
	}	
if (3*Math.PI/2<psi && psi<2*Math.PI)
	{
		psi -=3*Math.PI/2;
		var k=4*(Math.SQRT2-1)/3;
		var x0=canv.radius;
		var y0=0;
		var x0b= x0;
		var y0b=canv.radius*k;
		var x1=0;
		var y1=canv.radius;
		var x1b=canv.radius*k;
		var y1b=y1;
		var x2=-canv.radius;
		var y2=0;
		var x2bs=-canv.radius*k;
		var y2bs=y1;
		var x2be=-canv.radius;
		var y2be=canv.radius*k;	
		var x3=0;
		var y3=-canv.radius;
		var x3bs=-canv.radius;
		var y3bs=-canv.radius*k;
		var x3be=-canv.radius*k;
		var y3be=-canv.radius;			
		var xsb = (4-Math.cos(psi/2))*canv.radius/3;
		var ysb = (1-Math.cos(psi/2))*(Math.cos(psi/2)-3)*canv.radius/(3*Math.sin(psi/2));
		var xeb = xsb;
		var yeb = -ysb;
		var rotsb = rotate(3*Math.PI/2+psi/2,xsb,ysb,"C");
		var roteb = rotate(3*Math.PI/2+psi/2,xeb,yeb,"C");
		xsb=rotsb.x;
		ysb=rotsb.y;
		xeb=roteb.x;
		yeb=roteb.y;		
		var rot0 = rotate(phi,x0,y0,"C");
		var rot0b = rotate(phi,x0b,y0b,"C");
		var rot1 = rotate(phi,x1,y1,"C");
		var rot1b = rotate(phi,x1b,y1b,"C");
		var rot2 = rotate(phi,x2,y2,"C");
		var rot2bs = rotate(phi,x2bs,y2bs,"C");
		var rot2be = rotate(phi,x2be,y2be,"C");
		var rot3 = rotate(phi,x3,y3,"C");
		var rot3bs = rotate(phi,x3bs,y3bs,"C");
		var rot3be = rotate(phi,x3be,y3be,"C");		
		var rotsb = rotate(phi,xsb,ysb,"C");
		var roteb = rotate(phi,xeb,yeb,"C");
		x0= rot0.x;
		y0= rot0.y;
		x0b= rot0b.x;
		y0b= rot0b.y;
		x1= rot1.x;
		y1= rot1.y;
		x1b= rot1b.x;
		y1b= rot1b.y;
		x2= rot2.x;
		y2= rot2.y;
		x2bs= rot2bs.x;
		y2bs= rot2bs.y;
		x2be= rot2be.x;
		y2be= rot2be.y;	
		x3= rot3.x;
		y3= rot3.y;
		x3bs= rot3bs.x;
		y3bs= rot3bs.y;
		x3be= rot3be.x;
		y3be= rot3be.y;
		xsb=rotsb.x;
		ysb=rotsb.y;
		xeb=roteb.x;
		yeb=roteb.y;
		xs = (xs +xc - canv.scleft)*sx+canv.scleft;
		xe = (xe +xc - canv.scleft)*sx+canv.scleft;
		ys = (ys +yc - canv.sctop)*sy+canv.sctop;
		ye = (ye +yc - canv.sctop)*sy+canv.sctop;
		xsb = (xsb +xc - canv.scleft)*sx+canv.scleft;
		xeb = (xeb +xc - canv.scleft)*sx+canv.scleft;
		ysb = (ysb +yc - canv.sctop)*sy+canv.sctop;
		yeb = (yeb +yc - canv.sctop)*sy+canv.sctop;
		x0 = (x0 +xc - canv.scleft)*sx+canv.scleft;
		x1 = (x1 +xc - canv.scleft)*sx+canv.scleft;
		y0 = (y0 +yc - canv.sctop)*sy+canv.sctop;
		y1 = (y1 +yc - canv.sctop)*sy+canv.sctop;
		x0b = (x0b +xc - canv.scleft)*sx+canv.scleft;
		x1b = (x1b +xc - canv.scleft)*sx+canv.scleft;
		y0b = (y0b +yc - canv.sctop)*sy+canv.sctop;
		y1b = (y1b +yc - canv.sctop)*sy+canv.sctop;
		x2 = (x2 +xc - canv.scleft)*sx+canv.scleft;
		x2bs = (x2bs +xc - canv.scleft)*sx+canv.scleft;
		x2be = (x2be +xc - canv.scleft)*sx+canv.scleft;
		y2 = (y2 +yc - canv.sctop)*sy+canv.sctop;
		y2bs = (y2bs +yc - canv.sctop)*sy+canv.sctop;	
		y2be = (y2be +yc - canv.sctop)*sy+canv.sctop;
		x3 = (x3 +xc - canv.scleft)*sx+canv.scleft;
		x3bs = (x3bs +xc - canv.scleft)*sx+canv.scleft;
		x3be = (x3be +xc - canv.scleft)*sx+canv.scleft;
		y3 = (y3 +yc - canv.sctop)*sy+canv.sctop;
		y3bs = (y3bs +yc - canv.sctop)*sy+canv.sctop;	
		y3be = (y3be +yc - canv.sctop)*sy+canv.sctop;
		var coro=canv.path[0];
		var atype=canv.path[2];
		canv.path=[];
		canv.path[0]=coro;
		canv.path[1]='edit';
		canv.path[2]=atype;
		canv.path[3]=[];
		canv.path[3][0]='M';
		canv.path[3][1]=x0;
		canv.path[3][2]=y0;
		canv.path[4]=[];
		canv.path[4][0]='B';
		canv.path[4][1]=x0b;
		canv.path[4][2]=y0b;
		canv.path[4][3]=x1b;
		canv.path[4][4]=y1b;
		canv.path[4][5]=x1;
		canv.path[4][6]=y1;
		canv.path[5]=[];
		canv.path[5][0]='B';
		canv.path[5][1]=x2bs;
		canv.path[5][2]=y2bs;
		canv.path[5][3]=x2be;
		canv.path[5][4]=y2be;
		canv.path[5][5]=x2;
		canv.path[5][6]=y2;
		canv.path[6]=[];
		canv.path[6][0]='B';
		canv.path[6][1]=x3bs;
		canv.path[6][2]=y3bs;
		canv.path[6][3]=x3be;
		canv.path[6][4]=y3be;
		canv.path[6][5]=x3;
		canv.path[6][6]=y3;
		canv.path[7]=[];
		canv.path[7][0]='B';
		canv.path[7][1]=xsb;
		canv.path[7][2]=ysb;
		canv.path[7][3]=xeb;
		canv.path[7][4]=yeb;
		canv.path[7][5]=xe;
		canv.path[7][6]=ye;		
	}	
		
	if (i==0)
	{
		$(mrk.id).style.top=canv.path[3][2]-4;
		$(mrk.id).style.left=canv.path[3][1]-4;
	}
	else
	{
		last=canv.path.length;
		$(mrk.id).style.top=canv.path[last-1][6]-4;
		$(mrk.id).style.left=canv.path[last-1][5]-4;		
	}
	if (canv.path[2]=='segment')
	{
		tempary=[];
		tempary.push('L');
		tempary.push(canv.path[3][1]);
		tempary.push(canv.path[3][2]);
		canv.path.push(tempary);
	}
	if (canv.path[2]=='sector')
	{
		tempary=[];
		tempary.push('L');
		tempary.push(canv.sox);
		tempary.push(canv.soy);
		canv.path.push(tempary);
		tempary=[];
		tempary.push('L');
		tempary.push(canv.path[3][1]);
		tempary.push(canv.path[3][2]);
		canv.path.push(tempary);		
	}		
	g=getmaxmin(canv.path);
	canv.bleft=g.mnx;
	canv.bwidth=g.mxx-g.mnx;
	canv.btop=g.mny;
	canv.bheight=g.mxy-g.mny;	
	drawline(canv);
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


xxddff=0;
function createBez(cur,canv)
{

			firstmove=true;
			$('editlines').style.visibility='hidden';
			$('shapemenu').style.visibility='hidden';
			cur.x=Math.round(cur.x/xgrid)*xgrid;
			cur.y=Math.round((cur.y-52)/ygrid)*ygrid;
			var tempary=[];
			tempary.push('M');
			tempary.push(cur.x);
			tempary.push(cur.y);
			canv.path.push(tempary);
			ln=new linemarker(lnmrks++,cur,'#FEFEFE');
			ln.style.zIndex=zpos++;
			ln.type='corner';
			canv.beztypes.push(ln.type);
			alreadyclicked=false;
			$('bodydiv').onclick=function(e){addBezPoint(getPosition(e),canv)};
			$('bodydiv').ondblclick=function(e){lastBezPoint(getPosition(e),canv);canv.complete=true};
			$('bodydiv').onmousemove=function(e) {drawBezGuide(getPosition(e),canv)};
}

function drawBezGuide(cur,canv)
{
	if (!firstmove)
	{
		canv.path.pop();
	}
	else
	{
		firstmove=false;
	}
	cur.x=Math.round(cur.x/xgrid)*xgrid;
	cur.y=Math.round((cur.y-52)/ygrid)*ygrid;
	var newpos=canv.path.length;
	var prevpos=newpos-1;
	var tempary=[];
	tempary.push('L');
	tempary.push(cur.x);
	tempary.push(cur.y);
	canv.path.push(tempary);
	drawline(canv);
}

function addBezPoint(cur,canv)
{
	if (!alreadyclicked)
	{
		alreadyclicked=true;
		timed=setTimeout(function() {alreadyclicked=false},500);
		firstmove=true;
		canv.path.pop();
		var newpos=canv.path.length;
		var prevpos=newpos-1;
		if (prevpos==3)
		{
			var sx = canv.path[prevpos][1];
			var sy = canv.path[prevpos][2];
		}
		else
		{
			var sx = canv.path[prevpos][5];
			var sy = canv.path[prevpos][6];
		}
		cur.x=Math.round(cur.x/xgrid)*xgrid;
		cur.y=Math.round((cur.y-52)/ygrid)*ygrid;
		var ex = cur.x;
		var ey = cur.y;
		var dx = (ex-sx)/4;
		var dy = (ey-sy)/4;
		var ccur={x:sx+dx,y:sy+dy};
		var tempary=[];
		tempary.push('B');
		tempary.push(ccur.x);
		tempary.push(ccur.y);

		var ccur={x:ex-dx,y:ey-dy};
		tempary.push(ccur.x);
		tempary.push(ccur.y);	

		tempary.push(ex);
		tempary.push(ey);
		ln=new linemarker(lnmrks++,cur,'#FEFEFE');
		ln.style.zIndex=zpos++;
		ln.type='corner';
		canv.beztypes.push(ln.type);
		canv.path.push(tempary);
		g=getmaxmin(canv.path);
		canv.bleft=g.mnx;
		canv.bwidth=g.mxx-g.mnx;
		canv.btop=g.mny;
		canv.bheight=g.mxy-g.mny;
		drawline(canv);
	}
}

function lastBezPoint(cur,canv)
{
	$('bodydiv').onclick=function(e){checkBoundary(shiftdown(e),getPosition(e),canv)};
	$('bodydiv').ondblclick=function(){};
	$('bodydiv').onmousemove=function(){};
	$('bodydiv').style.cursor='default';
	if (canv.path[0]=='closed')
	{
		var l=canv.path.length-1;
		var sx = canv.path[l][5];
		var sy = canv.path[l][6];
		var ex =canv.path[3][1];
		var ey =canv.path[3][2]
		var dx = (ex-sx)/4;
		var dy = (ey-sy)/4;
		var ccur={x:sx+dx,y:sy+dy};
		var tempary=[];
		tempary.push('B');
		tempary.push(ccur.x);
		tempary.push(ccur.y);

		var ccur={x:ex-dx,y:ey-dy};
		tempary.push(ccur.x);
		tempary.push(ccur.y);	

		tempary.push(ex);
		tempary.push(ey);
		canv.path.push(tempary);
		canv.complete=true;
		g=getmaxmin(canv.path);
		canv.bleft=g.mnx;
		canv.bwidth=g.mxx-g.mnx;
		canv.btop=g.mny;
		canv.bheight=g.mxy-g.mny;
	}
	drawline(canv);
	markLine(canv);
}


function updateBezPoints(canv,mrk)
{
	var i= parseInt(mrk.id.substr(3))+2;
	i = Math.floor(i/3)+3;
	var tp=parseInt($(mrk.id).style.top);
	var lf=parseInt($(mrk.id).style.left);
	tp=Math.round(tp/ygrid)*ygrid-4;
	lf=Math.round(lf/xgrid)*xgrid-4;
	$(mrk.id).style.top=tp;
	$(mrk.id).style.left=lf;
	if (i==3)
	{
		
		if (canv.path[2]=='curve' || canv.path[2]=='freeform')
		{
			canv.path[i+1][1]+=lf+4-canv.path[i][1];
			canv.path[i+1][2]+=tp+4-canv.path[i][2];
		}
		canv.path[i][1]=lf+4;
		canv.path[i][2]=tp+4;
		if (canv.path[2]=='freeform')
		{
			var l=canv.path.length-1;
			canv.path[l][1]+=lf+4-canv.path[l][5];
			canv.path[l][2]+=tp+4-canv.path[l][6];
			canv.path[l][5]=lf+4;
			canv.path[l][6]=tp+4;
			
		}
	}
	else if (i==canv.path.length-1 && canv.path[2]=='curve' && canv.path[i][0]=='B')
	{
		canv.path[i][5]=lf+4;
		canv.path[i][6]=tp+4;		
	}
	else if (canv.path[i][0]=='L')
	{
		canv.path[i][1]=lf+4;
		canv.path[i][2]=tp+4;
	} 
	else
	{
		canv.path[i+1][1]+=lf+4-canv.path[i][5];
		canv.path[i+1][2]+=tp+4-canv.path[i][6];
		canv.path[i][3]+=lf+4-canv.path[i][5];
		canv.path[i][4]+=tp+4-canv.path[i][6];		
		canv.path[i][5]=lf+4;
		canv.path[i][6]=tp+4;		
	}
	g=getmaxmin(canv.path);
	canv.bleft=g.mnx;
	canv.bwidth=g.mxx-g.mnx;
	canv.btop=g.mny;
	canv.bheight=g.mxy-g.mny;
	drawline(canv);
	markLine(canv);
}

function updateCtrlBezPoints(canv,mrk)
{	
	var i= parseInt(mrk.id.substr(3));
	j = Math.floor((i+3)/3)+3;
	var tp=parseInt($(mrk.id).style.top);
	var lf=parseInt($(mrk.id).style.left);
	if (i%3==2)
	{
		var t=i+1;
		if (i+1==lnmrks) {t=0};
	}
	else
	{
		var t =i-1;
	}
	canv.path[j][1+2*((i-1)%3)]=lf+4;
	canv.path[j][2+2*((i-1)%3)]=tp+4;
	if ($('lnm'+t).type=='smooth')
	{
		if (i%3==2)
		{
			if(i+1==lnmrks)
			{
				var nj=3;
			}
			else
			{
				var nj=j;
			}			
			var x0=canv.path[j][5];
			var y0=canv.path[j][6];
			canv.path[nj+1][1]=2*x0-canv.path[j][1+2*((i-1)%3)];
			canv.path[nj+1][2]=2*y0-canv.path[j][2+2*((i-1)%3)];
			if (i+1==lnmrks)
			{
				$('lnm1').style.left=canv.path[nj+1][1]-4;
				$('lnm1').style.top=canv.path[nj+1][2]-4;
			}
			else
			{
				$('lnm'+(i+2)).style.left=canv.path[nj+1][1]-4;
				$('lnm'+(i+2)).style.top=canv.path[nj+1][2]-4;
			}
		}
		else
		{
			if(i==1)
			{
				var nj=canv.path.length;
			}
			else
			{
				var nj=j;
			}
			var x0=canv.path[nj-1][5];
			var y0=canv.path[nj-1][6];
			canv.path[nj-1][3]=2*x0-canv.path[j][1+2*((i-1)%3)];
			canv.path[nj-1][4]=2*y0-canv.path[j][2+2*((i-1)%3)];
			if (i==1)
			{
				$('lnm'+(lnmrks-1)).style.left=canv.path[nj-1][3]-4;
				$('lnm'+(lnmrks-1)).style.top=canv.path[nj-1][4]-4;
			}
			else
			{
				$('lnm'+(i-2)).style.left=canv.path[nj-1][3]-4;
				$('lnm'+(i-2)).style.top=canv.path[nj-1][4]-4;
			}
		}
	}
	if ($('lnm'+t).type=='in-line')
	{
		if (i%3==2)
		{
			if(i+1==lnmrks)
			{
				var nj=3;
			}
			else
			{
				var nj=j;
			}			
			var x0=canv.path[j][5];
			var y0=canv.path[j][6];
			var r = Math.sqrt((x0-canv.path[nj+1][1])*(x0-canv.path[nj+1][1])+(y0-canv.path[nj+1][2])*(y0-canv.path[nj+1][2]));
			var theta =arctan(x0-canv.path[j][1+2*((i-1)%3)],y0-canv.path[j][2+2*((i-1)%3)])
			canv.path[nj+1][1]=x0+r*Math.cos(theta);
			canv.path[nj+1][2]=y0+r*Math.sin(theta);
			if (i+1==lnmrks)
			{
				$('lnm1').style.left=canv.path[nj+1][1]-4;
				$('lnm1').style.top=canv.path[nj+1][2]-4;
			}
			else
			{
				$('lnm'+(i+2)).style.left=canv.path[nj+1][1]-4;
				$('lnm'+(i+2)).style.top=canv.path[nj+1][2]-4;
			}
		}
		else
		{
			if(i==1)
			{
				var nj=canv.path.length;
			}
			else
			{
				var nj=j;
			}
			var x0=canv.path[nj-1][5];
			var y0=canv.path[nj-1][6];
			var r = Math.sqrt((x0-canv.path[nj-1][3])*(x0-canv.path[nj-1][3])+(y0-canv.path[nj-1][4])*(y0-canv.path[nj-1][4]));
			var theta =arctan(x0-canv.path[j][1+2*((i-1)%3)],y0-canv.path[j][2+2*((i-1)%3)]);
			canv.path[nj-1][3]=x0+r*Math.cos(theta);
			canv.path[nj-1][4]=y0+r*Math.sin(theta);			
			if (i==1)
			{
				$('lnm'+(lnmrks-1)).style.left=canv.path[nj-1][3]-4;
				$('lnm'+(lnmrks-1)).style.top=canv.path[nj-1][4]-4;
			}
			else
			{
				$('lnm'+(i-2)).style.left=canv.path[nj-1][3]-4;
				$('lnm'+(i-2)).style.top=canv.path[nj-1][4]-4;
			}
		}		
	}
	g=getmaxmin(canv.path);	
	canv.bleft=g.mnx;
	canv.bwidth=g.mxx-g.mnx;
	canv.btop=g.mny;
	canv.bheight=g.mxy-g.mny;
	drawline(canv);
	drawbezguides(canv);
}


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

       


