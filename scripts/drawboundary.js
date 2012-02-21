/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function checkBoundary(shifted,cursor)
{
	//if (doingani) {return};
	//removeGradLine();
	//removeRotate();
	if($('pmenu')) {$('pmenu').parentNode.removeChild($('pmenu'))};
	if (!shifted)
	{
		closeColor();
		selected=[];
		$('colfill').style.visibility='hidden';
		clear($("markerdrop"));
	}
	$('editlines').style.visibility='hidden';
	$('shapemenu').style.visibility='hidden';
	$('group').style.visibility='hidden';
	$('ungroup').style.visibility='hidden';
	$('stylelines').style.visibility='hidden';
	$('collines').style.visibility='hidden';
	$('colfill').style.visibility='hidden'
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
	}//alert(shapefound);
	if (shapefound)
	{
		foundshape.addBoundary();
		
		
		rmvbdry=false;
		$('bodydiv').onclick=function(e){checkBoundary(shiftdown(e),getPosition(e),foundshape)};
		if (shifted && foundshape.boundary !='empty') 
		{
			var bdry=foundshape.boundary; 
			rmvbdry=true;
		}
		else
		{
			$('stylelines').style.visibility='visible';
			$('collines').style.visibility='visible';
			$('rotate').style.visibility='visible';
			$('front').style.visibility='visible';
			$('back').style.visibility='visible';
			$('del').style.visibility='visible';
			$('copy').style.visibility='visible';
			$('vert').style.visibility='visible';
			$('horz').style.visibility='visible';
		
			if (!foundshape.open) {
											$('colfill').style.visibility='visible';
											$('gradfill').style.visibility='visible';
											$('shadow').style.visibility='visible';
											  }
			if (foundshape.group.length>0)
			{
				var gpindx=foundshape.group.pop();
				foundshape.group.push(gpindx);
				for (var i=0; i<gp[gpindx].length; i++)
				{
					selected.push(gp[gpindx][i])
				}
			}
			else
			{
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
		}
	}
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
	if ($('bodydiv').childNodes.length==1 && selected.length==1) {$('sname').style.visibility='visible'}
}

function addBoundary() 
{
   this.boundary = document.createElement('div');
   this.boundary.shape=this;
   this.boundary.style.left= this.tplftcrnr.x; 
   this.boundary.style.top= this.tplftcrnr.y;
   this.boundary.style.width=this.btmrgtcrnr.x-this.tplftcrnr.x;
   this.boundary.style.height=this.btmrgtcrnr.y-this.tplftcrnr.y;
   this.boundary.style.border="dashed #040404 1px"; 
   $("markerdrop").appendChild(this.boundary);
/*   this.elmRef.DD=new YAHOO.util.DD(this.elmRef.id);
   this.elmRef.DD.onDrag = function() {
    											var thisbd=$(this.id);
												thisbd.style.left=Math.round(parseInt(thisbd.style.left)/xgrid)*xgrid;
												thisbd.style.top=Math.round(parseInt(thisbd.style.top)/ygrid)*ygrid;
												var dl=parseInt(thisbd.style.left)-thisbd.oleft;
												var dt=parseInt(thisbd.style.top)-thisbd.otop;
												var bdc=$('bodydiv').childNodes;
   												var bdcl=bdc.length;
												for (var i=0;i<bdcl;i++)
 												{
													if (bdc[i].id !=this.id)
													{
														bdc[i].style.left =parseInt(bdc[i].style.left)+dl;
														bdc[i].style.top=parseInt(bdc[i].style.top)+dt;
														bdc[i].oleft=parseInt(bdc[i].style.left);
														bdc[i].otop=parseInt(bdc[i].style.top)
													}
 		  										} 
												thisbd.oleft=parseInt(thisbd.style.left);
   												thisbd.otop=parseInt(thisbd.style.top);
   										}
   this.elmRef.onmouseup=function(e) {
								var cbdl=parseInt(this.style.left)-$(this.canvas.id).bleft;
								var cbdt=parseInt(this.style.top)-$(this.canvas.id).btop;

								for (var s=0;s<selected.length;s++)
								{
									selected[s].ox +=cbdl;
									selected[s].oy +=cbdt;
									selected[s].sox +=cbdl;
									selected[s].soy +=cbdt;
									for (var i=3; i<selected[s].path.length ;i++)
									{
										for (var k=1;k<selected[s].path[i].length; k++)
										{
											if ( k%2 == 1)
											{
													selected[s].path[i][k] +=cbdl;
											}
											else
											{
													selected[s].path[i][k] +=cbdt;
											}
										}
									}
									selected[s].bleft +=cbdl;
									selected[s].btop += cbdt;
									selected[s].scleft=selected[s].bleft;
									selected[s].sctop=selected[s].btop;
									selected[s].lineGrad[0] +=cbdl;
									selected[s].lineGrad[1] +=cbdt;
									selected[s].lineGrad[2] +=cbdl;
									selected[s].lineGrad[3] +=cbdt;
									selected[s].radGrad[0] +=cbdl;
									selected[s].radGrad[1] +=cbdt;
									selected[s].radGrad[3] +=cbdl;
									selected[s].radGrad[4] +=cbdt;
									selected[s].cx +=cbdl;
									selected[s].cy +=cbdt;
									drawline(selected[s]);
									
								};
								if (gdmrks>0) {drawgradpoints(selected[0])};
								if (rtmrks>0) {drawrotate(selected[0])}
								
							  };
   return this.elmRef; */
}

