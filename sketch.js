// image source: https://visibleearth.nasa.gov/images/73884/november-blue-marble-next-generation-w-topography-and-bathymetry

let earthTexture;
let stars;
let x, y, z;
let lat = 38.907192;
let long = -77.036873;
let radius;


function preload() {
   earthTexture = loadImage("world.topo.bathy.200411.3x5400x2700.jpg");
  //earthTexture = loadImage("world21k.jpg");

}

function setup() {
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
  yrot += yprime;
  yprime += yacc;

  rotateY(yrot);
  push ()
  texture(earthTexture);
  sphere(radius, 24, 24);
  pop ()
  stroke(255)
  strokeWeight(5)

  push()    //create the box
  convert(39.904202, 116.407394)
  translate(x, y, z)
  box(100);
  pop()
  for(let i = 0; i<10; i++){
    //box(random(-400,400),random(-400,400),random(-400,400))
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight, WEBGL);
}

function convert(lat, long) {
  lat = (90 - lat) * (Math.PI / 180);
  long = long * (Math.PI / 180);


  const x = radius * Math.cos(lat) * Math.cos(long);
  const y = radius * Math.cos(lat) * Math.sin(long);
  const z = radius * Math.sin(lat);



  // print(x, y, z);
}
