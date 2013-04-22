/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function checkBoundary(shiftdown,cursor)
{
	$("tracktext").innerHTML="&nbsp;&nbsp;Select just one shape.";
	$("tweentext").innerHTML="&nbsp;&nbsp;Select just one shape.";
	$("tweenpathsstage").style.visibility="hidden";
	$("twfirst").style.backgroundColor="#66FFFF";
	$("twlast").style.backgroundColor="#66FFFF";
	removeGradLine();
	closeStops();
	removeRotate();
	$("rotatebox").style.visibility="hidden";
	$("gradfillbox").style.visibility="hidden";
	hideTools();
	
	if (!shiftdown)
	{
		closeColor();
		SELECTED={};
		BCOUNT=0;
		clear($("markerdrop"));
		clear($("boundarydrop"));
	}
	var shape, foundshape;
	var shapefound=false;
	for(var name in CURRENT)
	{
		shape=CURRENT[name];//alert([shape.name,shape.tplftcrnr.x-4,cursor.x ,(shape.btmrgtcrnr.x+4) , (shape.tplftcrnr.y-4), cursor.y,(shape.btmrgtcrnr.y+4)]);
		if((shape.tplftcrnr.x-4)<=cursor.x && cursor.x<=(shape.btmrgtcrnr.x+4) && (shape.tplftcrnr.y-4)<=cursor.y && cursor.y<=(shape.btmrgtcrnr.y+4))
		{ 
			if (!shapefound || (shapefound && shape.zIndex>foundshape.zIndex)) 
			{
				if (shape.open)
				{
					 if(shape.isOn(cursor))
					 {
					 	shapefound=true;
					 	foundshape=shape;
					 }
				}
				else
				{
					if (shape.isIn(cursor))
					{
						shapefound=true;
					 	foundshape=shape;
					}
				}
			}
		}
	}
	if (shapefound)
	{
		$("boundarydrop").style.visibility="visible";
		if(shiftdown)
		{
			if(foundshape.group.name in SELECTED)
			{
				foundshape.group.removeBoundary();
				delete SELECTED[foundshape.group.name];
			}
			else
			{
				foundshape.group.drawBoundary();
				SELECTED[foundshape.group.name]=foundshape.group;
				SELECTEDSHAPE=foundshape;
				showTools();
				setTools(!(CURRENT===SHAPES));
			}
		}
		else
		{
			if(!(foundshape.group.name in SELECTED)) //if already drawn do not redraw
			{
				foundshape.group.drawBoundary();
				SELECTED[foundshape.group.name]=foundshape.group;
				SELECTEDSHAPE=foundshape;
				showTools();
				setTools(!(CURRENT===SHAPES));
			}
		}
		
	}
	if(TWEENEDIT && CURRENTTWEEN.nodeTweening.active)
	{
		CURRENTTWEEN.setTweenTimeBox();
	}
	if(TWEENEDIT  && shapefound)
	{
		if(CURRENTTWEEN.reverse)
		{
			if(SELECTEDSHAPE.name.substr(0,1).toUpperCase()=="A")
			{
				$("twlast").style.backgroundColor="yellow";
			}
			else
			{
				$("twfirst").style.backgroundColor="yellow";
			}
		}
		else
		{
			if(SELECTEDSHAPE.name.substr(0,1).toUpperCase()=="A")
			{
				$("twfirst").style.backgroundColor="yellow";
			}
			else
			{
				$("twlast").style.backgroundColor="yellow";
			}
		}
	}
//$("msg").innerHTML=SELECTEDSHAPE.name;
}

function removeBoundary()
{
	if(this.boundary) {this.boundary.parentNode.removeChild(this.boundary)};
}

