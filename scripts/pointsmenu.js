/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function pointsMenu(canv,mrk)
{
   
   var i= parseInt(mrk.id.substr(3));
   var j = (i/3)+4;
   if (j== canv.path.length) {canv.path.push('X')};//$('msg').innerHTML=i+'...'+canv.path;
   ptop=5;
   pleft=5;
   udimg='assets/up.png';
   bdtop=25;
   if (canv.bleft+canv.bwidth+170<parseInt($('bodydiv').style.width)) {pleft=canv.bleft+canv.bwidth+10};
   if (canv.btop+canv.bheight+325<parseInt($('bodydiv').style.height)) {ptop=canv.btop};
   var dc=0;
   if($('pmenu')) 
   {
	   ptop=$('pmenu').style.top;
	   pleft=$('pmenu').style.left;
	   udimg=$('pud').firstChild.src;
	   bdtop=$('pBody').style.top;
	   $('pmenu').parentNode.removeChild($('pmenu'))
	};	
   this.elmRef = document.createElement('div');
   this.elmRef.style.position='absolute';
   this.elmRef.id  = 'pmenu';
   this.elmRef.style.left= pleft; 
   this.elmRef.style.top= ptop;
   this.elmRef.style.width=155;
   
   this.elmRef.style.zIndex=20000000;
   this.elmRef.parentdiv=parentselected;
   this.elmRef.style.backgroundColor="#FFFFFF"; 
   
   this.elmRef.onmouseover=function() {inln=true};
   this.elmRef.onmouseout=function() {inln=false}; 
   $('bodydiv').appendChild(this.elmRef);
   
   this.elmHead =document.createElement('div');
   this.elmHead.id  = 'phead';
   this.elmHead.style.left= 0; 
   this.elmHead.style.top= 0;
   this.elmHead.style.width=parseInt(this.elmRef.style.width)-1;
   this.elmHead.style.height=25;
   this.elmHead.style.backgroundColor='black';
   this.elmHead.style.border="solid black 1px"; 
   this.elmHead.style.color='white';
   this.elmHead.innerHTML='\u00A0 Edit';
   
   this.elmBody =document.createElement('div');
   this.elmBody.id  = 'pBody';
   this.elmBody.style.left= 0; 
   this.elmBody.style.top= bdtop;
   this.elmBody.style.width=parseInt(this.elmRef.style.width)-1;
   this.elmBody.style.height=25;
   this.elmBody.style.border="solid black 1px";
   this.elmBody.style.backgroundColor='white'; 
   $('pmenu').appendChild(this.elmBody);
   
   this.elmClose = document.createElement('div')
   this.elmClose.id  = 'pclose';
   this.elmClose.style.left= parseInt(this.elmRef.style.width)-parseInt(this.elmHead.style.height)-1; 
   this.elmClose.style.top= 0;
   this.elmClose.style.width=parseInt(this.elmHead.style.height);
   this.elmClose.style.height=this.elmHead.style.height;
   this.elmClose.style.backgroundColor="#000000";
   this.elmClose.style.borderLeft="solid #FFFFFF 1px";
   this.elmClose.onclick=function() {
	   									inln=false;
										$('pmenu').parentNode.removeChild($('pmenu'));
									};
   this.elmImg=document.createElement('img');
   this.elmImg.style.position="absolute";
   this.elmImg.src='assets/x.png';
   this.elmImg.style.left=2;
   this.elmImg.style.top=2;
   
   this.elmUpDown = document.createElement('div');
   this.elmUpDown.id = 'pud';
   this.elmUpDown.style.left= parseInt(this.elmRef.style.width)-2*parseInt(this.elmHead.style.height)-2; 
   this.elmUpDown.style.top= 0;
   this.elmUpDown.style.width=bdtop;
   this.elmUpDown.style.height=this.elmHead.style.height;
   this.elmUpDown.style.backgroundColor="#000000";
   this.elmUpDown.style.borderLeft="solid #FFFFFF 1px";
   this.elmUpDown.onclick = function() {
	   										if (this.firstChild.id=='imgup')
											{
												this.firstChild.id='imgdown';
												this.firstChild.src='assets/down.png';
												setTimeout(function () {closediv()},50);
											}
											else
											{
												this.firstChild.id='imgup';
												this.firstChild.src='assets/up.png';
												setTimeout(function () {opendiv()},50);
											};
   										}
   
   this.elmImg2=document.createElement('img');
   this.elmImg2.id='imgup';
   this.elmImg2.style.position="absolute";
   this.elmImg2.src=udimg;
   this.elmImg2.style.left=2;
   this.elmImg2.style.top=2;   
   
   this.points =document.createElement('div');
   this.points.id  = 'points';
   this.points.style.left= 0; 
   this.points.style.top= parseInt(this.elmHead.style.height)*dc++;
   this.points.style.width=parseInt(this.elmRef.style.width)-1;
   this.points.style.height=25;
   this.points.style.backgroundColor='#888888'; 
   this.points.style.color='yellow';
   this.points.style.fontWeight='bold';
   this.points.innerHTML='\u00A0 Points';
   

   this.corner =document.createElement('div');
   this.corner.id  = 'corner';
   this.corner.style.left= 0; 
   this.corner.style.top= parseInt(this.elmHead.style.height)*dc++;
   this.corner.style.width=parseInt(this.elmRef.style.width)-1;
   this.corner.style.height=25;
   this.corner.style.backgroundColor='#EEEEEE'; 
   this.corner.style.color='#999999';
   this.corner.style.fontWeight='bold';
   this.corner.innerHTML='\u00A0 Corner';
   
   if ($('lnm'+i).type!='corner')
   {	
		this.corner.style.backgroundColor='white'; 
   		this.corner.style.color='black';
		this.corner.onclick=function() {
										$('lnm'+i).type='corner';	
										canv.beztypes[i/3]='corner';
										new pointsMenu(canv,mrk);
										DDcp=new YAHOO.util.DD('pmenu');
   										DDcp.setHandleElId('phead');
									}
		this.corner.onmouseover=function() {this.style.backgroundColor='yellow'};
   		this.corner.onmouseout=function() {this.style.backgroundColor='white'};							
						
	}								
	$('pBody').appendChild(this.corner);
   
   var prevpoint=j-1;
   if (j==4) {prevpoint=canv.path.length-1}

   if (((canv.path[j]!='X' && i!=0)  || (canv.path[0]=='closed')) && (canv.path[j][0]=='B'  && canv.path[prevpoint][0]=='B'))
   {
	  	this.smooth =document.createElement('div');
   		this.smooth.id  = 'smooth';
   		this.smooth.style.left= 0; 
   		this.smooth.style.top= parseInt(this.elmHead.style.height)*dc++;
   		this.smooth.style.width=parseInt(this.elmRef.style.width)-1;
   		this.smooth.style.height=25;
   		this.smooth.style.backgroundColor='#EEEEEE'; 
   		this.smooth.style.color='#999999';
   		this.smooth.style.fontWeight='bold';
   		this.smooth.innerHTML='\u00A0 Smooth';
   		if ($('lnm'+i).type!='smooth')
   		{	
			this.smooth.style.backgroundColor='white'; 
   			this.smooth.style.color='black';
			this.smooth.onmouseover=function() {this.style.backgroundColor='yellow'};
   			this.smooth.onmouseout=function() {this.style.backgroundColor='white'};
			this.smooth.onclick=function() {
										$('lnm'+i).type='smooth'
										canv.beztypes[i/3]='smooth';
										new pointsMenu(canv,mrk);
										DDcp=new YAHOO.util.DD('pmenu');
   										DDcp.setHandleElId('phead');
										smoothCtrlBezPoints(canv,mrk);
										}
   		}
   		$('pBody').appendChild(this.smooth);
   }
   
   
   
   if (((canv.path[j]!='X' && i!=0)  || (canv.path[0]=='closed')) && (canv.path[j][0]=='B'  && canv.path[prevpoint][0]=='B'))
   {
		this.straight =document.createElement('div');
   		this.straight.id  = 'in-line';
   		this.straight.style.left= 0; 
   		this.straight.style.top= parseInt(this.elmHead.style.height)*dc++;
   		this.straight.style.width=parseInt(this.elmRef.style.width)-1;
   		this.straight.style.height=25;
   		this.straight.style.backgroundColor='#EEEEEE'; 
   		this.straight.style.color='#999999';
   		this.straight.style.fontWeight='bold';
   		this.straight.innerHTML='\u00A0 In-line';
		if ($('lnm'+i).type!='in-line')
   		{
			this.straight.style.backgroundColor='white'; 
   			this.straight.style.color='black';
			this.straight.onmouseover=function() {this.style.backgroundColor='yellow'};
   			this.straight.onmouseout=function() {this.style.backgroundColor='white'};
    		this.straight.onclick=function() {

										$('lnm'+i).type='in-line';
										canv.beztypes[i/3]='in-line';
										new pointsMenu(canv,mrk);
										DDcp=new YAHOO.util.DD('pmenu');
   										DDcp.setHandleElId('phead');
										straightCtrlBezPoints(canv,mrk);
									}
   		}
		$('pBody').appendChild(this.straight);
   }
   
   this.delet =document.createElement('div');
   this.delet.id  = 'delete';
   this.delet.style.left= 0; 
   this.delet.style.top= parseInt(this.elmHead.style.height)*dc++;
   this.delet.style.width=parseInt(this.elmRef.style.width)-1;
   this.delet.style.height=25;
   this.delet.style.backgroundColor='white'; 
   this.delet.style.color='black';
   this.delet.style.fontWeight='bold';
   this.delet.innerHTML='\u00A0 Delete';
   this.delet.onmouseover=function() {this.style.backgroundColor='yellow'};
   this.delet.onmouseout=function() {this.style.backgroundColor='white'};
   this.delet.onclick=function() {
	   								
									var i= parseInt(mrk.id.substr(3));
	 								var j=Math.floor(i/3)+3;
									var cl=canv.path.length;
									if (j==3)
									{
										canv.beztypes.shift();
										var tempc=[];
										tempc.push('M');
										tempc.push(canv.path[4][5]);
										tempc.push(canv.path[4][6]);
										var bezx=canv.path[4][3];
										var bezy=canv.path[4][4];
										canv.path[3]=tempc;
										for (var kk=4;kk<cl-1;kk++)
										{
											canv.path[kk]=canv.path[kk+1];
										}
										canv.path.pop();
										if (canv.path[0]=='closed')
										{
											canv.path[kk-1][5]=canv.path[3][1];
											canv.path[kk-1][6]=canv.path[3][2];
											canv.path[canv.path.length-1][3]=bezx;
											canv.path[canv.path.length-1][4]=bezy;	
										}
									}
									else
									{
										var tempc=[];
										for (var kk=3; kk<j; kk++)
										{
											tempc.push(canv.beztypes.shift());
										}
										canv.beztypes.shift();
										if (canv.path[j][0]=='L')
										{				 
											var bezx=canv.path[j][5];
											var bezy=canv.path[j][6];
										}
										else
										{
											var bezx=canv.path[j][1];
											var bezy=canv.path[j][2];
										}
										for (var kk=j;kk<cl-1;kk++)
										{
											canv.path[kk]=canv.path[kk+1];
											tempc.push(canv.beztypes.shift());
										}
										canv.beztypes=tempc;
										if (canv.path[j][0]=='L')
										{
											canv.path[j][5]=bezx;
											canv.path[j][6]=bezy;
										}
										else
										{
											canv.path[j][1]=bezx;
											canv.path[j][2]=bezy;
										}
										canv.path.pop();
									}//$('msg').innerHTML=canv.path;
									var ni=i-3;
									var mi=i;
									if (ni<0) 
									{
										ni=3;
										mi=6;
										
									}
									if (mi+3==lnmrks)
									{
										mi=0;
									}
									if (canv.path[0]=='open')
									{
										canv.beztypes[0]='corner';
										canv.beztypes.pop();
										canv.beztypes.push('corner');
									}
									drawline(canv);
									markLine(canv);
									$('lnm'+ni).style.backgroundColor='yellow';
									$('lnm'+ni).backgroundColor='yellow';
									$('lnm'+mi).style.backgroundColor='#95B3D7';
									$('lnm'+mi).backgroundColor='#95B3D7';
									new pointsMenu(canv,$('lnm'+(i-3)));
									DDcp=new YAHOO.util.DD('pmenu');
   									DDcp.setHandleElId('phead');
									
   								 }
   
   if (canv.path[0]=='closed')
   {
	   	this.openup =document.createElement('div');
   		this.openup.id  = 'openup';
   		this.openup.style.left= 0; 
   		this.openup.style.top= parseInt(this.elmHead.style.height)*dc++;
   		this.openup.style.width=parseInt(this.elmRef.style.width)-1;
   		this.openup.style.height=25;
   		this.openup.style.backgroundColor='white'; 
   		this.openup.style.color='black';
   		this.openup.style.fontWeight='bold';
   		this.openup.innerHTML='\u00A0 Open Path';
   		this.openup.onmouseover=function() {this.style.backgroundColor='yellow'};
   		this.openup.onmouseout=function() {this.style.backgroundColor='white'};
		this.openup.onclick=function() {
											var i= parseInt(mrk.id.substr(3));
											var j=(i/3)+3;
											var cl=canv.path.length;
											if (j!=3)
											{
												var tempc=[];
												tempc[0]='open';
												tempc[1]='edit';
												tempc[2]='curve';
												if (canv.path[j][0]=='L' )
												{
													tempc[3]=[];
													tempc[3][0] = 'M';
													tempc[3][1] = canv.path[j][1];
													tempc[3][2] =  canv.path[j][2];
												}
												else
												{
													tempc[3]=[];
													tempc[3][0]= 'M';
													tempc[3][1] = canv.path[j][5];
													tempc[3][2] =  canv.path[j][6];
												}
												for (k=4; k<cl-(j-3);k++)
												{
													tempc[k]=canv.path[k+j-3]
												}
												var ii=0;
												for (kk=k;kk<cl;kk++)
												{
													tempc[kk]=canv.path[4+ii++];
												}
												
												canv.path=tempc;
												cbl=canv.beztypes.length;
												tempc=[];
												for (var k=0;k<cbl;k++)
												{
													tempc[k]=canv.beztypes[(k+j-3)%cbl]
												}
												tempc[0]='corner';
												tempc[cbl-1]='corner';
												canv.beztypes=tempc;
											}
											canv.path[0]='open';
											canv.path[2]='curve';
											if (canv.path[cl-2][0]=='L' )
											{
												var xs=canv.path[cl-2][1];
												var ys=canv.path[cl-2][2];
											}
											else
											{
												var xs=canv.path[cl-2][5];
												var ys=canv.path[cl-2][6];
											}
											var xe = canv.path[3][1];$('msg').innerHTML=xe;
											var ye=  canv.path[3][2];
											var dx = (xe - xs)/10;
											var dy = (ye - ys)/10;
											xe = xe-dx;
											ye = ye-dy;
											if (canv.path[cl-1][0]=='L' )
											{
												canv.path[cl-1][1]=xe;
												canv.path[cl-1][2]=ye;
											}
											else
											{
												canv.path[cl-1][5]=xe;
												canv.path[cl-1][6]=ye;
											}
											
											drawline(canv);
											markLine(canv);
											$('lnm0').style.backgroundColor='yellow';
											$('lnm0').backgroundColor='yellow';
											$('lnm3').style.backgroundColor='#95B3D7';
											$('lnm3').backgroundColor='#95B3D7';
											new pointsMenu(canv,$('lnm0'));
											DDcp=new YAHOO.util.DD('pmenu');
   											DDcp.setHandleElId('phead');
										}
		$('pBody').appendChild(this.openup);
   }
   
   if (canv.path[j] !='X')
   {
		this.segments =document.createElement('div');
   		this.segments.id  = 'segments';
   		this.segments.style.left= 0; 
   		this.segments.style.top= parseInt(this.elmHead.style.height)*dc++;
   		this.segments.style.width=parseInt(this.elmRef.style.width)-1;
   		this.segments.style.height=25;
   		this.segments.style.backgroundColor='#888888'; 
   		this.segments.style.color='yellow';
   		this.segments.style.fontWeight='bold';
   		this.segments.innerHTML="\u00A0 <span style='color:yellow'>Seg</span><span style='color:#95B3D7'>ments</span>";
		$('pBody').appendChild(this.segments);
   }
   
   if (canv.path[j][0]=='L')
   {
	   	this.curved =document.createElement('div');
   		this.curved.id  = 'curved';
   		this.curved.style.left= 0; 
   		this.curved.style.top= parseInt(this.elmHead.style.height)*dc++;
   		this.curved.style.width=parseInt(this.elmRef.style.width)-1;
   		this.curved.style.height=25;
   		this.curved.style.backgroundColor='white'; 
   		this.curved.style.color='black';
   		this.curved.style.fontWeight='bold';
   		this.curved.innerHTML='\u00A0 Curved';
   		this.curved.onmouseover=function() {this.style.backgroundColor='yellow';$('subcurved').style.backgroundColor='#95B3D7'};
   		this.curved.onmouseout=function() {this.style.backgroundColor='white';$('subcurved').style.backgroundColor='white'};
   		this.curved.onclick=function() {canv.path[j][0]='B';
 	  									var tp=canv.path[j][1];
   										canv.path[j][1]=canv.path[j][5];
										canv.path[j][5]=tp;
										tp=canv.path[j][2];
										canv.path[j][2]=canv.path[j][6];
										canv.path[j][6]=tp;
										$('lnm'+(i+1)).style.visibility='visible';
										$('lnm'+(i+2)).style.visibility='visible';
										
										new pointsMenu(canv,mrk);
										DDcp=new YAHOO.util.DD('pmenu');
   										DDcp.setHandleElId('phead');
										drawline(canv);
										drawbezguides(canv)
								   		};  
   		this.subcurved = document.createElement('div');
   		this.subcurved.id='subcurved';
   		this.subcurved.style.left= parseInt(this.elmRef.style.width)/2; 
   		this.subcurved.style.top= 0
  		this.subcurved.style.width=parseInt(this.elmRef.style.width)/2-1;
   		this.subcurved.style.height=25;
   		this.subcurved.style.backgroundColor='white';
   		this.curved.appendChild(this.subcurved);
   		$('pBody').appendChild(this.curved);
   };
   
   if (canv.path[j][0]=='B')
   {
   		this.strait =document.createElement('div');
   		this.strait.id  = 'strait';
   		this.strait.style.left= 0; 
   		this.strait.style.top= parseInt(this.elmHead.style.height)*dc++;
  		this.strait.style.width=parseInt(this.elmRef.style.width)-1;
   		this.strait.style.height=25;
   		this.strait.style.backgroundColor='white'; 
   		this.strait.style.color='black';
   		this.strait.style.fontWeight='bold';
   		this.strait.innerHTML='\u00A0 Straight';
   		this.strait.onmouseover=function() {this.style.backgroundColor='yellow';$('substrait').style.backgroundColor='#95B3D7'};
   		this.strait.onmouseout=function() {this.style.backgroundColor='white';$('substrait').style.backgroundColor='white'};
   		this.strait.onclick=function() {
										canv.path[j][0]='L';
 	  									var tp=canv.path[j][1];
   										canv.path[j][1]=canv.path[j][5];
										canv.path[j][5]=tp;
										tp=canv.path[j][2];
										canv.path[j][2]=canv.path[j][6];
										canv.path[j][6]=tp;
										$('lnm'+(i+1)).style.visibility='hidden';
										$('lnm'+(i+2)).style.visibility='hidden';
										$('lnm'+i).type='corner';
										canv.beztypes[i/3]='corner';
										var tpe=i+3;
										if (canv.path[2]=='freeform' && tpe==lnmrks) {tpe=0};
										$('lnm'+tpe).type='corner';
										canv.beztypes[tpe/3]='corner';
										new pointsMenu(canv,mrk);
										DDcp=new YAHOO.util.DD('pmenu');
   										DDcp.setHandleElId('phead');
										drawline(canv);
										drawbezguides(canv)
								   		};
   		this.substrait = document.createElement('div');
   		this.substrait.id='substrait';
   		this.substrait.style.left= parseInt(this.elmRef.style.width)/2; 
   		this.substrait.style.top= 0
   		this.substrait.style.width=parseInt(this.elmRef.style.width)/2-1;
   		this.substrait.style.height=25;
   		this.substrait.style.backgroundColor='white';
   		this.strait.appendChild(this.substrait);
   		$('pBody').appendChild(this.strait);
   };
 
    if (canv.path[j] !='X')
   {
   		this.addp =document.createElement('div');
   		this.addp.id  = 'addp';
   		this.addp.style.left= 0; 
   		this.addp.style.top= parseInt(this.elmHead.style.height)*dc++;
   		this.addp.style.width=parseInt(this.elmRef.style.width)-1;
   		this.addp.style.height=25;
   		this.addp.style.backgroundColor='white'; 
   		this.addp.style.color='black';
   		this.addp.style.fontWeight='bold';
   		this.addp.innerHTML='\u00A0 Add Point';
   		this.addp.onmouseover=function() {this.style.backgroundColor='yellow';$('subaddp').style.backgroundColor='#95B3D7'};
   		this.addp.onmouseout=function() {this.style.backgroundColor='white';$('subaddp').style.backgroundColor='white'};
		this.addp.onclick=function () {
											var i= parseInt(mrk.id.substr(3));
	 										var j=Math.floor(i/3)+3;
											var xs;
											var ys;
											var isline=false;
											var cl=canv.path.length;
											if (canv.path[j][0]=='L' || canv.path[j][0]=='M')
											{
												xs=canv.path[j][1];
											    ys=canv.path[j][2];
											}
											else
											{
												 xs=canv.path[j][5];
												 ys=canv.path[j][6];
											}
											var xe;
											var ye;
											if (canv.path[j+1][0]=='L')
											{
												xe=canv.path[j+1][1];
											    ye=canv.path[j+1][2];
												var xsb=canv.path[j+1][5];
												var ysb=canv.path[j+1][6];
												var xm=(xs+xe)/2;
												var ym=(ys+ye)/2;
											
												var dx=(xm-xs)/4;
												var dy=(ym-ys)/4
												var xbs=xm-dx;
												var ybs=ym-dy
												var xeb=xm+dx;
												var yeb=ym+dy;
												isline=true;
												canv.path[j+1][5]=xeb;
												canv.path[j+1][6]=yeb;
											}
											else
											{
												xe=canv.path[j+1][5];
												ye=canv.path[j+1][6];
												var xc1=canv.path[j+1][1];
												var yc1=canv.path[j+1][2];
												var xc2=canv.path[j+1][3];
												var yc2=canv.path[j+1][4];
												var xm=0.5*0.5*0.5*(xs+3*xc1+3*xc2+xe);
												var ym=0.5*0.5*0.5*(ys+3*yc1+3*yc2+ye);
											
												var xmc2=(xs+2*xc1+xc2)/4;
												var ymc2=(ys+2*yc1+yc2)/4;
												var xmc1=(xc1+2*xc2+xe)/4;
												var ymc1=(yc1+2*yc2+ye)/4;
												
												canv.path[j+1][1]=xmc1;
												canv.path[j+1][2]=ymc1;
												canv.path[j+1][3]=(xc2+xe)/2;
												canv.path[j+1][4]=(yc2+ye)/2;
											}
											var tempc=[];
											var tempb=[];
											for (var kk=0; kk<3; kk++)
											{
												tempc.push(canv.path.shift());
											}
											for (var kk=3; kk<=j;kk++)
											{
												tempc.push(canv.path.shift());
												tempb.push(canv.beztypes.shift());
											}
											if (isline)
											{
												var templine=[];
												templine.push('L');
												templine.push(xm);
												templine.push(ym);
												templine.push(xbs);
												templine.push(ybs);
												templine.push(xsb);
												templine.push(ysb);
												tempc.push(templine);
											}
											else
											{
												var templine=[];
												templine.push('B');
												templine.push((xs+xc1)/2);
												templine.push((ys+yc1)/2);
												templine.push(xmc2);
												templine.push(ymc2);
												templine.push(xm);
												templine.push(ym);
												tempc.push(templine);
												
											}
											tempb.push('smooth');
											for (var kk=j+1; kk<cl-1;kk++)
											{
												tempc.push(canv.path.shift());
												tempb.push(canv.beztypes.shift());
											}
											tempc.push(canv.path.shift());
											canv.path=tempc;
											canv.beztypes=tempb;
											drawline(canv);
											markLine(canv);
											if (i+1==lnmrks)
											{
												var ni=-3;
											}
											else
											{
												ni=i;
											}
											$('lnm'+ni).style.backgroundColor='yellow';
											$('lnm'+ni).backgroundColor='yellow';
											$('lnm'+(ni+3)).style.backgroundColor='#95B3D7';
											$('lnm'+(ni+3)).backgroundColor='#95B3D7';
											new pointsMenu(canv,$('lnm'+ni));
											DDcp=new YAHOO.util.DD('pmenu');
   											DDcp.setHandleElId('phead');
										}
										
   		this.subaddp = document.createElement('div');
   		this.subaddp.id='subaddp';
   		this.subaddp.style.left= parseInt(this.elmRef.style.width)/2; 
   		this.subaddp.style.top= 0
   		this.subaddp.style.width=parseInt(this.elmRef.style.width)/2-1;
   		this.subaddp.style.height=25;
   		this.subaddp.style.backgroundColor='white';
   		this.addp.appendChild(this.subaddp); 
		$('pBody').appendChild(this.addp);
   }
   
   if (canv.path[2]=='curve')
   {
	   this.path =document.createElement('div');
   		this.path.id  = 'path';
   		this.path.style.left= 0; 
   		this.path.style.top= parseInt(this.elmHead.style.height)*dc++;
   		this.path.style.width=parseInt(this.elmRef.style.width)-1;
   		this.path.style.height=25;
   		this.path.style.backgroundColor='#888888'; 
   		this.path.style.color='#95B3D7';
   		this.path.style.fontWeight='bold';
   		this.path.innerHTML='\u00A0 Path';
		$('pBody').appendChild(this.path);
   
   		this.closeup =document.createElement('div');
   		this.closeup.id  = 'closeup';
   		this.closeup.style.left= 0; 
   		this.closeup.style.top= parseInt(this.elmHead.style.height)*dc++;
   		this.closeup.style.width=parseInt(this.elmRef.style.width)-1;
   		this.closeup.style.height=25;
   		this.closeup.style.backgroundColor='white'; 
   		this.closeup.style.color='black';
   		this.closeup.style.fontWeight='bold';
   		this.closeup.innerHTML='\u00A0 Close Path';
   		this.closeup.onmouseover=function() {this.style.backgroundColor='#95B3D7'};
   		this.closeup.onmouseout=function() {this.style.backgroundColor='white'};
		this.closeup.onclick=function() {
													
													var i= parseInt(mrk.id.substr(3));
													if (i==lnmrks-1)
													{
														ni=-3;
													}
													else
													{
														ni=i;
													}
													
													var l=canv.path.length-1;
													var sx = canv.path[l][5];
													var sy = canv.path[l][6];
													var ex =canv.path[3][1];
													var ey =canv.path[3][2]
													var dx = (ex-sx)/4;
													var dy = (ey-sy)/4;
													var ccur={x:sx+dx,y:sy+dy};
													var tempary=[];
													tempary.push('B');
													tempary.push(sx+dx);
													tempary.push(sy+dy);
													tempary.push(ex-dx);
													tempary.push(ey-dy);	
													tempary.push(ex);
													tempary.push(ey);
													canv.path[0]='closed';
													canv.path[2]='freeform';
													canv.path.push(tempary);
													drawline(canv);
													markLine(canv);
													$('lnm'+ni).style.backgroundColor='yellow';
													$('lnm'+ni).backgroundColor='yellow';
													$('lnm'+(ni+3)).style.backgroundColor='#95B3D7';
													$('lnm'+(ni+3)).backgroundColor='#95B3D7';
													new pointsMenu(canv,$('lnm'+ni));
													DDcp=new YAHOO.util.DD('pmenu');
   													DDcp.setHandleElId('phead');
										}
		$('pBody').appendChild(this.closeup);
   }
   
   $('pmenu').appendChild(this.elmHead);
   $('pBody').appendChild(this.points); 
   $('pBody').appendChild(this.delet);
   $('phead').appendChild(this.elmClose);
   $('pclose').appendChild(this.elmImg);
   $('phead').appendChild(this.elmUpDown);
   $('pud').appendChild(this.elmImg2);
   
   this.elmRef.style.height=parseInt(this.elmHead.style.height)*(dc+1);
   this.elmRef.style.clip='rect(0,300,'+(parseInt(this.elmRef.style.height)+20)+',0)';
   this.elmBody.style.height=parseInt(this.elmHead.style.height)*dc;
   if (canv.path[j][0]=='X') {canv.path.pop()};
   return this.elmRef;
}

