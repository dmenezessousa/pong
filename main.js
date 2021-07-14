//Get game Elements =============================================

// Get the game area element
let gameArea = document.querySelector('.game-area');
// Get the player paddle element
let playerPaddle = document.querySelector('.player-paddle');
// Get the computer paddle element
let computerPaddle = document.querySelector('.computer-paddle');
//get ball element
let ball = document.querySelector('.ball');
//get player score element
let playerScore = document.querySelector('.player_1_score');
//get computer score element
let computerScore = document.querySelector('.player_2_score');

//list of extra variables and functions =======================================================================

//Get coordinates from these elements
let playerPaddleCoord = playerPaddle.getBoundingClientRect();
let computerPaddleCoord = computerPaddle.getBoundingClientRect();
let ballCoord = ball.getBoundingClientRect();

//Ball X,Y positions and velocities .

let ballXPosition = 350;
let ballYPosition = 100;
let ballXVelocity = 1;
let ballYVelocity = 1;

//Player paddle Y position
let playerPaddleYPosition = 0;
let playerPaddleYVelocity = 1;

//Computer paddle Y position
let computerPaddleYPosition = 400;
let computerPaddleYVelocity = 3.15;

//reset ball and computer paddle positions
function resetBallPosition(){
  ballXPosition = 350;
  ballYPosition = 100;
  ballXVelocity = 1;
  ballYVelocity = 1;

  computerPaddleYPosition = 400;
  computerPaddleYVelocity = 3.15;
}

//Game Elements Modification ====================================================================
// Size of the game area (in px)
const GAME_AREA_WIDTH = 700;
const GAME_AREA_HEIGHT = 500;

//Game Background Color 
gameArea.style.backgroundColor = 'black';

//Paddles color
playerPaddle.style.backgroundColor = 'white';
computerPaddle.style.backgroundColor = 'white';

//Ball color
ball.style.backgroundColor = 'White';

//ball shape
ball.style.borderRadius = '10px';

// Size of the paddles (in px)
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 20;

// Size of the ball (in px)
const BALL_SIZE = 20;

//Event listeners ===============================================================================

// User input to move the user paddle
document.addEventListener('keydown', (e) => {
  if (e.code == 'KeyW'){
    if(playerPaddleYPosition >= 10){
      playerPaddleYPosition -= 10;
    }
  }else if (e.code == 'KeyS'){
    if((playerPaddleYPosition + PADDLE_HEIGHT) <= GAME_AREA_HEIGHT){
      playerPaddleYPosition += 10;
    }
  }  

  //maintain player paddle within the game area
  if((playerPaddleYPosition + PADDLE_HEIGHT) > GAME_AREA_HEIGHT || playerPaddleYPosition < 0 ){
  }else{
    playerPaddle.style.top = `${playerPaddleYPosition}px`;
  }
  playerPaddleCoord = playerPaddle.getBoundingClientRect();
});

//ball movements ==============================================================================
//Function to move and bounce ball around.
function moveBall() {
  //add moviments to the ball
  ballXPosition += ballXVelocity;
  ball.style.left = `${ballXPosition}px`;

  ballYPosition += ballYVelocity;
  ball.style.top = `${ballYPosition}px`;

  ballCoord = ball.getBoundingClientRect();

  //Resting the ball to its original position and adding a score for either the player or the computer
  if((ballXPosition + BALL_SIZE)  > GAME_AREA_WIDTH){
    playerScore.innerHTML  =  + playerScore.innerHTML + 1;
    resetBallPosition();
  }else if(ballXPosition  < 0){
    computerScore.innerHTML  =  + computerScore.innerHTML + 1;
    resetBallPosition();
  }
  if((ballYPosition + BALL_SIZE) > GAME_AREA_HEIGHT || ballYPosition  < 0){
    ballYVelocity *= -1;
  }
  
  //When the ball hits the player paddle bounce back
  if(ballCoord.left <= playerPaddleCoord.right &&
    ballCoord.top >= playerPaddleCoord.top &&
    ballCoord.bottom <= playerPaddleCoord.bottom){
      ballXVelocity *= -1;
      ballXVelocity += 0.5;
    }

  // When the ball hits the computer paddle bounce back
  if(ballCoord.right >= computerPaddleCoord.left &&
    ballCoord.top >= computerPaddleCoord.top &&
    ballCoord.bottom <= computerPaddleCoord.bottom){
      ballXVelocity *= -1;
      ballXVelocity -= 0.5;
    } 
}
//call the moveBall function every 10ms
setInterval(moveBall, 10);

//player Paddle movements ======================================================================

//Computer Paddle movements ====================================================================
function comPaddle() {
    // basically making so the ball hits the center of the computer paddle and bouce it back
    if(ballYPosition > (computerPaddleYPosition + (PADDLE_HEIGHT /2))){
      if((computerPaddleYPosition + PADDLE_HEIGHT) <= GAME_AREA_HEIGHT){
        computerPaddleYPosition += computerPaddleYVelocity;
      }
    }else if(ballYPosition < (computerPaddleYPosition + (PADDLE_HEIGHT /2))){
      if(computerPaddleYPosition >= 0){
        computerPaddleYPosition -= computerPaddleYVelocity;
      }
    }

    // Apply the y-position 
    computerPaddle.style.top = `${computerPaddleYPosition}px`;

    computerPaddleCoord = computerPaddle.getBoundingClientRect();
}
// Call the update() function every 35ms
setInterval(comPaddle,35);







