// Stage 8: Difficulty levels and restart
new Vue({
    el: '#app',
    data() {
        return {
            obstacleX: 800,
            speed: 3,
            characterY: 300,
            isJumping: false,
            jumpVelocity: 0,
            gravity: 1,
            gameOver: true,          // start with game not running (need to click Restart)
            score: 0,
            obstaclePassed: false,
            level: 1,
            animationFrame: null
        };
    },
    mounted() {
        this.canvas = this.$refs.gameCanvas;
        this.ctx = this.canvas.getContext('2d');
        window.addEventListener('keydown', this.handleKeyDown);
        // Draw initial scene (no game loop until restart)
        this.drawStaticScene();
    },
    beforeDestroy() {
        cancelAnimationFrame(this.animationFrame);
        window.removeEventListener('keydown', this.handleKeyDown);
    },
    methods: {
        handleKeyDown(e) {
            if (e.code === 'Space' && !this.isJumping && !this.gameOver) {
                e.preventDefault();
                this.jump();
            }
        },
        jump() {
            this.isJumping = true;
            this.jumpVelocity = -15;
        },
        setLevel(level) {
            this.level = level;
            switch(level) {
                case 1: this.speed = 3; break;
                case 2: this.speed = 6; break;
                case 3: this.speed = 9; break;
            }
        },
        restartGame() {
            // Reset all game state
            this.gameOver = false;
            this.score = 0;
            this.obstacleX = 800;
            this.characterY = 300;
            this.isJumping = false;
            this.jumpVelocity = 0;
            this.obstaclePassed = false;
            // If a loop is already running, cancel and start new
            if (this.animationFrame) {
                cancelAnimationFrame(this.animationFrame);
            }
            this.gameLoop();
        },
        applyGravity() {
            if (this.isJumping) {
                this.characterY += this.jumpVelocity;
                this.jumpVelocity += this.gravity;
                if (this.characterY >= 300) {
                    this.characterY = 300;
                    this.isJumping = false;
                    this.jumpVelocity = 0;
                }
            }
        },
        checkCollision() {
            const charLeft = 100;
            const charRight = 130;
            const charTop = this.characterY;
            const charBottom = this.characterY + 50;
            const obsLeft = this.obstacleX;
            const obsRight = this.obstacleX + 30;
            const obsTop = 330;
            const obsBottom = 350;

            if (charRight > obsLeft && charLeft < obsRight &&
                charBottom > obsTop && charTop < obsBottom) {
                this.gameOver = true;
            }
        },
        updateObstacle() {
            if (!this.gameOver) {
                this.obstacleX -= this.speed;
                if (!this.obstaclePassed && this.obstacleX + 30 < 100) {
                    this.score++;
                    this.obstaclePassed = true;
                }
                if (this.obstacleX < -50) {
                    this.obstacleX = 800;
                    this.obstaclePassed = false;
                }
            }
        },
        drawCharacter(ctx) { /* same as Stage 5 */ 
            
            ctx.fillStyle = '#FF5733';
            ctx.fillRect(100, this.characterY, 30, 50);

            ctx.fillStyle = '#8B4513';
            ctx.fillRect(95, this.characterY - 20, 40, 10);  // hat

            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.arc(115, this.characterY - 10, 10, 0, Math.PI * 2);  // head
            ctx.fill();
        },
        drawObstacle(ctx) { /* same */ 
            
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(this.obstacleX, 330, 30, 20);
        },
        drawStaticScene() {
            // Draw once without loop (for initial view)
            this.ctx.clearRect(0, 0, 800, 400);
            this.drawBackground(this.ctx);
            this.drawClouds(this.ctx);
            this.drawCharacter(this.ctx);
            this.drawObstacle(this.ctx);
            this.ctx.fillStyle = 'black';
            this.ctx.font = '20px Arial';
            this.ctx.fillText('Score: ' + this.score, 10, 30);
            this.ctx.fillStyle = 'gray';
            this.ctx.font = '20px Arial';
            this.ctx.fillText('Press Restart to play', 300, 200);
        },
        gameLoop() {
            this.ctx.clearRect(0, 0, 800, 400);
            this.drawBackground(this.ctx);
            this.drawClouds(this.ctx);
            this.drawCharacter(this.ctx);
            this.drawObstacle(this.ctx);

            if (!this.gameOver) {
                this.updateObstacle();
                this.applyGravity();
                this.checkCollision();
            } else {
                this.ctx.fillStyle = 'rgba(0,0,0,0.5)';
                this.ctx.fillRect(200, 150, 400, 100);
                this.ctx.fillStyle = 'red';
                this.ctx.font = 'bold 40px Arial';
                this.ctx.fillText('GAME OVER', 220, 220);
                this.ctx.fillStyle = green;
                this.ctx.font = '30px Arial';
                this.ctx.fillText('Score: ' + this.score, 300, 280);
            }

            this.ctx.fillStyle = 'black';
            this.ctx.font = '20px Arial';
            this.ctx.fillText('Score: ' + this.score, 10, 30);
            this.ctx.fillText('Level: ' + this.level, 700, 30);

            this.animationFrame = requestAnimationFrame(this.gameLoop);
        },
        drawBackground(ctx) { /* same */ 
            
            // Sky gradient (light blue to powder blue)
            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, '#87CEEB');
            gradient.addColorStop(1, '#B0E0E6');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 800, 400);

            // Ground (dark brown rectangle)
            ctx.fillStyle = '#5d3a1a';
            ctx.fillRect(0, 350, 800, 50);

            // Grass line (thin green)
            ctx.fillStyle = '#228B22';
            ctx.fillRect(0, 345, 800, 5);
            
        },
        drawClouds(ctx) { /* same */ 
            
            ctx.fillStyle = 'white';

            // Cloud 1 (left)
            ctx.beginPath();
            ctx.arc(150, 80, 30, 0, Math.PI * 2);
            ctx.arc(180, 60, 25, 0, Math.PI * 2);
            ctx.arc(120, 60, 25, 0, Math.PI * 2);
            ctx.arc(200, 80, 20, 0, Math.PI * 2);
            ctx.fill();

            // Cloud 2 (right)
            ctx.beginPath();
            ctx.arc(600, 120, 35, 0, Math.PI * 2);
            ctx.arc(640, 100, 30, 0, Math.PI * 2);
            ctx.arc(560, 100, 30, 0, Math.PI * 2);
            ctx.arc(680, 120, 25, 0, Math.PI * 2);
            ctx.fill()
        }
    }
});