function drawBoundary() 
{
   	this.boundary = document.createElement('div');
   	this.boundary.id="b"+BCOUNT++;
   	this.boundary.group=this;
   	this.boundary.style.left= this.left+"px"; 
   	this.boundary.style.top= this.top+"px";
   	this.boundary.style.width=this.width+"px";
   	this.boundary.style.height=this.height+"px";
   	this.boundary.style.border="dashed #040404 1px";
   	this.boundary.cc = new Corner(this.boundary);
	this.boundary.cc.DD = new YAHOO.util.DD(this.boundary.cc.id);
	this.boundary.rh = new RightH(this.boundary);
	this.boundary.rh.DD = new YAHOO.util.DD(this.boundary.rh.id);
	this.boundary.bh = new BottomH(this.boundary);
	this.boundary.bh.DD = new YAHOO.util.DD(this.boundary.bh.id); 
   	$("boundarydrop").appendChild(this.boundary);
   
   	this.boundary.DD=new YAHOO.util.DD(this.boundary.id);
   	this.boundary.DD.onDrag=function (e) {
   											noBubble(e);
   											$(this.id).style.left=Math.round(parseInt($(this.id).style.left)/xgrid)*xgrid+"px";
											$(this.id).style.top=Math.round(parseInt($(this.id).style.top)/ygrid)*ygrid+"px";
   											var dx=parseInt($(this.id).style.left)-$(this.id).group.left;
											var dy=parseInt($(this.id).style.top)-$(this.id).group.top;
											var boundary;
											for(var i=0; i<$("boundarydrop").childNodes.length; i++)
											{
												boundary=$("boundarydrop").childNodes[i];
												boundary.style.left=(boundary.group.left+dx)+"px";
												boundary.style.top=(boundary.group.top+dy)+"px";
											}
											if(TWEENEDIT)
											{
												CURRENTTWEEN.translate.active=true;
												CURRENTTWEEN.setTweenTimeBox();
											}
   										}
    this.boundary.DD.onMouseUp=function(e) {
								noBubble(e);
								var re;
								$(this.id).style.left=Math.round(parseInt($(this.id).style.left)/xgrid)*xgrid+"px";
								$(this.id).style.top=Math.round(parseInt($(this.id).style.top)/ygrid)*ygrid+"px";
								var dx=parseInt($(this.id).style.left)-$(this.id).group.left;
								var dy=parseInt($(this.id).style.top)-$(this.id).group.top;
								var l=parseInt($(this.id).style.left);
								var t=parseInt($(this.id).style.top);
								var shape,node;
								clear($("boundarydrop"));
								for(var groupName in SELECTED)
								{
									var group=SELECTED[groupName];
									var shapeNames=group.memberShapes();
									for(var name in shapeNames)
									{
										shape=shapeNames[name];
										node=shape.path.next;
										while(node.point.x!="end")
										{
											node.point.x+=dx;
											node.point.y+=dy;
											if(node.ctrl1.x!="non") //changes when straight line set on curve
											{
												node.ctrl1.x+=dx;
												node.ctrl1.y+=dy;
												node.ctrl2.x+=dx;
												node.ctrl2.y+=dy;
											}
											node=node.next;
										}					
										shape.tplftcrnr.x +=dx;
										shape.btmrgtcrnr.x+=dx;
										shape.tplftcrnr.y +=dy;
										shape.btmrgtcrnr.y+=dy;
										shape.lineGrad[0] +=dx;
										shape.lineGrad[1] +=dy;
										shape.lineGrad[2] +=dx;
										shape.lineGrad[3] +=dy;
										shape.radGrad[0] +=dx;
										shape.radGrad[1] +=dy;
										shape.radGrad[3] +=dx;
										shape.radGrad[4] +=dy;
										shape.arccentre.x+=dx;
										shape.arccentre.y+=dy;
										shape.draw();
									}
									group.update(l,t,dx,dy,1,1);
									group.drawBoundary();
								};
									
							  };
	this.boundary.cc.DD.onDrag =function(e) {
												noBubble(e);
												removeRotate();
												var boundary=$(this.id).parentNode;
												var group=boundary.group;
												if (parseInt($(this.id).style.left)>5)
												{
													var width=parseInt($(this.id).style.left)+5;
													var scale=width/group.width;													
													var boundary;
													for(var i=0; i<$("boundarydrop").childNodes.length; i++)
													{
														boundary=$("boundarydrop").childNodes[i];
														boundary.style.width=Math.round(boundary.group.width*scale/xgrid)*xgrid+"px";
														boundary.style.height=Math.round(boundary.group.height*scale/ygrid)*ygrid+"px";
														boundary.cc.style.left=(parseInt(boundary.style.width)-5)+"px";
														boundary.cc.style.top=(parseInt(boundary.style.height)-5)+"px";
														boundary.rh.style.left=(parseInt(boundary.style.width)-5)+"px";
														boundary.rh.style.top=(parseInt(boundary.style.height)/2-5)+"px";
														boundary.bh.style.left=(parseInt(boundary.style.width)/2-5)+"px";
														boundary.bh.style.top=(parseInt(boundary.style.height)-5)+"px";
													}	
												}
												else
												{
													$(this.id).style.top=(parseInt(boundary.style.height)-5)+"px";
													$(this.id).style.left=(parseInt(boundary.style.width)-5)+"px";
												}
												if(TWEENEDIT)
												{
													CURRENTTWEEN.nodeTweening.active=true;
													CURRENTTWEEN.pointTweening=true;
													CURRENTTWEEN.setTweenTimeBox();
												}
											};
			
   this.boundary.cc.DD.onMouseUp=function(e) {
   								noBubble(e);
								var boundary=$(this.id).parentNode;
								var group=boundary.group;
								var scale=parseInt(boundary.style.width)/group.width;
								var l=parseInt(boundary.style.left);
								var t=parseInt(boundary.style.top);
								for(var groupName in SELECTED)
								{
									var group=SELECTED[groupName];
									var shapeNames=group.memberShapes();
									for(var name in shapeNames)
									{
										shape=shapeNames[name];
										//shape.tplftcrnr.x=group.left+(shape.tplftcrnr.x-group.left)*scale;
										//shape.tplftcrnr.y=group.top+(shape.tplftcrnr.y-group.top)*scale;
										shape.btmrgtcrnr.x=group.left+(shape.btmrgtcrnr.x-group.left)*scale;
										shape.btmrgtcrnr.y=group.top+(shape.btmrgtcrnr.y-group.top)*scale;
										shape.arcwidth*=scale;//Math.abs(shape.btmrgtcrnr.x-shape.tplftcrnr.x);
										shape.archeight*=scale;//Math.abs(shape.btmrgtcrnr.y-shape.tplftcrnr.y);
										shape.arccentre.x=group.left+(shape.arccentre.x-group.left)*scale;
										shape.arccentre.y=group.top+(shape.arccentre.y-group.top)*scale;
										shape.radius*=scale;
										if (shape.type=='rounded_rectangle')
										{
											shape.setRndRect()
										}
										else
										{
											node=shape.path.next;
											while(node.point.x!="end")
											{
												node.point.x=group.left+(node.point.x-group.left)*scale;
												node.point.y=group.top+(node.point.y-group.top)*scale;
												if(node.ctrl1.x!="non")// will also scale when curve has been set as straight line
												{
													node.ctrl1.x=group.left+(node.ctrl1.x-group.left)*scale;
													node.ctrl1.y=group.top+(node.ctrl1.y-group.top)*scale;
													node.ctrl2.x=group.left+(node.ctrl2.x-group.left)*scale;
													node.ctrl2.y=group.top+(node.ctrl2.y-group.top)*scale;
												}
												node=node.next;
											}
										}
										shape.draw();
							  		}
							  		group.update(l,t,0,0,scale,scale)
								}
							}
//right handle
	this.boundary.rh.DD.onDrag =function(e) {
												noBubble(e);
												removeRotate();
												var boundary=$(this.id).parentNode;
												var group=boundary.group;
												if (parseInt($(this.id).style.left)>5)
												{
													var width=parseInt($(this.id).style.left)+5;
													var scale=width/group.width;													
													var boundary;
													for(var i=0; i<$("boundarydrop").childNodes.length; i++)
													{
														boundary=$("boundarydrop").childNodes[i];
														boundary.style.width=Math.round(boundary.group.width*scale/xgrid)*xgrid+"px";
														boundary.cc.style.left=(parseInt(boundary.style.width)-5)+"px";
														boundary.rh.style.left=(parseInt(boundary.style.width)-5)+"px";
														boundary.rh.style.top=(parseInt(boundary.style.height)/2-5)+"px";
														boundary.bh.style.left=(parseInt(boundary.style.width)/2-5)+"px";
													}	
												}
												else
												{
													$(this.id).style.left=(parseInt(boundary.style.width)-5)+"px";
												}
																								if(TWEENEDIT)
												{
													CURRENTTWEEN.nodeTweening.active=true;
													CURRENTTWEEN.pointTweening=true;
													CURRENTTWEEN.setTweenTimeBox();
												}
											};
			
   this.boundary.rh.DD.onMouseUp=function(e) {
   								noBubble(e);
								var boundary=$(this.id).parentNode;
								var group=boundary.group;
								var scale=parseInt(boundary.style.width)/group.width;
								var l=parseInt(boundary.style.left);
								var t=parseInt(boundary.style.top);
								for(var groupName in SELECTED)
								{
									var group=SELECTED[groupName];
									var shapeNames=group.memberShapes();
									for(var name in shapeNames)
									{
										shape=shapeNames[name];
										shape.btmrgtcrnr.x=group.left+(shape.btmrgtcrnr.x-group.left)*scale;
										shape.arcwidth*=scale;
										shape.radius*=scale;
										shape.arccentre.x=group.left+(shape.arccentre.x-group.left)*scale;
										if (shape.type=='rounded_rectangle')
										{
											shape.setRndRect()
										}
										else
										{
											node=shape.path.next;
											while(node.point.x!="end")
											{
												node.point.x=group.left+(node.point.x-group.left)*scale;
												if(node.ctrl1.x!="non")// will also scale when curve has been set as straight line
												{
													node.ctrl1.x=group.left+(node.ctrl1.x-group.left)*scale;
													node.ctrl2.x=group.left+(node.ctrl2.x-group.left)*scale;
												}
												node=node.next;
											}
										}
										shape.draw();
							  		}
							  		group.update(l,t,0,0,scale,1);
								}
							}
//bottom handle
	this.boundary.bh.DD.onDrag =function(e) {
												noBubble(e);
												removeRotate();
												var boundary=$(this.id).parentNode;
												var group=boundary.group;
												if (parseInt($(this.id).style.left)>5)
												{
													var height=parseInt($(this.id).style.top)+5;
													var scale=height/group.height;													
													var boundary;
													for(var i=0; i<$("boundarydrop").childNodes.length; i++)
													{
														boundary=$("boundarydrop").childNodes[i];
														boundary.style.height=Math.round(boundary.group.height*scale/ygrid)*ygrid+"px";
														boundary.cc.style.top=(parseInt(boundary.style.height)-5)+"px";
														boundary.rh.style.top=(parseInt(boundary.style.height)/2-5)+"px";
														boundary.bh.style.left=(parseInt(boundary.style.width)/2-5)+"px";
														boundary.bh.style.top=(parseInt(boundary.style.height)-5)+"px";
													}	
												}
												else
												{
													$(this.id).style.top=(parseInt(boundary.style.height)-5)+"px";
												}
												if(TWEENEDIT)
												{
													CURRENTTWEEN.nodeTweening.active=true;
													CURRENTTWEEN.pointTweening=true;
													CURRENTTWEEN.setTweenTimeBox();
												}
											};
			
   this.boundary.bh.DD.onMouseUp=function(e) {
   								noBubble(e);
								var boundary=$(this.id).parentNode;
								var group=boundary.group;
								var scale=parseInt(boundary.style.height)/group.height;
								var l=parseInt(boundary.style.left);
								var t=parseInt(boundary.style.top);
								for(var groupName in SELECTED)
								{
									var group=SELECTED[groupName];
									var shapeNames=group.memberShapes();
									for(var name in shapeNames)
									{
										shape=shapeNames[name];
										//shape.tplftcrnr.y=group.top+(shape.tplftcrnr.y-group.top)*scale;
										shape.btmrgtcrnr.y=group.top+(shape.btmrgtcrnr.y-group.top)*scale;
										shape.archeight*=scale;//Math.abs(shape.btmrgtcrnr.y-shape.tplftcrnr.y);
										shape.arccentre.y=group.top+(shape.arccentre.y-group.top)*scale;
										if (shape.type=='rounded_rectangle')
										{
											shape.setRndRect()
										}
										else
										{

											//selected[s].scx=scx;
											//selected[s].scy=scy;
											//selected[s].sox=selected[s].bleft+(selected[s].ox-selected[s].bleft)*scx;
											//selected[s].soy=selected[s].btop+(selected[s].oy-selected[s].btop)*scy;
											node=shape.path.next;
											while(node.point.x!="end")
											{
												node.point.y=group.top+(node.point.y-group.top)*scale;
												if(node.ctrl1.x!="end")// will also scale when curve has been set as straight line
												{
													node.ctrl1.y=group.top+(node.ctrl1.y-group.top)*scale;
													node.ctrl2.y=group.top+(node.ctrl2.y-group.top)*scale;
												}
												node=node.next;
											}
										}
										shape.draw();
							  		}
									group.update(l,t,0,0,1,scale);
								}
							}
}



