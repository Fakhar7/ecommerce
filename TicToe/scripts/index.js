import { players, clearScore } from "../data/player.js";
const player1 = document.querySelector(".Player-1");
const player2 = document.querySelector(".Player-2");
const clickmusic = document.querySelector(".click");



document.querySelector("button").addEventListener("click", () => {
  players[0].name = player1.value;
  players[1].name = player2.value;
  clickmusic.play();
  clearScore();
})
