/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function TweenNode(point,ctrl1,ctrl2)
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
		this.vertex="L"
	}
	
	this.rotate=rotate;
	this.scaleY=scaleY;
	this.translate=translate;
}

function Tween(name)
{
	this.name=name;
	this.title;
	this.shapes={};
	this.groups={};
	this.copy={shapes:{},groups:{}};
	this.nodePaths={} //list of paths between shape nodes and copy nodes
	//this.ctrl1Paths={};
	//this.ctrl2Paths={};
	this.translate={active:false,twtime:10,repeat:1,counter:0,yoyo:false,ptr:0}; //if translate and rotate both acitve must share twtime, repeat and yoyo
	this.rotate={active:false,twtime:10,repeat:1,yoyo:false,ptr:0,mx:0,clkw:true};
	this.linestyles={active:false,twtime:10,repeat:1,counter:0,yoyo:false,points:[],ptr:0};
	this.linecolour={active:false,twtime:10,repeat:1,counter:0,yoyo:false,points:[],ptr:0};
	this.fillcolour={active:false,twtime:10,repeat:1,counter:0,yoyo:false,points:[],ptr:0};
	this.gradfill={active:false,twtime:10,repeat:1,counter:0,yoyo:false,points:[],ptr:0};
	this.shadow={active:false,twtime:10,repeat:1,counter:0,yoyo:false,points:[],ptr:0};
	this.edit={active:false,twtime:10,repeat:1,counter:0,yoyo:false,ptr:0};
	this.linegrads=[];
	this.radgrads=[];
	this.nodeTweening={active:false,twtime:10,repeat:1,counter:0,yoyo:false}; //can be on (translate/rotate off) or off (translate/rotate on)
	this.pointTweening=false;  // if node changed - point or controls - then true and translate rotate off
	this.reverse=false;
	this.maxruntime=0;
	//this.ptime; //time over path from sprite.ptime;
	
	//methods
	this.setAniStage=setAniStage;
	this.copytween=copytween;
	this.drawtween=drawtween;
	this.getShape=getShape;
	this.TweenToText=TweenToText;
	this.tweenparams=tweenparams;
	this.nodepathparams=nodepathparams;
	this.copy.getShape=getShape;
	this.setNodeTweening;
	this.addAllToStage=addAllToStage;
	this.startNodePaths=startNodePaths; 
	this.setNodePaths=setNodePaths;
	this.prepareTweens=prepareTweens;
	this.setTweenTimeBox=setTweenTimeBox;
	this.zeroTweenPtrs=zeroTweenPtrs;
	this.updateTweenPtrs=updateTweenPtrs;
	this.tweenplay=tweenplay;
	this.tweenmove=tweenmove;
	this.setTweenActives=setTweenActives;
	this.getTweenActives=getTweenActives;
	this.transformTweeningPoints=transformTweeningPoints;
	this.gradlinetransform=gradlinetransform;
	this.betweenAngle=betweenAngle;
	this.reverseAll=reverseAll;
	this.tweenHTML=tweenHTML;
}

function copytween(theatre)
{
	theatre+="stage";
	var tween=new Tween("SUBTW"+(NCOUNT++));
	tween.title=this.title;
	elementShapeCopy(this.groups,tween.groups,tween.shapes,0,$(theatre));
	var shape=tween.getShape();
	shape.name="A"+shape.name;
	elementShapeCopy(this.copy.groups,tween.copy.groups,tween.copy.shapes,0,$(theatre));
	var copy=tween.copy.getShape();
	copy.name="B"+copy.name;
	tween.translate.active=this.translate.active;
	tween.translate.twtime=this.translate.twtime;
	tween.translate.repeat=this.translate.repeat;
	tween.translate.yoyo=this.translate.yoyo;
	tween.rotate.active=this.rotate.active;
	tween.rotate.twtime=this.rotate.twtime;
	tween.rotate.repeat=this.rotate.repeat;
	tween.rotate.yoyo=this.rotate.yoyo;
	tween.linestyles.active=this.linestyles.active;
	tween.linestyles.twtime=this.linestyles.twtime;
	tween.linestyles.repeat=this.linestyles.repeat;
	tween.linestyles.yoyo=this.linestyles.yoyo;
	tween.linecolour.active=this.linecolour.active;
	tween.linecolour.twtime=this.linecolour.twtime;
	tween.linecolour.repeat=this.linecolour.repeat;
	tween.linecolour.yoyo=this.linecolour.yoyo;
	tween.fillcolour.active=this.fillcolour.active;
	tween.fillcolour.twtime=this.fillcolour.twtime;
	tween.fillcolour.repeat=this.fillcolour.repeat;
	tween.fillcolour.yoyo=this.fillcolour.yoyo;
	tween.gradfill.active=this.gradfill.active;
	tween.gradfill.twtime=this.gradfill.twtime;
	tween.gradfill.repeat=this.gradfill.repeat;
	tween.gradfill.yoyo=this.gradfill.yoyo;
	tween.shadow.active=this.shadow.active;
	tween.shadow.twtime=this.shadow.twtime;
	tween.shadow.repeat=this.shadow.repeat;
	tween.shadow.yoyo=this.shadow.yoyo;
	tween.edit.active=this.edit.active;
	tween.edit.twtime=this.edit.twtime;
	tween.edit.repeat=this.edit.repeat;
	tween.edit.yoyo=this.edit.yoyo;
	tween.nodeTweening.active=this.nodeTweening.active;
	tween.nodeTweening.twtime=this.nodeTweening.twtime;
	tween.nodeTweening.repeat=this.nodeTweening.repeat;
	tween.nodeTweening.yoyo=this.nodeTweening.yoyo;
	tween.pointTweening=this.pointTweening;
	tween.reverse=this.reverse;
	if(this.nodeTweening.active || this.pointTweening)
	{
		var node=this.getShape().path.next;
		var newnode=tween.getShape().path.next;
		var copynode=tween.copy.getShape().path.next;
		while(node.point.x!="end")
		{
			newnode.nodepath=makeCopy(node.nodepath,0,$(theatre),tween.nodePaths,{});
			newnode.nodepath.group={};
			newnode.nodepath.nodeTweening={};
			newnode.nodepath.nodeTweening.active=node.nodepath.nodeTweening.active;
			newnode.nodepath.nodeTweening.repeat=node.nodepath.nodeTweening.repeat;
			newnode.nodepath.nodeTweening.yoyo=node.nodepath.nodeTweening.yoyo;
			newnode.nodepath.nodeTweening.twtime=node.nodepath.nodeTweening.twtime;
			copynode.nodepath=newnode.nodepath
			if(node.vertex=="B")
			{
				newnode.ctrl1path={};
				newnode.ctrl2path={};
			}
			node=node.next;
			newnode=newnode.next;
			copynode=copynode.next;
		}
	}
	return tween;
}

function drawtween()
{
	if(this.reverse)
	{
		var shape=this.copy.getShape();
	}
	else
	{
		var shape=this.getShape();
	}
	shape.draw();
	shape.Canvas.ctx.restore();
	shape.Canvas.ctx.save();
}

function savetween(tweendata)
{
	var tweenarray=tweendata.split(",");
	var filmname=tweenarray[0];
	var topname=tweenarray[1];
	var name=tweenarray[2];
	if(filmname=="nofilm!!!!")
	{
		if(topname=="nosprite!!!!")
		{
			var tween=TWEENS[name];
			var path="";
		}
		else
		{
			var topsprite=SPRITES[topname];
			var data=topsprite.getTween();
			var tween=data.tween;
			var path=data.path;
		}
	}
	else
	{
		var film=FILMS[filmname];
		if(topname=="nosprite!!!!")
		{
			var tween=film.getFlel(name);
			var path=film.title;
		}
		else
		{
			
			var topsprite=film.getFlel(topname);
			var data=topsprite.getTween();
			var tween=data.tween;
			var path=film.title+"/"+data.path;
		}
	}
	if(tween.nodeTweening.active || tween.pointTweening)
	{
		var npths=0;
		for(var name in tween.nodePaths)
		{
			npths++
		}
		if(npths==0)
		{
			tween.startNodePaths();
		}
		else
		{
			tween.setNodePaths();
		}
	}
	$("twbuttons").style.visibility="hidden";
	TWEENEDIT=false;
	tween.setTweenActives();
	tween.prepareTweens();
	tween.zeroTweenPtrs();
	if(tween.reverse)
	{
		tween.reverseAll();
	}
	closedone();
}

function checktween(tweendata)
{
	var node,tweennode;
	var tweenarray=tweendata.split(",");
	var filmname=tweenarray[0];
	var topname=tweenarray[1];
	var name=tweenarray[2];
	if(filmname=="nofilm!!!!")
	{
		if(topname=="nosprite!!!!")
		{
			var tween=TWEENS[name];
			var path="";
		}
		else
		{
			var topsprite=SPRITES[topname];
			var data=topsprite.getTween();
			var tween=data.tween;
			var path=data.path;
		}
	}
	else
	{
		var film=FILMS[filmname];
		if(topname=="nosprite!!!!")
		{
			var tween=film.getFlel(name);
			var path=film.title;
		}
		else
		{
			
			var topsprite=film.getFlel(topname);
			var data=topsprite.getTween();
			var tween=data.tween;
			var path=film.title+"/"+data.path;
		}
	}
	if(tween.nodeTweening.active || tween.pointTweening)
	{
		var npths=0;
		for(var name in tween.nodePaths)
		{
			npths++
		}
		if(npths==0)
		{
			tween.startNodePaths();
		}
		else
		{
			tween.setNodePaths();
		}
	}
	
	$("twbuttons").style.visibility="hidden";
	$("checkdone").style.visibility="visible";
	$("toolbar").style.visibility="hidden";
	$("menushape").style.visibility="hidden";
	$("grid").style.visibility="hidden";
	$('tweentimebox').style.visibility="hidden";
	$("tweenpathsstage").style.visibility="hidden";
	$("shadowbox").style.visibility="hidden";
	closeAllDialogues();
	clear($("markerdrop"));
	removeGradLine();
	closeStops();
	removeRotate();
	closeColor();
	$("rotatebox").style.visibility="hidden";
	$("gradfillbox").style.visibility="hidden";
	tween.stopchecking=false;
	STOPCHECKING=false;//set for check done button for sprite;
	if(tween.nodeTweening.active || tween.pointTweening)
	{
		var npths=0;
		for(var name in tween.nodePaths)
		{
			npths++
		}
		if(npths==0)
		{
			tween.startNodePaths();
		}
		else
		{
			tween.setNodePaths();
		}
	}
	tween.setTweenActives();
	tween.prepareTweens();
	var shape=tween.getShape();
	clear($("tweenstage"));
	tween.tweenshape.addTo($("tweenstage"));
	clear($("boundarydrop"));
	$("boundarydrop").style.visibility="hidden";
	tween.zeroTweenPtrs();
	if(tween.reverse)
	{
		tween.reverseAll();
	}
	tween.tweenplay();
}

