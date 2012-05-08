/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function updategrid()
{
	var gon=$("gridon").checked;
	var show=$("gridshow").checked;
	var width=parseInt($("gridwidth").value);
	var height=parseInt($("gridheight").value);
	if(isNaN(width)) {width=30};
	if(isNaN(height)) {height=30};
	GRIDDROP.width=width;
	GRIDDROP.height=height;
	if(gon)
	{
		xgrid=width;
		ygrid=height;
	}
	else
	{
		xgrid=1;
		ygrid=1;
	}
	if (show) 
	{
		$("griddrop").style.visibility="visible";
		drawgrid()
	}
	else
	{
		$("griddrop").style.visibility="hidden";
	}
}

function drawgrid()
{
	GRIDDROP.Canvas.ctx.clearRect(0,0,SCRW,SCRH);
	GRIDDROP.Canvas.ctx.beginPath();
	
	GRIDDROP.Canvas.ctx.strokeStyle='rgb(64,255,255)';
	for (var x=0; x<SCRW; x +=GRIDDROP.width)
	{
		GRIDDROP.Canvas.ctx.moveTo(x,0);
		GRIDDROP.Canvas.ctx.lineTo(x,SCRH);
	}
	for (var y=0; y<SCRH; y +=GRIDDROP.height)
	{
		GRIDDROP.Canvas.ctx.moveTo(0,y);
		GRIDDROP.Canvas.ctx.lineTo(SCRW,y);
	}	
	GRIDDROP.Canvas.ctx.stroke();
}
