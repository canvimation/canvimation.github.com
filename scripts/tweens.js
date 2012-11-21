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
	}
	else
	{
		this.ctrl1=new Point("non","non");
		this.ctrl2=new Point("non","non");
	}
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
	this.translate={active:false,twtime:10,repeat:1,counter:0,yoyo:false,ptr:0}; //if translae and rotate both acitve must share twtime, repeat and yoyo
	this.rotate={active:false,twtime:10,repeat:1,yoyo:false,ptr:0,mx:0};
	this.linestyles={active:false,twtime:10,repeat:1,counter:0,yoyo:false,points:[],ptr:0};
	this.linecolour={active:false,twtime:10,repeat:1,counter:0,yoyo:false,points:[],ptr:0};
	this.fillcolour={active:false,twtime:10,repeat:1,counter:0,yoyo:false,points:[],ptr:0};
	this.gradfill={active:false,twtime:10,repeat:1,counter:0,yoyo:false,points:[],ptr:0};
	this.shadow={active:false,twtime:10,repeat:1,counter:0,yoyo:false,points:[],ptr:0};
	this.nodeTweening={active:false,repeat:1,counter:0,yoyo:false}; //can be on (translate/rotate off) or off (translate/rotate on)
	this.pointTweening=false;  // if node changed - point or controls - then true and translate rotate off
	this.reverse=false;
	this.maxrun=0;
	this.ptime; //time over path from sprite.ptime;
	
	//methods
	this.setAniStage=setAniStage;
	this.copytween=copytween;
	this.drawtween=drawtween;
	this.getShape=getShape;
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
	this.zeroTweenPtrs=zeroTweenPtrs;
	this.updateTweenPtrs=updateTweenPtrs;
	this.tweenplay=tweenplay;
	this.setTweenActives=setTweenActives;
	this.transformTweeningPoints=transformTweeningPoints;
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
	tween.translate.counter=0;
	tween.translate.ptr=0;
	tween.rotate.active=this.rotate.active;
	tween.rotate.twtime=this.rotate.twtime;
	tween.rotate.repeat=this.rotate.repeat;
	tween.rotate.yoyo=this.rotate.yoyo;
	tween.rotate.counter=0;
	tween.rotate.ptr=0;
	tween.linestyles.active=this.linestyles.active;
	tween.linestyles.twtime=this.linestyles.twtime;
	tween.linestyles.repeat=this.linestyles.repeat;
	tween.linestyles.yoyo=this.linestyles.yoyo;
	tween.linestyles.counter=0;
	tween.linestyles.ptr=0;
	tween.linestyles.points=[];
	tween.linecolour.active=this.linecolour.active;
	tween.linecolour.twtime=this.linecolour.twtime;
	tween.linecolour.repeat=this.linecolour.repeat;
	tween.linecolour.yoyo=this.linecolour.yoyo;
	tween.linecolour.counter=0;
	tween.linecolour.ptr=0;
	tween.linecolour.points=[];
	tween.fillcolour.active=this.fillcolour.active;
	tween.fillcolour.twtime=this.fillcolour.twtime;
	tween.fillcolour.repeat=this.fillcolour.repeat;
	tween.fillcolour.yoyo=this.fillcolour.yoyo;
	tween.fillcolour.counter=0;
	tween.fillcolour.ptr=0;
	tween.fillcolour.points=[];
	tween.gradfill.active=this.gradfill.active;
	tween.gradfill.twtime=this.gradfill.twtime;
	tween.gradfill.repeat=this.gradfill.repeat;
	tween.gradfill.yoyo=this.gradfill.yoyo;
	tween.gradfill.counter=0;
	tween.gradfill.ptr=0;
	tween.gradfill.points=[];
	tween.shadow.active=this.shadow.active;
	tween.shadow.twtime=this.shadow.twtime;
	tween.shadow.repeat=this.shadow.repeat;
	tween.shadow.yoyo=this.shadow.yoyo;
	tween.shadow.counter=0;
	tween.shadow.ptr=0;
	tween.shadow.points=[];
	tween.nodeTweening.active=this.nodeTweening.active;
	tween.nodeTweening.twtime=this.nodeTweening.twtime;
	tween.nodeTweening.repeat=this.nodeTweening.repeat;
	tween.nodeTweening.yoyo=this.nodeTweening.yoyo;
	tween.pointTweening=this.pointTweening;
	tween.reverse=this.reverse;
	tween.maxrun=this.maxrun;
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
	tween.setTweenActives();
	closedone();
}

