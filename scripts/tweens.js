/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function TweenNode(point,ctrl1,ctrl2)
{
	this.point=point;
	this.ctrl1=ctrl1;
	this.ctrl2=ctrl2;
}

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
	this.linestyles={active:false,twtime:60,repeat:1,yoyo:false};
	this.linecolour={active:false,twtime:60,repeat:1,yoyo:false};
	this.fillcolour={active:false,twtime:60,repeat:1,yoyo:false};
	this.gradfill={active:false,twtime:60,repeat:1,yoyo:false};
	this.shadow={active:false,twtime:60,repeat:1,yoyo:false};
	this.nodeTweening={active:false,repeat:1,yoyo:false};
	this.pointTweening=false;
	this.reverse=false;
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
	this.prepareTweens=prepareTweens;
	this.setPoints=setPoints;
	this.setTweenTimeBox=setTweenTimeBox;
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
			var tween=toptween.getTween().tween;
		}
	}
	else
	{
		var film=FILMS[filmname];
		var toptween=film.getFlel(topname);
		var tween=toptween.getTween().tween;
	}
	$("twbuttons").style.visibility="hidden";
	TWEENEDIT=false;
	closedone();
}

function checktween(tweendata)
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
			var tween=toptween.getTween().tween;
		}
	}
	else
	{
		var film=FILMS[filmname];
		var toptween=film.getFlel(topname);
		var tween=toptween.getTween().tween;
	}
	$("twbuttons").style.visibility="hidden";
	$("checkdone").style.visibility="visible";
	$("toolbar").style.visibility="hidden";
	$("menushape").style.visibility="hidden";
	$("grid").style.visibility="hidden";
	STOPCHECKING=false;
	closedone();
}

function swaptween(tweendata)
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
	tween.reverse=!tween.reverse;
	var twtemp=$("twfirst").innerHTML;
	var twtempbkgdcl=$("twfirst").style.backgroundColor;
	$("twfirst").innerHTML=$("twlast").innerHTML;
	$("twlast").innerHTML=twtemp;
	$("twfirst").style.backgroundColor=$("twlast").style.backgroundColor;
	$("twlast").style.backgroundColor=twtempbkgdcl;
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
		node.nodepath.nodeTweening={active:true,twtime:60,repeat:1,yoyo:false,ctrl:false};
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
	var shape=this.getShape();
	var copy=this.copy.getShape();
	var node=shape.path.next;
	if(this.nodeTweening)
	{
		while(node.next.point.x!="end")
		{
			if(node.nodepath.nodeTweening)
			{
				node.nodepath.path.next.pathTweeningPoints(node.nodepath.path.prev);
			}
			else
			{
				node.nodepath.path.next.transformTweeningPoints(node.nodepath.path.prev);
			}
			node=node.next;
		}
		if(shape.open)
		{
			if(node.nodepath.nodeTweening)
			{
				node.nodepath.path.next.pathTweeningPoints(node.nodepath.path.prev);
			}
			else
			{
				node.nodepath.path.next.transformTweeningPoints(node.nodepath.path.prev);
			}
		}
	}
	else
	{
		while(node.next.point.x!="end")
		{
			node.nodepath.path.next.transformTweeningPoints(node.nodepath.path.prev);
			node=node.next;
		}
		if(shape.open)
		{
			node.nodepath.path.next.transformTweeningPoints(node.nodepath.path.prev);
		}
	}
	

}

function pathTweeningPoints(last) //node follows bezier path if node.nodepath.nodeTweening is true
{
	
}

function TransformTweeningPoints(last)  //node follows rotate translate path if node.nodepath.nodeTweening is false
{
	var theta; //theta is change in angle
	var tween=CURRENTTWEEN;
	this.tweennodes=[]; //nodes on tween path for node
	this.tweennodes.push(this);
	var shape=tween.getShape();
	var copy=tween.copy.getShape();
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
		if(!copy.group.clockwise)
		{
			theta=-theta;
		}
	}
	var Ttick=tween.translate.twtime*20;
	var Rtick=tween.rotate.twtime*20;
	var tick=50;
	var doTranslate=tween.translate.active;
	var doRotate=tween.rotate.active
	while(doTranslate || doRotate)
	{
		if(doTranslate)
		{
			if(doRotate)
			{
				//translate and rotate
			}
			else
			{
				p=new Point(this.point.x+xtranslate*tick/Ttick,this.point.y+ytranslate*tick/Ttick);
				c1=new Point(this.ctrl1.x+xtranslate*tick/Ttick,this.ctrl1.y+ytranslate*tick/Ttick);
				c2=new Point(this.ctrl2.x+xtranslate*tick/Ttick,this.ctrl2.y+ytranslate*tick/Ttick);
				twnode=new TweenNode(p,c1,c2);
				this.tweennodes.push(twnode);
			}
		}
		else
		{
			if(doRotate)
			{
				//rotate only
			}
		}
		tick+=50;
		if(tick>Ttick) {doTranslate=false};
		if(tick>Rtick) {doRotate=false};
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
	if(this.pointTweening)
	{
		var ttccontenthtml=ttcfxdhtml+ttccfxhtml;
	}
	else
	{
		var ttccontenthtml=ttcfxdhtml+ttccathtml;
	}
	var ttcprphtml="";
	var ttcnum=0;
	var ttheight=300;
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
	if(this.gradfill.active)
	{
		ttcprphtml+=ttcgdfhtml;
		ttcnum++;	
	}
	
	if(ttcnum>0)
	{
		ttheight+=40*(ttcnum+1);
		if(ttheight>SCRH-200) {ttheight=SCRH-200}
		ttccontenthtml+=ttclbshtml;
	}
	ttccontenthtml+=ttcprphtml;
	$("tweentimecontent").innerHTML=ttccontenthtml;
	if(!this.pointTweening)
	{
		$("twnodetween").checked=this.nodeTweening.active;
	}
	$("tweentimebox").style.height=ttheight+"px";
	$("tweentimecontent").style.height=(parseInt($("tweentimebox").style.height)-25)+"px";
	$("tweentimebox").style.clip="rect(1px,"+(parseInt($("tweentimebox").style.width)+2)+"px,"+(parseInt($("tweentimebox").style.height)+2)+"px,0px)";			
}
