const introPage = document.querySelector('.intro-page');
const start = document.querySelector('.start');
const playerNames = document.querySelector('.player-names');
const playerName1 = document.querySelector('.player1');
const playerName2 = document.querySelector('.player2');
const submitPlayerNames = document.querySelector('.submit-player-name');
const mainContent = document.querySelector('.main-content');
const question = document.querySelector('.question')
const option = document.querySelectorAll('.opt')
const label = document.querySelectorAll('.options > label')
const submitAnswer = document.querySelector('.submit-answer')
const displayPlayerName1 = document.querySelector('.disp-player1');
const displayPlayerName2 = document.querySelector('.disp-player2');
const playerScores = document.querySelectorAll('.player-score');
const conclude = document.querySelector('.conclude')

let questionCount = null;
let playerTurn = 1 //1 for playerOne and -1 for playerTwo
let selected = null;
let askedQuestions =[];

//Array of Question Objects
const trivia = [
    {
      prompt: "1) What is the ami oro of Tosin's Last name?",
      optA:"D M D M",
      optB:"D M M R",
      optC:"R M M D",
      optD:"R M D M",
      answer: "D M M R"
    },
    {
      prompt: "2) Tosin's Bachelor's Degree is in:",
      optA:"Computer Science",
      optB:"Computer Engineering",
      optC:"Mechanical Engineering",
      optD:"Statistics",
      answer: "Mechanical Engineering"
    },
    {
      prompt: "3) The capital of Nigeria is:",
      optA:"Lagos",
      optB:"Abuja",
      optC:"Benin",
      optD:"Anambra",
      answer: "Abuja"
    },
    {
      prompt: "4) The best month of the year is:",
      optA:"January",
      optB:"June",
      optC:"December",
      optD:"August",
      answer: "August"
    },
    {
      prompt: "5) What was Tosin's business called?",
      optA:"Tee's Place",
      optB:"The Spot",
      optC:"Orion's",
      optD:"Chef Tee's Spot",
      answer: "Orion's"
    },
    {
      prompt: "6) What is Tosin's pet peeve?",
      optA:"Dumbasses",
      optB:"Sticky surfaces",
      optC:"Being kept waiting",
      optD:"Being put on mute",
      answer: "Being kept waiting"
    },
    {
      prompt: "7) From the list, Who is Tosin's favourite celeb?",
      optA:"Dwayne Johnson",
      optB:"Tom Cruise",
      optC:"Robert Downey Jr.",
      optD:"Kevin Hart",
      answer: "Kevin Hart"
    },
    {
      prompt: "8) The company that licensed Tosin as a certified professional is:",
      optA:"Dassault Systemes",
      optB:"Autodesk",
      optC:"Professional Engineers Ontario",
      optD:"True Inventors",
      answer: "Dassault Systemes"
    },
    {
      prompt: "9) What is Tosin's favourite color?",
      optA:"Red",
      optB:"Black",
      optC:"Fuchsia Pink",
      optD:"Purple",
      answer: "Purple"
    },
    {
      prompt: "10) Tosin's best Youtube coding teacher is:",
      optA:"Mosh Hamedani",
      optB:"Mike Dane",
      optC:"Free Code Camp",
      optD:"Joshua Fluke",
      answer: "Mike Dane"
    },
    {
      prompt: "11) What company traps its users in an ecosystem?",
      optA:"Google",
      optB:"Microsoft",
      optC:"Apple",
      optD:"Samsung",
      answer: "Apple"
    },
    {
      prompt: "12) The best university in Nigeria is:",
      optA:"Obafemi Awolowo University",
      optB:"Covenant University",
      optC:"University of Ibadan",
      optD:"Afe Babalola University",
      answer: "University of Ibadan"
    },
]

class Players{
    constructor(name, score){
        this.name = name;
        this.score = score;
    }
}

//Player objects
playerOne = new Players('', 0)
playerTwo = new Players('', 0)

//Randomly select question to be rendered by assigning generated value to questionCount
//BUG: Crashes if questions run out
const generateQuestionCount = () => {
    do {
        if (askedQuestions.length === trivia.length) {
            break
        }else{
        questionCount = Math.floor(Math.random() * ((trivia.length-1) + 1));
        }
    } while (askedQuestions.includes(questionCount));
    askedQuestions.push(questionCount)
    // console.log(askedQuestions)
}


