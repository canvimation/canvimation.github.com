/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function Sprite(name)
{
	this.name=name;
	this.title;
	this.ptime=10;
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
	this.setAniStage=setAniStage;
	this.copysprite=copysprite;
	this.drawsprite=drawsprite;
	this.drawspritewithmove=drawspritewithmove;
	this.drawrailway=drawrailway;
	this.drawalltracks=drawalltracks;
	this.inTheatre=inTheatre;
	this.followPath=followPath;
	this.setPoints=setPoints;
	this.moveSprite=moveSprite;
	this.setVector=setVector;
	this.addVector=addVector;
	this.addSpriteCentre=addSpriteCentre;
	this.zeroPointers=zeroPointers;
	this.clearTracks=clearTracks;
	this.saveCanvases=saveCanvases;
	this.restoreCanvases=restoreCanvases;
	this.transform=transform;
	this.transformTrack=transformTrack;
	this.nextPointer=nextPointer;
	this.getShapes=getShapes;
	this.getSprite=getSprite;
	this.getScene=getScene;
	this.getTrack=getTrack;
	this.getTween=getTween;
	this.getMainTrain=getMainTrain;
	this.expandspritelist=expandspritelist;
	this.spriteHTML=spriteHTML;
	this.spriteCode=spriteCode;
	this.SpriteToText=SpriteToText;
	this.recordsprite=recordsprite;
	this.spriteparams=spriteparams;
	this.maxruntime=maxruntime;
	this.setTween=setTween;
}

function copysprite(theatre)
{
	var sprite=new Sprite("SUBSP"+(NCOUNT++));
	sprite.title=this.title;
	sprite.engine=this.engine;
	sprite.track=this.track.copytrack(theatre);
	sprite.ptime=this.ptime;
	sprite.finishmove=this.finishmove;
	sprite.points=[];
	for(var i=0; i<this.points.length; i++)
	{
		sprite.points[i]={x:0,y:0,phi:0};
		sprite.points[i].x=this.points[i].x;
		sprite.points[i].y=this.points[i].y;
		sprite.points[i].phi=this.points[i].phi;
	}
	sprite.pointer=this.pointer;
	sprite.vector.xs=this.vector.xs;
	sprite.vector.xe=this.vector.xe;
	sprite.vector.ys=this.vector.ys;
	sprite.vector.ye=this.vector.ye;
	sprite.vector.psi=this.vector.psi;
	sprite.usevec=this.usevec;
	sprite.expanded=false;
	switch (this.engine)
	{
		case "scene":
			sprite.train=this.train.copyscene(theatre);
		break
		case "tween":
			sprite.train=this.train.copytween(theatre);
			sprite.train.tweenshape=makeCopy(sprite.train.getShape(),0,$("tweenstage"),{});
		break
		case "sprite":
			sprite.train=this.train.copysprite(theatre);
		break
	}
	return sprite;
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

function drawrailway(showpathline)
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
			this.drawalltracks(showpathline);
		break	
	}
}

function drawalltracks(showpathline)
{
	if (this.engine =='sprite')
	{
		this.train.track.drawtrack(showpathline);
		this.train.drawalltracks(showpathline);
	}
}

function setVector()
{
	if (this.usevec)
	{
		//position vector for sprite vector
		this.vector.xs = parseInt($('vecdiv').style.left)+110+MINIVECT.xs;
		this.vector.xe = parseInt($('vecdiv').style.left)+110+MINIVECT.xe;
		this.vector.ys = parseInt($('vecdiv').style.top)+110+MINIVECT.ys;
		this.vector.ye = parseInt($('vecdiv').style.top)+110+MINIVECT.ye;
		this.vector.psi = arctan(this.vector.ye - this.vector.ys,this.vector.xe - this.vector.xs);
	}
	else
	{
		this.vector.xs=parseInt($('spritecentre').style.left)+10;
		this.vector.ys=parseInt($('spritecentre').style.top)+10;
		this.vector.psi = 0;
	}
}

