// Stage 6: Collision and Game Over
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
            gameOver: false,
            animationFrame: null
        };
    },
    mounted() {
        this.canvas = this.$refs.gameCanvas;
        this.ctx = this.canvas.getContext('2d');
        window.addEventListener('keydown', this.handleKeyDown);
        this.gameLoop();
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
            // Character bounding box
            const charLeft = 100;
            const charRight = 130;
            const charTop = this.characterY;   // since character drawn from bottom
            const charBottom = this.characterY + 50;

            // Obstacle bounding box (log: x, y=330, width 30, height 20)
            const obsLeft = this.obstacleX;
            const obsRight = this.obstacleX + 30;
            const obsTop = 330;
            const obsBottom = 350;

            if (charRight > obsLeft && charLeft < obsRight &&
                charBottom > obsTop && charTop < obsBottom) {
                this.gameOver = true;
            }
        },
        drawCharacter(ctx) { /* same as Stage 5 */ 
            
        },
        drawObstacle(ctx) {
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(this.obstacleX, 330, 30, 20);
        },
        updateObstacle() {
            if (!this.gameOver) {
                this.obstacleX -= this.speed;
                if (this.obstacleX < -50) {
                    this.obstacleX = 800;
                }
            }
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
                // Draw game over message
                this.ctx.fillStyle = 'rgba(0,0,0,0.5)';
                this.ctx.fillRect(200, 150, 400, 100);
                this.ctx.fillStyle = 'red';
                this.ctx.font = 'bold 40px Arial';
                this.ctx.fillText('GAME OVER', 220, 220);
            }

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
