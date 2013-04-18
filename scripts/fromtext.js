/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function resetshapestage(txt)
{
	var params=txt.split('|');
	if(params.length>2)
	{
		var stagewidth=parseInt(params[3]);
		var stageheight=parseInt(params[4]);
		var c=parseInt(params[5]);
	}
	else
	{
		var stagewidth=parseInt(params[0]);
		var stageheight=parseInt(params[1]);
		var c=0;
	}
	clear($("shapestage"));
	setStage(stagewidth,stageheight);
	$("boundarydrop").style.visibility="visible";
	SHAPES={};
	SELECTED={};
	SELECTEDSHAPE;
	DELETED={};
	DELETES=[];
	GROUPS={};
	MCOUNT=0;
	BCOUNT=0;
	SCOUNT=0;
	GCOUNT=0;
	NCOUNT=0;
	ZPOS=1;
	ZNEG=-1;
	CURRENT=SHAPES;
	return c;
}

function resetcanv(canvasfiletxt)
{
	var canvasfile=canvasfiletxt.split("^");
	var sizetxt=canvasfile[0];
	var sgtxt=canvasfile[1];
	var zmax=0;
	var zmin=10000000;
	var shape;
	resetshapestage(sizetxt);
	resetshapes(sgtxt,SHAPES,GROUPS,"canvas");
	for(var name in SHAPES)
	{
		shape=SHAPES[name];
		SCOUNT++;
		if(shape.zIndex>zmax) {zmax=shape.zIndex};
		if(shape.zIndex<zmin) {zmin=shape.zIndex};
		shape.addTo($("shapestage"));
		shape.draw();
	}
	for (var name in GROUPS)
	{
		GCOUNT++;
	}
	ZPOS=zmax+1;
	ZNEG=zmin-1;
}

function resetshapes(sgtxt,Shape_Store,Group_Store,type)
{	
	var shape,group;
	var sgp=sgtxt.split("¬")
	var shapetxt=sgp[0];
	var grouptxt=sgp[1];
	var shapeparams=shapetxt.split('*');	
	while (shapeparams.length>0)
	{
		shape=paramstoshape(shapeparams.shift(),Shape_Store,type);
	}
	var groupparams=grouptxt.split('*');
	while(groupparams.length>0)
	{
		paramstogroup(groupparams.shift(),Group_Store,type);
	}
	for(var name in Group_Store)
	{
		group=Group_Store[name];
		for(var i=0; i<group.members.length; i++)
		{
			if(group.members[i][0]=="s")
			{
				group.members[i]=Shape_Store[group.members[i][1].trim()];
			}
			else
			{
				group.members[i]=Group_Store[group.members[i][1].trim()];
			}
		}
	}
	for(var name in Shape_Store)
	{
		shape=Shape_Store[name];
		shape.group=Group_Store[shape.group]; //change shape.group from group.name to actual group
	}
}