function markLine()
{
	clear($("boundarydrop"));
	$("markerdrop").style.visibility="visible";
	$("backstage").style.visibility="visible";
	$("boundarydrop").style.visibility="hidden"
	$('editlines').style.visibility='hidden';
	$('stylelines').style.visibility='hidden';
	$('collines').style.visibility='hidden';	
	$('colfill').style.visibility='hidden';
	$('gradfill').style.visibility='hidden';
	$('rotate').style.visibility='hidden';
	$('front').style.visibility='hidden';
	$('back').style.visibility='hidden';
	$('del').style.visibility='hidden';
	$('copy').style.visibility='hidden';
	$('vert').style.visibility='hidden';
	$('horz').style.visibility='hidden';
	$('alntop').style.visibility='hidden';
	$('alnbot').style.visibility='hidden';
	$('alnleft').style.visibility='hidden';
	$('alnright').style.visibility='hidden';
	$('shadow').style.visibility='hidden';
	$('sname').style.visibility='hidden';
	closeColor();
	removeGradLine();
	removeRotate();
	var node;
	switch (SELECTEDSHAPE.type)
	{
		case "line":
		case "arc":
			node=SELECTEDSHAPE.path.next;
			node.addPointMark();
			node=SELECTEDSHAPE.path.prev;
			node.addPointMark();
		break
		case "segment":
			node=SELECTEDSHAPE.path.next;
			node.addPointMark();
			node=SELECTEDSHAPE.path.prev.prev;
			node.addPointMark();
		break
		case "sector":
			node=SELECTEDSHAPE.path.next;
			node.addPointMark();
			node=SELECTEDSHAPE.path.prev.prev.prev;
			node.addPointMark();
		break
		break
		case "rounded_rectangle":
			node=SELECTEDSHAPE.path.next;
			node.addPointMark();
		break
		case "curve":
			node=SELECTEDSHAPE.path.next;
			node.addPointMark();
		case "freeform":
			node=SELECTEDSHAPE.path.next;
			node=node.next;
			while(node.point.x!="end")
			{
				if(node.vertex=="L")
				{
					node.addPointMark();
				}
				else
				{
					node.addFullMarks();
				}
				node=node.next;
			}
			SELECTEDSHAPE.drawBezGuides();
		break
	}
	
	
}


