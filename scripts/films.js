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
	
	//methods
	this.play=play;
}

function addToFilmBoard(el)
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
	flel.id="fl"+ELCOUNT;
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
	var eldiv=document.createElement("div");
	eldiv.id="div"+flel.id+"stage";
	eldiv.style.top=(el.yOffset||0)+"px";
	eldiv.style.left=(el.xOffset||0)+"px";
	eldiv.style.width=SCRW;
	eldiv.style.height=SCRH;
	eldiv.style.zIndex=flel.layer;
	$("filmstage").appendChild(eldiv);
	flel.DD=new YAHOO.util.DD(eldiv.id);
	switch (el.source)
	{
		case "scene":
			$("Rin").style.visibility="hidden";
			$("Sin").style.visibility="hidden";
			flel.elm=SCENES[flel.name].copyscene("div"+flel.id);
			flel.elm.drawscene();
		break
		case "sprite":
			$("currentel").innerHTML+=" R: <input id='Rcin' type='text' size='4' value='0' onchange='setR(this)' />";
			$("currentel").innerHTML+=" S: <input id='Scin' type='text' size='4' value='Never' onchange='setS(this)' />";
			flel.run=document.createElement("div");
			flel.run.style.left="55px";
			flel.elm=SPRITES[flel.name].copysprite("div"+flel.id);
			flel.elm.zeroPointers();
			flel.elm.saveCanvases();
			flel.elm.transform();
			flel.elm.drawalltracks(true);
			flel.elm.drawsprite();
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
		FILMBOARD[name].DD.unreg();
	}
	flel.text.style.backgroundColor="yellow";
	flel.label.style.backgroundColor="yellow";
	FLELTOP+=25;
	FLELHEIGHT+=25;
	flel.DD.setOuterHandleElId($("dragstage"));
	flel.DD.onMouseUp=function() {
									this.clearConstraints();
									flel.xOffset=parseInt($(this.id).style.left);
									flel.yOffset=parseInt($(this.id).style.top);
								}
	flel.DD.onMouseDown=function() {
										if(xgrid>1)
										{
											this.setXConstraint(2*SCRW,2*SCRW,xgrid);
										}
										if(ygrid>1)
										{
											this.setYConstraint(2*SCRH,2*SCRW,xgrid);
										}
									}
	$("dragstage").style.visibility="visible";
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
		{
			if(isNaN(flel.S))
			{
				flel.run.style.width=parseInt($("filmbuildstory").style.width)+"px";
				$("Sin").style.left=(parseInt(flel.run.style.left)+2)+"px";
				$("Scin").value="Never";
				$("Sin").value="Never";
			}
		}
	}
	else
	{
		flel.seen.style.width=(flel.D-flel.A)+"px";
		$("Din").style.left=(parseInt(flel.seen.style.left)+parseInt(flel.seen.style.width)+2)+"px";
		FLELWIDTH=Math.max(FLELWIDTH,flel.D);
		if(flel.source=="sprite")
		{
			flel.run.style.borderRight="2px solid blue";
			if(isNaN(flel.S))
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
			if (inp.value.toLowerCase()!="never")
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
			$("Sin").style.left=$("Din").style.left;
			$("Scin").value=$("Din").value;
			$("Sin").value=$("Din").value;
			flel.S=$("Sin").value;
		}
		else
		{
			flel.run.style.width=(flel.S-flel.R)+"px";	
			$("Sin").style.left=(parseInt(flel.run.style.left)+parseInt(flel.run.style.width)+2)+"px";
			$("Scin").value=flel.S;
			$("Sin").value=flel.S;
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
		FILMBOARD[name].DD.unreg();
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
	flel.DD=new YAHOO.util.DD("div"+flel.id+"stage");
	flel.DD.setOuterHandleElId($("dragstage"));
	flel.DD.onMouseUp=function() {
									this.clearConstraints();
									flel.xOffset=parseInt($(this.id).style.left);
									flel.yOffset=parseInt($(this.id).style.top);
								}
	flel.DD.onMouseDown=function() {
										if(xgrid>1)
										{
											this.setXConstraint(2*SCRW,2*SCRW,xgrid);
										}
										if(ygrid>1)
										{
											this.setYConstraint(2*SCRH,2*SCRW,xgrid);
										}
									}
}

function flelup()
{
	var flel=FILMBOARD[$("currentel").el];
	var prev=flel.prev;
	if(prev.name=="&head!")
	{
		return;
	}
	var prevdata=prev.layer;
	prev.layer=flel.layer;
	flel.layer=prevdata;
	$(flel.DD.id).style.zIndex=flel.layer;
	$(prev.DD.id).style.zIndex=prev.layer;
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
	}
	var nextdata=next.layer;
	next.layer=flel.layer;
	flel.layer=nextdata;
	$(flel.DD.id).style.zIndex=flel.layer;
	$(next.DD.id).style.zIndex=next.layer;
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

function cancelFilmBuild(child)
{
	cancel=confirm("Do you really want to delete this Film Build?")
	if(cancel)
	{
		for(var name in FILMBOARD)
		{
			if(FILMBOARD[name].source=="sprite")
			{
				FILMBOARD[name].elm.restoreCanvases();
			}
			for(var prop in FILMBOARD[name].elm)
			{
				delete FILMBOARD[name].elm[prop];
			}
			FILMBOARD[name].DD.unreg();
		}
		FILMBOARD={};
		holder=child.parentNode.parentNode;
		holder.style.visibility="hidden";
		clear($("filmstage"));
		$("shapestage").style.visibility="visible";
		$("filmstage").style.visibility="hidden";
		$("dragstage").style.visibility="hidden";
	}
}

function filmPlay(el)
{
	$("blockstage").style.visibility="visible";
	var flel;
	var flay=[];
	var idarray=el.parentNode.id.split(",");
	var topfilm=idarray[0]
	var name=idarray[2];
	$("rewindfm").film=name;
  	$("pausefm").film=name;
  	$("playonfm").film=name;
  	$("stopfm").film=name;
	clear($("filmstage"));
	$("shapestage").style.visibility="hidden";
	$("scenestage").style.visibility="hidden";
	$("filmstage").style.visibility="visible";
	if(topfilm=="non!!!!")
	{
		var film=FILMS[name];
		film.paused=false;
		film.stopped=false;
		film.rewind=false;
	}
	film.active={};
	for(var i=0;i<film.list.length;i++)
	{
		flel=film.elements[film.list[i][0]];
		film.active[film.list[i][0]]=film.list[i][0];
		var eldiv=document.createElement("div");
		eldiv.id="elm"+flel.id+"stage";
		eldiv.style.top=flel.yOffset+"px";
		eldiv.style.left=flel.xOffset+"px";
		eldiv.style.width=SCRW;
		eldiv.style.height=SCRH;
		eldiv.style.zIndex=flel.layer;
		eldiv.style.visibility="hidden";
		$("filmstage").appendChild(eldiv);
		switch(flel.source)
		{
			case "scene":
				flel.elm=SCENES[flel.name].copyscene("elm"+flel.id);
				flel.elm.drawscene();
			break
			case "sprite":
			 	flel.elm=SPRITES[flel.name].copysprite("elm"+flel.id);
			 	STOPCHECKING=false;
			 	flel.elm.zeroPointers();
			 	flel.elm.saveCanvases();
			 	flel.elm.track.drawtrack(false);
				flel.elm.transform();
				flel.elm.drawsprite();
				flel.elm.drawalltracks(false);
			break
		}
	}
	closeAllDialogues();
	$("shapestage").style.visibility="hidden";
	$("filmstage").style.visibility="visible";
	$("rewindfm").style.visibility="visible";
	$("pausefm").style.visibility="visible";
	$("stopfm").style.visibility="visible";
	$("filmtime").style.visibility="visible";
	$("secsfm").style.visibility="visible";
	film.t=0; // time into film
	film.play(0);
}

function play(t)
{
	var stoprun;
	this.t=t;
	$("filmtime").innerHTML=Math.round(t/100)/10+" ";
	var alen=0;
	for(var name in this.active)
	{
		alen++;
	}
	if(alen>0 && !this.paused && !this.stopped)
	{
		for(var name in this.active)
		{
			flel=this.elements[name];
			if(isNaN(flel.S))
			{
				stoprun=t+10;
			}
			else
			{
				stoprun=flel.S;
			}
			if(t>=flel.A*1000)
			{
				$("elm"+flel.id+"stage").style.visibility="visible";
				if(isNaN(flel.D) || (!(isNaN(flel.D)) && t>flel.D*1000) ) //check to leave element visible and delete from this active if stationery
				{
					if(!(isNaN(flel.D)) && t>flel.D*1000)
					{
						$("elm"+flel.id+"stage").style.visibility="hidden";
					}
					switch(flel.source)
					{
						case "scene":
							delete this.active[name];
						break
						case "sprite":
							if(isNaN(flel.S))
							{
								if(flel.elm.finishmove)
								{
									delete this.active[name];
								}
							}
							else
							{
								if(t>flel.S*1000)
								{
									delete this.active[name];
								}
							}
						break
					}
				}
			}
		}
		switch (flel.source)
		{
			case "sprite":
				if(t>=flel.R*1000 && t<stoprun*1000)
				{
					flel.elm.transform();
					flel.elm.drawalltracks(true);
					flel.elm.drawsprite();
				}
			break
		}
		var film=this;
	  	var runthis=setTimeout(function() {film.play(t+50)},50);
	}
	else
	{
		clearTimeout(runthis);
		if(this.rewind) 
		{
			this.t=0;
			this.active={};
			for(var i=0;i<this.list.length;i++)
			{
				flel=this.elements[this.list[i][0]];
				this.active[this.list[i][0]]=this.list[i][0];
				eldiv=$("elm"+flel.id+"stage");
				eldiv.style.visibility="hidden";
				switch(flel.source)
				{
					case "scene":
						flel.elm.drawscene();
					break
					case "sprite":
						STOPCHECKING=false;
						flel.elm.restoreCanvases();
						flel.elm.finishmove=false;
			 			flel.elm.zeroPointers();
			 			flel.elm.saveCanvases();
			 			flel.elm.track.drawtrack(false);
						flel.elm.transform();
						flel.elm.drawsprite();
						flel.elm.drawalltracks(false);
					break
				}
			}
		}
	}
}

function playonfilm(name)
{
	var film=FILMS[name];
	$("pausefm").style.visibility="visible";
	$("playonfm").style.visibility="hidden";
	FILMS[name].paused=false;
	STOPCHECKING=false;
	FILMS[name].stopped=false;
	FILMS[name].rewind=false;
	film.play(film.t);
}

function rewindfilm(name)
{
	FILMS[name].rewind=true;
	STOPCHECKING=true;
	FILMS[name].stopped=true;
	$("pausefm").style.visibility="hidden";
	$("playonfm").style.visibility="visible";
	FILMS[name].paused=true;
	film.t=0;
	
}

function pausefilm(name)
{
	$("pausefm").style.visibility="hidden";
	$("playonfm").style.visibility="visible";
	FILMS[name].paused=true;
}

function stopfilm(name)
{
	STOPCHECKING=true;
	FILMS[name].stopped=true;
	$("rewindfm").style.visibility="hidden";
	$("pausefm").style.visibility="hidden";
	$("stopfm").style.visibility="hidden";
	$("playonfm").style.visibility="hidden";
	$("filmtime").style.visibility="hidden";
	$("secsfm").style.visibility="hidden";
	$("toolbar").style.visibility="visible";
	$("anibar").style.visibility="visible";
	$("shapestage").style.visibility="visible";
	clear($("filmstage"));
	$("filmstage").style.visibility="hidden";
	$("blockstage").style.visibility="hidden";
}
