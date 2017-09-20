//(x+y+x*x+y*y)/(sin(d/(x*y))*sin(d/(x*y)))*d*1 zoom 250 weird negative circle

//these are the colors for the most sig digit coloring 
var colorArray = ["#ffffff","#ff0000","#ff9900","#ffff00","#2db300","#004d00","#009999","#0033cc","#cc00ff","#ff3399"];
var coloringStyle = 1;

var scope = {
  d: 1,
  x: 1,
  y: 1
};

var exponentialScale = [];
for (var i = -100; i < 100; i++){
  exponentialScale.push(math.exp(i/4));
}
//console.log(exponentialScale);

var nudgeAmount = 2;
var zoomNudge = 0;

var xCenter = 0;
var yCenter = 0;
var zoom = 1;
var fieldSize = 400;

var information = "Center(0,0) : Zoom(1) : Function{ abs(d*d*d / (x * x + y * y) * y) }";

//the nudge strength settings
function updateNudgeSmall(){
  nudgeAmount = 1;
  document.getElementById("nudgeSmall").className = "btn btn-default active";
  document.getElementById("nudgeMedium").className = "btn btn-default";
  document.getElementById("nudgeLarge").className = "btn btn-default";
}
function updateNudgeMedium(){
  nudgeAmount = 4;
  document.getElementById("nudgeSmall").className = "btn btn-default";
  document.getElementById("nudgeMedium").className = "btn btn-default active";
  document.getElementById("nudgeLarge").className = "btn btn-default";
}
function updateNudgeLarge(){
  nudgeAmount = 16;
  document.getElementById("nudgeSmall").className = "btn btn-default";
  document.getElementById("nudgeMedium").className = "btn btn-default";
  document.getElementById("nudgeLarge").className = "btn btn-default active";
}

//the main settings
function updateZoomValue(value){
  zoom = value;
}
function updateXCenter(inputValue){
  xCenter = inputValue;
}
function updateYCenter(value){
  yCenter = value;
}
function updateFieldSizeSpan(value){
  fieldSize = value;
  document.getElementById("fieldSizeSpan").innerHTML = value;
}

function updateInformation(){
  information = "Center("+xCenter.toString()+","+yCenter.toString()+") : Zoom("+zoom.toString()+") : Function{ "+document.getElementById("functionInput").value+" }";
  document.getElementById("informationOutput").innerHTML = information;
  document.getElementById("xCenterInput").value = xCenter;
  document.getElementById("yCenterInput").value = yCenter;
  document.getElementById("zoomInput").value = zoom;
}

// choosing method of coloring
function colorHue(){
  coloringStyle = 1;
  document.getElementById("modulusButton").className = "btn btn-default";
  document.getElementById("valueToHueButton").className = "btn btn-default active";
  document.getElementById("MSDButton").className = "btn btn-default";
}
function colorModulus(){
  coloringStyle = 2;
  document.getElementById("modulusButton").className = "btn btn-default active";
  document.getElementById("valueToHueButton").className = "btn btn-default";
  document.getElementById("MSDButton").className = "btn btn-default";
}
function colorMSD(){
  coloringStyle = 3;
  document.getElementById("modulusButton").className = "btn btn-default";
  document.getElementById("valueToHueButton").className = "btn btn-default";
  document.getElementById("MSDButton").className = "btn btn-default active";
}

function getFieldWidth(){
  var xMax = parseFloat(xCenter) + fieldSize/(2*zoom); 
  var xMin = parseFloat(xCenter) - fieldSize/(2*zoom); 
  var fieldWidth = xMax - xMin;
  return fieldWidth;
}

function nudgeLeft(){
  var xNudge = getFieldWidth() * nudgeAmount/32;
  xCenter += xNudge;
  updateInformation();
  updateDisplay();
}

function nudgeRight(){
  var xNudge = getFieldWidth() * nudgeAmount/32;
  xCenter -= xNudge;
  updateInformation();
  updateDisplay();
}

function nudgeUp(){
  var yNudge = getFieldWidth() * nudgeAmount/32;
  yCenter += yNudge;
  updateInformation();
  updateDisplay();
}

function nudgeDown(){
  var yNudge = getFieldWidth() * nudgeAmount/32;
  yCenter -= yNudge;
  updateInformation();
  updateDisplay();
}

function nudgeZoomIn(){

  var nextZoomIndex = 0;
  for(var i = 0; i < exponentialScale.length; i++){
    if (exponentialScale[i] <= zoom){
      nextZoomIndex++;
    } else {
      break;
    }
  }
  
  if(nudgeAmount == 1){
    zoom = exponentialScale[nextZoomIndex];
  } else if (nudgeAmount == 4){
    zoom = exponentialScale[nextZoomIndex+1];
  } else {
    zoom = exponentialScale[nextZoomIndex+3];
  }
  
  updateInformation();
  updateDisplay();
}

