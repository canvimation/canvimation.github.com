/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function buildMenu()
{
   this.elmRef = document.createElement('div');
   this.elmRef.id  = 'bldmenu';
   this.elmRef.style.left= 0; 
   this.elmRef.style.top= 26;
   this.elmRef.style.width=105;
   this.elmRef.style.height=190;
   this.elmRef.style.fontSize=12;
   this.elmRef.style.zIndex=2;
   this.elmRef.style.textAlign='center';
   this.elmRef.style.backgroundColor="#FFFFFF"; 
   this.elmRef.style.border='solid 1px black'
   addtofilm=false;
   innerhtml='Build ';
   switch(aniobj)
   {
		case "scene":
			scenecanv='current canvas';
			if (selected.length==1) {scenecanv='selected shape'};
			if (selected.length>1) {scenecanv='selected shapes'};
			innerhtml +='SCENERY<br> from<br>'+scenecanv+'<br>';
			innerhtml +='Title <input type=text id="scenetitle" value="Scenery'+(++scenecount)+'"  size=7><br>'
			innerhtml +='<input type="button" value="OK" onclick="copyscene()"><br>';
			innerhtml +='<input type="button" value="Cancel" onclick="--scenecount;rembld()"><br>';
			this.elmRef.innerHTML=innerhtml;
			movenotscene();
		break;
		case "sprite":
			msgani='Pick Element from Scenery, Sprites, Tweens or Films';
			msgtrack='Pick Track';
			innerhtml +='SPRITE from<br><span id="spantrack" onclick="anitarg=this.id;showmsggroup(msgtrack);movenottrack();" style="cursor:pointer"><u>Track</u></span><br>';
			innerhtml +='and<br><span id="spanani" onclick="anitarg=this.id;showmsggroup(msgani);movenottrack();" style="cursor:pointer"><u>Element</u></span><br>';
			innerhtml +='<input type="checkbox" id="vecselect"  checked="checked" >with vector.<br>';
			innerhtml +='Time over path<br>';
			innerhtml +='<input type="text" id="pathtime"  value="5" style="text-align:right" size=5>secs<br>';
			innerhtml +='<input type="button" value="OK" onclick="setsprite()"><br>';
			innerhtml +='<input type="button" value="Cancel" onclick="undobld()"><br><input type="hidden" value="" id="hidani">';
			this.elmRef.innerHTML=innerhtml;
		break;
		case "tween":
			alert('Not yet available')
		break;
		case "track":
			if (!(selected.length==1 || $('canvasdiv').childNodes.length==1))
			{
				alert('Only ONE shape may be used for a Track!');
			}
			else
			{
				scenetrack='current canvas';
				if (selected.length==1) {scenetrack='selected shape'};
				innerhtml +='TRACK<br> from<br>'+scenetrack+'<br>';
				innerhtml +='Title <input type=text id="tracktitle" value="Track'+(++trackcount)+'"  size=7><br>';
				innerhtml +='<input type="checkbox" id="repselect">with repeat.<br>';
				innerhtml +='<input type="checkbox" id="viewselect">visible.<br><br>';
				innerhtml +='<input type="button" value="OK" onclick="trackreps()"><br>';
				innerhtml +='<input type="button" value="Cancel" onclick="--trackcount;rembld()"><br>';
				this.elmRef.innerHTML=innerhtml;
				movenottrack();
			}
		break
		case "film":
			addtofilm=true;
			$('canvasdiv').style.visibility='hidden';
			$('filmsbar').style.visibility='visible';
			$('anielmorder').innerHTML='';
			filmlist=[];
			filmindxlist=[];
			fzind=0;
			innerhtml +='FILM<br>';
			innerhtml +='Title <input type=text id="filmtitle" value="Film'+(++filmcount)+'"  size=7><br>';
			innerhtml +='<input type="button" id="shflm" value="Show" onclick="showstopfilm(this.value)"><br>';
			innerhtml +='<input type="button" id="storefilm" value="Store" onclick="setfilmname();setfilm()"><br>';
			innerhtml +='<input type="button" id="cancelfilm" value="Cancel" onclick="--filmcount;closefilm();rembld()"><br>';
			this.elmRef.innerHTML=innerhtml;
		break
   }
  
  $('buildgroup').appendChild(this.elmRef);
   return this.elmRef;   
}

function buildinr()
{
   if ($('bldinr')) {$('bldinr').parentNode.removeChild($('bldinr'))};
   this.inr = document.createElement('div');
   this.inr.id  = 'bldinr';
   this.inr.style.left= 0; 
   this.inr.style.top= 26;
   this.inr.style.width=99;
   this.inr.style.height=190;
   this.inr.style.fontSize=12;
   this.inr.style.zIndex=3;
   this.inr.style.padding=3;;
   this.inr.style.backgroundColor="#FFFFFF"; 
   this.inr.style.border='solid 1px black';
   $('buildgroup').appendChild(this.inr);
}


function buildobj()
{
	if ((aniobj=='scene' || aniobj=='tween' || aniobj=='track') && $('canvasdiv').childNodes.length==0) {alert('No shapes to build with');return};
	if (((aniobj=='tween' || aniobj=='track') && selected.length>1 )|| ((aniobj=='tween' || aniobj=='track') &&(selected.length==0 && $('canvasdiv').childNodes.length>1))) {alert('Too many shapes to build a '+aniobj+'.');return};
	doingani=true;
	if (selected.length==0)
	{
		aniselect=[];
		for (var i=0; i<$('canvasdiv').childNodes.length; i++)
		{
			aniselect[i]=$('canvasdiv').childNodes[i];
		}
	}
	else
	{
		aniselect=[];
		for (var i=0; i<selected.length; i++)
		{
			aniselect[i]=selected[i];
		}
	}
	$('toolbar').style.visibility='hidden';
	clearscreen();
	if ($('bldmenu')) {$('bldmenu').parentNode.removeChild($('bldmenu'))};
	var bldm = new buildMenu();
}


function addvector()
{
	$('vecdiv').style.left=500;
	$('vecdiv').style.top=200;
	$('vecrotate').style.left=210;
	$('vecrotate').style.top=105;
	vecphi=0;
	vecanvdraw(0);
	$('vecdiv').style.visibility='visible';
}

function rembld()
{
	if ($('bldmenu')) {$('bldmenu').parentNode.removeChild($('bldmenu'))};
	$('filmbodydiv').style.visibility='hidden';
	$('filmsbar').style.visibility='hidden';
	$('canvasdiv').style.visibility='visible';
	$('toolbar').style.visibility='visible';
	$('grid').style.visibility='visible';
	$('menushape').style.visibility='visible';
	$('export').style.visibility='visible'
	doingani=false;
}

function copyscene()
{
	var re = /\W/;
	if (re.test($('scenetitle').value.trim()))
	{
		alert('Title should contain only letters and numbers.');
		return;
	}
	if (checkname($('scenetitle').value.trim(),'scene')) 
	{
		alert('There is already scenery with the title '+$('scenetitle').value.trim());
		return;
	};
	scene=new cscene($('scenetitle').value.trim());
	scenes[scene.name]=scene;
	if (selected.length==0)
	{
		for (var i=0; i<$('canvasdiv').childNodes.length; i++)
		{
			selected.push($('canvasdiv').childNodes[i]);
		}
	}
	shapecopy(false,scene,'scene');
	selected=[];
	$('scenehold').innerHTML +='<div id="scene|'+scene.name+'"><img src="assets/edit.png" style="cursor:pointer" alt="edit" title="edit" onclick="aniedit(this)">&nbsp;&nbsp;&nbsp;<span onclick="usename(this.innerHTML,'+squote+'scene'+squote+')" style="cursor:pointer">'+scene.name+'</span></div><br>';
	rembld();
	movenotscene();
}

