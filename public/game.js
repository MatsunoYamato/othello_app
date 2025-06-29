// プレイヤーの設定（1:黒, 2:白）
let currentPlayer = 1;

// 初期盤面の状態
let board = Array.from({ length: 8 }, () => Array(8).fill(0));

// 盤面を描画する関数
function renderBoard() {
  const table = document.getElementById("board");
  table.innerHTML = "";

  for (let y = 0; y < 8; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < 8; x++) {
      const cell = document.createElement("td");

      // 石の表示
      if (board[y][x] !== 0) {
        const stone = document.createElement("div");
        stone.classList.add("stone");
        stone.classList.add(board[y][x] === 1 ? "black" : "white");
        cell.appendChild(stone);
      }

      // 置ける場所のハイライト
      if (canPlaceStone(x, y, currentPlayer)) {
        cell.classList.add("hint");
      }

      // クリックイベント
      cell.addEventListener("click", function () {
        placeStone(x, y);
      });

      row.appendChild(cell);
    }
    table.appendChild(row);
  }

  // 現在の手番表示
  const turnText = currentPlayer === 1 ? "黒" : "白";
  document.getElementById("current-turn").textContent = `現在の手番: ${turnText}`;
}

// 石を置く処理
function placeStone(x, y) {
  if (!canPlaceStone(x, y, currentPlayer)) {
    alert("そこには置けません！");
    return;
  }

  board[y][x] = currentPlayer;
  flipStones(x, y);

  // 勝敗判定
  if (!hasValidMove(1) && !hasValidMove(2)) {
    renderBoard();
    checkGameOver();
    return;
  }

  // プレイヤー交代
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  renderBoard();
}

// 裏返し処理
function flipStones(x, y) {
  const opponent = currentPlayer === 1 ? 2 : 1;
  const directions = [
    [-1, -1], [-1, 0], [-1, +1],
    [0, -1],           [0, +1],
    [+1, -1], [+1, 0], [+1, +1],
  ];

  for (let [dx, dy] of directions) {
    let nx = x + dx;
    let ny = y + dy;
    const stonesToFlip = [];

    while (0 <= nx && nx < 8 && 0 <= ny && ny < 8 && board[ny][nx] === opponent) {
      stonesToFlip.push([nx, ny]);
      nx += dx;
      ny += dy;
    }

    if (0 <= nx && nx < 8 && 0 <= ny && ny < 8 && board[ny][nx] === currentPlayer) {
      for (let [fx, fy] of stonesToFlip) {
        board[fy][fx] = currentPlayer;
      }
    }
  }
}

// 石が置けるか判定
function canPlaceStone(x, y, player) {
  if (board[y][x] !== 0) return false;

  const opponent = player === 1 ? 2 : 1;
  const directions = [
    [-1, -1], [-1, 0], [-1, +1],
    [0, -1],           [0, +1],
    [+1, -1], [+1, 0], [+1, +1],
  ];

  for (let [dx, dy] of directions) {
    let nx = x + dx;
    let ny = y + dy;
    let foundOpponent = false;

    while (0 <= nx && nx < 8 && 0 <= ny && ny < 8 && board[ny][nx] === opponent) {
      foundOpponent = true;
      nx += dx;
      ny += dy;
    }

    if (foundOpponent && 0 <= nx && nx < 8 && 0 <= ny && ny < 8 && board[ny][nx] === player) {
      return true;
    }
  }
  return false;
}

// そのプレイヤーに有効手があるか判定
function hasValidMove(player) {
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (canPlaceStone(x, y, player)) return true;
    }
  }
  return false;
}

// 勝敗判定と表示
function checkGameOver() {
  const counts = countStones();
  let message = `黒: ${counts.black} 石、白: ${counts.white} 石\n`;

  if (counts.black > counts.white) {
    message += "黒の勝ち！";
  } else if (counts.white > counts.black) {
    message += "白の勝ち！";
  } else {
    message += "引き分け！";
  }

  document.getElementById("result-message").textContent = message;
  document.getElementById("result-modal").classList.remove("hidden");

}

// 石の数を数える
function countStones() {
  let black = 0, white = 0;
  for (let row of board) {
    for (let cell of row) {
      if (cell === 1) black++;
      if (cell === 2) white++;
    }
  }
  return { black, white };
}

// パスボタンの処理
document.getElementById("pass-button").addEventListener("click", () => {
  if (hasValidMove(currentPlayer)) {
    alert("まだ置ける場所があります！");
    return;
  }

  const passPlayer = currentPlayer === 1 ? "黒" : "白";
  alert(`${passPlayer}はパスします`);

  currentPlayer = currentPlayer === 1 ? 2 : 1;
  renderBoard();

  if (!hasValidMove(1) && !hasValidMove(2)) {
    setTimeout(() => checkGameOver(), 100);
  }
});

// 初期盤面セットと描画
window.onload = function () {
  board[3][3] = 2;
  board[3][4] = 1;
  board[4][3] = 1;
  board[4][4] = 2;

  renderBoard();
};

document.getElementById("close-modal").addEventListener("click", () => {
  document.getElementById("result-modal").classList.add("hidden");
});
