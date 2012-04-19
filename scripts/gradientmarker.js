/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function gradMarker() 
{
   this.elmRef = document.createElement('div');
   this.elmRef.id  = 'gdm'+(gdmrks++);
   this.elmRef.style.fontSize=0;
   this.elmRef.style.width=21;
   this.elmRef.style.height=21;
   this.elmRef.style.visibility='visible';
   this.elmRef.style.cursor='move';
   this.elmRef.onmouseover=function(){
										$("gradientfly").onclick=function(e) {noBubble(e)};
									};
   this.elmRef.onmouseout=function(){
	   									$("gradientfly").onclick=function(e) {
	   																			noBubble(e);
	   																			clear($("gradientfly"));
	   																			checkBoundary(shiftdown(e),getPosition(e));
	   																			GRADIENTDROP.Canvas.ctx.clearRect(0,0,SCRW,SCRH);
	   																			$("gradientdrop").style.visibility="hidden";
	   																			$("gradientfly").style.visibility="hidden";
	   																		}
									};
	this.elmRef.onclick	=function(){
										for(var groupName in SELECTED)
										{
											var group=SELECTED[groupName];
											var shapeNames=group.memberShapes();
											for(var name in shapeNames)
											{
												shape=shapeNames[name];
												shape.stopn=parseInt(this.id.substr(3));
											}
										}
										if ($('gradientbox'))
										{
											$('gAdd').style.visibility='visible';
											$('gDel').style.visibility='visible';
										}										
										if (SELECTEDSHAPE.stopn==SELECTEDSHAPE.colorStops.length-1 || SELECTEDSHAPE.stopn==0)
										{
											if ($('gradientbox'))
											{
												$('gAdd').style.visibility='hidden';
												$('gDel').style.visibility='hidden';
											}
										}
										removeGradLine();
										showGradLine(SELECTEDSHAPE);
										$('colorbox').style.visibility='visible';
									};
									
   $('gradientfly').appendChild(this.elmRef);
  
   
   return this.elmRef;
   
}

function radMarker() 
{
   this.elmRef = document.createElement('div');
   this.elmRef.id  = 'rdm'+(rdmrks++);
   this.elmRef.style.fontSize=0;
   this.elmRef.style.width=8;
   this.elmRef.style.height=8;
   this.elmRef.style.border='solid 1px black';
   this.elmRef.style.backgroundColor='green';
   this.elmRef.style.cursor='move';
   this.elmRef.onmouseover=function(){
										inln=true;
									};
   this.elmRef.onmouseout=function(){
	   									inln=false;
									};
									
   $('bodydiv').appendChild(this.elmRef);
  
   
   return this.elmRef;
   
}
    
function createGradLine(shape)
{

	shape.lineGrad[0]=shape.tplftcrnr.x;
	shape.lineGrad[1]=shape.tplftcrnr.y+(shape.btmrgtcrnr.y-shape.tplftcrnr.y)/2;
	shape.lineGrad[2]=shape.tplftcrnr.x+(shape.btmrgtcrnr.x-shape.tplftcrnr.x);
	shape.lineGrad[3]=shape.tplftcrnr.y+(shape.btmrgtcrnr.y-shape.tplftcrnr.y)/2;
	
	shape.radGrad[0]=shape.tplftcrnr.x+(shape.btmrgtcrnr.x-shape.tplftcrnr.x)/4;
	shape.radGrad[1]=shape.tplftcrnr.y+3*(shape.btmrgtcrnr.y-shape.tplftcrnr.y)/4;
	shape.radGrad[2]=Math.max((shape.btmrgtcrnr.x-shape.tplftcrnr.x)/4,(shape.btmrgtcrnr.y-shape.tplftcrnr.y)/4);
	shape.radGrad[3]=shape.tplftcrnr.x+3*(shape.btmrgtcrnr.x-shape.tplftcrnr.x)/4;
	shape.radGrad[4]=shape.tplftcrnr.y+(shape.btmrgtcrnr.y-shape.tplftcrnr.y)/4;
	shape.radGrad[5]=Math.max((shape.btmrgtcrnr.x-shape.tplftcrnr.x)/4,(shape.btmrgtcrnr.y-shape.tplftcrnr.y)/4);
	

	shape.colorStops=[];
	var coltemp=[];
	coltemp.push(0);
	coltemp.push(shape.fillStyle[0]);
	coltemp.push(shape.fillStyle[1]);
	coltemp.push(shape.fillStyle[2]);
	coltemp.push(shape.fillStyle[3]);
	shape.colorStops.push(coltemp);
	coltemp=[];
	coltemp.push(1);
	coltemp.push(shape.fillStyle[0]);
	coltemp.push(shape.fillStyle[1]);
	coltemp.push(shape.fillStyle[2]);
	coltemp.push(shape.fillStyle[3]);
	shape.colorStops.push(coltemp);
	$("colorbox").style.visibility="visible";
	setcolorbox(shape);

	ln=new gradMarker();
	DDln=new YAHOO.util.DD(ln.id)
	DDln.onDrag=function(){updategradpoints(this)};
	ln=new gradMarker();
	DDln=new YAHOO.util.DD(ln.id)
	DDln.onDrag=function(){updategradpoints(this)};		
	drawgradpoints(shape);
//	$('bodydiv').onmousemove=function() {};
//	$('bodydiv').onclick=function(e){checkBoundary(shiftdown(e),getPosition(e),canv)};
//	$('bodydiv').style.cursor='default';

}