function checksprite(spritedata,showpathline)
{
	var spritearray=spritedata.split(",");
	var filmname=spritearray[0];
	var topname=spritearray[1];
	var spritename=spritearray[2];
	if(filmname=="nofilm!!!!")
	{
		if(topname=="nosprite!!!!")
		{
			var sprite=SPRITES[spritename];
		}
		else
		{
			var topsprite=SPRITES[topname];
			var sprite=topsprite.getSprite(spritename).sprite;
		}
	}
	else
	{
		var film=FILMS[filmname];
		var topsprite=film.getFlel(topname);
		var sprite=topsprite.getSprite(spritename).sprite;
	}
	sprite.setVector();
	sprite.setTween();
	$('vecdiv').style.visibility="hidden";
	$('spritecentre').style.visibility="hidden";
	$('checksp').style.visibility="hidden";
	$('fullchecksp').style.visibility="hidden";
	$('savesp').style.visibility="hidden";
	$('checkdone').style.visibility="visible";
	sprite.setPoints();
	STOPCHECKING=false;
	sprite.followPath(showpathline);
}


function savesprite(spritedata)
{
	var spritearray=spritedata.split(",");
	var filmname=spritearray[0];
	var topname=spritearray[1];
	var spritename=spritearray[2];
	if(filmname=="nofilm!!!!")
	{
		if(topname=="nosprite!!!!")
		{
			var sprite=SPRITES[spritename];
		}
		else
		{
			var topsprite=SPRITES[topname];
			var sprite=topsprite.getSprite(spritename).sprite;
		}
	}
	else
	{
		var film=FILMS[filmname];
		var topsprite=film.getFlel(topname);
		var sprite=topsprite.getSprite(spritename).sprite;
	}
	sprite.setVector();
	sprite.setPoints();
	sprite.setTween();
	$("checksp").style.visibility="hidden";
	$("fullchecksp").style.visibility="hidden";
	$("savesp").style.visibility="hidden";
	closedone();
}

function setTween()
{
	var s=this.getShapes();
	if(s.engine=="tween")
	{
		s.train.stopchecking=false;
		if(s.train.nodeTweening.active || s.train.pointTweening)
		{
			var npths=0;
			for(var name in s.train.nodePaths)
			{
				npths++
			}
			if(npths==0)
			{
				s.train.startNodePaths();
			}
			else
			{
				s.train.setNodePaths();
			}
		}
		s.train.prepareTweens();
		s.train.zeroTweenPtrs();
		if(s.train.reverse)
		{
		s.train.reverseAll();
		}
	}
}

