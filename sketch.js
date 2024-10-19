// image source: https://visibleearth.nasa.gov/images/73884/november-blue-marble-next-generation-w-topography-and-bathymetry

let yrot = 0.0;
let yprime = 0.001;
let yacc = 0;
let earthTexture;

function preload() {
  earthTexture = loadImage("world.topo.bathy.200411.3x5400x2700.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  // createEasyCam(); // easycam
}

function draw() {
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
  sphere(min(width,height)/2.5, 24, 24);
  pop ()
  stroke(255)
  strokeWeight(5)
  for(let i = 0; i<10; i++){
    //box(random(-400,400),random(-400,400),random(-400,400))
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight, WEBGL);
}