function showGradLine(canv)
{
	
	var cst=shape.colorStops.length;
	for (var i=0;i<cst;i++)
	{
		ln=new gradMarker();
		DDln=new YAHOO.util.DD(ln.id)
		DDln.onDrag=function(){updategradpoints(this)};
	}
	if (!shape.linearfill)
	{
		ln=new radMarker();
		DDln=new YAHOO.util.DD(ln.id)
		DDln.onDrag=function(){updaterad(this)};
		ln=new radMarker();
		DDln=new YAHOO.util.DD(ln.id)
		DDln.onDrag=function(){updaterad(this)};
	}
	setcolorbox(canv);
	drawgradpoints(canv);
	$('bodydiv').onmousemove=function() {};
	$('bodydiv').onclick=function(e){checkBoundary(shiftdown(e),getPosition(e),canv)};
	$('bodydiv').style.cursor='default';

}



function drawgradpoints(shape)
{
	GRADIENTDROP.Canvas.ctx.clearRect(0,0,SCRW,SCRH);
	if (shape.linearfill)
	{
		var xs=shape.lineGrad[0]*1;
		var ys=shape.lineGrad[1]*1;
		var xe=shape.lineGrad[2]*1;
		var ye=shape.lineGrad[3]*1;
	}
	else
	{
		var xs=shape.radGrad[0]*1;
		var ys=shape.radGrad[1]*1;
		var rs=shape.radGrad[2]*1;
		var xe=shape.radGrad[3]*1;
		var ye=shape.radGrad[4]*1;	
		var re=shape.radGrad[5]*1;
		GRADIENTDROP.Canvas.ctx.beginPath();
		GRADIENTDROP.Canvas.ctx.strokeStyle='black';
		GRADIENTDROP.Canvas.ctx.arc(xs,ys,rs,0,2*Math.PI,false);
		GRADIENTDROP.Canvas.ctx.moveTo(xe+re,ye);
		GRADIENTDROP.Canvas.ctx.arc(xe,ye,re,0,2*Math.PI,false);
		GRADIENTDROP.Canvas.ctx.stroke();
		GRADIENTDROP.Canvas.ctx.beginPath();
		GRADIENTDROP.Canvas.ctx.strokeStyle='white';
		GRADIENTDROP.Canvas.ctx.moveTo(xs+rs+2,ys);
		GRADIENTDROP.Canvas.ctx.arc(xs,ys,rs+2,0,2*Math.PI,false);
		GRADIENTDROP.Canvas.ctx.moveTo(xe+re+2,ye);
		GRADIENTDROP.Canvas.ctx.arc(xe,ye,re+2,0,2*Math.PI,false);		
		GRADIENTDROP.Canvas.ctx.stroke();
		$('rdm0').style.left=xs+rs-4;
		$('rdm0').style.top=ys-4;
		$('rdm0').left=xs+rs-4;;
		$('rdm0').top=ys-4;
		$('rdm1').style.left=xe+re-4;
		$('rdm1').style.top=ye-4;
		$('rdm1').left=xe+re-4;;
		$('rdm1').top=ye-4;		
	}
	var alpha=arctan(xe-xs,ye-ys);
	var dx=xe-xs;
	var dy=ye-ys;
	var xp,yp,xc,yc,xa,ya,xb,yb,xg,yg,xh,yh;
	var c,b,a,g,h,sc;
	
	
	GRADIENTDROP.Canvas.ctx.beginPath();
	GRADIENTDROP.Canvas.ctx.strokeStyle='black';
	GRADIENTDROP.Canvas.ctx.moveTo(xs,ys);
	GRADIENTDROP.Canvas.ctx.lineTo(xe,ye);
	GRADIENTDROP.Canvas.ctx.stroke();
	GRADIENTDROP.Canvas.ctx.beginPath();
	GRADIENTDROP.Canvas.ctx.strokeStyle='white';
	GRADIENTDROP.Canvas.ctx.moveTo(xs,ys-2);
	GRADIENTDROP.Canvas.ctx.lineTo(xe,ye-2);
	GRADIENTDROP.Canvas.ctx.stroke();	
	for (var i=0; i<shape.colorStops.length; i++)
	{
		sc=shape.colorStops[i][0]*1;
		xp=xs+sc*dx;
		yp=ys+sc*dy;
		xc=xp;
		yc=yp+10;
		xa=xc;
		ya=yc+5;
		xg=xc-5;
		yg=yc;
		xh=xc+5;
		yh=yc;
		xb=xp;
		yb=yp+5;
		theta=alpha;
		if (i%2 == 1) {theta +=Math.PI};
		c=rotate(theta,xc-xp,yc-yp,'C');
		a=rotate(theta,xa-xp,ya-yp,'C');
		b=rotate(theta,xb-xp,yb-yp,'C');
		g=rotate(theta,xg-xp,yg-yp,'C');
		h=rotate(theta,xh-xp,yh-yp,'C');
		xc=c.x+xp;
		yc=c.y+yp;
		xa=a.x+xp;
		ya=a.y+yp;
		xb=b.x+xp;
		yb=b.y+yp;
		xg=g.x+xp;
		yg=g.y+yp;
		xh=h.x+xp;
		yh=h.y+yp;		
		GRADIENTDROP.Canvas.ctx.beginPath();
		GRADIENTDROP.Canvas.ctx.strokeStyle='black';
		GRADIENTDROP.Canvas.ctx.arc(xc,yc,5,0,Math.PI*2,true); 
		GRADIENTDROP.Canvas.ctx.moveTo(xb,yb);
		GRADIENTDROP.Canvas.ctx.lineTo(xp,yp);
		GRADIENTDROP.Canvas.ctx.stroke();
		var rule='rgba('
		for (var j=1;j<4;j++)
		{
			rule += shape.colorStops[i][j]+',';
		} 
		rule += shape.colorStops[i][j]+')';
		GRADIENTDROP.Canvas.ctx.fillStyle=rule;
		GRADIENTDROP.Canvas.ctx.fill();
		GRADIENTDROP.Canvas.ctx.beginPath();
		GRADIENTDROP.Canvas.ctx.strokeStyle='white';
		GRADIENTDROP.Canvas.ctx.arc(xc,yc,7,0,Math.PI*2,true);
		GRADIENTDROP.Canvas.ctx.stroke();	
		if (i==shape.stopn)
		{
			GRADIENTDROP.Canvas.ctx.save();
			GRADIENTDROP.Canvas.ctx.beginPath();
			GRADIENTDROP.Canvas.ctx.moveTo(xa,ya);
			GRADIENTDROP.Canvas.ctx.lineTo(xb,yb);
			GRADIENTDROP.Canvas.ctx.moveTo(xg,yg);
			GRADIENTDROP.Canvas.ctx.lineTo(xh,yh);
			var rule='rgba('
			for (var j=1;j<4;j++)
			{
				rule += (255-shape.colorStops[i][j])+',';
			} 
			rule += 1+')';
			GRADIENTDROP.Canvas.ctx.strokeStyle=rule;
			GRADIENTDROP.Canvas.ctx.stroke();
			GRADIENTDROP.Canvas.ctx.restore();
		}
		
		$('gdm'+i).style.left=xc-10;
		$('gdm'+i).style.top=yc-10;
		$('gdm'+i).left=xc-10;
		$('gdm'+i).top=yc-10;
	}

}