function swaptween(tweendata)
{
	var tweenarray=tweendata.split(",");
	var filmname=tweenarray[0];
	var topname=tweenarray[1];
	var name=tweenarray[2];
	if(filmname=="nofilm!!!!")
	{
		if(topname=="nosprite!!!!")
		{
			var tween=TWEENS[name];
			var path="";
		}
		else
		{
			var topsprite=SPRITES[topname];
			var data=topsprite.getTween();
			var tween=data.tween;
			var path=data.path;
		}
	}
	else
	{
		var film=FILMS[filmname];
		if(topname=="nosprite!!!!")
		{
			var tween=film.getFlel(name);
			var path=film.title;
		}
		else
		{
			
			var topsprite=film.getFlel(topname);
			var data=topsprite.getTween();
			var tween=data.tween;
			var path=film.title+"/"+data.path;
		}
	}
	tween.reverse=!tween.reverse;
	var twtemp=$("twfirst").innerHTML;
	var twtempbkgdcl=$("twfirst").style.backgroundColor;
	$("twfirst").innerHTML=$("twlast").innerHTML;
	$("twlast").innerHTML=twtemp;
	$("twfirst").style.backgroundColor=$("twlast").style.backgroundColor;
	$("twlast").style.backgroundColor=twtempbkgdcl;
}

function addAllToStage(theatre)
{
	for(var name in this.shapes)
	{
		shape=this.shapes[name];
		shape.addTo(theatre);
	}
	for(var name in this.copy.shapes)
	{
		shape=this.copy.shapes[name];
		shape.addTo(theatre);
	}
}

function startNodePaths()
{
	var point,ctrl1,ctrl2;
	var start,last;
	this.nodeTweening.active=true;
	var shape=this.getShape();
	clear($("tweenpathsstage"));
	var copy=this.copy.getShape();
	var node=shape.path.next;
	var copynode=copy.path.next;
	while(node.point.x!="end")
	{
		node.nodepath=new Shape("NodePath"+SCOUNT,"NodePath"+(SCOUNT++),true,true,"curve",this.nodePaths);
		node.nodepath.zIndex=10000000;
		node.nodepath.strokeStyle=[0,255,0,1];
		node.nodepath.nodeTweening={active:true,twtime:this.nodeTweening.twtime,repeat:this.nodeTweening.repeat,yoyo:this.nodeTweening.yoyo};
		node.nodepath.addTo($("tweenpathsstage"));
		copynode.nodepath=node.nodepath;
		point=new Point(node.point.x,node.point.y);
		start=new Node(point);
		node.nodepath.addNode(start);
		point=new Point(copynode.point.x,copynode.point.y);
		last=new Node(point);
		node.nodepath.addNode(last);
		start=node.nodepath.path.next;
		last=node.nodepath.path.prev;
		ctrl1=new Point(start.point.x+(last.point.x-start.point.x)/4, start.point.y+(last.point.y-start.point.y)/4);
		ctrl2=new Point(last.point.x+(start.point.x-last.point.x)/4, last.point.y+(start.point.y-last.point.y)/4);
		last.setNode(point,ctrl1,ctrl2);
		if(node.vertex=="B")
		{
			node.linearCtrl2Path(copynode);
			node.linearCtrl1Path(copynode);
		}
		node=node.next;
		copynode=copynode.next;
	}
}

function linearCtrl1Path(copynode)
{
	this.ctrl1path=new Shape("ctrl1path"+SCOUNT,"ctrl1path"+(SCOUNT++),true,true,"curve",{});
	this.ctrl1path.zIndex=10000000;
	this.ctrl1path.strokeStyle=[75,100,75,1];
	this.ctrl1path.addTo($("tweenpathsstage"));	
	copynode.ctrl1path=this.ctrl1path;
	var point=new Point(this.ctrl1.x,this.ctrl1.y);
	var start=new Node(point);
	this.ctrl1path.addNode(start);
	point=new Point(copynode.ctrl1.x,copynode.ctrl1.y);
	var last=new Node(point);
	this.ctrl1path.addNode(last);
	start=this.ctrl1path.path.next;
	last=this.ctrl1path.path.prev;
	var ctrl1=new Point(start.point.x+(last.point.x-start.point.x)/4, start.point.y+(last.point.y-start.point.y)/4);
	var ctrl2=new Point(last.point.x+(start.point.x-last.point.x)/4, last.point.y+(start.point.y-last.point.y)/4);
	last.setNode(point,ctrl1,ctrl2);
}

function linearCtrl2Path(copynode)
{
	this.ctrl2path=new Shape("ctrl2path"+SCOUNT,"ctrl2path"+(SCOUNT++),true,true,"curve",{});
	this.ctrl2path.zIndex=20000000;
	this.ctrl2path.strokeStyle=[75,100,75,1];
	this.ctrl2path.addTo($("tweenpathsstage"));
	copynode.ctrl2path=this.ctrl2path;
	var point=new Point(this.ctrl2.x,this.ctrl2.y);
	var start=new Node(point);
	this.ctrl2path.addNode(start);
	point=new Point(copynode.ctrl2.x,copynode.ctrl2.y);
	var last=new Node(point);
	this.ctrl2path.addNode(last);
	start=this.ctrl2path.path.next;
	last=this.ctrl2path.path.prev;
	var ctrl1=new Point(start.point.x+(last.point.x-start.point.x)/4, start.point.y+(last.point.y-start.point.y)/4);
	var ctrl2=new Point(last.point.x+(start.point.x-last.point.x)/4, last.point.y+(start.point.y-last.point.y)/4);
	last.setNode(point,ctrl1,ctrl2);
}

function setNodePaths()
{
	clear($("tweenpathsstage"));
	$("tweenpathsstage").style.visibility="visible";
	var shape=this.getShape();
	var copy=this.copy.getShape();
	var node=shape.path.next;
	var copynode=copy.path.next;
	var point,ctrl1,ctrl2;
	var start,last;
	while(node.point.x!="end")
	{
		node.nodepath.addTo($("tweenpathsstage"));
		start=node.nodepath.path.next;
		start.setNode(node.point);
		last=node.nodepath.path.prev;
		last.setNode(copynode.point,last.ctrl1,last.ctrl2);
		node.setCtrlPaths(copynode);
		node=node.next;
		copynode=copynode.next;
	}
}

function setCtrlPaths(copynode) //sets the from node ctrl points to copynode ctrl points
{
	if(!this.shape.open && this.prev.point.x=="end")
	{
		if(this.prev.prev.vertex=="B")
		{
			this.prev.prev.nodepath=this.nodepath;
			this.prev.prev.setCtrl2Path(copynode.prev.prev);
			this.ctrl2path=this.prev.prev.ctrl2path;
		}
	}
	else
	{
		if(this.vertex=="B")
		{
			this.setCtrl2Path(copynode);
		}
	}
	if(this.next.vertex=="B")
	{
		this.next.setCtrl1Path(copynode.next);
	}
}
	
function setCtrl1Path(copynode)
{
	var startx=this.prev.nodepath.path.next.point.x; //follow nodepath from previous node
	var starty=this.prev.nodepath.path.next.point.y;
	var lastx=this.prev.nodepath.path.prev.point.x;
	var lasty=this.prev.nodepath.path.prev.point.y;
	var thetanode=arctan(lasty-starty,lastx-startx);
	var startc1x=this.ctrl1.x;
	var startc1y=this.ctrl1.y;
	var lastc1x=copynode.ctrl1.x;
	var lastc1y=copynode.ctrl1.y;
	var nlen=Math.sqrt((lastx-startx)*(lastx-startx)+(lasty-starty)*(lasty-starty));
	if(nlen<50)
	{
		this.linearCtrl1Path(copynode);
	}
	else
	{
		var c1len=Math.sqrt((lastc1x-startc1x)*(lastc1x-startc1x)+(lastc1y-startc1y)*(lastc1y-startc1y));
		var c1scale=c1len/nlen;
		var thetactrl1=arctan(lastc1y-startc1y,lastc1x-startc1x);
		var theta=thetactrl1-thetanode;
		this.ctrl1path=makeCopy(this.prev.nodepath,0,$("tweenpathsstage"),{});
		this.ctrl1path.group={};
		var node=this.ctrl1path.path.next;
		while(node.point.x!="end")
		{
			node.point.x=(node.point.x-startx)*c1scale;
			node.point.y=(node.point.y-starty)*c1scale;
			if(node.ctrl1.x!="non")
			{
				node.ctrl1.x=(node.ctrl1.x-startx)*c1scale;
				node.ctrl1.y=(node.ctrl1.y-starty)*c1scale;
				node.ctrl2.x=(node.ctrl2.x-startx)*c1scale;
				node.ctrl2.y=(node.ctrl2.y-starty)*c1scale;
			}
			node.rotate(theta);
			node.translate(-startc1x,-startc1y);
			node=node.next;
		}
		node=this.ctrl1path.path.prev;
		node.point.x=lastc1x;
		node.point.y=lastc1y;
	}
}

function setCtrl2Path(copynode)
{
	var startx=this.nodepath.path.next.point.x;
	var starty=this.nodepath.path.next.point.y;
	var lastx=this.nodepath.path.prev.point.x;
	var lasty=this.nodepath.path.prev.point.y;
	var thetanode=arctan(lasty-starty,lastx-startx);
	var startc2x=this.ctrl2.x;
	var startc2y=this.ctrl2.y;
	var lastc2x=copynode.ctrl2.x;
	var lastc2y=copynode.ctrl2.y;
	var nlen=Math.sqrt((lastx-startx)*(lastx-startx)+(lasty-starty)*(lasty-starty));
	if(nlen<50)
	{
		this.linearCtrl2Path(copynode);
	}
	else
	{
		var c2len=Math.sqrt((lastc2x-startc2x)*(lastc2x-startc2x)+(lastc2y-startc2y)*(lastc2y-startc2y));
		var c2scale=c2len/nlen;
		var thetactrl2=arctan(lastc2y-startc2y,lastc2x-startc2x);
		var theta=thetactrl2-thetanode;
		this.ctrl2path=makeCopy(this.nodepath,0,$("tweenstage"),{});
		this.ctrl2path.group={};
		var node=this.ctrl2path.path.next;
		while(node.point.x!="end")
		{
			node.point.x=(node.point.x-startx)*c2scale;
			node.point.y=(node.point.y-starty)*c2scale;
			if(node.ctrl1.x!="non")
			{
				node.ctrl1.x=(node.ctrl1.x-startx)*c2scale;
				node.ctrl1.y=(node.ctrl1.y-starty)*c2scale;
				node.ctrl2.x=(node.ctrl2.x-startx)*c2scale;
				node.ctrl2.y=(node.ctrl2.y-starty)*c2scale;
			}
			node.rotate(theta);
			node.translate(-startc2x,-startc2y);
			node=node.next;
		}
		node=this.ctrl2path.path.prev;
		node.point.x=lastc2x;
		node.point.y=lastc2y;
	}
}

function closetweenpathsbox()
{
	CURRENTTWEEN.setTweenTimeBox();
	clear($("tweenpathsstage"));
	clear($("markerdrop"));
	$("markerdrop").style.visibility="hidden";
	$("tweenpathsstage").style.visibility="hidden";
	$("backstage").style.visibility="hidden";
	$("boundarydrop").style.visibility="visible";
}