function paramstoshape(p,Shape_Store,type)
{
	var nodedata,point,ctrl1,ctrl2;
	var node;
	p=p.split('|');
	if(type=="canvas")
	{
		var oldname=p[0];
		var newname=oldname;
	}
	else
	{
		var oldname=p[0];
		var newname="SUBSH"+(NCOUNT++);
	}
	var shape=new Shape(p[0],p[1],p[2]=="1",p[3]=="1",p[4],Shape_Store);
	shape.tplftcrnr.x = parseInt(p[5]);
	shape.tplftcrnr.y = parseInt(p[6]);
	shape.btmrgtcrnr.x = parseInt(p[7]);
	shape.btmrgtcrnr.y = parseInt(p[8]);
	shape.strokeStyle = p[9].split(',');
	for (var i=0;i<shape.strokeStyle.length;i++)
	{
		shape.strokeStyle[i]=parseInt(shape.strokeStyle[i]);	
	}	
	shape.fillStyle = p[10].split(',');
	for (var i=0;i<shape.fillStyle.length;i++)
	{
		shape.fillStyle[i]=parseInt(shape.fillStyle[i])	
	}	
	shape.lineWidth = parseInt(p[11]);
	shape.lineCap = p[12];
	shape.lineJoin = p[13];
	shape.justfill = p[14]=='1';
	shape.linearfill = p[15]=='1';
	shape.lineGrad = p[16].split(',');
	for (var i=0;i<shape.lineGrad.length;i++)
	{
		shape.lineGrad[i]=parseInt(shape.lineGrad[i])	
	}	
	shape.radGrad = p[17].split(',');
	for (var i=0;i<shape.radGrad.length;i++)
	{
		shape.radGrad[i]=parseInt(shape.radGrad[i])	
	}	
	var carray=p[18].split(':');
	shape.colorStops = [];
	for (var i=0; i<carray.length; i++)
	{
		shape.colorStops[i]=carray[i].split(',');
		for (var j=0;j<shape.colorStops[i].length;j++)
		{
			shape.colorStops[i][j]=parseFloat(shape.colorStops[i][j])	
		}		
	}
	shape.stopn = parseInt(p[19]);
	shape.shadow = p[20]=='1';
	shape.shadowOffsetX = parseInt(p[21]);
	shape.shadowOffsetY = parseInt(p[22]);
	shape.shadowBlur = parseFloat(p[23]);
	shape.shadowColor = p[24].split(',');
	for (var i=0;i<shape.shadowColor.length;i++)
	{
		shape.shadowColor[i]=parseInt(shape.shadowColor[i])	
	}	
	shape.zIndex = parseFloat(p[25]);
	shape.crnrradius = parseInt(p[26]);
	shape.group = p[28]; //name of group
	var path=p[27].split("!");
	
	while (path.length>0)
	{
		nodedata=path.shift().split(":");
		point=new Point(parseFloat(nodedata[2]),parseFloat(nodedata[3]));
		node=new Node(point);
		node.vertex=nodedata[0];
		node.corner=nodedata[1];
		node.ctrl1.x=nodedata[4];
		if(node.ctrl1.x !="non")
		{
			node.ctrl1.x=parseFloat(node.ctrl1.x)
		}
		node.ctrl1.y=nodedata[5];
		if(node.ctrl1.y !="non")
		{
			node.ctrl1.y=parseFloat(node.ctrl1.y)
		}
		node.ctrl2.x=nodedata[6];
		if(node.ctrl2.x !="non")
		{
			node.ctrl2.x=parseFloat(node.ctrl2.x)
		}
		node.ctrl2.y=nodedata[7];
		if(node.ctrl2.y !="non")
		{
			node.ctrl2.y=parseFloat(node.ctrl2.y)
		}
		shape.addNode(node);
	}
	
	return shape;
}

function paramstogroup(p,Group_Store,type)
{
	var members,member;
	p=p.split('|');
	if(type=="canvas")
	{
		var name=p[0];
	}
	else
	{
		var name="SUBGP"+(NCOUNT++);
	}
	var group=new Group(Group_Store,p[0],p[1]);
	group.left=parseInt(p[2]);
	group.top=parseInt(p[3]);
	group.width=parseInt(p[4]);
	group.height=parseInt(p[5]);
	group.centreOfRotation.x=parseInt(p[6]);
	group.centreOfRotation.y=parseInt(p[7]);
	group.phi=parseFloat(p[8]);
	members=p[9].split(":");
	while(members.length>0)
	{
		member=members.shift();
		member=member.split("!");
		group.members.push(member);
	}
	return group;
}

function fromText()
{
	
	if (window.File && window.FileReader && window.FileList && window.Blob && !iop) 
	{
		$("filetextbox").style.visibility="visible";
		var dropZone = $('drop_zone');
		dropZone.innerHTML="";
		dropZone.addEventListener('dragover', handleDragOver, false);
		dropZone.addEventListener('drop', handleFileSelect, false);
	}
	else
	{
		$("fromtextbox").style.visibility="visible";
	}
}


function handleDragOver(evt) 
{
   evt.stopPropagation();
   evt.preventDefault();
}

function handleBodyDrop(evt)
{
	evt.stopPropagation();
    evt.preventDefault();
}