function closediv()
{
	var pbody=$('pBody'); 
	if (parseInt(pbody.style.top)+parseInt(pbody.style.height)>25)
	{
		pbody.style.top = parseInt(pbody.style.top)-5;
		setTimeout(function () {closediv()},10)
	}
}

function opendiv()
{
	var pbody=$('pBody'); 
	if (parseInt(pbody.style.top)<25)
	{
		pbody.style.top = parseInt(pbody.style.top)+5;
		setTimeout(function () {opendiv()},10)
	}
}

function smoothCtrlBezPoints(canv,mrk)
{
	 var i= parseInt(mrk.id.substr(3));
	 var j=Math.floor(i/3)+3;
	 if (canv.path[j][0]=='B')
	 {
		var x0=canv.path[j][5];
	 	var y0=canv.path[j][6];
	 }
	 else
	 {
		var x0=canv.path[j][1];
	 	var y0=canv.path[j][2];
	 }
	 var ca=Math.floor(i/3)+4;
	 if (i==0)
	 {
		 cb=Math.floor((lnmrks-3)/3)+4;
	 }
	 else
	 {	
	 	 cb=Math.floor(i/3)+3 
	 }
	 var xa=canv.path[ca][1];
	 var ya=canv.path[ca][2];
	 var xb=canv.path[cb][3];
	 var yb=canv.path[cb][4];
	 var theta=arctan((xb-xa),(yb-ya));
	 var ra = Math.sqrt((xa-x0)*(xa-x0)+(ya-y0)*(ya-y0));
	 var rb = Math.sqrt((xb-x0)*(xb-x0)+(yb-y0)*(yb-y0));
	 var r = (ra+rb)/2;
	 if (r<10) {r=10};
	 canv.path[ca][1]=x0-r*Math.cos(theta);
	 canv.path[ca][2]=y0-r*Math.sin(theta);
	 canv.path[cb][3]=x0+r*Math.cos(theta);
	 canv.path[cb][4]=y0+r*Math.sin(theta);
	 $('lnm'+(i+1)).style.left=canv.path[ca][1]-4;
	 $('lnm'+(i+1)).style.top=canv.path[ca][2]-4;
	 if (i==0)
	 {
		 $('lnm'+(lnmrks-1)).style.left=canv.path[cb][3]-4;
	     $('lnm'+(lnmrks-1)).style.top=canv.path[cb][4]-4;
	 }
	 else
	 {
		 $('lnm'+(i-1)).style.left=canv.path[cb][3]-4;
	     $('lnm'+(i-1)).style.top=canv.path[cb][4]-4;		 
	 }
	 g=getmaxmin(canv.path);
	 canv.bleft=g.mnx;
	 canv.bwidth=g.mxx-g.mnx;
	 canv.btop=g.mny;
	 canv.bheight=g.mxy-g.mny;
	 drawline(canv);
	 drawbezguides(canv);
}

