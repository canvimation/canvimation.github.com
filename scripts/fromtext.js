/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function resetdrawing(txt)
{
	var params=txt.split('|');
	if(params.length>2)
	{
		var stagewidth=parseInt(params[3]);
		var stageheight=parseInt(params[4]);
	}
	else
	{
		var stagewidth=parseInt(params[0]);
		var stageheight=parseInt(params[1]);
	}
	setStage(stagewidth,stageheight);
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
}

function resetnewcanv(txt)
{
	var params=txt.split('*');
	resetdrawing(params[0]);alert(params[1])	
	for (var c=0; c<canvases; c++)
	{
		drawline(paramstocanvas(c,params[c+1]));
	}
	zpos=zmax+1;
	zneg=zmin-1;
	var cdiv=$('canvasdiv');
	var ptrlist=[];
	for (var i=0; i<cdiv.childNodes.length; i++)
	{
		cgroup=cdiv.childNodes[i].group;
		for (var j=0; j<cgroup.length; j++)
		{
			ptr=cgroup[j];
			if (ptrlist.indexOf(ptr)==-1)
			{
				ptrlist.push(ptr);
				gp[ptr]=[];
				
			}
			gp[ptr].push(cdiv.childNodes[i])	
		}
	}
	$('bodydiv').onclick=function(e){checkBoundary(shiftdown(e),getPosition(e))};
}


function resetcanv(txt)
{
	var params=txt.split('*');
	resetdrawing(params[0]);
	zmax=0;
	zmin=10000000	
	for (var c=0; c<canvases; c++)
	{
		drawline(paramstocanvas(c,params[c+1]));
	}
	zpos=zmax+1;
	zneg=zmin-1;
	var cdiv=$('canvasdiv');
	var ptrlist=[];
	for (var i=0; i<cdiv.childNodes.length; i++)
	{
		cgroup=cdiv.childNodes[i].group;
		for (var j=0; j<cgroup.length; j++)
		{
			ptr=cgroup[j];
			if (ptrlist.indexOf(ptr)==-1)
			{
				ptrlist.push(ptr);
				gp[ptr]=[];
				
			}
			gp[ptr].push(cdiv.childNodes[i])	
		}
	}
	$('bodydiv').onclick=function(e){checkBoundary(shiftdown(e),getPosition(e))};
}

function cancelfromtext()
{
	if ($('boxfrom')) {$('boxfrom').parentNode.removeChild($('boxfrom'))};
}

