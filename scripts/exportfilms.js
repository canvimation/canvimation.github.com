/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function writeFilm()
{
	var nfls=0;
	for(var name in FILMS)
	{
		nfls++;
	}
	if(nfls==0)
	{
		alert("No films to export");
		return;
	}
	var flen=100;
	var filmhtml = "<p style='font-weight:bold'>Select the Films you want to Export.</p>";
	for (var name in FILMS)
	{
		flen+=25;
		film=FILMS[name];
		filmhtml+="<p class='check_input'>	<input type='checkbox' id='"+film.name+"'><label for='"+film.name+"'>"+film.name+"</label></p>"
	}
	filmhtml+="<input type='button' value=' Export ' onclick='exportFilms()' />	<input type='button' value=' Cancel ' onclick='closedialogue(this)' />"
	
	$("filmexportcontent").innerHTML=filmhtml;
	$("filmexportcontent").style.height=flen+"px";
	$("filmexportbox").style.height=(flen+25)+"px";
	$("filmexportbox").style.visibility="visible";
}

function exportFilms()
{
	var filmwrit=false;
	for (var name in FILMS)
	{
		if($(name).checked)
		{
			filmwrit=true;
			writeFilmHTML(FILMS[name]);
		}
	}
	if(!filmwrit)
	{
		alert("No films were selected!")
	}
}

