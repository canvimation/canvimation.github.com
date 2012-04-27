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
										this.style.cursor="move";
										$("frontmarkerdrop").onclick=function(e) {noBubble(e)};
									};
   this.elmRef.onmouseout=function(){
	   									this.style.cursor="default";
	   									$("frontmarkerdrop").onclick=function(e) {
	   																			noBubble(e);
	   																			checkBoundary(shiftdown(e),getPosition(e));
	   																			BACKDROP.Canvas.ctx.clearRect(0,0,SCRW,SCRH);
	   																			removeRotate();
	   																			$("frontmarkerdrop").style.visibility="hidden";
	   																			$("backstage").style.visibility="hidden";
	   																			$("boundarydrop").style.visibility="visible";
	   																		}
									};	
   return this.elmRef
}

function shaperotate()
{
	removeRotate();
	removeGradLine();
	$("rotatebox").style.visibility="visible";
	var shape=SELECTEDSHAPE;
	var group=shape.group;
	$("rotateCentre").style.left=group.centreOfRotation.x-6;
	$("rotateCentre").style.top=group.centreOfRotation.y-6;
	$("rotateMove").style.left=group.centreOfRotation.x+ROTATIONRADIUS*Math.cos(group.phi)-6;
	$("rotateMove").style.top=group.centreOfRotation.y+ROTATIONRADIUS*Math.sin(group.phi)-6;
	$("rotateCentre").style.visibility="visible";
	$("rotateMove").style.visibility="visible";
	$("frontmarkerdrop").style.visibility="visible";
	$("rotateCentre").left=parseInt($("rotateCentre").style.left);
	$("rotateCentre").top=parseInt($("rotateCentre").style.top);
	$("rotateMove").left=parseInt($("rotateMove").style.left);
	$("rotateMove").top=parseInt($("rotateMove").style.top);
	$("rotateangle").value=Math.round(group.phi*180/Math.PI);
}

function removeRotate()
{
	$("rotateCentre").style.visibility="hidden";
	$("rotateMove").style.visibility="hidden";
	//$("frontmarkerdrop").style.visibility="hidden";
}

function updatecenter()
{
	var cm=$("rotateCentre");
	var mm=$("rotateMove");
	var dx=parseInt(cm.style.left)-cm.left;
	var dy=parseInt(cm.style.top)-cm.top;
	cm.left=parseInt(cm.style.left);
	cm.top=parseInt(cm.style.top);
	mm.left+=dx;
	mm.top+=dy;
	mm.style.left=mm.left;
	mm.style.top=mm.top;
	for (var groupName in SELECTED)
	{
		SELECTED[groupName].centreOfRotation.x +=dx;
		SELECTED[groupName].centreOfRotation.y +=dy;
	}
}

function updateangle(phi)
{
	var shape=SELECTEDSHAPE;
	var mm=$("rotateMove");
	if (arguments.length==0)
	{
		var dx=parseInt(mm.style.left)+6-shape.group.centreOfRotation.x;
		var dy=parseInt(mm.style.top)+6-shape.group.centreOfRotation.y;
		phi = arctan(dy,dx);
	}
	else
	{
		phi*=Math.PI/180;
		
	}
	
	mm.left=shape.group.centreOfRotation.x+ROTATIONRADIUS*Math.cos(phi)-6;
	mm.top=shape.group.centreOfRotation.y+ROTATIONRADIUS*Math.sin(phi)-6;
	mm.style.left=mm.left;
	mm.style.top=mm.top;
	
	for (var groupName in SELECTED)
	{
		var group=SELECTED[groupName];
		
		group.groupRotate(phi-group.phi);
		group.phi=phi;
		$("rotateangle").value=Math.round(group.phi*180/Math.PI);
	}

}

