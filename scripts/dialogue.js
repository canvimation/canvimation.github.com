function updialogue(img,content)
{
	var gap=25;
	var box=$(content);
	var holder=box.parentNode;
	if(holder.className=="elementsbox") {gap=50};
	if(holder.id=="filmbuildbox") {gap=100};
	var height=parseInt(holder.style.height);
	if(height>gap)
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
		if (parseInt(holder.style.height)>gap)
		{
			box.style.top=(parseInt(box.style.top)-10)+"px";
			holder.style.height=(parseInt(holder.style.height)-10)+"px";
			setTimeout(function () {close()},10)
		}
		else
		{
			holder.style.height=gap+"px";
		}
	}
	
	function open()
	{;
		if (parseInt(holder.style.height)<holder.height)
		{
			box.style.top=(parseInt(box.style.top)+10)+"px";
			holder.style.height=(parseInt(holder.style.height)+10)+"px";
			setTimeout(function () {open()},10)
		}
		else
		{
			holder.style.height=holder.height+"px";
		}
	}
	
}

function closedialogue(img)
{
	holder=img.parentNode.parentNode;
	holder.style.visibility="hidden";
	switch (holder.id)
	{
		case "scenebuildbox":
		case "spritebuildbox":
		case "trackbuildbox":
		case "filmbuildbox":
			BUILDCLOSED=true;
			rewritelists();
		break
	}
}

function openStage(theatre)
{
	$("scenebox").style.visibility="hidden";
	$("spritebox").style.visibility="hidden";
	$("trackbox").style.visibility="hidden";
	$("tweenbox").style.visibility="hidden";
	$("filmbox").style.visibility="hidden";
	$("scenebuildbox").style.visibility="hidden";
	$("spritebuildbox").style.visibility="hidden";
	$("trackbuildbox").style.visibility="hidden";
	$("tweenbuildbox").style.visibility="hidden";
	$("filmbuildbox").style.visibility="hidden";
	$("sceneeditbox").style.visibility="hidden";
	$("spriteeditbox").style.visibility="hidden";
	$("trackeditbox").style.visibility="hidden";
	$("tweeneditbox").style.visibility="hidden";
	$("anibar").style.visibility="hidden";
	removeGradLine();
	closeStops();
	removeRotate();
	$("rotatebox").style.visibility="hidden";
	$("gradfillbox").style.visibility="hidden";
	BUILDCLOSED=true;
	rewritelists();
	switch (theatre)
	{
		case "scene":
			$("done").value="Save Scenery";
			$("done").style.visibility="visible";
		break
		case "track":
			$("done").value="Save Track";
			$("done").style.visibility="visible";
			$("menushape").style.visibility="hidden";
			$("del").style.visibility="hidden";
		break
		case "tween":
			$("twbuttons").style.visibility="visible";
			$("tweentimebox").style.visibility="visible";
			$("menushape").style.visibility="hidden";
			$("del").style.visibility="hidden";
			hideTools();
		break
		case "sprite":
			$("spbuttons").style.visibility="visible";
			$("checksp").style.visibility="visible";
			$("fullchecksp").style.visibility="visible";
			$("savesp").style.visibility="visible";
			$("toolbar").style.visibility="hidden";
			$("menushape").style.visibility="hidden";
			$("grid").style.visibility="hidden";
		break
	}
}

