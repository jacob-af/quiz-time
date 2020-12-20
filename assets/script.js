let theQuiz = [];

fetch('./the-quiz.json')
    .then(response => {
        return response.json()
    })
    .then(questions => {
        theQuiz = questions;
    })
    .catch(err => {
        console.log(err)
    })

let score = 0;
let questionCount = 0;
let timeRemaining = 100;
const abtns = document.getElementsByClassName('abtn')
let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

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

function startGame() {
    startTime();
    startQuiz();
}

function startTime() {
    var timerInterval = setInterval(function () {
        timer.textContent = timeRemaining + " seconds remaining.";
        timeRemaining--;

        if (timeRemaining <= 0 && timeRemaining > -11) {
            clearInterval(timerInterval);
            timer.textContent = '---'
            overTime();

        } else if (timeRemaining < -10) {
            clearInterval(timerInterval);
            timer.textContent = '---'
        }
    }, 1000);
}

function startQuiz() {
    startButtonDiv.style.display = "none";
    showScoresDiv.style.display = 'none';
    for (i = 0; i < abtns.length; i++) {
        abtns[i].style.display = 'inline';
    }
    nextQuestion()
}

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

function checkAnswer(event) {
    if (event.target.value === 'true') {
        nextQuestion();
    } else {
        timeRemaining -= 10;
        event.target.disabled = true;
    }
}

function overTime() {
    boxtop.innerHTML = "You ran out of time!";
    questionText.innerHTML = `Failure! there were ${theQuiz.length + 1} questions unanswered!`
    for (i = 0; i < abtns.length; i++) {
        abtns[i].style.display = 'none';
    }
    resetButton.style.display = "inline";
}

function quizOver() {
    score = timeRemaining;
    timeRemaining = -11;
    console.log(timeRemaining);
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

function reset() {
    location.reload()
}