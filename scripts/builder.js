function scbb()
{
	$('scenebuildbox').style.top=(parseInt($("scenebox").style.top)+60)+"px";
	$('scenebuildbox').style.left=(parseInt($("scenebox").style.left)+60)+"px";
	$('scenebuildbox').style.visibility='visible';
	$('scenetitle').value="Scene"+(SCCOUNT++);
}

function trbb()
{
	$('trackbuildbox').style.top=(parseInt($("trackbox").style.top)+60)+"px";
	$('trackbuildbox').style.left=(parseInt($("trackbox").style.left)+60)+"px";
	$('trackbuildbox').style.visibility='visible';
	$('tracktitle').value="Track"+(TRCOUNT++);
}

function buildScene()
{
	var group,shape;
	var re = /\W/;
	if ($('scenetitle').value.trim()=="")
	{
		alert('No name given ');
		return;
	}
	if (re.test($('scenetitle').value.trim()))
	{
		alert('Name should contain only letters and numbers.');
		return;
	}
	if (checkname($('scenetitle').value.trim(),'scene')) 
	{
		alert('There is already scenery with the name '+$('scenetitle').value.trim());
		return;
	};
	if($("scblank").checked)
	{
		var scene=new Scene($('scenetitle').value.trim());
		SCENES[scene.name]=scene;
	}
	else if($("sccanvas").checked)
	{
		var i=0;
		for(var name in SHAPES)
		{
			i++
		}
		if(i==0)
		{
			alert("Canvas is empty");
			return;
		}
		else
		{
			var scene=new Scene($('scenetitle').value.trim());
			SCENES[scene.name]=scene;
			var doneshapes={};
			SELECTED={};
			for(var name in SHAPES)
			{
				if(!(name in doneshapes))
				{
					shape=SHAPES[name];
					SELECTED[shape.group.name]=shape.group;
					doneshapes[name]=shape;
				}
			}
			elementShapeCopy(SELECTED,scene.groups,scene.shapes,0,$("scenestage"))
		}
	}
	else
	{
		var i=0;
		for(var name in SELECTED)
		{
			i++
		}
		if(i==0)
		{
			alert("No shapes selected");
			return;
		}
		else
		{
			var scene=new Scene($('scenetitle').value.trim());
			SCENES[scene.name]=scene;
			elementShapeCopy(SELECTED,scene.groups,scene.shapes,0,$("scenestage"))
		}
	}
	writescenelist();
	$("shapestage").style.visibility="hidden";
	$("scenestage").style.visibility="visible";
	scene.setAniStage();
	CURRENT=scene.shapes;
	$("scenebuildbox").visibility="hidden";
	$("innerls").innerHTML=shapeNamesToHTML();
	openStage('scene');
}

function buildTrack()
{
	var group,shape;
	var re = /\W/;
	if ($('tracktitle').value.trim()=="")
	{
		alert('No name given ');
		return;
	}
	if (re.test($('tracktitle').value.trim()))
	{
		alert('Name should contain only letters and numbers.');
		return;
	}
	if (checkname($('tracktitle').value.trim(),'track')) 
	{
		alert('There is already track with the name '+$('tracktitle').value.trim());
		return;
	}
	var n = parseInt($('trackreps').value);
	if (isNaN(n) && !($('trackreps').value.toLowerCase()=="c"))
	{
		alert('Repetitons is neither a number nor continuous - c -');
		repeat;		  
	}
	if (n<0)
	{
		alert('Repetitons must be positive.');
		repeat
	}
	var i=0;
	for(var name in SELECTED)
	{
		i++
	}
	if(i==0)
	{
		alert("No shapes selected");
		return;
	}
	else if (i>1)
	{
		alert("Too many shapes selected");
		return;
	}
	else
	{
		var track=new Track($('tracktitle').value.trim());
		TRACKS[track.name]=track;
		elementShapeCopy(SELECTED,track.groups,track.shapes,0,$("trackstage"));
		track.repeats=n;
		track.yoyo=$('yoyo').checked;
		track.visible=$('viewselect').checked;
	}
	writetracklist();
	$("shapestage").style.visibility="hidden";
	$("trackstage").style.visibility="visible";
	track.setAniStage();
	CURRENT=track.shapes;
	$("trackbuildbox").visibility="hidden";
	openStage('track');
}

 //<img src="assets/expand.gif" alt="expand" title="expand" onclick=expand(this) />

