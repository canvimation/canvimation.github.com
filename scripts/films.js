/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function Film(name)
{
	this.name=name;
	this.title;
	this.elements={};
}

function addToFilmBoard(el,source)
{
	var filmboard=$("filmbuildboard");
	var filmlines=$("filmbuildlines");
	FILMBOARD["fl"+ELCOUNT]={};
	flel=FILMBOARD["fl"+ELCOUNT];
	var flen=0;
	for(var name in FILMBOARD)
	{
		flen++;
	}
	$("timeline").style.top=((flen+2)*25)+"px";
	flel.name=name;
	flel.title=el.title;
	flel.source=el.source;
	flel.appear=0;
	flel.hide="e"
	var width = 10*el.title.length; //width for flel.textalert()
	flel.seen=document.createElement("div");
	flel.seen.style.width=(width+20)+"px";
	flel.seen.style.left="5px";
	flel.seen.rgbar=document.createElement("div");
	flel.seen.rgbar.className="rightbar";
	flel.seen.appendChild(flel.seen.rgbar);
	flel.seen.lfbar=document.createElement("div");
	flel.seen.lfbar.className="fleftbar";
	flel.seen.appendChild(flel.seen.lfbar);
	flel.seen.style.top=FLELTOP+"px";
	flel.seen.style.borderTop="2px solid black";
	flel.seen.style.height=(parseInt($("timeline").style.top)-parseInt(flel.seen.style.top))+"px";
	filmlines.appendChild(flel.seen);
	
	flel.text=document.createElement("div");
	flel.text.innerHTML=el.title;
	flel.text.id="fleltext"+(ELCOUNT++);
	flel.text.style.textAlign="center";
	flel.text.style.fontSize="12pt";
	flel.text.style.height="20px";
	flel.text.style.left="10px";
	flel.text.style.top=(FLELTOP-10)+"px";
	flel.text.style.backgroundColor="white";
	flel.text.style.width=width+"px";
	flel.text.style.border="1px solid black";
	FLELTOP+=25;
	filmboard.appendChild(flel.text);
	for(var name in FILMBOARD)
	{
		FILMBOARD[name].seen.style.height=(parseInt($("timeline").style.top)-parseInt(FILMBOARD[name].seen.style.top))+"px";
	}
	switch (el.source)
	{
		case "scene":
			
		break
		case "sprite":
			flel.start=0;
			flel.end=ptime;
		break
	}
	
}