function writeFilmHTML(film)
{	
	var flel;
	var dl=parseInt($("stagearea").style.left);
	var dt=parseInt($("stagearea").style.top);
	newwindow=window.open(film.name,film.name);
	newwindow.document.writeln('<html>');
	newwindow.document.writeln(SPACES.substr(0,3)+'<head>');
	newwindow.document.writeln(SPACES.substr(0,6)+'<style>');
	newwindow.document.writeln(SPACES.substr(0,9)+'div {');
	newwindow.document.writeln(SPACES.substr(0,12)+'position:absolute;');
	newwindow.document.writeln (SPACES.substr(0,9)+'}');
	newwindow.document.writeln ('');
	newwindow.document.writeln(SPACES.substr(0,9)+'#screen {');
	newwindow.document.writeln(SPACES.substr(0,12)+'height:'+parseInt($("stagearea").style.height)+'px;');
	newwindow.document.writeln(SPACES.substr(0,12)+'width:'+parseInt($("stagearea").style.width)+'px;');
	newwindow.document.writeln(SPACES.substr(0,12)+'clip:rect(0px,'+(parseInt($("stagearea").style.width))+'px,'+(parseInt($("stagearea").style.height))+'px,0px);');
	newwindow.document.writeln (SPACES.substr(0,9)+'}');
	newwindow.document.writeln(SPACES.substr(0,9)+'#frame {');
	newwindow.document.writeln(SPACES.substr(0,12)+'height:'+parseInt($("stagearea").style.height)+'px;');
	newwindow.document.writeln(SPACES.substr(0,12)+'width:'+parseInt($("stagearea").style.width)+'px;');
	newwindow.document.writeln(SPACES.substr(0,12)+'border:black 1px solid;');
	newwindow.document.writeln (SPACES.substr(0,9)+'}');
	newwindow.document.writeln(SPACES.substr(0,6)+'</style>');	
	newwindow.document.writeln ('');
	newwindow.document.writeln(SPACES.substr(0,6)+'<script type="text/javascript" src = "canvimation_functions.js" ></script>');
	newwindow.document.writeln(SPACES.substr(0,6)+'<!--[IF LT IE 9]><script type="text/javascript" src = "excanvas.js" ></script><![endif]-->');
	newwindow.document.writeln(SPACES.substr(0,6)+'<script type="text/javascript">');
	newwindow.document.writeln(SPACES.substr(0,9)+'var SCRW='+parseInt($("stagearea").style.width)+';');
	newwindow.document.writeln(SPACES.substr(0,9)+'var SCRH='+parseInt($("stagearea").style.height)+';');
	newwindow.document.writeln(SPACES.substr(0,9)+'var flel;');
	newwindow.document.writeln(SPACES.substr(0,9)+'var scene;');
	newwindow.document.writeln(SPACES.substr(0,9)+'var shape;');
	newwindow.document.writeln(SPACES.substr(0,9)+'var sprite;');
	newwindow.document.writeln(SPACES.substr(0,9)+'var film;');
	newwindow.document.writeln ('');
	newwindow.document.writeln(SPACES.substr(0,9)+'function main() {');
	newwindow.document.writeln(SPACES.substr(0,12)+'film = new Film("'+film.name+'");');
	
	for(var el in film.elements)
	{
		flel=film.elements[el];
		newwindow.document.writeln ('');
		newwindow.document.writeln(SPACES.substr(0,0)+'//---------- Film Element----------------------------');
		newwindow.document.writeln(SPACES.substr(0,12)+'film.elements["'+el+'"]={};');
		newwindow.document.writeln(SPACES.substr(0,12)+'flel=film.elements["'+el+'"];');
		newwindow.document.writeln(SPACES.substr(0,12)+'flel.name="'+flel.name+'",');
		newwindow.document.writeln(SPACES.substr(0,12)+'flel.id="'+flel.id+'",');
		newwindow.document.writeln(SPACES.substr(0,12)+'flel.title="'+flel.title+'",');
		newwindow.document.writeln(SPACES.substr(0,12)+'flel.source="'+flel.source+'",');
		newwindow.document.writeln(SPACES.substr(0,12)+'flel.A="'+flel.A+'",');
		newwindow.document.writeln(SPACES.substr(0,12)+'flel.D="'+flel.D+'",');
		newwindow.document.writeln(SPACES.substr(0,12)+'eldiv=document.createElement("div");');
		newwindow.document.writeln(SPACES.substr(0,12)+'eldiv.id="'+flel.id+'";');
		newwindow.document.writeln(SPACES.substr(0,12)+'eldiv.style.top="'+(flel.yOffset-dt)+'px";');
		newwindow.document.writeln(SPACES.substr(0,12)+'eldiv.style.left="'+(flel.xOffset-dl)+'px";');
		newwindow.document.writeln(SPACES.substr(0,12)+'eldiv.style.width="'+SCRW+'px";');
		newwindow.document.writeln(SPACES.substr(0,12)+'eldiv.style.height="'+SCRH+'px";');
		newwindow.document.writeln(SPACES.substr(0,12)+'eldiv.style.zIndex='+flel.layer+';');
		newwindow.document.writeln(SPACES.substr(0,12)+'eldiv.style.visibility="hidden";');
		newwindow.document.writeln(SPACES.substr(0,12)+'$("screen").appendChild(eldiv);');
		switch(flel.source)
		{
			case 'scene':
				newwindow.document.writeln ('');
				newwindow.document.writeln(SPACES.substr(0,3)+'//---------- Type Scene---Base is'+flel.title+'-------------------------');
				newwindow.document.writeln(SPACES.substr(0,12)+'scene=new Scene("'+flel.id+'");');
				newwindow.document.writeln(SPACES.substr(0,12)+'flel.elm=scene;');
				for (var name in SCENES[flel.name].shapes)
				{
					shape=SCENES[flel.name].shapes[name];
					shape.shapeHTML();
					newwindow.document.writeln(SPACES.substr(0,12)+'shape.addTo($("'+flel.id+'"));');
					newwindow.document.writeln(SPACES.substr(0,12)+'shape.draw();');
					newwindow.document.writeln(SPACES.substr(0,6)+'//---------- End Of Shape---Base is '+shape.title+'-------------------------');
				} 
				
			break
			case 'sprite':
				newwindow.document.writeln(SPACES.substr(0,12)+'flel.R="'+flel.R+'",');
				newwindow.document.writeln(SPACES.substr(0,12)+'flel.S="'+flel.S+'",');
				newwindow.document.writeln(SPACES.substr(0,12)+'sprite= new Sprite("'+flel.id+'");');
				newwindow.document.writeln(SPACES.substr(0,12)+'flel.elm=sprite;');
			break
		}
	}
	newwindow.document.writeln(SPACES.substr(0,12)+'film.setUp();');
	newwindow.document.writeln(SPACES.substr(0,9)+'}');
	newwindow.document.writeln(SPACES.substr(0,6)+'</script>'); 
	newwindow.document.writeln(SPACES.substr(0,3)+'</head>');
	newwindow.document.writeln(SPACES.substr(0,3)+'<body onload="main()">');
	newwindow.document.writeln(SPACES.substr(0,6)+'<div id="screen"></div>'); 
	newwindow.document.writeln(SPACES.substr(0,6)+'<div id="frame"></div>'); 
	newwindow.document.writeln(SPACES.substr(0,3)+'</body>');
	newwindow.document.writeln('</html>');
	newwindow.document.close();	
}

