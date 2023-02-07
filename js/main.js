// dots varibals
let lives = 3;
let redD, yellowD;
// catch the grid div element
const theGrid = document.querySelector("#gridContainer");
const livesId = document.querySelector("#lives");
// display lives


// function to build the html divs
function renderGrid() {
  for (let i = 1; i <= 100; i++) {
    theGrid.innerHTML += `<div id="${i}" class="gridCell"></div>`;
  }
}
// new game buttun
const newGame=()=>{
  document.getElementById("overlay").classList.add("hidden")
  lives=3;
  onLoadFunc()

}
// function to hide limits div
const hideLimitDivs = (plain) => {
  for (let j = 0; j < 10; j++) {
    document.getElementById(plain[j]).classList.add("limit");
  }
};

// function to build limts
const limitHorizontal = (plain, a) => {
  for (let i = 1; i <= 10; i++) {
    plain.push(i + 9 * a);
  }
};
const limitVertical = (plainArr, a) => {
  for (let i = 1; i <= 100; i = i + 10) {
    plainArr.push(i + a);
  }
};
// array for the first position of the snake
let snakeOriginal = [[14], [14, 13], [13, 12]];
let snake = [[14], [14, 13], [13, 12]];
let horizontalLimitTop = [];
let horizontalLimitBottom = [];
let verticalLimitLeft = [];
let verticalLimitRight = [];

limitHorizontal(horizontalLimitTop, 0);
limitHorizontal(horizontalLimitBottom, 10);
limitVertical(verticalLimitLeft, 0);
limitVertical(verticalLimitRight, 9);

// function to render the first snake position
const renderSnake = (plain) => {
  for (let j = 0; j < plain.length; j++) {
    if (j == 0) {
      document.getElementById(plain[j][0]).classList.add("head");
    } else {
      document.getElementById(plain[j][1]).classList.add("active");
    }
  }
};

const dotCollapse = (rnd) => {
  for (let m = 0; m < snake.length; m++) {
    if (m == 0) {
      if (snake[m][0] === rnd) {
        rnd = Math.ceil(Math.random() * 100);
      }
    } else {
      if (snake[m][1] === rnd) {
        rnd = Math.ceil(Math.random() * 100);
      }
    }
  }
};
// check the random number
const dotsOnLimit = (plain, a) => {
  for (let i = 0; i < 10; i++) {
    if (plain[i] == a) {
      return false;
    } else if (i == plain.length - 1) {
      return true;
    }
  }
};
const dotsOnSnake = (plain, a) => {
  for (let i = 0; i < snake.length; i++) {
    if (i == 0) {
      if (plain[0][0] == a) {
        return false;
      }
    } else if (plain[i][1] == a) {
      return false;
    } else if (i == snake.length - 1) {
      return true;
    }
  }
};

//  creating red dots
const redDots = () => {
  let rndNum = Math.ceil(Math.random() * 100);
  if (
    dotsOnSnake(snake, rndNum) &&
    dotsOnLimit(horizontalLimitTop, rndNum) &&
    dotsOnLimit(horizontalLimitBottom, rndNum) &&
    dotsOnLimit(verticalLimitLeft, rndNum) &&
    dotsOnLimit(verticalLimitRight, rndNum)
  ) {
    document.getElementById(rndNum).classList.add("redDot");
    redD = rndNum;
  } else {
    redDots();
  }
};
// creating yellow dots
const yellowDots = () => {
  let rndNum = Math.ceil(Math.random() * 100);
  if (
    dotsOnSnake(snake, rndNum) &&
    dotsOnLimit(horizontalLimitTop, rndNum) &&
    dotsOnLimit(horizontalLimitBottom, rndNum) &&
    dotsOnLimit(verticalLimitLeft, rndNum) &&
    dotsOnLimit(verticalLimitRight, rndNum)
  ) {
    document.getElementById(rndNum).classList.add("yellowDot");
    yellowD = rndNum;
  } else {
    yellowDots();
  }
};

const snakeTouchDot = () => {
  if (snake[0][0] == redD) {
    snake.pop();
    document.getElementById(redD).classList.remove("redDot");

    redDots();
  }
  if (snake[0][0] == yellowD) {
    snake.unshift([yellowD]);
    snake[1].unshift(yellowD);
    document.getElementById(yellowD).classList.remove("yellowDot");
    yellowDots();
  }
};

