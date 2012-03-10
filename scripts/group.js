/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

function Group(shape)   //Group object contains shapes and groups in group
{
	this.type="_GROUP";
	this.name="group"+(GCOUNT++);
	this.members=[];
	this.left;
	this.top;
	this.width;
	this.height;
	
	if(arguments.length>0)
	{
		this.members.push(shape);
	}
	//methods
	this.memberShapes=memberShapes;
	this.drawBoundary=drawBoundary;
	this.removeBoundary=removeBoundary;
	this.update=update;
	this.elType=elType;
}


function inAgroup()
{
	return (this.group.members.length>1)
}

function elType()
{
	if(this.type=="_GROUP")
	{
		return "group";
	}
	else if(this.name in SHAPES)
	{
		return "shape";
	}
	else
	{
		return "undefined";
	}
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
		if(collection.elType()=="group")
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
	var group=new Group();
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
	SELECTED={};
	SELECTED[group.name]=group;
	group.drawBoundary();
}

function copyGroup(group,offset,theatre)
{
	var groupcopy=new Group();
	groupcopy.left=group.left+offset;
	groupcopy.top=group.top+offset;
	groupcopy.width=group.width;
	groupcopy.height=group.height;
	for(var i=0; i<group.members.length; i++)
		{
			if(group.members[i].elType()=="group")
			{
				groupcopy.members.push(copyGroup(group.members[i],offset,theatre));
			}
			else
			{
				var shape=group.members[i];
				var copy=makeCopy(shape,offset,theatre);
				groupcopy.members.push(copy);
				copy.group=groupcopy;
				copy.addTo(theatre);
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
	$('ungroup').style.visibility="hidden";
	$('editlines').style.visibility="hidden";
	$('group').style.visibility="visible";
	$('alntop').style.visibility='visible';
	$('alnbot').style.visibility='visible';
	$('alnleft').style.visibility='visible';
	$('alnright').style.visibility='visible';
}

function update(l,t,dx,dy,scalew,scaleh)
{
	this.left+=dx;
	this.top+=dy;
	this.left=l+(this.left-l)*scalew;
	this.top=t+(this.top-t)*scaleh;
	this.width*=scalew;
	this.height*=scaleh;
	for(var i=0;i<this.members.length;i++)
	{
		if(this.members[i].elType()=="group")
		{
			this.members[i].update(l,t,dx,dy,scalew,scaleh); 
		}
	}
}
