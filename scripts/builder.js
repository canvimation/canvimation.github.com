function scbb()
{
	$('scenebuildbox').style.top=(parseInt($("scenebox").style.top)+60)+"px";
	$('scenebuildbox').style.left=(parseInt($("scenebox").style.left)+10)+"px";
	$('scenebuildbox').style.zIndex=ZBOX++;
	$('scenebuildbox').style.visibility='visible';
	$('scenetitle').value="Scenery"+(SCCOUNT++);
	BUILDCLOSED=false;
	rewritelists();
}

function trbb()
{
	$('trackbuildbox').style.top=(parseInt($("trackbox").style.top)+60)+"px";
	$('trackbuildbox').style.left=(parseInt($("trackbox").style.left)+10)+"px";
	$('trackbuildbox').style.zIndex=ZBOX++;
	$('trackbuildbox').style.visibility='visible';
	$('tracktitle').value="Track"+(TRCOUNT++);
	$('trackreps').value=1;
	$("yoyo").checked=false;
	$("viewselect").checked=false;
	BUILDCLOSED=false;
	rewritelists();
}

function twbb()
{
	$('tweenbuildbox').style.top=(parseInt($("tweenbox").style.top)+60)+"px";
	$('tweenbuildbox').style.left=(parseInt($("tweenbox").style.left)+10)+"px";
	$('tweenbuildbox').style.zIndex=ZBOX++;
	$('tweenbuildbox').style.visibility='visible';
	$('tweentitle').value="Tween"+(TWCOUNT++);
	BUILDCLOSED=false;
	rewritelists();
}

function spbb()
{
	$('spritebuildbox').style.top=(parseInt($("spritebox").style.top)+60)+"px";
	$('spritebuildbox').style.left=(parseInt($("spritebox").style.left)-20)+"px";
	$('spritebuildbox').style.zIndex=ZBOX++;
	$('spritebuildbox').style.visibility='visible';
	$('spritetitle').value="Sprite"+(SPCOUNT++);
	$('spritetime').value=10;
	$("spritevector").checked=false;
	$("eldrop").innerHTML="";
	$("trackdrop").innerHTML="";
	BUILDCLOSED=false;
	rewritelists();
}

function flbb(newone)
{
	if(newone)
	{
		$('filmtitle').name="Film"+(FMCOUNT);
		$('filmtitle').value="Film"+(FMCOUNT++);
		$("fbhtitle").innerHTML="&nbsp; Build Film";
		$("filmsave").value=" Save ";
	}
	else
	{
		$("fbhtitle").innerHTML="&nbsp; Edit Film";
		$("filmsave").value=" Change ";
	}
	$("filmbuildbox").style.zIndex=ZBOX++;
	$("filmbuildbox").style.visibility="visible";
	$("filmbuildboard").innerHTML="<input id='Ain' onchange='setA(this)' type='text' value='' size='4' /><input id='Din' onchange='setD(this)' type='text' value='' size='4' />";
	$("filmbuildboard").innerHTML+="<input id='Rin' onchange='setR(this)' type='text' value='' size='4' /><input id='Sin'  type='text' onchange='setS(this)' value='' size='4' /><div id='MaxT' ></div>";
	$("filmbuildlines").innerHTML="<div id='timeline'></div>";
	$("flellist").innerHTML="";
	$("Ain").style.visibility="hidden";
	$("Din").style.visibility="hidden";
	$("Rin").style.border="1px solid blue";
	$("Sin").style.border="1px solid blue";
	$("Rin").style.paddingLeft="1px";
	$("Sin").style.paddingLeft="1px";
	$("Rin").style.paddingRight="1px";
	$("Sin").style.paddingRight="1px";
	$("Rin").style.visibility="hidden";
	$("Sin").style.visibility="hidden";
	$("MaxT").style.visibility="hidden";
	$("MaxT").style.border="1px solid red";
	$("MaxT").style.width="50px";
	$("MaxT").style.textAlign="right";
	$("MaxT").style.backgroundColor="#FF9999";
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
	FLELHEAD.name="&head!";
	clear($("filmstage"));
	$("shapestage").style.visibility="hidden";
	$("filmstage").style.visibility="visible";
	$("menushape").style.visibility="hidden";
	BUILDCLOSED=false;
	rewritelists();
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
	$("toolbar").style.visibility="hidden";
	CURRENT=scene.shapes;
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
		alert('Traces is neither a number nor continuous - c -');
		return;		  
	}
	if (n<1)
	{
		alert('Traces must be 1 or more.');
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
		if(isNaN(n))
		{
			track.repeats="c"
		}
		else
		{
			track.repeats=n;
		}
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
	$("toolbar").style.visibility="hidden";
	CURRENT=track.shapes;
	openStage('track');
}

