function $(id)
{
      return document.getElementById(id);
}

function Point(x,y)
{
	this.x=x;
	this.y=y;
}

function Node(point,ctrl1,ctrl2) 
{
	this.point=point;
	this.ctrl1=ctrl1;
	this.ctrl2=ctrl2;
	this.vertex;
	this.corner;
	this.next;
	this.prev;
}

function Shape(name) 
{
   	this.title;
   	this.name=name;
   	this.open;
   	this.editable;
   	this.type;
   	this.strokeStyle=[0,0,0,1];
   	this.fillStyle=[255,255,255,1];
   	this.lineWidth = 1;
   	this.lineCap = "butt";
   	this.lineJoin = "miter"
   	this.justfill=true;  //ordinary fill when true;
   	this.linearfill=true; //linear when true, radial when false;
   	this.lineGrad=[0,0,0,0];
   	this.radGrad=[0,0,0,0,10,10];
   	this.colorStops=[[0,0,0,0,0],[1,0,0,0,0]];
   	this.stopn=0; //pointer to current stop point;
   	this.shadow=false;
   	this.shadowOffsetX = 15;   
   	this.shadowOffsetY = 15;   
   	this.shadowBlur = 0;   
   	this.shadowColor = [0, 0, 0, 0];
   	this.zIndex=0;
   	this.crnradius=10;
   	p=new Point("end","end");
   	this.path=new Node(p);
   	this.path.next=this.path;
   	this.path.prev=this.path;
   	   	
   	//methods
   	this.addTo=addTo;
   	//this.setPath=setPath;
   	this.addNode=addNode;
   	this.draw=draw;
	//this.drawjustpath=drawjustpath;	
   	return this;
   	
}

function addTo(theatre)
{
	this.Canvas = document.createElement('canvas');
   	this.Canvas.style.position='absolute';
   	this.Canvas.style.left="0px"; 
   	this.Canvas.style.top= "0px";  	
   	this.Canvas.width=SCRW;
   	this.Canvas.height=SCRH;	
   	this.Canvas.style.zIndex=this.zIndex;
   	theatre.appendChild(this.Canvas);
   	if (this.Canvas.getContext)
	{
        this.Canvas.ctx = this.Canvas.getContext('2d');
    }
    else
    {
    	this.Canvas=G_vmlCanvasManager.initElement(this.Canvas);
    	this.Canvas.ctx = this.Canvas.getContext('2d');
    }
    //this.Canvas.shape=this;
}

function addNode(node)
{
	var path=this.path;
	node.next=path;
	node.prev=path.prev;
	path.prev.next=node;
	path.prev=node;
	node.shape=this;
}

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

function Scene(name)
{
	this.name=name;
	this.shapes={};
	
	//methods
	this.drawscene=drawscene;
	//this.addToStage=addToStage;
}


function drawscene()
{
	for(var name in this.shapes)
	{
		this.shapes[name].draw();
		this.shapes[name].Canvas.ctx.restore();
		this.shapes[name].Canvas.ctx.save();
	}
}

function Sprite(name)
{
	this.name=name;
	this.title;
	this.ptime;
	this.track;
	this.engine;
	this.train;
	this.speed;
	this.finishmove=false;
	this.points=[]; //an array of points along a path depending on time along path giving x and y coordinates and the angle of the gradient at that point
	this.pointer=0;
	this.vector = {xs:0,ys:0,xe:0,ye:0,psi:0};
	this.usevec=false;
	this.expanded=false;
	
	//methods
	this.drawsprite=drawsprite;
	this.drawrailway=drawrailway;
	this.drawalltracks=drawalltracks;
	this.inTheatre=inTheatre;
	this.followPath=followPath;
	this.setPoints=setPoints;
	this.moveSprite=moveSprite;
	this.setVector=setVector;
	this.zeroPointers=zeroPointers;
	this.saveCanvases=saveCanvases;
	this.restoreCanvases=restoreCanvases;
	this.transform=transform;
	this.transformTrack=transformTrack;
	this.nextPointer=nextPointer;
	this.getShapes=getShapes;
	this.getSprite=getSprite;
	this.getScene=getScene;
	this.getTrack=getTrack;
}

function Film(name)
{
	this.name=name;
	this.title;
	this.elements={};
	
	//methods
	this.setUp=setUp;
	this.play=play;
}

function setUp()
{
	var flel;
	this.active={};
	for(var el in this.elements)
	{
		flel=this.elements[el];
		this.active[el]=flel;
		switch(flel.source)
		{
			case "scene":
			break
			case "sprite":
			 	STOPCHECKING=false;
			 	flel.elm.zeroPointers();
			 	flel.elm.saveCanvases();
			 	flel.elm.track.drawtrack(false);
				flel.elm.transform();
				flel.elm.drawsprite();
				flel.elm.drawalltracks(false);
			break
		}
	}
	this.t=0; // time into this
	this.play(0);
}

function play(t)
{
	var stoprun;
	this.t=t;
	var alen=0;
	for(var name in this.active)
	{
		alen++;
	}
	if(alen>0 && !this.paused && !this.stopped)
	{
		for(var name in this.active)
		{
			flel=this.elements[name];
			if(isNaN(flel.S))
			{
				stoprun=t+10;
			}
			else
			{
				stoprun=flel.S;
			}
			if(t>=flel.A*1000)
			{
				$(flel.id).style.visibility="visible";
				if(isNaN(flel.D) || (!(isNaN(flel.D)) && t>flel.D*1000) ) //check to leave element visible and delete from this active if stationery
				{
					if(!(isNaN(flel.D)) && t>flel.D*1000)
					{
						$(flel.id).style.visibility="hidden";
					}
					switch(flel.source)
					{
						case "scene":
							delete this.active[name];
						break
						case "sprite":
							if(isNaN(flel.S))
							{
								if(flel.elm.finishmove)
								{
									delete this.active[name];
								}
							}
							else
							{
								if(t>flel.S*1000)
								{
									delete this.active[name];
								}
							}
						break
					}
				}
			}
		}
		switch (flel.source)
		{
			case "sprite":
				if(t>=flel.R*1000 && t<stoprun*1000)
				{
					flel.elm.transform();
					flel.elm.drawalltracks(true);
					flel.elm.drawsprite();
				}
			break
		}
		var film=this;
	  	var runthis=setTimeout(function() {film.play(t+50)},50);
	}
	else
	{
		clearTimeout(runthis);
	}
}
