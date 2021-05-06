var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var started = false;
var looses = false;
var level = 0;

$(document).keydown(function(){
  if (!started){
    started = true;
    nextSequence();
  }
});

$(".btn").click(function(){
  let userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkPlay(userClickedPattern.length);
});

function nextSequence(){
  let randomNum = Math.floor(Math.random()*4);
  let randChosenColor = buttonColors[randomNum];

  gamePattern.push(randChosenColor);
  playSound(randChosenColor);
  animatePress(randChosenColor);
  level++;
  $("#level-title").text("Level "+level)
}

function playSound(name){
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(chosenColor){
  let color = $("#"+chosenColor);
  color.addClass("pressed");
  setTimeout(function(){color.removeClass("pressed");}, 100);
}

function checkPlay(moves){
  let gameMoves = gamePattern.length;
  if(moves == gameMoves){
    checkMoves(gameMoves);
    if(!looses){
      setTimeout(function(){nextSequence()}, 1000);
      userClickedPattern = [];
    }else{
      startOver();
    }
  }
}

function checkMoves(gameMoves){
  let i = 0
  while(i < gameMoves && !looses){
    if (userClickedPattern[i] != gamePattern[i]){
      looses = true;
      gameOver();
    }else{
      i++;
    }
  }
}

function gameOver(){
  var lostSound = new Audio("sounds/wrong.mp3");

  $("#level-title").text("You lose after "+ level+ " levels.");
  $("body").addClass("game-over");
  lostSound.play();

  setTimeout(function(){$("body").removeClass("game-over")}, 200);
}

function startOver(){
  setTimeout(function(){$("#level-title").text("Press A Key to Start");}, 500);
  userClickedPattern = [];
  gamePattern = [];
  started = false;
  looses = false;
  level = 0;
}
