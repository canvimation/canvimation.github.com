/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function gradMenu()
{
   this.elmRef = document.createElement('div');
   this.elmRef.id  = 'gmenu';
   this.elmRef.style.left= (maxwidth-155)/3; 
   this.elmRef.style.top= 50+(maxheight-155)/2;
   this.elmRef.style.width=250;
   this.elmRef.style.height=145;
   
   this.elmRef.style.zIndex=20000002;
   this.elmRef.parentdiv=parentselected;
   this.elmRef.style.backgroundColor="#FFFFFF"; 
   
   this.elmRef.onmouseover=function() {inln=true};
   this.elmRef.onmouseout=function() {inln=false}; 
   $('bodydiv').appendChild(this.elmRef);
   
   this.elmHead =document.createElement('div');
   this.elmHead.id  = 'ghead';
   this.elmHead.style.left= 0; 
   this.elmHead.style.top= 0;
   this.elmHead.style.width=parseInt(this.elmRef.style.width)-1;
   this.elmHead.style.height=25;
   this.elmHead.style.backgroundColor='black';
   this.elmHead.style.border="solid black 1px"; 
   this.elmHead.style.color='white';
   this.elmHead.innerHTML='\u00A0 Colour Stop Points';
   
   this.elmClose = document.createElement('div')
   this.elmClose.id  = 'gclose';
   this.elmClose.style.left= parseInt(this.elmRef.style.width)-parseInt(this.elmHead.style.height)-1; 
   this.elmClose.style.top= 0;
   this.elmClose.style.width=parseInt(this.elmHead.style.height);
   this.elmClose.style.height=this.elmHead.style.height;
   this.elmClose.style.backgroundColor="#000000";
   this.elmClose.style.borderLeft="solid #FFFFFF 1px";
   this.elmClose.onclick=function() {
	   									inln=false;
										$('gmenu').parentNode.removeChild($('gmenu'));
									};
   this.elmImg=document.createElement('img');
   this.elmImg.style.position="absolute";
   this.elmImg.src='assets/x.png';
   this.elmImg.style.left=2;
   this.elmImg.style.top=2;
   
   this.elmUpDown = document.createElement('div');
   this.elmUpDown.id = 'gud';
   this.elmUpDown.style.left= parseInt(this.elmRef.style.width)-2*parseInt(this.elmHead.style.height)-2; 
   this.elmUpDown.style.top= 0;
   this.elmUpDown.style.width=25;
   this.elmUpDown.style.height=this.elmHead.style.height;
   this.elmUpDown.style.backgroundColor="#000000";
   this.elmUpDown.style.borderLeft="solid #FFFFFF 1px";
   this.elmUpDown.onclick = function() {
	   										if (this.firstChild.id=='imggup')
											{
												this.firstChild.id='imggdown';
												this.firstChild.src='assets/down.png';
												setTimeout(function () {gclosediv()},50);
											}
											else
											{
												this.firstChild.id='imggup';
												this.firstChild.src='assets/up.png';
												setTimeout(function () {gopendiv()},50);
											};
   										}
   
   this.elmImg2=document.createElement('img');
   this.elmImg2.id='imggup';
   this.elmImg2.style.position="absolute";
   this.elmImg2.src='assets/up.png'
   this.elmImg2.style.left=2;
   this.elmImg2.style.top=2;   
   
   this.elmBody =document.createElement('div');
   this.elmBody.id  = 'gbody';
   this.elmBody.style.left= 0; 
   this.elmBody.style.top= 25;;
   this.elmBody.style.width=parseInt(this.elmRef.style.width)-1;
   this.elmBody.style.height=120;
   this.elmBody.style.border="solid black 1px";
   this.elmBody.style.backgroundColor='white'; 
   $('gmenu').appendChild(this.elmBody); 
  
   this.gform =document.createElement('div');
   this.gform.id  = 'gform';
   this.gform.style.left= 0; 
   this.gform.style.top= 0
   this.gform.style.width=parseInt(this.elmRef.style.width)-1;
   this.gform.style.height=this.elmBody.style.height;
   $('gbody').appendChild(this.gform);
   
   this.glinearlbldiv=document.createElement('div');
   this.glinearlbldiv.style.left=2;
   this.glinearlbldiv.style.top=7;
   this.glinearlbldiv.innerHTML='Linear Gradient Fill';
   this.glinearindiv=document.createElement('div');
   this.glinearindiv.style.left=120;
   this.glinearindiv.style.top=7;   
   this.glinear=document.createElement('input');
   this.glinear.id='glinear';
   this.glinear.type='radio';
   this.glinear.name='gradtype';

   this.gform.appendChild(this.glinearlbldiv);
   this.gform.appendChild(this.glinearindiv);
   this.glinearindiv.appendChild(this.glinear);
   this.glinear.onclick=function (e) {noBubble(e);};
   this.glinear.onchange=function() {
	   									for (var i=0;i<selected.length;i++)
										{
											selected[i].linearfill=true;
										}
										removeGradLine();
										showGradLine(selected[0]);
										$('colorheadtext').innerHTML='\u00A0 Gradient Stop Colour\u00A0 - Linear';
									};
								   
   if (ieb)
   {
	   	this.gradiallbldiv=document.createElement('div');
   		this.gradiallbldiv.style.left=2;
   		this.gradiallbldiv.style.top=32;
   		this.gradiallbldiv.innerHTML='Excanvas for Internet Explorer does not support Radial Fill';
		this.gform.appendChild(this.gradiallbldiv);
   }
   else
   {
	    this.gradiallbldiv=document.createElement('div');
   		this.gradiallbldiv.style.left=2;
   		this.gradiallbldiv.style.top=32;
   		this.gradiallbldiv.innerHTML='Radial Gradient Fill';
   		this.gradialindiv=document.createElement('div');
   		this.gradialindiv.style.left=120;
   		this.gradialindiv.style.top=32;   
   		this.gradial=document.createElement('input');
   		this.gradial.id='gradial';
   		this.gradial.type='radio';
   		this.gradial.name='gradtype';


   		this.gform.appendChild(this.gradiallbldiv);
   		this.gform.appendChild(this.gradialindiv);
   		this.gradialindiv.appendChild(this.gradial);
   		this.gradial.onclick=function (e) {noBubble(e);};
   		this.gradial.onchange=function() {
	   										for (var i=0;i<selected.length;i++)
											{
												selected[i].linearfill=false;
											}
											removeGradLine();
											showGradLine(selected[0]);
											$('colorheadtext').innerHTML='\u00A0 Gradient Stop Colour\u00A0 - Radial';
										};
   }
   
   if (selected[0].linearfill)
   {
	   this.glinear.checked=true;
   }
   else
   {
	   this.gradial.checked=true;
   }
 
   this.gAddindiv=document.createElement('div');
   this.gAddindiv.style.left=2;
   this.gAddindiv.style.top=82;   
   this.gAdd=document.createElement('input');
   this.gAdd.id='gAdd';
   this.gAdd.type='button';
   this.gAdd.style.width='auto';
   this.gAdd.style.overflow='visible';
   this.gAdd.value='\u00A0Add Colour Stop Point\u00A0';
   this.gAdd.onclick=function () {addpoint()};
   this.gform.appendChild(this.gAddindiv);
   this.gAddindiv.appendChild(this.gAdd);
   this.gAdd.style.visibility='visible';
   if (selected[0].stopn==selected[0].colorStops.length-1)
   {
	   this.gAdd.style.visibility='hidden';
   }

   this.gcancelindiv=document.createElement('div');
   this.gcancelindiv.style.left=165;
   this.gcancelindiv.style.top=82;   
   this.gcancel=document.createElement('input');
   this.gcancel.id='gcancel';
   this.gcancel.type='button';
   this.gcancel.size=10;
   this.gcancel.value='Cancel';
   this.gcancel.onclick=function () {inln=false;$('gmenu').parentNode.removeChild($('gmenu'))};
   this.gform.appendChild(this.gcancelindiv);
   this.gcancelindiv.appendChild(this.gcancel);

   $('gmenu').appendChild(this.elmHead);
   $('ghead').appendChild(this.elmClose);
   $('gclose').appendChild(this.elmImg);
   $('ghead').appendChild(this.elmUpDown);
   $('gud').appendChild(this.elmImg2);
   
   this.elmRef.style.clip='rect(0,300,'+(parseInt(this.elmRef.style.height)+20)+',0)';
   return this.elmRef;  
   
}

