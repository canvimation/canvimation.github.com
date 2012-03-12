/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function linesMenu()
{
   this.elmRef = document.createElement('div');
   this.elmRef.id  = 'lmenu';
   this.elmRef.style.left= (maxwidth-155)/3; 
   this.elmRef.style.top= (maxheight-155)/8;
   this.elmRef.style.width=250;
   this.elmRef.style.height=170;
   
   this.elmRef.style.zIndex=20000002;
   this.elmRef.parentdiv=parentselected;
   this.elmRef.style.backgroundColor="#FFFFFF"; 
   
   this.elmRef.onmouseover=function() {inln=true};
   this.elmRef.onmouseout=function() {inln=false}; 
   $('bodydiv').appendChild(this.elmRef);
   
   this.elmHead =document.createElement('div');
   this.elmHead.id  = 'lhead';
   this.elmHead.style.left= 0; 
   this.elmHead.style.top= 0;
   this.elmHead.style.width=parseInt(this.elmRef.style.width)-1;
   this.elmHead.style.height=25;
   this.elmHead.style.backgroundColor='black';
   this.elmHead.style.border="solid black 1px"; 
   this.elmHead.style.color='white';
   this.elmHead.innerHTML='\u00A0 Line Styles';
   
   this.elmClose = document.createElement('div')
   this.elmClose.id  = 'lclose';
   this.elmClose.style.left= parseInt(this.elmRef.style.width)-parseInt(this.elmHead.style.height)-1; 
   this.elmClose.style.top= 0;
   this.elmClose.style.width=parseInt(this.elmHead.style.height);
   this.elmClose.style.height=this.elmHead.style.height;
   this.elmClose.style.backgroundColor="#000000";
   this.elmClose.style.borderLeft="solid #FFFFFF 1px";
   this.elmClose.onclick=function() {
	   									inln=false;
										$('lmenu').parentNode.removeChild($('lmenu'));
									};
   this.elmImg=document.createElement('img');
   this.elmImg.style.position="absolute";
   this.elmImg.src='assets/x.png';
   this.elmImg.style.left=2;
   this.elmImg.style.top=2;
   
   this.elmUpDown = document.createElement('div');
   this.elmUpDown.id = 'lud';
   this.elmUpDown.style.left= parseInt(this.elmRef.style.width)-2*parseInt(this.elmHead.style.height)-2; 
   this.elmUpDown.style.top= 0;
   this.elmUpDown.style.width=25;
   this.elmUpDown.style.height=this.elmHead.style.height;
   this.elmUpDown.style.backgroundColor="#000000";
   this.elmUpDown.style.borderLeft="solid #FFFFFF 1px";
   this.elmUpDown.onclick = function() {
	   										if (this.firstChild.id=='imgup')
											{
												this.firstChild.id='imgdown';
												this.firstChild.src='assets/down.png';
												setTimeout(function () {lclosediv()},50);
											}
											else
											{
												this.firstChild.id='imgup';
												this.firstChild.src='assets/up.png';
												setTimeout(function () {lopendiv()},50);
											};
   										}
   
   this.elmImg2=document.createElement('img');
   this.elmImg2.id='imgup';
   this.elmImg2.style.position="absolute";
   this.elmImg2.src='assets/up.png'
   this.elmImg2.style.left=2;
   this.elmImg2.style.top=2;   
   
   this.elmBody =document.createElement('div');
   this.elmBody.id  = 'lBody';
   this.elmBody.style.left= 0; 
   this.elmBody.style.top= 25;;
   this.elmBody.style.width=parseInt(this.elmRef.style.width)-1;
   this.elmBody.style.height=145;
   this.elmBody.style.border="solid black 1px";
   this.elmBody.style.backgroundColor='white'; 
   $('lmenu').appendChild(this.elmBody); 
  
   this.lform =document.createElement('div');
   this.lform.id  = 'lform';
   this.lform.style.left= 0; 
   this.lform.style.top= 0
   this.lform.style.width=parseInt(this.elmRef.style.width)-1;
   this.lform.style.height=this.elmBody.style.height;
   $('lBody').appendChild(this.lform);
   
   this.lwidthlbldiv=document.createElement('div');
   this.lwidthlbldiv.style.left=2;
   this.lwidthlbldiv.style.top=7;
   this.lwidthlbldiv.innerHTML='Line Width';
   this.lwidthindiv=document.createElement('div');
   this.lwidthindiv.style.left=80;
   this.lwidthindiv.style.top=7;   
   this.lwidth=document.createElement('input');
   this.lwidth.id='lwidth';
   this.lwidth.type='text';
   this.lwidth.size=10;
   this.lwidth.style.textAlign='right';
   this.lwidth.value=selected[0].lineWidth;
   this.lform.appendChild(this.lwidthlbldiv);
   this.lform.appendChild(this.lwidthindiv);
   this.lwidthindiv.appendChild(this.lwidth);
  
   this.lcaplbldiv=document.createElement('div');
   this.lcaplbldiv.style.left=2;
   this.lcaplbldiv.style.top=32;
   this.lcaplbldiv.innerHTML='Line Cap';
   this.lcapindiv=document.createElement('div');
   this.lcapindiv.style.left=80;
   this.lcapindiv.style.top=32;   
   this.lcap=document.createElement('select');
   this.lcap.id='lcap';
   this.lcap.name='lcap';
   this.lcapbutt=document.createElement('option');
   this.lcapbutt.value='butt';
   this.lcapbutt.innerHTML='butt';
   this.lcapbutt.selected=false;
   this.lcapround=document.createElement('option');
   this.lcapround.value='round';
   this.lcapround.innerHTML='round';
   this.lcapround.selected=false;
   this.lcapsquare=document.createElement('option');
   this.lcapsquare.value='square';
   this.lcapsquare.innerHTML='square';
   this.lcapsquare.selected=false; 
   this.lcapimg=document.createElement('img');
   this.lcapimg.id='lcapimg';
   this.lcapimgdiv=document.createElement('div');
   this.lcapimgdiv.style.left=160;
   this.lcapimgdiv.style.top=32;
   if (selected[0].lineCap=='round')
   {
	   this.lcapround.selected=true;
   }
   else if (selected[0].lineCap=='square')
   {
	   this.lcapsquare.selected=true;
   }
   else
   {
	   this.lcapbutt.selected=true;
   }

   this.lform.appendChild(this.lcaplbldiv);
   this.lform.appendChild(this.lcapindiv);
   this.lform.appendChild(this.lcapimgdiv);
   this.lcapimgdiv.appendChild(this.lcapimg);
   this.lcapindiv.appendChild(this.lcap);
   this.lcap.appendChild(this.lcapbutt);
   this.lcap.appendChild(this.lcapround);
   this.lcap.appendChild(this.lcapsquare);
   this.lcapimg.src='assets/l'+this.lcap.value+'.png';
   this.lcap.onclick=function (e) {noBubble(e);};
   this.lcap.onchange=function (e) {
									 $('lcapimg').src='assets/l'+$('lcap').value+'.png';
								   }
								   
   this.ljoinlbldiv=document.createElement('div');
   this.ljoinlbldiv.style.left=2;
   this.ljoinlbldiv.style.top=67;
   this.ljoinlbldiv.innerHTML='Line Join';
   this.ljoinindiv=document.createElement('div');
   this.ljoinindiv.style.left=80;
   this.ljoinindiv.style.top=67;   
   this.ljoin=document.createElement('select');
   this.ljoin.id='ljoin';
   this.ljoin.name='ljoin';
   this.ljoinbevel=document.createElement('option');
   this.ljoinbevel.value='bevel';
   this.ljoinbevel.innerHTML='bevel';
   this.ljoinbevel.selected=false;
   this.ljoinmiter=document.createElement('option');
   this.ljoinmiter.value='miter';
   this.ljoinmiter.innerHTML='miter';
   this.ljoinmiter.selected=false;
   this.ljoinround=document.createElement('option');
   this.ljoinround.value='round';
   this.ljoinround.innerHTML='round';
   this.ljoinround.selected=false; 
   this.ljoinimg=document.createElement('img');
   this.ljoinimg.id='ljoinimg';
   this.ljoinimgdiv=document.createElement('div');
   this.ljoinimgdiv.style.left=160;
   this.ljoinimgdiv.style.top=57;
   if (selected[0].linejoin=='bevel')
   {
	   this.ljoinbevel.selected=true;
   }
   else if (selected[0].lineJoin=='round')
   {
	   this.ljoinround.selected=true;
   }
   else
   {
	   this.ljoinmiter.selected=true;
   }

   this.lform.appendChild(this.ljoinlbldiv);
   this.lform.appendChild(this.ljoinindiv);
   this.lform.appendChild(this.ljoinimgdiv);
   this.ljoinimgdiv.appendChild(this.ljoinimg);
   this.ljoinindiv.appendChild(this.ljoin);
   this.ljoin.appendChild(this.ljoinbevel);
   this.ljoin.appendChild(this.ljoinmiter);
   this.ljoin.appendChild(this.ljoinround);
   this.ljoinimg.src='assets/lj'+this.ljoin.value+'.png';
   this.ljoin.onclick=function (e) {noBubble(e);};
   this.ljoin.onchange=function (e) {
									  $('ljoinimg').src='assets/lj'+$('ljoin').value+'.png';
								   }


   this.lOKindiv=document.createElement('div');
   this.lOKindiv.style.left=45;
   this.lOKindiv.style.top=112;   
   this.lOK=document.createElement('input');
   this.lOK.id='lOK';
   this.lOK.type='button';
   this.lOK.size=10;
   this.lOK.value='OK';
   this.lOK.onclick=function () {updatelines();inln=false;$('lmenu').parentNode.removeChild($('lmenu'))};
   this.lform.appendChild(this.lOKindiv);
   this.lOKindiv.appendChild(this.lOK);
   
   this.lApplyindiv=document.createElement('div');
   this.lApplyindiv.style.left=95;
   this.lApplyindiv.style.top=112;   
   this.lApply=document.createElement('input');
   this.lApply.id='lApply';
   this.lApply.type='button';
   this.lApply.size=10;
   this.lApply.value='Apply';
   this.lApply.onclick=function () {updatelines()};
   this.lform.appendChild(this.lApplyindiv);
   this.lApplyindiv.appendChild(this.lApply);   

   this.lcancelindiv=document.createElement('div');
   this.lcancelindiv.style.left=165;
   this.lcancelindiv.style.top=112;   
   this.lcancel=document.createElement('input');
   this.lcancel.id='lcancel';
   this.lcancel.type='button';
   this.lcancel.size=10;
   this.lcancel.value='Cancel';
   this.lcancel.onclick=function () {inln=false;$('lmenu').parentNode.removeChild($('lmenu'))};
   this.lform.appendChild(this.lcancelindiv);
   this.lcancelindiv.appendChild(this.lcancel);

   $('lmenu').appendChild(this.elmHead);
   $('lhead').appendChild(this.elmClose);
   $('lclose').appendChild(this.elmImg);
   $('lhead').appendChild(this.elmUpDown);
   $('lud').appendChild(this.elmImg2);
   
   this.elmRef.style.clip='rect(0,300,'+(parseInt(this.elmRef.style.height)+20)+',0)';
   return this.elmRef;  
   
}

function lclosediv()
{
	var lbody=$('lBody'); 
	if (parseInt(lbody.style.top)+parseInt(lbody.style.height)>25)
	{
		lbody.style.top = parseInt(lbody.style.top)-5;
		setTimeout(function () {lclosediv()},10)
	}
}

function lopendiv()
{
	var lbody=$('lBody'); 
	if (parseInt(lbody.style.top)<25)
	{
		lbody.style.top = parseInt(lbody.style.top)+5;
		setTimeout(function () {lopendiv()},10)
	}
}



