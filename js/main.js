const introPage = document.querySelector('.intro-page');
const start = document.querySelector('.start');
const playerNames = document.querySelector('.player-names');
const playerName1 = document.querySelector('.player1');
const playerName2 = document.querySelector('.player2');
const submitPlayerNames = document.querySelector('.submit-player-name');
const mainContent = document.querySelector('.main-content');
const sideBar = document.querySelector("#my-side-panel")
const openBtn = document.querySelector('.openbtn')
const closeBtn = document.querySelector('.closebtn')
const question = document.querySelector('.question')
const option = document.querySelectorAll('.opt')
const options = document.querySelector('.options')
const label = document.querySelectorAll('.options > label')
const submitAnswer = document.querySelector('.submit-answer')
const feedback = document.querySelector('.feedback-container > div')
const displayPlayerName1 = document.querySelector('.disp-player1');
const displayPlayerName2 = document.querySelector('.disp-player2');
const playerScores = document.querySelectorAll('.player-score');
const conclude = document.querySelector('.conclude')
const concludeMessage = document.querySelector('.conclude > h1')
const replay = document.querySelector('.replay')

let questionCount = null;
let playerTurn = 1 //1 for playerOne and -1 for playerTwo
let selected = null;
let askedQuestions =[];
const winScore = 5;
const scoreDiff = 1;
const time = 3000;



class Players{
    constructor(name, score, totalTurns){
        this.name = name;
        this.score = score;
        this.totalTurns = totalTurns;
    }
}

//Player objects
playerOne = new Players('', 0, 0)
playerTwo = new Players('', 0, 0)

//Randomly select question to be rendered by assigning generated value to questionCount
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
    displayPlayerName1.style.backgroundColor = 'skyblue'
    displayPlayerName2.style.backgroundColor = ''
    displayPlayerName1.innerHTML = `${playerOne.name}'s Turn`
    displayPlayerName2.innerHTML = playerTwo.name
}