function closedone()
{
	$("anibar" ).style.visibility="visible";
	$("shapestage" ).style.visibility="visible";
	$("scenestage" ).style.visibility="hidden";
	$("spritestage" ).style.visibility="hidden";
	$("trackstage" ).style.visibility="hidden";
	$("tweenstage" ).style.visibility="hidden";
	$("tweenpathsstage" ).style.visibility="hidden";
	$("filmstage" ).style.visibility="hidden";
	$("done" ).style.visibility="hidden";
	$("spbuttons").style.visibility="hidden";
	$("toolbar").style.visibility="visible";
	$("menushape").style.visibility="inherit";
	$("grid").style.visibility="inherit";
	$("sceneeditbox").style.visibility="hidden";
	$("trackeditbox").style.visibility="hidden";
	$("spriteeditbox").style.visibility="hidden";
	$("tweeneditbox").style.visibility="hidden";
	$("tweentimebox").style.visibility="hidden";
	$("tweenpathsbox").style.visibility="hidden";
	clear($("markerdrop"));
	$("backstage").style.visibility="hidden";
	$("vecdiv").style.visibility="hidden";
	$("spritecentre").style.visibility="hidden";
	clear($("boundarydrop"));
	CURRENT=SHAPES;
	showTools();
	hideTools();
	SELECTED={};
	$("listshapebox").style.visibility="hidden";
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
			$("colorbox").style.width=(parseInt($("colorbox").style.width)+10)+"px";
			$("coldigits").style.left=(parseInt($("coldigits").style.left)+10)+"px";
			setTimeout(function() {pullopen()},10)
		}
		else
		{
			$("colorbox").style.width=531+"px";
			$("coldigits").style.left=351+"px";
		}
	}
	
	function pushclosed()
	{
		if(parseInt($("colorbox").style.width)>335)
		{
			$("colorbox").style.width=(parseInt($("colorbox").style.width)-10)+"px";
			$("coldigits").style.left=(parseInt($("coldigits").style.left)-10)+"px";
			setTimeout(function() {pushclosed()},10)
		}
		else
		{
			$("colorbox").style.width=335+"px";
			$("coldigits").style.left=155+"px";
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
	if(TWEENEDIT)
	{
		CURRENTTWEEN.linestyles.active=true;
		CURRENTTWEEN.setTweenTimeBox();
	}	
}

function pointEdit(mark)
{
	if(mark.node.shape.type=="freeform" || mark.node.shape.type=="curve"  || mark.style.cursor=='pointer')
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
		$("p_add").onclick=function() 
										{
											extraNode(mark.node);
											mark.node.shape.draw();
											mark.node.shape.drawBezGuides();
											clear($("markerdrop"));
											mark.node.shape.addAllMarks();
											pointEdit(mark);
										};
		$("p_add2").onclick=function()
										{
											extraNode(mark.node);
											mark.node.shape.draw();
											mark.node.shape.drawBezGuides();
											clear($("markerdrop"));
											mark.node.shape.addAllMarks();
											pointEdit(mark);
										};
		$("p_add2").onmouseover=function() {$("p_add").style.backgroundColor="#F09898",this.style.backgroundColor="#95B3D7"};
		$("p_add2").onmouseout=function(){$("p_add").style.backgroundColor="#FFFFFF",this.style.backgroundColor="#FFFFFF"};
		var dt=0;
		$("p_points").style.top=0+"px";
		$("p_corner").style.top=25+"px";
		if(mark.node.shape.type=="curve" && mark.node.corner=="corner" && (mark.node.next.point.x=="end" || mark.node.prev.point.x=="end"))
		{
			dt=50;
		}
		else
		{
			$("p_smooth").style.visibility="inherit";
			$("p_inline").style.visibility="inherit";
		}
		$("p_smooth").style.top=50+"px";
		$("p_inline").style.top=75+"px";
		$("p_delete").style.top=(100-dt)+"px";
		if(mark.node.shape.type=="curve")
		{
			dt+=25;
		}
		else
		{
			$("p_open").style.visibility="inherit";
		}
		$("p_open").style.top=(125-dt)+"px";
		if(mark.node.shape.type=="curve" && mark.node.next.point.x=="end")
		{
			dt+=75;
		}
		else
		{
			$("p_segments").style.visibility="inherit";
			$("p_line").style.visibility="inherit";
			$("p_line2").style.visibility="inherit";
			if(!TWEENEDIT || mark.node.shape.name.substr(0,8)=="NodePath")
			{
				$("p_add").style.visibility="inherit";
				$("p_add2").style.visibility="inherit";
			}
			else
			{
				dt+=25;
			}
		}
		if(TWEENEDIT)
		{
			$("p_delete").style.visibility="hidden";
			dt+=25;
		}
		$("p_segments").style.top=(150-dt)+"px";
		$("p_line").style.top=(175-dt)+"px";
		$("p_line2").style.top=(175-dt)+"px";
		$("p_add").style.top=(200-dt)+"px";
		$("p_add2").style.top=(200-dt)+"px";
		if(mark.node.shape.type=="curve")
		{
			$("p_paths").style.visibility="inherit";
			$("p_close").style.visibility="inherit";
		}
		else
		{
			dt+=50;
		}	
		if(mark.node.shape.name.substr(0,8)=="NodePath")
		{
			$("p_paths").style.visibility="hidden";
			$("p_close").style.visibility="hidden";
			dt+=50;
		}
		$("p_paths").style.top=(225-dt)+"px";
		$("p_close").style.top=(250-dt)+"px";
		$('pointsbox').style.height=(300-dt)+"px";
		$('pointscontent').style.height=(parseInt($('pointsbox').style.height)-25)+"px";
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

function close_p_content()
{
	$("p_points").style.visibility="inherit";
	$("p_smooth").style.visibility="inherit";
	$("p_inline").style.visibility="inherit";
	$("p_delete").style.visibility="inherit";
	$("p_open").style.visibility="inherit";
	$("p_line").style.visibility="inherit";
	$("p_line2").style.visibility="inherit";
	$("p_add").style.visibility="inherit";
	$("p_add2").style.visibility="inherit";
	$("p_paths").style.visibility="inherit";
	$("p_close").style.visibility="inherit";
	$("p_segments").style.visibility="inherit";
}

function closeStops()
{
	$("gAdd").style.visibility="hidden";
	$("gDel").style.visibility="hidden";
	$("frontmarkerdrop").style.visibility="hidden";
	$("backstage").style.visibility="hidden";
	$("boundarydrop").style.visibility="visible";
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
			nextnode.updateCtrl1Node(ctrl1);
			node.updateCtrl2Node(ctrl2);
		}
	}
	if(!(node.shape.type=="curve" && node.prev.point.x=="end"))
	{
		node.c2mark.style.top=(node.ctrl2.y-2)+"px";
		node.c2mark.style.left=(node.ctrl2.x-2)+"px";
	}
	nextnode.c1mark.style.top=(nextnode.ctrl1.y-2)+"px";
	nextnode.c1mark.style.left=(nextnode.ctrl1.x-2)+"px";
	node.corner=corner;
	node.shape.draw();
	node.shape.drawBezGuides();
	if(TWEENEDIT)
	{
		var l=node.shape.name.substr(0,1).toUpperCase();
		if(l=="A" || l=="B")
		{
			CURRENTTWEEN.nodeTweening.active=true;
			CURRENTTWEEN.pointTweening=true;
			CURRENTTWEEN.setTweenTimeBox();
		}
	}
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
	if(nextnode.vertex=="B")
	{
    	var c1=new Point((node.point.x+nextnode.ctrl1.x)/2,(node.point.y+nextnode.ctrl1.y)/2);
    	var c2=new Point((node.point.x+2*nextnode.ctrl1.x+nextnode.ctrl2.x)/4,(node.point.y+2*nextnode.ctrl1.y+nextnode.ctrl2.y)/4);
    	var m=new Point((node.point.x+3*(nextnode.ctrl1.x+nextnode.ctrl2.x)+nextnode.point.x)/8,(node.point.y+3*(nextnode.ctrl1.y+nextnode.ctrl2.y)+nextnode.point.y)/8);
    	var d1=new Point((nextnode.ctrl1.x+2*nextnode.ctrl2.x+nextnode.point.x)/4,(nextnode.ctrl1.y+2*nextnode.ctrl2.y+nextnode.point.y)/4);
    	var d2=new Point((nextnode.ctrl2.x+nextnode.point.x)/2,(nextnode.ctrl2.y+nextnode.point.y)/2);
		var midnode=new Node(m,c1,c2);
		nextnode.setNode(nextnode.point,d1,d2);
	}
	else
	{
		var m=new Point((node.point.x+nextnode.point.x)/2,(node.point.y+nextnode.point.y)/2);
		var c1=new Point((3*node.point.x+m.x)/4,(3*node.point.y+m.y)/4);
		var c2=new Point((node.point.x+3*m.x)/4,(node.point.y+3*m.y)/4);
		var d1=new Point((3*m.x+nextnode.point.x)/4,(3*m.y+nextnode.point.y)/4);
		var d2=new Point((m.x+3*nextnode.point.x)/4,(m.y+3*nextnode.point.y)/4);
		var midnode=new Node(m,c1,c2);
		midnode.vertex="L"
		nextnode.setNode(nextnode.point,d1,d2);
		nextnode.vertex="L"
	}
	midnode.shape=node.shape;
	nextnode.insertNodeBefore(midnode);
	return midnode;
}

