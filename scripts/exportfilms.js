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
		filmhtml+="<p class='check_input'>	<input type='checkbox' id='"+film.name+"'><label for='"+film.name+"'>"+film.title+"</label></p>"
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
	var shape,sprite;
	var dl=parseInt($("stagearea").style.left);
	var dt=parseInt($("stagearea").style.top);
	newwindow=window.open(film.name,film.name);
	newwindow.document.writeln('<!DOCTYPE HTML>');
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
	newwindow.document.writeln(SPACES.substr(0,6)+'<script type="text/javascript" src = "canvimation_script.js" ></script>');
	newwindow.document.writeln(SPACES.substr(0,6)+'<!--[IF LT IE 9]><script type="text/javascript" src = "excanvas.js" ></script><![endif]-->');
	newwindow.document.writeln(SPACES.substr(0,6)+'<script type="text/javascript">');
	newwindow.document.writeln(SPACES.substr(0,9)+'var SCRW='+(2*SCRW)+';');
	newwindow.document.writeln(SPACES.substr(0,9)+'var SCRH='+(2*SCRH)+';');
	newwindow.document.writeln(SPACES.substr(0,9)+'var flel;');
	newwindow.document.writeln(SPACES.substr(0,9)+'var scene;');
	newwindow.document.writeln(SPACES.substr(0,9)+'var shape;');
	newwindow.document.writeln(SPACES.substr(0,9)+'var sprite;');
	newwindow.document.writeln(SPACES.substr(0,9)+'var film;');
	newwindow.document.writeln(SPACES.substr(0,9)+'var TRAINS={};');
	newwindow.document.writeln(SPACES.substr(0,9)+'var LOCUS=false;');
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
				newwindow.document.writeln(SPACES.substr(0,3)+'//---------- Type Scene---Base is '+flel.title+'-------------------------');
				for (var name in flel.elm.shapes)
				{
					shape=flel.elm.shapes[name];
					shape.shapeHTML(flel.id);
					newwindow.document.writeln(SPACES.substr(0,12)+'shape.draw();');
					newwindow.document.writeln ('');
				}
				newwindow.document.writeln(SPACES.substr(0,12)+'scene=new Scene("'+flel.id+'");');
				newwindow.document.writeln(SPACES.substr(0,12)+'flel.elm=scene;');
				newwindow.document.writeln (''); 
				newwindow.document.writeln(SPACES.substr(0,3)+'//---------- Type Scene---Base is '+flel.title+'-------------------------');
			break
			case 'sprite':
				newwindow.document.writeln(SPACES.substr(0,12)+'flel.R="'+flel.R+'",');
				newwindow.document.writeln(SPACES.substr(0,12)+'flel.S="'+flel.S+'",');
				sprite=flel.elm;
				sprite.spriteHTML(flel.id)
				newwindow.document.writeln(SPACES.substr(0,12)+'flel.elm=sprite;');
				newwindow.document.writeln(SPACES.substr(0,12)+'sprite.setPoints();');
			break
		}
		newwindow.document.writeln ('');
		newwindow.document.writeln(SPACES.substr(0,0)+'//---------- End Of Film Element -- Type '+flel.source+'--Base is '+flel.title+'--------------------------');
	}
	newwindow.document.writeln ('');
	newwindow.document.writeln(SPACES.substr(0,12)+'film.setUp();');
	newwindow.document.writeln(SPACES.substr(0,9)+'}');
	newwindow.document.writeln(SPACES.substr(0,6)+'</script>'); 
	newwindow.document.writeln(SPACES.substr(0,3)+'</head>');
	newwindow.document.writeln(SPACES.substr(0,3)+'<body onload="main()">');
	newwindow.document.writeln(SPACES.substr(0,6)+'<div id="screen"></div>'); 
	newwindow.document.writeln(SPACES.substr(0,6)+'<div id="frame"></div>'); 