/*	
	newwindow.document.writeln(SPACES.substr(0,9)+'function startfilm()');
	newwindow.document.writeln(SPACES.substr(0,9)+'{');
	newwindow.document.writeln(SPACES.substr(0,12)+'$("screen").style.left=0; // change to move screen position');
	newwindow.document.writeln(SPACES.substr(0,12)+'$("screen").style.top=0; // change to move screen position');
	newwindow.document.writeln(SPACES.substr(0,12)+'for (var i=0; i<film.list.length; i++)');
	newwindow.document.writeln(SPACES.substr(0,12)+'{');
	newwindow.document.writeln(SPACES.substr(0,15)+'filmdiv = document.createElement("div");');
	newwindow.document.writeln(SPACES.substr(0,15)+'filmdiv.id = "filmdiv"+film.list[i][1];');
	newwindow.document.writeln(SPACES.substr(0,15)+'filmdiv.style.position = "absolute";');
	newwindow.document.writeln(SPACES.substr(0,15)+'filmdiv.style.left = 0;');
	newwindow.document.writeln(SPACES.substr(0,15)+'filmdiv.style.top = 0;');
	newwindow.document.writeln(SPACES.substr(0,15)+'filmdiv.style.zIndex = film.list[i][6];');
	newwindow.document.writeln(SPACES.substr(0,15)+'$("screen").appendChild(filmdiv);');
	newwindow.document.writeln(SPACES.substr(0,12)+'}');
	
	newwindow.document.writeln(SPACES.substr(0,12)+'for (var fr in frames)');
	newwindow.document.writeln(SPACES.substr(0,12)+'{');
	newwindow.document.writeln(SPACES.substr(0,15)+'frame = frames[fr];');
	newwindow.document.writeln(SPACES.substr(0,15)+'canvas = document.createElement("canvas");');
	newwindow.document.writeln(SPACES.substr(0,15)+'canvas.style.position="absolute";');
	newwindow.document.writeln(SPACES.substr(0,15)+'canvas.style.top='+(-parseInt($("canvasframe").style.top)+52)+';');
	newwindow.document.writeln(SPACES.substr(0,15)+'canvas.style.left='+(-parseInt($("canvasframe").style.left)+0)+';');
	newwindow.document.writeln(SPACES.substr(0,15)+'canvas.width = frame.width;');
	newwindow.document.writeln(SPACES.substr(0,15)+'canvas.height = frame.height;');
	newwindow.document.writeln(SPACES.substr(0,15)+'canvas.style.zIndex = frame.zIndex;');
	newwindow.document.writeln(SPACES.substr(0,15)+'$(frame.parent).appendChild(canvas);');
	newwindow.document.writeln(SPACES.substr(0,15)+'if (ieb) {canvas=G_vmlCanvasManager.initElement(canvas)}');
	newwindow.document.writeln(SPACES.substr(0,15)+'if (canvas.getContext)');
	newwindow.document.writeln(SPACES.substr(0,15)+'{');
	newwindow.document.writeln(SPACES.substr(0,18)+'canvas.ctx = canvas.getContext("2d");');
	newwindow.document.writeln(SPACES.substr(0,18)+'canvas.ctx.scale(1,1);');
	newwindow.document.writeln(SPACES.substr(0,15)+'}');
	newwindow.document.writeln(SPACES.substr(0,15)+'frame.ctx=canvas.ctx;');
	newwindow.document.writeln(SPACES.substr(0,15)+'canvas.frame=frame;');
	newwindow.document.writeln(SPACES.substr(0,12)+'}');
	newwindow.document.writeln(SPACES.substr(0,12)+'showfilm();')
	newwindow.document.writeln(SPACES.substr(0,9)+'}');
*/

