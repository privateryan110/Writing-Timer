//Focus Timer for Work
//Ryan Crouch 

let p5canvas;
let centerX;
let centerY;
let currentTime;
let timePassed;

let fillColor = [255, 255, 255]

//the amount (in seconds) for a full rotation
//-----------------------------------------------CHANGE TO EDIT DEFAULT STARTING VALUES------------------------
let minutesSet = 0;
let secondsSet = 60;
//-------------------------------------------------------------------------------------------------------------

let circleTime = 10;
let startTime = new Date().getTime();

//sound
let beep;
let timesPlayed = 0;

function preload(){
    document.getElementById("seconds").value = secondsSet;
    document.getElementById("minutes").value = minutesSet;
}

function setup(){
    p5canvas = createCanvas(500, 500);
    p5canvas.parent("canvasHolder");
    centerX = width / 2;
    centerY = width / 2;
    background(0);
    imageMode(CENTER);
    angleMode(DEGREES);
    
    //initializes the start time
    beep = loadSound("Assets/beep.mp3");
}

function draw(){
    circleTime = (minutesSet * 60) + secondsSet;
    if (state == 0){
        background(0);
        //finds the current time
    
        //displays the timer circle based on the amount the time has passed
        currentTime = new Date().getTime();

        timePassed = (currentTime - startTime) / 1000;
        //console.log(timePassed);

        angle = ((360 / circleTime) * (timePassed - (timePaused)));
        
        fill(fillColor[0], fillColor[1], fillColor[2]);
        noStroke();
        arc(centerX, centerY, width, height, 270, 270 + angle);
                                     
        if (int((timePassed - timePaused) % circleTime) == 0){
            //when angle hits zero, plays sound
            if(!beep.isPlaying() && timesPlayed == 0){
                beep.play();
                timesPlayed++;
                console.log("play");
            }
        }
        
        if (angle % 360 > 180 && angle % 360 < 270){
            timesPlayed = 0;
        }
    }
}

//states
let state = 1; //0 = playing, 1 = paused
let pauseTime = startTime;
let timePaused = 0;
function play(){
    if (state == 0){ //pauses if playing
        state = 1;
        pauseTime = new Date().getTime();
        document.getElementById("pauseButtonImage").src="assets/play.png";
        
    }
    else { //plays if paused
        state = 0;
        timePaused += (new Date().getTime() - pauseTime) / 1000;
        console.log(timePaused);
        document.getElementById("pauseButtonImage").src="assets/pause.png";
    }
}

function setMinutes(){
    minutesSet = document.getElementById("minutes").value;
}

function setSeconds(){
    secondsSet = document.getElementById("seconds").value;
}

function keyPressed(){
    if (keyCode == 32){ //space
        play();
    }
}