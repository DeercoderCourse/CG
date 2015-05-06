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

function test()
{

	// set the scene size
	var WIDTH = 400,
	  HEIGHT = 300;

	// set some camera attributes
	var VIEW_ANGLE = 45,
	  ASPECT = WIDTH / HEIGHT,
	  NEAR = 0.1,
	  FAR = 10000;

	// get the DOM element to attach to
	// - assume we've got jQuery to hand
	var container = $('#container');

	// create a WebGL renderer, camera
	// and a scene
	var renderer = new THREE.WebGLRenderer();
	var camera =
	  new THREE.PerspectiveCamera(
	    VIEW_ANGLE,
	    ASPECT,
	    NEAR,
	    FAR);

	var scene = new THREE.Scene();

	// add the camera to the scene
	scene.add(camera);

	// the camera starts at 0,0,0
	// so pull it back
	camera.position.z = 300;

	// start the renderer
	renderer.setSize(WIDTH, HEIGHT);

	// attach the render-supplied DOM element
	container.append(renderer.domElement);

}

function init() {
    
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z = 400;
    
    scene = new THREE.Scene();
    
    var geometry = new THREE.BoxGeometry( 200, 200, 200 );
    
    THREE.ImageUtils.crossOrigin = '';
    var texture = THREE.ImageUtils.loadTexture('http://i.imgur.com/vXDWqIH.jpg');
    texture.minFilter = THREE.NearestFilter;
    texture.anisotropy = renderer.getMaxAnisotropy();
    
    var material = new THREE.MeshBasicMaterial( { map: texture } );
    
    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    window.addEventListener( 'resize', onWindowResize, false );
    
}

function onWindowResize() {

camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();

renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

requestAnimationFrame( animate );

mesh.rotation.x += 0.005;
mesh.rotation.y += 0.01;

renderer.render( scene, camera );

}