/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function writeFilmCode()
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
	var filmhtml = "<p style='font-weight:bold'>Select One Film Only.</p>";
	for (var name in FILMS)
	{
		flen+=25;
		film=FILMS[name];
		filmhtml+="<p class='check_input'>	<input type='radio' name='filmradio' id='"+film.name+"'><label for='"+film.name+"'>"+film.title+"</label></p>"
	}
	filmhtml+="<input type='button' value=' Code ' onclick='exportFilmsCode()' />	<input type='button' value=' Cancel ' onclick='closedialogue(this)' />"
	
	$("filmexportcontent").innerHTML=filmhtml;
	$("filmexportcontent").style.height=flen+"px";
	$("filmexportbox").style.height=(flen+25)+"px";
	$("filmexportbox").style.visibility="visible";
}

function exportFilmsCode()
{
	var filmwrit=false;
	for (var name in FILMS)
	{
		if($(name).checked)
		{
			filmwrit=true;
			filmCode(FILMS[name]);
		}
	}
	if(!filmwrit)
	{
		alert("No films were selected!")
	}
}

function filmCode(film)
{	
	var flel;
	var shape,sprite;
	var dl=parseInt($("stagearea").style.left);
	var dt=parseInt($("stagearea").style.top);
	htmltext='<!DOCTYPE HTML>\n';
	htmltext+='<html>\n';
	htmltext+=SPACES.substr(0,3)+'<head>\n';
	htmltext+=SPACES.substr(0,6)+'<style>\n';
	htmltext+=SPACES.substr(0,9)+'div {\n';
	htmltext+=SPACES.substr(0,12)+'position:absolute;\n';
	htmltext+=SPACES.substr(0,9)+'}\n';
	htmltext+='\n';
	htmltext+=SPACES.substr(0,9)+'#screen {\n';
	htmltext+=SPACES.substr(0,12)+'height:'+parseInt($("stagearea").style.height)+'px;\n';
	htmltext+=SPACES.substr(0,12)+'width:'+parseInt($("stagearea").style.width)+'px;\n';
	htmltext+=SPACES.substr(0,12)+'clip:rect(0px,'+(parseInt($("stagearea").style.width))+'px,'+(parseInt($("stagearea").style.height))+'px,0px);\n';
	htmltext+=SPACES.substr(0,9)+'}\n';
	htmltext+=SPACES.substr(0,9)+'#frame {\n';
	htmltext+=SPACES.substr(0,12)+'height:'+parseInt($("stagearea").style.height)+'px;\n';
	htmltext+=SPACES.substr(0,12)+'width:'+parseInt($("stagearea").style.width)+'px;\n';
	htmltext+=SPACES.substr(0,12)+'border:black 1px solid;\n';
	htmltext+=SPACES.substr(0,9)+'}\n';
	htmltext+=SPACES.substr(0,6)+'</style>\n';	
	htmltext+='\n';
	htmltext+=SPACES.substr(0,6)+'<script type="text/javascript" src = "canvimation_script.js" ></script>\n';
	htmltext+=SPACES.substr(0,6)+'<!--[IF LT IE 9]><script type="text/javascript" src = "excanvas.js" ></script><![endif]-->\n';
	htmltext+=SPACES.substr(0,6)+'<script type="text/javascript">\n';
	htmltext+=SPACES.substr(0,9)+'var SCRW='+(2*SCRW)+';\n';
	htmltext+=SPACES.substr(0,9)+'var SCRH='+(2*SCRH)+';\n';
	htmltext+=SPACES.substr(0,9)+'var flel;\n';
	htmltext+=SPACES.substr(0,9)+'var scene;\n';
	htmltext+=SPACES.substr(0,9)+'var shape;\n';
	htmltext+=SPACES.substr(0,9)+'var tween;\n';
	htmltext+=SPACES.substr(0,9)+'var sprite;\n';
	htmltext+=SPACES.substr(0,9)+'var film;\n';
	htmltext+=SPACES.substr(0,9)+'var TRAINS={};\n';
	htmltext+=SPACES.substr(0,9)+'var LOCUS=false;\n';
	htmltext+='\n';
	htmltext+=SPACES.substr(0,9)+'function main() {\n';
	htmltext+=SPACES.substr(0,12)+'film = new Film("'+film.name+'");\n';
	
	for(var el in film.elements)
	{
		flel=film.elements[el];
		htmltext+='\n';
		htmltext+=SPACES.substr(0,0)+'//---------- Film Element----------------------------\n';
		htmltext+=SPACES.substr(0,12)+'film.elements["'+el+'"]={};\n';
		htmltext+=SPACES.substr(0,12)+'flel=film.elements["'+el+'"];\n';
		htmltext+=SPACES.substr(0,12)+'flel.name="'+flel.name+'",\n';
		htmltext+=SPACES.substr(0,12)+'flel.id="'+flel.id+'",\n';
		htmltext+=SPACES.substr(0,12)+'flel.title="'+flel.title+'",\n';
		htmltext+=SPACES.substr(0,12)+'flel.source="'+flel.source+'",\n';
		htmltext+=SPACES.substr(0,12)+'flel.A="'+flel.A+'",\n';
		htmltext+=SPACES.substr(0,12)+'flel.D="'+flel.D+'",\n';
		htmltext+=SPACES.substr(0,12)+'eldiv=document.createElement("div");\n';
		htmltext+=SPACES.substr(0,12)+'eldiv.id="'+flel.id+'";\n';
		htmltext+=SPACES.substr(0,12)+'eldiv.style.top="'+(flel.yOffset-dt)+'px";\n';
		htmltext+=SPACES.substr(0,12)+'eldiv.style.left="'+(flel.xOffset-dl)+'px";\n';
		htmltext+=SPACES.substr(0,12)+'eldiv.style.width="'+SCRW+'px";\n';
		htmltext+=SPACES.substr(0,12)+'eldiv.style.height="'+SCRH+'px";\n';
		htmltext+=SPACES.substr(0,12)+'eldiv.style.zIndex='+flel.layer+';\n';
		htmltext+=SPACES.substr(0,12)+'eldiv.style.visibility="hidden";\n';
		htmltext+=SPACES.substr(0,12)+'$("screen").appendChild(eldiv);\n';
		switch(flel.source)
		{
			case 'scene':
				htmltext+='\n';
				htmltext+=SPACES.substr(0,3)+'//---------- Type Scene---Base is '+flel.title+'-------------------------\n';
				for (var name in flel.elm.shapes)
				{
					shape=flel.elm.shapes[name];
					shape.shapeCode(flel.id);
					htmltext+=SPACES.substr(0,12)+'shape.draw();\n';
					htmltext+='\n';
				}
				htmltext+=SPACES.substr(0,12)+'scene=new Scene("'+flel.id+'");\n';
				htmltext+=SPACES.substr(0,12)+'flel.elm=scene;\n';
				htmltext+='\n'; 
				htmltext+=SPACES.substr(0,3)+'//---------- Type Scene---Base is '+flel.title+'-------------------------\n';
			break
			case "tween":
				htmltext+=SPACES.substr(0,12)+'flel.R="'+flel.R+'",\n';
				htmltext+=SPACES.substr(0,12)+'flel.S="'+flel.S+'",\n';
				tween=flel.elm;
				tween.tweenHTML(flel.id);
				htmltext+=SPACES.substr(0,12)+'flel.elm=tween;\n';
				htmltext+=SPACES.substr(0,12)+'flel.elm.prepareTweens();\n';
			break
			case 'sprite':
				htmltext+=SPACES.substr(0,12)+'flel.R="'+flel.R+'",\n';
				htmltext+=SPACES.substr(0,12)+'flel.S="'+flel.S+'",\n';
				sprite=flel.elm;
				sprite.spriteCode(flel.id)
				htmltext+=SPACES.substr(0,12)+'flel.elm=sprite;\n';
				htmltext+=SPACES.substr(0,12)+'sprite.setPoints();\n';
			break
		}
		htmltext+='\n';
		htmltext+=SPACES.substr(0,0)+'//---------- End Of Film Element -- Type '+flel.source+'--Base is '+flel.title+'--------------------------\n';
	}
	htmltext+='\n';
	htmltext+=SPACES.substr(0,12)+'film.setUp();\n';
	htmltext+=SPACES.substr(0,9)+'}\n';
	htmltext+=SPACES.substr(0,6)+'</script>\n'; 
	htmltext+=SPACES.substr(0,3)+'</head>\n';
	htmltext+=SPACES.substr(0,3)+'<body onload="main()">\n';
	htmltext+=SPACES.substr(0,6)+'<div id="screen"></div>\n'; 
	htmltext+=SPACES.substr(0,6)+'<div id="frame"></div>\n'; 
	htmltext+=SPACES.substr(0,3)+'</body>\n';
	htmltext+='</html>\n';
	$("html_zone").value="";
	$("codetextbox").style.visibility="visible";
	$("html_zone").value=htmltext;
}

