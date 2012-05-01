/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function RightH(parentdiv) 
{
   
   if($('righth')) {$('righth').parentNode.removeChild($('righth'))};
   this.elmRef = document.createElement('div');
   this.elmRef.id  = 'righth'+parentdiv.id;
   this.elmRef.style.position='absolute';
   this.elmRef.style.left= (parseInt(parentdiv.style.width)-5)+"px"; 
   this.elmRef.style.top= (parseInt(parentdiv.style.height)/2-5)+"px";
   this.elmRef.style.cursor='e-resize';
   this.elmRef.style.fontSize=0;
   this.elmRef.style.width=10+"px";
   this.elmRef.style.height=10+"px";
   this.elmRef.parentdiv=parentdiv;
   this.elmRef.style.backgroundColor="white"; 
   this.elmRef.style.border="solid black 1px";   
   this.elmRef.parentdiv.appendChild(this.elmRef);
   return this.elmRef;
  }


    

       


