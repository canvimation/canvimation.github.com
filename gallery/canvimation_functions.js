function showfilm()
{
	var sprite;
	for (var i=0; i<film.list.length;i++)
	{
		film.list[i][9]=false;
		if (film.list[i][0]=='SP')
		{
			sprite=sprites[film.list[i][1]];
			filmfollowpath(sprite);
		}
	}
	
	runlist={};
	runfilm(0);
}

function runfilm(t)
{
	var filmfinished=true;
	for (var i=0; i<film.list.length;i++)
	{
		var ff=true;
		if (film.list[i][2]==t)
		{
			var fdiv=$('filmdiv'+film.list[i][1]);
			fdiv.style.visibility='visible';
			if (film.list[i][0]=='SC' && (film.list[i][3]=='e' || film.list[i][3]=='ever'))
			{
				film.list[i][9]=true;
				for(var j=0; j<fdiv.childNodes.length; j++)
				{
					drawline(fdiv.childNodes[j].frame);
				}
			}
			else if(film.list[i][0]=='SP')
			{
				var sprite=sprites[film.list[i][1]];
				if (sprite.track.visible)
				{
					drawline(sprite.track.line);
				}
			}
			ff = ff && film.list[i][9];
		}
		if (film.list[i][3]==t)
		{
			$('filmdiv'+film.list[i][1]).style.visibility='hidden';
			film.list[i][9]=true
			if (film.list[i][0]=='SP')
			{
				delete runlist[film.list[i][1]];
			}
			ff = ff && film.list[i][9];
		}
		if (film.list[i][0]=='SP')
		{
			if (film.list[i][4]==t)
			{
				sprite=sprites[film.list[i][1]];
				runlist[film.list[i][1]]=film.list[i];
			}
			if (film.list[i][5]==t)
			{	
				film.list[i][9]=true;
				delete runlist[film.list[i][1]];
			}
		}
		
	}
	
	
	var osvalue=openshutter(runlist);
	filmfinished = ff &&  osvalue;
	t+=50;
	if (!filmfinished)
	{
		setTimeout(function() {runfilm(t)},50);
	}
}

function openshutter(runlist)
{
	var ff=true;
	var opened=false;
	for (var  flm in runlist)
	{
		switch (runlist[flm][0])
		{
			case 'SP':
				shvalue=shutter(sprites[runlist[flm][1]]);
				ff=ff && shvalue;
			break
		}	
	}
	return ff && opened;
}

function shutter(sprite)
{
	if (!sprite.finishmove)
	{
		transform(sprite);
		drawtracks(sprite);
		for (var i=0; i<sprite.cars.length; i++)
 	  	{ 	
			drawline(sprite.cars[i]);
			sprite.cars[i].ctx.restore();
			sprite.cars[i].ctx.save();
	  	}
	}
	return sprite.finishmove;
}

function filmfollowpath(sprite)
{
	zeropointers(sprite);
	sprite.finishmove=false;
	savecanvases(sprite);
	savetracks(sprite);
}

function savecanvases(sprite)
{
	for (var i=0; i<sprite.cars.length; i++)
	{
		sprite.cars[i].ctx.save();
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

function drawline(canv)
{
	canv.ctx.clearRect(0,0,canv.width,canv.height);
	
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
			//canv.ctx.clearRect(-canv.width,-canv.height,2*canv.width,2*canv.height);
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
			canv.ctx.clearRect(-canv.width,-canv.height,2*canv.width,2*canv.height);
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
		canv.ctx.clearRect(-canv.width,-canv.height,2*canv.width,2*canv.height);	
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