function nudgeZoomOut(){
  
  var nextZoomIndex = 0;
  for(var i = 0; i < exponentialScale.length; i++){
    if (exponentialScale[i] <= zoom){
      nextZoomIndex++;
    } else {
      break;
    }
  }
  
  if(nudgeAmount == 1){
    zoom = exponentialScale[nextZoomIndex-2];
  } else if (nudgeAmount == 4){
    zoom = exponentialScale[nextZoomIndex-3];
  } else {
    zoom = exponentialScale[nextZoomIndex-5];
  }
  
  updateInformation();
  updateDisplay();
}



function updateDisplay() {
  scope.d = fieldSize;
  var code = math.compile(document.getElementById("functionInput").value);// compile an expression
  updateInformation();
  var xAxis = [];
  var yAxis = [];
  
  var xMax, xMin, yMax, yMin;
  
  xMax = parseFloat(xCenter) + fieldSize/(2*zoom); 
  xMin = parseFloat(xCenter) - fieldSize/(2*zoom); 
  yMax = parseFloat(yCenter) + fieldSize/(2*zoom); 
  yMin = parseFloat(yCenter) - fieldSize/(2*zoom); 
  
  var step = (xMax - xMin) / fieldSize; //the distanct between samples of the pattern
  
  for (var j = xMin; j < xMax; j+=step){ //distinct for loops as there are possibly different center points
    xAxis.push(j);
  }
  
  for (var k = yMin; k < yMax; k+=step){ //the step is carried over as zoom shouldn't change
    yAxis.push(k);
  }
  
  var canvas = document.getElementById("displayCanvas");

  var ctx = canvas.getContext("2d");
  var canvasWidth = canvas.width;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = "12px Verdana";
  ctx.fillStyle = "#FF0000";

  for (x = 0; x < fieldSize; x++) {
    for (y = 0; y < fieldSize; y++) {
      scope.x = xAxis[x];
      scope.y = yAxis[y];
      var result = code.eval(scope);
      
      if (y === 0 || x === 0) { //code to create a black border
        ctx.fillStyle = "#000000";
        ctx.fillRect(
          x * canvasWidth / fieldSize,
          y * canvasWidth / fieldSize,
          canvasWidth / fieldSize,
          canvasWidth / fieldSize
        );
        if (fieldSize < 52) { //if the border is large enough, write numbers on it
          if (fieldSize < 22 && fieldSize > 11) { //janky font scale system
            ctx.font = "20px Verdana";
          } else if (fieldSize < 12) {
            ctx.font = "36px Verdana";
          } else {
            ctx.font = "12px Verdana";
          }
          ctx.fillStyle = "#FFFFFF";
          if (!(y === 0 && x ===0)){ //don't fill the top left corner with anything
            if (y === 0) { //if it's in the top row
              ctx.fillText(xAxis[x], x * canvasWidth / fieldSize, (canvasWidth / fieldSize) - 3, canvasWidth / fieldSize);
            } else if (x === 0) { //if it's in the leftmost column
              ctx.fillText(yAxis[y], 0, y * canvasWidth / fieldSize + canvasWidth / fieldSize, canvasWidth / fieldSize);
            }
          }
        }
      } else {
        //fringe pattern coloring begins here
        if (coloringStyle == 1) { //value to hue coloring
          ctx.fillStyle = "hsl("+result*360/ (fieldSize*fieldSize)+",100%,50%)"; 
          ctx.fillRect(
            x * canvasWidth / fieldSize,
            y * canvasWidth / fieldSize,
            (canvasWidth / fieldSize)+1,
            (canvasWidth / fieldSize)+1
          );
          
        } else if (coloringStyle == 2){ //modulus coloring
          ctx.fillStyle = "#000000"; //color for the modulus
          if (result % (fieldSize) >= (fieldSize) / 2)
          ctx.fillRect(
            x * canvasWidth / fieldSize, //x coord
            y * canvasWidth / fieldSize, //y coord
            (canvasWidth / fieldSize), //size of cell to color
            (canvasWidth / fieldSize) //size of cell to color
          );
          
        } else if (coloringStyle == 3){ //most sig. dig. coloring
          var mostSigDigit = parseInt(result.toString()[0]);
          if (mostSigDigit === 0){
            mostSigDigit = parseInt((result*10000).toString()[0]);
          }
          ctx.fillStyle = colorArray[mostSigDigit];
          ctx.fillRect(
            x * canvasWidth / fieldSize,
            y * canvasWidth / fieldSize,
            (canvasWidth / fieldSize)+1,
            (canvasWidth / fieldSize)+1,
          );
        }
      }
    }
  }
}

window.onload = updateDisplay();  