function trackreps()
{
	var re = /\W/;
	if (re.test($('tracktitle').value.trim()))
	{
		alert('Title should contain only letters and numbers.');
		return;
	}
	if (checkname($('tracktitle').value.trim(), 'track')) 
	{
		alert('There is already a track with the title '+$('tracktitle').value.trim());
		return;
	};
	var tt=$('tracktitle').value.trim();
	var vs=$('viewselect').checked;
	if ($('repselect').checked)
	{
		innerhtml = 'Set repetitions for<br>';
		innerhtml +='<span id="trackname">'+$('tracktitle').value.trim()+'</span><br>';
		innerhtml +='<input type=text id="trackreps" value="0" style="text-align:right" size=7><br>';
		innerhtml +='repetitions.<br>';
		innerhtml +='<input type="checkbox" id="yoyo">with Yoyo.<br><br>';
		innerhtml +='<input type="button" value="OK" onclick="setTrack('+squote+tt+squote+','+vs+','+true+')"><br>';
		innerhtml +='<input type="button" value="Cancel" onclick="--trackcount;rembld()"><br>';
		$('bldmenu').innerHTML=innerhtml;	
	}
	else
	{
		setTrack(tt,vs,false)
	}
}

function setTrack(tt,vs,reps)
{
	track =new ctrack(tt);
	tracks[track.name]=track;
	track.visible=false;
	if(vs)
	{
		track.visible=true;
	}
	copytrack(reps)
}

function copytrack(reps)
{
	if (selected.length==0)
	{
		selected.push($('canvasdiv').childNodes[0]);
	}
	shapecopy(false,track,'track');
	if (reps)
	{
		if ($('trackreps').value.toLowerCase() == 'c')
		{
			track.repeats='c';
			track.yoyo=$('yoyo').checked;
		}
		else
		{
			var n = parseInt($('trackreps').value);
			if (isNaN(n))
			{
				alert('Repetitons is neither a number nor continuous - c -');		  
			}
			else if (n<0)
			{
				alert('Repetitons must be positive.');
			}
			else
			{
				track.repeats=n;
				track.yoyo=$('yoyo').checked;
			}
		}
	}
	
	selected=[];
	$('trackhold').innerHTML +='<div id="track|'+track.name+'"><img src="assets/edit.png" style="cursor:pointer" alt="edit" title="edit" onclick="aniedit(this)">&nbsp;&nbsp;&nbsp;<span onclick="usename(this.innerHTML,'+squote+'track'+squote+')" style="cursor:pointer">'+track.name+'</span></div><br>';
	rembld();
	movenottrack();
}

function usename(s,t)
{
	if (addtofilm)
	{
		s=s.trim();
		if ($('anielmorder').innerHTML.indexOf(s)>0) {alert('Element "'+s+'" already exists.');return};
		if (t=='track') {alert('Tracks cannot be Film Elements.')};
		$('anielmorder').innerHTML +='<li id="filmelmt'+s+'" onclick="setitem(this)" style="cursor:pointer" > '+t.substr(0,2).toUpperCase()+' '+s+'</li>';
		filmdiv = document.createElement('div');
		filmindxlist.push(s);
		filmlist.push([t.substr(0,2).toUpperCase(),s,0,'ever',0,'ever',fzind,0,0,false]);
		filmdiv.style.top=0;
		filmdiv.style.left=0;
		filmdiv.style.width=parseInt($('canvasdiv').style.width);
		filmdiv.style.height=parseInt($('canvasdiv').style.height);
		filmdiv.id='filmdiv'+s;
		filmdiv.style.zIndex=fzind++;
		
		$('filmbodydiv').appendChild(filmdiv);
		$('filmbodydiv').style.visibility='visible';
		$('canvasdiv').style.visibility='hidden';
		drawfilmelm(s,t.substr(0,2).toUpperCase());
	}
	else
	{
		changename(s,t)
	}

}

function drawfilmelm(s,t)
{
	switch (t)
	{
		case "SC":
			scene=scenes[s];
			for (var i=0;i<scene.cars.length;i++)
			{
				filmdiv.appendChild(scene.cars[i]);
				drawline(scene.cars[i]);
			}
		break;
		case "SP":
			sprite=sprites[s];
			guidepath(sprite);
			zeropointers(sprite);
			setfilmcanvases(filmdiv,sprite);
			clearfilmdiv(sprite.name);
			if (sprite.track.visible)
			{
				drawline(sprite.track.line);
			}
			savecanvases(sprite);
			savetracks(sprite);
			transform(sprite);
			drawtracks(sprite);
			for (var i=0; i<sprite.cars.length; i++)
			{ 	
				drawline(sprite.cars[i]);
				sprite.cars[i].ctx.restore();
				sprite.cars[i].ctx.save();
			}
			restorecanvases(sprite);
			restoretracks(sprite);
			savecanvases(sprite);
			savetracks(sprite);
		break;
		case "TW":
		alert('Not yet available')
		break;
		case "TR":

		break
		case "FI":
			
		break
	}	
}

function changename(s,t)
{
	s=s.trim();
	if (t !='track' && anitarg=='spantrack') {return};
	if (t =='track' && anitarg!='spantrack') {return};
	$(anitarg).innerHTML='<u>'+s+'</u>';
	if (anitarg=='spanani') {$('hidani').value=t};
	$('msggroup').style.visibility='hidden';
}

function checkname(name,type)
{
	switch(type)
	{
		case 'scene':
			t='scenery';
			var found = (name in scenes);
		break
		case 'track':
			t='a track';
			var found = (name in tracks);
		break
		case 'sprite':
			t='a sprite';
			var found = (name in sprites);
		break
		case 'tween':
			t='a tween';
			var found = (name in tweens);
		break
		case 'film':
			t='a film';
			var found = (name in films);
		break
	}
	
	if (name.trim()=='')
	{
		alert('No title for '+t);
		return false;
	}
	return found;
}


function showmsggroup(s)
{
	var m=$('msggroup');
	$('msggroup').parentNode.removeChild($('msggroup'))
	if (anitarg=='spantrack')
	{
		$('scenegroup').appendChild(m);
		$('msggroup').style.height=110;
	}
	else
	{
		$('trackgroup').appendChild(m);
		$('msggroup').style.height=118;
	}
	$('msggroup').innerHTML=s;
	$('msggroup').style.visibility='visible';
}