function buildTween()
{
	var group,shape,copy;
	var re = /\W/;
	if ($('tweentitle').value.trim()=="")
	{
		alert('No name given ');
		return;
	}
	if (re.test($('tweentitle').value.trim()))
	{
		alert('Name should contain only letters and numbers.');
		return;
	}
	if (checkname($('tweentitle').value.trim(),'tween')) 
	{
		alert('There is already tween with the name '+$('tweentitle').value.trim());
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
	var tween=new Tween($('tweentitle').value.trim());
	TWEENS[tween.name]=tween;
	tween.title=tween.name;
	elementShapeCopy(SELECTED,tween.groups,tween.shapes,0,$("tweenstage"));	
	elementShapeCopy(SELECTED,tween.copy.groups,tween.copy.shapes,0,$("tweenstage"));
	writetweenlist();
	$("shapestage").style.visibility="hidden";
	clear($("tweenstage"));
	clear($("tweenpathsstage"));
	shape=tween.getShape();
	shape.name="A"+shape.name;
	shape.addTo($("tweenstage"));
	shape.draw();
	copy=tween.copy.getShape();
	copy.name="B"+copy.name;
	copy.addTo($("tweenstage"));
	copy.draw();
	$("tweenstage").style.visibility="visible";
	$("tweenpathsstage").style.visibility="visible";
	tween.setAniStage();
	CURRENT={};
	CURRENT[copy.name]=copy;
	CURRENT[shape.name]=shape;
	
	$("checktw").tween="nofilm!!!!,nosprite!!!!,"+tween.name;
	$("savetw").tween="nofilm!!!!,nosprite!!!!,"+tween.name;
	$("swaptw").tween="nofilm!!!!,nosprite!!!!,"+tween.name;
	TWEENEDIT=true;
	CURRENTTWEEN=tween;
	tween.setTweenTimeBox();
	tween.tweenshape=makeCopy(shape,0,$("tweenstage"),{});
	openStage('tween');
}

function buildSprite()
{
	var scene,sprite,topsprite;
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
	var eltopname=$("eldrop").topname;
	var elfilmname=$("eldrop").filmname;
	var engine=$("eldrop").source;
	switch (engine)
	{
		case 'scene':
			scene=SCENES[elname];
			train=scene.copyscene("sprite");
		break
		case 'tween':
			tween=TWEENS[elname];
			train=tween.copytween("sprite");
			train.tweenshape=makeCopy(train.getShape(),0,$("tweenstage"),{});
		break
		case 'sprite':
			topsprite=SPRITES[eltopname];
			sprite=topsprite.getSprite(elname).sprite;
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
	$("checksp").sprite="nofilm!!!!,nosprite!!!!,"+sprite.name;
	$("fullchecksp").sprite="nofilm!!!!,nosprite!!!!,"+sprite.name;
	$("savesp").sprite="nofilm!!!!,nosprite!!!!,"+sprite.name;
	openStage('sprite');
	if($('spritevector').checked)
	{
		alert('Vector now available for positioning');
		sprite.addVector(SCRW/2,SCRH/2);
	}
	else
	{
		alert('Centre marker now available for positioning');
		$('spritecentre').style.left=500;
		$('spritecentre').style.top=200;
		$('spritecentre').style.visibility='visible';
	}
}

function buildFilm(child)
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
	if($("filmsave").value==" Change ")
	{
		var film=FILMS[$('filmtitle').name];
		film.title=$('filmtitle').value;
	}
	else
	{
		if (checkname($('filmtitle').name,'film')) 
		{
			cnfrm=confirm('There is already film with the name '+$('filmtitle').name+"\nOK to overwrite.");
			if(cnfrm)
			{
				var film=FILMS[$('filmtitle').name];
			}
			else
			{
				return;
			}
		}
		else
		{
			var film=new Film($('filmtitle').value.trim());
			film.title=film.name;
			FILMS[film.name]=film;
		}
	}
	film.list=[];
	film.elements={};
	for(var name in FILMBOARD)
	{
		flel=FILMBOARD[name];
		film.elements[name]=flel;
		flel.xOffset=parseInt($(flel.DD.id).style.left);
		flel.yOffset=parseInt($(flel.DD.id).style.top);
		flel.DD.unreg();
		flay=[name,flel.layer];
		film.list.push(flay);
	}
	film.list.sort(zindp);
	FILMBOARD={};
	holder=child.parentNode.parentNode;
	holder.style.visibility="hidden";
	clear($("filmstage"));
	$("shapestage").style.visibility="visible";
	$("filmstage").style.visibility="hidden";
	$("dragstage").style.visibility="hidden";
	$("menushape").style.visibility="inherit";
	writefilmlist();
	BUILDCLOSED=true;
	rewritelists();
}

function writescenelist()
{
	SPANCOUNT=0;
	var DDSC=[];
	var el;
	var schtlm;
	var Col=["#FFFFFF","#8BF7F1"];
	var c=0;
	$("innersc").innerHTML="<ul>";
	for(var name in SCENES)
	{
		scene=SCENES[name];
		schtml='<li id="nofilm!!!!,nosprite!!!!,'+scene.title+','+scene.name+'" style="background-color:'+Col[c]+'"> ';
		if(BUILDCLOSED)
		{
			schtml+='<img src="assets/edit.png" alt="edit" title="edit" onclick="sceneEdit(this)" /> <img src="assets/del.png" alt="delete" title="delete" onclick="sceneDelete(this)" /> ';
		}
		schtml+='<span id="SC'+(SPANCOUNT++)+'" class="innertext">'+scene.title+'</span></li>';
		$("innersc").innerHTML+=schtml;
		c+=1;
		c=c % 2;
	}
	$("innersc").innerHTML+="</ul>";
	for(var i=0;i<SPANCOUNT;i++)
	{
		DDSC[i]=new YAHOO.util.DD("SC"+i,"ELGROUP");
		DDSC[i].setDragElId("dragdiv");
		DDSC[i].onMouseDown=function() {
										$("dragdiv").innerHTML=$(this.id).parentNode.id.split(",")[2];
										$("dragdiv").name=$(this.id).parentNode.id.split(",")[3];
										$("dragdiv").topname=$(this.id).parentNode.id.split(",")[1];
										$("dragdiv").filmname=$(this.id).parentNode.id.split(",")[0];
										$("dragdiv").style.zIndex=ZBOX++;
										$("dragdiv").style.visibility="visible";
									};
		DDSC[i].onDragDrop=function() {
										if(DDeldrop.cursorIsOver)
										{
											el=DDeldrop.getEl();
											el.innerHTML="<br>"+$("dragdiv").innerHTML;
											el.source="scene";
											el.name=$("dragdiv").name;
											el.topname=$("dragdiv").topname;
											el.filmname=$("dragdiv").filmname;
										}
										else if(DDelfilmdrop.cursorIsOver)
										{
											el=DDelfilmdrop.getEl();
											el.source="scene";
											el.title=$("dragdiv").innerHTML;
											el.name=$("dragdiv").name;
											addToFilm(el);
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
	var trhtml;
	var Col=["#FFFFFF","#8BF7F1"];
	var c=0;
	$("innertr").innerHTML="<ul>";
	for(var name in TRACKS)
	{
		track=TRACKS[name];
		trhtml='<li id="nofilm!!!!,nosprite!!!!,'+track.title+','+track.name+'"  style="background-color:'+Col[c]+'"> '
		if(BUILDCLOSED)
		{
			trhtml+='<img src="assets/edit.png" alt="edit" title="edit" onclick="trackEdit(this)" /> <img src="assets/del.png" alt="delete" title="delete" onclick="trackDelete(this)" /> ';
		}
		trhtml+='<span id="TR'+(SPANCOUNT++)+'" class="innertext">'+track.title+'</span></li>';
		$("innertr").innerHTML+=trhtml;
		c+=1;
		c=c % 2;
	}
	$("innertr").innerHTML+="</ul>";
	for(var i=0;i<SPANCOUNT;i++)
	{
		DDTR[i]=new YAHOO.util.DD("TR"+i,"TRGROUP");
		DDTR[i].setDragElId("dragdiv");$("dragdiv").style.visibility="visible";
		DDTR[i].onMouseDown=function() {
										$("dragdiv").innerHTML=$(this.id).parentNode.id.split(",")[2];
										$("dragdiv").name=$(this.id).parentNode.id.split(",")[3];
										$("dragdiv").style.zIndex=ZBOX++;
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

function writetweenlist()
{
	SPANCOUNT=0;
	var DDTW=[];
	var el;
	var twhtml;
	var Col=["#FFFFFF","#8BF7F1"];
	var c=0;
	$("innertw").innerHTML="<ul>";
	for(var name in TWEENS)
	{
		tween=TWEENS[name];
		twhtml='<li id="nofilm!!!!,nosprite!!!!,'+tween.title+','+tween.name+'"  style="background-color:'+Col[c]+'"> '
		if(BUILDCLOSED)
		{
			twhtml+='<img src="assets/edit.png" alt="edit" title="edit" onclick="tweenEdit(this)" /> <img src="assets/del.png" alt="delete" title="delete" onclick="tweenDelete(this)" /> ';
		}
		twhtml+='<span id="TW'+(SPANCOUNT++)+'" class="innertext">'+tween.title+'</span></li>';
		$("innertw").innerHTML+=twhtml;
		c+=1;
		c=c % 2;
	}
	$("innertw").innerHTML+="</ul>";
	for(var i=0;i<SPANCOUNT;i++)
	{
		DDTW[i]=new YAHOO.util.DD("TW"+i,"ELGROUP");
		DDTW[i].setDragElId("dragdiv");
		DDTW[i].onMouseDown=function() {
										$("dragdiv").innerHTML=$(this.id).parentNode.id.split(",")[2];
										$("dragdiv").name=$(this.id).parentNode.id.split(",")[3];
										$("dragdiv").topname=$(this.id).parentNode.id.split(",")[1];
										$("dragdiv").filmname=$(this.id).parentNode.id.split(",")[0];
										$("dragdiv").style.zIndex=ZBOX++;
										$("dragdiv").style.visibility="visible";
									};
		DDTW[i].onDragDrop=function() {
										if(DDeldrop.cursorIsOver)
										{
											el=DDeldrop.getEl();
											el.innerHTML="<br>"+$("dragdiv").innerHTML;
											el.source="tween";
											el.name=$("dragdiv").name;
											el.topname=$("dragdiv").topname;
											el.filmname=$("dragdiv").filmname;
										}
										else if(DDelfilmdrop.cursorIsOver)
										{
											el=DDelfilmdrop.getEl();
											el.source="tween";
											el.title=$("dragdiv").innerHTML;
											el.name=$("dragdiv").name;
											addToFilm(el);
											$("filmbuildstory").style.height=Math.max((parseInt($("filmbuildbox").style.height)+10),FLELHEIGHT)+"px";
											$("scrollud").style.height=((parseInt($("viewport").style.height)-42)*parseInt($("viewport").style.height)/(parseInt($("filmbuildstory").style.height)))+"px";
										}
										$("dragdiv").style.visibility="hidden";
										$("dragdiv").style.top="-50px";
									   };
		DDTW[i].onInvalidDrop=function() {$("dragdiv").style.visibility="hidden";$("dragdiv").style.top="-50px";}
	}
}

function writespritelist()
{
	SPANCOUNT=0;
	var DDSP=[];
	var el;
	var sphtml;
	var Col=["#FFFFFF","#8BF7F1"];
	var c=0;
	$("innersp").innerHTML="<ul>";
	for(var name in SPRITES)
	{
		LIMARGIN="&nbsp;&nbsp;&nbsp;";
		sprite=SPRITES[name];
		if(sprite.expanded)
		{
			sphtml='<li id="nofilm!!!!,'+sprite.name+','+sprite.title+','+sprite.name+'"  style="background-color:'+Col[c]+'">  <img src="assets/contract.png" alt="contract" title="contract" onclick=expand(this) />';
			if(BUILDCLOSED)
			{
				sphtml+=' <img src="assets/edit.png" alt="edit" title="edit" onclick="spriteEdit(this)" /> <img src="assets/del.png" alt="delete" title="delete" onclick="spriteDelete(this)" /> ';
			}
			sphtml+='<span id="SP'+(SPANCOUNT++)+'" class="innertext">SP '+sprite.title+'</span></li>';
			$("innersp").innerHTML+=sphtml;
			sprite.expandspritelist("nofilm!!!!",sprite.name,"sp",Col[c]);
		}
		else
		{
			sphtml='<li id="nofilm!!!!,'+sprite.name+','+sprite.title+','+sprite.name+'"  style="background-color:'+Col[c]+'">  <img src="assets/expand.png" alt="expand" title="expand" onclick=expand(this) /> ';
			if(BUILDCLOSED)
			{
				sphtml+='<img src="assets/edit.png" alt="edit" title="edit" onclick="spriteEdit(this)" /> <img src="assets/del.png" alt="delete" title="delete" onclick="spriteDelete(this)" /> ';
			}
			sphtml+='<span id="SP'+(SPANCOUNT++)+'" class="innertext">SP '+sprite.title+'</span></li>';
			$("innersp").innerHTML+=sphtml;
		}
		c+=1;
		c=c % 2;
	}
	$("innersp").innerHTML+="</ul>";
	for(var i=0;i<SPANCOUNT;i++)
	{
		DDSP[i]=new YAHOO.util.DD("SP"+i,"ELGROUP");
		DDSP[i].setDragElId("dragdiv");$("dragdiv").style.visibility="visible";
		DDSP[i].onMouseDown=function() {
										$("dragdiv").innerHTML=$(this.id).parentNode.id.split(",")[2];
										$("dragdiv").name=$(this.id).parentNode.id.split(",")[3];
										$("dragdiv").topname=$(this.id).parentNode.id.split(",")[1];
										$("dragdiv").filmname=$(this.id).parentNode.id.split(",")[0];
										$("dragdiv").style.zIndex=ZBOX++;
										$("dragdiv").style.visibility="visible";
									};
		DDSP[i].onDragDrop=function() {
										if(DDeldrop.cursorIsOver)
										{
											el=DDeldrop.getEl();
											el.innerHTML="<br>"+$("dragdiv").innerHTML;
											el.source="sprite";
											el.name=$("dragdiv").name;
											el.topname=$("dragdiv").topname;
											el.filmname=$("dragdiv").filmname;
										}
										else if(DDelfilmdrop.cursorIsOver)
										{
											el=DDelfilmdrop.getEl();
											el.source="sprite";
											el.title=$("dragdiv").innerHTML;
											el.name=$("dragdiv").name;
											el.topname=$("dragdiv").topname;
											el.filmname=$("dragdiv").filmname;
											addToFilm(el);
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
	var flhtml;
	var Fcol=["#DDDDDD","#999999"];
	var f=0;
	$("innerfl").innerHTML="<ul>";
	for(var name in FILMS)
	{
		LIMARGIN="&nbsp;&nbsp;&nbsp;";
		film=FILMS[name];
		if(film.expanded)
		{
			flhtml='<li id="nofilm!!!!,'+film.title+','+film.name+'" style="background-color:'+Fcol[f]+'"> <img src="assets/contract.png" alt="contract" title="contract" onclick=filmexpand(this) /> ';
			if(BUILDCLOSED)
			{
				flhtml+='<img src="assets/edit.png" alt="edit" title="edit" onclick="filmEdit(this)" /> <img src="assets/del.png" alt="delete" title="delete" onclick="filmDelete(this)" /> <img src="assets/play.png" alt="play" title="play" onclick="filmPlay(this)" /> ';
			}
			flhtml+='<span id="FL'+(SPANCOUNT++)+'" class="innertext">'+film.title+'</span></li>';
			$("innerfl").innerHTML+=flhtml;
			film.expandfilmlist();		
		}
		else
		{
			flhtml='<li id="nofilm!!!!,'+film.title+','+film.name+'"  style="background-color:'+Fcol[f]+'"> <img src="assets/expand.png" alt="expand" title="expand" onclick=filmexpand(this) /> ';
			if(BUILDCLOSED)
			{
				flhtml+='<img src="assets/edit.png" alt="edit" title="edit" onclick="filmEdit(this)" /> <img src="assets/del.png" alt="delete" title="delete" onclick="filmDelete(this)" /> <img src="assets/play.png" alt="play" title="play" onclick="filmPlay(this)" /> ';
			}
			flhtml+='<span id="FL'+(SPANCOUNT++)+'" class="innertext">'+film.title+'</span></li>';
			$("innerfl").innerHTML+=flhtml;
		}
		f+=1;
		f= f % 2;
	}
	$("innerfl").innerHTML+="</ul>";
/*	for(var i=0;i<SPANCOUNT;i++)
	{
		DDSC[i]=new YAHOO.util.DD("FL"+i,"ELGROUP");
		DDSC[i].setDragElId("dragdiv");
		DDSC[i].onMouseDown=function() {
										$("dragdiv").innerHTML=$(this.id).parentNode.id.split(",")[1];
										$("dragdiv").name=$(this.id).parentNode.id.split(",")[2];
										$("dragdiv").style.zIndex=ZBOX++;
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
											addToFilm(el);
											$("filmbuildstory").style.height=Math.max((parseInt($("filmbuildbox").style.height)+10),FLELHEIGHT)+"px";
											$("scrollud").style.height=((parseInt($("viewport").style.height)-42)*parseInt($("viewport").style.height)/(parseInt($("filmbuildstory").style.height)))+"px";
										}
										$("dragdiv").style.visibility="hidden";
										$("dragdiv").style.top="-50px";
									   };
		DDSC[i].onInvalidDrop=function() {$("dragdiv").style.visibility="hidden";$("dragdiv").style.top="-50px";}
	} Previous comment section to be added when films can be added to films*/ 
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
		var groupcopy=copyGroup(group,offset,theatre,STORE,TO)
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
			inhtml+='<li id='+group.name+'> <span class="innertext" onclick="addgrouptoscene(this)"> '+group.name+' </span></li>';
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
		inhtml+='<li id='+shape.name+'> <span class="innertext" onclick="addshapetoscene(this)"> '+shape.name+' </span></li>';
	}
	
	inhtml+="</ul>";
	return inhtml;
}

function addgrouptoscene(g)
{
	var scene=CURRENTSCENE;
	var name=g.parentNode.id;
	var group=GROUPS[name];
	SELECTED={};
	SELECTED[group.name]=group;
	var groupcopy=elementShapeCopy(SELECTED,scene.groups,scene.shapes,20,$("scenestage"));
	SELECTED={};
	SELECTED[groupcopy.name]=groupcopy;
	clear($("boundarydrop"));
	scene.drawscene();
	$("listshapebox").style.visibility="hidden";
}

function addshapetoscene(s)
{
	var name=s.parentNode.id;
	var shape=SHAPES[name];
	var group=shape.group;
	var scene=CURRENTSCENE;
	SELECTED={};
	if(group.members.length==1)
	{
		SELECTED[group.name]=group;
		elementShapeCopy(SELECTED,scene.groups,scene.shapes,20,$("scenestage"));
	}
	else
	{	 
		var copy=makeCopy(shape,20,$("scenestage"),scene.shapes,scene.groups);
		copy.group=new Group(scene.groups,"group"+(NCOUNT++),shape.group.name,copy);
		copy.setCorners();
		copy.zIndex=ZPOS++;
		copy.Canvas.style.zIndex=copy.zIndex;
		copy.draw();
		SELECTED[copy.group.name]=copy.group;
	}
	clear($("boundarydrop"))
	scene.drawscene();
	$("listshapebox").style.visibility="hidden";
}

function sceneDelete(n)
{
	var idarray=n.parentNode.id.split(",");
	var title=idarray[2]
	var name=idarray[3];
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
	var filmname=idarray[0];
	var topname=idarray[1];
	var name=idarray[3];
	if(filmname=="nofilm!!!!")
	{
		if(topname=="nosprite!!!!")
		{
			var scene=SCENES[name];
			var path="";
		}
		else
		{
			var topsprite=SPRITES[topname];
			var data=topsprite.getScene();
			var scene=data.scene;
			var path=data.path;
		}
	}
	else
	{
		var film=FILMS[filmname];
		if(topname=="nosprite!!!!")
		{
			var scene=film.getFlel(name);
			var path=film.title;
		}
		else
		{
			
			var topsprite=film.getFlel(topname);
			var data=topsprite.getScene();
			var scene=data.scene;
			var path=film.title+"/"+data.path;
		}
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
	CURRENTSCENE=scene;
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
	writefilmlist();
	OKbutton.style.visibility="hidden";
}

function trackDelete(n)
{
	var idarray=n.parentNode.id.split(",");
	var title=idarray[2]
	var name=idarray[3];
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
	var filmname=idarray[0];
	var topname=idarray[1]
	var name=idarray[3];
	if(filmname=="nofilm!!!!")
	{
		if(topname=="nosprite!!!!")
		{
			var track=TRACKS[name];
			var path="";
		}
		else
		{
			var topsprite=SPRITES[topname];
			var data=topsprite.getTrack(name);
			var track=data.track;
			var path=data.path;
		}
	}
	else
	{
		var film=FILMS[filmname];
		var topsprite=film.getFlel(topname);
		var data=topsprite.getTrack(name);
		var track=data.track;
		var path=film.title+"/"+data.path;
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
	if(isNaN(n))
	{
		track.repeats="c"
	}
	else
	{
		track.repeats=n;
	}
	track.yoyo=$('edityoyo').checked;
	track.visible=$('editviewselect').checked;
	OKbutton.style.visibility="hidden";
}

function tweenDelete(n)
{
	var idarray=n.parentNode.id.split(",");
	var title=idarray[2]
	var name=idarray[3];
	var doit = confirm('Do you really want to delete '+title+'?');
	if (doit)
	{
		var tween=TWEENS[name];
		for(var props in tween)
		{
			delete tween[props];
		}
		delete TWEENS[name];
		closedone();
		writetweenlist();
	}
}

function tweenEdit(n)
{
	var shape;
	var idarray=n.parentNode.id.split(",");
	var filmname=idarray[0];
	var topname=idarray[1]
	var name=idarray[3];
	if(filmname=="nofilm!!!!")
	{
		if(topname=="nosprite!!!!")
		{
			var tween=TWEENS[name];
			var path="";
		}
		else
		{
			var topsprite=SPRITES[topname];
			var data=topsprite.getTween();
			var tween=data.tween;
			var path=data.path;
		}
	}
	else
	{
		var film=FILMS[filmname];
		if(topname=="nosprite!!!!")
		{
			var tween=film.getFlel(name);
			var path=film.title;
		}
		else
		{
			
			var topsprite=film.getFlel(topname);
			var data=topsprite.getTween();
			var tween=data.tween;
			var path=film.title+"/"+data.path;
		}
	}
	$("shapestage").style.visibility="hidden";
	removeGradLine();
	closeStops();
	removeRotate();
	$("rotatebox").style.visibility="hidden";
	$("gradfillbox").style.visibility="hidden";
	hideTools();
	closeColor();
	$("tweenbuildbox").visibility="hidden";
	clear($("tweenstage"));
	shape=tween.getShape();
	shape.addTo($("tweenstage"));
	shape.draw();
	copy=tween.copy.getShape();
	copy.addTo($("tweenstage"));
	copy.draw();
	$("tweenstage").style.visibility="visible";
	tween.setAniStage();
	CURRENT={};
	CURRENT[copy.name]=copy;
	CURRENT[shape.name]=shape;
	$("checktw").tween=filmname+','+topname+","+tween.name;
	$("savetw").tween=filmname+','+topname+","+tween.name;
	$("swaptw").tween=filmname+','+topname+","+tween.name;
	TWEENEDIT=true;
	CURRENTTWEEN=tween;
	openStage('tween');	
	$("tweeneditbox").style.top=$("tweenbuildbox").style.top;
	$("tweeneditbox").style.left=$("tweenbuildbox").style.left;
	$("twpath").innerHTML=path;
	$("edittweentitle").value=tween.title;
	$("tweeneditbox").style.visibility="visible";
	$("tweentimebox").style.visibility="visible";
}


function spriteDelete(n)
{
	var idarray=n.parentNode.id.split(",");
	var title=idarray[2]
	var name=idarray[3];
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
	var filmname=idarray[0]
	var topname=idarray[1]
	var name=idarray[3];
	if(filmname=="nofilm!!!!")
	{
		var topsprite=SPRITES[topname];
		var data=topsprite.getSprite(name);
		var sprite=data.sprite;
		var path=data.path;
	}
	else
	{
		var film=FILMS[filmname];
		var topsprite=film.getFlel(topname);
		var data=topsprite.getSprite(name);
		var sprite=data.sprite;
		var path=film.name+"/"+data.path;
	}
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
		sprite.addVector(0,0);
	}
	else
	{
		sprite.addSpriteCentre();
	}
	$("spritebuildbox").visibility="hidden";
	CURRENT=sprite.shapes;
	$("checksp").sprite=filmname+','+topsprite.name+","+sprite.name;
	$("fullchecksp").sprite=filmname+','+topsprite.name+","+sprite.name;
	$("savesp").sprite=filmname+','+topsprite.name+","+sprite.name;
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
			sprite.addVector(0,0);
		}
		else
		{
			$('vecdiv').style.visibility='hidden';
			sprite.addSpriteCentre();
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

function filmEdit(n)
{
	var el,flel,fbel;
	var filmboard=$("filmbuildboard");
	var filmlines=$("filmbuildlines");
	var flay=[];
	var idarray=n.parentNode.id.split(",");
	var topfilm=idarray[0]
	var name=idarray[2];
	if(topfilm=="nofilm!!!!")
	{
		var film=FILMS[name];
	}
	flbb(false);
	$('filmtitle').value=film.title;
	$('filmtitle').name=film.name;
	ELCOUNT=film.list.length;
	$("timeline").style.top=((ELCOUNT+1)*25)+"px";
	FLELHEIGHT=(ELCOUNT+1)*25+75;
	for(var i=0;i<film.list.length;i++)
	{
		flel=film.elements[film.list[i][0]];
		if(flel.source!="scene")
		{
			if(flel.source=="sprite")
			{
				flel.maxruntime=flel.elm.maxruntime(0);
			}
			else
			{
				flel.maxruntime=flel.elm.maxruntime/1000;
			}
			if(flel.maxruntime=="c")  //is continuous
			{
				flel.maxrun.style.width=parseInt($("filmbuildstory").style.width)+"px";
			}
			else
			{
				flel.maxrun.style.width=BOARDZOOM*flel.maxruntime+"px";	
			}
		}
		flel.addToBoard();
		$("filmstage").appendChild(flel.eldiv);
		flel.addToElStage();
	}
}

function copydrag(cursor)
{
	$("dragdiv").style.visibility="visible";
	$("dragdiv").style.top=(cursor.y)-1+"px";
	$("dragdiv").style.left=(cursor.x)-1+"px";
}

function addVector(a,d)
{
		$('vecrotate').style.left=(105+105*Math.cos(this.vector.psi))+"px";
		$('vecrotate').style.top=(105+105*Math.sin(this.vector.psi))+"px";
		MINIVECT.xe=100*Math.cos(this.vector.psi);
		MINIVECT.ye=100*Math.sin(this.vector.psi);		
		$('vecdiv').style.left=(a+this.vector.xs -110-MINIVECT.xs)+"px";
		$('vecdiv').style.top=(d+this.vector.ys -110-MINIVECT.ys)+"px";
		vecanvdraw(this.vector.psi);
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

function addSpriteCentre()
{
	$('spritecentre').style.left=(this.vector.xs-10)+"px";
	$('spritecentre').style.top=(this.vector.ys-10)+"px";
	$('spritecentre').style.visibility='visible';
}


function expand(spexp)
{
	var idarray=spexp.parentNode.id.split(",");
	var filmname=idarray[0];
	var topname=idarray[1];
	var spritename=idarray[3];
	if(filmname=="nofilm!!!!")
	{
		var topsprite=SPRITES[topname];
	}
	else
	{
		var film=FILMS[filmname];
		var topsprite=film.getFlel(topname);
	}
	var sprite=topsprite.getSprite(spritename).sprite;
	if (sprite.expanded)
	{
		sprite.expanded=false;
	}
	else
	{
		sprite.expanded=true;
	}
	if(filmname=="nofilm!!!!")
	{
		writespritelist();
	}
	else
	{
		writefilmlist();
	}
}

function filmexpand(flexp)
{
	var idarray=flexp.parentNode.id.split(",");
	var filmname=idarray[2];
	var film=FILMS[filmname];
	if (film.expanded)
	{
		film.expanded=false;
	}
	else
	{
		film.expanded=true;
	}
	writefilmlist();
}

function rewritelists()
{
	writescenelist();
	writespritelist();
	writetracklist();
	writetweenlist();
	writefilmlist();
}
