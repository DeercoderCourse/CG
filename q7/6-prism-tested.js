var zHeight;
// Input Model info
var inputVertice = new Array(4);
//[new point(0,0,0), new point(0,0,0), new point(0,0,0), new point(0,0,0)] ;


// Output Model info(vertice and edges)
var outputVertice= new Array(8);

//point[inputVertice.length * 2];//{x:"0", y:"0", z:"0"};	
var outputEdge= new Array(12);
//{startPoint:inputVertice[0], endPoint:inputVertice[0]};	

function point(x, y, z)
{
	this.x = x;
	this.y = y;
	this.z = z;
}

function edge(x,y)
{
	this.startPoint = x;
	this.endPoint = y;
}

// parse the json file into the input matrix array, so that we could use it.
function load(data) 
{
	var obj_vertice = JSON.parse(data);
	var i = 0;
	var out_str = "Input Model is: "
	
	for (i = 0; i < obj_vertice.length; i++)
	{
		inputVertice[i] = new point(0,0,0);
		inputVertice[i].x = obj_vertice[i].x;
		inputVertice[i].y = obj_vertice[i].y;
		inputVertice[i].z = obj_vertice[i].z; 	
		console.log("x=" + obj_vertice[i].x + ",y="+obj_vertice[i].y+",z="+obj_vertice[i].z);
		
		out_str += "("+ obj_vertice[i].x+","+obj_vertice[i].y+","+obj_vertice[i].z+"),";
	}
	alert(out_str);
	//console.log("x=" + obj_vertice[1].x + ",y="+obj_vertice[1].y+",z="+obj_vertice[1].z);
}

// read the jason file in the files structure, used for loading the file
function readJsonFile(evt)
{
    var reader = new FileReader();
    var f = evt.target.files[0]; // FileList object
    
    
    reader.onload = (function(theFile) {
      return function(e) {
        var span = document.createElement('span');
        span.innerHTML = ['<img class="thumb" src="', e.target.result,
                          '" title="', escape(theFile.name), '"/>'].join('');
        document.getElementById('list').insertBefore(span, null);
      };
    })(f);

    reader.readAsDataURL(f);
    return reader;
}

// This function generates the new vertice for the polygon,
// it also forms some description of the new prism
function generateModel(z)
{
	var i;
	var len = inputVertice.length;
	
	for(i = 0; i < outputVertice.length; i++)
	{
		outputVertice[i] = new point(0,0,0);
	}

	for(i = 0; i < 12; i++)
	{
		outputEdge[i] = new edge(new point(0,0,0), new point(0,0,0));
	}
	
	for(i = 0; i < 4; i++)
	{
		outputVertice[i] = inputVertice[i];
	}

	for(i = inputVertice.length; i < 2 * inputVertice.length; i++)
	{
		outputVertice[i].x = inputVertice[i-inputVertice.length].x;
		outputVertice[i].y = inputVertice[i-inputVertice.length].y;
		outputVertice[i].z = Number(inputVertice[i-inputVertice.length].z) + Number(z);
	}

	for(i = 0; i < inputVertice.length - 1; i++)
	{
		outputEdge[i].startPoint = inputVertice[i];
		outputEdge[i].endPoint = inputVertice[i+1];
	}
	// last edge should go back to the first zero index point
	outputEdge[inputVertice.length-1].startPoint = inputVertice[inputVertice.length-1];
	outputEdge[inputVertice.length-1].endPoint = inputVertice[0];

	// generate the opposite side's edge after moving z units
	for(i = 0; i < inputVertice.length - 1; i++)
	{
		outputEdge[i+len].startPoint = outputVertice[i];
		outputEdge[i+len].endPoint = outputVertice[i+1];
	}
	// last edge should go back to the first zero index point
	outputEdge[inputVertice.length-1+len].startPoint = outputVertice[inputVertice.length-1+len];
	outputEdge[inputVertice.length-1+len].endPoint = outputVertice[len];
	
	// at last, form the edge in z orientation.
	for(i = 0; i < len; i++)
	{
		outputEdge[2 * len + i].startPoint = outputVertice[i];
		outputEdge[2 * len + i].endPoint = outputVertice[i+len];
	}
	
}

function printModel()
{
	var out_vertice="Vertice: ";
	var out_edge="Edge: "
		
	var i = 0;
	
	for(i = 0; i < outputVertice.length; i++)
	{
		out_vertice += "("+ outputVertice[i].x+","+outputVertice[i].y+","+outputVertice[i].z+"),";
	}

	for(i = 0; i < outputEdge.length; i++)
	{
		out_edge += "(start:(" + outputEdge[i].startPoint.x+","+outputEdge[i].startPoint.y+","+outputEdge[i].startPoint.z
				+"), end:(" + outputEdge[i].endPoint.x + "," + outputEdge[i].endPoint.y + "," + outputEdge[i].endPoint.z
				+")), ";
	}

	alert(out_vertice + out_edge);
}

