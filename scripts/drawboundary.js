/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function checkBoundary(shiftdown,cursor)
{
	//if (doingani) {return};
	//removeGradLine();
	//removeRotate();
	if($('pmenu')) {$('pmenu').parentNode.removeChild($('pmenu'))};
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
	for(var name in SHAPES)
	{
		shape=SHAPES[name];
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
				showTools(foundshape);
				setTools();
			}
		}
		else
		{
			if(!(foundshape.group.name in SELECTED)) //if already drawn do not redraw
			{
				foundshape.group.drawBoundary();
				SELECTED[foundshape.group.name]=foundshape.group;
				SELECTEDSHAPE=foundshape;
				showTools(foundshape);
				setTools();
			}
		}
	}

	
							  
/*			
				selected.push(foundshape);
				if (selected.length ==1 && selected[0].path[0]=='closed')
				{
					$('gradfill').style.visibility='visible';
				}
				if (foundshape.path[1]=='edit')
				{
					curcanv=foundshape;
					firstclick=true;
					if (selected.length ==1) { $('editlines').style.visibility='visible'; };
				}
			}
			foundshape.createBoundary();

	if (rmvbdry)
	{
		var bdcnv=bdry.canvas;
		if (bdcnv.group.length>0)
		{
			var gpindx=bdcnv.group.pop();
			bdcnv.group.push(gpindx);
			var gplist=gp[gpindx];
		}
		else
		{
			var gplist=[bdcnv];
		}
		var tempsel=[];
		var inlist;
		var j;
		for (var i=0; i<selected.length; i++) 
		{
			inlist=false;
			j=0;
			while(j<gplist.length && !inlist)
			{
				if (selected[i] == gplist[j]) 
				{
					inlist=true
				}
				else
				{
					j++
				}
			}
			if (!inlist) {tempsel.push(selected[i])};
		}
		selected=[];
		for (var i=0; i<tempsel.length;i++)
		{
			selected.push(tempsel[i]);
		}
		bdry.canvas.boundary='empty';
		bdry.parentNode.removeChild(bdry);
		
	}
	
	if ($('bodydiv').childNodes.length>=1) {
																	$('stylelines').style.visibility='visible';
																	$('collines').style.visibility='visible';
																	$('rotate').style.visibility='visible';
																	$('front').style.visibility='visible';
																	$('back').style.visibility='visible';
																	$('del').style.visibility='visible';
																	$('copy').style.visibility='visible';
																	$('vert').style.visibility='visible';
																	$('horz').style.visibility='visible';
																	for (var b=0;b<$('bodydiv').childNodes.length;b++)
																	{
																		if ($('bodydiv').childNodes[b].canvas.path[0]=='closed')
																		{
																			$('colfill').style.visibility='visible';
																			$('gradfill').style.visibility='visible';
																			$('shadow').style.visibility='visible';	
																		}
																	}
																}
	if ($('bodydiv').childNodes.length>1) {
																	$('group').style.visibility='visible';
																	$('alntop').style.visibility='visible';
																	$('alnbot').style.visibility='visible';
																	$('alnleft').style.visibility='visible';
																	$('alnright').style.visibility='visible';
																	$('alntop').style.top=280;
																	$('alnbot').style.top=300;
																	$('alnleft').style.top=280;
																	$('alnright').style.top=280;
																	if ($('colfill').style.visibility=='visible') 
																	{
																		$('gradfill').style.visibility='visible';
																		$('shadow').style.visibility='visible';
																		$('alntop').style.top=380;
																		$('alnbot').style.top=400;
																		$('alnleft').style.top=380;
																		$('alnright').style.top=380;
																	}
																};
	if ($('bodydiv').childNodes.length==1 && selected.length>1) {$('ungroup').style.visibility='visible'}
	if ($('bodydiv').childNodes.length==1 && selected.length==1) {$('sname').style.visibility='visible'} */
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
   	this.boundary.style.left= this.left; 
   	this.boundary.style.top= this.top;
   	this.boundary.style.width=this.width;
   	this.boundary.style.height=this.height;
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
   											var dx=parseInt($(this.id).style.left)-$(this.id).group.left;
											var dy=parseInt($(this.id).style.top)-$(this.id).group.top;
											var boundary;
											for(var i=0; i<$("boundarydrop").childNodes.length; i++)
											{
												boundary=$("boundarydrop").childNodes[i];
												boundary.style.left=boundary.group.left+dx;
												boundary.style.top=boundary.group.top+dy;
											}
   										}
    this.boundary.DD.onMouseUp=function(e) {
								noBubble(e);
								var dx=parseInt($(this.id).style.left)-$(this.id).group.left;
								var dy=parseInt($(this.id).style.top)-$(this.id).group.top;
								var shape,node;
								clear($("boundarydrop"));
								for(var groupName in SELECTED)
								{
									var group=SELECTED[groupName];
									var shapeNames=group.memberShapes();
									for(var name in shapeNames)
									{
										shape=shapeNames[name];
										//shape.ox +=dx;
										//shape.oy +=dy;
										//shape.sox +=dx;
										//shape.soy +=dy;
										node=shape.path.next;
										while(node.point.x!="end")
										{
											node.point.x+=dx;
											node.point.y+=dy;
											if(node.vertex=="B")
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
										//shape.scleft=shape.bleft;
										//shape.sctop=shape.btop;
										shape.lineGrad[0] +=dx;
										shape.lineGrad[1] +=dy;
										shape.lineGrad[2] +=dx;
										shape.lineGrad[3] +=dy;
										shape.radGrad[0] +=dx;
										shape.radGrad[1] +=dy;
										shape.radGrad[3] +=dx;
										shape.radGrad[4] +=dy;
										shape.cx +=dx;
										shape.cy +=dy;

										shape.draw();
										
										//$("backstage").style.visibility="visible";
										//shape.drawBezGuides();alert("stop");
									}
									group.left+=dx;
									group.top+=dy;
									group.drawBoundary();
								};
								
								//if (gdmrks>0) {drawgradpoints(selected[0])};
								//if (rtmrks>0) {drawrotate(selected[0])}
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
														boundary.style.width=boundary.group.width*scale;
														boundary.style.height=boundary.group.height*scale;
														boundary.cc.style.left=parseInt(boundary.style.width)-5;
														boundary.cc.style.top=parseInt(boundary.style.height)-5;
														boundary.rh.style.left=parseInt(boundary.style.width)-5;
														boundary.rh.style.top=parseInt(boundary.style.height)/2-5;
														boundary.bh.style.left=parseInt(boundary.style.width)/2-5;
														boundary.bh.style.top=parseInt(boundary.style.height)-5;
													}	
												}
												else
												{
													$(this.id).style.top=parseInt(boundary.style.height)-5;
													$(this.id).style.left=parseInt(boundary.style.width)-5;
												}
											};
			
   this.boundary.cc.DD.onMouseUp=function(e) {
   								noBubble(e);
								var boundary=$(this.id).parentNode;
								var group=boundary.group;
								var scale=parseInt(boundary.style.width)/group.width;
								for(var groupName in SELECTED)
								{
									var group=SELECTED[groupName];
									var shapeNames=group.memberShapes();
									for(var name in shapeNames)
									{
										shape=shapeNames[name];
										shape.tplftcrnr.x=group.left+(shape.tplftcrnr.x-group.left)*scale;
										shape.tplftcrnr.y=group.top+(shape.tplftcrnr.y-group.top)*scale;
										shape.btmrgtcrnr.x=group.left+(shape.btmrgtcrnr.x-group.left)*scale;
										shape.btmrgtcrnr.y=group.top+(shape.btmrgtcrnr.y-group.top)*scale;
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
												node.point.x=group.left+(node.point.x-group.left)*scale;
												node.point.y=group.top+(node.point.y-group.top)*scale;
												if(node.ctrl1.x!="end")// will also scale when curve has been set as straight line
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
							  		group.width=parseInt(group.boundary.style.width);
									group.height=parseInt(group.boundary.style.height);
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
														boundary.style.width=boundary.group.width*scale;
														boundary.cc.style.left=parseInt(boundary.style.width)-5;
														boundary.rh.style.left=parseInt(boundary.style.width)-5;
														boundary.rh.style.top=parseInt(boundary.style.height)/2-5;
														boundary.bh.style.left=parseInt(boundary.style.width)/2-5;
													}	
												}
												else
												{
													$(this.id).style.left=parseInt(boundary.style.width)-5;
												}
											};
			
   this.boundary.rh.DD.onMouseUp=function(e) {
   								noBubble(e);
								var boundary=$(this.id).parentNode;
								var group=boundary.group;
								var scale=parseInt(boundary.style.width)/group.width;
								for(var groupName in SELECTED)
								{
									var group=SELECTED[groupName];
									var shapeNames=group.memberShapes();
									for(var name in shapeNames)
									{
										shape=shapeNames[name];
										shape.tplftcrnr.x=group.left+(shape.tplftcrnr.x-group.left)*scale;
										shape.btmrgtcrnr.x=group.left+(shape.btmrgtcrnr.x-group.left)*scale;
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
												node.point.x=group.left+(node.point.x-group.left)*scale;
												if(node.ctrl1.x!="end")// will also scale when curve has been set as straight line
												{
													node.ctrl1.x=group.left+(node.ctrl1.x-group.left)*scale;
													node.ctrl2.x=group.left+(node.ctrl2.x-group.left)*scale;
												}
												node=node.next;
											}
										}
										shape.draw();
							  		}
							  		group.width=parseInt(group.boundary.style.width);
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
														boundary.style.height=boundary.group.height*scale;
														boundary.cc.style.top=parseInt(boundary.style.height)-5;
														boundary.rh.style.top=parseInt(boundary.style.height)/2-5;
														boundary.bh.style.left=parseInt(boundary.style.width)/2-5;
														boundary.bh.style.top=parseInt(boundary.style.height)-5;
													}	
												}
												else
												{
													$(this.id).style.top=parseInt(boundary.style.height)-5;
												}
											};
			
   this.boundary.bh.DD.onMouseUp=function(e) {
   								noBubble(e);
								var boundary=$(this.id).parentNode;
								var group=boundary.group;
								var scale=parseInt(boundary.style.height)/group.height;
								for(var groupName in SELECTED)
								{
									var group=SELECTED[groupName];
									var shapeNames=group.memberShapes();
									for(var name in shapeNames)
									{
										shape=shapeNames[name];
										shape.tplftcrnr.y=group.top+(shape.tplftcrnr.y-group.top)*scale;
										shape.btmrgtcrnr.y=group.top+(shape.btmrgtcrnr.y-group.top)*scale;
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
									group.height=parseInt(group.boundary.style.height);
								}
							}
}