function handleFileSelect(evt) 
{
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.

	var f = files[0];
	if (f) 
	{
		var r = new FileReader();
		r.onloadend = function(e) {extract(e.target.result) }
		r.readAsText(f);
		document.getElementById('drop_zone').innerHTML +="&nbsp;&nbsp;"+f.name+'<br>';
	} 
	else 
	{ 
		alert("Failed to load file"); 
	}
}


 function extract(a)
 {
	 hideTools();

	 var t=a.split('@');
	 switch (t[0])
	 {
		 case 'canvas':
		 	try
			{
				resetcanv(t[1]);
			}
			catch(e)
			{
				alert(e.name + ": " + e.message + ": " + e.fileName + ": " + e.lineNumber);
				alert('File data not recognised');
				return;
			}
		 break		 
		 case 'scene':
		 try
			{
				resetscene(t[1],"basescene");
			}
			catch(e)
			{
				alert(e.name + ": " + e.message + ": " + e.fileName + ": " + e.lineNumber);
				alert('File data not recognised');
				return;
			}
		 break
		 case 'sprite':
		 	try
			{
				resetsprite(t[1],"baseSprite");
			}
			catch(e)
			{
				alert(e.name + ": " + e.message + ": " + e.fileName + ": " + e.lineNumber);
				alert('File data not recognised');
				return;
			}
		 break
		 case 'tween':
		 	try
			{
				resettween(t[1],"basetween");
			}
			catch(e)
			{
				alert(e.name + ": " + e.message + ": " + e.fileName + ": " + e.lineNumber);
				alert('File data not recognised');
				return;
			}
		 break
		 case 'track':
		 	try
			{
				resettrack(t[1],"basetrack");
			}
			catch(e)
			{
				alert(e.name + ": " + e.message + ": " + e.fileName + ": " + e.lineNumber);
				alert('File data not recognised');
				return;
			}
		 break
		 case 'film':
		 	try
			{
				resetfilm(t[1]);
			}
			catch(e)
			{				
				alert(e.name + ": " + e.message + ": " + e.fileName + ": " + e.lineNumber);
				alert('File data not recognised');
				return;
			} 
		 break
		 default:
		 alert('here '+e.name + ": " + e.message + ": " + e.fileName + ": " + e.lineNumber);
		 	alert('File data not recognised');
			return;
	 }
	 $('bodydiv').onclick=function(e){checkBoundary(shiftdown(e),getPosition(e))};
 }
 
function resetscene(scenefiletxt,type)
{
	var scenefile=scenefiletxt.split("^");
	var scenetxt=scenefile[0];
	var sgtxt=scenefile[1];
	var sceneparams=scenetxt.split('|');
	var scene=new Scene("SUBSC"+(NCOUNT++));
	if(type=="basescene") {SCENES[scene.name]=scene};
	scene.title=sceneparams[1];
	if(type=="basescene") {writescenelist()};
	resetshapes(sgtxt,scene.shapes,scene.groups);
	return scene;
}

function resettrack(trackfiletxt,type)
{
	var trackfile=trackfiletxt.split("^");
	var tracktxt=trackfile[0];
	var sgtxt=trackfile[1];
	var trackparams=tracktxt.split('|');
	var track=new Track("SUBTR"+(NCOUNT++));
	if(type=="basetrack") {TRACKS[track.name]=track};
	track.title=trackparams[1];
	track.repeats=parseInt(trackparams[2]);
	if(isNaN(track.repeats))
	{
		track.repeats="c";
	}
	track.visible=trackparams[3]=="1";
	track.yoyo=trackparams[4]=="1";
	if(type=="basetrack") {writetracklist()};
	resetshapes(sgtxt,track.shapes,track.groups);
	return track;
}

