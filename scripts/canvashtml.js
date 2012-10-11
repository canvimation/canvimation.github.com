/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function exportshape(name)
{
	var shape=SHAPES[name];
	var dl=parseInt($("stagearea").style.left);
	var dt=parseInt($("stagearea").style.top);
	newwindow.document.writeln(' ');
	newwindow.document.writeln(SPACES.substr(0,15)+'//'+shape.name+';');
	newwindow.document.writeln(SPACES.substr(0,15)+'ctx.shadowColor ="rgba(0,0,0,0)";');
   	var rule='rgba('
	for (var j=0;j<3;j++)
	{
		rule += shape.strokeStyle[j]+',';
	} 
	rule +=shape.strokeStyle[j]+')';
	newwindow.document.writeln(SPACES.substr(0,15)+'ctx.strokeStyle ="'+rule+'";');
	newwindow.document.writeln(SPACES.substr(0,15)+'ctx.lineWidth = '+shape.lineWidth+';');
	newwindow.document.writeln(SPACES.substr(0,15)+'ctx.lineCap = "'+shape.lineCap+'";');
	newwindow.document.writeln(SPACES.substr(0,15)+'ctx.lineJoin = "'+shape.lineJoin+'";');
	
	newwindow.document.writeln(SPACES.substr(0,15)+'ctx.beginPath();');
	var node=shape.path.next;
	newwindow.document.writeln(SPACES.substr(0,15)+'ctx.moveTo('+(Math.round(node.point.x)-dl)+','+(Math.round(node.point.y)-dt)+');');
	node=node.next;
	while(node.point.x!="end")
	{
	   if (node.vertex=="L")
	   {
		newwindow.document.writeln(SPACES.substr(0,15)+'ctx.lineTo('+(Math.round(node.point.x)-dl)+','+(Math.round(node.point.y)-dt)+');')
	   }

	   else
	   {
			newwindow.document.writeln(SPACES.substr(0,15)+'ctx.bezierCurveTo('+(Math.round(node.ctrl1.x)-dl)+','+(Math.round(node.ctrl1.y)-dt)+','+(Math.round(node.ctrl2.x)-dl)+','+(Math.round(node.ctrl2.y)-dt)+','+(Math.round(node.point.x)-dl)+','+(Math.round(node.point.y)-dt)+');');
	   }
	   node=node.next;
	} 
	if (!shape.open) {newwindow.document.writeln(SPACES.substr(0,15)+'ctx.closePath();')}
	newwindow.document.writeln(SPACES.substr(0,15)+'ctx.stroke();'); 
	if (!shape.open)
	{
		newwindow.document.writeln(SPACES.substr(0,15)+'ctx.shadowOffsetX = '+shape.shadowOffsetX+';');   
   		newwindow.document.writeln(SPACES.substr(0,15)+'ctx.shadowOffsetY = '+shape.shadowOffsetY+';');   
   		newwindow.document.writeln(SPACES.substr(0,15)+'ctx.shadowBlur = '+shape.shadowBlur+';'); 
		var rule='rgba('
		for (var j=0;j<3;j++)
		{
			rule += shape.shadowColor[j]+',';
		} 
		rule +=shape.shadowColor[j]+')';
   		newwindow.document.writeln(SPACES.substr(0,15)+'ctx.shadowColor = "'+rule+'";');
		if (shape.justfill)
		{
			var rule='rgba('
			for (var j=0;j<3;j++)
			{
				rule += shape.fillStyle[j]+',';
			}
			rule +=shape.fillStyle[j]+')';
			newwindow.document.writeln(SPACES.substr(0,15)+'ctx.fillStyle = "'+rule+'";');
			
		}
		else
		{
			if (shape.linearfill)
			{
				newwindow.document.writeln(SPACES.substr(0,15)+'grad = ctx.createLinearGradient('+(Math.round(shape.lineGrad[0])-dl)+','+(Math.round(shape.lineGrad[1])-dt)+','+(Math.round(shape.lineGrad[2])-dl)+','+(Math.round(shape.lineGrad[3])-dt)+');');

			}
			else
			{
				newwindow.document.writeln(SPACES.substr(0,15)+'grad = ctx.createRadialGradient('+(Math.round(shape.radGrad[0])-dl)+','+(Math.round(shape.radGrad[1])-dt)+','+Math.round(shape.radGrad[2])+','+(Math.round(shape.radGrad[3])-dl)+','+(Math.round(shape.radGrad[4])-dt)+','+Math.round(shape.radGrad[5])+');');
			}
			var rule;
			for (var k=0; k<shape.colorStops.length;k++)
			{
				rule='rgba('
				for (var j=1;j<4;j++)
				{
					rule += shape.colorStops[k][j]+',';
				}
				rule +=shape.colorStops[k][j]+')';
				newwindow.document.writeln(SPACES.substr(0,15)+'grad.addColorStop('+shape.colorStops[k][0]+',"'+rule+'");');
			}
			newwindow.document.writeln(SPACES.substr(0,15)+'ctx.fillStyle = grad;');
		}
		newwindow.document.writeln(SPACES.substr(0,15)+'ctx.fill();');
	}
}