function showNodePathList(nodein)
{
	closeAllDialogues();
	$("toolbar").style.visibility="visible";
	$("tweentimebox").style.visibility="visible";
	$("tweenpathsbox").style.visibility="visible";
	var tween=CURRENTTWEEN;
	var npths=0;
	for(var name in tween.nodePaths)
	{
		npths++
	}
	if(npths==0)
	{
		tween.startNodePaths();
	}
	else
	{
		tween.setNodePaths();
	}
	tween.setTweenTimeBox();
	tween.nodeTweening.active=true;
	if(!tween.pointTweening)
	{
		$("twnodetween").checked=true;
	}
	clear($("boundarydrop"));
	$("markerdrop").style.visibility="visible";
	$("tweenpathsstage").style.visibility="visible";
	$("backstage").style.visibility="visible";
	$("boundarydrop").style.visibility="hidden"
	hideTools();
	clear($("markerdrop"));
	var shape=tween.getShape();
	var node=shape.path.next;
	while(node.next.point.x!="end")
	{
		node.addFixedPointMark();
		node=node.next;
	}
	if(shape.open)
	{
		node.addFixedPointMark();
	}
	var copy=tween.copy.getShape();
	node=copy.path.next;
	while(node.next.point.x!="end")
	{
		node.addFixedPointMark();
		node=node.next;
	}
	if(copy.open)
	{
		node.addFixedPointMark();
	}
	if(arguments.length<1)
	{
		nodein=shape.path.next;
	}
	var pathnode=nodein.nodepath.path.next;
	pathnode.addFixedPointMark();
	pathnode=pathnode.next;
	while(pathnode.next.point.x!="end")
	{
		pathnode.addFullMarks();
		pathnode=pathnode.next;
	}
	pathnode.addFixedPointMark();
	pathnode.addCtrl1Mark();
	pathnode.addCtrl2Mark();		
	nodein.nodepath.draw();
	nodein.nodepath.drawBezGuides();
	nodein.setNodePathBox();
}