function resettween(tweenfiletxt,type)
{
	var group;
	var tweenfile=tweenfiletxt.split("[");
	var tweentxt=tweenfile[0];
	var tweenparamstxt=tweenfile[1];
	var tweenshapetxt=tweenfile[2];
	var tweencopytxt=tweenfile[3];
	var tweentitles=tweentxt.split('|');
	var tween=new Tween("SUBTW"+(NCOUNT++));
	if(type=="basetween") {TWEENS[tween.name]=tween};
	tween.title=tweentitles[1];
	var tweenshape=tweenshapetxt.split("+");
	var shape=paramstoshape(tweenshape[0],tween.shapes);
	paramstogroup(tweenshape[1],tween.groups);
	for(var name in tween.groups)
	{
		group=tween.groups[name];
		for(var i=0; i<group.members.length; i++)
		{
			if(group.members[i][0]=="s")
			{
				group.members[i]=tween.shapes[group.members[i][1].trim()];
			}
			else
			{
				group.members[i]=tween.groups[group.members[i][1].trim()];
			}
		}
	}
	shape.group=tween.groups[shape.group];

	var tweencopy=tweencopytxt.split("+");
	var copy=paramstoshape(tweencopy[0],tween.copy.shapes);
	paramstogroup(tweencopy[1],tween.copy.groups);
	for(var name in tween.copy.groups)
	{
		group=tween.copy.groups[name];
		for(var i=0; i<group.members.length; i++)
		{
			if(group.members[i][0]=="s")
			{
				group.members[i]=tween.copy.shapes[group.members[i][1].trim()];
			}
			else
			{
				group.members[i]=tween.copy.groups[group.members[i][1].trim()];
			}
		}
	}
	copy.group=tween.copy.groups[copy.group];	
	tween.tweenshape=makeCopy(shape,0,$("tweenstage"),{});
	var tweenparams=tweenparamstxt.split("*");
	tween.translate.active=1==tweenparams[0];
	tween.translate.twtime=1*tweenparams[1];
	if(isNaN(tweenparams[2]))
	{
		tween.translate.repeat="C";
	}
	else
	{
		tween.translate.repeat=1*tweenparams[2];
	}
	tween.translate.yoyo=1==tweenparams[3];
	tween.rotate.active=1==tweenparams[4];
	tween.rotate.twtime=1*tweenparams[5];
	if(isNaN(tweenparams[6]))
	{
		tween.rotate.repeat="C";
	}
	else
	{
		tween.rotate.repeat=1*tweenparams[6];
	}
	tween.rotate.yoyo=1==tweenparams[7];
	tween.linestyles.active=1==tweenparams[8];
	tween.linestyles.twtime=1*tweenparams[9];
	if(isNaN(tweenparams[10]))
	{
		tween.linestyles.repeat="C";
	}
	else
	{
		tween.linestyles.repeat=1*tweenparams[10];
	}
	tween.linestyles.yoyo=1==tweenparams[11];
	tween.linecolour.active=1==tweenparams[12];
	tween.linecolour.twtime=1*tweenparams[13];
	if(isNaN(tweenparams[14]))
	{
		tween.linecolour.repeat="C";
	}
	else
	{
		tween.linecolour.repeat=1*tweenparams[14];
	}
	tween.linecolour.yoyo=1==tweenparams[15];
	tween.fillcolour.active=1==tweenparams[16];
	tween.fillcolour.twtime=1*tweenparams[17];
	if(isNaN(tweenparams[18]))
	{
		tween.fillcolour.repeat="C";
	}
	else
	{
		tween.fillcolour.repeat=1*tweenparams[18];
	}
	tween.fillcolour.yoyo=1==tweenparams[19];
	tween.gradfill.active=1==tweenparams[20];
	tween.gradfill.twtime=1*tweenparams[21];
	if(isNaN(tweenparams[22]))
	{
		tween.gradfill.repeat="C";
	}
	else
	{
		tween.gradfill.repeat=1*tweenparams[22];
	}
	tween.shadow.active=1==tweenparams[23];
	tween.shadow.twtime=1*tweenparams[24];
	if(isNaN(tweenparams[25]))
	{
		tween.shadow.repeat="C";
	}
	else
	{
		tween.shadow.repeat=1*tweenparams[25];
	}
	tween.shadow.yoyo=1==tweenparams[26];
	tween.edit.active=1==tweenparams[27];
	tween.edit.twtime=1*tweenparams[28];
	if(isNaN(tweenparams[29]))
	{
		tween.edit.repeat="C";
	}
	else
	{
		tween.edit.repeat=1*tweenparams[29];
	}
	tween.edit.yoyo=1==tweenparams[30];
	tween.nodeTweening.active=1==tweenparams[31];
	tween.nodeTweening.twtime=1*tweenparams[32];
	if(isNaN(tweenparams[33]))
	{
		tween.nodeTweening.repeat="C";
	}
	else
	{
		tween.nodeTweening.repeat=1*tweenparams[33];
	}
	tween.nodeTweening.yoyo=1==tweenparams[34];
	tween.pointTweening=1==tweenparams[35];
	tween.reverse=1==tweenparams[36];
	if(tween.nodeTweening.active || tween.pointTweening)
	{
		var tweennodestxt=tweenfile[4];
		var tweennodesections=tweennodestxt.split("]");
		var tweennodesectiontxt;
		var tweennodepathtxt;
		var	tweenctrl1pathtxt;
		var	tweenctrl2pathtxt;
		var shape=tween.getShape();
		var node=shape.path.next;
		while(node.point.x!="end")
		{
			tweennodesectiontxt=tweennodesections.shift();
			tweennodesection=tweennodesectiontxt.split("¬");
			tweennodepathtxt=tweennodesection[0];
			node.nodepath=paramstoshape(tweennodepathtxt,tween.nodePaths);
			tweennodeparamstxt=tweennodesection[1];
			tweennodeparams=tweennodeparamstxt.split("*");
			node.nodepath.nodeTweening={};
			node.nodepath.nodeTweening.active=1==tweennodeparams[0];
			node.nodepath.nodeTweening.twtime=1*tweennodeparams[1];
			if(isNaN(tweennodeparams[2]))
			{
				node.nodepath.nodeTweening.repeat="C";
			}
			else
			{
				node.nodepath.nodeTweening.repeat=1*tweennodeparams[2];
			}
			node.nodepath.nodeTweening.yoyo=1==tweennodeparams[3];
			if(node.vertex=="B")
			{
				tweenctrl1pathtxt=tweennodesection[2];
				node.ctrl1path=paramstoshape(tweenctrl1pathtxt,{});
				tweenctrl2pathtxt=tweennodesection[3];
				node.ctrl2path=paramstoshape(tweenctrl2pathtxt,{});
			}
			node=node.next;
		}
	}
	if(type=="basetween")
	{
		writetweenlist();
	}
	tween.setTweenTimeBox();
	return tween;
}