function setsprite()
{
	var pathtime=parseFloat($('pathtime').value);
	if (isNaN(pathtime)) {alert('Time not set!!!'); return};
	if (pathtime<0)  {alert('Time must be positive');return};
	var train_name=getaniname($('spanani').innerHTML);
	var train_type=$('hidani').value;
	var track_name=getaniname($('spantrack').innerHTML);
	if (!(track_name in tracks)) {alert('No track with name '+track_name); return};
	
	switch (train_type)
	{
		case '':
			{alert('No element selected '); return};
		break
		case 'scene':
			if (!(train_name in scenes)) {alert('No scenery with name '+train_name); return};
			train=scenes[train_name];
		break
		case 'sprite':
			if (!(train_name in sprites)) {alert('No sprite with name '+train_name); return};
			train=sprites[train_name];
			drawline(train.track.line);
		break
	}
	
	sprite=new csprite();
	sprite.ptime=pathtime;
	sprite.engine=train_type;
	sprite.track=tracks[track_name];
	sprite.train=train;
	sprite.cars=train.cars;
	sprite.pointer=0;
	getcanvases(sprite);
	clearcanvdiv();
    zeropointers(sprite);
	savecanvases(sprite);
	savetracks(sprite);
	drawrailway(sprite);
	restorecanvases(sprite);
	restoretracks(sprite);
	sprite.vec=$('vecselect').checked;
	if (sprite.vec) 
	{
		alert('Vector now available for positioning');
		addvector();
	}
	else
	{
		alert('Centre marker now available for positioning');
		$('spritecentre').style.left=500;
		$('spritecentre').style.top=200;
		$('spritecentre').style.visibility='visible';
	}
	var sname='Sprite'+(++spritecount);
	innerhtml ='SPRITE<br> from<br>'+train_name+'<br> and '+track_name+'<br>';
	innerhtml +='Title <input type=text id="spritetitle" value="'+sname+'"  size=7><br>';
	innerhtml +='<input type="button" value="Check" onclick="checksprite(false)"><br>';
	innerhtml +='<input type="button" value="Store" onclick="copysprite(false)"><br>';
	innerhtml +='<input type="button" value="Cancel" onclick="--spritecount;undobld();redrawcanvdiv()"><br>';
	$('bldmenu').innerHTML=innerhtml;
	movenotsprite();	
}

function getaniname(s)
{
	s=s.substr(3);
	return s.substring(0,s.length-4);
	
}

function clearanidiv()
{
	for (var i=0; i<$('animationdiv').childNodes.length; i++)
	{
		$('animationdiv').childNodes[i].ctx.clearRect(0,0,activewidth,activeheight);
	}
}

function clearscenecanvdiv()
{
	while ($('canvasdiv').childNodes.length>0)
	{
		$('canvasdiv').firstChild.ctx.clearRect(0,0,activewidth,activeheight);
		$('hidecanvas').appendChild($('canvasdiv').firstChild);
	}
}

function clearcanvdiv()
{
	for(var i=0; i<$('canvasdiv').childNodes.length; i++)
	{
		$('canvasdiv').childNodes[i].ctx.clearRect(0,0,activewidth,activeheight);
	}
}

function redrawcanvdiv()
{
	for (var i=0; i<$('canvasdiv').childNodes.length; i++)
	{
		drawline($('canvasdiv').childNodes[i]);
	}	
}

function clearscreen()
{
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
	$('toolbar').style.visibility='hidden';
	
	for(var i=0; i<$('toolbar').childNodes.length; i++)
	{
		if ($('toolbar').childNodes[i].className=='choice')
		{
			$('toolbar').childNodes[i].style.visibility='hidden';
		}
	}
}

function chkbld()
{
	innerhtml ='SPRITE<br> from<br>'+sprite.train.name+'<br> and '+sprite.track.name+'<br>';
	innerhtml +='Title <input type=text id="spritetitle" value="'+sprite.name+'"  size=7><br>';
	innerhtml +='<input type="button" value="Check" onclick="checksprite(true)"><br>';
	innerhtml +='<input type="button" value="Store" onclick="copysprite(true)"><br>';
	innerhtml +='<input type="button" value="Cancel" onclick="--spritecount;undobld();redrawcanvdiv();"><br>';
	$('bldmenu').innerHTML=innerhtml;
}

function checksprite(listed)
{	
	var sname = $('spritetitle').value.trim();
	var re = /\W/;
	if (re.test(sname))
	{
		alert('Title should contain only letters and numbers.');
		return;
	}
	if (!listed)
	{
		if (checkname(sname, 'sprite')) 
		{
			alert('There is already a sprite with the title '+sname);
			return;
		};
		sprite.name=sname;
		sprites[sprite.name]=sprite;
	}
	else
	{
		if (sname != sprite.name)
		{
			delete sprites[sprite.name];
			sprites[sname]=sprite;
		}
	}
	stopchecking=false;
	innerhtml ='Checking<br>';
	innerhtml +='<br>';
	innerhtml +='<input type="button" value="Stop" onclick="stopchecking=true"><br>';
	$('bldmenu').innerHTML=innerhtml;
	setvector();
	$('vecdiv').style.visibility='hidden';
	$('spritecentre').style.visibility='hidden';
	drawline(sprite.track.line);
	outlinetracks(sprite);
	followpath(sprite);
}


function setvector()
{
	if (sprite.vec)
	{
		vector.xs = minivect.xs+parseInt($('vecdiv').style.left)+110;
		vector.xe = minivect.xe+parseInt($('vecdiv').style.left)+110;
		vector.ys = minivect.ys+parseInt($('vecdiv').style.top)+58;
		vector.ye = minivect.ye+parseInt($('vecdiv').style.top)+58;
		var psi = arctan(vector.xe - vector.xs,vector.ye - vector.ys);
	}
	else
	{
		vector.xs=parseInt($('spritecentre').style.left)+10;
		vector.ys=parseInt($('spritecentre').style.top)-42;
		var psi = 0;
	}
	sprite.vector = {xs:0,ys:0,xe:0,ye:0,psi:0};
	sprite.vector.xs=vector.xs;
	sprite.vector.xe=vector.xe;
	sprite.vector.ys=vector.ys;
	sprite.vector.ye=vector.ye;
	sprite.vector.psi = psi;
}


function copysprite(listed)
{
	var sname = $('spritetitle').value.trim();
	var re = /\W/;
	if (re.test(sname))
	{
		alert('Title should contain only letters and numbers.');
		return;
	}
	if (!listed)
	{
		if (checkname(sname, 'sprite')) 
		{
			alert('There is already a sprite with the title '+sname);
			return;
		};
		sprite.name=sname;
		sprites[sprite.name]=sprite;
	}
	else
	{
		if (sname != sprite.name)
		{
			delete sprites[sprite.name];
			sprites[sname]=sprite;
			sprite.name = sname;
		}
	}
	movenotsprite();
	setvector();
	guidepath(sprite);
	$('spritehold').innerHTML +='<div id="sprite|'+sprite.name+'"><img src="assets/edit.png" style="cursor:pointer" alt="edit" title="edit" onclick="aniedit(this)">&nbsp;&nbsp;&nbsp;<span onclick="usename(this.innerHTML,'+squote+'sprite'+squote+')" style="cursor:pointer">'+sprite.name+'</span></div><br>';
	undobld();
	resetcanvases(sprite);
	redrawcanvdiv();
}


function setfilmname()
{
	var re = /\W/;
	if (re.test($('filmtitle').value.trim()))
	{
		alert('Title should contain only letters and numbers.');
		return;
	}
	if (checkname($('filmtitle').value.trim(), 'film')) 
	{
		alert('There is already a film with the title '+$('filmtitle').value.trim());
		return;
	};
	film=new cfilm($('filmtitle').value.trim());
	films[film.name]=film;
	film.list=[];
	$('filmhold').innerHTML +='<div id="film|'+film.name+'"><img src="assets/edit.png" style="cursor:pointer" alt="edit" title="edit" onclick="aniedit(this)">&nbsp;&nbsp;&nbsp;<span onclick="usename(this.innerHTML,'+squote+'film'+squote+')" style="cursor:pointer">'+film.name+'</span></div><br>';
}

function setfilm()
{
	
	for ( var i=0; i<filmlist.length; i++)
	{
		filmlist[i][6]=$('filmdiv'+filmlist[i][1]).style.zIndex;
		film.list.push(filmlist[i]);
		$('filmdiv'+filmlist[i][1]).parentNode.removeChild($('filmdiv'+filmlist[i][1]));
	}
	$('filmbodydiv').style.visibility='hidden';
	$('canvasdiv').style.visibility='visible';
	$('filmdivhandle').style.visibility='hidden';
	if ($('filmpropmenu')) {$('filmpropmenu').parentNode.removeChild($('filmpropmenu'))};
	addtofilm=false;
	redrawcanvdiv();
	rembld();
	movenotfilm();
}

