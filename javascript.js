const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

let questions = [
    {
        question : "What type of galaxy is the most common in the universe?",
        imgSrc   : "https://upload.wikimedia.org/wikipedia/commons/c/c3/NGC_4414_(NASA-med).jpg",
        choiceA  : "Irregular Galaxies",
        choiceB  : "Elliptical Galaxies",
        choiceC  : "Spiral Galaxies",
        correct  : "B",
    },

    {
        question : "What is the coldest place in the universe?",
        imgSrc   : "https://conversationstartersworld.com/wp-content/uploads/2017/09/Boomerang-Nebula-660x660.jpg",
        choiceA  : "The Boomerang Nebula",
        choiceB  : "Your Ex's Heart",
        choiceC  : "The Helix Nebula",
        correct  : "A",
    },

    {
        question : "How old is the universe in years?",
        imgSrc   : "https://www.ufo-spain.com/wp-content/uploads/2018/06/videoblocks-infinity-clock-version-3-blue-infinite-zoom-in-of-cosmic-clock-with-roman-numerals-abstract-time-travel-conceptual-spiral-sci-fi-fantasy-video-background_r_ykqfwtl_thumbnail-full12-1024x576.png",
        choiceA  : "11 Billion Years",
        choiceB  : "13 Billion Years",
        choiceC  : "7 Billion Years",
        correct  : "B",
    },

    {
        question : "What is the smallest planet in our solar system?",
        imgSrc   : "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Saturn_with_auroras.jpg/1200px-Saturn_with_auroras.jpg",
        choiceA  : "Mars",
        choiceB  : "Venus",
        choiceC  : "Mercury",
        correct  : "C",
    },

    {
        question : "What is the most common type of star found in the Milky Way?",
        imgSrc   : "https://gyazo.com/378e11f4b7ecee805625d3d896e4e387",
        choiceA  : "Red Dwarf",
        choiceB  : "White Dwarf",
        choiceC  : "Neutron",
        correct  : "A",
    },
]

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; 
const gaugeWidth = 150; 
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); 
}

function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        score++;
        answerIsCorrect();
    }else{
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        clearInterval(TIMER);
        scoreRender();
    }
}

function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

function scoreRender(){
    scoreDiv.style.display = "block";
    
    const scorePerCent = Math.round(100 * score/questions.length);
    let img = (scorePerCent >= 80) ? "assets/images/5.png" :
              (scorePerCent >= 60) ? "assets/images/4.png" :
              (scorePerCent >= 40) ? "assets/images/3.png" :
              (scorePerCent >= 20) ? "assets/images/2.png" :
                                     "assets/images/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}