function gclosediv()
{
	var gbody=$('gbody'); 
	if (parseInt(gbody.style.top)+parseInt(gbody.style.height)>25)
	{
		gbody.style.top = parseInt(gbody.style.top)-5;
		$('gmenu').style.height=parseInt($('gmenu').style.height)-5;
		setTimeout(function () {gclosediv()},10)
	}
}

function gopendiv()
{
	var gbody=$('gbody'); 
	if (parseInt(gbody.style.top)<25)
	{
		gbody.style.top = parseInt(gbody.style.top)+5;
		$('gmenu').style.height=parseInt($('gmenu').style.height)+5;
		setTimeout(function () {gopendiv()},10)
	}
}

function addpoint()
{
	var canv=selected[0];
	var p=canv.stopn;
	var s=(canv.colorStops[p][0]+canv.colorStops[p+1][0])/2;
	var tempcsn=[s,canv.colorStops[p][1],canv.colorStops[p][2],canv.colorStops[p][3],canv.colorStops[p][4]];
	var tempcs=[];
	for (var i=0; i<=p;i++)
	{
		tempcs[i]=canv.colorStops[i];
	}
	tempcs[p+1]=tempcsn
	for (var i=p+1; i<canv.colorStops.length;i++)
	{
		tempcs[i+1]=canv.colorStops[i];
	}
	for (var i=0; i<selected.length;i++)
	{
		selected[i].colorStops=tempcs
	}
	removeGradLine();
	showGradLine(canv);
	
}