function prepareTweens()
{
	var twnode,stnode,start;
	var mrt;
	var c,p,c1,c2;
	var shape=this.getShape();
	var copy=this.copy.getShape();
	if(shape.justfill && !copy.justfill)
	{
		for(var c=0;c<shape.colorStops.length;c++)
		{
			for(var i=1; i<5;i++)
			{
				shape.colorStops[c][i]=shape.fillStyle[i-1];
			}
		}
		shape.justfill=false;
		this.gradfill.active=true;
	}
	else if(!shape.justfill && copy.justfill)
	{
		for(var c=0;c<copy.colorStops.length;c++)
		{
			for(var i=1; i<5;i++)
			{
				copy.colorStops[c][i]=copy.fillStyle[i-1];
			}
		}
		copy.justfill=false;
		this.gradfill.active=true;
	}
	if(shape.shadow && !copy.shadow)
	{
		copy.shadow=false;
   		copy.shadowOffsetX = 0;   
   		copy.shadowOffsetY = 0;   
   		copy.shadowBlur = 0;   
   		copy.shadowColor = [255, 255, 255, 0];
	}
	if(!shape.shadow && copy.shadow)
	{
		shape.shadow=false;
   		shape.shadowOffsetX = 0;   
   		shape.shadowOffsetY = 0;   
   		shape.shadowBlur = 0;   
   		shape.shadowColor = [255, 255, 255, 0];
	}
	var node=shape.path.next;
	var copynode=copy.path.next;
	if(this.nodeTweening.active)
	{
		while(node.point.x!="end")
		{
			node.tweennodes=[]; //nodes on tween path for node
			node.ptr=0;
			node.repeat=node.nodepath.nodeTweening.repeat;
			node.yoyo=node.nodepath.nodeTweening.yoyo;
			node.Ttick=node.nodepath.nodeTweening.twtime*1000;
			if(isNaN(node.repeat)  || isNaN(this.maxruntime))
			{
				this.maxruntime="always";
			}
			else
			{
				mrt=node.repeat*node.Ttick;
				if(node.yoyo)
				{
					mrt*=2;
				}
				this.maxruntime=Math.max(this.maxruntime,mrt);
			}
			node.tick=50;
			while(node.ptr<node.Ttick)
			{
				p=new Point(0,0);
				twnode=new TweenNode(p);
				node.tweennodes.push(twnode);
				node.ptr+=node.tick;
			}
			node=node.next;
			copynode=copynode.next;
		}
		var node=shape.path.next;
		var copynode=copy.path.next;
		while(node.point.x!="end")
		{
			if(node.nodepath.nodeTweening.active)
			{
				node.pathTweeningPoints(copynode);
			}
			else
			{
				node.translateTweeningPoints(copynode);
			}
			node=node.next;
			copynode=copynode.next;
		}
	}
	else
	{
		while(node.point.x!="end")
		{
			this.transformTweeningPoints(node);
			node=node.next;
		}
	}
	if(this.gradfill.active || this.rotate.active || this.translate.active)
	{
		this.gradlinetransform();
	}
	if(this.fillcolour.active)
	{
		var FCtick=this.fillcolour.twtime*1000;
		if(isNaN(this.fillcolour.repeat)  || isNaN(this.maxruntime))
		{
			this.maxruntime="always";
		}
		else
		{
			mrt=this.fillcolour.repeat*FCtick;
			if(this.fillcolour.yoyo)
			{
				mrt*=2;
			}
			this.maxruntime=Math.max(this.maxruntime,mrt);
		}
		var tick=0;
		this.fillcolour.points=[];
		var tempcol=[];
		while(tick<=FCtick)
		{
			tempcol=[];
			for(var i=0;i<4;i++)
			{
				tempcol[i]=parseInt(shape.fillStyle[i])+tick*(parseInt(copy.fillStyle[i])-parseInt(shape.fillStyle[i]))/FCtick;
			}
			this.fillcolour.points.push(tempcol);
			tick+=50;
		}
	}
	if(this.linecolour.active)
	{
		var LCtick=this.linecolour.twtime*1000;
		if(isNaN(this.linecolour.repeat)  || isNaN(this.maxruntime))
		{
			this.maxruntime="always";
		}
		else
		{
			mrt=this.linecolour.repeat*LCtick;
			if(this.linecolour.yoyo)
			{
				mrt*=2;
			}
			this.maxruntime=Math.max(this.maxruntime,mrt);
		}
		var tick=0;
		this.linecolour.points=[];
		var tempcol=[];
		while(tick<=LCtick)
		{
			tempcol=[];
			for(var i=0;i<4;i++)
			{
				tempcol[i]=parseInt(shape.strokeStyle[i])+tick*(parseInt(copy.strokeStyle[i])-parseInt(shape.strokeStyle[i]))/LCtick;
			}
			this.linecolour.points.push(tempcol);
			tick+=50;
		}
	}
	if(this.gradfill.active)
	{
		var GFtick=this.gradfill.twtime*1000;
		if(isNaN(this.gradfill.repeat)  || isNaN(this.maxruntime))
		{
			this.maxruntime="always";
		}
		else
		{
			mrt=this.gradfill.repeat*GFtick;
			if(this.gradfill.yoyo)
			{
				mrt*=2;
			}
			this.maxruntime=Math.max(this.maxruntime,mrt);
		}
		var tick=0;
		this.gradfill.points=[];
		var tempcolstops=[];
		var tempcol=[];
		while(tick<=GFtick)
		{
			tempcolstops=[];
			for(var c=0; c<shape.colorStops.length;c++)
			{
				tempcol=[shape.colorStops[c][0]];
				for(var i=1;i<5;i++)
				{
					tempcol[i]=parseInt(shape.colorStops[c][i])+tick*(parseInt(copy.colorStops[c][i])-parseInt(shape.colorStops[c][i]))/GFtick;
				}
				tempcolstops.push(tempcol);
			}
			this.gradfill.points.push(tempcolstops);
			tick+=50;
		}
	}
	if(this.linestyles.active)
	{
		var LStick=this.linestyles.twtime*1000;
		if(isNaN(this.linestyles.repeat)  || isNaN(this.maxruntime))
		{
			this.maxruntime="always";
		}
		else
		{
			mrt=this.linestyles.repeat*LStick;
			if(this.linestyles.yoyo)
			{
				mrt*=2;
			}
			this.maxruntime=Math.max(this.maxruntime,mrt);
		}
		var tick=0;
		this.linestyles.points=[];
		var templs;
		while(tick<=LStick)
		{
			templs=shape.lineWidth+tick*(copy.lineWidth-shape.lineWidth)/LStick;
			this.linestyles.points.push(templs);
			tick+=50;
		}
	}
	
	if(this.shadow.active)
	{
		var SHtick=this.shadow.twtime*1000;
		if(isNaN(this.shadow.repeat)  || isNaN(this.maxruntime))
		{
			this.maxruntime="always";
		}
		else
		{
			mrt=this.shadow.repeat*SHtick;
			if(this.shadow.yoyo)
			{
				mrt*=2;
			}
			this.maxruntime=Math.max(this.maxruntime,mrt);
		}
		var tick=0;
		this.shadow.points=[];
		var tempsh;
		while(tick<=SHtick)
		{
			tempsh={
					shox:parseInt(shape.shadowOffsetX)+tick*(parseInt(copy.shadowOffsetX)-parseInt(shape.shadowOffsetX))/SHtick,
					shoy:parseInt(shape.shadowOffsetY)+tick*(parseInt(copy.shadowOffsetY)-parseInt(shape.shadowOffsetY))/SHtick,
					sblr:parseInt(shape.shadowBlur)+tick*(parseInt(copy.shadowBlur)-parseInt(shape.shadowBlur))/SHtick,
					shclr:[
							parseInt(shape.shadowColor[0])+tick*(parseInt(copy.shadowColor[0])-parseInt(shape.shadowColor[0]))/SHtick,
							parseInt(shape.shadowColor[1])+tick*(parseInt(copy.shadowColor[1])-parseInt(shape.shadowColor[1]))/SHtick,
							parseInt(shape.shadowColor[2])+tick*(parseInt(copy.shadowColor[2])-parseInt(shape.shadowColor[2]))/SHtick,
							parseInt(shape.shadowColor[3])+tick*(parseInt(copy.shadowColor[3])-parseInt(shape.shadowColor[3]))/SHtick,
						  ]
					}
			this.shadow.points.push(tempsh);
			tick+=50;
		}
	}
	if(this.edit.active)
	{
		var EDtick=this.edit.twtime*1000;
		if(isNaN(this.edit.repeat)  || isNaN(this.maxruntime))
		{
			this.maxruntime="always";
		}
		else
		{
			mrt=this.edit.repeat*EDtick;
			if(this.edit.yoyo)
			{
				mrt*=2;
			}
			this.maxruntime=Math.max(this.maxruntime,mrt);
		}
		var p1;
		var xtranslate=copy.group.centreOfRotation.x-shape.group.centreOfRotation.x;  //x translation
		var ytranslate=copy.group.centreOfRotation.y-shape.group.centreOfRotation.y;  //y translation 
		theta=copy.group.phi-shape.group.phi;
		if(copy.group.phi<shape.group.phi)
		{
			theta=2*Math.PI-theta;
		}			
		if(!this.rotate.clkw)
		{
			theta=-(2*Math.PI-theta);
		}
		switch (shape.type)
		{
			case "rounded_rectangle":
				node=shape.path.next;
				while(node.point.x!="end")
				{
					node.tweennodes=[];
					node.repeat=this.edit.repeat;
					node.yoyo=this.edit.yoyo;
					node=node.next;
				}
				var crnradius,brcx,brcy,tlcx,tlcy;
			break
			case "arc":
			case "segment":
			case "sector":
				var sYs=shape.archeight/shape.arcwidth; // ratio of height of ellipse to radius
				node=shape.path.next;			
				while(node.point.x!="end")
				{
					node.translate(shape.arccentre.x,shape.arccentre.y); //put origin at arccentre
					node.scaleY(1/sYs); //scale ellipse to circle				
					node=node.next;
				}
				var sYc=copy.archeight/copy.arcwidth; // ratio of height of ellipse to radius
				node=copy.path.next;			
				while(node.point.x!="end")
				{
					node.translate(copy.arccentre.x,copy.arccentre.y); //put origin at arccentre
					node.scaleY(1/sYc); //scale ellipse to circle				
					node=node.next;
				}
				var startAngleS=shape.path.next.getAngle(); //find angle of first node in node list between 0 and 2PI
				var startAngleC=copy.path.next.getAngle();
				switch (shape.type)
				{
					case "arc":
						var arcend=shape.path.prev;
						var endAngleS=shape.path.prev.getAngle();//find angle of last node on arc between 0 and 2PI
						var endAngleC=copy.path.prev.getAngle();
						var extra=0;
					break
					case "segment":
						var arcend=shape.path.prev.prev;
						var endAngleS=shape.path.prev.prev.getAngle();//find angle of last node on arc between 0 and 2PI
						var endAngleC=copy.path.prev.prev.getAngle();
						var extra=1 //one extra node at end
					break
					case "sector":
						var arcend=shape.path.prev.prev.prev;
						var endAngleS=shape.path.prev.prev.prev.getAngle();//find angle of last node on arc between 0 and 2PI
						var endAngleC=copy.path.prev.prev.prev.getAngle();
						var extra=2; //two extra nodes, centre and end
					break
				}
				if(endAngleS>startAngleS)
				{
					var thetaS=endAngleS-startAngleS;
				}
				else
				{
					var thetaS=2*Math.PI-(startAngleS-endAngleS)
				}
				if(endAngleC>startAngleC)
				{
					var thetaC=endAngleC-startAngleC;
				}
				else
				{
					var thetaC=2*Math.PI-(startAngleC-endAngleC)
				}
				node=shape.path.next;
				while(node.point.x!="end") //rotate to start angle, scale and translate back to correct position;
				{
					node.scaleY(sYs);
					node.translate(-shape.arccentre.x,-shape.arccentre.y);				
					node=node.next;
				}
				node=copy.path.next;
				while(node.point.x!="end") //rotate to start angle, scale and translate back to correct position;
				{
					node.scaleY(sYc);
					node.translate(-copy.arccentre.x,-copy.arccentre.y);				
					node=node.next;
				}
				node=shape.path.next;
				while(node.point.x!="end")
				{					
					node.tweennodes=[];
					node.repeat=this.edit.repeat;
					node.yoyo=this.edit.yoyo;
					node=node.next;
				}
				var radius, archeight, sY, arccentrex, arccentrey, theta;			
			break
		}
		while(tick<=EDtick)
		{
			switch (shape.type)
			{
				case "rounded_rectangle":
					crnradius=shape.crnradius+tick*(copy.crnradius-shape.crnradius)/EDtick;
					brcx=shape.btmrgtcrnr.x+tick*xtranslate/EDtick;
					brcy=shape.btmrgtcrnr.y+tick*ytranslate/EDtick;
					tlcx=shape.tplftcrnr.x+tick*xtranslate/EDtick;
					tlcy=shape.tplftcrnr.y+tick*ytranslate/EDtick;					
					c=new Point(shape.group.centreOfRotation.x+xtranslate*tick/EDtick,shape.group.centreOfRotation.y+ytranslate*tick/EDtick); //centre of rotation 				
					p=new Point(tlcx+crnradius,tlcy);
					sp=new Point(tlcx+crnradius,tlcy);
					node=shape.path.next;
					twnode=new TweenNode(p);  //top left;
					stnode=new TweenNode(sp);
					node.tweennodes.push(twnode);
					node=node.next;
					p=new Point(brcx-crnradius,stnode.point.y);
					twnode=new TweenNode(p);// top right
					node.tweennodes.push(twnode);
					c1=new Point(p.x+crnradius*K,p.y);
					p=new Point(brcx,p.y+crnradius);
					c2=new Point(p.x,p.y-crnradius*K);
					node=node.next;
					twnode=new TweenNode(p,c1,c2);//right top
					node.tweennodes.push(twnode);
					p=new Point(p.x,brcy-crnradius);	
					node=node.next;
					twnode=new TweenNode(p);//right bottom
					node.tweennodes.push(twnode);
					c1=new Point(p.x,p.y+crnradius*K);
					p=new Point(brcx-crnradius,brcy);
					c2=new Point(p.x+crnradius*K,p.y);
					node=node.next;
					twnode=new TweenNode(p,c1,c2);//bottom right
					node.tweennodes.push(twnode);
					p=new Point(stnode.point.x,p.y);
					node=node.next;
					twnode=new TweenNode(p);//bottom left
					node.tweennodes.push(twnode);
					c1=new Point(p.x-crnradius*K,p.y);
					p=new Point(tlcx,p.y-crnradius);
					c2=new Point(p.x,p.y+crnradius*K);
					node=node.next;
					twnode=new TweenNode(p,c1,c2);//left bottom
					node.tweennodes.push(twnode);
					p=new Point(p.x,stnode.point.y+crnradius);
					node=node.next;
					twnode=new TweenNode(p);//left top
					node.tweennodes.push(twnode);
					c1=new Point(p.x,p.y-crnradius*K);
					p=new Point(stnode.point.x,stnode.point.y);
					c2=new Point(p.x-crnradius*K,p.y);
					node=node.next;
					twnode=new TweenNode(p,c1,c2);//top left again
					node.tweennodes.push(twnode);
					if(this.rotate.active)
					{
						node=shape.path.next;
						while(node.point.x!="end")
						{
							twnode=node.tweennodes.pop();
							p=twnode.point;
							c1=twnode.ctrl1;
							c2=twnode.ctrl2;
							p.x-=c.x;
							p.y-=c.y;
							p1=p.pointRotate(shape.group.phi+theta*tick/EDtick);
							p.x=p1.x+c.x;
							p.y=p1.y+c.y;
							if(c1.x!="non")
							{
								c1.x-=c.x;
								c1.y-=c.y;
								p1=c1.pointRotate(shape.group.phi+theta*tick/EDtick);
								c1.x=p1.x+c.x;
								c1.y=p1.y+c.y;
								c2.x-=c.x;
								c2.y-=c.y;
								p1=c2.pointRotate(shape.group.phi+theta*tick/EDtick);
								c2.x=p1.x+c.x;
								c2.y=p1.y+c.y;
							}
							node.tweennodes.push(twnode);
							node=node.next;
						}
					}			
				break
				case "arc":
				case "segment":
				case "sector":
					radius=shape.radius+tick*(copy.radius-shape.radius)/EDtick;
					archeight=shape.archeight+tick*(copy.archeight-shape.archeight)/EDtick;
					arcwidth=shape.arcwidth+tick*(copy.arcwidth-shape.arcwidth)/EDtick;
					sY=archeight/arcwidth; // ratio of height of ellipse to radius
					arccentrex=shape.arccentre.x+tick*xtranslate/EDtick;
					arccentrey=shape.arccentre.y+tick*ytranslate/EDtick;
					theta=thetaS+tick*(thetaC-thetaS)/EDtick;
					startAngle=startAngleS+tick*(startAngleC-startAngleS)/EDtick;					
					var phi=0;//to break theta into an acute angle (psi) and multiples of PI/2 (phi)
					node=shape.path.next;
					while(node.point.x!="end")// set all nodes for 0 degrees
					{
						p=new Point(radius,0);
						twnode=new TweenNode(p);
						node.tweennodes.push(twnode);
						node=node.next;
					}		
					node=arcend;
					if(theta>Math.PI/2)
					{
						prev=node.prev;
						phi=Math.PI/2;
						var p_90=new Point(0,radius); //set node on circle at 90 degrees
						var c1_90=new Point(radius,radius*K);
						var c2_90=new Point(radius*K,radius);
						var twnode_90=new TweenNode(p_90,c1_90,c2_90);
						prev.tweennodes.pop();
						prev.tweennodes.push(twnode_90);
					}
					if(theta>Math.PI)
					{
						prev=node.prev;
						phi=Math.PI;
						var p_180=new Point(-radius,0); //set node on circle at 180 degrees
						var c1_180=new Point(-radius*K,radius);
						var c2_180=new Point(-radius,radius*K);
						var twnode_180=new TweenNode(p_180,c1_180,c2_180);
						prev.tweennodes.pop();
						prev.tweennodes.push(twnode_180);
						var p_90=new Point(0,radius); //set node on circle at 90 degrees
						var c1_90=new Point(radius,radius*K);
						var c2_90=new Point(radius*K,radius);
						var twnode_90=new TweenNode(p_90,c1_90,c2_90);
						prev.prev.tweennodes.pop();
						prev.prev.tweennodes.push(twnode_90);	
					}
					if(theta>3*Math.PI/2)
					{
						prev=node.prev;
						phi=3*Math.PI/2;
						var p_270=new Point(0,-radius); // set node on circle at 270 degrees
						var c1_270=new Point(-radius,-radius*K);
						var c2_270=new Point(-radius*K,-radius);
						var twnode_270=new TweenNode(p_270,c1_270,c2_270);
						prev.tweennodes.pop();
						prev.tweennodes.push(twnode_270);
						var p_180=new Point(-radius,0); //set node on circle at 180 degrees
						var c1_180=new Point(-radius*K,radius);
						var c2_180=new Point(-radius,radius*K);
						var twnode_180=new TweenNode(p_180,c1_180,c2_180);
						prev.prev.tweennodes.pop();
						prev.prev.tweennodes.push(twnode_180);
						var p_90=new Point(0,radius); //set node on circle at 90 degrees
						var c1_90=new Point(radius,radius*K);
						var c2_90=new Point(radius*K,radius);
						var twnode_90=new TweenNode(p_90,c1_90,c2_90);
						prev.prev.prev.tweennodes.pop();
						prev.prev.prev.tweennodes.push(twnode_90);
					}
					var psi=theta-phi;//$("msg").innerHTML+=">>>"+tick+","+(theta*180/Math.PI)+","+(phi*180/Math.PI)+","+(psi*180/Math.PI)+"<br>";
					var b=baseArcBez(radius,psi/2);
					var twnode_theta=new TweenNode(b.p2,b.c1,b.c2);
					twnode_theta.rotate(phi+psi/2);
					node.tweennodes.pop();
					node.tweennodes.push(twnode_theta);
					if(shape.type=="sector")
					{
						node=node.next;
						var p_C=new Point(0,0);
						twnode=new TweenNode(p_C);
						node.tweennodes.pop();
						node.tweennodes.push(twnode);
					}				
					var node=shape.path.next;				
					while(node.point.x!="end") //rotate to start angle, scale and translate back to correct position;
					{
						node.tweennodes[node.tweennodes.length-1].rotate(startAngle);
						node.tweennodes[node.tweennodes.length-1].scaleY(sY);
						node.tweennodes[node.tweennodes.length-1].translate(-arccentrex,-arccentrey);
						node=node.next;
					}						
				break
			}
			tick+=50;
		}
	}
}



