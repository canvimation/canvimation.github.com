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

function flbb()
{
	$('filmtitle').value="Film"+(FMCOUNT++);
	$("filmbuildbox").style.visibility="visible";
	$("filmbuildboard").innerHTML="<input id='Ain' type='text' value='' size='4' /><input id='Din'  type='text' value='' size='4' />";
	$("filmbuildboard").innerHTML+="<input id='Rin' type='text' value='' size='4' /><input id='Sin'  type='text' value='' size='4' />";
	$("filmbuildlines").innerHTML="<div id='timeline'></div>";
	$("flellist").innerHTML="";
	$("Ain").style.visibility="hidden";
	$("Din").style.visibility="hidden";
	$("Rin").style.border="1px groove blue";
	$("Sin").style.border="1px ridge blue";
	$("Rin").style.paddingLeft="1px";
	$("Sin").style.paddingLeft="1px";
	$("Rin").style.paddingRight="1px";
	$("Sin").style.paddingRight="1px";
	$("Rin").style.visibility="hidden";
	$("Sin").style.visibility="hidden";
	$("timeline").style.width=(parseInt($("filmbuildlines").style.width)-25)+"px";
	ELCOUNT=0;
	FLELTOP=15;
	FLELWIDTH=350;
	FLELHEIGHT=350;
	FILMBOARD={};
	FLELINDX=-10000000;
	FLELHEAD={};
	FLELHEAD.prev=FLELHEAD;
	FLELHEAD.next=FLELHEAD;
	FLELHEAD.name="&head!"
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
		return;		  
	}
	if (n<0)
	{
		alert('Repetitons must be positive.');
		return;
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
	shape=track.getShape()
	shape.addTo($("trackstage"));
	shape.draw();
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
	var elname=$("eldrop").name;
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
	var trname=$("trackdrop").name;
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
	$("spritestage").style.visibility="visible";
	sprite.setAniStage();
	CURRENT=sprite.shapes;
	$("checksp").sprite=sprite.name;
	$("fullchecksp").sprite=sprite.name;
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

function buildFilm()
{
	var flel,fbel;
	var re = /\W/;
	if ($('filmtitle').value.trim()=="")
	{
		alert('No name given ');
		return;
	}
	if (re.test($('filmtitle').value.trim()))
	{
		alert('Name should contain only letters and numbers.');
		return;
	}
	if (checkname($('filmtitle').value.trim(),'film')) 
	{
		alert('There is already film with the name '+$('filmtitle').value.trim());
		return;
	}
	var film=new Film($('filmtitle').value.trim());
	film.title=film.name;
	for(var name in FILMBOARD)
	{
		fbel=FILMBOARD[name];
		film.elements[name]={};
		flel=film.elements[name];
		flel.name=fbel.name;
		flel.title=fbel.title;
		flel.source=fbel.source;
		flel.layer=fbel.layer;
		flel.A=fbel.A;
		flel.D=fbel.D;
		switch (flel.source)
		{
			case "sprite":
				flel.R=fbel.R;
				flel.S=fbel.S;
				flel.maxruntime=fbel.maxruntime;
			break
		}
	}
	FILMS[film.name]=film;
	FILMBOARD={};
	writefilmlist();
}

function writescenelist()
{
	SPANCOUNT=0;
	var DDSC=[];
	var el;
	$("innersc").innerHTML="<ul>";
	for(var name in SCENES)
	{
		scene=SCENES[name];
		$("innersc").innerHTML+='<li id=non!!!!,'+scene.title+','+scene.name+'> <img src="assets/edit.png" alt="edit" title="edit" onclick="sceneEdit(this)" /> <img src="assets/delete.gif" alt="delete" title="delete" onclick="sceneDelete(this)" /> <span id="SC'+(SPANCOUNT++)+'" class="innertext">'+scene.title+'</span></li>';
	}
	$("innersc").innerHTML+="</ul>";
	for(var i=0;i<SPANCOUNT;i++)
	{
		DDSC[i]=new YAHOO.util.DD("SC"+i,"ELGROUP");
		DDSC[i].setDragElId("dragdiv");
		DDSC[i].onMouseDown=function() {
										$("dragdiv").innerHTML=$(this.id).parentNode.id.split(",")[1];
										$("dragdiv").name=$(this.id).parentNode.id.split(",")[2];
										$("dragdiv").style.visibility="visible";
									};
		DDSC[i].onDragDrop=function() {
										if(DDeldrop.cursorIsOver)
										{
											el=DDeldrop.getEl();
											el.innerHTML="<br>"+$("dragdiv").innerHTML;
											el.source="scene";
											el.name=$("dragdiv").name;
										}
										else if(DDelfilmdrop.cursorIsOver)
										{
											el=DDelfilmdrop.getEl();
											el.source="scene";
											el.title=$("dragdiv").innerHTML;
											el.name=$("dragdiv").name;
											addToFilmBoard(el);
											$("filmbuildstory").style.height=Math.max((parseInt($("filmbuildbox").style.height)+10),FLELHEIGHT)+"px";
											$("scrollud").style.height=((parseInt($("viewport").style.height)-42)*parseInt($("viewport").style.height)/(parseInt($("filmbuildstory").style.height)))+"px";
										}
										$("dragdiv").style.visibility="hidden";
										$("dragdiv").style.top="-50px";
									   };
		DDSC[i].onInvalidDrop=function() {$("dragdiv").style.visibility="hidden";$("dragdiv").style.top="-50px";}
	}
}

function writetracklist()
{
	SPANCOUNT=0;
	var DDTR=[];
	var el;
	$("innertr").innerHTML="<ul>";
	for(var name in TRACKS)
	{
		track=TRACKS[name];
		$("innertr").innerHTML+='<li id=non!!!!,'+track.title+','+track.name+'> <img src="assets/edit.png" alt="edit" title="edit" onclick="trackEdit(this)" /> <img src="assets/delete.gif" alt="delete" title="delete" onclick="trackDelete(this)" /> <span id="TR'+(SPANCOUNT++)+'" class="innertext">'+track.title+'</span></li>';
	}
	$("innertr").innerHTML+="</ul>";
	for(var i=0;i<SPANCOUNT;i++)
	{
		DDTR[i]=new YAHOO.util.DD("TR"+i,"TRGROUP");
		DDTR[i].setDragElId("dragdiv");$("dragdiv").style.visibility="visible";
		DDTR[i].onMouseDown=function() {
										$("dragdiv").innerHTML=$(this.id).parentNode.id.split(",")[1];
										$("dragdiv").name=$(this.id).parentNode.id.split(",")[2];
										$("dragdiv").style.visibility="visible";
									};
		DDTR[i].onDragDrop=function() {
										if(DDtrackdrop.cursorIsOver)
										{
											el=DDtrackdrop.getEl();
											el.innerHTML="<br>"+$("dragdiv").innerHTML;
											el.name=$("dragdiv").name;
										}
										$("dragdiv").style.visibility="hidden";
										$("dragdiv").style.top="-50px";
									   };
		DDTR[i].onInvalidDrop=function() {$("dragdiv").style.visibility="hidden";$("dragdiv").style.top="-50px";} 
	}
}

function writespritelist()
{
	SPANCOUNT=0;
	var DDSP=[];
	var el;
	
	$("innersp").innerHTML="<ul>";
	for(var name in SPRITES)
	{
		LIMARGIN="&nbsp;&nbsp;&nbsp;";
		sprite=SPRITES[name];
		if(sprite.expanded)
		{
			$("innersp").innerHTML+='<li id='+sprite.name+','+sprite.title+','+sprite.name+' >  <img src="assets/contract.gif" alt="contract" title="contract" onclick=expand(this) /> <img src="assets/edit.png" alt="edit" title="edit" onclick="spriteEdit(this)" /> <img src="assets/delete.gif" alt="delete" title="delete" onclick="spriteDelete(this)" /> <span id="SP'+(SPANCOUNT++)+'" class="innertext">'+sprite.title+'</span></li>';
			sprite.expandspritelist(sprite.name);
		}
		else
		{
			$("innersp").innerHTML+='<li id='+sprite.name+','+sprite.title+','+sprite.name+' >  <img src="assets/expand.gif" alt="expand" title="expand" onclick=expand(this) /> <img src="assets/edit.png" alt="edit" title="edit" onclick="spriteEdit(this)" /> <img src="assets/delete.gif" alt="delete" title="delete" onclick="spriteDelete(this)" /> <span id="SP'+(SPANCOUNT++)+'" class="innertext">'+sprite.title+'</span></li>';
		}
	}
	$("innersp").innerHTML+="</ul>";
	for(var i=0;i<SPANCOUNT;i++)
	{
		DDSP[i]=new YAHOO.util.DD("SP"+i,"ELGROUP");
		DDSP[i].setDragElId("dragdiv");$("dragdiv").style.visibility="visible";
		DDSP[i].onMouseDown=function() {
										$("dragdiv").innerHTML=$(this.id).parentNode.id.split(",")[1];
										$("dragdiv").name=$(this.id).parentNode.id.split(",")[2];
										$("dragdiv").style.visibility="visible";
									};
		DDSP[i].onDragDrop=function() {
										if(DDeldrop.cursorIsOver)
										{
											el=DDeldrop.getEl();
											el.innerHTML="<br>"+$("dragdiv").innerHTML;
											el.source="sprite";
											el.name=$("dragdiv").name;
										}
										else if(DDelfilmdrop.cursorIsOver)
										{
											el=DDelfilmdrop.getEl();
											el.source="sprite";
											el.title=$("dragdiv").innerHTML;
											el.name=$("dragdiv").name;
											addToFilmBoard(el);
											$("filmbuildstory").style.height=Math.max((parseInt($("filmbuildbox").style.height)+10),FLELHEIGHT)+"px";
											$("scrollud").style.height=((parseInt($("viewport").style.height)-42)*parseInt($("viewport").style.height)/(parseInt($("filmbuildstory").style.height)))+"px";
										}
										$("dragdiv").style.visibility="hidden";
										$("dragdiv").style.top="-50px";
									   };
		DDSP[i].onInvalidDrop=function() {$("dragdiv").style.visibility="hidden";$("dragdiv").style.top="-50px";} 
	}
}

function writefilmlist()
{
	SPANCOUNT=0;
	var DDSC=[];
	var el;
	$("innerfl").innerHTML="<ul>";
	for(var name in FILMS)
	{
		film=FILMS[name];
		$("innerfl").innerHTML+='<li id=non!!!!,'+film.title+','+film.name+'> <img src="assets/edit.png" alt="edit" title="edit" onclick="filmEdit(this)" /> <img src="assets/delete.gif" alt="delete" title="delete" onclick="filmDelete(this)" /> <img src="assets/play.png" alt="play" title="play" onclick="filmPlay(this)" /> <span id="FL'+(SPANCOUNT++)+'" class="innertext">'+film.title+'</span></li>';
	}
	$("innerfl").innerHTML+="</ul>";
	for(var i=0;i<SPANCOUNT;i++)
	{
		DDSC[i]=new YAHOO.util.DD("FL"+i,"ELGROUP");
		DDSC[i].setDragElId("dragdiv");
		DDSC[i].onMouseDown=function() {
										$("dragdiv").innerHTML=$(this.id).parentNode.id.split(",")[1];
										$("dragdiv").name=$(this.id).parentNode.id.split(",")[2];
										$("dragdiv").style.visibility="visible";
									};
		DDSC[i].onDragDrop=function() {
										if(DDeldrop.cursorIsOver)
										{
											el=DDeldrop.getEl();
											el.innerHTML="<br>"+$("dragdiv").innerHTML;
											el.source="film";
											el.name=$("dragdiv").name;
										}
										else if(DDelfilmdrop.cursorIsOver)
										{
											el=DDelfilmdrop.getEl();
											el.source="film";
											el.title=$("dragdiv").innerHTML;
											el.name=$("dragdiv").name;
											addToFilmBoard(el);
											$("filmbuildstory").style.height=Math.max((parseInt($("filmbuildbox").style.height)+10),FLELHEIGHT)+"px";
											$("scrollud").style.height=((parseInt($("viewport").style.height)-42)*parseInt($("viewport").style.height)/(parseInt($("filmbuildstory").style.height)))+"px";
										}
										$("dragdiv").style.visibility="hidden";
										$("dragdiv").style.top="-50px";
									   };
		DDSC[i].onInvalidDrop=function() {$("dragdiv").style.visibility="hidden";$("dragdiv").style.top="-50px";}
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
	var idarray=n.parentNode.id.split(",");
	var title=idarray[1]
	var name=idarray[2];
	var doit = confirm('Do you really want to delete '+title+'?');
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

function sceneEdit(n)  //edits the selected scene shapes
{
	var shape;
	var idarray=n.parentNode.id.split(",");
	var topsprite=idarray[0]
	var name=idarray[2];
	if(topsprite=="non!!!!")
	{
		var scene=SCENES[name];
		var path="";
	}
	else
	{
		var sprite=SPRITES[topsprite];
		var data=sprite.getScene();
		var scene=data.scene;
		var path=data.path;
	}
	$("shapestage").style.visibility="hidden";
	clear($("scenestage"));
	$("scenestage").style.visibility="visible";
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
		shape.addTo($("scenestage"));
		shape.draw();
	}
	$("innerls").innerHTML=shapeNamesToHTML();
	openStage('scene');
	$('editscenetitle').value=scene.title;
	$("sceneeditbox").style.top=$("scenebuildbox").style.top;
	$("sceneeditbox").style.left=$("scenebuildbox").style.left;
	$("sceneeditbox").style.visibility="visible";
	$("scpath").innerHTML=path;
	$("scbutton").OKname=scene;
	$("scbutton").style.visibility="hidden";
}

function editScene(OKbutton)  //sets edit box for scene
{
	var scene=OKbutton.OKname;
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
	scene.title=$('editscenetitle').value.trim();
	writescenelist();
	writespritelist();
	OKbutton.style.visibility="hidden";
}

function trackDelete(n)
{
	var idarray=n.parentNode.id.split(",");
	var title=idarray[1]
	var name=idarray[2];
	var doit = confirm('Do you really want to delete '+title+'?');
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
	var idarray=n.parentNode.id.split(",");
	var topsprite=idarray[0]
	var name=idarray[2];
	if(topsprite=="non!!!!")
	{
		var track=TRACKS[name];
		var path="";
	}
	else
	{
		var sprite=SPRITES[topsprite];
		var data=sprite.getTrack(name);
		var track=data.track;
		var path=data.path;
	}
	$("shapestage").style.visibility="hidden";
	clear($("trackstage"));
	$("trackstage").style.visibility="visible";
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
		shape.addTo($("trackstage"));
		shape.draw();
	}
	$("trackbuildbox").visibility="hidden";
	openStage('track');
	$('edittracktitle').value=track.title;
	$('edittrackreps').value=track.repeats;
	$('edityoyo').checked=track.yoyo;
	$('editviewselect').checked=track.visible;
	$("trackeditbox").style.top=$("trackbuildbox").style.top;
	$("trackeditbox").style.left=$("trackbuildbox").style.left;
	$("trpath").innerHTML=path;
	$("trackeditbox").style.visibility="visible";
	$("trbutton").OKname=track;
	$("trbutton").style.visibility="hidden";
}

function editTrack(OKbutton)
{
	var track=OKbutton.OKname;
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
	track.title=$('edittracktitle').value.trim();
	writetracklist();
	writespritelist();
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
	OKbutton.style.visibility="hidden";
}

function spriteDelete(n)
{
	var idarray=n.parentNode.id.split(",");
	var title=idarray[1]
	var name=idarray[2];
	var doit = confirm('Do you really want to delete '+title+'?');
	if (doit)
	{
		var sprite=SPRITES[name];
		for(var props in sprite)
		{
			delete sprite[props];
		}
		delete SPRITES[name];
		closedone();
		writespritelist();
	}
}

function spriteEdit(n)
{
	var idarray=n.parentNode.id.split(",");
	var topsprite=idarray[0]
	var name=idarray[2];
	var sprite=SPRITES[topsprite];
	var data=sprite.getSprite(name);
	var sprite=data.sprite;
	var path=data.path;
	$("shapestage").style.visibility="hidden";
	sprite.setAniStage();
	removeGradLine();
	closeStops();
	removeRotate();
	$("rotatebox").style.visibility="hidden";
	$("gradfillbox").style.visibility="hidden";
	hideTools();
	closeColor();
	sprite.zeroPointers();
	sprite.saveCanvases();
	clear($("spritestage"));
	sprite.inTheatre($("spritestage"));
	$("spritestage").style.visibility="visible";
	sprite.drawrailway(true);
	sprite.restoreCanvases();
	if (sprite.usevec)
	{
		$('vecdiv').style.visibility='visible';
	}
	else
	{
		$('spritecentre').style.visibility='visible';
	}
	$("spritebuildbox").visibility="hidden";
	openStage('sprite');
	$('editspritetitle').value=sprite.title;
	$('editspritetime').value=sprite.ptime;
	$('editspritevector').checked=sprite.usevec;
	$("spriteeditbox").style.top=$("spritebuildbox").style.top;
	$("spriteeditbox").style.left=$("spritebuildbox").style.left;
	$("sppath").innerHTML=path;
	$("spriteeditbox").style.visibility="visible";
	$("spbutton").OKname=sprite;
	$("spbutton").style.visibility="hidden";
}

function editSprite(OKbutton)
{
	var sprite=OKbutton.OKname;
	var group,shape;
	var re = /\W/;
	if ($('editspritetitle').value.trim()=="")
	{
		alert('No name given ');
		return;
	}
	if (re.test($('editspritetitle').value.trim()))
	{
		alert('Name should contain only letters and numbers.');
		return;
	}
	sprite.title=$('editspritetitle').value.trim();
	writespritelist();
	var n = parseFloat($('editspritetime').value);
	if (isNaN(n))
	{
		alert("Time is not a number");
		repeat;		  
	}
	if (n<0)
	{
		alert('Time must be positive.');
		repeat
	}
	sprite.ptime=n;
	if(sprite.usevec !=$('editspritevector').checked)
	{
		sprite.usevec=$('editspritevector').checked
		if(sprite.usevec)
		{
			$('spritecentre').style.visibility='hidden';
			$('vecdiv').style.visibility='visible';
		}
		else
		{
			$('vecdiv').style.visibility='hidden';
			$('spritecentre').style.visibility='visible';
		}
	}
	OKbutton.style.visibility="hidden";
}

function filmDelete(n)
{
	var idarray=n.parentNode.id.split(",");
	var title=idarray[1]
	var name=idarray[2];
	var doit = confirm('Do you really want to delete '+title+'?');
	if (doit)
	{
		var film=FILMS[name];
		for(var props in film)
		{
			delete film[props];
		}
		delete FILMS[name];
		closedone();
		writefilmlist();
	}
}

function filmEdit(n)  //edits the selected scene shapes
{
	var el,flel,fbel;
	var filmboard,filmlines;
	var flist=[];
	var flay=[];
	var idarray=n.parentNode.id.split(",");
	var topfilm=idarray[0]
	var name=idarray[2];
	if(topfilm=="non!!!!")
	{
		var film=FILMS[name];
	}
	flbb();
	FMCOUNT--;
	$('filmtitle').value=film.title;
	for(var name in film.elements)
	{
		flel=film.elements[name];
		flay=[name,flel.layer];
		flist.push(flay);
	}
	flist.sort(zindp);
	for(var i=0;i<flist.length;i++)
	{
		flel=film.elements[flist[i][0]];
		el={title:flel.title,source:flel.source,name:flel.name};
		addToFilmBoard(el);
		$("Acin").value=flel.A
		setA($("Acin"));
		$("Dcin").value=flel.D
		setD($("Dcin"));
		switch(flel.source)
		{
			case "sprite":
				$("Rcin").value=flel.R
				setR($("Rcin"));
				$("Scin").value=flel.S
				setS($("Scin"));
			break
		}
	}
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
	var idarray=spexp.parentNode.id.split(",");
	var spritename=idarray[2];
	var sprite=SPRITES[spritename];
	if (sprite.expanded)
	{
		sprite.expanded=false;
	}
	else
	{
		sprite.expanded=true;
	}
	writespritelist();
}
