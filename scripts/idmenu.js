/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function idMenu()
{
   this.elmRef = document.createElement('div');
   this.elmRef.id  = 'idmenu';
   this.elmRef.style.left= 150; 
   this.elmRef.style.top= 100;
   this.elmRef.style.width=250;
   this.elmRef.style.height=140;
   
   this.elmRef.style.zIndex=20000002;
   this.elmRef.parentdiv=parentselected;
   this.elmRef.style.backgroundColor="#FFFFFF"; 
   
   this.elmRef.onmouseover=function() {inln=true};
   this.elmRef.onmouseout=function() {inln=false}; 
   $('bodydiv').appendChild(this.elmRef);
   
   this.elmHead =document.createElement('div');
   this.elmHead.id  = 'idhead';
   this.elmHead.style.left= 0; 
   this.elmHead.style.top= 0;
   this.elmHead.style.width=parseInt(this.elmRef.style.width)-1;
   this.elmHead.style.height=25;
   this.elmHead.style.backgroundColor='black';
   this.elmHead.style.border="solid black 1px"; 
   this.elmHead.style.color='white';
   this.elmHead.innerHTML='\u00A0 Shape Name';
   
   this.elmClose = document.createElement('div')
   this.elmClose.id  = 'idclose';
   this.elmClose.style.left= parseInt(this.elmRef.style.width)-parseInt(this.elmHead.style.height)-1; 
   this.elmClose.style.top= 0;
   this.elmClose.style.width=parseInt(this.elmHead.style.height);
   this.elmClose.style.height=this.elmHead.style.height;
   this.elmClose.style.backgroundColor="#000000";
   this.elmClose.style.borderLeft="solid #FFFFFF 1px";
   this.elmClose.onclick=function(e) {
	   									noBubble(e);
										$('idmenu').parentNode.removeChild($('idmenu'));
										inln=false;
									};
   this.elmImg=document.createElement('img');
   this.elmImg.style.position="absolute";
   this.elmImg.src='assets/x.png';
   this.elmImg.style.left=2;
   this.elmImg.style.top=2;
   
   this.elmUpDown = document.createElement('div');
   this.elmUpDown.id = 'idud';
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
												setTimeout(function () {idclosediv()},50);
											}
											else
											{
												this.firstChild.id='imgup';
												this.firstChild.src='assets/up.png';
												setTimeout(function () {idopendiv()},50);
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
   this.elmBody.id  = 'idBody';
   this.elmBody.style.left= 0; 
   this.elmBody.style.top= 25;;
   this.elmBody.style.width=parseInt(this.elmRef.style.width)-1;
   this.elmBody.style.height=115;
   this.elmBody.style.border="solid black 1px";
   this.elmBody.style.backgroundColor='white'; 
   $('idmenu').appendChild(this.elmBody); 
  
   this.idform =document.createElement('div');
   this.idform.id  = 'idform';
   this.idform.style.left= 0; 
   this.idform.style.top= 0
   this.idform.style.width=parseInt(this.elmRef.style.width)-1;
   this.idform.style.height=this.elmBody.style.height;
   $('idBody').appendChild(this.idform);
   
   this.idnamelbldiv=document.createElement('div');
   this.idnamelbldiv.style.left=2;
   this.idnamelbldiv.style.top=7;
   this.idnamelbldiv.innerHTML='Shape Name';
   this.idnameindiv=document.createElement('div');
   this.idnameindiv.style.left=2;
   this.idnameindiv.style.top=37;   
   this.idname=document.createElement('input');
   this.idname.id='idname';
   this.idname.type='text';
   this.idname.size=35;
   this.idname.value=selected[0].id;
   this.idform.appendChild(this.idnamelbldiv);
   this.idform.appendChild(this.idnameindiv);
   this.idnameindiv.appendChild(this.idname);
  
   this.idOKindiv=document.createElement('div');
   this.idOKindiv.style.left=45;
   this.idOKindiv.style.top=82;   
   this.idOK=document.createElement('input');
   this.idOK.id='idOK';
   this.idOK.type='button';
   this.idOK.size=10;
   this.idOK.value='OK';
   this.idOK.onclick=function (e) {noBubble(e);updateid()};
   this.idform.appendChild(this.idOKindiv);
   this.idOKindiv.appendChild(this.idOK);
   
   this.idcancelindiv=document.createElement('div');
   this.idcancelindiv.style.left=95;
   this.idcancelindiv.style.top=82;   
   this.idcancel=document.createElement('input');
   this.idcancel.id='idcancel';
   this.idcancel.type='button';
   this.idcancel.size=10;
   this.idcancel.value='Cancel';
   this.idcancel.onclick=function (e) {noBubble(e);$('idmenu').parentNode.removeChild($('idmenu'));inln=false};
   this.idform.appendChild(this.idcancelindiv);
   this.idcancelindiv.appendChild(this.idcancel);

   $('idmenu').appendChild(this.elmHead);
   $('idhead').appendChild(this.elmClose);
   $('idclose').appendChild(this.elmImg);
   $('idhead').appendChild(this.elmUpDown);
   $('idud').appendChild(this.elmImg2);
   
   this.elmRef.style.clip='rect(0,300,'+(parseInt(this.elmRef.style.height)+20)+',0)';
   return this.elmRef;  
   
}

function idclosediv()
{
	var idbody=$('idBody'); 
	if (parseInt(idbody.style.top)+parseInt(idbody.style.height)>25)
	{
		idbody.style.top = parseInt(idbody.style.top)-5;
		setTimeout(function () {idclosediv()},10)
	}
}

function idopendiv()
{
	var idbody=$('idBody'); 
	if (parseInt(idbody.style.top)<25)
	{
		idbody.style.top = parseInt(idbody.style.top)+5;
		setTimeout(function () {idopendiv()},10)
	}
}

function updateid()
{
	if (selected[0].id==$('idname').value) {return};
	var cd =$('canvasdiv');
	var cdc=cd.childNodes;
	var cdcl=cdc.length;
	var nfound=false;
	for (var i=0; i<cdcl; i++)
	{
		if (cdc[i].id==$('idname').value)
		{
			nfound=true;
			i=cdcl+10;
		}
	}

	if (!nfound) 
	{
		selected[0].id=$('idname').value;
		$('idmenu').parentNode.removeChild($('idmenu'));
		inln=false;
	}
	else
	{
		alert('A shape with the name "'+$('idname').value+'" already exists');
	}
}

function shapename()
{
	var idm = new idMenu();
	DDidm=new YAHOO.util.DD('idmenu');
   	DDidm.setHandleElId('idhead');

}