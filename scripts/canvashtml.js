/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function exportline(canv,dl,dt)
{
	var drawleft = canvleft-dl;
	var drawtop = canvtop-52-dt;
	newwindow.document.writeln(' ');
	newwindow.document.writeln(spaces.substr(0,15)+'//'+canv.id+';');
	newwindow.document.writeln(spaces.substr(0,15)+'ctx.shadowColor ="rgba(0,0,0,0)";');
   	var rule='rgba('
	for (var j=0;j<3;j++)
	{
		rule += canv.strokeStyle[j]+',';
	} 
	rule +=canv.strokeStyle[j]+')';
	newwindow.document.writeln(spaces.substr(0,15)+'ctx.strokeStyle ="'+rule+'";');
	
	if (canv.lineWidth*100/magscale<=1)
	{
		newwindow.document.writeln(spaces.substr(0,15)+'ctx.lineWidth = '+magscale/100+';');
	}
	else
	{
		newwindow.document.writeln(spaces.substr(0,15)+'ctx.lineWidth = '+canv.lineWidth+';');
	}
	newwindow.document.writeln(spaces.substr(0,15)+'ctx.lineCap = "'+canv.lineCap+'";');
	newwindow.document.writeln(spaces.substr(0,15)+'ctx.lineJoin = "'+canv.lineJoin+'";');
	
	newwindow.document.writeln(spaces.substr(0,15)+'ctx.beginPath();');
	newwindow.document.writeln(spaces.substr(0,15)+'ctx.moveTo('+Math.round(canv.path[3][1]-drawleft)+','+Math.round(canv.path[3][2]-drawtop)+');');
	for (var i=4;i<canv.path.length;i++)
	{
	   if (canv.path[i][0]=="L")
	   {
		newwindow.document.writeln(spaces.substr(0,15)+'ctx.lineTo('+Math.round(canv.path[i][1]-drawleft)+','+Math.round(canv.path[i][2]-drawtop)+');')
	   }
/*	   else if (canv.path[i][0]=="A")
	   {
		newwindow.document.writeln(spaces.substr(0,15)+'ctx.arc('+Math.round(canv.path[i][1]-drawleft)+','+Math.round(canv.path[i][2]-drawtop)+','+Math.round(canv.path[i][3])+','+canv.path[i][4]+','+canv.path[i][5]+','+canv.path[i][6]+');');
	   } */
	   else if (canv.path[i][0]=="M")
	   {
		newwindow.document.writeln(spaces.substr(0,15)+'ctx.moveTo('+Math.round(canv.path[i][1]-drawleft)+','+Math.round(canv.path[i][2]-drawtop)+');');
	   }
	   else if (canv.path[i][0]=="B")
	   {
			newwindow.document.writeln(spaces.substr(0,15)+'ctx.bezierCurveTo('+Math.round(canv.path[i][1]-drawleft)+','+Math.round(canv.path[i][2]-drawtop)+','+Math.round(canv.path[i][3]-drawleft)+','+Math.round(canv.path[i][4]-drawtop)+','+Math.round(canv.path[i][5]-drawleft)+','+Math.round(canv.path[i][6]-drawtop)+');');
	   }
	} 
	if (canv.path[0]=='closed') {newwindow.document.writeln(spaces.substr(0,15)+'ctx.closePath();')}
	newwindow.document.writeln(spaces.substr(0,15)+'ctx.stroke();'); 
	if (canv.path[0]=='closed')
	{
		newwindow.document.writeln(spaces.substr(0,15)+'ctx.shadowOffsetX = '+canv.shadowOffsetX+';');   
   		newwindow.document.writeln(spaces.substr(0,15)+'ctx.shadowOffsetY = '+canv.shadowOffsetY+';');   
   		newwindow.document.writeln(spaces.substr(0,15)+'ctx.shadowBlur = '+canv.shadowBlur+';'); 
		var rule='rgba('
		for (var j=0;j<3;j++)
		{
			rule += canv.shadowColor[j]+',';
		} 
		rule +=canv.shadowColor[j]+')';
   		newwindow.document.writeln(spaces.substr(0,15)+'ctx.shadowColor = "'+rule+'";');
		if (canv.justfill)
		{
			var rule='rgba('
			for (var j=0;j<3;j++)
			{
				rule += canv.fillStyle[j]+',';
			}
			rule +=canv.fillStyle[j]+')';
			newwindow.document.writeln(spaces.substr(0,15)+'ctx.fillStyle = "'+rule+'";');
			
		}
		else
		{
			if (canv.linearfill)
			{
				newwindow.document.writeln(spaces.substr(0,15)+'grad = ctx.createLinearGradient('+Math.round(canv.lineGrad[0]-drawleft)+','+Math.round(canv.lineGrad[1]-drawtop)+','+Math.round(canv.lineGrad[2]-drawleft)+','+Math.round(canv.lineGrad[3]-drawtop)+');');

			}
			else
			{
				newwindow.document.writeln(spaces.substr(0,15)+'grad = ctx.createRadialGradient('+Math.round(canv.radGrad[0]-drawleft)+','+Math.round(canv.radGrad[1]-drawtop)+','+Math.round(canv.radGrad[2])+','+Math.round(canv.radGrad[3]-drawleft)+','+Math.round(canv.radGrad[4]-drawtop)+','+Math.round(canv.radGrad[5])+');');
			}
			var rule;
			for (var k=0; k<canv.colorStops.length;k++)
			{
				rule='rgba('
				for (var j=1;j<4;j++)
				{
					rule += canv.colorStops[k][j]+',';
				}
				rule +=canv.colorStops[k][j]+')';
				newwindow.document.writeln(spaces.substr(0,15)+'grad.addColorStop('+canv.colorStops[k][0]+',"'+rule+'");');
			}
			newwindow.document.writeln(spaces.substr(0,15)+'ctx.fillStyle = grad;');
		}
		newwindow.document.writeln(spaces.substr(0,15)+'ctx.fill();');
	}
}

