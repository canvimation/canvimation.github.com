/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function totext()
{
	undobld();
	totextbox();
}

function canvastotext()
{
	var params='canvas^'+magscale+'|'+canvleft+'|'+canvtop+'|'+actualwidth+'|'+actualheight+'|'+$("canvasdiv").childNodes.length+'*';
	for(var i=0;i<$("canvasdiv").childNodes.length;i++)
	{
		params+=storeinparams($("canvasdiv").childNodes[i])+'*';
	}
	params=params.slice(0,-1);
	var newwindow=window.open('','_blank');
 	newwindow.document.write(params);
	newwindow.document.close();
}


function scenetotext(s)
{
	var params='';
	for(var i=0;i<s.cars.length;i++)
	{
		params+=storeinparams(s.cars[i])+'*';
	}
	params=params.slice(0,-1);
	return params;
}

function spritetotext(s)
{
	var params ='';
	params +=recsprite(s);
	return params;
	
	
	function recsprite(s)
	{
		if (s.engine=='scene')
		{
			var pt=spriteparams(s);
			pt +=s.track.name+'|'+s.track.repeats+'|';
			if (s.track.visible)
			{
				pt +='1|';
			}
			else
			{
				pt +='-1|';
			}	
			if (s.track.yoyo)
			{
				pt +='1*';
			}
			else
			{
				pt +='-1*';
			}
			pt +=tracktotext(s.track)+'~';
			pt +=s.train.name+'|'+s.train.cars.length+'*';
			pt +=scenetotext(s.train)+'~';
			return pt;
		}
		else
		{
			var pt=spriteparams(s);
			pt +=s.track.name+'|'+s.track.repeats+'|';
			if (s.track.visible)
			{
				pt +='1|';
			}
			else
			{
				pt +='-1|';
			}	
			if (s.track.yoyo)
			{
				pt +='1*';
			}
			else
			{
				pt +='-1*';
			}
			pt +=tracktotext(s.track)+'~';
			return recsprite(s.train)+pt;
		}
	}
	
	function spriteparams(s)
	{
		var pt= s.name+'|'+s.engine+'|'+s.ptime+'|'+s.pointer+'|';
		if (s.vec)
		{
			pt += '1|';
		}
		else
		{
			pt +='-1|';
		}
		pt +=s.vector.xs+'|'+s.vector.xe+'|'+s.vector.ys+'|'+s.vector.ye+'|'+s.vector.psi+'~';
		return pt;
	}
}

function tweentotext(s)
{
	
}

function tracktotext(s)
{
	var params='';
	params+=storeinparams(s.line);
	return params;
}

function filmtotext(f)
{
	var params='';
	for (var i=0; i<f.list.length; i++)
	{
		for (var j=0; j<9; j++)
		{
			params +=f.list[i][j]+':';
		}
		if (f.list[i][9])
		{
			params +='1!';
		}
		else
		{
			params +='-1!';
		}
		switch (film.list[i][0])
		{
			case 'SC':
				params +=scenetotext(scenes[film.list[i][1]]);
				params=params.slice(0,-1);
			break
			case 'SP':
				params +=spritetotext(sprites[film.list[i][1]]);
				params=params.slice(0,-1);
			break
		}
		params +='@';
	}
	return params;
}

function canceltotext()
{
	if ($('boxto')) {$('boxto').parentNode.removeChild($('boxto'))};
}

