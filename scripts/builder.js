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
	$('trackreps').value=0;
	$("yoyo").checked=false;
	$("viewselect").checked=false;
}

function spbb()
{
	$('spritebuildbox').style.top=(parseInt($("spritebox").style.top)+60)+"px";
	$('spritebuildbox').style.left=(parseInt($("spritebox").style.left)+60)+"px";
	$('spritebuildbox').style.visibility='visible';
	$('spritetitle').value="Sprite"+(SPCOUNT++);
	$('spritetime').value=5;
	$("spritevector").checked=false;
	$("eldrop").innerHTML="";
	$("trackdrop").innerHTML="";
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
		scene.title=scene.name;
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
			scene.title=scene.name;
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
			elementShapeCopy(SELECTED,scene.groups,scene.shapes,0,$("scenestage"));
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
			elementShapeCopy(SELECTED,scene.groups,scene.shapes,0,$("scenestage"));		
		}
	}
	writescenelist();
	$("shapestage").style.visibility="hidden";
	clear($("scenestage"));
	scene.addToStage($("scenestage"));
	scene.drawscene("scene");
	$("scenestage").style.visibility="visible";
	scene.setAniStage();
	CURRENT=scene.shapes;
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
		track.title=track.name;
		elementShapeCopy(SELECTED,track.groups,track.shapes,0,$("trackstage"));
		track.repeats=n;
		track.yoyo=$('yoyo').checked;
		track.visible=$('viewselect').checked;
	}
	writetracklist();
	$("shapestage").style.visibility="hidden";
	clear($("trackstage"));
	track.getShape().addTo($("trackstage"));
	track.drawtrack(false);
	$("trackstage").style.visibility="visible";
	track.setAniStage();
	CURRENT=track.shapes;
	openStage('track');
}

function buildSprite()
{
	var scene,sprite;
	var groups,shapes;
	var re = /\W/;
	if ($('spritetitle').value.trim()=="")
	{
		alert('No name given ');
		return;
	}
	if (re.test($('spritetitle').value.trim()))
	{
		alert('Name should contain only letters and numbers.');
		return;
	}
	if (checkname($('spritetitle').value.trim(),'sprite')) 
	{
		alert('There is already sprite with the name '+$('spritetitle').value.trim());
		return;
	}
	var n = parseFloat($('spritetime').value);
	if (isNaN(n))
	{
		alert('Time is not a number');
		return;		  
	}
	if (n<0)
	{
		alert('Time must be positive.');
		return
	}
	var elname=$("eldrop").innerHTML.substr(4);
	var engine=$("eldrop").source;
	var elexists;
	switch (engine)
	{
		case 'scene':
			scene=SCENES[elname];
			train=scene.copyscene("sprite");
		break
		case 'sprite':
			sprite=SPRITES[elname];
			train=sprite.copysprite("sprite");
		break
	}
	var trname=$("trackdrop").innerHTML.substr(4);
	var track=TRACKS[trname].copytrack("sprite");
	sprite=new Sprite($('spritetitle').value.trim());
	SPRITES[sprite.name]=sprite;
	sprite.title=sprite.name;
	sprite.track=track;
	sprite.ptime=n;
	sprite.usevec=$('spritevector').checked;
	sprite.engine=engine;
	sprite.train=train;
	writespritelist();
	$("shapestage").style.visibility="hidden";
	clear($("spritestage"));
	sprite.inTheatre($("spritestage"));
	sprite.saveCanvases();
	sprite.setPoints();
	sprite.drawrailway(true);
	sprite.restoreCanvases();
/*	switch (sprite.engine)
	{
		case "scene":
			sprite.train.drawscene();
		break
		case "sprite":
			sprite.train.drawsprite();
		break
	}
*/
	$("spritestage").style.visibility="visible";
	sprite.setAniStage();
	CURRENT=sprite.shapes;
	$("checksp").sprite=sprite.name;
	$("savesp").sprite=sprite.name;
	openStage('sprite');
	if($('spritevector').checked)
	{
		alert('Vector now available for positioning');
		addvector();
	}
	else
	{
		alert('Centre marker now available for positioning');
		$('spritecentre').style.left=500;
		$('spritecentre').style.top=200;
		$('spritecentre').style.visibility='visible';
	}

		
	
}

