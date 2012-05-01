/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

function setarrow(cur)
{
	$('shdarw').style.left=(cur.x-(parseInt($('shmenu').style.left)-10))+"px";
	$('shdarw').style.top=0;
	if (parseInt($('shdarw').style.left)<0) {$('shdarw').style.left=0+"px"}
	if (parseInt($('shdarw').style.left)>212) {$('shdarw').style.left=212+"px"}
	for (var i=0;i<selected.length;i++)
	{
		selected[i].shadowBlur=parseInt($('shdarw').style.left);
		drawline(selected[i]);
	}
}

function shclosediv()
{
	var lbody=$('shBody'); 
	if (parseInt(lbody.style.top)+parseInt(lbody.style.height)>25)
	{
		lbody.style.top = (parseInt(lbody.style.top)-5)+"px";
		setTimeout(function () {shclosediv()},10)
	}
}

function shopendiv()
{
	var lbody=$('shBody'); 
	if (parseInt(lbody.style.top)<25)
	{
		lbody.style.top = (parseInt(lbody.style.top)+5)+"px";
		setTimeout(function () {shopendiv()},10)
	}
}

function movshdright()
{
	for(var groupName in SELECTED)
	{
		var group=SELECTED[groupName];
		var shapeNames=group.memberShapes();
		for(var name in shapeNames)
		{
			shape=shapeNames[name];
			shape.shadowOffsetX+=1;
			shape.draw();
		}
	}
	msr=setTimeout(function() {movshdright()},50)
}

function stopshdright()
{
	clearTimeout(msr);
}

function movshdleft()
{
	for(var groupName in SELECTED)
	{
		var group=SELECTED[groupName];
		var shapeNames=group.memberShapes();
		for(var name in shapeNames)
		{
			shape=shapeNames[name];
			shape.shadowOffsetX-=1;
			shape.draw();
		}
	}
	msl=setTimeout(function() {movshdleft()},50)
}

function stopshdleft()
{
	clearTimeout(msl);
}

function movshdup()
{
	for(var groupName in SELECTED)
	{
		var group=SELECTED[groupName];
		var shapeNames=group.memberShapes();
		for(var name in shapeNames)
		{
			shape=shapeNames[name];
			shape.shadowOffsetY-=1;
			shape.draw();
		}
	}
	msu=setTimeout(function() {movshdup()},50)
}

function stopshdup()
{
	clearTimeout(msu);
}

function movshddown()
{
	for(var groupName in SELECTED)
	{
		var group=SELECTED[groupName];
		var shapeNames=group.memberShapes();
		for(var name in shapeNames)
		{
			shape=shapeNames[name];
			shape.shadowOffsetY+=1;
			shape.draw();
		}
	}
	msd=setTimeout(function() {movshddown()},50)
}

function stopshddown()
{
	clearTimeout(msd);
}


function shadow()
{
	if (EXCANVASUSED) 
	{
		alert('Internet Explorer using Excanvas does not support Shadows');
		return;
	}
	$("shadowbox").style.visibility="visible";
	
	getshadowcolor();
	coltype='S';
	$('colorheadtext').innerHTML='\u00A0 Shadow Colour';
	$('colorbox').style.visibility='visible';
}

function getshadowcolor()
{
	var shape=SELECTEDSHAPE;
	$("redBox").value=shape.shadowColor[0];
	redBoxChanged();
	$("greenBox").value=shape.shadowColor[1];
	greenBoxChanged();
	$("blueBox").value=shape.shadowColor[2];
	blueBoxChanged();
	alphaperct = 100*(1-shape.shadowColor[3]);
	$('varrows').style.left=(256*alphaperct/100-4)+"px";
	$('transptext').innerHTML ='Transparency '+Math.floor(alphaperct)+'%';
	if (EXCANVASUSED)
	{
		$('transpslider').filters.alpha.opacity=100-alphaperct;
	}
	else
	{
		$('transpslider').style.opacity=1-alphaperct/100;
	}
	$("transpslider").style.backgroundColor = currentColor.HexString();
	$("shslider").style.left=(shape.shadowBlur*5)+"px";
}

