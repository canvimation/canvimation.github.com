/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function shadowMenu()
{
   this.elmRef = document.createElement('div');
   this.elmRef.id  = 'shmenu';
   this.elmRef.style.left= (maxwidth-155)/3; 
   this.elmRef.style.top= (maxheight-155)/8;
   this.elmRef.style.width=250;
   this.elmRef.style.height=220;
   
   this.elmRef.style.zIndex=20000002;
   this.elmRef.parentdiv=parentselected;
   this.elmRef.style.backgroundColor="#FFFFFF"; 
   
   this.elmRef.onmouseover=function() {inln=true};
   this.elmRef.onmouseout=function() {inln=false}; 
   $('bodydiv').appendChild(this.elmRef);
   
   this.elmHead =document.createElement('div');
   this.elmHead.id  = 'shhead';
   this.elmHead.style.left= 0; 
   this.elmHead.style.top= 0;
   this.elmHead.style.width=parseInt(this.elmRef.style.width)-1;
   this.elmHead.style.height=25;
   this.elmHead.style.backgroundColor='black';
   this.elmHead.style.border="solid black 1px"; 
   this.elmHead.style.color='white';
   this.elmHead.innerHTML='\u00A0 Shadow Effects';
   
   this.elmClose = document.createElement('div')
   this.elmClose.id  = 'shclose';
   this.elmClose.style.left= parseInt(this.elmRef.style.width)-parseInt(this.elmHead.style.height)-1; 
   this.elmClose.style.top= 0;
   this.elmClose.style.width=parseInt(this.elmHead.style.height);
   this.elmClose.style.height=this.elmHead.style.height;
   this.elmClose.style.backgroundColor="#000000";
   this.elmClose.style.borderLeft="solid #FFFFFF 1px";
   this.elmClose.onclick=function() {
	   									inln=false;
										$('shmenu').parentNode.removeChild($('shmenu'));
									};
   this.elmImg=document.createElement('img');
   this.elmImg.style.position="absolute";
   this.elmImg.src='assets/x.png';
   this.elmImg.style.left=2;
   this.elmImg.style.top=2;
   
   this.elmUpDown = document.createElement('div');
   this.elmUpDown.id = 'shud';
   this.elmUpDown.style.left= parseInt(this.elmRef.style.width)-2*parseInt(this.elmHead.style.height)-2; 
   this.elmUpDown.style.top= 0;
   this.elmUpDown.style.width=25;
   this.elmUpDown.style.height=this.elmHead.style.height;
   this.elmUpDown.style.backgroundColor="#000000";
   this.elmUpDown.style.borderLeft="solid #FFFFFF 1px";
   this.elmUpDown.onclick = function() {
	   										if (this.firstChild.id=='shimgup')
											{
												this.firstChild.id='shimgdown';
												this.firstChild.src='assets/down.png';
												setTimeout(function () {shclosediv()},50);
											}
											else
											{
												this.firstChild.id='shimgup';
												this.firstChild.src='assets/up.png';
												setTimeout(function () {shopendiv()},50);
											};
   										}
   
   this.elmImg2=document.createElement('img');
   this.elmImg2.id='shimgup';
   this.elmImg2.style.position="absolute";
   this.elmImg2.src='assets/up.png'
   this.elmImg2.style.left=2;
   this.elmImg2.style.top=2;   
   
   this.elmBody =document.createElement('div');
   this.elmBody.id  = 'shBody';
   this.elmBody.style.left= 0; 
   this.elmBody.style.top= 25;;
   this.elmBody.style.width=parseInt(this.elmRef.style.width)-1;
   this.elmBody.style.height=195;
   this.elmBody.style.border="solid black 1px";
   this.elmBody.style.backgroundColor='white'; 
   $('shmenu').appendChild(this.elmBody); 
  
   this.shform =document.createElement('div');
   this.shform.id  = 'shform';
   this.shform.style.left= 0; 
   this.shform.style.top= 0
   this.shform.style.width=parseInt(this.elmRef.style.width)-1;
   this.shform.style.height=this.elmBody.style.height;
   $('shBody').appendChild(this.shform);
   
   this.shdirectlbldiv=document.createElement('div');
   this.shdirectlbldiv.style.left=2;
   this.shdirectlbldiv.style.top=30;
   this.shdirectlbldiv.innerHTML='Direction';
   this.shform.appendChild(this.shdirectlbldiv);
   
   this.shdirectrtdiv=document.createElement('div');
   this.shdirectrtdiv.id='shdirectrt';
   this.shdirectrtdiv.style.left=110;
   this.shdirectrtdiv.style.top=30;   
   this.shdirectrtimg=document.createElement('img');
   this.shdirectrtimg.id='shdirectrtimg';
   this.shdirectrtimg.src='assets/shright.png';
   this.shdirectrtdiv.onmouseover=function() {$('shdirectrtimg').src='assets/shrightin.png'};
   this.shdirectrtdiv.onmouseout=function() {$('shdirectrtimg').src='assets/shright.png'};
   this.shdirectrtdiv.onmousedown=function(e) {
	   										noBubble(e);
											movshdright();
   										  }
   this.shdirectrtdiv.onmouseup=function(e) {
	   										noBubble(e);
											stopshdright();
   										  }										  
   this.shform.appendChild(this.shdirectrtdiv);
   this.shdirectrtdiv.appendChild(this.shdirectrtimg);
  
   this.shdirectlfdiv=document.createElement('div');
   this.shdirectlfdiv.id='shdirectlf';
   this.shdirectlfdiv.style.left=80;
   this.shdirectlfdiv.style.top=30;   
   this.shdirectlfimg=document.createElement('img');
   this.shdirectlfimg.id='shdirectlfimg';
   this.shdirectlfimg.src='assets/shleft.png';
   this.shdirectlfdiv.onmouseover=function() {$('shdirectlfimg').src='assets/shleftin.png'};
   this.shdirectlfdiv.onmouseout=function() {$('shdirectlfimg').src='assets/shleft.png'};
   this.shdirectlfdiv.onmousedown=function(e) {
	   											noBubble(e);
												movshdleft()
   										  	  }
   this.shdirectlfdiv.onmouseup=function(e) {
	   											noBubble(e);
												stopshdleft()
   										  	  }											  
   this.shform.appendChild(this.shdirectlfdiv);
   this.shdirectlfdiv.appendChild(this.shdirectlfimg);

   this.shdirectupdiv=document.createElement('div');
   this.shdirectupdiv.id='shdirectup';
   this.shdirectupdiv.style.left=90;
   this.shdirectupdiv.style.top=5;   
   this.shdirectupimg=document.createElement('img');
   this.shdirectupimg.id='shdirectupimg';
   this.shdirectupimg.src='assets/shup.png';
   this.shdirectupdiv.onmouseover=function() {$('shdirectupimg').src='assets/shupin.png'};
   this.shdirectupdiv.onmouseout=function() {$('shdirectupimg').src='assets/shup.png'};
   this.shdirectupdiv.onmousedown=function(e) {
	   										noBubble(e);
											movshdup();
   										  }
   this.shdirectupdiv.onmouseup=function(e) {
	   										noBubble(e);
											stopshdup();
   										  }										  
   this.shform.appendChild(this.shdirectupdiv);
   this.shdirectupdiv.appendChild(this.shdirectupimg);
  
   this.shdirectdwdiv=document.createElement('div');
   this.shdirectdwdiv.id='shdirectdw';
   this.shdirectdwdiv.style.left=90;
   this.shdirectdwdiv.style.top=60;   
   this.shdirectdwimg=document.createElement('img');
   this.shdirectdwimg.id='shdirectdwimg';
   this.shdirectdwimg.src='assets/shdown.png';
   this.shdirectdwdiv.onmouseover=function() {$('shdirectdwimg').src='assets/shdownin.png'};
   this.shdirectdwdiv.onmouseout=function() {$('shdirectdwimg').src='assets/shdown.png'};
   this.shdirectdwdiv.onmousedown=function(e) {
	   											noBubble(e);
												movshddown()
   										  	  }
   this.shdirectdwdiv.onmouseup=function(e) {
	   											noBubble(e);
												stopshddown()
   										  	  }											  
   this.shform.appendChild(this.shdirectdwdiv);
   this.shdirectdwdiv.appendChild(this.shdirectdwimg);
   
   this.shblurdiv=document.createElement('div');
   this.shblurdiv.style.left=10;
   this.shblurdiv.style.top=112;
   this.shblurdiv.style.height=35;
   this.shblurdiv.style.width=230;
   this.shblurarwdiv=document.createElement('div');
   this.shblurarwdiv.id='shdarw';
   this.shblurarwdiv.style.left=selected[0].shadowBlur;
   this.shblurarwdiv.style.top=0;
   this.shblurarwdiv.style.height=35;
   this.shblurarwdiv.style.width=9; 
   this.shblurarwimg=document.createElement('img');
   this.shblurarwimg.src='assets/transp_arrows.gif';
   this.shblurslidediv=document.createElement('div');
   this.shblurslidediv.style.left=0;
   this.shblurslidediv.style.top=9;
   this.shblurslidediv.style.height=17;
   this.shblurslidediv.style.width=230; 
   this.shblurslidediv.onclick=function(e) {setarrow(getPosition(e))}
   
   this.shblurimg=document.createElement('img');
   this.shblurimg.src='assets/blur.png';
   this.elmBody.appendChild(this.shblurdiv);
   this.shblurdiv.appendChild(this.shblurarwdiv);
   this.shblurarwdiv.appendChild(this.shblurarwimg);
   this.shblurdiv.appendChild(this.shblurslidediv);
   this.shblurslidediv.appendChild(this.shblurimg);

   this.shcancelindiv=document.createElement('div');
   this.shcancelindiv.style.left=165;
   this.shcancelindiv.style.top=162;   
   this.shcancel=document.createElement('input');
   this.shcancel.id='shcancel';
   this.shcancel.type='button';
   this.shcancel.size=10;
   this.shcancel.value='Close';
   this.shcancel.onclick=function () {inln=false;$('shmenu').parentNode.removeChild($('shmenu'))};
   this.shform.appendChild(this.shcancelindiv);
   this.shcancelindiv.appendChild(this.shcancel);

   $('shmenu').appendChild(this.elmHead);
   $('shhead').appendChild(this.elmClose);
   $('shclose').appendChild(this.elmImg);
   $('shhead').appendChild(this.elmUpDown);
   $('shud').appendChild(this.elmImg2);
   
   this.elmRef.style.clip='rect(0,300,'+(parseInt(this.elmRef.style.height)+20)+',0)';
   return this.elmRef;  
   
}

