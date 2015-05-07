// store the sampling color RGB value
var mSample_R;
var mSample_G;
var mSample_B;

// store the brush shape
var mBrushShape;
var mColor;		// constructed by the mSample_*;

function Color(R, G, B)
{
	this.R = R;
	this.G = G;
	this.B = B;
}

function setBrushShape(shape)
{
	mBrushShape = shape;
}

function setSampleColor(color)
{
	mSample_R = color.R;
	mSample.G = color.G;
	mSample.B = color.B
}

// each move should occured in this function and start drawing something
function draw_line(e)
{
	//here we have location and pen state like the color
	// so that can draw some lines as it moves
	var locX = e.locationX;
	var locY = e.locationY;
	var color = getSampleColor();
	drawPolyLine(locX, locY, color);
}

// as it moves, it will erase something at this postion
function erase_image(e)
{
	// here we need some postion as the event e indicates
	// then get the current(or with some neighbour) pixel, set it to white
	// that seems like erasing the board
	var locX = e.locationX;
	var locY = e.locationY;
	eraseWithMarker(locX, locY);
}


// use the color to draw the lines from some points every some moves
function drawPolyLine(locX, locY, color)
{
	context.beginPath();
	context.moveTo(locX + 10, locY + 24);
	context.lineTo(locX + 10, locY + 24);
	context.lineTo(locX + 22, locY + 16);
	context.lineTo(locX + 22, locY + 31);
	context.closePath();
	context.fillStyle = color;
	context.fill();	
}

// Use the marker, here I want to show the marker with its shape like square or circle
// And since we sampled images, so the shape should be with the color selected currently
function useMarker(curLocX, curLocY, curColor)
{
	// Draw the marker tool background(rectangle, or circle...)
	context.drawImage(markerBackgroundImage, 0, 0, canvasWidth, canvasHeight);
	
	// for the marker give the shape shows
	drawPolyLine(curLocX, curLocY, curColor);

	if (mBrushShape == 0)
	{
		// 0 represents the circle
		context.drawImage(markerImage, locX, locY, mediumImageRadius);
	}
	else if (mBrushShape == 1)
	{
		// 1 reprensents the square
		context.drawImage(markerImage, locX, locY, square);
	}
}

// erase the current space with the position,
function eraseWithMarker(curLocX, curLocY)
{
	if (mBrushShape == 0)
	{
		// circle, then erease area should be a circle with radisu, here set it to 4
		
	}
	else if (mBrushShape == 1)
	{
		// square, then with the width , here we set it to 4, so 4x4 area
	}
	
}

// Once we click and set the shape, should call this to update the shape of brush
function updateShape()
{
	useMarker();
}

// for the pen, we need just to show some shapes around it, with its color,
// unlike the shape of marker for ereasing
function showPenColor()
{
	context.drawImage(penImage, 0, 0, 5, locX, locY);
}

// if click, then set the color and show it immediately
function getSampleColor()
{
	var position = context.getCurrentPixelPos();
	var curColor = getCurrentColor(postion.x, position.y);
	setSampleColor(curColor);
	showPenColor();
}

// according to current location in pixel, we need system API to get color
function getCurrentColor(x, y)
{
	var sysColor = canvas.getColorBoard(x, y); // system API to get pixel color
	var color = transferColor(sysColor); // transfer to R,G,B format
	
	return color;
}

// transfer format to our RGB format
function transferColor(sysColor)
{
	sysColor = Number(sysColor);
	var r_color = sysColor && 0x000011;
	var g_color = sysColor && 0x001100;
	var b_color = sysColor && 0x110000;
	var retColor;
	retColor = Color(r_color, g_color, b_color);
	
	return retColor;
}