function shapeHTML()
{
	var node;
	var nc1x,nc1y,nc2x,nc2y;
	newwindow.document.writeln ('');
	newwindow.document.writeln(SPACES.substr(0,6)+'//---------- Shape---Base is '+shape.title+'-------------------------');
	newwindow.document.writeln(SPACES.substr(0,12)+'shape=new Shape("'+this.name+'");');
	newwindow.document.writeln(SPACES.substr(0,12)+'scene.shapes["'+this.name+'"]=shape;');
	newwindow.document.writeln(SPACES.substr(0,12)+'shape.title="'+this.title +'";');
	newwindow.document.writeln(SPACES.substr(0,12)+'shape.open='+this.open +';');
	newwindow.document.writeln(SPACES.substr(0,12)+'shape.editable='+this.editable +';');
	newwindow.document.writeln(SPACES.substr(0,12)+'shape.type="'+this.type +'";');
	newwindow.document.writeln(SPACES.substr(0,12)+'shape.lineWidth ="'+this.lineWidth  +'";');
	newwindow.document.writeln(SPACES.substr(0,12)+'shape.lineCap="'+this.lineCap +'";');
	newwindow.document.writeln(SPACES.substr(0,12)+'shape.lineJoin="'+ this.lineJoin +'";'); 
	newwindow.document.writeln(SPACES.substr(0,12)+'shape.justfill='+  this.justfill +';');  
	newwindow.document.writeln(SPACES.substr(0,12)+'shape.linearfill='+ this.linearfill +';'); 
	newwindow.document.writeln(SPACES.substr(0,12)+'shape.stopn="'+ this.stopn +'";'); 
	newwindow.document.writeln(SPACES.substr(0,12)+'shape.shadow='+this.shadow +';');
	newwindow.document.writeln(SPACES.substr(0,12)+'shape.shadowOffsetX="'+   this.shadowOffsetX +'";');   
	newwindow.document.writeln(SPACES.substr(0,12)+'shape.shadowOffsetY ="'+   this.shadowOffsetY  +'";');   
	newwindow.document.writeln(SPACES.substr(0,12)+'shape.shadowBlur="'+   this.shadowBlur +'";');   
	newwindow.document.writeln(SPACES.substr(0,12)+'shape.zIndex="'+this.zIndex +'";');
	newwindow.document.writeln(SPACES.substr(0,12)+'shape.crnradius="'+this.crnradius +'";');
	newwindow.document.writeln(SPACES.substr(0,12)+'shape.strokeStyle=['+this.strokeStyle+'];');
	newwindow.document.writeln(SPACES.substr(0,12)+'shape.fillStyle=['+this.fillStyle+'];');
	newwindow.document.writeln(SPACES.substr(0,12)+'shape.lineGrad=['+this.lineGrad+'];');
	newwindow.document.writeln(SPACES.substr(0,12)+'shape.radGrad=['+this.radGrad+'];');
	newwindow.document.writeln(SPACES.substr(0,12)+'shape.shadowColor=['+ this.shadowColor +'];'); 
	newwindow.document.writeln(SPACES.substr(0,12)+'shape.colorStops=[');
	for(var i=0;i<this.colorStops.length-1;i++)
	{
		newwindow.document.writeln(SPACES.substr(0,15)+'['+this.colorStops[i]+'],'); 
	}
	newwindow.document.writeln(SPACES.substr(0,15)+'['+this.colorStops[i]+']'); 
	newwindow.document.writeln(SPACES.substr(0,12)+'];');
	node=this.path.next;
	while(node.point.x!="end")
	{
		
		newwindow.document.writeln(SPACES.substr(0,12)+'p=new Point('+node.point.x+','+node.point.y+');');
		if(node.ctrl1.x=="non")
		{
			nc1x='"non"';
			nc1y='"non"';
			nc2x='"non"';
			nc2y='"non"';
		}
		else
		{
			nc1x=node.ctrl1.x;
			nc1y=node.ctrl1.y;
			nc2x=node.ctrl2.x;
			nc2y=node.ctrl2.y;
		}
		newwindow.document.writeln(SPACES.substr(0,12)+'c1=new Point('+nc1x+','+nc1y+');');
		newwindow.document.writeln(SPACES.substr(0,12)+'c2=new Point('+nc2x+','+nc2y+');');
		newwindow.document.writeln(SPACES.substr(0,12)+'node=new Node(p,c1,c2);');
		newwindow.document.writeln(SPACES.substr(0,12)+'node.corner="'+node.corner+'";');
		newwindow.document.writeln(SPACES.substr(0,12)+'node.vertex="'+node.vertex+'";');
		newwindow.document.writeln(SPACES.substr(0,12)+'shape.addNode(node);');
		node=node.next;
	}
}