// check backword
const checkBackword = () => {
  for (let i = 1; i < snake.length; i++) {
    if (snake[i][1] == snake[0][0]) {
      return false;
    } else if (i == snake.length - 1) {
      return true;
    }
  }
};
// function check if snake crash limit
const limit = (plain) => {
  for (let i = 0; i < 10; i++) {
    if (plain[i] == snake[0][0]) {
      return false;
    } else if (i == plain.length - 1) {
      return true;
    }
  }
};
// on load function
const onLoadFunc = () => {
  livesId.innerHTML=lives;
  snake = [[14], [14, 13], [13, 12]];
  theGrid.innerHTML = "";
  renderGrid();
  renderSnake(snakeOriginal);
  redDots();
  yellowDots();
  hideLimitDivs(horizontalLimitTop);
  hideLimitDivs(horizontalLimitBottom);
  hideLimitDivs(verticalLimitLeft);
  hideLimitDivs(verticalLimitRight);
};
onLoadFunc();

//function for head movement
const headMovment = (a, b) => {
  if (b == "-") {
    document.getElementById(snake[0][0]).classList.remove("head");
    snake[0].unshift(snake[0][0] - a);
    snake[0][1] = snake[0][0];
  } else if (b == "+") {
    document.getElementById(snake[0][0]).classList.remove("head");
    snake[0].unshift(snake[0][0] + a);
    snake[0][1] = snake[0][0];
  }
};

// function for body movement
const bodyMovment = () => {
  for (let i = 1; i <= snake.length; i++) {
    if (i < snake.length) {
      document.getElementById(snake[i][1]).classList.remove("active");
      snake[i].unshift(snake[i - 1].pop());
      snake[i][2] = snake[i][1];
    } else {
      snake[i - 1].pop();
    }
  }
};
// key press function
document.addEventListener("keydown", (e) => {
  if (e.key == "ArrowUp") {
    headMovment(10, "-");
    if (
      checkBackword() &&
      limit(horizontalLimitTop) &&
      limit(horizontalLimitBottom) &&
      limit(verticalLimitLeft) &&
      limit(verticalLimitRight)
    ) {
      bodyMovment();
      snakeTouchDot();
      renderSnake(snake);
    } else {
      lives--;
      if(lives>0){
      onLoadFunc();
      }else{
        livesId.innerHTML=lives;
        document.getElementById("overlay").classList.remove("hidden")
      }
    }
  } else if (e.key == "ArrowDown") {
    headMovment(10, "+");

    if (
      checkBackword() &&
      limit(horizontalLimitTop) &&
      limit(horizontalLimitBottom) &&
      limit(verticalLimitLeft) &&
      limit(verticalLimitRight)
    ) {
      bodyMovment();
      snakeTouchDot();
      renderSnake(snake);
    } else {
      lives--;
      if(lives>0){
      onLoadFunc();
      }else{
        livesId.innerHTML=lives;
        document.getElementById("overlay").classList.remove("hidden")
      }
    }
  } else if (e.key == "ArrowLeft") {
    headMovment(1, "-");
    if (
      checkBackword() &&
      limit(horizontalLimitTop) &&
      limit(horizontalLimitBottom) &&
      limit(verticalLimitLeft) &&
      limit(verticalLimitRight)
    ) {
      bodyMovment();
      snakeTouchDot();
      renderSnake(snake);
    } else {
      lives--;
      if(lives>0){
      onLoadFunc();
      }else{
        livesId.innerHTML=lives;
        document.getElementById("overlay").classList.remove("hidden")
      }
    }
  } else if (e.key == "ArrowRight") {
    headMovment(1, "+");
    if (
      checkBackword() &&
      limit(horizontalLimitTop) &&
      limit(horizontalLimitBottom) &&
      limit(verticalLimitLeft) &&
      limit(verticalLimitRight)
    ) {
      bodyMovment();
      snakeTouchDot();
      renderSnake(snake);
    } else {
      lives--;
      if(lives>0){
      onLoadFunc();
      }else{
        livesId.innerHTML=lives;
        document.getElementById("overlay").classList.remove("hidden")
      }
    }
  }
});