function isIn(cursor)
{
	var crosses=0;
	var steps=10; //number of segments per curve;
	var A,B,P,Q;
	var node=this.path.next;
	node=node.next;
	while(node.point.x!="end")
	{
		if (node.vertex  == 'L')
		{
			A=new Point(node.prev.point.x-cursor.x,node.prev.point.y-cursor.y);
			B=new Point(node.point.x-cursor.x,node.point.y-cursor.y);
			if (A.y==B.y) {B.y +=0.01};
			if (A.y==0) {A.y +=0.01};
			if (B.y==0) {B.y +=0.01};
			if (A.y==B.y) {B.y +=0.01};
			updatecrosses(A,B);
		}
		else
		{
			A=new Point(node.prev.point.x-cursor.x,node.prev.point.y-cursor.y);
			B=new Point(node.point.x-cursor.x,node.point.y-cursor.y);
			C=new Point(node.ctrl1.x-cursor.x,node.ctrl1.y-cursor.y);
			D=new Point(node.ctrl2.x-cursor.x,node.ctrl2.y-cursor.y);
			P=new Point(node.prev.point.x-cursor.x,node.prev.point.y-cursor.y);
			Q=new Point(0,0);
			
			for (var i=1;i<=steps; i++)
			{				
				t=i/steps;
				Q.x = (1-t)*(1-t)*(1-t)*A.x + 3*(1-t)*(1-t)*t*C.x + 3*(1-t)*t*t*D.x + t*t*t*B.x;
				Q.y = (1-t)*(1-t)*(1-t)*A.y + 3*(1-t)*(1-t)*t*C.y + 3*(1-t)*t*t*D.y + t*t*t*B.y;
				if (P.y==Q.y) {Q.y +=0.01};
				if (P.y==0) {P.y +=0.01};
				if (Q.y==0) {Q.y +=0.01};
				if (P.y==Q.y) {Q.y +=0.01};
				updatecrosses(P,Q);
				P.x=Q.x;
				P.y=Q.y;
			}	
		}
	node=node.next;	
	}
	if ((crosses % 2)==0)
	{
		return false;
	}
	else
	{
		return true;
	}
	
	function updatecrosses(P,Q)
	{
		if (P.y*Q.y<0)
		{
			if (P.x>0 && Q.x>0)
			{
				crosses +=1;
			}
			else if (P.x*Q.x<0)
			{
				if ((P.y*Q.x-Q.y*P.x)/(P.y-Q.y)>0)
				{
					crosses +=1;
				}
			}
		}		
	}
}