function showstopfilm(v)
{
	if (v=='Show')
	{
		$('shflm').value='Stop Film';
		filmstopped=false;
		$('storefilm').style.visibility='hidden';
		$('cancelfilm').style.visibility='hidden';
		if ($('delfilm')) {$('delfilm').style.visibility='hidden'};
		var m=$('msgblank');
		m.parentNode.removeChild(m)
		$('scenegroup').appendChild(m);
		m.innerHTML="";
		m.style.visibility='visible';
		showfilm();
	}
	else
	{
		$('shflm').value='Show';
		filmstopped=true;
		$('storefilm').style.visibility='visible';
		$('cancelfilm').style.visibility='visible';
		if ($('delfilm')) {$('delfilm').style.visibility='visible'};
		$('msgblank').style.visibility='hidden';
	}
}

function closefilm()
{
	for (var i=0; i<filmlist.length;i++)
	{
		switch (filmlist[i][0])
		{
			case 'SC':
				var cbdt=filmlist[i][7];
				var cbdl=filmlist[i][8];
				var curfilmdiv=$('filmdiv'+filmlist[i][1]);
				var cfch=curfilmdiv.childNodes;
				for (var s=0;s<cfch.length;s++)
				{
					cfch[s].ox -=cbdl;
					cfch[s].oy -=cbdt;
					cfch[s].sox -=cbdl;
					cfch[s].soy -=cbdt;
					for (var j=3; j<cfch[s].path.length ;j++)
					{
						for (var k=1;k<cfch[s].path[j].length; k++)
						{
							if ( k%2 == 1)
							{
								cfch[s].path[j][k] -=cbdl;
							}
							else
							{
								cfch[s].path[j][k] -=cbdt;
							}
						}
					}
					cfch[s].bleft -=cbdl;
					cfch[s].btop -= cbdt;
					cfch[s].scleft=cfch[s].bleft;
					cfch[s].sctop=cfch[s].btop;
					cfch[s].lineGrad[0] -=cbdl;
					cfch[s].lineGrad[1] -=cbdt;
					cfch[s].lineGrad[2] -=cbdl;
					cfch[s].lineGrad[3] -=cbdt;
					cfch[s].radGrad[0] -=cbdl;
					cfch[s].radGrad[1] -=cbdt;
					cfch[s].radGrad[3] -=cbdl;
					cfch[s].radGrad[4] -=cbdt;
					cfch[s].cx -=cbdl;
					cfch[s].cy -=cbdt;
				}
			break
			case 'SP':
				var sprite=sprites[filmlist[i][1]];
				var trk=sprite.track.line;
				var cbdt=filmlist[i][7];
				var cbdl=filmlist[i][8];
				trk.ox -=cbdl;
				trk.oy -=cbdt;
				trk.sox -=cbdl;
				trk.soy -=cbdt;
				for (var j=3; j<trk.path.length ;j++)
				{
					for (var k=1;k<trk.path[j].length; k++)
					{
						if ( k%2 == 1)
						{
							trk.path[j][k] -=cbdl;
						}
						else
						{
							trk.path[j][k] -=cbdt;
						}
					}
				}
				trk.bleft -=cbdl;
				trk.btop -= cbdt;
				trk.scleft=trk.bleft;
				trk.sctop=trk.btop;
				trk.lineGrad[0] -=cbdl;
				trk.lineGrad[1] -=cbdt;
				trk.lineGrad[2] -=cbdl;
				trk.lineGrad[3] -=cbdt;
				trk.radGrad[0] -=cbdl;
				trk.radGrad[1] -=cbdt;
				trk.radGrad[3] -=cbdl;
				trk.radGrad[4] -=cbdt;
				trk.cx -=cbdl;
				trk.cy -=cbdt;
			break
		}
		$('filmdiv'+filmlist[i][1]).parentNode.removeChild($('filmdiv'+filmlist[i][1]));
	}
	$('filmbodydiv').style.visibility='hidden';
	$('canvasdiv').style.visibility='visible';
	$('filmdivhandle').style.visibility='hidden';
	if ($('filmpropmenu')) {$('filmpropmenu').parentNode.removeChild($('filmpropmenu'))};
	addtofilm=false;
}

function showfilm()
{
	$('filmdivhandle').style.visibility='hidden';
	if ($('filmpropmenu')) {$('filmpropmenu').parentNode.removeChild($('filmpropmenu'))};
	$('filmsbar').style.visibility='hidden';
	var sprite;
	for (var i=0; i<filmlist.length;i++)
	{
		filmlist[i][9]=false;
		$('filmdiv'+filmlist[i][1]).style.visibility='hidden';
		if (filmlist[i][0]=='SP')
		{
			sprite=sprites[filmlist[i][1]];
			filmfollowpath(sprite);
		}
	}
	
	runlist={};
	runfilm(0);
}

function runfilm(t)
{
	filmfinished=true;
	for (var i=0; i<filmlist.length;i++)
	{
		var ff=true;
		if (filmlist[i][2]==t)
		{
			$('filmdiv'+filmlist[i][1]).style.visibility='visible';
			if (filmlist[i][0]=='SC' && (filmlist[i][3]=='e' || filmlist[i][3]=='ever'))
			{
				filmlist[i][9]=true;
			}
			ff = ff && filmlist[i][9];
		}
		if (filmlist[i][3]==t)
		{
			$('filmdiv'+filmlist[i][1]).style.visibility='hidden';
			filmlist[i][9]=true
			if (filmlist[i][0]=='SP')
			{
				delete runlist[filmlist[i][1]];
			}
			ff = ff && filmlist[i][9];
		}
		if (filmlist[i][0]=='SP')
		{
			if (filmlist[i][4]==t)
			{
				sprite=sprites[filmlist[i][1]];
				runlist[filmlist[i][1]]=filmlist[i];
			}
			if (filmlist[i][5]==t)
			{	
				filmlist[i][9]=true;
				delete runlist[filmlist[i][1]];
			}
		}
		
	}
	
	var osvalue=openshutter(runlist);
	filmfinished = ff &&  osvalue;
	t+=50;
	if (!filmfinished && !filmstopped)
	{
		setTimeout(function() {runfilm(t)},50);
	}
	else
	{
		alert('finished');
		$('shflm').value='Show';
		filmrestorestart();
	}
}

function openshutter(runlist)
{
	var ff=true;
	var opened=false;
	for (var  flm in runlist)
	{
		opened = true;
		switch (runlist[flm][0])
		{
			case 'SP':
				shvalue=shutter(sprites[runlist[flm][1]]);
				ff=ff && shvalue;
			break
		}	
	}
	return ff && opened;
}

function shutter(sprite)
{
	if (!sprite.finishmove)
	{
		transform(sprite);
		drawtracks(sprite);
		for (var i=0; i<sprite.cars.length; i++)
 	  	{ 	
			drawline(sprite.cars[i]);
			sprite.cars[i].ctx.restore();
			sprite.cars[i].ctx.save();
	  	}
	}
	return sprite.finishmove;
}


function undobld()
{
	$('msggroup').style.visibility='hidden';
	$('vecdiv').style.visibility='hidden';
	$('spritecentre').style.visibility='hidden';
	rembld();	
}