function shapeCode(fleldiv)
{
	var node;
	var nc1x,nc1y,nc2x,nc2y;
	htmltext+='\n';
	htmltext+=SPACES.substr(0,6)+'//---------- Type Shape---Base is '+this.title+'-------------------------\n';	
	htmltext+=SPACES.substr(0,12)+'shape=new Shape("'+this.name+'");\n';
	htmltext+=SPACES.substr(0,12)+'shape.title="'+this.title +'";\n';
	htmltext+=SPACES.substr(0,12)+'shape.open='+this.open +';\n';
	htmltext+=SPACES.substr(0,12)+'shape.editable='+this.editable +';\n';
	htmltext+=SPACES.substr(0,12)+'shape.type="'+this.type +'";\n';
	htmltext+=SPACES.substr(0,12)+'shape.lineWidth ="'+this.lineWidth  +'";\n';
	htmltext+=SPACES.substr(0,12)+'shape.lineCap="'+this.lineCap +'";\n';
	htmltext+=SPACES.substr(0,12)+'shape.lineJoin="'+ this.lineJoin +'";\n'; 
	htmltext+=SPACES.substr(0,12)+'shape.justfill='+  this.justfill +';\n';  
	htmltext+=SPACES.substr(0,12)+'shape.linearfill='+ this.linearfill +';\n'; 
	htmltext+=SPACES.substr(0,12)+'shape.stopn="'+ this.stopn +'";\n'; 
	htmltext+=SPACES.substr(0,12)+'shape.shadow='+this.shadow +';\n';
	htmltext+=SPACES.substr(0,12)+'shape.shadowOffsetX="'+   this.shadowOffsetX +'";\n';   
	htmltext+=SPACES.substr(0,12)+'shape.shadowOffsetY ="'+   this.shadowOffsetY  +'";\n';   
	htmltext+=SPACES.substr(0,12)+'shape.shadowBlur="'+   this.shadowBlur +'";\n';   
	htmltext+=SPACES.substr(0,12)+'shape.zIndex="'+this.zIndex +'";\n';
	htmltext+=SPACES.substr(0,12)+'shape.crnradius="'+this.crnradius +'";\n';
	htmltext+=SPACES.substr(0,12)+'shape.strokeStyle=['+this.strokeStyle+'];\n';
	htmltext+=SPACES.substr(0,12)+'shape.fillStyle=['+this.fillStyle+'];\n';
	htmltext+=SPACES.substr(0,12)+'shape.lineGrad=['+this.lineGrad+'];\n';
	htmltext+=SPACES.substr(0,12)+'shape.radGrad=['+this.radGrad+'];\n';
	htmltext+=SPACES.substr(0,12)+'shape.shadowColor=['+ this.shadowColor +'];\n'; 
	htmltext+=SPACES.substr(0,12)+'shape.colorStops=[\n';
	for(var i=0;i<this.colorStops.length-1;i++)
	{
		htmltext+=SPACES.substr(0,15)+'['+this.colorStops[i]+'],\n'; 
	}
	htmltext+=SPACES.substr(0,15)+'['+this.colorStops[i]+']\n'; 
	htmltext+=SPACES.substr(0,12)+'];\n';
	node=this.path.next;
	while(node.point.x!="end")
	{
		
		htmltext+=SPACES.substr(0,12)+'p=new Point('+node.point.x+','+node.point.y+');\n';
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
		htmltext+=SPACES.substr(0,12)+'c1=new Point('+nc1x+','+nc1y+');\n';
		htmltext+=SPACES.substr(0,12)+'c2=new Point('+nc2x+','+nc2y+');\n';
		htmltext+=SPACES.substr(0,12)+'node=new Node(p,c1,c2);\n';
		htmltext+=SPACES.substr(0,12)+'node.corner="'+node.corner+'";\n';
		htmltext+=SPACES.substr(0,12)+'node.vertex="'+node.vertex+'";\n';
		htmltext+=SPACES.substr(0,12)+'shape.addNode(node);\n';
		node=node.next;
	}
	htmltext+=SPACES.substr(0,12)+'shape.addTo($("'+fleldiv+'"));\n';
	htmltext+=SPACES.substr(0,6)+'//---------- End Of Shape---Base is '+this.title+'-------------------------\n';
}

