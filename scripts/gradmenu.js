/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

function gradfill()
{
	coltype='G';
	var group=SELECTEDSHAPE.group;
	if (SELECTEDSHAPE.linearfill)
	{
		var gt='\u00A0 - Linear';
	}
	else
	{
		var gt='\u00A0 - Radial';
	}
	$('colorheadtext').innerHTML='\u00A0 Gradient Stop Colour'+gt;
	removeGradLine();
	removeRotate();
	$("frontmarkerdrop").style.visibility="visible";
	$("backstage").style.visibility="visible";
	if (SELECTEDSHAPE.stopn==SELECTEDSHAPE.colorStops.length-1)
	{
		$('gAdd').style.visibility='hidden';
		$('gDel').style.visibility='hidden';
	}
	else if (SELECTEDSHAPE.stopn==0)
	{
		$('gAdd').style.visibility='inherit';
		$('gDel').style.visibility='hidden';
	}
	else
	{
		$('gAdd').style.visibility='inherit';
		$('gDel').style.visibility='inherit';
	}
	if (SELECTEDSHAPE.justfill)
	{
		createGradLine(SELECTEDSHAPE);
	}
	else
	{
		showGradLine(SELECTEDSHAPE)
	}
	if(!TWEENEDIT)	
	{
		$("gradfillbox").style.visibility="visible";
	}
}


function setlinear()
{
	for(var groupName in SELECTED)
	{
		var group=SELECTED[groupName];
		var shapeNames=group.memberShapes();
		for(var name in shapeNames)
		{
			shape=shapeNames[name];
			shape.linearfill=true;
		}
	}
	removeGradLine();
	showGradLine(SELECTEDSHAPE);
	$('colorheadtext').innerHTML='\u00A0 Gradient Stop Colour\u00A0 - Linear';
}

function setradial()
{
	if(EXCANVASUSED)
	{
		alert("Excanvas for Internet Explorer does not support Radial Fill");
		$("linear").checked="checked";
		return;
	}
	for(var groupName in SELECTED)
	{
		var group=SELECTED[groupName];
		var shapeNames=group.memberShapes();
		for(var name in shapeNames)
		{
			shape=shapeNames[name];
			shape.linearfill=false;
		}
	}
	removeGradLine();
	showGradLine(SELECTEDSHAPE);
	$('colorheadtext').innerHTML='\u00A0 Gradient Stop Colour\u00A0 - Radial';
}

function addStop()
{
	var shape=SELECTEDSHAPE;
	var p=shape.stopn;
	var s=(shape.colorStops[p][0]+shape.colorStops[p+1][0])/2;
	var tempcsn=[s,shape.colorStops[p][1],shape.colorStops[p][2],shape.colorStops[p][3],shape.colorStops[p][4]];

	for(var groupName in SELECTED)
	{
		var group=SELECTED[groupName];
		var shapeNames=group.memberShapes();
		for(var name in shapeNames)
		{
			shape=shapeNames[name];
			shape.colorStops.splice(p+1,0,tempcsn);
			shape.stopn=p+1;
			shape.justfill=false;
		}
	}
	removeGradLine();
	showGradLine(shape);
	$('gDel').style.visibility='visible';
}

function delStop()
{
	var shape=SELECTEDSHAPE;
	var p=shape.stopn;
	var tempcs=[];
	for(var i=0;i<p;i++)
	{
		tempcs.push(shape.colorStops[i]);
	}
	for(var i=p+1;i<shape.colorStops.length;i++)
	{
		tempcs.push(shape.colorStops[i]);
	}
	for(var groupName in SELECTED)
	{
		var group=SELECTED[groupName];
		var shapeNames=group.memberShapes();
		for(var name in shapeNames)
		{
			nshape=shapeNames[name];
			nshape.colorStops=tempcs;
			nshape.stopn=p-1;
		}
	}
	removeGradLine();
	showGradLine(shape);
	if (shape.stopn==0)
	{
		$('gDel').style.visibility='hidden';
	}
}

