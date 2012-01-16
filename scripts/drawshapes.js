/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 
function drawline(canv)
{
	shapestarted=false;
	worksaved='false';
	canv.ctx.clearRect(0,0,activewidth,activeheight);
	
   	var rule='rgba('
	for (var j=0;j<3;j++)
	{
		rule += canv.strokeStyle[j]+',';
	} 
	rule +=canv.strokeStyle[j]+')';
	canv.ctx.strokeStyle=rule;
	canv.ctx.lineWidth = canv.lineWidth;
	canv.ctx.lineCap = canv.lineCap;
	canv.ctx.lineJoin = canv.lineJoin;
	
	canv.ctx.beginPath();
	canv.ctx.moveTo(canv.path[3][1],canv.path[3][2]);
	for (var i=4;i<canv.path.length;i++)
	{
	   if (canv.path[i][0]=="L")
	   {
		canv.ctx.lineTo(canv.path[i][1],canv.path[i][2])
	   }
	   else if (canv.path[i][0]=="A")
	   {
		canv.ctx.arc(canv.path[i][1],canv.path[i][2],canv.path[i][3],canv.path[i][4],canv.path[i][5],canv.path[i][6])
	   }
	   else if (canv.path[i][0]=="M")
	   {
		canv.ctx.moveTo(canv.path[i][1],canv.path[i][2])
	   }
	   else if (canv.path[i][0]=="B")
	   {
			canv.ctx.bezierCurveTo(canv.path[i][1],canv.path[i][2],canv.path[i][3],canv.path[i][4],canv.path[i][5],canv.path[i][6])
	   }
	} 

	if (canv.path[0]=='closed') {canv.ctx.closePath()}
	canv.ctx.stroke(); 
	if (canv.path[0]=='closed')
	{
		canv.ctx.shadowOffsetX = canv.shadowOffsetX;   
   		canv.ctx.shadowOffsetY = canv.shadowOffsetY;   
   		canv.ctx.shadowBlur = canv.shadowBlur; 
		var rule='rgba('
		for (var j=0;j<3;j++)
		{
			rule += canv.shadowColor[j]+',';
		} 
		rule +=canv.shadowColor[j]+')';
   		canv.ctx.shadowColor = rule;
		if (canv.justfill)
		{
			var rule='rgba('
			for (var j=0;j<3;j++)
			{
				rule += canv.fillStyle[j]+',';
			}
			rule +=canv.fillStyle[j]+')';
			canv.ctx.fillStyle=rule;
			
		}
		else
		{
			if (canv.linearfill)
			{
				var grad = canv.ctx.createLinearGradient(canv.lineGrad[0],canv.lineGrad[1],canv.lineGrad[2],canv.lineGrad[3]);

			}
			else
			{
				var grad = canv.ctx.createRadialGradient(canv.radGrad[0],canv.radGrad[1],canv.radGrad[2],canv.radGrad[3],canv.radGrad[4],canv.radGrad[5]);
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
				grad.addColorStop(canv.colorStops[k][0],rule);
			}
			canv.ctx.fillStyle=grad;
		}
		canv.ctx.fill();
	}
}

function drawbezguides(canv)
{
	canv.ctx.beginPath();
	var l=canv.path.length;
	canv.ctx.strokeStyle='rgb(0,0,0)';
	canv.ctx.lineWidth=2;
	canv.ctx.shadowColor='rgba(0,0,0,0)';
	canv.ctx.moveTo(canv.path[3][1],canv.path[3][2]);
	if (canv.path[4][0]=='B') {canv.ctx.lineTo(canv.path[4][1],canv.path[4][2])};		
	for (var i=4;i<l-1;i++)
	{
		if (canv.path[i][0]=='B')
		{
			canv.ctx.moveTo(canv.path[i][3],canv.path[i][4]);
			canv.ctx.lineTo(canv.path[i][5],canv.path[i][6]);
			if (canv.path[i+1][0]=='B') {canv.ctx.lineTo(canv.path[i+1][1],canv.path[i+1][2])};
		}
		if (canv.path[i][0]=='L' || canv.path[i][0]=='M' )
		{
			canv.ctx.moveTo(canv.path[i][1],canv.path[i][2]);
			if (canv.path[i+1][0]=='B') {canv.ctx.lineTo(canv.path[i+1][1],canv.path[i+1][2])};
		}
	}
	if (canv.path[i][0]=='B')
	{
		canv.ctx.moveTo(canv.path[i][3],canv.path[i][4]);
		canv.ctx.lineTo(canv.path[i][5],canv.path[i][6]);
	}
	canv.ctx.stroke(); 
	canv.ctx.beginPath();
	var l=canv.path.length;
	canv.ctx.strokeStyle='rgb(255,0,0)';
	canv.ctx.lineWidth=1;
	canv.ctx.shadowColor='rgba(0,0,0,0)';
	canv.ctx.moveTo(canv.path[3][1],canv.path[3][2]);
	if (canv.path[4][0]=='B') {canv.ctx.lineTo(canv.path[4][1],canv.path[4][2])};		
	for (var i=4;i<l-1;i++)
	{
		if (canv.path[i][0]=='B')
		{
			canv.ctx.moveTo(canv.path[i][3],canv.path[i][4]);
			canv.ctx.lineTo(canv.path[i][5],canv.path[i][6]);
			if (canv.path[i+1][0]=='B') {canv.ctx.lineTo(canv.path[i+1][1],canv.path[i+1][2])};
		}
		if (canv.path[i][0]=='L' || canv.path[i][0]=='M' )
		{
			canv.ctx.moveTo(canv.path[i][1],canv.path[i][2]);
			if (canv.path[i+1][0]=='B') {canv.ctx.lineTo(canv.path[i+1][1],canv.path[i+1][2])};
		}
	}
	if (canv.path[i][0]=='B')
	{
		canv.ctx.moveTo(canv.path[i][3],canv.path[i][4]);
		canv.ctx.lineTo(canv.path[i][5],canv.path[i][6]);
	}
	canv.ctx.stroke(); 
}
