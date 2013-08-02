/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function shapecode(name)
{
	var shape=SHAPES[name];
	var dl=parseInt($("stagearea").style.left);
	var dt=parseInt($("stagearea").style.top);
	htmltext+='\n';
	htmltext+=SPACES.substr(0,15)+'//'+shape.name+';\n';
	htmltext+=SPACES.substr(0,15)+'ctx.shadowColor ="rgba(0,0,0,0)";\n';
   	var rule='rgba('
	for (var j=0;j<3;j++)
	{
		rule += shape.strokeStyle[j]+',';
	} 
	rule +=shape.strokeStyle[j]+')';
	htmltext+=SPACES.substr(0,15)+'ctx.strokeStyle ="'+rule+'";\n';
	htmltext+=SPACES.substr(0,15)+'ctx.lineWidth = '+shape.lineWidth+';\n';
	htmltext+=SPACES.substr(0,15)+'ctx.lineCap = "'+shape.lineCap+'";\n';
	htmltext+=SPACES.substr(0,15)+'ctx.lineJoin = "'+shape.lineJoin+'";\n';
	
	htmltext+=SPACES.substr(0,15)+'ctx.beginPath();\n';
	var node=shape.path.next;
	htmltext+=SPACES.substr(0,15)+'ctx.moveTo('+(Math.round(node.point.x)-dl)+','+(Math.round(node.point.y)-dt)+');\n';
	node=node.next;
	while(node.point.x!="end")
	{
	   if (node.vertex=="L")
	   {
		htmltext+=SPACES.substr(0,15)+'ctx.lineTo('+(Math.round(node.point.x)-dl)+','+(Math.round(node.point.y)-dt)+');\n';
	   }

	   else
	   {
			htmltext+=SPACES.substr(0,15)+'ctx.bezierCurveTo('+(Math.round(node.ctrl1.x)-dl)+','+(Math.round(node.ctrl1.y)-dt)+','+(Math.round(node.ctrl2.x)-dl)+','+(Math.round(node.ctrl2.y)-dt)+','+(Math.round(node.point.x)-dl)+','+(Math.round(node.point.y)-dt)+');\n';
	   }
	   node=node.next;
	} 
	if (!shape.open) {htmltext+=SPACES.substr(0,15)+'ctx.closePath();\n';}
	htmltext+=SPACES.substr(0,15)+'ctx.stroke();\n'; 
	if (!shape.open)
	{
		htmltext+=SPACES.substr(0,15)+'ctx.shadowOffsetX = '+shape.shadowOffsetX+';\n';   
   		htmltext+=SPACES.substr(0,15)+'ctx.shadowOffsetY = '+shape.shadowOffsetY+';\n';   
   		htmltext+=SPACES.substr(0,15)+'ctx.shadowBlur = '+shape.shadowBlur+';\n'; 
		var rule='rgba('
		for (var j=0;j<3;j++)
		{
			rule += shape.shadowColor[j]+',';
		} 
		rule +=shape.shadowColor[j]+')';
   		htmltext+=SPACES.substr(0,15)+'ctx.shadowColor = "'+rule+'";\n';
		if (shape.justfill)
		{
			var rule='rgba('
			for (var j=0;j<3;j++)
			{
				rule += shape.fillStyle[j]+',';
			}
			rule +=shape.fillStyle[j]+')';
			htmltext+=SPACES.substr(0,15)+'ctx.fillStyle = "'+rule+'";\n';
			
		}
		else
		{
			if (shape.linearfill)
			{
				htmltext+=SPACES.substr(0,15)+'grad = ctx.createLinearGradient('+(Math.round(shape.lineGrad[0])-dl)+','+(Math.round(shape.lineGrad[1])-dt)+','+(Math.round(shape.lineGrad[2])-dl)+','+(Math.round(shape.lineGrad[3])-dt)+');\n';

			}
			else
			{
				htmltext+=SPACES.substr(0,15)+'grad = ctx.createRadialGradient('+(Math.round(shape.radGrad[0])-dl)+','+(Math.round(shape.radGrad[1])-dt)+','+Math.round(shape.radGrad[2])+','+(Math.round(shape.radGrad[3])-dl)+','+(Math.round(shape.radGrad[4])-dt)+','+Math.round(shape.radGrad[5])+');\n';
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
				htmltext+=SPACES.substr(0,15)+'grad.addColorStop('+shape.colorStops[k][0]+',"'+rule+'");\n';
			}
			htmltext+=SPACES.substr(0,15)+'ctx.fillStyle = grad;\n';
		}
		htmltext+=SPACES.substr(0,15)+'ctx.fill();\n';
	}
}