function markLine(canv)
{
	var bd=$('bodydiv');
	var bdc=$('bodydiv').childNodes;
	while(bdc.length>0)
	{
		bd.firstChild.parentNode.removeChild(bd.firstChild);
		bdc=$('bodydiv').childNodes;
	}
	while (lnmrks >0)
	{
		if($('lnm'+(--lnmrks))) {$('lnm'+lnmrks).parentNode.removeChild($('lnm'+lnmrks))};
	}
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
	if (canv.path[2]=='line')
	{
		for (var i=3; i<canv.path.length; i++)
		{
			csr = {x:canv.path[i][1], y:canv.path[i][2]};
			ln=new linemarker(lnmrks++,csr,'white');
			ln.style.zIndex=zpos++;
			DDln=new YAHOO.util.DD(ln.id);
			DDln.onDrag=function(){updatepoints(canv,this)};
		}
	}
	else if (canv.path[2]=='arc' || canv.path[2]=='segment' || canv.path[2]=='sector')
	{

		var last=canv.path.length;
		
		if (canv.path[2]=='arc')
		{
			var nl=last-1;
		}
		else if (canv.path[2]=='segment')
		{
			var nl=last-2;
		}
		else if (canv.path[2]=='sector')
		{
			var nl=last-3;
		}
		if (canv.clockw)
		{
			csr = {x:canv.path[3][1], y:canv.path[3][2]};
		}
		else
		{
			csr = {x:canv.path[nl][5], y:canv.path[nl][6]};
		}
		ln=new linemarker(lnmrks++,csr,'white');
		ln.style.zIndex=zpos++;
		DDln=new YAHOO.util.DD(ln.id);
		DDln.onDrag=function(){updateArcPoints(canv,this)};
		if (canv.clockw)
		{
			csr = {x:canv.path[nl][5], y:canv.path[nl][6]};
		}
		else
		{
			csr = {x:canv.path[3][1], y:canv.path[3][2]};
		}
		ln=new linemarker(lnmrks++,csr,'white');
		ln.style.zIndex=zpos++;
		DDln=new YAHOO.util.DD(ln.id);
		DDln.onDrag=function(){updateArcPoints(canv,this)};
		
		
	}
	else if (canv.path[2]=='rounded_square')
	{
		var ep={x:canv.path[4][5],y:canv.path[4][6]};
		ln=new linemarker(lnmrks++,ep, 'white');
		ln.style.zIndex=zpos++;
		DDln=new YAHOO.util.DD(ln.id);
		DDln.onDrag=function(){updateRnSquRadius(canv,this)};
	}
	else
	{
		csr = {x:canv.path[3][1], y:canv.path[3][2]};
		ln=new linemarker(lnmrks++,csr,'#FEFEFE');
		ln.style.zIndex=zpos++;
		ln.type=canv.beztypes[(lnmrks-1)/3];
		DDln=new YAHOO.util.DD(ln.id);
		DDln.onDrag=function(){updateBezPoints(canv,this)};
		for (var i=4; i<canv.path.length; i++)
		{
			if (canv.path[i][0]=='B')
			{
				csr = {x:canv.path[i][1], y:canv.path[i][2]};
				ln=new linemarker(lnmrks++,csr,'red');
				ln.style.zIndex=zpos++;
				DDln=new YAHOO.util.DD(ln.id);
				DDln.onDrag=function(){updateCtrlBezPoints(canv,this)};
				csr = {x:canv.path[i][3], y:canv.path[i][4]};
				ln=new linemarker(lnmrks++,csr,'red');
				ln.style.zIndex=zpos++;
				DDln=new YAHOO.util.DD(ln.id);
				DDln.onDrag=function(){updateCtrlBezPoints(canv,this)};
				csr = {x:canv.path[i][5], y:canv.path[i][6]};
				ln=new linemarker(lnmrks++,csr,'#FEFEFE');
				ln.style.zIndex=zpos++;
				ln.type=canv.beztypes[(lnmrks-1)/3];
				DDln=new YAHOO.util.DD(ln.id);
				DDln.onDrag=function(){updateBezPoints(canv,this)};
			}
			else
			{
				csr = {x:canv.path[i][5], y:canv.path[i][6]};
				ln=new linemarker(lnmrks++,csr,'red');
				ln.style.zIndex=zpos++;
				ln.style.visibility='hidden';
				DDln=new YAHOO.util.DD(ln.id);
				DDln.onDrag=function(){updateCtrlBezPoints(canv,this)};
				csr = {x:canv.path[i][3], y:canv.path[i][4]};
				ln=new linemarker(lnmrks++,csr,'red');
				ln.style.zIndex=zpos++;
				ln.style.visibility='hidden';
				DDln=new YAHOO.util.DD(ln.id);
				DDln.onDrag=function(){updateCtrlBezPoints(canv,this)};
				csr = {x:canv.path[i][1], y:canv.path[i][2]};
				ln=new linemarker(lnmrks++,csr,'#FEFEFE');
				ln.style.zIndex=zpos++;
				ln.type=canv.beztypes[(lnmrks-1)/3];
				DDln=new YAHOO.util.DD(ln.id);
				DDln.onDrag=function(){updateBezPoints(canv,this)};
			}			
		}
		if (canv.path[2]=='freeform')
		{
			$('lnm'+(lnmrks-1)).parentNode.removeChild($('lnm'+(lnmrks-1)));
			lnmrks--;
		}
		g=getmaxmin(canv.path);
		canv.bleft=g.mnx;
		canv.bwidth=g.mxx-g.mnx;
		canv.btop=g.mny;
		canv.bheight=g.mxy-g.mny;
		drawbezguides(canv);
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
	if(this.type=="sector" || this.type=="segment") //check intersection with closing line
	{
		var start=this.path.next;
		var last=this.path.prev;
		A=new Point(last.point.x-cursor.x,last.point.y-cursor.y);
		B=new Point(start.point.x-cursor.x,start.point.y-cursor.y);
		if (A.y==B.y) {B.y +=0.01};
		if (A.y==0) {A.y +=0.01};
		if (B.y==0) {B.y +=0.01};
		if (A.y==B.y) {B.y +=0.01};
		updatecrosses(A,B);
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

function updateBoundary()
{
	var bl=1000000;  //leftmost
	var bt=1000000;  // topmost
	var br=-1000000; // rightmost;
	var bb=-1000000; //bottommost;
	for(var member in this.members)
	{
		if(members[member].type=="group")
		{
			members[member].updateBoundary();
			if(members[member].boundaryLeft<bl) {bl=members[member].boundaryLeft};
			if(members[member].boundaryTop<bt) {bt=members[member].boundaryTop};
			if((members[member].boundaryLeft+members[member].boundaryWidth)>br) {br=members[member].boundaryLeft+members[member].boundaryWidth};
			if((members[member].boundaryTop+members[member].boundaryHeight)>bb) {bb=members[member].boundaryTop+members[member].boundaryHeight};
		}
		else
		{
			if(members[member].tplftcrnr.x<bl) {bl=members[member].tplftcrnr.x};
			if(members[member].tplftcrnr.y<bt) {bt=members[member].tplftcrnr.y};
			if(members[member].btmrgtcrnr.x>br) {br=members[member].btmrgtcrnr.x};
			if(members[member].btmrgtcrnr.y>bb) {bb=members[member].btmrgtcrnr.y};
		}
	}
	this.boundaryLeft=bl;
	this.boundaryTop=bt;
	this.boundaryWidth=br-bl;
	this.boundaryHeight=bb-bt;
}
