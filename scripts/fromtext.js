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
				resetsprite(t[1]);
			}
			catch(e)
			{
				alert(e.name + ": " + e.message + ": " + e.fileName + ": " + e.lineNumber);
				alert('File data not recognised');
				return;
			}
		 break
		 case 'tween':
		 
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
	track.visible=trackparams[3]=="1";
	track.yoyo=trackparams[4]=="1";
	if(type=="basetrack") {writetracklist()};
	resetshapes(sgtxt,track.shapes,track.groups);
	return track;
}

function resetsprite(spritetxt)
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
	for(var name in SPRITES )
	{
		alert(["before",name])
	}
	
	SPRITES[sprite.name]=sprite;
	for(var name in SPRITES )
	{
		alert(["after",name])
	}
	
	writespritelist();
	sprite.setPoints();
	sprite.inTheatre($("spritestage"));
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

function resetfilm(f)
{
	var fparts;
	var fprops;
	var tmp;
	var flms=f.split('@');
	var flmname=flms[0];
	if (checkname(flmname,'film')) 
	{
		var ans=confirm('There is already a film with the title '+flmname+'.\nDo you want to overwrite?');
		if (!ans) 
		{
			return null;
		}
		else
		{
			film=films[flmname];
		}
	}
	else
	{
		film=new cfilm(flmname);
		films[film.name]=film;
		film.list=[];
		$('filmhold').innerHTML +='<div id="film|'+film.name+'"><img src="assets/edit.png" style="cursor:pointer" alt="edit" title="edit" onclick="aniedit(this)">&nbsp;&nbsp;&nbsp;<span onclick="usename(this.innerHTML,'+squote+'film'+squote+')" style="cursor:pointer">'+film.name+'</span></div><br>';
	}
	for (var i=1;i<flms.length; i++)
	{
		fparts=flms[i].split('!');
		fprops=fparts[0].split(':');
		fprops[2]=parseInt(fprops[2]);
		fprops[4]=parseInt(fprops[4]);
		fprops[6]=parseInt(fprops[6]);
		fprops[7]=parseInt(fprops[7]);
		fprops[8]=parseInt(fprops[8]);
		tmp=parseInt(fprops[3])
		if (!isNaN(tmp))
		{
			fprops[3]=tmp;
		}
		tmp=parseInt(fprops[5])
		if (!isNaN(tmp))
		{
			fprops[5]=tmp;
		}
		if (fprops[9]=='1')
		{
			fprops[9]=true;
		}
		else
		{
			fprops[9]=false;
		}
		film.list.push(fprops);
		switch (fprops[0])
		{
			case 'SC':
				var scs=fparts[1].split('*');
				redoscene(fprops[1],scs);
			break
			case 'SP':
				resetsprite(fparts[1]);
			break
		}
	}
}
