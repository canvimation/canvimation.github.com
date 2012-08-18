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

function addToFilmBoard(el,editing)
{
	var filmboard=$("filmbuildboard");
	var filmlines=$("filmbuildlines");
	FILMBOARD["fl"+ELCOUNT]={};
	flel=FILMBOARD["fl"+ELCOUNT];
	flel.next=FLELHEAD;
	flel.prev=FLELHEAD.prev;
	FLELHEAD.el=flel;
	flel.head=FLELHEAD;
	FLELHEAD.prev.next=flel;
	FLELHEAD.prev=flel;
	flel.head=FLELHEAD;
	flel.prev.head="null";
	var flen=0;
	for(var name in FILMBOARD)
	{
		flen++;
	}
	$("timeline").style.top=((flen+2)*25)+"px";
	FLELHEIGHT=(flen+2)*25+75;
	flel.name=el.name;
	flel.title=el.title;
	flel.source=el.source;
	flel.layer=ELCOUNT;
	flel.A=0;
	flel.D="Never";
	var width = 10*el.title.length; //width for flel.text
	flel.seen=document.createElement("div");
	flel.seen.style.width=parseInt($("filmbuildstory").style.width)+"px";
	flel.seen.style.left="55px";
	flel.seen.style.top=FLELTOP+"px";
	flel.seen.style.height=(parseInt($("timeline").style.top)-parseInt(flel.seen.style.top))+"px";
	flel.seen.style.borderTop="2px solid black";
	flel.seen.style.borderLeft="2px solid black";
	flel.seen.style.borderRight="2px solid black";
	filmlines.appendChild(flel.seen);
	flel.text=document.createElement("div");
	flel.text.innerHTML=el.title;
	flel.text.id="fl"+(ELCOUNT++);
	flel.text.nid=flel.text.id
	flel.text.style.textAlign="center";
	flel.text.style.fontSize="12pt";
	flel.text.style.height="20px";
	flel.text.style.left="60px";
	flel.text.style.top=(FLELTOP-10)+"px";
	flel.text.style.backgroundColor="white";
	flel.text.style.width=width+"px";
	flel.text.style.border="1px solid black";
	flel.text.style.cursor="pointer";
	filmboard.appendChild(flel.text);
	flel.text.onclick =function() {setflel(this)};
	flel.label=document.createElement("div");
	flel.label.innerHTML=el.title;
	flel.label.nid=flel.text.id;
	flel.label.style.labelAlign="center";
	flel.label.style.fontSize="12pt";
	flel.label.style.height="20px";
	flel.label.style.left="5px";
	flel.label.style.top=(FLELTOP-10)+"px";
	flel.label.style.backgroundColor="white";
	flel.label.style.width=width+"px";
	flel.label.style.border="1px solid black";
	flel.label.style.cursor="pointer";
	flel.label.onclick =function() {setflel(this)};
	$("flellist").appendChild(flel.label);
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
	switch (el.source)
	{
		case "scene":
			$("Rin").style.visibility="hidden";
			$("Sin").style.visibility="hidden";
		break
		case "sprite":
			$("currentel").innerHTML+=" R: <input id='Rcin' type='text' size='4' value='0' onchange='setR(this)' />";
			$("currentel").innerHTML+=" S: <input id='Scin' type='text' size='4' value='Never' onchange='setS(this)' />";
			flel.run=document.createElement("div");
			flel.run.style.left="55px";
			if(editing)
			{
				var sprite=el.elm;
			}
			else
			{
				var sprite=SPRITES[el.name];
			}
			if(isNaN(sprite.track.repeats))
			{
				flel.maxruntime="c"; //continuous
				flel.run.style.width=parseInt($("filmbuildstory").style.width)+"px";
				$("Sin").style.left=(parseInt(flel.run.style.left)+2)+"px";
			}
			else
			{
				flel.maxruntime=sprite.ptime*(sprite.track.repeats+1);
				if(sprite.track.yoyo) (flel.maxruntime*=2);
				flel.run.style.width=flel.maxruntime+"px";	
				$("Scin").value=flel.maxruntime;
				$("Sin").style.left=(flel.maxruntime+57)+"px";		
			}
			flel.run.style.top=(FLELTOP+5)+"px";
			flel.run.style.borderTop="2px solid blue";
			flel.run.style.borderLeft="2px solid blue";
			flel.run.style.borderRight="2px solid blue";
			flel.run.style.height=(parseInt($("timeline").style.top)-parseInt(flel.run.style.top))+"px";
			filmlines.appendChild(flel.run);
			flel.R=0;
			flel.S=$("Scin").value;
			$("Rin").value=0;
			$("Rin").onchange=function() {setR(this)};
			$("Rin").style.left=(parseInt(flel.run.style.left)-48)+"px";
			$("Rin").style.top=(parseInt($("timeline").style.top)+35)+"px";
			$("Sin").value=$("Scin").value;
			$("Sin").style.top=(parseInt($("timeline").style.top)+35)+"px";
			$("Sin").onchange=function() {setS(this)};
			$("Rin").style.visibility="inherit";
			$("Sin").style.visibility="inherit";
		break
	}
	for(var name in FILMBOARD)
	{
		FILMBOARD[name].seen.style.height=(parseInt($("timeline").style.top)-parseInt(FILMBOARD[name].seen.style.top))+"px";
		if(FILMBOARD[name].source=="sprite")
		{
			FILMBOARD[name].run.style.height=(parseInt($("timeline").style.top)-parseInt(FILMBOARD[name].run.style.top))+"px";
		}
		FILMBOARD[name].text.style.backgroundColor="#FFFFFF";
		FILMBOARD[name].label.style.backgroundColor="#FFFFFF";
	}
	flel.text.style.backgroundColor="yellow";
	flel.label.style.backgroundColor="yellow";
	FLELTOP+=25;
	FLELHEIGHT+=25;
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
		if(flel.D-flel.A >0.25)
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
	FLELWIDTH=Math.max(FLELWIDTH,flel.A+500);
	$("filmbuildstory").style.width=Math.max((parseInt($("filmbuildbox").style.width)+10),FLELWIDTH)+"px";
	$("scrolllr").style.width=((parseInt($("viewport").style.width)-42)*parseInt($("viewport").style.width)/(parseInt($("filmbuildstory").style.width)))+"px";
	$("timeline").style.width=parseInt($("filmbuildstory").style.width)+"px";	
	for(var name in FILMBOARD)
	{
		if(isNaN(FILMBOARD[name].D))
		{
			FILMBOARD[name].seen.style.width=parseInt($("filmbuildstory").style.width)+"px";
		}
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
	if (n-flel.A<0 && !isNaN(n))
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
		$("Din").value="Never";
		$("Dcin").value="Never";
	}
	else
	{
		flel.D=n;
	}
	if(inp.value.trim().toLowerCase() == "never")
	{
		flel.seen.style.width=parseInt($("filmbuildstory").style.width)+"px";
		$("Din").style.left=(parseInt(flel.seen.style.left)+2)+"px";
		FLELWIDTH=Math.max(FLELWIDTH,flel.A+500);
		if(flel.source=="sprite")
		{alert(["sprite name", flel.name])
			var sprite=SPRITES[flel.name];
			if(isNaN(sprite.track.repeats))
			{
				flel.run.style.width=parseInt($("filmbuildstory").style.width)+"px";
				$("Sin").style.left=(parseInt(flel.run.style.left)+2)+"px";
				$("Scin").value="Never";
				$("Sin").value="Never";
			}
			else
			{
				flel.run.style.width=flel.maxruntime+"px";	
				$("Scin").value=flel.maxruntime;
				$("Sin").value=flel.maxruntime;
				$("Sin").style.left=(flel.start+flel.maxruntime+57)+"px";		
			}
		}
	}
	else
	{
		flel.seen.style.width=(flel.D-flel.A)+"px";
		$("Din").style.left=(parseInt(flel.seen.style.left)+parseInt(flel.seen.style.width)+2)+"px";
		FLELWIDTH=Math.max(FLELWIDTH,flel.D);
		if(flel.source="sprite")
		{
			flel.run.style.borderRight="2px solid blue";
			if(isNaN(flel.maxruntime))
			{
				flel.run.style.width=(flel.D-flel.R)+"px";
				flel.run.style.borderRight="2px solid black";
				$("Sin").style.left=$("Din").style.left;
				$("Scin").value=$("Din").value;
				$("Sin").value=$("Din").value;
				flel.S=$("Sin").value;
			}
			else
			{
				if(flel.S>flel.D)
				{
					flel.run.style.width=(flel.D-flel.S)+"px";
					flel.run.style.borderRight="2px solid black";
					$("Sin").style.left=$(Din).style.left;
					$("Scin").value=$("Din").value;
					$("Sin").value=$("Din").value;
					flel.S=$("Sin").value;
				}
				else
				{
					flel.run.style.width=flel.maxruntime+"px";	
					$("Sin").style.left=(flel.start+flel.maxruntime+2)+"px";
					$("Scin").value=flel.maxruntime;
					$("Sin").value=flel.maxruntime;
					flel.S=$("Sin").value;
				}		
			}
		}
	}
	$("filmbuildstory").style.width=Math.max((parseInt($("filmbuildbox").style.width)+10),FLELWIDTH)+"px";
	$("scrolllr").style.width=((parseInt($("viewport").style.width)-42)*parseInt($("viewport").style.width)/(parseInt($("filmbuildstory").style.width)))+"px";
	$("timeline").style.width=parseInt($("filmbuildstory").style.width)+"px";	
}

