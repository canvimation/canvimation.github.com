/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function fliphorz()
{
	var canv;
	var bl,bw;
	for (var i=0; i<selected.length;i++)
	{
		canv=selected[i];

		bl=canv.bleft;
		bw=canv.bwidth;
		if (canv.path[2]=='rounded_square')
		{
			var xws=canv.path[5][1];
			var yws=canv.path[5][2];
			var xwe=canv.path[6][1];
			var ywe=canv.path[6][2];
			var w =Math.sqrt((xwe-xws)*(xwe-xws)+(ywe-yws)*(ywe-yws));
			var xhs=canv.path[8][1];
			var yhs=canv.path[8][2];
			var xhe=canv.path[9][1];
			var yhe=canv.path[9][2];
			var h =Math.sqrt((xhe-xhs)*(xhe-xhs)+(yhe-yhs)*(yhe-yhs));
			alpha = Math.PI-arctan((xws-xwe),(ywe-yws));
			canv.path[3][1]=2*bl-canv.path[8][1]+bw;
			updatecanvrndsqu(canv,canv.radius,w,h,alpha);
		}
		else
		{
			for (var j=3; j<canv.path.length; j++)
			{
				for (var k=1; k<canv.path[j].length; k+=2)
				{
					canv.path[j][k]=2*bl-canv.path[j][k]+bw;
				}
			}
		}
		canv.sox=2*bl-canv.sox+bw;
   		canv.ox=2*bl-canv.ox+bw;
   		canv.cx=2*bl-canv.cx+bw;
		canv.scleft=2*bl-canv.scleft+bw;
		canv.lineGrad[0]=2*bl-canv.lineGrad[0]+bw;
		canv.lineGrad[2]=2*bl-canv.lineGrad[2]+bw;
   		canv.radGrad[0]=2*bl-canv.radGrad[0]+bw;
		canv.radGrad[3]=2*bl-canv.radGrad[3]+bw;
		canv.clockw=!canv.clockw;
		canv.boundary.style.left=canv.bleft;
		canv.shadowOffsetX*=-1;
		drawline(canv);
		canv.rotated=false;
		canv.phi=0;
		removeRotate();
		if (gdmrks>0 || rdmrks>0)
		{
			removeGradLine();
			showGradLine(canv);
		}
	}
}

function flipvert()
{
	var canv;
	var bt,bh;
	for (var i=0; i<selected.length;i++)
	{
		canv=selected[i];
		bt=canv.btop;
		bh=canv.bheight;
		if (canv.path[2]=='rounded_square')
		{
			var xws=canv.path[5][1];
			var yws=canv.path[5][2];
			var xwe=canv.path[6][1];
			var ywe=canv.path[6][2];
			var w =Math.sqrt((xwe-xws)*(xwe-xws)+(ywe-yws)*(ywe-yws));
			var xhs=canv.path[8][1];
			var yhs=canv.path[8][2];
			var xhe=canv.path[9][1];
			var yhe=canv.path[9][2];
			var h =Math.sqrt((xhe-xhs)*(xhe-xhs)+(yhe-yhs)*(yhe-yhs));
			alpha = -arctan((xwe-xws),(ywe-yws));
			canv.path[3][2]=2*bt-canv.path[14][2]+bh;
			updatecanvrndsqu(canv,canv.radius,w,h,alpha)
		}
		else
		{
			for (var j=3; j<canv.path.length; j++)
			{				
				for (var k=2; k<canv.path[j].length; k+=2)
				{
					canv.path[j][k]=2*bt-canv.path[j][k]+bh;
				}
			}
		}
		canv.soy=2*bt-canv.soy+bh;
   		canv.oy=2*bt-canv.oy+bh;
   		canv.cy=2*bt-canv.cy+bh;
		canv.sctop=2*bt-canv.sctop+bh;
		canv.lineGrad[1]=2*bt-canv.lineGrad[1]+bh;
		canv.lineGrad[3]=2*bt-canv.lineGrad[3]+bh;
   		canv.radGrad[1]=2*bt-canv.radGrad[1]+bh;
		canv.radGrad[4]=2*bt-canv.radGrad[4]+bh;
		canv.clockw=!canv.clockw;
		canv.shadowOffsetY*=-1;
		canv.boundary.style.top=canv.btop;
		drawline(canv);
		canv.rotated=false;
		canv.phi=0;
		removeRotate();
		if (gdmrks>0 || rdmrks>0)
		{
			removeGradLine();
			showGradLine(canv);
		}
	}
}