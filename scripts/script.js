// TASK 1: picture browsing

document.addEventListener("DOMContentLoaded", function () {
  const imageArray = [
    "../images/coat_of_arms_1.png",
    "../images/coat_of_arms_2.png",
    "../images/coat_of_arms_3.jpg",
  ];
  let currentIndex = 0;
  const imageElement = document.getElementById("image");
  const prevButtonElement = document.getElementById("prev");
  const nextButtonElement = document.getElementById("next");

  const setImage = (index) => {
    if (index >= 0 && index < imageArray.length) {
      imageElement.src = imageArray[index];
      currentIndex = index;
    }
  }

  setImage(currentIndex);

  prevButtonElement.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + imageArray.length) % imageArray.length;
    setImage(currentIndex);
  });

  nextButtonElement.addEventListener("click", () => {
    currentIndex = (currentIndex + 1 + imageArray.length) % imageArray.length;
    setImage(currentIndex);
  });
});

// TASK 2: tic-tac-toe

const statusDisplay = document.querySelector('.game-status');

let gameActive = true;

let currentPlayer = "X";

let gameState = [
  "", "", "", 
  "", "", "", 
  "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game-restart').addEventListener('click', handleRestartGame);

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
  if (gameState[clickedCellIndex] !== "" || !gameActive) {
      return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
};

function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  if (currentPlayer === "X") {
    clickedCell.innerHTML = "<img src='../assets/X.png'>";
  }
  else {
    clickedCell.innerHTML = "<img src='../assets/O.png'>";
  }
};

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      let a = gameState[winCondition[0]];
      let b = gameState[winCondition[1]];
      let c = gameState[winCondition[2]];
      if (a === '' || b === '' || c === '') {
          continue;
      }
      if (a === b && b === c) {
          roundWon = true;
          break
      }
  }
  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
  }

  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }

  handlePlayerChange();
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
}

function handleRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

// TASK 3: add picture after "акція"

var paragraphs = document.getElementsByTagName("p");

for (var i = 0; i < paragraphs.length; i++) {
  if (paragraphs[i].textContent.includes("Акція")) {
    var image = document.createElement("img");
    image.src = "../images/akcia.png";
    image.alt = "Зображення для акції";
    
    paragraphs[i].insertAdjacentElement('afterend', image);
    }
}