function isOn(cursor)
{
	var ontheline=false;
	var step=10;
	var theta;
	var D=2; //extension distance around line so that on cursor is within D pixels of line
	var sp,ep,ip; //extension to start and end points of line and intersection point;
	var x,y; //current position on line when curve split into small points
	var node=this.path.next;	
	node=node.next;	
	
	while(node.point.x!="end")
	{	
		if (node.vertex == "L")
		{
			theta=arctan(node.point.y-node.prev.point.y,node.point.x-node.prev.point.x);
			sp=new Point(node.prev.point.x-D*Math.cos(theta),node.prev.point.y-D*Math.sin(theta)); //extend start point  
			ep=new Point(node.point.x+D*Math.cos(theta),node.point.y+D*Math.sin(theta)); //extend end point
			ip=intersection(cursor,sp,ep);
			if(ip.inRect(sp,ep))
			{
				if(sqdistance(cursor,ip)<=D*D)
				{
					ontheline=true;
				}
			}
		}
		else 
		{
			sp=new Point(node.prev.point.x,node.prev.point.y);
			for (var i=1;i<=step; i++)
   			{	
				t=i/step;			
				x = (1-t)*(1-t)*(1-t)*node.prev.point.x + 3*(1-t)*(1-t)*t*node.ctrl1.x + 3*(1-t)*t*t*node.ctrl2.x + t*t*t*node.point.x;
				y = (1-t)*(1-t)*(1-t)*node.prev.point.y + 3*(1-t)*(1-t)*t*node.ctrl1.y + 3*(1-t)*t*t*node.ctrl2.y + t*t*t*node.point.y;  
				ep=new Point(x,y); 				
				ip=intersection(cursor,sp,ep);
				if(ip.inRect(sp,ep))
				{
					if(sqdistance(cursor,ip)<=D*D)
					{
						ontheline=true;
					}
				}
				sp=new Point(ep.x,ep.y);
			}
		}
		node=node.next;
	}	
	return ontheline;
}

function intersection(c,sp,ep)  //from point c perpendicular intersection of line through sp and ep
{
	var k = ((ep.y-sp.y) * (c.x-sp.x) - (ep.x-sp.x) * (c.y-sp.y)) / ((ep.y-sp.y)*(ep.y-sp.y) + (ep.x-sp.x)*(ep.x-sp.x))
	var x = c.x - k * (ep.y-sp.y)
	var y = c.y + k * (ep.x-sp.x);
	var i={x:x, y:y};
	i.inRect=inRect;
	return i;
}

function inRect(sp,ep)
{
	var t=new Point(0,0); //top left corner of rectangle
	var b=new Point(0,0); //bottom right corner of rectangle
	t.x=Math.min(sp.x,ep.x);
	t.y=Math.min(sp.y,ep.y);
	b.x=Math.max(sp.x,ep.x);
	b.y=Math.max(sp.y,ep.y);
	return (t.x<=this.x && this.x<=b.x && t.y<=this.y && this.y<=b.y);
}

function sqdistance(p,q)
{
	return (p.x-q.x)*(p.x-q.x)+(p.y-q.y)*(p.y-q.y)
}