function writescenelist()
{
	var n=0;
	var DDSC=[];
	var el;
	$("innersc").innerHTML="<ul>";
	for(var name in SCENES)
	{
		scene=SCENES[name];
		$("innersc").innerHTML+='<li id='+scene.name+'> <img src="assets/edit.png" alt="edit" title="edit" onclick="sceneEdit(this)" /> <img src="assets/delete.gif" alt="delete" title="delete" onclick="sceneDelete(this)" /> <span id="SC'+(n++)+'" class="innertext">'+scene.name+'</span></li>';
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
											el.source="scene";
										}
										$("dragdiv").style.visibility="hidden";
										$("dragdiv").style.top="-50px";
									   };
		DDSC[i].onInvalidDrop=function() {$("dragdiv").style.visibility="hidden";$("dragdiv").style.top="-50px";}
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
		$("innertr").innerHTML+='<li id='+track.name+'> <img src="assets/edit.png" alt="edit" title="edit" onclick="trackEdit(this)" /> <img src="assets/delete.gif" alt="delete" title="delete" onclick="trackDelete(this)" /> <span id="TR'+(n++)+'" class="innertext">'+track.name+'</span></li>';
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
										$("dragdiv").style.top="-50px";
									   };
		DDTR[i].onInvalidDrop=function() {$("dragdiv").style.visibility="hidden";$("dragdiv").style.top="-50px";} 
	}
}

function writespritelist()
{
	var n=0;
	var DDSP=[];
	var el;
	$("innersp").innerHTML="<ul>";
	for(var name in SPRITES)
	{
		sprite=SPRITES[name];
		if(sprite.expanded)
		{
			$("innersp").innerHTML+='<li id='+sprite.name+' >  <img src="assets/contract.gif" alt="contract" title="contract" onclick=expand(this) /> <img src="assets/edit.png" alt="edit" title="edit" onclick="spriteEdit(this)" /> <img src="assets/delete.gif" alt="delete" title="delete" onclick="spriteDelete(this)" /> <span id="SP'+(n++)+'" class="innertext">'+sprite.name+'</span></li>';
			sprite.expandlist();
		}
		else
		{
			$("innersp").innerHTML+='<li id='+sprite.name+' >  <img src="assets/expand.gif" alt="expand" title="expand" onclick=expand(this) /> <img src="assets/edit.png" alt="edit" title="edit" onclick="spriteEdit(this)" /> <img src="assets/delete.gif" alt="delete" title="delete" onclick="spriteDelete(this)" /> <span id="SP'+(n++)+'" class="innertext">'+sprite.name+'</span></li>';
		}
	}
	$("innersp").innerHTML+="</ul>";
	for(var i=0;i<n;i++)
	{
		DDSP[i]=new YAHOO.util.DD("SP"+i,"ELGROUP");
		DDSP[i].setDragElId("dragdiv");$("dragdiv").style.visibility="visible";
		DDSP[i].onMouseDown=function() {
										$("dragdiv").innerHTML=$(this.id).parentNode.id;
										$("dragdiv").style.visibility="visible";
									};
		DDSP[i].onDragDrop=function() {
										if(DDeldrop.cursorIsOver)
										{
											el=DDeldrop.getEl();
											el.innerHTML="<br>"+$("dragdiv").innerHTML;
											el.source="sprite";
										}
										$("dragdiv").style.visibility="hidden";
										$("dragdiv").style.top="-50px";
									   };
		DDSP[i].onInvalidDrop=function() {$("dragdiv").style.visibility="hidden";$("dragdiv").style.top="-50px";} 
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

function sceneDelete(n)
{
	var name=n.parentNode.id;
	var doit = confirm('Do you really want to delete '+name+'?');
	if (doit)
	{
		var scene=SCENES[name];
		for(var props in scene)
		{
			delete scene[props];
		}
		delete SCENES[name];
		closedone();
		writescenelist();
	}
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
	var scene=SCENES[OKbutton.OKname];
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
			delete SCENES[OKbutton.OKname];
			writescenelist();
		}
	}
	
}

