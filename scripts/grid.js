/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function setgrid()
{
	var gridb = new gridbox();
	DDgridb=new YAHOO.util.DD('gridbox');
   	DDgridb.setHandleElId('gridboxhead');
}

function gridbox()
{
	if($('gridbox')) {$('gridbox').parentNode.removeChild($('gridbox'))};
	this.gridbox=document.createElement('div');
	this.gridbox.id  = 'gridbox';
	this.gridbox.style.top=canvheight/2-80;
    this.gridbox.style.left= canvwidth/2-50;
	this.gridbox.style.width=200;
	this.gridbox.style.height=220;
	this.gridbox.style.zIndex=20000012;
	this.gridbox.style.backgroundColor='#FFFFFF'; 
    this.gridbox.onclick=function (e) {noBubble(e);}; 	
    this.gridboxhead =document.createElement('div');
	this.gridboxhead.id='gridboxhead';
    this.gridboxhead.style.left= 0; 
    this.gridboxhead.style.top= 0;
    this.gridboxhead.style.width=parseInt(this.gridbox.style.width)-1;
    this.gridboxhead.style.height=25;
    this.gridboxhead.style.backgroundColor="#000000";
	this.gridboxhead.style.color='#FFFFFF';
	this.gridboxhead.style.border="solid black 1px";
	this.gridboxhead.innerHTML=' Canvas Grid ';

   this.gridClose = document.createElement('div')
   this.gridClose.id  = 'gridclose';
   this.gridClose.style.left= parseInt(this.gridbox.style.width)-parseInt(this.gridboxhead.style.height)-1; 
   this.gridClose.style.top= 0;
   this.gridClose.style.width=parseInt(this.gridboxhead.style.height);
   this.gridClose.style.height=this.gridboxhead.style.height;
   this.gridClose.style.backgroundColor="#000000";
   this.gridClose.style.borderLeft="solid #FFFFFF 1px";
   this.gridClose.onclick=function() {
	   									$('gridbox').parentNode.removeChild($('gridbox'));
									};
   this.gridImg=document.createElement('img');
   this.gridImg.style.position="absolute";
   this.gridImg.src='assets/x.png';
   this.gridImg.style.left=2;
   this.gridImg.style.top=2;
   
   this.gridUpDown = document.createElement('div');
   this.gridUpDown.id = 'gridud';
   this.gridUpDown.style.left= parseInt(this.gridbox.style.width)-2*parseInt(this.gridboxhead.style.height)-2; 
   this.gridUpDown.style.top= 0;
   this.gridUpDown.style.width=25;
   this.gridUpDown.style.height=this.gridboxhead.style.height;
   this.gridUpDown.style.backgroundColor="#000000";
   this.gridUpDown.style.borderLeft="solid #FFFFFF 1px";
   this.gridUpDown.onclick = function() {
	   										if (this.firstChild.id=='imggridup')
											{
												this.firstChild.id='imggriddown';
												this.firstChild.src='assets/down.png';
												setTimeout(function () {gridclosediv()},50);
											}
											else
											{
												this.firstChild.id='imggridup';
												this.firstChild.src='assets/up.png';
												setTimeout(function () {gridopendiv()},50);
											};
   										}
   
   this.gridImg2=document.createElement('img');
   this.gridImg2.id='imggridup';
   this.gridImg2.style.position="absolute";
   this.gridImg2.src='assets/up.png'
   this.gridImg2.style.left=2;
   this.gridImg2.style.top=2; 



	this.gridboxinner=document.createElement('div');
	this.gridboxinner.id='gridinner';
	this.gridboxinner.style.top=26;
	this.gridboxinner.style.left=0;
	this.gridboxinner.style.height=195;
	this.gridboxinner.style.width=parseInt(this.gridbox.style.width)-1;
    this.gridboxinner.style.border="solid black 1px";
    this.gridboxinner.style.backgroundColor='white';
	this.gridbox.appendChild(this.gridboxinner);
	
	
	this.gridboxform=document.createElement('form');
	this.gridboxform.id='gridform';
	this.gridboxform.name='gridform';
	
	
   this.gridlbldiv=document.createElement('div');
   this.gridlbldiv.style.left=7;
   this.gridlbldiv.style.top=7;
   this.gridlbldiv.innerHTML='Grid';
   this.gridonindiv=document.createElement('div');
   this.gridonindiv.style.left=35;
   this.gridonindiv.style.top=7;   
   this.gridon=document.createElement('input');
   this.gridon.id='gridon';
   this.gridon.type='radio';
   this.gridon.name='gridonoff';
   this.gridon.onclick=function (e) {noBubble(e);};
   this.gridonlbldiv=document.createElement('div');
   this.gridonlbldiv.style.left=55;
   this.gridonlbldiv.style.top=7;
   this.gridonlbldiv.innerHTML='On';

   this.gridboxform.appendChild(this.gridlbldiv);
   this.gridboxform.appendChild(this.gridonlbldiv);
   this.gridboxform.appendChild(this.gridonindiv);
   this.gridonindiv.appendChild(this.gridon);

   this.gridoffindiv=document.createElement('div');
   this.gridoffindiv.style.left=105;
   this.gridoffindiv.style.top=7;   
   this.gridoff=document.createElement('input');
   this.gridoff.id='gridoff';
   this.gridoff.type='radio';
   this.gridoff.name='gridonoff';
   this.gridoff.onclick=function (e) {noBubble(e);};
   this.gridofflbldiv=document.createElement('div');
   this.gridofflbldiv.style.left=125;
   this.gridofflbldiv.style.top=7;
   this.gridofflbldiv.innerHTML='Off';

   this.gridboxform.appendChild(this.gridofflbldiv);
   this.gridboxform.appendChild(this.gridoffindiv);
   this.gridoffindiv.appendChild(this.gridoff);
   
   if (grdon)
   {
	   this.gridon.checked=true;
   }
   else
   {
	   this.gridoff.checked=true;
   }

   this.showgridindiv=document.createElement('div');
   this.showgridindiv.style.left=35;
   this.showgridindiv.style.top=32;   
   this.showgrid=document.createElement('input');
   this.showgrid.id='showgrid';
   this.showgrid.type='radio';
   this.showgrid.name='showhide';
   this.showgrid.onclick=function (e) {noBubble(e);};
   this.showgridlbldiv=document.createElement('div');
   this.showgridlbldiv.style.left=55;
   this.showgridlbldiv.style.top=32;
   this.showgridlbldiv.innerHTML='Show';

   this.gridboxform.appendChild(this.showgridlbldiv);
   this.gridboxform.appendChild(this.showgridindiv);
   this.showgridindiv.appendChild(this.showgrid);

   this.hidegridindiv=document.createElement('div');
   this.hidegridindiv.style.left=105;
   this.hidegridindiv.style.top=32;   
   this.hidegrid=document.createElement('input');
   this.hidegrid.id='hidegrid';
   this.hidegrid.type='radio';
   this.hidegrid.name='showhide';
   this.hidegrid.onclick=function (e) {noBubble(e);};
   this.hidegridlbldiv=document.createElement('div');
   this.hidegridlbldiv.style.left=125;
   this.hidegridlbldiv.style.top=32;
   this.hidegridlbldiv.innerHTML='Hide';
   
   if (showgrd)
   {
	   this.showgrid.checked=true;
   }
   else
   {
	   this.hidegrid.checked=true;
   }

   this.gridboxform.appendChild(this.hidegridlbldiv);
   this.gridboxform.appendChild(this.hidegridindiv);
   this.hidegridindiv.appendChild(this.hidegrid);

	this.gridboxlabelwidth=document.createElement('div');
	this.gridboxlabelwidth.innerHTML='Width ';
	this.gridboxlabelwidth.style.top=77;
	this.gridboxlabelwidth.style.left=7;
	this.gridwidthdiv=document.createElement('div');
	this.gridboxinputwidth=document.createElement('Input');
	this.gridwidthdiv.style.top=77
	this.gridwidthdiv.style.left=55;	
	this.gridboxinputwidth.type='text';
	this.gridboxinputwidth.id='gridwidth';
	this.gridboxinputwidth.size=5;
	this.gridboxinputwidth.style.textAlign='right';
	this.gridboxinputwidth.value=30;
	this.gridboxlabelwidthpx=document.createElement('div');
	this.gridboxlabelwidthpx.innerHTML=' pixels ';
	this.gridboxlabelwidthpx.style.top=77;
	this.gridboxlabelwidthpx.style.left=125;
	
	
	this.gridboxlabelheight=document.createElement('div');
	this.gridboxlabelheight.innerHTML='Height ';
	this.gridboxlabelheight.style.top=102;
	this.gridboxlabelheight.style.left=7;
	this.gridheightdiv=document.createElement('div');
	this.gridboxinputheight=document.createElement('Input');
	this.gridboxinputheight.type='text';
	this.gridheightdiv.style.top=102;
	this.gridheightdiv.style.left=55;
	this.gridboxinputheight.id='gridheight';
	this.gridboxinputheight.size=5;
	this.gridboxinputheight.style.textAlign='right';
	this.gridboxinputheight.value=30;
	this.gridboxlabelheightpx=document.createElement('div');
	this.gridboxlabelheightpx.innerHTML=' pixels ';
	this.gridboxlabelheightpx.style.top=102;
	this.gridboxlabelheightpx.style.left=125;
	
	this.gridboxlabelzoom=document.createElement('div');
	this.gridboxlabelzoom.innerHTML='x zoom ';
	this.gridboxlabelzoom.style.top=117;
	this.gridboxlabelzoom.style.left=75;
	
	
   this.gridOKindiv=document.createElement('div');
   this.gridOKindiv.style.left=70;
   this.gridOKindiv.style.top=147;   
   this.gridOK=document.createElement('input');
   this.gridOK.id='gridOK';
   this.gridOK.type='button';
   this.gridOK.style.width='auto';
   this.gridOK.style.overflow='visible';
   this.gridOK.value='\u00A0OK\u00A0';
   this.gridOK.onclick=function() {
	   								drawgrid(magscale*$('gridwidth').value/100,magscale*$('gridheight').value/100);
									$('gridbox').parentNode.removeChild($('gridbox'));
									};
   this.gridboxform.appendChild(this.gridOKindiv);
   this.gridOKindiv.appendChild(this.gridOK);


   this.gridcancelindiv=document.createElement('div');
   this.gridcancelindiv.style.left=120;
   this.gridcancelindiv.style.top=147;   
   this.gridcancel=document.createElement('input');
   this.gridcancel.id='gridcancel';
   this.gridcancel.type='button';
   this.gridcancel.size=10;
   this.gridcancel.value='Cancel';
   this.gridcancel.onclick=function () {$('gridbox').parentNode.removeChild($('gridbox'))};
   this.gridboxform.appendChild(this.gridcancelindiv);
   this.gridcancelindiv.appendChild(this.gridcancel);
	
	
	
	$('bodydiv').appendChild(this.gridbox);
	this.gridbox.appendChild(this.gridboxhead);
	this.gridboxinner.appendChild(this.gridboxform);
	this.gridboxform.appendChild(this.gridboxlabelwidth);
	this.gridboxform.appendChild(this.gridwidthdiv);
	this.gridwidthdiv.appendChild(this.gridboxinputwidth);
	this.gridboxform.appendChild(this.gridboxlabelheight);
	this.gridboxform.appendChild(this.gridheightdiv);
	this.gridboxform.appendChild(this.gridboxlabelwidthpx);
	this.gridboxform.appendChild(this.gridboxlabelheightpx);
	this.gridheightdiv.appendChild(this.gridboxinputheight);
	this.gridboxform.appendChild(this.gridboxlabelzoom);
   this.gridboxhead.appendChild(this.gridClose);
   this.gridClose.appendChild(this.gridImg);
   this.gridboxhead.appendChild(this.gridUpDown);
   this.gridUpDown.appendChild(this.gridImg2);
   
   this.gridbox.style.clip='rect(0,300,'+(parseInt(this.gridbox.style.height)+20)+',0)';
   return this.gridbox;


}


