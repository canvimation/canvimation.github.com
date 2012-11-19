/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EYPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

function fliphorz()
{
	clear($("boundarydrop"));
	for(var groupName in SELECTED)
	{
		var group=SELECTED[groupName];
		var mirrorY=group.left+group.width/2;
		var shapeNames=group.memberShapes();
		for(var name in shapeNames)
		{
			shape=shapeNames[name];
			var node=shape.path.next;
			while(node.point.x!="end")
			{
				node.point.x=mirrorY-(node.point.x-mirrorY);
				if(node.ctrl1.x!="non")
				{
					node.ctrl1.x=mirrorY-(node.ctrl1.x-mirrorY);
					node.ctrl2.x=mirrorY-(node.ctrl2.x-mirrorY);
				}
				node=node.next;
			}
			var tplftcrnr=mirrorY-(shape.btmrgtcrnr.x-mirrorY);
			shape.btmrgtcrnr.x=mirrorY-(shape.tplftcrnr.x-mirrorY);
			shape.tplftcrnr.x=tplftcrnr;
			shape.lineGrad[0]=mirrorY-(shape.lineGrad[0]-mirrorY);
			shape.lineGrad[2]=mirrorY-(shape.lineGrad[2]-mirrorY);
			shape.radGrad[0]=mirrorY-(shape.radGrad[0]-mirrorY);
			shape.radGrad[3]=mirrorY-(shape.radGrad[3]-mirrorY);
			shape.shadowOffsetX=-shape.shadowOffsetX;
			shape.draw();shape.draw();//doing this twice gets rid of a stroke around the shadow do not know why?
		}
		group.drawBoundary();
	}
	if(TWEENEDIT)
	{
		CURRENTTWEEN.translate.active=true;
		CURRENTTWEEN.setTweenTimeBox();
	}	
}

function flipvert()
{
	clear($("boundarydrop"));
	for(var groupName in SELECTED)
	{
		var group=SELECTED[groupName];
		var mirrorY=group.top+group.height/2;
		var shapeNames=group.memberShapes();
		for(var name in shapeNames)
		{
			shape=shapeNames[name];
			var node=shape.path.next;
			while(node.point.x!="end")
			{
				node.point.y=mirrorY-(node.point.y-mirrorY);
				if(node.ctrl1.x!="non")
				{
					node.ctrl1.y=mirrorY-(node.ctrl1.y-mirrorY);
					node.ctrl2.y=mirrorY-(node.ctrl2.y-mirrorY);
				}
				node=node.next;
			}
			var tplftcrnr=mirrorY-(shape.btmrgtcrnr.y-mirrorY);
			shape.btmrgtcrnr.y=mirrorY-(shape.tplftcrnr.y-mirrorY);
			shape.tplftcrnr.y=tplftcrnr;
			shape.lineGrad[1]=mirrorY-(shape.lineGrad[1]-mirrorY);
			shape.lineGrad[3]=mirrorY-(shape.lineGrad[3]-mirrorY);
			shape.radGrad[1]=mirrorY-(shape.radGrad[1]-mirrorY);
			shape.radGrad[4]=mirrorY-(shape.radGrad[4]-mirrorY);
			shape.shadowOffsetY=-shape.shadowOffsetY;
			shape.draw();shape.draw();//doing this twice gets rid of a stroke around the shadow do not know why?
		}
		group.drawBoundary();
	}
	if(TWEENEDIT)
	{
		CURRENTTWEEN.translate.active=true;
		CURRENTTWEEN.setTweenTimeBox();
	}	
}