function straightCtrlBezPoints(canv,mrk)
{
		 var i= parseInt(mrk.id.substr(3));
	 var j=Math.floor(i/3)+3;
	 if (canv.path[j][0]=='B')
	 {
		var x0=canv.path[j][5];
	 	var y0=canv.path[j][6];
	 }
	 else
	 {
		var x0=canv.path[j][1];
	 	var y0=canv.path[j][2];
	 }
	 var ca=Math.floor(i/3)+4;
	 if (i==0)
	 {
		 cb=Math.floor((lnmrks-3)/3)+4;
	 }
	 else
	 {	
	 	 cb=Math.floor(i/3)+3 
	 }
	 var xa=canv.path[ca][1];
	 var ya=canv.path[ca][2];
	 var xb=canv.path[cb][3];
	 var yb=canv.path[cb][4];
	 var theta=arctan((xb-xa),(yb-ya));
	 var ra = Math.sqrt((xa-x0)*(xa-x0)+(ya-y0)*(ya-y0));
	 var rb = Math.sqrt((xb-x0)*(xb-x0)+(yb-y0)*(yb-y0));
	 canv.path[ca][1]=x0-ra*Math.cos(theta);
	 canv.path[ca][2]=y0-ra*Math.sin(theta);
	 canv.path[cb][3]=x0+rb*Math.cos(theta);
	 canv.path[cb][4]=y0+rb*Math.sin(theta);
	 $('lnm'+(i+1)).style.left=canv.path[ca][1]-4;
	 $('lnm'+(i+1)).style.top=canv.path[ca][2]-4;
	 if (i==0)
	 {
		 $('lnm'+(lnmrks-1)).style.left=canv.path[cb][3]-4;
	     $('lnm'+(lnmrks-1)).style.top=canv.path[cb][4]-4;
	 }
	 else
	 {
		 $('lnm'+(i-1)).style.left=canv.path[cb][3]-4;
	     $('lnm'+(i-1)).style.top=canv.path[cb][4]-4;		 
	 }
	 g=getmaxmin(canv.path);
	 canv.bleft=g.mnx;
	 canv.bwidth=g.mxx-g.mnx;
	 canv.btop=g.mny;
	 canv.bheight=g.mxy-g.mny;
	 drawline(canv);
	 drawbezguides(canv);
}