<template>
  <div class="game-container">
    <div class="score">Score: {{ score }}</div>
    <div v-if="gameOver" class="game-over">TOPSON GAME HAS OVER </div>
    
    <!-- Player -->
    <div class="player" :class="{ jumping: isJumping }" :style="{ bottom: playerBottom + 'px' }"></div>
    
    <!-- Obstacle -->
    <div class="obstacle" :style="{ left: obstaclePosition + 'px' }"></div>
  </div>
</template>

<script>
export default {
  name: 'JumpGame',
  data() {
    return {
      score: 0,
      gameOver: false,
      playerBottom: 0,
      isJumping: false,
      obstaclePosition: 600, // Starting X position
      obstacleSpeed: 5,
      animationFrameId: null,
      gameStarted: false,
    };
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeydown);
    this.startGame();
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
    cancelAnimationFrame(this.animationFrameId);
  },
  methods: {
    startGame() {
      this.score = 0;
      this.gameOver = false;
      this.obstaclePosition = 600;
      this.playerBottom = 0;
      this.gameLoop();
    },
    gameLoop() {
      if (this.gameOver) return;

      // Move obstacle left
      this.obstaclePosition -= this.obstacleSpeed;

      // Reset obstacle if it goes off-screen
      if (this.obstaclePosition < -20) {
        this.obstaclePosition = 600;
        this.incrementScore();
        // Slightly increase speed over time
        this.obstacleSpeed += 0.2;
      }

      this.checkCollision();

      if (!this.gameOver) {
        this.animationFrameId = requestAnimationFrame(this.gameLoop);
      }
    },
    handleKeydown(e) {
      if (e.code === 'Space') {
        if (this.gameOver) {
          this.startGame();
        } else {
          this.jump();
        }
      }
    },
    jump() {
      if (this.isJumping) return;
      this.isJumping = true;
      this.playerBottom = 100; // Jump height

      setTimeout(() => {
        this.playerBottom = 0; // Landing
        setTimeout(() => {
          this.isJumping = false;
        }, 300); // Cooldown to prevent spamming
      }, 300);
    },
    checkCollision() {
      // Basic bounding box collision
      // Player: Left 50px, Width 30px, Height 50px
      // Obstacle: Left 'obstaclePosition', Width 20px, Height 30px
      
       // Inverted CSS bottom
      
      if (
        this.obstaclePosition < 80 && // 50px (left) + 30px (width)
        this.obstaclePosition > 50 && // 50px (left)
        this.playerBottom < 30 // Obstacle height
      ) {
        this.gameOver = true;
      }
    },
    incrementScore() {
      this.score += 1;
    },
  },
};
</script>

<style scoped>
.game-container {
  width: 600px;
  height: 200px;
  border: 2px solid #333;
  position: relative;
  overflow: hidden;
  background: url(./assets/top\ img.png);
  background-size: cover;
  margin: 20px auto;
}

.score {
  position: absolute;
  top: 10px;
  right: 10px;
  font-family: Arial, sans-serif;
  font-size: 20px;
}

.game-over {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 40px;
  color: rgb(255, 2, 242);
  font-weight: bold;
}

.player {
  border-radius: 20PX;
  width: 40px;
  height: 56px;
  background-color: blue;
  position: absolute;
  left: 50px;
  bottom:0;
  transition: bottom 0.3s;
}

.obstacle {
  box-shadow: 0 0 50px rgba(5, 5, 5, 0.5);
  border-radius: 20PX;
  width: 20px;
  height: 30px;
  background-color: #e74c3c;
  position: absolute;
  bottom: 0;
}
.playerTop{
  color: red;
}
</style>
