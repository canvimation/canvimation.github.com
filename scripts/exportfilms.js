/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function writeFilm()
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
	headbox.innerHTML='&nbsp;&nbsp;Export Films as HTML';
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

	var innerhtml = 'Select the Films you want to Export.<br><br>';
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
	
	cin=document.createElement('input');
	cin.style.position='absolute'
	cin.style.left=20;
	cin.style.top=parseInt(box.style.height)-35;
	cin.type='button';
	cin.value='Export Films';
	cin.onclick=function () {exportfilms()};
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

function exportfilms()
{
	for (var film in films)
	{
		if($('cb'+film).checked)
		{
			writeFilmHTML(films[film]);
		}
	}
}

function writeFilmHTML(film)
{
	if(film.list.length==0)
	{
		alert('No work to export');
		return
	}	
	spaces=" ".repeat(100);
	newwindow=window.open(film.name,film.name);
	newwindow.document.writeln('<html>');
	newwindow.document.writeln(spaces.substr(0,3)+'<head>');
	newwindow.document.writeln(spaces.substr(0,6)+'<style>');
	newwindow.document.writeln(spaces.substr(0,9)+'#screen');
	newwindow.document.writeln(spaces.substr(0,9)+'{');
	newwindow.document.writeln(spaces.substr(0,12)+'position:absolute;');
	newwindow.document.writeln(spaces.substr(0,12)+'height:'+actualheight+'px;');
	newwindow.document.writeln(spaces.substr(0,12)+'width:'+actualwidth+'px;');
	newwindow.document.writeln(spaces.substr(0,12)+'clip:rect(0px,'+(parseInt(actualwidth)+2)+'px,'+(parseInt(actualheight)+2)+'px,0px);');
	newwindow.document.writeln(spaces.substr(0,12)+'border:black 1px solid;');
	newwindow.document.writeln (spaces.substr(0,9)+'}');
	newwindow.document.writeln(spaces.substr(0,6)+'</style>');	
	newwindow.document.writeln ('');
	newwindow.document.writeln(spaces.substr(0,6)+'<script type="text/javascript" src = "canvimation_functions.js" ></script>');
	newwindow.document.writeln(spaces.substr(0,6)+'<!--[IF IE]><script type="text/javascript" src = "excanvas.js" ></script><![endif]-->');
	newwindow.document.writeln(spaces.substr(0,6)+'<script type="text/javascript">');
	newwindow.document.writeln(spaces.substr(0,9)+'ieb=navigator.appName=="Microsoft Internet Explorer";');
	newwindow.document.writeln(spaces.substr(0,9)+'var scenes = {}');
	newwindow.document.writeln(spaces.substr(0,9)+'var sprites = {}');
	newwindow.document.writeln(spaces.substr(0,9)+'var tracks = {}');
	newwindow.document.writeln(spaces.substr(0,9)+'var frames = {}');
	newwindow.document.writeln ('');
	newwindow.document.writeln(spaces.substr(0,9)+'if(typeof String.prototype.trim !== "function")')
	newwindow.document.writeln(spaces.substr(0,9)+'{')
	newwindow.document.writeln(spaces.substr(0,12)+'String.prototype.trim = function()')
	newwindow.document.writeln(spaces.substr(0,12)+'{')
	newwindow.document.writeln(spaces.substr(0,15)+'return this.replace(/^\s+|\s+$/g, ""); ')
	newwindow.document.writeln(spaces.substr(0,12)+'}')
	newwindow.document.writeln(spaces.substr(0,9)+'}')
	newwindow.document.writeln(spaces.substr(0,9)+'')
	newwindow.document.writeln(spaces.substr(0,9)+'if(!Array.indexOf)')
	newwindow.document.writeln(spaces.substr(0,9)+'{')
	newwindow.document.writeln(spaces.substr(0,12)+'Array.prototype.indexOf = function(obj)')
	newwindow.document.writeln(spaces.substr(0,12)+'{')
	newwindow.document.writeln(spaces.substr(0,15)+'for(var i=0; i<this.length; i++)')
	newwindow.document.writeln(spaces.substr(0,15)+'{')
	newwindow.document.writeln(spaces.substr(0,18)+'if(this[i]==obj)')
	newwindow.document.writeln(spaces.substr(0,18)+'{')
	newwindow.document.writeln(spaces.substr(0,21)+'return i;')
	newwindow.document.writeln(spaces.substr(0,18)+'}')
	newwindow.document.writeln(spaces.substr(0,15)+'}')
	newwindow.document.writeln(spaces.substr(0,15)+'return -1;')
	newwindow.document.writeln(spaces.substr(0,12)+'}')
	newwindow.document.writeln(spaces.substr(0,9)+'}')
	newwindow.document.writeln(spaces.substr(0,9)+'')
	newwindow.document.writeln(spaces.substr(0,9)+'function $(id)')
	newwindow.document.writeln(spaces.substr(0,9)+'{')
	newwindow.document.writeln(spaces.substr(0,12)+'return document.getElementById(id);')
	newwindow.document.writeln(spaces.substr(0,9)+'}')

	newwindow.document.writeln ('');
	newwindow.document.writeln(spaces.substr(0,9)+'film =');
	newwindow.document.writeln(spaces.substr(0,9)+'{');
	newwindow.document.writeln(spaces.substr(0,12)+'name:"'+film.name+'",');
	newwindow.document.writeln(spaces.substr(0,12)+'list:[');
	var tmplist;
	for (var i=0; i<film.list.length-1; i++)
	{
		tmplist='[';
		for (var j=0; j<7; j++)
		{
			if (isNaN(film.list[i][j]))
			{
				tmplist +='"'+film.list[i][j]+'",';
			}
			else
			{
				tmplist +=film.list[i][j]+',';
			}
		}
		tmplist +=film.list[i][9]+'],';
		newwindow.document.writeln(spaces.substr(0,15)+tmplist);														 
	}
	tmplist='[';
	for (var j=0; j<7; j++)
	{
		if (isNaN(film.list[i][j]))
		{
			tmplist +='"'+film.list[i][j]+'",';
		}
		else
		{
			tmplist +=film.list[i][j]+',';
		}
	}
	tmplist +=film.list[i][9]+']';
	newwindow.document.writeln(spaces.substr(0,15)+tmplist);
	newwindow.document.writeln(spaces.substr(0,12)+']');													  
	newwindow.document.writeln(spaces.substr(0,9)+'}');
	newwindow.document.writeln ('');
	for (var i=0; i<film.list.length; i++)
	{
		newwindow.document.writeln(spaces.substr(0,0)+'//Film Element '+film.list[i][1]+'**********************************************');
		switch (film.list[i][0])
		{
			case 'SC':
				writescene(scenes[film.list[i][1]],film.list[i][1]);
			break
			case 'SP':
				writesprite(sprites[film.list[i][1]],film.list[i][1]);
			break
		}
	}

	newwindow.document.writeln(spaces.substr(0,9)+'function startfilm()');
	newwindow.document.writeln(spaces.substr(0,9)+'{');
	newwindow.document.writeln(spaces.substr(0,12)+'$("screen").style.left=0; // change to move screen position');
	newwindow.document.writeln(spaces.substr(0,12)+'$("screen").style.top=0; // change to move screen position');
	newwindow.document.writeln(spaces.substr(0,12)+'for (var i=0; i<film.list.length; i++)');
	newwindow.document.writeln(spaces.substr(0,12)+'{');
	newwindow.document.writeln(spaces.substr(0,15)+'filmdiv = document.createElement("div");');
	newwindow.document.writeln(spaces.substr(0,15)+'filmdiv.id = "filmdiv"+film.list[i][1];');
	newwindow.document.writeln(spaces.substr(0,15)+'filmdiv.style.position = "absolute";');
	newwindow.document.writeln(spaces.substr(0,15)+'filmdiv.style.left = 0;');
	newwindow.document.writeln(spaces.substr(0,15)+'filmdiv.style.top = 0;');
	newwindow.document.writeln(spaces.substr(0,15)+'filmdiv.style.zIndex = film.list[i][6];');
	newwindow.document.writeln(spaces.substr(0,15)+'$("screen").appendChild(filmdiv);');
	newwindow.document.writeln(spaces.substr(0,12)+'}');
	
	newwindow.document.writeln(spaces.substr(0,12)+'for (var fr in frames)');
	newwindow.document.writeln(spaces.substr(0,12)+'{');
	newwindow.document.writeln(spaces.substr(0,15)+'frame = frames[fr];');
	newwindow.document.writeln(spaces.substr(0,15)+'canvas = document.createElement("canvas");');
	newwindow.document.writeln(spaces.substr(0,15)+'canvas.style.position="absolute";');
	newwindow.document.writeln(spaces.substr(0,15)+'canvas.style.top='+(-parseInt($("canvasframe").style.top)+52)+';');
	newwindow.document.writeln(spaces.substr(0,15)+'canvas.style.left='+(-parseInt($("canvasframe").style.left)+0)+';');
	newwindow.document.writeln(spaces.substr(0,15)+'canvas.width = frame.width;');
	newwindow.document.writeln(spaces.substr(0,15)+'canvas.height = frame.height;');
	newwindow.document.writeln(spaces.substr(0,15)+'canvas.style.zIndex = frame.zIndex;');
	newwindow.document.writeln(spaces.substr(0,15)+'$(frame.parent).appendChild(canvas);');
	newwindow.document.writeln(spaces.substr(0,15)+'if (ieb) {canvas=G_vmlCanvasManager.initElement(canvas)}');
	newwindow.document.writeln(spaces.substr(0,15)+'if (canvas.getContext)');
	newwindow.document.writeln(spaces.substr(0,15)+'{');
	newwindow.document.writeln(spaces.substr(0,18)+'canvas.ctx = canvas.getContext("2d");');
	newwindow.document.writeln(spaces.substr(0,18)+'canvas.ctx.scale(1,1);');
	newwindow.document.writeln(spaces.substr(0,15)+'}');
	newwindow.document.writeln(spaces.substr(0,15)+'frame.ctx=canvas.ctx;');
	newwindow.document.writeln(spaces.substr(0,15)+'canvas.frame=frame;');
	newwindow.document.writeln(spaces.substr(0,12)+'}');
	newwindow.document.writeln(spaces.substr(0,12)+'showfilm();')
	newwindow.document.writeln(spaces.substr(0,9)+'}');
	;
	newwindow.document.writeln(spaces.substr(0,6)+'</script>'); 
	newwindow.document.writeln(spaces.substr(0,3)+'</head>');
	newwindow.document.writeln(spaces.substr(0,3)+'<body onload="startfilm()">');
	newwindow.document.writeln(spaces.substr(0,6)+'<div id="screen"></div>'); 
	
	newwindow.document.writeln(spaces.substr(0,3)+'</body>');
	newwindow.document.writeln('</html>');
	newwindow.document.close();
}