function aniedit(el)
{
	clearscreen();
	$('export').style.visibility='hidden';
	buildinr();
	
	elmsadded=false;
	trackcheck=false;
	var m=$('msgblank');
	m.parentNode.removeChild(m)
	$('scenegroup').appendChild(m);
	m.innerHTML="";
	m.style.visibility='visible';
	var ani = el.parentNode.id.split('|');
	switch(ani[0])
   	{
		case "scene":
			clearscenecanvdiv()
			scene=scenes[ani[1]];
			editscene();
		break;
		case "sprite":
			clearcanvdiv();
			sprite=sprites[ani[1]];
			editsprite();
		break;
		case "tween":
			
		break;
		case "track":
			clearcanvdiv();
			track=tracks[ani[1]];
			edittrack();
		break
		case "film":
			clearcanvdiv();
			film=films[ani[1]];
			editfilm();
		break
   }
}

function closescinr()
{
	if ($('bldinr')) {$('bldinr').parentNode.removeChild($('bldinr'))};
	
	scene.cars=[];

	for (var i=0; i<$('canvasdiv').childNodes.length;i++)
	{
		scene.cars.push($('canvasdiv').childNodes[i]);
	}
	while ($('hidecanvas').childNodes.length>0)
	{
		$('canvasdiv').appendChild($('hidecanvas').firstChild);
	}
	clearscreen();
	undobld();
	if (elmsadded)
	{
		for (var i=0; i<scene.cars.length;i++)
		{
			$('canvasdiv').removeChild(scene.cars[i]);
		}
	}
	redrawcanvdiv();
	$('msgblank').style.visibility='hidden';
	
}

function editscene()
{
	innerhtml ='Edit SCENERY<br><span>'+scene.name+'</span><br><br>';
	innerhtml +='<span style="cursor:pointer" onclick="editscenename()">Rename</span><br>';
	innerhtml +='<span style="cursor:pointer" onclick="editscenedel()">Delete</span><br>';
	innerhtml +='<span style="cursor:pointer" onclick="editscenedraw()">Redraw</span><br><br>';
	innerhtml +='<input type="button" value="Done" onclick="closescinr()"><br>';
	$('bldinr').innerHTML=innerhtml;
}

function editscenename()
{
	innerhtml = 'Rename<br>';
	innerhtml +='<input type=text id="scenenewname" value="'+scene.name+'"  size=7><br>';
	innerhtml +='<input type="button" value="OK" onclick="renamescene()"><br>';
	innerhtml +='<input type="button" value="Cancel" onclick="editscene()"><br>';
	$('bldinr').innerHTML=innerhtml;
}

function renamescene()
{
	var sname = $('scenenewname').value.trim();
	var re = /\W/;
	if (re.test(sname))
	{
		alert('Title should contain only letters and numbers.');
		return;
	}
	if (checkname(sname,'scene')) 
	{
		alert('There is already scenery with the title '+sname);
		return;
	};
	var cname=scene.name;
	scenes[sname]=scene;
	for(var sprite in sprites)
	{
		changespritescene(sprites[sprite],cname,sname)
	}
	for(var film in films)
	{
		changefilmscene(films[film],cname,sname)
	}
	delete scenes[scene.name];
	
	$('scene|'+cname).innerHTML='<img src="assets/edit.png" style="cursor:pointer" alt="edit" title="edit" onclick="aniedit(this)">&nbsp;&nbsp;&nbsp;<span onclick="usename(this.innerHTML,'+squote+'scene'+squote+')" style="cursor:pointer">'+sname+'</span>'
	$('scene|'+cname).id='scene|'+sname;
	scene.name=sname;
	movenotscene();
	editscene();	
}

function editscenedel()
{
	var doit = confirm('Do you really want to delete '+scene.name+'?');
	if (doit)
	{
		delete scenes[scene.name];
		var sid = $('scene|'+scene.name);
		var pid =sid.parentNode; 
		sid.parentNode.removeChild(sid.nextSibling);
		sid.parentNode.removeChild(sid);
	}
	closescinr();
}

function editscenedraw()
{
	rembld();
	elmsadded=true;
	for (var i=0; i<scene.cars.length;i++)
	{
		$('canvasdiv').appendChild(scene.cars[i]);
		drawline(scene.cars[i]);
	}
}

function closetrkinr()
{
	$('bldinr').parentNode.removeChild($('bldinr'));
	clearscreen();
	undobld();
	if (elmsadded)
	{
		$('canvasdiv').removeChild(track.line);
	}
	redrawcanvdiv();	
	$('msgblank').style.visibility='hidden';
}

function edittrack()
{
	var vchk ='';
	if (track.visible) {vchk='checked="checked"'};
	var ychk ='';
	if (track.yoyo) {ychk='checked="checked"'};
	innerhtml ='Edit TRACK<br><span>'+track.name+'</span><br><br>';
	innerhtml +='<span style="cursor:pointer" onclick="edittrackname()">Rename</span><br>';
	innerhtml +='<span style="cursor:pointer" onclick="edittrackdel()">Delete</span><br>';
	innerhtml +='<span style="cursor:pointer" onclick="edittrackdraw()">Redraw</span><br>';
	innerhtml +='<input type="checkbox"'+vchk+' onclick="swapvis()">visible.<br>';
	innerhtml +='<input type=text id="treps" value="'+track.repeats+'" style="text-align:right" size=3 onchange="setreps()">repeats.<br>';
	innerhtml +='<input type="checkbox"'+ychk+' onclick="swapyo()" >with Yoyo.<br>';
	innerhtml +='<input type="button" value="Done" onclick="closetrkinr()"><br>';
	$('bldinr').innerHTML=innerhtml;
}

function setreps()
{
	if ($('treps').value.toLowerCase() == 'c')
	{
		track.repeats='c';
	}
	else
	{
		var n = parseInt($('treps').value);
		if (isNaN(n))
		{
			alert('Repetitons is neither a number nor continuous - c -');
			$('treps').value=track.repeats;
		}
		else if (n<0)
		{
			alert('Repetitons must be positive.');
			$('treps').value=track.repeats;
		}
		else
		{
			track.repeats=n;
		}
	}
}

function swapvis()
{
	track.visible =!track.visible;
}

function swapyo()
{
	track.yoyo =!track.yoyo;
}
	
function edittrackname()
{
	innerhtml = 'Rename<br>';
	innerhtml +='<input type=text id="tracknewname" value="'+track.name+'"  size=7><br>';
	innerhtml +='<input type="button" value="OK" onclick="renametrack()"><br>';
	innerhtml +='<input type="button" value="Cancel" onclick="edittrack()"><br>';
	$('bldinr').innerHTML=innerhtml;
}

function renametrack()
{
	var sname = $('tracknewname').value.trim();
	var re = /\W/;
	if (re.test(sname))
	{
		alert('Title should contain only letters and numbers.');
		return;
	}
	if (checkname(sname,'track')) 
	{
		alert('There is already a track with the title '+sname);
		return;
	}
	var cname=track.name;
	tracks[sname]=track;
	for(var sprite in sprites)
	{
		changespritetrack(sprites[sprite],cname,sname)
	}
	delete tracks[track.name];
	$('track|'+cname).innerHTML='<img src="assets/edit.png" style="cursor:pointer" alt="edit" title="edit" onclick="aniedit(this)">&nbsp;&nbsp;&nbsp;<span onclick="usename(this.innerHTML,'+squote+'track'+squote+')" style="cursor:pointer">'+sname+'</span>';
	$('track|'+cname).id='track|'+sname;
	track.name=sname;
	movenottrack();
	edittrack();	
}

