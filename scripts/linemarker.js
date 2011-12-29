/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function linemarker(n,cursor,col) 
{
   this.elmRef = document.createElement('div');
   this.elmRef.id  = 'lnm'+n;
   this.elmRef.style.left= cursor.x-4; 
   this.elmRef.style.top= cursor.y-4;
   this.elmRef.style.fontSize=0;
   this.elmRef.style.width=8;
   this.elmRef.style.height=8;
   this.elmRef.style.visibility='visible';
   this.elmRef.style.backgroundColor=col;
   this.elmRef.backgroundColor=this.elmRef.style.backgroundColor;
   this.elmRef.style.border="solid black 1px";
   this.elmRef.style.cursor='move';
   this.elmRef.onmouseover=function(){
										inln=true;
									};
   this.elmRef.onmouseout=function(){
	   									inln=false;
									};
	this.elmRef.onclick	=function(){
										if ((this.style.backgroundColor!='white')&& (curcanv.complete) )
										{
										    shade(this,'#FEFEFE');
											if (parseInt(this.id.substr(3))%3==0) 
											{
												cp = new pointsMenu(curcanv,this);
   												DDcp=new YAHOO.util.DD('pmenu');
   												DDcp.setHandleElId('phead');
											}
										}							
									};							
   $('bodydiv').appendChild(this.elmRef);
   return this.elmRef;
   
   function shade(mrk,col)
   {
	  	var id=parseInt(mrk.id.substr(3));
		if (id%3==0)
		{
	  		for (var i=0;i<lnmrks;i+=3)
			{
				$('lnm'+ i).style.backgroundColor='#FEFEFE';
				$('lnm'+ i).backgroundColor='#FEFEFE';
			}	
			$('lnm'+id).style.backgroundColor='#FFFF00';
			$('lnm'+id).backgroundColor='#FFFF00';
			mod=lnmrks+100;
			if (curcanv.path[2]=='freeform') {mod=lnmrks};
			if ($('lnm'+(id+3)%mod)) {
															$('lnm'+(id+3)%mod).style.backgroundColor='#95B3D7';
															$('lnm'+(id+3)%mod).backgroundColor='#95B3D7'
															};
		}
	}
}


    

       


