/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function rotMenu(canv)
{
   this.elmRef = document.createElement('div');
   this.elmRef.id  = 'rotmenu';
   this.elmRef.style.left= parseInt($('toolbar').style.left)+100; 
   this.elmRef.style.top= parseInt($('toolbar').style.top)+150;
   if (parseInt($('toolbar').style.left)>screen.availWidth-300) {this.elmRef.style.left=parseInt($('toolbar').style.left)-130};
   this.elmRef.style.width=120;
   this.elmRef.style.height=70;
   
   this.elmRef.style.zIndex=20000002;
   this.elmRef.parentdiv=parentselected;
   this.elmRef.style.backgroundColor="#FFFFFF"; 
   
   this.elmRef.onmouseover=function() {inln=true};
   this.elmRef.onmouseout=function() {inln=false}; 
   $('bodydiv').appendChild(this.elmRef);
   
   this.elmHead =document.createElement('div');
   this.elmHead.id  = 'rothead';
   this.elmHead.style.left= 0; 
   this.elmHead.style.top= 0;
   this.elmHead.style.width=parseInt(this.elmRef.style.width)-1;
   this.elmHead.style.height=25;
   this.elmHead.style.backgroundColor='black';
   this.elmHead.style.border="solid black 1px"; 
   this.elmHead.style.color='white';
   this.elmHead.innerHTML='\u00A0 Rotation';
   
   this.elmClose = document.createElement('div')
   this.elmClose.id  = 'rotclose';
   this.elmClose.style.left= parseInt(this.elmRef.style.width)-parseInt(this.elmHead.style.height)-1; 
   this.elmClose.style.top= 0;
   this.elmClose.style.width=parseInt(this.elmHead.style.height);
   this.elmClose.style.height=this.elmHead.style.height;
   this.elmClose.style.backgroundColor="#000000";
   this.elmClose.style.borderLeft="solid #FFFFFF 1px";
   this.elmClose.onclick=function(e) {
	   									noBubble(e);
										inln=false;
										$('rotmenu').parentNode.removeChild($('rotmenu'));
									};
   this.elmImg=document.createElement('img');
   this.elmImg.style.position="absolute";
   this.elmImg.src='assets/x.png';
   this.elmImg.style.left=2;
   this.elmImg.style.top=2;
   
  
   this.elmBody =document.createElement('div');
   this.elmBody.id  = 'rotBody';
   this.elmBody.style.left= 0; 
   this.elmBody.style.top= 25;;
   this.elmBody.style.width=parseInt(this.elmRef.style.width)-1;
   this.elmBody.style.height=70;
   this.elmBody.style.border="solid black 1px";
   this.elmBody.style.backgroundColor='white'; 
   $('rotmenu').appendChild(this.elmBody); 
  
   this.rotform =document.createElement('div');
   this.rotform.id  = 'rotform';
   this.rotform.style.left= 0; 
   this.rotform.style.top= 0
   this.rotform.style.width=parseInt(this.elmRef.style.width)-1;
   this.rotform.style.height=this.elmBody.style.height;
   $('rotBody').appendChild(this.rotform);
   
   this.rotanglelbldiv=document.createElement('div');
   this.rotanglelbldiv.style.left=2;
   this.rotanglelbldiv.style.top=7;
   this.rotanglelbldiv.innerHTML='Angle';
   this.rotangleindiv=document.createElement('div');
   this.rotangleindiv.style.left=50;
   this.rotangleindiv.style.top=7;   
   this.rotangle=document.createElement('input');
   this.rotangle.id='rotangle';
   this.rotangle.type='text';
   this.rotangle.size=4;
   this.rotangle.style.textAlign='right';
   this.rotangle.value=canv.phi;
   this.rotform.appendChild(this.rotanglelbldiv);
   this.rotform.appendChild(this.rotangleindiv);
   this.rotangleindiv.appendChild(this.rotangle);
 
   this.rotOKindiv=document.createElement('div');
   this.rotOKindiv.style.left=2;
   this.rotOKindiv.style.top=30;   
   this.rotOK=document.createElement('input');
   this.rotOK.id='rotOK';
   this.rotOK.type='button';
   this.rotOK.size=10;
   this.rotOK.value='OK';
   this.rotOK.onclick=function () {
	   								var ophi=canv.phi;
									canv.phi=$('rotangle').value*Math.PI/180;
									var nphi=canv.phi;
									drawrotate();
									
									canv.phi=ophi;
									updateangle($('rtm1'),nphi);
								  };
   this.rotform.appendChild(this.rotOKindiv);
   this.rotOKindiv.appendChild(this.rotOK);

   this.rotcancelindiv=document.createElement('div');
   this.rotcancelindiv.style.left=50;
   this.rotcancelindiv.style.top=30;   
   this.rotcancel=document.createElement('input');
   this.rotcancel.id='rotcancel';
   this.rotcancel.type='button';
   this.rotcancel.size=8;
   this.rotcancel.value='Close';
   this.rotcancel.onclick=function (e) {noBubble(e);inln=false;$('rotmenu').parentNode.removeChild($('rotmenu'))};
   this.rotform.appendChild(this.rotcancelindiv);
   this.rotcancelindiv.appendChild(this.rotcancel);

   $('rotmenu').appendChild(this.elmHead);
   $('rothead').appendChild(this.elmClose);
   $('rotclose').appendChild(this.elmImg);
   
   return this.elmRef;  
   
}


