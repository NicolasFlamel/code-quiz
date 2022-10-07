var timerEl = document.querySelector('#timer');
var buttonsEl = document.querySelector('.buttons'); //might be useless delete later
var resultsEl = document.querySelector('.result-section');
var questionEl = document.querySelector('#question');
var titleEl = document.querySelector('.title');
var descEl = document.querySelector('.desc');
var olEL = document.querySelector('.choices');
var toggleClass  = document.querySelectorAll('.toggle');
var startBtn = document.querySelector('#start');
var scoresBtn = document.querySelector('#scores');

var timer; //quiz timer
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
}

function loadTimer(){
    // makes it easier to change timer
    timer = 20;
    timerEl.textContent = timer;
}

function startQuiz() {
    hideStartScreen();

    timerInterval = setInterval(function(){
        timer--;
        timerEl.textContent = timer;
        
        if(timer == 0){
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
    
    loadQuestions(0);
}

function loadQuestions(questionNumber){
    olEL.textContent = '' // resets choice field
    questionEl.textContent = quiz.questions[questionNumber];
    
    for(var i = 0; i < quiz.choices[questionNumber].length; i++){
        var tag = document.createElement('li');
        tag.textContent = quiz.choices[questionNumber][i];
        olEL.append(tag);
    }

    olEL.addEventListener('click', function(event){
        if(event.target.textContent == quiz.answer[questionNumber]){
            console.log('correct');
        }

        questionNumber++;

        if(questionNumber == 4){
            clearInterval(timerInterval)
            endGame();
        }else{
            loadQuestions(questionNumber);
        }
    });
}

function endGame(){
    questionEl.textContent = ''
    olEL.textContent = '';
    loadTimer();
    showStartScreen();
}

function showResults(){
    clearInterval(timerIntervalResults);
    var secondsLeft = 3;
    resultsEl.children[0].setAttribute('class', 'show');
    
    timerIntervalResults = setInterval(function() {
        secondsLeft--;

        if(secondsLeft === 0){
            clearInterval(timerIntervalResults);
            resultsEl.children[0].setAttribute('class', 'hide');
        }
    }, 1000);
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