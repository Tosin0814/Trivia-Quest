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

//Array of Question Objects
const trivia = [
    {
      prompt: "Who played Mrs. Robinson in The Graduate?",
      optA:"Katherine Rose",
      optB:"Anne Bancroft",
      optC:"Elizabeth Wilson",
      optD:"Oprah Winfrey",
      answer: "Anne Bancroft"
    },
    {
      prompt: "What was the first feature-length animated movie ever released?",
      optA:"Shrek",
      optB:"The Little Mermaid",
      optC:"Snow White and the Seven Dwarfs",
      optD:"Cinderella",
      answer: "Snow White and the Seven Dwarfs"
    },
    {
      prompt: "In The Matrix, does Neo take the blue pill or the red pill?",
      optA:"Blue",
      optB:"Red",
      optC:"Both",
      optD:"Neither",
      answer: "Red"
    },
    {
      prompt: "What's the name of the skyscraper in Die Hard?",
      optA:"Empire State Building",
      optB:"Central Park Tower",
      optC:"Devon Tower",
      optD:"Nakatomi Plaza",
      answer: "Nakatomi Plaza"
    },
    {
      prompt: "What flavor of Pop Tarts does Buddy the Elf use in his spaghetti in Elf? ",
      optA:"Peanut",
      optB:"Strawberry",
      optC:"Chocolate",
      optD:"Vanilla",
      answer: "Chocolate"
    },
    {
      prompt: "The head of what kind of animal is front-and-center in an infamous scene from The Godfather?",
      optA:"A lion",
      optB:"A dog",
      optC:"A horse",
      optD:"A bull",
      answer: "A horse"
    },
    {
      prompt: "What famous L.A. landmark is heavily featured in Rebel Without a Cause?",
      optA:"Staples Center",
      optB:"Venice Canals Walkway",
      optC:"Hollywood Walk of Fame",
      optD:"Griffith Observatory",
      answer: "Griffith Observatory"
    },
    {
      prompt: "Who played Martin Luther King Jr. in the 2014 biopic Selma?",
      optA:"David Oyelowo",
      optB:"Sidney Poitier",
      optC:"Morgan Freeman",
      optD:"Denzel Washington",
      answer: "David Oyelowo"
    },
    {
      prompt: "What Hollywood movie star plays himself in Zombieland?",
      optA:"Indiana Jones",
      optB:"Woody Harrelson",
      optC:"Emma Stone",
      optD:"Bill Murray",
      answer: "Bill Murray"
    },
    {
      prompt: "What is the highest-grossing R-rated movie of all time?",
      optA:"The Matrix Reloaded",
      optB:"Joker",
      optC:"Deadpool",
      optD:"Deadpool 2",
      answer: "Joker"
    },
    {
      prompt: "What 1994 crime film revitalized John Travolta's career?",
      optA:"Perfect",
      optB:"From Paris with Love",
      optC:"The poison Rose",
      optD:"Pulp Fiction",
      answer: "Pulp Fiction"
    },
    {
      prompt: "What animated classic was the first film of the late-twentieth-century 'Disney Renaissance?'",
      optA:"Sleeping Beauty",
      optB:"Cinderella",
      optC:"The Little Mermaid",
      optD:"Snow White",
      answer: "The Little Mermaid"
    },
    {
        prompt: "Aaron Sorkin won an Oscar for writing what 2010 drama about the creation of Facebook?",
        optA:"The Social Network",
        optB:"The Rise of an Era",
        optC:"Going Public",
        optD:"The Facebook",
        answer: "The Social Network"
    },
    {
        prompt: "Who is the first actor to play Jack Ryan on screen?",
        optA:"Harrison Ford",
        optB:"Alec Baldwin",
        optC:"Ben Affleck",
        optD:"Chris Pine",
        answer: "Alec Baldwin"
    },
    {
        prompt: "Joaquin Phoenix received his first Oscar nomination for playing Roman emperor Commodus in what 2000 Oscar-winning epic?",
        optA:"Spartacus",
        optB:"The Eagle",
        optC:"Gladiator",
        optD:"The Last Legion",
        answer: "Gladiator"
    },
    {
        prompt: "The Battle of Thermopylae served as the basis of what highly stylized 2006 smash hit swords-and-sandals action flick?",
        optA:"The Legend of Hercules",
        optB:"Pompei",
        optC:"Spartacus",
        optD:"300",
        answer: "300"
    },
    {
        prompt: "What is the highest-grossing foreign-language film at the U.S. box office?",
        optA:"The Passion of the Christ",
        optB:"Hero",
        optC:"Crouching Tiger, Hidden Dragon",
        optD:"Parasite",
        answer: "The Passion of the Christ"
    },
    {
        prompt: "Who wrote the screenplay for Rocky?",
        optA:"Dwayne Johnson",
        optB:"Sylvester Stallone",
        optC:"Quentin Tarantino",
        optD:"Spike Lee",
        answer: "Sylvester Stallone"
    },
    {
        prompt: "What was Quentin Tarantino's first feature as writer/director?",
        optA:"Kill Bill",
        optB:"Once Upon a Time in Hollywood",
        optC:"Reservoir Dogs",
        optD:"From Dusk Till Dawn",
        answer: "Reservoir Dogs"
    },
    {
        prompt: "Who played the Wicked Witch of the West in The Wizard of Oz?",
        optA:"Angelina Jolie",
        optB:"Jennifer Lopez",
        optC:"Amber Heard",
        optD:"Margaret Hamilton",
        answer: "Margaret Hamilton"
    },
    {
        prompt: "What Martin Scorsese movie holds the all-time record for F-bombs?",
        optA:"The Wolf of Wall Street",
        optB:"Alpha Dog",
        optC:"Straight Outta Compton",
        optD:"Casino",
        answer: "The Wolf of Wall Street"
    },
    {
        prompt: "Who played the Green Goblin in 2002 box-office smash Spider-Man?",
        optA:"Steve Blum",
        optB:"Willem Dafoe",
        optC:"Jorma Taccone",
        optD:"Rino Romano",
        answer: "Willem Dafoe"
    },
]

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