function rotateMarker()
{
   this.elmRef = document.createElement('div');
   this.elmRef.id  = 'rtm'+(rtmrks++);
   this.elmRef.style.fontSize=0;
   this.elmRef.style.width=12;
   this.elmRef.style.height=12;
   this.elmRef.left=0;
   this.elmRef.top=0;
   this.elmRef.style.cursor='move';
   this.elmRef.onmouseover=function(){
										inln=true;
									};
   this.elmRef.onmouseout=function(){
	   									inln=false;
									};	
   $('bodydiv').appendChild(this.elmRef);
   return this.elmRef
}

function canvrotate()
{
	removeRotate();
	removeGradLine();
	var canv=selected[0];
	if (!canv.rotated)
	{
		for (var i=0; i<selected.length;i++)
		{
			selected[i].rotated=true;
			selected[i].cx=selected[i].bleft+selected[i].bwidth/2;
			selected[i].cy=selected[i].btop+selected[i].bheight/2;
		}
	}
	rtk=new rotateMarker();
	rtk.style.left=canv.cx;
	rtk.style.top=canv.cy;
	rtk.left=rtk.style.left;
	rtk.top=rtk.style.top;
	DDrtk=new YAHOO.util.DD(rtk.id)
	DDrtk.onDrag=function(){updatecenter(this)};
	rtk=new rotateMarker();
	rtk.style.left=canv.cx;
	rtk.style.top=canv.cy-canv.rr;
	rtk.left=rtk.style.left;
	rtk.top=rtk.style.top;
	DDrtk=new YAHOO.util.DD(rtk.id)
	DDrtk.onDrag=function(){updateangle(this,'x')};
	var rotm=new rotMenu(canv);
	var DDrotm = new YAHOO.util.DD(rotm.id);
	DDrotm.setHandleElId('rothead');
	drawrotate();
}


