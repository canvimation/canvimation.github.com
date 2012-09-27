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
	ZPOS=1;
	ZNEG=-1;
	return c;
}

function resetcanv(shapetxt,grouptxt)
{
	var shape,group;
	var shapeparams=shapetxt.split('*');
	resetshapestage(shapeparams.shift());
	var zmax=0;
	var zmin=10000000	
	while (shapeparams.length>0)
	{
		shape=paramstoshape(shapeparams.shift());
		if(shape.zIndex>zmax) {zmax=shape.zIndex};
		if(shape.zIndex<zmin) {zmin=shape.zIndex};
		shape.addTo($("shapestage"));
	}
	ZPOS=zmax+1;
	ZNEG=zmin-1;
	var groupparams=grouptxt.split('*');
	while(groupparams.length>0)
	{
		group=paramstogroup(groupparams.shift());
	}
	for(var name in GROUPS)
	{
		group=GROUPS[name];
		for(var i=0; i<group.members.length; i++)
		{
			if(group.members[i][0]=="s")
			{
				group.members[i]=SHAPES[group.members[i][1]];
			}
			else
			{
				group.members[i]=GROUPS[group.members[i][1]];
			}
		}
	}
	for(var name in SHAPES)
	{
		shape=SHAPES[name];
		shape.group=GROUPS[shape.group]; //change shape.group from group.name to actual group
		shape.draw();
	}
}