function writesprite(sprite,filmel)
{
	if (sprite.engine=='scene')
	{
		writescene(sprite.train,filmel);
		writetrack(sprite.track,filmel);
		guidepath(sprite);
		newwindow.document.writeln(spaces.substr(0,9)+'sprites["'+sprite.name+'"] =');
		newwindow.document.writeln(spaces.substr(0,9)+'{');
		newwindow.document.writeln(spaces.substr(0,12)+'name:"'+sprite.name+'",');
		newwindow.document.writeln(spaces.substr(0,12)+'engine:"'+sprite.engine+'",');
		newwindow.document.writeln(spaces.substr(0,12)+'ptime:'+sprite.ptime+',');
		newwindow.document.writeln(spaces.substr(0,12)+'pointer:'+sprite.pointer+',');
		newwindow.document.writeln(spaces.substr(0,12)+'points:[');
		for (var i=0; i<sprite.points.length; i++)
		{
			newwindow.document.writeln(spaces.substr(0,15)+'{x:'+sprite.points[i].x+',y:'+sprite.points[i].y+',phi:'+sprite.points[i].phi+'},');	
		}
		newwindow.document.writeln(spaces.substr(0,12)+'],');
		newwindow.document.writeln(spaces.substr(0,12)+'vec:'+sprite.vec+',');
		newwindow.document.writeln(spaces.substr(0,12)+'vector:');
		newwindow.document.writeln(spaces.substr(0,12)+'{');
		newwindow.document.writeln(spaces.substr(0,15)+'xs:'+sprite.vector.xs+',');
		newwindow.document.writeln(spaces.substr(0,15)+'xe:'+sprite.vector.xe+',');
		newwindow.document.writeln(spaces.substr(0,15)+'ys:'+sprite.vector.ys+',');
		newwindow.document.writeln(spaces.substr(0,15)+'ye:'+sprite.vector.ye+',');
		newwindow.document.writeln(spaces.substr(0,15)+'psi:'+sprite.vector.psi);
		newwindow.document.writeln(spaces.substr(0,12)+'},');
		newwindow.document.writeln(spaces.substr(0,12)+'train:scenes["'+sprite.train.name+'"],');
		newwindow.document.writeln(spaces.substr(0,12)+'track:tracks["'+sprite.track.name+'"],');												  
		newwindow.document.writeln(spaces.substr(0,9)+'}');
		newwindow.document.writeln ('');
		newwindow.document.writeln(spaces.substr(0,9)+'sprite=sprites["'+sprite.name+'"];');
		newwindow.document.writeln(spaces.substr(0,9)+'sprite.cars = sprite.train.cars;');
		newwindow.document.writeln ('');
	}
	else
	{
		writesprite(sprite.train,filmel);
		writetrack(sprite.track,filmel);
		guidepath(sprite);
		newwindow.document.writeln(spaces.substr(0,9)+'sprites["'+sprite.name+'"] =');
		newwindow.document.writeln(spaces.substr(0,9)+'{');
		newwindow.document.writeln(spaces.substr(0,12)+'name:"'+sprite.name+'",');
		newwindow.document.writeln(spaces.substr(0,12)+'engine:"'+sprite.engine+'",');
		newwindow.document.writeln(spaces.substr(0,12)+'ptime:'+sprite.ptime+',');
		newwindow.document.writeln(spaces.substr(0,12)+'pointer:'+sprite.pointer+',');
		newwindow.document.writeln(spaces.substr(0,12)+'points:[');
		for (var i=0; i<sprite.points.length; i++)
		{
			newwindow.document.writeln(spaces.substr(0,15)+'{x:'+sprite.points[i].x+',y:'+sprite.points[i].y+',phi:'+sprite.points[i].phi+'},');	
		}
		newwindow.document.writeln(spaces.substr(0,12)+'],');
		newwindow.document.writeln(spaces.substr(0,12)+'vec:'+sprite.vec+',');
		newwindow.document.writeln(spaces.substr(0,12)+'vector:');
		newwindow.document.writeln(spaces.substr(0,12)+'{');
		newwindow.document.writeln(spaces.substr(0,15)+'xs:'+sprite.vector.xs+',');
		newwindow.document.writeln(spaces.substr(0,15)+'xe:'+sprite.vector.xe+',');
		newwindow.document.writeln(spaces.substr(0,15)+'ys:'+sprite.vector.ys+',');
		newwindow.document.writeln(spaces.substr(0,15)+'ye:'+sprite.vector.ye+',');
		newwindow.document.writeln(spaces.substr(0,15)+'psi:'+sprite.vector.psi);
		newwindow.document.writeln(spaces.substr(0,12)+'},');
		newwindow.document.writeln(spaces.substr(0,12)+'train:sprites["'+sprite.train.name+'"],');
		newwindow.document.writeln(spaces.substr(0,12)+'track:tracks["'+sprite.track.name+'"]');												  
		newwindow.document.writeln(spaces.substr(0,9)+'}');
		newwindow.document.writeln ('');
		newwindow.document.writeln(spaces.substr(0,9)+'sprite=sprites["'+sprite.name+'"];');
		newwindow.document.writeln(spaces.substr(0,9)+'sprite.cars = sprite.train.cars;');
		newwindow.document.writeln ('');
	}
}

