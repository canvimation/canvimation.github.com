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
		$("p_smooth").style.visibility="hidden";
		$("p_inline").style.visibility="hidden";
		$("p_open").style.visibility="hidden";
		$("p_line").style.visibility="hidden";
		$("p_line2").style.visibility="hidden";
		$("p_add").style.visibility="hidden";
		$("p_add2").style.visibility="hidden";
		$("p_paths").style.visibility="hidden";
		$("p_close").style.visibility="hidden";
		$("p_corner").style.backgroundColor="#FFFFFF";
		$("p_corner").style.color="#000000";
		$("p_smooth").style.backgroundColor="#FFFFFF";
		$("p_smooth").style.color="#000000";
		$("p_inline").style.backgroundColor="#FFFFFF";
		$("p_inline").style.color="#000000";
		$("p_corner").onmouseover=function() {this.style.backgroundColor="#F09898"};
		$("p_corner").onmouseout=function(){this.style.backgroundColor="#FFFFFF"};
		$("p_smooth").onmouseover=function() {this.style.backgroundColor="#F09898"};
		$("p_smooth").onmouseout=function(){this.style.backgroundColor="#FFFFFF"};
		$("p_inline").onmouseover=function() {this.style.backgroundColor="#F09898"};
		$("p_inline").onmouseout=function(){this.style.backgroundColor="#FFFFFF"};
		$("p_corner").onclick=function(){updateCorner(mark.node,"corner")};
		$("p_smooth").onclick=function(){updateCorner(mark.node,"smooth")};
		$("p_inline").onclick=function(){updateCorner(mark.node,"inline")};
		$("p_delete").onmouseover=function() {this.style.backgroundColor="#F09898"};
		$("p_delete").onmouseout=function(){this.style.backgroundColor="#FFFFFF"};
		$("p_delete").onclick=function(){delNode(mark.node)};
		$("p_open").onmouseover=function() {this.style.backgroundColor="#F09898"};
		$("p_open").onmouseout=function(){this.style.backgroundColor="#FFFFFF"};
		$("p_line").onmouseover=function() {this.style.backgroundColor="#F09898",$("p_line2").style.backgroundColor="#95B3D7"};
		$("p_line").onmouseout=function(){this.style.backgroundColor="#FFFFFF",$("p_line2").style.backgroundColor="#FFFFFF"};
		$("p_line").onclick=function() {setSegment(mark.node)};
		$("p_line2").onclick=function() {setSegment(mark.node)};
		$("p_line2").onmouseover=function() {$("p_line").style.backgroundColor="#F09898",this.style.backgroundColor="#95B3D7"};
		$("p_line2").onmouseout=function(){$("p_line").style.backgroundColor="#FFFFFF",this.style.backgroundColor="#FFFFFF"};
		$("p_add").onmouseover=function() {this.style.backgroundColor="#F09898",$("p_add2").style.backgroundColor="#95B3D7"};
		$("p_add").onmouseout=function(){this.style.backgroundColor="#FFFFFF",$("p_add2").style.backgroundColor="#FFFFFF"};
		$("p_add2").onmouseover=function() {$("p_add").style.backgroundColor="#F09898",this.style.backgroundColor="#95B3D7"};
		$("p_add2").onmouseout=function(){$("p_add").style.backgroundColor="#FFFFFF",this.style.backgroundColor="#FFFFFF"};
		var dt=0;
		$("p_points").style.top=0;
		$("p_corner").style.top=25;
		if(mark.node.shape.type=="curve" && mark.node.corner=="corner" && (mark.node.next.point.x=="end" || mark.node.prev.point.x=="end"))
		{
			dt=50;
		}
		else
		{
			$("p_smooth").style.visibility="visible";
			$("p_inline").style.visibility="visible";
		}
		$("p_smooth").style.top=50;
		$("p_inline").style.top=75;
		$("p_delete").style.top=100-dt;
		if(mark.node.shape.type=="curve")
		{
			dt+=25;
		}
		else
		{
			$("p_open").style.visibility="visible";
		}
		$("p_open").style.top=125-dt;
		if(mark.node.shape.type=="curve" && mark.node.next.point.x=="end")
		{
			dt+=75;
		}
		else
		{
			$("p_segments").style.visibility="visible";
			$("p_line").style.visibility="visible";
			$("p_line2").style.visibility="visible";
			$("p_add").style.visibility="visible";
			$("p_add2").style.visibility="visible";
		}
		$("p_segments").style.top=150-dt;
		$("p_line").style.top=175-dt;
		$("p_line2").style.top=175-dt;
		$("p_add").style.top=200-dt;
		$("p_add2").style.top=200-dt;
		if(mark.node.shape.type=="curve")
		{
			$("p_paths").style.visibility="visible";
			$("p_close").style.visibility="visible";
		}
		else
		{
			dt+=50;
		}
		$("p_paths").style.top=225-dt;
		$("p_close").style.top=250-dt;
		$('pointsbox').style.height=300-dt;
		$('pointscontent').style.height=parseInt($('pointsbox').style.height)-25;
		mark.style.backgroundColor="#F09898";//"#D7D700";
			
		if(mark.node.shape.type=="freeform" && mark.node.next.point.x=="end")
		{
			var nextnode=mark.node.next.next.next;
		}
		else if(mark.node.shape.type=="curve" && mark.node.next.point.x=="end")
		{
			var nextnode="none";
		}
		else
		{
			var nextnode=mark.node.next;
		}
		if(nextnode!="none")
		{
			nextnode.mark.style.backgroundColor="#95B3D7";
			if(nextnode.vertex=="L")
			{
				$("p_line").innerHTML="&nbsp;&nbsp;Curve"
			}
			else
			{
				$("p_line").innerHTML="&nbsp;&nbsp;Straighten"
			}
		}
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
	if(node.shape.type=="curve" && node.next.point.x=="end")
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
			//var psi=arctan(c1.y,c1.x);
			var theta=arctan(p.y,p.x);  //angle of normal to line through midpoint
			var np=c2.pointRotate(theta-phi-(theta-phi)/Math.abs(theta-phi)*Math.PI/2);
			var ctrl2=new Point(node.point.x+np.x,node.point.y+np.y);
			var ctrl1=new Point(node.point.x-np.x,node.point.y-np.y);
			node.ctrl2=ctrl2;
			nextnode.ctrl1=ctrl1;
		}
		else if(node.corner=="inline")
		{
			var x=node.ctrl2.x-node.point.x;
			var y=node.ctrl2.y-node.point.y;
			nextnode.ctrl1.x=node.point.x-x;
			nextnode.ctrl1.y=node.point.y-y;
		}
	}
	else if(corner=="inline")
	{
		if(node.corner=="corner")
		{
			var c1=new Point(nextnode.ctrl1.x-node.point.x,nextnode.ctrl2.y-node.point.y);
			var c2=new Point(node.ctrl2.x-node.point.x,node.ctrl2.y-node.point.y);
			var p=vecAdd(c1,c2);
			var phi=arctan(c2.y,c2.x);
			var psi=arctan(c1.y,c1.x);
			var theta=arctan(p.y,p.x);  //angle of normal to line through midpoint
			var clk=(theta-phi)/Math.abs(theta-phi) //clockwise or anticlockwise
			var np2=c2.pointRotate(theta-phi-clk*Math.PI/2);
			var np1=c1.pointRotate(3*Math.PI/2-clk*(theta-psi));
			var ctrl2=new Point(node.point.x+np2.x,node.point.y+np2.y);
			var ctrl1=new Point(node.point.x+np1.x,node.point.y+np1.y);
			node.ctrl2=ctrl2;
			nextnode.ctrl1=ctrl1;
		}
	}
	if(!(node.shape.type=="curve" && node.prev.point.x=="end"))
	{
		node.c2mark.style.top=node.ctrl2.y-2;
		node.c2mark.style.left=node.ctrl2.x-2;
	}
	nextnode.c1mark.style.top=nextnode.ctrl1.y-2;
	nextnode.c1mark.style.left=nextnode.ctrl1.x-2;
	node.corner=corner;
	node.shape.draw();
	node.shape.drawBezGuides();
	pointEdit(node.mark)
}

