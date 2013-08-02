/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function exportCode()
{	
	var shapelist=[];
	var nameZ=[];
	for (var name in SHAPES)
	{
		nameZ=[];
		nameZ.push(name);
		nameZ.push(SHAPES[name].zIndex);
		shapelist.push(nameZ);
	}
	shapelist.sort(compareZ);
	htmltext='<!DOCTYPE HTML>\n';
	htmltext+='<html>\n';
	htmltext+=SPACES.substr(0,3)+'<head>\n';
	htmltext+=SPACES.substr(0,6)+'<style>\n';
	htmltext+=SPACES.substr(0,9)+'#canvasarea\n';
	htmltext+=SPACES.substr(0,9)+'{\n';
	htmltext+=SPACES.substr(0,12)+'border:black 1px solid;\n';
	htmltext+=SPACES.substr(0,9)+'}\n';
	htmltext+=SPACES.substr(0,6)+'</style>\n';
	htmltext+=SPACES.substr(0,6)+'<!--[IF LT IE 9]><script type="text/javascript" src = "excanvas.js" ></script><![endif]-->\n';
	htmltext+=SPACES.substr(0,6)+'<script type="text/javascript">\n';
	htmltext+=SPACES.substr(0,9)+'function setcanvas()\n';
	htmltext+=SPACES.substr(0,9)+'{\n';
	htmltext+=SPACES.substr(0,12)+'var canvas = document.getElementById("canvasarea");\n';  
	htmltext+=SPACES.substr(0,12)+'if (canvas.getContext)\n';
	htmltext+=SPACES.substr(0,12)+'{\n';  
	htmltext+=SPACES.substr(0,15)+'var ctx = canvas.getContext("2d");\n';
	htmltext+=SPACES.substr(0,15)+'drawcanvas(ctx);\n';
	htmltext+=SPACES.substr(0,12)+'}\n'; 
	htmltext+=SPACES.substr(0,12)+'else\n';
	htmltext+=SPACES.substr(0,12)+'{\n';  
	htmltext+=SPACES.substr(0,15)+'alert("Canvas NOT supported");\n';   
	htmltext+=SPACES.substr(0,12)+'}\n'; 
	htmltext+=SPACES.substr(0,9)+'}\n';
	htmltext+=SPACES.substr(0,9)+'\n';
	htmltext+=SPACES.substr(0,9)+'function drawcanvas(ctx)\n';
	htmltext+=SPACES.substr(0,9)+'{\n';
	for(var i=0;i<shapelist.length;i++)
	{
		shapecode(shapelist[i][0]);
	} 	
	htmltext+=SPACES.substr(0,9)+'}\n';
	htmltext+=SPACES.substr(0,6)+'</script>\n';
	htmltext+=SPACES.substr(0,3)+'</head>\n';
	htmltext+=SPACES.substr(0,3)+'<body onload="setcanvas()">\n';
	htmltext+=SPACES.substr(0,6)+'<canvas id="canvasarea" width="'+parseInt($("stagearea").style.width)+'" height="'+parseInt($("stagearea").style.height)+'"></canvas>\n'; 	

	htmltext+=SPACES.substr(0,3)+'</body>\n';
	htmltext+='</html>\n';
	$("html_zone").value="";
	$("codetextbox").style.visibility="visible";
	$("html_zone").value=htmltext;
}



function compareZ(a,b)
{
	return a[1]-b[1];
}