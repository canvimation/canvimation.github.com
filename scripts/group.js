/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

function Group(COLLECTION,name,title,shape)   //Group object contains shapes and groups in group
{
	this.elType="_GROUP";
	this.title=title;
	this.name=name;
	this.members=[];
	this.left;
	this.top;
	this.width;
	this.height;
	p=new Point(200,200);
   	this.centreOfRotation=p;
   	this.phi=0;  //angle of rotation
   	this.clockwise=true;	
	
	COLLECTION[this.name]=this;
	
	if(arguments.length>3)
	{
		this.members.push(shape);
	}
	//methods
	this.memberShapes=memberShapes;
	this.drawBoundary=drawBoundary;
	this.removeBoundary=removeBoundary;
	this.groupRotate=groupRotate;
	this.update=update;
	this.GroupToText=GroupToText;
	this.contains=contains;
	this.showmembers=showmembers;
}


function inAgroup()
{
	return (this.group.members.length>1)
}


function memberShapes()
{
	var ms={};
	var list=separate(this.members);
	for(var i=0; i<list.length; i++)
	{
		ms[list[i].name]=list[i]
	}
	return ms;
}

function separate(list)
{
	var set=[];
	var collection;
	for(var i=0;i<list.length; i++)
	{
		collection=list[i];
		if(collection.elType=="_GROUP")
		{
			set=Union(set,separate(collection.members));
		}
		else  //collection is a shape
		{
			set.push(collection);
		}
	}
	return set
}

function Union(A,B)
{
	var S=[];
	for(var i=0; i<A.length; i++)
	{
		S.push(A[i]);
	}
	for(var i=0; i<B.length; i++)
	{
		S.push(B[i]);
	}
	return S;
}

function groupJoin()  //groups together array of  groups  place $("boundarydrop").childNodes[].group into any array SELgroup before using for group by boundaries
{
	var group=new Group(GROUPS,"Group"+GCOUNT,"Group"+(GCOUNT++));
	var SELgroup;
	var left=1000000;
	var top=1000000;
	var right=-1000000;
	var bottom=-1000000;
	for(var i=0;i<$("boundarydrop").childNodes.length;i++)  //child nodes are drawn boundaries
	{
		 SELgroup=$("boundarydrop").childNodes[i].group;  //gets group surrounded by boundary
		 group.members.push(SELgroup);                  // adds this to new group
		 left=Math.min(left,SELgroup.left);            // checks boundary position and size to ensure boundary of new group 
		 top=Math.min(top,SELgroup.top);
		 right=Math.max(right,SELgroup.left+SELgroup.width);
		 bottom=Math.max(bottom,SELgroup.top+SELgroup.height);
	}
	group.left=left;
	group.top=top;
	group.width=right-left;
	group.height=bottom-top;
	group.centreOfRotation.x=group.left+group.width/2;
	group.centreOfRotation.y=group.top+group.height/2;
	group.phi=0;
	var members=group.memberShapes();  // all shapes within the group 
	for (var shape in members)
	{
		members[shape].group=group;   //replace the group of each shape with the new group;
	}
	clear($("boundarydrop"));
	$('ungroup').style.visibility="visible";
	$('editlines').style.visibility="hidden";
	$('group').style.visibility="hidden";
	$('alntop').style.visibility='hidden';
	$('alnbot').style.visibility='hidden';
	$('alnleft').style.visibility='hidden';
	$('alnright').style.visibility='hidden';
	$("sname").style.visibility="visible";
	$("sname").alt="group name";
	$("sname").title="group name";
	SELECTED={};
	SELECTED[group.name]=group;
	group.drawBoundary();
}

function copyGroup(group,offset,theatre,STORE,COLLECTION)
{
	if(theatre.id=="shapestage")
	{
		var name="Group"+(GCOUNT++);
	}
	else
	{
		var name="SUBGP"+(NCOUNT++);
	}
	var groupcopy=new Group(COLLECTION,name,group.title);	
	groupcopy.left=group.left+offset;
	groupcopy.top=group.top+offset;
	groupcopy.width=group.width;
	groupcopy.height=group.height;
	groupcopy.centreOfRotation.x=group.centreOfRotation.x+offset;
	groupcopy.centreOfRotation.y=group.centreOfRotation.y+offset;
   	groupcopy.phi=group.phi; 

	for(var i=0; i<group.members.length; i++)
	{
		if(group.members[i].elType=="_GROUP")
		{
			groupcopy.members.push(copyGroup(group.members[i],offset,theatre,STORE,COLLECTION));
		}
		else
		{
			var shape=group.members[i];
			var copy=makeCopy(shape,offset,theatre,STORE); 
		
			groupcopy.members.push(copy);
			copy.group=groupcopy;
			if(theatre.id=="shapestage")
			{
				copy.draw();
			}
		}
	}
	return groupcopy;
}

