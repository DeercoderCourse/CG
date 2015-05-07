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
             //if((firstx[i*100]-secondx[j*100]) < 0.05 && (firsty[i*100]-secondy[j*100]) < 0.05) {
               if(Math.abs(firstx[i*100]-secondx[j*100]) <= 3 && Math.abs(firsty[i*100]-secondy[j*100]) <= 3) {
                    draw_pixel_2(ctx, Math.round(firstx[i*100]), Math.round(firsty[i*100]));   
                    console.log(firstx[i*100], secondx[j*100], firsty[i*100], secondy[j*100]);
                    console.log(i, j);
             }
        }
    }
    
    

}