function writescenelist()
{
	var n=0;
	var DDSC=[];
	var el;
	$("innersc").innerHTML="<ul>";
	for(var name in SCENES)
	{
		scene=SCENES[name];
		$("innersc").innerHTML+='<li id='+scene.name+'> <img src="assets/edit.png" alt="edit" title="edit" onclick="sceneEdit(this)" /><img src="assets/delete.gif" alt="delete" title="delete" onclick="scenedelete(this)" /> <span id="SC'+(n++)+'" class="innertext">'+scene.name+'</span></li>';
	}
	$("innersc").innerHTML+="</ul>";
	for(var i=0;i<n;i++)
	{
		DDSC[i]=new YAHOO.util.DD("SC"+i,"ELGROUP");
		DDSC[i].setDragElId("dragdiv");
		DDSC[i].onMouseDown=function() {
										$("dragdiv").innerHTML=$(this.id).parentNode.id;
										$("dragdiv").style.visibility="visible";
									};
		DDSC[i].onDragDrop=function() {
										if(DDeldrop.cursorIsOver)
										{
											el=DDeldrop.getEl();
											el.innerHTML="<br>"+$("dragdiv").innerHTML;
										}
										$("dragdiv").style.visibility="hidden";
									   };
		DDSC[i].onInvalidDrop=function() {$("dragdiv").style.visibility="hidden"}
	}
}

function writetracklist()
{
	var n=0;
	var DDTR=[];
	var el;
	$("innertr").innerHTML="<ul>";
	for(var name in TRACKS)
	{
		track=TRACKS[name];
		$("innertr").innerHTML+='<li id='+track.name+'> <img src="assets/edit.png" alt="edit" title="edit" onclick="trackEdit(this)" /> <span id="TR'+(n++)+'" class="innertext">'+track.name+'</span></li>';
	}
	$("innertr").innerHTML+="</ul>";
	for(var i=0;i<n;i++)
	{
		DDTR[i]=new YAHOO.util.DD("TR"+i,"TRGROUP");
		DDTR[i].setDragElId("dragdiv");$("dragdiv").style.visibility="visible";
		DDTR[i].onMouseDown=function() {
										$("dragdiv").innerHTML=$(this.id).parentNode.id;
										$("dragdiv").style.visibility="visible";
									};
		DDTR[i].onDragDrop=function() {
										if(DDtrackdrop.cursorIsOver)
										{
											el=DDtrackdrop.getEl();
											el.innerHTML="<br>"+$("dragdiv").innerHTML;
										}
										$("dragdiv").style.visibility="hidden";
									   };
		DDTR[i].onInvalidDrop=function() {$("dragdiv").style.visibility="hidden"} 
	}
	
}

function elementShapeCopy(FROM,TO,STORE,offset,theatre)  //FROM is associative array of groups, TO is target associative array of groups
{
	var shape;
	var temps;
	var shapelist=[];
	var sel=false;
	for(var name in FROM)  
	{
		var group=FROM[name];
		var groupcopy=copyGroup(group,offset,theatre,STORE,TO,NCOUNT)
		var members=groupcopy.memberShapes();
		for(var shape in members)
		{
			members[shape].group=groupcopy;
			temps=[];
			temps[0]=members[shape]
			temps[1]=members[shape].zIndex;
			shapelist.push(temps);
		}
	}
	shapelist.sort(zindp);
	
	for (var i=0; i<shapelist.length;i++)
	{
		shape=shapelist[i][0];
		shape.zIndex=ZPOS++;
		shape.Canvas.style.zIndex=shape.zIndex;
		shape.draw();
	}
	return groupcopy;
}


function checkname(name,type)
{
	switch(type)
	{
		case 'scene':
			var found = (name in SCENES);
		break
		case 'track':
			var found = (name in TRACKS);
		break
		case 'sprite':
			var found = (name in SPRITES);
		break
		case 'tween':
			var found = (name in TWEENS);
		break
		case 'film':
			var found = (name in FILMS);
		break
	}
	
	return found;
}

function shapeNamesToHTML()
{
	var shape,group,members;
	var shapelist={};
	var inhtml="Groups<ul class='shapesinner'>";
	for(name in GROUPS)
	{
		group=GROUPS[name];
		if(group.members.length>1)
		{
			inhtml+='<li id='+group.name+'> <span class="innertext" onclick="addgrouptoscene(this)">'+group.name+' </span></li>';
		}
		members=group.memberShapes();
		for(var shapename in members)
		{
			if(!(shapename in shapelist ))
			{
				shapelist[shapename]=members[shapename];
			}
		}
	}
	inhtml+="</ul>";
	inhtml+="Shapes <ul class='shapesinner'>"
	for(var name in shapelist)
	{
		shape=shapelist[name];
		inhtml+='<li id='+shape.name+'> <span class="innertext" onclick="addshapetoscene(this)">'+shape.name+' </span></li>';
	}
	
	inhtml+="</ul>";
	return inhtml;
}

