var buttonColours = ["red","blue","green","yellow"];

var userClickedPattern = [];
var gamePattern = [];

// To keep track whether game has started or not(So you only call nextSequence()on the first keypress.)
var started = false;

var level = 0;

$(document).keypress(function () {
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    } 
    
});

 //The function handler is triggered when button is clicked
 $(".btn").click(function (){
    var userChosenColour = $(this).attr("id");  // this refers to Particular clicked button
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
  });

  function checkAnswer(currentLevel){

    // To check if the most recent user answer is same as the game pattern
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        // console.log("success");

        if (userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
            nextSequence();
        },1000);
    }
    
    }else {
        // console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        $("#level-title").text("Game over, Press any to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        
        startOver();

    }    
  }

function nextSequence(){
    userClickedPattern = [];
    level++;

    $("#level-title").text("Level "+level);
    //Generate random number between 1-3
    var randomNumber = Math.floor(Math.random()*3) + 1;
    // console.log(randomNumber);

    //Generate random number color 
    var randomChoosenColour = buttonColours[randomNumber];  
    gamePattern.push(randomChoosenColour);
    // console.log(gamePattern);

    // Flash effect on the selected button
    
    $("#" + randomChoosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColour);
    
}

function animatePress(currentColur){
    // Add pressed class to the clikked button
       $("#"+currentColur).addClass("pressed");

    // To remove the pressed class after a 100 milliseconds.
    setTimeout(function(){
        $("#"+currentColur).removeClass("pressed");
    },100);
 }

     function playSound(name){
         //To play the sound for a given button color

        var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
     }

     

     function startOver(){
        level = 0;
        gamePattern = [];
        started = false;

     }
      
     
     









