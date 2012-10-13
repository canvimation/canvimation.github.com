/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function Scene(name)
{
	this.name=name;
	this.title=name;
	this.groups={};
	this.shapes={};
	
	//methods
	this.setAniStage=setAniStage;
	this.copyscene=copyscene;
	this.drawscene=drawscene;
	this.addToStage=addToStage;
	this.SceneToText=SceneToText;
}

function copyscene(theatre)
{
	theatre+="stage";
	var scene=new Scene("SUBSC"+(NCOUNT++));
	scene.title=this.title;
	elementShapeCopy(this.groups,scene.groups,scene.shapes,0,$(theatre));
	return scene;
}

function drawscene()
{
	for(var name in this.shapes)
	{
		this.shapes[name].draw();
		this.shapes[name].Canvas.ctx.restore();
		this.shapes[name].Canvas.ctx.save();
	}
}

function addToStage(theatre)
{
	for(var name in this.shapes)
	{
		shape=this.shapes[name];
		shape.addTo(theatre);
	}
}

function setAniStage()
{
	var group;
	removeGradLine();
	closeStops();
	removeRotate();
	$("rotatebox").style.visibility="hidden";
	$("gradfillbox").style.visibility="hidden";
	hideTools();
	closeColor();
	SELECTED={};
	BCOUNT=0;
	clear($("markerdrop"));
	clear($("boundarydrop"));

	for(var name in this.groups)
	{
		group=this.groups[name];
		SELECTED[group.name]=group;
		showTools();
		setTools(true);
	}
	$("boundarydrop").style.visibility="visible";
}