function edittrackdel()
{
	var doit = confirm('Do you really want to delete '+track.name+'?');
	if (doit)
	{
		delete tracks[track.name];
		var sid = $('track|'+track.name);
		var pid =sid.parentNode; 
		sid.parentNode.removeChild(sid.nextSibling);
		sid.parentNode.removeChild(sid);
	}
	closetrkinr();
}

function edittrackdraw()
{
	rembld();
	elmsadded=true;
	$('canvasdiv').appendChild(track.line);
	drawline(track.line);
}

function closespinr()
{
	if ($('bldinr')) {$('bldinr').parentNode.removeChild($('bldinr'))};
	clearscreen();
	undobld();
	doingani=false;
	if (elmsadded)
	{
		resetcanvases(sprite);
	}
	redrawcanvdiv();	
	$('msgblank').style.visibility='hidden';
}

function editsprite()
{
	editcheck=false;
	trackcheck=false;
	var vectype='centre';
	var vchk='';
	if (sprite.vec)
	{
		vectype='vector';
		vchk='checked="checked"';
	}
	innerhtml ='Edit SPRITE<br><span>'+sprite.name+'</span><br><br>';
	innerhtml +='<span style="cursor:pointer" onclick="editspritename()">Rename</span><br>';
	innerhtml +='<span style="cursor:pointer" onclick="editspritedel()">Delete</span><br>';
	innerhtml +='<input type="checkbox"'+vchk+' onclick="swapvec()">Vector.<br>';
	innerhtml +='<span id="spvc" style="cursor:pointer" onclick="editspritevec()">ReSet '+vectype+'</span><br>';
	innerhtml +='<span style="cursor:pointer" onclick="editspriteFullC()">Full Check</span><br>';
	innerhtml +='<span style="cursor:pointer" onclick="editspriteTrackC()">Track Check</span><br><br>';
	innerhtml +='<input type="button" value="Done" onclick="closespinr()"><br>';
	$('bldinr').innerHTML=innerhtml;
}

function swapvec()
{
	sprite.vec = !sprite.vec;
	var vectype='centre';
	if (sprite.vec)
	{
		vectype='vector';
	}
	$('spvc').innerHTML='ReSet '+vectype;
}

function editspritename()
{
	innerhtml = 'Rename<br>';
	innerhtml +='<input type=text id="spritenewname" value="'+sprite.name+'"  size=7><br>';
	innerhtml +='<input type="button" value="OK" onclick="renamesprite('+squote+sprite.name+squote+')"><br>';
	innerhtml +='<input type="button" value="Cancel" onclick="editsprite()"><br>';
	$('bldinr').innerHTML=innerhtml;
}

function renamesprite(name)
{
	sprite=sprites[name];
	var sname = $('spritenewname').value.trim();
	var re = /\W/;
	if (re.test(sname))
	{
		alert('Title should contain only letters and numbers.');
		return;
	}
	if (checkname(sname,'sprite')) 
	{
		alert('There is already a sprite with the title '+sname);
		return;
	};
	var cname=sprite.name;
	sprites[sname]=sprite;
	delete sprites[cname];
	sprite=sprites[sname];
	sprite.name=sname;
	
	for(var sprite in sprites)
	{
		changespritesprite(sprites[sprite],cname,sname)
	}
	for(var film in films)
	{
		changefilmsprite(films[film],cname,sname)
	}
	
	$('sprite|'+cname).innerHTML='<img src="assets/edit.png" style="cursor:pointer" alt="edit" title="edit" onclick="aniedit(this)">&nbsp;&nbsp;&nbsp;<span onclick="usename(this.innerHTML,'+squote+'sprite'+squote+')" style="cursor:pointer">'+sname+'</span>';
	$('sprite|'+cname).id='sprite|'+sname;
	movenotsprite();
	editsprite();	
}

function editspritedel()
{
	var doit = confirm('Do you really want to delete '+sprite.name+'?');
	if (doit)
	{
		delete sprites[sprite.name];
		var sid = $('sprite|'+sprite.name); 
		sid.parentNode.removeChild(sid.nextSibling);
		sid.parentNode.removeChild(sid);
	}
	closespinr();
}

function editspriteFullC()
{
	elmsadded=true;
	editcheck=true;
	stopchecking=false;
	innerhtml ='Checking<br>';
	innerhtml +='<br>';
	innerhtml +='<input type="button" value="Stop" onclick="stopchecking=true"><br>';
	$('bldinr').innerHTML=innerhtml;
	$('vecdiv').style.visibility='hidden';
	$('spritecentre').style.visibility='hidden';
	followpath(sprite);
}

function editspriteTrackC()
{
	trackcheck=true;
	outlinetracks(sprite);
	editspriteFullC();
}


function editspritevec()
{
	
	$('vecdiv').style.left = sprite.vector.xs -110 - minivect.xs;
	$('vecdiv').style.top = sprite.vector.ys - 58 - minivect.ys;
	$('vecrotate').style.left=105+105*Math.cos(sprite.vector.psi);
	$('vecrotate').style.top=105+105*Math.sin(sprite.vector.psi);
	vecphi=sprite.vector.psi;
	vecanvdraw(sprite.vector.psi);
	innerhtml = 'Set Vector<br>';
	innerhtml +='<input type="button" value="Set" onclick="setvector();editsprite()"><br>';
	innerhtml +='<input type="button" value="Cancel" onclick="editsprite()"><br>';
	$('bldinr').innerHTML=innerhtml;
	doingani=true;
	getcanvases(sprite);
	clearcanvdiv();
    zeropointers(sprite);
	savecanvases(sprite);
	savetracks(sprite);
	drawrailway(sprite);
	restorecanvases(sprite);
	restoretracks(sprite);
	if (sprite.vec) 
	{
		$('vecdiv').style.visibility='visible';
	}
	else
	{
		$('spritecentre').style.visibility='visible';
	}
}

function vecanvdraw(phi)
{
	
	vecanv.ctx.restore();
	vecanv.ctx.save();
	vecanv.ctx.clearRect(-220,-220,440,440);
	vecanv.ctx.beginPath();
	vecanv.ctx.rotate(phi);
	vecanv.ctx.moveTo(0,0);	
	vecanv.ctx.lineTo(100,0);
	vecanv.ctx.moveTo(90,-10);
	vecanv.ctx.lineTo(100,0);
	vecanv.ctx.lineTo(90,10);
	vecanv.ctx.stroke();
	vecirc.ctx.beginPath();
	vecirc.ctx.arc(0,0,5,0,2*Math.PI, false);
	vecirc.ctx.stroke();
}