function createBoundary()
{
	this.boundary = new Boundary(this);
	this.boundary.cc = new Corner(this.boundary);
	this.boundary.cc.DD = new YAHOO.util.DD(this.boundary.cc.id);
	this.boundary.rh = new RightH(this.boundary);
	this.boundary.rh.DD = new YAHOO.util.DD(this.boundary.rh.id);
	this.boundary.bh = new BottomH(this.boundary);
	this.boundary.bh.DD = new YAHOO.util.DD(this.boundary.bh.id);
	this.scleft=this.bleft;
	this.sctop=this.btop;
	var canv=this;
	this.boundary.cc.DD.onDrag =function() {
												removeRotate();
												if (parseInt(canv.boundary.cc.style.left)>5)
												{
													canv.ratio = canv.bheight/canv.bwidth;
													canv.boundary.style.width=parseInt(canv.boundary.cc.style.left)+5;
													canv.boundary.style.width=Math.round(parseInt(canv.boundary.style.width)/xgrid)*xgrid;
													canv.boundary.style.height=parseInt(canv.boundary.style.width)*canv.ratio;
													canv.boundary.style.height=Math.round(parseInt(canv.boundary.style.height)/ygrid)*ygrid;
													canv.boundary.cc.style.left=parseInt(canv.boundary.style.width)-5;
													canv.boundary.cc.style.top=parseInt(canv.boundary.style.height)-5;
													canv.boundary.rh.style.top=parseInt(canv.boundary.style.height)/2-5;
													canv.boundary.rh.style.left=parseInt(canv.boundary.style.width)-5;
													canv.boundary.bh.style.top=parseInt(canv.boundary.style.height)-5;
													canv.boundary.bh.style.left=parseInt(canv.boundary.style.width)/2-5;
													var scw=parseInt(canv.boundary.style.width)/canv.bwidth;
						
													for (var s=0;s<selected.length;s++)
													{
														if (canv !=selected[s])
														{
															selected[s].ratio=selected[s].bheight/selected[s].bwidth;
															selected[s].boundary.style.width=selected[s].bwidth*scw;
															selected[s].boundary.style.height=parseInt(selected[s].boundary.style.width)*selected[s].ratio;
															selected[s].boundary.cc.style.top=parseInt(selected[s].boundary.style.height)-5;
															selected[s].boundary.cc.style.left=parseInt(selected[s].boundary.style.width)-5;
															selected[s].boundary.rh.style.top=parseInt(selected[s].boundary.style.height)/2-5;
															selected[s].boundary.rh.style.left=parseInt(selected[s].boundary.style.width)-5;
															selected[s].boundary.bh.style.top=parseInt(selected[s].boundary.style.height)-5;
															selected[s].boundary.bh.style.left=parseInt(selected[s].boundary.style.width)/2-5;
														
														}
													}
												}
												else
												{
													canv.boundary.cc.style.top=parseInt(canv.boundary.style.height)-5;
													canv.boundary.cc.style.left=parseInt(canv.boundary.style.width)-5;
												}
											};	
   this.boundary.cc.DD.onMouseUp=function(e) {
								var scx,scy;
								for (var s=0;s<selected.length;s++)
								{									
									if (selected[s].path[2]=='rounded_square')
									{
										scx = parseInt(selected[s].boundary.style.width)/selected[s].bwidth;
										scy = parseInt(selected[s].boundary.style.height)/selected[s].bheight;
										selected[s].scx=scx;
										selected[s].scy=scy;
										selected[s].sox=selected[s].bleft+(selected[s].ox-selected[s].bleft)*scx;
										selected[s].soy=selected[s].btop+(selected[s].oy-selected[s].btop)*scy;
										selected[s].bwidth=parseInt(selected[s].boundary.style.width);
										selected[s].bheight=parseInt(selected[s].boundary.style.height);
										drawrndsq(selected[s]);
									}
									else
									{
										scx = parseInt(selected[s].boundary.style.width)/selected[s].bwidth;
										scy = parseInt(selected[s].boundary.style.height)/selected[s].bheight;
										selected[s].scx=scx;
										selected[s].scy=scy;
										selected[s].sox=selected[s].bleft+(selected[s].ox-selected[s].bleft)*scx;
										selected[s].soy=selected[s].btop+(selected[s].oy-selected[s].btop)*scy;
										for (var i=3; i<selected[s].path.length ;i++)
										{
											for (var k=1;k<selected[s].path[i].length; k++)
											{
												if ( k%2 == 1)
												{
													selected[s].path[i][k] =selected[s].bleft+(selected[s].path[i][k]-selected[s].bleft)*scx;
												}
												else
												{
													selected[s].path[i][k] =selected[s].btop+(selected[s].path[i][k]-selected[s].btop)*scy;
												}
											}
										}
										selected[s].bwidth=parseInt(selected[s].boundary.style.width);
										selected[s].bheight=parseInt(selected[s].boundary.style.height);
										drawline(selected[s])
									}
								};
							  };
					
	this.boundary.rh.DD.onDrag =function() {
												removeRotate();
												if (parseInt(canv.boundary.rh.style.left)>0)
												{
													canv.boundary.style.width=parseInt(canv.boundary.rh.style.left)+5;
													canv.boundary.style.width=Math.round(parseInt(canv.boundary.style.width)/xgrid)*xgrid;
													canv.boundary.cc.style.left=parseInt(canv.boundary.style.width)-5;
													canv.boundary.rh.style.left=parseInt(canv.boundary.style.width)-5;
													canv.boundary.rh.style.top=parseInt(canv.boundary.style.height)/2-5;
													canv.boundary.bh.style.left=parseInt(canv.boundary.style.width)/2-5;
													var scw=parseInt(canv.boundary.style.width)/canv.bwidth;
						
													for (var s=0;s<selected.length;s++)
													{
														if (canv !=selected[s])
														{
															selected[s].boundary.style.width=selected[s].bwidth*scw;
															selected[s].boundary.cc.style.left=parseInt(selected[s].boundary.style.width)-5;
															selected[s].boundary.rh.style.left=parseInt(selected[s].boundary.style.width)-5;
															selected[s].boundary.bh.style.left=parseInt(selected[s].boundary.style.width)/2-5;
														}
													}
												}
												else
												{
													canv.boundary.rh.style.left=parseInt(canv.boundary.style.width)-5;
													canv.boundary.rh.style.top=parseInt(canv.boundary.style.height)/2-5;
												}
											};	
   this.boundary.rh.DD.onMouseUp=function(e) {
								var scx;
								for (var s=0;s<selected.length;s++)
								{
									if (selected[s].path[2]=='rounded_square')
									{
										scx = parseInt(selected[s].boundary.style.width)/selected[s].bwidth;
										selected[s].scx=scx;
										selected[s].sox=selected[s].bleft+(selected[s].ox-selected[s].bleft)*scx;
										selected[s].bwidth=parseInt(selected[s].boundary.style.width);
										selected[s].bheight=parseInt(selected[s].boundary.style.height);
										drawrndsq(selected[s]);
									}
									else
									{
										scx = parseInt(selected[s].boundary.style.width)/selected[s].bwidth;
										selected[s].scx=scx;										
										selected[s].sox=selected[s].bleft+(selected[s].ox-selected[s].bleft)*scx;
										for (var i=3; i<selected[s].path.length ;i++)
										{
											for (var k=1;k<selected[s].path[i].length; k+=2)
											{
												selected[s].path[i][k] =selected[s].bleft+(selected[s].path[i][k]-selected[s].bleft)*scx;
											}
										}
										selected[s].bwidth=parseInt(selected[s].boundary.style.width);
										selected[s].bheight=parseInt(selected[s].boundary.style.height);
										drawline(selected[s])
									}
								};
							  };



	this.boundary.bh.DD.onDrag =function() {
												removeRotate();
												if (parseInt(canv.boundary.bh.style.top)>0)
												{
													canv.boundary.style.height=parseInt(canv.boundary.bh.style.top)+5;
													canv.boundary.style.height=Math.round(parseInt(canv.boundary.style.height)/ygrid)*ygrid;
													canv.boundary.cc.style.top=parseInt(canv.boundary.style.height)-5;
													canv.boundary.rh.style.top=parseInt(canv.boundary.style.height)/2-5;
													canv.boundary.bh.style.left=parseInt(canv.boundary.style.width)/2-5;
													canv.boundary.bh.style.top=parseInt(canv.boundary.style.height)-5;
													var scw=parseInt(canv.boundary.style.height)/canv.bheight;
						
													for (var s=0;s<selected.length;s++)
													{
														if (canv !=selected[s])
														{
															selected[s].boundary.style.height=selected[s].bheight*scw;
															selected[s].boundary.cc.style.top=parseInt(selected[s].boundary.style.height)-5;
															selected[s].boundary.rh.style.top=parseInt(selected[s].boundary.style.height)/2-5;
															selected[s].boundary.bh.style.top=parseInt(selected[s].boundary.style.height)-5;
														}
													}
												}
												else
												{
													canv.boundary.bh.style.left=parseInt(canv.boundary.style.width)/2-5;
													canv.boundary.bh.style.top=parseInt(canv.boundary.style.height)-5;
												}
											};	
   this.boundary.bh.DD.onMouseUp=function(e) {
								var scy;
								for (var s=0;s<selected.length;s++)
								{
									if (selected[s].path[2]=='rounded_square')
									{
										scy = parseInt(selected[s].boundary.style.height)/selected[s].bheight;
										selected[s].scy=scy;
										selected[s].soy=selected[s].btop+(selected[s].oy-selected[s].btop)*scy;
										selected[s].bwidth=parseInt(selected[s].boundary.style.width);
										selected[s].bheight=parseInt(selected[s].boundary.style.height);
										drawrndsq(selected[s]);
									}
									else
									{
										scy = parseInt(selected[s].boundary.style.height)/selected[s].bheight;
										selected[s].scy=scy;										
										selected[s].soy=selected[s].btop+(selected[s].oy-selected[s].btop)*scy;	
										for (var i=3; i<selected[s].path.length ;i++)
										{
											for (var k=2;k<selected[s].path[i].length; k+=2)
											{
												selected[s].path[i][k] =selected[s].btop+(selected[s].path[i][k]-selected[s].btop)*scy;
											}
										}
										selected[s].bwidth=parseInt(selected[s].boundary.style.width);
										selected[s].bheight=parseInt(selected[s].boundary.style.height);
										drawline(selected[s])
									}
								};
							  };

					
	return this.boundary;
}

function removeBoundary()
{
	if(this.boundary!='empty') 
	{
		this.boundary.parentNode.removeChild(this.boundary);
		this.boundary='empty';
	};
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
			updatecrosses(A,B);$("msg").innerHTML+=crosses+"....";
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


