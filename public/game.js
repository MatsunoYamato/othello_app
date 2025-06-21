// 初期盤面の状態
let board = Array.from({length: 8}, () => Array(8).fill(0));

// 盤面を描画する関数
function renderBoard() {
  const table = document.getElementById("board");
  table.innerHTML = ""; // まず盤面を空にする

  for (let y = 0; y < 8; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < 8; x++) {
      const cell = document.createElement("td");

      // 石の表示
      if (board[y][x] === 1) {
        cell.className = "black";
      } else if (board[y][x] === 2) {
        cell.className = "white";
      }

      // クリックイベント
      cell.addEventListener("click", function() {
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

  // 盤面を更新（再描画）
  renderBoard();

  // プレイヤー交代
  currentPlayer = (currentPlayer === 1) ? 2 : 1;
}

// ページ読み込み時に盤面描画
window.onload = function() {
  renderBoard();
};