newwindow.document.writeln(SPACES.substr(0,6)+'<div id="msg"></div>'); 
	newwindow.document.writeln(SPACES.substr(0,3)+'</body>');
	newwindow.document.writeln('</html>');
	newwindow.document.close();	
}

function shapeHTML(fleldiv)
{
	var node;
	var nc1x,nc1y,nc2x,nc2y;
	newwindow.document.writeln ('');
	newwindow.document.writeln(SPACES.substr(0,6)+'//---------- Type Shape---Base is '+this.title+'-------------------------');	
	newwindow.document.writeln(SPACES.substr(0,12)+'shape=new Shape("'+this.name+'");');
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
	newwindow.document.writeln(SPACES.substr(0,12)+'shape.addTo($("'+fleldiv+'"));');
	newwindow.document.writeln(SPACES.substr(0,6)+'//---------- End Of Shape---Base is '+this.title+'-------------------------');
}

function spriteHTML(fleldiv)
{
	var shape,shapes;
	var train;
	if (this.engine=='scene')
	{
		newwindow.document.writeln ('');
		newwindow.document.writeln(SPACES.substr(0,3)+'//--- Type Sprite---Base is '+this.title+'-----------------------------');
		newwindow.document.writeln ('');
		newwindow.document.writeln(SPACES.substr(0,3)+'//---------- Type Train Scene---Base is '+this.train.title+'-------------------------');
		newwindow.document.writeln(SPACES.substr(0,12)+'scene=new Scene("'+this.train.name+'");');
		shapes=this.train.shapes;
		for (var name in shapes)
		{
			shape=shapes[name];
			shape.shapeHTML(fleldiv);
			newwindow.document.writeln(SPACES.substr(0,12)+'scene.shapes[shape.name]=shape;');
		}
		newwindow.document.writeln ('');
		newwindow.document.writeln(SPACES.substr(0,3)+'//---------- End of Train Scene---Base is '+this.train.title+'-------------------------');
		
		newwindow.document.writeln ('');
		newwindow.document.writeln(SPACES.substr(0,6)+'//---------- Track ---Base is '+this.track.title+'-------------------------');
		shape=this.track.getShape();
		shape.shapeHTML(fleldiv);
		newwindow.document.writeln(SPACES.substr(0,12)+'track=new Track("'+this.track.name+'");');
		newwindow.document.writeln(SPACES.substr(0,12)+'track.shape=shape;');
		if(isNaN(this.track.repeats))
		{
			newwindow.document.writeln(SPACES.substr(0,12)+'track.repeats="'+this.track.repeats+'";');
		}
		else
		{
			newwindow.document.writeln(SPACES.substr(0,12)+'track.repeats='+this.track.repeats+';');
		}
		newwindow.document.writeln(SPACES.substr(0,12)+'track.visible='+this.track.visible+';');
		newwindow.document.writeln(SPACES.substr(0,12)+'track.yoyo='+this.track.yoyo+';');
		newwindow.document.writeln(SPACES.substr(0,12)+'track.shape.addTo($("'+fleldiv+'"));');
		newwindow.document.writeln ('');
		newwindow.document.writeln(SPACES.substr(0,6)+'//---------- End Of Track ---Base is '+this.track.title+'-------------------------');
		
		newwindow.document.writeln ('');
		newwindow.document.writeln(SPACES.substr(0,12)+'sprite=new Sprite("'+this.name+'");');
		newwindow.document.writeln(SPACES.substr(0,12)+'sprite.train=scene;');
		newwindow.document.writeln(SPACES.substr(0,12)+'sprite.engine="'+this.engine+'";');
		newwindow.document.writeln(SPACES.substr(0,12)+'sprite.track=track;');
		newwindow.document.writeln(SPACES.substr(0,12)+'sprite.ptime='+this.ptime+';');
		newwindow.document.writeln(SPACES.substr(0,12)+'sprite.pointer='+this.pointer+';');
		newwindow.document.writeln(SPACES.substr(0,12)+'sprite.usevec='+this.usevec+';');
		newwindow.document.writeln(SPACES.substr(0,12)+'sprite.expanded='+this.expanded+';');
		newwindow.document.writeln(SPACES.substr(0,12)+'sprite.finishmove='+this.finishmove+';');
		newwindow.document.writeln(SPACES.substr(0,12)+'sprite.vector={xs:'+this.vector.xs+',xe:'+this.vector.xe+',ys:'+this.vector.ys+',ye:'+this.vector.ye+',psi:'+this.vector.psi+'};');
		
		newwindow.document.writeln ('');
		newwindow.document.writeln(SPACES.substr(0,3)+'//--- End Of Sprite---Base is '+this.title+'-----------------------------');
		
		newwindow.document.writeln(SPACES.substr(0,12)+'TRAINS["'+this.name+'"]=sprite;');
		return 'TRAINS["'+this.name+'"];';
		
	}
	else
	{
		train=this.train.spriteHTML(fleldiv);
		newwindow.document.writeln ('');
		newwindow.document.writeln(SPACES.substr(0,6)+'//---------- Track ---Base is '+this.track.title+'-------------------------');
		shape=this.track.getShape();
		shape.shapeHTML(fleldiv);
		newwindow.document.writeln(SPACES.substr(0,12)+'track=new Track("'+this.track.name+'");');
		newwindow.document.writeln(SPACES.substr(0,12)+'track.shape=shape;');
		if(isNaN(this.track.repeats))
		{
			newwindow.document.writeln(SPACES.substr(0,12)+'track.repeats="'+this.track.repeats+'";');
		}
		else
		{
			newwindow.document.writeln(SPACES.substr(0,12)+'track.repeats='+this.track.repeats+';');
		}
		newwindow.document.writeln(SPACES.substr(0,12)+'track.visible='+this.track.visible+';');
		newwindow.document.writeln(SPACES.substr(0,12)+'track.yoyo='+this.track.yoyo+';');
		newwindow.document.writeln(SPACES.substr(0,12)+'track.shape.addTo($("'+fleldiv+'"));');
		newwindow.document.writeln ('');
		newwindow.document.writeln(SPACES.substr(0,6)+'//---------- End Of Track ---Base is '+this.track.title+'-------------------------');
		newwindow.document.writeln ('');
		newwindow.document.writeln(SPACES.substr(0,12)+'sprite=new Sprite("'+this.name+'");');
		newwindow.document.writeln(SPACES.substr(0,12)+'sprite.train='+train+';');
		newwindow.document.writeln(SPACES.substr(0,12)+'sprite.engine="'+this.engine+'";');
		newwindow.document.writeln(SPACES.substr(0,12)+'sprite.track=track;');
		newwindow.document.writeln(SPACES.substr(0,12)+'sprite.ptime='+this.ptime+';');
		newwindow.document.writeln(SPACES.substr(0,12)+'sprite.pointer='+this.pointer+';');
		newwindow.document.writeln(SPACES.substr(0,12)+'sprite.usevec='+this.usevec+';');
		newwindow.document.writeln(SPACES.substr(0,12)+'sprite.expanded='+this.expanded+';');
		newwindow.document.writeln(SPACES.substr(0,12)+'sprite.finishmove='+this.finishmove+';');
		newwindow.document.writeln(SPACES.substr(0,12)+'sprite.vector={xs:'+this.vector.xs+',xe:'+this.vector.xe+',ys:'+this.vector.ys+',ye:'+this.vector.ye+',psi:'+this.vector.psi+'};');
		
		newwindow.document.writeln ('');
		newwindow.document.writeln(SPACES.substr(0,3)+'//--- End Of Sprite---Base is '+this.title+'-----------------------------');
		
		newwindow.document.writeln(SPACES.substr(0,12)+'TRAINS["'+this.name+'"]=sprite;');
		return 'TRAINS["'+this.name+'"];';
	}
}

