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
	this.ratio;
	
	if(arguments.length>0)
	{
		this.members.push(shape);
	}
	//methods
	this.memberShapes=memberShapes;
	this.drawBoundary=drawBoundary;
	this.removeBoundary=removeBoundary;
	this.updateBoundary=updateBoundary;
	this.elType=elType;
}


function inAgroup()
{
	return (this.members.length>1)
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
	var ms={}
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

function groupSELECTED()  //groups together those shapes and groups with drawn boundaries
{
	var group=new Group();
	var SELgroup;
	var left=1000000;
	var top=1000000;
	var right=-1000000;
	var bottom=-1000000;
	for(var i=0;i<$("markerdrop").childNodes.length;i++)  //child nodes are drawn boundaries
	{
		 SELgroup=$("markerdrop").childNodes[i].group;  //gets group surrounded by boundary
		 group.members.push(SELgroup);                  // adds this to new group
		 left=Math.min(left,SELgroup.left);            // checks boundary position and size to ensure boundary of new group 
		 top=Math.min(top,SELgroup.top);
		 right=Math.max(right,SELgroup.right);
		 bottom=Math.max(bottom,SELgroup.bottom);
	}
	group.left=left;
	group.top=top;
	group.width=right-left;
	group.height=bottom-top;
	membersList=group.setOfMembers();  //array of all shapes within the group 
	for (var i=0; i<membersList; i++)
	{
		membersList[i].group=group;   //replace the group of each shape with the new group;
	}
}
