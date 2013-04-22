/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

function shaperotate()
{
	removeRotate();
	removeGradLine();
	$("rotatebox").style.visibility="visible";
	var shape=SELECTEDSHAPE;
	var group=shape.group;
	$("rotateCentre").style.left=(group.centreOfRotation.x-6)+"px";
	$("rotateCentre").style.top=(group.centreOfRotation.y-6)+"px";
	$("rotateMove").style.left=(group.centreOfRotation.x+ROTATIONRADIUS*Math.cos(group.phi)-6)+"px";
	$("rotateMove").style.top=(group.centreOfRotation.y+ROTATIONRADIUS*Math.sin(group.phi)-6)+"px";
	$("rotateCentre").style.visibility="visible";
	$("rotateMove").style.visibility="visible";
	$("frontmarkerdrop").style.visibility="visible";
	$("rotateCentre").left=parseInt($("rotateCentre").style.left);
	$("rotateCentre").top=parseInt($("rotateCentre").style.top);
	$("rotateMove").left=parseInt($("rotateMove").style.left);
	$("rotateMove").top=parseInt($("rotateMove").style.top);
	$("rotateangle").value=Math.round(group.phi*180/Math.PI);
}

function removeRotate()
{
	$("rotateCentre").style.visibility="hidden";
	$("rotateMove").style.visibility="hidden";
	//$("frontmarkerdrop").style.visibility="hidden";
}

function updatecenter()
{console.log("here");
	var cm=$("rotateCentre");
	var mm=$("rotateMove");
	var dx=parseInt(cm.style.left)-cm.left;
	var dy=parseInt(cm.style.top)-cm.top;
	cm.left=parseInt(cm.style.left);
	cm.top=parseInt(cm.style.top);
	mm.left+=dx;
	mm.top+=dy;
	mm.style.left=mm.left+"px";
	mm.style.top=mm.top+"px";
	for (var groupName in SELECTED)
	{
		SELECTED[groupName].centreOfRotation.x +=dx;
		SELECTED[groupName].centreOfRotation.y +=dy;
	}
}

function updateangle(phi)
{
	var shape=SELECTEDSHAPE;
	var mm=$("rotateMove");
	if (arguments.length==0)
	{
		var dx=parseInt(mm.style.left)+6-shape.group.centreOfRotation.x;
		var dy=parseInt(mm.style.top)+6-shape.group.centreOfRotation.y;
		phi = arctan(dy,dx);
	}
	else
	{
		phi*=Math.PI/180;
		
	}
	
	mm.left=shape.group.centreOfRotation.x+ROTATIONRADIUS*Math.cos(phi)-6;
	mm.top=shape.group.centreOfRotation.y+ROTATIONRADIUS*Math.sin(phi)-6;
	mm.style.left=mm.left+"px";
	mm.style.top=mm.top+"px";
	
	for (var groupName in SELECTED)
	{
		var group=SELECTED[groupName];
		group.groupRotate(phi-group.phi);
		group.phi=phi;
		$("rotateangle").value=Math.round(group.phi*180/Math.PI);
	}
	if(TWEENEDIT)
	{
		CURRENTTWEEN.rotate.active=true;
		CURRENTTWEEN.setTweenTimeBox();
	}
}