function pathTweeningPoints(copynode) //node and ctrl points for node follows bezier path if node.nodepath.nodeTweening is true
{
	this.nodepath.getLengths();
	var ntwlen=this.tweennodes.length;//alert(ntwlen);
	if(this.vertex=="B")
	{
		this.ctrl1path.getLengths();
		var c1points=Math.round(this.ctrl1path.lengths[0]*ntwlen/this.ctrl1path.length); //points for ctrl1path
		var dtc1=1/c1points;
		var tc1=0;
		var accc1pl=c1points;
		this.ctrl2path.getLengths();
		var c2points=Math.round(this.ctrl2path.lengths[0]*ntwlen/this.ctrl2path.length); //points for ctrl2path
		var dtc2=1/c2points;
		var tc2=0;
		var accc2pl=c2points;
		var ctrl2node=this.ctrl2path.path.next;	
		var lastctrl2=this.ctrl2path.path.prev;
		var ctrl1node=this.ctrl1path.path.next;
		var lastctrl1=this.ctrl1path.path.prev;
	}
	
	this.tweennodes=[];
	var n=0,c1=0,c2=0;
	var points=Math.round(this.nodepath.lengths[0]*ntwlen/this.nodepath.length);
	var dt=1/points;
	var t=0;
	var p,twnode;
	var accnpl=points;
	var node=this.nodepath.path.next;
	var lastnode=this.nodepath.path.prev;
	for(var i=0;i<ntwlen;i++)
	{
		if(i>accnpl)
		{
			node=node.next;
			points=Math.round(this.nodepath.lengths[++n]*ntwlen/this.nodepath.length);
			accnpl+=points;
			dt=1/points;
			t=0;
		}
		if(this.vertex=="B")
		{
			if(i>accc1pl)
			{
				ctrl1node=ctrl1node.next;
				c1points=Math.round(this.ctrl1path.lengths[++c1]*ntwlen/this.ctrl1path.length); 
				accc1pl+=c1points;
				dtc1=1/c1points;
				tc1=0;
			}
			if(i>accc2pl)
			{
				ctrl2node=ctrl2node.next;
				
				c2points=Math.round(this.ctrl2path.lengths[++c1]*ntwlen/this.ctrl2path.length); //points for ctrl1path
				accc2pl+=c2points;
				dtc2=1/c2points;
				tc2=0;
			}
		}
		if(node.next.vertex=="L")
		{
			p=new Point(node.linx(t),node.liny(t));
			twnode=new TweenNode(p);
			if(this.vertex=="B")
			{
				twnode.ctrl2=new Point(ctrl2node.linx(tc2),ctrl2node.liny(tc2));
				twnode.ctrl1=new Point(ctrl1node.linx(tc1),ctrl1node.liny(tc1));
			}
		}
		else
		{
			p=new Point(node.bezx(t),node.bezy(t));
			twnode=new TweenNode(p);
			if(this.vertex=="B")
			{
				twnode.ctrl2=new Point(ctrl2node.bezx(tc2),ctrl2node.bezy(tc2));
				twnode.ctrl1=new Point(ctrl1node.bezx(tc1),ctrl1node.bezy(tc1));
			}
		}
		this.tweennodes.push(twnode);
		t+=dt;
		if(this.vertex=="B")
		{
			tc2+=dtc2;
			tc1+=dtc1;
		}
	}
}

function translateTweeningPoints(copynode) //node and ctrl points for node translated  if node.nodepath.nodeTweening is false
{
	var open=this.shape.open;
	var start=this.nodepath.path.next.point;
	var last=this.nodepath.path.prev.point;
	
	var startc1=this.next.ctrl1;
	var lastc1=copynode.next.ctrl1;
	if(!open && this.prev.point.x=="end")
	{
		var startc2=this.prev.prev.ctrl2;
		var lastc2=copynode.prev.prev.ctrl2;
	}
	else
	{
		var startc2=this.ctrl2;
		var lastc2=copynode.ctrl2;
	}
	var xtranslate=last.x-start.x;  //x translation
	var ytranslate=last.y-start.y;  //y translation
	if(startc1.x!="non")
	{
		var xC1translate=lastc1.x-startc1.x;  //ctrl1 x translation
		var yC1translate=lastc1.y-startc1.y;  //ctrl1 y translation
	}
	if(startc2.x!="non")
	{
		var xC2translate=lastc2.x-startc2.x;  //ctrl1 x translation
		var yC2translate=lastc2.y-startc2.y;  //ctrl1 y translation
	}
	var tick=50;
	for(var i=0; i<this.tweennodes.length;i++)
	{
		this.tweennodes[i].point.x=start.x+xtranslate*i*tick/this.Ttick;
		this.tweennodes[i].point.y=start.y+ytranslate*i*tick/this.Ttick;
		if(!isNaN(startc1.x))
		{
			this.next.tweennodes[i].ctrl1.x=startc1.x+xC1translate*i*tick/this.Ttick;
			this.next.tweennodes[i].ctrl1.y=startc1.y+yC1translate*i*tick/this.Ttick;
		}
		if(!isNaN(startc2.x))
		{
			this.tweennodes[i].ctrl2.x=startc2.x+xC2translate*i*tick/this.Ttick;
			this.tweennodes[i].ctrl2.y=startc2.y+yC2translate*i*tick/this.Ttick;
		}
	}
}

function transformTweeningPoints(node)  //node follows rotate translate path if node.nodepath.nodeTweening is false
{
	var theta; //theta is change in angle
	var c,p; //centre of rotation
	node.tweennodes=[]; //nodes on tween path for node
	node.ptr=0;
	node.tweennodes.push(node);
	var shape=this.getShape();
	var copy=this.copy.getShape();
	var xtranslate=copy.group.centreOfRotation.x-shape.group.centreOfRotation.x;  //x translation
	var ytranslate=copy.group.centreOfRotation.y-shape.group.centreOfRotation.y;  //y translation 
	if(copy.group.phi==shape.group.phi)
	{
		theta=2*Math.PI;
	}
	else
	{
		theta=copy.group.phi-shape.group.phi;
		if(copy.group.phi<shape.group.phi)
		{
			theta=2*Math.PI-theta;
		}			
		if(!this.rotate.clkw)
		{
			theta=-(2*Math.PI-theta);
		}
	}
	var Ttick=this.translate.twtime*1000;
	var Rtick=this.rotate.twtime*1000;
	var tick=0;
	var doTranslate=this.translate.active;
	var doRotate=this.rotate.active;
	while(doTranslate || doRotate)
	{
		if(doTranslate)
		{
			if(doRotate)
			{
				//translate and rotate
				node.repeat=tween.translate.repeat;
				node.yoyo=tween.translate.yoyo;
				c=new Point(shape.group.centreOfRotation.x+xtranslate*tick/Ttick,shape.group.centreOfRotation.y+ytranslate*tick/Ttick);
				p=new Point(node.point.x+xtranslate*tick/Ttick-c.x,node.point.y+ytranslate*tick/Ttick-c.y);
				p=p.pointRotate(shape.group.phi+theta*tick/Rtick);
				p.x+=c.x;
				p.y+=c.y;
				if(node.ctrl1.x=="non")
				{
					twnode=new TweenNode(p);
				}
				else
				{
					c1=new Point(node.ctrl1.x+xtranslate*tick/Ttick-c.x,node.ctrl1.y+ytranslate*tick/Ttick-c.y);
					c2=new Point(node.ctrl2.x+xtranslate*tick/Ttick-c.x,node.ctrl2.y+ytranslate*tick/Ttick-c.y);
					c1=c1.pointRotate(shape.group.phi+theta*tick/Rtick);
					c1.x+=c.x;
					c1.y+=c.y;
					c2=c2.pointRotate(shape.group.phi+theta*tick/Rtick);
					c2.x+=c.x;
					c2.y+=c.y;
					twnode=new TweenNode(p,c1,c2);
				}
				node.tweennodes.push(twnode);
			}
			else
			{
				//translate only
				node.repeat=tween.translate.repeat;
				node.yoyo=tween.translate.yoyo;
				p=new Point(node.point.x+xtranslate*tick/Ttick,node.point.y+ytranslate*tick/Ttick);
				if(node.ctrl1.x=="non")
				{
					twnode=new TweenNode(p);
				}
				else
				{
					c1=new Point(node.ctrl1.x+xtranslate*tick/Ttick,node.ctrl1.y+ytranslate*tick/Ttick);
					c2=new Point(node.ctrl2.x+xtranslate*tick/Ttick,node.ctrl2.y+ytranslate*tick/Ttick);
					twnode=new TweenNode(p,c1,c2);
				}
				node.tweennodes.push(twnode);
			}
		}
		else
		{
			if(doRotate)
			{
				//rotate only
				node.repeat=tween.rotate.repeat;
				node.yoyo=tween.rotate.yoyo;
				c=new Point(shape.group.centreOfRotation.x,shape.group.centreOfRotation.y);
				p=new Point(node.point.x-c.x,node.point.y-c.y);
				p=p.pointRotate(shape.group.phi+theta*tick/Rtick);
				p.x+=c.x;
				p.y+=c.y;
				if(node.ctrl1.x=="non")
				{
					twnode=new TweenNode(p);
				}
				else
				{
					c1=new Point(node.ctrl1.x-c.x,node.ctrl1.y-c.y);
					c2=new Point(node.ctrl2.x-c.x,node.ctrl2.y-c.y);
					c1=c1.pointRotate(shape.group.phi+theta*tick/Rtick);
					c1.x+=c.x;
					c1.y+=c.y;
					c2=c2.pointRotate(shape.group.phi+theta*tick/Rtick);
					c2.x+=c.x;
					c2.y+=c.y;
					twnode=new TweenNode(p,c1,c2);
				}
				node.tweennodes.push(twnode);
			}
		}
		tick+=50;
		if(tick>Ttick) {doTranslate=false};
		if(tick>Rtick) {doRotate=false};
	}	
}