function pathshapeCode(type)  //type is string 'node', 'ctrl1' 'ctrl2'
{
	var node;
	var nc1x,nc1y,nc2x,nc2y;
	htmltext+='\n';
	htmltext+=SPACES.substr(0,6)+'//---------- Type Path Shape--- '+this.name+' '+type+' -------------------------\n';	
	htmltext+=SPACES.substr(0,12)+'pathshape=new PathShape("'+this.name+'");\n';
	node=this.path.next;
	while(node.point.x!="end")
	{
		
		htmltext+=SPACES.substr(0,12)+'p=new Point('+node.point.x+','+node.point.y+');\n';
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
		htmltext+=SPACES.substr(0,12)+'c1=new Point('+nc1x+','+nc1y+');\n';
		htmltext+=SPACES.substr(0,12)+'c2=new Point('+nc2x+','+nc2y+');\n';
		htmltext+=SPACES.substr(0,12)+'pathnode=new Node(p,c1,c2);\n';
		htmltext+=SPACES.substr(0,12)+'pathnode.corner="'+node.corner+'";\n';
		htmltext+=SPACES.substr(0,12)+'pathnode.vertex="'+node.vertex+'";\n';
		htmltext+=SPACES.substr(0,12)+'pathshape.addNode(pathnode);\n';
		node=node.next;
	}
	htmltext+=SPACES.substr(0,12)+'node.'+type+'path=pathshape\n';
	if(type=="node")
	{
		htmltext+=SPACES.substr(0,12)+'node.nodepath.nodeTweening={\n';
		htmltext+=SPACES.substr(0,42)+'active:'+this.nodeTweening.active+',\n';
		if(isNaN(this.nodeTweening.repeat))
		{
			htmltext+=SPACES.substr(0,35)+'repeat:"c",\n';
		}
		else
		{
			htmltext+=SPACES.substr(0,35)+'repeat:'+this.nodeTweening.repeat+',\n';
		}
		htmltext+=SPACES.substr(0,42)+'yoyo:'+this.nodeTweening.yoyo+',\n';
		htmltext+=SPACES.substr(0,42)+'twtime:'+this.nodeTweening.twtime+',\n';	
		htmltext+=SPACES.substr(0,12)+'}\n';	
		htmltext+=SPACES.substr(0,12)+'copynode.nodepath=node.nodepath\n';
	}
	htmltext+=SPACES.substr(0,6)+'//---------- End Of Path Shape--- '+this.name+' '+type+' -------------------------\n';
}

