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
	FLELHEIGHT=(flen+2)*25+75;
	flel.name=name;
	flel.title=el.title;
	flel.source=el.source;
	flel.A=0;
	flel.D="Never";
	var width = 10*el.title.length; //width for flel.text
	flel.seen=document.createElement("div");
	flel.seen.className="flel100pct";
	flel.seen.style.left="55px";
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
	flel.text.id="fl"+(ELCOUNT++);
	flel.text.style.textAlign="center";
	flel.text.style.fontSize="12pt";
	flel.text.style.height="20px";
	flel.text.style.left="60px";
	flel.text.style.top=(FLELTOP-10)+"px";
	flel.text.style.backgroundColor="white";
	flel.text.style.width=width+"px";
	flel.text.style.border="1px solid black";
	flel.text.style.cursor="pointer";
	flel.text.onclick =function() {setflel(this)};
	FLELTOP+=25;
	filmboard.appendChild(flel.text);
	for(var name in FILMBOARD)
	{
		FILMBOARD[name].seen.style.height=(parseInt($("timeline").style.top)-parseInt(FILMBOARD[name].seen.style.top))+"px";
		FILMBOARD[name].text.style.backgroundColor="#FFFFFF";
	}
	flel.text.style.backgroundColor="yellow";
	switch (el.source)
	{
		case "scene":
			$("currentel").innerHTML=" &nbsp;Current Element: "+el.title+" A: <input id='Acin' type='text' size='4' value='0' onchange='setA(this)' />";
			$("currentel").innerHTML+=" D: <input id='Dcin' type='text' size='4' value='Never' onchange='setD(this)' />";		
			$("currentel").el=flel.text.id;
			$("Ain").value=0;
			$("Ain").onchange=function() {setA(this)};
			$("Ain").style.left=(parseInt(flel.seen.style.left)-48)+"px";
			$("Ain").style.top=(parseInt($("timeline").style.top)+5)+"px";
			$("Din").value="Never";
			$("Din").style.left=(parseInt(flel.seen.style.left)+2)+"px";
			$("Din").style.top=(parseInt($("timeline").style.top)+5)+"px";
			$("Din").onchange=function() {setD(this)};
			$("Ain").style.visibility="inherit";
			$("Din").style.visibility="inherit";
		break
		case "sprite":
			flel.start=0;
			flel.end=ptime;
		break
	}
}

function setA(inp)
{
	var flel=FILMBOARD[$("currentel").el];
	var n = parseFloat(inp.value);
	var oldA=flel.A;
	if (isNaN(n))
	{
		alert("Appear time is not a number");
		inp.value=flel.A;
		return;		  
	}
	if (n<0)
	{
		alert('Appear time must be positive.');
		inp.value=flel.A;
		return;
	}
	if(inp.id=="Ain")
	{
		$("Acin").value=$("Ain").value;
	}
	else
	{
		$("Ain").value=$("Acin").value;
	}
	flel.A=n;
	flel.seen.style.left=(55+n)+"px";
	flel.text.style.left=(65+n)+"px";
	$("Ain").style.left=(parseInt(flel.seen.style.left)-48)+"px";
	if(isNaN(flel.D))
	{
		$("Din").style.left=(parseInt(flel.seen.style.left)+2)+"px";
	}
	else
	{
		if(flel.D-flel.A >2)
		{
			flel.seen.style.width=(flel.D-flel.A)+"px";
			
		}
		else
		{
			flel.D+=flel.A-oldA;
			$("Din").value=flel.D;
			$("Dcin").value=flel.D;
		}
		$("Din").style.left=(parseInt(flel.seen.style.left)+parseInt(flel.seen.style.width)+2)+"px";
	}
}

function setD(inp)
{
	var flel=FILMBOARD[$("currentel").el];
	var n = parseFloat(inp.value);
	if (isNaN(n) && !(inp.value.toLowerCase()=="never") )
	{
		alert("Disappear time is not a number nor 'never'");
		inp.value=flel.D;
		return;		  
	}
	if (n-flel.A<2 && !isNaN(n))
	{
		alert('Disappear time must be greater than Appear time.');
		inp.value=flel.D;
		return;
	}
	if(inp.id=="Din")
	{
		$("Dcin").value=$("Din").value;
	}
	else
	{
		$("Din").value=$("Dcin").value;
	}
	if(isNaN(n))
	{
		flel.D="Never";
	}
	else
	{
		flel.D=n;
	}
	if(inp.value.trim().toLowerCase() == "never")
	{
		flel.seen.parentNode.removeChild(flel.seen);
		flel.seen=document.createElement("div");
		flel.seen.className="flel100pct";
		flel.seen.style.left=(flel.A+55)+"px";
		flel.seen.rgbar=document.createElement("div");
		flel.seen.rgbar.className="rightbar";
		flel.seen.appendChild(flel.seen.rgbar);
		flel.seen.lfbar=document.createElement("div");
		flel.seen.lfbar.className="fleftbar";
		flel.seen.appendChild(flel.seen.lfbar);
		flel.seen.style.top=(parseInt(flel.text.style.top)+10)+"px";
		flel.seen.style.borderTop="2px solid black";
		flel.seen.style.height=(parseInt($("timeline").style.top)-parseInt(flel.seen.style.top))+"px";
		$("filmbuildlines").appendChild(flel.seen);
		$("Din").style.left=(parseInt(flel.seen.style.left)+2)+"px";
	}
	else
	{
		flel.seen.style.width=(flel.D-flel.A)+"px";
		$("Din").style.left=(parseInt(flel.seen.style.left)+parseInt(flel.seen.style.width)+2)+"px";
	}
}

function setflel(el)
{
	var flel=FILMBOARD[el.id];
	for(var name in FILMBOARD)
	{
		FILMBOARD[name].text.style.backgroundColor="#FFFFFF";
	}
	flel.text.style.backgroundColor="yellow";
	flel.seen.style.zIndex=++FLELINDX;
	switch (flel.source)
	{
		case "scene":
			$("currentel").innerHTML=" &nbsp;Current Element: "+flel.title+" A: <input id='Acin' type='text' size='4' value='0' onchange='setA(this)' />";
			$("currentel").innerHTML+=" D: <input id='Dcin' type='text' size='4' value='Never' onchange='setD(this)' />";		
			$("currentel").el=flel.text.id;
			$("Ain").value=flel.A;
			$("Acin").value=flel.A;
			$("Ain").style.left=(parseInt(flel.seen.style.left)-48)+"px";
			$("Ain").style.top=(parseInt($("timeline").style.top)+5)+"px";
			$("Din").value=flel.D;
			$("Dcin").value=flel.D;
			$("Din").style.left=(parseInt(flel.seen.style.left)+2)+"px";
			$("Din").style.top=(parseInt($("timeline").style.top)+5)+"px";
		break
		case "sprite":
			flel.start=0;
			flel.end=ptime;
		break
	}
}

