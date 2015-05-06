var mLayNum;
var mHeight;
var mShrinkFactor;


// Input is the vertice for the  initial four vertice
function construct3D(intputVertice)
{
	var bottom = {x:"0", y:"0", z:"0"};
	var i;
	
	for(i = 0 ; i < inputVertice.length; i++)
	{
		bottom[i].x = inputVertice[i].x;
		bottom[i].y = inputVertice[i].y;
		bottom[i].z = inputVertice[i].z - mHeight;
	}

	return bottom;
}


// input is the four vertice, and this function trigger the real drawing of plane
// using these four vertice
function drawPlane(vertice)
{
	var scene = new THREE.Scene();
	var geometry = new THREE.Geometry();

	for ( var i = 0; i <= size; i ++ )
	{
		geometry.vertices.push( new THREE.Vector3( vertice[i].x, vertice[i].y, vertice[i].z) );
	}

	var material = new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } );
	var line = new THREE.Line( geometry, material, THREE.LinePieces );
	scene.add( line );
}

// draw the 3D-object by drawing all the six plane, this is implemented by
// drawing each plane interatively. And by forming the new bottom vertices,
// we could generate an array as the input of the drawPlane()
function show3Dobject(inputVertice, bottomVertice)
{
	// for the two plane, draw the line between them.
	// also draw the two plance with
	drawPlane(inputVertice);
	drawPlane(bottomVertice);
	
	var i;
	
	for(i = 0; i < 3; i++)
	{
		var ver = formVerticeArray(inputVertice[i], inputVertice[i+1], bottomVertice[i+1], bottomVertice[i]);
		drawPlane(ver);		// form the side plane between bottom and top;
	}
	var ver = formVerticeArray(inputVertice[3], inputVertice[0], bottomVertice[0], bottomVertice[3]);
	drawPlane(ver); // finish the drawing of the four plance in the side

	// after the six planes, the 3D object is shown.
	
}

// Construct each 3D-object from top to bottom, I use a loop to generate a 3D-object,
// for each layer, first we get the bottom vertice, then using all these parameters
// to show the 3D-object, it is by show3Dobject -> drawPlane()
function constructAll(inputVertice)
{
	var i;
	var j;

	// for each layer, use the parameter generated to construct the bottom vertice
	// then using the total vertice to draw the plane.
	for(i = 0 ; i < mLayNum; i++)
	{
		// get the bottom points by z coordinates.
		var bottomVertice = construct3D(inputVertice);
		
		// show the object by their vertice
		show3Dobject(inputVertice, bottomVertice);
		
		// update the input Vertice after showing one object, then iteratively
		for (j = 0; j < inputVertice.length; j++)
		{
			inputVertice[i].x /= mShrinkFactor;
			inputVertice[i].y /= mShrinkFactor;
			inputVertice[i].z = (inputVertice[i]-mHeight) / mShrinkFactor;
		}
	}
}

