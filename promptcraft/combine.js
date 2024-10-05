document.querySelectorAll('.game-button').forEach(button => {
    button.addEventListener('click', function() {
        const game = this.getAttribute('data-game');
        loadGame(game);
    });
});

function loadGame(game) {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = ""; // Clear previous game
    gameContainer.style.display = "block"; // Show the game container

    switch (game) {
        case "snake":
            renderSnakeGame(gameContainer);
            break;
        case "tictactoe":
            renderTicTacToe(gameContainer);
            break;
        case "agecalculator":
            renderAgeCalculator(gameContainer);
            break;
    }
}

function renderSnakeGame(container) {
    const html = `
        <h2>Snake Game</h2>
        <canvas id="gameCanvas" width="600" height="400" class="canvas"></canvas>
        <div id="scoreboard">
            <span id="score">Score: 0</span>
            <span id="level">Level: 1</span>
        </div>
    `;
    container.innerHTML = html;

    // Snake game logic here
    const ctx = document.getElementById("gameCanvas").getContext("2d");
    let snake = [{ x: 10, y: 10 }];
    let direction = { x: 1, y: 0 };
    let food = spawnFood();
    let score = 0;
    let level = 1;
    let speed = 100;
    let gameInterval;

    document.addEventListener("keydown", changeDirection);
    startGame();

    function startGame() {
        gameInterval = setInterval(updateGame, speed);
    }

    function updateGame() {
        if (checkCollision()) {
            clearInterval(gameInterval);
            alert("Game Over! Your score: " + score);
            document.location.reload();
        }
        if (snake[0].x === food.x && snake[0].y === food.y) {
            score += 10;
            if (score % 50 === 0) {
                level++;
                speed = Math.max(10, speed - 10);
                clearInterval(gameInterval);
                gameInterval = setInterval(updateGame, speed);
            }
            food = spawnFood();
        } else {
            snake.pop();
        }

        const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
        snake.unshift(newHead);

        drawGame();
    }

    function drawGame() {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.fillStyle = "#ff0000";
        ctx.fillRect(food.x, food.y, 10, 10);

        ctx.fillStyle = "#00ff00";
        snake.forEach(part => {
            ctx.fillRect(part.x, part.y, 10, 10);
        });

        document.getElementById("score").textContent = "Score: " + score;
        document.getElementById("level").textContent = "Level: " + level;
    }

    function spawnFood() {
        return {
            x: Math.floor(Math.random() * (ctx.canvas.width / 10)) * 10,
            y: Math.floor(Math.random() * (ctx.canvas.height / 10)) * 10
        };
    }

    function changeDirection(event) {
        switch (event.key) {
            case "ArrowUp":
                if (direction.y !== 1) direction = { x: 0, y: -1 };
                break;
            case "ArrowDown":
                if (direction.y !== -1) direction = { x: 0, y: 1 };
                break;
            case "ArrowLeft":
                if (direction.x !== 1) direction = { x: -1, y: 0 };
                break;
            case "ArrowRight":
                if (direction.x !== -1) direction = { x: 1, y: 0 };
                break;
        }
    }

    function checkCollision() {
        const head = snake[0];
        return (
            head.x < 0 || head.x >= ctx.canvas.width || 
            head.y < 0 || head.y >= ctx.canvas.height ||
            snake.slice(1).some(part => part.x === head.x && part.y === head.y)
        );
    }
}

function renderTicTacToe(container) {
    const html = `
        <h2>Tic Tac Toe</h2>
        <div id="ticTacToeBoard"></div>
        <div id="message"></div>
        <button id="restart">Restart</button>
    `;
    container.innerHTML = html;

    const board = document.getElementById("ticTacToeBoard");
    let currentPlayer = "X";
    let gameActive = true;
    let gameState = ["", "", "", "", "", "", "", "", ""];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    createBoard();

    function createBoard() {
        gameState.forEach((_, index) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("data-cell-index", index);
            cell.addEventListener("click", handleCellClick);
            board.appendChild(cell);
        });
        board.style.display = "grid";
        board.style.gridTemplateColumns = "repeat(3, 100px)";
        board.style.gridTemplateRows = "repeat(3, 100px)";
        board.style.gap = "5px";
        
        document.getElementById("restart").addEventListener("click", restartGame);
    }

    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = clickedCell.getAttribute("data-cell-index");

        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }

        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        checkResult();
    }

    function checkResult() {
        let roundWon = false;

        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] === "" || gameState[b] === "" || gameState[c] === "") {
                continue;
            }
            if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            document.getElementById("message").textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
            return;
        }}}
