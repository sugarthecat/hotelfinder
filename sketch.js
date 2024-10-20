// image source: https://visibleearth.nasa.gov/images/73884/november-blue-marble-next-generation-w-topography-and-bathymetry

let earthTexture;
let x, y, z;
let xrot = 0.0;

// Beijing, Hong Kong, Shanghai, Tokyo
let citiesLat = [39.904202, 22.396427, 31.230391, 35.689487]
let citiesLong = [116.407394, 114.109497, 121.473701, 139.691711]
let i=0;


let xcam, ycam, zcam
let currentLat = 0;

let currentLong = 0;
let currentZoom = 600;
let targetZoom = 600;


// //Hong kong 

let targetLat = 22.396427;
 let targetLong = 114.109497;
// //Beijing

// let targetLat = 39.904202
// let targetLong = 116.407394


//Sdyney

// let targetLat = -33.868820; 
// let targetLong = 151.209290;
// //Cape Town

// let targetLat = -33.924870
// let targetLong = 18.424055


// // //Sao Paulo
// let targetLat = -23.550520
// let targetLong = -46.633308




// //Washington DC

// let targetLat = 38.892059
// let targetLong = -77.019913

// // //Iceland
// let targetLat = 64.963051
// let targetLong = -19.020836

//Singapore
// let targetLat = 1.352083
// let targetLong = 103.819839

// //Auckland
// let targetLat = -36.848461;
// let targetLong = 174.763336;


function preload() {
   earthTexture = loadImage("world.topo.bathy.200411.3x5400x2700.jpg");
  //earthTexture = loadImage("world21k.jpg");

}

function setup() {

  angleMode(DEGREES)
  createCanvas(windowWidth, windowHeight, WEBGL);
  createCity()

  // createEasyCam(); // easycam
}

function draw() {
  radius = min(width,height)/2.5;
  //orbitControl();
  getCamera();

  
  background(0);


  currentZoom = lerp(currentZoom, targetZoom, 0.03)
  camera(0, 0, currentZoom);
//250

//document.getElementById("pan").addEventListener("click", temp);



  noStroke();
  // directionalLight(255, 255, 255, -1, 0, -1);
  // directionalLight(255, 255, 255, -1, 0, -1);
  // directionalLight(255, 255, 255, -1, 0, -1);
  // directionalLight(255, 255, 255, 1, 0, 1);
  // directionalLight(255, 255, 255, 1, 0, 1);
  // directionalLight(255, 255, 255, 1, 0, 1);
  currentLong = lerp(currentLong, 180-targetLong, 0.02)
  currentLat= lerp(currentLat, targetLat, 0.02)


 


  rotate(currentLat, [-1, 0, 0]);
  rotate(currentLong, [0, 1, 0]);
  //sleep(1000);
  //setTargetZoom(0, 0, 330);



  //rotateZ(currentLat);


  push ()
  texture(earthTexture);
  sphere(radius, 24, 24);
  rotateX(0.01)
  pop ()
  //stroke(255)
  //strokeWeight(5)

  push()    //create the box
  convert(39.904202, 116.407394)
  translate(x, y, z)
  sphere(1);
  pop()

  




  }


function createCity() {
    setInterval(writeStuff, 2000)
}

function writeStuff() {
print("hello");
}
function addPoint() {
  push()
    convert(citiesLat[i], citiesLong[i])
    translate(x, y, z)
    sphere(1);
    pop()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight, WEBGL);
}

function convert(lat, long) {

 long = -long;

  x = radius * cos(lat) * cos(long - 90);
  z = radius * cos(lat) * sin(long - 90);
  y = -radius * sin(lat);

}

function getCamera() {

  camx = map(mouseX, 0, width, -400, 400);
  camy = map(mouseY, 0, height, -400, 400);
  camz = map(mouseY, 0, height, -500, 500);

}

function setTargetZoom(x, y, newZoom) {
  targetZoom = newZoom;
}

// function temp() {
//   print("Hello!")


//   currentLat = citiesLat[3];
//   currentLong = citiesLong[3];

//  // currentLong = lerp(currentLong, 180-targetLong, 0.02)
//   //currentLat= lerp(currentLat, targetLat, 0.02)
//   rotate(currentLat, [-1, 0, 0]);
//   rotate(currentLong, [0, 1, 0]);
// }