/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function Tween(name)
{
	this.name=name;
	this.title;
	this.shapes={};
	this.groups={};
	this.copy={shapes:{},groups:{}};
	this.tweens=[];  //list of shapes forming Tween
	this.nodePaths={} //list of paths between shape nodes and copy nodes
	this.translate={active:false,repeat:1,yoyo:false};
	this.rotate={active:false,twtime:60,repeat:1,yoyo:false};
	this.mirror={active:false,twtime:60,repeat:1,yoyo:false};
	this.linestyles={active:false,twtime:60,repeat:1,yoyo:false};
	this.linecolour={active:false,twtime:60,repeat:1,yoyo:false};
	this.fillcolour={active:false,twtime:60,repeat:1,yoyo:false};
	this.gradfill={active:false,twtime:60,repeat:1,yoyo:false};
	this.shadow={active:false,twtime:60,repeat:1,yoyo:false};
	this.nodeTweening={active:false,repeat:1,yoyo:false};
	this.ptime; //time over path from sprite.ptime;
	
	//methods
	this.setAniStage=setAniStage;
	this.copytween=copytween;
	this.drawtween=drawtween;
	this.getShape=getShape;
	this.tweenruntime=tweenruntime;
	//this.setLengths=setLengths;
	//this.setTimes=setTimes;
	//this.saveTween=saveTween;
	//this.restoreTween=restoreTween;
	//this.TweenToText=TweenToText;
	this.copy.getShape=getShape;
	this.setNodeTweening;
	this.addAllToStage=addAllToStage;
	this.startNodePaths=startNodePaths; 
	this.setNodePaths=setNodePaths;
	this.compareTweens=compareTweens;
}

function copytween(theatre)
{
	theatre+="stage";
	var tween=new Tween("SUBTR"+(NCOUNT++));
	tween.title=this.title;
	elementShapeCopy(this.groups,tween.groups,tween.shapes,0,$(theatre));
	var shape=tween.getShape();
	shape.name="A"+shape.name;
	elementShapeCopy(this.copy.groups,tween.copy.groups,tween.copy.shapes,0,$(theatre));
	var copy=tween.getShape();
	copy.name="B"+shape.name;
	tween.translate.active=this.translate.active;
	tween.translate.twtime=this.translate.twtime;
	tween.translate.repeat=this.translate.repeat;
	tween.translate.yoyo=this.translate.yoyo;
	tween.rotate.active=this.rotate.active;
	tween.rotate.twtime=this.rotate.twtime;
	tween.rotate.repeat=this.rotate.repeat;
	tween.rotate.yoyo=this.rotate.yoyo;
	tween.mirror.active=this.mirror.active;
	tween.mirror.twtime=this.mirror.twtime;
	tween.mirror.repeat=this.mirror.repeat;
	tween.mirror.yoyo=this.mirror.yoyo;
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
	return tween;
}

function drawtween()
{
	var shape=this.getShape();
	var copy=this.copy.getShape();
	shape.draw();
	copy.draw();
	shape.Canvas.ctx.restore();
	shape.Canvas.ctx.save();
}

function savetween(tweendata)
{
	var tweenarray=tweendata.split(",");
	var filmname=tweenarray[0];
	var topname=tweenarray[1];
	var tweenname=tweenarray[2];
	if(filmname=="nofilm!!!!")
	{
		if(topname=="nosprite!!!!")
		{
			var tween=TWEENS[tweenname];
		}
		else
		{
			var toptween=TWEENS[topname];
			var tween=toptween.getTween(tweenname).tween;
		}
	}
	else
	{
		var film=FILMS[filmname];
		var toptween=film.getFlel(topname);
		var tween=toptween.getTween(tweenname).tween;
	}
	$("twbuttons").style.visibility="hidden";
	TWEENEDIT=false;
	closedone();
}

function tweenruntime(mx)
{
	mx=1;
	return mx;
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
	clear($("tweenpathsstage"));
	var shape=this.getShape();
	var copy=this.copy.getShape();
	var node=shape.path.next;
	var copynode=copy.path.next;
	var point,ctrl1,ctrl2;
	var start,last;
	this.nodeTweening.active=true;
	while(node.point.x!="end")
	{
		node.nodepath=new Shape("NodePath"+SCOUNT,"NodePath"+(SCOUNT++),true,true,"curve",this.nodePaths);
		node.nodepath.zIndex=10000000;
		node.nodepath.strokeStyle=[0,255,0,1];
		node.nodeTweening={active:true,repeat:1,yoyo:false};
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
		node=node.next;
		copynode=copynode.next;
	}
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
		node=node.next;
		copynode=copynode.next;
	}
}

function showNodePathList(nodein)
{
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
	tween.nodeTweening.active=true;
	$("nodetweens").className="choice80";
	$("nodetweens").onmouseout=function() {$("nodetweens").className="choice80";}
	$("twnodetween").checked=true;
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
}



function compareTweens()
{
	var node;
	var shape=this.getShape();
	var copy=this.copy.getShape();
	if(tween.translate.active)
	{
		if(tween.rotate.active)
		{
			//translate and rotate
		}
		else
		{
			//translate only
			node=shape.path.next;
			while(node.point.x!="end")
			{
				
				node=node.next;
			}
		}
	}
	else
	{
		if(tween.rotate.active)
		{
			//rotate only
		}
		else
		{
			//not translation no rotation
		}
	}
	
}

function setNodeTweening(chkbx)
{
	if(chkbx.checked)
	{
		CURRENTTWEEN.nodeTweening.active=true;
		$("nodetweens").className="choice80";
		$("nodetweens").onmouseout=function() {$("nodetweens").className="choice80";}
	}
	else
	{
		CURRENTTWEEN.nodeTweening.active=false;
		$("nodetweens").className="choice40";
		$("nodetweens").onmouseout=function() {$("nodetweens").className="choice40";}
	}
}