function removeGradLine()
{
	GRADIENTDROP.Canvas.ctx.clearRect(0,0,SCRW,SCRH);
	while (gdmrks >0)
	{
		if($('gdm'+(--gdmrks))) {$('gdm'+gdmrks).parentNode.removeChild($('gdm'+gdmrks))};
	}
	while (rdmrks >0)
	{
		if($('rdm'+(--rdmrks))) {$('rdm'+rdmrks).parentNode.removeChild($('rdm'+rdmrks))};
	}	
}

function setcolorbox(canv)
{
	$("redBox").value=shape.colorStops[shape.stopn][1];
	redBoxChanged();
	$("greenBox").value=shape.colorStops[shape.stopn][2];
	greenBoxChanged();
	$("blueBox").value=shape.colorStops[shape.stopn][3];
	blueBoxChanged();
	alphaperct = 100*(1-shape.colorStops[shape.stopn][4]);
	$('varrows').style.left=256*alphaperct/100-4;
	$('transptext').innerHTML ='Transparency '+alphaperct+'%';
	if (ieb)
	{
		$('transpslider').filters.alpha.opacity=100-alphaperct;
	}
	else
	{
		$('transpslider').style.opacity=1-alphaperct/100;
	}
	$("transpslider").style.backgroundColor = currentColor.HexString();
}

