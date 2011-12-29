/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function sizebox()
{
	nextpic=0;
	this.sizebox=document.createElement('div');
	this.sizebox.id  = 'sizebox';
	this.sizebox.style.top=canvheight/2-120;
    this.sizebox.style.left=canvwidth/2-150;
	this.sizebox.style.width=500;
	this.sizebox.style.height=190;
	this.sizebox.style.backgroundColor="#FFFFFF";
    this.sizebox.style.border="solid black 1px"; 	
    this.sizeboxhead =document.createElement('div');
	this.sizeboxhead.id='sizeboxhead';
    this.sizeboxhead.style.left= 0; 
    this.sizeboxhead.style.top= 0;
    this.sizeboxhead.style.width=parseInt(this.sizebox.style.width)-1;
    this.sizeboxhead.style.height=25;
    this.sizeboxhead.style.backgroundColor="#000000";
	this.sizeboxhead.style.color='#FFFFFF';
	this.sizeboxhead.style.border="solid black 1px";
	
	this.sizeboxhead.innerHTML=' Canvas Style and Ratio ';


	this.sizeboxinner=document.createElement('div');
	this.sizeboxinner.style.top=30;
	this.sizeboxinner.style.left=10;
	this.sizeboxform=document.createElement('form');
	this.sizeboxform.id='sizeform';
	this.sizeboxform.name='sizeform';
	
	this.shportraitlbldiv=document.createElement('div');
   	this.shportraitlbldiv.style.left=25;
   	this.shportraitlbldiv.style.top=7;
   	this.shportraitlbldiv.innerHTML='Portrait';
   	this.shportraitindiv=document.createElement('div');
   	this.shportraitindiv.style.left=2;
   	this.shportraitindiv.style.top=7;   
   	this.shportrait=document.createElement('input');
   	this.shportrait.id='shportrait';
   	this.shportrait.type='radio';
   	this.shportrait.name='ornttype';

   	this.sizeboxform.appendChild(this.shportraitlbldiv);
   	this.sizeboxform.appendChild(this.shportraitindiv);
   	this.shportraitindiv.appendChild(this.shportrait);
   	this.shportrait.onclick=function (e) {noBubble(e);};
   	this.shportrait.onchange=function() {
	   										var p=parseFloat($('HsizeofP').innerHTML);
											$('HsizeofP').innerHTML=1+' ';
											$('WsizeofP').innerHTML=p+' ';
											$('canvasbox').style.height=100;
											$('canvasbox').style.width=100*p;
											$('canvasadjust').style.left=parseInt($('canvasbox').style.width)-4;
											$('canvasadjust').style.top=parseInt($('canvasbox').style.height)/2-4;
											$('canvasadjust').left=parseInt($('canvasadjust').style.left);
											$('canvasadjust').top=parseInt($('canvasadjust').style.top);
											$('canvasadjust').style.cursor='e-resize';
											var th =$('requdsizeheight').value;
											$('requdsizeheight').value=$('requdsizewidth').value;
											$('requdsizewidth').value=th;
											th=storedh;
											storedh=storedw;
											storedw=th;
									};
	
	
    this.shlandscapelbldiv=document.createElement('div');
	this.shlandscapelbldiv.style.left=25;
	this.shlandscapelbldiv.style.top=32;
	this.shlandscapelbldiv.innerHTML='Landscape';
	this.shlandscapeindiv=document.createElement('div');
	this.shlandscapeindiv.style.left=2;
	this.shlandscapeindiv.style.top=32;   
	this.shlandscape=document.createElement('input');
	this.shlandscape.checked=true;
	this.shlandscape.id='shlandscape';
	this.shlandscape.type='radio';
	this.shlandscape.name='ornttype';
	
	this.sizeboxform.appendChild(this.shlandscapelbldiv);
	this.sizeboxform.appendChild(this.shlandscapeindiv);
	this.shlandscapeindiv.appendChild(this.shlandscape);
	this.shlandscape.onclick=function (e) {noBubble(e);};
	this.shlandscape.onchange=function() {
	   										var p=parseFloat($('WsizeofP').innerHTML);
											$('WsizeofP').innerHTML=1 +' ';
											$('HsizeofP').innerHTML=p +' ';
											$('canvasbox').style.width=100;
											$('canvasbox').style.height=100*p;
											$('canvasadjust').style.left=parseInt($('canvasbox').style.width)/2-4;
											$('canvasadjust').style.top=parseInt($('canvasbox').style.height)-4;
											$('canvasadjust').left=parseInt($('canvasadjust').style.left);
											$('canvasadjust').top=parseInt($('canvasadjust').style.top);
											$('canvasadjust').style.cursor='n-resize';
											var th =$('requdsizeheight').value;
											$('requdsizeheight').value=$('requdsizewidth').value;
											$('requdsizewidth').value=th;
											th=storedh;
											storedh=storedw;
											storedw=th;
										 };
	
	this.sizeadjustcont=document.createElement('div');
	this.sizeadjustcont.style.left=120;
	this.sizeadjustcont.style.top=10;
	this.sizeadjustcont.style.width=120;
	this.sizeadjustcont.style.height=120;
	this.sizeadjustcont.style.border='solid black 1px';
	this.sizeadjustcont.style.backgroundColor='#999999';
	this.sizeboxform.appendChild(this.sizeadjustcont);	
	
	this.sizeadjustdiv=document.createElement('div');
	this.sizeadjustdiv.id='canvasbox';
	this.sizeadjustdiv.style.left=10;
	this.sizeadjustdiv.style.top=10;
	this.sizeadjustdiv.style.fontSize=0;
	this.sizeadjustdiv.style.width=100;
	this.sizeadjustdiv.style.height=50;
	this.sizeadjustdiv.style.border='solid black 1px';
	this.sizeadjustdiv.style.backgroundColor='white';
	this.sizeadjustcont.appendChild(this.sizeadjustdiv);

	this.sizeadjust=document.createElement('div');
	this.sizeadjust.id='canvasadjust';
	this.sizeadjust.style.left=parseInt(this.sizeadjustdiv.style.width)/2-4;
	this.sizeadjust.style.top=parseInt(this.sizeadjustdiv.style.height)-4;
	this.sizeadjust.left=parseInt(this.sizeadjust.style.left);
	this.sizeadjust.top=parseInt(this.sizeadjust.style.top);
	this.sizeadjust.style.width=8;
	this.sizeadjust.style.height=8;
	this.sizeadjust.style.border='solid black 1px';
	this.sizeadjust.style.backgroundColor='white';
	this.sizeadjust.style.cursor='n-resize';
	this.sizeadjustdiv.appendChild(this.sizeadjust);
	
	this.sizeboxlabelwidth=document.createElement('div');
	this.sizeboxlabelwidth.innerHTML='Width ';
	this.sizeboxlabelwidth.style.top=67;
	this.sizeboxlabelwidth.style.left=10;
	this.sizeboxlabelwidthpx=document.createElement('div');
	this.sizeboxlabelwidthpx.id='WsizeofP';
	this.sizeboxlabelwidthpx.innerHTML='1 ';
	this.sizeboxlabelwidthpx.style.top=67;
	this.sizeboxlabelwidthpx.style.left=50;	
	this.sizeboxlabelwidthpx.style.width=60;
	this.sizeboxlabelwidthpx.style.textAlign='right';
	
	this.sizeboxlabelheight=document.createElement('div');
	this.sizeboxlabelheight.innerHTML='Height ';
	this.sizeboxlabelheight.style.top=92;
	this.sizeboxlabelheight.style.left=10;
	this.sizeboxlabelheightpx=document.createElement('div');
	this.sizeboxlabelheightpx.id='HsizeofP';
	this.sizeboxlabelheightpx.innerHTML='0.5 ';
	this.sizeboxlabelheightpx.style.top=92;
	this.sizeboxlabelheightpx.style.left=50;		
	this.sizeboxlabelheightpx.style.width=60;
	this.sizeboxlabelheightpx.style.textAlign='right';	
	
    this.sizesubmit=document.createElement('input');
    this.sizesubmit.type="button";
    this.sizesubmit.value="OK";
    this.sizesubmit.onclick=function() {
											$('toolbar').style.visibility='visible';
											$('anibar').style.visibility='visible';
											adjust();
											$('grid').style.visibility='visible';
											$('menushape').style.visibility='visible';
											$('sizebox').parentNode.removeChild($('sizebox'));
										};	
	$('bodydiv').appendChild(this.sizebox);
	this.sizebox.appendChild(this.sizeboxhead);
	this.sizebox.appendChild(this.sizeboxinner);
	this.sizeboxform.appendChild(this.sizeboxlabelwidth);
	this.sizeboxform.appendChild(this.sizeboxlabelheight);
	this.sizeboxform.appendChild(this.sizeboxlabelwidthpx);
	this.sizeboxform.appendChild(this.sizeboxlabelheightpx);	
	this.sizeboxinner.appendChild(this.sizeboxform);
	this.sizeboxform.appendChild(document.createElement('br'));
	this.sizeboxform.appendChild(document.createElement('br'));
	this.sizeboxform.appendChild(document.createElement('br'));
	this.sizeboxform.appendChild(document.createElement('br'));
	this.sizeboxform.appendChild(document.createElement('br'));
	this.sizeboxform.appendChild(document.createElement('br'));
	this.sizeboxform.appendChild(this.sizesubmit);
	
	this.requdsizeboxtitle=document.createElement('div');
	this.requdsizeboxtitle.style.top=30;
	this.requdsizeboxtitle.style.left=280;
	this.requdsizeboxtitle.innerHTML='Canvas Size for Application';
	this.sizebox.appendChild(this.requdsizeboxtitle);
	this.requdsizeboxinner=document.createElement('div');
	this.requdsizeboxinner.style.top=60;
	this.requdsizeboxinner.style.left=280;
	this.requdsizeboxform=document.createElement('form');
	this.requdsizeboxform.id='requdsizeform';
	this.requdsizeboxform.name='requdsizeform';
	this.requdsizeboxlabelwidth=document.createElement('div');
	this.requdsizeboxlabelwidth.innerHTML='Width ';
	this.requdsizeboxlabelwidth.style.top=2;
	this.requdsizeboxlabelwidth.style.left=2;
	this.requdsizewidthdiv=document.createElement('div');
	this.requdsizeboxinputwidth=document.createElement('Input');
	this.requdsizeboxinputwidth.onfocus=function() {this.select()};
	this.requdsizeboxinputwidth.onchange=function() {sizechange('w')};	
	this.requdsizewidthdiv.style.top=2;
	this.requdsizewidthdiv.style.left=50;
	this.requdsizeboxinputwidth.type='text';
	this.requdsizeboxinputwidth.id='requdsizewidth';
	this.requdsizeboxinputwidth.size=5;
	this.requdsizeboxinputwidth.style.textAlign='right';
	this.requdsizeboxinputwidth.value=Math.floor(masterwidth/100)*100;
	storedw=Math.floor(masterwidth/100)*100;
	this.requdsizeboxlabelwidthpx=document.createElement('div');
	this.requdsizeboxlabelwidthpx.innerHTML=' pixels ';
	this.requdsizeboxlabelwidthpx.style.top=2;
	this.requdsizeboxlabelwidthpx.style.left=120;	
	this.requdsizeboxlabelheight=document.createElement('div');
	this.requdsizeboxlabelheight.innerHTML='Height ';
	this.requdsizeboxlabelheight.style.top=25;
	this.requdsizeboxlabelheight.style.left=2;
	this.requdsizeheightdiv=document.createElement('div');
	this.requdsizeboxinputheight=document.createElement('Input');
	this.requdsizeboxinputheight.onfocus=function() {this.select()};
	this.requdsizeboxinputheight.onchange=function() {sizechange('h')};		
	this.requdsizeboxinputheight.type='text';
	this.requdsizeheightdiv.style.top=25;
	this.requdsizeheightdiv.style.left=50;
	this.requdsizeboxinputheight.id='requdsizeheight';
	this.requdsizeboxinputheight.size=5;
	this.requdsizeboxinputheight.style.textAlign='right';
	this.requdsizeboxinputheight.value=this.requdsizeboxinputwidth.value/2;
	storedh=parseInt(this.requdsizeboxinputheight.value);
	this.requdsizeboxlabelheightpx=document.createElement('div');
	this.requdsizeboxlabelheightpx.innerHTML=' pixels ';
	this.requdsizeboxlabelheightpx.style.top=25;
	this.requdsizeboxlabelheightpx.style.left=120;		
	this.sizebox.appendChild(this.requdsizeboxinner);
	
	this.requdsizeactualdiv=document.createElement('div');
	this.requdsizeboxinputactual=document.createElement('Input');
	this.requdsizeboxinputactual.type='checkbox';
	this.requdsizeactualdiv.style.top=82;
	this.requdsizeactualdiv.style.left=2;
	this.requdsizeboxinputactual.id='requdsizeactual';
	this.requdsizeboxinputactual.size=5;
	this.requdsizeboxinputactual.checked=false;
	this.requdsizeboxlabelactualpx=document.createElement('div');
	this.requdsizeboxlabelactualpx.innerHTML=' Draw using actual canvas size ';
	this.requdsizeboxlabelactualpx.style.top=80;
	this.requdsizeboxlabelactualpx.style.left=25;
	this.requdsizeboxlabelactualpx.style.width=180;

	this.requdsizeboxinner.appendChild(this.requdsizeboxform);
	this.requdsizeboxform.appendChild(this.requdsizeboxlabelwidth);
	this.requdsizeboxform.appendChild(this.requdsizewidthdiv);
	this.requdsizewidthdiv.appendChild(this.requdsizeboxinputwidth);
	this.requdsizeboxform.appendChild(this.requdsizeboxlabelheight);
	this.requdsizeboxform.appendChild(this.requdsizeheightdiv);
	this.requdsizeactualdiv.appendChild(this.requdsizeboxinputactual);
	this.requdsizeboxform.appendChild(this.requdsizeboxlabelwidthpx);
	this.requdsizeboxform.appendChild(this.requdsizeboxlabelheightpx);
	this.requdsizeheightdiv.appendChild(this.requdsizeboxinputheight);

}

