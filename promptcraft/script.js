const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let snake = [{ x: 150, y: 150 }];
let direction = { x: 10, y: 0 }; // Start moving to the right
let food = spawnFood();
let score = 0;
let gameInterval;

document.addEventListener("keydown", changeDirection);
startGame();

function startGame() {
    gameInterval = setInterval(updateGame, 100);
}

function updateGame() {
    // Check for collisions
    if (checkCollision()) {
        clearInterval(gameInterval);
        alert("Game Over! Your score: " + score);
        document.location.reload();
    }

    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Check if snake has eaten food
    if (newHead.x === food.x && newHead.y === food.y) {
        score += 10;
        food = spawnFood(); // Spawn new food
    } else {
        snake.pop(); // Remove the last part of the snake
    }

    snake.unshift(newHead); // Add the new head to the snake
    drawGame();
}

function drawGame() {
    // Clear the canvas
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the food
    ctx.fillStyle = "#ff0000"; // Food color
    ctx.fillRect(food.x, food.y, 10, 10);

    // Draw the snake
    ctx.fillStyle = "#00ff00"; // Snake color
    snake.forEach(part => {
        ctx.fillRect(part.x, part.y, 10, 10);
    });

    document.getElementById("score").textContent = "Score: " + score;
}

function spawnFood() {
    let foodPosition;
    while (true) {
        foodPosition = {
            x: Math.floor(Math.random() * (canvas.width / 10)) * 10,
            y: Math.floor(Math.random() * (canvas.height / 10)) * 10
        };
        
        // Check if food is not spawned on the snake
        if (!snake.some(part => part.x === foodPosition.x && part.y === foodPosition.y)) {
            break;
        }
    }
    return foodPosition;
}

function changeDirection(event) {
    switch (event.key) {
        case "ArrowUp":
            if (direction.y === 0) direction = { x: 0, y: -10 }; // Prevent reversing
            break;
        case "ArrowDown":
            if (direction.y === 0) direction = { x: 0, y: 10 };
            break;
        case "ArrowLeft":
            if (direction.x === 0) direction = { x: -10, y: 0 };
            break;
        case "ArrowRight":
            if (direction.x === 0) direction = { x: 10, y: 0 };
            break;
    }
}

function checkCollision() {
    const head = snake[0];
    return (
        head.x < 0 || head.x >= canvas.width || 
        head.y < 0 || head.y >= canvas.height ||
        snake.slice(1).some(part => part.x === head.x && part.y === head.y)
    );
}