function updategradpoints(gdp)
{
	var i= parseInt(gdp.id.substr(3));
	var gdpt=$(gdp.id);
	var dx=parseInt(gdpt.style.left)-gdpt.left;
	var dy=parseInt(gdpt.style.top)-gdpt.top;
	if (i==0)
	{
		if (selected[0].linearfill)
		{
			for (var j=0; j<selected.length;j++)
			{
				selected[j].lineGrad[0] +=dx;
				selected[j].lineGrad[1] +=dy;
			}
		}
		else
		{
			for (var j=0; j<selected.length;j++)
			{
				selected[j].radGrad[0] +=dx;
				selected[j].radGrad[1] +=dy;
			}			
		}
	}
	else if (i==selected[0].colorStops.length-1)
	{
		if (selected[0].linearfill)
		{
			for (var j=0; j<selected.length;j++)
			{
				selected[j].lineGrad[2] +=dx;
				selected[j].lineGrad[3] +=dy;
			}
		}
		else
		{
			for (var j=0; j<selected.length;j++)
			{
				selected[j].radGrad[3] +=dx;
				selected[j].radGrad[4] +=dy;
			}			
		}
	}
	else
	{
		if (selected[0].linearfill)
		{
			var newp = selected[0].colorStops[i][0]+dx/(selected[0].lineGrad[2]-selected[0].lineGrad[0]);
		}
		else
		{
			var newp = selected[0].colorStops[i][0]+dx/(selected[0].radGrad[3]-selected[0].radGrad[0]);
		}
		if (selected[0].colorStops[i-1][0]<newp && newp<selected[0].colorStops[i+1][0])
		{
			for (var j=0; j<selected.length;j++)
			{
				selected[j].colorStops[i][0]=newp;
			}
		}		
	}
	gdpt.left=parseInt(gdpt.style.left);
	gdpt.top=parseInt(gdpt.style.top);
	for (var j=0; j<selected.length;j++)
	{
		drawline(selected[j]);
	}
	drawgradpoints(selected[0]);
}

function updaterad(rdp)
{
	var i= parseInt(rdp.id.substr(3));
	var rdpt=$(rdp.id);
	var dx=parseInt(rdpt.style.left)-rdpt.left;
	var dy=parseInt(rdpt.style.top)-rdpt.top;
	if (i==0)
	{
		for (var j=0; j<selected.length;j++)
		{
			selected[j].radGrad[2] +=Math.sqrt(dx*dx+dy*dy)*dx/Math.abs(dx);
		}
	}
	else 
	{
		for (var j=0; j<selected.length;j++)
		{
			selected[j].radGrad[5] +=Math.sqrt(dx*dx+dy*dy)*dx/Math.abs(dx);
		}
	}
	rdpt.left=parseInt(rdpt.style.left);
	rdpt.top=parseInt(rdpt.style.top);
	for (var j=0; j<selected.length;j++)
	{
		drawline(selected[j]);
	}
	drawgradpoints(selected[0]);
}