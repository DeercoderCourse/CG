var isIntersect = false;

function draw_pixel(ctx, point_x, point_y)
{
    var myImageData = ctx.createImageData(1, 1);
    myImageData.data[0]=255;
    myImageData.data[1]=0;
    myImageData.data[2]=0;
    myImageData.data[3]=255;
    ctx.putImageData(myImageData, point_x, point_y);

}

//this function gives the cross product of vector a(x,y,z) and b(x,y,z)
function crossProduct(a, b)
{
	var cross;
	cross.x = a.y * b.z - a.z * b.y;
	cross.y = a.z * b.x - a.x * b.z;
	cross.z = a.x * b.y - a.y * b.x;
		
	return cross;	// three dimension
}

// this calculate the dotProduct for two vectors a(x,y,z) and b(x,y,z)
function dotProduct(a, b)
{
	var dot;
	dot = a.x * b.x + a.y * b.y + a.z * b.z;

	return dot;	// value for dot product
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


function draw_line(ctx, start, end)
{
    var start_x = start.x;
    var start_y = start.y;
    var start_z = start.z;
    var end_x = end.x;
    var end_y = end.y;
    var end_z = end.z;
   
    for(i = 0; i <= 1; i += 0.01)
    {
        point_x = (1 - i) * start_x + i * end_x;
        point_y = (1 - i) * start_y + i * end_y;
        point_z = (1 - i) * start_z + i * end_z;
        
        draw_pixel(ctx, Math.round(point_x), Math.round(point_y));
    }
}

// this function shows the intersection of the two lines
function show_intersection(ctx, startx, endx, starty, endy)
{
    var start_x = startx.x;
    var start_y = startx.y;
    var start_z = startx.z;
    var end_x = endx.x;
    var end_y = endx.y;
    var end_z = endx.z;
   
    var start_x1 = starty.x;
    var start_y1 = starty.y;
    var start_z1 = starty.z;
    var end_x1 = endy.x;
    var end_y1 = endy.y;
    var end_z1 = endy.z;
   
    var    firstx = new Array(101);
    var    firsty = new Array(101);
    var    firstz = new Array(101);
        
    var    secondx = new Array(101);
    var    secondy = new Array(101);
    var    secondz = new Array(101);    
    
    for(i = 0; i <= 1; i += 0.01)
    {
        var point_x = (1 - i) * start_x + i * end_x;
        var point_y = (1 - i) * start_y + i * end_y;
        var point_z = (1 - i) * start_z + i * end_z;
        
        var point_x1 = (1 - i) * start_x1 + i * end_x1;
        var point_y1 = (1 - i) * start_y1 + i * end_y1;
        var point_z1 = (1 - i) * start_z1 + i * end_z1;
        
        firstx[i*100] = point_x;
        firsty[i*100] = point_y;
        firstz[i*100] = point_z;
        
        secondx[i*100] = point_x1;
        secondy[i*100] = point_y1;
        secondz[i*100] = point_z1;
    }     
    
    for (i = 0; i <= 1; i += 0.01)
    {
        for(j = 0; j <= 1;j += 0.01)
        {
        	   // draw two line intersection if there have
               if(Math.abs(firstx[i*100]-secondx[j*100]) <= 0.5 && Math.abs(firsty[i*100]-secondy[j*100]) <= 0.5) {
            	    isIntersect = true;
                    draw_pixel_2(ctx, Math.round(firstx[i*100]), Math.round(firsty[i*100]));   
                    console.log(firstx[i*100], secondx[j*100], firsty[i*100], secondy[j*100]);
                    console.log(i, j);
             }
        }
    }
}