function storeinparams(canv)
{
	var cprm='';
	
	cprm+=canv.bleft+'|';
	cprm+=canv.btop+'|';
	cprm+=canv.bwidth+'|';
	cprm+=canv.bheight+'|';
	cprm+=canv.scleft+'|';
	cprm+=canv.sctop+'|';
	cprm+=canv.scx+'|';
	cprm+=canv.scy+'|';
	cprm+=canv.sox+'|';
	cprm+=canv.soy+'|';
	cprm+=canv.ox+'|';
	cprm+=canv.oy+'|';
	cprm+=canv.sox+'|';
	cprm+=canv.cx+'|';
	cprm+=canv.cy+'|';
	cprm+=canv.rr+'|';
	cprm+=canv.phi+'|';
	if (canv.rotated)
	{
		cprm+=1+'|';
	}
	else
	{
		cprm+=-1+'|';
	}
	cprm+=canv.ratio+'|';
	cprm+= canv.strokeStyle.join()+'|';
	cprm+= canv.fillStyle.join()+'|';
	cprm+=canv.lineWidth+'|';
	cprm+=canv.lineCap+'|';
	cprm+=canv.lineJoin+'|';
	if (canv.justfill)
	{
		cprm+=1+'|';
	}
	else
	{
		cprm+=-1+'|';
	}	
	if (canv.linearfill)
	{
		cprm+=1+'|';
	}
	else
	{
		cprm+=-1+'|';
	}
	cprm+= canv.lineGrad.join()+'|';
	cprm+= canv.radGrad.join()+'|';

	var carray=[];
	for (j=0;j<canv.colorStops.length;j++)
	{
		carray[j]=[];
		for (k=0;k<5;k++)
		{
			carray[j][k]=canv.colorStops[j][k];
		}
	}
	
	
	for (j=0;j<carray.length;j++)
	{
		carray[j]=carray[j].join();
	}
	carray=carray.join(":");
	
	cprm+=carray+'|';

	cprm+=canv.stopn+'|';

	if (canv.shadow)
	{
		cprm+=1+'|';
	}
	else
	{
		cprm+=-1+'|';
	}

	cprm+=canv.shadowOffsetX+'|';
	cprm+=canv.shadowOffsetY+'|';
	cprm+=canv.shadowBlur+'|';
	cprm+= canv.shadowColor.join()+'|';
	cprm+=canv.ScaleX+'|';
	cprm+=canv.ScaleY+'|';
	cprm+=canv.zIndex+'|';
	cprm+=canv.rotate+'|';
	if (canv.clockw)
	{
		cprm+=1+'|';
	}
	else
	{
		cprm+=-1+'|';
	}
	if (canv.complete)
	{
		cprm+=1+'|';
	}
	else
	{
		cprm+=-1+'|';
	}
	cprm+= canv.group.join()+'|';
	cprm+='empty'+'|';
	cprm+= canv.beztypes.join()+'|';

	for (j=0;j<2;j++)
	{
		cprm+=canv.path[j]+',';
	}
	cprm+=canv.path[2]+'|';
	carray=[];
	for (j=3;j<canv.path.length;j++)
	{
		carray[j-3]=[];
		for (k=0;k<canv.path[j].length;k++)
		{
			carray[j-3][k]=canv.path[j][k];
		}
	}
	
	for (j=0;j<carray.length;j++)
	{
		carray[j]=carray[j].join();
	}
	carray=carray.join(":");
	cprm+=carray+'|';
	cprm+=canv.radius+'|';
	cprm+=canv.id;
	return cprm;
}