function trackDelete(n)
{
	var name=n.parentNode.id;
	var doit = confirm('Do you really want to delete '+name+'?');
	if (doit)
	{
		var track=TRACKS[name];
		for(var props in track)
		{
			delete track[props];
		}
		delete TRACKS[name];
		closedone();
		writetracklist();
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
	$('edittracktitle').value=track.name;
	$('edittrackreps').value=track.repeats;
	$('edityoyo').checked=track.yoyo;
	$('editviewselect').checked=track.visible;
	$("trackeditbox").style.top=$("trackbuildbox").style.top;
	$("trackeditbox").style.left=$("trackbuildbox").style.left;
	$("trackeditbox").style.visibility="visible";
	$("trbutton").track=track.name;
	$("trbutton").style.visibility="hidden";
}

function editTrack(OKbutton)
{
	var track=TRACKSS[OKbutton.OKname];
	var group,shape;
	var re = /\W/;
	if ($('edittracktitle').value.trim()=="")
	{
		alert('No name given ');
		return;
	}
	if (re.test($('edittracktitle').value.trim()))
	{
		alert('Name should contain only letters and numbers.');
		return;
	}
	if($('edittracktitle').value.trim()!=track.name)
	{
		if (checkname($('edittracktitle').value.trim(),'track')) 
		{
			alert('There is already trackry with the name '+$('edittracktitle').value.trim());
			return;
		}
		else
		{
			track.name=$('edittracktitle').value.trim();
			trackS[track.name]=track;
			delete trackS[OKbutton.OKname];
			writetracklist();
		}
	}
	var n = parseInt($('edittrackreps').value);
	if (isNaN(n) && !($('edittrackreps').value.toLowerCase()=="c"))
	{
		alert('Repetitons is neither a number nor continuous - c -');
		repeat;		  
	}
	if (n<0)
	{
		alert('Repetitons must be positive.');
		repeat
	}
	track.repeats=n;
	track.yoyo=$('edityoyo').checked;
	track.visible=$('editviewselect').checked;
}

function copydrag(cursor)
{
	$("dragdiv").style.visibility="visible";
	$("dragdiv").style.top=(cursor.y)-1+"px";
	$("dragdiv").style.left=(cursor.x)-1+"px";
}

function addvector()
{
	$('vecdiv').style.left=500;
	$('vecdiv').style.top=200;
	$('vecrotate').style.left=210;
	$('vecrotate').style.top=105;
	vecphi=0;
	vecanvdraw(0);
	$('vecdiv').style.visibility='visible';
}

function vecanvdraw(phi)
{
	
	vecanv.ctx.restore();
	vecanv.ctx.save();
	vecanv.ctx.clearRect(-220,-220,440,440);
	vecanv.ctx.beginPath();
	vecanv.ctx.rotate(phi);
	vecanv.ctx.moveTo(0,0);	
	vecanv.ctx.lineTo(100,0);
	vecanv.ctx.moveTo(90,-10);
	vecanv.ctx.lineTo(100,0);
	vecanv.ctx.lineTo(90,10);
	vecanv.ctx.stroke();
	vecirc.ctx.beginPath();
	vecirc.ctx.arc(0,0,5,0,2*Math.PI, false);
	vecirc.ctx.stroke();
}


function expand(spexp)
{
	var spritename=spexp.parentNode.id;
	sprite=SPRITES[spritename];
	if (sprite.expanded)
	{
		sprite.expanded=false;
	}
	else
	{
		sprite.expanded=false;
	}
	writespritelist();
}

function expandlist()
{
	
}
