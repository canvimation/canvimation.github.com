function $(id)
{
      return document.getElementById(id);
}
//html="";
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
	var scrw=this.Canvas.width;
	var scrh=this.Canvas.height;
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
	//this.inTheatre=inTheatre;
	//this.followPath=followPath;
	this.setPoints=setPoints;
	//this.moveSprite=moveSprite;
	//this.setVector=setVector;
	this.zeroPointers=zeroPointers;
	this.saveCanvases=saveCanvases;
	this.restoreCanvases=restoreCanvases;
	this.transform=transform;
	this.transformTrack=transformTrack;
	this.nextPointer=nextPointer;
	this.getShapes=getShapes;
	//this.getSprite=getSprite;
	//this.getScene=getScene;
	//this.getTrack=getTrack;
}

function drawsprite()
{
	switch(this.engine)
	{
		case "scene":
			this.train.drawscene();
		break
		case "sprite":
			this.train.drawsprite();
		break
	}
}

function drawrailway()
{
	switch (this.engine)
	{
		case "scene":
			this.train.drawscene();
		break
		case "sprite":
			this.train.transform();
			this.train.drawsprite();
			this.drawalltracks();
		break	
	}
}

function drawalltracks()
{
	if (this.engine !='scene')
	{
		this.train.track.drawtrack();
		this.train.drawalltracks();
	}
}

function zeroPointers()
{
	this.pointer=0;
	if (this.engine!='scene')
	{
		this.train.zeroPointers();
	}
}

function getShapes()
{
	switch(this.engine)
	{
		case "scene":
			return this.train.shapes;
		break
		case "sprite":
			return this.train.getShapes();
		break
	}
}

function saveCanvases()
{
	var shape;
	switch (this.engine)
	{
		case "scene":
			shape=this.track.shape;
			shape.Canvas.ctx.save();
			for(var name in this.train.shapes)
			{
				shape=this.train.shapes[name];
				shape.Canvas.ctx.save();
			}
		break
		case "sprite":
			shape=this.track.shape;
			shape.Canvas.ctx.save();
			this.train.saveCanvases();
		break
	}
}

function restoreCanvases()
{
	var shape;
	switch (this.engine)
	{
		case "scene":
			shape=this.track.shape;
			shape.Canvas.ctx.restore();
			for(var name in this.train.shapes)
			{
				shape=this.train.shapes[name];
				shape.Canvas.ctx.restore();
			}
		break
		case "sprite":
			shape=this.track.shape;
			shape.Canvas.ctx.restore();
			this.train.restoreCanvases();
		break
	}
}

function transform()
{
	var shape;
	var curptr=this.pointer % this.points.length;
	this.nextPointer();
	var p = this.points[curptr];
	switch(this.engine)
    {
    	case 'scene':	
			for(var name in this.train.shapes)
			{	
				shape=this.train.shapes[name];
				shape.Canvas.ctx.translate(p.x,p.y);
				if (this.usevec)
				{
					var psi=p.phi-this.vector.psi;
					shape.Canvas.ctx.rotate(psi);
				}
				shape.Canvas.ctx.translate(-this.vector.xs, -this.vector.ys);
			}
		break
		case "sprite":
			var v=this.vector;
			this.transformTrack(p,v);
			var shapes=this.train.getShapes();
			for(var name in shapes)
			{	
				shape=shapes[name];
				shape.Canvas.ctx.translate(p.x,p.y);
				if (this.usevec)
				{
					var psi=p.phi-this.vector.psi;
					shape.Canvas.ctx.rotate(psi);
				}
				shape.Canvas.ctx.translate(-this.vector.xs, -this.vector.ys);
			}
			this.train.transform();
		break
	}
}

function transformTrack(p,v)
{
	if (this.engine !='scene')
	{
		var shape=this.train.track.shape;
		shape.Canvas.ctx.translate(p.x,p.y);
		if (this.usevec)
		{
			var psi=p.phi-v.psi;
			shape.Canvas.ctx.rotate(psi);
		}
		shape.Canvas.ctx.translate(-v.xs, -v.ys);
		this.train.transformTrack(p,v);
	}
}

function nextPointer()
{
	if (STOPCHECKING)
	{
		this.finishmove=true;
		return;
	}
	
	this.finishmove=false;
	if (this.track.repeats=='c')
	{
		this.pointer +=1;
		return;
	}
	var shape=this.track.shape;
	if (!shape.open && this.pointer>=((this.track.repeats)*this.points.length))
	{
		this.finishmove=true;
	}
	else if (shape.editable && this.pointer>=((this.track.repeats)*this.points.length - 1))
	{
		this.finishmove=true;
	}
	else
	{
		this.pointer +=1;
	}
}

