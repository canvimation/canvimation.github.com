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

function pointEdit(mark)
{
	if(mark.node.shape.type=="freeform" || mark.node.shape.type=="curve")
	{
		for(var i=0; i<$("markerdrop").childNodes.length; i++)
		{
			$("markerdrop").childNodes[i].style.backgroundColor="#FFFFFF";
		}
		$("pointsbox").style.visibility="visible";
		$("pointsbox").mark=mark;
		//$("p_smooth").style.visibility="hidden";
		//$("p_inline").style.visibility="hidden";
		$("p_open").style.visibility="hidden";
		$("p_line").style.visibility="hidden";
		$("p_line2").style.visibility="hidden";
		$("p_add").style.visibility="hidden";
		$("p_add2").style.visibility="hidden";
		$("p_close").style.visibility="hidden";
		$("p_corner").style.backgroundColor="#FFFFFF";
		$("p_corner").style.color="#000000";
		$("p_smooth").style.backgroundColor="#FFFFFF";
		$("p_smooth").style.color="#000000";
		$("p_inline").style.backgroundColor="#FFFFFF";
		$("p_inline").style.color="#000000";
		$("p_corner").onmouseover=function() {this.style.backgroundColor="yellow"};
		$("p_corner").onmouseout=function(){this.style.backgroundColor="#FFFFFF"};
		$("p_smooth").onmouseover=function() {this.style.backgroundColor="yellow"};
		$("p_smooth").onmouseout=function(){this.style.backgroundColor="#FFFFFF"};
		$("p_inline").onmouseover=function() {this.style.backgroundColor="yellow"};
		$("p_inline").onmouseout=function(){this.style.backgroundColor="#FFFFFF"};
		$("p_corner").onclick=function(){updateCorner(mark.node,"corner")};
		$("p_smooth").onclick=function(){updateCorner(mark.node,"smooth")};
		$("p_inline").onclick=function(){updateCorner(mark.node,"inline")};
		mark.style.backgroundColor="red";
		switch(mark.node.corner)
		{
			case "corner":
				$("p_corner").style.backgroundColor="#EEEEEE";
				$("p_corner").style.color="#999999";
				$("p_corner").onmouseover=function() {this.style.backgroundColor="#EEEEEE"};
				$("p_corner").onmouseout=function(){this.style.backgroundColor="#EEEEEE"};
				$("p_corner").onclick=function(){};
			break
			case "smooth":
				$("p_smooth").style.backgroundColor="#EEEEEE";
				$("p_smooth").style.color="#999999";
				$("p_smooth").onmouseover=function() {this.style.backgroundColor="#EEEEEE"};
				$("p_smooth").onmouseout=function(){this.style.backgroundColor="#EEEEEE"};
				$("p_smooth").onclick=function(){};
			break
			case "inline":
				$("p_inline").style.backgroundColor="#EEEEEE";
				$("p_inline").style.color="#999999";
				$("p_inline").onmouseover=function() {this.style.backgroundColor="#EEEEEE"};
				$("p_inline").onmouseout=function(){this.style.backgroundColor="#EEEEEE"};
				$("p_inline").onclick=function(){};
			break
		}
		
		
	}
}

function updateCorner(node,corner)
{
	if(node.shape.type=="curve" && (node.next.point.x=="end" || node.prev.point.x=="end"))
	{
		return;
	}
	if(node.shape.type=="freeform" && node.next.point.x=="end")
	{
		var nextnode=node.next.next.next;
	}
	else
	{
		var nextnode=node.next;
	}
	
	if(corner=="smooth")
	{
		var c1=new Point(nextnode.ctrl1.x-node.point.x,nextnode.ctrl2.y-node.point.y);
		var c2=new Point(node.ctrl2.x-node.point.x,node.ctrl2.y-node.point.y);
		var p=vecAdd(c1,c2);
		if(node.corner=="corner")
		{
			var phi=arctan(c2.y,c2.x);
			var psi=arctan(c1.y,c1.x);
			var theta=arctan(p.y,p.x);  //angle of normal to line through midpoint
			var np=c2.pointRotate(theta-phi-(theta-phi)/Math.abs(theta-phi)*Math.PI/2);
			var ctrl2=new Point(node.point.x+np.x,node.point.y+np.y);
			var ctrl1=new Point(node.point.x-np.x,node.point.y-np.y);
			node.ctrl2=ctrl2;
			nextnode.ctrl1=ctrl1;
		}
		else if(node.corner=="inline")
		{
			node.ctrl2.x=node.point.x+(node.ctrl2.x-node.point.x)*nl/nl1;
			node.ctrl1.x=node.point.y+(node.ctrl2.y-node.point.y)*nl/nl1;
			nextnode.ctrl1.x=node.point.x-x;
			nextnode.ctrl1.y=node.point.y-y;
		}
	}
	else if(corner=="inline")
	{
		if(node.corner=="corner")
		{
			var x=node.ctrl2.x-node.point.x;
			var y=node.ctrl2.y-node.point.y;
			nextnode.ctrl1.x=node.point.x-x;
			nextnode.ctrl1.y=node.point.y-y;
		}
	}
	node.c2mark.style.top=node.ctrl2.y-2;
	node.c2mark.style.left=node.ctrl2.x-2;
	nextnode.c1mark.style.top=nextnode.ctrl1.y-2;
	nextnode.c1mark.style.left=nextnode.ctrl1.x-2;
	node.corner=corner;
	node.shape.draw();
	node.shape.drawBezGuides();
	pointEdit(node.mark)
}
