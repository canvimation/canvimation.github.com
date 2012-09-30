/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/* Formats for saved elements
 * 
 * shapes-->shape parameters*shape parameters*....*shape parameters¬group parameters*group parameters*.....*group parameters
 * 
 * Canvas-->canvas@width|height^shapes
 * 
 * Scene-->scene@name|title^shapes
 * 
 * Track-->track@track parameters^shape parameters¬group parameters
 * 
 * Base can be a scene or a tween(tween not yet available)
 * 
 * Sprite-->sprite@base~track~sprite parameters#track~sprite parameters#....#track~sprite parameters
 * sprite.train points to previous built sprite.
 */
function ToText()
{
	$("totextbox").style.visibility="visible";
	var ttbh=200;
	var innerhtml = '<br> &nbsp;Select the Elements you want to Export.<br><br>';
	innerhtml +=' &nbsp;Canvas<br>'
	innerhtml += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="cbcanvas">Contents<br>';
	filmhtml='';
	for (var name in FILMS)
	{
		ttbh+=50;
		filmhtml += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="cb'+FILMS[name].name+'">'+FILMS[name].name+'<br>';
	}
	if (filmhtml !='')
	{
		filmhtml='<br> &nbsp;Films<br>'+filmhtml;
	}
	innerhtml +=filmhtml;
	spritehtml='';
	for (var name in SPRITES)
	{
		ttbh+=50;
		spritehtml += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="cb'+SPRITES[name].name+'" >'+SPRITES[name].name+'<br>';
	}
	if (spritehtml !='')
	{
		spritehtml='<br> &nbsp;Sprites<br>'+spritehtml;
	}
	innerhtml +=spritehtml;
	scenehtml='';
	for (var name in SCENES)
	{
		ttbh+=50;
		scenehtml += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="cb'+SCENES[name].name+'" >'+SCENES[name].name+'<br>';
	}
	if (scenehtml !='')
	{
		scenehtml='<br> &nbsp;Scenes<br>'+scenehtml;
	}
	innerhtml +=scenehtml;
	tweenhtml='';
	for (var name in TWEENS)
	{
		ttbh+=50;
		tweenhtml += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="cb'+TWEENS[name].name+'">'+TWEENS[name].name+'<br>';
	}
	if (tweenhtml !='')
	{
		tweenhtml='<br> &nbsp;Tweens<br>'+tweenhtml;
	}
	innerhtml +=tweenhtml;
	trackhtml='';
	for (var name in TRACKS)
	{
		ttbh+=50;
		trackhtml += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="cb'+TRACKS[name].name+'">'+TRACKS[name].name+'<br>';
	}
	if (trackhtml !='')
	{
		trackhtml='<br> &nbsp;Tracks<br>'+trackhtml;
	}
	innerhtml +=trackhtml;
	innerhtml+='<br>';
	innerhtml+='&nbsp;<input type="button" value=" Export " onclick="exportElements()" />';
	innerhtml+='<input type="button" value=" Cancel " onclick="closedialogue(this)" />';
	innerhtml+='<br>&nbsp;';
	totextcontent.innerHTML=innerhtml;
	if(ttbh>375) {ttbh=375};
	//$("totextbox").style.height=ttbh+"px";
	$("totextcontent").style.height=(parseInt($("totextbox").style.height)-25)+"px";
	//$("totextbox").style.clip="rect(auto, auto, auto, auto)";
	$("totextcontent").style.overflow="auto";
}

function GroupToText()
{
	var groupAsText="";
	groupAsText+=this.name+'|';
	groupAsText+=this.title+'|';
	groupAsText+=this.left+'|';
	groupAsText+=this.top+'|';
	groupAsText+=this.width+'|';
	groupAsText+=this.height+'|';
	groupAsText+=this.centreOfRotation.x+'|';
	groupAsText+=this.centreOfRotation.y+'|';
	groupAsText+=this.phi+'|';
	for(var i=0; i<this.members.length; i++)
	{
		if(this.members[i].elType=="_SHAPE")
		{
			groupAsText+="s!";
		}
		else
		{
			groupAsText+="g!";
		}
		groupAsText+=this.members[i].name+":";
	}
	return groupAsText.slice(0,-1);
}