function setitem(liobj)
{
	curfilmelm=liobj.innerHTML.substr(4);
	curfilmtype=liobj.innerHTML.substr(0,3).trim();
	var flindx=filmindxlist.indexOf(curfilmelm);
	filmlist[flindx][7]=0;//added to tops of path coords
	filmlist[flindx][8]=0;//added to lefts of path coords
	DDfilmdivhandle=new YAHOO.util.DD('filmdivhandle');
	flmovetop=parseInt($('filmdivhandle').style.top);
	flmoveleft=parseInt($('filmdivhandle').style.left);
	DDfilmdivhandle.onDrag =function() {
											var flhtop=parseInt($('filmdivhandle').style.top);
											var flhleft=parseInt($('filmdivhandle').style.left);
											var cbdt=flhtop-flmovetop;
											var cbdl=flhleft-flmoveleft;
											filmlist[flindx][7]+=cbdt;
											filmlist[flindx][8]+=cbdl;
											flmovetop=flhtop;
											flmoveleft=flhleft;
											var curfilmdiv=$('filmdiv'+curfilmelm);
											switch (curfilmtype)
											{
												case 'SC':
													var cfch=curfilmdiv.childNodes;
													for (var s=0;s<cfch.length;s++)
													{
														cfch[s].ox +=cbdl;
														cfch[s].oy +=cbdt;
														cfch[s].sox +=cbdl;
														cfch[s].soy +=cbdt;
														for (var i=3; i<cfch[s].path.length ;i++)
														{
															for (var k=1;k<cfch[s].path[i].length; k++)
															{
																if ( k%2 == 1)
																{
																		cfch[s].path[i][k] +=cbdl;
																}
																else
																{
																		cfch[s].path[i][k] +=cbdt;
																}
															}
														}
														cfch[s].bleft +=cbdl;
														cfch[s].btop += cbdt;
														cfch[s].scleft=cfch[s].bleft;
														cfch[s].sctop=cfch[s].btop;
														cfch[s].lineGrad[0] +=cbdl;
														cfch[s].lineGrad[1] +=cbdt;
														cfch[s].lineGrad[2] +=cbdl;
														cfch[s].lineGrad[3] +=cbdt;
														cfch[s].radGrad[0] +=cbdl;
														cfch[s].radGrad[1] +=cbdt;
														cfch[s].radGrad[3] +=cbdl;
														cfch[s].radGrad[4] +=cbdt;
														cfch[s].cx +=cbdl;
														cfch[s].cy +=cbdt;
														drawline(cfch[s]);
													}
												break
												case 'SP':
													var sprite=sprites[curfilmelm];
													var trk=sprite.track.line;
													trk.ox +=cbdl;
													trk.oy +=cbdt;
													trk.sox +=cbdl;
													trk.soy +=cbdt;
													for (var i=3; i<trk.path.length ;i++)
													{
														for (var k=1;k<trk.path[i].length; k++)
														{
															if ( k%2 == 1)
															{
																	trk.path[i][k] +=cbdl;
															}
															else
															{
																	trk.path[i][k] +=cbdt;
															}
														}
													}
													trk.bleft +=cbdl;
													trk.btop += cbdt;
													trk.scleft=trk.bleft;
													trk.sctop=trk.btop;
													trk.lineGrad[0] +=cbdl;
													trk.lineGrad[1] +=cbdt;
													trk.lineGrad[2] +=cbdl;
													trk.lineGrad[3] +=cbdt;
													trk.radGrad[0] +=cbdl;
													trk.radGrad[1] +=cbdt;
													trk.radGrad[3] +=cbdl;
													trk.radGrad[4] +=cbdt;
													trk.cx +=cbdl;
													trk.cy +=cbdt;
													guidepath(sprite);
													zeropointers(sprite);
													clearfilmdiv(sprite.name);
													if (sprite.track.visible)
													{
														drawline(sprite.track.line);
													}
													savecanvases(sprite);
													savetracks(sprite);
													transform(sprite);
													drawtracks(sprite);
													for (var i=0; i<sprite.cars.length; i++)
 									 				{ 	
														drawline(sprite.cars[i]);
														sprite.cars[i].ctx.restore();
														sprite.cars[i].ctx.save();
									  				}
													restorecanvases(sprite);
													restoretracks(sprite);
													savecanvases(sprite);
													savetracks(sprite);																							
												break
											}
									}
	$('filmdivhandle').onmousedown = function() 
											{
												flmovetop=parseInt($('filmdivhandle').style.top);
												flmoveleft=parseInt($('filmdivhandle').style.left);
											};
		
	var fs =filmlist[flindx][4]/1000;
	if (isNaN(filmlist[flindx][5]))
	{
		var fe='ever';
	}
	else
	{
		var fe = filmlist[flindx][5]/1000;
	}
	var fa =filmlist[flindx][2]/1000;
	if (isNaN(filmlist[flindx][3]))
	{
		var fd='ever';
	}
	else
	{
		var fd = filmlist[flindx][3]/1000;
	}
	var zx = filmlist[flindx][6];
	var tp = filmlist[flindx][7];
	var lf = filmlist[flindx][8];
	var fin = filmlist[flindx][9]
	filmpm(curfilmtype,curfilmelm,fa,fd,fs,fe,zx,tp,lf,fin)
	for (var i=0; i<$('anielmorder').childNodes.length; i++)
	{
		$('anielmorder').childNodes[i].style.backgroundColor='transparent';
	}
	liobj.style.backgroundColor='yellow';
}

function moveliup()
{
	
	if ($('anielmorder').childNodes[0].style.backgroundColor=='yellow') {return}
	if ($('filmpropmenu')) {$('filmpropmenu').parentNode.removeChild($('filmpropmenu'))};
	var lifound=false;
	var i=1;
	while ( i<$('anielmorder').childNodes.length  && !lifound)
	{
		if ($('anielmorder').childNodes[i].style.backgroundColor=='yellow')
		{
			var tmpZi=$('filmdiv'+$('anielmorder').childNodes[i-1].innerHTML.substr(4)).style.zIndex;
			$('filmdiv'+$('anielmorder').childNodes[i-1].innerHTML.substr(4)).style.zIndex=$('filmdiv'+$('anielmorder').childNodes[i].innerHTML.substr(4)).style.zIndex;
			$('filmdiv'+$('anielmorder').childNodes[i].innerHTML.substr(4)).style.zIndex=tmpZi;
			
			var tmptext=$('anielmorder').childNodes[i-1].innerHTML;
			$('anielmorder').childNodes[i-1].innerHTML=$('anielmorder').childNodes[i].innerHTML;
			$('anielmorder').childNodes[i].innerHTML=tmptext;
			
			lifound=true;
			$('anielmorder').childNodes[i].style.backgroundColor='transparent';
			$('anielmorder').childNodes[i-1].style.backgroundColor='yellow';
		}
		i++;
	}
	if (!lifound)
	{
		alert('None of list selected');
	}
}

function movelidown()
{
	
	if ($('anielmorder').childNodes[$('anielmorder').childNodes.length-1].style.backgroundColor=='yellow') {return};
	if ($('filmpropmenu')) {$('filmpropmenu').parentNode.removeChild($('filmpropmenu'))};
	var lifound=false;
	var i=0;
	while ( i<$('anielmorder').childNodes.length  && !lifound)
	{
		if ($('anielmorder').childNodes[i].style.backgroundColor=='yellow')
		{
			var tmpZi=$('filmdiv'+$('anielmorder').childNodes[i+1].innerHTML.substr(4)).style.zIndex;
			$('filmdiv'+$('anielmorder').childNodes[i+1].innerHTML.substr(4)).style.zIndex=$('filmdiv'+$('anielmorder').childNodes[i].innerHTML.substr(4)).style.zIndex;
			$('filmdiv'+$('anielmorder').childNodes[i].innerHTML.substr(4)).style.zIndex=tmpZi;
			
			var tmptext=$('anielmorder').childNodes[i+1].innerHTML;
			$('anielmorder').childNodes[i+1].innerHTML=$('anielmorder').childNodes[i].innerHTML;			
			$('anielmorder').childNodes[i].innerHTML=tmptext;

			lifound=true;
			$('anielmorder').childNodes[i].style.backgroundColor='transparent';
			$('anielmorder').childNodes[i+1].style.backgroundColor='yellow';
		}
		i++;
	}
	if (!lifound)
	{
		alert('None of list selected');
	}
}

