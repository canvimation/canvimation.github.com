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
	var shape=new Shape(p[0],p[1]=="1",p[2]=="1",p[3]);
	shape.tplftcrnr.x = parseInt(p[4]);
	shape.tplftcrnr.y = parseInt(p[5]);
	shape.btmrgtcrnr.x = parseInt(p[6]);
	shape.btmrgtcrnr.y = parseInt(p[7]);
	shape.strokeStyle = p[8].split(',');
	for (var i=0;i<shape.strokeStyle.length;i++)
	{
		shape.strokeStyle[i]=parseInt(shape.strokeStyle[i]);	
	}	
	shape.fillStyle = p[9].split(',');
	for (var i=0;i<shape.fillStyle.length;i++)
	{
		shape.fillStyle[i]=parseInt(shape.fillStyle[i])	
	}	
	shape.lineWidth = parseInt(p[10]);
	shape.lineCap = p[11];
	shape.lineJoin = p[12];
	shape.justfill = p[13]=='1';
	shape.linearfill = p[14]=='1';
	shape.lineGrad = p[15].split(',');
	for (var i=0;i<shape.lineGrad.length;i++)
	{
		shape.lineGrad[i]=parseInt(shape.lineGrad[i])	
	}	
	shape.radGrad = p[16].split(',');
	for (var i=0;i<shape.radGrad.length;i++)
	{
		shape.radGrad[i]=parseInt(shape.radGrad[i])	
	}	
	var carray=p[17].split(':');
	shape.colorStops = [];
	for (var i=0; i<carray.length; i++)
	{
		shape.colorStops[i]=carray[i].split(',');
		for (var j=0;j<shape.colorStops[i].length;j++)
		{
			shape.colorStops[i][j]=parseFloat(shape.colorStops[i][j])	
		}		
	}
	shape.stopn = parseInt(p[18]);
	shape.shadow = p[19]=='1';
	shape.shadowOffsetX = parseInt(p[20]);
	shape.shadowOffsetY = parseInt(p[21]);
	shape.shadowBlur = parseFloat(p[22]);
	shape.shadowColor = p[23].split(',');
	for (var i=0;i<shape.shadowColor.length;i++)
	{
		shape.shadowColor[i]=parseInt(shape.shadowColor[i])	
	}	
	shape.zIndex = parseFloat(p[24]);
	shape.crnrradius = parseInt(p[25])
	shape.group = p[27];
	var path=p[26].split("!");
	
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
/*
function resetcanv(txt)
{
	var shape,group,subgroup;
	var ptr;
	var right,bottom;
	var ptrlist=[];
	var namelist=[];
	var params=txt.split('*');
	var canvases=resetshapestage(params[0]);
	var zmax=0;
	var zmin=10000000	
	for (var c=0; c<canvases; c++)
	{
		shape=oldparamstoshape(params[c+1]);
		if(shape.zIndex>zmax) {zmax=shape.zIndex};
		if(shape.zIndex<zmin) {zmin=shape.zIndex};
		shape.addTo($("shapestage"));
		delete GROUPS[shape.group.name];
	}
	GCOUNT=0;
	ZPOS=zmax+1;
	ZNEG=zmin-1;
	for (var name in SHAPES)
	{
		var shape=SHAPES[name];
		shape.setCorners();
		if(shape.grouplist!="shape")
		{
			grouplist=shape.grouplist;
			ptr=grouplist[0];
			if (ptrlist.indexOf(ptr)==-1)
			{
				ptrlist.push(ptr);
				group=new Group("Group"+ptr);
				GROUPS["Group"+ptr]=group;
				group.members.push(shape);
				group.left=shape.group.left;
				group.top=shape.group.top;
				group.width=shape.group.width;
				group.height=shape.group.height;
			}
			else
			{
				group=GROUPS["Group"+ptr];
				group.members.push(shape);
			}
			group.members.push(shape);
			group.left=shape.group.left;
			group.top=shape.group.top;
			group.width=shape.group.width;
			group.height=shape.group.height;
			group.centreOfRotation.x=group.left+group.width/2;
			group.centreOfRotation.y=group.top+group.height/2;
			group.phi=0;
			for(i=1;i<grouplist.length;i++)
			{
				ptr=grouplist[i];
				if (ptrlist.indexOf(ptr)==-1)
				{
					ptrlist.push(ptr);
					group=new Group("Group"+ptr);
					GROUPS["Group"+ptr]=group;
					subgroup=GROUPS["Group"+grouplist[i-1]];
					group.members.push(subgroup);
					
				}
				else
				{
					group=GROUPS["Group"+ptr];
					subgroup=GROUPS["Group"+grouplist[i-1]];
					if(!(group.contains(subgroup)))
					{
						group.members.push(subgroup);
					}
				}
			
				group.left=Math.min(shape.group.left,subgroup.left)
				group.top=Math.min(shape.group.top,subgroup.top);
				right=Math.max(shape.group.left+shape.group.width,subgroup.left+subgroup.width);
				bottom=Math.max(shape.group.top+shape.group.height,subgroup.top+subgroup.height);
				group.width=right-group.left;
				group.height=bottom-group.top;
				group.centreOfRotation.x=group.left+group.width/2;
				group.centreOfRotation.y=group.top+group.height/2;
				group.phi=0;
			}	
			shape.group=group;
		}
	}
	for(var name in SHAPES)
	{
		shape=SHAPES[name];
		alert(shape.group.showmembers());
		shape.setCorners();
		delete shape["bleft"];
		delete shape["btop"];
		delete shape["bwidth"];
		delete shape["bheight"];
		delete shape["cx"];
		delete shape["cy"];
		delete shape["phi"];
		delete shape["grouplist"];
		shape.draw();
	}
}
*/
function oldparamstoshape(p)
{
	var nodedata,point,ctrl1,ctrl2;
	var node;
	p=p.split('|');
	var pathdef = p[44].split(',');
	var re=/square/;
	var type=pathdef[2].replace(re,"rectangle");
	re=/circle/;
	type=type.replace(re,"ellipse");
	var shape=new Shape(p[47],pathdef[0]=="open",pathdef[1]=="edit",type);
	shape.bleft = parseInt(p[0]);
	shape.btop = parseInt(p[1]);
	shape.bwidth = parseInt(p[2]);
	shape.bheight = parseInt(p[3]);
	shape.cx = parseInt(p[13]);
	shape.cy = parseInt(p[14]);
	shape.phi = parseFloat(p[16]);
	shape.strokeStyle = p[19].split(',');
	for (var i=0;i<shape.strokeStyle.length;i++)
	{
		shape.strokeStyle[i]=parseInt(shape.strokeStyle[i])	
	}	
	shape.fillStyle = p[20].split(',');
	for (var i=0;i<shape.fillStyle.length;i++)
	{
		shape.fillStyle[i]=parseInt(shape.fillStyle[i])	
	}	
	shape.lineWidth = parseInt(p[21]);
	shape.lineCap = p[22];
	shape.lineJoin = p[23];
	shape.justfill = p[24]=='1';
	shape.linearfill = p[25]=='1';
	shape.lineGrad = p[26].split(',');
	for (var i=0;i<shape.lineGrad.length;i++)
	{
		shape.lineGrad[i]=parseInt(shape.lineGrad[i])	
	}	
	shape.radGrad = p[27].split(',');
	for (var i=0;i<shape.radGrad.length;i++)
	{
		shape.radGrad[i]=parseInt(shape.radGrad[i])	
	}	
	var carray=p[28].split(':');
	shape.colorStops = [];
	for (var i=0; i<carray.length; i++)
	{
		shape.colorStops[i]=carray[i].split(',');
		for (var j=0;j<shape.colorStops[i].length;j++)
		{
			shape.colorStops[i][j]=parseFloat(shape.colorStops[i][j])	
		}		
	}
	shape.stopn = parseInt(p[29]);
	shape.shadow = p[30]=='1';
	shape.shadowOffsetX = parseInt(p[31]);
	shape.shadowOffsetY = parseInt(p[32]);
	shape.shadowBlur = parseFloat(p[33]);
	shape.shadowColor = p[34].split(',');
	for (var i=0;i<shape.shadowColor.length;i++)
	{
		shape.shadowColor[i]=parseInt(shape.shadowColor[i])	
	}	
	shape.zIndex = parseInt(p[37]);
	
	shape.grouplist="shape"; //if left then only member of group is the shape itself created when shape created
	if (p[41] != '') //not in a group
	{
		shape.grouplist=p[41].split(',');
		for (var i=0;i<shape.grouplist.length;i++)
		{
			shape.grouplist[i]=parseInt(shape.grouplist[i])	
		}		
	}
	shape.boundary = p[42];
	shape.beztypes = [];
	if (p[43] != '')
	{
		var beztypes=p[43].split(',');
	}
	carray=p[45].split(':');
	for (var i=0; i<carray.length; i++)
	{
		nodedata=carray[i].split(',');
		point=new Point(nodedata[1],nodedata[2]);
		node=new Node(point);
		if (p[43] != '')
		{
			node.corner=beztypes[i];
		}
		else
		{
			node.corner="corner";
		}
		if(nodedata[0]=="M" || nodedata[0]=="L")
		{
			point=new Point(nodedata[1],nodedata[2]);
			node=new Node(point);
		}
		else
		{
			point=new Point(nodedata[5],nodedata[6]);
			ctrl1=new Point(nodedata[1],nodedata[2]);
			ctrl2=new Point(nodedata[3],nodedata[4]);
			node=new Node(point,ctrl1,ctrl2);
		} 
		shape.addNode(node);
	}
	shape.crnradius = parseFloat(p[46]);
	return shape;
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
/*		 case 'canvas':
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
*/		 case 'scene':
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
