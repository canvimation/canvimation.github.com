/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function filmpropMenu(type,name,fa,fd,fs,fe,zx,tp,lf,fin) //fs start time of action, fe duration, fa appears at time, fd duraction visible
{
   this.elmRef = document.createElement('div');
   this.elmRef.id  = 'filmpropmenu';
   this.elmRef.style.left= 150; 
   this.elmRef.style.top= 100;
   this.elmRef.style.width=250;
   this.elmRef.style.height=170;
   
   this.elmRef.style.zIndex=21000000;
   this.elmRef.parentdiv=parentselected;
   this.elmRef.style.backgroundColor="#FFFFFF"; 
   
   this.elmRef.onmouseover=function() {inln=true};
   this.elmRef.onmouseout=function() {inln=false}; 
   document.getElementsByTagName('body')[0].appendChild(this.elmRef);
   
   this.elmHead =document.createElement('div');
   this.elmHead.id  = 'filmprophead';
   this.elmHead.style.left= 0; 
   this.elmHead.style.top= 0;
   this.elmHead.style.width=parseInt(this.elmRef.style.width)-1;
   this.elmHead.style.height=25;
   this.elmHead.style.backgroundColor='black';
   this.elmHead.style.border="solid black 1px"; 
   this.elmHead.style.color='white';
   this.elmHead.innerHTML='\u00A0'+ name;
   
   this.elmClose = document.createElement('div')
   this.elmClose.id  = 'filmpropclose';
   this.elmClose.style.left= parseInt(this.elmRef.style.width)-parseInt(this.elmHead.style.height)-1; 
   this.elmClose.style.top= 0;
   this.elmClose.style.width=parseInt(this.elmHead.style.height);
   this.elmClose.style.height=this.elmHead.style.height;
   this.elmClose.style.backgroundColor="#000000";
   this.elmClose.style.borderLeft="solid #FFFFFF 1px";
   this.elmClose.onclick=function(e) {
	   									noBubble(e);
										$('filmpropmenu').parentNode.removeChild($('filmpropmenu'));
										inln=false;
									};
   this.elmImg=document.createElement('img');
   this.elmImg.style.position="absolute";
   this.elmImg.src='assets/x.png';
   this.elmImg.style.left=2;
   this.elmImg.style.top=2;
   
   this.elmUpDown = document.createElement('div');
   this.elmUpDown.id = 'filmpropud';
   this.elmUpDown.style.left= parseInt(this.elmRef.style.width)-2*parseInt(this.elmHead.style.height)-2; 
   this.elmUpDown.style.top= 0;
   this.elmUpDown.style.width=25;
   this.elmUpDown.style.height=this.elmHead.style.height;
   this.elmUpDown.style.backgroundColor="#000000";
   this.elmUpDown.style.borderLeft="solid #FFFFFF 1px";
   this.elmUpDown.onclick = function(e) {
	   										noBubble(e);
											if (this.firstChild.id=='imgup')
											{
												this.firstChild.id='imgdown';
												this.firstChild.src='assets/down.png';
												setTimeout(function () {filmpropclosediv()},50);
											}
											else
											{
												this.firstChild.id='imgup';
												this.firstChild.src='assets/up.png';
												setTimeout(function () {filmpropopendiv()},50);
											};
											inln=false;
   										}
   
   this.elmImg2=document.createElement('img');
   this.elmImg2.id='imgup';
   this.elmImg2.style.position="absolute";
   this.elmImg2.src='assets/up.png'
   this.elmImg2.style.left=2;
   this.elmImg2.style.top=2;   
   
   this.elmBody =document.createElement('div');
   this.elmBody.id  = 'filmpropBody';
   this.elmBody.style.left= 0; 
   this.elmBody.style.top= 25;;
   this.elmBody.style.width=parseInt(this.elmRef.style.width)-1;
   this.elmBody.style.height=145;
   this.elmBody.style.border="solid black 1px";
   this.elmBody.style.backgroundColor='white'; 
   this.elmBody.style.paddingTop='2px';
      var innerhtml='<div style="text-align:center; width:'+parseInt(this.elmBody.style.width)+'">Appears at Time &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Duration</div><br>';
   innerhtml +='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input id="filmpropappear" type="text" size=8 value='+fa+' style="text-align:right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input id="filmprophide" size=8 value='+fd+' style="text-align:right"><br>';
   if (type=='SP')
   {
    	innerhtml +='<div style="text-align:center; width:'+parseInt(this.elmBody.style.width)+'">Start Time &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Duration</div><br>';
   		innerhtml +='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input id="filmpropstart" type="text" size=8 value='+fs+' style="text-align:right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input id="filmpropend" size=8 value='+fe+' style="text-align:right"><br>';
		this.elmRef.style.height=200;
		this.elmBody.style.height=175;
   }
   innerhtml +='<div style="text-align:center; width:'+parseInt(this.elmBody.style.width)+'">in Seconds</div><br>';
   innerhtml +='&nbsp;&nbsp;&nbsp;<input id="filmpropplace" type="checkbox" onclick="placeonoff()"> Show Position Adjust<br><br>';
   innerhtml +='&nbsp;<input type="button" size=10 value="OK" onclick="setfilmprop('+squote+name+squote+','+squote+type+squote+','+zx+','+tp+','+lf+','+fin+')">&nbsp;&nbsp;<input type="button" size=10 value="Close" onclick="closefilmprop()">'
   innerhtml +='&nbsp;&nbsp;<input type="button" size=10 value="Remove" onclick="filmremove('+squote+name+squote+')">'
   this.elmBody.innerHTML=innerhtml
   $('filmpropmenu').appendChild(this.elmBody); 
  
   $('filmpropmenu').appendChild(this.elmHead);
   $('filmprophead').appendChild(this.elmClose);
   $('filmpropclose').appendChild(this.elmImg);
   $('filmprophead').appendChild(this.elmUpDown);
   $('filmpropud').appendChild(this.elmImg2);
   if ($("filmdivhandle").style.visibility=='visible') {$('filmpropplace').checked=true}
   this.elmRef.style.clip='rect(0,300,'+(parseInt(this.elmRef.style.height)+20)+',0)';
   return this.elmRef;  
   
}