function writesprite(sprite,filmel)
{
	if (sprite.engine=='scene')
	{
		writescene(sprite.train,filmel);
		writetrack(sprite.track,filmel);
		guidepath(sprite);
		newwindow.document.writeln(SPACES.substr(0,9)+'sprites["'+sprite.name+'"] =');
		newwindow.document.writeln(SPACES.substr(0,9)+'{');
		newwindow.document.writeln(SPACES.substr(0,12)+'name:"'+sprite.name+'",');
		newwindow.document.writeln(SPACES.substr(0,12)+'engine:"'+sprite.engine+'",');
		newwindow.document.writeln(SPACES.substr(0,12)+'ptime:'+sprite.ptime+',');
		newwindow.document.writeln(SPACES.substr(0,12)+'pointer:'+sprite.pointer+',');
		newwindow.document.writeln(SPACES.substr(0,12)+'points:[');
		for (var i=0; i<sprite.points.length; i++)
		{
			newwindow.document.writeln(SPACES.substr(0,15)+'{x:'+sprite.points[i].x+',y:'+sprite.points[i].y+',phi:'+sprite.points[i].phi+'},');	
		}
		newwindow.document.writeln(SPACES.substr(0,12)+'],');
		newwindow.document.writeln(SPACES.substr(0,12)+'vec:'+sprite.vec+',');
		newwindow.document.writeln(SPACES.substr(0,12)+'vector:');
		newwindow.document.writeln(SPACES.substr(0,12)+'{');
		newwindow.document.writeln(SPACES.substr(0,15)+'xs:'+sprite.vector.xs+',');
		newwindow.document.writeln(SPACES.substr(0,15)+'xe:'+sprite.vector.xe+',');
		newwindow.document.writeln(SPACES.substr(0,15)+'ys:'+sprite.vector.ys+',');
		newwindow.document.writeln(SPACES.substr(0,15)+'ye:'+sprite.vector.ye+',');
		newwindow.document.writeln(SPACES.substr(0,15)+'psi:'+sprite.vector.psi);
		newwindow.document.writeln(SPACES.substr(0,12)+'},');
		newwindow.document.writeln(SPACES.substr(0,12)+'train:scenes["'+sprite.train.name+'"],');
		newwindow.document.writeln(SPACES.substr(0,12)+'track:tracks["'+sprite.track.name+'"],');												  
		newwindow.document.writeln(SPACES.substr(0,9)+'}');
		newwindow.document.writeln ('');
		newwindow.document.writeln(SPACES.substr(0,9)+'sprite=sprites["'+sprite.name+'"];');
		newwindow.document.writeln(SPACES.substr(0,9)+'sprite.cars = sprite.train.cars;');
		newwindow.document.writeln ('');
	}
	else
	{
		writesprite(sprite.train,filmel);
		writetrack(sprite.track,filmel);
		guidepath(sprite);
		newwindow.document.writeln(SPACES.substr(0,9)+'sprites["'+sprite.name+'"] =');
		newwindow.document.writeln(SPACES.substr(0,9)+'{');
		newwindow.document.writeln(SPACES.substr(0,12)+'name:"'+sprite.name+'",');
		newwindow.document.writeln(SPACES.substr(0,12)+'engine:"'+sprite.engine+'",');
		newwindow.document.writeln(SPACES.substr(0,12)+'ptime:'+sprite.ptime+',');
		newwindow.document.writeln(SPACES.substr(0,12)+'pointer:'+sprite.pointer+',');
		newwindow.document.writeln(SPACES.substr(0,12)+'points:[');
		for (var i=0; i<sprite.points.length; i++)
		{
			newwindow.document.writeln(SPACES.substr(0,15)+'{x:'+sprite.points[i].x+',y:'+sprite.points[i].y+',phi:'+sprite.points[i].phi+'},');	
		}
		newwindow.document.writeln(SPACES.substr(0,12)+'],');
		newwindow.document.writeln(SPACES.substr(0,12)+'vec:'+sprite.vec+',');
		newwindow.document.writeln(SPACES.substr(0,12)+'vector:');
		newwindow.document.writeln(SPACES.substr(0,12)+'{');
		newwindow.document.writeln(SPACES.substr(0,15)+'xs:'+sprite.vector.xs+',');
		newwindow.document.writeln(SPACES.substr(0,15)+'xe:'+sprite.vector.xe+',');
		newwindow.document.writeln(SPACES.substr(0,15)+'ys:'+sprite.vector.ys+',');
		newwindow.document.writeln(SPACES.substr(0,15)+'ye:'+sprite.vector.ye+',');
		newwindow.document.writeln(SPACES.substr(0,15)+'psi:'+sprite.vector.psi);
		newwindow.document.writeln(SPACES.substr(0,12)+'},');
		newwindow.document.writeln(SPACES.substr(0,12)+'train:sprites["'+sprite.train.name+'"],');
		newwindow.document.writeln(SPACES.substr(0,12)+'track:tracks["'+sprite.track.name+'"]');												  
		newwindow.document.writeln(SPACES.substr(0,9)+'}');
		newwindow.document.writeln ('');
		newwindow.document.writeln(SPACES.substr(0,9)+'sprite=sprites["'+sprite.name+'"];');
		newwindow.document.writeln(SPACES.substr(0,9)+'sprite.cars = sprite.train.cars;');
		newwindow.document.writeln ('');
	}
}

