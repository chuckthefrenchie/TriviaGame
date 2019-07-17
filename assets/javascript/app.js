var myQuestions = [
    {
        question: "What is the capital of Madagascar ??",
        answers: {
            a: 'Manankara',
            b: 'Bagota',
            c: 'Antananrivo',
            d: 'Havana',
        },
        correctAnswer: 'Antananrivo'
    },
    {
        question: "Name of world's largest ocean?",
        answers: {
            a: 'Indian',
            b: 'Pacific',
            c: 'Atlantic',
            d: 'Arctic',

        },
        correctAnswer: 'Pacific'
    },

    {
        question: "What color is a Welsh poppy?",
        answers: {
            a: 'Blue',
            b: 'Red',
            c: 'Yellow',
            d: 'White',

        },
        correctAnswer: 'Yellow'
    },
    {
        question: "What German city is famous for perfume it produces?",
        answers: {
            a: 'Cologne',
            b: 'Berlin',
            c: 'Frankfurt',
            d: 'Munich',

        },
        correctAnswer: 'Cologne'
    },
    {
        question: "When did Second World War end?",
        answers: {
            a: '1942',
            b: '1934',
            c: '1944',
            d: '1945',

        },
        correctAnswer: '1945'
    }
];



var timer = 30;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var clockRunning = false;

var intervalId;
var index = 0;



// var currentQuestion = myQuestions[Math.floor(Math.random() * myQuestions.length)];
console.log(myQuestions);

// var currentCorrectAnswer = currentQuestion.correctAnswer;
// console.log("current correct Answer", currentQuestion.correctAnswer);



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
    
   
    if(userAnswer === myQuestions[index].correctAnswer){
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
        var currentQuestions = myQuestions[index];
        $("#question").text(currentQuestions.question);
        $("#answer1").text(currentQuestions.answers.a);
        $("#answer2").text(currentQuestions.answers.b);
        $("#answer3").text(currentQuestions.answers.c);
        $("#answer4").text(currentQuestions.answers.d);
    }
    else {
        console.log('out of bound')
        gameOver();
    }
}



function correctMessage() {
    $(".a-box").hide();
    $("#question").text("Yay! That's Correct!");
    $("answerDisplay").show();
    $("answerDisplay").text(correctAnswer);
    index++;
    setTimeout(questionDisplay, 2000);
    // resetGame();
}

function unansweredMessage() {
    $(".a-box").hide();
    $("#question").text("Sorry!The time is up! Here's the correct answer!");
    $("answerDisplay").show();
    $("answerDisplay").text(correctAnswer);
    index++;
    setTimeout(questionDisplay, 2000);
    resetGame();
}

function incorrectMessage() {
    var correctAnswer = myQuestions[index].correctAnswer;
    $(".a-box").hide();
    $("#question").html("Wrong Answer! Correct Answer is: " + correctAnswer);
    $("#correctAnswer").show();
    $("#correctAnswer").text(correctAnswer);
    index++;
    setTimeout(questionDisplay, 2000);
    // resetGame();
}


function gameOver() {
    stop();
    $(".a-box").hide();
    $("#q-box").hide();
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
