/*
Copyright (c)  2012   John King
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
var Colors = new function()
{
  this.ColorFromHSV = function(hue, sat, val)
  {
    var color = new Color();
    color.SetHSV(hue,sat,val);
    return color;
  }

  this.ColorFromRGB = function(r, g, b)
  {
    var color = new Color();
    color.SetRGB(r,g,b);
    return color;
  }

  this.ColorFromHex = function(hexStr)
  {
    var color = new Color();
    color.SetHexString(hexStr);
    return color;
  }

  function Color()
  {
    //Stored as values between 0 and 1
    var red = 0;
    var green = 0;
    var blue = 0;
   
    //Stored as values between 0 and 360
    var hue = 0;
   
    //Strored as values between 0 and 1
    var saturation = 0;
    var value = 0;
     
    this.SetRGB = function(r, g, b)
    {
      if (isNaN(r) || isNaN(g) || isNaN(b))
        return false;
        
      r = r/255.0;
      red = r > 1 ? 1 : r < 0 ? 0 : r;
      g = g/255.0;
      green = g > 1 ? 1 : g < 0 ? 0 : g;
      b = b/255.0;
      blue = b > 1 ? 1 : b < 0 ? 0 : b;
      
      calculateHSV();
      return true;
    }
   
    this.Red = function()
    { return Math.round(red*255); }
   
    this.Green = function()
    { return Math.round(green*255); }
   
    this.Blue = function()
    { return Math.round(blue*255); }
   
    this.SetHSV = function(h, s, v)
    {
      if (isNaN(h) || isNaN(s) || isNaN(v))
        return false;
        
      hue = (h >= 360) ? 359.99 : (h < 0) ? 0 : h;
      saturation = (s > 1) ? 1 : (s < 0) ? 0 : s;
      value = (v > 1) ? 1 : (v < 0) ? 0 : v;
      calculateRGB();
      return true;
    }
     
    this.Hue = function()
    { return hue; }
     
    this.Saturation = function()
    { return saturation; }
     
    this.Value = function()
    { return value; } 
     
    this.SetHexString = function(hexString)
    {
      if(hexString == null || typeof(hexString) != "string")
        return false;
       
      if (hexString.substr(0, 1) == '#')
        hexString = hexString.substr(1);
       
      if(hexString.length != 6)
        return false;
         
      var r = parseInt(hexString.substr(0, 2), 16);
      var g = parseInt(hexString.substr(2, 2), 16);
      var b = parseInt(hexString.substr(4, 2), 16);
      
      return this.SetRGB(r,g,b);
    }
     
    this.HexString = function()
    {
      var rStr = this.Red().toString(16);
      if (rStr.length == 1)
        rStr = '0' + rStr;
      var gStr = this.Green().toString(16);
      if (gStr.length == 1)
        gStr = '0' + gStr;
      var bStr = this.Blue().toString(16);
      if (bStr.length == 1)
        bStr = '0' + bStr;
      return ('#' + rStr + gStr + bStr).toUpperCase();
    }
   
    this.Complement = function()
    {
      var newHue = (hue>= 180) ? hue - 180 : hue + 180;
      var newVal = (value * (saturation - 1) + 1);
      var newSat = (value*saturation) / newVal;
      var newColor = new Color();
      newColor.SetHSV(newHue, newSat, newVal);
      return newColor;
    }
   
    function calculateHSV()
    {
      var max = Math.max(Math.max(red, green), blue);
      var min = Math.min(Math.min(red, green), blue);
     
      value = max;
     
      saturation = 0;
      if(max != 0)
        saturation = 1 - min/max;
       
      hue = 0;
      if(min == max)
        return;
     
      var delta = (max - min);
      if (red == max)
        hue = (green - blue) / delta;
      else if (green == max)
        hue = 2 + ((blue - red) / delta);
      else
        hue = 4 + ((red - green) / delta);
      hue = hue * 60;
      if(hue <0)
        hue += 360;
    }
   
    function calculateRGB()
    {
      red = value;
      green = value;
      blue = value;
     
      if(value == 0 || saturation == 0)
        return;
     
      var tHue = (hue / 60);
      var i = Math.floor(tHue);
      var f = tHue - i;
      var p = value * (1 - saturation);
      var q = value * (1 - saturation * f);
      var t = value * (1 - saturation * (1 - f));
      switch(i)
      {
        case 0:
          red = value; green = t; blue = p;
          break;
        case 1:
          red = q; green = value; blue = p;
          break;
        case 2:
          red = p; green = value; blue = t;
          break;
        case 3:
          red = p; green = q; blue = value;
          break;
        case 4:
          red = t; green = p; blue = value;
          break;
        default:
          red = value; green = p; blue = q;
          break;
      }
    }
  }
}
();

function colorChanged(source)
{
  $("hexBox").value = currentColor.HexString();
  $("redBox").value = currentColor.Red();
  $("greenBox").value = currentColor.Green();
  $("blueBox").value = currentColor.Blue();
  $("hueBox").value = Math.round(currentColor.Hue());
  var str = (currentColor.Saturation()*100).toString();
  if(str.length > 4)
    str = str.substr(0,4);
  $("saturationBox").value = Math.round(parseInt(str));
  str = (currentColor.Value()*100).toString();
  if(str.length > 4)
    str = str.substr(0,4);
  $("valueBox").value = Math.round(parseInt(str));
  
  if(source == "arrows" || source == "box")
  {
    $("gradientBox").style.backgroundColor = Colors.ColorFromHSV(currentColor.Hue(), 1, 1).HexString();
  }
	
  if(source == "box")
  {
    var el = $("arrows");
    el.style.top = (256 - currentColor.Hue()*255/359.99 - 4) + 'px';
    var circlex = currentColor.Value()*255; 
	var circley = (1-currentColor.Saturation())*255;
    $('circle').style.left=(circlex-5)+"px";
	$('circle').style.top=(circley-5)+"px";
    endMovement();
  }
  
  $("quickColor").style.backgroundColor = currentColor.HexString();
  $("transpslider").style.backgroundColor = currentColor.HexString();
}

function endMovement()
{
  $("staticColor").style.backgroundColor = currentColor.HexString();
}

function hexBoxChanged(e)
{
  currentColor.SetHexString($("hexBox").value);
  colorChanged("box");
}

function redBoxChanged(e)
{
  currentColor.SetRGB(parseInt($("redBox").value), currentColor.Green(), currentColor.Blue());
  colorChanged("box");
}

function greenBoxChanged(e)
{
  currentColor.SetRGB(currentColor.Red(), parseInt($("greenBox").value), currentColor.Blue());
  colorChanged("box");
}

function blueBoxChanged(e)
{
  currentColor.SetRGB(currentColor.Red(), currentColor.Green(), parseInt($("blueBox").value));
  colorChanged("box");
}

function hueBoxChanged(e)
{
  currentColor.SetHSV(parseFloat($("hueBox").value), currentColor.Saturation(), currentColor.Value());
  colorChanged("box");
}

function saturationBoxChanged(e)
{
  currentColor.SetHSV(currentColor.Hue(), parseFloat($("saturationBox").value)/100.0, currentColor.Value());
  colorChanged("box");
}

function valueBoxChanged(e)
{
  currentColor.SetHSV(currentColor.Hue(), currentColor.Saturation(), parseFloat($("valueBox").value)/100.0);
  colorChanged("box");
}

function fixPNG(myImage) 
{
  if(!document.body.filters)
    return;
  var arVersion = navigator.appVersion.split("MSIE");
  var version = parseFloat(arVersion[1]);
  if(version < 5.5 || version >= 7)
    return;

  var imgID = (myImage.id) ? "id='" + myImage.id + "' " : ""
  var imgStyle = "display:inline-block;" + myImage.style.cssText
  var strNewHTML = "<span " + imgID 
              + " style=\"" + "width:" + myImage.width 
              + "px; height:" + myImage.height 
              + "px;" + imgStyle + ";"
              + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
              + "(src=\'" + myImage.src + "\', sizingMethod='scale');\"></span>"
  myImage.outerHTML = strNewHTML
}

function fixGradientImg()
{
  fixPNG($("gradientImg"));
}

function setColor()
{
	if (coltype=='F')
	{
		
		for(var groupName in SELECTED)
		{
			var group=SELECTED[groupName];

			var shapeNames=group.memberShapes();
			for(var name in shapeNames)
			{
				shape=shapeNames[name];
				shape.justfill=true;
				shape.fillStyle[0]=$("redBox").value;
				shape.fillStyle[1]=$("greenBox").value;
				shape.fillStyle[2]=$("blueBox").value;
				shape.fillStyle[3]=1-alphaperct/100;
				shape.draw();
			}
		}
		if(TWEENEDIT)
		{
			CURRENTTWEEN.fillcolour.active=true;
			CURRENTTWEEN.setTweenTimeBox();
		}
	}
	else if (coltype=='S')
	{
		
		for(var groupName in SELECTED)
		{
			var group=SELECTED[groupName];
			var shapeNames=group.memberShapes();
			for(var name in shapeNames)
			{
				shape=shapeNames[name];
				shape.shadowColor[0]=$("redBox").value;
				shape.shadowColor[1]=$("greenBox").value;
				shape.shadowColor[2]=$("blueBox").value;
				shape.shadowColor[3]=1-alphaperct/100;
				shape.draw();
			}
		}
		if(TWEENEDIT)
		{
			CURRENTTWEEN.shadow.active=true;
			CURRENTTWEEN.setTweenTimeBox();
		}
	}	
	else if (coltype=='L')
	{
		for(var groupName in SELECTED)
		{
			var group=SELECTED[groupName];
			var shapeNames=group.memberShapes();
			for(var name in shapeNames)
			{
				shape=shapeNames[name];
				shape.strokeStyle[0]=$("redBox").value;
				shape.strokeStyle[1]=$("greenBox").value;
				shape.strokeStyle[2]=$("blueBox").value;
				shape.strokeStyle[3]=1-alphaperct/100;
				shape.draw();
			}
		}
		if(TWEENEDIT)
		{
			CURRENTTWEEN.linecolour.active=true;
			CURRENTTWEEN.setTweenTimeBox();
		}
	}
	else
	{
		var sp=SELECTEDSHAPE.stopn;
		SELECTEDSHAPE.colorStops[sp][1]=$("redBox").value;
		SELECTEDSHAPE.colorStops[sp][2]=$("greenBox").value;
		SELECTEDSHAPE.colorStops[sp][3]=$("blueBox").value;
		SELECTEDSHAPE.colorStops[sp][4]=1-alphaperct/100;
		for(var groupName in SELECTED)
		{
			var group=SELECTED[groupName];
			var shapeNames=group.memberShapes();
			for(var name in shapeNames)
			{
				shape=shapeNames[name];
				shape.justfill=false;
				for(var i=0; i<4;i++)
				{
					shape.fillStyle[i]=SELECTEDSHAPE.fillStyle[i];
					shape.strokeStyle[i]=SELECTEDSHAPE.strokeStyle[i];
					shape.lineGrad[i]=SELECTEDSHAPE.lineGrad[i];
					shape.shadowColor[i]=SELECTEDSHAPE.shadowColor[i];
				}
				shape.radGrad[0]=SELECTEDSHAPE.radGrad[0];
				shape.radGrad[1]=SELECTEDSHAPE.radGrad[1];
				shape.radGrad[2]=SELECTEDSHAPE.radGrad[2];
				shape.radGrad[3]=SELECTEDSHAPE.radGrad[3];
				shape.radGrad[4]=SELECTEDSHAPE.radGrad[4];
				shape.radGrad[5]=SELECTEDSHAPE.radGrad[5];
				for(var i=0;i<SELECTEDSHAPE.colorStops.length;i++)
				{
					for(var j=0;j<SELECTEDSHAPE.colorStops[i].length;j++)
					{
						shape.colorStops[i][j]=SELECTEDSHAPE.colorStops[i][j];
					}
				}
				shape.draw();
			}
		}
		removeGradLine();
		showGradLine(SELECTEDSHAPE);
		if(TWEENEDIT)
		{
			CURRENTTWEEN.gradfill.active=true;
			CURRENTTWEEN.setTweenTimeBox();
		}
	}
	endMovement();
}

function closeColor()
{ 
	$('colorbox').style.visibility='hidden';
	if ($('sizebox')) {$('sizebox').parentNode.removeChild($('sizebox'))};
}

function fillcolor()
{
	$('gradimg').src="assets/gradfilloff.png";
	$('colimg').src="assets/colfill.png";
	removeGradLine();
	removeRotate();
	var shape=SELECTEDSHAPE;
	$("redBox").value=shape.fillStyle[0];
	redBoxChanged();
	$("greenBox").value=shape.fillStyle[1];
	greenBoxChanged();
	$("blueBox").value=shape.fillStyle[2];
	blueBoxChanged();
	alphaperct = 100*(1-shape.fillStyle[3]);
	$('varrows').style.left=(128*alphaperct/100-4)+"px";
	$('transptext').innerHTML ='Transparency '+Math.floor(alphaperct)+'%';
	if (EXCANVASUSED)
	{
		$('transpslider').filters.alpha.opacity=100-alphaperct;
	}
	else
	{
		$('transpslider').style.opacity=1-alphaperct/100;
	}
	$("transpslider").style.backgroundColor = currentColor.HexString();
	$('colorheadtext').innerHTML='\u00A0 Fill Colour';
	coltype='F';
	$('colorbox').style.visibility='visible';
}

function linecolor()
{
	$("redBox").value=SELECTEDSHAPE.strokeStyle[0];
	redBoxChanged();
	$("greenBox").value=SELECTEDSHAPE.strokeStyle[1];
	greenBoxChanged();
	$("blueBox").value=SELECTEDSHAPE.strokeStyle[2];
	blueBoxChanged();
	alphaperct = 100*(1-SELECTEDSHAPE.strokeStyle[3]);
	$('varrows').style.left=(256*alphaperct/100-4)+"px";
	$('transptext').innerHTML ='Transparency '+alphaperct+'%';
	if (EXCANVASUSED)
	{
		$('transpslider').filters.alpha.opacity=100-alphaperct;
	}
	else
	{
		$('transpslider').style.opacity=1-alphaperct/100;
	}
	$("transpslider").style.backgroundColor = currentColor.HexString();	
	$('colorheadtext').innerHTML='\u00A0 Line Colour';
	coltype='L';
	$('colorbox').style.visibility='visible';
	//if ($('gmenu')) {$('gmenu').parentNode.removeChild($('gmenu'))};
	removeGradLine();
	removeRotate();
}



function moveCircleTo(cur)
{
	cur.x-=parseInt($('colorbox').style.left)+21;
	cur.y-=parseInt($('colorbox').style.top)+46;
	$('circle').style.left=cur.x+"px";
	$('circle').style.top=cur.y+"px";
	if (parseInt($('circle').style.left)<-5) {$('circle').style.left=-5+"px"}
	if (parseInt($('circle').style.left)>250) {$('circle').style.left=250+"px"}
	if (parseInt($('circle').style.top)<-5) {$('circle').style.top=-5+"px"}
	if (parseInt($('circle').style.top)>250) {$('circle').style.top=251+"px"}	
	currentColor.SetHSV(currentColor.Hue(), 1-(parseInt($('circle').style.top)+5)/255.0,(parseInt($('circle').style.left)+5)/255.0);
  	colorChanged("circle");
}

function movetransarrwTo(cur)
{
	cur.x-=parseInt($('colorbox').style.left)+21;
	$('varrows').style.left=cur.x+"px";
	if (parseInt($('varrows').style.left)<-4) {$('varrows').style.left=-4+"px"}
	if (parseInt($('varrows').style.left)>252) {$('varrows').style.left=252+"px"}
	alphaperct=Math.ceil(100*(parseInt($('varrows').style.left)+4)/256);
	$('transptext').innerHTML ='Transparency '+alphaperct+'%';
	if (EXCANVASUSED)
	{
		$('transpslider').filters.alpha.opacity=100-alphaperct;
	}
	else
	{
		$('transpslider').style.opacity=1-alphaperct/100;
	}	
}

function HueBarmoveTo(cur)
{
	cur.y-=parseInt($('colorbox').style.top)+46;
	$('arrows').style.top=cur.y+"px"
	if (parseInt($('arrows').style.top)<-4) {$('arrows').style.top=-4+"px"}
	if (parseInt($('arrows').style.top)>251) {$('arrows').style.top=251+"px"}
  	currentColor.SetHSV((256 - parseInt($('arrows').style.top)+4)*359.99/255, 
	currentColor.Saturation(), currentColor.Value());
  	colorChanged("arrows");;
}