function CanvasToText()
{
	var params='canvas@'+parseInt($("stagearea").style.width)+'|'+parseInt($("stagearea").style.height)+'^';
	var shape;
	for(var name in SHAPES)
	{
		shape=SHAPES[name];
		params+=shape.ShapeToText()+'*';
	}
	params=params.slice(0,-1);
	params+="¬";
	for(var name in GROUPS)
	{
		var group=GROUPS[name];
		params+=group.GroupToText()+'*';
	}
	params=params.slice(0,-1);
	return params;
}

function SceneToText()
{
	var shape,group;
	var params='';
	params+=this.name+"|";
	params+=this.title+"^";
	for(var name in this.shapes)
	{
		var shape=this.shapes[name];
		params+=shape.ShapeToText()+'*';
	}
	params=params.slice(0,-1);
	params+="¬";
	for(var name in this.groups)
	{
		group=this.groups[name];
		params+=group.GroupToText()+'*';
	}
	params=params.slice(0,-1);
	return params;
}

function SpriteToText()
{
	var params ='';
	params +=this.recordsprite();
	params=params.slice(0,-1);
	return params;
}	
	
	
function recordsprite()
{
	if (this.engine=='scene')
	{
		var params=this.track.TrackToText()+'~';
		params +=this.train.SceneToText()+'~';
		params +=this.spriteparams()+'#';
		return params;
	}
	else
	{
		var params=this.train.recordsprite();
		params+=this.track.TrackToText()+'~';
		params+=this.spriteparams()+"#";
		return params;
	}
}
	
function spriteparams()
{
	var params= this.name+'|'+this.title+'|'+this.engine+'|'+this.ptime+'|';
	if (this.usevec)
	{
		params += '1|';
	}
	else
	{
		params +='-1|';
	}
	params +=this.vector.xs+'|'+this.vector.xe+'|'+this.vector.ys+'|'+this.vector.ye+'|'+this.vector.psi;
	return params;
}

function TrackToText()
{
	var shape;
	var params='';
	params +=this.name+'|'+this.title+'|'+this.repeats+'|';
	if (this.visible)
	{
		params +='1|';
	}
	else
	{
		params +='-1|';
	}	
	if (this.yoyo)
	{
		params +='1|';
	}
	else
	{
		params +='-1';
	}
	params+="^";
	for(var name in this.shapes)
	{
		shape=this.shapes[name];
		params+=shape.ShapeToText()+'*';
	}
	params=params.slice(0,-1);
	params+="¬";
	for(var name in this.groups)
	{
		group=this.groups[name];
		params+=group.GroupToText()+'*';
	}
	params=params.slice(0,-1);
	return params;
}