function paramstocanvas(n,canv)
{
	canv=canv.split('|');
	var pathdef = canv[44].split(',');
	var ncanv=new Canvasdiv(n,pathdef);
	ncanv.bleft = parseInt(canv[0]);
	ncanv.btop = parseInt(canv[1]);
	ncanv.bwidth = parseInt(canv[2]);
	ncanv.bheight = parseInt(canv[3]);
	ncanv.scleft = parseInt(canv[4]);
	ncanv.sctop = parseInt(canv[5]);
	ncanv.scx = parseInt(canv[6]);
	ncanv.scy = parseInt(canv[7]);
	ncanv.sox = parseInt(canv[8]);
	ncanv.soy = parseInt(canv[9]);
	ncanv.ox = parseInt(canv[10]);
	ncanv.oy = parseInt(canv[11]);
	ncanv.sox = parseInt(canv[12]);
	ncanv.cx = parseInt(canv[13]);
	ncanv.cy = parseInt(canv[14]);
	ncanv.rr = parseInt(canv[15]);
	ncanv.phi = parseFloat(canv[16]);
	ncanv.rotated = canv[17]=='1';
	ncanv.ratio = parseFloat(canv[18]);
	ncanv.strokeStyle = canv[19].split(',');
	for (var i=0;i<ncanv.strokeStyle.length;i++)
	{
		ncanv.strokeStyle[i]=parseInt(ncanv.strokeStyle[i])	
	}	
	ncanv.fillStyle = canv[20].split(',');
	for (var i=0;i<ncanv.fillStyle.length;i++)
	{
		ncanv.fillStyle[i]=parseInt(ncanv.fillStyle[i])	
	}	
	ncanv.lineWidth = parseInt(canv[21]);
	ncanv.lineCap = canv[22];
	ncanv.lineJoin = canv[23];
	ncanv.justfill = canv[24]=='1';
	ncanv.linearfill = canv[25]=='1';
	ncanv.lineGrad = canv[26].split(',');
	for (var i=0;i<ncanv.lineGrad.length;i++)
	{
		ncanv.lineGrad[i]=parseInt(ncanv.lineGrad[i])	
	}	
	ncanv.radGrad = canv[27].split(',');
	for (var i=0;i<ncanv.radGrad.length;i++)
	{
		ncanv.radGrad[i]=parseInt(ncanv.radGrad[i])	
	}	
	carray=canv[28].split(':');
	ncanv.colorStops = [];
	for (var i=0; i<carray.length; i++)
	{
		ncanv.colorStops[i]=carray[i].split(',');
		for (var j=0;j<ncanv.colorStops[i].length;j++)
		{
			ncanv.colorStops[i][j]=parseFloat(ncanv.colorStops[i][j])	
		}		
	}
	ncanv.stopn = parseInt(canv[29]);
	ncanv.shadow = canv[30]=='1';
	ncanv.shadowOffsetX = parseInt(canv[31]);
	ncanv.shadowOffsetY = parseInt(canv[32]);
	ncanv.shadowBlur = parseFloat(canv[33]);
	ncanv.shadowColor = canv[34].split(',');
	for (var i=0;i<ncanv.shadowColor.length;i++)
	{
		ncanv.shadowColor[i]=parseInt(ncanv.shadowColor[i])	
	}	
	ncanv.ScaleX = parseFloat(canv[35]);
	ncanv.ScaleY = parseFloat(canv[36]);
	ncanv.zIndex = parseInt(canv[37]);
	ncanv.style.zIndex=ncanv.zIndex;
	if(ncanv.zIndex>zmax) {zmax=ncanv.zIndex};
	if(ncanv.zIndex<zmin) {zmin=ncanv.zIndex};
	ncanv.rotate = parseInt(canv[38]);
	ncanv.clockw = canv[39]=='1';
	ncanv.complete = canv[40]=='1';
	ncanv.group = [];
	if (canv[41] != '')
	{
		ncanv.group=canv[41].split(',');
		for (var i=0;i<ncanv.group.length;i++)
		{
			ncanv.group[i]=parseInt(ncanv.group[i])	
		}		
	}
	ncanv.boundary = canv[42];
	ncanv.beztypes = [];
	if (canv[43] != '')
	{
		ncanv.beztypes=canv[43].split(',');
	};
	carray=canv[45].split(':');
	for (var i=0; i<carray.length; i++)
	{
		ncanv.path[i+3]=carray[i].split(',');
		for(var j=1; j<ncanv.path[i+3].length; j++)
		{
			ncanv.path[i+3][j]=parseFloat(ncanv.path[i+3][j]);
		}
	}
	ncanv.radius = parseFloat(canv[46]);
	ncanv.id=canv[47];
	return ncanv;
}