function gradlinetransform()
{
	var theta; //theta is change in angle
	var p; //temp point
	this.linegrads=[];
	this.radgrads=[];
	var shape=this.getShape();
	var copy=this.copy.getShape();
	if(this.translate.active)
	{
		var Gtick=this.translate.twtime*1000;
	}
	if(this.rotate.active)
	{
		var Gtick=this.rotate.twtime*1000;
	}
	if(this.gradfill.active)
	{
		var Gtick=this.gradfill.twtime*1000;
	}
	var tick=0;
	var templg=[];
	var temprg=[];
	var nltheta0,nltheta1,nlx0,nly0,nlx1,nly1;
	var nrtheta0,nrtheta1,nrx0,nry0,nrx1,nry1;
	var nlradius,nrradius;
	var sltheta0=arctan(shape.lineGrad[1]-shape.group.centreOfRotation.y,shape.lineGrad[0]-shape.group.centreOfRotation.x);
	var	sltheta1=arctan(shape.lineGrad[3]-shape.group.centreOfRotation.y,shape.lineGrad[2]-shape.group.centreOfRotation.x);
	var cltheta0=arctan(copy.lineGrad[1]-copy.group.centreOfRotation.y,copy.lineGrad[0]-copy.group.centreOfRotation.x);
	var	cltheta1=arctan(copy.lineGrad[3]-copy.group.centreOfRotation.y,copy.lineGrad[2]-copy.group.centreOfRotation.x);
	var srtheta0=arctan(shape.radGrad[1]-shape.group.centreOfRotation.y,shape.radGrad[0]-shape.group.centreOfRotation.x);
	var	srtheta1=arctan(shape.radGrad[4]-shape.group.centreOfRotation.y,shape.radGrad[3]-shape.group.centreOfRotation.x);
	var crtheta0=arctan(copy.radGrad[1]-copy.group.centreOfRotation.y,copy.radGrad[0]-copy.group.centreOfRotation.x);
	var	crtheta1=arctan(copy.radGrad[4]-copy.group.centreOfRotation.y,copy.radGrad[3]-copy.group.centreOfRotation.x);
	
	var xtranslate=copy.group.centreOfRotation.x-shape.group.centreOfRotation.x;  //x translation
	var ytranslate=copy.group.centreOfRotation.y-shape.group.centreOfRotation.y;  //y translation 
	var slp0=new Point(shape.lineGrad[0]-shape.group.centreOfRotation.x,shape.lineGrad[1]-shape.group.centreOfRotation.y);
	p=slp0.pointRotate(cltheta0-sltheta0);
	var ldx0=copy.lineGrad[0]-(p.x+shape.group.centreOfRotation.x+xtranslate);
	var ldy0=copy.lineGrad[1]-(p.y+shape.group.centreOfRotation.y+ytranslate);
	var slp1=new Point(shape.lineGrad[2]-shape.group.centreOfRotation.x,shape.lineGrad[3]-shape.group.centreOfRotation.y);
	p=slp1.pointRotate(cltheta1-sltheta1);
	var ldx1=copy.lineGrad[2]-(p.x+shape.group.centreOfRotation.x+xtranslate);
	var ldy1=copy.lineGrad[3]-(p.y+shape.group.centreOfRotation.y+ytranslate);

	var srp0=new Point(shape.radGrad[0]-shape.group.centreOfRotation.x,shape.radGrad[1]-shape.group.centreOfRotation.y);
	p=srp0.pointRotate(crtheta0-srtheta0);
	var rdx0=copy.radGrad[0]-(p.x+shape.group.centreOfRotation.x+xtranslate);
	var rdy0=copy.radGrad[1]-(p.y+shape.group.centreOfRotation.y+ytranslate);
	var srp1=new Point(shape.radGrad[3]-shape.group.centreOfRotation.x,shape.radGrad[4]-shape.group.centreOfRotation.y);
	p=srp1.pointRotate(crtheta1-srtheta1);
	var rdx1=copy.radGrad[3]-(p.x+shape.group.centreOfRotation.x+xtranslate);
	var rdy1=copy.radGrad[4]-(p.y+shape.group.centreOfRotation.y+ytranslate);
	
	var doColor=this.gradfill.active || this.rotate.active || this.translate.active;
	while(doColor)
	{
		templg=[];
		temprg=[];
		
		nltheta0=this.betweenAngle(cltheta0,sltheta0,tick/Gtick);
		nltheta1=this.betweenAngle(cltheta1,sltheta1,tick/Gtick);

		p=slp0.pointRotate(nltheta0-sltheta0);
		templg[0]=p.x+shape.group.centreOfRotation.x+tick*(xtranslate+ldx0)/Gtick;
		templg[1]=p.y+shape.group.centreOfRotation.y+tick*(ytranslate+ldy0)/Gtick;
		p=slp1.pointRotate(nltheta1-sltheta1);
		templg[2]=p.x+shape.group.centreOfRotation.x+tick*(xtranslate+ldx1)/Gtick;
		templg[3]=p.y+shape.group.centreOfRotation.y+tick*(ytranslate+ldy1)/Gtick;
		this.linegrads.push(templg);
		
		nrtheta0=this.betweenAngle(crtheta0,srtheta0,tick/Gtick);
		nrtheta1=this.betweenAngle(crtheta1,srtheta1,tick/Gtick);

		p=srp0.pointRotate(nrtheta0-srtheta0);
		temprg[0]=p.x+shape.group.centreOfRotation.x+tick*(xtranslate+rdx0)/Gtick;
		temprg[1]=p.y+shape.group.centreOfRotation.y+tick*(ytranslate+rdy0)/Gtick;
		temprg[2]=shape.radGrad[2]+tick*(copy.radGrad[2]-shape.radGrad[2])/Gtick;
		p=srp1.pointRotate(nrtheta1-srtheta1);
		temprg[3]=p.x+shape.group.centreOfRotation.x+tick*(xtranslate+rdx1)/Gtick;
		temprg[4]=p.y+shape.group.centreOfRotation.y+tick*(ytranslate+rdy1)/Gtick;
		temprg[5]=shape.radGrad[5]+tick*(copy.radGrad[5]-shape.radGrad[5])/Gtick;
		this.radgrads.push(temprg);
		tick+=50;
		if(tick>Gtick) {doColor=false};
	}
}

function setNodeTweening(chkbx)
{
	if(chkbx.checked)
	{
		CURRENTTWEEN.nodeTweening.active=true;
	}
	else
	{
		CURRENTTWEEN.nodeTweening.active=false;
	}
	CURRENTTWEEN.setTweenTimeBox();
}

function updateTweenPath(okbut)
{
	var node=okbut.OKnode;
	node.nodepath.nodeTweening.twtime=$("tweditline").value;
	node.nodepath.nodeTweening.repeat=$("twrepeditline").value;
	node.nodepath.nodeTweening.yoyo=$("twyoeditline").checked;
	node.nodepath.nodeTweening.active=$("twacteditline").checked;
}

function setTweenTimeBox()
{
	var shape=this.getShape();
	if(shape.type=="arc" || shape.type=="segment" || shape.type=="sector" || shape.type=="rounded_rectangle")
	{
		var ttccontenthtml=ttcfxdhtml;
		var rigid=true;
		var ttheight=250;
	}
	else
	{
		var ttccontenthtml=ttcfxdhtml+ttcrgdhtml;
		var rigid=false;
		var ttheight=300;
		if(this.pointTweening)
		{
			ttccontenthtml+=ttccfxhtml;
		}
		else
		{
			ttccontenthtml+=ttccathtml;
		}
	}
	var ttcprphtml="";
	var ttcnum=0;
	
	if(this.translate.active && !this.nodeTweening.active && !this.pointTweening)
	{
		ttcprphtml+=ttctrnhtml;
		ttcnum++;
	}
	if(this.rotate.active && !this.nodeTweening.active && !this.pointTweening)
	{
		ttcprphtml+=ttcrothtml;
		ttcnum++;
	}
	if((this.rotate.active && !this.nodeTweening.active && !this.pointTweening) || this.gradfill.active)
	{
		ttcprphtml+=ttcdirhtml;
		ttcnum++;
	}
	if(this.gradfill.active)
	{
		ttcprphtml+=ttcgdfhtml;
		ttcnum++;	
	}
	if(this.linestyles.active)
	{
		ttcprphtml+=ttcstyhtml;
		ttcnum++;	
	}
	if(this.fillcolour.active)
	{
		ttcprphtml+=ttcfclhtml;
		ttcnum++;	
	}
	if(this.shadow.active)
	{
		ttcprphtml+=ttcshdhtml;
		ttcnum++;	
	}
	if(this.linecolour.active)
	{
		ttcprphtml+=ttclclhtml;
		ttcnum++;	
	}
	if(this.edit.active && !this.nodeTweening.active && !this.pointTweening)
	{
		ttcprphtml+=ttcedthtml;
		ttcnum++;	
	}
	if(ttcnum>0)
	{
		ttheight+=40*(ttcnum+1);
		if(this.rotate.active && !this.nodeTweening.active && !this.pointTweening)
		{
			ttheight+=30;
		}
		if(ttheight>SCRH-200) {ttheight=SCRH-200}
		ttccontenthtml+=ttclbshtml;
	}
	ttccontenthtml+=ttcprphtml;
	$("tweentimecontent").innerHTML=ttccontenthtml;
	$("defaulttime").value=this.nodeTweening.twtime;
	$("defaultrepeats").value=this.nodeTweening.repeat;
	$("defaultyoyo").checked=this.nodeTweening.yoyo;
	if(!this.pointTweening  && !rigid)
	{
		$("twnodetween").checked=this.nodeTweening.active;
	}
	$("tweentimebox").style.height=ttheight+"px";
	
	$("tweentimecontent").style.height=(parseInt($("tweentimebox").style.height)-25)+"px";
	$("tweentimebox").style.clip="rect(1px,"+(parseInt($("tweentimebox").style.width)+2)+"px,"+(parseInt($("tweentimebox").style.height)+2)+"px,0px)";
	if(this.rotate.active && !this.nodeTweening.active && !this.pointTweening)
	{
			if(this.rotate.clkw)
			{
				$("Clockwise").checked="checked";
			}
			else
			{
				$("Anticlockwise").checked="checked";
			}
	}
	this.getTweenActives();			
}

function zeroTweenPtrs()
{
	this.translate.ptr=0;
	this.rotate.ptr=0;
	this.linestyles.ptr=0;
	this.linecolour.ptr=0;
	this.fillcolour.ptr=0;
	this.gradfill.ptr=0;
	this.shadow.ptr=0;
	this.translate.counter=0;
	this.rotate.counter=0;
	this.linestyles.counter=0;
	this.linecolour.counter=0;
	this.fillcolour.counter=0;
	this.gradfill.counter=0;
	this.shadow.counter=0;
	this.translate.dir=1;
	this.rotate.dir=1;
	this.linestyles.dir=1;
	this.linecolour.dir=1;
	this.fillcolour.dir=1;
	this.gradfill.dir=1;
	this.shadow.dir=1;
	var shape=this.getShape();
	var node=shape.path.next;
	while(node.point.x!="end")
	{
		node.ptr=0;
		node.dir=1;
		node.counter=0;
		node=node.next;
	}	
}