function extraCtrlPathNodes(node)
{
	extraNode(node.c1node);
	extraNode(node.c2node);
	
}

function shapeName()
{
	$("namebox").style.visibility="visible";
	var shape=SELECTEDSHAPE;
	var group=shape.group;
	var members=group.members;
	if(members.length>1)
	{
		$("namehead").innerHTML="&nbsp; Group";
		$("shname").value=group.name;
	}
	else
	{
		$("namehead").innerHTML="&nbsp; Shape";
		$("shname").value=shape.name;
	}
	var nc="namecontent";
	$("namehead").innerHTML+="<img src='assets/x.png' onclick='closedialogue(this)'/><img src='assets/up.png' onclick='updialogue(this,"+nc+")'/>";
}

function updatename(name)
{
	var re = /\W/;
	if (name=="")
	{
		alert('No name given ');
		return;
	}
	if (re.test(name))
	{
		alert('Name should contain only letters and numbers.');
		return;
	}
	var shape=SELECTEDSHAPE;
	var group=shape.group;
	var members=group.members;
	if(members[0].elType=="_SHAPE")
	{
		if(name in SHAPES)
		{
			alert("A Shape with name '"+name+"' already exists!");
			return;
		}
		delete SHAPES[members[0].name];
		SHAPES[name]=members[0];
		members[0].name=name;
	}
	else
	{
		if(name in GROUPS)
		{
			alert("A Group with name '"+name+"' already exists!");
			return;
		}
		delete GROUPS[group.name];
		group.name=name;
		GROUPS[name]=group;
	}
	
}