function fromtext()
{
	
	cancelfromtext();	
	box=document.createElement('div');
	box.id='boxfrom';
	box.style.zIndex=20000024
	box.style.top=screen.availHeight*0.10;
	box.style.left=screen.availWidth*0.10;
	box.style.height=screen.availHeight*0.30;
	box.style.width=screen.availWidth*0.30;
	box.style.backgroundColor='#000080';
	box.style.border='solid 1px black';
	document.getElementsByTagName('body')[0].appendChild(box);

	headbox=document.createElement('div');
	headbox.style.top=10;
	headbox.style.left=10;
	headbox.style.height=50;
	headbox.style.color='#000066';
	headbox.style.width=parseInt(box.style.width)-20;
	headbox.style.backgroundColor='#66FFFF';
	headbox.style.fontSize=24;
	headbox.style.paddingTop=8;
	headbox.innerHTML='&nbsp;&nbsp;Open';
	box.appendChild(headbox);
	innerbox=document.createElement('div');
	innerbox.style.top=70;
	innerbox.style.left=10;
	innerbox.style.height=parseInt(box.style.height)-80;
	innerbox.style.width=parseInt(box.style.width)-20;
	innerbox.style.backgroundColor='#FFFFFF';
	innerbox.style.border='solid 1px black';
	box.appendChild(innerbox);
	msgbx=document.createElement('div');
	msgbx.style.fontSize=14;
	msgbx.style.left=5;
	msgbx.style.top=5;
	msgbx.style.width=parseInt(box.style.width)-10;
	innerbox.appendChild(msgbx);
	if (window.File && window.FileReader && window.FileList && window.Blob && !iop) 
	{

		box.style.height=screen.availHeight*0.50;
		innerbox.style.height=parseInt(box.style.height)-80;
		msgtxt='Drag Files into box below';
		msgbx.innerHTML=msgtxt;
		dropindiv=document.createElement('div');
		dropindiv.id='drop_zone';
		dropindiv.style.fontSize=14;
		dropindiv.style.left=5;
		dropindiv.style.backgroundColor='#66FFFF';
		dropindiv.style.border='solid 1px black';
		dropindiv.style.top=30;
		dropindiv.style.height=parseInt(innerbox.style.height)-70;
		dropindiv.style.width=parseInt(innerbox.style.width)-10;
		dropindiv.style.overflow='auto';
		innerbox.appendChild(dropindiv);
		cin=document.createElement('input');
		cin.style.position='absolute'
		cin.style.left=10;
		cin.style.top=parseInt(innerbox.style.height)-25;
		cin.type='button';
		cin.value='Close';
		cin.onclick=function () {cancelfromtext()};
		innerbox.appendChild(cin);	
		var dropZone = document.getElementById('drop_zone');
		dropZone.addEventListener('dragover', handleDragOver, false);
		dropZone.addEventListener('drop', handleFileSelect, false);
	} 
	else 
	{
		msgtxt='Paste text from file into box below and click Create';
		msgbx.innerHTML=msgtxt;
		

		formdiv=document.createElement('div');
		formdiv.style.fontSize=18;
		formdiv.style.left=5;
		formdiv.style.backgroundColor='white';
		formdiv.style.top=45;
		formdiv.style.height=50;
		formdiv.style.width=parseInt(innerbox.style.width)-10;
		innerbox.appendChild(formdiv);
		bform=document.createElement('form');
		bform.style.width=parseInt(formdiv.style.width);
		formdiv.appendChild(bform);

		cin=document.createElement('input');
		cin.style.position='absolute'
		cin.style.left=10;
		cin.style.top=5;
		cin.id='ctext';
		cin.name='ctext';
		cin.type='textarea';
		cin.size=40;
		cin.value='';
		bform.appendChild(cin);
		cin=document.createElement('input');
		cin.style.position='absolute'
		cin.style.left=10;
		cin.style.top=70;
		cin.type='button';
		cin.value='Create';
		cin.onclick=function () {	
								//resetcanv($('ctext').value.trim());
								extract($('ctext').value.trim())
								cancelfromtext()								
							}
		bform.appendChild(cin);
		cin=document.createElement('input');
		cin.style.position='absolute'
		cin.style.left=140;
		cin.style.top=70;
		cin.type='button';
		cin.value='Cancel';
		cin.onclick=function () {cancelfromtext()};
		bform.appendChild(cin);	
	}
}

function clearall()
{
	$('shapemenu').style.visibility='hidden';
	$('group').style.visibility='hidden';
	$('ungroup').style.visibility='hidden';
	$('stylelines').style.visibility='hidden';
	$('collines').style.visibility='hidden';	
	$('colfill').style.visibility='hidden';
	$('gradfill').style.visibility='hidden';
	$('rotate').style.visibility='hidden';
	$('front').style.visibility='hidden';
	$('back').style.visibility='hidden';
	$('del').style.visibility='hidden';
	$('copy').style.visibility='hidden';
	$('editlines').style.visibility='hidden';
	$('vert').style.visibility='hidden';
	$('horz').style.visibility='hidden';
	$('alntop').style.visibility='hidden';
	$('alnbot').style.visibility='hidden';
	$('alnleft').style.visibility='hidden';
	$('alnright').style.visibility='hidden';
	$('shadow').style.visibility='hidden';
	$('sname').style.visibility='hidden';
	closeColor();
	removeGradLine();
	removeRotate();
	var bd=$('bodydiv');
	var bdc=$('bodydiv').childNodes;
	while(bdc.length>0)
	{
		if (bd.firstChild.id.substr(0,8)=='boundary')
		{
			bd.firstChild.canvas.boundary='empty';
		}
		bd.firstChild.parentNode.removeChild(bd.firstChild);
		bdc=$('bodydiv').childNodes;
	}
	bd=$('canvasdiv');
	bdc=bd.childNodes;
	while(bdc.length>0)
	{
		bd.firstChild.parentNode.removeChild(bd.firstChild);
		bdc=bd.childNodes;
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
		document.getElementById('drop_zone').innerHTML +='<br>'+f.name;
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
		 case 'canvas2':
		 	try
			{
				resetnewcanv(t[1]);
			}
			catch(e)
			{
				alert(e.name + ": " + e.message + ": " + e.fileName + ": " + e.lineNumber);
				alert('File data not recognised');
				return;
			}
		 break
		 case 'canvas':
		 	try
			{
				resetoldcanv(t[1]);
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
