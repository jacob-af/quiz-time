//import { theQuiz } from './the-quiz';
const theQuiz = [
    {
        name: "Question 1",
        question: 'What does DOM stand for?',
        answers: [
            {
                a: "Dope Ocelot, Man",
                isCorrect: false
            },
            {
                a: "Dormant Olfactory Mayhem",
                isCorrect: false
            },
            {
                a: "Domain Object Manifest",
                isCorrect: false
            },
            {
                a: "Document Object Model",
                isCorrect: true
            }
        ]
    },
    {
        name: "Question 2",
        question: 'What does HTML stand for?',
        answers: [
            {
                a: "Hold the Mustard, Lisa",
                isCorrect: false
            },
            {
                a: "High Tech Machine Language",
                isCorrect: false
            },
            {
                a: "Hyper Technical Master Lithograph",
                isCorrect: false
            },
            {
                a: "Hyper Text Markdown Language",
                isCorrect: true
            }
        ]
    },

]
//let quizCopy = []

var container = document.getElementsByClassName('container')[0]
var startButton = document.querySelector('#start-quiz')
var abtns = document.getElementsByClassName('abtn')
var questionText = document.getElementById('question-text')

startButton.addEventListener("click", function () {
    startGame()
});


function startGame() {
    //quizCopy = theQuiz.splice()
    startTime();
    startQuiz();
}

function startTime() {
    var timeRemaining = 100;
    //starttimer
    var timerInterval = setInterval(function () {
        timeRemaining--;
        timer.textContent = timeRemaining + " seconds remaining.";

        if (timeRemaining === 0) {
            clearInterval(timerInterval);
            gameOverTime();
        }

    }, 1000);
    //if time runs out:

}

function startQuiz() {
    startButton.style.display = "none";

    for (i = 0; i < abtns.length; i++) {
        abtns[i].style.display = 'flex';
    }
    nextQuestion()
    // for (i = 0; i < quizCopy.length; i++) {

    // }
    // } 
    // var questionBox = document.createElement('div');
    // questionBox.id = "questionbox"
    // container.appendChild(questionBox)


    // var questionNumber = document.createElement('div');
    // questionNumber.id = "questionnumber"
    // questionBox.appendChild(questionNumber)

    // questionDiv.appendChild(questionNumber)

    // h1Element.appendChild(h1Text);
    // for (i = 0; i < quizLength; i++) {

    // }
    // //if last question
    // gameComplete()
}

function nextQuestion() {
    let currentQuestion = Math.floor(Math.random()*theQuiz.length)
    console.log(currentQuestion)
    questionText.innerHTML = theQuiz[currentQuestion].question

}

function onAnswer(event) {
    console.log(event.targetvalue)
    // if answer is right:
    nextQuestion();
    //if answer is wrong:
    wrongAnswer();
}

function gameOverTime() {
    console.log('boop')
}

function wrongAnswer() {
    //adust time,
    //change button color
}

function showHighScores() {

}