function checktween(tweendata)
{
	var node,tweennode;
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
	tween.setTweenActives();
	tween.prepareTweens();
	var shape=tween.getShape();
	clear($("tweenstage"));
	clear($("boundarydrop"));
	$("boundarydrop").style.visibility="hidden";
	tween.tweenshape=makeCopy(shape,0,$("tweenstage"),{});
	node=shape.path.next;
	var endptr=node.tweennodes.length;
	tween.zeroTweenPtrs();
	tween.tweenplay();
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
		node.nodepath.nodeTweening={active:true,twtime:10,repeat:1,yoyo:false};
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
	var copynode=copy.path.next;
	if(this.nodeTweening.active)
	{
		while(node.next.point.x!="end")
		{
			if(node.nodepath.nodeTweening)
			{
				node.nodepath.path.next.pathTweeningPoints(node.nodepath.path.prev);
			}
			else
			{
				node.nodepath.path.next.translateTweeningPoints(node.nodepath.path.prev);
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
				node.nodepath.path.next.translateTweeningPoints(node.nodepath.path.prev);
			}
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
	if(this.fillcolour.active)
	{
		var FCtick=tween.fillcolour.twtime*1000;
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
	

}

function pathTweeningPoints(last) //node and ctrl points for node follows bezier path if node.nodepath.nodeTweening is true
{
	
}

function translateTweeningPoints(last) //node and ctrl points for node translated  if node.nodepath.nodeTweening is false
{
	
}

function transformTweeningPoints(node)  //node follows rotate translate path if node.nodepath.nodeTweening is false
{
	var theta; //theta is change in angle
	var cx,cy; //centre of rotation
	var tween=CURRENTTWEEN;
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
		if(!copy.group.clockwise)
		{
			theta=-theta;
		}
	}
	var Ttick=this.translate.twtime*1000;
	var Rtick=this.rotate.twtime*1000;
	var tick=50;
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

function tweenplay()
{
	if(!STOPCHECKING)
	{
		var shape=this.getShape();
		var node=shape.path.next;
		if(this.translate.active  || this.rotate.active || this.nodeTweening.active || this.pointTweening)
		{
			var tweennode=this.tweenshape.path.next;
			while(node.point.x!="end")
			{
				tweennode.point.x=node.tweennodes[node.ptr].point.x;
				tweennode.point.y=node.tweennodes[node.ptr].point.y;
				tweennode.ctrl1.x=node.tweennodes[node.ptr].ctrl1.x;
				tweennode.ctrl1.y=node.tweennodes[node.ptr].ctrl1.y;
				tweennode.ctrl2.x=node.tweennodes[node.ptr].ctrl2.x;
				tweennode.ctrl2.y=node.tweennodes[node.ptr].ctrl2.y;
				node=node.next;
				tweennode=tweennode.next;
			}
		}
		if(this.fillcolour.active)
		{
			for(var i=0;i<4;i++)
			{
				this.tweenshape.fillStyle[i]=Math.round(this.fillcolour.points[this.fillcolour.ptr][i]);
			}
		}
		this.tweenshape.draw();
		this.updateTweenPtrs();
		var tween=this;
		setTimeout(function() {tween.tweenplay()},50);
	}
}

function updateTweenPtrs()
{
	var finshedtween=true;
	var shape=this.getShape();
	var node;
	if(this.translate.active  || this.rotate.active || this.nodeTweening.active || this.pointTweening)
	{
		node=shape.path.next;
		while(node.point.x!="end")
		{
			if(node.counter<node.repeat || isNaN(node.repeat))
			{
				finishedtween=false;
				node.ptr+=node.dir;
				if(node.dir>0)
				{
					if(node.ptr>node.tweennodes.length)
					{
						if(node.yoyo)
						{
							node.dir=-1;
							node.ptr-=2;
						}
						else
						{
							node.counter++;
							node.ptr--;
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
	if(this.linestyles.active)
	{
		if(this.linestyles.counter<this.linestyles.repeat || isNaN(this.linestyles.repeat))
		{
			finishedtween=false;
			this.linestyles.ptr+=this.linestyles.dir;
			if(this.linestyles.dir>0)
			{
				if(this.linestyles.ptr>this.linestyles.points.length)
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
				if(this.fillcolour.ptr>this.fillcolour.points.length)
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
	if(this.shadow.active)
	{
		if(this.shadow.counter<this.shadow.repeat || isNaN(this.shadow.repeat))
		{
			finishedtween=false;
			this.shadow.ptr+=this.shadow.dir;
			if(this.shadow.dir>0)
			{
				if(this.shadow.ptr>this.shadow.points.length)
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
				if(this.linecolour.ptr>this.linecolour.points.length)
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
		finishedtween=false;
		if(this.gradfill.counter<this.gradfill.repeat || isNaN(this.gradfill.repeat))
		{
			this.gradfill.ptr+=this.gradfill.dir;
			if(this.gradfill.dir>0)
			{
				if(this.gradfill.ptr>this.gradfill.points.length)
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
	STOPCHECKING=finishedtween;
}

function setTweenActives()
{	
	if(this.translate.active && !this.nodeTweening.active && !this.pointTweening)
	{
		this.translate.twtime=$("twtranslate").value;
		this.translate.repeat=$("twreptranslate").value;
		this.translate.yoyo=$("twyotranslate").checked;
	}
	if(this.rotate.active && !this.nodeTweening.active && !this.pointTweening)
	{
		this.rotate.twtime=$("twrotate").value;
		this.rotate.repeat=$("twreprotate").value;
		this.rotate.yoyo=$("twyorotate").checked;
	}
	if(this.linestyles.active)
	{
		this.styles.twtime=$("twstyles").value;
		this.styles.repeat=$("twrepstyles").value;
		this.styles.yoyo=$("twyostyles").checked;	
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
		this.linecolour.twtime=$("twfillcol").value;
		this.linecolour.repeat=$("twrepfillcol").value;
		this.linecolour.yoyo=$("twyofillcol").checked;		
	}
	if(this.gradfill.active)
	{
		this.gradfill.twtime=$("twgradfill").value;
		this.gradfill.repeat=$("twrepgradfill").value;
		this.gradfill.yoyo=$("twyogradfill").checked;	
	}
}