function setarrow(cur)
{
	$('shdarw').style.left=cur.x-(parseInt($('shmenu').style.left)-10);
	$('shdarw').style.top=0;
	if (parseInt($('shdarw').style.left)<0) {$('shdarw').style.left=0}
	if (parseInt($('shdarw').style.left)>212) {$('shdarw').style.left=212}
	for (var i=0;i<selected.length;i++)
	{
		selected[i].shadowBlur=parseInt($('shdarw').style.left);
		drawline(selected[i]);
	}
}

function shclosediv()
{
	var lbody=$('shBody'); 
	if (parseInt(lbody.style.top)+parseInt(lbody.style.height)>25)
	{
		lbody.style.top = parseInt(lbody.style.top)-5;
		setTimeout(function () {shclosediv()},10)
	}
}

function shopendiv()
{
	var lbody=$('shBody'); 
	if (parseInt(lbody.style.top)<25)
	{
		lbody.style.top = parseInt(lbody.style.top)+5;
		setTimeout(function () {shopendiv()},10)
	}
}

function movshdright()
{
	for (var i=0; i<selected.length; i++)
	{
		selected[i].shadowOffsetX+=1;
		drawline(selected[i]);
	}
	msr=setTimeout(function() {movshdright()},50)
}

function stopshdright()
{
	clearTimeout(msr);
}

