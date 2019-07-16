var myQuestions = [
    {
        question: "What is the capital of Madagascar ??",
        answers: {
            a: 'Manankara',
            b: 'Bagota',
            c: 'Antananrivo',
            d: 'Havana',
        },
        correctAnswer: 'c'
    },
    {
        question: "Name of world's largest ocean?",
        answers: {
            a: 'Indian',
            b: 'Pacific',
            c: 'Atlantic',
            d: 'Arctic',

        },
        correctAnswer: 'b'
    },

    {
        question: "What color is a Welsh poppy?",
        answers: {
            a: 'Blue',
            b: 'Red',
            c: 'Yellow',
            d: 'White',

        },
        correctAnswer: 'c'
    },
    {
        question: "What German city is famous for perfume it produces?",
        answers: {
            a: 'Cologne',
            b: 'Berlin',
            c: 'Frankfurt',
            d: 'Munich',

        },
        correctAnswer: 'a'
    },
    {
        question: "When did Second World War end?",
        answers: {
            a: '1942',
            b: '1934',
            c: '1944',
            d: '1945',

        },
        correctAnswer: 'd'
    }
];



var timer = 30;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var clockRunning = false;

var intervalId;
var index = 0;

var currentQuestion = myQuestions[Math.floor(Math.random() * myQuestions.length)];
console.log("current question:", currentQuestion);

var currentCorrectAnswer = currentQuestion.correctAnswer;
console.log("current correct Answer", currentQuestion.correctAnswer);



window.onload = function () {
    $("#quiz").hide();
    $("#gameOver").hide();
    $("#start").on("click", startGame);
    $("#answer1").on("click", checkAnswer);
    $("#answer2").on("click", checkAnswer);
    $("#answer3").on("click", checkAnswer);
    $("#answer4").on("click", checkAnswer);
};



function startGame() {
    $("#gameOver").hide();
    $("#quiz").show();
    questionDisplay();
}

function run() {
    if (!clockRunning) {
        intervalId = setInterval(decrement, 1000);
        clockRunning = true;
    }
}


function decrement() {
    timer--;
    $("#time").text(timer);
    if (timer === 0) {
        stop();
        unansweredMessage();
        unanswered++;
    }
}

function stop() {
    clearInterval(intervalId);
    clockRunning = false;
}


function checkAnswer(){
   
    stop();
    let userAnswer = $(this).text();
    // console.log(userAnswer);
    // console.log(currentQuestion.correctAnswer);
    if(userAnswer === currentCorrectAnswer){
        correct++
        correctMessage();
    }else{
        incorrect++;
        incorrectMessage();
    }
}

function questionDisplay() {  
    timer = 30;
    $("#time").text(timer);
    run();
    $("answerDisplay").hide();
    $("#answer1").show();
    $("#answer2").show();
    $("#answer3").show();
    $("#answer4").show();
    if (index < myQuestions.length) {
        var currentQuestion = myQuestions[index];
        $("#question").text(currentQuestion.question);
        $("#answer1").text(currentQuestion.answers.a);
        $("#answer2").text(currentQuestion.answers.b);
        $("#answer3").text(currentQuestion.answers.c);
        $("#answer4").text(currentQuestion.answers.d);
       

    }
    else {
        gameOver();
    }
}



function correctMessage() {
    $(".a-box").hide();
    $("#question").text("Yay! That's Correct!");
    $("answerDisplay").show();
    $("answerDisplay").text(currentCorrectAnswer);
    index++;
    setTimeout(questionDisplay, 3000);
    resetGame();
}




function unansweredMessage() {
    $(".a-box").hide();
    $("#question").text("Sorry!The time is up! Here's the correct answer!");
    $("answerDisplay").show();
    $("answerDisplay").text(currentCorrectAnswer);
    index++;
    setTimeout(questionDisplay, 3000);
    resetGame();
}

function incorrectMessage() {
    $(".a-box").hide();
    $("#question").html("Wrong Answer! Correct Answer is: " + currentCorrectAnswer);
    $("#correctAnswer").show();
    $("#correctAnswer").text(currentCorrectAnswer);
    index++;
    setTimeout(questionDisplay, 3000);
    resetGame();
}


function gameOver() {
    stop();
    $("#main-content").hide();
    $("#gameOver").show();
    $("#correctAnswer").text(correct);
    $("#incorrectAnswer").text(incorrect);
    $("#unanswered").text(unanswered);
    $("#replay").on("click", resetGame);
}

function resetGame() {
    timer = 30;
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    index = 0;
    startGame();
}