function totextbox(txt)
{
	canceltotext();	
	box=document.createElement('div');
	box.id='boxto';
	box.style.zIndex=20000024
	box.style.top=screen.availHeight*0.10;
	box.style.left=screen.availWidth*0.25;
	box.style.height=screen.availHeight*0.50;
	box.style.width=screen.availWidth*0.25;
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
	headbox.innerHTML='&nbsp;&nbsp;Export Elements as Text';
	box.appendChild(headbox);
	innerbox=document.createElement('div');
	innerbox.style.top=70;
	innerbox.style.left=10;
	innerbox.style.height=parseInt(box.style.height)-120;
	innerbox.style.width=parseInt(box.style.width)-20;
	innerbox.style.backgroundColor='#00FFFF';
	innerbox.style.border='solid 1px black';
	innerbox.style.overflow='auto';
	box.appendChild(innerbox);

	var innerhtml = 'Select the Elements you want to Export.<br><br>';
	innerhtml +='Canvas<br>'
	innerhtml += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="cbcanvas">Contents<br>';
	filmhtml='';
	for (var pp in films)
	{
		filmhtml += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="cb'+films[pp].name+'">'+films[pp].name+'<br>';
	}
	if (filmhtml !='')
	{
		filmhtml='Films<br>'+filmhtml;
	}
	innerhtml +=filmhtml;
	innerbox.innerHTML=innerhtml;
	spritehtml='';
	for (var pp in sprites)
	{
		spritehtml += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="cb'+sprites[pp].name+'" >'+sprites[pp].name+'<br>';
	}
	if (spritehtml !='')
	{
		spritehtml='Sprites<br>'+spritehtml;
	}
	innerhtml +=spritehtml;
	innerbox.innerHTML=innerhtml;
	scenehtml='';
	for (var pp in scenes)
	{
		scenehtml += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="cb'+scenes[pp].name+'" >'+scenes[pp].name+'<br>';
	}
	if (scenehtml !='')
	{
		scenehtml='Scenery<br>'+scenehtml;
	}
	innerhtml +=scenehtml;
	innerbox.innerHTML=innerhtml;
	tweenhtml='';
	for (var pp in tweens)
	{
		tweenhtml += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="cb'+tweens[pp].name+'">'+tweens[pp].name+'<br>';
	}
	if (tweenhtml !='')
	{
		tweenhtml='Tweens<br>'+tweenhtml;
	}
	innerhtml +=tweenhtml;
	innerbox.innerHTML=innerhtml;
	trackhtml='';
	for (var pp in tracks)
	{
		trackhtml += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="cb'+tracks[pp].name+'">'+tracks[pp].name+'<br>';
	}
	if (trackhtml !='')
	{
		trackhtml='Tracks<br>'+trackhtml;
	}
	innerhtml +=trackhtml;
	innerbox.innerHTML=innerhtml;
	
	cin=document.createElement('input');
	cin.style.position='absolute'
	cin.style.left=20;
	cin.style.top=parseInt(box.style.height)-35;
	cin.type='button';
	cin.value='Export Files';
	cin.onclick=function () {exporttotext()};
	box.appendChild(cin);
	cin=document.createElement('input');
	cin.style.position='absolute'
	cin.style.left=120;
	cin.style.top=parseInt(box.style.height)-35;
	cin.type='button';
	cin.value='Cancel';
	cin.onclick=function () {canceltotext()};
	box.appendChild(cin);
}

function exporttotext()
{
	if ($('cbcanvas').checked)
	{
		canvastotext();
	}
	for (var pp in scenes)
	{
		if($('cb'+scenes[pp].name).checked)
		{
			var sctxt='scene^'+scenes[pp].name+'|'+scenes[pp].cars.length+'*';
			sctxt+=scenetotext(scenes[pp]);
			var re = /[\s\r]+/g;
	 		sctxt=sctxt.replace(re,'`');
			var newwindow=window.open('','Scenery - '+scenes[pp].name);
 			newwindow.document.write(sctxt);
			newwindow.document.close();
		}
	}
	for (var pp in sprites)
	{
		if($('cb'+sprites[pp].name).checked)
		{
			var sprtxt='sprite^';
			sprtxt+=spritetotext(sprites[pp]);
			sprtxt=sprtxt.slice(0,-1);
			var re = /[\s\r]+/g;
	 		sprtxt=sprtxt.replace(re,'`');
			var newwindow=window.open('','Sprite - '+sprites[pp].name);
 			newwindow.document.write(sprtxt);
			newwindow.document.close();
		}
	}
	for (var pp in tweens)
	{
		if($('cb'+tweens[pp].name).checked)
		{
			tweentotext(tweens[pp])
		}
	}
	for (var pp in tracks)
	{
		if($('cb'+tracks[pp].name).checked)
		{
			var trktxt='track^'+tracks[pp].name+'|'+tracks[pp].repeats+'|';
			if (tracks[pp].visible)
			{
				trktxt +='1|';
			}
			else
			{
				trktxt +='-1|';
			}	
			if (tracks[pp].yoyo)
			{
				trktxt +='1*';
			}
			else
			{
				trktxt +='-1*';
			}
			trktxt+=tracktotext(tracks[pp]);
			var re = /[\s\r]+/g;
	 		trktxt=trktxt.replace(re,'`');
			var newwindow=window.open('','track - '+tracks[pp].name);
 			newwindow.document.write(trktxt);
			newwindow.document.close();
		}
	}
	for (var pp in films)
	{
		if($('cb'+films[pp].name).checked)
		{
			var flmtxt='film^'+film.name+'@';
			flmtxt+=filmtotext(films[pp]);
			flmtxt=flmtxt.slice(0,-1);
			var re = /[\s\r]+/g;
	 		flmtxt=flmtxt.replace(re,'`');
			var newwindow=window.open('','_blank');
 			newwindow.document.write(flmtxt);
			newwindow.document.close();
		}
	}
}