function sizechange(side)
{
	var nw=parseInt($('requdsizewidth').value);
	var nh=parseInt($('requdsizeheight').value);
	if (nw>50*maxwidth)
	{
		alert('This value is too large ');
		$('requdsizewidth').value=storedw;
		return;
	}
	if (nh>50*maxheight)
	{
		alert('This value is too large');
		$('requdsizeheight').value=storedh;
		return;
	}
	if (side=='w')
	{
		nh *=nw/storedw;
		$('requdsizeheight').value=nh;
		
	}
	else
	{
		nw *=nh/storedh;
		$('requdsizewidth').value=nw;
		
	}
	storedw=nw;
	storedh=nh;
	
	if (nw>nh)
	{
		$('shlandscape').checked=true;
		$('HsizeofP').innerHTML=Math.round(nh*100/nw)/100 + '';
		$('WsizeofP').innerHTML=1+' ';
		masterwidth=nw;
		masterheight=nw
		$('canvasbox').style.width=100;
		$('canvasbox').style.height=Math.round(nh*100/nw);
		$('canvasadjust').style.left=parseInt($('canvasbox').style.width)/2-4;
		$('canvasadjust').style.top=parseInt($('canvasbox').style.height)-4;
		$('canvasadjust').left=parseInt($('canvasadjust').style.left);
		$('canvasadjust').top=parseInt($('canvasadjust').style.top);
		$('canvasadjust').style.cursor='n-resize';
	}
	else
	{
		$('shportrait').checked=true;
		$('WsizeofP').innerHTML=Math.round(nw*100/nh)/100 + '';
		$('HsizeofP').innerHTML=1;
		masterwidth=nh;
		masterheight=nh;
		$('canvasbox').style.height=100;
		$('canvasbox').style.width=Math.round(nw*100/nh);
		$('canvasadjust').style.left=parseInt($('canvasbox').style.width)-4;
		$('canvasadjust').style.top=parseInt($('canvasbox').style.height)/2-4;
		$('canvasadjust').left=parseInt($('canvasadjust').style.left);
		$('canvasadjust').top=parseInt($('canvasadjust').style.top);
		$('canvasadjust').style.cursor='e-resize';
		
	}
}

