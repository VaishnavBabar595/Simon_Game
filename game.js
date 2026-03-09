var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {

    $("h1").text("Level " + level);
    var randomNumber = Math.random() * 4;
    randomNumber = Math.floor(randomNumber);

    var randomChoosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChoosenColor);

    $("." + randomChoosenColor).fadeOut(100).fadeIn(100);

    playSound(randomChoosenColor);
    level++;
}

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
})

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {

    $("." + currentColor).addClass("pressed");

    setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
    }, 100);
}

$(document).keypress(function () {
    if (level == 0) {
        level = 1;
        nextSequence();
    }
})

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        
        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                userClickedPattern.length = 0;
                nextSequence();
            }, 500);
        }
    }
    else {
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");

        userClickedPattern.length = 0;
        gamePattern.length = 0;
        level = 0;

    }
}