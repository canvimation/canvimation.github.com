/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

function gradfill()
{
	if(ieb)
	{
		alert("Excanvas for Internet Explorer does not support Radial Fill");
		return;
	}
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
	$("gradientfly").style.visibility="visible";
	$("gradientdrop").style.visibility="visible";
	if (SELECTEDSHAPE.justfill)
	{
		createGradLine(SELECTEDSHAPE);
	}
	else
	{
		showGradLine(SELECTEDSHAPE)
	}	
	$("gradfillbox").style.visibility="visible";
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

function addpoint()
{
	var canv=selected[0];
	var p=canv.stopn;
	var s=(canv.colorStops[p][0]+canv.colorStops[p+1][0])/2;
	var tempcsn=[s,canv.colorStops[p][1],canv.colorStops[p][2],canv.colorStops[p][3],canv.colorStops[p][4]];
	var tempcs=[];
	for (var i=0; i<=p;i++)
	{
		tempcs[i]=canv.colorStops[i];
	}
	tempcs[p+1]=tempcsn
	for (var i=p+1; i<canv.colorStops.length;i++)
	{
		tempcs[i+1]=canv.colorStops[i];
	}
	for (var i=0; i<selected.length;i++)
	{
		selected[i].colorStops=tempcs
	}
	removeGradLine();
	showGradLine(canv);
	
}

