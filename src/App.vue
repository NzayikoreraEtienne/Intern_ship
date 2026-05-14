<template>
  <div id="game-scene">
    <div class="player" :style="{ bottom: playerY + 'px' }"></div>
    <div class="obstacle" :style="{ left: obstacleX + 'px' }"></div>
    <div class="score">Score: {{ score }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const playerY = ref(0);
const obstacleX = ref(600);
const score = ref(0);
const isJumping = ref(false);
let gameLoop;

// Sound Effects
const jumpSound = new Audio('./music.mp3');
const hitSound = new Audio('./points.mp3');


const jump = () => {
  if (isJumping.value) return;
  isJumping.value = true;
  jumpSound.play();
  
  let jumpHeight = 0;
  let upInterval = setInterval(() => {
    if (jumpHeight >= 150) {
      clearInterval(upInterval);
      // Fall down
      let downInterval = setInterval(() => {
        if (jumpHeight <= 0) {
          clearInterval(downInterval);
          isJumping.value = false;
        }
        jumpHeight -= 5;
        playerY.value = jumpHeight;
      }, 20);
    }
    jumpHeight += 10;
    playerY.value = jumpHeight;
  }, 20);
};

const startGame = () => {
  gameLoop = setInterval(() => {
    obstacleX.value -= 10;
    if (obstacleX.value < -20) {
      obstacleX.value = 600;
      score.value++;
    }

    // Collision Detection
    if (
      obstacleX.value < 50 &&
      obstacleX.value > 0 &&
      playerY.value < 30
    ) {
      hitSound.play();
      alert('Game Over! Score: ' + score.value);
      obstacleX.value = 600;
      score.value = 0;
    }
  }, 30);
};

onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') jump();
  });
  startGame();
});

onUnmounted(() => {
  clearInterval(gameLoop);
});
</script>

<style>
#game-scene {
  width: 600px;
  height: 200px;
  border: 2px solid black;
  position: relative;
  overflow: hidden;
  background-color: #f7f7f7;
}
.player {
  width: 30px;
  height: 30px;
  background-color: red;
  position: absolute;
  left: 20px;
}
.obstacle {
  width: 20px;
  height: 30px;
  background-color: blue;
  position: absolute;
  bottom: 0;
}
.score {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>