function writescene(scene,filmel)
{
	newwindow.document.writeln(spaces.substr(0,9)+'cars=[]');
	for (var i=0; i<scene.cars.length; i++)
	{
		newwindow.document.writeln(spaces.substr(0,9)+'');
		newwindow.document.writeln(spaces.substr(0,3)+'//scene frame start..................................');
		newwindow.document.writeln(spaces.substr(0,9)+'');
		createframe(scene.cars[i],filmel);
		newwindow.document.writeln(spaces.substr(0,9)+'var frame=frames["'+scene.cars[i].id+'"];');
		newwindow.document.writeln(spaces.substr(0,9)+'cars.push(frame)');
		newwindow.document.writeln(spaces.substr(0,9)+'');
		newwindow.document.writeln(spaces.substr(0,3)+'//scene frame end..................................');
		newwindow.document.writeln(spaces.substr(0,9)+'');
	}
	
	newwindow.document.writeln(spaces.substr(0,9)+'scenes["'+scene.name+'"] = ');
	newwindow.document.writeln(spaces.substr(0,9)+'{');
	newwindow.document.writeln(spaces.substr(0,12)+'name:"'+scene.name+'",');
	newwindow.document.writeln(spaces.substr(0,12)+'cars:cars');
	newwindow.document.writeln(spaces.substr(0,9)+'}');
}

