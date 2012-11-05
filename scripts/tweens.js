/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function Tween(name)
{
	this.name=name;
	this.title;
	this.shapes={};
	this.groups={};
	this.copy={shapes:{},groups:{}};
	this.length;
	this.lengths=[];
	this.times=[];
	this.ptime; //time over path from sprite.ptime;
	
	//methods
	this.setAniStage=setAniStage;
	this.copytween=copytween;
	this.drawtween=drawtween;
	this.getShape=getShape;
	//this.setLengths=setLengths;
	//this.setTimes=setTimes;
	//this.saveTween=saveTween;
	//this.restoreTween=restoreTween;
	//this.TweenToText=TweenToText;
	this.copy.getShape=getShape;
}

function copytween(theatre)
{
	theatre+="stage";
	var tween=new Track("SUBTR"+(NCOUNT++));
	tween.title=this.title;
	elementShapeCopy(this.groups,tween.groups,tween.shapes,0,$(theatre));
	tween.copy=this.copy;
	return tween;
}

function drawtween()
{
	var shape=this.getShape();
	var copy=this.copy.getShape();
	shape.draw();
	copy.draw();
	shape.Canvas.ctx.restore();
	shape.Canvas.ctx.save();
}