function sceneHTML()
{
	
	newwindow.document.writeln(SPACES.substr(0,9)+'cars=[]');
	for (var i=0; i<scene.cars.length; i++)
	{
		newwindow.document.writeln(SPACES.substr(0,9)+'');
		newwindow.document.writeln(SPACES.substr(0,3)+'//scene frame start..................................');
		newwindow.document.writeln(SPACES.substr(0,9)+'');
		createframe(scene.cars[i],filmel);
		newwindow.document.writeln(SPACES.substr(0,9)+'var frame=frames["'+scene.cars[i].id+'"];');
		newwindow.document.writeln(SPACES.substr(0,9)+'cars.push(frame)');
		newwindow.document.writeln(SPACES.substr(0,9)+'');
		newwindow.document.writeln(SPACES.substr(0,3)+'//scene frame end..................................');
		newwindow.document.writeln(SPACES.substr(0,9)+'');
	}
	
	newwindow.document.writeln(SPACES.substr(0,9)+'scenes["'+scene.name+'"] = ');
	newwindow.document.writeln(SPACES.substr(0,9)+'{');
	newwindow.document.writeln(SPACES.substr(0,12)+'name:"'+scene.name+'",');
	newwindow.document.writeln(SPACES.substr(0,12)+'cars:cars');
	newwindow.document.writeln(SPACES.substr(0,9)+'}');
}

