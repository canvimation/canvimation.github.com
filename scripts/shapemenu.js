/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function showmenu()
{
	if($("done").style.visibility=="hidden")
	{
		var smenu=$('shapemenu');
	}
	else
	{
		var smenu=$('listshapebox');
	}
	if (parseInt($('toolbar').style.left)>0.85*SCRW)
	{
		smenu.style.left=-65;
	}
	smenu.style.visibility='visible';
	//$('markerdrop').style.visibility='hidden';
	clear($("markerdrop"));
	MCOUNT=0;
	$('group').style.visibility='hidden';
	$('ungroup').style.visibility='hidden';
	$('stylelines').style.visibility='hidden';
	$('collines').style.visibility='hidden';	
	$('colfill').style.visibility='hidden';
	$('gradfill').style.visibility='hidden';
	$('rotate').style.visibility='hidden';
	$('front').style.visibility='hidden';
	$('back').style.visibility='hidden';
	$('del').style.visibility='hidden';
	$('copy').style.visibility='hidden';
	$('editlines').style.visibility='hidden';
	$('vert').style.visibility='hidden';
	$('horz').style.visibility='hidden';
	$('alntop').style.visibility='hidden';
	$('alnbot').style.visibility='hidden';
	$('alnleft').style.visibility='hidden';
	$('alnright').style.visibility='hidden';
	$('shadow').style.visibility='hidden';
	$('sname').style.visibility='hidden';
	$('fopts').style.visibility='hidden';
	closeColor();
	removeGradLine();
	removeRotate();
	clear($('bodydiv'));
	SELECTED={};
}

function imageShapeMenu()
{
   this.elmRef = document.createElement('div');
   this.elmRef.id  = 'shapemenu';
   this.elmRef.style.left= 75+"px"; 
   this.elmRef.style.top= 50+"px";
   this.elmRef.style.width=140+"px";
   this.elmRef.style.height=(2+(1+Math.floor((shapes.length-1)/4))*34)+"px";
   this.elmRef.style.visibility='hidden';
   this.elmRef.style.backgroundColor='white';
   this.elmRef.style.border='solid black 1px';
   $('toolbar').appendChild(this.elmRef);	
   for (var i=0; i<shapes.length;i++)
   {
	   this.img=document.createElement('img');
	   this.img.style.position='absolute';
	   this.img.id='sh'+i;
	   this.img.i=i;
	   this.img.style.top=(2+Math.floor(i/4)*34)+"px";
	   this.img.style.left=(2+(i%4)*34)+"px";
	   this.img.height=32;
	   this.img.width=32;
	   this.img.src='assets/'+shapes[i][2]+'.png';
	   this.img.srcout=this.img.src;
	   this.img.srcin='assets/'+shapes[i][2]+'1.png'
	   this.img.open=shapes[i][0];
	   this.img.edit=shapes[i][1];
	   this.img.alt=shapes[i][2];
	   this.img.type=shapes[i][2];
	   this.img.onmouseover=function(e){noBubble(e);this.src=this.srcin};
	   this.img.onmouseout=function(){this.src=this.srcout};
	   this.img.onclick=function(e) 
	   					{
	   							$("shapemenu").style.visibility="hidden";
	   							noBubble(e);
	   							var shape=new Shape("Shape"+SCOUNT,"Shape"+(SCOUNT++),this.open,this.edit,this.type,SHAPES);
	   							shape.group=new Group(GROUPS,"Group"+GCOUNT,"Group"+(GCOUNT++),shape);  							
	   							shape.zIndex=ZPOS++;
	   							$("markerdrop").style.visibility="hidden";
	   							$("frontmarkerdrop").style.visibility="hidden";
	   							clear($("markerdrop"));
	   							$("boundarydrop").style.visibility="hidden";
	   							clear($("boundarydrop"));
	   							BACKDROP.Canvas.ctx.clearRect(0,0,SCRW,SCRH);
	   							SELECTED={};
	   							BCOUNT=0;
	   							$("backstage").style.visibility="hidden";
								$("scenestage").style.visibility="hidden";
								$("spritestage").style.visibility="hidden";
								$("trackstage").style.visibility="hidden";
								$("tweenstage").style.visibility="hidden";
								$("tweenpathsstage").style.visibility="hidden";
								$("blockstage").style.visibility="hidden";
	   							shape.addTo($("shapestage"));
	   							shape.Canvas.style.cursor="crosshair";
	   							shape.Canvas.onmousedown=function(e){this.shape.setPath(getPosition(e))};
	   							hideTools();
	   					}
	   this.elmRef.appendChild(this.img);
   }
}