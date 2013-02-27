/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function draw()
{
	this.Canvas.ctx.clearRect(-SCRW,-SCRH,2*SCRW,2*SCRH);
	
   	var rule='rgba('
	for (var j=0;j<3;j++)
	{
		rule += this.strokeStyle[j]+',';
	} 
	rule +=this.strokeStyle[j]+')';
	this.Canvas.ctx.strokeStyle=rule;
	this.Canvas.ctx.lineWidth = this.lineWidth;
	this.Canvas.ctx.lineCap = this.lineCap;
	this.Canvas.ctx.lineJoin = this.lineJoin;
	
	this.Canvas.ctx.beginPath();
	var node=this.path.next;
	this.Canvas.ctx.moveTo(node.point.x,node.point.y);
	while (node.next.point.x !="end")
	{
	   	node=node.next;
	   	if (node.vertex=="L")
	   	{ 
		    this.Canvas.ctx.lineTo(node.point.x,node.point.y);
	   	}
	   	else 
	   	{
			this.Canvas.ctx.bezierCurveTo(node.ctrl1.x,node.ctrl1.y,node.ctrl2.x,node.ctrl2.y,node.point.x,node.point.y)
	   	}
	} 
	if (!this.open) 
	{
		this.Canvas.ctx.closePath()
	}
	this.Canvas.ctx.stroke();
	if (!this.open)
	{	 
		this.Canvas.ctx.shadowOffsetX = this.shadowOffsetX;   
   		this.Canvas.ctx.shadowOffsetY = this.shadowOffsetY;   
   		this.Canvas.ctx.shadowBlur = this.shadowBlur; 
		var rule='rgba('
		for (var j=0;j<3;j++)
		{
			rule += this.shadowColor[j]+',';
		} 
		rule +=this.shadowColor[j]+')';
   		this.Canvas.ctx.shadowColor = rule;
		if (this.justfill)
		{
			var rule='rgba('
			for (var j=0;j<3;j++)
			{
				rule += this.fillStyle[j]+',';
			}
			rule +=this.fillStyle[j]+')';
			this.Canvas.ctx.fillStyle=rule;
			
		}
		else
		{
			if (this.linearfill)
			{
				var grad = this.Canvas.ctx.createLinearGradient(this.lineGrad[0],this.lineGrad[1],this.lineGrad[2],this.lineGrad[3]);

			}
			else
			{
				var grad = this.Canvas.ctx.createRadialGradient(this.radGrad[0],this.radGrad[1],this.radGrad[2],this.radGrad[3],this.radGrad[4],this.radGrad[5]);
			}
			var rule;
			for (var k=0; k<this.colorStops.length;k++)
			{
				rule='rgba('
				for (var j=1;j<4;j++)
				{
					rule += this.colorStops[k][j]+',';
				}
				rule +=this.colorStops[k][j]+')';
				grad.addColorStop(this.colorStops[k][0],rule);
			}
			this.Canvas.ctx.fillStyle=grad;
		}
		this.Canvas.ctx.fill();
	 }
}

function drawjustpath()
{
	this.Canvas.ctx.clearRect(-SCRW,-SCRH,2*SCRW,2*SCRH);
	this.Canvas.ctx.save();
	this.Canvas.ctx.strokeStyle="rgb(0,0,0)";
	this.Canvas.ctx.lineWidth = 1;
	this.Canvas.ctx.lineCap = this.lineCap;
	this.Canvas.ctx.lineJoin = this.lineJoin;
	
	this.Canvas.ctx.beginPath();
	var node=this.path.next;
	this.Canvas.ctx.moveTo(node.point.x,node.point.y);
	while (node.next.point.x !="end")
	{
	   	node=node.next;
	   	if (node.vertex=="L")
	   	{ 
		    this.Canvas.ctx.lineTo(node.point.x,node.point.y);
	   	}
	   	else 
	   	{
			this.Canvas.ctx.bezierCurveTo(node.ctrl1.x,node.ctrl1.y,node.ctrl2.x,node.ctrl2.y,node.point.x,node.point.y)
	   	}
	} 

	if (!this.open) 
	{
		this.Canvas.ctx.closePath()
	}
	this.Canvas.ctx.stroke();
	this.Canvas.ctx.restore();
}


function drawBezGuides()
{
	BACKDROP.Canvas.ctx.beginPath();
	BACKDROP.Canvas.ctx.clearRect(0,0,SCRW,SCRH);
	var node=this.path.next;
	node=node.next;
	while (node.point.x !="end")
	{
	  	if (node.vertex=="B")
	  	{
			BACKDROP.Canvas.ctx.moveTo(node.point.x,node.point.y);
			BACKDROP.Canvas.ctx.lineTo(node.ctrl2.x,node.ctrl2.y);
			BACKDROP.Canvas.ctx.moveTo(node.prev.point.x,node.prev.point.y);
			BACKDROP.Canvas.ctx.lineTo(node.ctrl1.x,node.ctrl1.y);
	  	}
	   	node=node.next;
	}
	BACKDROP.Canvas.ctx.lineWidth=2;
	BACKDROP.Canvas.ctx.strokeStyle='rgb(255,255,255)';
	BACKDROP.Canvas.ctx.stroke();
	BACKDROP.Canvas.ctx.beginPath();
	var node=this.path.next;
	node=node.next;
	while (node.point.x !="end")
	{
	  	if (node.vertex=="B")
	  	{
			BACKDROP.Canvas.ctx.moveTo(node.point.x,node.point.y);
			BACKDROP.Canvas.ctx.lineTo(node.ctrl2.x,node.ctrl2.y);
			BACKDROP.Canvas.ctx.moveTo(node.prev.point.x,node.prev.point.y);
			BACKDROP.Canvas.ctx.lineTo(node.ctrl1.x,node.ctrl1.y);
	  	}
	   	node=node.next;
	  }
	  BACKDROP.Canvas.ctx.lineWidth=1;
	  BACKDROP.Canvas.ctx.strokeStyle='rgb(255,0,0)';
	  BACKDROP.Canvas.ctx.stroke();
}
