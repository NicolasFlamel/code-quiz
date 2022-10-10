var timerEl = document.querySelector('#timer');
var resultsEl = document.querySelector('#result-section');
var questionEl = document.querySelector('#question');
var answerResult = document.querySelector('#result');
var finalScore = document.querySelector('#final-score');
var submissionForm = document.getElementById('submission-form');
var startScreenEl = document.querySelector('#start-screen');
var choicesOlEL = document.querySelector('#choices');
var quizEl = document.querySelector('#quiz');
var highScoresEl = document.querySelector('#high-scores');
var scoresListOlEl = document.querySelector('#scores-list');
var startBtn = document.querySelector('#start-btn');
var scoresBtn = document.querySelector('#scores-btn');
var goBackBtn = document.querySelector('#go-back-btn');
var clearScoresBtn = document.querySelector('#clear-scores-btn');

var timer; //quiz timer
var score;
var penalty = 10;
var scoreList = JSON.parse(localStorage.getItem('scoreList')) || [];
var timerInterval; // timer interval for quiz
var timerIntervalResults; // able to have only once instance for results interval
var quiz = {
    questions: [
        'What does HTML stands for?', 
        'Which of the following HTML element is used for creating an unordered list?', 
        'How many heading tags are there in HTML5?', 
        'Which of the following attributes is used to add link to any element?'
    ],
    answer: ['Hypertext Markup Language.', '<ul>', '6', 'href'],
    
    // double array [x][y] x=question y=choices
    choices: [ 
        ['Hypertext Machine language.', 'Hypertext and links markup language.', 'Hypertext Markup Language.', 'Hightext machine language.'],
        ['<ui>', '<i>', '<em>', '<ul>'],
        ['2', '3', '5', '6'],
        ['link', 'ref', 'href', 'newref']
    ]
};

function loadTimer(){
    // makes it easier to change timer
    timer = 20;
    timerEl.textContent = timer;
}

function startQuiz() {
    score = 0;
    hideStartScreen();
    quizEl.classList.replace('hide', 'show');

    // starts/handles timer
    timerInterval = setInterval(function(){
        if(timer < 1){
            clearInterval(timerInterval);
            endGame();
        }else{
            timer--;
            timerEl.textContent = timer;
        }
    }, 1000);
    
    loadQuestions(0);
}

//loads question/choices onto the screen
function loadQuestions(questionNumber){
    choicesOlEL.textContent = ''; // resets choice field
    questionEl.textContent = quiz.questions[questionNumber];
    
    // loads choices
    for(var i = 0; i < quiz.choices[questionNumber].length; i++){
        var tag = document.createElement('li');
        tag.textContent = quiz.choices[questionNumber][i];
        choicesOlEL.append(tag);
    }
    
    //adds eventlisteners to for choices
    choicesOlEL.addEventListener('click', function(event){
        if(isCorrect(questionNumber, event.target.textContent)){
            answerResult.firstElementChild.textContent = 'Correct!';
            showResult();
        }else{
            timer-=penalty; // decrease timer because of incorrect choice
            timerEl.textContent = timer;
            answerResult.firstElementChild.textContent = 'Incorrect';
            showResult();
        }

        questionNumber++;

        if(questionNumber < quiz.questions.length){
            choicesOlEL.removeEventListener('click', arguments.callee);
            loadQuestions(questionNumber);  //loads the next question
        }else{
            clearInterval(timerInterval);
            choicesOlEL.removeEventListener('click', arguments.callee);
            endGame();
        }
    });
}

//checks if user got question correct
function isCorrect(question, answer) {
    if(quiz.answer[question] == answer){
        score++;
        return true;
    }
    else
        return false;
}

// previous question results
function showResult(){
    clearInterval(timerIntervalResults);
    var secondsLeft = 2;
    answerResult.classList.replace('hide', 'show');

    timerIntervalResults = setInterval(function() {
        secondsLeft--;

        if(secondsLeft === 0){
            clearInterval(timerIntervalResults);
            answerResult.classList.replace('show', 'hide');
        }
    }, 1000);
}

function endGame(){
    questionEl.textContent = '';
    choicesOlEL.textContent = '';
    timer = 0;
    timerEl.textContent = timer;
    quizResults();
}

//results of quiz and enter your initials
function quizResults(){
    resultsEl.classList.replace('hide', 'show');

    finalScore.textContent = score;

    submissionForm.addEventListener('submit', function(event){
        event.preventDefault();
        var initials = document.getElementById('initials').value + ' - ';
        
        scoreList.push(initials + score);
        localStorage.setItem('scoreList', JSON.stringify(scoreList));
        resultsEl.classList.replace('show', 'hide');
        submissionForm.removeEventListener('submit', arguments.callee);

        loadTimer();
        showStartScreen();
    })
}

//view highscores and able to reset it
function viewHighScores(){
    hideStartScreen();
    scoresListOlEl.textContent = '';

    scoresListOlEl.classList.replace('hide', 'show');
    highScoresEl.classList.replace('hide', 'show');

    for(var i = 0; i < scoreList.length; i++){
        var tag = document.createElement('li');
        tag.textContent = scoreList[i];
        scoresListOlEl.append(tag);
    }

    goBackBtn.addEventListener('click', goBack);
    clearScoresBtn.addEventListener('click', clearScores);
}

//back to main screen
function goBack() {
    scoresListOlEl.classList.replace('show', 'hide');
    highScoresEl.classList.replace('show', 'hide');
    showStartScreen();
    goBackBtn.removeEventListener('click', goBack);
}

//clears local storage/scores
function clearScores() {
    scoreList = [];
    scoresListOlEl.textContent = '';
    localStorage.removeItem('scoreList');

    clearScoresBtn.removeEventListener('click', clearScores);
}

function hideStartScreen() {
    startScreenEl.classList.replace('show', 'hide');
}

function showStartScreen() {
    startScreenEl.classList.replace('hide', 'show');
}

startBtn.addEventListener('click', startQuiz);
scoresBtn.addEventListener('click', viewHighScores);

loadTimer();