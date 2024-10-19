// image source: https://visibleearth.nasa.gov/images/73884/november-blue-marble-next-generation-w-topography-and-bathymetry

let earthTexture;
let x, y, z;
let lat = 0;
let long = 0;
let radius;


function preload() {
  earthTexture = loadImage("world.topo.bathy.200411.3x5400x2700.jpg");
}

function setup() {
  angleMode(DEGREES)
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  
  // createEasyCam(); // easycam
}

function draw() {
  radius = min(width,height)/2.5;
  orbitControl();
  
  convert(lat, long)
  background(0);
  noStroke();
  directionalLight(255, 255, 255, -1, 0, -1);
  directionalLight(255, 255, 255, -1, 0, -1);
  directionalLight(255, 255, 255, -1, 0, -1);
  directionalLight(255, 255, 255, 1, 0, 1);
  directionalLight(255, 255, 255, 1, 0, 1);
  directionalLight(255, 255, 255, 1, 0, 1);
  push ()
  texture(earthTexture);
  sphere(radius, 24, 24);
  pop ()
  stroke(255)
  strokeWeight(5)
  push()    //create the box
  translate(x, y, z)
  box(20);
  pop()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight, WEBGL);
}

function convert(lat, long) {
  //lat = (90 - lat) * (Math.PI / 180);
  //long = long * (Math.PI / 180);


  x = radius * cos(lat) * cos(long - 90);
  z = radius * cos(lat) * sin(long - 90);
  //console.log(frameCount/100)
  y = -radius * sin(lat);

}
