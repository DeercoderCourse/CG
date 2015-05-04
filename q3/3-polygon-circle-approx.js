var sigma = 0;
var i = 0;

function draw_pixel(ctx, point_x, point_y)
{
    var myImageData = ctx.createImageData(1, 1);
    myImageData.data[0]=255;
    myImageData.data[1]=0;
    myImageData.data[2]=0;
    myImageData.data[3]=255;
    ctx.putImageData(myImageData, point_x, point_y);
}

function draw_pixel_2(ctx, point_x, point_y)
{
    var myImageData = ctx.createImageData(1, 1);
    myImageData.data[0]=0;
    myImageData.data[1]=255;
    myImageData.data[2]=187;
    myImageData.data[3]=255;
    ctx.putImageData(myImageData, point_x, point_y);
}

function isMatched(point_x, vertice)
{
	var ret = false;
	var i;
	
	for (i = 0; i < vertice.length/2; i++)
	{
		if (Math.abs(point_x - vertice[i*2]) <= 3)
		{
			ret = true;
			console.log("matched!");
			break;
		}
	}

	return ret;
}


function draw_pixel_selection(ctx, point_x, point_y, oldcenterX, oldCenterY, oldRadius, vertice)
{ 
	// this label=250 depends on the value and size you choose
    if ( Math.abs(Math.pow(point_x - oldcenterX, 2) + Math.pow(point_y-oldCenterY, 2) - Math.pow(oldRadius, 2)) <= 300)
    {
    	var myImageData = ctx.createImageData(1, 1);
    	myImageData.data[0]=0;
    	myImageData.data[1]=255;
    	myImageData.data[2]=187;
    	myImageData.data[3]=255;
    	ctx.putImageData(myImageData, point_x, point_y);
    	
 //   	console.log("insert but maybe not add to array, x = " + point_x);
    	
    	if(isMatched(point_x, vertice) == false)
    	{
    	 	vertice[i++] = point_x;
        	vertice[i++] = point_y;
        	console.log("Intersect, insert!");
        	console.log("x =" + point_x + " y=" + point_y);
    	}	
    }
}


function draw_circle(ctx, centerX, centerY, radius) 
{
	d = (5 - radius * 4)/4;
	x = 0;
	y = radius;

	do {
		draw_pixel(ctx,centerX + x, centerY + y);
		draw_pixel(ctx,centerX + x, centerY - y);
		draw_pixel(ctx,centerX - x, centerY + y);
		draw_pixel(ctx,centerX - x, centerY - y);
		draw_pixel(ctx,centerX + y, centerY + x);
		draw_pixel(ctx,centerX + y, centerY - x);
		draw_pixel(ctx,centerX - y, centerY + x);
		draw_pixel(ctx,centerX - y, centerY - x);
		if (d < 0) {
			d += 2 * x + 1;
		} else {
			d += 2 * (x - y) + 1;
			y--;
		}
		x = x + 1;
	} while (x <= y);

}

/// only draw those point that are intersection between circle
/// the original one and our chord circle.
function draw_circle_point(ctx, oldcenterX, oldCenterY, oldRadius, centerX, centerY, radius, vertice) 
{
	d = (5 - radius * 4)/4;
	x = 0;
	y = radius;

	do {
		draw_pixel_selection(ctx,centerX + x, centerY + y, oldcenterX, oldCenterY, oldRadius, vertice);
		draw_pixel_selection(ctx,centerX + x, centerY - y, oldcenterX, oldCenterY, oldRadius, vertice);
		draw_pixel_selection(ctx,centerX - x, centerY + y, oldcenterX, oldCenterY, oldRadius, vertice);
		draw_pixel_selection(ctx,centerX - x, centerY - y, oldcenterX, oldCenterY, oldRadius, vertice);
		draw_pixel_selection(ctx,centerX + y, centerY + x, oldcenterX, oldCenterY, oldRadius, vertice);
		draw_pixel_selection(ctx,centerX + y, centerY - x, oldcenterX, oldCenterY, oldRadius, vertice);
		draw_pixel_selection(ctx,centerX - y, centerY + x, oldcenterX, oldCenterY, oldRadius, vertice);
		draw_pixel_selection(ctx,centerX - y, centerY - x, oldcenterX, oldCenterY, oldRadius, vertice);
		if (d < 0) {
			d += 2 * x + 1;
		} else {
			d += 2 * (x - y) + 1;
			y--;
		}
		x = x + 1;
	} while (x <= y);
}



function draw_line(ctx, start, end)
{
    start_x = start.x;
    start_y = start.y;
    start_z = start.z;
    end_x = end.x;
    end_y = end.y;
    end_z = end.z;
   
    for(i = 0; i <= 1; i += 0.01)
    {
        point_x = (1 - i) * start_x + i * end_x;
        point_y = (1 - i) * start_y + i * end_y;
        point_z = (1 - i) * start_z + i * end_z;
        
        draw_pixel(ctx, Math.round(point_x), Math.round(point_y));
    }     

}


function draw_poly(ctx, startx, starty, startz, starte)
{

    var x1 = startx.x;
    var y1 = startx.y;
    var x2 = starty.x;
    var y2 = starty.y;
    var x3 = startz.x;
    var y3 = startz.y;
    var x4 = starte.x;
    var y4 = starte.y;

    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.closePath();
    //ctx.fill();   //if don't comment then there will be filled area inside
    ctx.stroke();   // here we add stroke instead of fill, so that it's empty
                    // in the polygon rather than filled  
}


/// for the value of eipsle, it is just the r - rcos(pi/n), as in the shape
/// the length from center to the edge is rcos(pi/n), so here we could get the
/// following value of the eipsle.
function show_sigma(radius, number)
{

	sigma = radius - radius * Math.cos(Math.PI / number);
	
}