function addgrouptoscene(g)
{
	
	var name=g.parentNode.id;
	var group=GROUPS[name];
	SELECTED={};
	SELECTED[group.name]=group;
	var groupcopy=elementShapeCopy(SELECTED,scene.groups,scene.shapes,0,$("scenestage"));
	SELECTED={};
	SELECTED[groupcopy.name]=groupcopy;
	clear($("boundarydrop"));
	group.drawBoundary();
	showTools();
	setTools(true)
	$("listshapebox").style.visibility="hidden";
}

function addshapetoscene(s)
{
	var name=s.parentNode.id;
	var shape=SHAPES[name];
	var group=shape.group;
	SELECTED={};
	if(group.members.length==1)
	{
		SELECTED[group.name]=group;
		elementShapeCopy(SELECTED,scene.groups,scene.shapes,0,$("scenestage"));
		clear($("boundarydrop"));
		group.drawBoundary();
	}
	else
	{	 
		var copy=makeCopy(shape,0,$("scenestage"),scene.shapes,scene.groups);
		copy.group=new Group(scene.groups,"group"+(NCOUNT++),shape.group.name,copy);
		copy.setCorners();
		copy.zIndex=ZPOS++;
		copy.Canvas.style.zIndex=copy.zIndex;
		copy.draw();
		SELECTED[copy.group.name]=copy.group;
		clear($("boundarydrop"))
		copy.group.drawBoundary();
	}
	showTools();
	setTools(true);
	$("listshapebox").style.visibility="hidden";
}

function sceneEdit(n)
{
	var shape;
	var name=n.parentNode.id;
	$("shapestage").style.visibility="hidden";
	$("scenestage").style.visibility="visible";
	var scene=SCENES[name];
	scene.setAniStage();
	removeGradLine();
	closeStops();
	removeRotate();
	$("rotatebox").style.visibility="hidden";
	$("gradfillbox").style.visibility="hidden";
	hideTools();
	closeColor();
	CURRENT=scene.shapes;
	for(var shapename in CURRENT)
	{
		shape=CURRENT[shapename];
		shape.draw();
	}
	$("innerls").innerHTML=shapeNamesToHTML();
	openStage('scene');
	$('editscenetitle').value=scene.name;
	$("sceneeditbox").style.top=$("scenebuildbox").style.top;
	$("sceneeditbox").style.left=$("scenebuildbox").style.left;
	$("sceneeditbox").style.visibility="visible";
	$("scbutton").scene=scene.name;
	$("scbutton").style.visibility="hidden";
}

function editScene(OKbutton)
{
	var scene=SCENES[OKbutton.scene];
	var group,shape;
	var re = /\W/;
	if ($('editscenetitle').value.trim()=="")
	{
		alert('No name given ');
		return;
	}
	if (re.test($('editscenetitle').value.trim()))
	{
		alert('Name should contain only letters and numbers.');
		return;
	}
	if($('editscenetitle').value.trim()!=scene.name)
	{
		if (checkname($('editscenetitle').value.trim(),'scene')) 
		{
			alert('There is already scenery with the name '+$('editscenetitle').value.trim());
			return;
		}
		else
		{
			scene.name=$('editscenetitle').value.trim();
			SCENES[scene.name]=scene;
			delete SCENES[OKbutton.scene];
			writescenelist();
		}
	}
	
}

function trackEdit(n)
{
	var shape;
	var name=n.parentNode.id;
	$("shapestage").style.visibility="hidden";
	$("trackstage").style.visibility="visible";
	var track=TRACKS[name];
	track.setAniStage();
	removeGradLine();
	closeStops();
	removeRotate();
	$("rotatebox").style.visibility="hidden";
	$("gradfillbox").style.visibility="hidden";
	hideTools();
	closeColor();
	CURRENT=track.shapes;
	for(var shapename in CURRENT)
	{
		shape=CURRENT[shapename];
		shape.draw();
	}
	$("trackbuildbox").visibility="hidden";
	openStage('track');
}

function setAniStage()
{
	var group;
	removeGradLine();
	closeStops();
	removeRotate();
	$("rotatebox").style.visibility="hidden";
	$("gradfillbox").style.visibility="hidden";
	hideTools();
	closeColor();
	SELECTED={};
	BCOUNT=0;
	clear($("markerdrop"));
	clear($("boundarydrop"));

	for(var name in this.groups)
	{
		group=this.groups[name];
		//group.drawBoundary();
		SELECTED[group.name]=group;
		showTools();
		setTools(true);
	}
	$("boundarydrop").style.visibility="visible";
}

function copydrag(cursor)
{
	$("dragdiv").style.visibility="visible";
	$("dragdiv").style.top=(cursor.y)-1+"px";
	$("dragdiv").style.left=(cursor.x)-1+"px";
}
