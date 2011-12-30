/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function writeCanvas()
{
	if($('canvasdiv').childNodes.length==0)
	{
		alert('No work to export');
		return
	}	
	var cnvs=[];
	var cnidx=[];
	for (var i=0; i<$("canvasdiv").childNodes.length; i++)
	{
		cnidx=[];
		cnidx.push($("canvasdiv").childNodes[i].id);
		cnidx.push($("canvasdiv").childNodes[i].zIndex);
		cnvs.push(cnidx);
	}
	cnvs.sort(compareZ);
	spaces=" ".repeat(100);
	newwindow=window.open('','export');
	newwindow.document.writeln('<html>');
	newwindow.document.writeln(spaces.substr(0,3)+'<head>');
	newwindow.document.writeln(spaces.substr(0,6)+'<style>');
	newwindow.document.writeln(spaces.substr(0,9)+'#canvaspace');
	newwindow.document.writeln(spaces.substr(0,9)+'{');
	newwindow.document.writeln(spaces.substr(0,12)+'border:black 1px solid;');
	newwindow.document.writeln (spaces.substr(0,9)+'}');
	newwindow.document.writeln(spaces.substr(0,6)+'</style>');
	newwindow.document.writeln(spaces.substr(0,6)+'<!--[IF IE]><script type="text/javascript" src = "excanvas.js" ></script><![endif]-->');
	newwindow.document.writeln(spaces.substr(0,6)+'<script type="text/javascript">');
	newwindow.document.writeln(spaces.substr(0,9)+'function setcanvas()');
	newwindow.document.writeln(spaces.substr(0,9)+'{');
	newwindow.document.writeln(spaces.substr(0,12)+'var canvas = document.getElementById("canvaspace");');  
	newwindow.document.writeln(spaces.substr(0,12)+'if (canvas.getContext)');
	newwindow.document.writeln(spaces.substr(0,12)+'{');  
	newwindow.document.writeln(spaces.substr(0,15)+'var ctx = canvas.getContext("2d");');
	newwindow.document.writeln(spaces.substr(0,15)+'ctx.scale('+(100/magscale)+','+(100/magscale)+');');
	newwindow.document.writeln(spaces.substr(0,15)+'drawcanvas(ctx);');
	newwindow.document.writeln (spaces.substr(0,12)+'}'); 
	newwindow.document.writeln(spaces.substr(0,12)+'else');
	newwindow.document.writeln(spaces.substr(0,12)+'{');  
	newwindow.document.writeln(spaces.substr(0,15)+'alert("Canvas NOT supported");');   
	newwindow.document.writeln (spaces.substr(0,12)+'}'); 
	newwindow.document.writeln (spaces.substr(0,9)+'}');
	newwindow.document.writeln (spaces.substr(0,9));
	newwindow.document.writeln (spaces.substr(0,9)+'function drawcanvas(ctx)');
	newwindow.document.writeln(spaces.substr(0,9)+'{');
	for(var i=0;i<cnvs.length;i++)
	{
		exportline($(cnvs[i][0]),0,0);
	} 	
	newwindow.document.writeln (spaces.substr(0,9)+'}');
	newwindow.document.writeln(spaces.substr(0,6)+'</script>');
	newwindow.document.writeln(spaces.substr(0,3)+'</head>');
	newwindow.document.writeln(spaces.substr(0,3)+'<body onload="setcanvas()">');
	newwindow.document.writeln(spaces.substr(0,6)+'<canvas id="canvaspace" width="'+actualwidth+'" height="'+actualheight+'"></canvas>'); 	

	newwindow.document.writeln(spaces.substr(0,3)+'</body>');
	newwindow.document.writeln('</html>');
	newwindow.document.close();
}

function compareZ(a,b)
{
	return a[1]-b[1];
}