function resetsprite(spritetxt,type)
{
	var spriteobjs={}
	var spritelist=spritetxt.split("#");
	var curspritetxt=spritelist[0];
	var cursprite=curspritetxt.split('~');
	var tracktxt=cursprite[0];
	var traintxt=cursprite[1];
	var spritetxt=cursprite[2];
	var sprite=resetspriteparams(spritetxt);
	spriteobjs[sprite.name]=sprite;
	switch(sprite.engine)
	{
		case "scene":
			sprite.train=resetscene(traintxt);
		break
		case "tween":
			sprite.train=resettween(traintxt);
		break
	}
	sprite.track=resettrack(tracktxt);
	var curname=sprite.name;
	for(var i=1; i<spritelist.length;i++)
	{
		curspritetxt=spritelist[i];
		cursprite=curspritetxt.split('~');
		tracktxt=cursprite[0];
		spritetxt=cursprite[1];
		sprite=resetspriteparams(spritetxt);
		sprite.track=resettrack(tracktxt);
		sprite.train=spriteobjs[curname];
		curname=sprite.name;
	}
	if(type=="baseSprite")
	{
		SPRITES[sprite.name]=sprite;
		writespritelist();
	}
	sprite.setPoints();
	sprite.inTheatre($("spritestage"));
	return sprite;
}

function resetspriteparams(spritetxt)
{
	var spriteparams=spritetxt.split("|");
	var sprite=new Sprite("SUBSP"+(NCOUNT++));
	sprite.title=spriteparams[1];
	sprite.engine=spriteparams[2];
	sprite.ptime=parseInt(spriteparams[3]);
	sprite.usevec=spriteparams[4]=="1";
	sprite.vector.xs=parseInt(spriteparams[5]);
	sprite.vector.xe=parseInt(spriteparams[6]);
	sprite.vector.ys=parseInt(spriteparams[7]);
	sprite.vector.ye=parseInt(spriteparams[8]);
	sprite.vector.psi=parseInt(spriteparams[9]);
	return sprite;
}