function delNode(node)
{
	if(node.next.point.x=="end")
	{
		if(node.shape.type=="freeform")
		{
			var nextnode=node.next.next.next;
			var p=new Point(node.prev.point.x,node.prev.point.y);
			n=node.shape.path.next;
			node.shape.path.next.setNode(p);
			
		}
		else
		{
			var nextnode="none";
		}
	}
	else
	{
		nextnode=node.next;
	}
	if(nextnode!="none")
	{
		var c1=new Point(node.ctrl1.x,node.ctrl1.y);
		nextnode.setNode(nextnode.point,c1,nextnode.ctrl2);
	}
	node.removeNode();
	node.mark.style.visibility="hidden";
	node.shape.draw();
	node.shape.drawBezGuides();
	clear($("markerdrop"));
	node.shape.addAllMarks();
	if(node.shape.type=="freeform")
	{
		if(node.prev.prev.point.x=="end")
		{
			var prevnode=node.prev.prev.prev;
		}
		else
		{
			var prevnode=node.prev;
		}
		pointEdit(prevnode.mark);
	}
	else
	{
		if(node.prev.point.x=="end")
		{
			pointEdit(node.next.mark);
		}
		else
		{
			pointEdit(node.prev.mark);
		}
	}
}

function setSegment(node)
{
	if(node.shape.type=="freeform" && node.next.point.x=="end")
	{
		var nextnode=node.next.next.next;
	}
	else
	{
		var nextnode=node.next;
	}
	if(nextnode.vertex=="B")
	{
		nextnode.vertex="L";
	}
	else
	{
		nextnode.vertex="B";
	}
	
	clear($("markerdrop"));
	node.shape.addAllMarks();
	updateCorner(nextnode,"corner");
	updateCorner(node,"corner");
}

function extraNode(node)
{
	if(node.shape.type=="freeform" && node.next.point.x=="end")
	{
		var nextnode=node.next.next.next;
	}
	else
	{
		var nextnode=node.next;
	}
	var x = (1-t)*(1-t)*(1-t)*node.point.x + 3*(1-t)*(1-t)*t*nextnode.ctrl1.x + 3*(1-t)*t*t*nextnode.ctrl2.x + t*t*t*nextnode.point.x;
	var y = (1-t)*(1-t)*(1-t)*node.point.y + 3*(1-t)*(1-t)*t*nextnode.ctrl1.y + 3*(1-t)*t*t*nextnode.ctrl2.y + t*t*t*nextnode.point.y; 
	var p=new Point(x,y);
	var c1=new Point();
	var c2=new Point();
	var insertnode=new Node()
}
