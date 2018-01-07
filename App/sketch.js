var CANVAS_WIDTH = 500;
var CANVAS_HEIGHT = 350;
var ADDRESS = "https://api.openweathermap.org/data/2.5/weather?q=";
var countrycode = "Waterloo";
var input;
var clientID = "&appid=271c502d334f976dd3912c330e9629fc";
var metric = "&units=metric";
var fullAddress = ADDRESS + countrycode + clientID + metric;
var weatherData;
var windVector;
var img;
var id;
var cloud;
var iconURL = "http://openweathermap.org/img/w/"
var imgCode;
var d = new Date();
var t;


function setup(){
  loadJSON(fullAddress, gotData);
  print(fullAddress);
  var btn = select('#submit');
  btn.mousePressed(loadData);
  var cnv = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  cnv.position(0,0);
  input = select('#city');
}

function gotData(data){
  weatherData = data;
  print(weatherData);
  var windAngle = weatherData.wind.deg * (Math.PI/180);
  windVector = createVector(Math.sin(windAngle), Math.cos(windAngle));
  print(windVector);
  print(windAngle);
  id = Math.floor(weatherData.weather[0].id/100);
  print(id);
  img = loadImage(getImg());
  cloud = weatherData.clouds.all / 100;
}

function draw() {
  background(71);
  fill(255);
  textSize(50);
  textFont("Georgia");
  text(countrycode, 10, 50);
  if(windVector != undefined){
    windCircle();
    weatherTemp();
    cloudCircle();
  }
}

function windCircle(){
    ellipse(CANVAS_WIDTH/8, CANVAS_HEIGHT * (7/8), 50);
    stroke(220);
    line(CANVAS_WIDTH/8 - 23, CANVAS_HEIGHT * (7/8), CANVAS_WIDTH/8 + 23, CANVAS_HEIGHT * (7/8));
    line(CANVAS_WIDTH/8, CANVAS_HEIGHT * (7/8) - 23, CANVAS_WIDTH/8, CANVAS_HEIGHT * (7/8) + 23);
    line(15, 60, 210, 60);
    stroke(0);
    line(CANVAS_WIDTH/8, CANVAS_HEIGHT * (7/8), CANVAS_WIDTH/8 + 25 * windVector.x, CANVAS_HEIGHT * (7/8) - 25 * windVector.y);
    textSize(20);
    textFont("Arial");
    text("Direction: " +weatherData.wind.deg + "°",CANVAS_WIDTH/8 + 35, CANVAS_HEIGHT * (7/8) - 15);
    text("Wind speed: "+weatherData.wind.speed+ "m/s",CANVAS_WIDTH/8 + 35, CANVAS_HEIGHT * (7/8) + 10);
    textFont("Georgia");
    //rect(180, 60, 50, 50);
    image(img, 180, 60);
}

function cloudCircle(){
  push();
  stroke(0);
  textFont("Arial");
  text("Clouds: " + weatherData.clouds.all + "%", CANVAS_WIDTH * (11/16), CANVAS_HEIGHT * (12.6/16));
  noFill();
  ellipse(CANVAS_WIDTH * (13/16), CANVAS_HEIGHT * (7/8), 50);
  fill(255);
  ellipse(CANVAS_WIDTH * (13/16), CANVAS_HEIGHT * (7/8), 50);
  fill(252, 128, 128);
  ellipse(CANVAS_WIDTH * (13/16), CANVAS_HEIGHT * (7/8), 50 * cloud);
  pop();
}

function weatherTemp(){
  push();
  textFont("Trebuchet");
  text(weatherData.weather[0].main, 25, 85);
  textSize(15);
  text(weatherData.weather[0].description, 25, 105);
  textSize(20);
  textFont("Arial");
  text("Current: " + weatherData.main.temp + "°C", 25, 155)
  text("Low: " + weatherData.main.temp_min + "°C", 25, 185);
  text("High: " + weatherData.main.temp_max + "°C", 25, 215);


  pop();
}

function loadData(){
  countrycode = input.value();
  print(countrycode);
  fullAddress = ADDRESS + countrycode + clientID + metric;
  print(fullAddress);
  loadJSON(fullAddress, gotData);
  setup();
}

function getImg(){
// Set day or night based on the current time;
  if (d.getHours() > 8 && d.getHours() < 18){
    t = "d";
  } else {
    t = "n";
  }

// Find the image code
  if (id == 2){
    imgCode = "11";
  }else if (id == 3){
    imgCode = "09";
  }else if (id == 5){
    if (weatherData.weather[0].id < 511){
      imgCode = "10";
    } else {
      imgCode = "09";
    }
  }else if (id == 6){
    imgCode = "13";
  }else if (id == 7){
    imgCode = "50";
  }else if (id == 8){
    if (weatherData.weather[0].id = 800){
      imgCode = "01";
    }
    else {
      imgCode = "03";
    }
  }

  return iconURL + imgCode + t + ".png";
}