function writetrack(track,filmel)
{
	newwindow.document.writeln(spaces.substr(0,9)+'');
	newwindow.document.writeln(spaces.substr(0,3)+'//track frame start..................................');
	newwindow.document.writeln(spaces.substr(0,9)+'');
	createframe(track.line,filmel);
	newwindow.document.writeln(spaces.substr(0,9)+'var frame=frames["'+track.line.id+'"];');	
	newwindow.document.writeln(spaces.substr(0,9)+'');
	newwindow.document.writeln(spaces.substr(0,3)+'//track frame end..................................');
	newwindow.document.writeln(spaces.substr(0,9)+'');
	
	newwindow.document.writeln(spaces.substr(0,9)+'tracks["'+track.name+'"] = ');
	newwindow.document.writeln(spaces.substr(0,9)+'{');
	newwindow.document.writeln(spaces.substr(0,12)+'name:"'+track.name+'",');
	newwindow.document.writeln(spaces.substr(0,12)+'line:frame,');
	if (isNaN(track.repeats))
	{
		newwindow.document.writeln(spaces.substr(0,12)+'repeats:"c",');
	}
	else
	{
		newwindow.document.writeln(spaces.substr(0,12)+'repeats:'+track.repeats+',');
	}
	newwindow.document.writeln(spaces.substr(0,12)+'visible:'+track.visible+',');
	newwindow.document.writeln(spaces.substr(0,12)+'yoyo:'+track.yoyo);
	newwindow.document.writeln(spaces.substr(0,9)+'}');
	newwindow.document.writeln(spaces.substr(0,9)+'');
}