function filmpropclosediv()
{
	var filmpropbody=$('filmpropBody'); 
	if (parseInt(filmpropbody.style.top)+parseInt(filmpropbody.style.height)>25)
	{
		filmpropbody.style.top = parseInt(filmpropbody.style.top)-5;
		setTimeout(function () {filmpropclosediv()},10)
	}
}

function filmpropopendiv()
{
	var filmpropbody=$('filmpropBody'); 
	if (parseInt(filmpropbody.style.top)<25)
	{
		filmpropbody.style.top = parseInt(filmpropbody.style.top)+5;
		setTimeout(function () {filmpropopendiv()},10)
	}
}



function filmpm(type,name,fa,fd,fs,fe,zx,tp,lf,fin)
{
	if ($('filmpropmenu')) {$('filmpropmenu').parentNode.removeChild($('filmpropmenu'))};
	$('filmdivhandle').style.top=fhtfix;
	$('filmdivhandle').style.left=fhlfix;
	var filmpropm = new filmpropMenu(type,name,fa,fd,fs,fe,zx,tp,lf,fin);
	DDfilmpropm=new YAHOO.util.DD('filmpropmenu');
   	DDfilmpropm.setHandleElId('filmprophead');

}

function setfilmprop(name,type,zx,tp,lf,fin)
{
	var fplist=[];
	fplist.push(type);
	fplist.push(name);
	n = parseInt($('filmpropappear').value);
	if (isNaN(n))
	{
		alert('Appear at Time is not a number.');
	}
	else if (n<0)
	{
		alert('Appear at must be positive.');
	}
	else
	{
		fplist.push(n*1000);
	}
	if ($('filmprophide').value.toLowerCase() == 'e' || $('filmprophide').value.toLowerCase() == 'ever')
	{
		fplist.push('e');
	}
	else
	{
		n = parseInt($('filmprophide').value);
		if (isNaN(n))
		{
			alert('Visible Duration is neither a number nor "ever"  -  e  -');
		}
		else if (n<0)
		{
			alert('Visible Duraction must be positive.');
		}
		else
		{
			fplist.push(n*1000);
		}
	}
	if ($('filmpropstart'))
	{
		var n = parseInt($('filmpropstart').value);
	}
	else
	{
		var n=0;
	}
	if (isNaN(n))
	{
		alert('Start Time is not a number.');
	}
	else if (n<0)
	{
		alert('Start Time must be positive.');
	}
	else
	{
		fplist.push(n*1000);
	}
	if ($('filmpropend'))
	{
		if ($('filmpropend').value.toLowerCase() == 'e' || $('filmpropend').value.toLowerCase() == 'ever')
		{
			fplist.push('e');
		}
		else
		{
			n = parseInt($('filmpropend').value);
			if (isNaN(n))
			{
				alert('Duration is neither a number nor "ever"  -  e  -');
			}
			else if (n<0)
			{
				alert('Duraction must be positive.');
			}
			else
			{
				fplist.push(n*1000);
			}
		}
	}
	else
	{
		fplist.push(0);
	}
	fplist.push(zx);
	fplist.push(tp);
	fplist.push(lf);
	fplist.push(fin);
	var flindx=filmindxlist.indexOf(name);
	filmlist[flindx]=fplist;
	closefilmprop();
}

function closefilmprop()
{
	$('filmpropmenu').parentNode.removeChild($('filmpropmenu'));
	inln=false;
}

function placeonoff()
{
	if ($('filmpropplace').checked)
	{
		$('filmdivhandle').style.top=fhtfix;
		$('filmdivhandle').style.left=fhlfix;
		$("filmdivhandle").style.visibility='visible';
	}
	else
	{
		$("filmdivhandle").style.visibility='hidden';
	}
}

function filmremove(name)
{
	closefilmprop();
	$("filmdivhandle").style.visibility='hidden';
	$('filmelmt'+name).parentNode.removeChild($('filmelmt'+name));
}

