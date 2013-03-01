/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function Track(name)
{
	this.name=name;
	this.title;
	this.shapes={};
	this.groups={};
	this.repeats=0;
	this.visible=false;
	this.yoyo=false;
	this.length;
	this.lengths=[];
	this.times=[];
	this.ptime=0; //time over path from sprite.ptime;
	
	//methods
	this.setAniStage=setAniStage;
	this.copytrack=copytrack;
	this.drawtrack=drawtrack;
	this.getShape=getShape;
	this.setLengths=setLengths;
	this.setTimes=setTimes;
	this.saveTrack=saveTrack;
	this.restoreTrack=restoreTrack;
	this.TrackToText=TrackToText;
}

function copytrack(theatre)
{
	theatre+="stage";
	var track=new Track("SUBTR"+(NCOUNT++));
	track.title=this.title;
	elementShapeCopy(this.groups,track.groups,track.shapes,0,$(theatre));
	track.repeats=this.repeats;
	track.yoyo=this.yoyo;
	track.visible=this.visible;
	return track;
}

function getShape()
{
	for(var name in this.shapes)
  	{
  		var shape=this.shapes[name];
  	}
  	return shape;
}

function setLengths()
{
	this.length=0; //cummulative total of section lengths
	this.lengths=[]; //array of section lengths
	var sl;  //section length
	path=this.getShape().path;
	var node=path.next; // from first node
	while(node.next.point.x!="end")  // check if next node is a point or end node, if point calculate length of path between nodes
	{
	  switch (node.next.vertex)
	  {
		case 'B':
			sl = curvelength(node);
			
		break
		case 'L':
			sl=linelength(node);
		break
	  }
	  this.length += sl;
	  this.lengths.push(sl);
	  node=node.next;
	};
}

function setTimes() 
{
	var v=this.length/this.ptime;
	var cuml_time=0; //cummulative time over sections
	var t; //time over a section
	this.times=[0];
	for (var i=0; i<this.lengths.length; i++)
	{
		t=this.lengths[i]/v; //time over section
		cuml_time +=t;
		this.times.push(cuml_time);
	}
}

function drawtrack(showpathline)
{
	var shape=this.getShape()
	if(showpathline)
	{
		shape.drawjustpath();
	}
	else
	{
		if(this.visible)
		{
			shape.draw();
		}
	}
	shape.Canvas.ctx.restore();
	shape.Canvas.ctx.save();
}

function saveTrack()
{
	var shape=this.getShape();
	shape.Canvas.ctx.save();
}

function restoreTrack()
{
	var shape=this.getShape();
	shape.Canvas.ctx.restore();
}