function setfilmcanvases(filmdiv,sprite)
{
	if (sprite.engine=='scene')
	{
		for (var i=0; i<sprite.train.cars.length; i++)
		{
			filmdiv.appendChild(sprite.train.cars[i]);
		}
		filmdiv.appendChild(sprite.track.line);
	}
	else
	{
		filmdiv.appendChild(sprite.track.line);
		setfilmcanvases(filmdiv,sprite.train);
	}
}

function filmfollowpath(sprite)
{
	guidepath(sprite);
	zeropointers(sprite);
	sprite.finishmove=false;
	savecanvases(sprite);
	savetracks(sprite);
}

function spritestart(sprite)
{
	if (sprite.track.visible)
	{
		drawline(sprite.track.line);
	}
	$('filmdiv'+sprite.name).style.visibility='visible';
}

function clearfilmdiv(nm)
{
	for (var i=0; i<$('filmdiv'+nm).childNodes.length; i++)
	{
		$('filmdiv'+nm).childNodes[i].ctx.clearRect(0,0,activewidth,activeheight);
	}
}

function editfilm()
{
	addtofilm=true;
	aniobj='film';
	buildobj();
	innerhtml ='EDIT FILM<br>';
	innerhtml +='Title <input type=text id="filmtitle" value="'+film.name+'"  size=7><br>';
	innerhtml +='<input type="button" id="shflm" value="Show" onclick="showstopfilm(this.value)"><br>';
	innerhtml +='<input type="button" value="Store" id="storefilm" onclick="redofilm()"><br>';
	innerhtml +='<input type="button" value="Cancel" id="cancelfilm" onclick="redrawcanvdiv();closefilm();rembld()"><br>';
	innerhtml +='<input type="button" value="Delete" id="delfilm" onclick="deletefilm();rembld()"><br>';
	$('bldmenu').innerHTML=innerhtml;
	var tempf;
	$('canvasdiv').style.visibility='hidden';
	$('filmsbar').style.visibility='visible';
	$('anielmorder').innerHTML='';
	filmlist=[];
	filmindxlist=[];
	for (var i=0; i<film.list.length; i++)
	{
		filmdiv = document.createElement('div');
		filmindxlist.push(film.list[i][1]);
		tempf=[];
		for (var j=0; j<10; j++)
		{
			tempf.push(film.list[i][j]);
		}
		filmlist.push(tempf);
		filmdiv.style.top=0;
		filmdiv.style.left=0;
		filmdiv.style.width=parseInt($('canvasdiv').style.width);
		filmdiv.style.height=parseInt($('canvasdiv').style.height);
		filmdiv.id='filmdiv'+film.list[i][1];
		filmdiv.style.zIndex=film.list[i][6];
		$('filmbodydiv').appendChild(filmdiv);
		$('anielmorder').innerHTML +='<li id="filmelmt'+filmlist[i][1]+'" onclick="setitem(this)" style="cursor:pointer" > '+filmlist[i][0]+' '+filmlist[i][1]+'</li>';
		drawfilmelm(filmlist[i][1],filmlist[i][0]);
	}
	$('filmbodydiv').style.visibility='visible';
	$('msgblank').style.visibility='hidden';
	if ($('bldinr')) {$('bldinr').parentNode.removeChild($('bldinr'))};
}

function redofilm()
{
	var fname=$('filmtitle').value;
	var re = /\W/;
	if (re.test(fname))
	{
		alert('Title should contain only letters and numbers.');
		return;
	}
	if (fname!=film.name)
	{
		film=new cfilm($('filmtitle').value.trim());
		films[fname]=film;
		$('filmhold').innerHTML +='<div id="film|'+film.name+'"><img src="assets/edit.png" style="cursor:pointer" alt="edit" title="edit" onclick="aniedit(this)">&nbsp;&nbsp;&nbsp;<span onclick="usename(this.innerHTML,'+squote+'film'+squote+')" style="cursor:pointer">'+film.name+'</span></div><br>';
	}
	else
	{
		var doit = confirm('Do you want to overwrite '+film.name+'?');
		if (!doit) {return}
	}
	film.list=[];
	redrawcanvdiv();
	setfilm();
}

function deletefilm()
{
	var ans=confirm('Do you really want to delete the film '+film.name+' ?');
	if (ans) 
	{
		delete films[film.name];
		var sid = $('film|'+film.name);
		var pid =sid.parentNode; 
		sid.parentNode.removeChild(sid.nextSibling);
		sid.parentNode.removeChild(sid);
	}
	for (var i=0; i<filmlist.length;i++)
	{	
		$('filmdiv'+filmlist[i][1]).parentNode.removeChild($('filmdiv'+filmlist[i][1]));
	}
	$('filmbodydiv').style.visibility='hidden';
	redrawcanvdiv();
	$('canvasdiv').style.visibility='visible';
	$('filmdivhandle').style.visibility='hidden';
	if ($('filmpropmenu')) {$('filmpropmenu').parentNode.removeChild($('filmpropmenu'))};
	addtofilm=false;
	
}

function filmrestorestart()
{
	var sprite;
	for (var i=0; i<filmlist.length;i++)
	{
		$('filmdiv'+filmlist[i][1]).style.visibility='visible';
		if (filmlist[i][0]=='SP')
		{
			sprite=sprites[filmlist[i][1]];
			redrawfilmelm(filmlist[i][1],filmlist[i][0]);
		}
	}
	$('filmsbar').style.visibility='visible';
	$('storefilm').style.visibility='visible';
	$('cancelfilm').style.visibility='visible';
	if ($('delfilm')) {$('delfilm').style.visibility='visible'};
	$('msgblank').style.visibility='hidden';
}

function redrawfilmelm(s,t)
{
	switch (t)
	{
		case "SP":
			sprite=sprites[s];
			guidepath(sprite);
			zeropointers(sprite);
			clearfilmdiv(sprite.name);
			if (sprite.track.visible)
			{
				drawline(sprite.track.line);
			}
			savecanvases(sprite);
			savetracks(sprite);
			transform(sprite);
			drawtracks(sprite);
			for (var i=0; i<sprite.cars.length; i++)
			{ 	
				drawline(sprite.cars[i]);
				sprite.cars[i].ctx.restore();
				sprite.cars[i].ctx.save();
			}
			restorecanvases(sprite);
			restoretracks(sprite);
			savecanvases(sprite);
			savetracks(sprite);
		break;
		case "TW":
		alert('Not yet available')
		break;
		case "TR":

		break
		case "FI":
			
		break
	}	
}

function changespritescene(sprite,oldn,newn)
{
	if (sprite.engine=='scene')
	{
		if (sprite.train.name==oldn)
		{
			sprite.train=scenes[newn]
		}
	}
	else
	{
		changespritescene(sprite.train,oldn,newn)
	}
}

function changefilmscene(film,oldn,newn)
{
	for(var i=0; i<film.list.length; i++)
	{
		if (film.list[i][0]=='SC' && film.list[i][1]==oldn)
		{
			film.list[i][1]=newn;
		}
	}
}

function changespritetrack(sprite,oldn,newn)
{
	if (sprite.track.name==oldn)
	{
		sprite.track=tracks[newn]
	}
	if (sprite.engine!='scene')
	{
		changespritetrack(sprite.train,oldn,newn)
	}
}

function changespritesprite(sprite,oldn,newn)
{
	if (sprite.train.name==oldn)
	{
		sprite.train=sprites[newn]
	}
	if (sprite.engine!='scene')
	{
		changespritesprite(sprite.train,oldn,newn)
	}
}

function changefilmsprite(film,oldn,newn)
{
	for(var i=0; i<film.list.length; i++)
	{
		if (film.list[i][0]=='SP' && film.list[i][1]==oldn)
		{
			film.list[i][1]=newn;
		}
	}
}