function gridclosediv()
{
	var gbody=$('gridinner'); 
	if (parseInt(gbody.style.top)+parseInt(gbody.style.height)>25)
	{
		gbody.style.top = parseInt(gbody.style.top)-2;
		setTimeout(function () {gridclosediv()},10)
	}
}

function gridopendiv()
{
	var gbody=$('gridinner'); 
	if (parseInt(gbody.style.top)<25)
	{
		gbody.style.top = parseInt(gbody.style.top)+2;
		setTimeout(function () {gridopendiv()},10)
	}
}

function drawgrid(w,h)
{
	
	w=parseInt(w);
	h=parseInt(h);
	xgrid=1;
	ygrid=1;
	grdon=false;
	showgrd=false;
	if($('gridon').checked) {
													xgrid=w; 
													ygrid=h
													grdon=true;
												   };
	var cw=maxwidth;
	var ch=maxheight;
	gridcanvas.ctx.clearRect(0,0,cw,ch);
	if ($('showgrid').checked)
	{
		showgrd=true;
		gridcanvas.ctx.beginPath();
	
		gridcanvas.ctx.strokeStyle='rgb(64,255,255)';
		for (var x=0; x<cw; x +=w)
		{
			gridcanvas.ctx.moveTo(x,0);
			gridcanvas.ctx.lineTo(x,ch);
		}
		for (var y=0; y<ch; y +=h)
		{
			gridcanvas.ctx.moveTo(0,y);
			gridcanvas.ctx.lineTo(cw,y);
		}	
		gridcanvas.ctx.stroke();
	}
}