function ungroup()
{
	var members;
	var grouped=$("boundarydrop").childNodes[0].group;
	clear($("boundarydrop"));
	SELECTED={};
	for(var i=0; i<grouped.members.length; i++)
	{
		group=grouped.members[i];
		SELECTED[group.name]=group;
		members=group.memberShapes();
		for(var shapename in members)
		{
			shape=members[shapename];
			shape.group=group;
		}
		group.drawBoundary();
	}
	setTools(false);
	$('ungroup').style.visibility="hidden";
	$('editlines').style.visibility="hidden";
	$('group').style.visibility="visible";
	$('alntop').style.visibility='visible';
	$('alnbot').style.visibility='visible';
	$('alnleft').style.visibility='visible';
	$('alnright').style.visibility='visible';
	$("sname").style.visibility="hidden";
	$("sname").alt="shape name";
	$("sname").title="shape name";
}

function update(l,t,dx,dy,scalew,scaleh)
{
	this.left+=dx;
	this.top+=dy;
	this.left=l+(this.left-l)*scalew;
	this.top=t+(this.top-t)*scaleh;
	this.width*=scalew;
	this.height*=scaleh;
	this.centreOfRotation.x+=dx;
	this.centreOfRotation.y+=dy;
	this.centreOfRotation.x=l+(this.centreOfRotation.x-l)*scalew;
	this.centreOfRotation.y=t+(this.centreOfRotation.y-t)*scaleh;
	for(var i=0;i<this.members.length;i++)
	{
		if(this.members[i].elType=="_GROUP")
		{
			this.members[i].update(l,t,dx,dy,scalew,scaleh); 
		}
	}
}

function groupRotate(phi)
{
	var members=this.memberShapes();  // all shapes within the group 
	var cx=this.centreOfRotation.x;
	var cy=this.centreOfRotation.y;
	var p;
	var mnx=1000000;
	var mny=1000000;
	var mxx=-1000000;
	var mxy=-1000000;
	
	for(var name in members)
	{
		shape=members[name];
		//rotate gradients
		p=new Point(shape.lineGrad[0]-cx,shape.lineGrad[1]-cy);
		p=p.pointRotate(phi);
		shape.lineGrad[0]=p.x+cx;
		shape.lineGrad[1]=p.y+cy;
		p=new Point(shape.lineGrad[2]-cx,shape.lineGrad[3]-cy);
		p=p.pointRotate(phi);
		shape.lineGrad[2]=p.x+cx;
		shape.lineGrad[3]=p.y+cy;
		p=new Point(shape.radGrad[0]-cx,shape.radGrad[1]-cy);
		p=p.pointRotate(phi);
		shape.radGrad[0]=p.x+cx;
		shape.radGrad[1]=p.y+cy;
		p=new Point(shape.radGrad[3]-cx,shape.radGrad[4]-cy);
		p=p.pointRotate(phi);
		shape.radGrad[3]=p.x+cx;
		shape.radGrad[4]=p.y+cy;
	//rotate nodes
		node=shape.path.next;
		while(node.point.x!="end")
		{
			p=new Point(node.point.x-cx,node.point.y-cy);
			p=p.pointRotate(phi);
			node.point.x=p.x+cx;
			node.point.y=p.y+cy;
			if(node.ctrl1.x!="non") //changes when straight line set on curve
			{
				p=new Point(node.ctrl1.x-cx,node.ctrl1.y-cy);
				p=p.pointRotate(phi);
				node.ctrl1.x=p.x+cx;
				node.ctrl1.y=p.y+cy;
				p=new Point(node.ctrl2.x-cx,node.ctrl2.y-cy);
				p=p.pointRotate(phi);
				node.ctrl2.x=p.x+cx;
				node.ctrl2.y=p.y+cy;
			}
			node=node.next;
		}
		shape.setCorners();
		shape.draw();
		if (mnx>shape.tplftcrnr.x){mnx=shape.tplftcrnr.x};
		if (mny>shape.tplftcrnr.y){mny=shape.tplftcrnr.y};
		if (mxx<shape.btmrgtcrnr.x){mxx=shape.btmrgtcrnr.x};
		if (mxy<shape.btmrgtcrnr.y){mxy=shape.btmrgtcrnr.y};
	}
	this.left=mnx;
	this.top=mny;
	this.width=mxx-mnx;
	this.height=mxy-mny;
	clear($("boundarydrop"));
	this.drawBoundary();
}

function contains(subgroup)
{
	var group;
	for(var i=0; i<this.members.length; i++)
	{
		if(this.members[i].elType=="_GROUP")
		{
			group=this.members[i];
			if(group.name == subgroup.name)
			{
				return true;
			}
		}
	}
	return false;
}

function showmembers()
{
	var mem="[";	
		for(var i=0; i<this.members.length; i++)
		{
			if(this.members[i].elType=="_GROUP")
			{
				mem+=this.members[i].name +"="+this.members[i].showmembers();
			}
			else
			{
				var shape=this.members[i];
				mem+=shape.name;
			}
		}
		return mem+="]  ";

}

