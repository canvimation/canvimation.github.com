function updialogue(img,content)
{
	var box=$(content);
	var holder=box.parentNode;
	var height=parseInt(holder.style.height);
	if(height>25)
	{
		img.src='assets/down.png';
		holder.height=height;
		setTimeout(function () {close()},50);
	}
	else
	{
		img.src='assets/up.png';
		setTimeout(function () {open()},50);
	}
	function close()
	{
		if (parseInt(holder.style.height)>25)
		{
			box.style.top=parseInt(box.style.top)-10;
			holder.style.height=parseInt(holder.style.height)-10
			setTimeout(function () {close()},10)
		}
		else
		{
			holder.style.height=25;
		}
	}
	
	function open()
	{
		if (parseInt(holder.style.height)<holder.height)
		{
			box.style.top=parseInt(box.style.top)+10;
			holder.style.height=parseInt(holder.style.height)+10
			setTimeout(function () {open()},10)
		}
		else
		{
			holder.style.height=holder.height;
		}
	}
	
}

function closedialogue(img)
{
	holder=img.parentNode.parentNode;
	holder.style.visibility="hidden";
}

function colexpand()
{
	if(parseInt($("colorbox").style.width)<531)
	{
		$("colptr").src="assets/closepointer.png";
		pullopen();
	}
	else
	{
		$("colptr").src="assets/openpointer.png";
		pushclosed();
	}
	
	function pullopen()
	{
		if(parseInt($("colorbox").style.width)<531)
		{
			$("colorbox").style.width=parseInt($("colorbox").style.width)+10;
			$("coldigits").style.left=parseInt($("coldigits").style.left)+10;
			setTimeout(function() {pullopen()},10)
		}
		else
		{
			$("colorbox").style.width=531;
			$("coldigits").style.left=351;
		}
	}
	
	function pushclosed()
	{
		if(parseInt($("colorbox").style.width)>335)
		{
			$("colorbox").style.width=parseInt($("colorbox").style.width)-10;
			$("coldigits").style.left=parseInt($("coldigits").style.left)-10;
			setTimeout(function() {pushclosed()},10)
		}
		else
		{
			$("colorbox").style.width=335;
			$("coldigits").style.left=155;
		}
	}
}

function linestyles()
{
	$('linewidth').value=SELECTEDSHAPE.lineWidth;
   	$('selectcap').value=SELECTEDSHAPE.lineCap;
   	$('selectjoin').value=SELECTEDSHAPE.lineJoin;
   	$("linebox").style.visibility="visible";
}

function updateLines()
{
	for(var groupName in SELECTED)
		{
			var group=SELECTED[groupName];

			var shapeNames=group.memberShapes();
			for(var name in shapeNames)
			{
				shape=shapeNames[name];
				shape.lineWidth=$('linewidth').value;
   				shape.lineCap = $('selectcap').value;
   				shape.lineJoin = $('selectjoin').value;
				shape.draw();
			}
		}	
}
