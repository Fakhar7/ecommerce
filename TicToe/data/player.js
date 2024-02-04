export let players = JSON.parse(localStorage.getItem('players'));
if (!players) {
  players = [
    {
      name: "Player 1",
      points: 0
    }, {
      name: "Player 2",
      points: 0
    }
  ]
}

export function saveToStorage() {
  localStorage.setItem('players', JSON.stringify(players))
}

export function clearScore() {
  players.forEach((obj) => {
    obj.points = 0;
    saveToStorage();
  })
}

export function showScore() {
  document.querySelector(".player1-massage").innerHTML = players[0].points;
  document.querySelector(".player2-massage").innerHTML = players[1].points;
}