function resetfilm(filmtxt)
{
	var eltxt,elparamstxt,runtxt,fleltxt;
	var width;
	var flel;
	var filmparamstxt=filmtxt.split(">");
	var filmparams=filmparamstxt[0].split("|");
	var film=new Film("SUBFL"+(FLCOUNT++));
	FILMS[film.name]=film;
	film.title=filmparams[1];
	$('filmtitle').value=film.title;
	writefilmlist();
	var flelparamstxt=filmparamstxt[1].split("£");
	$("timeline").style.top=((flelparamstxt.length+2)*25)+"px";
	while(flelparamstxt.length>0)
	{
		eltxt=flelparamstxt.shift();
		elparamstxt=eltxt.split("%");
		runtxt=elparamstxt[0];
		fleltxt=elparamstxt[1];
		runparams=runtxt.split("|");
		flel=new FilmElement(0);
		flel.name=runparams[0];
		flel.title=runparams[1];
		width=10*flel.title.length;
		flel.id=runparams[2];
		flel.source=runparams[3];
		flel.layer=runparams[4];
		flel.A=parseInt(runparams[5]);
		flel.D=parseFloat(runparams[6])
		if(isNaN(flel.D))
		{
			flel.D="Never";
		}
		flel.xOffset=parseInt(runparams[7]);
		flel.yOffset=parseInt(runparams[8]);
		
		flel.eldiv=document.createElement("div");
		flel.eldiv.id="div"+flel.id+"stage";
		flel.eldiv.style.top="0px";
		flel.eldiv.style.left="0px";
		flel.eldiv.style.width=SCRW;
		flel.eldiv.style.height=SCRH;
		flel.eldiv.style.zIndex=flel.layer;
		$("filmstage").appendChild(flel.eldiv);
		
		switch(flel.source)
		{
			case "scene":
				flel.elm=resetscene(fleltxt);
				flel.elm.addToStage($("div"+flel.id+"stage"));
			break
			case "tween":
				flel.elm=resettween(fleltxt,"film");
				flel.elm.addAllToStage($("div"+flel.id+"stage"));
				flel.R=parseInt(runparams[9]);
				flel.S=parseFloat(runparams[10]);
				if(isNaN(flel.S))
				{
					flel.S="Never";
				}
				flel.maxruntime=parseInt(runparams[11]);
				flel.elm.tweenshape=makeCopy(flel.elm.getShape(),0,$("tweenstage"),{});
/*				if(flel.elm.nodeTweening.active || flel.elm.pointTweening)
				{
					var npths=0;
					for(var name in flel.elm.nodePaths)
					{
						npths++
					}
					if(npths==0)
					{
						flel.elm.startNodePaths();
					}
					else
					{
						flel.elm.setNodePaths();
					}
				}
				flel.elm.prepareTweens();
				if(flel.elm.reverse)
				{
					flel.elm.reverseAll();
				} */
				if(isNaN(flel.elm.maxruntime))
				{
					flel.maxruntime="c";
				}
				else
				{
					flel.maxruntime=flel.elm.maxruntime/1000;
				}
				flel.run=document.createElement("div");
				flel.run.style.borderTop="2px solid blue";
				flel.run.style.borderLeft="2px solid blue";
				flel.run.style.borderRight="2px solid blue";
				
				flel.maxrun=document.createElement("div");
				flel.maxrun.style.borderTop="2px dotted red";
				flel.maxrun.style.borderRight="2px dotted red";
			break
			case "sprite":
				flel.elm=resetsprite(fleltxt,"film");
				flel.elm.inTheatre($("div"+flel.id+"stage"));
				flel.R=parseInt(runparams[9]);
				flel.S=parseFloat(runparams[10]);
				if(isNaN(flel.S))
				{
					flel.S="Never";
				}
				flel.maxruntime=parseInt(runparams[11]);
				flel.run=document.createElement("div");
				flel.run.style.borderTop="2px solid blue";
				flel.run.style.borderLeft="2px solid blue";
				flel.run.style.borderRight="2px solid blue";
				
				flel.maxrun=document.createElement("div");
				flel.maxrun.style.borderTop="2px dotted red";
				flel.maxrun.style.borderRight="2px dotted red";
			break
		}
		$("timeline").style.top=((flel.layer+2)*25)+"px";
		FLELHEIGHT=(flel.layer+2)*25+75;
		flel.seen=document.createElement("div");
		flel.seen.style.borderTop="2px solid black";
		flel.seen.style.borderLeft="2px solid black";
		flel.seen.style.borderRight="2px solid black";
		
		flel.text=document.createElement("div");
		flel.text.innerHTML=flel.title;
		flel.text.id=flel.id;
		flel.text.nid=flel.id; //name id as text and label 
		flel.text.style.textAlign="center";
		flel.text.style.fontSize="12pt";
		flel.text.style.height="20px";
		flel.text.style.top=(flel.layer*25+5)+"px";
		flel.text.style.backgroundColor="white";
		flel.text.style.width=width+"px";
		flel.text.style.border="1px solid black";
		flel.text.style.cursor="pointer";
		flel.text.onclick =function() {setflel(this)};
	
		flel.label=document.createElement("div");
		flel.label.innerHTML=flel.title;
		flel.label.nid=flel.id;
		flel.label.style.labelAlign="center";
		flel.label.style.fontSize="12pt";
		flel.label.style.height="20px";
		flel.label.style.left="5px";
		flel.label.style.top=(flel.layer*25+5)+"px";
		flel.label.style.backgroundColor="white";
		flel.label.style.width="90px";
		flel.label.style.border="1px solid black";
		flel.label.style.cursor="pointer";
		flel.label.onclick =function() {setflel(this)};
	
		film.elements[flel.id]=flel;
		//flel.addToBoard();		
	}
	film.list=[];
	for(var name in film.elements)
	{
		flel=film.elements[name];
		flay=[name,flel.layer];
		film.list.push(flay);
	}
	film.list.sort(zindp);
	ELCOUNT=film.list.length;
	
}
