/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

function Point(t,x,y)
{
	this.type=t;
	this.x=x;
	this.y=y;
}

function Path()
{
	this.points=[];
}

function Shape(name,open,editable,type) 
{
   	this.name=name;
   	this.open=open;
   	this.editable=editable;
   	this.type=type; 
   	this.path=new Path();
   	this.psuid=this.id;
   	this.style.position='absolute';
   	this.bleft=90; 
   	this.btop= 90;
   	this.bwidth=50;
   	this.bheight=50;
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
   	this.style.zIndex=this.zIndex;
   	this.rotate=0;
   	this.clockw=true;
   	this.complete=false;
   	this.group=[];
   	this.boundary='empty';
   	this.beztypes=[];
   	this.radius=10;
   	this.Canvas = document.createElement('canvas');
   	this.Canvas.style.left=0; 
   	this.Canvas.style.top= 0;
   	this.Canvas.width=parseInt($('bodydiv').style.width);
   	this.Canvas.height=parseInt($('bodydiv').style.height);
   	$('canvasdiv').appendChild(this.Canvas);

   	if (ieb) {this.Canvas=G_vmlCanvasManager.initElement(this.Canvas)}
   	if (this.Canvas.getContext)
	{
        this.Canvas.ctx = this.Canvas.getContext('2d');
    }
   	SHAPE[this.name]=this;
   	
   	//methods
   	this.createBoundary=createBoundary;
   	this.removeBoundary=removeBoundary;
   	
   	this.setPath=setPath;
   	
   	return this;
   	
}


