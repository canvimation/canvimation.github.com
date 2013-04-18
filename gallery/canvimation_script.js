function $(id)
{
      return document.getElementById(id);
}

function Point(x,y)
{
	this.x=x;
	this.y=y;
	//methods
	this.pointRotate=pointRotate;
}

function pointRotate(theta)  //rotate p about origin through angle theta
{
	var px=this.x*Math.cos(theta)-this.y*Math.sin(theta);
	var py=this.x*Math.sin(theta)+this.y*Math.cos(theta);
	var p=new Point(px,py);
	return p;
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
	
	//methods
	this.pathTweeningPoints=pathTweeningPoints;
	this.translateTweeningPoints=translateTweeningPoints;
	this.linx=linx;
	this.liny=liny;
	this.bezx=bezx;
	this.bezy=bezy;
}

//SHAPE Section*********************************************************************

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
   	this.getLengths=getLengths;
   	this.addNode=addNode;
   	this.draw=draw;
	//this.drawjustpath=drawjustpath;	
   	return this;
}

function rotate(theta) //about origin
{
	
	var px=this.point.x*Math.cos(theta)-this.point.y*Math.sin(theta);
	var py=this.point.x*Math.sin(theta)+this.point.y*Math.cos(theta);
	this.point.x=px;
	this.point.y=py;
	if(this.ctrl1.x!="non")
	{
		var c1x=this.ctrl1.x*Math.cos(theta)-this.ctrl1.y*Math.sin(theta);
		var c1y=this.ctrl1.x*Math.sin(theta)+this.ctrl1.y*Math.cos(theta);
		var c2x=this.ctrl2.x*Math.cos(theta)-this.ctrl2.y*Math.sin(theta);
		var c2y=this.ctrl2.x*Math.sin(theta)+this.ctrl2.y*Math.cos(theta);
		this.ctrl1.x=c1x;
		this.ctrl1.y=c1y;
		this.ctrl2.x=c2x;
		this.ctrl2.y=c2y;
	}
}

function scaleY(s)
{
	this.point.y=s*this.point.y;
	if(this.ctrl1.x!="non")
	{
		this.ctrl1.y=s*this.ctrl1.y;
		this.ctrl2.y=s*this.ctrl2.y;
	}
}

function translate(x,y)
{
	this.point.x-=x;
	this.point.y-=y;
	if(this.ctrl1.x!="non")
	{
		this.ctrl1.x-=x;
		this.ctrl1.y-=y;
		this.ctrl2.x-=x;
		this.ctrl2.y-=y;
	}
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

function PathShape(name) 
{
   	this.name=name;
   	p=new Point("end","end");
   	this.path=new Node(p);
   	this.path.next=this.path;
   	this.path.prev=this.path;
   	   	
   	//methods
   	this.addNode=addNode;
   	this.getLengths=getLengths;
   	return this;
   	
}

//SCENE section***********************************************************************************

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

//SPRITE section*************************************************************************************************

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
	this.drawspritewithmove=drawspritewithmove;
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
	this.s=s;
	this.getMainTrain=getMainTrain;
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
		case "tween":
			this.train.drawtween();
		break
		case "sprite":
			this.train.drawsprite();
		break
	}
}