function tweenmove()
{
	var shape=this.getShape();
	
	if(this.translate.active  || this.rotate.active || this.nodeTweening.active || this.pointTweening || this.edit.active)
	{
		var node=shape.path.next;		
		var tweennode=this.tweenshape.path.next;
		while(node.point.x!="end")
		{
			tweennode.point.x=node.tweennodes[node.ptr].point.x;
			tweennode.point.y=node.tweennodes[node.ptr].point.y;			
			tweennode.ctrl1.x=node.tweennodes[node.ptr].ctrl1.x;
			tweennode.ctrl1.y=node.tweennodes[node.ptr].ctrl1.y;
			tweennode.ctrl2.x=node.tweennodes[node.ptr].ctrl2.x;
			tweennode.ctrl2.y=node.tweennodes[node.ptr].ctrl2.y;
			if(this.edit.active) 
			{
				tweennode.vertex=node.tweennodes[node.ptr].vertex;
			}
			node=node.next;
			tweennode=tweennode.next;
		}
		if(this.rotate.active)
		{
			var ptr=this.rotate.ptr;
		}
		if(this.translate.active)
		{
			var ptr=this.translate.ptr;
		}
		if(this.rotate.active || this.translate.active)
		{
			for(var i=0;i<4;i++)
			{
				this.tweenshape.lineGrad[i]=Math.round(this.linegrads[ptr][i]);
			}
			for(var i=0;i<6;i++)
			{
				this.tweenshape.radGrad[i]=Math.round(this.radgrads[ptr][i]);
			}
		}
	}
	if (this.gradfill.active)
	{
		var ptr=this.gradfill.ptr;
		for(var i=0;i<4;i++)
		{
			this.tweenshape.lineGrad[i]=Math.round(this.linegrads[ptr][i]);
		}
		for(var i=0;i<6;i++)
		{
			this.tweenshape.radGrad[i]=Math.round(this.radgrads[ptr][i]);
		}
	}
	if(this.fillcolour.active)
	{
		for(var i=0;i<4;i++)
		{
			this.tweenshape.fillStyle[i]=Math.round(this.fillcolour.points[this.fillcolour.ptr][i]);
		}
	}
	if(this.linecolour.active)
	{
		for(var i=0;i<4;i++)
		{
			this.tweenshape.strokeStyle[i]=Math.round(this.linecolour.points[this.linecolour.ptr][i]);
		}
	}
	if(this.linestyles.active)
	{
		this.tweenshape.lineWidth=this.linestyles.points[this.linestyles.ptr];
	}
	if(this.gradfill.active)
	{
		var colstops=this.gradfill.points[this.gradfill.ptr];
		for(var c=0; c<colstops.length;c++)
		{
			this.tweenshape.colorStops[c][0]=colstops[c][0];
			for(var i=1;i<5;i++)
			{
				this.tweenshape.colorStops[c][i]=Math.round(colstops[c][i]);
			}
		}
	}
	if(this.shadow.active)
	{
		this.tweenshape.shadow=true;
		var shobj=this.shadow.points[this.shadow.ptr];
		this.tweenshape.shadowOffsetX=shobj.shox;
		this.tweenshape.shadowOffsetY=shobj.shoy;
		this.tweenshape.shadowBlur=shobj.sblr;
		for(var i=0;i<3;i++)
		{
			this.tweenshape.shadowColor[i]=Math.round(shobj.shclr[i]);
		}
		this.tweenshape.shadowColor[3]=shobj.shclr[3];
	}
	this.tweenshape.draw();	
	this.updateTweenPtrs();
}

function tweenplay()
{
	if(!(this.stopchecking || STOPCHECKING))
	{
		this.tweenmove();
		var tween=this;
		setTimeout(function() {tween.tweenplay()},50);
	}
	else
	{
		alert('Tween Check completed');
		$("twbuttons").style.visibility="visible";
		$("checkdone").style.visibility="hidden";
		$("toolbar").style.visibility="visible";
		$("grid").style.visibility="inherit";
		$('tweentimebox').style.visibility="visible";
		var shape=this.getShape();
		var copy=this.copy.getShape();
		clear($("tweenstage"));
		$("boundarydrop").style.visibility="visible";
		shape.addTo($("tweenstage"));
		copy.addTo($("tweenstage"));
		shape.draw();
		copy.draw();
	}
}

function updateTweenPtrs()
{
	var finishedtween=true;
	var shape=this.getShape();
	var node;
	if(this.translate.active  || this.rotate.active || this.nodeTweening.active || this.pointTweening  || this.edit.active)
	{
		node=shape.path.next;
		while(node.point.x!="end")
		{
			finishedtween=true;
			if(node.counter<node.repeat || isNaN(node.repeat))
			{
				finishedtween=false;
				node.ptr+=node.dir;
				if(node.dir>0)
				{
					if(node.ptr>=node.tweennodes.length)
					{
						if(node.yoyo)
						{
							node.dir=-1;
							node.ptr-=2;
						}
						else
						{
							node.counter++;
							if(node.counter<node.repeat || isNaN(node.repeat))
							{
								node.ptr=0;
							}
							else
							{
								node.ptr--;
							}
						}
					}
				}
				else
				{
					if(node.ptr<0)
					{
						if(node.yoyo)
						{
							node.dir=1;
							node.counter++;
							node.ptr++;
						}
					}
				}
			}
			node=node.next;	
		}
	}
	if(this.translate.active && !shape.justfill)
	{
		if(this.translate.counter<this.translate.repeat || isNaN(this.translate.repeat))
		{
			finishedtween=false;
			this.translate.ptr+=this.translate.dir;
			if(this.translate.dir>0)
			{
				if(this.translate.ptr>=this.linegrads.length)
				{
					if(this.translate.yoyo)
					{
						this.translate.dir=-1;
						this.translate.ptr-=2;
					}
					else
					{
						this.translate.counter++;
						this.translate.ptr--;
					}
				}
			}
			else
			{
				if(this.translate.ptr<0)
				{
					if(this.translate.yoyo)
					{
						this.translate.dir=1;
						this.translate.counter++;
						this.translate.ptr++;
					}
				}
			}
		}	
	}
	if(this.rotate.active && !shape.justfill)  //rotation of gradient stops
	{
		if(this.rotate.counter<this.rotate.repeat || isNaN(this.rotate.repeat))
		{
			finishedtween=false;
			this.rotate.ptr+=this.rotate.dir;
			if(this.rotate.dir>0)
			{
				if(this.rotate.ptr>=this.linegrads.length)
				{
					if(this.rotate.yoyo)
					{
						this.rotate.dir=-1;
						this.rotate.ptr-=2;
					}
					else
					{
						this.rotate.counter++;
						this.rotate.ptr--;
					}
				}
			}
			else
			{
				if(this.rotate.ptr<0)
				{
					if(this.rotate.yoyo)
					{
						this.rotate.dir=1;
						this.rotate.counter++;
						this.rotate.ptr++;
					}
				}
			}
		}	
	}
	if(this.linestyles.active)
	{
		if(this.linestyles.counter<this.linestyles.repeat || isNaN(this.linestyles.repeat))
		{
			finishedtween=false;
			this.linestyles.ptr+=this.linestyles.dir;
			if(this.linestyles.dir>0)
			{
				if(this.linestyles.ptr>=this.linestyles.points.length)
				{
					if(this.linestyles.yoyo)
					{
						this.linestyles.dir=-1;
						this.linestyles.ptr-=2;
					}
					else
					{
						this.linestyles.counter++;
						this.linestyles.ptr--;
					}
				}
			}
			else
			{
				if(this.linestyles.ptr<0)
				{
					if(this.linestyles.yoyo)
					{
						this.linestyles.dir=1;
						this.linestyles.counter++;
						this.linestyles.ptr++;
					}
				}
			}
		}	
	}
	if(this.fillcolour.active)
	{
		if(this.fillcolour.counter<this.fillcolour.repeat || isNaN(this.fillcolour.repeat))
		{
			finishedtween=false;
			this.fillcolour.ptr+=this.fillcolour.dir;
			if(this.fillcolour.dir>0)
			{
				if(this.fillcolour.ptr>=this.fillcolour.points.length)
				{
					if(this.fillcolour.yoyo)
					{
						this.fillcolour.dir=-1;
						this.fillcolour.ptr-=2;
					}
					else
					{
						this.fillcolour.counter++;
						this.fillcolour.ptr--;
					}
				}
			}
			else
			{
				if(this.fillcolour.ptr<0)
				{
					if(this.fillcolour.yoyo)
					{
						this.fillcolour.dir=1;
						this.fillcolour.counter++;
						this.fillcolour.ptr++;
					}
				}
			}
		}	
	}
	if(this.linecolour.active)
	{
		if(this.linecolour.counter<this.linecolour.repeat || isNaN(this.linecolour.repeat))
		{
			finishedtween=false;
			this.linecolour.ptr+=this.linecolour.dir;
			if(this.linecolour.dir>0)
			{
				if(this.linecolour.ptr>=this.linecolour.points.length)
				{
					if(this.linecolour.yoyo)
					{
						this.linecolour.dir=-1;
						this.linecolour.ptr-=2;
					}
					else
					{
						this.linecolour.counter++;
						this.linecolour.ptr--;
					}
				}
			}
			else
			{
				if(this.linecolour.ptr<0)
				{
					if(this.linecolour.yoyo)
					{
						this.linecolour.dir=1;
						this.linecolour.counter++;
						this.linecolour.ptr++;
					}
				}
			}
		}	
	}
	if(this.shadow.active)
	{
		if(this.shadow.counter<this.shadow.repeat || isNaN(this.shadow.repeat))
		{
			finishedtween=false;
			this.shadow.ptr+=this.shadow.dir;
			if(this.shadow.dir>0)
			{
				if(this.shadow.ptr>=this.shadow.points.length)
				{
					if(this.shadow.yoyo)
					{
						this.shadow.dir=-1;
						this.shadow.ptr-=2;
					}
					else
					{
						this.shadow.counter++;
						this.shadow.ptr--;
					}
				}
			}
			else
			{
				if(this.shadow.ptr<0)
				{
					if(this.shadow.yoyo)
					{
						this.shadow.dir=1;
						this.shadow.counter++;
						this.shadow.ptr++;
					}
				}
			}
		}	
	}
	if(this.linecolour.active)
	{
		finishedtween=false;
		if(this.linecolour.counter<this.linecolour.repeat || isNaN(this.linecolour.repeat))
		{
			this.linecolour.ptr+=this.linecolour.dir;
			if(this.linecolour.dir>0)
			{
				if(this.linecolour.ptr>=this.linecolour.points.length)
				{
					if(this.linecolour.yoyo)
					{
						this.linecolour.dir=-1;
						this.linecolour.ptr-=2;
					}
					else
					{
						this.linecolour.counter++;
						this.linecolour.ptr--;
					}
				}
			}
			else
			{
				if(this.linecolour.ptr<0)
				{
					if(this.linecolour.yoyo)
					{
						this.linecolour.dir=1;
						this.linecolour.counter++;
						this.linecolour.ptr++;
					}
				}
			}
		}		
	}
	if(this.gradfill.active)
	{
		
		if(this.gradfill.counter<this.gradfill.repeat || isNaN(this.gradfill.repeat))
		{
			finishedtween=false;
			this.gradfill.ptr+=this.gradfill.dir;
			if(this.gradfill.dir>0)
			{
				if(this.gradfill.ptr>=this.gradfill.points.length)
				{
					if(this.gradfill.yoyo)
					{
						this.gradfill.dir=-1;
						this.gradfill.ptr-=2;
					}
					else
					{
						this.gradfill.counter++;
						this.gradfill.ptr--;
					}
				}
			}
			else
			{
				if(this.gradfill.ptr<0)
				{
					if(this.gradfill.yoyo)
					{
						this.gradfill.dir=1;
						this.gradfill.counter++;
						this.gradfill.ptr++;
					}
				}
			}
		}	
	}
	this.stopchecking=finishedtween;
}