function followPath(showpathline)
{
	
	this.zeroPointers();
	this.finishmove=false;
	clear($("spritestage"));
	this.inTheatre($("spritestage"));
	this.saveCanvases();
	this.track.drawtrack(showpathline);
  	this.moveSprite(showpathline);
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
  	var shape=track.getShape();
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

function moveSprite(showpathline)
{
	this.transform();
	this.drawalltracks(showpathline);
	if (!this.finishmove)
	{
		this.drawspritewithmove();
		var sprite=this;
	  	setTimeout(function() {sprite.moveSprite(showpathline)},50);
	}
	else
	{
		alert('Check completed');
		$("checkdone").style.visibility="hidden";
		STOPCHECKING=false;
		$("checksp").style.visibility="visible";
		$("fullchecksp").style.visibility="visible";
		$("savesp").style.visibility="visible";
		this.restoreCanvases();
		this.zeroPointers();
		this.saveCanvases();
		clear($("spritestage"));
		this.inTheatre($("spritestage"));
		this.drawrailway(true);
		this.restoreCanvases();
		if (this.usevec)
		{
			$('vecdiv').style.visibility='visible';
		}
		else
		{
			$('spritecentre').style.visibility='visible';
		}
	}
}

function inTheatre(theatre)
{
	var shape=this.track.getShape();
	shape.addTo(theatre);
	switch (this.engine)
	{
		case "scene":
			for(var name in this.train.shapes)
			{
				shape=this.train.shapes[name];
				shape.addTo(theatre);
			}
		break
		case "tween":
			if(this.train.reverse)
			{
				shape=this.train.copy.getShape();
			}
			else
			{
				shape=this.train.getShape();
			}
			shape.addTo(theatre);
			//clear($("tweenstage"));
			this.train.tweenshape.addTo(theatre);
		break
		case "sprite":
			this.train.inTheatre(theatre);
		break
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

function clearTracks()
{
	var shape=this.track.getShape();
	shape.Canvas.ctx.clearRect(-SCRW,-SCRH,2*SCRW,2*SCRH);
	if (this.engine=='sprite')
	{
		this.train.clearTracks();
	}
}

function saveCanvases()
{
	var shape;
	switch (this.engine)
	{
		case "scene":
			shape=this.track.getShape();
			shape.Canvas.ctx.save();
			for(var name in this.train.shapes)
			{
				shape=this.train.shapes[name];
				shape.Canvas.ctx.save();
			}
		break
		case "tween":
			shape=this.track.getShape();
			shape.Canvas.ctx.save();
			shape=this.train.tweenshape;
			shape.Canvas.ctx.save();
		break
		case "sprite":
			shape=this.track.getShape();
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
			shape=this.track.getShape();
			shape.Canvas.ctx.restore();
			for(var name in this.train.shapes)
			{
				shape=this.train.shapes[name];
				shape.Canvas.ctx.restore();
			}
		break
		case "tween":
			shape=this.track.getShape();
			shape.Canvas.ctx.restore();
			shape=this.train.tweenshape;
			shape.Canvas.ctx.restore();
		break
		case "sprite":
			shape=this.track.getShape();
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
	if (this.engine =='sprite')
	{
		var shape=this.train.track.getShape();
		shape.Canvas.ctx.translate(p.x,p.y);//$("msg").innerHTML+=p.x+".."+p.y+"..."+p.phi*180/Math.PI+"<br>";
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
	var shape=this.track.getShape();
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

function getShapes()
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
			return this.train.getShapes();
		break
	}
}

function getScene()
{
	switch(this.engine)
	{
		case "scene":
			return {path:this.title,scene:this.train};
		break
		case "sprite":
			var scdata=this.train.getScene();
			return {path:this.title+"/"+scdata.path,scene:scdata.scene};;
		break
	}
}

function getTrack(trackname)
{
	if(this.track.name==trackname)
	{
		return {path:this.title,track:this.track};
	}
	else
	{
		var trdata=this.train.getTrack(trackname)
		return {path:this.title+"/"+trdata.path,track:trdata.track};
	}
}

function getTween()
{
	switch(this.engine)
	{
		case "tween":
			return {path:this.title,tween:this.train};
		break
		case "sprite":
			var twdata=this.train.getTween();
			return {path:this.title+"/"+twdata.path,tween:twdata.tween};;
		break
	}
}

function getSprite(spritename)
{
	if(this.name==spritename)
	{
		return {path:"",sprite:this};
	}
	else
	{
		var spdata=this.train.getSprite(spritename);
		return {path:this.title+"/"+spdata.path,sprite:spdata.sprite};
	}
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

function expandspritelist(fn,sn,box,col)
{
	LIMARGIN+="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	var schtml,trhtml,sphtml;
	switch(this.engine)
	{
		case "scene":
			var track=this.track;
			trhtml='<li id="'+fn+','+sn+','+track.title+','+track.name+'"  style="background-color:'+col+'">'+LIMARGIN;
			if(BUILDCLOSED)
			{
				trhtml+=' <img src="assets/edit.png" alt="edit" title="edit" onclick="trackEdit(this)" /> ';
			}
			trhtml+='<span>TR '+track.title+'</span></li>';
			$("inner"+box).innerHTML+=trhtml;
			var scene=this.train;
			schtml='<li id="'+fn+','+sn+','+scene.title+','+scene.name+'"  style="background-color:'+col+'">'+LIMARGIN;
			if(BUILDCLOSED)
			{
				schtml+=' <img src="assets/edit.png" alt="edit" title="edit" onclick="sceneEdit(this)" /> ';
			}
			schtml+='<span>SC '+scene.title+'</span></li>';
			$("inner"+box).innerHTML+=schtml;
		break
		case "tween":
			var track=this.track;
			trhtml='<li id="'+fn+','+sn+','+track.title+','+track.name+'"  style="background-color:'+col+'">'+LIMARGIN;
			if(BUILDCLOSED)
			{
				trhtml+=' <img src="assets/edit.png" alt="edit" title="edit" onclick="trackEdit(this)" /> ';
			}
			trhtml+='<span>TR '+track.title+'</span></li>';
			$("inner"+box).innerHTML+=trhtml;
			var tween=this.train;
			twhtml='<li id="'+fn+','+sn+','+tween.title+','+tween.name+'"  style="background-color:'+col+'">'+LIMARGIN;
			if(BUILDCLOSED)
			{
				twhtml+=' <img src="assets/edit.png" alt="edit" title="edit" onclick="tweenEdit(this)" /> ';
			}
			twhtml+='<span>TW '+tween.title+'</span></li>';
			$("inner"+box).innerHTML+=twhtml;
		break
		case "sprite":
			var track=this.track;
			trhtml='<li id="'+fn+','+sn+','+track.title+','+track.name+'"  style="background-color:'+col+'">'+LIMARGIN+'&nbsp;&nbsp;&nbsp; ';
			if(BUILDCLOSED)
			{
				trhtml+='<img src="assets/edit.png" alt="edit" title="edit" onclick="trackEdit(this)" /> ';
			}
			trhtml+='<span>TR '+track.title+'</span></li>';
			$("inner"+box).innerHTML+=trhtml;
			var sprite=this.train;
			if(sprite.expanded)
			{
				sphtml='<li id="'+fn+','+sn+','+sprite.title+','+sprite.name+'" style="background-color:'+col+'">'+LIMARGIN+' <img src="assets/contract.png" alt="contract" title="contract" onclick=expand(this) /> ';
				if(BUILDCLOSED)
				{
					sphtml+='<img src="assets/edit.png" alt="edit" title="edit" onclick="spriteEdit(this)" /> ';
				}
				sphtml+='<span >SP '+sprite.title+'</span></li>';
				$("inner"+box).innerHTML+=sphtml;
				sprite.expandspritelist(fn,sn,box,col);
			}
			else
			{
				sphtml='<li id="'+fn+','+sn+','+sprite.title+','+sprite.name+'" style="background-color:'+col+'" >'+LIMARGIN+' <img src="assets/expand.png" alt="expand" title="expand" onclick=expand(this) /> ';
				if(BUILDCLOSED)
				{
					sphtml+='<img src="assets/edit.png" alt="edit" title="edit" onclick="spriteEdit(this)" /> ';
				}
				sphtml+='<span >SP '+sprite.title+'</span></li>';
				$("inner"+box).innerHTML+=sphtml;
			}
		break
	}
}

function maxruntime(mx)
{
	var mrt;
	switch (this.engine)
	{
		case "scene":
			if(isNaN(this.track.repeats))
			{
				return "c";
			}
			else
			{
				mrt=this.ptime*(this.track.repeats);
				if(this.track.yoyo) {mrt*=2};
				return Math.max(mx,mrt);
			}
		break
		case "tween":
			if(isNaN(this.track.repeats))
			{
				return "c";
			}
			else
			{
				mrt=this.train.maxruntime;
				if(isNaN(mx) || isNaN(mrt))
				{
					return "c";
				}
				else
				{
					return Math.max(mx,mrt/1000);
				}
			}
		break
		case "sprite":
			mx=this.train.maxruntime(mx);
			if(isNaN(mx)  || isNaN(this.track.repeats))
			{
				return "c";
			}
			else
			{
				mrt=this.ptime*(this.track.repeats);
				if(this.track.yoyo) (mrt*=2);
				return Math.max(mx,mrt);
			}
		break
	}
}