function createframe(frame,parent)
{
	frame.id = frame.id.trim();
	newwindow.document.writeln(spaces.substr(0,9)+'frames["'+frame.id+'"] =');
	newwindow.document.writeln(spaces.substr(0,9)+'{');
	newwindow.document.writeln(spaces.substr(0,12)+'id:"'+frame.id+'",');
	newwindow.document.writeln(spaces.substr(0,12)+'parent:"filmdiv'+parent+'",');
	var tempath='[';
	for (var i=0; i<3; i++)
	{
		tempath +='"'+frame.path[i]+'",'
	}
	for (var i=3;i<frame.path.length;i++)
	{
		tempath +='[';
		tempath +='"'+frame.path[i][0]+'",';
		for(var j=1; j<frame.path[i].length; j++)
		{
			tempath +=frame.path[i][j]+',';
		}
		tempath +='],';	
	}
	tempath = tempath.slice(0,-1);
	tempath +=']'; 
	newwindow.document.writeln(spaces.substr(0,12)+'path:'+tempath +',');
	newwindow.document.writeln(spaces.substr(0,12)+'width:'+frame.width +',');
	newwindow.document.writeln(spaces.substr(0,12)+'height:'+frame.height +',');
	newwindow.document.writeln(spaces.substr(0,12)+'bleft:'+frame.bleft +',');
	newwindow.document.writeln(spaces.substr(0,12)+'btop:'+frame.btop +',');
	newwindow.document.writeln(spaces.substr(0,12)+'bwidth:'+frame.bwidth +',');
	newwindow.document.writeln(spaces.substr(0,12)+'bheight:'+frame.bheight +',');
	newwindow.document.writeln(spaces.substr(0,12)+'scleft:'+frame.scleft +',');
	newwindow.document.writeln(spaces.substr(0,12)+'sctop:'+frame.sctop +',');
	newwindow.document.writeln(spaces.substr(0,12)+'scx:'+frame.scx +',');
	newwindow.document.writeln(spaces.substr(0,12)+'scy:'+frame.scy +',');
	newwindow.document.writeln(spaces.substr(0,12)+'sox:'+frame.sox +',');
	newwindow.document.writeln(spaces.substr(0,12)+'soy:'+frame.soy +',');
	newwindow.document.writeln(spaces.substr(0,12)+'ox:'+frame.ox +',');
	newwindow.document.writeln(spaces.substr(0,12)+'oy:'+frame.oy +',');
	newwindow.document.writeln(spaces.substr(0,12)+'cx:'+frame.cx +',');
	newwindow.document.writeln(spaces.substr(0,12)+'cy:'+frame.cy +',');
	newwindow.document.writeln(spaces.substr(0,12)+'rr:'+frame.rr +',');
	newwindow.document.writeln(spaces.substr(0,12)+'phi:'+frame.phi +',');
	newwindow.document.writeln(spaces.substr(0,12)+'rotated:'+frame.rotated +',');
	newwindow.document.writeln(spaces.substr(0,12)+'ratio:'+frame.ratio +',');
	newwindow.document.writeln(spaces.substr(0,12)+'strokeStyle:['+frame.strokeStyle +'],');
	newwindow.document.writeln(spaces.substr(0,12)+'fillStyle:['+frame.fillStyle +'],');
	newwindow.document.writeln(spaces.substr(0,12)+'lineWidth:'+frame.lineWidth +',');
	newwindow.document.writeln(spaces.substr(0,12)+'lineCap:"'+frame.lineCap +'",');
	newwindow.document.writeln(spaces.substr(0,12)+'lineJoin:"'+frame.lineJoin +'",');
	newwindow.document.writeln(spaces.substr(0,12)+'justfill:'+frame.justfill +',');
	newwindow.document.writeln(spaces.substr(0,12)+'linearfill:'+frame.linearfill +',');
	newwindow.document.writeln(spaces.substr(0,12)+'lineGrad:['+frame.lineGrad +'],');
	newwindow.document.writeln(spaces.substr(0,12)+'radGrad:['+frame.radGrad +'],');
	newwindow.document.writeln(spaces.substr(0,12)+'colorStops:[['+frame.colorStops[0]+'],['+frame.colorStops[1]+']],');
	newwindow.document.writeln(spaces.substr(0,12)+'stopn:'+frame.stopn +',');
	newwindow.document.writeln(spaces.substr(0,12)+'shadow:'+frame.shadow +',');
	newwindow.document.writeln(spaces.substr(0,12)+'shadowOffsetX:'+frame.shadowOffsetX +',');
	newwindow.document.writeln(spaces.substr(0,12)+'shadowOffsetY:'+frame.shadowOffsetY +',');
	newwindow.document.writeln(spaces.substr(0,12)+'shadowBlur:'+frame.shadowBlur +',');
	newwindow.document.writeln(spaces.substr(0,12)+'shadowColor:['+frame.shadowColor +'],');
	newwindow.document.writeln(spaces.substr(0,12)+'ScaleX:'+frame.ScaleX +',');
	newwindow.document.writeln(spaces.substr(0,12)+'ScaleY:'+frame.ScaleY +',');
	newwindow.document.writeln(spaces.substr(0,12)+'zIndex:'+frame.zIndex +',');
	newwindow.document.writeln(spaces.substr(0,12)+'rotate:'+frame.rotate +',');
	newwindow.document.writeln(spaces.substr(0,12)+'clockw:'+frame.clockw +',');
	newwindow.document.writeln(spaces.substr(0,12)+'complete:'+frame.complete +',');
	if(frame.beztypes.length>0)
	{
		var bezlist='';
		for(var i=0; i<frame.beztypes.length; i++)
		{
			bezlist +='"'+frame.beztypes[i]+'",';
		}
		bezlist=bezlist.slice(0,-1);
		newwindow.document.writeln(spaces.substr(0,12)+'beztypes:['+bezlist +'],');
	}
	else
	{
		newwindow.document.writeln(spaces.substr(0,12)+'beztypes:[],');
	}
	newwindow.document.writeln(spaces.substr(0,12)+'radius:'+frame.radius);
	newwindow.document.writeln(spaces.substr(0,9)+'}');
}