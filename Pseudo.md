1) The following constants are required
    1.1) An array of objects to store the questions and answers.
    1.2) An object for each player.

2) The required variables used to track the state of the game are;
    2.1) A variable to determine the player turn (1 or -1)
    2.2) A timer to count down the time left to answer a question

3) Upon loading the game, the intro page pops up with a click to start button.
    3.1) Once the start button is clicked, the players are required to enter their names and desired category to play
    3.2) The player clicks the submit button to start the game.

4) After the player name submission, the main page is rendered. The default at the start of the game should be;
    4.1) Player One plays first, hence, Player One's Turn is highlighted in some way and Player Two's name is rendered normally
    4.2) The player scores are set to zero 
    4.3) The first random question is rendered and the possible options are displayed using radio buttons
    4.4) The timer starts counting down

5) Player One is to make a choice. Once the player runs out of time or has clicked submit answer button;
    5.1) If the selected answer was correct, a congratulations message is rendered and the player score property of the player object is updated
    5.2) if the selected answer was incorrect or no answer was selected, an "oops" message is rendered along with the correct answer
    5.3) That question becomes disabled, so it is not repeated during the session
    5.4) Player One's turn is over and it is Player Two's turn. 
    5.5) After 5 seconds, another random question from the questions array is rendered
    5.6) The timer resets

6) Player Two is to make a choice. Once the player runs out of time or has clicked submit answer button;
    6.1) If the selected answer was correct, a congratulations message is rendered and the player score property of the player object is updated
    6.2) if the selected answer was incorrect or no answer was selected, an "oops" message is rendered along with the correct answer
    6.3) That question becomes disabled, so it is not repeated during the session
    6.4) Player Two's turn is over and it is Player One's turn. 
    6.5) After 5 seconds, another random question from the questions array is rendered
    6.6) The timer resets

7) The player to correctly answer 5 questions first, wins the game
    7.1) A congratulations page is rendered along with a comment that varies depending on how close the game was.
    7.2) A replay button is rendered

8) Once the replay button is clicked;
    8.1) All the question objects in the array become available again
    8.2) The player scores are set to zero
    8.3) The first random question is rendered and the possible options are displayed using radio buttons
    8.4) Player One plays first, hence, Player One's Turn is highlighted in some way and Player Two's name is rendered normally
    6.5) The timer resets

    