function adjust()
{
  var rw=$('requdsizewidth').value;
  var rh=$('requdsizeheight').value;
  magscale=100;
  w=rw;
  h=rh;
  actualwidth=rw;
  actualheight=rh;
  scale(w,h);
}

function scale(w,h)
{
	if ((w<=50*maxwidth) && (h<=50*maxheight))
	{
		canvwidth=w;
		canvheight=h;
		$('canvasarea').style.width=w
		$('canvasarea').style.height=h;
		$('canvasarea').style.left=(screen.width - parseInt($('canvasarea').style.width) )/2;
		$('canvasarea').style.top= (screen.height -parseInt($('canvasarea').style.height))/2-78;
		if (parseInt($('canvasarea').style.left)<0) {$('canvasarea').style.left=1};
		if (parseInt($('canvasarea').style.top)<52) {$('canvasarea').style.top=53};
		canvleft=parseInt($('canvasarea').style.left);
		canvtop=parseInt($('canvasarea').style.top);
		$('canvasframe').style.zIndex=20000000;
		$('canvasframe').style.width=canvwidth;
		$('canvasframe').style.height=canvheight;
		$('canvasframe').style.left=canvleft;
		$('canvasframe').style.top= canvtop;
		
		activewidth=maxwidth;
		activeheight=maxheight;

		$('bodydiv').style.width=activewidth;
		$('bodydiv').style.height=activeheight-52;
		
		$('drawarea').style.width=activewidth;
		$('drawarea').style.height=activeheight-52;

		
		gradcanv.width=activewidth;
   		gradcanv.height=activeheight-52;

		gridcanv.width=activewidth;
   		gridcanv.height=activeheight-52;
	

	} 
	else 
	{
		var mxms=document.createElement('div');
		mxms.innerHTML='Values too large';
		mxms.style.top=60;
		mxms.style.left=45;
		mxms.style.width=143;
	}
}