// Add styling and modify HTML when it is player two's turn
const playerTwoTurn = () => {
    playerTurn = -1
    displayPlayerName1.style.backgroundColor = ''
    displayPlayerName2.style.backgroundColor = 'skyblue'
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

// Render enter player names page and hide start button
const inputPlayerNames = (evt)=> {
    playerNames.classList.remove('hide-content');
    playerNames.classList.add('flex-ctr');
    start.classList.add('hide-content');
}

// Render message when the correct answer is selected
const correctAnswer = () => {
    options.classList.add('hide-content')
    feedback.classList.remove('hide-content')
    feedback.classList.add('flex-ctr')
    feedback.classList.add('feedback-message-correct')
    feedback.classList.add('animate__animated')
    feedback.classList.add('animate__heartBeat')
    feedback.innerHTML = `<h2>Correct!</h2><p>The answer is: ${trivia[questionCount].answer}</p>`
}

// Render message when the wrong answer is selected
const incorrectAnswer = () => {
    options.classList.add('hide-content')
    feedback.classList.remove('hide-content')
    feedback.classList.add('flex-ctr')
    feedback.classList.add('feedback-message-incorrect')
    feedback.classList.add('animate__animated')
    feedback.classList.add('animate__shakeX')
    feedback.innerHTML = `<h2>Wrong!</h2><p>The correct answer is: ${trivia[questionCount].answer}</p>`
}

// Rerender Options div and hide feedback div
const clearFeedbackClasses = () => {
    options.classList.remove('hide-content')
    feedback.classList.add('hide-content')
    feedback.classList.remove('feedback-message-incorrect')
    feedback.classList.remove('feedback-message-correct')
    feedback.classList.remove('animate__animated')
    feedback.classList.remove('animate__heartBeat')
    feedback.classList.remove('animate__shakeX')
}

// What happens after game is won?
const gameWin = () => {
    setTimeout(function(){
        mainContent.classList.add('hide-content');
        conclude.classList.remove('hide-content');
        conclude.classList.add('flex-ctr')
        concludeMessage.classList.add('animate__animated')
        concludeMessage.classList.add('animate__bounce')
        if (playerOne.score > playerTwo.score) {
            concludeMessage.innerHTML = `${playerOne.name} wins!`
        } else if (playerTwo.score > playerOne.score) {
            concludeMessage.innerHTML = `${playerTwo.name} wins!`
        }
        replay.classList.add('animate__animated')
        replay.classList.add('animate__heartBeat')
    }, time)
}

// What happens if game is a tie
const gameDraw = () => {
    setTimeout(function(){
        mainContent.classList.add('hide-content');
        conclude.classList.remove('hide-content');
        conclude.classList.add('flex-ctr')
        concludeMessage.classList.add('animate__animated')
        concludeMessage.classList.add('animate__bounce')
        concludeMessage.innerHTML = `Tie Game!`
        replay.classList.add('animate__animated')
        replay.classList.add('animate__heartBeat')
    }, time)
    
}

// Choose what is rendered after game is finished (Determine winner)
const afterRun = () => {
    if ((askedQuestions.length === trivia.length)) {
        if (playerOne.score === playerTwo.score) {
            gameDraw()
        } else {
            gameWin()
        }
        
    }
    if ((playerOne.score >= winScore || playerTwo.score >= winScore) 
        && ((playerOne.totalTurns === playerTwo.totalTurns) 
            || ((playerOne.score === winScore) && (playerOne.score - playerTwo.score !== 1))) 
        && ((playerOne.score - playerTwo.score) >= scoreDiff || (playerTwo.score - playerOne.score) >= scoreDiff) 
        ) {
            gameWin()
    }
}

// Set the width of the sidebar to 250px (show it)
const openNav = () => {
    sideBar.style.width = "280px";
}
  
// Set the width of the sidebar to 0 (hide it)
const closeNav = () => {
    sideBar.style.width = "0";
}
// Replay game
const reload = () => {
    conclude.classList.add('hide-content');
    conclude.classList.remove('flex-ctr');
    mainContent.classList.remove('hide-content')
    askedQuestions =[];
    playerOne.score = 0;
    playerTwo.score = 0;
    playerOne.totalTurns = 0;
    playerTwo.totalTurns = 0;
    displayPlayerName1.innerHTML = playerName1.value;
    displayPlayerName2.innerHTML = playerName2.value;
    playerScores[0].innerHTML = playerOne.score;
    playerScores[1].innerHTML = playerTwo.score;
    clearFeedbackClasses()
    playerOneTurn()
    generateQuestionCount()
    displayQuestions(questionCount)
}

// Render initial state of main page
const renderMainPage = (evt) => {
    introButton = evt.target
    introPage.classList.add('hide-content');
    introPage.classList.remove('flex-ctr');
    mainContent.classList.remove('hide-content')
    if (playerName1.value === '') {
        playerOne.name = 'Stranger One'
    } else {
        playerOne.name = playerName1.value;
    }
    if (playerName2.value === '') {
        playerTwo.name = 'Stranger Two'
    } else {
        playerTwo.name = playerName2.value;
    }
    displayPlayerName1.innerHTML = playerOne.name
    displayPlayerName2.innerHTML = playerTwo.name;
    generateQuestionCount()
    displayQuestions(questionCount)
    playerOneTurn()
}

// Perform actions after submitting selected answer
const submit = (evt) => {
    if (playerTurn === 1) {
        selected = checkSelect();
        if (selected !== "none") {
            if (selected === trivia[questionCount].answer) {
                correctAnswer()
                playerOne.score++;
                playerScores[0].innerHTML = playerOne.score;
            }else if (selected !== trivia[questionCount].answer) {
                incorrectAnswer()
            }
        }else if (selected === "none"){
            incorrectAnswer()
        }
        setTimeout(function () {
            clearFeedbackClasses()
            generateQuestionCount()
            displayQuestions(questionCount)
            playerTwoTurn()
        }, time)
        playerOne.totalTurns++
    } else if (playerTurn === -1) {
        selected = checkSelect();
        if (selected !== "none") {
            if (selected === trivia[questionCount].answer) {
                correctAnswer()
                playerTwo.score++;
                playerScores[1].innerHTML = playerTwo.score;
            }else if (selected !== trivia[questionCount].answer) {
                incorrectAnswer()
            }
        }else if (selected === "none"){
            incorrectAnswer()
        }
        setTimeout(function () {
            clearFeedbackClasses()
            generateQuestionCount()
            displayQuestions(questionCount)
            playerOneTurn()
        }, time)
        playerTwo.totalTurns++
    }
    afterRun()
}


start.addEventListener('click', inputPlayerNames);

submitPlayerNames.addEventListener('click', renderMainPage);

submitAnswer.addEventListener('click', submit)

replay.addEventListener('click', reload)


closeBtn.addEventListener('click', closeNav)

openBtn.addEventListener('click', openNav)