function writetrack(track,filmel)
{
	newwindow.document.writeln(SPACES.substr(0,9)+'');
	newwindow.document.writeln(SPACES.substr(0,3)+'//track frame start..................................');
	newwindow.document.writeln(SPACES.substr(0,9)+'');
	createframe(track.line,filmel);
	newwindow.document.writeln(SPACES.substr(0,9)+'var frame=frames["'+track.line.id+'"];');	
	newwindow.document.writeln(SPACES.substr(0,9)+'');
	newwindow.document.writeln(SPACES.substr(0,3)+'//track frame end..................................');
	newwindow.document.writeln(SPACES.substr(0,9)+'');
	
	newwindow.document.writeln(SPACES.substr(0,9)+'tracks["'+track.name+'"] = ');
	newwindow.document.writeln(SPACES.substr(0,9)+'{');
	newwindow.document.writeln(SPACES.substr(0,12)+'name:"'+track.name+'",');
	newwindow.document.writeln(SPACES.substr(0,12)+'line:frame,');
	if (isNaN(track.repeats))
	{
		newwindow.document.writeln(SPACES.substr(0,12)+'repeats:"c",');
	}
	else
	{
		newwindow.document.writeln(SPACES.substr(0,12)+'repeats:'+track.repeats+',');
	}
	newwindow.document.writeln(SPACES.substr(0,12)+'visible:'+track.visible+',');
	newwindow.document.writeln(SPACES.substr(0,12)+'yoyo:'+track.yoyo);
	newwindow.document.writeln(SPACES.substr(0,9)+'}');
	newwindow.document.writeln(SPACES.substr(0,9)+'');
}