function drawspritewithmove()
{
	switch(this.engine)
	{
		case "scene":
			this.train.drawscene();
		break
		case "tween":
			this.train.tweenmove();
			this.train.tweenshape.Canvas.ctx.restore();
			this.train.tweenshape.Canvas.ctx.save();
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
		case "tween":
			this.train.drawtween();
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
	if (this.engine =='sprite')
	{
		this.train.track.drawtrack();
		this.train.drawalltracks();
	}
}

function zeroPointers()
{
	this.pointer=0;
	if (this.engine=='sprite')
	{
		this.train.zeroPointers();
	}
}

function s()
{
	switch(this.engine)
	{
		case "scene":
			return this.train.shapes;
		break
		case "tween":
			return this;
		break
		case "sprite":
			return this.train.s();
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
		case "tween":
			shape=this.track.shape;
			shape.Canvas.ctx.save();
			shape=this.train.tweenshape;
			shape.Canvas.ctx.save();
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
		case "tween":
			shape=this.track.shape;
			shape.Canvas.ctx.restore();
			shape=this.train.tweenshape;
			shape.Canvas.ctx.restore();
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
		case "tween":
			shape=this.train.tweenshape;
			shape.Canvas.ctx.translate(p.x,p.y);
			if (this.usevec)
			{
				var psi=p.phi-this.vector.psi;
				shape.Canvas.ctx.rotate(psi);
			}
			shape.Canvas.ctx.translate(-this.vector.xs, -this.vector.ys);
		break
		case "sprite":
			var v=this.vector;
			this.transformTrack(p,v);
			var shapes=this.train.s();
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
	if (this.engine ='sprite')
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
  	if (this.engine =='sprite')
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

function getMainTrain()
{
	if(this.engine=="sprite")
	{
		return this.train.getMainTrain()
	}
	else
	{
		return {train:this.train,engine:this.engine};
	}
	
}

//TWEEN Section********************************************************************************************

function TweenNode(point,ctrl1,ctrl2)
{
	this.point=point;
	if (arguments.length>1)
	{
		this.ctrl1=ctrl1;
		this.ctrl2=ctrl2;
		this.vertex="B";
	}
	else
	{
		this.ctrl1=new Point("non","non");
		this.ctrl2=new Point("non","non");
		this.vertex="L"
	}
	
	//methods
	this.rotate=rotate;
	this.scaleY=scaleY;
	this.translate=translate;
}

function Tween(name)
{
	this.name=name;
	this.nodePaths={}
	this.linegrads=[];
	this.radgrads=[];
	
	//methods
	this.drawtween=drawtween;
	this.prepareTweens=prepareTweens;
	this.setPoints=setPoints;
	this.zeroTweenPtrs=zeroTweenPtrs;
	this.updateTweenPtrs=updateTweenPtrs;
	this.tweenmove=tweenmove;
	this.transformTweeningPoints=transformTweeningPoints;
	this.gradlinetransform=gradlinetransform;
	this.betweenAngle=betweenAngle;
	this.reverseAll=reverseAll;
}

function drawtween()
{
	if(this.reverse)
	{
		var shape=this.copy;
	}
	else
	{
		var shape=this.shape;
	}
	shape.draw();
	shape.Canvas.ctx.restore();
	shape.Canvas.ctx.save();
}

function prepareTweens()
{
	var twnode,stnode,start;
	var mrt;
	var c,p,c1,c2;
	var shape=this.shape;
	var copy=this.copy;
	var node=shape.path.next;
	var copynode=copy.path.next;
	if(this.nodeTweening.active)
	{
		while(node.point.x!="end")
		{
			node.tweennodes=[]; //nodes on tween path for node
			node.ptr=0;
			node.repeat=node.nodepath.nodeTweening.repeat;
			node.yoyo=node.nodepath.nodeTweening.yoyo;
			node.Ttick=node.nodepath.nodeTweening.twtime*1000;
			if(isNaN(node.repeat)  || isNaN(this.maxruntime))
			{
				this.maxruntime="always";
			}
			else
			{
				mrt=node.repeat*node.Ttick;
				if(node.yoyo)
				{
					mrt*=2;
				}
				this.maxruntime=Math.max(this.maxruntime,mrt);
			}
			node.tick=50;
			while(node.ptr<node.Ttick)
			{
				p=new Point(0,0);
				twnode=new TweenNode(p);
				node.tweennodes.push(twnode);
				node.ptr+=node.tick;
			}
			node=node.next;
			copynode=copynode.next;
		}
		var node=shape.path.next;
		var copynode=copy.path.next;
		while(node.point.x!="end")
		{
			if(node.nodepath.nodeTweening.active)
			{
				node.pathTweeningPoints(copynode);
			}
			else
			{
				node.translateTweeningPoints(copynode);
			}
			node=node.next;
			copynode=copynode.next;
		}
	}
	else
	{
		while(node.point.x!="end")
		{
			this.transformTweeningPoints(node);
			node=node.next;
		}
	}
	if(this.gradfill.active || this.rotate.active || this.translate.active)
	{
		this.gradlinetransform();
	}
	if(this.fillcolour.active)
	{
		var FCtick=this.fillcolour.twtime*1000;
		if(isNaN(this.fillcolour.repeat)  || isNaN(this.maxruntime))
		{
			this.maxruntime="always";
		}
		else
		{
			mrt=this.fillcolour.repeat*FCtick;
			if(this.fillcolour.yoyo)
			{
				mrt*=2;
			}
			this.maxruntime=Math.max(this.maxruntime,mrt);
		}
		var tick=0;
		this.fillcolour.points=[];
		var tempcol=[];
		while(tick<=FCtick)
		{
			tempcol=[];
			for(var i=0;i<4;i++)
			{
				tempcol[i]=parseInt(shape.fillStyle[i])+tick*(parseInt(copy.fillStyle[i])-parseInt(shape.fillStyle[i]))/FCtick;
			}
			this.fillcolour.points.push(tempcol);
			tick+=50;
		}
	}
	if(this.linecolour.active)
	{
		var LCtick=this.linecolour.twtime*1000;
		if(isNaN(this.linecolour.repeat)  || isNaN(this.maxruntime))
		{
			this.maxruntime="always";
		}
		else
		{
			mrt=this.linecolour.repeat*LCtick;
			if(this.linecolour.yoyo)
			{
				mrt*=2;
			}
			this.maxruntime=Math.max(this.maxruntime,mrt);
		}
		var tick=0;
		this.linecolour.points=[];
		var tempcol=[];
		while(tick<=LCtick)
		{
			tempcol=[];
			for(var i=0;i<4;i++)
			{
				tempcol[i]=parseInt(shape.strokeStyle[i])+tick*(parseInt(copy.strokeStyle[i])-parseInt(shape.strokeStyle[i]))/LCtick;
			}
			this.linecolour.points.push(tempcol);
			tick+=50;
		}
	}
	if(this.gradfill.active)
	{
		var GFtick=this.gradfill.twtime*1000;
		if(isNaN(this.gradfill.repeat)  || isNaN(this.maxruntime))
		{
			this.maxruntime="always";
		}
		else
		{
			mrt=this.gradfill.repeat*GFtick;
			if(this.gradfill.yoyo)
			{
				mrt*=2;
			}
			this.maxruntime=Math.max(this.maxruntime,mrt);
		}
		var tick=0;
		this.gradfill.points=[];
		var tempcolstops=[];
		var tempcol=[];
		while(tick<=GFtick)
		{
			tempcolstops=[];
			for(var c=0; c<shape.colorStops.length;c++)
			{
				tempcol=[shape.colorStops[c][0]];
				for(var i=1;i<5;i++)
				{
					tempcol[i]=parseInt(shape.colorStops[c][i])+tick*(parseInt(copy.colorStops[c][i])-parseInt(shape.colorStops[c][i]))/GFtick;
				}
				tempcolstops.push(tempcol);
			}
			this.gradfill.points.push(tempcolstops);
			tick+=50;
		}
	}
	if(this.linestyles.active)
	{
		var LStick=this.linestyles.twtime*1000;
		if(isNaN(this.linestyles.repeat)  || isNaN(this.maxruntime))
		{
			this.maxruntime="always";
		}
		else
		{
			mrt=this.linestyles.repeat*LStick;
			if(this.linestyles.yoyo)
			{
				mrt*=2;
			}
			this.maxruntime=Math.max(this.maxruntime,mrt);
		}
		var tick=0;
		this.linestyles.points=[];
		var templs;
		while(tick<=LStick)
		{
			templs=shape.lineWidth+tick*(copy.lineWidth-shape.lineWidth)/LStick;
			this.linestyles.points.push(templs);
			tick+=50;
		}
	}
	
	if(this.shadow.active)
	{
		var SHtick=this.shadow.twtime*1000;
		if(isNaN(this.shadow.repeat)  || isNaN(this.maxruntime))
		{
			this.maxruntime="always";
		}
		else
		{
			mrt=this.shadow.repeat*SHtick;
			if(this.shadow.yoyo)
			{
				mrt*=2;
			}
			this.maxruntime=Math.max(this.maxruntime,mrt);
		}
		var tick=0;
		this.shadow.points=[];
		var tempsh;
		while(tick<=SHtick)
		{
			tempsh={
					shox:parseInt(shape.shadowOffsetX)+tick*(parseInt(copy.shadowOffsetX)-parseInt(shape.shadowOffsetX))/SHtick,
					shoy:parseInt(shape.shadowOffsetY)+tick*(parseInt(copy.shadowOffsetY)-parseInt(shape.shadowOffsetY))/SHtick,
					sblr:parseInt(shape.shadowBlur)+tick*(parseInt(copy.shadowBlur)-parseInt(shape.shadowBlur))/SHtick,
					shclr:[
							parseInt(shape.shadowColor[0])+tick*(parseInt(copy.shadowColor[0])-parseInt(shape.shadowColor[0]))/SHtick,
							parseInt(shape.shadowColor[1])+tick*(parseInt(copy.shadowColor[1])-parseInt(shape.shadowColor[1]))/SHtick,
							parseInt(shape.shadowColor[2])+tick*(parseInt(copy.shadowColor[2])-parseInt(shape.shadowColor[2]))/SHtick,
							parseInt(shape.shadowColor[3])+tick*(parseInt(copy.shadowColor[3])-parseInt(shape.shadowColor[3]))/SHtick,
						  ]
					}
			this.shadow.points.push(tempsh);
			tick+=50;
		}
	}
	if(this.edit.active)
	{
		var EDtick=this.edit.twtime*1000;
		if(isNaN(this.edit.repeat)  || isNaN(this.maxruntime))
		{
			this.maxruntime="always";
		}
		else
		{
			mrt=this.edit.repeat*EDtick;
			if(this.edit.yoyo)
			{
				mrt*=2;
			}
			this.maxruntime=Math.max(this.maxruntime,mrt);
		}
		var p1;
		var xtranslate=copy.centreOfRotation.x-shape.centreOfRotation.x;  //x translation
		var ytranslate=copy.centreOfRotation.y-shape.centreOfRotation.y;  //y translation 
		theta=copy.phi-shape.phi;
		if(copy.phi<shape.phi)
		{
			theta=2*Math.PI-theta;
		}			
		if(!this.rotate.clkw)
		{
			theta=-(2*Math.PI-theta);
		}
		switch (shape.type)
		{
			case "rounded_rectangle":
				node=shape.path.next;
				while(node.point.x!="end")
				{
					node.tweennodes=[];
					node.repeat=this.edit.repeat;
					node.yoyo=this.edit.yoyo;
					node=node.next;
				}
				var crnradius,brcx,brcy,tlcx,tlcy;
			break
			case "arc":
			case "segment":
			case "sector":
				var sYs=shape.archeight/shape.arcwidth; // ratio of height of ellipse to radius
				node=shape.path.next;			
				while(node.point.x!="end")
				{
					node.translate(shape.arccentre.x,shape.arccentre.y); //put origin at arccentre
					node.scaleY(1/sYs); //scale ellipse to circle				
					node=node.next;
				}
				var sYc=copy.archeight/copy.arcwidth; // ratio of height of ellipse to radius
				node=copy.path.next;			
				while(node.point.x!="end")
				{
					node.translate(copy.arccentre.x,copy.arccentre.y); //put origin at arccentre
					node.scaleY(1/sYc); //scale ellipse to circle				
					node=node.next;
				}
				var startAngleS=shape.path.next.getAngle(); //find angle of first node in node list between 0 and 2PI
				var startAngleC=copy.path.next.getAngle();
				switch (shape.type)
				{
					case "arc":
						var arcend=shape.path.prev;
						var endAngleS=shape.path.prev.getAngle();//find angle of last node on arc between 0 and 2PI
						var endAngleC=copy.path.prev.getAngle();
						var extra=0;
					break
					case "segment":
						var arcend=shape.path.prev.prev;
						var endAngleS=shape.path.prev.prev.getAngle();//find angle of last node on arc between 0 and 2PI
						var endAngleC=copy.path.prev.prev.getAngle();
						var extra=1 //one extra node at end
					break
					case "sector":
						var arcend=shape.path.prev.prev.prev;
						var endAngleS=shape.path.prev.prev.prev.getAngle();//find angle of last node on arc between 0 and 2PI
						var endAngleC=copy.path.prev.prev.prev.getAngle();
						var extra=2; //two extra nodes, centre and end
					break
				}
				if(endAngleS>startAngleS)
				{
					var thetaS=endAngleS-startAngleS;
				}
				else
				{
					var thetaS=2*Math.PI-(startAngleS-endAngleS)
				}
				if(endAngleC>startAngleC)
				{
					var thetaC=endAngleC-startAngleC;
				}
				else
				{
					var thetaC=2*Math.PI-(startAngleC-endAngleC)
				}
				node=shape.path.next;
				while(node.point.x!="end") //rotate to start angle, scale and translate back to correct position;
				{
					node.scaleY(sYs);
					node.translate(-shape.arccentre.x,-shape.arccentre.y);				
					node=node.next;
				}
				node=copy.path.next;
				while(node.point.x!="end") //rotate to start angle, scale and translate back to correct position;
				{
					node.scaleY(sYc);
					node.translate(-copy.arccentre.x,-copy.arccentre.y);				
					node=node.next;
				}
				node=shape.path.next;
				while(node.point.x!="end")
				{					
					node.tweennodes=[];
					node.repeat=this.edit.repeat;
					node.yoyo=this.edit.yoyo;
					node=node.next;
				}
				var radius, archeight, sY, arccentrex, arccentrey, theta;			
			break
		}
		while(tick<=EDtick)
		{
			switch (shape.type)
			{
				case "rounded_rectangle":
					crnradius=shape.crnradius+tick*(copy.crnradius-shape.crnradius)/EDtick;
					brcx=shape.btmrgtcrnr.x+tick*xtranslate/EDtick;
					brcy=shape.btmrgtcrnr.y+tick*ytranslate/EDtick;
					tlcx=shape.tplftcrnr.x+tick*xtranslate/EDtick;
					tlcy=shape.tplftcrnr.y+tick*ytranslate/EDtick;					
					c=new Point(shape.centreOfRotation.x+xtranslate*tick/EDtick,shape.centreOfRotation.y+ytranslate*tick/EDtick); //centre of rotation 				
					p=new Point(tlcx+crnradius,tlcy);
					sp=new Point(tlcx+crnradius,tlcy);
					node=shape.path.next;
					twnode=new TweenNode(p);  //top left;
					stnode=new TweenNode(sp);
					node.tweennodes.push(twnode);
					node=node.next;
					p=new Point(brcx-crnradius,stnode.point.y);
					twnode=new TweenNode(p);// top right
					node.tweennodes.push(twnode);
					c1=new Point(p.x+crnradius*K,p.y);
					p=new Point(brcx,p.y+crnradius);
					c2=new Point(p.x,p.y-crnradius*K);
					node=node.next;
					twnode=new TweenNode(p,c1,c2);//right top
					node.tweennodes.push(twnode);
					p=new Point(p.x,brcy-crnradius);	
					node=node.next;
					twnode=new TweenNode(p);//right bottom
					node.tweennodes.push(twnode);
					c1=new Point(p.x,p.y+crnradius*K);
					p=new Point(brcx-crnradius,brcy);
					c2=new Point(p.x+crnradius*K,p.y);
					node=node.next;
					twnode=new TweenNode(p,c1,c2);//bottom right
					node.tweennodes.push(twnode);
					p=new Point(stnode.point.x,p.y);
					node=node.next;
					twnode=new TweenNode(p);//bottom left
					node.tweennodes.push(twnode);
					c1=new Point(p.x-crnradius*K,p.y);
					p=new Point(tlcx,p.y-crnradius);
					c2=new Point(p.x,p.y+crnradius*K);
					node=node.next;
					twnode=new TweenNode(p,c1,c2);//left bottom
					node.tweennodes.push(twnode);
					p=new Point(p.x,stnode.point.y+crnradius);
					node=node.next;
					twnode=new TweenNode(p);//left top
					node.tweennodes.push(twnode);
					c1=new Point(p.x,p.y-crnradius*K);
					p=new Point(stnode.point.x,stnode.point.y);
					c2=new Point(p.x-crnradius*K,p.y);
					node=node.next;
					twnode=new TweenNode(p,c1,c2);//top left again
					node.tweennodes.push(twnode);
					if(this.rotate.active)
					{
						node=shape.path.next;
						while(node.point.x!="end")
						{
							twnode=node.tweennodes.pop();
							p=twnode.point;
							c1=twnode.ctrl1;
							c2=twnode.ctrl2;
							p.x-=c.x;
							p.y-=c.y;
							p1=p.pointRotate(shape.phi+theta*tick/EDtick);
							p.x=p1.x+c.x;
							p.y=p1.y+c.y;
							if(c1.x!="non")
							{
								c1.x-=c.x;
								c1.y-=c.y;
								p1=c1.pointRotate(shape.phi+theta*tick/EDtick);
								c1.x=p1.x+c.x;
								c1.y=p1.y+c.y;
								c2.x-=c.x;
								c2.y-=c.y;
								p1=c2.pointRotate(shape.phi+theta*tick/EDtick);
								c2.x=p1.x+c.x;
								c2.y=p1.y+c.y;
							}
							node.tweennodes.push(twnode);
							node=node.next;
						}
					}			
				break
				case "arc":
				case "segment":
				case "sector":
					radius=shape.radius+tick*(copy.radius-shape.radius)/EDtick;
					archeight=shape.archeight+tick*(copy.archeight-shape.archeight)/EDtick;
					arcwidth=shape.arcwidth+tick*(copy.arcwidth-shape.arcwidth)/EDtick;
					sY=archeight/arcwidth; // ratio of height of ellipse to radius
					arccentrex=shape.arccentre.x+tick*xtranslate/EDtick;
					arccentrey=shape.arccentre.y+tick*ytranslate/EDtick;
					theta=thetaS+tick*(thetaC-thetaS)/EDtick;
					startAngle=startAngleS+tick*(startAngleC-startAngleS)/EDtick;					
					var phi=0;//to break theta into an acute angle (psi) and multiples of PI/2 (phi)
					node=shape.path.next;
					while(node.point.x!="end")// set all nodes for 0 degrees
					{
						p=new Point(radius,0);
						twnode=new TweenNode(p);
						node.tweennodes.push(twnode);
						node=node.next;
					}		
					node=arcend;
					if(theta>Math.PI/2)
					{
						prev=node.prev;
						phi=Math.PI/2;
						var p_90=new Point(0,radius); //set node on circle at 90 degrees
						var c1_90=new Point(radius,radius*K);
						var c2_90=new Point(radius*K,radius);
						var twnode_90=new TweenNode(p_90,c1_90,c2_90);
						prev.tweennodes.pop();
						prev.tweennodes.push(twnode_90);
					}
					if(theta>Math.PI)
					{
						prev=node.prev;
						phi=Math.PI;
						var p_180=new Point(-radius,0); //set node on circle at 180 degrees
						var c1_180=new Point(-radius*K,radius);
						var c2_180=new Point(-radius,radius*K);
						var twnode_180=new TweenNode(p_180,c1_180,c2_180);
						prev.tweennodes.pop();
						prev.tweennodes.push(twnode_180);
						var p_90=new Point(0,radius); //set node on circle at 90 degrees
						var c1_90=new Point(radius,radius*K);
						var c2_90=new Point(radius*K,radius);
						var twnode_90=new TweenNode(p_90,c1_90,c2_90);
						prev.prev.tweennodes.pop();
						prev.prev.tweennodes.push(twnode_90);	
					}
					if(theta>3*Math.PI/2)
					{
						prev=node.prev;
						phi=3*Math.PI/2;
						var p_270=new Point(0,-radius); // set node on circle at 270 degrees
						var c1_270=new Point(-radius,-radius*K);
						var c2_270=new Point(-radius*K,-radius);
						var twnode_270=new TweenNode(p_270,c1_270,c2_270);
						prev.tweennodes.pop();
						prev.tweennodes.push(twnode_270);
						var p_180=new Point(-radius,0); //set node on circle at 180 degrees
						var c1_180=new Point(-radius*K,radius);
						var c2_180=new Point(-radius,radius*K);
						var twnode_180=new TweenNode(p_180,c1_180,c2_180);
						prev.prev.tweennodes.pop();
						prev.prev.tweennodes.push(twnode_180);
						var p_90=new Point(0,radius); //set node on circle at 90 degrees
						var c1_90=new Point(radius,radius*K);
						var c2_90=new Point(radius*K,radius);
						var twnode_90=new TweenNode(p_90,c1_90,c2_90);
						prev.prev.prev.tweennodes.pop();
						prev.prev.prev.tweennodes.push(twnode_90);
					}
					var psi=theta-phi;//$("msg").innerHTML+=">>>"+tick+","+(theta*180/Math.PI)+","+(phi*180/Math.PI)+","+(psi*180/Math.PI)+"<br>";
					var b=baseArcBez(radius,psi/2);
					var twnode_theta=new TweenNode(b.p2,b.c1,b.c2);
					twnode_theta.rotate(phi+psi/2);
					node.tweennodes.pop();
					node.tweennodes.push(twnode_theta);
					if(shape.type=="sector")
					{
						node=node.next;
						var p_C=new Point(0,0);
						twnode=new TweenNode(p_C);
						node.tweennodes.pop();
						node.tweennodes.push(twnode);
					}				
					var node=shape.path.next;				
					while(node.point.x!="end") //rotate to start angle, scale and translate back to correct position;
					{
						node.tweennodes[node.tweennodes.length-1].rotate(startAngle);
						node.tweennodes[node.tweennodes.length-1].scaleY(sY);
						node.tweennodes[node.tweennodes.length-1].translate(-arccentrex,-arccentrey);
						node=node.next;
					}						
				break
			}
			tick+=50;
		}
	}
}

function translateTweeningPoints(copynode) //node and ctrl points for node translated  if node.nodepath.nodeTweening is false
{
	var open=this.shape.open;
	var start=this.nodepath.path.next.point;
	var last=this.nodepath.path.prev.point;
	
	var startc1=this.next.ctrl1;
	var lastc1=copynode.next.ctrl1;
	if(!open && this.prev.point.x=="end")
	{
		var startc2=this.prev.prev.ctrl2;
		var lastc2=copynode.prev.prev.ctrl2;
	}
	else
	{
		var startc2=this.ctrl2;
		var lastc2=copynode.ctrl2;
	}
	var xtranslate=last.x-start.x;  //x translation
	var ytranslate=last.y-start.y;  //y translation
	if(startc1.x!="non")
	{
		var xC1translate=lastc1.x-startc1.x;  //ctrl1 x translation
		var yC1translate=lastc1.y-startc1.y;  //ctrl1 y translation
	}
	if(startc2.x!="non")
	{
		var xC2translate=lastc2.x-startc2.x;  //ctrl1 x translation
		var yC2translate=lastc2.y-startc2.y;  //ctrl1 y translation
	}
	var tick=50;
	for(var i=0; i<this.tweennodes.length;i++)
	{
		this.tweennodes[i].point.x=start.x+xtranslate*i*tick/this.Ttick;
		this.tweennodes[i].point.y=start.y+ytranslate*i*tick/this.Ttick;
		if(!isNaN(startc1.x))
		{
			this.next.tweennodes[i].ctrl1.x=startc1.x+xC1translate*i*tick/this.Ttick;
			this.next.tweennodes[i].ctrl1.y=startc1.y+yC1translate*i*tick/this.Ttick;
		}
		if(!isNaN(startc2.x))
		{
			this.tweennodes[i].ctrl2.x=startc2.x+xC2translate*i*tick/this.Ttick;
			this.tweennodes[i].ctrl2.y=startc2.y+yC2translate*i*tick/this.Ttick;
		}
	}
}

function pathTweeningPoints(copynode) //node and ctrl points for node follows bezier path if node.nodepath.nodeTweening is true
{
	this.nodepath.getLengths();
	var ntwlen=this.tweennodes.length;
	if(this.vertex=="B")
	{
		this.ctrl1path.getLengths();
		var c1points=Math.round(this.ctrl1path.lengths[0]*ntwlen/this.ctrl1path.length); //points for ctrl1path
		var dtc1=1/c1points;
		var tc1=0;
		var accc1pl=c1points;
		this.ctrl2path.getLengths();
		var c2points=Math.round(this.ctrl2path.lengths[0]*ntwlen/this.ctrl2path.length); //points for ctrl2path
		var dtc2=1/c2points;
		var tc2=0;
		var accc2pl=c2points;
		var ctrl2node=this.ctrl2path.path.next;	
		var lastctrl2=this.ctrl2path.path.prev;
		var ctrl1node=this.ctrl1path.path.next;
		var lastctrl1=this.ctrl1path.path.prev;
	}
	
	this.tweennodes=[];
	var n=0,c1=0,c2=0;
	var points=Math.round(this.nodepath.lengths[0]*ntwlen/this.nodepath.length);
	var dt=1/points;
	var t=0;
	var p,twnode;
	var accnpl=points;
	var node=this.nodepath.path.next;
	var lastnode=this.nodepath.path.prev;
	for(var i=0;i<ntwlen;i++)
	{
		if(i>accnpl)
		{
			node=node.next;
			points=Math.round(this.nodepath.lengths[++n]*ntwlen/this.nodepath.length);
			accnpl+=points;
			dt=1/points;
			t=0;
		}
		if(this.vertex=="B")
		{
			if(i>accc1pl)
			{
				ctrl1node=ctrl1node.next;
				c1points=Math.round(this.ctrl1path.lengths[++c1]*ntwlen/this.ctrl1path.length); 
				accc1pl+=c1points;
				dtc1=1/c1points;
				tc1=0;
			}
			if(i>accc2pl)
			{
				ctrl2node=ctrl2node.next;
				
				c2points=Math.round(this.ctrl2path.lengths[++c1]*ntwlen/this.ctrl2path.length); //points for ctrl1path
				accc2pl+=c2points;
				dtc2=1/c2points;
				tc2=0;
			}
		}
		if(node.next.vertex=="L")
		{
			p=new Point(node.linx(t),node.liny(t));
			twnode=new TweenNode(p);
			if(this.vertex=="B")
			{
				twnode.ctrl2=new Point(ctrl2node.linx(tc2),ctrl2node.liny(tc2));
				twnode.ctrl1=new Point(ctrl1node.linx(tc1),ctrl1node.liny(tc1));
			}
		}
		else
		{
			p=new Point(node.bezx(t),node.bezy(t));
			twnode=new TweenNode(p);
			if(this.vertex=="B")
			{
				twnode.ctrl2=new Point(ctrl2node.bezx(tc2),ctrl2node.bezy(tc2));
				twnode.ctrl1=new Point(ctrl1node.bezx(tc1),ctrl1node.bezy(tc1));
			}
		}
		this.tweennodes.push(twnode);
		t+=dt;
		if(this.vertex=="B")
		{
			tc2+=dtc2;
			tc1+=dtc1;
		}
	}
}

function translateTweeningPoints(copynode) //node and ctrl points for node translated  if node.nodepath.nodeTweening is false
{
	var open=this.shape.open;
	var start=this.nodepath.path.next.point;
	var last=this.nodepath.path.prev.point;
	
	var startc1=this.next.ctrl1;
	var lastc1=copynode.next.ctrl1;
	if(!open && this.prev.point.x=="end")
	{
		var startc2=this.prev.prev.ctrl2;
		var lastc2=copynode.prev.prev.ctrl2;
	}
	else
	{
		var startc2=this.ctrl2;
		var lastc2=copynode.ctrl2;
	}
	var xtranslate=last.x-start.x;  //x translation
	var ytranslate=last.y-start.y;  //y translation
	if(startc1.x!="non")
	{
		var xC1translate=lastc1.x-startc1.x;  //ctrl1 x translation
		var yC1translate=lastc1.y-startc1.y;  //ctrl1 y translation
	}
	if(startc2.x!="non")
	{
		var xC2translate=lastc2.x-startc2.x;  //ctrl1 x translation
		var yC2translate=lastc2.y-startc2.y;  //ctrl1 y translation
	}
	var tick=50;
	for(var i=0; i<this.tweennodes.length;i++)
	{
		this.tweennodes[i].point.x=start.x+xtranslate*i*tick/this.Ttick;
		this.tweennodes[i].point.y=start.y+ytranslate*i*tick/this.Ttick;
		if(!isNaN(startc1.x))
		{
			this.next.tweennodes[i].ctrl1.x=startc1.x+xC1translate*i*tick/this.Ttick;
			this.next.tweennodes[i].ctrl1.y=startc1.y+yC1translate*i*tick/this.Ttick;
		}
		if(!isNaN(startc2.x))
		{
			this.tweennodes[i].ctrl2.x=startc2.x+xC2translate*i*tick/this.Ttick;
			this.tweennodes[i].ctrl2.y=startc2.y+yC2translate*i*tick/this.Ttick;
		}
	}
}

function transformTweeningPoints(node)  //node follows rotate translate path if node.nodepath.nodeTweening is false
{
	var theta; //theta is change in angle
	var c,p; //centre of rotation
	node.tweennodes=[]; //nodes on tween path for node
	node.ptr=0;
	node.tweennodes.push(node);
	var shape=this.shape;
	var copy=this.copy;
	var xtranslate=copy.centreOfRotation.x-shape.centreOfRotation.x;  //x translation
	var ytranslate=copy.centreOfRotation.y-shape.centreOfRotation.y;  //y translation 
	if(copy.phi==shape.phi)
	{
		theta=2*Math.PI;
	}
	else
	{
		theta=copy.phi-shape.phi;
		if(copy.phi<shape.phi)
		{
			theta=2*Math.PI-theta;
		}			
		if(!this.rotate.clkw)
		{
			theta=-(2*Math.PI-theta);
		}
	}
	var Ttick=this.translate.twtime*1000;
	var Rtick=this.rotate.twtime*1000;
	var tick=0;
	var doTranslate=this.translate.active;
	var doRotate=this.rotate.active;
	while(doTranslate || doRotate)
	{
		if(doTranslate)
		{
			if(doRotate)
			{
				//translate and rotate
				node.repeat=tween.translate.repeat;
				node.yoyo=tween.translate.yoyo;
				c=new Point(shape.centreOfRotation.x+xtranslate*tick/Ttick,shape.centreOfRotation.y+ytranslate*tick/Ttick);
				p=new Point(node.point.x+xtranslate*tick/Ttick-c.x,node.point.y+ytranslate*tick/Ttick-c.y);
				p=p.pointRotate(shape.phi+theta*tick/Rtick);
				p.x+=c.x;
				p.y+=c.y;
				if(node.ctrl1.x=="non")
				{
					twnode=new TweenNode(p);
				}
				else
				{
					c1=new Point(node.ctrl1.x+xtranslate*tick/Ttick-c.x,node.ctrl1.y+ytranslate*tick/Ttick-c.y);
					c2=new Point(node.ctrl2.x+xtranslate*tick/Ttick-c.x,node.ctrl2.y+ytranslate*tick/Ttick-c.y);
					c1=c1.pointRotate(shape.phi+theta*tick/Rtick);
					c1.x+=c.x;
					c1.y+=c.y;
					c2=c2.pointRotate(shape.phi+theta*tick/Rtick);
					c2.x+=c.x;
					c2.y+=c.y;
					twnode=new TweenNode(p,c1,c2);
				}
				node.tweennodes.push(twnode);
			}
			else
			{
				//translate only
				node.repeat=tween.translate.repeat;
				node.yoyo=tween.translate.yoyo;
				p=new Point(node.point.x+xtranslate*tick/Ttick,node.point.y+ytranslate*tick/Ttick);
				if(node.ctrl1.x=="non")
				{
					twnode=new TweenNode(p);
				}
				else
				{
					c1=new Point(node.ctrl1.x+xtranslate*tick/Ttick,node.ctrl1.y+ytranslate*tick/Ttick);
					c2=new Point(node.ctrl2.x+xtranslate*tick/Ttick,node.ctrl2.y+ytranslate*tick/Ttick);
					twnode=new TweenNode(p,c1,c2);
				}
				node.tweennodes.push(twnode);
			}
		}
		else
		{
			if(doRotate)
			{
				//rotate only
				node.repeat=tween.rotate.repeat;
				node.yoyo=tween.rotate.yoyo;
				c=new Point(shape.centreOfRotation.x,shape.centreOfRotation.y);
				p=new Point(node.point.x-c.x,node.point.y-c.y);
				p=p.pointRotate(shape.phi+theta*tick/Rtick);
				p.x+=c.x;
				p.y+=c.y;
				if(node.ctrl1.x=="non")
				{
					twnode=new TweenNode(p);
				}
				else
				{
					c1=new Point(node.ctrl1.x-c.x,node.ctrl1.y-c.y);
					c2=new Point(node.ctrl2.x-c.x,node.ctrl2.y-c.y);
					c1=c1.pointRotate(shape.phi+theta*tick/Rtick);
					c1.x+=c.x;
					c1.y+=c.y;
					c2=c2.pointRotate(shape.phi+theta*tick/Rtick);
					c2.x+=c.x;
					c2.y+=c.y;
					twnode=new TweenNode(p,c1,c2);
				}
				node.tweennodes.push(twnode);
			}
		}
		tick+=50;
		if(tick>Ttick) {doTranslate=false};
		if(tick>Rtick) {doRotate=false};
	}	
}

function gradlinetransform()
{
	var theta; //theta is change in angle
	var p; //temp point
	this.linegrads=[];
	this.radgrads=[];
	var shape=this.shape;
	var copy=this.copy;
	if(this.translate.active)
	{
		var Gtick=this.translate.twtime*1000;
	}
	if(this.rotate.active)
	{
		var Gtick=this.rotate.twtime*1000;
	}
	if(this.gradfill.active)
	{
		var Gtick=this.gradfill.twtime*1000;
	}
	var tick=0;
	var templg=[];
	var temprg=[];
	var nltheta0,nltheta1,nlx0,nly0,nlx1,nly1;
	var nrtheta0,nrtheta1,nrx0,nry0,nrx1,nry1;
	var nlradius,nrradius;
	var sltheta0=arctan(shape.lineGrad[1]-shape.centreOfRotation.y,shape.lineGrad[0]-shape.centreOfRotation.x);
	var	sltheta1=arctan(shape.lineGrad[3]-shape.centreOfRotation.y,shape.lineGrad[2]-shape.centreOfRotation.x);
	var cltheta0=arctan(copy.lineGrad[1]-copy.centreOfRotation.y,copy.lineGrad[0]-copy.centreOfRotation.x);
	var	cltheta1=arctan(copy.lineGrad[3]-copy.centreOfRotation.y,copy.lineGrad[2]-copy.centreOfRotation.x);
	var srtheta0=arctan(shape.radGrad[1]-shape.centreOfRotation.y,shape.radGrad[0]-shape.centreOfRotation.x);
	var	srtheta1=arctan(shape.radGrad[4]-shape.centreOfRotation.y,shape.radGrad[3]-shape.centreOfRotation.x);
	var crtheta0=arctan(copy.radGrad[1]-copy.centreOfRotation.y,copy.radGrad[0]-copy.centreOfRotation.x);
	var	crtheta1=arctan(copy.radGrad[4]-copy.centreOfRotation.y,copy.radGrad[3]-copy.centreOfRotation.x);
	
	var xtranslate=copy.centreOfRotation.x-shape.centreOfRotation.x;  //x translation
	var ytranslate=copy.centreOfRotation.y-shape.centreOfRotation.y;  //y translation 
	var slp0=new Point(shape.lineGrad[0]-shape.centreOfRotation.x,shape.lineGrad[1]-shape.centreOfRotation.y);
	p=slp0.pointRotate(cltheta0-sltheta0);
	var ldx0=copy.lineGrad[0]-(p.x+shape.centreOfRotation.x+xtranslate);
	var ldy0=copy.lineGrad[1]-(p.y+shape.centreOfRotation.y+ytranslate);
	var slp1=new Point(shape.lineGrad[2]-shape.centreOfRotation.x,shape.lineGrad[3]-shape.centreOfRotation.y);
	p=slp1.pointRotate(cltheta1-sltheta1);
	var ldx1=copy.lineGrad[2]-(p.x+shape.centreOfRotation.x+xtranslate);
	var ldy1=copy.lineGrad[3]-(p.y+shape.centreOfRotation.y+ytranslate);

	var srp0=new Point(shape.radGrad[0]-shape.centreOfRotation.x,shape.radGrad[1]-shape.centreOfRotation.y);
	p=srp0.pointRotate(crtheta0-srtheta0);
	var rdx0=copy.radGrad[0]-(p.x+shape.centreOfRotation.x+xtranslate);
	var rdy0=copy.radGrad[1]-(p.y+shape.centreOfRotation.y+ytranslate);
	var srp1=new Point(shape.radGrad[3]-shape.centreOfRotation.x,shape.radGrad[4]-shape.centreOfRotation.y);
	p=srp1.pointRotate(crtheta1-srtheta1);
	var rdx1=copy.radGrad[3]-(p.x+shape.centreOfRotation.x+xtranslate);
	var rdy1=copy.radGrad[4]-(p.y+shape.centreOfRotation.y+ytranslate);
	
	var doColor=this.gradfill.active || this.rotate.active || this.translate.active;
	while(doColor)
	{
		templg=[];
		temprg=[];
		
		nltheta0=this.betweenAngle(cltheta0,sltheta0,tick/Gtick);
		nltheta1=this.betweenAngle(cltheta1,sltheta1,tick/Gtick);

		p=slp0.pointRotate(nltheta0-sltheta0);
		templg[0]=p.x+shape.centreOfRotation.x+tick*(xtranslate+ldx0)/Gtick;
		templg[1]=p.y+shape.centreOfRotation.y+tick*(ytranslate+ldy0)/Gtick;
		p=slp1.pointRotate(nltheta1-sltheta1);
		templg[2]=p.x+shape.centreOfRotation.x+tick*(xtranslate+ldx1)/Gtick;
		templg[3]=p.y+shape.centreOfRotation.y+tick*(ytranslate+ldy1)/Gtick;
		this.linegrads.push(templg);
		
		nrtheta0=this.betweenAngle(crtheta0,srtheta0,tick/Gtick);
		nrtheta1=this.betweenAngle(crtheta1,srtheta1,tick/Gtick);

		p=srp0.pointRotate(nrtheta0-srtheta0);
		temprg[0]=p.x+shape.centreOfRotation.x+tick*(xtranslate+rdx0)/Gtick;
		temprg[1]=p.y+shape.centreOfRotation.y+tick*(ytranslate+rdy0)/Gtick;
		temprg[2]=shape.radGrad[2]+tick*(copy.radGrad[2]-shape.radGrad[2])/Gtick;
		p=srp1.pointRotate(nrtheta1-srtheta1);
		temprg[3]=p.x+shape.centreOfRotation.x+tick*(xtranslate+rdx1)/Gtick;
		temprg[4]=p.y+shape.centreOfRotation.y+tick*(ytranslate+rdy1)/Gtick;
		temprg[5]=shape.radGrad[5]+tick*(copy.radGrad[5]-shape.radGrad[5])/Gtick;
		this.radgrads.push(temprg);
		tick+=50;
		if(tick>Gtick) {doColor=false};
	}
}

function zeroTweenPtrs()
{
	this.translate.ptr=0;
	this.rotate.ptr=0;
	this.linestyles.ptr=0;
	this.linecolour.ptr=0;
	this.fillcolour.ptr=0;
	this.gradfill.ptr=0;
	this.shadow.ptr=0;
	this.translate.counter=0;
	this.rotate.counter=0;
	this.linestyles.counter=0;
	this.linecolour.counter=0;
	this.fillcolour.counter=0;
	this.gradfill.counter=0;
	this.shadow.counter=0;
	this.translate.dir=1;
	this.rotate.dir=1;
	this.linestyles.dir=1;
	this.linecolour.dir=1;
	this.fillcolour.dir=1;
	this.gradfill.dir=1;
	this.shadow.dir=1;
	var shape=this.shape;
	var node=shape.path.next;
	while(node.point.x!="end")
	{
		node.ptr=0;
		node.dir=1;
		node.counter=0;
		node=node.next;
	}	
}

function tweenmove()
{
	var shape=this.shape;
	
	if(this.translate.active  || this.rotate.active || this.nodeTweening.active || this.pointTweening || this.edit.active)
	{
		var node=shape.path.next;		
		var tweennode=this.tweenshape.path.next;
		while(node.point.x!="end")
		{
			tweennode.point.x=node.tweennodes[node.ptr].point.x;
			tweennode.point.y=node.tweennodes[node.ptr].point.y;			
			tweennode.ctrl1.x=node.tweennodes[node.ptr].ctrl1.x;
			tweennode.ctrl1.y=node.tweennodes[node.ptr].ctrl1.y;
			tweennode.ctrl2.x=node.tweennodes[node.ptr].ctrl2.x;
			tweennode.ctrl2.y=node.tweennodes[node.ptr].ctrl2.y;
			if(this.edit.active) 
			{
				tweennode.vertex=node.tweennodes[node.ptr].vertex;
			}
			node=node.next;
			tweennode=tweennode.next;
		}
		if(this.rotate.active)
		{
			var ptr=this.rotate.ptr;
		}
		if(this.translate.active)
		{
			var ptr=this.translate.ptr;
		}
		if(this.rotate.active || this.translate.active)
		{
			for(var i=0;i<4;i++)
			{
				this.tweenshape.lineGrad[i]=Math.round(this.linegrads[ptr][i]);
			}
			for(var i=0;i<6;i++)
			{
				this.tweenshape.radGrad[i]=Math.round(this.radgrads[ptr][i]);
			}
		}
	}
	if (this.gradfill.active)
	{
		var ptr=this.gradfill.ptr;
		for(var i=0;i<4;i++)
		{
			this.tweenshape.lineGrad[i]=Math.round(this.linegrads[ptr][i]);
		}
		for(var i=0;i<6;i++)
		{
			this.tweenshape.radGrad[i]=Math.round(this.radgrads[ptr][i]);
		}
	}
	if(this.fillcolour.active)
	{
		for(var i=0;i<4;i++)
		{
			this.tweenshape.fillStyle[i]=Math.round(this.fillcolour.points[this.fillcolour.ptr][i]);
		}
	}
	if(this.linecolour.active)
	{
		for(var i=0;i<4;i++)
		{
			this.tweenshape.strokeStyle[i]=Math.round(this.linecolour.points[this.linecolour.ptr][i]);
		}
	}
	if(this.linestyles.active)
	{
		this.tweenshape.lineWidth=this.linestyles.points[this.linestyles.ptr];
	}
	if(this.gradfill.active)
	{
		var colstops=this.gradfill.points[this.gradfill.ptr];
		for(var c=0; c<colstops.length;c++)
		{
			this.tweenshape.colorStops[c][0]=colstops[c][0];
			for(var i=1;i<5;i++)
			{
				this.tweenshape.colorStops[c][i]=Math.round(colstops[c][i]);
			}
		}
	}
	if(this.shadow.active)
	{
		this.tweenshape.shadow=true;
		var shobj=this.shadow.points[this.shadow.ptr];
		this.tweenshape.shadowOffsetX=shobj.shox;
		this.tweenshape.shadowOffsetY=shobj.shoy;
		this.tweenshape.shadowBlur=shobj.sblr;
		for(var i=0;i<3;i++)
		{
			this.tweenshape.shadowColor[i]=Math.round(shobj.shclr[i]);
		}
		this.tweenshape.shadowColor[3]=shobj.shclr[3];
	}
	this.tweenshape.draw();	
	this.updateTweenPtrs();
}

function updateTweenPtrs()
{
	var finishedtween=true;
	var shape=this.shape;
	var node;
	if(this.translate.active  || this.rotate.active || this.nodeTweening.active || this.pointTweening  || this.edit.active)
	{
		node=shape.path.next;
		while(node.point.x!="end")
		{
			finishedtween=true;
			if(node.counter<node.repeat || isNaN(node.repeat))
			{
				finishedtween=false;
				node.ptr+=node.dir;
				if(node.dir>0)
				{
					if(node.ptr>=node.tweennodes.length)
					{
						if(node.yoyo)
						{
							node.dir=-1;
							node.ptr-=2;
						}
						else
						{
							node.counter++;
							if(node.counter<node.repeat || isNaN(node.repeat))
							{
								node.ptr=0;
							}
							else
							{
								node.ptr--;
							}
						}
					}
				}
				else
				{
					if(node.ptr<0)
					{
						if(node.yoyo)
						{
							node.dir=1;
							node.counter++;
							node.ptr++;
						}
					}
				}
			}
			node=node.next;	
		}
	}
	if(this.translate.active && !shape.justfill)
	{
		if(this.translate.counter<this.translate.repeat || isNaN(this.translate.repeat))
		{
			finishedtween=false;
			this.translate.ptr+=this.translate.dir;
			if(this.translate.dir>0)
			{
				if(this.translate.ptr>=this.linegrads.length)
				{
					if(this.translate.yoyo)
					{
						this.translate.dir=-1;
						this.translate.ptr-=2;
					}
					else
					{
						this.translate.counter++;
						this.translate.ptr--;
					}
				}
			}
			else
			{
				if(this.translate.ptr<0)
				{
					if(this.translate.yoyo)
					{
						this.translate.dir=1;
						this.translate.counter++;
						this.translate.ptr++;
					}
				}
			}
		}	
	}
	if(this.rotate.active && !shape.justfill)  //rotation of gradient stops
	{
		if(this.rotate.counter<this.rotate.repeat || isNaN(this.rotate.repeat))
		{
			finishedtween=false;
			this.rotate.ptr+=this.rotate.dir;
			if(this.rotate.dir>0)
			{
				if(this.rotate.ptr>=this.linegrads.length)
				{
					if(this.rotate.yoyo)
					{
						this.rotate.dir=-1;
						this.rotate.ptr-=2;
					}
					else
					{
						this.rotate.counter++;
						this.rotate.ptr--;
					}
				}
			}
			else
			{
				if(this.rotate.ptr<0)
				{
					if(this.rotate.yoyo)
					{
						this.rotate.dir=1;
						this.rotate.counter++;
						this.rotate.ptr++;
					}
				}
			}
		}	
	}
	if(this.linestyles.active)
	{
		if(this.linestyles.counter<this.linestyles.repeat || isNaN(this.linestyles.repeat))
		{
			finishedtween=false;
			this.linestyles.ptr+=this.linestyles.dir;
			if(this.linestyles.dir>0)
			{
				if(this.linestyles.ptr>=this.linestyles.points.length)
				{
					if(this.linestyles.yoyo)
					{
						this.linestyles.dir=-1;
						this.linestyles.ptr-=2;
					}
					else
					{
						this.linestyles.counter++;
						this.linestyles.ptr--;
					}
				}
			}
			else
			{
				if(this.linestyles.ptr<0)
				{
					if(this.linestyles.yoyo)
					{
						this.linestyles.dir=1;
						this.linestyles.counter++;
						this.linestyles.ptr++;
					}
				}
			}
		}	
	}
	if(this.fillcolour.active)
	{
		if(this.fillcolour.counter<this.fillcolour.repeat || isNaN(this.fillcolour.repeat))
		{
			finishedtween=false;
			this.fillcolour.ptr+=this.fillcolour.dir;
			if(this.fillcolour.dir>0)
			{
				if(this.fillcolour.ptr>=this.fillcolour.points.length)
				{
					if(this.fillcolour.yoyo)
					{
						this.fillcolour.dir=-1;
						this.fillcolour.ptr-=2;
					}
					else
					{
						this.fillcolour.counter++;
						this.fillcolour.ptr--;
					}
				}
			}
			else
			{
				if(this.fillcolour.ptr<0)
				{
					if(this.fillcolour.yoyo)
					{
						this.fillcolour.dir=1;
						this.fillcolour.counter++;
						this.fillcolour.ptr++;
					}
				}
			}
		}	
	}
	if(this.linecolour.active)
	{
		if(this.linecolour.counter<this.linecolour.repeat || isNaN(this.linecolour.repeat))
		{
			finishedtween=false;
			this.linecolour.ptr+=this.linecolour.dir;
			if(this.linecolour.dir>0)
			{
				if(this.linecolour.ptr>=this.linecolour.points.length)
				{
					if(this.linecolour.yoyo)
					{
						this.linecolour.dir=-1;
						this.linecolour.ptr-=2;
					}
					else
					{
						this.linecolour.counter++;
						this.linecolour.ptr--;
					}
				}
			}
			else
			{
				if(this.linecolour.ptr<0)
				{
					if(this.linecolour.yoyo)
					{
						this.linecolour.dir=1;
						this.linecolour.counter++;
						this.linecolour.ptr++;
					}
				}
			}
		}	
	}
	if(this.shadow.active)
	{
		if(this.shadow.counter<this.shadow.repeat || isNaN(this.shadow.repeat))
		{
			finishedtween=false;
			this.shadow.ptr+=this.shadow.dir;
			if(this.shadow.dir>0)
			{
				if(this.shadow.ptr>=this.shadow.points.length)
				{
					if(this.shadow.yoyo)
					{
						this.shadow.dir=-1;
						this.shadow.ptr-=2;
					}
					else
					{
						this.shadow.counter++;
						this.shadow.ptr--;
					}
				}
			}
			else
			{
				if(this.shadow.ptr<0)
				{
					if(this.shadow.yoyo)
					{
						this.shadow.dir=1;
						this.shadow.counter++;
						this.shadow.ptr++;
					}
				}
			}
		}	
	}
	if(this.linecolour.active)
	{
		finishedtween=false;
		if(this.linecolour.counter<this.linecolour.repeat || isNaN(this.linecolour.repeat))
		{
			this.linecolour.ptr+=this.linecolour.dir;
			if(this.linecolour.dir>0)
			{
				if(this.linecolour.ptr>=this.linecolour.points.length)
				{
					if(this.linecolour.yoyo)
					{
						this.linecolour.dir=-1;
						this.linecolour.ptr-=2;
					}
					else
					{
						this.linecolour.counter++;
						this.linecolour.ptr--;
					}
				}
			}
			else
			{
				if(this.linecolour.ptr<0)
				{
					if(this.linecolour.yoyo)
					{
						this.linecolour.dir=1;
						this.linecolour.counter++;
						this.linecolour.ptr++;
					}
				}
			}
		}		
	}
	if(this.gradfill.active)
	{
		
		if(this.gradfill.counter<this.gradfill.repeat || isNaN(this.gradfill.repeat))
		{
			finishedtween=false;
			this.gradfill.ptr+=this.gradfill.dir;
			if(this.gradfill.dir>0)
			{
				if(this.gradfill.ptr>=this.gradfill.points.length)
				{
					if(this.gradfill.yoyo)
					{
						this.gradfill.dir=-1;
						this.gradfill.ptr-=2;
					}
					else
					{
						this.gradfill.counter++;
						this.gradfill.ptr--;
					}
				}
			}
			else
			{
				if(this.gradfill.ptr<0)
				{
					if(this.gradfill.yoyo)
					{
						this.gradfill.dir=1;
						this.gradfill.counter++;
						this.gradfill.ptr++;
					}
				}
			}
		}	
	}
	this.stopchecking=finishedtween;
}

function bezx(t)
{
	return (1-t)*(1-t)*(1-t)*parseInt(this.point.x) + 3*(1-t)*(1-t)*t*parseInt(this.next.ctrl1.x) + 3*(1-t)*t*t*parseInt(this.next.ctrl2.x) + t*t*t*parseInt(this.next.point.x)
}

function bezy(t)
{
	return (1-t)*(1-t)*(1-t)*parseInt(this.point.y) + 3*(1-t)*(1-t)*t*parseInt(this.next.ctrl1.y) + 3*(1-t)*t*t*parseInt(this.next.ctrl2.y) + t*t*t*parseInt(this.next.point.y)
}

function linx(t)
{
	return this.next.point.x+(this.next.point.x-this.point.x)*t;
}

function liny(t)
{
	return this.next.point.y+(this.next.point.y-this.point.y)*t;
}

function betweenAngle(e,s,t)  // s start angle, e end angle, t parameter between 0 and 1
{
	var ang=(2*Math.PI+e-s) % (2*Math.PI);
	if(!this.rotate.clkw)
	{
		ang=-(2*Math.PI-ang);
	}
	return s+t*ang;
}

function reverseAll()
{
	var shape=this.shape;
	if(this.translate.active  || this.rotate.active || this.nodeTweening.active || this.pointTweening || this.edit.active)
	{
		var node=shape.path.next;		
		while(node.point.x!="end")
		{
			node.tweennodes.reverse();
			node=node.next;
		}
	}
	if (this.gradfill.active)
	{
		this.linegrads.reverse();
		this.radgrads.reverse();
	}
	if(this.fillcolour.active)
	{
		this.fillcolour.points.reverse();
	}
	if(this.linestyles.active)
	{
		this.linestyles.points.reverse();
	}
	if(this.gradfill.active)
	{
		this.gradfill.points.reverse();
	}
	if(this.shadow.active)
	{
		this.shadow.points.reverse();
	}	
}

//FILM section***************************************************************************

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
			case "tween":
				flel.elm.prepareTweens();
				if(flel.elm.reverse)
				{
					flel.elm.reverseAll();
				}
				if(isNaN(flel.elm.maxruntime))
				{
					flel.maxruntime="c";
				}
				else
				{
					flel.maxruntime=flel.elm.maxruntime/1000;
				}
				flel.elm.zeroTweenPtrs();
			break
			case "sprite":
			 	STOPCHECKING=false;
			 	flel.elm.zeroPointers();
			 	flel.elm.saveCanvases();
			 	if(flel.elm.getMainTrain().engine=="tween")
				{
					var sptween=flel.elm.getMainTrain().train;
					sptween.prepareTweens();
					if(sptween.reverse)
					{
						sptween.reverseAll();
					}
					if(isNaN(sptween.maxruntime))
					{
						flel.maxruntime="c";
					}
					else
					{
						flel.maxruntime=sptween.maxruntime/1000;
					}
					sptween.zeroTweenPtrs();
				}
			 	flel.elm.track.drawtrack();
				flel.elm.transform();
				flel.elm.drawspritewithmove();
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
						case "tween":
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
				case "tween":				
					if(t>=flel.R*1000 && t<stoprun*1000)
					{
						flel.elm.tweenmove();
					}
				break
				case "sprite":
					if(t>=flel.R*1000 && t<stoprun*1000)
					{
						flel.elm.transform();
						flel.elm.drawalltracks();
						flel.elm.drawspritewithmove();
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

//MISC function********************************************************************************************************************************************

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

function getLengths()
{
	this.length=0; //cummulative total of section lengths
	this.lengths=[]; //array of section lengths
	var sl;  //section length
	path=this.path;
	var node=path.next; // from first node
	while(node.next.point.x!="end")  // check if next node is a point or end node, if point calculate length of path between nodes
	{
	  switch (node.next.vertex)
	  {
		case 'B':
			sl = nodecurvelength(node);
			
		break
		case 'L':
			sl=nodelinelength(node);
		break
	  }
	  this.length += sl;
	  this.lengths.push(sl);
	  node=node.next;
	};
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

function nodecurvelength(node) //from node to node.next
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
	
		return (1-t)*(1-t)*(1-t)*parseInt(node.point.x) + 3*(1-t)*(1-t)*t*parseInt(next.ctrl1.x) + 3*(1-t)*t*t*parseInt(next.ctrl2.x) + t*t*t*parseInt(next.point.x)
	}
	
	function y(t)
	{
	
		return (1-t)*(1-t)*(1-t)*parseInt(node.point.y) + 3*(1-t)*(1-t)*t*parseInt(next.ctrl1.y) + 3*(1-t)*t*t*parseInt(next.ctrl2.y) + t*t*t*parseInt(next.point.y)
	}
}

function nodelinelength(node) //from node to node.next
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
