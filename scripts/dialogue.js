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
	if(parseInt($("colorcont").style.width)<531)
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
		if(parseInt($("colorcont").style.width)<531)
		{
			$("colorcont").style.width=parseInt($("colorcont").style.width)+10;
			$("coldigits").style.left=parseInt($("coldigits").style.left)+10;
			setTimeout(function() {pullopen()},10)
		}
		else
		{
			$("colorcont").style.width=531;
			$("coldigits").style.left=351;
		}
	}
	
	function pushclosed()
	{
		if(parseInt($("colorcont").style.width)>335)
		{
			$("colorcont").style.width=parseInt($("colorcont").style.width)-10;
			$("coldigits").style.left=parseInt($("coldigits").style.left)-10;
			setTimeout(function() {pushclosed()},10)
		}
		else
		{
			$("colorcont").style.width=335;
			$("coldigits").style.left=155;
		}
	}
}