function drawrotate()
{ 
	var canv=selected[0];
	if ($('rotmenu')) {$('rotangle').value=Math.round(canv.phi*180/Math.PI)};
	
	var t = Math.PI/32;
	var a = Math.PI/32;
	var r =3;
	var er= r+4;
	
	//boundary box calculation
	var width=2*(canv.rr)*Math.sin(t+a);
	var height=(canv.rr+er)*Math.cos(t)-(canv.rr-er)*Math.cos(t)
	var tplx=canv.cx-(canv.rr)*Math.sin(t+a);
	var tply=canv.cy-canv.rr-er;
	var tprx=tplx+width;
	var tpry=tply;
	var blx =tplx;
	var bly =tply+height;
	var brx = tprx;
	var bry = bly;
	
	var tpl=rotate(canv.phi,tplx-canv.cx,tply-canv.cy,'C');
	var tpr=rotate(canv.phi,tprx-canv.cx,tpry-canv.cy,'C');
	var bl=rotate(canv.phi,blx-canv.cx,bly-canv.cy,'C');
	var br=rotate(canv.phi,brx-canv.cx,bry-canv.cy,'C');
	
	tplx=canv.cx+tpl.x;
	tply=canv.cy+tpl.y;
	tprx=canv.cx+tpr.x;
	tpry=canv.cy+tpr.y;
	blx=canv.cx+bl.x;
	bly=canv.cy+bl.y;
	brx=canv.cx+br.x;
	bry=canv.cy+br.y;
	if (0<=canv.phi && canv.phi<Math.PI/2)
	{
		$('rtm1').style.left=blx;
		$('rtm1').style.top=tply;
		$('rtm1').style.width=tprx-blx;
		$('rtm1').style.height=bry-tply;
	}
	else if (Math.PI/2<=canv.phi && canv.phi<Math.PI)
	{
		$('rtm1').style.left=brx;
		$('rtm1').style.top=bly;
		$('rtm1').style.width=tplx-brx;
		$('rtm1').style.height=tpry-bly;	
	}
	else if (Math.PI<=canv.phi && canv.phi<3*Math.PI/2)
	{
		$('rtm1').style.left=tprx;
		$('rtm1').style.top=bry;
		$('rtm1').style.width=blx-tprx;
		$('rtm1').style.height=tply-bry;
	}
	else
	{
		$('rtm1').style.left=tplx;
		$('rtm1').style.top=tpry;
		$('rtm1').style.width=brx-tplx;
		$('rtm1').style.height=bly-tpry;
	}
	$('rtm1').left=parseInt($('rtm1').style.left);
	$('rtm1').top=parseInt($('rtm1').style.top);	

	gradcanv.ctx.clearRect(0,0,activewidth,activeheight);
	gradcanv.ctx.save();
	gradcanv.ctx.beginPath();
	gradcanv.ctx.translate(canv.cx,canv.cy);
	gradcanv.ctx.rotate(canv.phi);
	
	gradcanv.ctx.arc(0,0,canv.rr+r,3*Math.PI/2-t,3*Math.PI/2+t,false);
	gradcanv.ctx.lineTo((canv.rr+er)*Math.sin(t),-(canv.rr+er)*Math.cos(t));
	gradcanv.ctx.lineTo((canv.rr)*Math.sin(t+a),-(canv.rr)*Math.cos(t+a));
	gradcanv.ctx.lineTo((canv.rr-er)*Math.sin(t),-(canv.rr-er)*Math.cos(t));
	gradcanv.ctx.lineTo((canv.rr-r)*Math.sin(t),-(canv.rr-r)*Math.cos(t));
	gradcanv.ctx.arc(0,0,canv.rr-r,3*Math.PI/2+t,3*Math.PI/2-t,true);
	gradcanv.ctx.lineTo(-(canv.rr-er)*Math.sin(t),-(canv.rr-er)*Math.cos(t));
	gradcanv.ctx.lineTo(-(canv.rr)*Math.sin(t+a),-(canv.rr)*Math.cos(t+a));
	gradcanv.ctx.lineTo(-(canv.rr+er)*Math.sin(t),-(canv.rr+er)*Math.cos(t));
	gradcanv.ctx.lineTo(-(canv.rr+r)*Math.sin(t),-(canv.rr+r)*Math.cos(t));
	gradcanv.ctx.strokeStyle='black';
	gradcanv.ctx.fillStyle='white';
	
	gradcanv.ctx.moveTo(0,0);
	gradcanv.ctx.arc(0,0,4,3*Math.PI/2,7*Math.PI/2,false);
	
	gradcanv.ctx.fill();
	gradcanv.ctx.stroke();
	gradcanv.ctx.restore();
	
	$('rtm0').style.left=canv.cx-8;
	$('rtm0').style.top=canv.cy-8;
	$('rtm0').left=parseInt($('rtm0').style.left);
	$('rtm0').top=parseInt($('rtm0').style.top);
}

function removeRotate()
{
	gradcanv.ctx.clearRect(0,0,activewidth,activeheight);
	while (rtmrks >0)
	{
		if($('rtm'+(--rtmrks))) {$('rtm'+rtmrks).parentNode.removeChild($('rtm'+rtmrks))};
	}
	if($('rotMenu')) {$('rotMenu').parentNode.removeChild($('rotMenu'))};
}

function updatecenter(rtmk)
{
	var rtmkt=$(rtmk.id);
	var dx=parseInt(rtmkt.style.left)-rtmkt.left;
	var dy=parseInt(rtmkt.style.top)-rtmkt.top;
	for (var j=0; j<selected.length;j++)
	{
		selected[j].cx +=dx;
		selected[j].cy +=dy;
	}
	rtmkt.left=parseInt(rtmkt.style.left);
	rtmkt.top=parseInt(rtmkt.style.top);
	for (var j=0; j<selected.length;j++)
	{
		drawline(selected[j]);
	}
	drawrotate();
}

