var timerEl = document.querySelector('#timer');
var buttonsEl = document.querySelector('.buttons'); //might be useless delete later
var resultsEl = document.querySelector('.result-section');
var questionEl = document.querySelector('#question');
var answerResult = document.querySelector('#result');
var finalScore = document.querySelector('#final-score');
var submissionForm = document.getElementById('submission-form');
var titleEl = document.querySelector('.title');
var descEl = document.querySelector('.desc');
var olEL = document.querySelector('.choices');
var startBtn = document.querySelector('#start');
var scoresBtn = document.querySelector('#scores');

var timer; //quiz timer
var score;
var scoreList = JSON.parse(localStorage.getItem('scoreList')) || [];
var penalty = 10;
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
    olEL.textContent = ''; // resets choice field
    questionEl.textContent = quiz.questions[questionNumber];
    
    // loads choices
    for(var i = 0; i < quiz.choices[questionNumber].length; i++){
        var tag = document.createElement('li');
        tag.textContent = quiz.choices[questionNumber][i];
        olEL.append(tag);
    }
    
    //adds eventlisteners to for choices
    olEL.addEventListener('click', function(event){
        if(isCorrect(questionNumber, event.target.textContent)){
            answerResult.textContent = 'Correct!';
            showResult();
        }else{
            timer-=penalty; // decrease timer because of incorrect choice
            timerEl.textContent = timer;
            answerResult.textContent = 'Incorrect';
            showResult();
        }

        questionNumber++;

        if(questionNumber < quiz.questions.length){
            olEL.removeEventListener('click', arguments.callee);
            loadQuestions(questionNumber);  //loads the next question
        }else{
            clearInterval(timerInterval);
            olEL.removeEventListener('click', arguments.callee);
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
    answerResult.parentElement.setAttribute('class', 'show');

    timerIntervalResults = setInterval(function() {
        secondsLeft--;

        if(secondsLeft === 0){
            clearInterval(timerIntervalResults);
            answerResult.parentElement.setAttribute('class', 'hide');
        }
    }, 1000);
}

function endGame(){
    questionEl.textContent = '';
    olEL.textContent = '';
    timer = 0;
    timerEl.textContent = timer;
    quizResults();
    //loadTimer();
    //showStartScreen();
}

function quizResults(){
    resultsEl.classList.replace('hide', 'show');

    finalScore.textContent = score;

    submissionForm.addEventListener('submit', function(event){
        event.preventDefault();
    
        var initials = document.getElementById('initials').value + ' - ';
        scoreList.push(initials + score);
        localStorage.setItem('scoreList', JSON.stringify(scoreList));
    })
}

function hideStartScreen() {
    titleEl.setAttribute('class', 'hide');
    descEl.setAttribute('class', 'hide');
    
    for(var i = 0; i < buttonsEl.children.length; i++)
        buttonsEl.children[i].setAttribute('class', 'hide');
}

function showStartScreen() {
    titleEl.setAttribute('class', 'show');
    descEl.setAttribute('class', 'show');
    
    for(var i = 0; i < buttonsEl.children.length; i++)
        buttonsEl.children[i].setAttribute('class', 'show');
}

startBtn.addEventListener('click', startQuiz);
//scoresBtn.addEventListener('click', )

loadTimer();