function setTweenActives()
{
	if(this.translate.active  && !this.nodeTweening.active && !this.pointTweening)
	{
		this.translate.twtime=$("twtranslate").value;
		this.translate.repeat=$("twreptranslate").value;
		this.translate.yoyo=$("twyotranslate").checked;
	}
	if(this.rotate.active  && !this.nodeTweening.active && !this.pointTweening)
	{
		this.rotate.twtime=$("twrotate").value;
		this.rotate.repeat=$("twreprotate").value;
		this.rotate.yoyo=$("twyorotate").checked;
	}
	if(this.linestyles.active)
	{
		this.linestyles.twtime=$("twstyles").value;
		this.linestyles.repeat=$("twrepstyles").value;
		this.linestyles.yoyo=$("twyostyles").checked;	
	}
	if(this.fillcolour.active)
	{
		this.fillcolour.twtime=$("twfillcol").value;
		this.fillcolour.repeat=$("twrepfillcol").value;
		this.fillcolour.yoyo=$("twyofillcol").checked;	
	}
	if(this.shadow.active)
	{
		this.shadow.twtime=$("twshad").value;
		this.shadow.repeat=$("twrepshad").value;
		this.shadow.yoyo=$("twyoshad").checked;	
	}
	if(this.linecolour.active)
	{
		this.linecolour.twtime=$("twlinecol").value;
		this.linecolour.repeat=$("twreplinecol").value;
		this.linecolour.yoyo=$("twyolinecol").checked;		
	}
	if(this.gradfill.active)
	{
		this.gradfill.twtime=$("twgradfill").value;
		this.gradfill.repeat=$("twrepgradfill").value;
		this.gradfill.yoyo=$("twyogradfill").checked;	
	}
	if(this.edit.active  && !this.nodeTweening.active && !this.pointTweening)
	{
		this.edit.twtime=$("twedit").value;
		this.edit.repeat=$("twrepedit").value;
		this.edit.yoyo=$("twyoedit").checked;	
	}
}

function getTweenActives()
{	
	if(this.translate.active  && !this.nodeTweening.active && !this.pointTweening)
	{
		$("twtranslate").value=this.translate.twtime;
		$("twreptranslate").value=this.translate.repeat;
		$("twyotranslate").checked=this.translate.yoyo;
	}
	if(this.rotate.active  && !this.nodeTweening.active && !this.pointTweening)
	{
		$("twrotate").value=this.rotate.twtime;
		$("twreprotate").value=this.rotate.repeat;
		$("twyorotate").checked=this.rotate.yoyo;
	}
	if(this.linestyles.active)
	{
		$("twstyles").value=this.linestyles.twtime;
		$("twrepstyles").value=this.linestyles.repeat;
		$("twyostyles").checked=this.linestyles.yoyo;	
	}
	if(this.fillcolour.active)
	{
		$("twfillcol").value=this.fillcolour.twtime;
		$("twrepfillcol").value=this.fillcolour.repeat;
		$("twyofillcol").checked=this.fillcolour.yoyo;	
	}
	if(this.shadow.active)
	{
		$("twshad").value=this.shadow.twtime;
		$("twrepshad").value=this.shadow.repeat;
		$("twyoshad").checked=this.shadow.yoyo;	
	}
	if(this.linecolour.active)
	{
		$("twlinecol").value=this.linecolour.twtime;
		$("twreplinecol").value=this.linecolour.repeat;
		$("twyolinecol").checked=this.linecolour.yoyo;		
	}
	if(this.gradfill.active)
	{
		$("twgradfill").value=this.gradfill.twtime;
		$("twrepgradfill").value=this.gradfill.repeat;
		$("twyogradfill").checked=this.gradfill.yoyo;	
	}
	if(this.edit.active  && !this.nodeTweening.active && !this.pointTweening)
	{
		$("twedit").value=this.edit.twtime;
		$("twrepedit").value=this.edit.repeat;
		$("twyoedit").checked=this.edit.yoyo;	
	}
}

function trotationset()
{
	if(CURRENTTWEEN.rotate.active)
	{
		$("twrotate").value=$("twtranslate").value;
		$("twreprotate").value=$("twreptranslate").value;
		$("twyorotate").checked=$("twyotranslate").checked;
		CURRENTTWEEN.rotate.twtime=$("twtranslate").value;
		CURRENTTWEEN.rotate.repeat=$("twreptranslate").value;
		CURRENTTWEEN.rotate.yoyo=$("twyotranslate").checked;
	}
}

function erotationset()
{
	if(CURRENTTWEEN.rotate.active)
	{
		$("twrotate").value=$("twedit").value;
		$("twreprotate").value=$("twrepedit").value;
		$("twyorotate").checked=$("twyoedit").checked;
		CURRENTTWEEN.rotate.twtime=$("twedit").value;
		CURRENTTWEEN.rotate.repeat=$("twrepedit").value;
		CURRENTTWEEN.rotate.yoyo=$("twyoedit").checked;
	}
}

function rtransset()
{
	if(CURRENTTWEEN.translate.active)
	{
		$("twtranslate").value=$("twrotate").value;
		$("twreptranslate").value=$("twreprotate").value;
		$("twyotranslate").checked=$("twyorotate").checked;
		CURRENTTWEEN.translate.twtime=$("twrotate").value;
		CURRENTTWEEN.translate.repeat=$("twreprotate").value;
		CURRENTTWEEN.translate.yoyo=$("twyorotate").checked;
	}
}

function etransset()
{
	if(CURRENTTWEEN.translate.active)
	{
		$("twtranslate").value=$("twedit").value;
		$("twreptranslate").value=$("twrepedit").value;
		$("twyotranslate").checked=$("twyoedit").checked;
		CURRENTTWEEN.translate.twtime=$("twedit").value;
		CURRENTTWEEN.translate.repeat=$("twrepedit").value;
		CURRENTTWEEN.translate.yoyo=$("twyoedit").checked;
	}
}

function reditset()
{
	if(CURRENTTWEEN.edit.active)
	{
		$("twedit").value=$("twrotate").value;
		$("twrepedit").value=$("twreprotate").value;
		$("twyoedit").checked=$("twyorotate").checked;
		CURRENTTWEEN.edit.twtime=$("twrotate").value;
		CURRENTTWEEN.edit.repeat=$("twreprotate").value;
		CURRENTTWEEN.edit.yoyo=$("twyorotate").checked;
	}
}

function teditset()
{
	if(CURRENTTWEEN.edit.active)
	{
		$("twedit").value=$("twtranslate").value;
		$("twrepedit").value=$("twreptranslate").value;
		$("twyoedit").checked=$("twyotranslate").checked;
		CURRENTTWEEN.edit.twtime=$("twtranslate").value;
		CURRENTTWEEN.edit.repeat=$("twreptranslate").value;
		CURRENTTWEEN.edit.yoyo=$("twyotranslate").checked;
	}
}

function setTimeAll()
{
	var v=$("defaulttime").value;
	var tween=CURRENTTWEEN;
	tween.translate.twtime=v;
	tween.rotate.twtime=v;
	tween.linestyles.twtime=v;
	tween.linecolour.twtime=v;
	tween.fillcolour.twtime=v;
	tween.gradfill.twtime=v;
	tween.shadow.twtime=v;
	tween.edit.twtime=v;
	tween.nodeTweening.twtime=v;
	for(var name in tween.nodePaths)
	{
		tween.nodePaths[name].nodeTweening.twtime=v;
	}
	tween.getTweenActives();
	$("tweditline").value=v;
}

function setRepAll()
{
	var v=$("defaultrepeats").value;
	var tween=CURRENTTWEEN;
	tween.translate.repeat=v;
	tween.rotate.repeat=v;
	tween.linestyles.repeat=v;
	tween.linecolour.repeat=v;
	tween.fillcolour.repeat=v;
	tween.gradfill.repeat=v;
	tween.shadow.repeat=v;
	tween.edit.repeat=v;
	tween.nodeTweening.repeat=v;
	for(var name in tween.nodePaths)
	{
		tween.nodePaths[name].nodeTweening.repeat=v;
	}
	tween.getTweenActives();
	$("twrepeditline").value=v;
}

function setYoAll()
{
	var v=$("defaultyoyo").checked;
	var tween=CURRENTTWEEN;
	tween.translate.yoyo=v;
	tween.rotate.yoyo=v;
	tween.linestyles.yoyo=v;
	tween.linecolour.yoyo=v;
	tween.fillcolour.yoyo=v;
	tween.gradfill.yoyo=v;
	tween.shadow.yoyo=v;
	tween.edit.yoyo=v;
	tween.nodeTweening.yoyo=v;
	for(var name in tween.nodePaths)
	{
		tween.nodePaths[name].nodeTweening.yoyo=v;
	}
	tween.getTweenActives();
	$("twyoeditline").value=v;
}

function setPathAll()
{
	var v=$("defaultpath").checked;
	var tween=CURRENTTWEEN;
	for(var name in tween.nodePaths)
	{
		tween.nodePaths[name].nodeTweening.active=v;
	}
	$("twacteditline").checked=v;
}

function bezx(t)
{
	return (1-t)*(1-t)*(1-t)*parseInt(this.point.x) + 3*(1-t)*(1-t)*t*parseInt(this.next.ctrl1.x) + 3*(1-t)*t*t*parseInt(this.next.ctrl2.x) + t*t*t*parseInt(this.next.point.x)
}

function bezy(t)
{
	return (1-t)*(1-t)*(1-t)*parseInt(this.point.y) + 3*(1-t)*(1-t)*t*parseInt(this.next.ctrl1.y) + 3*(1-t)*t*t*parseInt(this.next.ctrl2.y) + t*t*t*parseInt(this.next.point.y)
}

function linx(t)
{
	return this.next.point.x+(this.next.point.x-this.point.x)*t;
}

function liny(t)
{
	return this.next.point.y+(this.next.point.y-this.point.y)*t;
}

function betweenAngle(e,s,t)  // s start angle, e end angle, t parameter between 0 and 1
{
	var ang=(2*Math.PI+e-s) % (2*Math.PI);
	if(!this.rotate.clkw)
	{
		ang=-(2*Math.PI-ang);
	}
	return s+t*ang;
}

function reverseAll()
{
	var shape=this.getShape();
	if(this.translate.active  || this.rotate.active || this.nodeTweening.active || this.pointTweening || this.edit.active)
	{
		var node=shape.path.next;		
		while(node.point.x!="end")
		{
			node.tweennodes.reverse();
			node=node.next;
		}
	}
	if (this.gradfill.active)
	{
		this.linegrads.reverse();
		this.radgrads.reverse();
	}
	if(this.fillcolour.active)
	{
		this.fillcolour.points.reverse();
	}
	if(this.linestyles.active)
	{
		this.linestyles.points.reverse();
	}
	if(this.gradfill.active)
	{
		this.gradfill.points.reverse();
	}
	if(this.shadow.active)
	{
		this.shadow.points.reverse();
	}	
}
