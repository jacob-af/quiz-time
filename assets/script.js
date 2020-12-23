let theQuiz = [];

// Load quiz from JSON file

fetch('./assets/the-quiz.json')
    .then(response => {
        return response.json()
    })
    .then(questions => {
        theQuiz = questions;
        console.log('huh')
    })
    .catch(err => {
        console.log(err)
    })

// Declare global variables, load highscores

let score = 0;
let questionCount = 0;
let timeRemaining = 100;
const abtns = document.getElementsByClassName('abtn')
let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

// adding event listeners to each button

startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", reset)
submitInit.addEventListener('click', addHighScore)
showScores.addEventListener('click', showHighScores)
a1.addEventListener("click", function (event) {
    checkAnswer(event)
})
a2.addEventListener("click", function (event) {
    checkAnswer(event)
})
a3.addEventListener("click", function (event) {
    checkAnswer(event)
})
a4.addEventListener("click", function (event) {
    checkAnswer(event)
})

// startGame calls two function to begin the game when the start button is clicked

function startGame() {
    startTime();
    startQuiz();
}

// startTime will begin the timer, and stop if it reaches 0 or below, with separate conditions for game ending.

function startTime() {
    var timerInterval = setInterval(function () {
        timer.textContent = timeRemaining + " seconds remaining.";
        timeRemaining--;

        if (timeRemaining <= 0 && timeRemaining > -10) {
            clearInterval(timerInterval);
            timer.textContent = '---'
            overTime();

        } else if (timeRemaining < -10) {
            clearInterval(timerInterval);
            timer.textContent = '---'
        }
    }, 1000);
}

// hides uneccesary buttons, brings answer buttons up, calls first question

function startQuiz() {
    startButtonDiv.style.display = "none";
    showScoresDiv.style.display = 'none';
    for (i = 0; i < abtns.length; i++) {
        abtns[i].style.display = 'inline';
    }
    nextQuestion()
}

// this function displays the question and answers, the questions are chose at random and removed from the list
// of questions as they are answered.  answers are displayed in a random order as well

function nextQuestion() {
    if (theQuiz.length > 0) {
        questionCount++
        boxtop.innerHTML = `Question ${questionCount}`
        let currentQuestion = Math.floor(Math.random() * theQuiz.length)
        questionText.innerHTML = theQuiz[currentQuestion].question
        for (let i = 0; i < 4; i++) {
            document.getElementById(`a${i + 1}`).disabled = false;
            currentAnswer = Math.floor(Math.random() * theQuiz[currentQuestion].answers.length)
            document.getElementById(`a${i + 1}`).innerHTML = theQuiz[currentQuestion].answers[currentAnswer].a;
            if (theQuiz[currentQuestion].answers[currentAnswer].isCorrect) {
                document.getElementById(`a${i + 1}`).value = true
            } else {
                document.getElementById(`a${i + 1}`).value = false
            }
            theQuiz[currentQuestion].answers.splice(currentAnswer, 1)
        }
        theQuiz.splice(currentQuestion, 1)
    } else {
        quizOver();
    }
}

// checks answer, if correct, next question else adjust timer if incorrect and disable ubtton

function checkAnswer(event) {
    if (event.target.value === 'true') {
        nextQuestion();
    } else {
        timeRemaining -= 10;
        event.target.disabled = true;
    }
}

// if time runs out the user is notified, the quiz ended, and they are offered to try again.

function overTime() {
    boxtop.innerHTML = "You ran out of time!";
    questionText.innerHTML = `Failure! there were ${theQuiz.length + 1} questions unanswered!`
    for (i = 0; i < abtns.length; i++) {
        abtns[i].style.display = 'none';
    }
    resetButton.style.display = "inline";
}

// if they complete all questions, they will only get to add a highscore if their score was high enough.

function quizOver() {
    score = timeRemaining;
    timeRemaining = -11;
    boxtop.innerHTML = "Congratulations! You've completed the quiz!"
    for (i = 0; i < abtns.length; i++) {
        abtns[i].style.display = 'none';
    }
    if (highScores.length < 5 || score > highScores[4].score) {
        questionText.innerHTML = `You completed the quiz with ${score} seconds remaining!<br>
    That's a new HighScore!`;
        initialsForm.style.display = 'inline';
    } else {
        questionText.innerHTML = `You completed the quiz with ${score} seconds remaining!`;
        resetButton.style.display = 'inline';
        showScoresDiv.style.display = 'inline';
    }
}

// validates highscore entry, adds to list, sorts and then adjust size of list

function addHighScore(event) {
    event.preventDefault();
    initials = document.getElementById('initials').value
    if (initials.length > 0 && initials.length < 4) {
        initialsForm.style.display = 'none'
        highScores.push({ score: score, initials: initials.toUpperCase() })
        highScores.sort((a, b) => b.score - a.score)
        localStorage.setItem('highScores', JSON.stringify(highScores));
        highScores.splice(5)
        console.log('ay')
        showHighScores()
    }
}

// displays highscores

function showHighScores() {
    showScoresDiv.style.display = 'none';
    startButtonDiv.style.display = 'none';
    hslist = document.createElement('ol')
    hslist.id = 'hscores'
    highScores.splice(5)
    hslist.innerHTML = highScores
        .map(score => {
            return `<li class="high-score">${score.initials} :  ${score.score}</li>`;
        }).join("")
    questionText.appendChild(hslist)
    resetButton.style.display = 'inline';
}

// rather than resetting all variables the page is reloaded, effectively resetting the quiz.

function reset() {
    location.reload()
}