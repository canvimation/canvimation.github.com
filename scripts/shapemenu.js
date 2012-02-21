/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function shapeMenu()
{
   this.elmRef = document.createElement('div');
   this.elmRef.id  = 'shapemenu';
   this.elmRef.style.left= 75; 
   this.elmRef.style.top= 50;
   this.elmRef.style.width=140;
   this.elmRef.style.height=2+(1+Math.floor((shapes.length-1)/4))*34;
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
	   this.img.style.top=2+Math.floor(i/4)*34;
	   this.img.style.left=2+(i%4)*34;
	   this.img.height=32;
	   this.img.width=32;
	   this.img.src='assets/'+shapes[i][2]+'.png';
	   this.img.srcout=this.img.src;
	   this.img.srcin='assets/'+shapes[i][2]+'1.png'
	   this.img.open=shapes[i][0];
	   this.img.edit=shapes[i][1];
	   this.img.alt=shapes[i][2];
	   this.img.title=shapes[i][2];
	   this.img.onmouseover=function(e){noBubble(e);this.src=this.srcin};
	   this.img.onmouseout=function(){this.src=this.srcout};
	   this.img.onclick=function(e) 
	   					{
	   							$("shapemenu").style.visibility="hidden";
	   							noBubble(e);
	   							var shape=new Shape("Shape"+(SHAPECOUNT++),this.open,this.edit,this.title);
	   							$("markerdrop").style.visibility="hidden";
	   							clear($("markerdrop"));
	   							BACKDROP.Canvas.ctx.clearRect(0,0,SCRW,SCRH);
	   							$("backstage").style.visibility="hidden";
	   							shape.addTo($("shapestage"));
	   							shape.Canvas.style.cursor="crosshair";
	   							shape.Canvas.onmousedown=function(e){this.shape.setPath(getPosition(e))}
	   					}
	   this.elmRef.appendChild(this.img);
   }
}