function setR(inp)
{
	var flel=FILMBOARD[$("currentel").el];
	var n = parseFloat(inp.value);
	var oldR=flel.R;
	if (isNaN(n))
	{
		alert("Run At time is not a number");
		inp.value=flel.R;
		return;		  
	}
	if (n<0)
	{
		alert('Run At time must be positive.');
		inp.value=flel.R;
		return;
	}
	if(!(isNaN(flel.D)))
	{
		if(n>=flel.D)
		{
			alert("Run At time is after the sprite will disappear.")
		}
	}
	if(inp.id=="Rin")
	{
		$("Rcin").value=$("Rin").value;
	}
	else
	{
		$("Rin").value=$("Rcin").value;
	}
	flel.R=n;
	flel.run.style.left=(55+n)+"px";
	flel.text.style.left=(65+n)+"px";
	$("Rin").style.left=(parseInt(flel.run.style.left)-48)+"px";
	if(isNaN(flel.S))
	{
		$("Sin").style.left=(parseInt(flel.run.style.left)+2)+"px";
	}
	else
	{
		if(flel.S-flel.R >0.25)
		{
			if(flel.S-flel.R>flel.maxruntime)
			{
				flel.S=flel.R+flel.maxruntime;
				$("Sin").value=flel.S;
			    $("Scin").value=flel.S;	
			}
			flel.run.style.width=(flel.S-flel.R)+"px";
		}
		else
		{
			flel.S+=flel.R-oldR;
			$("Sin").value=flel.S;
			$("Scin").value=flel.S;
		}
		$("Sin").style.left=(parseInt(flel.run.style.left)+parseInt(flel.run.style.width)+2)+"px";
	}
}

