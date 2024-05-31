// Iteration 1: Declare variables required for this game
const gameBody = document.getElementById("game-body");
const livesDisplay = document.getElementById("lives");
let seconds = parseInt(document.getElementById("timer").textContent);
let zombieId = 0;
const zombieImages = [
    "./assets/zombie-1.png",
    "./assets/zombie-2.png",
    "./assets/zombie-3.png",
    "./assets/zombie-4.png",
    "./assets/zombie-5.png",
    "./assets/zombie-6.png",
];
// Iteration 1.2: Add shotgun sound
const soundToShoot = new Audio('./assets/shotgun.wav');
soundToShoot.volume = 0.7;
gameBody.onclick = () => {
    soundToShoot.pause();
    soundToShoot.currentTime = 0;
    soundToShoot.play();
}
// Iteration 1.3: Add background sound
const backgroundSound = new Audio('./assets/bgm.mp3');
backgroundSound.volume = 0.5;
backgroundSound.loop = true;
backgroundSound.play();
// Iteration 1.4: Add lives
const maxLives = 4;
let lives = maxLives;

// Iteration 2: Write a function to make a zombie
function createZombie() {
    const zombieImg = document.createElement('img');
    const randomImgIndex = Math.floor(Math.random() * zombieImages.length);
    zombieImg.src = zombieImages[randomImgIndex];
    zombieImg.classList.add('zombie-image');
    zombieImg.id = `zombie-${zombieId}`;
    document.body.appendChild(zombieImg);
    const leftPosition = getRandomInt(20, 80);
    zombieImg.style.left = `${leftPosition}vw`;
    zombieImg.onclick = () => destroyZombie(zombieImg);
    z
// Iteration 3: Write a function to check if the player missed a zombie
function checkCollision(zombie) {
    if (zombie.getBoundingClientRect().top <= 0) {
        lives--;
        updateLives();
        return true;
    }
    return false;
}

// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function destroyZombie(zombie) {
    zombie.remove();
    createZombie();
}

// Iteration 5: Creating timer
let timer = setInterval(() => {
    seconds--;
    document.getElementById("timer").textContent = seconds;
    const zombie = document.getElementById(`zombie-${zombieId - 1}`);
    if (zombie && checkCollision(zombie)) {
        destroyZombie(zombie);
    }
    if (lives === 0) {
        clearInterval(timer);
        location.href = "./game-over.html";
    }
    if (seconds === 0) {
        clearInterval(timer);
        location.href = "./win.html";
    }
}, 1000);

// Iteration 6: Write a code to start the game by calling the first zombie
createZombie();

// Iteration 7: Write the helper function to get random integer
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateLives() {
    livesDisplay.textContent = `Lives: ${lives}`;
    if (lives === 0) {
        livesDisplay.classList.add('text-danger');
    } else {
        livesDisplay.classList.remove('text-danger');
    }
}
updateLives();