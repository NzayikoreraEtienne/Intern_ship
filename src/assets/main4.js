// Stage 4: Moving obstacle
new Vue({
    el: '#app',
    data() {
        return {
            obstacleX: 800,        // start off-screen right
            speed: 3,
            animationFrame: null
        };
    },
    mounted() {
        this.canvas = this.$refs.gameCanvas;
        this.ctx = this.canvas.getContext('2d');
        this.gameLoop();           // start animation
    },
    beforeDestroy() {
        cancelAnimationFrame(this.animationFrame);
    },
    methods: {
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
        },
        drawCharacter(ctx) { /* same */ 
            
            // Body (brown tunic)
            ctx.fillStyle = '#FF5733';
            ctx.fillRect(100, 300, 30, 50);   // x=100, y=300 (bottom), width=30, height=50

            // Hat (brown rectangle)
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(95, 280, 40, 10);     // slightly wider than body

            // Head (yellow circle)
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.arc(115, 290, 10, 0, Math.PI * 2);
            ctx.fill();
        },
        drawObstacle(ctx) {
            // Draw a brown log
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(this.obstacleX, 330, 30, 20);  // y=330 so it sits on ground
        },
        updateObstacle() {
            this.obstacleX -= this.speed;               // move left
            if (this.obstacleX < -50) {                  // off-screen left
                this.obstacleX = 800;                    // reset to right
            }
        },
        gameLoop() {
            // Clear canvas
            this.ctx.clearRect(0, 0, 800, 400);

            // Draw everything
            this.drawBackground(this.ctx);
            this.drawClouds(this.ctx);
            this.drawCharacter(this.ctx);
            this.drawObstacle(this.ctx);

            // Update obstacle position
            this.updateObstacle();

            // Request next frame
            this.animationFrame = requestAnimationFrame(this.gameLoop);
        }
    }
});
