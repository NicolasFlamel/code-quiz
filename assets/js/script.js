var timerEl = document.querySelector('#timer');
var buttonsEl = document.querySelector('.buttons'); //might be useless delete later
var resultsEl = document.querySelector('.result-section');
var toggleClass  = document.querySelectorAll('.toggle');
var startBtn = document.querySelector('#start');
var scoresBtn = document.querySelector('#scores');
var questionEl = document.querySelector('#question');
var titleEl = document.querySelector('.title');
var descEl = document.querySelector('.desc');
var olEL = document.querySelector('.choices');

var timer; //quiz timer
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

function load(){
    // makes it easier to change timer
    timer = 20;
    timerEl.textContent = timer;
}

function startQuiz() {
    var oldTitleEl = titleEl.textContent;
    var olddescEl = descEl.textContent;

    titleEl.textContent = '';
    descEl.textContent = '';
    
    var timerInterval = setInterval(function(){
        timer--;
        timerEl.textContent = timer;
        
        if(timer == 0){
            clearInterval(timerInterval);
            resetPage(oldTitleEl, olddescEl);
        }
    }, 1000);
    
    loadQuestions(0);
}

function loadQuestions(questionNumber){
    questionEl.textContent = quiz.questions[questionNumber];
    olEL.textContent = ''
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
            timer= 1;
        }else{
            loadQuestions(questionNumber);
        }
    });
}

function resetPage(title, desc) {
    //resets page to default start

    load();
    titleEl.textContent = title;
    descEl.textContent = desc
    questionEl.textContent = ''
    toggleButtons();
    olEL.textContent = '';
}

function toggleButtons(){
    if(buttonsEl.children[0].getAttribute('class') == 'hide'){
        //hides buttons
        for(var i = 0; i < buttonsEl.children.length; i++)
            buttonsEl.children[i].setAttribute('class', 'show');
    }else{
        //shows buttons
        for(var i = 0; i < buttonsEl.children.length; i++)
            buttonsEl.children[i].setAttribute('class', 'hide');
    }
    
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

//buttons.addEventListener('click', showResults);

// !!! might be useless - delete later !!!!
// for(var i = 0; i < buttons.children.length; i++){
//     buttons.children[i].addEventListener('click', toggleButtons);
// }

for(var i = 0; i < toggleClass.length; i++){
    toggleClass[i].addEventListener('click', toggleButtons);
}

startBtn.addEventListener('click', startQuiz);

load();