function tweenHTML(fleldiv)
{
	var shape, copy, tweenshape;
	if(this.nodeTweening.active || this.pointTweening)
	{
		var npths=0;
		for(var name in this.nodePaths)
		{
			npths++
		}
		if(npths==0)
		{
			this.startNodePaths();
		}
		else
		{
			this.setNodePaths();
		}
	}
	this.prepareTweens();
	htmltext+='\n';
	htmltext+=SPACES.substr(0,3)+'//--- Type Tween---Base is '+this.title+'-----------------------------\n';
	htmltext+=SPACES.substr(0,12)+'tween=new Tween("'+this.name+'");\n';
	shape=this.getShape();
	htmltext+='\n';
	htmltext+=SPACES.substr(0,3)+'//---------- Type Tween Shape---Base is '+shape.title+'-------------------------\n';
	shape.shapeCode(fleldiv);
	htmltext+=SPACES.substr(0,12)+'shape.centreOfRotation={\n';
	htmltext+=SPACES.substr(0,40)+'x:'+shape.group.centreOfRotation.x+',\n';
	htmltext+=SPACES.substr(0,40)+'y:'+shape.group.centreOfRotation.y+',\n';
	htmltext+=SPACES.substr(0,12)+'}\n';
	htmltext+=SPACES.substr(0,12)+'tween.shape=shape;\n';
	copy=this.copy.getShape();
	htmltext+='\n';
	htmltext+=SPACES.substr(0,3)+'//---------- Type Tween Copy---Base is '+copy.title+'-------------------------\n';
	copy.shapeCode(fleldiv);
	htmltext+=SPACES.substr(0,12)+'shape.centreOfRotation={\n';
	htmltext+=SPACES.substr(0,40)+'x:'+copy.group.centreOfRotation.x+',\n';
	htmltext+=SPACES.substr(0,40)+'y:'+copy.group.centreOfRotation.y+',\n';
	htmltext+=SPACES.substr(0,12)+'}\n';
	htmltext+=SPACES.substr(0,12)+'tween.copy=shape;\n';
	htmltext+='\n';
	htmltext+=SPACES.substr(0,3)+'//---------- Type Tween Tweenshape---Base is '+this.tweenshape.title+'-------------------------\n';
	this.tweenshape.shapeCode(fleldiv);
	htmltext+=SPACES.substr(0,12)+'tween.tweenshape=shape;\n';
	htmltext+=SPACES.substr(0,12)+'tween.translate = {\n';
	htmltext+=SPACES.substr(0,35)+'active:'+this.translate.active+',\n';
	htmltext+=SPACES.substr(0,35)+'twtime:'+this.translate.twtime+',\n';
	if(isNaN(this.translate.repeat))
	{
		htmltext+=SPACES.substr(0,35)+'repeat:"c",\n';
	}
	else
	{
		htmltext+=SPACES.substr(0,35)+'repeat:'+this.translate.repeat+',\n';
	}
	htmltext+=SPACES.substr(0,35)+'yoyo:'+this.translate.yoyo+',\n';
	htmltext+=SPACES.substr(0,12)+'};\n';
	htmltext+=SPACES.substr(0,12)+'tween.rotate = {\n';
	htmltext+=SPACES.substr(0,35)+'active:'+this.rotate.active+',\n';
	htmltext+=SPACES.substr(0,35)+'twtime:'+this.rotate.twtime+',\n';
	if(isNaN(this.rotate.repeat))
	{
		htmltext+=SPACES.substr(0,35)+'repeat:"c",\n';
	}
	else
	{
		htmltext+=SPACES.substr(0,35)+'repeat:'+this.rotate.repeat+',\n';
	}
	htmltext+=SPACES.substr(0,35)+'yoyo:'+this.rotate.yoyo+',\n';
	htmltext+=SPACES.substr(0,12)+'};\n';
	htmltext+=SPACES.substr(0,12)+'tween.linestyles = {\n';
	htmltext+=SPACES.substr(0,35)+'active:'+this.linestyles.active+',\n';
	htmltext+=SPACES.substr(0,35)+'twtime:'+this.linestyles.twtime+',\n';
	if(isNaN(this.linestyles.repeat))
	{
		htmltext+=SPACES.substr(0,35)+'repeat:"c",\n';
	}
	else
	{
		htmltext+=SPACES.substr(0,35)+'repeat:'+this.linestyles.repeat+',\n';
	}
	htmltext+=SPACES.substr(0,35)+'yoyo:'+this.linestyles.yoyo+',\n';
	htmltext+=SPACES.substr(0,12)+'};\n';
	htmltext+=SPACES.substr(0,12)+'tween.linecolour = {\n';
	htmltext+=SPACES.substr(0,35)+'active:'+this.linecolour.active+',\n';
	htmltext+=SPACES.substr(0,35)+'twtime:'+this.linecolour.twtime+',\n';
	if(isNaN(this.linecolour.repeat))
	{
		htmltext+=SPACES.substr(0,35)+'repeat:"c",\n';
	}
	else
	{
		htmltext+=SPACES.substr(0,35)+'repeat:'+this.linecolour.repeat+',\n';
	}
	htmltext+=SPACES.substr(0,35)+'yoyo:'+this.linecolour.yoyo+',\n';
	htmltext+=SPACES.substr(0,12)+'};\n';
	htmltext+=SPACES.substr(0,12)+'tween.fillcolour = {\n';
	htmltext+=SPACES.substr(0,35)+'active:'+this.fillcolour.active+',\n';
	htmltext+=SPACES.substr(0,35)+'twtime:'+this.fillcolour.twtime+',\n';
	if(isNaN(this.fillcolour.repeat))
	{
		htmltext+=SPACES.substr(0,35)+'repeat:"c",\n';
	}
	else
	{
		htmltext+=SPACES.substr(0,35)+'repeat:'+this.fillcolour.repeat+',\n';
	}
	htmltext+=SPACES.substr(0,35)+'yoyo:'+this.fillcolour.yoyo+',\n';
	htmltext+=SPACES.substr(0,12)+'};\n';
	htmltext+=SPACES.substr(0,12)+'tween.gradfill = {\n';
	htmltext+=SPACES.substr(0,35)+'active:'+this.gradfill.active+',\n';
	htmltext+=SPACES.substr(0,35)+'twtime:'+this.gradfill.twtime+',\n';
	if(isNaN(this.gradfill.repeat))
	{
		htmltext+=SPACES.substr(0,35)+'repeat:"c",\n';
	}
	else
	{
		htmltext+=SPACES.substr(0,35)+'repeat:'+this.gradfill.repeat+',\n';
	}
	htmltext+=SPACES.substr(0,35)+'yoyo:'+this.gradfill.yoyo+',\n';
	htmltext+=SPACES.substr(0,12)+'};\n';
	htmltext+=SPACES.substr(0,12)+'tween.shadow = {\n';
	htmltext+=SPACES.substr(0,35)+'active:'+this.shadow.active+',\n';
	htmltext+=SPACES.substr(0,35)+'twtime:'+this.shadow.twtime+',\n';
	if(isNaN(this.shadow.repeat))
	{
		htmltext+=SPACES.substr(0,35)+'repeat:"c",\n';
	}
	else
	{
		htmltext+=SPACES.substr(0,35)+'repeat:'+this.shadow.repeat+',\n';
	}
	htmltext+=SPACES.substr(0,35)+'yoyo:'+this.shadow.yoyo+',\n';
	htmltext+=SPACES.substr(0,12)+'};\n';
	htmltext+=SPACES.substr(0,12)+'tween.edit = {\n';
	htmltext+=SPACES.substr(0,35)+'active:'+this.edit.active+',\n';
	htmltext+=SPACES.substr(0,35)+'twtime:'+this.edit.twtime+',\n';
	if(isNaN(this.edit.repeat))
	{
		htmltext+=SPACES.substr(0,35)+'repeat:"c",\n';
	}
	else
	{
		htmltext+=SPACES.substr(0,35)+'repeat:'+this.edit.repeat+',\n';
	}
	htmltext+=SPACES.substr(0,35)+'yoyo:'+this.edit.yoyo+',\n';
	htmltext+=SPACES.substr(0,12)+'};\n';
	htmltext+=SPACES.substr(0,12)+'tween.nodeTweening = {\n';
	htmltext+=SPACES.substr(0,35)+'active:'+this.nodeTweening.active+',\n';
	htmltext+=SPACES.substr(0,35)+'twtime:'+this.nodeTweening.twtime+',\n';
	if(isNaN(this.nodeTweening.repeat))
	{
		htmltext+=SPACES.substr(0,35)+'repeat:"c",\n';
	}
	else
	{
		htmltext+=SPACES.substr(0,35)+'repeat:'+this.nodeTweening.repeat+',\n';
	}
	htmltext+=SPACES.substr(0,35)+'yoyo:'+this.nodeTweening.yoyo+',\n';
	htmltext+=SPACES.substr(0,12)+'};\n';
	htmltext+=SPACES.substr(0,12)+'tween.pointTweening='+this.pointTweening+';\n';
	htmltext+=SPACES.substr(0,12)+'tween.reverse='+this.reverse+';\n';
	if(isNaN(this.maxruntime))
	{
		htmltext+=SPACES.substr(0,12)+'tween.maxruntime="always";\n';
	}
	else
	{
		htmltext+=SPACES.substr(0,12)+'tween.maxruntime='+this.maxruntime+';\n';
	}
	if(this.nodeTweening.active || this.pointTweening)
	{
		var node=this.getShape().path.next;
		htmltext+=SPACES.substr(0,12)+'node=tween.shape.path.next;\n';
		htmltext+=SPACES.substr(0,12)+'copynode=tween.copy.path.next;\n';
		while(node.point.x!="end")
		{
			node.nodepath.pathshapeCode('node');
			if(node.vertex=="B") 
			{
				node.ctrl1path.pathshapeCode('ctrl1');
				node.ctrl2path.pathshapeCode('ctrl2');
			}
			htmltext+=SPACES.substr(0,12)+'node=node.next;\n';
			htmltext+=SPACES.substr(0,12)+'copynode=copynode.next;\n';
			node=node.next;
		}
	}
	htmltext+='\n';
	htmltext+=SPACES.substr(0,3)+'//--- Type Tween---Base is '+this.title+'-----------------------------\n';
}