function movshdleft()
{
	for (var i=0; i<selected.length; i++)
	{
		selected[i].shadowOffsetX-=1;
		drawline(selected[i]);
	}
	msl=setTimeout(function() {movshdleft()},50)
}

function stopshdleft()
{
	clearTimeout(msl);
}

function movshdup()
{
	for (var i=0; i<selected.length; i++)
	{
		selected[i].shadowOffsetY-=1;
		drawline(selected[i]);
	}
	msu=setTimeout(function() {movshdup()},50)
}

function stopshdup()
{
	clearTimeout(msu);
}

function movshddown()
{
	for (var i=0; i<selected.length; i++)
	{
		selected[i].shadowOffsetY+=1;
		drawline(selected[i]);
	}
	msd=setTimeout(function() {movshddown()},50)
}

function stopshddown()
{
	clearTimeout(msd);
}


function shadow()
{
	if (ieb) 
	{
		alert('Internet Explorer does not support Shadows');
		return;
	}
	var shad = new shadowMenu();
	DDshad=new YAHOO.util.DD('shmenu');
   	DDshad.setHandleElId('shhead');
	getshadowcolor();
	coltype='S';
	DDshdarw=new YAHOO.util.DD('shdarw');
	DDshdarw.onDrag = function () {
										$('shdarw').style.top=0;
										if (parseInt($('shdarw').style.left)<0) {$('shdarw').style.left=0}
										if (parseInt($('shdarw').style.left)>212) {$('shdarw').style.left=212}
										for (var i=0;i<selected.length;i++)
										{
											selected[i].shadowBlur=parseInt($('shdarw').style.left);
											drawline(selected[i]);
										}
  
								};
}

function getshadowcolor()
{
	var canv=selected[0];
	$("redBox").value=canv.shadowColor[0];
	redBoxChanged();
	$("greenBox").value=canv.shadowColor[1];
	greenBoxChanged();
	$("blueBox").value=canv.shadowColor[2];
	blueBoxChanged();
	alphaperct = 100*(1-canv.shadowColor[3]);
	$('varrows').style.left=256*alphaperct/100-4;
	$('transptext').innerHTML ='Transparency '+Math.floor(alphaperct)+'%';
	if (ieb)
	{
		$('transpslider').filters.alpha.opacity=100-alphaperct;
	}
	else
	{
		$('transpslider').style.opacity=1-alphaperct/100;
	}
	$("transpslider").style.backgroundColor = currentColor.HexString();
	$('colorheadtext').innerHTML='\u00A0 Shadow Colour';
	coltype='F';
	$('colorcont').style.visibility='visible';
}