function setS(inp)
{
	var flel=FILMBOARD[$("currentel").el];
	var n = parseFloat(inp.value);
	if(isNaN(n))
	{
		if(isNaN(flel.maxruntime))
		{
			if (!(inp.value.toLowerCase()=="never") )
			{
				alert("Stop At time is not a number nor 'never'");
				inp.value=flel.S;
				return;		  
			}
		}
		else
		{
			alert("Maximum running time is "+flel.maxruntime+" seconds. Stop At time must be a number.");
			inp.value=flel.S
			return;
		}
	}
	else
	{
		if (n-flel.R<0)
		{
			alert('Stop At time must be greater than Run At time.');
			inp.value=flel.S;
			return;
		}
		if (n>flel.maxruntime)
		{
			alert("Sprite is set to stop after the maximum running time "+flel.maxruntime+" seconds.");
			inp.value=flel.S
			return;
		}
	}
	if(inp.id=="sin")
	{
		$("Scin").value=$("Sin").value;
	}
	else
	{
		$("Sin").value=$("Scin").value;
	}
	if(isNaN(flel.D))
	{
		if(isNaN(n))
		{
				flel.S="Never";
				flel.run.style.width=parseInt($("filmbuildstory").style.width)+"px";
				$("Sin").style.left=(parseInt(flel.run.style.left)+2)+"px";
				$("Sin").value="Never";
				$("Scin").value="Never";
		}
		else
		{
			flel.S=n;
			flel.run.style.width=(flel.S-flel.R)+"px";
			$("Sin").style.left=(parseInt(flel.run.style.left)+parseInt(flel.run.style.width)+2)+"px"
		}
	}
	else
	{
		if(isNaN(n))
		{
			flel.S=flel.D;
		}
		else
		{
			flel.S=n;
		}
		flel.run.style.borderRight="2px solid blue";
		if(flel.S>flel.D)
		{
			flel.run.style.width=(flel.D-flel.R)+"px";
			flel.run.style.borderRight="2px solid black";
			$("Sin").style.left=$(Din).style.left;
			$("Scin").value=$("Din").value;
			$("Sin").value=$("Din").value;
			flel.S=$("Sin").value;
		}
		else
		{
			flel.run.style.width=(flel.S-flel.R)+"px";	
			$("Sin").style.left=(parseInt(flel.run.style.left)+parseInt(flel.run.style.width)+2)+"px";
			$("Scin").value=$("Din").value;
			$("Sin").value=$("Din").value;
		}		
	}
}

