var timerIntervalResults; // able to have only once instance for results interval
var buttons = document.querySelector('.buttons');
var results = document.querySelector('.result');
var quiz = {
    questions: ['question one'],
    answer: ['answer one', 'answer two', 'answer three'],
    
    possibleAnswers: {
        questionOne:    ['possible one', this.answer[0], 'possible three', 'possible 4'], 
        questionTwo:    ['possible one', 'possible 4', 'possible three', quiz.answer[1]],
        questionThree:  [this.answer[2], 'possible one', 'possible three', 'possible 4']
    }
}

quiz.possibleAnswers.questionOne[1] = quiz.answer[0];
console.log(quiz.answer[0])
console.log(quiz.possibleAnswers.questionOne[1])
console.log(quiz.possibleAnswers.questionThree[0])

function toggleButtons(){
    if(buttons.getAttribute('class') === 'hide'){
        //hides buttons
        for(var i = 0; i < buttons.children.length; i++)
            buttons.children[i].setAttribute('class', 'hide');
    }else{
        //shows buttons
        for(var i = 0; i < buttons.children.length; i++)
            buttons.children[i].setAttribute('class', 'show');
    }
}

function showResults(){
    clearInterval(timerIntervalResults);
    var secondsLeft = 3;
    results.children[0].setAttribute('class', 'show');
    
    timerIntervalResults = setInterval(function() {
        secondsLeft--;

        if(secondsLeft === 0){
            clearInterval(timerIntervalResults);
            results.children[0].setAttribute('class', 'hide');
        }
    }, 1000);
}

buttons.addEventListener('click', showResults);
document.addEventListener('click', toggleButtons);