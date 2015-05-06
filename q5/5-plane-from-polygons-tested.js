var arrayX = new Array();
var arrayY = new Array();
var arrayZ = new Array();
var i = 0;

// judge whether in the plane or approximation
function judgePlane(dist)
{
	if (dist < 1)
	{
		return true;
	}
	else
	{
		return false;
	}
}

// this function gives the cross product of vector a(x,y,z) and b(x,y,z)
function crossProduct(a, b)
{
	var cross={x:0,y:0,z:0};
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

// calculate the distance from Point(x,y,z) to Plane(A,B,C,D), Ax+By+Cz+D=0
function calculateDist(plane, x, y, z)
{
	var A = plane.A;
	var B = plane.B;
	var C = plane.C;
	var D = plane.D;
	
	var upper = Math.abs(A*x+B*y+C*z+D);
	var bottom = Math.sqrt(Math.pow(A,2)+Math.pow(B,2)+Math.pow(C,2));
	var value = upper/bottom * 1.0;

	return value;
}