function setflel(el)
{
	var flel=FILMBOARD[el.nid];
	for(var name in FILMBOARD)
	{
		FILMBOARD[name].text.style.backgroundColor="#FFFFFF";
		FILMBOARD[name].label.style.backgroundColor="#FFFFFF";
	}
	flel.text.style.backgroundColor="yellow";
	flel.label.style.backgroundColor="yellow";
	flel.seen.style.zIndex=++FLELINDX;
	$("currentel").innerHTML=" &nbsp;Current Element: "+flel.title+" A: <input id='Acin' type='text' size='4' value='0' onchange='setA(this)' />";
	$("currentel").innerHTML+=" D: <input id='Dcin' type='text' size='4' value='Never' onchange='setD(this)' />";		
	$("currentel").el=flel.text.id;
	$("Ain").value=flel.A;
	$("Acin").value=flel.A;
	$("Ain").style.left=(parseInt(flel.seen.style.left)-48)+"px";;
	$("Din").value=flel.D;
	$("Dcin").value=flel.D;
	$("Din").style.left=(parseInt(flel.seen.style.left)+2)+"px";
	switch (flel.source)
	{
		case "scene":
			$("Rin").style.visibility="hidden";
			$("Sin").style.visibility="hidden";
		break
		case "sprite":
			$("currentel").innerHTML+=" R: <input id='Rcin' type='text' size='4' value='0' onchange='setR(this)' />";
			$("currentel").innerHTML+=" S: <input id='Scin' type='text' size='4' value='Never' onchange='setS(this)' />";
			$("Rin").value=flel.R;
			$("Rcin").value=flel.R;
			$("Rin").style.left=(parseInt(flel.run.style.left)-48)+"px";
			$("Sin").value=flel.S;
			$("Scin").value=flel.S;
			$("Sin").style.left=(parseInt(flel.run.style.left)+2)+"px";
			$("Rin").style.top=(parseInt($("timeline").style.top)+35)+"px";
			$("Sin").style.top=(parseInt($("timeline").style.top)+35)+"px";
			$("Sin").style.visibility="inherit";
			$("Rin").style.visibility="inherit";
			flel.run.style.borderTop="2px solid blue";
			flel.run.style.borderLeft="2px solid blue";
			flel.run.style.borderRight="2px solid blue";
		break
	}
}

function flelup()
{
	var flel=FILMBOARD[$("currentel").el];
	var prev=flel.prev;
	if(prev.name=="&head!")
	{
		return;
		//prev=prev.prev
	}
	var prevdata=prev.layer;
	prev.layer=flel.layer;
	flel.layer=prevdata;
	prevdata=prev.text.style.top;
	prev.text.style.top=flel.text.style.top;
	flel.text.style.top=prevdata;
	prevdata=prev.label.style.top;
	prev.label.style.top=flel.label.style.top;
	flel.label.style.top=prevdata;
	prevdata=prev.seen.style.top;
	prev.seen.style.top=flel.seen.style.top;
	flel.seen.style.top=prevdata;
	prevdata=prev.seen.style.height;
	prev.seen.style.height=flel.seen.style.height;
	flel.seen.style.height=prevdata;
	switch (flel.source)
	{
		case "sprite":
			flel.run.style.top=(parseInt(flel.seen.style.top)+5)+"px";
			flel.run.style.height=(parseInt(flel.seen.style.height)-5)+"px";
		break
	}
	switch (prev.source)
	{
		case "sprite":
			prev.run.style.top=(parseInt(prev.seen.style.top)+5)+"px";
			prev.run.style.height=(parseInt(prev.seen.style.height)-5)+"px";
		break
	}
	flel.prev.prev.next=flel;
	flel.next.prev=flel.prev;
	flel.prev.next=flel.next;
	flel.prev=flel.prev.prev;
	flel.next.prev.prev=flel;
	flel.next=flel.next.prev;
}

function fleldown()
{
	var flel=FILMBOARD[$("currentel").el];
	var next=flel.next;
	if(next.name=="&head!")
	{
		return;
		//next=next.next
	}
	var nextdata=next.layer;
	next.layer=flel.layer;
	flel.layer=nextdata;
	nextdata=next.text.style.top;
	next.text.style.top=flel.text.style.top;
	flel.text.style.top=nextdata;
	nextdata=next.label.style.top;
	next.label.style.top=flel.label.style.top;
	flel.label.style.top=nextdata;
	nextdata=next.seen.style.top;
	next.seen.style.top=flel.seen.style.top;
	flel.seen.style.top=nextdata;
	nextdata=next.seen.style.height;
	next.seen.style.height=flel.seen.style.height;
	flel.seen.style.height=nextdata;
	switch (flel.source)
	{
		case "sprite":
			flel.run.style.top=(parseInt(flel.seen.style.top)+5)+"px";
			flel.run.style.height=(parseInt(flel.seen.style.height)-5)+"px";
		break
	}
	switch (next.source)
	{
		case "sprite":
			next.run.style.top=(parseInt(next.seen.style.top)+5)+"px";
			next.run.style.height=(parseInt(next.seen.style.height)-5)+"px";
		break
	}
	flel.next.next.prev=flel;
	flel.prev.next=flel.next;
	flel.next.prev=flel.prev;
	flel.next=flel.next.next;
	flel.prev.next.next=flel;
	flel.prev=flel.prev.next;
}