function setPoints()
{
  	var track=this.track;
  	track.ptime=this.ptime*1000;
  	track.setLengths();
  	track.setTimes();
  	var s=0; //section number
  	var t=0; //time in milliseconds 
  	var dt; //fraction of time from 0 to 1 for a section of path
  	var xd,yd,phi //for linear sections
  	this.points=[];
  	var prev;
  	var shape=track.shape;
  	var path=shape.path;
  	var node=path.next; 
  	while(node.next.point.x!="end")
  	{
  		prev=node;
  		node=node.next;
  		while(t<track.times[s+1])
  		{
  			dt=(t-track.times[s])/(track.times[s+1]-track.times[s]);
  			switch(node.vertex)
  			{
  				case "L":
  					xd=prev.point.x+(node.point.x-prev.point.x)*dt;
  					yd=prev.point.y+(node.point.y-prev.point.y)*dt;
  					phi=arctan((node.point.y-prev.point.y),(node.point.x-prev.point.x));
  					this.points.push({x:xd,y:yd,phi:phi});
  				break
  				case "B":
  					this.points.push({x:x(dt),y:y(dt),phi:arctan(dy(dt),dx(dt))});
  				break
  			}
  			llxx=this.points.length-1;
  			t+=50;
  		}
  		s++;
  	}
  	if (track.yoyo)
  	{
	  	var apl=this.points.length;
	  	for (var i=apl; i>0; i--)
	  	{
		  	this.points.push(this.points[i-1]);
	  	}
  	}
  	if (this.engine !='scene')
 	{
	 	this.train.setPoints();  
  	}
  
  	function x(t)
	{
		return (1-t)*(1-t)*(1-t)*prev.point.x + 3*(1-t)*(1-t)*t*node.ctrl1.x + 3*(1-t)*t*t*node.ctrl2.x + t*t*t*node.point.x
	}
	
	function y(t)
	{
	
		return (1-t)*(1-t)*(1-t)*prev.point.y + 3*(1-t)*(1-t)*t*node.ctrl1.y + 3*(1-t)*t*t*node.ctrl2.y + t*t*t*node.point.y
	}
	
	function dx(t)
	{
		return -3*(1-t)*(1-t)*prev.point.x + (3*(1-t)*(1-t) - 6*(1-t)*t)*node.ctrl1.x + (6*(1-t)*t - 3*t*t)*node.ctrl2.x + 3*t*t*node.point.x;
	}
	
	function dy(t)
	{
		return -3*(1-t)*(1-t)*prev.point.y + (3*(1-t)*(1-t) - 6*(1-t)*t)*node.ctrl1.y + (6*(1-t)*t - 3*t*t)*node.ctrl2.y + 3*t*t*node.point.y;
	}
}

function Track(name)
{
	this.name=name;
	this.title;
	this.shape;
	this.repeats=1;
	this.visible=false;
	this.yoyo=false;
	this.length;
	this.lengths=[];
	this.times=[];
	this.ptime;
	
	//methods
	this.drawtrack=drawtrack;
	this.setLengths=setLengths;
	this.setTimes=setTimes;
	this.saveTrack=saveTrack;
	this.restoreTrack=restoreTrack;
}


function setLengths()
{
	this.length=0; //cummulative total of section lengths
	this.lengths=[]; //array of section lengths
	var sl;  //section length
	path=this.shape.path;
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
	  this.length += sl;
	  this.lengths.push(sl);
	  node=node.next;
	};
}

function setTimes() 
{
	var v=this.length/this.ptime;
	var cuml_time=0; //cummulative time over sections
	var t; //time over a section
	this.times=[0];
	for (var i=0; i<this.lengths.length; i++)
	{
		t=this.lengths[i]/v; //time over section
		cuml_time +=t;
		this.times.push(cuml_time);
	}
}

function drawtrack()
{
	var shape=this.shape;
	if(this.visible)
	{
		shape.draw();
	}
	shape.Canvas.ctx.restore();
	shape.Canvas.ctx.save();
}

function saveTrack()
{
	var shape=this.shape();
	shape.Canvas.ctx.save();
}

function restoreTrack()
{
	var shape=this.shape();
	shape.Canvas.ctx.restore();
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
			 	flel.elm.track.drawtrack();
				flel.elm.transform();
				flel.elm.drawsprite();
				flel.elm.drawalltracks();
			break
		}
	}
	this.t=0; 	
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
	if(alen>0)
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
		
			switch (flel.source)
			{
				case "sprite":
					if(t>=flel.R*1000 && t<stoprun*1000)
					{
						flel.elm.transform();html="";
						flel.elm.drawalltracks();
						flel.elm.drawsprite();
					}
				break
			}
		}	
		var film=this;
	  	var runthis=setTimeout(function() {film.play(t+50)},50);
	}
	else
	{
		clearTimeout(runthis);
	}
}

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

function arctan(y,x)  //returns angle of line from (0,0) to (x,y) from x axis 
{
	if(x==0)
	{
		if(y>0) 
		{
			return Math.PI/2;
		}
		else
		{
			return 3*Math.PI/2;
		}
	}
	
	if(y==0)
	{
		if(x>0)
		{
			return 0;
		}
		else
		{
			return Math.PI;
		}
	}
		
	var theta = Math.atan(Math.abs(y/x));
	
	if (x>0)
	{
		if (y<0) {theta = 2*Math.PI-theta};
	}
	else
	{
		if (y>0)
		{
			theta = Math.PI-theta;
		}
		else
		{
			theta += Math.PI;
		}
	}
	return theta;
}