function createframe(frame,parent)
{
	frame.id = frame.id.trim();
	newwindow.document.writeln(SPACES.substr(0,9)+'frames["'+frame.id+'"] =');
	newwindow.document.writeln(SPACES.substr(0,9)+'{');
	newwindow.document.writeln(SPACES.substr(0,12)+'id:"'+frame.id+'",');
	newwindow.document.writeln(SPACES.substr(0,12)+'parent:"filmdiv'+parent+'",');
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
	newwindow.document.writeln(SPACES.substr(0,12)+'path:'+tempath +',');
	newwindow.document.writeln(SPACES.substr(0,12)+'width:'+frame.width +',');
	newwindow.document.writeln(SPACES.substr(0,12)+'height:'+frame.height +',');
	newwindow.document.writeln(SPACES.substr(0,12)+'bleft:'+frame.bleft +',');
	newwindow.document.writeln(SPACES.substr(0,12)+'btop:'+frame.btop +',');
	newwindow.document.writeln(SPACES.substr(0,12)+'bwidth:'+frame.bwidth +',');
	newwindow.document.writeln(SPACES.substr(0,12)+'bheight:'+frame.bheight +',');
	newwindow.document.writeln(SPACES.substr(0,12)+'scleft:'+frame.scleft +',');
	newwindow.document.writeln(SPACES.substr(0,12)+'sctop:'+frame.sctop +',');
	newwindow.document.writeln(SPACES.substr(0,12)+'scx:'+frame.scx +',');
	newwindow.document.writeln(SPACES.substr(0,12)+'scy:'+frame.scy +',');
	newwindow.document.writeln(SPACES.substr(0,12)+'sox:'+frame.sox +',');
	newwindow.document.writeln(SPACES.substr(0,12)+'soy:'+frame.soy +',');
	newwindow.document.writeln(SPACES.substr(0,12)+'ox:'+frame.ox +',');
	newwindow.document.writeln(SPACES.substr(0,12)+'oy:'+frame.oy +',');
	newwindow.document.writeln(SPACES.substr(0,12)+'cx:'+frame.cx +',');
	newwindow.document.writeln(SPACES.substr(0,12)+'cy:'+frame.cy +',');
	newwindow.document.writeln(SPACES.substr(0,12)+'rr:'+frame.rr +',');
	newwindow.document.writeln(SPACES.substr(0,12)+'phi:'+frame.phi +',');
	newwindow.document.writeln(SPACES.substr(0,12)+'rotated:'+frame.rotated +',');
	newwindow.document.writeln(SPACES.substr(0,12)+'ratio:'+frame.ratio +',');
	newwindow.document.writeln(SPACES.substr(0,12)+'strokeStyle:['+frame.strokeStyle +'],');
	newwindow.document.writeln(SPACES.substr(0,12)+'fillStyle:['+frame.fillStyle +'],');
	newwindow.document.writeln(SPACES.substr(0,12)+'lineWidth:'+frame.lineWidth +',');
	newwindow.document.writeln(SPACES.substr(0,12)+'lineCap:"'+frame.lineCap +'",');
	newwindow.document.writeln(SPACES.substr(0,12)+'lineJoin:"'+frame.lineJoin +'",');
	newwindow.document.writeln(SPACES.substr(0,12)+'justfill:'+frame.justfill +',');
	newwindow.document.writeln(SPACES.substr(0,12)+'linearfill:'+frame.linearfill +',');
	newwindow.document.writeln(SPACES.substr(0,12)+'lineGrad:['+frame.lineGrad +'],');
	newwindow.document.writeln(SPACES.substr(0,12)+'radGrad:['+frame.radGrad +'],');
	newwindow.document.writeln(SPACES.substr(0,12)+'colorStops:[['+frame.colorStops[0]+'],['+frame.colorStops[1]+']],');
	newwindow.document.writeln(SPACES.substr(0,12)+'stopn:'+frame.stopn +',');
	newwindow.document.writeln(SPACES.substr(0,12)+'shadow:'+frame.shadow +',');
	newwindow.document.writeln(SPACES.substr(0,12)+'shadowOffsetX:'+frame.shadowOffsetX +',');
	newwindow.document.writeln(SPACES.substr(0,12)+'shadowOffsetY:'+frame.shadowOffsetY +',');
	newwindow.document.writeln(SPACES.substr(0,12)+'shadowBlur:'+frame.shadowBlur +',');
	newwindow.document.writeln(SPACES.substr(0,12)+'shadowColor:['+frame.shadowColor +'],');
	newwindow.document.writeln(SPACES.substr(0,12)+'ScaleX:'+frame.ScaleX +',');
	newwindow.document.writeln(SPACES.substr(0,12)+'ScaleY:'+frame.ScaleY +',');
	newwindow.document.writeln(SPACES.substr(0,12)+'zIndex:'+frame.zIndex +',');
	newwindow.document.writeln(SPACES.substr(0,12)+'rotate:'+frame.rotate +',');
	newwindow.document.writeln(SPACES.substr(0,12)+'clockw:'+frame.clockw +',');
	newwindow.document.writeln(SPACES.substr(0,12)+'complete:'+frame.complete +',');
	if(frame.beztypes.length>0)
	{
		var bezlist='';
		for(var i=0; i<frame.beztypes.length; i++)
		{
			bezlist +='"'+frame.beztypes[i]+'",';
		}
		bezlist=bezlist.slice(0,-1);
		newwindow.document.writeln(SPACES.substr(0,12)+'beztypes:['+bezlist +'],');
	}
	else
	{
		newwindow.document.writeln(SPACES.substr(0,12)+'beztypes:[],');
	}
	newwindow.document.writeln(SPACES.substr(0,12)+'radius:'+frame.radius);
	newwindow.document.writeln(SPACES.substr(0,9)+'}');
}