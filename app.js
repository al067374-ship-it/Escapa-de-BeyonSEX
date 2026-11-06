const player = document.getElementById('player');
const beyonce = document.getElementById('beyonce');
const gameArea = document.getElementById('game-area');


const darkModeToggle = document.getElementById('dark-mode-toggle');
const playerSpeedInput = document.getElementById('player-speed');
const playerSpeedValue = document.getElementById('player-speed-value');
const enemySpeedInput = document.getElementById('enemy-speed');
const enemySpeedValue = document.getElementById('enemy-speed-value');

let playerPosition = { x: 100, y: 100 };
let beyoncePosition = { x: 300, y: 300 };


let playerSpeed = parseFloat(playerSpeedInput.value);
let beyonceSpeed = parseFloat(enemySpeedInput.value);


darkModeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode', darkModeToggle.checked);
});


playerSpeedInput.addEventListener('input', () => {
    playerSpeed = parseFloat(playerSpeedInput.value);
    playerSpeedValue.textContent = playerSpeed;
});

enemySpeedInput.addEventListener('input', () => {
    beyonceSpeed = parseFloat(enemySpeedInput.value);
    enemySpeedValue.textContent = beyonceSpeed;
});


window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (playerPosition.y > 0) playerPosition.y -= playerSpeed;
            break;
        case 'ArrowDown':
            if (playerPosition.y < gameArea.clientHeight - 50) playerPosition.y += playerSpeed;
            break;
        case 'ArrowLeft':
            if (playerPosition.x > 0) playerPosition.x -= playerSpeed;
            break;
        case 'ArrowRight':
            if (playerPosition.x < gameArea.clientWidth - 50) playerPosition.x += playerSpeed;
            break;
    }
    updatePositions();
});


function moveBeyonce() {
    if (beyoncePosition.x < playerPosition.x) {
        beyoncePosition.x += beyonceSpeed;
    } else if (beyoncePosition.x > playerPosition.x) {
        beyoncePosition.x -= beyonceSpeed;
    }

    if (beyoncePosition.y < playerPosition.y) {
        beyoncePosition.y += beyonceSpeed;
    } else if (beyoncePosition.y > playerPosition.y) {
        beyoncePosition.y -= beyonceSpeed;
    }

    updatePositions();
    checkCollision();
}

function updatePositions() {
    player.style.transform = `translate(${playerPosition.x}px, ${playerPosition.y}px)`;
    beyonce.style.transform = `translate(${beyoncePosition.x}px, ${beyoncePosition.y}px)`;
}

function checkCollision() {
    if (Math.abs(playerPosition.x - beyoncePosition.x) < 50 &&
        Math.abs(playerPosition.y - beyoncePosition.y) < 50) {
        alert('¡Beyoncé te atrapó!');
        
        playerPosition = { x: 100, y: 100 };
        beyoncePosition = { x: 300, y: 300 };
        updatePositions();
    }
}

function gameLoop() {
    moveBeyonce();
    requestAnimationFrame(gameLoop);
}

gameLoop();