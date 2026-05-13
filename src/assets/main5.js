// Stage 5: Jump with gravity
new Vue({
    el: '#app',
    data() {
        return {
            obstacleX: 800,
            speed: 3,
            characterY: 300,          // ground level (bottom of character)
            isJumping: false,
            jumpVelocity: 0,
            gravity: 1,
            animationFrame: null
        };
    },
    mounted() {
        this.canvas = this.$refs.gameCanvas;
        this.ctx = this.canvas.getContext('2d');

        // Listen for keydown events
        window.addEventListener('keydown', this.handleKeyDown);

        this.gameLoop();
    },
    beforeDestroy() {
        cancelAnimationFrame(this.animationFrame);
        window.removeEventListener('keydown', this.handleKeyDown);
    },
    methods: {
        handleKeyDown(e) {
            if (e.code === 'Space' && !this.isJumping) {
                e.preventDefault();   // prevent page scrolling
                this.jump();
            }
        },
        jump() {
            this.isJumping = true;
            this.jumpVelocity = -15;   // upward velocity
        },
        applyGravity() {
            if (this.isJumping) {
                this.characterY += this.jumpVelocity;
                this.jumpVelocity += this.gravity;

                // Check if landed
                if (this.characterY >= 300) {
                    this.characterY = 300;
                    this.isJumping = false;
                    this.jumpVelocity = 0;
                }
            }
        },
        drawCharacter(ctx) {
            // Use characterY for vertical position
            ctx.fillStyle = '#FF5733';
            ctx.fillRect(100, this.characterY, 30, 50);

            ctx.fillStyle = '#8B4513';
            ctx.fillRect(95, this.characterY - 20, 40, 10);  // hat

            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.arc(115, this.characterY - 10, 10, 0, Math.PI * 2);  // head
            ctx.fill();
        },
        drawObstacle(ctx) {
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(this.obstacleX, 330, 30, 20);
        },
        updateObstacle() {
            this.obstacleX -= this.speed;
            if (this.obstacleX < -50) {
                this.obstacleX = 800;
            }
        },
        gameLoop() {
            this.ctx.clearRect(0, 0, 800, 400);
            this.drawBackground(this.ctx);
            this.drawClouds(this.ctx);
            this.drawCharacter(this.ctx);
            this.drawObstacle(this.ctx);
            this.updateObstacle();
            this.applyGravity();

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
