import {
  players,
  saveToStorage,
  clearScore,
  showScore
} from "../data/player.js";


function run() {
  document.querySelector(".Player-1").innerHTML = `${players[0].name} `;
  document.querySelector(".Player-2").innerHTML = `${players[1].name} `;

  const board = document.querySelector('.board-circuit');
  const massage = document.querySelector(".massage");

  const gameBoard = ['', '', '', '', '', '', '', '', ''];
  let default_Player = "X";
  let gameStart = true;

  function checkWinner() {
    let possibeWins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // --> rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // --> columns
      [0, 4, 8],
      [2, 4, 6], // --> Diagonals
    ];

    let len = possibeWins.length;

    for (let i = 0; i < len; i++) {
      let arr = possibeWins[i];
      let [a, b, c] = arr;
      if (
        gameBoard[a] &&
        gameBoard[a] === gameBoard[b] &&
        gameBoard[a] === gameBoard[c]
      ) { return gameBoard[a] }
    }
  }

  // function that check if game draw
  function checkDraw() {
    return !gameBoard.includes("");
  }


  const overlay = document.querySelector(".overlay");
  const popup = document.querySelector(".popup");
  const winmusic = document.querySelector(".win");

  // This Function will manage popup massage and player winning points
  function manageMassage(playerNo) {
    player = players[playerNo].name;
    players[playerNo].points += 1;
    saveToStorage();
  }

  // To handle popup and background overlay visibility
  function popupAndOverlay(swtch) {
    if (swtch === "on") {
      popup.classList.add("js-popup");
      overlay.classList.add("js-overlay");
    } else {
      popup.classList.remove("js-popup");
      overlay.classList.remove("js-overlay");
    }
  }

  // This will handle player that win and lose
  let player;
  function playerHandle(i) {
    if (!gameBoard[i] && gameStart) {
      let win = checkWinner();
      let isDraw = checkDraw();

      if (win) {
        checkWinner() === "X" ? manageMassage(0) : manageMassage(1);
        showScore();
        massage.innerHTML = `Congratulations! ${player} wins.`
        popupAndOverlay("on");
        winmusic.play();
        gameStart = false;
      } else if (isDraw) {
        massage.innerHTML = `Match Draw`;
        popupAndOverlay("on")
        gameStart = false;
      } else {
        default_Player = default_Player === "X" ? "O" : "X";
        massage.innerHTML = `Player ${default_Player} turns`
      }
    }
  }

  // This will create a gameboaard and handle clicks
  const clickmusic = document.querySelector(".click");
  function renderBoard() {
    board.innerHTML = "";
    gameBoard.forEach((value, index) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.textContent = value;
      cell.addEventListener("click", () => {
        clickmusic.play();
        gameBoard[index] = default_Player;
        if (cell.innerHTML === "") {
          cell.innerHTML = default_Player;
        }
        playerHandle();
      })
      board.appendChild(cell)
    })
  }
  renderBoard();
  showScore();

  document.querySelector(".play-again").addEventListener("click", () => {
    popupAndOverlay("off");
    winmusic.pause();
  })

  document.querySelector(".js-reset").addEventListener("click", () => {
    clearScore();
    showScore();
  })
}
document.querySelector('.icon').addEventListener("click", () => {
  document.querySelector('aside').classList.toggle('js-aside');
})

run();
document.querySelector(".play-again").addEventListener("click", () => run());