function setgrid()
{
	$("gridbox").style.visibility="visible";
}

function resize(el)
{
	var holder=$(el).parentNode.parentNode;
	var type=el.substr(el.length-2,2);
	var bar=el.substr(0,el.length-5);
	var dt=50;
	var dl=0;
	var du=0;
	if(type=="ls")
	{
		dt=0;
	}
	if(type=="fl")
	{
		dl=150;
		dt=75;
		du=50;
	}
	switch (bar)
	{
		case "right":
			$(el).style.top=0+"px";
			if(parseInt($(el).style.left)<125+dl)
			{
				$(el).style.left=(125+dl)+"px";
			}
			holder.style.width=(parseInt($(el).style.left)+2)+"px";
			$("rcornerbar"+type).style.left=(parseInt(holder.style.width)-2)+"px";
		break
		case "bottom":
			$(el).style.left=0+"px";
			if(parseInt($(el).style.top)<50+du)
			{
				$(el).style.top=(50+du)+"px";
			}
			holder.style.height=(parseInt($(el).style.top)+dt+2)+"px";
			$(el).parentNode.style.height=(parseInt(holder.style.height)-(dt+0))+"px";
			$("rcornerbar"+type).style.top=(parseInt(holder.style.height)-(dt+2))+"px";
		break
		case "rcorner":
			if(parseInt($(el).style.left)<125+dl)
			{
				$(el).style.left=(125+dl)+"px";
			}
			holder.style.width=(parseInt($(el).style.left)+2)+"px";
			if(parseInt($(el).style.top)<50+du)
			{
				$(el).style.top=(50+du)+"px";
			}
			holder.style.height=(parseInt($(el).style.top)+dt+2)+"px";
			$(el).parentNode.style.height=(parseInt(holder.style.height)-(dt+0))+"px";
			$("rightbar"+type).style.left=(parseInt(holder.style.width)-2)+"px";
			$("bottombar"+type).style.top=(parseInt(holder.style.height)-(dt+2))+"px";
		break
	}
	holder.style.clip="rect(1px,"+(parseInt(holder.style.width)+2)+"px,"+(parseInt(holder.style.height)+2)+"px,0px)";
	if(type="fl")
	{
		$("filmbuildstory").style.width=Math.max((parseInt(holder.style.width)+10),FLELWIDTH)+"px";
		$("filmbuildstory").style.height=Math.max((parseInt(holder.style.height)+10),FLELHEIGHT)+"px";
		$("currentel").style.width=Math.max(parseInt($("filmbuildstory").style.width),700)+"px";
		$("filmbuildlines").style.width=parseInt(holder.style.width)+"px";
		$("filmbuildlines").style.height=parseInt(holder.style.height)+"px";
		$("timeline").style.width=(parseInt($("filmbuildlines").style.width)-25)+"px";
		$("filmbuildboard").style.width=parseInt(holder.style.width)+"px";
		$("filmbuildboard").style.height=parseInt(holder.style.height)+"px";
		$("viewport").style.width=(parseInt(holder.style.width)-120)+"px";
		$("viewport").style.height=(parseInt(holder.style.height)-100)+"px";
		$("flellistholder").style.height=(parseInt($("viewport").style.height)+22)+"px";
		$("scrollud").style.height=((parseInt($("viewport").style.height)-42)*parseInt($("viewport").style.height)/(parseInt($("filmbuildstory").style.height)))+"px";
		$("scrolllr").style.width=((parseInt($("viewport").style.width)-42)*parseInt($("viewport").style.width)/(parseInt($("filmbuildstory").style.width)))+"px";
		var barheight=(parseInt($("viewport").style.height)-42);
		var storyheight=parseInt($("filmbuildstory").style.height);
		var storytop=parseInt($("filmbuildstory").style.top);
		$("scrollud").top=barheight*storytop/storyheight;
		var barwidth=(parseInt($("viewport").style.width)-42);
		var storywidth=parseInt($("filmbuildstory").style.width);
		var storyleft=parseInt($("filmbuildstory").style.left);
		$("scrolllr").top=barwidth*storyleft/storywidth;
		$("timeline").style.width=parseInt($("filmbuildstory").style.width)+"px";	
		for(var name in FILMBOARD)
		{
			if(isNaN(FILMBOARD[name].D))
			{
				FILMBOARD[name].seen.style.width=parseInt($("filmbuildstory").style.width)+"px";
			
				if(isNaN(FILMBOARD[name].S) && (FILMBOARD[name].source=="sprite" || FILMBOARD[name].source=="tween"))
				{
					FILMBOARD[name].run.style.width=BOARDZOOM*parseInt($("filmbuildstory").style.width)+"px";
				}
			}
		}
	}
	
}

function anidialogue(el)
{
	$(el+"box").style.visibility="visible";
}

function closeAllDialogues()
{
	BOXES=getElementsByClassName("dialoguebox");
	for(var i=0; i<BOXES.length; i++)
	{
		BOXES[i].style.visibility="hidden";
	}
	BOXES=getElementsByClassName("elementsbox");
	for(var i=0; i<BOXES.length; i++)
	{
		BOXES[i].style.visibility="hidden";
	}
	$("toolbar").style.visibility="hidden";
	$("anibar").style.visibility="hidden";
}
