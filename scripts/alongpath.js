/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function curvelength(node) //from node to node.next
{
	var next=node.next;
	var dt=0.1;
	var s=0;
	var t=0;
	var cx = x(t); //current x
	var cy = y(t); //current y
	while (t<1)
	{
		t +=dt;
		s +=Math.sqrt((x(t)-cx)*(x(t)-cx)+(y(t)-cy)*(y(t)-cy));
		cx=x(t);
		cy=y(t);
	}
	
	return s;
	
	function x(t)
	{
	
		return (1-t)*(1-t)*(1-t)*parseInt(node.point.x) + 3*(1-t)*(1-t)*t*parseInt(node.ctrl1.x) + 3*(1-t)*t*t*parseInt(node.ctrl2.x) + t*t*t*parseInt(next.point.x)
	}
	
	function y(t)
	{
	
		return (1-t)*(1-t)*(1-t)*parseInt(node.point.y) + 3*(1-t)*(1-t)*t*parseInt(node.ctrl1.y) + 3*(1-t)*t*t*parseInt(node.ctrl2.y) + t*t*t*parseInt(next.point.y)
	}
}

function linelength(node) //from node to node.next
{
	var next=node.next;
	return Math.sqrt((node.next.point.x-node.point.x)*(node.next.point.x-node.point.x)+(node.next.point.y-node.point.y)*(node.next.point.y-node.point.y));	
}

function sectionlengths(path)
{
	var seclengths=[];
	var cumltot=0; //cummulative total of section lengths
	var sl;  //section length
	var node=path.next; // from first node
	while(node.next.point.x!="end")  // check if next node is a point or end node, if point calculate length of path between nodes
	{
	  switch (node.vertex)
	  {
		case 'B':
			sl = curvelength(node);
			
		break
		case 'L':
			sl=linelength(node);
		break
	  }
	  cumltot += sl;
	  seclengths.push(sl);
	  node=node.next;
	}
	seclengths.push(cumltot)
	return seclengths;	
}