function TweenToText(s)
{
	
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

function ShapeToText()
{
	var shapeAsText='';
	
	shapeAsText+=this.name+'|';
	shapeAsText+=this.title+'|';
	if (this.open)
	{
		shapeAsText+=1+'|';
	}
	else
	{
		shapeAsText+=-1+'|';
	}
	if (this.editable)
	{
		shapeAsText+=1+'|';
	}
	else
	{
		shapeAsText+=-1+'|';
	}
	shapeAsText+=this.type+'|';
	shapeAsText+=this.tplftcrnr.x+'|';
	shapeAsText+=this.tplftcrnr.y+'|';
	shapeAsText+=this.btmrgtcrnr.x+'|';
	shapeAsText+=this.btmrgtcrnr.y+'|';
	shapeAsText+= this.strokeStyle.join()+'|';
	shapeAsText+= this.fillStyle.join()+'|';
	shapeAsText+=this.lineWidth+'|';
	shapeAsText+=this.lineCap+'|';
	shapeAsText+=this.lineJoin+'|';
	if (this.justfill)
	{
		shapeAsText+=1+'|';
	}
	else
	{
		shapeAsText+=-1+'|';
	}	
	if (this.linearfill)
	{
		shapeAsText+=1+'|';
	}
	else
	{
		shapeAsText+=-1+'|';
	}
	shapeAsText+= this.lineGrad.join()+'|';
	shapeAsText+= this.radGrad.join()+'|';
	var carray=[]; //color array for color stops
	for (j=0;j<this.colorStops.length;j++)
	{
		carray[j]=[];
		for (k=0;k<5;k++)
		{
			carray[j][k]=this.colorStops[j][k];
		}
	}
	
	
	for (j=0;j<carray.length;j++)
	{
		carray[j]=carray[j].join();
	}
	carray=carray.join(":");
	
	shapeAsText+=carray+'|';

	shapeAsText+=this.stopn+'|';

	if (this.shadow)
	{
		shapeAsText+=1+'|';
	}
	else
	{
		shapeAsText+=-1+'|';
	}

	shapeAsText+=this.shadowOffsetX+'|';
	shapeAsText+=this.shadowOffsetY+'|';
	shapeAsText+=this.shadowBlur+'|';
	shapeAsText+= this.shadowColor.join()+'|';
	shapeAsText+=this.zIndex+'|';
	shapeAsText+=this.crnradius+'|';
	var node=this.path.next;
	while(node.point.x!="end")
	{
		shapeAsText+=node.vertex+':';
		shapeAsText+=node.corner+':';
		shapeAsText+=node.point.x+':';
		shapeAsText+=node.point.y+':';
		shapeAsText+=node.ctrl1.x+':';
		shapeAsText+=node.ctrl1.y+':';
		shapeAsText+=node.ctrl2.x+':';
		shapeAsText+=node.ctrl2.y+'!';
		node=node.next;
	}
	shapeAsText=shapeAsText.slice(0,-1);
	shapeAsText+='|';
	shapeAsText+= this.group.name;
	
	return shapeAsText;
}

function exportElements()
{
	if ($('cbcanvas').checked)
	{
		var canvastxt=CanvasToText();
		var re = /[\s\r]+/g;
	 	canvastxt=canvastxt.replace(re,'`');
		var newwindow=window.open('Canvas','_blank');
 		newwindow.document.write(canvastxt);
		newwindow.document.close();
	}
	for (var name in SCENES)
	{
		if($('cb'+SCENES[name].name).checked)
		{
			var sctxt="scene@";
			sctxt+=SCENES[name].SceneToText();
			var re = /[\s\r]+/g;
	 		sctxt=sctxt.replace(re,'`');
			var newwindow=window.open(SCENES[name].name,'Scenes - '+SCENES[name].name);
 			newwindow.document.write(sctxt);
			newwindow.document.close();
		}
	}
	for (var name in SPRITES)
	{
		if($('cb'+SPRITES[name].name).checked)
		{
			var sprtxt="sprite@";
			sprtxt+=SPRITES[name].SpriteToText();
			var re = /[\s\r]+/g;
	 		sprtxt=sprtxt.replace(re,'`');
			var newwindow=window.open(SPRITES[name].name,'Sprite - '+SPRITES[name].name);
 			newwindow.document.write(sprtxt);
			newwindow.document.close();
		}
	}
	for (var name in TWEENS)
	{
		if($('cb'+TWEENS[name].name).checked)
		{
			TWEENS[name].tweentotext()
		}
	}
	for (var name in TRACKS)
	{
		if($('cb'+TRACKS[name].name).checked)
		{
			var trktxt="track@";
			trktxt+=TRACKS[name].TrackToText();
			trktxt=trktxt.slice(0,-1);
			var re = /[\s\r]+/g;
	 		trktxt=trktxt.replace(re,'`');
			var newwindow=window.open(TRACKS[name].name,'Track - '+TRACKS[name].name);
 			newwindow.document.write(trktxt);
			newwindow.document.close();
		}
	}
	for (var name in FILMS)
	{
		if($('cb'+FILMS[name].name).checked)
		{
			var flmtxt='film^';
			flmtxt+=FILMS[name].FilmToText();
			var re = /[\s\r]+/g;
	 		flmtxt=flmtxt.replace(re,'`');
			var newwindow=window.open('','Film - '+FILMS[name].name);
 			newwindow.document.write(flmtxt);
			newwindow.document.close();
		}
	}
}