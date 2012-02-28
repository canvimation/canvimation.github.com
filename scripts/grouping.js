/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function Groupy()
{
	sl=selected.length;
	var mxx,mnx,mxy,mny;
	mnx=selected[0].bleft;
	mxx=selected[0].bleft+selected[0].bwidth;
	mny=selected[0].btop;
	mxy=selected[0].btop+selected[0].bheight;
	for (var i=1; i<sl; i++)
	{
		if (selected[i].bleft<mnx) {mnx=selected[i].bleft};
		if (selected[i].bleft+selected[i].bwidth>mxx) {mxx=selected[i].bleft+selected[i].bwidth};
		if (selected[i].btop<mny) {mny=selected[i].btop};
		if (selected[i].btop+selected[i].bheight>mxy) {mxy=selected[i].btop+selected[i].bheight};														 
	}
	gpsel=[];
	for (var i=0; i<sl; i++)
	{
		selected[i].bleft=mnx;
		selected[i].bwidth=mxx-mnx;
		selected[i].btop=mny;
		selected[i].bheight=mxy-mny;
		selected[i].group.push(gp.length);
		selected[i].rotated=false;
		selected[i].phi=0;
		gpsel.push(selected[i]);
		
	}
	gp.push(gpsel);
	var bd=$('bodydiv');
	var bdc=$('bodydiv').childNodes;
	while(bdc.length>0)
	{
		bd.firstChild.parentNode.removeChild(bd.firstChild);
		bdc=$('bodydiv').childNodes;

	}
	var bdry=selected[0].createBoundary();
	for (i=1;i<sl;i++)
	{
		selected[i].boundary=bdry;

	} 
	$('group').style.visibility='hidden';
	$('alnleft').style.visibility='hidden';
	$('alnright').style.visibility='hidden';
	$('alntop').style.visibility='hidden';
	$('alnbot').style.visibility='hidden';
	$('ungroup').style.visibility='visible';
	removeGradLine();
	removeRotate();
}

function ungroup()
{
	var canvas;
	var bd=$('bodydiv');
	var bdc=$('bodydiv').childNodes;
	while(bdc.length>0)
	{
		if (bd.firstChild.id.substr(0,8)=='boundary')
		{
			bd.firstChild.canvas.boundary='empty';
		}
		bd.firstChild.parentNode.removeChild(bd.firstChild);
		bdc=$('bodydiv').childNodes;
	}
	var indx =selected[0].group.pop();
	selected[0].group.push(indx);
	while (gp[indx].length>0)
	{
		canvas = gp[indx].pop();
		canvas.group.pop()
	}
	sl=selected.length;
	gpinxlist=[];
	for (var i=0;i<sl;i++)
	{
		g=getmaxmin(selected[i].path);
		selected[i].bleft=g.mnx;
		selected[i].bwidth=g.mxx-g.mnx;
		selected[i].btop=g.mny;
		selected[i].bheight=g.mxy-g.mny;
		sg=selected[i].group;
		if (gpinxlist.indexOf(sg[sg.length-1])==-1)
		{
			gpinxlist.push(sg[sg.length-1])
		}
	} 
	if (gpinxlist.length==0)
	{
		for (var i=0;i<sl;i++)
		{
			selected[i].createBoundary();
		} 
	}
	else
	{
		gpinxlist.sort(asnum);
		for (var i=0; i<gpinxlist.length; i++)
		{
			reboundary(gpinxlist[i]);
		}
	}
	
	$('ungroup').style.visibility='hidden';
	$('group').style.visibility='visible';
	$('alnleft').style.visibility='visible';
	$('alnright').style.visibility='visible';
	$('alntop').style.visibility='visible';
	$('alnbot').style.visibility='visible';
	removeGradLine();
	removeRotate();
}

function asnum(a,b)
{
	return a-b;
}

function reboundary(p)
{
	var s=gp[p];
	sl=s.length;
	var mxx,mnx,mxy,mny;
	mnx=100000;
	mxx=-100000;
	mny=100000;
	mxy=-100000;
	for (var i=0; i<sl; i++)
	{
		if (s[i].bleft<mnx) {mnx=s[i].bleft};
		if (s[i].bleft+s[i].bwidth>mxx) {mxx=s[i].bleft+s[i].bwidth};
		if (s[i].btop<mny) {mny=s[i].btop};
		if (s[i].btop+s[i].bheight>mxy) {mxy=s[i].btop+s[i].bheight};
	}
	for (var i=0; i<sl; i++)
	{
		s[i].bleft=mnx;
		s[i].bwidth=mxx-mnx;
		s[i].btop=mny;
		s[i].bheight=mxy-mny;
	}
	var bdry=s[0].createBoundary();
	for (i=1;i<sl;i++)
	{
		s[i].boundary=bdry;
	} 
}