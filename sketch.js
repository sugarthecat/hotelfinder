// image source: https://visibleearth.nasa.gov/images/73884/november-blue-marble-next-generation-w-topography-and-bathymetry

let earthTexture;
let x, y, z;
let xrot = 0.0;

// Beijing, Hong Kong, Shanghai, Tokyo
let citiesLat = [39.904202, 22.396427, 31.230391, 35.689487]
let citiesLong = [116.407394, 114.109497, 121.473701, 139.691711]
let i = 0;


let xcam, ycam, zcam
let currentLat = 0;
let currentLong = 0;
let targetLat = 0;
let targetLong = 0;
let currentZoom = 600;
let targetZoom = 600;
let panning = true;

// //Hong kong 

//let targetLat = 22.396427;
// let targetLong = 114.109497;
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

//let targetLat = 38.892059
//let targetLong = -77.019913

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

  let overlay = document.getElementById("overlay")
  for (let i = 0; i < 6; i++) {
    let newSlide = document.createElement("div");
    newSlide.id = `slide${i + 4}`
    newSlide.className = "cityslide slide"
    newSlide.hidden = true;
    let title = document.createElement("h1");
    title.id = `slide${i}title`;
    title.innerText = "Slide " + (i + 1)
    let nxtBtn = document.createElement('button');
    nxtBtn.innerText = "Next"
    nxtBtn.onclick = function () {
      switchToSlide((i + 1) % 6 + 4)
    }
    let prevBtn = document.createElement('button');
    prevBtn.innerText = "Prev"
    prevBtn.onclick = function () {
      switchToSlide((i + 5) % 6 + 4)
    }
    let returnBtn = document.createElement('button');
    returnBtn.innerText = "X";
    returnBtn.onclick = function(){
      switchToSlide(2);
    }
    returnBtn.className = "cancel"
    newSlide.append(title)
    newSlide.append(prevBtn)
    newSlide.append(nxtBtn)
    newSlide.append(returnBtn)
    overlay.appendChild(newSlide)
  }
  setTargetZoom(0, 0, min(width, height) / 1.25);
  // createEasyCam(); // easycam
}

function draw() {
  radius = min(width, height) / 2.5;
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
  if(currentLong > 360 && targetLong > 360){
    currentLong -= 360;
    targetLong -= 360;
  }
  if(currentLong < 0 && targetLong < 0){
    targetLong += 360;
    currentLong += 360;
  }
  if (panning) {
    setTargetZoom(0, 0, radius * 2)
    targetLong -= max(deltaTime,100) * 0.01
    targetLat = lerp(targetLat, 0, 0.02)
  } else {
    setTargetZoom(0, 0, radius * 1.3)
  }
  currentLong = lerp(currentLong, 180 - targetLong, 0.02)
  currentLat = lerp(currentLat, targetLat, 0.02)





  rotate(currentLat, [-1, 0, 0]);
  rotate(currentLong, [0, 1, 0]);
  //sleep(1000);



  //rotateZ(currentLat);


  push()
  texture(earthTexture);
  sphere(radius, 24, 24);
  rotateX(0.01)
  pop()
  //stroke(255)
  //strokeWeight(5)

  push()    //create the box
  convert(39.904202, 116.407394)
  translate(x, y, z)
  sphere(1);
  pop()






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