function cumltimes(sl,T) //sl section length array, T total time for path
{
	var v=sl.pop()/T;
	var cumltot_t=0;
	var t;
	var cuml_t=[0];
	for (var i=0; i<sl.length; i++)
	{
		t=sl[i]/v; //time over section
		cumltot_t +=t;
		cuml_t.push(cumltot_t);
	}
	return cuml_t;  //cumulative time array
}
/*
function lineposition(linetofollow, cp,ct, t)
{
	switch (linetofollow.path[cp-1][0])
  	{
	 case 'B':
	 	var xs = linetofollow.path[cp-1][5];
		var ys = linetofollow.path[cp-1][6];
	 break
	 case 'L':
	 	var xs = linetofollow.path[cp-1][1];
		var ys = linetofollow.path[cp-1][2];
	 break
	 case 'M':
	 	var xs = linetofollow.path[cp-1][1];
		var ys = linetofollow.path[cp-1][2];
	 break	 
  	}	
	var xe = linetofollow.path[cp][1];
	var ye = linetofollow.path[cp][2];
	var x = xs + (xe-xs)*(t - ct[cp-4])/(ct[cp-3] - ct[cp-4]);
	var y = ys + (ye-ys)*(t - ct[cp-4])/(ct[cp-3] - ct[cp-4]);
	if ((x-xs)*(x-xs) + (y-ys)*(y-ys) > (xe-xs)*(xe-xs) + (ye-ys)*(ye-ys))
	{
		return {x:0, y:0, cp:cp+1, phi:0}
	}
	else
	{
		return {x:x, y:y, cp:cp, phi:arctan((xe-xs),(ye-ys))}
	}
}



function pathposition(linetofollow, cp,ct, t)  //cp, current bezier, pt current position 0 - 1, ct cumulative time array, t current time
{
	pt = (t - ct[cp-4])/(ct[cp-3] - ct[cp-4]);
	if (pt>1)
	{
		return {x:0, y:0, cp:cp+1, phi:0}
	}
	switch (linetofollow.path[cp-1][0])
  	{
	 case 'B':
	 	var p0={x:linetofollow.path[cp-1][5], y:linetofollow.path[cp-1][6]};
	 break
	 case 'L':
	 	var p0={x:linetofollow.path[cp-1][1], y:linetofollow.path[cp-1][2]};
	 break
	 case 'M':
	 	var p0={x:linetofollow.path[cp-1][1], y:linetofollow.path[cp-1][2]};
	 break
  	}
	
	var p1={x:linetofollow.path[cp][1], y:linetofollow.path[cp][2]};
	var p2={x:linetofollow.path[cp][3], y:linetofollow.path[cp][4]};
	var p3={x:linetofollow.path[cp][5], y:linetofollow.path[cp][6]};	
	var x = (1-pt)*(1-pt)*(1-pt)*parseInt(p0.x) + 3*(1-pt)*(1-pt)*pt*parseInt(p1.x) + 3*(1-pt)*pt*pt*parseInt(p2.x) + pt*pt*pt*parseInt(p3.x);
    var y = (1-pt)*(1-pt)*(1-pt)*parseInt(p0.y) + 3*(1-pt)*(1-pt)*pt*parseInt(p1.y) + 3*(1-pt)*pt*pt*parseInt(p2.y) + pt*pt*pt*parseInt(p3.y);
	var dx = -3*(1-pt)*(1-pt)*parseInt(p0.x) + (3*(1-pt)*(1-pt) - 6*(1-pt)*pt)*parseInt(p1.x) + (6*(1-pt)*pt - 3*pt*pt)*parseInt(p2.x) + 3*pt*pt*parseInt(p3.x);
	var dy = -3*(1-pt)*(1-pt)*parseInt(p0.y) + (3*(1-pt)*(1-pt) - 6*(1-pt)*pt)*parseInt(p1.y) + (6*(1-pt)*pt - 3*pt*pt)*parseInt(p2.y) + 3*pt*pt*parseInt(p3.y);
	var phi = arctan(dy,dx);
	return {x:x, y:y, cp:cp, phi:phi}
}


function movecanv(sprite)
{
	transform(sprite);
	drawtracks(sprite);
	if (!sprite.finishmove)
	{
		for (var i=0; i<sprite.cars.length; i++)
 	  	{ 	
			drawline(sprite.cars[i]);
			sprite.cars[i].ctx.restore();
			sprite.cars[i].ctx.save();
	  	}
	  	setTimeout(function() {movecanv(sprite)},50);
	}
	else
	{
		alert('Check completed');
		restorecanvases(sprite);
		restoretracks(sprite);
		savecanvases(sprite);
		savetracks(sprite);
		clearcanvdiv();

		if (editcheck)
		{
			if (trackcheck)
			{
				restoretracksprops(sprite);
			}
			editsprite();
		}
		else
		{
			zeropointers(sprite);
			drawrailway(sprite);
			restorecanvases(sprite);
			restoretracks(sprite);
			restoretracksprops(sprite);

			if (sprite.vec)
			{
				$('vecdiv').style.visibility='visible';
			}
			else
			{
				$('spritecentre').style.visibility='visible';
			}
			chkbld();
		}
	}
}

function transform(sprite)
{
	var curptr=sprite.pointer % sprite.points.length;
	nextpointer(sprite);
	var p = sprite.points[curptr];
    if (sprite.engine =='scene')
	{
		for (var i=0; i<sprite.cars.length; i++)
 		{ 	
			var canv=sprite.cars[i];	
			canv.ctx.translate(p.x,p.y);
			
			if (sprite.vec)
			{
				var psi=p.phi-sprite.vector.psi;
				canv.ctx.rotate(psi);
			}
			canv.ctx.translate(-sprite.vector.xs, -sprite.vector.ys);
			
		}
	}
	else
	{
		var v =sprite.vector;
		transfTracks(sprite,p,v);
		for (var i=0; i<sprite.cars.length; i++)
 		{ 	
			var canv=sprite.cars[i];
			canv.ctx.clearRect(-activewidth,-activeheight,2*activewidth,2*activeheight);
			canv.ctx.translate(p.x,p.y);
			if (sprite.vec)
			{
				var psi=p.phi-sprite.vector.psi;
				canv.ctx.rotate(psi);
			}
			canv.ctx.translate(-sprite.vector.xs, -sprite.vector.ys);
				
		}
		transform(sprite.train);
	}
}

function transfTracks(sprite,p,v)
{
	if (sprite.engine !='scene')
	{
		var canv = sprite.train.track.line;	
		canv.ctx.clearRect(-activewidth,-activeheight,2*activewidth,2*activeheight);	
		canv.ctx.translate(p.x,p.y);
		if (sprite.vec)
		{
			var psi=p.phi-v.psi;
			canv.ctx.rotate(psi);
		}
		canv.ctx.translate(-v.xs, -v.ys);
		
		transfTracks(sprite.train,p,v);
	}
}

function drawtracks(sprite)
{
	if (sprite.engine !='scene')
	{
		if (sprite.train.track.visible)
		{
			drawline(sprite.train.track.line);
		}
		sprite.train.track.line.ctx.restore();
		sprite.train.track.line.ctx.save();
		drawtracks(sprite.train);
	}
	
}

function showtracks(sprite)
{
	if (sprite.engine !='scene')
	{
		drawline(sprite.train.track.line);
		sprite.train.track.line.ctx.restore();
		sprite.train.track.line.ctx.save();
		showtracks(sprite.train);
	}
	
}


function listpoints(sprite, linetofollow, cp, ct, t) 
{
	switch (linetofollow.path[cp][0])
	{
		case 'B':
			var pp = pathposition(linetofollow, cp, ct, t);
		break
		case 'L':
			var pp = lineposition(linetofollow, cp, ct, t);
		break
	}
	
	if ((pp.cp>cp) && (pp.cp<linetofollow.path.length))
	{
		listpoints(sprite, linetofollow, pp.cp, ct, t);
	}
	else if (pp.cp<linetofollow.path.length)
	{
	  	sprite.points.push({x:pp.x,y:pp.y,phi:pp.phi});
		listpoints(sprite, linetofollow, pp.cp, ct, t+50);
	}
}


function followpath(sprite)
{
	guidepath(sprite);
	zeropointers(sprite);
	sprite.finishmove=false;
	getcanvases(sprite);
	clearcanvdiv();
	if (sprite.track.visible)
	{
		drawline(sprite.track.line);
	}
	savecanvases(sprite);
	savetracks(sprite);
  	movecanv(sprite);
}

function savecanvases(sprite)
{
	for (var i=0; i<sprite.cars.length; i++)
	{
		sprite.cars[i].ctx.save();
	}	
}

function restorecanvases(sprite)
{
	for (var i=0; i<sprite.cars.length; i++)
	{
		sprite.cars[i].ctx.restore();
	}	
}

function savetracks(sprite)
{
	if (sprite.engine !='scene')
	{
		sprite.train.track.line.ctx.save();
		savetracks(sprite.train)
	}
}

function restoretracks(sprite)
{
	if (sprite.engine !='scene')
	{
		sprite.train.track.line.ctx.restore();
		restoretracks(sprite.train)
	}
}

function guidepath(sprite)
{
  var linetofollow=sprite.track.line;
  sprite.points=[];
  var iitt=intvtimes(intvlengths(linetofollow),sprite.ptime*1000);
  switch (linetofollow.path[4][0])
  {
	 case 'B':
	 	var spp=pathposition(linetofollow, 4,iitt, 0);
	 break
	 case 'L':
	 	var spp=lineposition(linetofollow, 4,iitt, 0);
	 break
  }
  sprite.points.push({x:linetofollow.path[3][1], y:linetofollow.path[3][2], phi:spp.phi})
  listpoints(sprite, linetofollow, 4, iitt, 50);
  if (sprite.track.line[0]='closed')
  {
	 //sprite.points.pop(); 
  }
  if (sprite.track.yoyo)
  {
	  var apl=sprite.points.length;
	  for (var i=apl; i>0; i--)
	  {
		  sprite.points.push(sprite.points[i-1]);
	  }
  }
  if (sprite.engine !='scene')
  {
	 guidepath(sprite.train);  
  }
}

function zeropointers(sprite)
{
	sprite.pointer=0;
	if (sprite.engine!='scene')
	{
		zeropointers(sprite.train);
	}
}

function nextpointer(sprite)
{
	if (stopchecking)
	{
		sprite.finishmove=true;
		return;
	}
	
	sprite.finishmove=false;
	if (sprite.track.repeats=='c')
	{
		sprite.pointer +=1;
		return;
	}
	if (sprite.track.line[0]='closed' && sprite.pointer>=((sprite.track.repeats+1)*sprite.points.length))
	{
		sprite.finishmove=true;
	}
	else if (sprite.track.line[0]='edit' && sprite.pointer>=((sprite.track.repeats+1)*sprite.points.length - 1))
	{
		sprite.finishmove=true;
	}
	else
	{
		sprite.pointer +=1;
	}
}

function getcanvases(sprite)
{
	if (sprite.engine=='scene')
	{
		for (var i=0; i<sprite.train.cars.length; i++)
		{
			$('canvasdiv').appendChild(sprite.train.cars[i]);
		}
		$('canvasdiv').appendChild(sprite.track.line);
	}
	else
	{
		$('canvasdiv').appendChild(sprite.track.line);
		getcanvases(sprite.train);
	}
}

function resetcanvases(sprite)
{
	if (sprite.engine=='scene')
	{
		for (var i=0; i<sprite.train.cars.length; i++)
		{
			$('canvasdiv').removeChild(sprite.train.cars[i]);
		}
		$('canvasdiv').removeChild(sprite.track.line);
	}
	else
	{
		$('canvasdiv').removeChild(sprite.track.line);
		resetcanvases(sprite.train);
	}	
}

function drawrailway(sprite)
{
	
	if (sprite.engine=='scene')
	{
		var tcars = sprite.train.cars;
	  	for (var i=0; i<tcars.length; i++)
  	  	{ 
			drawline(tcars[i]);
		}
	}
	else if (sprite.engine=='tween')
	{
		
	}
	else if (sprite.engine=='film')
	{
		
	}
	else
	{
		transform(sprite.train);
		showtracks(sprite);
	  	for (var i=0; i<sprite.cars.length; i++)
 	  	{ 	
			drawline(sprite.cars[i]);
	  	}
	}
}

function outlinetracks(sprite)
{	
	sprite.temp={};
	sprite.temp.strokeStyle = sprite.track.line.strokeStyle;
	sprite.temp.fillStyle = sprite.track.line.fillStyle;
	sprite.temp.lineWidth = sprite.track.line.lineWidth;
	sprite.temp.lineCap = sprite.track.line.lineCap;
	sprite.temp.lineJoin = sprite.track.line.lineJoin;
	sprite.temp.justfill = sprite.track.line.justfill;
	sprite.temp.linearfill = sprite.track.line.linearfill;
	sprite.temp.lineGrad = sprite.track.line.lineGrad;
	sprite.temp.radGrad = sprite.track.line.radGrad;
	sprite.temp.colorStops = sprite.track.line.colorStops;
	sprite.temp.stopn = sprite.track.line.stopn;
	sprite.temp.shadow = sprite.track.line.shadow;
	sprite.temp.shadowOffsetX    = sprite.track.line.shadowOffsetX;   
	sprite.temp.shadowOffsetY    = sprite.track.line.shadowOffsetY;   
	sprite.temp.shadowBlur    = sprite.track.line.shadowBlur;   
	sprite.temp.shadowColor = sprite.track.line.shadowColor;
	sprite.temp.visible = sprite.track.visible;

	
	sprite.track.line.strokeStyle=[0,0,0,1];
   	sprite.track.line.fillStyle=[255,255,255,0];
   	sprite.track.line.lineWidth = 1;
   	sprite.track.line.lineCap = "butt";
   	sprite.track.line.lineJoin = "miter"
   	sprite.track.line.justfill=true;
   	sprite.track.line.linearfill=true;
   	sprite.track.line.lineGrad=[0,0,0,0];
   	sprite.track.line.radGrad=[0,0,0,0,10,10];
   	sprite.track.line.colorStops=[[0,0,0,0,0],[1,0,0,0,0]];
   	sprite.track.line.stopn=0;
   	sprite.track.line.shadow=false;
   	sprite.track.line.shadowOffsetX = 15;   
   	sprite.track.line.shadowOffsetY = 15;   
   	sprite.track.line.shadowBlur = 0;   
   	sprite.track.line.shadowColor = [0, 0, 0, 0];
	sprite.track.visible=true;
	
	if (sprite.engine !='scene')
	{
		outlinetracks(sprite.train);
	}
	
}

function restoretracksprops(sprite)
{
	sprite.track.line.strokeStyle = sprite.temp.strokeStyle;
	sprite.track.line.fillStyle = sprite.temp.fillStyle;
	sprite.track.line.lineWidth = sprite.temp.lineWidth;
	sprite.track.line.lineCap = sprite.temp.lineCap;
	sprite.track.line.lineJoin = sprite.temp.lineJoin;
	sprite.track.line.justfill = sprite.temp.justfill;
	sprite.track.line.linearfill = sprite.temp.linearfill;
	sprite.track.line.lineGrad = sprite.temp.lineGrad;
	sprite.track.line.radGrad = sprite.temp.radGrad;
	sprite.track.line.colorStops = sprite.temp.colorStops;
	sprite.track.line.stopn = sprite.temp.stopn;
	sprite.track.line.shadow = sprite.temp.shadow;
	sprite.track.line.shadowOffsetX    = sprite.temp.shadowOffsetX;   
	sprite.track.line.shadowOffsetY    = sprite.temp.shadowOffsetY;   
	sprite.track.line.shadowBlur    = sprite.temp.shadowBlur;   
	sprite.track.line.shadowColor = sprite.temp.shadowColor;
	sprite.track.visible = sprite.temp.visible;
	if (sprite.engine !='scene')
	{
		restoretracksprops(sprite.train);
	}
}

*/