function setPath(cursor)
{
	var p=new Point("M",Math.round(cur.x/xgrid)*xgrid,Math.round((cur.y)/ygrid)*ygrid);
	switch (this.type)
	{
		case "line":
			this.Path.push(p);
			p.type="L";
			this.Path.push(p);
		break
		case "arc":
		break
		case "curve":
		break 
		case "freeform":
		break
		case "square":
		break
		case "circle":
		break
		case "rounded_square":
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
function createLine(cur,canv)
{
	cur.x=Math.round(cur.x/xgrid)*xgrid;
	cur.y=Math.round((cur.y-52)/ygrid)*ygrid;
	canv.bleft=cur.x;
	canv.btop=cur.y;
	canv.bwidth=50;
	canv.bheight=50;
	ln=new linemarker(lnmrks++,cur,'white');
	ln.style.zIndex=zpos++;
	var tempary=[];
	tempary.push('M');
	tempary.push(cur.x);
	tempary.push(cur.y);
	canv.path.push(tempary);
	DDln=new YAHOO.util.DD(ln.id);
	DDln.onDrag=function(){updatepoints(canv,this)};
	$('bodydiv').onmouseup=function(e){drawEndPoint(getPosition(e),canv)};
	tempary=[];
	tempary.push('L');
	tempary.push(cur.x);
	tempary.push(cur.y);
	canv.path.push(tempary);
	drawline(canv);
	$('bodydiv').onmousemove=function(e) {drawGuide(getPosition(e),canv)};
}

function drawGuide(cur,canv)
{
	cur.x=Math.round(cur.x/xgrid)*xgrid;
	cur.y=Math.round((cur.y-52)/ygrid)*ygrid;
	canv.path[4][1]=cur.x;
	canv.path[4][2]=cur.y;
	drawline(canv);
}

function drawEndPoint(cur,canv)
{
	cur.x=Math.round(cur.x/xgrid)*xgrid;
	cur.y=Math.round((cur.y-52)/ygrid)*ygrid;
	$('bodydiv').onmousemove=function() {};
	$('bodydiv').onmouseup=function() {};
	$('bodydiv').onmousedown=function() {};
	ln=new linemarker(lnmrks++,cur, 'white');
	ln.style.zIndex=zpos++;
	canv.path[4][1]=cur.x;
	canv.path[4][2]=cur.y;
	DDln=new YAHOO.util.DD(ln.id);
	DDln.onDrag=function(){updatepoints(canv,this)};
	$('bodydiv').onclick=function(e){checkBoundary(shiftdown(e),getPosition(e),canv)};
	$('bodydiv').style.cursor='default';
	g=getmaxmin(canv.path);
	canv.bleft=g.mnx;
	canv.bwidth=g.mxx-g.mnx;
	canv.btop=g.mny;
	canv.bheight=g.mxy-g.mny;
	drawline(canv);	
	
}


function updatepoints(canv,mrk)
{
	var i= parseInt(mrk.id.substr(3))+3;
	var tp=parseInt($(mrk.id).style.top);
	var lf=parseInt($(mrk.id).style.left);
	tp=Math.round(tp/ygrid)*ygrid-4;
	lf=Math.round(lf/xgrid)*xgrid-4;
	$(mrk.id).style.top=tp;
	$(mrk.id).style.left=lf;
	var tempary=[];
	tempary.push(canv.path[i][0]);
	tempary.push(lf+4);
	tempary.push(tp+4);
	canv.path[i]=tempary;
	g=getmaxmin(canv.path);
	canv.bleft=g.mnx;
	canv.bwidth=g.mxx-g.mnx;
	canv.btop=g.mny;
	canv.bheight=g.mxy-g.mny;
	drawline(canv);
}


function createSqu(cur,canv)
{
	cur.x=Math.round(cur.x/xgrid)*xgrid;
	cur.y=Math.round((cur.y-52)/ygrid)*ygrid
	canv.bleft=cur.x;
	canv.btop=cur.y;
	canv.bwidth=50;
	canv.bheight=50;
	var tempary=[];
	tempary.push('M');
	tempary.push(cur.x);
	tempary.push(cur.y);
	canv.path.push(tempary);
	$('bodydiv').onmouseup=function(e){drawEndSqu(getPosition(e),canv)};
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
	drawline(canv);
	$('bodydiv').onmousemove=function(e) {drawGuideSqu(getPosition(e),canv)};
}

function drawGuideSqu(cur,canv)
{
	cur.x=Math.round(cur.x/xgrid)*xgrid;
	cur.y=Math.round((cur.y-52)/ygrid)*ygrid
	if (cur.x>cur.y)
	{
		var dx=cur.x-canv.path[3][1];
	}
	else
	{
		var dx=cur.y-canv.path[3][2];
	}
	canv.path[4][1]=canv.path[3][1]+dx;
	canv.path[4][2]=canv.path[3][2];
	canv.path[5][1]=canv.path[4][1];
	canv.path[5][2]=canv.path[3][2]+dx;
	canv.path[6][1]=canv.path[3][1];
	canv.path[6][2]=canv.path[5][2];
	canv.path[7][1]=canv.path[3][1];
	canv.path[7][2]=canv.path[3][2];
	drawline(canv);
}

function drawEndSqu(cur,canv)
{
	$('bodydiv').onmousemove=function() {};
	$('bodydiv').onmouseup=function() {};
	$('bodydiv').onmousedown=function() {};
	shapejustcreated=true;
	cur.x=Math.round(cur.x/xgrid)*xgrid;
	cur.y=Math.round((cur.y-52)/ygrid)*ygrid
	if (cur.x>cur.y)
	{
		var dx=cur.x-canv.path[3][1];
	}
	else
	{
		var dx=cur.y-canv.path[3][2];
	}
	canv.path[4][1]=canv.path[3][1]+dx;
	canv.path[4][2]=canv.path[3][2];
	canv.path[5][1]=canv.path[4][1];
	canv.path[5][2]=canv.path[3][2]+dx;
	canv.path[6][1]=canv.path[3][1];
	canv.path[6][2]=canv.path[5][2];
	canv.path[7][1]=canv.path[3][1];
	canv.path[7][2]=canv.path[3][2];
	$('bodydiv').onclick=function(e){checkBoundary(shiftdown(e),getPosition(e),canv)};
	$('bodydiv').style.cursor='default';
	g=getmaxmin(canv.path);
	canv.bleft=g.mnx;
	canv.bwidth=g.mxx-g.mnx;
	canv.btop=g.mny;
	canv.bheight=g.mxy-g.mny;
	drawline(canv);
	canv.createBoundary();
	selected.push(canv);
	showtools(canv);
}



function createRndSqu(cur,canv)
{
	cur.x=Math.round(cur.x/xgrid)*xgrid;
	cur.y=Math.round((cur.y-52)/ygrid)*ygrid
	canv.bleft=cur.x;
	canv.btop=cur.y;
	canv.bwidth=50;
	canv.bheight=50;
	$('bodydiv').onmouseup=function(e){drawEndRndSqu(getPosition(e),canv)};
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
	//top
	tempary=[];   
	tempary.push('L');
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
	//right
	tempary=[];
	tempary.push('L');
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
	//bottom
	tempary=[];   
	tempary.push('L');
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
	//left
	tempary=[];
	tempary.push('L');
	tempary.push(cur.x);
	tempary.push(cur.y);
	canv.path.push(tempary);
	drawline(canv);
	$('bodydiv').onmousemove=function(e) {drawGuideRndSqu(getPosition(e),canv)};
}

function drawGuideRndSqu(cur,canv)
{
	cur.x=Math.round(cur.x/xgrid)*xgrid;
	cur.y=Math.round((cur.y-52)/ygrid)*ygrid
	if (cur.x>cur.y)
	{
		var dx=cur.x-canv.bleft;
	}
	else
	{
		var dx=cur.y-canv.btop;
	}	
	if (dx<20)
	{
		canv.radius=dx/4;
	}
	else
	{
		canv.radius=10;
	}
	canv.bwidth=dx;
	canv.bheight=dx;
	canv.inwidth=canv.bwidth-2*canv.radius;
	canv.inheight=canv.inwidth;
	var k=4*(Math.SQRT2-1)/3;
	canv.path[3][1]=canv.bleft;
	canv.path[3][2]=canv.btop+canv.radius
	canv.path[4][1]=canv.path[3][1];
	canv.path[4][2]=canv.path[3][2]-canv.radius*k;
	canv.path[4][3]=canv.path[3][1]+canv.radius*(1-k);
	canv.path[4][4]=canv.btop;
	canv.path[4][5]=canv.bleft+canv.radius;
	canv.path[4][6]=canv.path[4][4];
	//top
	canv.path[5][1]=canv.path[4][5]+canv.inwidth
	canv.path[5][2]=canv.path[4][6];
	canv.path[6][1]=canv.path[5][1]+canv.radius*k;
	canv.path[6][2]=canv.path[5][2];
	canv.path[6][3]=canv.path[5][1]+canv.radius;
	canv.path[6][4]=canv.path[5][2]+canv.radius*(1-k);
	canv.path[6][5]=canv.path[5][1]+canv.radius;
	canv.path[6][6]=canv.path[5][2]+canv.radius;
	//right
	canv.path[7][1]=canv.path[6][5];
	canv.path[7][2]=canv.path[6][6]+canv.inwidth	
	canv.path[8][1]=canv.path[7][1];
	canv.path[8][2]=canv.path[7][2]+canv.radius*k;
	canv.path[8][3]=canv.path[7][1]-canv.radius*(1-k);
	canv.path[8][4]=canv.path[7][2]+canv.radius;
	canv.path[8][5]=canv.path[7][1]-canv.radius;
	canv.path[8][6]=canv.path[7][2]+canv.radius;
	//bottom
	canv.path[9][1]=canv.path[8][5]-canv.inwidth;
	canv.path[9][2]=canv.path[8][6];
	canv.path[10][1]=canv.path[9][1]-canv.radius*(1-k);
	canv.path[10][2]=canv.path[9][2];
	canv.path[10][3]=canv.path[3][1];
	canv.path[10][4]=canv.path[9][2]-canv.radius*(1-k);
	canv.path[10][5]=canv.path[3][1];
	canv.path[10][6]=canv.path[9][2]-canv.radius;
	//left
	canv.path[11][1]=canv.path[3][1];
	canv.path[11][2]=canv.path[3][2];
	drawline(canv);
}

function drawEndRndSqu(cur,canv)
{
	cur.x=Math.round(cur.x/xgrid)*xgrid;
	cur.y=Math.round((cur.y-52)/ygrid)*ygrid;
	$('bodydiv').onmousemove=function() {};
	$('bodydiv').onmouseup=function() {};
	$('bodydiv').onmousedown=function() {};
	if (cur.x>cur.y)
	{
		var dx=cur.x-canv.bleft;
	}
	else
	{
		var dx=cur.y-canv.btop;
	}	
	if (dx<20)
	{
		canv.radius=dx/4;
	}
	else
	{
		canv.radius=10;
	}
	if (dx<20)
	{
		canv.radius=dx/2;
	}
	else
	{
		canv.radius=10;
	}
	canv.bwidth=dx;
	canv.bheight=dx;
	drawrndsq(canv);
	$('bodydiv').onclick=function(e){checkBoundary(shiftdown(e),getPosition(e),canv)};
	$('bodydiv').style.cursor='default';
	markLine(canv);
}

function drawrndsq(canv)
{
	var k=4*(Math.SQRT2-1)/3;
	canv.inwidth=canv.bwidth-2*canv.radius;
	canv.inheight=canv.bheight-2*canv.radius;
	canv.path[3][1]=canv.bleft;
	canv.path[3][2]=canv.btop+canv.radius
	canv.path[4][1]=canv.path[3][1];
	canv.path[4][2]=canv.path[3][2]-canv.radius*k;
	canv.path[4][3]=canv.path[3][1]+canv.radius*(1-k);
	canv.path[4][4]=canv.btop;
	canv.path[4][5]=canv.bleft+canv.radius;
	canv.path[4][6]=canv.path[4][4];
	//top
	canv.path[5][1]=canv.path[4][5]+canv.inwidth
	canv.path[5][2]=canv.path[4][6];
	canv.path[6][1]=canv.path[5][1]+canv.radius*k;
	canv.path[6][2]=canv.path[5][2];
	canv.path[6][3]=canv.path[5][1]+canv.radius;
	canv.path[6][4]=canv.path[5][2]+canv.radius*(1-k);
	canv.path[6][5]=canv.path[5][1]+canv.radius;
	canv.path[6][6]=canv.path[5][2]+canv.radius;
	//right
	canv.path[7][1]=canv.path[6][5];
	canv.path[7][2]=canv.path[6][6]+canv.inheight	
	canv.path[8][1]=canv.path[7][1];
	canv.path[8][2]=canv.path[7][2]+canv.radius*k;
	canv.path[8][3]=canv.path[7][1]-canv.radius*(1-k);
	canv.path[8][4]=canv.path[7][2]+canv.radius;
	canv.path[8][5]=canv.path[7][1]-canv.radius;
	canv.path[8][6]=canv.path[7][2]+canv.radius;
	//bottom
	canv.path[9][1]=canv.path[8][5]-canv.inwidth;
	canv.path[9][2]=canv.path[8][6];
	canv.path[10][1]=canv.path[9][1]-canv.radius*(1-k);
	canv.path[10][2]=canv.path[9][2];
	canv.path[10][3]=canv.path[3][1];
	canv.path[10][4]=canv.path[9][2]-canv.radius*(1-k);
	canv.path[10][5]=canv.path[3][1];
	canv.path[10][6]=canv.path[9][2]-canv.radius;
	//left
	canv.path[11][1]=canv.path[3][1];
	canv.path[11][2]=canv.path[3][2];
	drawline(canv);
}

function updateRnSquRadius(canv,mrk)
{
	$(mrk.id).style.top=canv.btop-4;
	var lf=parseInt($(mrk.id).style.left);
	var newradius=lf+4-canv.bleft;
	var newinlength=canv.bwidth-2*newradius;
	var newinheight=canv.bheight-2*newradius;
	if (newradius<10 || newinlength<2 || newinheight<2)
	{
		$(mrk.id).style.left=canv.path[4][5]-4;
	}
	else
	{
		canv.radius=newradius;
		canv.inwidth=newinlength;
		canv.inheight=newinheight;
		drawrndsq(canv);
	}
}


function createTri(cur,canv)
{
	cur.x=Math.round(cur.x/xgrid)*xgrid;
	cur.y=Math.round((cur.y-52)/ygrid)*ygrid
	canv.bleft=cur.x;
	canv.btop=cur.y;
	canv.bwidth=50;
	canv.bheight=50;
	var tempary=[];
	tempary.push('M');
	tempary.push(cur.x);
	tempary.push(cur.y);
	canv.path.push(tempary);
	$('bodydiv').onmouseup=function(e){drawEndTri(getPosition(e),canv)};
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
	tempary=[];
	tempary.push('L');
	tempary.push(cur.x);
	tempary.push(cur.y);
	canv.path.push(tempary);
	drawline(canv);
	$('bodydiv').onmousemove=function(e) {drawGuideTri(getPosition(e),canv)};
}

function drawGuideTri(cur,canv)
{
	cur.x=Math.round(cur.x/xgrid)*xgrid;
	cur.y=Math.round((cur.y-52)/ygrid)*ygrid;
	var nx=Math.max(cur.x-canv.bleft,cur.y-canv.btop);
	canv.path[3][1]=canv.bleft+nx/2;
	canv.path[3][2]=canv.btop;
	canv.path[4][1]=canv.bleft+nx;
	canv.path[4][2]=canv.btop+nx;
	canv.path[5][1]=canv.bleft;
	canv.path[5][2]=canv.btop+nx;
	canv.path[6][1]=canv.path[3][1];
	canv.path[6][2]=canv.path[3][2];
	drawline(canv);
}

function drawEndTri(cur,canv)
{
	$('bodydiv').onmousemove=function() {};
	$('bodydiv').onmouseup=function() {};
	$('bodydiv').onmousedown=function() {};
	shapejustcreated=true;
	cur.x=Math.round(cur.x/xgrid)*xgrid;
	cur.y=Math.round((cur.y-52)/ygrid)*ygrid;
	var nx=Math.max(cur.x-canv.bleft,cur.y-canv.btop);
	canv.path[3][1]=canv.bleft+nx/2;
	canv.path[3][2]=canv.btop;
	canv.path[4][1]=canv.bleft+nx;
	canv.path[4][2]=canv.btop+nx;
	canv.path[5][1]=canv.bleft;
	canv.path[5][2]=canv.btop+nx;
	canv.path[6][1]=canv.path[3][1];
	canv.path[6][2]=canv.path[3][2];
	$('bodydiv').onclick=function(e){checkBoundary(shiftdown(e),getPosition(e),canv)};
	$('bodydiv').style.cursor='default';
	g=getmaxmin(canv.path);
	canv.bleft=g.mnx;
	canv.bwidth=g.mxx-g.mnx;
	canv.btop=g.mny;
	canv.bheight=g.mxy-g.mny;
	drawline(canv);	
	canv.createBoundary();
	selected.push(canv);
	showtools(canv);
}

function createRgtTri(cur,canv)
{
	cur.x=Math.round(cur.x/xgrid)*xgrid;
	cur.y=Math.round((cur.y-52)/ygrid)*ygrid;
	canv.bleft=cur.x;
	canv.btop=cur.y;
	canv.bwidth=50;
	canv.bheight=50;
	var tempary=[];
	tempary.push('M');
	tempary.push(cur.x);
	tempary.push(cur.y);
	canv.path.push(tempary);
	$('bodydiv').onmouseup=function(e){drawEndRgtTri(getPosition(e),canv)};
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
	tempary=[];
	tempary.push('L');
	tempary.push(cur.x);
	tempary.push(cur.y);
	canv.path.push(tempary);
	drawline(canv);
	$('bodydiv').onmousemove=function(e) {drawGuideRgtTri(getPosition(e),canv)};
}

function drawGuideRgtTri(cur,canv)
{
	cur.x=Math.round(cur.x/xgrid)*xgrid;
	cur.y=Math.round((cur.y-52)/ygrid)*ygrid;
	var nx=Math.max(cur.x-canv.bleft,cur.y-canv.btop);
	canv.path[3][1]=canv.bleft+nx/2;
	canv.path[3][2]=canv.btop;
	canv.path[4][1]=canv.bleft+nx/2;
	canv.path[4][2]=canv.btop+nx;
	canv.path[5][1]=canv.bleft;
	canv.path[5][2]=canv.btop+nx;
	canv.path[6][1]=canv.path[3][1];
	canv.path[6][2]=canv.path[3][2];
	drawline(canv);
}

function drawEndRgtTri(cur,canv)
{
	$('bodydiv').onmousemove=function() {};
	$('bodydiv').onmouseup=function() {};
	$('bodydiv').onmousedown=function() {};
	shapejustcreated=true;
	cur.x=Math.round(cur.x/xgrid)*xgrid;
	cur.y=Math.round((cur.y-52)/ygrid)*ygrid;
	var nx=Math.max(cur.x-canv.bleft,cur.y-canv.btop);
	canv.path[3][1]=canv.bleft+nx/2;
	canv.path[3][2]=canv.btop;
	canv.path[4][1]=canv.bleft+nx/2;
	canv.path[4][2]=canv.btop+nx;
	canv.path[5][1]=canv.bleft;
	canv.path[5][2]=canv.btop+nx;
	canv.path[6][1]=canv.path[3][1];
	canv.path[6][2]=canv.path[3][2];
	$('bodydiv').onclick=function(e){checkBoundary(shiftdown(e),getPosition(e),canv)};
	$('bodydiv').style.cursor='default';
	g=getmaxmin(canv.path);
	canv.bleft=g.mnx;
	canv.bwidth=g.mxx-g.mnx;
	canv.btop=g.mny;
	canv.bheight=g.mxy-g.mny;
	drawline(canv);
	canv.createBoundary();
	selected.push(canv);
	showtools(canv);
}

function createCircle(cur,canv)
{
	cur.x=Math.round(cur.x/xgrid)*xgrid;
	cur.y=Math.round((cur.y-52)/ygrid)*ygrid;
	canv.bleft=cur.x;
	canv.btop=cur.y;
	canv.bwidth=50;
	canv.bheight=50;
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
	tempary=[];
	tempary.push('B');
	tempary.push(cur.x);
	tempary.push(cur.y);
	tempary.push(cur.x);
	tempary.push(cur.y);
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
	tempary=[];
	tempary.push('B');
	tempary.push(cur.x);
	tempary.push(cur.y);
	tempary.push(cur.x);
	tempary.push(cur.y);
	tempary.push(cur.x);
	tempary.push(cur.y);
	canv.path.push(tempary);
	drawline(canv);
	$('bodydiv').onmouseup=function(e){drawEndCircle(getPosition(e),canv)};
	$('bodydiv').onmousemove=function(e) {drawGuideCircle(getPosition(e),canv)};
}

function drawGuideCircle(cur,canv)
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
	canv.path[3][1]=cx+nx;
	canv.path[3][2]=cy;
	canv.path[4][1]=cx+nx*(1+k);
	canv.path[4][2]=cy;
	canv.path[4][3]=cx+2*nx;
	canv.path[4][4]=cy+nx*(1-k);
	canv.path[4][5]=cx+2*nx;
	canv.path[4][6]=cy+nx;
	canv.path[5][1]=cx+2*nx;
	canv.path[5][2]=cy+nx*(1+k);
	canv.path[5][3]=cx+nx*(1+k);
	canv.path[5][4]=cy+2*nx;
	canv.path[5][5]=cx+nx;
	canv.path[5][6]=cy+2*nx;
	canv.path[6][1]=cx+nx*(1-k);
	canv.path[6][2]=cy+2*nx;
	canv.path[6][3]=cx;
	canv.path[6][4]=cy+nx*(1+k)
	canv.path[6][5]=cx;
	canv.path[6][6]=cy+nx;
	canv.path[7][1]=cx;
	canv.path[7][2]=cy+nx*(1-k);
	canv.path[7][3]=cx+nx*(1-k);
	canv.path[7][4]=cy;
	canv.path[7][5]=cx+nx;
	canv.path[7][6]=cy;	
	drawline(canv);
}

function drawEndCircle(cur,canv)
{
	cur.x=Math.round(cur.x/xgrid)*xgrid;
	cur.y=Math.round((cur.y-52)/ygrid)*ygrid;
	$('bodydiv').onmousemove=function() {};
	$('bodydiv').onmouseup=function() {};
	$('bodydiv').onmousedown=function() {};
	shapejustcreated=true;
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
	canv.path[3][1]=cx+nx;
	canv.path[3][2]=cy;
	canv.path[4][1]=cx+nx*(1+k);
	canv.path[4][2]=cy;
	canv.path[4][3]=cx+2*nx;
	canv.path[4][4]=cy+nx*(1-k);
	canv.path[4][5]=cx+2*nx;
	canv.path[4][6]=cy+nx;
	canv.path[5][1]=cx+2*nx;
	canv.path[5][2]=cy+nx*(1+k);
	canv.path[5][3]=cx+nx*(1+k);
	canv.path[5][4]=cy+2*nx;
	canv.path[5][5]=cx+nx;
	canv.path[5][6]=cy+2*nx;
	canv.path[6][1]=cx+nx*(1-k);
	canv.path[6][2]=cy+2*nx;
	canv.path[6][3]=cx;
	canv.path[6][4]=cy+nx*(1+k)
	canv.path[6][5]=cx;
	canv.path[6][6]=cy+nx;
	canv.path[7][1]=cx;
	canv.path[7][2]=cy+nx*(1-k);
	canv.path[7][3]=cx+nx*(1-k);
	canv.path[7][4]=cy;
	canv.path[7][5]=cx+nx;
	canv.path[7][6]=cy;		
	$('bodydiv').onclick=function(e){checkBoundary(shiftdown(e),getPosition(e),canv)};
	$('bodydiv').style.cursor='default';
	g=getmaxmin(canv.path);
	canv.bleft=g.mnx;
	canv.bwidth=g.mxx-g.mnx;
	canv.btop=g.mny;
	canv.bheight=g.mxy-g.mny;
	drawline(canv);	
	canv.createBoundary();
	selected.push(canv);
	showtools(canv);
}


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

function arctan(x,y)
{
	var theta = Math.atan(Math.abs(y/x));
	if (x>=0)
	{
		if (y<0) {theta = 2*Math.PI-theta};
	}
	else
	{
		if (y>=0)
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

function rotate(a,x,y,d) //a angle, d direction
{
	
	if (d=='C')
	{
		d=1	
	}
	else
	{
		d=-1
	}
	return {x:x*Math.cos(a)-d*y*Math.sin(a),y:d*x*Math.sin(a)+y*Math.cos(a)}
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

       