function paramstoshape(p)
{
	var nodedata,point,ctrl1,ctrl2;
	var node;
	p=p.split('|');
	var shape=new Shape(p[0],p[1],p[2]=="1",p[3]=="1",p[4],SHAPES);
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
	shape.crnrradius = parseInt(p[26])
	shape.group = p[28];
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

function paramstogroup(p)
{
	var members,member;
	p=p.split('|');
	var group=new Group(p[0]);
	group.left=parseInt(p[1]);
	group.top=parseInt(p[2]);
	group.width=parseInt(p[3]);
	group.height=parseInt(p[4]);
	group.centreOfRotation.x=parseInt(p[5]);
	group.centreOfRotation.y=parseInt(p[6]);
	group.phi=parseFloat(p[7]);
	members=p[8].split(":");
	while(members.length>0)
	{
		member=members.shift();
		member=member.split("!");
		group.members.push(member);
	}
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
		document.getElementById('drop_zone').innerHTML +=f.name+'<br>';
	} 
	else 
	{ 
		alert("Failed to load file"); 
	}
}


 function extract(a)
 {
	 hideTools();

	 var t=a.split('^');
	 switch (t[0])
	 {
		 case 'canvas':
		 	try
			{
				resetcanv(t[1],t[2]);
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
				resetscene(t[1]);
				movenotscene();
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
				movenotsprite()
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
				resettrack(t[1]);
				movenottrack();
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
				movenotfilm()
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
 
function resetscene(t)
{
	var s=t.split('*');
	var scp = s.shift();
	var sc=scp.split('|');
	var sname=sc[0];
	return redoscene(sname, s)
}

function redoscene(sname,s)
{
	if (checkname(sname,'scene')) 
	{
		var ans=confirm('There is already scenery with the title '+sname+'.\nDo you want to overwrite?');
		if (!ans) 
		{
			return null;
		}
		else
		{
			scene=scenes[sname];
			scene.cars=[];
		}
	}
	else
	{
	 	scene=new cscene(sname);
		scenes[scene.name]=scene;
		
		$('scenehold').innerHTML +='<div id="scene|'+scene.name+'"><img src="assets/edit.png" style="cursor:pointer" alt="edit" title="edit" onclick="aniedit(this)">&nbsp;&nbsp;&nbsp;<span onclick="usename(this.innerHTML,'+squote+'scene'+squote+')" style="cursor:pointer">'+scene.name+'</span></div><br>';
	}

	if (scene.name.substr(0,8)=='Scenery ')
	{
		var n = parseInt(scene.name.substr(8))
		if(!(isNaN(n)))
		{
			scenecount=Math.max(n,scenecount);
		}
	}
	zmax=1000000000; //not needed but used in paramstocanvas
	zmin=-1;//not needed but used in paramstocanvas
	for (var i=0; i<s.length; i++)
	{
		ns=paramstocanvas(blocknum++,s[i]);
		ns.parentNode.removeChild(ns);
		scene.cars.push(ns);
		numblocks +=1;
	}
	return scene;
}

function resettrack(t)
{
	var tr=t.split('*');
	var trp=tr[0].split('|');
	var trname=trp[0];
	if (checkname(trname,'track')) 
	{
		var ans=confirm('There is already a track with the title '+trname+'.\nDo you want to overwrite?');
		if (!ans) 
		{
			return null;
		}
		else
		{
			track=tracks[trname];
		}
	}
	else
	{
		track=new ctrack(trname);
		tracks[track.name]=track;
		$('trackhold').innerHTML +='<div id="track|'+track.name+'"><img src="assets/edit.png" style="cursor:pointer" alt="edit" title="edit" onclick="aniedit(this)">&nbsp;&nbsp;&nbsp;<span onclick="usename(this.innerHTML,'+squote+'track'+squote+')" style="cursor:pointer">'+track.name+'</span></div><br>';
	}
	track.repeats=parseInt(trp[1]);
	if (isNaN(track.repeats))
	{
		track.repeats='c';	   
	}
	if (trp[2]=='1')
	{
		track.visible=true;
	}
	else
	{
		track.visible=false;
	}
	if (trp[3]=='1')
	{
		track.yoyo=true;
	}
	else
	{
		track.yoyo=false;
	}
	if (track.name.substr(0,6)=='Track ')
	{
		var n = parseInt(track.name.substr(6))
		if(!(isNaN(n)))
		{
			trackcount=Math.max(n,trackcount);
		}
	}
	zmax=1000000000; //not needed but used in paramstocanvas
	zmin=-1;//not needed but used in paramstocanvas
	track.line=paramstocanvas(blocknum++,tr[1]);
	track.line.parentNode.removeChild(track.line);
	numblocks +=1;
	return track;
	
}

function resetsprite(t)
{
	var sprops;
	var spary=t.split('~');
	while (spary.length>0)
	{
		sprops=spary.shift().split('|');
	
		spname=sprops[0];
		if (checkname(spname,'sprite')) 
		{
			var ans=confirm('There is already a sprite with the title '+spname+'.\nDo you want to overwrite?');
			if (!ans) 
			{ 
				return
			}
			else
			{
				sprite=sprites[spname];
			}
		}
		else
		{
			sprite=new csprite();
			sprite.name=spname;
			sprites[sprite.name]=sprite;
			$('spritehold').innerHTML +='<div id="sprite|'+sprite.name+'"><img src="assets/edit.png" style="cursor:pointer" alt="edit" title="edit" onclick="aniedit(this)">&nbsp;&nbsp;&nbsp;<span onclick="usename(this.innerHTML,'+squote+'sprite'+squote+')" style="cursor:pointer">'+sprite.name+'</span></div><br>';
		}

		var track = resettrack(spary.shift());
		if (track != null) 
		{
			sprite.track=track;
		}
		sprite.engine=sprops[1];
		sprite.ptime=sprops[2];
		sprite.pointer=sprops[3];
		if (sprops[4]=='1')
		{
			sprite.vec = true;
		}
		else
		{
			sprite.vec = false;
		}
		sprite.vector={xs:0,ys:0,xe:0,ye:0,psi:0};
		sprite.vector.xs=sprops[5];
		sprite.vector.xe=sprops[6];
		sprite.vector.ys=sprops[7];
		sprite.vector.ye=sprops[8];
		sprite.vector.psi=sprops[9];

		if (sprite.engine=='scene')
		{
		
			var scene = resetscene(spary.shift());
			if (scene != null) 
			{
				sprite.train=scene;
				sprite.cars=scene.cars
				prevsprite=sprite.name;
				if (sprite.name.substr(0,7)=='Sprite ')
				{
					var n = parseInt(sprite.name.substr(7))
					if(!(isNaN(n)))
					{
						spritecount=Math.max(n,spritecount);
					}
				}
			}
		}
		else
		{
			sprite.train=sprites[prevsprite];
			sprite.cars=sprite.train.cars;
			prevsprite=sprite.name;
			if (sprite.name.substr(0,7)=='Sprite ')
			{
				var n = parseInt(sprite.name.substr(7))
				if(!(isNaN(n)))
				{
					spritecount=Math.max(n,spritecount);
				}
			}
		}
	}
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