function updateangle(rtmk,phi)
{
	var canv=selected[0];
	var rtmkt=$(rtmk.id);
	if (isNaN(phi))
	{
		var dx=parseInt(rtmkt.style.left)+parseInt(rtmkt.style.width)/2-canv.cx;
		var dy=parseInt(rtmkt.style.top)+parseInt(rtmkt.style.height)/2-canv.cy;
		phi = arctan(dx,dy)+Math.PI/2;
		if (phi>2*Math.PI) {phi-=2*Math.PI};
	}
	
	var mxx=[];
	var mnx=[];
	var mxy=[];
	var mny=[];
	var gpind;
	var slind=0;
	for (var j=0; j<2*selected.length;j++)
	{
		mnx[j]=100000000000;
		mxx[j]=0;
		mny[j]=100000000000;
		mxy[j]=0;
	}
	for (var j=0; j<selected.length;j++)
	{
		pathrotate(selected[j],phi);
		selected[j].phi =phi;
		gpind=slind++;
		if (selected [j].group.length>0) {
											gpind=selected[j].group.pop();
											selected[j].group.push(gpind);
											gpind +=selected.length;
										 }
		if (selected[j].bleft<mnx[gpind]) {mnx[gpind]=selected[j].bleft};
		if (selected[j].bleft+selected[j].bwidth>mxx[gpind]) {mxx[gpind]=selected[j].bleft+selected[j].bwidth};
		if (selected[j].btop<mny[gpind]) {mny[gpind]=selected[j].btop};
		if (selected[j].btop+selected[j].bheight>mxy[gpind]) {mxy[gpind]=selected[j].btop+selected[j].bheight};		
 		drawline(selected[j]);
	}
	slind=0;
	for (var j=0; j<selected.length; j++)
	{
		gpind=slind++;
		if (selected [j].group.length>0) {
											gpind=selected[j].group.pop();
											selected[j].group.push(gpind);
											gpind +=selected.length;
										 }
		selected[j].bleft=mnx[gpind];
		selected[j].bwidth=mxx[gpind]-mnx[gpind];
		selected[j].btop=mny[gpind];
		selected[j].bheight=mxy[gpind]-mny[gpind];
		selected[j].removeBoundary();
		selected[j].createBoundary();
	}
	drawrotate();
}

function pathrotate(canv,phi)
{
	phi -=canv.phi;
	for (var i=3; i<canv.path.length; i++)
	{
		canv.rotated=true;
		for (var j=1; j<canv.path[i].length; j+=2)
		{
			tempxy=rotate(phi,canv.path[i][j]-canv.cx,canv.path[i][j+1]-canv.cy,'C');
			canv.path[i][j]=canv.cx+tempxy.x;
			canv.path[i][j+1]=canv.cy+tempxy.y;
		}
		tempxy=rotate(phi,canv.ox-canv.cx,canv.oy-canv.cy,'C');
		canv.ox=canv.cx+tempxy.x;
		canv.oy=canv.cy+tempxy.y;
		tempxy=rotate(phi,canv.cx-canv.cx,canv.cy-canv.cy,'C');
		canv.cx=canv.cx+tempxy.x;
		canv.cy=canv.cy+tempxy.y;
		tempxy=rotate(phi,canv.lineGrad[0]-canv.cx,canv.lineGrad[1]-canv.cy,'C');
		canv.lineGrad[0]=canv.cx+tempxy.x;
		canv.lineGrad[1]=canv.cy+tempxy.y;
		tempxy=rotate(phi,canv.lineGrad[2]-canv.cx,canv.lineGrad[3]-canv.cy,'C');
		canv.lineGrad[2]=canv.cx+tempxy.x;
		canv.lineGrad[3]=canv.cy+tempxy.y;
		tempxy=rotate(phi,canv.radGrad[0]-canv.cx,canv.radGrad[1]-canv.cy,'C');
		canv.radGrad[0]=canv.cx+tempxy.x;
		canv.radGrad[1]=canv.cy+tempxy.y;
		tempxy=rotate(phi,canv.radGrad[3]-canv.cx,canv.radGrad[4]-canv.cy,'C');
		canv.radGrad[3]=canv.cx+tempxy.x;
		canv.radGrad[4]=canv.cy+tempxy.y;
		g=getmaxmin(canv.path);	
		canv.bleft=g.mnx;
		canv.bwidth=g.mxx-g.mnx;
		canv.btop=g.mny;
		canv.bheight=g.mxy-g.mny;
	}
	
}