// Add styling and modify HTML when it is player one's turn
const playerOneTurn = () => {
    playerTurn = 1
    displayPlayerName1.style.backgroundColor = 'lightgreen'
    displayPlayerName2.style.backgroundColor = ''
    displayPlayerName1.innerHTML = `${playerOne.name}'s Turn`
    displayPlayerName2.innerHTML = playerTwo.name
}

// Add styling and modify HTML when it is player two's turn
const playerTwoTurn = () => {
    playerTurn = -1
    displayPlayerName1.style.backgroundColor = ''
    displayPlayerName2.style.backgroundColor = 'lightgreen'
    displayPlayerName1.innerHTML = playerOne.name
    displayPlayerName2.innerHTML = `${playerTwo.name}'s Turn`
}

//Function to display questions
const displayQuestions = (questionCount)=>{
    question.innerHTML = trivia[questionCount].prompt;
    option[0].value = trivia[questionCount].optA;
    label[0].innerHTML = trivia[questionCount].optA;
    option[1].value = trivia[questionCount].optB;
    label[1].innerHTML = trivia[questionCount].optB;
    option[2].value = trivia[questionCount].optC;
    label[2].innerHTML = trivia[questionCount].optC;
    option[3].value = trivia[questionCount].optD;
    label[3].innerHTML = trivia[questionCount].optD;
  }

//function to check radio button that is selected
function checkSelect() {
    let select = ""
    switch (true) {
      case option[0].checked:
        select = option[0].value;
        option[0].checked = false;
        break;
      case option[1].checked:
        select = option[1].value;
        option[1].checked = false;
        break;
      case option[2].checked:
        select = option[2].value;
        option[2].checked = false;
        break;
      case option[3].checked:
        select = option[3].value;
        option[3].checked = false;
        break;
      default:
        select = "none";
    }
    return select;
}

//function to output message if no radio button is selected on click
function noSelect(){
    alert("Oops! You did not select an option");
}

// Render enter player names page and hide start button
const inputPlayerNames = (evt)=> {
    playerNames.classList.remove('hide-content');
    playerNames.classList.add('flex-ctr');
    start.classList.add('hide-content');
}

// Render initial state of main page
const renderMainPage = (evt) => {
    introButton = evt.target
    introPage.classList.add('hide-content');
    introPage.classList.remove('flex-ctr');
    mainContent.classList.remove('hide-content')
    playerOne.name = playerName1.value;
    playerTwo.name = playerName2.value;
    displayPlayerName1.innerHTML = playerName1.value;
    displayPlayerName2.innerHTML = playerName2.value;
    generateQuestionCount()
    displayQuestions(questionCount)
    playerOneTurn()
}

const submit = (evt) => {
    if (playerTurn === 1) {
        selected = checkSelect();
        if (selected !== "none") {
            if (selected === trivia[questionCount].answer) {
                alert('correct')
                playerOne.score++;
                playerScores[0].innerHTML = playerOne.score;
            }else if (selected !== trivia[questionCount].answer) {
                alert('incorrect')
            }
        }else if (selected === "none"){
            noSelect();
        }
        setTimeout(function () {
            generateQuestionCount()
            displayQuestions(questionCount)
            playerTwoTurn()
        }, 3000)
        
    } else if (playerTurn === -1) {
        selected = checkSelect();
        if (selected !== "none") {
            if (selected === trivia[questionCount].answer) {
                alert('correct')
                playerTwo.score++;
                playerScores[1].innerHTML = playerOne.score;
            }else if (selected !== trivia[questionCount].answer) {
                alert('incorrect')
            }
        }else if (selected === "none"){
            noSelect();
        }
        setTimeout(function () {
            generateQuestionCount()
            displayQuestions(questionCount)
            playerOneTurn()
        }, 3000)
    }
    if (playerOne.score === 2 || playerTwo.score === 2) {
        mainContent.classList.add('hide-content');
        conclude.classList.remove('hide-content');
        conclude.classList.add('flex-ctr')
    }
}


start.addEventListener('click', inputPlayerNames);

submitPlayerNames.addEventListener('click', renderMainPage);

submitAnswer.addEventListener('click', submit)