function spriteCode(fleldiv)
{
	var shape,shapes;
	var train;
	switch (this.engine)
	{
		case "scene":
			htmltext+='\n';
			htmltext+=SPACES.substr(0,3)+'//--- Type Sprite---Base is '+this.title+'-----------------------------\n';
			htmltext+='\n';
			htmltext+=SPACES.substr(0,3)+'//---------- Type Train Scene---Base is '+this.train.title+'-------------------------\n';
			htmltext+=SPACES.substr(0,12)+'scene=new Scene("'+this.train.name+'");\n';
			shapes=this.train.shapes;
			for (var name in shapes)
			{
				shape=shapes[name];
				shape.shapeCode(fleldiv);
				htmltext+=SPACES.substr(0,12)+'scene.shapes[shape.name]=shape;\n';
			}
			htmltext+='\n';
			htmltext+=SPACES.substr(0,3)+'//---------- End of Train Scene---Base is '+this.train.title+'-------------------------\n';
		break
		case "tween":
			htmltext+='\n';
			htmltext+=SPACES.substr(0,3)+'//--- Type Sprite---Base is '+this.title+'-----------------------------\n';
			htmltext+='\n';
			htmltext+=SPACES.substr(0,3)+'//---------- Type Train Tween---Base is '+this.train.title+'-------------------------\n';
			this.train.tweenHTML(fleldiv);
			htmltext+='\n';
			htmltext+=SPACES.substr(0,3)+'//---------- End of Train Tween---Base is '+this.train.title+'-------------------------\n';
		break
		default:
			this.train.spriteCode(fleldiv);
		break
	}
	htmltext+='\n';
	htmltext+=SPACES.substr(0,6)+'//---------- Track ---Base is '+this.track.title+'-------------------------\n';
	shape=this.track.getShape();
	shape.shapeCode(fleldiv);
	htmltext+=SPACES.substr(0,12)+'track=new Track("'+this.track.name+'");\n';
	htmltext+=SPACES.substr(0,12)+'track.shape=shape;\n';
	if(isNaN(this.track.repeats))
	{
		htmltext+=SPACES.substr(0,12)+'track.repeats="'+this.track.repeats+'";\n';
	}
	else
	{
		htmltext+=SPACES.substr(0,12)+'track.repeats='+this.track.repeats+';\n';
	}
	htmltext+=SPACES.substr(0,12)+'track.visible='+this.track.visible+';\n';
	htmltext+=SPACES.substr(0,12)+'track.yoyo='+this.track.yoyo+';\n';
	htmltext+=SPACES.substr(0,12)+'track.shape.addTo($("'+fleldiv+'"));\n';
	htmltext+='\n';
	htmltext+=SPACES.substr(0,6)+'//---------- End Of Track ---Base is '+this.track.title+'-------------------------\n';

	htmltext+='\n';
	htmltext+=SPACES.substr(0,12)+'sprite=new Sprite("'+this.name+'");\n';
	htmltext+=SPACES.substr(0,12)+'sprite.train='+this.engine+';\n';
	htmltext+=SPACES.substr(0,12)+'sprite.engine="'+this.engine+'";\n';
	htmltext+=SPACES.substr(0,12)+'sprite.track=track;\n';
	htmltext+=SPACES.substr(0,12)+'sprite.ptime='+this.ptime+';\n';
	htmltext+=SPACES.substr(0,12)+'sprite.pointer='+this.pointer+';\n';
	htmltext+=SPACES.substr(0,12)+'sprite.usevec='+this.usevec+';\n';
	htmltext+=SPACES.substr(0,12)+'sprite.expanded='+this.expanded+';\n';
	htmltext+=SPACES.substr(0,12)+'sprite.finishmove='+this.finishmove+';\n';
	htmltext+=SPACES.substr(0,12)+'sprite.vector={xs:'+this.vector.xs+',xe:'+this.vector.xe+',ys:'+this.vector.ys+',ye:'+this.vector.ye+',psi:'+this.vector.psi+'};\n';

	htmltext+='\n';
	htmltext+=SPACES.substr(0,3)+'//--- End Of Sprite---Base is '+this.title+'-----------------------------\n';
		
	htmltext+=SPACES.substr(0,12)+'TRAINS["'+this.name+'"]=sprite;\n';
	return 'TRAINS["'+this.name+'"];';
}

