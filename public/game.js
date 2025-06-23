// プレイヤーの設定（仮）
let currentPlayer = 1;

// 初期盤面の状態
let board = Array.from({ length: 8 }, () => Array(8).fill(0));

// 盤面を描画する関数
function renderBoard() {
  const table = document.getElementById("board");
  table.innerHTML = ""; // まず盤面を空にする

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

      // クリックイベント
      cell.addEventListener("click", function () {
        placeStone(x, y);
      });

      row.appendChild(cell);
    }
    table.appendChild(row);
  }
}

// 石を置く処理（仮）
function placeStone(x, y) {
  // そのマスが空いてるか確認
  if (board[y][x] !== 0) {
    alert("そこには置けません！");
    return;
  }

  // 現在のプレイヤーの石を置く
  board[y][x] = currentPlayer;

  flipStones(x, y);

  // 盤面を更新（再描画）
  renderBoard();

  // プレイヤー交代
  currentPlayer = currentPlayer === 1 ? 2 : 1;
}

// ページ読み込み時に盤面描画
window.onload = function () {
  board[3][3] = 2;
  board[3][4] = 1;
  board[4][3] = 1;
  board[4][4] = 2;

  renderBoard();
};

//裏返しの処理
function flipStones(x, y) {
  const opponent = currentPlayer === 1 ? 2 : 1; // 相手の石

  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, +1],
    [0, -1],
    [0, +1],
    [+1, -1],
    [+1, 0],
    [+1, +1],
  ];

  // ここで8方向を順番に確認していく
  for (let i = 0; i < directions.length; i++) {
    const dirX = directions[i][0];
    const dirY = directions[i][1];

    // ここに1方向ずつ裏返し処理を書く
    let nx = x + dirX;
    let ny = y + dirY;

    const stonesToFlip = [];

    while (
      0 <= nx &&
      nx < 8 &&
      0 <= ny &&
      ny < 8 &&
      board[ny][nx] === opponent
    ) {
      stonesToFlip.push([nx, ny]);
      nx += dirX;
      ny += dirY;
    }

    // 先に進んで、自分の石があれば裏返し
    if (
      0 <= nx &&
      nx < 8 &&
      0 <= ny &&
      ny < 8 &&
      board[ny][nx] === currentPlayer
    ) {
      for (let j = 0; j < stonesToFlip.length; j++) {
        const flipX = stonesToFlip[j][0];
        const flipY = stonesToFlip[j][1];
        board[flipY][flipX] = currentPlayer;
      }
    }
  }
}
